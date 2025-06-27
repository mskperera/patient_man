import React, { useState, useEffect } from 'react';
import { FaCheck, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Pagination from './Pagination';
import { getPatientRegistrations } from '../functions/patient';

function PatientList({ searchQuery, filterType, triggerSearch, setPatients, onSelectPatient }) {
  const [localPatients, setLocalPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const rowsPerPageOptions = [10, 20, 50];

  const getPatientList = async (page = 1) => {
    const payload = {
      patientNo: filterType === 'patientNo' ? searchQuery : null,
      homePhone: filterType === 'mobile' ? searchQuery : null,
      businessPhone: filterType === 'mobile' ? searchQuery : null,
      email: filterType === 'email' ? searchQuery : null,
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
      const results = response.data.results[0] || [];
      setLocalPatients(results);
      setPatients(results); // Update parent state
      const { totalRows } = response.data.outputValues || { totalRows: 0 };
      setTotalRecords(totalRows);
      setTotalPages(Math.ceil(totalRows / rowsPerPage));
    } catch (err) {
      setError(
        err.code === 'ER_CON_COUNT_ERROR'
          ? 'Database connection limit reached. Please try again later.'
          : 'Failed to load patient list. Please try again later.'
      );
      console.error('Error fetching patient list:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (triggerSearch > 0) {
      getPatientList(currentPage);
    }
  }, [triggerSearch, currentPage, rowsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md" role="alert">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700 w-32">
                Patient ID
              </th>
              <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
                Gender
              </th>
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
                  className={`hover:bg-gray-50 transition-colors ${onSelectPatient ? 'cursor-pointer' : ''}`}
                  onClick={() => onSelectPatient && onSelectPatient(patient)}
                  role={onSelectPatient ? 'button' : undefined}
                  tabIndex={onSelectPatient ? 0 : undefined}
               >
                  <td className="py-3 px-4 border text-gray-800">{patient.patientNo}</td>
                  <td className="py-3 px-4 border text-gray-800">
                    {`${patient.firstName} ${patient.middleName || ''} ${patient.lastName}`}
                  </td>
                  <td className="py-3 px-4 border text-gray-800">{patient.gender || 'N/A'}</td>
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
                          e.stopPropagation(); // Prevent row click from triggering twice
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

      {triggerSearch > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPageOptions={rowsPerPageOptions}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          totalRecords={totalRecords}
        />
      )}
    </div>
  );
}

export default PatientList;
// import React, { useState, useEffect } from 'react';
// import { FaEye } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import { getPatientRegistrations } from '../functions/patient';
// import Pagination from './Pagination';

// function PatientList({ searchQuery, filterType, triggerSearch, setPatients }) {
//   const [patients, setLocalPatients] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const rowsPerPageOptions = [10, 20, 50];

//   const getPatientList = async (page = 1) => {
//     const payload = {
//       patientNo: filterType === 'patientNo' ? searchQuery : null,
//       homePhone: filterType === 'mobile' ? searchQuery : null,
//       businessPhone: filterType === 'mobile' ? searchQuery : null,
//       email: filterType === 'email' ? searchQuery : null,
//       firstName: filterType === 'firstName' ? searchQuery : null,
//       lastName: filterType === 'lastName' ? searchQuery : null,
//       skip: (page - 1) * rowsPerPage,
//       limit: rowsPerPage,
//     };

//     try {
//       setIsLoading(true);
//       setError(null);
//       const response = await getPatientRegistrations(payload);
//       console.log('getPatientList', response);
//       const results = response.data.results[0] || [];
//       setLocalPatients(results);
//       setPatients(results); // Update parent state
//       const { totalRows } = response.data.outputValues;
//       setTotalRecords(totalRows || 0);
//       setTotalPages(Math.ceil((totalRows || 0) / rowsPerPage));
//     } catch (err) {
//       setError('Failed to load patient list. Please try again later.');
//       console.error('Error fetching patient list:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (triggerSearch > 0) {
//       getPatientList(currentPage);
//     }
//   }, [triggerSearch, currentPage, rowsPerPage]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleRowsPerPageChange = (newRowsPerPage) => {
//     setRowsPerPage(newRowsPerPage);
//     setCurrentPage(1);
//   };

//   return (
//     <div>
//       {error && (
//         <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md" role="alert">
//           {error}
//         </div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700 w-32">
//                 Patient ID
//               </th>
//               <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
//                 Name
//               </th>
//               <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
//                 Gender
//               </th>
//               <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
//                 Phone
//               </th>
//               <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
//                 Email
//               </th>
//                  <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
//                 Patient Type
//               </th>
//               <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {isLoading ? (
//               <tr>
//                 <td colSpan="6" className="py-3 px-4 text-center text-gray-500">
//                   Loading patients...
//                 </td>
//               </tr>
//             ) : patients.length === 0 && triggerSearch > 0 ? (
//               <tr>
//                 <td colSpan="6" className="py-3 px-4 text-center text-gray-500">
//                   No patients found
//                 </td>
//               </tr>
//             ) : patients.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="py-3 px-4 text-center text-gray-500">
//                   Please enter a search term and click Search
//                 </td>
//               </tr>
//             ) : (
//               patients.map((patient) => (
//                 <tr key={patient.patientId} className="hover:bg-gray-50 transition-colors">
//                   <td className="py-3 px-4 border text-gray-800">{patient.patientNo}</td>
//                   <td className="py-3 px-4 border text-gray-800">{`${patient.firstName} ${patient.middleName || ''} ${patient.lastName}`}</td>
//                   <td className="py-3 px-4 border text-gray-800">{patient.gender || 'N/A'}</td>
//                   <td className="py-3 px-4 border text-gray-800">{patient.businessPhone || patient.homePhone || 'N/A'}</td>
//                   <td className="py-3 px-4 border text-gray-800">{patient.email || 'N/A'}</td>
//                   <td className="py-3 px-4 border text-gray-800">{patient.patientTypeName || 'N/A'}</td>
//                   <td className="py-3 px-4 border">
//                     <div className="flex space-x-2">
//                       <Link
//                         to={`/patient?id=${patient.patientId}&type=${patient.patientTypeId}`}
//                         className="flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-colors"
//                         aria-label={`View patient ${patient.firstName} ${patient.lastName}`}
//                       >
//                         <FaEye size={20} /> View Profile
//                       </Link>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {triggerSearch > 0 && (
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           rowsPerPageOptions={rowsPerPageOptions}
//           rowsPerPage={rowsPerPage}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleRowsPerPageChange}
//           totalRecords={totalRecords}
//         />
//       )}
//     </div>
//   );
// }

// export default PatientList;

// import React, { useState, useEffect } from 'react';
// import { FaEye, FaUserMd, FaUserPlus, FaSearch } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import { getPatientRegistrations } from '../functions/patient';
// import Pagination from './Pagination';

// function PatientList() {
//   const navigate = useNavigate();
  
//   const [patients, setPatients] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterType, setFilterType] = useState('name');
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalRecords, setTotalRecords] = useState(0); // New state for total records
//   const rowsPerPageOptions = [10, 20, 50];

//   const getPatientList = async (page = 1) => {
//     const payload = {
//       patientNo: null,
//       homePhone: null,
//       businessPhone: null,
//       email: null, 
//       firstName: null, 
//       lastName: null,
//       skip: (page - 1) * rowsPerPage,
//       limit: rowsPerPage
//     };

//     try {
//       setIsLoading(true);
//       const response = await getPatientRegistrations(payload);
//       console.log('getPatientList', response);
//       setPatients(response.data.results[0] || []);
//       const {totalRows}=response.data.outputValues;
//       setTotalRecords(totalRows || 0); // Update total records
//       setTotalPages(Math.ceil((totalRows || 0) / rowsPerPage));
//       setError(null);
//     } catch (err) {
//       setError('Failed to load patient list. Please try again later.');
//       console.error('Error fetching patient list:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getPatientList(currentPage);
//   }, [currentPage, rowsPerPage]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleRowsPerPageChange = (newRowsPerPage) => {
//     setRowsPerPage(newRowsPerPage);
//     setCurrentPage(1);
//   };

//   const filteredPatients = patients.filter((patient) => {
//     if (!searchQuery) return true;
//     const value = patient[filterType]?.toString().toLowerCase() || '';
//     return value.includes(searchQuery.toLowerCase());
//   });

//   return (
//     <div>
   
//       {error && (
//         <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md" role="alert">
//           {error}
//         </div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="py-3 px-4 border text-left text-sm font-semibold text-gray-700 w-32">
//                 Patient ID
//               </th>
//               <th className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
//                 Name
//               </th>
//               <th className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
//                 Gender
//               </th>
//               <th className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
//                 Phone
//               </th>
//               <th className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
//                 Email
//               </th>
//               <th className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {isLoading ? (
//               <tr>
//                 <td colSpan="6" className="py-3 px-4 text-center text-gray-500">
//                   Loading patients...
//                 </td>
//               </tr>
//             ) : filteredPatients.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="py-3 px-4 text-center text-gray-500">
//                   No patients found
//                 </td>
//               </tr>
//             ) : (
//               filteredPatients.map((patient) => (
//                 <tr key={patient.patientId} className="hover:bg-gray-50 transition-colors">
//                   <td className="py-3 px-4 border text-gray-800">{patient.patientNo}</td>
//                   <td className="py-3 px-4 border text-gray-800">{`${patient.firstName} ${patient.middleName} ${patient.lastName}`}</td>
//                   <td className="py-3 px-4 border text-gray-800">{patient.gender}</td>
//                   <td className="py-3 px-4 border text-gray-800">{patient.businessPhone}</td>
//                   <td className="py-3 px-4 border text-gray-800">{patient.email}</td>
//                   <td className="py-3 px-4 border">
//                     <div className="flex space-x-2">
//                       <Link
//                         to={`/patients/${patient.patientId}`}
//                         className="flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-colors"
//                         aria-label={`View patient ${patient.name}`}
//                       >
//                         <FaEye size={20} /> View Profile
//                       </Link>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         rowsPerPageOptions={rowsPerPageOptions}
//         rowsPerPage={rowsPerPage}
//         onPageChange={handlePageChange}
//         onRowsPerPageChange={handleRowsPerPageChange}
//         totalRecords={totalRecords} // Pass total records
//       />
//     </div>
//   );
// }

// export default PatientList;