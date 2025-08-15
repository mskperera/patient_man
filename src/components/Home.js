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
      setError('Please enter a valid search term.');
      return;
    }
    setError('');
    setTriggerSearch((prev) => prev + 1);
  };

  useEffect(() => {
    if (patients.length === 1) {
      // navigate(`/patients/${patients[0].patientId}`);
    }
  }, [patients, navigate]);

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center pt-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg border border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-500">
                Easily search for patients or register a new one.
          </h2>
          {/* <p className="mt-2 text-lg text-gray-500">
      
          </p> */}
        </div>
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {[
              { value: 'patientNo', label: 'Patient No.' },
              // { value: 'firstName', label: 'First Name' },
               { value: 'patientName', label: 'Patient Name (First,Middle or Last)' },
              // { value: 'lastName', label: 'Last Name' },
              { value: 'email', label: 'Email' },
              { value: 'mobile', label: 'Mobile' },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 text-gray-600 text-sm sm:text-base cursor-pointer"
              >
                <input
                  type="radio"
                  value={option.value}
                  checked={filterType === option.value}
                  onChange={(e) => {
                    setFilterType(e.target.value);
                    setError('');
                  }}
                  className="form-radio text-sky-600 focus:ring-sky-500 h-5 w-5"
                  aria-label={`Search by ${option.label}`}
                />
                <span className="font-medium">{option.label}</span>
              </label>
            ))}
          </div>
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setError('');
              }}
              placeholder={`Search by ${filterType.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-gray-700 placeholder-gray-400"
              aria-label={`Search patients by ${filterType.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
            />
          </div>
          {error && (
            <p id="search-error" className="text-sm text-red-500 font-medium">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-3 px-4 rounded-lg hover:bg-sky-700 transition-all flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md"
            aria-label="Search patients"
          >
            <FaSearch size={16} />
            Search Patients
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-3">
            Need to register a new patient?
          </p>
          <button
            onClick={() => navigate('/patientType?mode=add', { state: { mode: 'add' } })}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md"
            aria-label="Add new patient"
          >
            <FaUserPlus size={16} />
            Add New Patient
          </button>
        </div>
      </div>
      {triggerSearch > 0 && (
        <div className="w-full">
          <PatientList
            searchQuery={searchQuery}
            filterType={filterType}
            triggerSearch={triggerSearch}
            setPatients={setPatients}
            hidePaginationIfTotalPagesIsOne={true}
          />
        </div>
      )}
    </div>
  );
}

export default Home;