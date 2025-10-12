import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import LoadingSpinner from '../LoadingSpinner';
import MessageModel from '../MessageModel';
import { FaCalendarAlt, FaCheckCircle, FaFilter, FaPlus } from 'react-icons/fa';
import { drpDoctors, getPatientAppointments, updateAppointment } from '../../functions/patient';
import ConfirmDialog from '../dialog/ConfirmDialog';
import DialogModel from '../DialogModel';
import AddAppointment from './AddAppointment';

const AppointmentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [dailyAppointments, setDailyAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, message: '', type: 'error' });
  const [statusFilter, setStatusFilter] = useState('all');
  const [confirmCancelStatus, setConfirmCancelStatus] = useState(false);
  const [confirmCompleteStatus, setConfirmCompleteStatus] = useState(false);
  const [confirmScheduledStatus, setConfirmScheduledStatus] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false);

    const [refreshPatientList, setRefreshPatientList] = useState('');
      const [appointmentSuccessDialog, setAppointmentSuccessDialog] = useState({
        isOpen: false,
        doctorName: '',
        patientName: '',
        appointmentNo: '',
        referenceNo: '',
        date: '',
        time: '',
      });

  const [loadList,setLoadlist]=useState('')




  const _refreshPatientList=()=>{
    
    console.log('refresshinggg..')
    setRefreshPatientList(Math.random());

  }
  const confirmCancelAppointment = async () => {
    await updateAppointmentStatus(3, selectedAppointment);
    setConfirmCancelStatus(false);
  };

  const cancelConfirmCancelAppointment = () => {
    setConfirmCancelStatus(false);
    setSelectedAppointment(null);
  };

  const confirmCompleteAppointment = async () => {
    await updateAppointmentStatus(2, selectedAppointment);
    setConfirmCompleteStatus(false);
  };

  const cancelConfirmCompleteAppointment = () => {
    setConfirmCompleteStatus(false);
    setSelectedAppointment(null);
  };

  const confirmScheduledAppointment = async () => {
    await updateAppointmentStatus(1, selectedAppointment);
    setConfirmScheduledStatus(false);
  };

  const cancelConfirmScheduledAppointment = () => {
    setConfirmScheduledStatus(false);
    setSelectedAppointment(null);
  };


  const updateAppointmentStatus = async (statusId, selectedAppointment) => {
    if (!selectedAppointment) return;

    const payload = {
      patientId: selectedAppointment.patientId,
      appointmentDate: `${selectedAppointment.appointmentDate}T${selectedAppointment.appointmentTime}:00Z`,
      statusId: statusId,
      doctorId: selectedAppointment.doctorId,
      notes: selectedAppointment.notes,
      duration: parseInt(selectedAppointment.duration),
    };

    try {
      console.log('updateAppointmentStatus:', payload);
      setIsLoading(true);
      const res = await updateAppointment(selectedAppointment.appointmentId, payload);
      if (res.data.error) {
        setModal({
          isOpen: true,
          message: res.data.error.message,
          type: 'error',
        });
        return;
      }

      if (res.data.outputValues.responseStatus === 'failed') {
        setModal({
          isOpen: true,
          message: res.data.outputValues.outputMessage,
          type: 'warning',
        });
        return;
      }

      await fetchAppointments(selectedDate);
    } catch (err) {
      setModal({
        isOpen: true,
        message: 'Failed to update appointment. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
      setSelectedAppointment(null);
    }
  };

  const loadDrpDoctors = async () => {
    const occupations = await drpDoctors();
    setDoctorOptions(occupations.data.results[0]);
  };

  const loadDropdowns = () => {
    loadDrpDoctors();
  };

  useEffect(() => {
    loadDropdowns();
  }, []);

  const fetchAppointments = async (date) => {
    if (!selectedDoctor) return;

    setIsLoading(true);
    const startOfMonth = moment(date).startOf('month').format('YYYY-MM-DD');
    const endOfMonth = moment(date).endOf('month').format('YYYY-MM-DD');

    const payload = {
      startDate: startOfMonth,
      endDate: endOfMonth,
      status: statusFilter !== 'all' ? statusFilter : null,
      doctorId: selectedDoctor ? selectedDoctor : null,
    };

    try {
      const response = await getPatientAppointments(payload);
      const results = response.data.results[0] || [];
      setAppointments(results);
    } catch (err) {
      setModal({
        isOpen: true,
        message: 'Failed to load appointments. Please try again.',
        type: 'error',
      });
      console.error('Error fetching appointments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const selectedDateStr = moment(selectedDate).format('YYYY-MM-DD');
    let filteredAppointments = appointments.filter((appt) =>
      moment(appt.appointmentDate).isSame(selectedDateStr, 'day')
    );
    if (statusFilter !== 'all') {
      filteredAppointments = filteredAppointments.filter(
        (appt) => appt.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    setDailyAppointments(filteredAppointments);
  }, [selectedDate, appointments, statusFilter]);

  useEffect(() => {
    fetchAppointments(selectedDate);
  }, [moment(selectedDate).format('YYYY-MM'), statusFilter, selectedDoctor,loadList,refreshPatientList]);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = moment(date).format('YYYY-MM-DD');
      const count = appointments.filter((appt) =>
        moment(appt.appointmentDate).isSame(dateStr, 'day')
      ).length;
      if (count > 0) {
        return (
          <div
            className="absolute top-1 right-1 group"
            title={`${count} appointment${count > 1 ? 's' : ''} on ${moment(date).format('MMM D')}`}
          >
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-sm transform transition-transform group-hover:scale-110">
              {count}
            </span>
          </div>
        );
      }
    }
    return null;
  };

  const handleDropdownChange = (e) => {
    const { value } = e.target;
    setSelectedDoctor(value);
  };

  const getRowBackgroundColor = (status) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'bg-blue-100';
      case 'completed':
        return 'bg-green-100';
      case 'cancelled':
        return 'bg-red-100';
      default:
        return 'bg-white';
    }
  };

  return (
    <>
      <MessageModel
        isOpen={modal.isOpen}
        onClose={() => setModal({ isOpen: false, message: '', type: 'error' })}
        message={modal.message}
        type={modal.type}
      />
      <ConfirmDialog
        isVisible={confirmCancelStatus}
        message={"Do you want to cancel the appointment?"}
        onConfirm={confirmCancelAppointment}
        onCancel={cancelConfirmCancelAppointment}
        title={"Confirm Cancel"}
        severity={"warning"}
      />
      <ConfirmDialog
        isVisible={confirmCompleteStatus}
        message={"Do you want to complete the appointment?"}
        onConfirm={confirmCompleteAppointment}
        onCancel={cancelConfirmCompleteAppointment}
        title={"Confirm Complete"}
        severity={"warning"}
      />
      <ConfirmDialog
        isVisible={confirmScheduledStatus}
        message={"Do you want to set the appointment to scheduled?"}
        onConfirm={confirmScheduledAppointment}
        onCancel={cancelConfirmScheduledAppointment}
        title={"Confirm Scheduled"}
        severity={"warning"}
      />
      <DialogModel
        header="Add New Appointment"
        visible={isAddAppointmentOpen}
        onHide={() => setIsAddAppointmentOpen(false)}
       // width="80%"
       // height="90%"
      >
        <AddAppointment
          selectedDate={selectedDate}
           onHide={() => setIsAddAppointmentOpen(false)}
         // setIsAddAppointmentOpen={setIsAddAppointmentOpen}
         // fetchAppointments={() => fetchAppointments(selectedDate)}
         setAppointmentSuccessDialog={setAppointmentSuccessDialog}
          refreshPatientList={()=>_refreshPatientList()}
          reloadAddAppoinmentPanel={isAddAppointmentOpen}
        />
      </DialogModel>
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
            {/* <button
              type="button"
              onClick={() => {
                setAppointmentSuccessDialog({ isOpen: false, doctorName: '', patientName: '', appointmentNo: '', date: '', time: '' });
                navigate('/appointments');
              }}
              className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-all duration-200 flex items-center gap-2 text-sm"
              aria-label="Back to appointments"
            >
              Back to Appointments
            </button> */}
          </div>
        </div>
      </DialogModel>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-start justify-center px-4 sm:px-6 lg:px-8 py-4">
        <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-4 bg-gradient-to-r from-sky-600 to-sky-500 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaCalendarAlt size={24} />
              <h2 className="text-xl font-bold">Appointment Calendar</h2>
            </div>
            {/* {JSON.stringify(refreshPatientList)} */}
            <div className="flex items-center gap-4">
              <div className='flex justify-start items-center gap-4'>
                <select
                  name="doctor"
                  value={selectedDoctor}
                  onChange={handleDropdownChange}
                  className="mt-1 w-full p-3 border text-gray-800 text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  aria-label="Select doctor"
                >
                  <option value="">Select a doctor</option>
                  {doctorOptions.map((doctor) => (
                    <option key={doctor.value} value={doctor.value}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setIsAddAppointmentOpen(true)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="Add new appointment"
              >
                <FaPlus size={16} />
                Add Appointment
              </button>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/5 p-6 border-r border-gray-100">
              {isLoading ? (
                <div className="flex justify-center items-center h-96">
                  <LoadingSpinner />
                </div>
              ) : (
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  tileContent={tileContent}
                  className="w-full border-none rounded-lg bg-gray-50"
                  calendarType="gregory"
                />
              )}
            </div>
            <div className="lg:w-3/5 py-6 bg-gray-50">
              <div className='flex justify-between items-center mb-4'>
                <h3 className="text-lg font-semibold text-gray-800 px-6">
                  Appointments on {moment(selectedDate).format('MMMM D, YYYY')}
                </h3>
                <div className="relative">
                  <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white bg-opacity-20 border border-white rounded-md text-gray-700 focus:ring-2 focus:ring-white focus:outline-none transition"
                    aria-label="Filter appointments by status"
                  >
                    <option value="all">All Statuses</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <LoadingSpinner />
                </div>
              ) : dailyAppointments.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg shadow-inner">
                  <p className="text-gray-500 text-sm">
                    No appointments scheduled for this date.
                  </p>
                </div>
              ) : (
                <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
                  <table className="min-w-full bg-white rounded-lg shadow-sm">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                          Ref No.
                        </th>
                        <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                          Appointment No.
                        </th>
                        <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                          Patient Name
                        </th>
                        <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                          Mobile No
                        </th>
                        <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                          Time
                        </th>
                        <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dailyAppointments.map((appt) => (
                        <tr
                          key={appt.appointmentId}
                          className={`transition-all duration-200 hover:cursor-pointer ${getRowBackgroundColor(appt.status)}`}
                        >
                          <td className="py-3 px-4 border-b text-gray-800 text-sm">
                            {appt.referenceNo}
                          </td>
                          <td className="py-3 px-4 border-b text-gray-800 text-sm">
                            # {appt.appointmentNo}
                          </td>
                          <td className="py-3 px-4 border-b text-gray-800 text-sm">
                            {`${appt.firstName} ${appt.lastName}`}
                          </td>
                          <td className="py-3 px-4 border-b text-gray-800 text-sm">
                            {appt.mobileNo}
                          </td>
                          <td className="py-3 px-4 border-b text-gray-800 text-sm">
                            {moment(appt.appointmentDate).format('h:mm A')}
                          </td>
                          <td className="py-3 px-4 border-b">
                            <select
                              value={appt.status}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === 'Scheduled') {
                                  setConfirmScheduledStatus(true);
                                  setSelectedAppointment(appt);
                                } else if (value === 'Completed') {
                                  setConfirmCompleteStatus(true);
                                  setSelectedAppointment(appt);
                                } else if (value === 'Cancelled') {
                                  setConfirmCancelStatus(true);
                                  setSelectedAppointment(appt);
                                }
                              }}
                              className="text-sm text-sky-600 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-500 hover:bg-gray-100 transition-colors"
                              aria-label="Update appointment status"
                            >
                              <option value="" disabled>
                                Update Status
                              </option>
                              <option value="Scheduled">Scheduled</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .react-calendar {
          background: transparent;
          border: none;
          font-family: 'Inter', sans-serif;
        }
        .react-calendar__tile {
          position: relative;
          padding: 12px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        .react-calendar__tile:hover {
          background: #e6f3ff !important;
          transform: scale(1.05);
        }
        .react-calendar__tile--active {
          background: linear-gradient(to right, #38a169, #2f855a) !important;
          color: white !important;
          border-radius: 8px;
        }
        .react-calendar__tile--hasActive {
          background: #e6fffa !important;
        }
        .react-calendar__navigation {
          margin-bottom: 1rem;
          background: #f7fafc;
          border-radius: 8px;
          padding: 0.5rem;
        }
        .react-calendar__navigation button {
          color: #2d3748;
          font-weight: 600;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 6px;
        }
        .react-calendar__navigation button:hover {
          background: #e2e8f0;
        }
        .react-calendar__month-view__days__day--weekend {
          color: #e53e3e;
        }
        .react-calendar__month-view__days__day--neighboringMonth {
          color: #a0aec0;
        }
      `}</style>
    </>
  );
};

export default AppointmentCalendar;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import moment from 'moment';
// import LoadingSpinner from '../LoadingSpinner';
// import MessageModel from '../MessageModel';
// import { FaCalendarAlt, FaEdit, FaFilter, FaPlus, FaStopCircle } from 'react-icons/fa';
// import { drpDoctors, getPatientAppointments, updateAppointment } from '../../functions/patient';
// import ConfirmDialog from '../dialog/ConfirmDialog';
// //import { getPatientAppointments } from '../../data/mockData';

// const AppointmentCalendar = () => {
//   const navigate = useNavigate();
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [appointments, setAppointments] = useState([]);
//   const [dailyAppointments, setDailyAppointments] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [modal, setModal] = useState({ isOpen: false, message: '', type: 'error' });
//   const [statusFilter, setStatusFilter] = useState('all');

//   const [confirmCancelStatus, setConfirmCancelStatus] = useState(false);
//   const [confirmCompleteStatus, setConfirmCompleteStatus] = useState(false);

//     const [selectedDoctor, setSelectedDoctor] = useState('');
//   const [doctorOptions, setDoctorOptions] = useState([]);

//       const [selectedAppoinment, setSelectedAppoinment] = useState(null);



// const confirmCancelAppoinment=async()=>{
//   updateAppoinmentStatus(3,selectedAppoinment)
// }

// const cancelconfirmCancelAppoinment=async()=>{
//   setConfirmCancelStatus(false);
// }

// const confirmCompleteAppoinment=async()=>{

//   updateAppoinmentStatus(2,selectedAppoinment)

// }


// const updateAppoinmentStatus = async (stautusId,selectedAppoinment) => {

 

//     const payload = {
//       patientId: selectedAppoinment.patientId,
//       appointmentDate: `${selectedAppoinment.appointmentDate}T${selectedAppoinment.appointmentTime}:00Z`,
//       statusId: stautusId,
//       doctorId: selectedAppoinment.doctorId,
//       notes: selectedAppoinment.notes,
//       duration: parseInt(selectedAppoinment.duration),
//     };

//     try {
//       console.log('updateapppionmentstatus:',payload)
//       setIsLoading(true);

 

      
//      const res = await updateAppointment(selectedAppoinment.appointmentId,payload);
//       if (res.data.error) {
//         setModal({
//           isOpen: true,
//           message: res.data.error.message,
//           type: 'error',
//         });
//         setIsLoading(false);
//         return;
//       }

//       if (res.data.outputValues.responseStatus === 'failed') {
//         setModal({
//           isOpen: true,
//           message: res.data.outputValues.outputMessage,
//           type: 'warning',
//         });
//         setIsLoading(false);
//         return;
//       }
    
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


// const cancelconfirmCompleteAppoinment=async()=>{
//   setConfirmCompleteStatus(false);
// }

//   const loadDrpDoctors = async () => {
//     const occupations = await drpDoctors();
//     console.log('occupatoins',occupations)
//     setDoctorOptions(occupations.data.results[0]);
//   };

//   const loadDropdowns=()=>{
//     loadDrpDoctors();
//   }

//   useEffect(()=>{
//     loadDropdowns();
//   },[])
//   // Fetch appointments for the current month
//   const fetchAppointments = async (date) => {
  
//     if(!selectedDoctor){
// return;
//     }

//       setIsLoading(true);

//     const startOfMonth = moment(date).startOf('month').format('YYYY-MM-DD');
//     const endOfMonth = moment(date).endOf('month').format('YYYY-MM-DD');

//     const payload = {
//       startDate: startOfMonth,
//       endDate: endOfMonth,
//       status: statusFilter !== 'all' ? statusFilter : null,
//       doctorId:selectedDoctor?selectedDoctor:null
//     };

//     try {
//       const response = await getPatientAppointments(payload);
//       console.log('getPatientAppointments',response)
//       const results = response.data.results[0] || [];
//       setAppointments(results);
//     } catch (err) {
//       setModal({
//         isOpen: true,
//         message: 'Failed to load appointments. Please try again.',
//         type: 'error',
//       });
//       console.error('Error fetching appointments:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Update daily appointments when date or filter changes
//   useEffect(() => {
//     const selectedDateStr = moment(selectedDate).format('YYYY-MM-DD');
//     let filteredAppointments = appointments.filter((appt) =>
//       moment(appt.appointmentDate).isSame(selectedDateStr, 'day')
//     );
//     if (statusFilter !== 'all') {
//       filteredAppointments = filteredAppointments.filter(
//         (appt) => appt.status.toLowerCase() === statusFilter.toLowerCase()
//       );
//     }
//     setDailyAppointments(filteredAppointments);
//   }, [selectedDate, appointments, statusFilter]);

//   // Fetch appointments when month or status filter changes
//   useEffect(() => {
//     fetchAppointments(selectedDate);
//   }, [moment(selectedDate).format('YYYY-MM'), statusFilter,selectedDoctor]);

//   // Calendar tile content with appointment count badges
//   const tileContent = ({ date, view }) => {
//     if (view === 'month') {
//       const dateStr = moment(date).format('YYYY-MM-DD');
//       const count = appointments.filter((appt) =>
//         moment(appt.appointmentDate).isSame(dateStr, 'day')
//       ).length;
//       if (count > 0) {
//         return (
//           <div
//             className="absolute top-1 right-1 group"
//             title={`${count} appointment${count > 1 ? 's' : ''} on ${moment(date).format('MMM D')}`}
//           >
//             <span className="bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-sm transform transition-transform group-hover:scale-110">
//               {count}
//             </span>
//           </div>
//         );
//       }
//     }
//     return null;
//   };

//   const handleDropdownChange = (e) => {
//     const { name, value } = e.target;
//     setSelectedDoctor(value );
//   };


//   return (
//     <>
//       <MessageModel
//         isOpen={modal.isOpen}
//         onClose={() => setModal({ isOpen: false, message: '', type: 'error' })}
//         message={modal.message}
//         type={modal.type}
//       />

//                       <ConfirmDialog
//                 isVisible={confirmCancelStatus}
//                 message={"Do you want cancel the appoinment?"}
//                 onConfirm={confirmCancelAppoinment}
//                 onCancel={cancelconfirmCancelAppoinment}
//                 title={"Confirm Cancel"}
//                 severity={"warning"}
//               />

//                                   <ConfirmDialog
//                 isVisible={confirmCompleteStatus}
//                 message={"Do you want complete the appoinment?"}
//                 onConfirm={confirmCompleteAppoinment}
//                 onCancel={cancelconfirmCompleteAppoinment}
//                 title={"Confirm Complete"}
//                 severity={"warning"}
//               />


//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-start justify-center px-4 sm:px-6 lg:px-8 py-4">
//         <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden">
//           <div className="px-4 py-4 bg-gradient-to-r from-sky-600 to-sky-500 text-white flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <FaCalendarAlt size={24} />
//               <h2 className="text-xl font-bold">Appointment Calendar</h2>
//             </div>
//             {JSON.stringify(confirmCancelStatus)}
//             <div className="flex items-center gap-4">
//                     <div className='flex justify-start items-center gap-4'>
//                   {/* <label className="block text-sm font-medium text-white w-fit">
//                     Doctor <span className="text-red-500"></span>
//                   </label> */}
//                   <select
//                     name="doctor"
//                     value={selectedDoctor}
//                     onChange={handleDropdownChange}
//                     className={`mt-1 w-full p-3 border text-gray-800 text-sm border-gray-300 rounded-md 
//                       focus:ring-2 focus:ring-sky-500 focus:border-sky-500 
//                       transition-all duration-200 `}
//                     aria-label="Select doctor"
//                   >
//                     <option value="">Select a doctor</option>
//                     {doctorOptions.map((doctor) => (
//                       <option key={doctor.value} value={doctor.value}>
//                         {doctor.name}
//                       </option>
//                     ))}
//                   </select>
            
//                 </div>
//               <button
//                 onClick={() => navigate('/add-appointment', { state: { selectedDate } })}
//                 className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
//                 aria-label="Add new appointment"
//               >
//                 <FaPlus size={16} />
//                 Add Appointment
//               </button>
//             </div>
//           </div>
//           <div className="flex flex-col lg:flex-row">
//             {/* Calendar Section */}
//             <div className="lg:w-2/5 p-6 border-r border-gray-100">
//               {isLoading ? (
//                 <div className="flex justify-center items-center h-96">
//                   <LoadingSpinner />
//                 </div>
//               ) : (
//                 <Calendar
//                   onChange={setSelectedDate}
//                   value={selectedDate}
//                   tileContent={tileContent}
//                   className="w-full border-none rounded-lg bg-gray-50"
//                   calendarType="gregory"
//                 />
//               )}
//             </div>
//             {/* Daily Appointments Section */}
//             <div className="lg:w-3/5 py-6 bg-gray-50">
//             <div className='flex justify-between items-center mb-4'>
//               <h3 className="text-lg font-semibold text-gray-800  px-6">
//                 Appointments on {moment(selectedDate).format('MMMM D, YYYY')}
//               </h3>
//               {/* {JSON.stringify(selectedDoctor)} */}
        
//                   <div className="relative">
//                 <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200" />
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="pl-10 pr-4 py-2 bg-white bg-opacity-20 border border-white rounded-md text-gray-700 focus:ring-2 focus:ring-white focus:outline-none transition"
//                   aria-label="Filter appointments by status"
//                 >
//                   <option value="all">All Statuses</option>
//                   <option value="scheduled">Scheduled</option>
//                   <option value="completed">Completed</option>
//                   <option value="cancelled">Cancelled</option>
//                 </select>
//               </div>

//               </div>
//               {isLoading ? (
//                 <div className="flex justify-center items-center h-64">
//                   <LoadingSpinner />
//                 </div>
//               ) : dailyAppointments.length === 0 ? (
//                 <div className="text-center py-10 bg-white rounded-lg shadow-inner">
//                   <p className="text-gray-500 text-sm">
//                     No appointments scheduled for this date.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
//                   <table className="min-w-full bg-white rounded-lg shadow-sm">
//                     <thead className="bg-gray-100 sticky top-0">
//                       <tr>
//                             <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
//                           Ref No.
//                         </th>
//                         <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
//                           Appoinment No.
//                         </th>
//                         <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
//                           Patient Name
//                         </th>
                      
//                         <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
//                           Mobile No
//                         </th>
//                         <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
//                           Time
//                         </th>
//                         <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
//                           Status
//                         </th>
//                             <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                          
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {dailyAppointments.map((appt) => (
//                         <tr
//                           key={appt.appointmentId}
//                           className="hover:bg-blue-50 transition-all duration-200 transform hover:-translate-y-0.5"
//                         >
//                                    <td className="py-3 px-4 border-b text-gray-800 text-sm">
//                             {appt.referenceNo}
//                           </td>
//                           <td className="py-3 px-4 border-b text-gray-800 text-sm">
//                             # {appt.appointmentNo}
//                           </td>
                      
//                           <td className="py-3 px-4 border-b text-gray-800 text-sm">
//                             {`${appt.firstName} ${appt.lastName}`}
//                           </td>
                        
//                           <td className="py-3 px-4 border-b text-gray-800 text-sm">
//                             {appt.mobileNo}
//                           </td>
//                           <td className="py-3 px-4 border-b text-gray-800 text-sm">
//                             {moment(appt.appointmentDate).format('h:mm A')}
//                           </td>
//                           <td className="py-3 px-4 border-b">
//                             <span
//                               className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
//                                 appt.status.toLowerCase() === 'scheduled'
//                                   ? 'bg-blue-100 text-blue-700'
//                                   : appt.status.toLowerCase() === 'completed'
//                                   ? 'bg-green-100 text-green-700'
//                                   : 'bg-red-100 text-red-700'
//                               }`}
//                             >
//                               {appt.status}
//                             </span>
//                           </td>
//           <td className="py-3 px-4 border-b">
//             <select
//               onChange={(e) =>
//                    {}
//               }
//               className="text-sm text-sky-600 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-500 hover:bg-gray-100 transition-colors"
//               aria-label="Update appointment status"
//               defaultValue=""
//             >
//               <option
//                 value=""
//                 disabled
//                 onClick={() =>{}
//                 }
//               >
//                 Update Status
//               </option>
//               {/* <option
//                 value="Scheduled"
//                 onClick={() =>
//                {
//                 //setStatusScheduled(true);
//                }
//                 }
//               >
//                 Scheduled
//               </option> */}
//               <option
//                 value="Completed"
//                 onClick={() =>{
//                   setConfirmCompleteStatus(true);
//                   setSelectedAppoinment(appt);
//                 }
//                 }
//               >
//                 Completed
//               </option>
//               <option
//                 value="Cancelled"
//                 onClick={() =>
//                 {
//                   setConfirmCancelStatus(true);
//                       setSelectedAppoinment(appt);
//                 }}
//               >
//                 Cancelled
//               </option>
//             </select>
//           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <style jsx>{`
//         .react-calendar {
//           background: transparent;
//           border: none;
//           font-family: 'Inter', sans-serif;
//         }
//         .react-calendar__tile {
//           position: relative;
//           padding: 12px;
//           border-radius: 8px;
//           transition: all 0.2s ease;
//         }
//         .react-calendar__tile:hover {
//           background: #e6f3ff !important;
//           transform: scale(1.05);
//         }
//         .react-calendar__tile--active {
//           background: linear-gradient(to right, #38a169, #2f855a) !important;
//           color: white !important;
//           border-radius: 8px;
//         }
//         .react-calendar__tile--hasActive {
//           background: #e6fffa !important;
//         }
//         .react-calendar__navigation {
//           margin-bottom: 1rem;
//           background: #f7fafc;
//           border-radius: 8px;
//           padding: 0.5rem;
//         }
//         .react-calendar__navigation button {
//           color: #2d3748;
//           font-weight: 600;
//           font-size: 1rem;
//           padding: 0.5rem 1rem;
//           border-radius: 6px;
//         }
//         .react-calendar__navigation button:hover {
//           background: #e2e8f0;
//         }
//         .react-calendar__month-view__days__day--weekend {
//           color: #e53e3e;
//         }
//         .react-calendar__month-view__days__day--neighboringMonth {
//           color: #a0aec0;
//         }
//       `}</style>
//     </>
//   );
// };

// export default AppointmentCalendar;