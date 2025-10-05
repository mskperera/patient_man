import React, { useState, useEffect } from 'react';
import { FaEye, FaUserMd, FaUserPlus, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PatientList from '../components/PatientList';

function Page() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('name');
  const [triggerSearch, setTriggerSearch] = useState(1); // Initialize to 1 to load on mount
const [patients, setPatients] = useState([]);

  const handleSearch = () => {
    setTriggerSearch(prev => prev + 1); // Increment to trigger search
  };

  // Ensure triggerSearch is set to 1 on mount (optional, for clarity)
  useEffect(() => {
    setTriggerSearch(1);
  }, []);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="flex items-center text-xl font-bold text-gray-800">
          <FaUserMd className="mr-2" size={28} />
          Patient List
        </h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search by ${filterType.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              aria-label={`Search patients by ${filterType.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full sm:w-40 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            aria-label="Select search filter"
          >
            <option value="patientNo">Patient No</option>
              <option value="patientName">Patient Name</option>
            <option value="firstName">First Name</option>
             <option value="lastName">Last Name</option>
            <option value="phone">Phone</option>
            <option value="email">Email</option>
            <option value="gender">Gender</option>
          </select>
          <button
            onClick={handleSearch}
            className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition w-full sm:w-auto justify-center"
            aria-label="Search Patients"
          >
            <FaSearch className="mr-2" />
            Search
          </button>
          <button
            onClick={() => navigate('/patientType?mode=add', { state: { mode: 'add' } })}
            className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition w-full sm:w-auto justify-center"
            aria-label="Register Patient"
          >
            <FaUserPlus className="mr-2" />
            Add Patient
          </button>
        </div>
      </div>

      <PatientList searchQuery={searchQuery} filterType={filterType} triggerSearch={triggerSearch} setPatients={setPatients} />
    </div>
  );
}

export default Page;