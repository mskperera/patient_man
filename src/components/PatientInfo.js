import React, { useState, useEffect } from 'react';
import { FaUser, FaNotesMedical, FaUserMd, FaEdit } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

function PatientInfo({ mode = 'view' }) {
  const navigate = useNavigate();
  const { id: patientId } = useParams();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(mode === 'add' || mode === 'edit');
  const [autoGenerateId, setAutoGenerateId] = useState(mode === 'add');
  const [patient, setPatient] = useState({
    patientId: '',
    name: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    phone: '',
    email: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    medicationAllergies: '',
    currentMedications: '',
    mentalHealth: '',
    lifestyle: '',
  });

  // Mock data for edit/view modes (replace with API in production)
  const mockPatients = [
    {
      id: '1',
      patientId: 'PT-0001',
      name: 'John Doe',
      dob: '1990-01-01',
      gender: 'Male',
      maritalStatus: 'Single',
      phone: '123-456-7890',
      email: 'john.doe@example.com',
      emergencyContactName: 'Jane Doe',
      emergencyContactPhone: '987-654-3210',
      medicationAllergies: 'Penicillin - Rash',
      currentMedications: 'Metformin 500mg, twice daily',
      mentalHealth: 'Stable, no known issues',
      lifestyle: 'Non-smoker, moderate exercise',
    },
    {
      id: '2',
      patientId: 'PT-0002',
      name: 'Jane Smith',
      dob: '1985-05-10',
      gender: 'Female',
      maritalStatus: 'Married',
      phone: '098-765-4321',
      email: 'jane.smith@example.com',
      emergencyContactName: 'John Smith',
      emergencyContactPhone: '123-123-1234',
      medicationAllergies: 'None',
      currentMedications: 'Lisinopril 10mg, daily',
      mentalHealth: 'Anxiety, managed with therapy',
      lifestyle: 'Smokes 5 cigarettes/day, light exercise',
    },
  ];

  // Load patient data for edit/view
  useEffect(() => {
    if (mode === 'edit' || mode === 'view') {
      const foundPatient = mockPatients.find((p) => p.id === patientId);
      if (foundPatient) {
        setPatient(foundPatient);
      }
    }
  }, [mode, patientId]);

  // Handle auto-generation of patientId
  useEffect(() => {
    if (isEditing && autoGenerateId) {
      // Simulate generating next ID based on mock data
      const maxId = mockPatients
        .map((p) => parseInt(p.patientId.replace('PT-', '')))
        .reduce((max, curr) => Math.max(max, curr), 0);
      const newId = `PT-${String(maxId + 1).padStart(4, '0')}`;
      setPatient((prev) => ({ ...prev, patientId: newId }));
    }
  }, [autoGenerateId, isEditing]);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log('Saving patient info:', patient);
    const savedPatientId = mode === 'add' ? Date.now().toString() : patientId;
    setIsEditing(false);
    navigate(`/patients/${savedPatientId}`);
  };

  const toggleEdit = async () => {
    if (isEditing) {
      await handleSubmit();
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="p-6 bg-white relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="flex items-center text-2xl font-bold text-gray-800">
          <FaUserMd className="mr-2" size={28} />
          Patient Information
        </h2>
        <button
          onClick={toggleEdit}
          className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition"
          aria-label={isEditing ? 'Save changes' : 'Edit patient info'}
        >
          <FaEdit className="mr-2" />
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
      <div className="flex space-x-2 mb-6 p-1 rounded-lg">
        <button
          className={`flex items-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'personal'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('personal')}
        >
          <FaUser className="mr-2" size={16} />
          Personal
        </button>
        <button
          className={`flex items-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'medical'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('medical')}
        >
          <FaNotesMedical className="mr-2" size={16} />
          Medical
        </button>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {activeTab === 'personal' && (
          <div className="space-y-8">
            {/* Demographics Section */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Demographics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Patient ID
                  </label>
                  <input
                    name="patientId"
                    value={patient.patientId}
                    onChange={handleChange}
                    className={`mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition ${
                      isEditing && autoGenerateId ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder="e.g., PT-0001"
                    disabled={!isEditing || autoGenerateId}
                    aria-label="Patient ID"
                  />
                  {isEditing && (
                    <label className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        checked={autoGenerateId}
                        onChange={(e) => setAutoGenerateId(e.target.checked)}
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                        aria-label="Auto-generate Patient ID"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        Auto-generate Patient ID
                      </span>
                    </label>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={patient.name}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    placeholder="Enter full name"
                    disabled={!isEditing}
                    aria-label="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={patient.dob}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    disabled={!isEditing}
                    aria-label="Date of birth"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={patient.gender}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    disabled={!isEditing}
                    aria-label="Gender"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Marital Status
                  </label>
                  <select
                    name="maritalStatus"
                    value={patient.maritalStatus}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    disabled={!isEditing}
                    aria-label="Marital status"
                  >
                    <option value="">Select status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>
            </section>
            {/* Contact Section */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={patient.phone}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    placeholder="Enter phone number"
                    disabled={!isEditing}
                    aria-label="Phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    name="email"
                    value={patient.email}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    placeholder="Enter email address"
                    disabled={!isEditing}
                    aria-label="Email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Emergency Contact Name
                  </label>
                  <input
                    name="emergencyContactName"
                    value={patient.emergencyContactName}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    placeholder="Enter contact name"
                    disabled={!isEditing}
                    aria-label="Emergency contact name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Emergency Contact Phone
                  </label>
                  <input
                    name="emergencyContactPhone"
                    value={patient.emergencyContactPhone}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    placeholder="Enter contact phone"
                    disabled={!isEditing}
                    aria-label="Emergency contact phone"
                  />
                </div>
              </div>
            </section>
          </div>
        )}
        {activeTab === 'medical' && (
          <div className="space-y-8">
            {/* Health Details Section */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Health Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Medication Allergies
                  </label>
                  <textarea
                    name="medicationAllergies"
                    value={patient.medicationAllergies}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    rows="4"
                    placeholder="List any medication allergies (e.g., Penicillin - Rash)"
                    disabled={!isEditing}
                    aria-label="Medication allergies"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Medications
                  </label>
                  <textarea
                    name="currentMedications"
                    value={patient.currentMedications}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    rows="4"
                    placeholder="List current medications (e.g., Metformin 500mg, twice daily)"
                    disabled={!isEditing}
                    aria-label="Current medications"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mental Health Status
                  </label>
                  <textarea
                    name="mentalHealth"
                    value={patient.mentalHealth}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    rows="4"
                    placeholder="Describe mental health status (e.g., Anxiety, stable with therapy)"
                    disabled={!isEditing}
                    aria-label="Mental health status"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Lifestyle Factors
                  </label>
                  <textarea
                    name="lifestyle"
                    value={patient.lifestyle}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    rows="4"
                    placeholder="Describe lifestyle (e.g., Smokes 5 cigarettes/day, moderate exercise)"
                    disabled={!isEditing}
                    aria-label="Lifestyle factors"
                  />
                </div>
              </div>
            </section>
          </div>
        )}
      </form>
    </div>
  );
}

export default PatientInfo;

// import React, { useState } from 'react';
// import { FaUser, FaNotesMedical, FaUserMd, FaEdit } from 'react-icons/fa';
// import Attachments from './Attachments';
// import { useNavigate, useParams } from 'react-router-dom';

// function PatientInfo({ mode = 'view' }) {
//     const navigate = useNavigate();
//     const { id: patientId } = useParams(); // Get patientId from URL for edit mode
//   const [activeTab, setActiveTab] = useState('personal');
//   const [isEditing, setIsEditing] = useState(mode === 'add' || mode === 'edit');
//   const [patient, setPatient] = useState({
//     name: '',
//     dob: '',
//     phone: '',
//     email: '',
//     allergies: '',
//     medications: '',
//     diagnosis: '',
//   });

//   const handleChange = (e) => {
//     setPatient({ ...patient, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//    // e.preventDefault();
//     console.log('Saving patient info:', patient);

//     // Generate a temporary ID for new patients (replace with backend API call in production)
//     const savedPatientId = mode === 'add' ? 11 : patientId;

//     // Simulate saving patient data (replace with actual API call)
//     // For example: await savePatient({ ...patient, id: savedPatientId });

//     setIsEditing(false);

//     // Navigate to the patient profile page
//     navigate(`/patients/${savedPatientId}`);
//   };

//   const toggleEdit =async () => {
    
//     if(isEditing){
//         await handleSubmit();
//     }
//     setIsEditing(!isEditing);
   
//   };

//   return (
//     <div className="p-6 bg-white relative">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="flex items-center text-2xl font-bold text-gray-800">
//           <FaUserMd className="mr-2" size={28} />
//           Patient Information
//         </h2>
//         {/* {mode !== 'add' && ( */}
//           <button
//             onClick={toggleEdit}
//             className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition"
//             aria-label={isEditing ? 'Save changes' : 'Edit patient info'}
//           >
//             <FaEdit className="mr-2" />
//             {isEditing ? 'Save' : 'Edit'}
//           </button>
//         {/* )} */}
//       </div>
//       <div className="flex space-x-2 mb-6 p-1 rounded-lg">
//         <button
//           className={`flex items-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
//             activeTab === 'personal'
//               ? 'bg-sky-600 text-white shadow-sm'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//           }`}
//           onClick={() => setActiveTab('personal')}
//         >
//           <FaUser className="mr-2" size={16} />
//           Personal
//         </button>
//         <button
//           className={`flex items-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
//             activeTab === 'medical'
//               ? 'bg-sky-600 text-white shadow-sm'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//           }`}
//           onClick={() => setActiveTab('medical')}
//         >
//           <FaNotesMedical className="mr-2" size={16} />
//           Medical
//         </button>
//       </div>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {activeTab === 'personal' && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Name</label>
//               <input
//                 name="name"
//                 value={patient.name}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                 placeholder="Enter full name"
//                 disabled={!isEditing}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
//               <input
//                 type="date"
//                 name="dob"
//                 value={patient.dob}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                 disabled={!isEditing}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Phone</label>
//               <input
//                 name="phone"
//                 value={patient.phone}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                 placeholder="Enter phone number"
//                 disabled={!isEditing}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 name="email"
//                 value={patient.email}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                 placeholder="Enter email address"
//                 disabled={!isEditing}
//               />
//             </div>
//           </div>
//         )}
//         {activeTab === 'medical' && (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Allergies</label>
//               <textarea
//                 name="allergies"
//                 value={patient.allergies}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                 rows="4"
//                 placeholder="List any allergies"
//                 disabled={!isEditing}
//               />
//             </div>
//           </div>
//         )}
//         {/* {isEditing &&  */}
//         {/* <Attachments /> */}
//         {/* <div className="flex justify-center">
//           <button
//             type="submit"
//             className="bg-sky-600 text-white px-6 py-3 rounded-md hover:bg-sky-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
//           >
//             Save Patient
//           </button>
//         </div> */}
//       </form>
//     </div>
//   );
// }

// export default PatientInfo;

// import React, { useState } from 'react';
// import { FaUser, FaNotesMedical, FaUserMd, FaEdit } from 'react-icons/fa';
// import Attachments from './Attachments';

// function PatientInfo() {
//   const [activeTab, setActiveTab] = useState('personal');
//   const [isEditing, setIsEditing] = useState(false);
//   const [patient, setPatient] = useState({
//     name: '',
//     dob: '',
//     phone: '',
//     email: '',
//     allergies: '',
//     medications: '',
//     diagnosis: '',
//   });

//   const handleChange = (e) => {
//     setPatient({ ...patient, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Saving patient info:', patient);
//     setIsEditing(false);
//   };

//   const toggleEdit = () => {
//     setIsEditing(!isEditing);
//   };

//   return (
//     <div className="p-6 bg-white relative">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="flex items-center text-2xl font-bold text-gray-800">
//           <FaUserMd className="mr-2" size={28} />
//           Patient Information
//         </h2>
//         <button
//           onClick={toggleEdit}
//           className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition"
//           aria-label={isEditing ? 'Save changes' : 'Edit patient info'}
//         >
//           <FaEdit className="mr-2" />
//           {isEditing ? 'Save' : 'Edit'}
//         </button>
//       </div>
//       <div className="flex space-x-2 mb-6 p-1 rounded-lg">
//         <button
//           className={`flex items-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
//             activeTab === 'personal'
//               ? 'bg-sky-600 text-white shadow-sm'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//           }`}
//           onClick={() => setActiveTab('personal')}
//         >
//           <FaUser className="mr-2" size={16} />
//           Personal
//         </button>
//         <button
//           className={`flex items-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
//             activeTab === 'medical'
//               ? 'bg-sky-600 text-white shadow-sm'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//           }`}
//           onClick={() => setActiveTab('medical')}
//         >
//           <FaNotesMedical className="mr-2" size={16} />
//           Medical
//         </button>
//       </div>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {activeTab === 'personal' && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Name
//               </label>
//               <input
//                 name="name"
//                 value={patient.name}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                 placeholder="Enter full name"
//                 disabled={!isEditing}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Date of Birth
//               </label>
//               <input
//                 type="date"
//                 name="dob"
//                 value={patient.dob}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                 disabled={!isEditing}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Phone
//               </label>
//               <input
//                 name="phone"
//                 value={patient.phone}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                 placeholder="Enter phone number"
//                 disabled={!isEditing}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 name="email"
//                 value={patient.email}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                 placeholder="Enter email address"
//                 disabled={!isEditing}
//               />
//             </div>
//           </div>
//         )}
//         {activeTab === 'medical' && (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Allergies
//               </label>
//               <textarea
//                 name="allergies"
//                 value={patient.allergies}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                 rows="4"
//                 placeholder="List any allergies"
//                 disabled={!isEditing}
//               />
//             </div>
//           </div>
//         )}
//         {<Attachments />}
//         {isEditing && (
//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="bg-sky-600 text-white px-6 py-3 rounded-md hover:bg-sky-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
//             >
//               Save Patient
//             </button>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// }

// export default PatientInfo;





// import React, { useState } from 'react';
// import { FaUser, FaNotesMedical, FaUserMd } from 'react-icons/fa';
// import Attachments from './Attachments';

// function PatientInfo() {
//   const [activeTab, setActiveTab] = useState('personal');
//   const [patient, setPatient] = useState({
//     name: '',
//     dob: '',
//     phone: '',
//     email: '',
//     allergies: '',
//     medications: '',
//     diagnosis: '',
//   });

//   const handleChange = (e) => {
//     setPatient({ ...patient, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Saving patient info:', patient);
//   };

//   return (
//     <div className="p-6 bg-white">
//     <h2 className="flex items-center text-2xl font-bold text-gray-800 mb-6">
//   <FaUserMd className="mr-2" size={28} />
//   Patient Information
// </h2>
//       <div className="flex space-x-2 mb-6  p-1 rounded-lg">
//   <button
//     className={`flex items-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
//       activeTab === 'personal'
//         ? 'bg-sky-600 text-white shadow-sm'
//         : 'bg-transparent text-gray-600 hover:bg-gray-200'
//     }`}
//     onClick={() => setActiveTab('personal')}
//   >
//     <FaUser className="mr-2" size={16} />
//     Personal
//   </button>
//   <button
//     className={`flex items-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
//       activeTab === 'medical'
//         ? 'bg-sky-600 text-white shadow-sm'
//         : 'bg-transparent text-gray-600 hover:bg-gray-200'
//     }`}
//     onClick={() => setActiveTab('medical')}
//   >
//     <FaNotesMedical className="mr-2" size={16} />
//     Medical
//   </button>
// </div>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {activeTab === 'personal' && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Name</label>
//               <input
//                 name="name"
//                 value={patient.name}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                 placeholder="Enter full name"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
//               <input
//                 type="date"
//                 name="dob"
//                 value={patient.dob}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Phone</label>
//               <input
//                 name="phone"
//                 value={patient.phone}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                 placeholder="Enter phone number"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 name="email"
//                 value={patient.email}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                 placeholder="Enter email address"
//               />
//             </div>
//           </div>
//         )}
//         {activeTab === 'medical' && (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Allergies</label>
//               <textarea
//                 name="allergies"
//                 value={patient.allergies}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                 rows="4"
//                 placeholder="List any allergies"
//               />
//             </div>
//           </div>
//         )}
//         <Attachments />
//         <div className="flex justify-center">
//           <button
//             type="submit"
//             className="bg-sky-600 text-white px-6 py-3 rounded-md hover:bg-sky-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
//           >
//             Save Patient
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default PatientInfo;