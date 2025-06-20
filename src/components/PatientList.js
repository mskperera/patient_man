import React, { useState, useEffect } from 'react';
import { FaEye, FaUserMd, FaUserPlus, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { getPatientList } from '../data/mockData';


function PatientList() {
  const navigate = useNavigate();
  
  // State for patients, search query, filter type, loading, and error
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('name'); // Default to searching by name
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch patient list on component mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setIsLoading(true);
        const response = await getPatientList();
        setPatients(response.data || []);
        setError(null);
      } catch (err) {
        setError('Failed to load patient list. Please try again later.');
        console.error('Error fetching patient list:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPatients();
  }, []);

  // Filter patients based on search query and filter type
  const filteredPatients = patients.filter((patient) => {
    if (!searchQuery) return true; // Show all if query is empty
    const value = patient[filterType]?.toString().toLowerCase() || '';
    return value.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="p-6 bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="flex items-center text-2xl font-bold text-gray-800">
          <FaUserMd className="mr-2" size={28} />
          Patient List
        </h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search by ${filterType.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              aria-label={`Search patients by ${filterType.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              disabled={isLoading}
            />
          </div>
          {/* Filter Dropdown */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full sm:w-40 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            aria-label="Select search filter"
            disabled={isLoading}
          >
            <option value="patientId">Patient ID</option>
            <option value="name">Name</option>
            <option value="phone">Phone</option>
            <option value="email">Email</option>
            <option value="gender">Gender</option>
          </select>
          {/* Add Patient Button */}
          <button
            onClick={() => navigate('/add-patient', { state: { mode: 'add' } })}
            className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition w-full sm:w-auto justify-center disabled:bg-gray-400"
            aria-label="Register Patient"
            disabled={isLoading}
          >
            <FaUserPlus className="mr-2" />
            Add Patient
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md" role="alert">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border text-left text-sm font-semibold text-gray-700 w-32">
                Patient ID
              </th>
              <th className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
                Gender
              </th>
              <th className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
                Phone
              </th>
              <th className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="py-3 px-4 text-center text-gray-500">
                  Loading patients...
                </td>
              </tr>
            ) : filteredPatients.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-3 px-4 text-center text-gray-500">
                  No patients found
                </td>
              </tr>
            ) : (
              filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 border text-gray-800">{patient.patientId}</td>
                  <td className="py-3 px-4 border text-gray-800">{patient.name}</td>
                  <td className="py-3 px-4 border text-gray-800">{patient.gender}</td>
                  <td className="py-3 px-4 border text-gray-800">{patient.phone}</td>
                  <td className="py-3 px-4 border text-gray-800">{patient.email}</td>
                  <td className="py-3 px-4 border">
                    <div className="flex space-x-2">
                      <Link
                        to={`/patients/${patient.id}`}
                        className="flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-colors"
                        aria-label={`View patient ${patient.name}`}
                      >
                        <FaEye size={20} /> View Profile
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientList;
// import React, { useState } from 'react';
// import { FaEye, FaUserMd, FaUserPlus, FaSearch } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';

// function PatientList() {
//   const navigate = useNavigate();
//   // Mock data (replace with real data from API or state)
//   const patients = [
//     {
//       id: 1,
//       name: 'John Doe',
//       dob: '1990-01-01',
//       phone: '123-456-7890',
//       email: 'john.doe@example.com',
//     },
//     {
//       id: 2,
//       name: 'Jane Smith',
//       dob: '1985-05-10',
//       phone: '098-765-4321',
//       email: 'jane.smith@example.com',
//     },
//   ];

//   // State for search query and filter type
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterType, setFilterType] = useState('name'); // Default to searching by name

//   // Filter patients based on search query and filter type
//   const filteredPatients = patients.filter((patient) => {
//     if (!searchQuery) return true; // Show all if query is empty
//     const value = patient[filterType]?.toLowerCase() || '';
//     return value.includes(searchQuery.toLowerCase());
//   });

//   return (
//     <div className="p-6 bg-white">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//         <h2 className="flex items-center text-2xl font-bold text-gray-800">
//           <FaUserMd className="mr-2" size={28} />
//           Patient List
//         </h2>
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
//           {/* Search Bar */}
//           <div className="relative w-full sm:w-64">
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder={`Search by ${filterType}`}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//               aria-label={`Search patients by ${filterType}`}
//             />
//           </div>
//           {/* Filter Dropdown */}
//           <select
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             className="w-full sm:w-32 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//             aria-label="Select search filter"
//           >
//             <option value="name">Name</option>
//             <option value="phone">Phone</option>
//             <option value="email">Email</option>
//           </select>
//           {/* Add Patient Button */}
//           <button
//             onClick={() => navigate('/add-patient', { state: { mode: 'add' } })}
//             className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition w-full sm:w-auto justify-center"
//             aria-label="Register Patient"
//           >
//             <FaUserPlus className="mr-2" />
//             Add Patient
//           </button>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
//                 Name
//               </th>
//               <th className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
//                 Date of Birth
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
//             {filteredPatients.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="py-3 px-4 text-center text-gray-500">
//                   No patients found
//                 </td>
//               </tr>
//             ) : (
//               filteredPatients.map((patient) => (
//                 <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="py-3 px-4 border text-gray-800">{patient.name}</td>
//                   <td className="py-3 px-4 border text-gray-800">{patient.dob}</td>
//                   <td className="py-3 px-4 border text-gray-800">{patient.phone}</td>
//                   <td className="py-3 px-4 border text-gray-800">{patient.email}</td>
//                   <td className="py-3 px-4 border">
//                     <div className="flex space-x-2">
//                       <Link
//                         to={`/patients/${patient.id}`}
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
//     </div>
//   );
// }

// export default PatientList;