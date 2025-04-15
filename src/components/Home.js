import React, { useState } from 'react';
import { FaSearch, FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('John Doe');
  const [filterType, setFilterType] = useState('name');
  const [error, setError] = useState('');

  // Mock patient data (replace with API call in production)
  const patients = [
    {
      id: 1,
      patientId: 'PT-0001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '123-456-7890',
    },
    {
      id: 2,
      patientId: 'PT-0002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      mobile: '098-765-4321',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter a search term.');
      return;
    }

    // Case-insensitive search
    const match = patients.find((patient) => {
      const value = patient[filterType]?.toLowerCase() || '';
      return value.includes(searchQuery.toLowerCase());
    });

    if (match) {
      setError('');
      navigate(`/patients/${match.id}`);
    } else {
      setError('No patient found. Try a different search term or add a new patient.');
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="mt-2 text-2xl text-gray-600">
          Find or add patients with ease.
        </h2>
      </div>

      {/* Search Section */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-sm">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                aria-label={`Search patients by ${filterType.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              />
            </div>
            {/* Filter Dropdown */}
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setError('');
              }}
              className="w-full sm:w-32 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              aria-label="Select search filter"
            >
              <option value="patientId">Patient ID</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>
          {/* Error Message */}
          {error && (
            <p id="search-error" className="text-sm text-red-600">
              {error}
            </p>
          )}
          {/* Search Button */}
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
            aria-label="Search patients"
          >
            <FaSearch size={16} />
            Search
          </button>
        </form>

        {/* Add Patient Section */}
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
    </div>
  );
}

export default Home;