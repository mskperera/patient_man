import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import moment from 'moment';

import { addPatientAppointment } from '../../data/mockData';
import MessageModel from '../MessageModel';
import PatientList from '../PatientList';

const AddAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDate = location.state?.selectedDate || new Date();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('firstName');
  const [triggerSearch, setTriggerSearch] = useState(0);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [error, setError] = useState('');
  const [modal, setModal] = useState({ isOpen: false, message: '', type: 'error' });
  const [isLoading, setIsLoading] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientNo: '',
    appointmentDate: moment(selectedDate).format('YYYY-MM-DD'),
    appointmentTime: '',
    status: 'Scheduled',
  });
  const [formErrors, setFormErrors] = useState({});

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

  // Update appointment date when selectedDate changes
  useEffect(() => {
    setNewAppointment((prev) => ({
      ...prev,
      appointmentDate: moment(selectedDate).format('YYYY-MM-DD'),
    }));
  }, [selectedDate]);

  // Handle patient selection
  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setNewAppointment((prev) => ({
      ...prev,
      patientNo: patient.patientNo,
    }));
    setFormErrors({});
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!newAppointment.patientNo) newErrors.patientNo = 'Please select a patient.';
    if (!newAppointment.appointmentDate) newErrors.appointmentDate = 'Date is required.';
    if (!newAppointment.appointmentTime) newErrors.appointmentTime = 'Time is required.';
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleAddAppointment = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

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
      setModal({
        isOpen: true,
        message: 'Appointment added successfully!',
        type: 'success',
      });
      // Reset form
      setNewAppointment({
        patientNo: '',
        appointmentDate: moment(selectedDate).format('YYYY-MM-DD'),
        appointmentTime: '',
        status: 'Scheduled',
      });
      setSelectedPatient(null);
      setPatients([]);
      setSearchQuery('');
      setTriggerSearch(0);
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
        onClose={() => {
          setModal({ isOpen: false, message: '', type: 'error' });
          if (modal.type === 'success') {
            navigate('/appointments');
          }
        }}
        message={modal.message}
        type={modal.type}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate('/appointments')}
              className="flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-colors"
              aria-label="Back to appointments"
            >
              <FaArrowLeft size={20} />
              Back
            </button>
            <h2 className="text-2xl font-bold text-gray-800">Add New Appointment</h2>
          </div>

          {/* Patient Search Section */}
         {/* Patient Search Section */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-wrap gap-4 justify-center mb-4">
                {[
                  { value: 'patientNo', label: 'Patient No' },
                  { value: 'firstName', label: 'First Name' },
                  { value: 'lastName', label: 'Last Name' },
                  { value: 'email', label: 'Email' },
                  { value: 'mobile', label: 'Mobile' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                    <input
                      type="radio"
                      value={option.value}
                      checked={filterType === option.value}
                      onChange={(e) => {
                        setFilterType(e.target.value);
                        setError('');
                      }}
                      className="form-radio text-sky-600 focus:ring-sky-500 h-4 w-4 sm:h-5 sm:w-5"
                      aria-label={`Search by ${option.label}`}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                <div className="relative flex-1">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setError('');
                    }}
                    placeholder={`Search by ${filterType.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition text-sm sm:text-base"
                    aria-label={`Search patients by ${filterType.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 md:mt-0 md:w-auto bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition flex items-center justify-center gap-2 shadow-sm hover:shadow-md text-sm sm:text-base"
                  aria-label="Search patients"
                >
                  <FaSearch size={16} />
                  Search
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
                <PatientList
                  searchQuery={searchQuery}
                  filterType={filterType}
                  triggerSearch={triggerSearch}
                  setPatients={setPatients}
                  onSelectPatient={handleSelectPatient}
                />
              </div>
            )}
          </div>

          {/* Appointment Form Section */}
                 {/* Appointment Form Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Appointment Details {selectedPatient && `- ${selectedPatient.firstName} ${selectedPatient.lastName}`}
            </h3>
            <form onSubmit={handleAddAppointment} className="space-y-4">
               <div className="flex flex-col md:flex-row md:gap-4">
                <div className="flex-1">
           
                <label className="block text-sm font-medium text-gray-700">
                  Patient
                </label>
                <input
                  type="text"
                  value={selectedPatient ? `${selectedPatient.firstName} ${selectedPatient.lastName} (${selectedPatient.patientNo})` : 'No patient selected'}
                  disabled
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md bg-gray-100"
                  aria-label="Selected patient"
                />
                {formErrors.patientNo && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.patientNo}</p>
                )}
              </div>

   <div className="flex-1">


                <label className="block text-sm font-medium text-gray-700">
                  Status
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
              <div className="flex flex-col md:flex-row md:gap-4">
                <div className="flex-1">
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
                <div className="flex-1 mt-4 md:mt-0">
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