import React from 'react';

const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="inline-flex items-center px-4 py-2 bg-green-500 text-white font-medium text-base rounded-md shadow-md hover:bg-green-600 hover:scale-105 active:scale-95 transition-all duration-200"
    >
      <svg
        className="w-5 h-5 mr-2 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
      </svg>
      Print
    </button>
  );
};

export default PrintButton;