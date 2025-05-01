import React, { useState, useEffect } from 'react';
import { FaUser, FaNotesMedical, FaUserMd, FaEdit, FaGraduationCap, FaFileAlt } from 'react-icons/fa';
import { FaHeartPulse } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';

function PatientInfoEdit({ mode = 'view' }) {
  const navigate = useNavigate();
  const { id: patientId } = useParams();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(mode === 'add' || mode === 'edit');
  const [autoGenerateId, setAutoGenerateId] = useState(mode === 'add');

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


  
  const mockPatients = [
    // Patient 1: Original patient
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
      individualTherapyEndYears: '1',
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
          enabled: true,
          subjects: defaultOLSubjects.map(subject => ({
            ...subject,
            followed: ['Mathematics', 'English', 'Science'].includes(subject.name),
            marks: ['Mathematics', 'English', 'Science'].includes(subject.name) ? 'A' : ''
          }))
        },
        al: {
          enabled: true,
          stream: 'Science',
          subjects: defaultALSubjects.map(subject => ({
            ...subject,
            followed: true,
            marks: 'A'
          })),
          generalEnglishMarks: 'B',
          commonGeneralTestMarks: '75'
        },
        universityEnabled: true,
        university: [
          { degree: 'BSc in Computer Science', institution: 'University of Colombo', marks: 'First Class' }
        ]
      }
    },
    // Patient 2: Married female with children, Arts A/L, no university
    {
      id: '2',
      patientId: 'PT-0002',
      firstName: 'Ama',
      middleName: '',
      lastName: 'Silva',
      formDate: '1985-05-15',
      dob: '1985-05-15',
      age: '40',
      gender: 'Female',
      address: { street: '45 Lake Rd', city: 'Kandy', state: 'Central', zip: '20000' },
      homePhone: '0812233445',
      businessPhone: '',
      permanentAddress: '45 Lake Rd, Kandy',
      referralSource: 'doctor',
      referralPartyPresent: 'Yes',
      maritalStatus: 'Married now for',
      yearsMarried: '15',
      maleChildrenAges: '12',
      femaleChildrenAges: '8',
      educationYears: '13',
      religiosity: '5',
      motherAge: '65',
      motherDeceasedAge: '',
      ageWhenMotherDied: '',
      fatherAge: '',
      fatherDeceasedAge: '60',
      ageWhenFatherDied: '25',
      thingsLiked: 'Cooking, gardening',
      assets: 'Patient, empathetic',
      badPoints: 'Overthinking',
      socialDifficulties: 'Difficulty saying no',
      mainComplaints: 'Fatigue, low mood',
      pastComplaints: 'Postpartum depression',
      worseConditions: 'Family stress',
      improvedConditions: 'Time with children',
      loveSexDifficulties: 'None',
      schoolWorkDifficulties: 'Balancing work and family',
      lifeGoals: 'Raise happy children, start a small business',
      thingsToChange: 'Improve self-confidence',
      physicalAilments: 'Mild asthma',
      occupation: 'Homemaker',
      occupationFullTime: false,
      spouseOccupation: 'Bank Manager',
      spouseOccupationFullTime: true,
      motherOccupation: 'Nurse',
      fatherOccupation: 'Shopkeeper',
      motherReligion: 'Buddhist',
      fatherReligion: 'Buddhist',
      raisedBy: 'Parents',
      motherDescription: 'Caring, traditional',
      fatherDescription: 'Hardworking, distant',
      parentalSeparationAge: '',
      parentalDivorceAge: '',
      motherDivorceCount: '0',
      fatherDivorceCount: '0',
      livingBrothers: '0',
      livingSisters: '2',
      brothersAges: '',
      sistersAges: '38, 42',
      childNumber: '2',
      familyChildren: '3',
      adopted: 'No',
      previousTreatment: 'Medication',
      individualTherapyHours: '20',
      individualTherapyYears: '1',
      individualTherapyEndYears: '2',
      groupTherapyHours: '10',
      psychiatricHospitalizationMonths: '0',
      currentTreatment: 'Yes',
      antidepressantsCount: '3',
      psychotherapyType: 'Supportive therapy',
      brotherDisturbances: '',
      sisterDisturbances: 'Occasional conflicts with older sister',
      maleRelativesDisturbed: '0',
      maleRelativesHospitalized: '0',
      femaleRelativesDisturbed: '1',
      femaleRelativesHospitalized: '0',
      additionalInfo: 'Family history of anxiety',
      education: {
        ol: {
          enabled: true,
          subjects: defaultOLSubjects.map(subject => ({
            ...subject,
            followed: ['Sinhala', 'Buddhism', 'History', 'English'].includes(subject.name),
            marks: ['Sinhala', 'Buddhism'].includes(subject.name) ? 'B' : ['History', 'English'].includes(subject.name) ? 'C' : ''
          }))
        },
        al: {
          enabled: true,
          stream: 'Arts',
          subjects: [
            { name: 'Sinhala', followed: true, marks: 'B' },
            { name: 'Political Science', followed: true, marks: 'C' },
            { name: 'History', followed: true, marks: 'B' }
          ],
          generalEnglishMarks: 'C',
          commonGeneralTestMarks: '60'
        },
        universityEnabled: false,
        university: []
      }
    },
    // Patient 3: Young male, no A/L, vocational training
    {
      id: '3',
      patientId: 'PT-0003',
      firstName: 'Nimal',
      middleName: 'Kumar',
      lastName: 'Fernando',
      formDate: '1998-10-20',
      dob: '1998-10-20',
      age: '26',
      gender: 'Male',
      address: { street: '78 Park Lane', city: 'Galle', state: 'Southern', zip: '80000' },
      homePhone: '0912233445',
      businessPhone: '0765544332',
      permanentAddress: '',
      referralSource: 'friend',
      referralPartyPresent: 'No',
      maritalStatus: 'Single',
      yearsMarried: '',
      maleChildrenAges: '',
      femaleChildrenAges: '',
      educationYears: '10',
      religiosity: '2',
      motherAge: '50',
      motherDeceasedAge: '',
      ageWhenMotherDied: '',
      fatherAge: '55',
      fatherDeceasedAge: '',
      ageWhenFatherDied: '',
      thingsLiked: 'Gaming, music',
      assets: 'Creative, quick learner',
      badPoints: 'Impulsive',
      socialDifficulties: 'Social anxiety',
      mainComplaints: 'Low motivation, anxiety',
      pastComplaints: 'None',
      worseConditions: 'Crowded places',
      improvedConditions: 'Quiet environments',
      loveSexDifficulties: 'Shyness with dating',
      schoolWorkDifficulties: 'Dropped out after O/L',
      lifeGoals: 'Become a graphic designer',
      thingsToChange: 'Build confidence',
      physicalAilments: 'Allergies',
      occupation: 'Freelance Artist',
      occupationFullTime: false,
      spouseOccupation: '',
      spouseOccupationFullTime: false,
      motherOccupation: 'Seamstress',
      fatherOccupation: 'Driver',
      motherReligion: 'Catholic',
      fatherReligion: 'Catholic',
      raisedBy: 'Parents',
      motherDescription: 'Warm, overprotective',
      fatherDescription: 'Strict, supportive',
      parentalSeparationAge: '10',
      parentalDivorceAge: '',
      motherDivorceCount: '1',
      fatherDivorceCount: '1',
      livingBrothers: '1',
      livingSisters: '1',
      brothersAges: '22',
      sistersAges: '24',
      childNumber: '1',
      familyChildren: '3',
      adopted: 'No',
      previousTreatment: 'None',
      individualTherapyHours: '0',
      individualTherapyYears: '0',
      individualTherapyEndYears: '0',
      groupTherapyHours: '0',
      psychiatricHospitalizationMonths: '0',
      currentTreatment: 'No',
      antidepressantsCount: '0',
      psychotherapyType: '',
      brotherDisturbances: 'Competitive relationship',
      sisterDisturbances: 'None',
      maleRelativesDisturbed: '0',
      maleRelativesHospitalized: '0',
      femaleRelativesDisturbed: '0',
      femaleRelativesHospitalized: '0',
      additionalInfo: 'Interested in vocational training',
      education: {
        ol: {
          enabled: true,
          subjects: defaultOLSubjects.map(subject => ({
            ...subject,
            followed: ['Mathematics', 'English', 'Art'].includes(subject.name),
            marks: ['Mathematics'].includes(subject.name) ? 'C' : ['English', 'Art'].includes(subject.name) ? 'B' : ''
          }))
        },
        al: {
          enabled: false,
          stream: '',
          subjects: [],
          generalEnglishMarks: '',
          commonGeneralTestMarks: ''
        },
        universityEnabled: false,
        university: []
      }
    },
    // Patient 4: Older female, divorced, Commerce A/L, MBA
    {
      id: '4',
      patientId: 'PT-0004',
      firstName: 'Sita',
      middleName: 'Rani',
      lastName: 'Wijesinghe',
      formDate: '1970-03-10',
      dob: '1970-03-10',
      age: '55',
      gender: 'Female',
      address: { street: '12 Rose Ave', city: 'Negombo', state: 'Western', zip: '11500' },
      homePhone: '0312233445',
      businessPhone: '0779988776',
      permanentAddress: '12 Rose Ave, Negombo',
      referralSource: 'therapist',
      referralPartyPresent: 'Yes',
      maritalStatus: 'Divorced',
      yearsMarried: '20',
      maleChildrenAges: '25',
      femaleChildrenAges: '',
      educationYears: '18',
      religiosity: '4',
      motherAge: '',
      motherDeceasedAge: '70',
      ageWhenMotherDied: '40',
      fatherAge: '',
      fatherDeceasedAge: '75',
      ageWhenFatherDied: '45',
      thingsLiked: 'Traveling, yoga',
      assets: 'Resilient, organized',
      badPoints: 'Perfectionist',
      socialDifficulties: 'Trust issues post-divorce',
      mainComplaints: 'Insomnia, depression',
      pastComplaints: 'Anxiety',
      worseConditions: 'Nighttime, stress',
      improvedConditions: 'Meditation, exercise',
      loveSexDifficulties: 'Avoiding relationships',
      schoolWorkDifficulties: 'Managing stress at work',
      lifeGoals: 'Retire comfortably, travel',
      thingsToChange: 'Let go of past grievances',
      physicalAilments: 'Hypertension',
      occupation: 'Financial Consultant',
      occupationFullTime: true,
      spouseOccupation: '',
      spouseOccupationFullTime: false,
      motherOccupation: 'Librarian',
      fatherOccupation: 'Engineer',
      motherReligion: 'Hindu',
      fatherReligion: 'Hindu',
      raisedBy: 'Parents',
      motherDescription: 'Disciplined, loving',
      fatherDescription: 'Ambitious, critical',
      parentalSeparationAge: '',
      parentalDivorceAge: '',
      motherDivorceCount: '0',
      fatherDivorceCount: '0',
      livingBrothers: '0',
      livingSisters: '0',
      brothersAges: '',
      sistersAges: '',
      childNumber: '1',
      familyChildren: '1',
      adopted: 'No',
      previousTreatment: 'Therapy, medication',
      individualTherapyHours: '100',
      individualTherapyYears: '5',
      individualTherapyEndYears: '0',
      groupTherapyHours: '20',
      psychiatricHospitalizationMonths: '1',
      currentTreatment: 'Yes',
      antidepressantsCount: '5',
      psychotherapyType: 'Psychodynamic therapy',
      brotherDisturbances: '',
      sisterDisturbances: '',
      maleRelativesDisturbed: '1',
      maleRelativesHospitalized: '1',
      femaleRelativesDisturbed: '0',
      femaleRelativesHospitalized: '0',
      additionalInfo: 'Strong professional background',
      education: {
        ol: {
          enabled: true,
          subjects: defaultOLSubjects.map(subject => ({
            ...subject,
            followed: ['Mathematics', 'English', 'Geography', 'Civics'].includes(subject.name),
            marks: ['Mathematics', 'English'].includes(subject.name) ? 'A' : ['Geography', 'Civics'].includes(subject.name) ? 'B' : ''
          }))
        },
        al: {
          enabled: true,
          stream: 'Commerce',
          subjects: [
            { name: 'Accounting', followed: true, marks: 'A' },
            { name: 'Economics', followed: true, marks: 'B' },
            { name: 'Business Studies', followed: true, marks: 'A' }
          ],
          generalEnglishMarks: 'A',
          commonGeneralTestMarks: '80'
        },
        universityEnabled: true,
        university: [
          { degree: 'BCom', institution: 'University of Peradeniya', marks: 'Second Class Upper' },
          { degree: 'MBA', institution: 'University of Sri Jayewardenepura', marks: 'Distinction' }
        ]
      }
    },
    // Patient 5: Young female, single, Technology A/L, ongoing university
    {
      id: '5',
      patientId: 'PT-0005',
      firstName: 'Tharushi',
      middleName: '',
      lastName: 'Jayasinghe',
      formDate: '2000-07-25',
      dob: '2000-07-25',
      age: '25',
      gender: 'Female',
      address: { street: '90 Green Path', city: 'Ratnapura', state: 'Sabaragamuwa', zip: '70000' },
      homePhone: '0452233445',
      businessPhone: '',
      permanentAddress: '',
      referralSource: 'family',
      referralPartyPresent: 'Yes',
      maritalStatus: 'Single',
      yearsMarried: '',
      maleChildrenAges: '',
      femaleChildrenAges: '',
      educationYears: '15',
      religiosity: '3',
      motherAge: '48',
      motherDeceasedAge: '',
      ageWhenMotherDied: '',
      fatherAge: '50',
      fatherDeceasedAge: '',
      ageWhenFatherDied: '',
      thingsLiked: 'Photography, coding',
      assets: 'Curious, tech-savvy',
      badPoints: 'Overly self-critical',
      socialDifficulties: 'Difficulty making friends',
      mainComplaints: 'Academic pressure, anxiety',
      pastComplaints: 'None',
      worseConditions: 'Exams, deadlines',
      improvedConditions: 'Creative projects',
      loveSexDifficulties: 'Not interested currently',
      schoolWorkDifficulties: 'Perfectionism',
      lifeGoals: 'Become a tech entrepreneur',
      thingsToChange: 'Manage stress better',
      physicalAilments: 'Migraines',
      occupation: 'Student',
      occupationFullTime: false,
      spouseOccupation: '',
      spouseOccupationFullTime: false,
      motherOccupation: 'Clerk',
      fatherOccupation: 'Mechanic',
      motherReligion: 'Buddhist',
      fatherReligion: 'Buddhist',
      raisedBy: 'Parents',
      motherDescription: 'Encouraging, anxious',
      fatherDescription: 'Practical, humorous',
      parentalSeparationAge: '',
      parentalDivorceAge: '',
      motherDivorceCount: '0',
      fatherDivorceCount: '0',
      livingBrothers: '0',
      livingSisters: '0',
      brothersAges: '',
      sistersAges: '',
      childNumber: '1',
      familyChildren: '1',
      adopted: 'No',
      previousTreatment: 'Counseling',
      individualTherapyHours: '15',
      individualTherapyYears: '1',
      individualTherapyEndYears: '0',
      groupTherapyHours: '0',
      psychiatricHospitalizationMonths: '0',
      currentTreatment: 'Yes',
      antidepressantsCount: '0',
      psychotherapyType: 'Mindfulness-based therapy',
      brotherDisturbances: '',
      sisterDisturbances: '',
      maleRelativesDisturbed: '0',
      maleRelativesHospitalized: '0',
      femaleRelativesDisturbed: '0',
      femaleRelativesHospitalized: '0',
      additionalInfo: 'Passionate about technology',
      education: {
        ol: {
          enabled: true,
          subjects: defaultOLSubjects.map(subject => ({
            ...subject,
            followed: ['Mathematics', 'English', 'Science', 'Buddhism'].includes(subject.name),
            marks: ['Mathematics', 'Science'].includes(subject.name) ? 'A' : ['English', 'Buddhism'].includes(subject.name) ? 'B' : ''
          }))
        },
        al: {
          enabled: true,
          stream: 'Technology',
          subjects: [
            { name: 'Engineering Technology', followed: true, marks: 'A' },
            { name: 'Science for Technology', followed: true, marks: 'B' },
            { name: 'Information Technology', followed: true, marks: 'A' }
          ],
          generalEnglishMarks: 'B',
          commonGeneralTestMarks: '70'
        },
        universityEnabled: true,
        university: [
          { degree: 'BEng in Software Engineering', institution: 'University of Moratuwa', marks: 'Ongoing' }
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
      await handleSubmitp();
    }
    setIsEditing(!isEditing);
  };

       // Add state for tracking which section is being edited
       const [editingSection, setEditingSection] = useState(null);

       // Function to toggle edit mode for a specific section
       const toggleSectionEdit = (section) => {
         if (editingSection === section) {
           handleSubmitp(section); // Save only the specific section
           setEditingSection(null);
         } else {
           setEditingSection(section);
         }
       };
     
       // Modified handleSubmit to handle section-specific saving
       const handleSubmitp = async (section) => {
         console.log(`Saving ${section} section:`, patient);
         // Here you can add logic to save only the relevant section data
         const savedPatientId = mode === 'add' ? Date.now().toString() : patientId;
         if (mode === 'add') {
           navigate(`/patients/${savedPatientId}`);
         }
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
            aria-label={isEditing ? "Save changes" : "Edit patient info"}
          >
            <FaEdit className="mr-2" />
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
      <div className="flex space-x-3 mb-6 p-1 bg-gray-200 rounded-lg">
        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "personal"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("personal")}
        >
          <FaUser className="mr-2" size={16} />
          Personal
        </button>
        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "family"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("family")}
        >
          <FaUser className="mr-2" size={16} />
          Family
        </button>

        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "medical"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("medical")}
        >
          <FaHeartPulse className="mr-2" size={16} />
          Mental Health
        </button>
        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "education"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("education")}
        >
          <FaGraduationCap className="mr-2" size={16} />
          Education
        </button>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-8 p-6 ">
        {activeTab === "personal" && (
          <div className="p-8">
            {/* Basic Information */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Basic Information
                </h3>
                {mode !== "add" && (
                  <button
                    onClick={() => toggleSectionEdit("basic")}
                    className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                    aria-label={
                      editingSection === "basic"
                        ? "Save Basic Info"
                        : "Edit Basic Info"
                    }
                  >
                    <FaEdit className="mr-2" />
                    {editingSection === "basic" ? "Save" : "Edit"}
                  </button>
                )}
              </div>
              {editingSection === "basic" || mode === "add" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Patient ID
                    </label>
                    <input
                      name="patientId"
                      value={patient.patientId}
                      onChange={handleChange}
                      className={`mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 ${
                        autoGenerateId ? "bg-gray-100 cursor-not-allowed" : ""
                      }`}
                      placeholder="e.g., PT-0001"
                      disabled={autoGenerateId}
                      aria-label="Patient ID"
                    />
                    {mode === "add" && (
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
                  <div></div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      name="formDate"
                      value={patient.formDate}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      aria-label="Form Date"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      value={patient.lastName}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter last name"
                      aria-label="Last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      name="firstName"
                      value={patient.firstName}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter first name"
                      aria-label="First name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Middle Name
                    </label>
                    <input
                      name="middleName"
                      value={patient.middleName}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter middle name"
                      aria-label="Middle name"
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
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      aria-label="Date of birth"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={patient.age}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter age"
                      aria-label="Age"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Sex
                    </label>
                    <div className="flex space-x-4 mt-1">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={patient.gender === "Male"}
                          onChange={handleChange}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                          aria-label="Male"
                        />
                        <span className="ml-2 text-sm text-gray-700">Male</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={patient.gender === "Female"}
                          onChange={handleChange}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                          aria-label="Female"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Female
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <strong>Patient ID:</strong> {patient.patientId || "N/A"}
                  </div>
                  <div>
                    <strong>Form Date:</strong> {patient.formDate || "N/A"}
                  </div>
                  <div>
                    <strong>Last Name:</strong> {patient.lastName || "N/A"}
                  </div>
                  <div>
                    <strong>First Name:</strong> {patient.firstName || "N/A"}
                  </div>
                  <div>
                    <strong>Middle Name:</strong> {patient.middleName || "N/A"}
                  </div>
                  <div>
                    <strong>Date of Birth:</strong> {patient.dob || "N/A"}
                  </div>
                  <div>
                    <strong>Age:</strong> {patient.age || "N/A"}
                  </div>
                  <div>
                    <strong>Gender:</strong> {patient.gender || "N/A"}
                  </div>
                </div>
              )}
            </section>
            {/* Address Information */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Address Information
                </h3>
                {mode !== "add" && (
                  <button
                    onClick={() => toggleSectionEdit("address")}
                    className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                    aria-label={
                      editingSection === "address"
                        ? "Save Address Info"
                        : "Edit Address Info"
                    }
                  >
                    <FaEdit className="mr-2" />
                    {editingSection === "address" ? "Save" : "Edit"}
                  </button>
                )}
              </div>
              {editingSection === "address" || mode === "add" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Street
                    </label>
                    <input
                      name="address.street"
                      value={patient.address.street}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter street"
                      aria-label="Street"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      name="address.city"
                      value={patient.address.city}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter city"
                      aria-label="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      name="address.state"
                      value={patient.address.state}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter state"
                      aria-label="State"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Zip Code
                    </label>
                    <input
                      name="address.zip"
                      value={patient.address.zip}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter zip code"
                      aria-label="Zip code"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Permanent Address (if different from above)
                    </label>
                    <textarea
                      name="permanentAddress"
                      value={patient.permanentAddress}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="3"
                      placeholder="Enter permanent address"
                      aria-label="Permanent address"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <strong>Street:</strong> {patient.address.street || "N/A"}
                  </div>
                  <div>
                    <strong>City:</strong> {patient.address.city || "N/A"}
                  </div>
                  <div>
                    <strong>State:</strong> {patient.address.state || "N/A"}
                  </div>
                  <div>
                    <strong>Zip Code:</strong> {patient.address.zip || "N/A"}
                  </div>
                  <div className="md:col-span-2">
                    <strong>Permanent Address:</strong>{" "}
                    {patient.permanentAddress || "N/A"}
                  </div>
                </div>
              )}
            </section>
            {/* Contact Information */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Contact Information
                </h3>
                {mode !== "add" && (
                  <button
                    onClick={() => toggleSectionEdit("contact")}
                    className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                    aria-label={
                      editingSection === "contact"
                        ? "Save Contact Info"
                        : "Edit Contact Info"
                    }
                  >
                    <FaEdit className="mr-2" />
                    {editingSection === "contact" ? "Save" : "Edit"}
                  </button>
                )}
              </div>
              {editingSection === "contact" || mode === "add" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Home Phone
                    </label>
                    <input
                      name="homePhone"
                      value={patient.homePhone}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter home phone"
                      aria-label="Home phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Business Phone
                    </label>
                    <input
                      name="businessPhone"
                      value={patient.businessPhone}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter business phone"
                      aria-label="Business phone"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <strong>Home Phone:</strong> {patient.homePhone || "N/A"}
                  </div>
                  <div>
                    <strong>Business Phone:</strong>{" "}
                    {patient.businessPhone || "N/A"}
                  </div>
                </div>
              )}
            </section>
            {/* Referral Information */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Referral Information
                </h3>
                {mode !== "add" && (
                  <button
                    onClick={() => toggleSectionEdit("referral")}
                    className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                    aria-label={
                      editingSection === "referral"
                        ? "Save Referral Info"
                        : "Edit Referral Info"
                    }
                  >
                    <FaEdit className="mr-2" />
                    {editingSection === "referral" ? "Save" : "Edit"}
                  </button>
                )}
              </div>
              {editingSection === "referral" || mode === "add" ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Who referred you to the Institute?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                      {[
                        "Self",
                        "School or Teacher",
                        "Psychologist or Psychiatrist",
                        "Social Agency",
                        "Hospital or Clinic",
                        "Family Doctor",
                        "Friend",
                        "Relative",
                        "Other",
                      ].map((source) => (
                        <label key={source} className="flex items-center">
                          <input
                            type="radio"
                            name="referralSource"
                            value={source.toLowerCase()}
                            checked={
                              patient.referralSource === source.toLowerCase()
                            }
                            onChange={handleChange}
                            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                            aria-label={source}
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {source}
                          </span>
                        </label>
                      ))}
                    </div>
                    {patient.referralSource === "other" && (
                      <input
                        name="referralSourceOther"
                        value={patient.referralSourceOther || ""}
                        onChange={handleChange}
                        className="mt-3 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Please specify"
                        aria-label="Other referral source"
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Has this party been here?
                    </label>
                    <div className="flex space-x-4 mt-1">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="referralPartyPresent"
                          value="Yes"
                          checked={patient.referralPartyPresent === "Yes"}
                          onChange={handleChange}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                          aria-label="Yes"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="referralPartyPresent"
                          value="No"
                          checked={patient.referralPartyPresent === "No"}
                          onChange={handleChange}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                          aria-label="No"
                        />
                        <span className="ml-2 text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <strong>Referral Source:</strong>{" "}
                    {patient.referralSource === "other"
                      ? patient.referralSourceOther
                      : patient.referralSource || "N/A"}
                  </div>
                  <div>
                    <strong>Referral Party Present:</strong>{" "}
                    {patient.referralPartyPresent || "N/A"}
                  </div>
                </div>
              )}
            </section>
            {/* Personal Details */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Personal Details
                </h3>
                {mode !== "add" && (
                  <button
                    onClick={() => toggleSectionEdit("personalDetails")}
                    className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                    aria-label={
                      editingSection === "personalDetails"
                        ? "Save Personal Details"
                        : "Edit Personal Details"
                    }
                  >
                    <FaEdit className="mr-2" />
                    {editingSection === "personalDetails" ? "Save" : "Edit"}
                  </button>
                )}
              </div>
              {editingSection === "personalDetails" || mode === "add" ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Present Marital Status
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                      {[
                        "Never Married",
                        "Married (Living Together) Now for First Time",
                        "Married (Living Together) Now for Second (or More) Time",
                        "Separated",
                        "Divorced and Not Remarried",
                        "Widowed and Not Remarried",
                      ].map((status) => (
                        <label key={status} className="flex items-center">
                          <input
                            type="radio"
                            name="maritalStatus"
                            value={status.toLowerCase()}
                            checked={
                              patient.maritalStatus === status.toLowerCase()
                            }
                            onChange={handleChange}
                            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                            aria-label={status}
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {status}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Number of Years Married to Present Spouse
                      </label>
                      <input
                        type="number"
                        name="yearsMarried"
                        value={patient.yearsMarried}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter years"
                        disabled={!patient.maritalStatus.includes("now for")}
                        aria-label="Years married"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Ages of Male Children
                      </label>
                      <input
                        name="maleChildrenAges"
                        value={patient.maleChildrenAges}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="e.g., 5, 10, 15"
                        aria-label="Male children ages"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Ages of Female Children
                      </label>
                      <input
                        name="femaleChildrenAges"
                        value={patient.femaleChildrenAges}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="e.g., 3, 8"
                        aria-label="Female children ages"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Years of Formal Education Completed
                      </label>
                      <select
                        name="educationYears"
                        value={patient.educationYears}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        aria-label="Education years"
                      >
                        <option value="">Select years</option>
                        {[...Array(21)].map((_, i) => (
                          <option key={i} value={i}>
                            {i === 20 ? "More than 20" : i}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-2 mx-20">
                      <label className="block text-sm font-medium text-gray-700">
                        How religious are you? (1 = Very Religious, 5 = Average,
                        9 = Atheist)
                      </label>
                      <div className="mt-2 flex items-start justify-between">
                        <div className="flex w-full justify-between">
                          <span className="text-xs text-gray-600 -ml-1">
                            Very
                          </span>
                          <span className="text-xs text-gray-600">Average</span>
                          <span className="text-xs text-gray-600 -mr-1">
                            Atheist
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-1 space-x-1">
                        {[...Array(9)].map((_, i) => {
                          const value = (i + 1).toString();
                          return (
                            <label
                              key={value}
                              className="flex flex-col items-center"
                            >
                              <input
                                type="radio"
                                name="religiosity"
                                value={value}
                                checked={patient.religiosity === value}
                                onChange={handleChange}
                                className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 custom-radio"
                                aria-label={`Religiosity level ${value}`}
                              />
                              <span className="mt-1 text-sm text-gray-700">
                                {value}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <strong>Marital Status:</strong>{" "}
                    {patient.maritalStatus || "N/A"}
                  </div>
                  <div>
                    <strong>Years Married:</strong>{" "}
                    {patient.yearsMarried || "N/A"}
                  </div>
                  <div>
                    <strong>Male Children Ages:</strong>{" "}
                    {patient.maleChildrenAges || "N/A"}
                  </div>
                  <div>
                    <strong>Female Children Ages:</strong>{" "}
                    {patient.femaleChildrenAges || "N/A"}
                  </div>
                  <div>
                    <strong>Years of Education:</strong>{" "}
                    {patient.educationYears || "N/A"}
                  </div>
                  <div>
                    <strong>Religiosity:</strong>{" "}
                    {patient.religiosity
                      ? `${patient.religiosity} (1=Very Religious, 9=Atheist)`
                      : "N/A"}
                  </div>
                </div>
              )}
            </section>
            {/* Personal Insights */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Personal Insights
                </h3>
                {mode !== "add" && (
                  <button
                    onClick={() => toggleSectionEdit("insights")}
                    className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                    aria-label={
                      editingSection === "insights"
                        ? "Save Personal Insights"
                        : "Edit Personal Insights"
                    }
                  >
                    <FaEdit className="mr-2" />
                    {editingSection === "insights" ? "Save" : "Edit"}
                  </button>
                )}
              </div>
              {editingSection === "insights" || mode === "add" ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      List the things you like to do most, kinds of things and
                      persons that give you pleasure
                    </label>
                    <textarea
                      name="thingsLiked"
                      value={patient.thingsLiked}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="Describe your interests and pleasures"
                      aria-label="Things liked"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      List your main assets and good points
                    </label>
                    <textarea
                      name="assets"
                      value={patient.assets}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="List your strengths"
                      aria-label="Assets"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      List your main bad points
                    </label>
                    <textarea
                      name="badPoints"
                      value={patient.badPoints}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="List your weaknesses"
                      aria-label="Bad points"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      List your main social difficulties
                    </label>
                    <textarea
                      name="socialDifficulties"
                      value={patient.socialDifficulties}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="Describe social challenges"
                      aria-label="Social difficulties"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      List your main love and sex difficulties
                    </label>
                    <textarea
                      name="loveSexDifficulties"
                      value={patient.loveSexDifficulties}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="Describe relationship challenges"
                      aria-label="Love and sex difficulties"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      List your main school or work difficulties
                    </label>
                    <textarea
                      name="schoolWorkDifficulties"
                      value={patient.schoolWorkDifficulties}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="Describe professional/academic challenges"
                      aria-label="School or work difficulties"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      List your main life goals
                    </label>
                    <textarea
                      name="lifeGoals"
                      value={patient.lifeGoals}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="List your life goals"
                      aria-label="Life goals"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      List the things about yourself you would most like to
                      change
                    </label>
                    <textarea
                      name="thingsToChange"
                      value={patient.thingsToChange}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="Describe desired changes"
                      aria-label="Things to change"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <strong>Things Liked:</strong>{" "}
                    {patient.thingsLiked || "N/A"}
                  </div>
                  <div>
                    <strong>Assets:</strong> {patient.assets || "N/A"}
                  </div>
                  <div>
                    <strong>Bad Points:</strong> {patient.badPoints || "N/A"}
                  </div>
                  <div>
                    <strong>Social Difficulties:</strong>{" "}
                    {patient.socialDifficulties || "N/A"}
                  </div>
                  <div>
                    <strong>Love/Sex Difficulties:</strong>{" "}
                    {patient.loveSexDifficulties || "N/A"}
                  </div>
                  <div>
                    <strong>School/Work Difficulties:</strong>{" "}
                    {patient.schoolWorkDifficulties || "N/A"}
                  </div>
                  <div>
                    <strong>Life Goals:</strong> {patient.lifeGoals || "N/A"}
                  </div>
                  <div>
                    <strong>Things to Change:</strong>{" "}
                    {patient.thingsToChange || "N/A"}
                  </div>
                </div>
              )}
            </section>
            {/* Occupation Information */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Occupation Information
                </h3>
                {mode !== "add" && (
                  <button
                    onClick={() => toggleSectionEdit("occupation")}
                    className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                    aria-label={
                      editingSection === "occupation"
                        ? "Save Occupation Info"
                        : "Edit Occupation Info"
                    }
                  >
                    <FaEdit className="mr-2" />
                    {editingSection === "occupation" ? "Save" : "Edit"}
                  </button>
                )}
              </div>
              {editingSection === "occupation" || mode === "add" ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        What occupation(s) have you mainly been trained for?
                      </label>
                      <input
                        name="occupation"
                        value={patient.occupation}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter occupation"
                        aria-label="Occupation"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Present Occupation
                      </label>
                      <input
                        name="occupation"
                        value={patient.occupation}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter occupation"
                        aria-label="Occupation"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Occupation Status
                      </label>
                      <div className="flex items-center space-x-4 mt-5">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="occupationFullTime"
                            checked={patient.occupationFullTime}
                            onChange={(e) =>
                              setPatient({
                                ...patient,
                                occupationFullTime: e.target.checked,
                              })
                            }
                            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                            aria-label="Full-time"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Full-time
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="occupationFullTime"
                            checked={!patient.occupationFullTime}
                            onChange={(e) =>
                              setPatient({
                                ...patient,
                                occupationFullTime: !e.target.checked,
                              })
                            }
                            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                            aria-label="Part-time"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Part-time
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="col-span-2">   <strong>What occupation(s) have you mainly been trained for? : </strong>
                 {patient.occupation}
                 </div>
                 
                  <div>
                    <strong>Present Occupation:</strong> {patient.occupation || "N/A"}
                  </div>
                  <div>
                    <strong>Occupation Status:</strong>{" "}
                    {patient.occupationFullTime ? "Full-time" : "Part-time"}
                  </div>
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === "family" && (
          <div className=" p-8">
            {/* Spouse's Information */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Spouse's Information
                </h3>
                {mode !== "add" && (
                  <button
                    onClick={() => toggleSectionEdit("spouse")}
                    className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                    aria-label={
                      editingSection === "spouse"
                        ? "Save Spouse Info"
                        : "Edit Spouse Info"
                    }
                  >
                    <FaEdit className="mr-2" />
                    {editingSection === "spouse" ? "Save" : "Edit"}
                  </button>
                )}
              </div>
              {editingSection === "spouse" || mode === "add" ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Spouse's Occupation
                      </label>
                      <input
                        name="spouseOccupation"
                        value={patient.spouseOccupation}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter spouse's occupation"
                        disabled={!patient.maritalStatus.includes("now for")}
                        aria-label="Spouse's occupation"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Spouse's Occupation Status
                      </label>
                      <div className="flex items-center space-x-4 mt-5">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="spouseOccupationFullTime"
                            checked={patient.spouseOccupationFullTime}
                            onChange={(e) =>
                              setPatient({
                                ...patient,
                                spouseOccupationFullTime: e.target.checked,
                              })
                            }
                            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                            disabled={
                              !patient.maritalStatus.includes("now for")
                            }
                            aria-label="Spouse full-time"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Full-time
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="spouseOccupationFullTime"
                            checked={
                              !patient.maritalStatus.includes("now for")
                                ? false
                                : !patient.spouseOccupationFullTime
                            }
                            onChange={(e) =>
                              setPatient({
                                ...patient,
                                spouseOccupationFullTime: !e.target.checked,
                              })
                            }
                            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                            disabled={
                              !patient.maritalStatus.includes("now for")
                            }
                            aria-label="Spouse part-time"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Part-time
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <strong>Spouse's Occupation:</strong>{" "}
                    {patient.spouseOccupation || "N/A"}
                  </div>
                  <div>
                    <strong>Spouse's Occupation Status:</strong>{" "}
                    {patient.spouseOccupationFullTime
                      ? "Full-time"
                      : "Part-time"}
                  </div>
                </div>
              )}
            </section>
            {/* Parental Information */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Parental Information
                </h3>
                {mode !== "add" && (
                  <button
                    onClick={() => toggleSectionEdit("parental")}
                    className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                    aria-label={
                      editingSection === "parental"
                        ? "Save Parental Info"
                        : "Edit Parental Info"
                    }
                  >
                    <FaEdit className="mr-2" />
                    {editingSection === "parental" ? "Save" : "Edit"}
                  </button>
                )}
              </div>
              {editingSection === "parental" || mode === "add" ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Mother's Age
                      </label>
                      <input
                        type="number"
                        name="motherAge"
                        value={patient.motherAge}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter mother's age"
                        aria-label="Mother's age"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        If deceased, how old were you when she died?
                      </label>
                      <input
                        type="number"
                        name="ageWhenMotherDied"
                        value={patient.ageWhenMotherDied}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter your age at time of death"
                        aria-label="Age when mother died"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Father's Age
                      </label>
                      <input
                        type="number"
                        name="fatherAge"
                        value={patient.fatherAge}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter father's age"
                        aria-label="Father's age"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        If deceased, how old were you when he died?
                      </label>
                      <input
                        type="number"
                        name="ageWhenFatherDied"
                        value={patient.ageWhenFatherDied}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter your age at time of death"
                        aria-label="Age when father died"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Mother's Occupation
                      </label>
                      <input
                        name="motherOccupation"
                        value={patient.motherOccupation}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter mother's occupation"
                        aria-label="Mother's occupation"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Father's Occupation
                      </label>
                      <input
                        name="fatherOccupation"
                        value={patient.fatherOccupation}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter father's occupation"
                        aria-label="Father's occupation"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Mother's Religion
                      </label>
                      <input
                        name="motherReligion"
                        value={patient.motherReligion}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter mother's religion"
                        aria-label="Mother's religion"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Father's Religion
                      </label>
                      <input
                        name="fatherReligion"
                        value={patient.fatherReligion}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter father's religion"
                        aria-label="Father's religion"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      If your mother and father did not raise you when you were
                      young, who did?
                    </label>
                    <input
                      name="raisedBy"
                      value={patient.raisedBy}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter who raised you"
                      aria-label="Raised by"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Briefly describe the type of person your mother (or
                      stepmother or person who substituted for your mother) was
                      when you were a child and how you got along with her
                    </label>
                    <textarea
                      name="motherDescription"
                      value={patient.motherDescription}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="Describe your mother and relationship"
                      aria-label="Mother description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Briefly describe the type of person your father (or
                      stepfather or father substitute) was when you were a child
                      and how you got along with him
                    </label>
                    <textarea
                      name="fatherDescription"
                      value={patient.fatherDescription}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="Describe your father and relationship"
                      aria-label="Father description"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <strong>Mother's Age:</strong> {patient.motherAge || "N/A"}
                  </div>
                  <div>
                    <strong>
                      If deceased, how old were you when she died?:
                    </strong>{" "}
                    {patient.ageWhenMotherDied || "N/A"}
                  </div>
                  <div>
                    <strong>Father's Age:</strong> {patient.fatherAge || "N/A"}
                  </div>
                  <div>
                    <strong>
                      If deceased, how old were you when he died?:
                    </strong>{" "}
                    {patient.ageWhenFatherDied || "N/A"}
                  </div>
                  <div>
                    <strong>Mother's Occupation:</strong>{" "}
                    {patient.motherOccupation || "N/A"}
                  </div>
                  <div>
                    <strong>Father's Occupation:</strong>{" "}
                    {patient.fatherOccupation || "N/A"}
                  </div>
                  <div>
                    <strong>Mother's Religion:</strong>{" "}
                    {patient.motherReligion || "N/A"}
                  </div>
                  <div>
                    <strong>Father's Religion:</strong>{" "}
                    {patient.fatherReligion || "N/A"}
                  </div>
                  <div className="md:col-span-2">
                    <strong>
                      If your mother and father did not raise you when you were
                      young, who did?:
                    </strong>{" "}
                    {patient.raisedBy || "N/A"}
                  </div>
                  <div className="md:col-span-2">
                    <strong>Mother's Description:</strong>{" "}
                    {patient.motherDescription || "N/A"}
                  </div>
                  <div className="md:col-span-2">
                    <strong>Father's Description:</strong>{" "}
                    {patient.fatherDescription || "N/A"}
                  </div>
                </div>
              )}
            </section>
            {/* Sibling Information */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Sibling Information
                </h3>
                {mode !== "add" && (
                  <button
                    onClick={() => toggleSectionEdit("sibling")}
                    className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                    aria-label={
                      editingSection === "sibling"
                        ? "Save Sibling Info"
                        : "Edit Sibling Info"
                    }
                  >
                    <FaEdit className="mr-2" />
                    {editingSection === "sibling" ? "Save" : "Edit"}
                  </button>
                )}
              </div>
              {editingSection === "sibling" || mode === "add" ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        If your mother and father separated, how old were you at
                        the time?
                      </label>
                      <input
                        type="number"
                        name="parentalSeparationAge"
                        value={patient.parentalSeparationAge}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter age"
                        aria-label="Parental separation age"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        If your mother and father divorced, how old were you at
                        the time?
                      </label>
                      <input
                        type="number"
                        name="parentalDivorceAge"
                        value={patient.parentalDivorceAge}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter age"
                        aria-label="Parental divorce age"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Total number of times mother divorced
                      </label>
                      <input
                        type="number"
                        name="motherDivorceCount"
                        value={patient.motherDivorceCount}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter number"
                        aria-label="Mother divorce count"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Total number of times father divorced
                      </label>
                      <input
                        type="number"
                        name="fatherDivorceCount"
                        value={patient.fatherDivorceCount}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter number"
                        aria-label="Father divorce count"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Number of living brothers
                      </label>
                      <input
                        type="number"
                        name="livingBrothers"
                        value={patient.livingBrothers}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter number"
                        aria-label="Living brothers"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Number of living sisters
                      </label>
                      <input
                        type="number"
                        name="livingSisters"
                        value={patient.livingSisters}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter number"
                        aria-label="Living sisters"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Ages of living brothers
                      </label>
                      <input
                        name="brothersAges"
                        value={patient.brothersAges}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="e.g., 20, 25"
                        aria-label="Brothers ages"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Ages of living sisters
                      </label>
                      <input
                        name="sistersAges"
                        value={patient.sistersAges}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="e.g., 18, 22"
                        aria-label="Sisters ages"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        I was child number
                      </label>
                      <input
                        type="number"
                        name="childNumber"
                        value={patient.childNumber}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter number"
                        aria-label="Child number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        In a family of children
                      </label>
                      <input
                        type="number"
                        name="familyChildren"
                        value={patient.familyChildren}
                        onChange={handleChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter total number"
                        aria-label="Family children"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Were you adopted?
                    </label>
                    <div className="flex space-x-4 mt-1">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="adopted"
                          value="Yes"
                          checked={patient.adopted === "Yes"}
                          onChange={handleChange}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                          aria-label="Adopted yes"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="adopted"
                          value="No"
                          checked={patient.adopted === "No"}
                          onChange={handleChange}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                          aria-label="Adopted no"
                        />
                        <span className="ml-2 text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      If there were unusually disturbing features in your
                      relationship to any of your brothers, briefly describe
                    </label>
                    <textarea
                      name="brotherDisturbances"
                      value={patient.brotherDisturbances}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="Describe any issues"
                      aria-label="Brother disturbances"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      If there were unusually disturbing features in your
                      relationship to any of your sisters, briefly describe
                    </label>
                    <textarea
                      name="sisterDisturbances"
                      value={patient.sisterDisturbances}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="Describe any issues"
                      aria-label="Sister disturbances"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <strong>
                      If your mother and father separated, how old were you at
                      the time?:
                    </strong>{" "}
                    {patient.parentalSeparationAge || "N/A"}
                  </div>
                  <div>
                    <strong>
                      If your mother and father divorced, how old were you at
                      the time?:
                    </strong>{" "}
                    {patient.parentalDivorceAge || "N/A"}
                  </div>
                  <div>
                    <strong>Total number of times mother divorced:</strong>{" "}
                    {patient.motherDivorceCount || "N/A"}
                  </div>
                  <div>
                    <strong>Total number of times father divorced:</strong>{" "}
                    {patient.fatherDivorceCount || "N/A"}
                  </div>
                  <div>
                    <strong>Number of living brothers:</strong>{" "}
                    {patient.livingBrothers || "N/A"}
                  </div>
                  <div>
                    <strong>Number of living sisters:</strong>{" "}
                    {patient.livingSisters || "N/A"}
                  </div>
                  <div>
                    <strong>Ages of living brothers:</strong>{" "}
                    {patient.brothersAges || "N/A"}
                  </div>
                  <div>
                    <strong>Ages of living sisters:</strong>{" "}
                    {patient.sistersAges || "N/A"}
                  </div>
                  <div>
                    <strong>I was child number:</strong>{" "}
                    {patient.childNumber || "N/A"}
                  </div>
                  <div>
                    <strong>In a family of children:</strong>{" "}
                    {patient.familyChildren || "N/A"}
                  </div>
                  <div className="md:col-span-2">
                    <strong>Were you adopted?:</strong>{" "}
                    {patient.adopted || "N/A"}
                  </div>
                  <div className="md:col-span-2">
                    <strong>Brother Disturbances:</strong>{" "}
                    {patient.brotherDisturbances || "N/A"}
                  </div>
                  <div className="md:col-span-2">
                    <strong>Sister Disturbances:</strong>{" "}
                    {patient.sisterDisturbances || "N/A"}
                  </div>
                </div>
              )}
            </section>
            {/* Family Mental Health */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Family Mental Health
                </h3>
                {mode !== "add" && (
                  <button
                    onClick={() => toggleSectionEdit("familyMentalHealth")}
                    className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                    aria-label={
                      editingSection === "familyMentalHealth"
                        ? "Save Family Mental Health Info"
                        : "Edit Family Mental Health Info"
                    }
                  >
                    <FaEdit className="mr-2" />
                    {editingSection === "familyMentalHealth" ? "Save" : "Edit"}
                  </button>
                )}
              </div>
              {editingSection === "familyMentalHealth" || mode === "add" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Number of close male relatives who have been seriously
                      emotionally disturbed
                    </label>
                    <input
                      type="number"
                      name="maleRelativesDisturbed"
                      value={patient.maleRelativesDisturbed}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter number"
                      aria-label="Male relatives disturbed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Number that have been hospitalized for psychiatric
                      treatment, or have attempted suicide
                    </label>
                    <input
                      type="number"
                      name="maleRelativesHospitalized"
                      value={patient.maleRelativesHospitalized}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter number"
                      aria-label="Male relatives hospitalized"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Number of close female relatives who have been seriously
                      emotionally disturbed
                    </label>
                    <input
                      type="number"
                      name="femaleRelativesDisturbed"
                      value={patient.femaleRelativesDisturbed}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter number"
                      aria-label="Female relatives disturbed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Number that have been hospitalized for psychiatric
                      treatment, or have attempted suicide
                    </label>
                    <input
                      type="number"
                      name="femaleRelativesHospitalized"
                      value={patient.femaleRelativesHospitalized}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter number"
                      aria-label="Female relatives hospitalized"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <strong>
                      Number of close male relatives who have been seriously
                      emotionally disturbed:
                    </strong>{" "}
                    {patient.maleRelativesDisturbed || "N/A"}
                  </div>
                  <div>
                    <strong>
                      Number that have been hospitalized for psychiatric
                      treatment, or have attempted suicide:
                    </strong>{" "}
                    {patient.maleRelativesHospitalized || "N/A"}
                  </div>
                  <div>
                    <strong>
                      Number of close female relatives who have been seriously
                      emotionally disturbed:
                    </strong>{" "}
                    {patient.femaleRelativesDisturbed || "N/A"}
                  </div>
                  <div>
                    <strong>
                      Number that have been hospitalized for psychiatric
                      treatment, or have attempted suicide:
                    </strong>{" "}
                    {patient.femaleRelativesHospitalized || "N/A"}
                  </div>
                </div>
              )}
            </section>
          </div>
        )}
    {activeTab === 'medical' && (
    <div className=" p-8">
      {/* Health Details */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-2xl font-semibold text-gray-800">Health Details</h3>
          {mode !== 'add' && (
            <button
              onClick={() => toggleSectionEdit('health')}
              className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
              aria-label={editingSection === 'health' ? 'Save Health Details' : 'Edit Health Details'}
            >
              <FaEdit className="mr-2" />
              {editingSection === 'health' ? 'Save' : 'Edit'}
            </button>
          )}
        </div>
        {editingSection === 'health' || mode === 'add' ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                List your chief physical ailments, diseases, complaints, or handicaps
              </label>
              <textarea
                name="physicalAilments"
                value={patient.physicalAilments}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="4"
                placeholder="List physical health issues"
                aria-label="Physical ailments"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Briefly list (PRINT) your present main complaints, symptoms, and problems
              </label>
              <textarea
                name="mainComplaints"
                value={patient.mainComplaints}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="4"
                placeholder="List current issues"
                aria-label="Main complaints"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Briefly list any additional past complaints, symptoms, and problems
              </label>
              <textarea
                name="pastComplaints"
                value={patient.pastComplaints}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="4"
                placeholder="List past issues"
                aria-label="Past complaints"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Under what conditions are your problems worse?
              </label>
              <textarea
                name="worseConditions"
                value={patient.worseConditions}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="4"
                placeholder="Describe conditions"
                aria-label="Worse conditions"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Under what conditions are they improved?
              </label>
              <textarea
                name="improvedConditions"
                value={patient.improvedConditions}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="4"
                placeholder="Describe conditions"
                aria-label="Improved conditions"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div><strong>Chief Physical Ailments:</strong> {patient.physicalAilments || 'N/A'}</div>
            <div><strong>Present Main Complaints:</strong> {patient.mainComplaints || 'N/A'}</div>
            <div><strong>Past Complaints:</strong> {patient.pastComplaints || 'N/A'}</div>
            <div><strong>Conditions When Problems Worsen:</strong> {patient.worseConditions || 'N/A'}</div>
            <div><strong>Conditions When Problems Improve:</strong> {patient.improvedConditions || 'N/A'}</div>
          </div>
        )}
      </section>
      {/* Treatment History */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-2xl font-semibold text-gray-800">Treatment History</h3>
          {mode !== 'add' && (
            <button
              onClick={() => toggleSectionEdit('treatment')}
              className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
              aria-label={editingSection === 'treatment' ? 'Save Treatment History' : 'Edit Treatment History'}
            >
              <FaEdit className="mr-2" />
              {editingSection === 'treatment' ? 'Save' : 'Edit'}
            </button>
          )}
        </div>
        {editingSection === 'treatment' || mode === 'add' ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                What kind of treatment have you previously had for emotional problems?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Hours of individual therapy
                  </label>
                  <input
                    type="number"
                    name="individualTherapyHours"
                    value={patient.individualTherapyHours}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter hours"
                    aria-label="Individual therapy hours"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Spread over years
                  </label>
                  <input
                    type="number"
                    name="individualTherapyYears"
                    value={patient.individualTherapyYears}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter years"
                    aria-label="Individual therapy years"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Ending years ago
                  </label>
                  <input
                    type="number"
                    name="individualTherapyEndYears"
                    value={patient.individualTherapyEndYears}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter years"
                    aria-label="Individual therapy end years"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Hours of group therapy
                  </label>
                  <input
                    type="number"
                    name="groupTherapyHours"
                    value={patient.groupTherapyHours}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter hours"
                    aria-label="Group therapy hours"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Months of psychiatric hospitalization
                  </label>
                  <input
                    type="number"
                    name="psychiatricHospitalizationMonths"
                    value={patient.psychiatricHospitalizationMonths}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter months"
                    aria-label="Psychiatric hospitalization months"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Are you undergoing treatment anywhere else now?
              </label>
              <div className="flex space-x-4 mt-1">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="currentTreatment"
                    value="Yes"
                    checked={patient.currentTreatment === "Yes"}
                    onChange={handleChange}
                    className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                    aria-label="Current treatment yes"
                  />
                  <span className="ml-2 text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="currentTreatment"
                    value="No"
                    checked={patient.currentTreatment === "No"}
                    onChange={handleChange}
                    className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                    aria-label="Current treatment no"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of times during past year you have taken antidepressants
              </label>
              <input
                type="number"
                name="antidepressantsCount"
                value={patient.antidepressantsCount}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                placeholder="Enter number"
                aria-label="Antidepressants count"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type of psychotherapy you have mainly had (briefly describe method of treatment—ex., dream analysis, free association, drugs, hypnosis, etc.)
              </label>
              <input
                name="psychotherapyType"
                value={patient.psychotherapyType}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                placeholder="Enter type of psychotherapy"
                aria-label="Psychotherapy type"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Additional information that you think might be helpful
              </label>
              <textarea
                name="additionalInfo"
                value={patient.additionalInfo}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="4"
                placeholder="Provide additional details"
                aria-label="Additional info"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Individual Therapy Hours:</strong> {patient.individualTherapyHours || 'N/A'}</div>
            <div><strong>Individual Therapy Years:</strong> {patient.individualTherapyYears || 'N/A'}</div>
            <div><strong>Individual Therapy Ended Years Ago:</strong> {patient.individualTherapyEndYears || 'N/A'}</div>
            <div><strong>Group Therapy Hours:</strong> {patient.groupTherapyHours || 'N/A'}</div>
            <div><strong>Psychiatric Hospitalization Months:</strong> {patient.psychiatricHospitalizationMonths || 'N/A'}</div>
            <div><strong>Current Treatment:</strong> {patient.currentTreatment || 'N/A'}</div>
            <div><strong>Antidepressants Count (Past Year):</strong> {patient.antidepressantsCount || 'N/A'}</div>
            <div><strong>Psychotherapy Type:</strong> {patient.psychotherapyType || 'N/A'}</div>
            <div className="md:col-span-2"><strong>Additional Information:</strong> {patient.additionalInfo || 'N/A'}</div>
          </div>
        )}
      </section>
    </div>
  )}
 {activeTab === 'education' && (
    <div className="p-8">
      {/* G.C.E Ordinary Level (O/L) Qualifications */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <div className="flex items-center space-x-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={patient.education.ol.enabled !== false}
                onChange={(e) => {
                  setPatient((prev) => ({
                    ...prev,
                    education: {
                      ...prev.education,
                      ol: {
                        ...prev.education.ol,
                        enabled: e.target.checked,
                      },
                    },
                  }));
                }}
                className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                disabled={editingSection !== 'ol' && mode !== 'add'}
                aria-label="Has G.C.E O/L Qualifications"
              />
              <span className="ml-2 text-sm text-gray-700"></span>
            </label>
            <h3 className="text-2xl font-semibold text-gray-800">G.C.E Ordinary Level (O/L) Qualifications</h3>
          </div>
          {mode !== 'add' && (
            <button
              onClick={() => toggleSectionEdit('ol')}
              className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
              aria-label={editingSection === 'ol' ? 'Save O/L Qualifications' : 'Edit O/L Qualifications'}
            >
              <FaEdit className="mr-2" />
              {editingSection === 'ol' ? 'Save' : 'Edit'}
            </button>
          )}
        </div>
        {editingSection === 'ol' || mode === 'add' ? (
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
                    disabled={patient.education.ol.enabled === false}
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
                  disabled={index < defaultOLSubjects.length || patient.education.ol.enabled === false}
                  aria-label={`O/L Subject ${index + 1} name`}
                />
                <input
                  name={`education.ol.subjects.${index}.marks`}
                  value={subject.marks}
                  onChange={handleChange}
                  className="w-1/4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Grade (e.g., A, B, C, S, W)"
                  disabled={!subject.followed || patient.education.ol.enabled === false}
                  aria-label={`O/L Subject ${index + 1} marks`}
                />
                {index >= defaultOLSubjects.length && (
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
                            ol: {
                              ...prev.education.ol,
                              subjects: updatedSubjects,
                            },
                          },
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
            <button
              type="button"
              onClick={() => addCustomSubject("ol")}
              className="mt-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-all duration-200"
              disabled={patient.education.ol.enabled === false}
            >
              Add Custom O/L Subject
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div><strong>Has O/L Qualifications:</strong> {patient.education.ol.enabled !== false ? 'Yes' : 'No'}</div>
            {patient.education.ol.enabled !== false && patient.education.ol.subjects.some(subject => subject.followed) ? (
              <div>
                <strong>Subjects:</strong>
                <table className="w-full border-collapse border border-gray-300 mt-2">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2 text-left text-sm font-medium text-gray-700">Subject</th>
                      <th className="border border-gray-300 p-2 text-left text-sm font-medium text-gray-700">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patient.education.ol.subjects.map((subject, index) => (
                      subject.followed && (
                        <tr key={index}>
                          <td className="border border-gray-300 p-2">{subject.name || 'N/A'}</td>
                          <td className="border border-gray-300 p-2">{subject.marks || 'N/A'}</td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
            ) : patient.education.ol.enabled !== false ? (
              <div>No subjects studied.</div>
            ) : null}
          </div>
        )}
      </section>
      {/* G.C.E Advanced Level (A/L) Qualifications */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <div className="flex items-center space-x-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={patient.education.al.enabled !== false}
                onChange={(e) => {
                  setPatient((prev) => ({
                    ...prev,
                    education: {
                      ...prev.education,
                      al: {
                        ...prev.education.al,
                        enabled: e.target.checked,
                      },
                    },
                  }));
                }}
                className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                disabled={editingSection !== 'al' && mode !== 'add'}
                aria-label="Has G.C.E A/L Qualifications"
              />
              <span className="ml-2 text-sm text-gray-700"></span>
            </label>
            <h3 className="text-2xl font-semibold text-gray-800">G.C.E Advanced Level (A/L) Qualifications</h3>
          </div>
          {mode !== 'add' && (
            <button
              onClick={() => toggleSectionEdit('al')}
              className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
              aria-label={editingSection === 'al' ? 'Save A/L Qualifications' : 'Edit A/L Qualifications'}
            >
              <FaEdit className="mr-2" />
              {editingSection === 'al' ? 'Save' : 'Edit'}
            </button>
          )}
        </div>
        {editingSection === 'al' || mode === 'add' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Stream</label>
              <select
                name="education.al.stream"
                value={patient.education.al.stream}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                disabled={patient.education.al.enabled === false}
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
                    disabled={patient.education.al.enabled === false}
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
                  disabled={index < defaultALSubjects.length || patient.education.al.enabled === false}
                  aria-label={`A/L Subject ${index + 1} name`}
                />
                <input
                  name={`education.al.subjects.${index}.marks`}
                  value={subject.marks}
                  onChange={handleChange}
                  className="w-1/4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Grade (e.g., A, B, C, S, W)"
                  disabled={!subject.followed || patient.education.al.enabled === false}
                  aria-label={`A/L Subject ${index + 1} marks`}
                />
                {index >= defaultALSubjects.length && (
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
                            al: {
                              ...prev.education.al,
                              subjects: updatedSubjects,
                            },
                          },
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
            <button
              type="button"
              onClick={() => addCustomSubject("al")}
              className="mt-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-all duration-200"
              disabled={patient.education.al.enabled === false}
            >
              Add Custom A/L Subject
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">General English Marks</label>
                <input
                  name="education.al.generalEnglishMarks"
                  value={patient.education.al.generalEnglishMarks}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Grade (e.g., A, B, C, S, W)"
                  disabled={patient.education.al.enabled === false}
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
                  disabled={patient.education.al.enabled === false}
                  aria-label="Common General Test Marks"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div><strong>Has A/L Qualifications:</strong> {patient.education.al.enabled !== false ? 'Yes' : 'No'}</div>
            {patient.education.al.enabled !== false && (
              <>
                <div><strong>Stream:</strong> {patient.education.al.stream || 'N/A'}</div>
                {patient.education.al.subjects.some(subject => subject.followed) ? (
                  <div>
                    <strong>Subjects:</strong>
                    <table className="w-full border-collapse border border-gray-300 mt-2">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-2 text-left text-sm font-medium text-gray-700">Subject</th>
                          <th className="border border-gray-300 p-2 text-left text-sm font-medium text-gray-700">Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patient.education.al.subjects.map((subject, index) => (
                          subject.followed && (
                            <tr key={index}>
                              <td className="border border-gray-300 p-2">{subject.name || 'N/A'}</td>
                              <td className="border border-gray-300 p-2">{subject.marks || 'N/A'}</td>
                            </tr>
                          )
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div>No subjects studied.</div>
                )}
                <div><strong>General English Marks:</strong> {patient.education.al.generalEnglishMarks || 'N/A'}</div>
                <div><strong>Common General Test Marks:</strong> {patient.education.al.commonGeneralTestMarks || 'N/A'}</div>
              </>
            )}
          </div>
        )}
      </section>
      {/* University Qualifications */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <div className="flex items-center space-x-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={patient.education.universityEnabled !== false}
                onChange={(e) => {
                  setPatient((prev) => ({
                    ...prev,
                    education: {
                      ...prev.education,
                      universityEnabled: e.target.checked,
                    },
                  }));
                }}
                className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                disabled={editingSection !== 'university' && mode !== 'add'}
                aria-label="Has University Qualifications"
              />
              <span className="ml-2 text-sm text-gray-700"></span>
            </label>
            <h3 className="text-2xl font-semibold text-gray-800">University Qualifications</h3>
          </div>
          {mode !== 'add' && (
            <button
              onClick={() => toggleSectionEdit('university')}
              className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
              aria-label={editingSection === 'university' ? 'Save University Qualifications' : 'Edit University Qualifications'}
            >
              <FaEdit className="mr-2" />
              {editingSection === 'university' ? 'Save' : 'Edit'}
            </button>
          )}
        </div>
        {editingSection === 'university' || mode === 'add' ? (
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
                      disabled={patient.education.universityEnabled === false}
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
                      disabled={patient.education.universityEnabled === false}
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
                      disabled={patient.education.universityEnabled === false}
                      aria-label={`Marks ${index + 1}`}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPatient((prev) => {
                      const updatedUniversity = [...prev.education.university];
                      updatedUniversity.splice(index, 1);
                      return {
                        ...prev,
                        education: {
                          ...prev.education,
                          university: updatedUniversity,
                        },
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
              </div>
            ))}
            <button
              type="button"
              onClick={addUniversityQualification}
              className="mt-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-all duration-200"
              disabled={patient.education.universityEnabled === false}
            >
              Add University Qualification
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div><strong>Has University Qualifications:</strong> {patient.education.universityEnabled !== false ? 'Yes' : 'No'}</div>
            {patient.education.universityEnabled !== false && patient.education.university.length > 0 ? (
              <div>
                <strong>Qualifications:</strong>
                <table className="w-full border-collapse border border-gray-300 mt-2">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2 text-left text-sm font-medium text-gray-700">Degree</th>
                      <th className="border border-gray-300 p-2 text-left text-sm font-medium text-gray-700">Institution</th>
                      <th className="border border-gray-300 p-2 text-left text-sm font-medium text-gray-700">Marks/Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patient.education.university.map((qualification, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 p-2">{qualification.degree || 'N/A'}</td>
                        <td className="border border-gray-300 p-2">{qualification.institution || 'N/A'}</td>
                        <td className="border border-gray-300 p-2">{qualification.marks || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : patient.education.universityEnabled !== false ? (
              <div>No university qualifications recorded.</div>
            ) : null}
          </div>
        )}
      </section>
    </div>
  )}
      </form>
    </div>
  );
}

export default PatientInfoEdit;
