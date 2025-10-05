import React from 'react';
import { FaEdit } from 'react-icons/fa';

function EditButton({ ariaLabel, disabled,children, onClick }) {
  return (
      <button
         onClick={onClick}
          className={`flex items-center px-4 py-2 rounded-lg bg-transparent text-sky-600 border border-sky-500 hover:bg-gradient-to-r hover:from-sky-50 hover:to-sky-50 hover:text-sky-800 hover:border-sky-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-300 disabled:shadow-none disabled:cursor-not-allowed group`}
          aria-label={ariaLabel}
                  disabled={disabled}
                >
                        <FaEdit className="mr-2 text-sky-600 group-hover:text-sky-800 transition-colors duration-200" />
                  {children}
                </button>
  );
}

export default EditButton;