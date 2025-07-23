import React from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  rowsPerPageOptions,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  totalRecords,
}) => {
  // Only disable pagination if there are no records
  const isPaginationDisabled = totalRecords === 0;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
      {/* Rows per Page Dropdown */}
      <div className="flex items-center mb-4 sm:mb-0">
        <label htmlFor="rowsPerPage" className="mr-2 text-sm font-medium text-gray-700">
          Rows per page:
        </label>
        <select
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm hover:bg-gray-50"
          disabled={isPaginationDisabled}
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          className={`flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-sm ${
            currentPage === 1 || isPaginationDisabled
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isPaginationDisabled}
          aria-label="Previous page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page Number Buttons */}
        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-sm ${
                  currentPage === page
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-indigo-600 hover:bg-indigo-100 border border-indigo-200'
                } ${isPaginationDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                onClick={() => onPageChange(page)}
                disabled={isPaginationDisabled}
                aria-label={`Page ${page}`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          className={`flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-sm ${
            currentPage === totalPages || isPaginationDisabled
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isPaginationDisabled}
          aria-label="Next page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Record Count Info */}
      <div className="mt-4 sm:mt-0 text-sm text-gray-600">
        Showing {Math.min((currentPage - 1) * rowsPerPage + 1, totalRecords)} to{' '}
        {Math.min(currentPage * rowsPerPage, totalRecords)} of {totalRecords} records
      </div>
    </div>
  );
};

export default Pagination;