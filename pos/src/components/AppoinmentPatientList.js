import React, { useState, useEffect } from 'react';
import { FaCheck, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import { getapPatients, getPatientRegistrations } from '../functions/patient';
import MessageModel from './MessageModel';

function AppoinmentPatientList({ searchQuery, filterType, triggerSearch, setPatients, onSelectPatient,hidePaginationIfTotalPagesIsOne }) {
  const [localPatients, setLocalPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const rowsPerPageOptions = [10, 20, 50];

    const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    type: "error",
  });


  const getPatientList = async (page = 1) => {
    const payload = {
      patientNo: filterType === 'patientNo' ? searchQuery : null,
      homePhone: filterType === 'mobile' ? searchQuery : null,
      email: filterType === 'email' ? searchQuery : null,
      patientName: filterType === 'patientName' ? searchQuery : null,
      skip: (page - 1) * rowsPerPage,
      limit: rowsPerPage,
    };

    try {
      setIsLoading(true);
      setError(null);
      const response = await getapPatients(payload);
      console.log('getPatientList response:', response);
      

        if (response.data.error) {
          setError(response.data.error.message)
          
          setModal({
            isOpen: true,
            message: response.data.error.message,
            type: "error",
          });

          return;
        }

      // Ensure results is an array, default to empty array if undefined
      const results = response.data.results?.[0] || [];
      
      // Update local and parent state
      setLocalPatients(results);
      setPatients(results);

      // Safely extract totalRows, default to 0 if undefined
      const { totalRows = 0 } = response.data.outputValues || {};
      setTotalRecords(totalRows);
      
      // Calculate total pages, ensure at least 1 page
      const calculatedTotalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
      setTotalPages(calculatedTotalPages);

      // Reset currentPage if it exceeds totalPages
      if (currentPage > calculatedTotalPages) {
        setCurrentPage(1);
      }
    } catch (err) {
      setError(
        err.code === 'ER_CON_COUNT_ERROR'
          ? 'Database connection limit reached. Please try again later.'
          : 'Failed to load patient list. Please try again later.'
      );
      console.error('Error fetching patient list:', err);
      setLocalPatients([]);
      setTotalRecords(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger API call when triggerSearch, currentPage, or rowsPerPage changes
  useEffect(() => {
    if (triggerSearch > 0) {
      getPatientList(currentPage);
    }
  }, [triggerSearch, currentPage, rowsPerPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md" role="alert">
          {error}
        </div>
      )}
           <MessageModel
        isOpen={modal.isOpen}
        onClose={() => setModal({ isOpen: false, message: "", type: "error" })}
        message={modal.message}
        type={modal.type}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              {/* <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700 w-32">
                Patient No.
              </th> */}
              <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
                First Name
              </th>
                <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
                Last Name
              </th>
              {/* <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
                Gender
              </th> */}
              <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
                Phone
              </th>
              <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              {/* <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
                Patient Type
              </th> */}
              <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" className="py-3 px-4 text-center text-gray-500">
                  Loading patients...
                </td>
              </tr>
            ) : localPatients.length === 0 && triggerSearch > 0 ? (
              <tr>
                <td colSpan="7" className="py-3 px-4 text-center text-gray-500">
                  No patients found
                </td>
              </tr>
            ) : localPatients.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-3 px-4 text-center text-gray-500">
                  Please enter a search term and click Search
                </td>
              </tr>
            ) : (
              localPatients.map((patient) => (
                <tr
                  key={patient.patientId}
                  className={`hover:bg-sky-100 transition-colors ${onSelectPatient ? 'cursor-pointer' : ''}`}
                  onClick={() => onSelectPatient && onSelectPatient(patient)}
                  role={onSelectPatient ? 'button' : undefined}
                  tabIndex={onSelectPatient ? 0 : undefined}
                >
                  {/* <td className="py-3 px-4 border text-gray-800">{patient.patientNo}</td> */}
                   <td className="py-3 px-4 border text-gray-800">
                    {`${patient.firstName}`}
                  </td>
                     <td className="py-3 px-4 border text-gray-800">
                    {`${patient.lastName}`}
                  </td>
                  {/* <td className="py-3 px-4 border text-gray-800">
                    {`${patient.firstName} ${patient.middleName || ''} ${patient.lastName}`}
                  </td> */}
                  {/* <td className="py-3 px-4 border text-gray-800">{patient.gender || 'N/A'}</td> */}
                  <td className="py-3 px-4 border text-gray-800">
                    {patient.mobileNo || 'N/A'}
                  </td>
                  <td className="py-3 px-4 border text-gray-800">{patient.email || 'N/A'}</td>
                  {/* <td className="py-3 px-4 border text-gray-800">{patient.patientTypeName || 'N/A'}</td> */}
                  <td className="py-3 px-4 border">
                    {onSelectPatient ? (
                      <button
                        type="button"
                        className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
                        aria-label={`Select patient ${patient.firstName} ${patient.lastName}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPatient(patient);
                        }}
                      >
                        <FaCheck size={20} /> Select
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <Link
                          to={`/patient?id=${patient.patientId}&type=${patient.patientTypeId}`}
                          className="flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-colors"
                          aria-label={`View patient ${patient.firstName} ${patient.lastName}`}
                        >
                          <FaEye size={20} /> View Profile
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

{hidePaginationIfTotalPagesIsOne ? (
   
   totalPages > 1 ?(
   triggerSearch > 0 && totalRecords > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPageOptions={rowsPerPageOptions}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          totalRecords={totalRecords}
        />
      )):null

     ) : 

      triggerSearch > 0 && totalRecords > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPageOptions={rowsPerPageOptions}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          totalRecords={totalRecords}
        />
      )
      }
    </div>
  );
}

export default AppoinmentPatientList;