import React, { useState, useEffect } from 'react';
import { FaUser, FaNotesMedical, FaUserMd, FaEdit, FaGraduationCap, FaFileAlt, FaFirstAid } from 'react-icons/fa';
import { FaHeartPulse } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import Notes from './Notes';
import {occupations,religions} from '../data/mockData';
import DescriptionInput from './DescriptionInput';

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
        scholarship: {
        enabled: true,
        marks: '',
        schoolAdmitted: '',
        result:''
      },
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
  const mockPatients = [
    {
      id: '1',
      patientId: 'PT-0001',
      firstName: 'John',
      middleName: 'Peter',
      lastName: 'Perera',
      formDate: '1990-01-01',
      dob: '1990-01-01',
      age: '35',
      gender: 'Male',
      address: { street: '123 Main St', city: 'Colombo', state: 'Western', zip: '10100' },
      homePhone: '0114547854',
      businessPhone: '0774454785',
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



  
  const descriptionOptions = [
    'Supportive',
    'Strict',
    'Caring',
    'Distant',
    'Encouraging',
    'Critical',
    'Loving',
    'Overprotective',
    'Traditional',
    'Warm',
    'Disciplined',
    'Anxious',
    'Other'
  ];

  const raisedByOptions = [
  'Parents',
  'Grandparents',
  'Aunt',
  'Uncle',
  'Older Sibling',
  'Foster Parents',
  'Adoptive Parents',
  'Guardian',
  'Single Mother',
  'Single Father',
  'Other'
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
    <div className="flex space-x-3">
      {/* <button
        onClick={() => navigate(`/patients/report/${patientId}`)}
        className="flex items-center bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md"
        aria-label="View patient report"
      >
        <FaFileAlt className="mr-2" />
        Page View
      </button> */}
      <button
        onClick={toggleEdit}
        className="flex items-center bg-sky-600 text-white px-5 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200 shadow-md"
        aria-label={isEditing ? 'Save changes' : 'Edit patient info'}
      >
        <FaEdit className="mr-2" />
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </div>
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
            activeTab === 'medical'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'bg-transparent text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('medical')}
        >
          <FaHeartPulse className="mr-2" size={16} />
          Mental Health
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
                <div></div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    name="formDate"
                    value={patient.formDate}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    disabled={!isEditing}
                    aria-label="Form Date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    name="lastName"
                    value={patient.lastName}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter last name"
                    disabled={!isEditing}
                    aria-label="Last name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    name="firstName"
                    value={patient.firstName}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter first name"
                    disabled={!isEditing}
                    aria-label="First name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Middle Name</label>
                  <input
                    name="middleName"
                    value={patient.middleName}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter middle name"
                    disabled={!isEditing}
                    aria-label="Middle name"
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
              
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Permanent Address (if different from above)</label>
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
                {/* {JSON.stringify(patient.maritalStatus)} */}
           
                 
             
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Number of Years Married to Present Spouse</label>
                    <input
                      type="number"
                      name="yearsMarried"
                      
                      value={patient.yearsMarried}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter years"
                      disabled={!isEditing || !patient.maritalStatus.includes('now for')}
                      aria-label="Years married"
                    />
                  </div>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
                <div className='col-span-2 mx-20'>
  <label className="block text-sm font-medium text-gray-700">
    How religious are you? (1 = Very Religious, 5 = Average, 9 = Atheist)
  </label>
  <div className="mt-2 flex items-start justify-between">
    {/* Labels above the scale */}
    <div className="flex w-full justify-between">
      <span className="text-xs text-gray-600 -ml-1">Very</span>
      <span className="text-xs text-gray-600">Average</span>
      <span className="text-xs text-gray-600 -mr-1">Atheist</span>
    </div>
  </div>
  <div className="flex items-center justify-between mt-1 space-x-1">
    {[...Array(9)].map((_, i) => {
      const value = (i + 1).toString();
      return (
        <label key={value} className="flex flex-col items-center">
          <input
            type="radio"
            name="religiosity"
            value={value}
            checked={patient.religiosity === value}
            onChange={handleChange}
            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 disabled:opacity-75 custom-radio"
            disabled={!isEditing}
            aria-label={`Religiosity level ${value}`}
          />
          <span className="mt-1 text-sm text-gray-700">{value}</span>
        </label>
      );
    })}
  </div>
</div>
</div>
              </div>
            </section>
            {/* Personal Insights */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-2">Personal Insights</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    List the things you like to do most, kinds of things and persons that give you pleasure
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
                  <label className="block text-sm font-medium text-gray-700">List your main assets and good points</label>
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
                  <label className="block text-sm font-medium text-gray-700">List your main bad points</label>
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
                  <label className="block text-sm font-medium text-gray-700">List your main social difficulties</label>
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
                  <label className="block text-sm font-medium text-gray-700">List your main love and sex difficulties</label>
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
                  <label className="block text-sm font-medium text-gray-700">List your main school or work difficulties</label>
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
                  <label className="block text-sm font-medium text-gray-700">List your main life goals</label>
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
                  <label className="block text-sm font-medium text-gray-700">List the things about yourself you would most like to change</label>
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
                    <select
                      id="occupationTrained"
                      name="occupationTrained"
                      value={patient.occupationTrained}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      disabled={!isEditing}
                      aria-label="Occupation trained for"
                    >
                      <option value="">Select occupation</option>
                      {occupations.map((occupation) => (
                        <option key={occupation.id} value={occupation.id}>
                          {occupation.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Present Occupation</label>
                    <select
                      id="occupation"
                      name="occupation"
                      value={patient.occupation}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      disabled={!isEditing}
                      aria-label="Present occupation"
                    >
                      <option value="">Select occupation</option>
                      {occupations.map((occupation) => (
                        <option key={occupation.id} value={occupation.id}>
                          {occupation.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Occupation Status</label>
                    <div className="flex items-center space-x-4 mt-5">
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
              </div>
     
            </section>
          </div>
        )}
        {activeTab === 'family' && (
          <div className="space-y-10">



<section>
              <h3 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-2">Spouse's Information</h3>
              <div className="space-y-6">
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Spouse's Occupation</label>
                        <select
                                         id="spouseOccupation"
                                         name="spouseOccupation"
                                         value={patient.occupation}
                                         onChange={handleChange}
                                         className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                                         disabled={!isEditing}
                                         aria-label="Present occupation"
                                       >
                                         <option value="">Select occupation</option>
                                         {occupations.map((occupation) => (
                                           <option key={occupation.id} value={occupation.id}>
                                             {occupation.name}
                                           </option>
                                         ))}
                                       </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Spouse's Occupation Status</label>
                      <div className="flex items-center space-x-4 mt-5">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="spouseOccupationFullTime"
                            checked={patient.spouseOccupationFullTime}
                            onChange={(e) => setPatient({ ...patient, spouseOccupationFullTime: e.target.checked })}
                            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                            disabled={!isEditing || !patient.maritalStatus.includes('now for')}
                            aria-label="Spouse full-time"
                          />
                          <span className="ml-2 text-sm text-gray-700">Full-time</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="spouseOccupationFullTime"
                            checked={!patient.maritalStatus.includes('now for') ? false : !patient.spouseOccupationFullTime}
                            onChange={(e) => setPatient({ ...patient, spouseOccupationFullTime: !e.target.checked })}
                            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                            disabled={!isEditing || !patient.maritalStatus.includes('now for')}
                            aria-label="Spouse part-time"
                          />
                          <span className="ml-2 text-sm text-gray-700">Part-time</span>
                        </label>
                      </div>
                    </div>
                  </div>
</div>
</section>






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
                        <select
                                         id="motherOccupation"
                                         name="motherOccupation"
                                         value={patient.occupation}
                                         onChange={handleChange}
                                         className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                                         disabled={!isEditing}
                                         aria-label="Present occupation"
                                       >
                                         <option value="">Select occupation</option>
                                         {occupations.map((occupation) => (
                                           <option key={occupation.id} value={occupation.id}>
                                             {occupation.name}
                                           </option>
                                         ))}
                                       </select>

                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Father's Occupation</label>
                        <select
                                         id="fatherOccupation"
                                         name="fatherOccupation"
                                         value={patient.occupation}
                                         onChange={handleChange}
                                         className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                                         disabled={!isEditing}
                                         aria-label="Present occupation"
                                       >
                                         <option value="">Select religion</option>
                                         {occupations.map((occupation) => (
                                           <option key={occupation.id} value={occupation.id}>
                                             {occupation.name}
                                           </option>
                                         ))}
                                       </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mother's Religion</label>                
                          <select
                                         id="motherReligion"
                                         name="motherReligion"
                                         value={patient.motherReligion}
                                         onChange={handleChange}
                                         className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                                        // disabled={!isEditing}
                                         aria-label="motherReligion"
                                       >
                                         <option value="">Select religion</option>
                                         {religions.map((motherReligion) => (
                                           <option key={motherReligion.id} value={motherReligion.id}>
                                             {motherReligion.name}
                                           </option>
                                         ))}
                                       </select>
                                       
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Father's Religion</label>

                           <select
                                         id="fatherReligion"
                                         name="fatherReligion"
                                         value={patient.fatherReligion}
                                         onChange={handleChange}
                                         className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                                        // disabled={!isEditing}
                                         aria-label="fatherReligion"
                                       >
                                         <option value="">Select religion</option>
                                         {religions.map((fatherReligion) => (
                                           <option key={fatherReligion.id} value={fatherReligion.id}>
                                             {fatherReligion.name}
                                           </option>
                                         ))}
                                       </select>

                  </div>
                </div>
                                  <DescriptionInput
                  patient={patient}
                  setPatient={setPatient}
                  isEditing={true}
                  fieldName="raisedBy"
                  label="If your mother and father did not raise you when you were young, who did?"
                  placeholder="Enter raisedBy"
                   descriptionOptions={raisedByOptions}
                  isTypeable={false}
                 
                />
                
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DescriptionInput
                  patient={patient}
                  setPatient={setPatient}
                  isEditing={true}
                  fieldName="motherDescription"
                  label="Briefly describe the type of person your mother (or stepmother or person who substituted for your mother) was when you were a child and how you got along with her"
                  placeholder="Enter custom mother description"
                   descriptionOptions={descriptionOptions}
                  isTypeable={false}
                 
                />
                
                <DescriptionInput
                  patient={patient}
                  setPatient={setPatient}
                  isEditing={true}
                  fieldName="fatherDescription"
                  label="Briefly describe the type of person your father (or stepfather or father substitute) was when you were a child and how you got along with him"
                  placeholder="Enter custom father description"
                   descriptionOptions={descriptionOptions}
                  isTypeable={false}
                />
                    </div>
                {/* <div>
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
                  Briefly describe the type of person your mother (or stepmother or person who substituted for your mother) was when you were a child
 and how you got along with her
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
                  Briefly describe the type of person your father (or stepfather or father substitute) was when you were a child and how you got along
                  with him
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
                </div> */}
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
                  <label className="block text-sm font-medium text-gray-700">List your chief physical ailments, diseases, complaints, or handicaps</label>
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
                  <label className="block text-sm font-medium text-gray-700">Briefly list (PRINT) your present main complaints, symptoms, and problems</label>
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Hours of individual therapy</label>
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
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Spread over years</label>
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
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Ending years ago</label>
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
                      </div>
                    </div>
</div>




                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
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
                  <label className="block text-sm font-medium text-gray-700">Type of psychotherapy you have mainly had (briefly describe method of treatment—ex., dream analysis, free association, drugs,
                    hypnosis, etc.)</label>
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

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>
                  <label className="block text-sm font-medium text-gray-700">Years of Formal Education Completed (circle number of years)</label>
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
        </div>
        {/* Grade 5 Scholarship Qualifications */}
  <section>
    <div className="flex items-center space-x-3 mb-5 border-b pb-2">
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={patient.education.scholarship.enabled !== false}
          onChange={(e) => {
            setPatient((prev) => ({
              ...prev,
              education: {
                ...prev.education,
                scholarship: { ...prev.education.scholarship, enabled: e.target.checked }
              }
            }));
          }}
          className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
          disabled={!isEditing}
          aria-label="Has Grade 5 Scholarship Qualifications"
        />
        <span className="ml-2 text-sm text-gray-700"></span>
      </label>
      <h3 className="text-xl font-semibold text-gray-800">Grade 5 Scholarship Qualifications</h3>
    </div>
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Marks</label>
          <input
            name="education.scholarship.marks"
            value={patient.education.scholarship.marks}
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
            placeholder="Enter marks (e.g., 180)"
            disabled={!isEditing || patient.education.scholarship.enabled === false}
            aria-label="Scholarship Marks"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">School Admitted</label>
          <input
            name="education.scholarship.schoolAdmitted"
            value={patient.education.scholarship.schoolAdmitted}
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
            placeholder="Enter school name"
            disabled={!isEditing || patient.education.scholarship.enabled === false}
            aria-label="School Admitted"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Result</label>
          <div className="mt-1 flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="education.scholarship.result"
                value="Pass"
                checked={patient.education.scholarship.result === "Pass"}
                onChange={handleChange}
                className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                disabled={!isEditing || patient.education.scholarship.enabled === false}
                aria-label="Scholarship Result Pass"
              />
              <span className="ml-2 text-sm text-gray-700">Pass</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="education.scholarship.result"
                value="Fail"
                checked={patient.education.scholarship.result === "Fail"}
                onChange={handleChange}
                className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                disabled={!isEditing || patient.education.scholarship.enabled === false}
                aria-label="Scholarship Result Fail"
              />
              <span className="ml-2 text-sm text-gray-700">Fail</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </section>
    {/* G.C.E Ordinary Level (O/L) Qualifications */}
    <section>
      <div className="flex items-center space-x-3 mb-5 border-b pb-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={patient.education.ol.enabled !== false} // Default to true if not set
            onChange={(e) => {
              setPatient((prev) => ({
                ...prev,
                education: {
                  ...prev.education,
                  ol: { ...prev.education.ol, enabled: e.target.checked }
                }
              }));
            }}
            className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
            disabled={!isEditing}
            aria-label="Has G.C.E O/L Qualifications"
          />
          <span className="ml-2 text-sm text-gray-700"></span>
        </label>
        <h3 className="text-xl font-semibold text-gray-800">G.C.E Ordinary Level (O/L) Qualifications</h3>
      </div>
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
                disabled={!isEditing || patient.education.ol.enabled === false}
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
              disabled={!isEditing || index < defaultOLSubjects.length || patient.education.ol.enabled === false}
              aria-label={`O/L Subject ${index + 1} name`}
            />
            <input
              name={`education.ol.subjects.${index}.marks`}
              value={subject.marks}
              onChange={handleChange}
              className="w-1/4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
              placeholder="Grade (e.g., A, B, C, S, W)"
              disabled={!isEditing || !subject.followed || patient.education.ol.enabled === false}
              aria-label={`O/L Subject ${index + 1} marks`}
            />
            {isEditing && index >= defaultOLSubjects.length && (
              <button
                type="button"
                onClick={() => {
                  setPatient((prev) => {
                    const updatedSubjects = [...prev.education.ol.subjects];
                    updatedSubjects.splice(index, 1);
                    return {
                      ...prev,
                      education: {
                        ...prev.education,
                        ol: { ...prev.education.ol, subjects: updatedSubjects }
                      }
                    };
                  });
                }}
                className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-all duration-200"
                disabled={patient.education.ol.enabled === false}
                aria-label="Remove O/L Subject"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1H5a1 1 0 00-1 1v1h16V5a1 1 0 00-1-1h-4a1 1 0 00-1-1zM8 10v8m4-8v8m4-8v8"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}
        {isEditing && (
          <button
            type="button"
            onClick={() => addCustomSubject('ol')}
            className="mt-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-all duration-200"
            disabled={patient.education.ol.enabled === false}
          >
            Add Custom O/L Subject
          </button>
        )}
      </div>
    </section>
    {/* G.C.E Advanced Level (A/L) Qualifications */}
    <section>
      <div className="flex items-center space-x-3 mb-5 border-b pb-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={patient.education.al.enabled !== false} // Default to true if not set
            onChange={(e) => {
              setPatient((prev) => ({
                ...prev,
                education: {
                  ...prev.education,
                  al: { ...prev.education.al, enabled: e.target.checked }
                }
              }));
            }}
            className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
            disabled={!isEditing}
            aria-label="Has G.C.E A/L Qualifications"
          />
          <span className="ml-2 text-sm text-gray-700"></span>
        </label>
        <h3 className="text-xl font-semibold text-gray-800">G.C.E Advanced Level (A/L) Qualifications</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Stream</label>
          <select
            name="education.al.stream"
            value={patient.education.al.stream}
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
            disabled={!isEditing || patient.education.al.enabled === false}
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
                disabled={!isEditing || patient.education.al.enabled === false}
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
              disabled={!isEditing || index < defaultALSubjects.length || patient.education.al.enabled === false}
              aria-label={`A/L Subject ${index + 1} name`}
            />
            <input
              name={`education.al.subjects.${index}.marks`}
              value={subject.marks}
              onChange={handleChange}
              className="w-1/4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
              placeholder="Grade (e.g., A, B, C, S, W)"
              disabled={!isEditing || !subject.followed || patient.education.al.enabled === false}
              aria-label={`A/L Subject ${index + 1} marks`}
            />
            {isEditing && index >= defaultALSubjects.length && (
              <button
                type="button"
                onClick={() => {
                  setPatient((prev) => {
                    const updatedSubjects = [...prev.education.al.subjects];
                    updatedSubjects.splice(index, 1);
                    return {
                      ...prev,
                      education: {
                        ...prev.education,
                        al: { ...prev.education.al, subjects: updatedSubjects }
                      }
                    };
                  });
                }}
                className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-all duration-200"
                disabled={patient.education.al.enabled === false}
                aria-label="Remove A/L Subject"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1H5a1 1 0 00-1 1v1h16V5a1 1 0 00-1-1h-4a1 1 0 00-1-1zM8 10v8m4-8v8m4-8v8"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}
        {isEditing && (
          <button
            type="button"
            onClick={() => addCustomSubject('al')}
            className="mt-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-all duration-200"
            disabled={patient.education.al.enabled === false}
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
              disabled={!isEditing || patient.education.al.enabled === false}
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
              disabled={!isEditing || patient.education.al.enabled === false}
              aria-label="Common General Test Marks"
            />
          </div>
        </div>
      </div>
    </section>
    {/* University Qualifications */}
    <section>
      <div className="flex items-center space-x-3 mb-5 border-b pb-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={patient.education.universityEnabled !== false} // Default to true if not set
            onChange={(e) => {
              setPatient((prev) => ({
                ...prev,
                education: {
                  ...prev.education,
                  universityEnabled: e.target.checked
                }
              }));
            }}
            className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
            disabled={!isEditing}
            aria-label="Has University Qualifications"
          />
          <span className="ml-2 text-lg text-gray-700 font-semibold"></span>
        </label>
        <h3 className="text-xl font-semibold text-gray-800">University Qualifications</h3>
      </div>
      <div className="space-y-4">
        {patient.education.university.map((qualification, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-700">Degree</label>
                <input
                  name={`education.university.${index}.degree`}
                  value={qualification.degree}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="e.g., BSc in Computer Science"
                  disabled={!isEditing || patient.education.universityEnabled === false}
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
                  disabled={!isEditing || patient.education.universityEnabled === false}
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
                  disabled={!isEditing || patient.education.universityEnabled === false}
                  aria-label={`Marks ${index + 1}`}
                />
              </div>
            </div>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setPatient((prev) => {
                    const updatedUniversity = [...prev.education.university];
                    updatedUniversity.splice(index, 1);
                    return {
                      ...prev,
                      education: { ...prev.education, university: updatedUniversity }
                    };
                  });
                }}
                className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-all duration-200 mt-5"
                disabled={patient.education.universityEnabled === false}
                aria-label="Remove University Qualification"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1H5a1 1 0 00-1 1v1h16V5a1 1 0 00-1-1h-4a1 1 0 00-1-1zM8 10v8m4-8v8m4-8v8"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}
        {isEditing && (
          <button
            type="button"
            onClick={addUniversityQualification}
            className="mt-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-all duration-200"
            disabled={patient.education.universityEnabled === false}
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
