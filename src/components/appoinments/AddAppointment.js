import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaUserPlus, FaClock, FaCheckCircle, FaChevronCircleLeft } from 'react-icons/fa';
import moment from 'moment';
import MessageModel from '../MessageModel';
import AppoinmentPatientList from '../AppoinmentPatientList';
import DialogModel from '../DialogModel';
import { addApPatient, addAppointment, drpDoctors, getapPatients, getPatientAppointments, updateAppointment } from '../../functions/patient';

const AppointmentTimeline = ({ appointments, selectedDate, duration, isLoading, setAppointmentTime, slotDurationComp, doctorId, scheduleStart, scheduleEnd }) => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [newDuration, setNewDuration] = useState('');

  const durationMinutes = parseInt(duration) || 30;
  const currentTime = moment();

const buildTimeSlots = () => {
  const startHour = moment(scheduleStart, 'HH:mm').hour();
  const startMinute = moment(scheduleStart, 'HH:mm').minute();
  const endHour = moment(scheduleEnd, 'HH:mm').hour();
  const endMinute = moment(scheduleEnd, 'HH:mm').minute();
  const startTime = moment(selectedDate).hour(startHour).minute(startMinute);
  const endTime = moment(selectedDate).hour(endHour).minute(endMinute);
  let currentTime = startTime.clone();
  const slots = [];

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

  // Avoid slot generation for past days
  if (moment(selectedDate).isBefore(moment(), 'day')) {
    console.log('Past date selected — skipping slot generation.');
    return [];
  }

  // Keep a simple appointment number counter in time order
  let appointmentCounter = 1;

  while (currentTime.isBefore(endTime)) {
    const bookedSlot = bookedAppointments.find((appt) =>
      appt.start.isSame(currentTime)
    );

    if (bookedSlot) {
      slots.push({
        time: bookedSlot.start.format('h:mm A'),
        isBooked: true,
        patient: bookedSlot.patient,
        duration: bookedSlot.duration,
        status: bookedSlot.status,
        startMoment: bookedSlot.start.clone(),
        appointmentNo: appointmentCounter++,
      });

      currentTime = bookedSlot.start.clone().add(bookedSlot.duration, 'minutes');
    } else {
      const nextBookedStart = bookedAppointments.find((appt) =>
        appt.start.isAfter(currentTime)
      )?.start || endTime;

      const gapMinutes = nextBookedStart.diff(currentTime, 'minutes');
      const slotDuration = Math.min(gapMinutes, durationMinutes);

      if (slotDuration > 0) {
        slots.push({
          time: currentTime.format('h:mm A'),
          isBooked: false,
          patient: null,
          duration: slotDuration,
          status: null,
          startMoment: currentTime.clone(),
          appointmentNo: appointmentCounter++,
        });
      }

      currentTime.add(slotDuration, 'minutes');
    }
  }

  // Ensure proper ordering
  return slots.sort((a, b) => a.startMoment.diff(b.startMoment));
};

const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      setTimeSlots(buildTimeSlots());
    }
    console.log('appointments',appointments)
  }, [appointments, selectedDate, durationMinutes, isLoading, scheduleStart, scheduleEnd]);

  const handleDurationClick = (index) => {
    if (timeSlots[index].status === 'Completed') return;
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

    const bookedAppointmentNos = newTimeSlots
      .filter((slot) => slot.isBooked)
      .map((slot) => slot.appointmentNo);
    let nextAppointmentNo = bookedAppointmentNos.length > 0
      ? Math.max(...bookedAppointmentNos) + 1
      : 1;

    let currentTime = currentSlot.startMoment.clone().add(newDurationValue, 'minutes');
    for (let i = index + 1; i < newTimeSlots.length; i++) {
      if (newTimeSlots[i].isBooked) {
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
        newTimeSlots[i].appointmentNo = nextAppointmentNo++;
        currentTime.add(newTimeSlots[i].duration, 'minutes');
      }
    }

    const updatedSlots = [];
    let currentTimeFill = moment(selectedDate).hour(8).minute(0);
    const endTime = moment(selectedDate).hour(24).minute(0);
    nextAppointmentNo = bookedAppointmentNos.length > 0
      ? Math.max(...bookedAppointmentNos) + 1
      : 1;

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
          updatedSlots.push(slot);
          currentTimeFill = slot.startMoment.clone().add(slot.duration, 'minutes');
        } else {
          slot.appointmentNo = nextAppointmentNo++;
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
  setSelectedSlot(appointmentNo);
  setAppointmentTime(time, appointmentNo);
};


  return (
    <div className="mt-0">
      <div className='flex justify-between items-center'>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Doctor's Schedule</h3>
        <div className='mb-4'>
          {slotDurationComp}
        </div>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500 ">Loading schedule...</p>
      ) : (
        <div className="relative flex overflow-x-auto pb-4">
          
          <div className="flex space-x-2">
            {timeSlots.length === 0 ? (
              <p className="text-sm text-gray-500">No appointments available for this doctor and date.</p>
            ) : (
              timeSlots.map((slot, index) => (
                <div
                  key={index}
        className={`flex-shrink-0 w-36 rounded-lg text-center transition-all duration-200 border shadow-sm hover:shadow-md
  ${
    slot.isBooked
      ? slot.status === 'Completed'
        ? 'bg-sky-100 border-sky-300 text-sky-700'
        : 'bg-red-100 border-red-300 text-red-700'
      : 'bg-green-100 border-green-300 text-green-700'
  }

`}
                >
                  <div className={`${selectedSlot === slot.appointmentNo ? 'border-4 border-blue-500' : ''} p-3 rounded-lg`}>
                  <p className="text-sm font-semibold">{slot.time}</p>
                  <p className="text-xs">
                    {slot.isBooked
                      ? `${slot.status === 'Completed' ? 'Completed' : 'Booked'}`
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
                      //  onClick={() => handleDurationClick(index)}
                      >
                        ({slot.duration} min)
                      </span>
                    )}
                  </p>
                  {!slot.isBooked && (
                    <button
                      onClick={() => handleSetTime(slot.time, slot.appointmentNo)}
                      type="button"
                      className="mt-2 px-2 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                      aria-label={`Set appointment time to ${slot.time} with appointment number ${slot.appointmentNo}`}
                    >
                      <span className='flex gap-1 items-center'> <FaClock size={12} /> Select</span>
                    </button>
                  )}
                </div>
                 </div>
              ))
            )}
           
          </div>
        </div>
      )}
    </div>
  );
};

const AddAppointment = ({ selectedDate, onHide, refreshPatientList, setAppointmentSuccessDialog,reloadAddAppoinmentPanel }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { appointment } = location.state || {};

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('patientName');
  const [triggerSearch, setTriggerSearch] = useState(0);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
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
    statusId: 1,
    doctor: '',
    doctorId: '',
    notes: '',
    duration: '30',
  });
  const [scheduleStart, setScheduleStart] = useState('8:00');
  const [scheduleEnd, setScheduleEnd] = useState('23:59');
  const [formErrors, setFormErrors] = useState({});
  const [newPatient, setNewPatient] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [patientFormErrors, setPatientFormErrors] = useState({});
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]);

  const isEditMode = appointment ? true : false;

  const loadDrpDoctors = async () => {
    const occupations = await drpDoctors();
    setDoctorOptions(occupations.data.results[0]);
  };

  const fetchAppointments = async () => {
    if (!selectedDoctor || !newAppointment.appointmentDate) return;

    setIsTimelineLoading(true);
const startOfDay = moment(newAppointment.appointmentDate).startOf('day').format('YYYY-MM-DDTHH:mm:ss');
const endOfDay = moment(newAppointment.appointmentDate).endOf('day').format('YYYY-MM-DDTHH:mm:ss');

    const payload = {
      doctorId: selectedDoctor,
      appointmentDateStart: startOfDay,
      appointmentDateEnd: endOfDay,
    };

    try {
      const response = await getPatientAppointments(payload);
      const results = response.data.results[0];
      setDoctorAppointments(results);
    } catch (err) {
      setModal({
        isOpen: true,
        message: 'Failed to load appointments. Please try again.',
        type: 'error',
      });
      console.error('Error fetching appointments:', err);
    } finally {
      setIsTimelineLoading(false);
    }
  };

  useEffect(() => {
    setSelectedDoctor('');

    loadDrpDoctors();
    console.log('reload apponment panel')
  }, [reloadAddAppoinmentPanel]);

  useEffect(() => {
    fetchAppointments();
    validateForm();
  }, [selectedDoctor, newAppointment.appointmentDate]);

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
      [name]: value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleScheduleStartChange = (e) => {
    setScheduleStart(e.target.value);
  };

  const handleScheduleEndChange = (e) => {
    setScheduleEnd(e.target.value);
  };

  const handlePatientInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({ ...prev, [name]: value }));
    setPatientFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    console.log('selectedPatient vali',selectedPatient)
    const newErrors = {};
    if (!newAppointment.appointmentDate) newErrors.appointmentDate = 'Date is required.';
    if (!newAppointment.appointmentTime) newErrors.appointmentTime = 'Time is required.';
    if (!selectedDoctor) newErrors.doctor = 'Please select a doctor.';
    if (!selectedPatient) newErrors.patientNo = 'Please select a patient.';
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
      validateForm();
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
      doctorId: selectedDoctor,
      notes: newAppointment.notes,
      duration: parseInt(newAppointment.duration),
      appointmentNo: newAppointment.appointmentNo, // Include appointmentNo from selected time slot
    };

    console.log('apppppoooo payload', payload);
    try {
      setIsLoading(true);

      if (!isEditMode) {
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

        refreshPatientList();

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
      } else {
        const res = await updateAppointment(appointment.appointmentId, payload);
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
      }
      setSelectedPatient(null);
      setPatients([]);
      setSearchQuery('');
      setTriggerSearch(0);
      setDoctorAppointments([]);
      onHide();
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

      <div className="bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center min-w-[800px]">
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
              <div className='grid grid-cols-2 gap-5'>
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

          
              </div>
                  <div className="flex justify-center">
                {/* <button
                  type="button"
                  onClick={() => setShowNewPatientForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-all duration-200 text-sm"
                  aria-label="Back to patient search"
                >
                  Back
                </button> */}
                <button
                  type="submit"
                  className="px-8 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-all duration-200 flex items-center gap-2"
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
        <div className="bg-white rounded-2xl">
  
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Appointment Details
            </h3>
            
            <form onSubmit={handleAddAppointment} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Doctor <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="doctor"
                    value={selectedDoctor}
                    onChange={(e) => {
                      setSelectedDoctor(e.target.value);
                    }}
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
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
                   <div className='flex justify-start items-center gap-5'>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="appointmentDate"
                      value={newAppointment.appointmentDate}
                      onChange={(e) => {
                        setNewAppointment((prev) => ({
                          ...prev,
                          appointmentDate: e.target.value,
                        }));
                      }}
                      disabled={!selectedDoctor}
                      min={new Date().toISOString().split("T")[0]}
                      className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
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
                      disabled={!selectedDoctor}
                      className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      aria-label="Appointment time"
                    />
                    {formErrors.appointmentTime && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.appointmentTime}</p>
                    )}
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

              
              </div>
              <div className="grid grid-cols-2 gap-6">
             
            <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Patient <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={selectedPatient ? `${selectedPatient.fullName}` : 'No patient selected'}
                      readOnly
                      className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md bg-gray-100 focus:ring-0"
                      aria-label="Selected patient"
                    />
                   <button
  type="button"
  onClick={() => setIsPatientDialogOpen(true)}
  className={`ml-2 p-2 text-sky-600 hover:text-sky-700 transition-colors 
              disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:text-gray-400`}
  aria-label="Select patient"
  disabled={!selectedDoctor}
>
  <FaUserPlus size={20} />
</button>
                  </div>

                  {formErrors.patientNo && selectedDoctor && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.patientNo}</p>
                  )}
                </div>


     <div className=''>
                  <label className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={newAppointment.notes}
                    onChange={handleInputChange}
                  //  disabled={!selectedPatient}
                    className={`mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200`}
                    rows="2"
                    aria-label="Appointment notes"
                  />
                </div>


              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  {selectedDoctor && newAppointment.appointmentDate && (
                    <div className='w-full'>
                 
                      {isTimelineLoading ? <p>Loading...</p> : <AppointmentTimeline
                        appointments={doctorAppointments}
                        selectedDate={newAppointment.appointmentDate}
                        duration={newAppointment.duration}
                        isLoading={isTimelineLoading}
                        setAppointmentTime={setAppointmentTime}
                        slotDurationComp={
                               <div className="flex gap-4 mb-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Schedule Start
                          </label>
                          <input
                            type="time"
                            value={scheduleStart}
                            onChange={handleScheduleStartChange}
                            className="mt-1 w-full p-2 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                            aria-label="Schedule start time"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Schedule End
                          </label>
                          <input
                            type="time"
                            value={scheduleEnd}
                            onChange={handleScheduleEndChange}
                            className="mt-1 w-full p-2 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                            aria-label="Schedule end time"
                          />
                        </div>

                              <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Set Appointment Duration
                            </label>
                            <input
                              type="number"
                              name="duration"
                              value={newAppointment.duration}
                              onChange={handleInputChange}
                             // disabled={!selectedPatient}
                              className={`mt-1 w-full p-3 border text-xs border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200`}
                              min="1"
                              aria-label="Appointment duration"
                            />
                            {formErrors.duration && (
                              <p className="mt-1 text-xs text-red-600">{formErrors.duration}</p>
                            )}
                          </div>
                      </div>
                    
                        }
                        doctorId={newAppointment.doctorId}
                        scheduleStart={scheduleStart}
                        scheduleEnd={scheduleEnd}
                      />}
                    </div>
                  )}
                </div>
              </div>
     
              <div className="flex justify-center gap-4">
                {/* <button
                  type="button"
                  onClick={() => onHide()}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-all duration-200 text-sm sm:text-base"
                  aria-label="Cancel adding appointment"
                >
                  Cancel
                </button> */}
                <button
                  type="submit"
                  className="px-10 py-4 bg-sky-600 hover:cursor-pointer text-white rounded-md hover:bg-sky-700 transition-all duration-200 flex items-center gap-2 text-lg sm:text-base"
                  aria-label="Save appointment"
                  disabled={isLoading}
                >
                  {isLoading ? 'Booking ...' : 'Book Appointment'}
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
