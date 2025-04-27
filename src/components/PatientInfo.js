import React, { useState, useEffect } from 'react';
import { FaUser, FaNotesMedical, FaUserMd, FaEdit, FaGraduationCap } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

function PatientInfo({ mode = 'view' }) {
  const navigate = useNavigate();
  const { id: patientId } = useParams();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(mode === 'add' || mode === 'edit');
  const [autoGenerateId, setAutoGenerateId] = useState(mode === 'add');
  // const [patient, setPatient] = useState({
  //   patientId: '',
  //   name: '',
  //   dob: '',
  //   age: '',
  //   gender: '',
  //   address: {
  //     street: '',
  //     city: '',
  //     state: '',
  //     zip: ''
  //   },
  //   homePhone: '',
  //   businessPhone: '',
  //   permanentAddress: '',
  //   referralSource: '',
  //   referralPartyPresent: '',
  //   maritalStatus: '',
  //   yearsMarried: '',
  //   maleChildrenAges: '',
  //   femaleChildrenAges: '',
  //   educationYears: '',
  //   religiosity: '',
  //   motherAge: '',
  //   motherDeceasedAge: '',
  //   ageWhenMotherDied: '',
  //   fatherAge: '',
  //   fatherDeceasedAge: '',
  //   ageWhenFatherDied: '',
  //   thingsLiked: '',
  //   assets: '',
  //   badPoints: '',
  //   socialDifficulties: '',
  //   mainComplaints: '',
  //   pastComplaints: '',
  //   worseConditions: '',
  //   improvedConditions: '',
  //   loveSexDifficulties: '',
  //   schoolWorkDifficulties: '',
  //   lifeGoals: '',
  //   thingsToChange: '',
  //   physicalAilments: '',
  //   occupation: '',
  //   occupationFullTime: false,
  //   spouseOccupation: '',
  //   spouseOccupationFullTime: false,
  //   motherOccupation: '',
  //   fatherOccupation: '',
  //   motherReligion: '',
  //   fatherReligion: '',
  //   raisedBy: '',
  //   motherDescription: '',
  //   fatherDescription: '',
  //   parentalSeparationAge: '',
  //   parentalDivorceAge: '',
  //   motherDivorceCount: '',
  //   fatherDivorceCount: '',
  //   livingBrothers: '',
  //   livingSisters: '',
  //   brothersAges: '',
  //   sistersAges: '',
  //   childNumber: '',
  //   familyChildren: '',
  //   adopted: '',
  //   previousTreatment: '',
  //   individualTherapyHours: '',
  //   individualTherapyYears: '',
  //   groupTherapyHours: '',
  //   psychiatricHospitalizationMonths: '',
  //   currentTreatment: '',
  //   antidepressantsCount: '',
  //   psychotherapyType: '',
  //   brotherDisturbances: '',
  //   sisterDisturbances: '',
  //   maleRelativesDisturbed: '',
  //   maleRelativesHospitalized: '',
  //   femaleRelativesDisturbed: '',
  //   femaleRelativesHospitalized: '',
  //   additionalInfo: ''
  // });

    // Default O/L subjects based on Sri Lankan education system
    
        // Default A/L subjects (Science stream as default, will allow stream selection)
        const defaultALSubjects = [
          { name: 'Combined Mathematics', followed: false, marks: '' },
          { name: 'Physics', followed: false, marks: '' },
          { name: 'Chemistry', followed: false, marks: '' }
        ];
    
    const defaultOLSubjects = [
      { name: 'First Language (Sinhala/Tamil)', followed: false, marks: '' },
      { name: 'Mathematics', followed: false, marks: '' },
      { name: 'English', followed: false, marks: '' },
      { name: 'Science', followed: false, marks: '' },
      { name: 'Religion', followed: false, marks: '' },
      { name: 'History', followed: false, marks: '' },
      { name: 'Art', followed: false, marks: '' },
      { name: 'Literature', followed: false, marks: '' },
      { name: 'Commerce', followed: false, marks: '' }
    ];

    const [patient, setPatient] = useState({
      patientId: '',
      name: '',
      dob: '',
      age: '',
      gender: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: ''
      },
      homePhone: '',
      businessPhone: '',
      permanentAddress: '',
      referralSource: '',
      referralPartyPresent: '',
      maritalStatus: '',
      yearsMarried: '',
      maleChildrenAges: '',
      femaleChildrenAges: '',
      educationYears: '',
      religiosity: '',
      motherAge: '',
      motherDeceasedAge: '',
      ageWhenMotherDied: '',
      fatherAge: '',
      fatherDeceasedAge: '',
      ageWhenFatherDied: '',
      thingsLiked: '',
      assets: '',
      badPoints: '',
      socialDifficulties: '',
      mainComplaints: '',
      pastComplaints: '',
      worseConditions: '',
      improvedConditions: '',
      loveSexDifficulties: '',
      schoolWorkDifficulties: '',
      lifeGoals: '',
      thingsToChange: '',
      physicalAilments: '',
      occupation: '',
      occupationFullTime: false,
      spouseOccupation: '',
      spouseOccupationFullTime: false,
      motherOccupation: '',
      fatherOccupation: '',
      motherReligion: '',
      fatherReligion: '',
      raisedBy: '',
      motherDescription: '',
      fatherDescription: '',
      parentalSeparationAge: '',
      parentalDivorceAge: '',
      motherDivorceCount: '',
      fatherDivorceCount: '',
      livingBrothers: '',
      livingSisters: '',
      brothersAges: '',
      sistersAges: '',
      childNumber: '',
      familyChildren: '',
      adopted: '',
      previousTreatment: '',
      individualTherapyHours: '',
      individualTherapyYears: '',
      groupTherapyHours: '',
      psychiatricHospitalizationMonths: '',
      currentTreatment: '',
      antidepressantsCount: '',
      psychotherapyType: '',
      brotherDisturbances: '',
      sisterDisturbances: '',
      maleRelativesDisturbed: '',
      maleRelativesHospitalized: '',
      femaleRelativesDisturbed: '',
      femaleRelativesHospitalized: '',
      additionalInfo: '',
      education: {
        ol: {
          subjects: defaultOLSubjects
        },
        al: {
          stream: '',
          subjects: defaultALSubjects,
          generalEnglishMarks: '',
          commonGeneralTestMarks: ''
        },
        university: [
          { degree: '', institution: '', marks: '' }
        ]
      }
    });


  

    
  // Mock data for edit/view modes
  // const mockPatients = [
  //   {
  //     id: '1',
  //     patientId: 'PT-0001',
  //     name: 'John Doe',
  //     dob: '1990-01-01',
  //     age: '35',
  //     gender: 'Male',
  //     address: { street: '123 Main St', city: 'New York', state: 'NY', zip: '10001' },
  //     homePhone: '123-456-7890',
  //     businessPhone: '987-654-3210',
  //     permanentAddress: '',
  //     referralSource: 'self',
  //     referralPartyPresent: 'No',
  //     maritalStatus: 'Single',
  //     yearsMarried: '',
  //     maleChildrenAges: '',
  //     femaleChildrenAges: '',
  //     educationYears: '16',
  //     religiosity: '3',
  //     motherAge: '60',
  //     motherDeceasedAge: '',
  //     ageWhenMotherDied: '',
  //     fatherAge: '62',
  //     fatherDeceasedAge: '',
  //     ageWhenFatherDied: '',
  //     thingsLiked: 'Reading, hiking',
  //     assets: 'Optimistic, good communicator',
  //     badPoints: 'Procrastination',
  //     socialDifficulties: 'Shyness in large groups',
  //     mainComplaints: 'Stress, anxiety',
  //     pastComplaints: 'Mild depression',
  //     worseConditions: 'High workload',
  //     improvedConditions: 'Vacation, relaxation',
  //     loveSexDifficulties: 'Difficulty maintaining relationships',
  //     schoolWorkDifficulties: 'Time management issues',
  //     lifeGoals: 'Career advancement, family',
  //     thingsToChange: 'Be more assertive',
  //     physicalAilments: 'None',
  //     occupation: 'Software Engineer',
  //     occupationFullTime: true,
  //     spouseOccupation: '',
  //     spouseOccupationFullTime: false,
  //     motherOccupation: 'Teacher',
  //     fatherOccupation: 'Accountant',
  //     motherReligion: 'Christian',
  //     fatherReligion: 'Christian',
  //     raisedBy: 'Parents',
  //     motherDescription: 'Supportive, strict',
  //     fatherDescription: 'Encouraging, busy',
  //     parentalSeparationAge: '',
  //     parentalDivorceAge: '',
  //     motherDivorceCount: '0',
  //     fatherDivorceCount: '0',
  //     livingBrothers: '1',
  //     livingSisters: '0',
  //     brothersAges: '30',
  //     sistersAges: '',
  //     childNumber: '1',
  //     familyChildren: '2',
  //     adopted: 'No',
  //     previousTreatment: 'Therapy',
  //     individualTherapyHours: '50',
  //     individualTherapyYears: '2',
  //     groupTherapyHours: '0',
  //     psychiatricHospitalizationMonths: '0',
  //     currentTreatment: 'No',
  //     antidepressantsCount: '0',
  //     psychotherapyType: 'CBT',
  //     brotherDisturbances: 'None',
  //     sisterDisturbances: '',
  //     maleRelativesDisturbed: '0',
  //     maleRelativesHospitalized: '0',
  //     femaleRelativesDisturbed: '0',
  //     femaleRelativesHospitalized: '0',
  //     additionalInfo: ''
  //   }
  // ];

  // Mock data for edit/view modes
  const mockPatients = [
    {
      id: '1',
      patientId: 'PT-0001',
      name: 'John Doe',
      dob: '1990-01-01',
      age: '35',
      gender: 'Male',
      address: { street: '123 Main St', city: 'New York', state: 'NY', zip: '10001' },
      homePhone: '123-456-7890',
      businessPhone: '987-654-3210',
      permanentAddress: '',
      referralSource: 'self',
      referralPartyPresent: 'No',
      maritalStatus: 'Single',
      yearsMarried: '',
      maleChildrenAges: '',
      femaleChildrenAges: '',
      educationYears: '16',
      religiosity: '3',
      motherAge: '60',
      motherDeceasedAge: '',
      ageWhenMotherDied: '',
      fatherAge: '62',
      fatherDeceasedAge: '',
      ageWhenFatherDied: '',
      thingsLiked: 'Reading, hiking',
      assets: 'Optimistic, good communicator',
      badPoints: 'Procrastination',
      socialDifficulties: 'Shyness in large groups',
      mainComplaints: 'Stress, anxiety',
      pastComplaints: 'Mild depression',
      worseConditions: 'High workload',
      improvedConditions: 'Vacation, relaxation',
      loveSexDifficulties: 'Difficulty maintaining relationships',
      schoolWorkDifficulties: 'Time management issues',
      lifeGoals: 'Career advancement, family',
      thingsToChange: 'Be more assertive',
      physicalAilments: 'None',
      occupation: 'Software Engineer',
      occupationFullTime: true,
      spouseOccupation: '',
      spouseOccupationFullTime: false,
      motherOccupation: 'Teacher',
      fatherOccupation: 'Accountant',
      motherReligion: 'Christian',
      fatherReligion: 'Christian',
      raisedBy: 'Parents',
      motherDescription: 'Supportive, strict',
      fatherDescription: 'Encouraging, busy',
      parentalSeparationAge: '',
      parentalDivorceAge: '',
      motherDivorceCount: '0',
      fatherDivorceCount: '0',
      livingBrothers: '1',
      livingSisters: '0',
      brothersAges: '30',
      sistersAges: '',
      childNumber: '1',
      familyChildren: '2',
      adopted: 'No',
      previousTreatment: 'Therapy',
      individualTherapyHours: '50',
      individualTherapyYears: '2',
      groupTherapyHours: '0',
      psychiatricHospitalizationMonths: '0',
      currentTreatment: 'No',
      antidepressantsCount: '0',
      psychotherapyType: 'CBT',
      brotherDisturbances: 'None',
      sisterDisturbances: '',
      maleRelativesDisturbed: '0',
      maleRelativesHospitalized: '0',
      femaleRelativesDisturbed: '0',
      femaleRelativesHospitalized: '0',
      additionalInfo: '',
      education: {
        ol: {
          subjects: defaultOLSubjects.map(subject => ({
            ...subject,
            followed: ['Mathematics', 'English', 'Science'].includes(subject.name),
            marks: ['Mathematics', 'English', 'Science'].includes(subject.name) ? 'A' : ''
          }))
        },
        al: {
          stream: 'Science',
          subjects: defaultALSubjects.map(subject => ({
            ...subject,
            followed: true,
            marks: 'A'
          })),
          generalEnglishMarks: 'B',
          commonGeneralTestMarks: '75'
        },
        university: [
          { degree: 'BSc in Computer Science', institution: 'University of Colombo', marks: 'First Class' }
        ]
      }
    }
  ];

  useEffect(() => {
    if (mode === 'edit' || mode === 'view') {
      const foundPatient = mockPatients.find((p) => p.id === patientId);
      if (foundPatient) {
        setPatient(foundPatient);
      }
    }
  }, [mode, patientId]);

  useEffect(() => {
    if (isEditing && autoGenerateId) {
      const maxId = mockPatients
        .map((p) => parseInt(p.patientId.replace('PT-', '')))
        .reduce((max, curr) => Math.max(max, curr), 0);
      const newId = `PT-${String(maxId + 1).padStart(4, '0')}`;
      setPatient((prev) => ({ ...prev, patientId: newId }));
    }
  }, [autoGenerateId, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const field = name.split('.')[1];
      setPatient((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value }
      }));
    } else {
      setPatient((prev) => ({ ...prev, [name]: value }));
    }
  };

  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name.includes('education.ol.subjects')) {
      const [_, __, ___, index, field] = name.split('.');
      setPatient((prev) => {
        const updatedSubjects = [...prev.education.ol.subjects];
        updatedSubjects[index] = { ...updatedSubjects[index], [field]: checked };
        return { ...prev, education: { ...prev.education, ol: { ...prev.education.ol, subjects: updatedSubjects } } };
      });
    } else if (name.includes('education.al.subjects')) {
      const [_, __, ___, index, field] = name.split('.');
      setPatient((prev) => {
        const updatedSubjects = [...prev.education.al.subjects];
        updatedSubjects[index] = { ...updatedSubjects[index], [field]: checked };
        return { ...prev, education: { ...prev.education, al: { ...prev.education.al, subjects: updatedSubjects } } };
      });
    }
  };


  
  const addCustomSubject = (level) => {
    setPatient((prev) => {
      const newSubject = { name: '', followed: true, marks: '' };
      if (level === 'ol') {
        return {
          ...prev,
          education: {
            ...prev.education,
            ol: {
              ...prev.education.ol,
              subjects: [...prev.education.ol.subjects, newSubject]
            }
          }
        };
      } else {
        return {
          ...prev,
          education: {
            ...prev.education,
            al: {
              ...prev.education.al,
              subjects: [...prev.education.al.subjects, newSubject]
            }
          }
        };
      }
    });
  };

  const addUniversityQualification = () => {
    setPatient((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        university: [...prev.education.university, { degree: '', institution: '', marks: '' }]
      }
    }));
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="flex items-center text-3xl font-bold text-gray-800">
          <FaUserMd className="mr-3" size={32} />
          Patient Biographical Information
        </h2>
        <button
          onClick={toggleEdit}
          className="flex items-center bg-sky-600 text-white px-5 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200 shadow-md"
          aria-label={isEditing ? 'Save changes' : 'Edit patient info'}
        >
          <FaEdit className="mr-2" />
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
      <div className="flex space-x-3 mb-6 p-1 bg-gray-200 rounded-lg">
        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === 'personal'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'bg-transparent text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('personal')}
        >
          <FaUser className="mr-2" size={16} />
          Personal
        </button>
        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === 'family'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'bg-transparent text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('family')}
        >
          <FaUser className="mr-2" size={16} />
          Family
        </button>
        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === 'education'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'bg-transparent text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('education')}
        >
          <FaGraduationCap className="mr-2" size={16} />
          Education
        </button>
        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === 'medical'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'bg-transparent text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('medical')}
        >
          <FaNotesMedical className="mr-2" size={16} />
          Medical
        </button>
   
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-8 p-6 ">
        {activeTab === 'personal' && (
          <div className="space-y-10">
            {/* Basic Information */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-2">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Patient ID</label>
                  <input
                    name="patientId"
                    value={patient.patientId}
                    onChange={handleChange}
                    className={`mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 ${
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
                      <span className="ml-2 text-sm text-gray-600">Auto-generate Patient ID</span>
                    </label>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    name="name"
                    value={patient.name}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter full name"
                    disabled={!isEditing}
                    aria-label="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={patient.dob}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    disabled={!isEditing}
                    aria-label="Date of birth"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={patient.age}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter age"
                    disabled={!isEditing}
                    aria-label="Age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sex</label>
                  <div className="flex space-x-4 mt-1">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={patient.gender === 'Male'}
                        onChange={handleChange}
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                        disabled={!isEditing}
                        aria-label="Male"
                      />
                      <span className="ml-2 text-sm text-gray-700">Male</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={patient.gender === 'Female'}
                        onChange={handleChange}
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                        disabled={!isEditing}
                        aria-label="Female"
                      />
                      <span className="ml-2 text-sm text-gray-700">Female</span>
                    </label>
                  </div>
                </div>
              </div>
            </section>
            {/* Address Information */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-2">Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Street</label>
                  <input
                    name="address.street"
                    value={patient.address.street}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter street"
                    disabled={!isEditing}
                    aria-label="Street"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    name="address.city"
                    value={patient.address.city}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter city"
                    disabled={!isEditing}
                    aria-label="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  <input
                    name="address.state"
                    value={patient.address.state}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter state"
                    disabled={!isEditing}
                    aria-label="State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                  <input
                    name="address.zip"
                    value={patient.address.zip}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter zip code"
                    disabled={!isEditing}
                    aria-label="Zip code"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Permanent Address (if different)</label>
                  <textarea
                    name="permanentAddress"
                    value={patient.permanentAddress}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="3"
                    placeholder="Enter permanent address"
                    disabled={!isEditing}
                    aria-label="Permanent address"
                  />
                </div>
              </div>
            </section>
            {/* Contact Information */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-2">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Home Phone</label>
                  <input
                    name="homePhone"
                    value={patient.homePhone}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter home phone"
                    disabled={!isEditing}
                    aria-label="Home phone"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Business Phone</label>
                  <input
                    name="businessPhone"
                    value={patient.businessPhone}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter business phone"
                    disabled={!isEditing}
                    aria-label="Business phone"
                  />
                </div>
              </div>
            </section>
            {/* Referral Information */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-2">Referral Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Who referred you to the Institute?</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                    {['Self', 'School or Teacher', 'Psychologist or Psychiatrist', 'Social Agency', 'Hospital or Clinic', 'Family Doctor', 'Friend', 'Relative', 'Other'].map((source) => (
                      <label key={source} className="flex items-center">
                        <input
                          type="radio"
                          name="referralSource"
                          value={source.toLowerCase()}
                          checked={patient.referralSource === source.toLowerCase()}
                          onChange={handleChange}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                          disabled={!isEditing}
                          aria-label={source}
                        />
                        <span className="ml-2 text-sm text-gray-700">{source}</span>
                      </label>
                    ))}
                  </div>
                  {patient.referralSource === 'other' && (
                    <input
                      name="referralSourceOther"
                      value={patient.referralSourceOther || ''}
                      onChange={handleChange}
                      className="mt-3 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Please specify"
                      disabled={!isEditing}
                      aria-label="Other referral source"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Has this party been here?</label>
                  <div className="flex space-x-4 mt-1">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="referralPartyPresent"
                        value="Yes"
                        checked={patient.referralPartyPresent === 'Yes'}
                        onChange={handleChange}
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                        disabled={!isEditing}
                        aria-label="Yes"
                      />
                      <span className="ml-2 text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="referralPartyPresent"
                        value="No"
                        checked={patient.referralPartyPresent === 'No'}
                        onChange={handleChange}
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                        disabled={!isEditing}
                        aria-label="No"
                      />
                      <span className="ml-2 text-sm text-gray-700">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </section>
            {/* Personal Details */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-2">Personal Details</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Present Marital Status</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {[
                      'Never Married',
                      'Married (Living Together) Now for First Time',
                      'Married (Living Together) Now for Second (or More) Time',
                      'Separated',
                      'Divorced and Not Remarried',
                      'Widowed and Not Remarried'
                    ].map((status, index) => (
                      <label key={status} className="flex items-center">
                        <input
                          type="radio"
                          name="maritalStatus"
                          value={status.toLowerCase()}
                          checked={patient.maritalStatus === status.toLowerCase()}
                          onChange={handleChange}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                          disabled={!isEditing}
                          aria-label={status}
                        />
                        <span className="ml-2 text-sm text-gray-700">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {(patient.maritalStatus.includes('married') || patient.maritalStatus.includes('widowed')) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Number of Years Married to Present Spouse</label>
                    <input
                      type="number"
                      name="yearsMarried"
                      value={patient.yearsMarried}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter years"
                      disabled={!isEditing}
                      aria-label="Years married"
                    />
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ages of Male Children</label>
                    <input
                      name="maleChildrenAges"
                      value={patient.maleChildrenAges}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="e.g., 5, 10, 15"
                      disabled={!isEditing}
                      aria-label="Male children ages"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ages of Female Children</label>
                    <input
                      name="femaleChildrenAges"
                      value={patient.femaleChildrenAges}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="e.g., 3, 8"
                      disabled={!isEditing}
                      aria-label="Female children ages"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Years of Formal Education Completed</label>
                  <select
                    name="educationYears"
                    value={patient.educationYears}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    disabled={!isEditing}
                    aria-label="Education years"
                  >
                    <option value="">Select years</option>
                    {[...Array(21)].map((_, i) => (
                      <option key={i} value={i}>
                        {i === 20 ? 'More than 20' : i}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    How religious are you? (1 = Not Religious, 9 = Very Religious)
                  </label>
                  <select
                    name="religiosity"
                    value={patient.religiosity}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    disabled={!isEditing}
                    aria-label="Religiosity"
                  >
                    <option value="">Select level</option>
                    {[...Array(9)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>
            {/* Personal Insights */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-2">Personal Insights</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Things you like to do most, kinds of things and persons that give you pleasure
                  </label>
                  <textarea
                    name="thingsLiked"
                    value={patient.thingsLiked}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="Describe your interests and pleasures"
                    disabled={!isEditing}
                    aria-label="Things liked"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Main assets and good points</label>
                  <textarea
                    name="assets"
                    value={patient.assets}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="List your strengths"
                    disabled={!isEditing}
                    aria-label="Assets"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Main bad points</label>
                  <textarea
                    name="badPoints"
                    value={patient.badPoints}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="List your weaknesses"
                    disabled={!isEditing}
                    aria-label="Bad points"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Main social difficulties</label>
                  <textarea
                    name="socialDifficulties"
                    value={patient.socialDifficulties}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="Describe social challenges"
                    disabled={!isEditing}
                    aria-label="Social difficulties"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Main love and sex difficulties</label>
                  <textarea
                    name="loveSexDifficulties"
                    value={patient.loveSexDifficulties}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="Describe relationship challenges"
                    disabled={!isEditing}
                    aria-label="Love and sex difficulties"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Main school or work difficulties</label>
                  <textarea
                    name="schoolWorkDifficulties"
                    value={patient.schoolWorkDifficulties}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="Describe professional/academic challenges"
                    disabled={!isEditing}
                    aria-label="School or work difficulties"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Main life goals</label>
                  <textarea
                    name="lifeGoals"
                    value={patient.lifeGoals}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="List your life goals"
                    disabled={!isEditing}
                    aria-label="Life goals"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Things about yourself you would most like to change</label>
                  <textarea
                    name="thingsToChange"
                    value={patient.thingsToChange}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="Describe desired changes"
                    disabled={!isEditing}
                    aria-label="Things to change"
                  />
                </div>
              </div>
            </section>
            {/* Occupation Information */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-2">Occupation Information</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">What occupation(s) have you mainly been trained for?</label>
                    <input
                      name="occupation"
                      value={patient.occupation}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter occupation"
                      disabled={!isEditing}
                      aria-label="Occupation"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Present Occupation</label>
                    <div className="flex items-center space-x-4 mt-1">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="occupationFullTime"
                          checked={patient.occupationFullTime}
                          onChange={(e) => setPatient({ ...patient, occupationFullTime: e.target.checked })}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                          disabled={!isEditing}
                          aria-label="Full-time"
                        />
                        <span className="ml-2 text-sm text-gray-700">Full-time</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="occupationFullTime"
                          checked={!patient.occupationFullTime}
                          onChange={(e) => setPatient({ ...patient, occupationFullTime: !e.target.checked })}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                          disabled={!isEditing}
                          aria-label="Part-time"
                        />
                        <span className="ml-2 text-sm text-gray-700">Part-time</span>
                      </label>
                    </div>
                  </div>
                </div>
                {(patient.maritalStatus.includes('married') || patient.maritalStatus.includes('widowed')) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Spouse's Occupation</label>
                      <input
                        name="spouseOccupation"
                        value={patient.spouseOccupation}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter spouse's occupation"
                        disabled={!isEditing}
                        aria-label="Spouse's occupation"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Spouse's Occupation Status</label>
                      <div className="flex items-center space-x-4 mt-1">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="spouseOccupationFullTime"
                            checked={patient.spouseOccupationFullTime}
                            onChange={(e) => setPatient({ ...patient, spouseOccupationFullTime: e.target.checked })}
                            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                            disabled={!isEditing}
                            aria-label="Spouse full-time"
                          />
                          <span className="ml-2 text-sm text-gray-700">Full-time</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="spouseOccupationFullTime"
                            checked={!patient.spouseOccupationFullTime}
                            onChange={(e) => setPatient({ ...patient, spouseOccupationFullTime: !e.target.checked })}
                            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                            disabled={!isEditing}
                            aria-label="Spouse part-time"
                          />
                          <span className="ml-2 text-sm text-gray-700">Part-time</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
        {activeTab === 'family' && (
          <div className="space-y-10">
            {/* Parental Information */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-2">Parental Information</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mother's Age</label>
                    <input
                      type="number"
                      name="motherAge"
                      value={patient.motherAge}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter mother's age"
                      disabled={!isEditing}
                      aria-label="Mother's age"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">If deceased, how old were you when she died?</label>
                    <input
                      type="number"
                      name="ageWhenMotherDied"
                      value={patient.ageWhenMotherDied}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter your age at time of death"
                      disabled={!isEditing}
                      aria-label="Age when mother died"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Father's Age</label>
                    <input
                      type="number"
                      name="fatherAge"
                      value={patient.fatherAge}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter father's age"
                      disabled={!isEditing}
                      aria-label="Father's age"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">If deceased, how old were you when he died?</label>
                    <input
                      type="number"
                      name="ageWhenFatherDied"
                      value={patient.ageWhenFatherDied}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter your age at time of death"
                      disabled={!isEditing}
                      aria-label="Age when father died"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mother's Occupation</label>
                    <input
                      name="motherOccupation"
                      value={patient.motherOccupation}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter mother's occupation"
                      disabled={!isEditing}
                      aria-label="Mother's occupation"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Father's Occupation</label>
                    <input
                      name="fatherOccupation"
                      value={patient.fatherOccupation}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter father's occupation"
                      disabled={!isEditing}
                      aria-label="Father's occupation"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mother's Religion</label>
                    <input
                      name="motherReligion"
                      value={patient.motherReligion}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter mother's religion"
                      disabled={!isEditing}
                      aria-label="Mother's religion"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Father's Religion</label>
                    <input
                      name="fatherReligion"
                      value={patient.fatherReligion}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter father's religion"
                      disabled={!isEditing}
                      aria-label="Father's religion"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">If your mother and father did not raise you when you were young, who did?</label>
                  <input
                    name="raisedBy"
                    value={patient.raisedBy}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter who raised you"
                    disabled={!isEditing}
                    aria-label="Raised by"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Describe the type of person your mother (or stepmother) was when you were a child and how you got along with her
                  </label>
                  <textarea
                    name="motherDescription"
                    value={patient.motherDescription}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="Describe your mother and relationship"
                    disabled={!isEditing}
                    aria-label="Mother description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Describe the type of person your father (or stepfather) was when you were a child and how you got along with him
                  </label>
                  <textarea
                    name="fatherDescription"
                    value={patient.fatherDescription}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="Describe your father and relationship"
                    disabled={!isEditing}
                    aria-label="Father description"
                  />
                </div>
              </div>
            </section>
            {/* Sibling Information */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-2">Sibling Information</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">If your mother and father separated, how old were you at the time?</label>
                    <input
                      type="number"
                      name="parentalSeparationAge"
                      value={patient.parentalSeparationAge}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter age"
                      disabled={!isEditing}
                      aria-label="Parental separation age"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">If your mother and father divorced, how old were you at the time?</label>
                    <input
                      type="number"
                      name="parentalDivorceAge"
                      value={patient.parentalDivorceAge}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter age"
                      disabled={!isEditing}
                      aria-label="Parental divorce age"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total number of times mother divorced</label>
                    <input
                      type="number"
                      name="motherDivorceCount"
                      value={patient.motherDivorceCount}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter number"
                      disabled={!isEditing}
                      aria-label="Mother divorce count"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total number of times father divorced</label>
                    <input
                      type="number"
                      name="fatherDivorceCount"
                      value={patient.fatherDivorceCount}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter number"
                      disabled={!isEditing}
                      aria-label="Father divorce count"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Number of living brothers</label>
                    <input
                      type="number"
                      name="livingBrothers"
                      value={patient.livingBrothers}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter number"
                      disabled={!isEditing}
                      aria-label="Living brothers"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Number of living sisters</label>
                    <input
                      type="number"
                      name="livingSisters"
                      value={patient.livingSisters}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter number"
                      disabled={!isEditing}
                      aria-label="Living sisters"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ages of living brothers</label>
                    <input
                      name="brothersAges"
                      value={patient.brothersAges}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="e.g., 20, 25"
                      disabled={!isEditing}
                      aria-label="Brothers ages"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ages of living sisters</label>
                    <input
                      name="sistersAges"
                      value={patient.sistersAges}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="e.g., 18, 22"
                      disabled={!isEditing}
                      aria-label="Sisters ages"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">I was child number</label>
                    <input
                      type="number"
                      name="childNumber"
                      value={patient.childNumber}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter number"
                      disabled={!isEditing}
                      aria-label="Child number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">In a family of children</label>
                    <input
                      type="number"
                      name="familyChildren"
                      value={patient.familyChildren}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter total number"
                      disabled={!isEditing}
                      aria-label="Family children"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Were you adopted?</label>
                  <div className="flex space-x-4 mt-1">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="adopted"
                        value="Yes"
                        checked={patient.adopted === 'Yes'}
                        onChange={handleChange}
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                        disabled={!isEditing}
                        aria-label="Adopted yes"
                      />
                      <span className="ml-2 text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="adopted"
                        value="No"
                        checked={patient.adopted === 'No'}
                        onChange={handleChange}
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                        disabled={!isEditing}
                        aria-label="Adopted no"
                      />
                      <span className="ml-2 text-sm text-gray-700">No</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">If there were unusually disturbing features in your relationship to any of your brothers, briefly describe</label>
                  <textarea
                    name="brotherDisturbances"
                    value={patient.brotherDisturbances}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="Describe any issues"
                    disabled={!isEditing}
                    aria-label="Brother disturbances"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">If there were unusually disturbing features in your relationship to any of your sisters, briefly describe</label>
                  <textarea
                    name="sisterDisturbances"
                    value={patient.sisterDisturbances}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="Describe any issues"
                    disabled={!isEditing}
                    aria-label="Sister disturbances"
                  />
                </div>
              </div>
            </section>
            {/* Family Mental Health */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-2">Family Mental Health</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Number of close male relatives who have been seriously emotionally disturbed</label>
                  <input
                    type="number"
                    name="maleRelativesDisturbed"
                    value={patient.maleRelativesDisturbed}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter number"
                    disabled={!isEditing}
                    aria-label="Male relatives disturbed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Number that have been hospitalized for psychiatric treatment, or have attempted suicide</label>
                  <input
                    type="number"
                    name="maleRelativesHospitalized"
                    value={patient.maleRelativesHospitalized}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter number"
                    disabled={!isEditing}
                    aria-label="Male relatives hospitalized"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Number of close female relatives who have been seriously emotionally disturbed</label>
                  <input
                    type="number"
                    name="femaleRelativesDisturbed"
                    value={patient.femaleRelativesDisturbed}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter number"
                    disabled={!isEditing}
                    aria-label="Female relatives disturbed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Number that have been hospitalized for psychiatric treatment, or have attempted suicide</label>
                  <input
                    type="number"
                    name="femaleRelativesHospitalized"
                    value={patient.femaleRelativesHospitalized}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter number"
                    disabled={!isEditing}
                    aria-label="Female relatives hospitalized"
                  />
                </div>
              </div>
            </section>
          </div>
        )}
        {activeTab === 'medical' && (
          <div className="space-y-10">
            {/* Health Details */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-2">Health Details</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Chief physical ailments, diseases, complaints, or handicaps</label>
                  <textarea
                    name="physicalAilments"
                    value={patient.physicalAilments}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="List physical health issues"
                    disabled={!isEditing}
                    aria-label="Physical ailments"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Briefly list your present main complaints, symptoms, and problems</label>
                  <textarea
                    name="mainComplaints"
                    value={patient.mainComplaints}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="List current issues"
                    disabled={!isEditing}
                    aria-label="Main complaints"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Briefly list any additional past complaints, symptoms, and problems</label>
                  <textarea
                    name="pastComplaints"
                    value={patient.pastComplaints}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="List past issues"
                    disabled={!isEditing}
                    aria-label="Past complaints"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Under what conditions are your problems worse?</label>
                  <textarea
                    name="worseConditions"
                    value={patient.worseConditions}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="Describe conditions"
                    disabled={!isEditing}
                    aria-label="Worse conditions"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Under what conditions are they improved?</label>
                  <textarea
                    name="improvedConditions"
                    value={patient.improvedConditions}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="Describe conditions"
                    disabled={!isEditing}
                    aria-label="Improved conditions"
                  />
                </div>
              </div>
            </section>
            {/* Treatment History */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-2">Treatment History</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">What kind of treatment have you previously had for emotional problems?</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Hours of individual therapy, spread over years, ending years ago</label>
                      <div className="flex space-x-4 mt-1">
                        <input
                          type="number"
                          name="individualTherapyHours"
                          value={patient.individualTherapyHours}
                          onChange={handleChange}
                          className="w-1/2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                          placeholder="Hours"
                          disabled={!isEditing}
                          aria-label="Individual therapy hours"
                        />
                        <input
                          type="number"
                          name="individualTherapyYears"
                          value={patient.individualTherapyYears}
                          onChange={handleChange}
                          className="w-1/2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                          placeholder="Years"
                          disabled={!isEditing}
                          aria-label="Individual therapy years"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Hours of group therapy</label>
                      <input
                        type="number"
                        name="groupTherapyHours"
                        value={patient.groupTherapyHours}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter hours"
                        disabled={!isEditing}
                        aria-label="Group therapy hours"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Months of psychiatric hospitalization</label>
                      <input
                        type="number"
                        name="psychiatricHospitalizationMonths"
                        value={patient.psychiatricHospitalizationMonths}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter months"
                        disabled={!isEditing}
                        aria-label="Psychiatric hospitalization months"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Are you undergoing treatment anywhere else now?</label>
                  <div className="flex space-x-4 mt-1">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="currentTreatment"
                        value="Yes"
                        checked={patient.currentTreatment === 'Yes'}
                        onChange={handleChange}
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                        disabled={!isEditing}
                        aria-label="Current treatment yes"
                      />
                      <span className="ml-2 text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="currentTreatment"
                        value="No"
                        checked={patient.currentTreatment === 'No'}
                        onChange={handleChange}
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                        disabled={!isEditing}
                        aria-label="Current treatment no"
                      />
                      <span className="ml-2 text-sm text-gray-700">No</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Number of times during past year you have taken antidepressants</label>
                  <input
                    type="number"
                    name="antidepressantsCount"
                    value={patient.antidepressantsCount}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter number"
                    disabled={!isEditing}
                    aria-label="Antidepressants count"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type of psychotherapy you have mainly had (e.g., dream analysis, free association, drugs, hypnosis, etc.)</label>
                  <input
                    name="psychotherapyType"
                    value={patient.psychotherapyType}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter type of psychotherapy"
                    disabled={!isEditing}
                    aria-label="Psychotherapy type"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Additional information that you think might be helpful</label>
                  <textarea
                    name="additionalInfo"
                    value={patient.additionalInfo}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="Provide additional details"
                    disabled={!isEditing}
                    aria-label="Additional info"
                  />
                </div>
              </div>
            </section>
          </div>
        )}
        {activeTab === 'education' && (
  <div className="space-y-10">
    {/* G.C.E Ordinary Level (O/L) Qualifications */}
    <section>
      <h3 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-2">G.C.E Ordinary Level (O/L) Qualifications</h3>
      <div className="space-y-4">
        {patient.education.ol.subjects.map((subject, index) => (
          <div key={index} className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name={`education.ol.subjects.${index}.followed`}
                checked={subject.followed}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                disabled={!isEditing}
                aria-label={`Studied ${subject.name}`}
              />
              <span className="ml-2 text-sm text-gray-700">Studied</span>
            </label>
            <input
              name={`education.ol.subjects.${index}.name`}
              value={subject.name}
              onChange={handleChange}
              className="w-1/3 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
              placeholder="Subject name"
              disabled={!isEditing || index < defaultOLSubjects.length}
              aria-label={`O/L Subject ${index + 1} name`}
            />
            <input
              name={`education.ol.subjects.${index}.marks`}
              value={subject.marks}
              onChange={handleChange}
              className="w-1/4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
              placeholder="Grade (e.g., A, B, C, S, W)"
              disabled={!isEditing || !subject.followed}
              aria-label={`O/L Subject ${index + 1} marks`}
            />
          </div>
        ))}
        {isEditing && (
          <button
            type="button"
            onClick={() => addCustomSubject('ol')}
            className="mt-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-all duration-200"
          >
            Add Custom O/L Subject
          </button>
        )}
      </div>
    </section>
    {/* G.C.E Advanced Level (A/L) Qualifications */}
    <section>
      <h3 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-2">G.C.E Advanced Level (A/L) Qualifications</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Stream</label>
          <select
            name="education.al.stream"
            value={patient.education.al.stream}
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
            disabled={!isEditing}
            aria-label="A/L Stream"
          >
            <option value="">Select stream</option>
            <option value="Science">Science</option>
            <option value="Commerce">Commerce</option>
            <option value="Arts">Arts</option>
            <option value="Technology">Technology</option>
          </select>
        </div>
        {patient.education.al.subjects.map((subject, index) => (
          <div key={index} className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name={`education.al.subjects.${index}.followed`}
                checked={subject.followed}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                disabled={!isEditing}
                aria-label={`Studied ${subject.name}`}
              />
              <span className="ml-2 text-sm text-gray-700">Studied</span>
            </label>
            <input
              name={`education.al.subjects.${index}.name`}
              value={subject.name}
              onChange={handleChange}
              className="w-1/3 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
              placeholder="Subject name"
              disabled={!isEditing || index < defaultALSubjects.length}
              aria-label={`A/L Subject ${index + 1} name`}
            />
            <input
              name={`education.al.subjects.${index}.marks`}
              value={subject.marks}
              onChange={handleChange}
              className="w-1/4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
              placeholder="Grade (e.g., A, B, C, S, W)"
              disabled={!isEditing || !subject.followed}
              aria-label={`A/L Subject ${index + 1} marks`}
            />
          </div>
        ))}
        {isEditing && (
          <button
            type="button"
            onClick={() => addCustomSubject('al')}
            className="mt-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-all duration-200"
          >
            Add Custom A/L Subject
          </button>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">General English Marks</label>
            <input
              name="education.al.generalEnglishMarks"
              value={patient.education.al.generalEnglishMarks}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
              placeholder="Grade (e.g., A, B, C, S, W)"
              disabled={!isEditing}
              aria-label="General English Marks"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Common General Test Marks</label>
            <input
              name="education.al.commonGeneralTestMarks"
              value={patient.education.al.commonGeneralTestMarks}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
              placeholder="Marks (e.g., 75)"
              disabled={!isEditing}
              aria-label="Common General Test Marks"
            />
          </div>
        </div>
      </div>
    </section>
    {/* University Qualifications */}
    <section>
      <h3 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-2">University Qualifications</h3>
      <div className="space-y-4">
        {patient.education.university.map((qualification, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Degree</label>
              <input
                name={`education.university.${index}.degree`}
                value={qualification.degree}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                placeholder="e.g., BSc in Computer Science"
                disabled={!isEditing}
                aria-label={`Degree ${index + 1}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Institution</label>
              <input
                name={`education.university.${index}.institution`}
                value={qualification.institution}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                placeholder="e.g., University of Colombo"
                disabled={!isEditing}
                aria-label={`Institution ${index + 1}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Marks/Grade</label>
              <input
                name={`education.university.${index}.marks`}
                value={qualification.marks}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                placeholder="e.g., First Class"
                disabled={!isEditing}
                aria-label={`Marks ${index + 1}`}
              />
            </div>
          </div>
        ))}
        {isEditing && (
          <button
            type="button"
            onClick={addUniversityQualification}
            className="mt-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-all duration-200"
          >
            Add University Qualification
          </button>
        )}
      </div>
    </section>
  </div>
)}
      </form>
    </div>
  );
}

export default PatientInfo;

// import React, { useState, useEffect } from 'react';
// import { FaUser, FaNotesMedical, FaUserMd, FaEdit } from 'react-icons/fa';
// import { useNavigate, useParams } from 'react-router-dom';

// function PatientInfo({ mode = 'view' }) {
//   const navigate = useNavigate();
//   const { id: patientId } = useParams();
//   const [activeTab, setActiveTab] = useState('personal');
//   const [isEditing, setIsEditing] = useState(mode === 'add' || mode === 'edit');
//   const [autoGenerateId, setAutoGenerateId] = useState(mode === 'add');
//   const [patient, setPatient] = useState({
//     patientId: '',
//     name: '',
//     dob: '',
//     gender: '',
//     maritalStatus: '',
//     phone: '',
//     email: '',
//     emergencyContactName: '',
//     emergencyContactPhone: '',
//     medicationAllergies: '',
//     currentMedications: '',
//     mentalHealth: '',
//     lifestyle: '',
//   });

//   // Mock data for edit/view modes (replace with API in production)
//   const mockPatients = [
//     {
//       id: '1',
//       patientId: 'PT-0001',
//       name: 'John Doe',
//       dob: '1990-01-01',
//       gender: 'Male',
//       maritalStatus: 'Single',
//       phone: '123-456-7890',
//       email: 'john.doe@example.com',
//       emergencyContactName: 'Jane Doe',
//       emergencyContactPhone: '987-654-3210',
//       medicationAllergies: 'Penicillin - Rash',
//       currentMedications: 'Metformin 500mg, twice daily',
//       mentalHealth: 'Stable, no known issues',
//       lifestyle: 'Non-smoker, moderate exercise',
//     },
//     {
//       id: '2',
//       patientId: 'PT-0002',
//       name: 'Jane Smith',
//       dob: '1985-05-10',
//       gender: 'Female',
//       maritalStatus: 'Married',
//       phone: '098-765-4321',
//       email: 'jane.smith@example.com',
//       emergencyContactName: 'John Smith',
//       emergencyContactPhone: '123-123-1234',
//       medicationAllergies: 'None',
//       currentMedications: 'Lisinopril 10mg, daily',
//       mentalHealth: 'Anxiety, managed with therapy',
//       lifestyle: 'Smokes 5 cigarettes/day, light exercise',
//     },
//   ];

//   // Load patient data for edit/view
//   useEffect(() => {
//     if (mode === 'edit' || mode === 'view') {
//       const foundPatient = mockPatients.find((p) => p.id === patientId);
//       if (foundPatient) {
//         setPatient(foundPatient);
//       }
//     }
//   }, [mode, patientId]);

//   // Handle auto-generation of patientId
//   useEffect(() => {
//     if (isEditing && autoGenerateId) {
//       // Simulate generating next ID based on mock data
//       const maxId = mockPatients
//         .map((p) => parseInt(p.patientId.replace('PT-', '')))
//         .reduce((max, curr) => Math.max(max, curr), 0);
//       const newId = `PT-${String(maxId + 1).padStart(4, '0')}`;
//       setPatient((prev) => ({ ...prev, patientId: newId }));
//     }
//   }, [autoGenerateId, isEditing]);

//   const handleChange = (e) => {
//     setPatient({ ...patient, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     console.log('Saving patient info:', patient);
//     const savedPatientId = mode === 'add' ? Date.now().toString() : patientId;
//     setIsEditing(false);
//     navigate(`/patients/${savedPatientId}`);
//   };

//   const toggleEdit = async () => {
//     if (isEditing) {
//       await handleSubmit();
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
//       <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
//         {activeTab === 'personal' && (
//           <div className="space-y-8">
//             {/* Demographics Section */}
//             <section>
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                 Demographics
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Patient ID
//                   </label>
//                   <input
//                     name="patientId"
//                     value={patient.patientId}
//                     onChange={handleChange}
//                     className={`mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition ${
//                       isEditing && autoGenerateId ? 'bg-gray-100 cursor-not-allowed' : ''
//                     }`}
//                     placeholder="e.g., PT-0001"
//                     disabled={!isEditing || autoGenerateId}
//                     aria-label="Patient ID"
//                   />
//                   {isEditing && (
//                     <label className="flex items-center mt-2">
//                       <input
//                         type="checkbox"
//                         checked={autoGenerateId}
//                         onChange={(e) => setAutoGenerateId(e.target.checked)}
//                         className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
//                         aria-label="Auto-generate Patient ID"
//                       />
//                       <span className="ml-2 text-sm text-gray-600">
//                         Auto-generate Patient ID
//                       </span>
//                     </label>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Full Name
//                   </label>
//                   <input
//                     name="name"
//                     value={patient.name}
//                     onChange={handleChange}
//                     className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                     placeholder="Enter full name"
//                     disabled={!isEditing}
//                     aria-label="Full name"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Date of Birth
//                   </label>
//                   <input
//                     type="date"
//                     name="dob"
//                     value={patient.dob}
//                     onChange={handleChange}
//                     className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                     disabled={!isEditing}
//                     aria-label="Date of birth"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Gender
//                   </label>
//                   <select
//                     name="gender"
//                     value={patient.gender}
//                     onChange={handleChange}
//                     className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                     disabled={!isEditing}
//                     aria-label="Gender"
//                   >
//                     <option value="">Select gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Marital Status
//                   </label>
//                   <select
//                     name="maritalStatus"
//                     value={patient.maritalStatus}
//                     onChange={handleChange}
//                     className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                     disabled={!isEditing}
//                     aria-label="Marital status"
//                   >
//                     <option value="">Select status</option>
//                     <option value="Single">Single</option>
//                     <option value="Married">Married</option>
//                     <option value="Divorced">Divorced</option>
//                     <option value="Widowed">Widowed</option>
//                   </select>
//                 </div>
//               </div>
//             </section>
//             {/* Contact Section */}
//             <section>
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                 Contact Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Phone
//                   </label>
//                   <input
//                     name="phone"
//                     value={patient.phone}
//                     onChange={handleChange}
//                     className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                     placeholder="Enter phone number"
//                     disabled={!isEditing}
//                     aria-label="Phone number"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Email
//                   </label>
//                   <input
//                     name="email"
//                     value={patient.email}
//                     onChange={handleChange}
//                     className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                     placeholder="Enter email address"
//                     disabled={!isEditing}
//                     aria-label="Email address"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Emergency Contact Name
//                   </label>
//                   <input
//                     name="emergencyContactName"
//                     value={patient.emergencyContactName}
//                     onChange={handleChange}
//                     className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                     placeholder="Enter contact name"
//                     disabled={!isEditing}
//                     aria-label="Emergency contact name"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Emergency Contact Phone
//                   </label>
//                   <input
//                     name="emergencyContactPhone"
//                     value={patient.emergencyContactPhone}
//                     onChange={handleChange}
//                     className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                     placeholder="Enter contact phone"
//                     disabled={!isEditing}
//                     aria-label="Emergency contact phone"
//                   />
//                 </div>
//               </div>
//             </section>
//           </div>
//         )}
//         {activeTab === 'medical' && (
//           <div className="space-y-8">
//             {/* Health Details Section */}
//             <section>
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                 Health Details
//               </h3>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Medication Allergies
//                   </label>
//                   <textarea
//                     name="medicationAllergies"
//                     value={patient.medicationAllergies}
//                     onChange={handleChange}
//                     className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                     rows="4"
//                     placeholder="List any medication allergies (e.g., Penicillin - Rash)"
//                     disabled={!isEditing}
//                     aria-label="Medication allergies"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Current Medications
//                   </label>
//                   <textarea
//                     name="currentMedications"
//                     value={patient.currentMedications}
//                     onChange={handleChange}
//                     className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                     rows="4"
//                     placeholder="List current medications (e.g., Metformin 500mg, twice daily)"
//                     disabled={!isEditing}
//                     aria-label="Current medications"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Mental Health Status
//                   </label>
//                   <textarea
//                     name="mentalHealth"
//                     value={patient.mentalHealth}
//                     onChange={handleChange}
//                     className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                     rows="4"
//                     placeholder="Describe mental health status (e.g., Anxiety, stable with therapy)"
//                     disabled={!isEditing}
//                     aria-label="Mental health status"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Lifestyle Factors
//                   </label>
//                   <textarea
//                     name="lifestyle"
//                     value={patient.lifestyle}
//                     onChange={handleChange}
//                     className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                     rows="4"
//                     placeholder="Describe lifestyle (e.g., Smokes 5 cigarettes/day, moderate exercise)"
//                     disabled={!isEditing}
//                     aria-label="Lifestyle factors"
//                   />
//                 </div>
//               </div>
//             </section>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// }

// export default PatientInfo;

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