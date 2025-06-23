import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

import LoadingSpinner from './LoadingSpinner';
import MessageModel from './MessageModel';
import { FaCalendarAlt, FaFilter, FaPlus } from 'react-icons/fa';
import { addPatientAppointment, getPatientAppointments, getPatients } from '../data/mockData';

const AppointmentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [dailyAppointments, setDailyAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, message: '', type: 'error' });
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    patientNo: '',
    appointmentDate: moment(selectedDate).format('YYYY-MM-DD'),
    appointmentTime: '',
    status: 'Scheduled',
  });
  const [errors, setErrors] = useState({});

  // Fetch patients for dropdown
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getPatients();
        setPatients(response.data.results || []);
      } catch (err) {
        setModal({
          isOpen: true,
          message: 'Failed to load patients. Please try again.',
          type: 'error',
        });
      }
    };
    fetchPatients();
  }, []);

  // Fetch appointments for the current month
  const fetchAppointments = async (date) => {
    setIsLoading(true);
    const startOfMonth = moment(date).startOf('month').format('YYYY-MM-DD');
    const endOfMonth = moment(date).endOf('month').format('YYYY-MM-DD');

    const payload = {
      startDate: startOfMonth,
      endDate: endOfMonth,
      status: statusFilter !== 'all' ? statusFilter : null,
    };

    try {
      const response = await getPatientAppointments(payload);
      const results = response.data.results || [];
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

  // Update daily appointments when date or filter changes
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

  // Fetch appointments when month or status filter changes
  useEffect(() => {
    fetchAppointments(selectedDate);
  }, [moment(selectedDate).format('YYYY-MM'), statusFilter]);

  // Update appointment date when selectedDate changes
  useEffect(() => {
    setNewAppointment((prev) => ({
      ...prev,
      appointmentDate: moment(selectedDate).format('YYYY-MM-DD'),
    }));
  }, [selectedDate]);

  // Calendar tile content with appointment count badges
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!newAppointment.patientNo) newErrors.patientNo = 'Patient is required.';
    if (!newAppointment.appointmentDate) newErrors.appointmentDate = 'Date is required.';
    if (!newAppointment.appointmentTime) newErrors.appointmentTime = 'Time is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleAddAppointment = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const selectedPatient = patients.find((p) => p.patientNo === newAppointment.patientNo);
    const payload = {
      patientNo: newAppointment.patientNo,
      firstName: selectedPatient?.firstName || '',
      lastName: selectedPatient?.lastName || '',
      appointmentDate: `${newAppointment.appointmentDate}T${newAppointment.appointmentTime}:00Z`,
      status: newAppointment.status,
    };

    try {
      setIsLoading(true);
      await addPatientAppointment(payload);
      await fetchAppointments(selectedDate); // Refresh appointments
      setIsAddModalOpen(false);
      setNewAppointment({
        patientNo: '',
        appointmentDate: moment(selectedDate).format('YYYY-MM-DD'),
        appointmentTime: '',
        status: 'Scheduled',
      });
      setModal({
        isOpen: true,
        message: 'Appointment added successfully!',
        type: 'success',
      });
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

  return (
    <>
      <MessageModel
        isOpen={modal.isOpen}
        onClose={() => setModal({ isOpen: false, message: '', type: 'error' })}
        message={modal.message}
        type={modal.type}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-start justify-center px-4 sm:px-6 lg:px-8 py-4">
        <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-4 bg-gradient-to-r from-sky-600 to-sky-500 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaCalendarAlt size={24} />
              <h2 className="text-xl font-bold">Appointment Calendar</h2>
            </div>
            <div className="flex items-center gap-4">
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
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="Add new appointment"
              >
                <FaPlus size={16} />
                Add Appointment
              </button>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row">
            {/* Calendar Section */}
            <div className="lg:w-1/2 p-6 border-r border-gray-100">
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
            {/* Daily Appointments Section */}
            <div className="lg:w-1/2 p-6 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Appointments on {moment(selectedDate).format('MMMM D, YYYY')}
              </h3>
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
                          Patient ID
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
                          className="hover:bg-blue-50 transition-all duration-200 transform hover:-translate-y-0.5"
                        >
                          <td className="py-3 px-4 border-b text-gray-800 text-sm">
                            {appt.patientNo}
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
                            <span
                              className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                appt.status.toLowerCase() === 'scheduled'
                                  ? 'bg-blue-100 text-blue-700'
                                  : appt.status.toLowerCase() === 'completed'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {appt.status}
                            </span>
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

        {/* Add Appointment Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md transform transition-all duration-300 scale-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Add New Appointment
              </h3>
              <form onSubmit={handleAddAppointment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Patient <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="patientNo"
                    value={newAppointment.patientNo}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    aria-label="Select patient"
                  >
                    <option value="">Select a patient</option>
                    {patients.map((patient) => (
                      <option key={patient.patientNo} value={patient.patientNo}>
                        {`${patient.firstName} ${patient.lastName} (${patient.patientNo})`}
                      </option>
                    ))}
                  </select>
                  {errors.patientNo && (
                    <p className="mt-1 text-sm text-red-600">{errors.patientNo}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="appointmentDate"
                    value={newAppointment.appointmentDate}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    aria-label="Appointment date"
                  />
                  {errors.appointmentDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.appointmentDate}</p>
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
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    aria-label="Appointment time"
                  />
                  {errors.appointmentTime && (
                    <p className="mt-1 text-sm text-red-600">{errors.appointmentTime}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={newAppointment.status}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    aria-label="Appointment status"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setErrors({});
                      setNewAppointment({
                        patientNo: '',
                        appointmentDate: moment(selectedDate).format('YYYY-MM-DD'),
                        appointmentTime: '',
                        status: 'Scheduled',
                      });
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-all duration-200"
                    aria-label="Cancel adding appointment"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-all duration-200 flex items-center gap-2"
                    aria-label="Save appointment"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
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