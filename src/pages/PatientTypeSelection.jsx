import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaChild, FaUsers } from 'react-icons/fa';

function PatientTypeSelection() {
  const navigate = useNavigate();

  const handleNavigation = (type) => {
    // Navigate to PatientInfoEdit with a query parameter for type
    navigate(`/add-patient?mode=add&type=${type}`);
  };

  return (
    <div className=" min-h-80 bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-10">
          Select Patient Type
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Individual Button */}
          <button
            onClick={() => handleNavigation('1')}
            className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-200 border border-gray-200 hover:bg-sky-50"
            aria-label="Select Individual Patient"
          >
            <FaUser className="text-sky-600 mb-4" size={48} />
            <span className="text-lg font-semibold text-sky-700">Individual</span>
          </button>

          {/* Child Button */}
          <button
            onClick={() => handleNavigation('2')}
            className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-200 border border-gray-200 hover:bg-sky-50"
            aria-label="Select Child Patient"
          >
            <FaChild className="text-sky-600 mb-4" size={48} />
            <span className="text-lg font-semibold text-sky-700">Child</span>
          </button>

          {/* Family Button */}
          <button
            onClick={() => handleNavigation('3')}
            className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-200 border border-gray-200 hover:bg-sky-50"
            aria-label="Select Family Patient"
          >
            <FaUsers className="text-sky-600 mb-4" size={48} />
            <span className="text-lg font-semibold text-sky-700">Family</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientTypeSelection;