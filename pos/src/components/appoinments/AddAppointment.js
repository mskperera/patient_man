import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaUserPlus, FaClock, FaCheckCircle, FaChevronCircleLeft } from 'react-icons/fa';
import moment from 'moment';
import MessageModel from '../MessageModel';
import AppoinmentPatientList from '../AppoinmentPatientList';
import DialogModel from '../DialogModel';
import { addApPatient, addAppointment, drpDoctors, getapPatients } from '../../functions/patient';

const AppointmentTimeline = ({ appointments, selectedDate, duration, isLoading, setAppointmentTime, slotDurationComp, doctorId }) => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [newDuration, setNewDuration] = useState('');

  const durationMinutes = parseInt(duration) || 30; // Default to 30 minutes if duration is not set
  const currentTime = moment(); // Current time for comparison

  // Function to build time slots with appointment numbers
  const buildTimeSlots = () => {
    const startTime = moment(selectedDate).hour(8).minute(0);
    const endTime = moment(selectedDate).hour(24).minute(0);
    let currentTime = startTime.clone();
    const slots = [];

    // Create a sorted list of booked and completed appointments
    const bookedAppointments = appointments
      .filter((appt) => ['Scheduled', 'Completed'].includes(appt.status))
      .map((appt) => ({
        start: moment(appt.appointmentDate),
        duration: appt.duration,
        patient: appt.patientName,
        status: appt.status,
        appointmentNo: appt.appointmentNo,
      }))
      .sort((a, b) => a.start.diff(b.start));

    // Debug: Log booked appointments
    console.log('Booked Appointments:', bookedAppointments);

    // Calculate the next available appointment number
    const maxAppointmentNo = bookedAppointments.length > 0
      ? Math.max(...bookedAppointments.map((appt) => appt.appointmentNo))
      : 0;
    let nextAppointmentNo = maxAppointmentNo + 1;

    // If the selected date is today, start from the current time for available slots
    if (moment(selectedDate).isSame(moment(), 'day') && currentTime.isBefore(currentTime)) {
      currentTime = moment.max(currentTime, moment());
    }

    // Generate time slots
    while (currentTime.isBefore(endTime)) {
      const nextBooked = bookedAppointments.find((appt) => appt.start.isSame(currentTime));
      if (nextBooked) {
        slots.push({
          time: nextBooked.start.format('h:mm A'),
          isBooked: true,
          patient: nextBooked.patient,
          duration: nextBooked.duration,
          status: nextBooked.status,
          startMoment: nextBooked.start.clone(),
          appointmentNo: nextBooked.appointmentNo, // Preserve fixed appointmentNo
        });
        currentTime = nextBooked.start.clone().add(nextBooked.duration, 'minutes');
      } else {
      
        const gapEnd = bookedAppointments.find((appt) => appt.start.isAfter(currentTime))?.start || endTime;
        const gapMinutes = gapEnd.diff(currentTime, 'minutes');
        const slotDuration = Math.min(gapMinutes, durationMinutes);
        if (slotDuration > 0) {
          slots.push({
            time: currentTime.format('h:mm A'),
            isBooked: false,
            patient: null,
            duration: slotDuration,
            status: null,
            startMoment: currentTime.clone(),
            appointmentNo: nextAppointmentNo++, // Assign tentative appointmentNo
          });
        }
        currentTime.add(slotDuration, 'minutes');
      }
    }

    // Debug: Log generated time slots
    console.log('Generated Time Slots:', slots);

    return slots;
  };

  useEffect(() => {
    if (!isLoading) {
      setTimeSlots(buildTimeSlots());
    }
  }, [appointments, selectedDate, durationMinutes, isLoading]);

  const handleDurationClick = (index) => {
    if (timeSlots[index].status === 'Completed') {
      return;
    }
    setEditingIndex(index);
    setNewDuration(timeSlots[index].duration.toString());
  };

  const handleDurationChange = (e) => {
    setNewDuration(e.target.value);
  };

  const handleSetDuration = (index) => {
    const newDurationValue = parseInt(newDuration);
    if (isNaN(newDurationValue) || newDurationValue <= 0) {
      setEditingIndex(-1);
      return;
    }

    const newTimeSlots = [...timeSlots];
    const currentSlot = newTimeSlots[index];

    if (currentSlot.status === 'Completed') {
      setEditingIndex(-1);
      return;
    }

    const oldDuration = currentSlot.duration;
    currentSlot.duration = newDurationValue;

    const currentEnd = currentSlot.startMoment.clone().add(newDurationValue, 'minutes');
    const nextBookedIndex = newTimeSlots.findIndex(
      (slot, i) => i > index && slot.isBooked
    );
    if (
      nextBookedIndex !== -1 &&
      currentEnd.isAfter(newTimeSlots[nextBookedIndex].startMoment)
    ) {
      currentSlot.duration = oldDuration;
      setEditingIndex(-1);
      return;
    }

    // Recalculate appointment numbers for available slots only
    const bookedAppointmentNos = newTimeSlots
      .filter((slot) => slot.isBooked)
      .map((slot) => slot.appointmentNo);
    let nextAppointmentNo = bookedAppointmentNos.length > 0
      ? Math.max(...bookedAppointmentNos) + 1
      : 1;

    let currentTime = currentSlot.startMoment.clone().add(newDurationValue, 'minutes');
    for (let i = index + 1; i < newTimeSlots.length; i++) {
      if (newTimeSlots[i].isBooked) {
        // Skip booked/completed slots, preserving their appointmentNo
        currentTime = newTimeSlots[i].startMoment.clone().add(newTimeSlots[i].duration, 'minutes');
        continue;
      }
      const gapEnd =
        newTimeSlots
          .slice(i + 1)
          .find((slot) => slot.isBooked)?.startMoment || moment(selectedDate).hour(24).minute(0);
      const gapMinutes = gapEnd.diff(currentTime, 'minutes');
      if (gapMinutes <= 0) {
        newTimeSlots.splice(i, 1);
        i--;
      } else {
        newTimeSlots[i].startMoment = currentTime.clone();
        newTimeSlots[i].time = currentTime.format('h:mm A');
        newTimeSlots[i].duration = Math.min(gapMinutes, durationMinutes);
        newTimeSlots[i].appointmentNo = nextAppointmentNo++; // Update tentative appointmentNo
        currentTime.add(newTimeSlots[i].duration, 'minutes');
      }
    }

    // Fill any gaps after the modified slot
    const updatedSlots = [];
    let currentTimeFill = moment(selectedDate).hour(8).minute(0);
    const endTime = moment(selectedDate).hour(24).minute(0);
    nextAppointmentNo = bookedAppointmentNos.length > 0
      ? Math.max(...bookedAppointmentNos) + 1
      : 1;

    // If the selected date is today, start filling from the current time
    if (moment(selectedDate).isSame(moment(), 'day') && currentTimeFill.isBefore(currentTime)) {
      currentTimeFill = moment.max(currentTimeFill, currentTime);
    }

    newTimeSlots
      .sort((a, b) => a.startMoment.diff(b.startMoment))
      .forEach((slot) => {
        if (slot.isBooked) {
          while (currentTimeFill.isBefore(slot.startMoment) && currentTimeFill.isBefore(endTime)) {
            const gapMinutes = slot.startMoment.diff(currentTimeFill, 'minutes');
            const slotDuration = Math.min(gapMinutes, durationMinutes);
            if (slotDuration > 0) {
              updatedSlots.push({
                time: currentTimeFill.format('h:mm A'),
                isBooked: false,
                patient: null,
                duration: slotDuration,
                status: null,
                startMoment: currentTimeFill.clone(),
                appointmentNo: nextAppointmentNo++,
              });
            }
            currentTimeFill.add(slotDuration, 'minutes');
          }
          updatedSlots.push(slot); // Preserve booked slot with original appointmentNo
          currentTimeFill = slot.startMoment.clone().add(slot.duration, 'minutes');
        } else {
          slot.appointmentNo = nextAppointmentNo++; // Assign tentative appointmentNo
          updatedSlots.push(slot);
          currentTimeFill = slot.startMoment.clone().add(slot.duration, 'minutes');
        }
      });

    while (currentTimeFill.isBefore(endTime)) {
      const remainingMinutes = endTime.diff(currentTimeFill, 'minutes');
      const slotDuration = Math.min(remainingMinutes, durationMinutes);
      if (slotDuration > 0) {
        updatedSlots.push({
          time: currentTimeFill.format('h:mm A'),
          isBooked: false,
          patient: null,
          duration: slotDuration,
          status: null,
          startMoment: currentTimeFill.clone(),
          appointmentNo: nextAppointmentNo++,
        });
      }
      currentTimeFill.add(slotDuration, 'minutes');
    }

    setTimeSlots(updatedSlots.sort((a, b) => a.startMoment.diff(b.startMoment)));
    setEditingIndex(-1);
    setNewDuration('');
  };

  const handleSetTime = (time, appointmentNo) => {
    setAppointmentTime(time, appointmentNo);
  };

  return (
    <div className="mt-6">
      <div className='flex justify-between items-center'>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Doctor's Schedule</h3>
        <div className='mb-4'>
          {slotDurationComp}
        </div>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading schedule...</p>
      ) : (
        <div className="relative flex overflow-x-auto pb-4">
          <div className="flex space-x-2">
            {timeSlots.length === 0 ? (
              <p className="text-sm text-gray-500">No appointments available for this doctor and date.</p>
            ) : (
              timeSlots.map((slot, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-36 p-3 rounded-lg text-center transition-all duration-200 ${
                    slot.isBooked
                      ? slot.status === 'Completed'
                        ? 'bg-sky-100 border-sky-300 text-sky-700'
                        : 'bg-red-100 border-red-300 text-red-700'
                      : 'bg-green-100 border-green-300 text-green-700'
                  } border shadow-sm hover:shadow-md`}
                >
                  <p className="text-sm font-semibold">{slot.time}</p>
                  <p className="text-xs">
                    {slot.isBooked
                      ? `${slot.status === 'Completed' ? 'Completed' : 'Booked'}: ${slot.patient}`
                      : 'Available'}
                  </p>
                  <p className="text-xs font-medium">
                    #{slot.appointmentNo} {slot.isBooked ? '' : '(Tentative)'}
                  </p>
                  <p className="text-sm mt-1">
                    {slot.status === 'Completed' ? (
                      <span>({slot.duration} min)</span>
                    ) : editingIndex === index ? (
                      <div className="inline-flex items-center">
                        <input
                          type="number"
                          value={newDuration}
                          onChange={handleDurationChange}
                          className="w-12 text-sm border rounded px-1 py-0.5"
                          min="1"
                          aria-label="Edit duration"
                        />
                        <button
                          onClick={() => handleSetDuration(index)}
                          type="button"
                          className="ml-1 px-2 py-0.5 bg-sky-600 text-white text-sm rounded hover:bg-sky-700"
                          aria-label="Set duration"
                        >
                          Set
                        </button>
                      </div>
                    ) : (
                      <span
                        className="cursor-pointer underline"
                        onClick={() => handleDurationClick(index)}
                      >
                        ({slot.duration} min)
                      </span>
                    )}
                  </p>
                  {!slot.isBooked && (
                    <button
                      onClick={() => handleSetTime(slot.time, slot.appointmentNo)}
                      type="button"
                      className="mt-2 px-2 py-1 bg-sky-600 text-white text-sm rounded hover:bg-sky-700"
                      aria-label={`Set appointment time to ${slot.time} with appointment number ${slot.appointmentNo}`}
                    >
                      <span className='flex gap-1 items-center'> <FaClock size={12} /> Select</span>
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const AddAppointment = (setLoadlist) => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDate = location.state?.selectedDate || new Date();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('patientName');
  const [triggerSearch, setTriggerSearch] = useState(0);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [error, setError] = useState('');
  const [modal, setModal] = useState({ isOpen: false, message: '', type: 'error' });
  const [isLoading, setIsLoading] = useState(false);
  const [isTimelineLoading, setIsTimelineLoading] = useState(false);
  const [isPatientDialogOpen, setIsPatientDialogOpen] = useState(false);
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientNo: '',
    appointmentDate: moment(selectedDate).format('YYYY-MM-DD'),
    appointmentTime: '',
    appointmentNo: '',
    status: 'Scheduled',
    doctor: '',
    doctorId: '',
    notes: '',
    duration: '30',
  });
  const [formErrors, setFormErrors] = useState({});
  const [newPatient, setNewPatient] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [patientFormErrors, setPatientFormErrors] = useState({});
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [appointmentSuccessDialog, setAppointmentSuccessDialog] = useState({
    isOpen: false,
    doctorName: '',
    patientName: '',
    appointmentNo: '',
    referenceNo: '',
    date: '',
    time: '',
  });
  const [doctorOptions, setDoctorOptions] = useState([]);

  const loadDrpDoctors = async () => {
    const occupations = await drpDoctors();
    setDoctorOptions(occupations.data.results[0]);
  };

  useEffect(() => {
    loadDrpDoctors();
  }, []);

  const fetchDoctorAppointments = async (doctor, date) => {
    try {
      setIsTimelineLoading(true);
      const mockAppointments = [
        {
          id: 1,
          doctorId: 1,
          appointmentDate: moment(date).hour(9).minute(0).toISOString(),
          patientName: 'Alice Brown',
          duration: 30,
          status: 'Completed',
          appointmentNo: 1,
        },
        {
          id: 2,
          doctorId: 1,
          appointmentDate: moment(date).hour(16).minute(30).toISOString(),
          patientName: 'Bob Wilson',
          duration: 45,
          status: 'Scheduled',
          appointmentNo: 2,
        },
        {
          id: 3,
          doctorId: 1,
          appointmentDate: moment(date).hour(11).minute(30).toISOString(),
          patientName: 'Ethan Walker',
          duration: 30,
          status: 'Scheduled',
          appointmentNo: 3,
        },
        {
          id: 4,
          doctorId: 2,
          appointmentDate: moment(date).hour(8).minute(0).toISOString(),
          patientName: 'Clara Davis',
          duration: 30,
          status: 'Scheduled',
          appointmentNo: 1,
        },
        {
          id: 5,
          doctorId: 2,
          appointmentDate: moment(date).hour(10).minute(0).toISOString(),
          patientName: 'Mia Lewis',
          duration: 60,
          status: 'Completed',
          appointmentNo: 2,
        },
        {
          id: 6,
          doctorId: 3,
          appointmentDate: moment(date).hour(13).minute(0).toISOString(),
          patientName: 'Sophie Clark',
          duration: 60,
          status: 'Scheduled',
          appointmentNo: 1,
        },
        {
          id: 7,
          doctorId: 3,
          appointmentDate: moment(date).hour(14).minute(30).toISOString(),
          patientName: 'Liam Harris',
          duration: 30,
          status: 'Completed',
          appointmentNo: 2,
        },
      ];
      const filteredAppointments = mockAppointments.filter(
        (appt) =>
          appt.doctorId == doctor &&
          moment(appt.appointmentDate).isSame(moment(date), 'day')
      );
      console.log('Fetched Appointments for', doctor, date, ':', filteredAppointments);
      return filteredAppointments;
    } finally {
      setIsTimelineLoading(false);
    }
  };

  useEffect(() => {
    setNewAppointment((prev) => ({
      ...prev,
      appointmentDate: moment(selectedDate).format('YYYY-MM-DD'),
    }));
  }, [selectedDate]);

  useEffect(() => {
    if (newAppointment.doctor && newAppointment.appointmentDate) {
      const loadAppointments = async () => {
        console.log('Loading appointments for:', newAppointment.doctor, newAppointment.appointmentDate);
        const appointments = await fetchDoctorAppointments(
          newAppointment.doctor,
          newAppointment.appointmentDate
        );
        setDoctorAppointments(appointments);
      };
      loadAppointments();
    } else {
      setDoctorAppointments([]);
    }
  }, [newAppointment.doctor, newAppointment.appointmentDate]);

  const handleSelectPatient = (patient) => {
    setSelectedPatient({ ...patient, fullName: `${patient.firstName} ${patient.lastName}` });
    setNewAppointment((prev) => ({
      ...prev,
      firstName: patient.firstName,
      lastName: patient.lastName,
    }));
    setFormErrors({});
    setIsPatientDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value
    }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handlePatientInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({ ...prev, [name]: value }));
    setPatientFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newAppointment.appointmentDate) newErrors.appointmentDate = 'Date is required.';
    if (!newAppointment.appointmentTime) newErrors.appointmentTime = 'Time is required.';
    if (!newAppointment.doctor) newErrors.doctor = 'Please select a doctor.';
    if (!newAppointment.duration || isNaN(parseInt(newAppointment.duration)) || parseInt(newAppointment.duration) <= 0) {
      newErrors.duration = 'Please enter a valid duration (positive number).';
    }
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePatientForm = () => {
    const newErrors = {};
    if (!newPatient.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!newPatient.lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (newPatient.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newPatient.email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (newPatient.phone && !/^\+?\d{10,15}$/.test(newPatient.phone)) {
      newErrors.phone = 'Invalid phone number (10-15 digits).';
    }
    setPatientFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSelectedPatient(null);
    if (!searchQuery.trim()) {
      setError('Please enter a search term.');
      return;
    }
    setError('');
    setTriggerSearch((prev) => prev + 1);
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    if (!validatePatientForm()) return;

    try {
      setIsLoading(true);
      const payload = {
        firstName: newPatient.firstName,
        lastName: newPatient.lastName,
        email: newPatient.email || null,
        phone: newPatient.phone || null,
        utcOffset: 'UTC',
        pageName: 'AddAppointment',
      };

      const res = await addApPatient(payload);
      if (res.data.error) {
        setModal({
          isOpen: true,
          message: res.data.error.message,
          type: 'error',
        });
        setIsLoading(false);
        return;
      }
      if (res.data.outputValues.responseStatus === 'failed') {
        setModal({
          isOpen: true,
          message: res.data.outputValues.outputMessage,
          type: 'warning',
        });
        setIsLoading(false);
        return;
      }

      const newPatientData = {
        patientId: res.data.outputValues.outputPatientId,
        fullName: `${newPatient.firstName} ${newPatient.lastName}`,
        email: newPatient.email || 'N/A',
        mobileNo: newPatient.phone || 'N/A',
        is_registered: 0,
      };

      setPatients((prev) => [newPatientData, ...prev]);
      setSelectedPatient(newPatientData);
      setNewAppointment((prev) => ({
        ...prev,
        patientNo: newPatientData.patientNo,
      }));
      setModal({
        isOpen: true,
        message: res.data.outputValues.outputMessage,
        type: 'success',
      });
      setIsPatientDialogOpen(false);
      setShowNewPatientForm(false);
      setNewPatient({ firstName: '', lastName: '', email: '', phone: '' });
    } catch (err) {
      setModal({
        isOpen: true,
        message: 'Failed to add patient. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAppointment = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      patientId: selectedPatient.patientId,
      appointmentDate: `${newAppointment.appointmentDate}T${newAppointment.appointmentTime}:00Z`,
      statusId: newAppointment.status === 'Scheduled' ? 1 : newAppointment.status === 'Completed' ? 2 : 3,
      doctorId: newAppointment.doctorId,
      notes: newAppointment.notes,
      duration: parseInt(newAppointment.duration),
    };

    try {
      setIsLoading(true);
      const res = await addAppointment(payload);
      if (res.data.error) {
        setModal({
          isOpen: true,
          message: res.data.error.message,
          type: 'error',
        });
        setIsLoading(false);
        return;
      }

      if (res.data.outputValues.responseStatus === 'failed') {
        setModal({
          isOpen: true,
          message: res.data.outputValues.outputMessage,
          type: 'warning',
        });
        setIsLoading(false);
        return;
      }

      setLoadlist(Math.random());
      setAppointmentSuccessDialog({
        isOpen: true,
        doctorName: newAppointment.doctor,
        patientName: `${selectedPatient.fullName}`,
        appointmentNo: res.data.outputValues?.appointmentNo || newAppointment.appointmentNo,
        referenceNo: res.data.outputValues?.referenceNo,
        date: moment(newAppointment.appointmentDate).format('MMMM D, YYYY'),
        time: moment(newAppointment.appointmentTime, 'HH:mm').format('h:mm A'),
      });
      setNewAppointment({
        patientNo: '',
        appointmentDate: moment(selectedDate).format('YYYY-MM-DD'),
        appointmentTime: '',
        appointmentNo: '',
        status: 'Scheduled',
        doctor: '',
        doctorId: '',
        notes: '',
        duration: '30',
      });
      setSelectedPatient(null);
      setPatients([]);
      setSearchQuery('');
      setTriggerSearch(0);
      setDoctorAppointments([]);
    } catch (err) {
      setModal({
        isOpen: true,
        message: 'Failed to add appointment. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setAppointmentTime = (time, appointmentNo) => {
    const formattedTime = moment(time, 'h:mm A').format('HH:mm');
    setNewAppointment((prev) => ({
      ...prev,
      appointmentTime: formattedTime,
      appointmentNo: appointmentNo.toString(),
    }));
    setFormErrors((prev) => ({ ...prev, appointmentTime: '' }));
  };

  return (
    <>
      <MessageModel
        isOpen={modal.isOpen}
        onClose={() => {
          setModal({ isOpen: false, message: '', type: 'error' });
        }}
        message={modal.message}
        type={modal.type}
      />
      <DialogModel
        header="Appointment Confirmed"
        visible={appointmentSuccessDialog.isOpen}
        onHide={() => setAppointmentSuccessDialog({ isOpen: false, doctorName: '', patientName: '', appointmentNo: '', date: '', time: '' })}
        width="500px"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-2">
            <FaCheckCircle className="text-green-500" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">
              Appointment Successfully Scheduled
            </h3>
          </div>
          <p className="text-md text-gray-600 text-center">
            The appointment for <span className="font-medium">{appointmentSuccessDialog.doctorName}</span> with{' '}
            <span className="font-medium">{appointmentSuccessDialog.patientName}</span> has been placed successfully.
          </p>
          <div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="text-lg text-gray-700 font-semibold">Appointment Details:</h3>
              <div className="space-y-2 text-md text-gray-600 mt-2">
                <p>
                  <span className="font-medium">Reference No. :</span> {appointmentSuccessDialog.referenceNo}
                </p>
                <p>
                  <span className="font-medium">Appointment No. :</span> {appointmentSuccessDialog.appointmentNo}
                </p>
                <p>
                  <span className="font-medium">Doctor:</span> {appointmentSuccessDialog.doctorName}
                </p>
                <p>
                  <span className="font-medium">Patient:</span> {appointmentSuccessDialog.patientName}
                </p>
                <p>
                  <span className="font-medium">Date:</span> {appointmentSuccessDialog.date}
                </p>
                <p>
                  <span className="font-medium">Time:</span> {appointmentSuccessDialog.time}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setAppointmentSuccessDialog({ isOpen: false, doctorName: '', patientName: '', appointmentNo: '', date: '', time: '' })}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-all duration-200 text-sm"
              aria-label="Close success dialog"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                setAppointmentSuccessDialog({ isOpen: false, doctorName: '', patientName: '', appointmentNo: '', date: '', time: '' });
                navigate('/appointments');
              }}
              className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-all duration-200 flex items-center gap-2 text-sm"
              aria-label="Back to appointments"
            >
              Back to Appointments
            </button>
          </div>
        </div>
      </DialogModel>
      <DialogModel
        header={showNewPatientForm ? 'Add New Patient' : 'Select Patient'}
        visible={isPatientDialogOpen}
        onHide={() => {
          setIsPatientDialogOpen(false);
          setShowNewPatientForm(false);
          setNewPatient({ firstName: '', lastName: '', email: '', phone: '' });
          setPatientFormErrors({});
          setSearchQuery('');
          setError('');
          setTriggerSearch(0);
        }}
      >
        {showNewPatientForm ? (
          <form onSubmit={handleAddPatient} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={newPatient.firstName}
                onChange={handlePatientInputChange}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                aria-label="Patient first name"
              />
              {patientFormErrors.firstName && (
                <p className="mt-1 text-sm text-red-600">{patientFormErrors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={newPatient.lastName}
                onChange={handlePatientInputChange}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                aria-label="Patient last name"
              />
              {patientFormErrors.lastName && (
                <p className="mt-1 text-sm text-red-600">{patientFormErrors.lastName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={newPatient.email}
                onChange={handlePatientInputChange}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                aria-label="Patient email"
              />
              {patientFormErrors.email && (
                <p className="mt-1 text-sm text-red-600">{patientFormErrors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={newPatient.phone}
                onChange={handlePatientInputChange}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                aria-label="Patient phone"
              />
              {patientFormErrors.phone && (
                <p className="mt-1 text-sm text-red-600">{patientFormErrors.phone}</p>
              )}
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowNewPatientForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-all duration-200 text-sm"
                aria-label="Back to patient search"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-all duration-200 flex items-center gap-2 text-sm"
                aria-label="Save patient"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-wrap gap-4 justify-center mb-4">
                {[
                  { value: 'patientNo', label: 'Patient No' },
                  { value: 'patientName', label: 'Patient Name' },
                  { value: 'email', label: 'Email' },
                  { value: 'mobile', label: 'Mobile' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-2 text-gray-700 text-sm">
                    <input
                      type="radio"
                      value={option.value}
                      checked={filterType === option.value}
                      onChange={(e) => {
                        setFilterType(e.target.value);
                        setError('');
                      }}
                      className="form-radio text-sky-600 focus:ring-sky-500 h-4 w-4"
                      aria-label={`Search by ${option.label}`}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setError('');
                    }}
                    placeholder={`Search by ${filterType.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition text-sm"
                    aria-label={`Search patients by ${filterType.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 sm:mt-0 bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition flex items-center justify-center gap-2 text-sm"
                  aria-label="Search patients"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewPatientForm(true)}
                  className="mt-2 sm:mt-0 bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition flex items-center justify-center gap-2 text-sm"
                  aria-label="Add new patient for appointment"
                >
                  <FaUserPlus size={16} />
                  New patient
                </button>
              </div>
              {error && (
                <p id="search-error" className="text-sm text-red-600 mt-2">
                  {error}
                </p>
              )}
            </form>
            {triggerSearch > 0 && (
              <div className="mt-6">
                <AppoinmentPatientList
                  searchQuery={searchQuery}
                  filterType={filterType}
                  triggerSearch={triggerSearch}
                  setPatients={setPatients}
                  onSelectPatient={handleSelectPatient}
                  hidePaginationIfTotalPagesIsOne={true}
                />
              </div>
            )}
          </div>
        )}
      </DialogModel>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-5 mb-6">
            <button
              onClick={() => navigate('/appointments')}
              className="flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700 transition-colors"
              aria-label="Back to appointments"
            >
              <FaChevronCircleLeft size={20} />
              Back
            </button>
            <h2 className="text-2xl font-bold text-gray-800">Add New Appointment</h2>
          </div>
          <div>
            {/* {JSON.stringify(newAppointment)} */}
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Appointment Details
            </h3>
            <form onSubmit={handleAddAppointment} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Patient <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={selectedPatient ? `${selectedPatient.fullName}` : 'No patient selected'}
                      disabled
                      className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md bg-gray-100 focus:ring-0"
                      aria-label="Selected patient"
                    />
                    <button
                      type="button"
                      onClick={() => setIsPatientDialogOpen(true)}
                      className="ml-2 p-2 text-sky-600 hover:text-sky-700 transition-colors"
                      aria-label="Select patient"
                    >
                      <FaUserPlus size={20} />
                    </button>
                  </div>
                  {formErrors.patientNo && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.patientNo}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Doctor <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="doctor"
                    value={newAppointment.doctor}
                    onChange={handleInputChange}
                    disabled={!selectedPatient}
                    className={`mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 ${
                      !selectedPatient ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    aria-label="Select doctor"
                  >
                    <option value="">Select a doctor</option>
                    {doctorOptions.map((doctor) => (
                      <option key={doctor.value} value={doctor.value}>
                        {doctor.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.doctor && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.doctor}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className='flex justify-start items-center gap-5'>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="appointmentDate"
                      value={newAppointment.appointmentDate}
                      onChange={handleInputChange}
                      disabled={!selectedPatient}
                      className={`mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 ${
                        !selectedPatient ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                      aria-label="Appointment date"
                    />
                    {formErrors.appointmentDate && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.appointmentDate}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      name="appointmentTime"
                      value={newAppointment.appointmentTime}
                      onChange={handleInputChange}
                      disabled={!selectedPatient}
                      className={`mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 ${
                        !selectedPatient ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                      aria-label="Appointment time"
                    />
                    {formErrors.appointmentTime && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.appointmentTime}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={newAppointment.status}
                    onChange={handleInputChange}
                    disabled={!selectedPatient}
                    className={`mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 ${
                      !selectedPatient ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    aria-label="Appointment status"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              {/* <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  {newAppointment.doctor && newAppointment.appointmentDate && (
                    <div>
                      <AppointmentTimeline
                        appointments={doctorAppointments}
                        selectedDate={newAppointment.appointmentDate}
                        duration={newAppointment.duration}
                        isLoading={isTimelineLoading}
                        setAppointmentTime={setAppointmentTime}
                        slotDurationComp={
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Appointment Slot Duration (minutes)
                            </label>
                            <input
                              type="number"
                              name="duration"
                              value={newAppointment.duration}
                              onChange={handleInputChange}
                              disabled={!selectedPatient}
                              className={`mt-1 w-full p-3 border text-xs border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 ${
                                !selectedPatient ? 'bg-gray-100 cursor-not-allowed' : ''
                              }`}
                              min="1"
                              aria-label="Appointment duration"
                            />
                            {formErrors.duration && (
                              <p className="mt-1 text-xs text-red-600">{formErrors.duration}</p>
                            )}
                          </div>
                        }
                        doctorId={newAppointment.doctorId}
                      />
                    </div>
                  )}
                </div>
              </div> */}
              <div className="grid grid-cols-2 gap-6">
                <div className='col-span-2'>
                  <label className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={newAppointment.notes}
                    onChange={handleInputChange}
                    disabled={!selectedPatient}
                    className={`mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 ${
                      !selectedPatient ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    rows="2"
                    aria-label="Appointment notes"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/appointments')}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-all duration-200 text-sm sm:text-base"
                  aria-label="Cancel adding appointment"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-all duration-200 flex items-center gap-2 text-sm sm:text-base"
                  aria-label="Save appointment"
                  disabled={isLoading || !selectedPatient}
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAppointment;

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
// import { FaSearch, FaArrowLeft, FaPlus, FaPlusCircle } from 'react-icons/fa';
// import moment from 'moment';
// import MessageModel from '../MessageModel';
// import PatientList from '../PatientList';
// import { addAppointment } from '../../functions/patient';
// import AppoinmentPatientList from '../AppoinmentPatientList';

// const AddAppointment = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const selectedDate = location.state?.selectedDate || new Date();

//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterType, setFilterType] = useState('patientName');
//   const [triggerSearch, setTriggerSearch] = useState(0);
//   const [patients, setPatients] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [error, setError] = useState('');
//   const [modal, setModal] = useState({ isOpen: false, message: '', type: 'error' });
//   const [isLoading, setIsLoading] = useState(false);
//   const [newAppointment, setNewAppointment] = useState({
//     patientNo: '',
//     appointmentDate: moment(selectedDate).format('YYYY-MM-DD'),
//     appointmentTime: '',
//     status: 'Scheduled',
//   });
//   const [formErrors, setFormErrors] = useState({});

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setSelectedPatient(null);
//     if (!searchQuery.trim()) {
//       setError('Please enter a search term.');
//       return;
//     }
//     setError('');
//     setTriggerSearch((prev) => prev + 1);
//   };

//   // Update appointment date when selectedDate changes
//   useEffect(() => {
//     setNewAppointment((prev) => ({
//       ...prev,
//       appointmentDate: moment(selectedDate).format('YYYY-MM-DD'),
//     }));
//   }, [selectedDate]);

//   // Handle patient selection
//   const handleSelectPatient = (patient) => {
//     setSelectedPatient(patient);
//     setNewAppointment((prev) => ({
//       ...prev,
//       patientNo: patient.patientNo,
//     }));
//     setFormErrors({});
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewAppointment((prev) => ({ ...prev, [name]: value }));
//     setFormErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   // Validate form
//   const validateForm = () => {
//     const newErrors = {};
//     if (!newAppointment.patientNo) newErrors.patientNo = 'Please select a patient.';
//     if (!newAppointment.appointmentDate) newErrors.appointmentDate = 'Date is required.';
//     if (!newAppointment.appointmentTime) newErrors.appointmentTime = 'Time is required.';
//     setFormErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission
//   const handleAddAppointment = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const payload = {
//       patientId: selectedPatient.patientId,
//       appointmentDate: `${newAppointment.appointmentDate}T${newAppointment.appointmentTime}:00Z`,
//      statusId:1,
//       //status: newAppointment.status,
//     };

//     console.log('selectedPatient',selectedPatient)
//     try {
//       setIsLoading(true);
//    const res=   await addAppointment(payload);
//       console.log('addAppointment',res)
//       if(res.data.error){
//           setModal({
//         isOpen: true,
//         message: res.data.error.message,
//         type: 'error',
//       });
//       return;
//       }
//       setModal({
//         isOpen: true,
//         message: 'Appointment added successfully!',
//         type: 'success',
//       });
//       // Reset form
//       setNewAppointment({
//         patientNo: '',
//         appointmentDate: moment(selectedDate).format('YYYY-MM-DD'),
//         appointmentTime: '',
//         status: 'Scheduled',
//       });
//       setSelectedPatient(null);
//       setPatients([]);
//       setSearchQuery('');
//       setTriggerSearch(0);
//     } catch (err) {
//       setModal({
//         isOpen: true,
//         message: 'Failed to add appointment. Please try again.',
//         type: 'error',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <MessageModel
//         isOpen={modal.isOpen}
//         onClose={() => {
//           setModal({ isOpen: false, message: '', type: 'error' });
//           if (modal.type === 'success') {
//             navigate('/appointments');
//           }
//         }}
//         message={modal.message}
//         type={modal.type}
//       />
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8">
//         <div className="w-full bg-white rounded-2xl shadow-sm p-6">
//           <div className="flex items-center gap-3 mb-6">
//             <button
//               onClick={() => navigate('/appointments')}
//               className="flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-colors"
//               aria-label="Back to appointments"
//             >
//               <FaArrowLeft size={20} />
//               Back
//             </button>
//             <h2 className="text-xl font-bold text-gray-800">Add New Appointment</h2>
//           </div>

//           {/* Patient Search Section */}
//          {/* Patient Search Section */}
//           <div className="mb-8">
//             <form onSubmit={handleSearch} className="space-y-4">
//               <div className="flex flex-wrap gap-4 justify-center mb-4">
//                 {[
//                   { value: 'patientNo', label: 'Patient No' },
//                   { value: 'patientName', label: 'Patient Name'},
//                   { value: 'email', label: 'Email' },
//                   { value: 'mobile', label: 'Mobile' },
//                 ].map((option) => (
//                   <label key={option.value} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
//                     <input
//                       type="radio"
//                       value={option.value}
//                       checked={filterType === option.value}
//                       onChange={(e) => {
//                         setFilterType(e.target.value);
//                         setError('');
//                       }}
//                       className="form-radio text-sky-600 focus:ring-sky-500 h-4 w-4 sm:h-5 sm:w-5"
//                       aria-label={`Search by ${option.label}`}
//                     />
//                     {option.label}
//                   </label>
//                 ))}
//               </div>
//               <div className="flex flex-col md:flex-row md:items-center md:gap-4">
//                 <div className="relative flex-1">
//                   <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => {
//                       setSearchQuery(e.target.value);
//                       setError('');
//                     }}
//                     placeholder={`Search by ${filterType.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition text-sm sm:text-base"
//                     aria-label={`Search patients by ${filterType.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="mt-2 md:mt-0 md:w-auto bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition flex items-center justify-center gap-2 shadow-sm hover:shadow-md text-sm sm:text-base"
//                   aria-label="Search patients"
//                 >
//                   <FaSearch size={16} />
//                   Search
//                 </button>
//                      <button
//                   type="submit"
//                   className="mt-2 md:mt-0 md:w-auto bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition flex items-center justify-center gap-2 shadow-sm hover:shadow-md text-sm sm:text-base"
//                   aria-label="Search patients"
//                 >
//                   <FaPlusCircle size={16} />
//                    New patient for appoinment
//                 </button>
//               </div>
//               {error && (
//                 <p id="search-error" className="text-sm text-red-600 mt-2">
//                   {error}
//                 </p>
//               )}
//             </form>
//             {triggerSearch > 0 && (
//               <div className="mt-6">
//                 <AppoinmentPatientList
//                   searchQuery={searchQuery}
//                   filterType={filterType}
//                   triggerSearch={triggerSearch}
//                   setPatients={setPatients}
//                   onSelectPatient={handleSelectPatient}
//                 />
//               </div>
//             )}
//           </div>

//           {/* Appointment Form Section */}
//                  {/* Appointment Form Section */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">
//               Appointment Details {selectedPatient && `- ${selectedPatient.firstName} ${selectedPatient.lastName}`}
//             </h3>
//             <form onSubmit={handleAddAppointment} className="space-y-4">
//                <div className="flex flex-col md:flex-row md:gap-4">
//                 <div className="flex-1">
           
//                 <label className="block text-sm font-medium text-gray-700">
//                   Patient
//                 </label>
//                 <input
//                   type="text"
//                   value={selectedPatient ? `${selectedPatient.firstName} ${selectedPatient.lastName} (${selectedPatient.patientNo})` : 'No patient selected'}
//                   disabled
//                   className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md bg-gray-100"
//                   aria-label="Selected patient"
//                 />
//                 {formErrors.patientNo && (
//                   <p className="mt-1 text-sm text-red-600">{formErrors.patientNo}</p>
//                 )}
//               </div>

//    <div className="flex-1">


//                 <label className="block text-sm font-medium text-gray-700">
//                   Status
//                 </label>
//                 <select
//                   name="status"
//                   value={newAppointment.status}
//                   onChange={handleInputChange}
//                   disabled={!selectedPatient}
//                   className={`mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 ${
//                     !selectedPatient ? 'bg-gray-100 cursor-not-allowed' : ''
//                   }`}
//                   aria-label="Appointment status"
//                 >
//                   <option value="Scheduled">Scheduled</option>
//                   <option value="Completed">Completed</option>
//                   <option value="Cancelled">Cancelled</option>
//                 </select>
   
//    </div>

//               </div>
//               <div className="flex flex-col md:flex-row md:gap-4">
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Date <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="date"
//                     name="appointmentDate"
//                     value={newAppointment.appointmentDate}
//                     onChange={handleInputChange}
//                     disabled={!selectedPatient}
//                     className={`mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 ${
//                       !selectedPatient ? 'bg-gray-100 cursor-not-allowed' : ''
//                     }`}
//                     aria-label="Appointment date"
//                   />
//                   {formErrors.appointmentDate && (
//                     <p className="mt-1 text-sm text-red-600">{formErrors.appointmentDate}</p>
//                   )}
//                 </div>
//                 <div className="flex-1 mt-4 md:mt-0">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Time <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="time"
//                     name="appointmentTime"
//                     value={newAppointment.appointmentTime}
//                     onChange={handleInputChange}
//                     disabled={!selectedPatient}
//                     className={`mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 ${
//                       !selectedPatient ? 'bg-gray-100 cursor-not-allowed' : ''
//                     }`}
//                     aria-label="Appointment time"
//                   />
//                   {formErrors.appointmentTime && (
//                     <p className="mt-1 text-sm text-red-600">{formErrors.appointmentTime}</p>
//                   )}
//                 </div>
//               </div>
         
//               <div className="flex justify-end gap-4">
//                 <button
//                   type="button"
//                   onClick={() => navigate('/appointments')}
//                   className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-all duration-200 text-sm sm:text-base"
//                   aria-label="Cancel adding appointment"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-all duration-200 flex items-center gap-2 text-sm sm:text-base"
//                   aria-label="Save appointment"
//                   disabled={isLoading || !selectedPatient}
//                 >
//                   {isLoading ? 'Saving...' : 'Save'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddAppointment;