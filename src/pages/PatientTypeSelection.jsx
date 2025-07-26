import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaChild, FaUsers } from 'react-icons/fa';
import { BiPlus } from 'react-icons/bi';

function PatientTypeSelection() {
  const navigate = useNavigate();

  const handleNavigation = (type) => {
    navigate(`/add-patient?mode=add&type=${type}`);
  };

  const patientTypes = [
    {
      id: '1',
      name: 'Individual',
      description: 'Register a single adult patient',
      icon: FaUser,
      ariaLabel: 'Add Individual Patient',
    },
    {
      id: '2',
      name: 'Child',
      description: 'Register a pediatric patient',
      icon: FaChild,
      ariaLabel: 'Add Child Patient',
    },
    {
      id: '3',
      name: 'Family',
      description: 'Register a family group',
      icon: FaUsers,
      ariaLabel: 'Add Family Patient',
    },
  ];

  return (
    <div className="py-8 bg-gray-50 flex items-center justify-center">
      <div className="max-w-5xl w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            Patient Registration
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Choose the type of patient to register for your records
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {patientTypes.map(({ id, name, description, icon: Icon, ariaLabel }) => (
            <button
              key={id}
              onClick={() => handleNavigation(id)}
              className="relative bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:bg-gradient-to-b hover:from-sky-50 hover:to-sky-50 hover:border-sky-500 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 group"
              aria-label={ariaLabel}
            >
              <Icon className="text-sky-600 mb-4" size={40} />
              <span className="text-lg font-semibold text-sky-700">{name}</span>
              <p className="mt-2 text-gray-500 text-center">{description}</p>
              <span className="absolute top-3 right-3 bg-sky-500 rounded-full p-1.5 group-hover:bg-sky-600 group-focus:bg-sky-600 transition-colors duration-200">
                <BiPlus className="text-white" size={14} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PatientTypeSelection;