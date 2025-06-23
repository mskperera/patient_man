import React, { useState, useEffect } from 'react';
import { FaSearch, FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PatientList from '../components/PatientList';

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('firstName');
  const [triggerSearch, setTriggerSearch] = useState(0);
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter a search term.');
      return;
    }
    setError('');
    setTriggerSearch(prev => prev + 1);
  };

  useEffect(() => {
    if (patients.length === 1) {
     // navigate(`/patients/${patients[0].patientId}`);
    }
  }, [patients, navigate]);

  return (
    <div className=" flex flex-col items-center pt-5 px-4 sm:px-6 lg:px-8 ">
     
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-sm">
         <div className="text-center mb-8">
        <h2 className="mt-2 text-2xl text-gray-600">
          Find or add patients with ease.
        </h2>
      </div>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { value: 'patientNo', label: 'Patient No' },
              { value: 'firstName', label: 'First Name' },
               { value: 'lastName', label: 'Last Name' },
              { value: 'email', label: 'Email' },
              { value: 'mobile', label: 'Mobile' },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  value={option.value}
                  checked={filterType === option.value}
                  onChange={(e) => {
                    setFilterType(e.target.value);
                    setError('');
                  }}
                  className="form-radio text-sky-600 focus:ring-sky-500"
                  aria-label={`Search by ${option.label}`}
                />
                {option.label}
              </label>
            ))}
          </div>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setError('');
              }}
              placeholder={`Search by ${filterType.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              aria-label={`Search patients by ${filterType.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
            />
          </div>
          {error && (
            <p id="search-error" className="text-sm text-red-600">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
            aria-label="Search patients"
          >
            <FaSearch size={16} />
            Search
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            New unregistered patient?
          </p>
          <button
            onClick={() => navigate('/add-patient', { state: { mode: 'add' } })}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
            aria-label="Add new patient"
          >
            <FaUserPlus size={16} />
            Add New Patient
          </button>
        </div>
      </div>
      {triggerSearch > 0 && (
        <div className="w-full max-w-4xl mt-8">
          <PatientList
            searchQuery={searchQuery}
            filterType={filterType}
            triggerSearch={triggerSearch}
            setPatients={setPatients}
          />
        </div>
      )}
    </div>
  );
}

export default Home;