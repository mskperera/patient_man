import React, { useState, useEffect } from 'react';
import { FaCheck, FaEye, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import { getPatientRegistrations,deletePatient } from '../functions/patient';
import MessageModel from './MessageModel';
import ConfirmDialog from './dialog/ConfirmDialog';


function PatientList({ searchQuery, filterType, triggerSearch, setPatients, onSelectPatient,hidePaginationIfTotalPagesIsOne }) {
  const [localPatients, setLocalPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const rowsPerPageOptions = [10, 20, 50];

    const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    type: "error",
  });

  const [showConfirm, setShowConfirm] = useState(false);

  const getPatientList = async (page = 1) => {


     console.log('getPatientList searchQuery:', searchQuery,filterType);

    const payload = {
      patientNo: filterType === 'patientNo' ? searchQuery : null,
      homePhone: filterType === 'phone' ? searchQuery : null,
      //businessPhone: filterType === 'phone' ? searchQuery : null,
      email: filterType === 'email' ? searchQuery : null,
      patientName: filterType === 'patientName' ? searchQuery : null,
      firstName: filterType === 'firstName' ? searchQuery : null,
      lastName: filterType === 'lastName' ? searchQuery : null,
      skip: (page - 1) * rowsPerPage,
      limit: rowsPerPage,
    };

  

    try {
      setIsLoading(true);
      setError(null);
      const response = await getPatientRegistrations(payload);
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
      //setSavedNotes(results);

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

  const [deletingNoteId, setDeletingNoteId] = useState(null);

    const [noteToDelete, setNoteToDelete] = useState(null);






const confirmDelete = async () => {
  try {
    setShowConfirm(false);
    setDeletingNoteId(noteToDelete); // Trigger deletion animation
  const delteNoteRes=  await deletePatient(noteToDelete);
     console.log(' delteNoteRes',delteNoteRes.data);

          if(delteNoteRes.data.error){

 setModal({
          isOpen: true,
          message: 'Something went wrong',
          type: "danger",
        });

      return;
     }

          if(delteNoteRes.data.outputValues.responseStatus==="failed"){

 setModal({
          isOpen: true,
          message: delteNoteRes.data.outputValues.outputMessage,
          type: "warning",
        });

      return;
     }




  // const notes=savedNotes;
const filterdPatients=localPatients.filter(n => n.patientId !== noteToDelete);
      setPatients(filterdPatients);
        setLocalPatients(filterdPatients);
      setDeletingNoteId(null);
      setNoteToDelete(null);



 setModal({
          isOpen: true,
          message: delteNoteRes.data.outputValues.outputMessage,
          type: "success",
        });
     



  } catch (err) {
    console.error('Failed to delete note:', err);
    setDeletingNoteId(null);
    setShowConfirm(false);
    setNoteToDelete(null);
  }
};

  const cancelDelete = () => {
    setShowConfirm(false);
    setNoteToDelete(null);
  };


  const handleDeleteNote = (id) => {
    setNoteToDelete(id);
    setShowConfirm(true);
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

            <ConfirmDialog
          isVisible={showConfirm}
          message="Are you sure you want to delete this patient? This action cannot be undone, and all patient data will be permanently lost."
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          title={"Confirm Delete"}
          severity={"danger"}

        />

      <div className="overflow-x-auto"> 
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700 w-32">
                Patient No.
              </th>
              <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
                Name
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
              <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
                Patient Type
              </th>
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
                  <td className="py-3 px-4 border text-gray-800">{patient.patientNo}</td>
                   <td className="py-3 px-4 border text-gray-800">
                    {`${patient.fullName}`}
                  </td>
                  {/* <td className="py-3 px-4 border text-gray-800">
                    {`${patient.firstName} ${patient.middleName || ''} ${patient.lastName}`}
                  </td> */}
                  {/* <td className="py-3 px-4 border text-gray-800">{patient.gender || 'N/A'}</td> */}
                  <td className="py-3 px-4 border text-gray-800">
                    {patient.businessPhone || patient.homePhone || 'N/A'}
                  </td>
                  <td className="py-3 px-4 border text-gray-800">{patient.email || 'N/A'}</td>
                  <td className="py-3 px-4 border text-gray-800">{patient.patientTypeName || 'N/A'}</td>
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
                      <div className="flex space-x-2 gap-2">
                        <Link
                          to={`/patient?id=${patient.patientId}&type=${patient.patientTypeId}`}
                          className="flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-colors"
                          aria-label={`View patient ${patient.firstName} ${patient.lastName}`}
                        >
                          <FaEye size={20} /> View Profile
                        </Link>
                
                                  <button
                              onClick={() => handleDeleteNote(patient.patientId)}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
                          aria-label={`Delete patient ${patient.firstName} ${patient.lastName}`}
                        >
                          <FaTrash size={16} /> 
                        </button>
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

export default PatientList;