export const getOccupations =async()=>{

       await new Promise(resolve => setTimeout(resolve, 500));
const data= [
  { value: 15, name: 'Software Engineer' },
  { value: 2, name: 'Teacher' },
  { value: 3, name: 'Doctor' },
  { value: 4, name: 'Nurse' },
  { value: 5, name: 'Accountant' },
  { value: 6, name: 'Engineer' },
  { value: 7, name: 'Lawyer' },
  { value: 8, name: 'Business Analyst' },
  { value: 9, name: 'Marketing Manager' },
  { value: 10, name: 'Sales Representative' },
  { value: 11, name: 'Graphic Designer' },
  { value: 12, name: 'Construction Worker' },
  { value: 13, name: 'Chef' },
  { value: 14, name: 'Retail Manager' },
  { value: 1, name: 'Other' }
];

return {data};

}

export const getReligions =async()=>{ 

      await new Promise(resolve => setTimeout(resolve, 500));

 const data= [
  { value: 1, name: 'Buddhism' },
  { value: 2, name: 'Christianity' },
  { value: 3, name: 'Hinduism' },
  { value: 4, name: 'Islam' },
  { value: 5, name: 'Sikhism' },
  { value: 6, name: 'Judaism' },
  { value: 7, name: 'Atheism' },
  { value: 8, name: 'Agnosticism' },
  { value: 9, name: 'Other' }
];

return {data};

}



export const basicInformationData = [
  {
    patientId: "1",
    patientNo: "PT-0001",
    firstName: "John",
    lastName: "Perera",
    middleName: "Peter",
    dateOfBirth: "1990-01-15",
    age: "35",
    gender: "Male",
    email: "john.perera@example.com",
    homePhone: "0114547854",
    businessPhone: "0119876543",
    permanentAddress: "123 Galle Road, Colombo 03, Sri Lanka",
    referralSource: "self",
    referralPartyPresent: "No",
    formDate: "2024-06-01",
    lastModified: "2024-06-02T10:15:30"
  },
  {
    patientId: "2",
    patientNo: "PT-0002",
    firstName: "Ama",
    lastName: "Silva",
    middleName: "",
    dateOfBirth: "1985-05-15",
    age: "40",
    gender: "Female",
    email: "ama.silva@example.com",
    homePhone: "0812233445",
    businessPhone: "",
    permanentAddress: "45 Kandy Road, Kandy, Sri Lanka",
    referralSource: "family doctor",
    referralPartyPresent: "Yes",
    formDate: "2024-05-20",
    lastModified: "2024-06-01T08:45:10"
  },
  {
    patientId: "3",
    patientNo: "PT-0003",
    firstName: "Nimal",
    lastName: "Fernando",
    middleName: "Kumar",
    dateOfBirth: "1998-10-20",
    age: "26",
    gender: "Male",
    email: "nimal.fernando@example.com",
    homePhone: "0912233445",
    businessPhone: "0918765432",
    permanentAddress: "78 Main Street, Galle, Sri Lanka",
    referralSource: "psychologist or psychiatrist",
    referralPartyPresent: "No",
    formDate: "2024-04-15",
    lastModified: "2024-05-28T13:30:55"
  },
  {
    patientId: "4",
    patientNo: "PT-0004",
    firstName: "Sita",
    lastName: "Wijesinghe",
    middleName: "Rani",
    dateOfBirth: "1970-03-10",
    age: "55",
    gender: "Female",
    email: "sita.wijesinghe@example.com",
    homePhone: "0312233445",
    businessPhone: "",
    permanentAddress: "12 Temple Road, Negombo, Sri Lanka",
    referralSource: "hospital or clinic",
    referralPartyPresent: "Yes",
    formDate: "2024-03-10",
    lastModified: "2024-04-01T17:20:00"
  },
  {
    patientId: "5",
    patientNo: "PT-0005",
    firstName: "Tharushi",
    lastName: "Jayasinghe",
    middleName: "",
    dateOfBirth: "2000-07-25",
    age: "24",
    gender: "Female",
    email: "tharushi.jayasinghe@example.com",
    homePhone: "0452233445",
    businessPhone: "",
    permanentAddress: "56 Lake View, Nuwara Eliya, Sri Lanka",
    referralSource: "friend",
    referralPartyPresent: "No",
    formDate: "2024-05-05",
    lastModified: "2024-06-01T09:10:40"
  }
];

export const getPatientList = async () => {
    // Simulate a delay of 500 milliseconds
    await new Promise(resolve => setTimeout(resolve, 500));

    // Format name from firstName, middleName, and lastName
    const formatName = (patient) => {
        const parts = [patient.firstName, patient.middleName, patient.lastName].filter(Boolean);
        return parts.join(' ').trim();
    };

    // Map basicInformationData to the required patient list format
    const patients = basicInformationData.map(patient => ({
        patientId: patient.patientId,
        patientNo: patient.patientNo,
        name: formatName(patient),
        gender: patient.gender,
        phone: patient.homePhone,
        email: patient.email
    }));

    return { data: patients };
};

export const getBasicInformationData = async (patientId) => {
     await new Promise(resolve => setTimeout(resolve, 500));
  const data = basicInformationData.find((p) => p.patientId === patientId);
  return { data: data || null };
};


export const addBasicInformationData = async (newData) => {
    // Simulate a delay of 500 milliseconds
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate a new unique ID
    const newId = (basicInformationData.length + 1).toString();
    const newPatientNo= `P${String(basicInformationData.length + 1).padStart(4, '0')}`;

    // Create new patient record
    const newRecord = {
        patientId: newId,
        patientNo: newPatientNo,
        firstName: newData.firstName || '',
        lastName: newData.lastName || '',
        middleName: newData.middleName || '',
        dateOfBirth: newData.dob || '',
        age: newData.age || '',
        gender: newData.gender || '',
        email: newData.email || '',
        homePhone: newData.homePhone || '',
        businessPhone: newData.businessPhone || '',
        permanentAddress: newData.permanentAddress || '',
        referralSource: newData.referralSource || '',
        referralPartyPresent: newData.referralPartyPresent || '',
        formDate: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString()
    };

    // Add to basicInformationData array
    basicInformationData.push(newRecord);

    return { success: true, data: newRecord,newId };
};

export const updateBasicInformationData = async (patientId, updatedData) => {
      await new Promise(resolve => setTimeout(resolve, 500));
  const index = basicInformationData.findIndex((p) => p.patientId === patientId);
  if (index === -1) return { success: false, message: "Record not found" };
  basicInformationData[index] = { ...basicInformationData[index], ...updatedData, lastModified: new Date().toISOString() };
 //throw new Error("update basic error")
  return { success: true, data: basicInformationData[index] };
};

export const deleteBasicInformationData = async (patientId) => {
     await new Promise(resolve => setTimeout(resolve, 500));
  const index = basicInformationData.findIndex((p) => p.patientId === patientId);
  if (index === -1) return { success: false, message: "Record not found" };
  const deleted = basicInformationData.splice(index, 1)[0];
  return { success: true, data: deleted };
};

export const personalInformationData = [
  {
    patientId: "1",
    patientNo: "PT-0001",
    maritalStatus: "married_first_time",
    yearsMarried: "10",
    maleChildrenAges: "5, 8",
    femaleChildrenAges: "",
    religiosity: "5",
    thingsLiked: "Reading books, hiking, spending time with family",
    assets: "Problem-solver – I enjoy analyzing issues and finding effective solutions.;;Team player – I communicate well and collaborate effectively with others.",
    badPoints: "Procrastination;;Perfectionism",
    socialDifficulties: "Sometimes struggle with initiating conversations",
    loveSexDifficulties: "Difficulty expressing emotions openly",
    schoolWorkDifficulties: "Managing work-life balance",
    lifeGoals: "Achieve career growth, maintain a healthy family life",
    thingsToChange: "Improve time management, be more assertive",
    occupationTrained: "Engineer",
    occupation: "Engineer",
    occupationFullTime: "full-time",
  },
  {
    patientId: "2",
    patientNo: "PT-0002",
    maritalStatus: "divorced_not_remarried",
    yearsMarried: "",
    maleChildrenAges: "",
    femaleChildrenAges: "12",
    religiosity: "7",
    thingsLiked: "Teaching, gardening, community volunteering",
    assets: "Quick learner – I can pick up new tools and frameworks rapidly.;;Detail-oriented – I notice small issues before they grow into big problems.",
    badPoints: "Shyness",
    socialDifficulties: "Feeling shy in large groups",
    loveSexDifficulties: "Trust issues after divorce",
    schoolWorkDifficulties: "Handling administrative tasks",
    lifeGoals: "Inspire students, create a community garden",
    thingsToChange: "Overcome shyness, improve public speaking",
    occupationTrained: "Teacher",
    occupation: "Teacher",
    occupationFullTime: "full-time",
  },
  {
    patientId: "3",
    patientNo: "PT-0003",
    maritalStatus: "never_married",
    yearsMarried: "",
    maleChildrenAges: "",
    femaleChildrenAges: "",
    religiosity: "9",
    thingsLiked: "Playing sports, coding, traveling",
    assets: "Adaptable – I can adjust to new environments, teams, or technologies easily.;;Strong work ethic – I am committed to meeting deadlines and taking responsibility.",
    badPoints: "Impatience",
    socialDifficulties: "Can be overly competitive in social settings",
    loveSexDifficulties: "Difficulty committing to long-term relationships",
    schoolWorkDifficulties: "Staying focused during long projects",
    lifeGoals: "Start a tech company, travel the world",
    thingsToChange: "Be more patient, improve focus",
    occupationTrained: "Engineer",
    occupation: "Engineer",
    occupationFullTime: "part-time",
  },
  {
    patientId: "4",
    patientNo: "PT-0004",
    maritalStatus: "widowed_not_remarried",
    yearsMarried: "",
    maleChildrenAges: "25",
    femaleChildrenAges: "22",
    religiosity: "3",
    thingsLiked: "Painting, attending cultural events, reading",
    assets: "Detail-oriented – I notice small issues before they grow into big problems.;;Team player – I communicate well and collaborate effectively with others.",
    badPoints: "Perfectionism",
    socialDifficulties: "Difficulty connecting with younger people",
    loveSexDifficulties: "Not seeking new relationships currently",
    schoolWorkDifficulties: "Keeping up with new medical technologies",
    lifeGoals: "Contribute to community health, mentor young doctors",
    thingsToChange: "Reduce perfectionist tendencies",
    occupationTrained: "Doctor",
    occupation: "Doctor",
    occupationFullTime: "full-time",
  },
  {
    patientId: "5",
    patientNo: "PT-0005",
    maritalStatus: "never_married",
    yearsMarried: "",
    maleChildrenAges: "",
    femaleChildrenAges: "",
    religiosity: "6",
    thingsLiked: "Photography, yoga, socializing with friends",
    assets: "Adaptable – I can adjust to new environments, teams, or technologies easily.;;Other: Creative thinker",
    badPoints: "Other: Overthinking",
    socialDifficulties: "Overthinking social interactions",
    loveSexDifficulties: "Hesitant to start new relationships",
    schoolWorkDifficulties: "Managing stress during exams",
    lifeGoals: "Become a professional photographer, achieve inner peace",
    thingsToChange: "Reduce overthinking, build confidence",
    occupationTrained: "Other",
    occupation: "Other",
    occupationFullTime: "part-time",
  },
];


export const addPersonalInformationData = async (newData) => {
    // Simulate a delay of 500 milliseconds
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate a new unique ID
    const newId = (personalInformationData.length + 1).toString();

    // Create new personal information record
    const newRecord = {
        patientId: newId,
        maritalStatus: newData.maritalStatus || '',
        yearsMarried: newData.yearsMarried || '',
        maleChildrenAges: newData.maleChildrenAges || '',
        femaleChildrenAges: newData.femaleChildrenAges || '',
        religiosity: newData.religiosity || '',
        thingsLiked: newData.thingsLiked || '',
        assets: newData.assets || '',
        badPoints: newData.badPoints || '',
        socialDifficulties: newData.socialDifficulties || '',
        loveSexDifficulties: newData.loveSexDifficulties || '',
        schoolWorkDifficulties: newData.schoolWorkDifficulties || '',
        lifeGoals: newData.lifeGoals || '',
        thingsToChange: newData.thingsToChange || '',
        occupationTrained: newData.occupationTrained || '',
        occupation: newData.occupation || '',
        occupationFullTime: newData.occupationFullTime || ''
    };

    // Validate required fields
    const requiredFields = [
        'maritalStatus', 'religiosity', 'thingsLiked', 'assets', 'badPoints',
        'socialDifficulties', 'loveSexDifficulties', 'schoolWorkDifficulties',
        'lifeGoals', 'thingsToChange', 'occupationTrained', 'occupation', 'occupationFullTime'
    ];

    for (const field of requiredFields) {
        if (!newRecord[field] || newRecord[field].toString().trim() === '') {
            return { success: false, message: `${field.replace(/([A-Z])/g, ' $1').trim()} is required` };
        }
    }

    // Validate yearsMarried if maritalStatus is married
    if (['married_first_time', 'married_second_time'].includes(newRecord.maritalStatus)) {
        if (!newRecord.yearsMarried || newRecord.yearsMarried.trim() === '') {
            return { success: false, message: 'Number of Years Married is required for current marriage' };
        }
        if (isNaN(newRecord.yearsMarried) || Number(newRecord.yearsMarried) < 0) {
            return { success: false, message: 'Number of Years Married must be a valid non-negative number' };
        }
    }

    // Validate religiosity
    if (newRecord.religiosity && (isNaN(newRecord.religiosity) || Number(newRecord.religiosity) < 1 || Number(newRecord.religiosity) > 9)) {
        return { success: false, message: 'Religiosity must be a number between 1 and 9' };
    }

    // Add to personalInformationData array
    personalInformationData.push(newRecord);

    return { success: true, data: newRecord };
};


export const getPersonalInformationData = async (patientId) => {
    // Simulate a delay of 1 second (1000 milliseconds)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const data = personalInformationData.find((p) => p.patientId === patientId);
    return { data };
}




export const updatePersonalInformationData = async (patientId, updatedData) => {
     await new Promise(resolve => setTimeout(resolve, 500));
  const index = personalInformationData.findIndex((p) => p.patientId === patientId);
  if (index === -1) return { success: false, message: "Record not found" };
  personalInformationData[index] = { ...personalInformationData[index], ...updatedData };
  //throw new Error("errrrrrr")
  return { success: true, data: personalInformationData[index] };
};

export const deletePersonalInformationData = async (patientId) => {
      await new Promise(resolve => setTimeout(resolve, 500));
  const index = personalInformationData.findIndex((p) => p.patientId === patientId);
  if (index === -1) return { success: false, message: "Record not found" };
  const deleted = personalInformationData.splice(index, 1)[0];
  return { success: true, data: deleted };
};

export const getFamilyInformationData = async (patientId) => {
    // Simulate a delay of 1 second (1000 milliseconds)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const data = familyInformationData.find((p) => p.patientId === patientId);
    return { data };
}

export const familyInformationData = [
  {
    patientId: "1",
    spouseOccupation: "Teacher",
    spouseOccupationFullTime: "full-time",
    motherAge: "55",
    ageWhenMotherDied: "",
    fatherAge: "58",
    ageWhenFatherDied: "",
    motherOccupation: "Doctor",
    fatherOccupation: "Engineer",
    motherReligion: "Christianity",
    fatherReligion: "Christianity",
    raisedBy: ["Parents"],
    motherDescription: ['Supportive','Caring','Loving'],
    fatherDescription: ['Strict','Disciplined','Encouraging'],
    parentalSeparationAge: "",
    parentalDivorceAge: "",
    motherDivorceCount: "0",
    fatherDivorceCount: "0",
    livingBrothers: "1",
    livingSisters: "1",
    brothersAges: "30",
    sistersAges: "28",
    childNumber: "1",
    familyChildren: "2",
    adopted: "No",
    brotherDisturbances: "Occasional conflicts over responsibilities",
    sisterDisturbances: "",
    maleRelativesDisturbed: "0",
    maleRelativesHospitalized: "0",
    femaleRelativesDisturbed: "1",
    femaleRelativesHospitalized: "0",
  },
  {
    patientId: "2",
    spouseOccupation: "",
    spouseOccupationFullTime: "",
    motherAge: "60",
    ageWhenMotherDied: "",
    fatherAge: "",
    ageWhenFatherDied: "10",
    motherOccupation: "Teacher",
    fatherOccupation: "Other",
    motherReligion: "Hinduism",
    fatherReligion: "Hinduism",
    raisedBy: ["Single Mother"],
    motherDescription: ['Warm','Overprotective'],
    fatherDescription: ["Distant"],
    parentalSeparationAge: "8",
    parentalDivorceAge: "9",
    motherDivorceCount: "1",
    fatherDivorceCount: "1",
    livingBrothers: "0",
    livingSisters: "2",
    brothersAges: "",
    sistersAges: "25, 22",
    childNumber: "3",
    familyChildren: "3",
    adopted: "No",
    brotherDisturbances: "",
    sisterDisturbances: "Competitive relationship with younger sister",
    maleRelativesDisturbed: "1",
    maleRelativesHospitalized: "0",
    femaleRelativesDisturbed: "0",
    femaleRelativesHospitalized: "0",
  },
  {
    patientId: "3",
    spouseOccupation: "Engineer",
    spouseOccupationFullTime: "part-time",
    motherAge: "",
    ageWhenMotherDied: "15",
    fatherAge: "62",
    ageWhenFatherDied: "",
    motherOccupation: "Other",
    fatherOccupation: "Doctor",
    motherReligion: "Buddhism",
    fatherReligion: "Buddhism",
    raisedBy: ['Single Father','Grandparents'],
    motherDescription: ["Caring"],
    fatherDescription: ['Supportive','Warm'],
    parentalSeparationAge: "",
    parentalDivorceAge: "",
    motherDivorceCount: "0",
    fatherDivorceCount: "0",
    livingBrothers: "2",
    livingSisters: "0",
    brothersAges: "35, 32",
    sistersAges: "",
    childNumber: "2",
    familyChildren: "3",
    adopted: "Yes",
    brotherDisturbances: "",
    sisterDisturbances: "",
    maleRelativesDisturbed: "0",
    maleRelativesHospitalized: "0",
    femaleRelativesDisturbed: "0",
    femaleRelativesHospitalized: "0",
  },
  {
    patientId: "4",
    spouseOccupation: "",
    spouseOccupationFullTime: "",
    motherAge: "50",
    ageWhenMotherDied: "",
    fatherAge: "52",
    ageWhenFatherDied: "",
    motherOccupation: "Engineer",
    fatherOccupation: "Teacher",
    motherReligion: "Islam",
    fatherReligion: "Islam",
    raisedBy: ["Parents"],
    motherDescription: ['Strict','Traditional'],
    fatherDescription: ['Loving','Encouraging'],
    parentalSeparationAge: "",
    parentalDivorceAge: "",
    motherDivorceCount: "0",
    fatherDivorceCount: "0",
    livingBrothers: "0",
    livingSisters: "0",
    brothersAges: "",
    sistersAges: "",
    childNumber: "1",
    familyChildren: "1",
    adopted: "No",
    brotherDisturbances: "",
    sisterDisturbances: "",
    maleRelativesDisturbed: "0",
    maleRelativesHospitalized: "0",
    femaleRelativesDisturbed: "0",
    femaleRelativesHospitalized: "0",
  },
  {
    patientId: "5",
    spouseOccupation: "Doctor",
    spouseOccupationFullTime: "full-time",
    motherAge: "",
    ageWhenMotherDied: "5",
    fatherAge: "",
    ageWhenFatherDied: "5",
    motherOccupation: "Other",
    fatherOccupation: "Other",
    motherReligion: "Other",
    fatherReligion: "Other",
    raisedBy: ['Grandparents','Aunt'],
    motherDescription: ["Distant"],
    fatherDescription: ["Distant"],
    parentalSeparationAge: "",
    parentalDivorceAge: "",
    motherDivorceCount: "0",
    fatherDivorceCount: "0",
    livingBrothers: "1",
    livingSisters: "1",
    brothersAges: "27",
    sistersAges: "29",
    childNumber: "2",
    familyChildren: "3",
    adopted: "Yes",
    brotherDisturbances: "Strained relationship due to distance",
    sisterDisturbances: "",
    maleRelativesDisturbed: "2",
    maleRelativesHospitalized: "1",
    femaleRelativesDisturbed: "1",
    femaleRelativesHospitalized: "0",
  },
];

export const addFamilyInformationData = async (newData) => {
    // Simulate a delay of 500 milliseconds
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate a new unique ID
    const newId = (familyInformationData.length + 1).toString();

    // Create new family information record
    const newRecord = {
        patientId: newId,
        spouseOccupation: newData.spouseOccupation || '',
        spouseOccupationFullTime: newData.spouseOccupationFullTime || '',
        motherAge: newData.motherAge || '',
        ageWhenMotherDied: newData.ageWhenMotherDied || '',
        fatherAge: newData.fatherAge || '',
        ageWhenFatherDied: newData.ageWhenFatherDied || '',
        motherOccupation: newData.motherOccupation || '',
        fatherOccupation: newData.fatherOccupation || '',
        motherReligion: newData.motherReligion || '',
        fatherReligion: newData.fatherReligion || '',
        raisedBy: Array.isArray(newData.raisedBy) ? newData.raisedBy.join(';;') : newData.raisedBy || '',
        motherDescription: Array.isArray(newData.motherDescription) ? newData.motherDescription.join(';;') : newData.motherDescription || '',
        fatherDescription: Array.isArray(newData.fatherDescription) ? newData.fatherDescription.join(';;') : newData.fatherDescription || '',
        parentalSeparationAge: newData.parentalSeparationAge || '',
        parentalDivorceAge: newData.parentalDivorceAge || '',
        motherDivorceCount: newData.motherDivorceCount || '',
        fatherDivorceCount: newData.fatherDivorceCount || '',
        livingBrothers: newData.livingBrothers || '',
        livingSisters: newData.livingSisters || '',
        brothersAges: newData.brothersAges || '',
        sistersAges: newData.sistersAges || '',
        childNumber: newData.childNumber || '',
        familyChildren: newData.familyChildren || '',
        adopted: newData.adopted || '',
        brotherDisturbances: newData.brotherDisturbances || '',
        sisterDisturbances: newData.sisterDisturbances || '',
        maleRelativesDisturbed: newData.maleRelativesDisturbed || '',
        maleRelativesHospitalized: newData.maleRelativesHospitalized || '',
        femaleRelativesDisturbed: newData.femaleRelativesDisturbed || '',
        femaleRelativesHospitalized: newData.femaleRelativesHospitalized || ''
    };

    // Validate required fields
    const requiredFields = [
        'motherAge', 'fatherAge', 'motherOccupation', 'fatherOccupation',
        'motherReligion', 'fatherReligion', 'raisedBy', 'motherDescription',
        'fatherDescription', 'motherDivorceCount', 'fatherDivorceCount',
        'livingBrothers', 'livingSisters', 'brothersAges', 'sistersAges',
        'childNumber', 'familyChildren', 'adopted', 'brotherDisturbances',
        'sisterDisturbances', 'maleRelativesDisturbed', 'maleRelativesHospitalized',
        'femaleRelativesDisturbed', 'femaleRelativesHospitalized'
    ];

    for (const field of requiredFields) {
        const value = newRecord[field];
        if (field === 'raisedBy' || field === 'motherDescription' || field === 'fatherDescription') {
            if (!value || value.split(';;').filter(item => item.trim()).length === 0) {
                return { success: false, message: `${field.replace(/([A-Z])/g, ' $1').trim()} is required` };
            }
        } else if (!value || value.toString().trim() === '') {
            return { success: false, message: `${field.replace(/([A-Z])/g, ' $1').trim()} is required` };
        }
    }

    // Validate numeric fields
    const numericFields = [
        'motherAge', 'ageWhenMotherDied', 'fatherAge', 'ageWhenFatherDied',
        'parentalSeparationAge', 'parentalDivorceAge', 'motherDivorceCount',
        'fatherDivorceCount', 'livingBrothers', 'livingSisters', 'childNumber',
        'familyChildren', 'maleRelativesDisturbed', 'maleRelativesHospitalized',
        'femaleRelativesDisturbed', 'femaleRelativesHospitalized'
    ];

    for (const field of numericFields) {
        const value = newRecord[field];
        if (value && (isNaN(value) || Number(value) < 0)) {
            return { success: false, message: `${field.replace(/([A-Z])/g, ' $1').trim()} must be a valid non-negative number` };
        }
    }

    // Validate spouseOccupationFullTime if spouseOccupation is provided
    if (newRecord.spouseOccupation && !newRecord.spouseOccupationFullTime) {
        return { success: false, message: 'Spouse Occupation Status is required when Spouse Occupation is provided' };
    }

    // Add to familyInformationData array
    familyInformationData.push(newRecord);

    return { success: true, data: newRecord };
};

export const updateFamilyInformationData = async (patientId, updatedData) => {
      await new Promise(resolve => setTimeout(resolve, 500));
  const index = familyInformationData.findIndex((p) => p.patientId === patientId);
  if (index === -1) return { success: false, message: "Record not found" };
  familyInformationData[index] = { ...familyInformationData[index], ...updatedData };
  //throw new Error("fdfsfkldfjsdfjsldjfsjkl")
  return { success: true, data: familyInformationData[index] };
};

export const deleteFamilyInformationData = async (patientId) => {
      await new Promise(resolve => setTimeout(resolve, 500));
  const index = familyInformationData.findIndex((p) => p.patientId === patientId);
  if (index === -1) return { success: false, message: "Record not found" };
  const deleted = familyInformationData.splice(index, 1)[0];
  return { success: true, data: deleted };
};



export const getTypesOfPerson =async()=>{ 

      await new Promise(resolve => setTimeout(resolve, 500));

 const data= [
  { patientId: "201", name: "Supportive" },
    { patientId: "202", name: "Strict" },
    { patientId: "203", name: "Caring" },
    { patientId: "204", name: "Distant" },
    { patientId: "205", name: "Encouraging" },
    { patientId: "206", name: "Critical" },
    { patientId: "207", name: "Loving" },
    { patientId: "208", name: "Overprotective" },
    { patientId: "209", name: "Traditional" },
    { patientId: "210", name: "Warm" },
    { patientId: "211", name: "Disciplined" },
    { patientId: "212", name: "Anxious" },
    { patientId: "213", name: "Other" },
];

return {data};

}


export const getRaisedBy =async()=>{ 

      await new Promise(resolve => setTimeout(resolve, 500));

 const data= [
    { patientId: "301", name: "Parents" },
    { patientId: "302", name: "Grandparents" },
    { patientId: "303", name: "Aunt" },
    { patientId: "304", name: "Uncle" },
    { patientId: "305", name: "Older Sibling" },
    { patientId: "306", name: "Foster Parents" },
    { patientId: "307", name: "Adoptive Parents" },
    { patientId: "308", name: "Guardian" },
    { patientId: "309", name: "Single Mother" },
    { patientId: "310", name: "Single Father" },
    { patientId: "311", name: "Other" },
];

return {data};

}


export const getMedicalInformationData = async (patientId) => {
    // Simulate a delay of 1 second (1000 milliseconds)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const data = medicalInformationData.find((p) => p.patientId === patientId);
    return { data };
}

export const medicalInformationData = [
  {
    patientId: "1",
    patientNo: "PT-0001",
    physicalAilments: "Chronic back pain, hypertension",
    mainComplaints: "Persistent lower back pain, occasional headaches",
    pastComplaints: "Sprained ankle (2020), seasonal allergies",
    worseConditions: "Symptoms worsen with prolonged sitting or stress",
    improvedConditions: "Symptoms improve with physical therapy and rest",
    individualTherapyHours: "50",
    individualTherapyYears: "2",
    individualTherapyEndYears: "1",
    groupTherapyHours: "20",
    psychiatricHospitalizationMonths: "0",
    currentTreatment: "Yes",
    antidepressantsCount: "2",
    psychotherapyType: "Cognitive Behavioral Therapy (CBT)",
    additionalInfo: "Family history of hypertension",
  },
  {
    patientId: "2",
    patientNo: "PT-0002",
    physicalAilments: "Type 2 diabetes",
    mainComplaints: "Fatigue, difficulty managing blood sugar levels",
    pastComplaints: "Migraines (2018-2020)",
    worseConditions: "Symptoms worsen with poor diet or lack of sleep",
    improvedConditions: "Symptoms improve with regular exercise and medication",
    individualTherapyHours: "30",
    individualTherapyYears: "1",
    individualTherapyEndYears: "0",
    groupTherapyHours: "10",
    psychiatricHospitalizationMonths: "0",
    currentTreatment: "No",
    antidepressantsCount: "0",
    psychotherapyType: "None",
    additionalInfo: "Recently started a new exercise regimen",
  },
  {
    patientId: "3",
    patientNo: "PT-0003",
    physicalAilments: "None",
    mainComplaints: "Anxiety and difficulty sleeping",
    pastComplaints: "Minor depression (2021)",
    worseConditions: "Symptoms worsen during high-pressure work situations",
    improvedConditions: "Symptoms improve with mindfulness and relaxation techniques",
    individualTherapyHours: "100",
    individualTherapyYears: "3",
    individualTherapyEndYears: "2",
    groupTherapyHours: "0",
    psychiatricHospitalizationMonths: "0",
    currentTreatment: "Yes",
    antidepressantsCount: "1",
    psychotherapyType: "Talk therapy, mindfulness-based",
    additionalInfo: "Interested in exploring meditation further",
  },
  {
    patientId: "4",
    patientNo: "PT-0004",
    physicalAilments: "Arthritis, high cholesterol",
    mainComplaints: "Joint pain, fatigue",
    pastComplaints: "Broken wrist (2015)",
    worseConditions: "Symptoms worsen in cold weather",
    improvedConditions: "Symptoms improve with warm compresses and medication",
    individualTherapyHours: "0",
    individualTherapyYears: "0",
    individualTherapyEndYears: "0",
    groupTherapyHours: "0",
    psychiatricHospitalizationMonths: "0",
    currentTreatment: "No",
    antidepressantsCount: "0",
    psychotherapyType: "None",
    additionalInfo: "Regular checkups with rheumatologist",
  },
  {
    patientId: "5",
    patientNo: "PT-0005",
    physicalAilments: "Asthma",
    mainComplaints: "Shortness of breath during physical activity",
    pastComplaints: "Childhood eczema",
    worseConditions: "Symptoms worsen with pollen exposure",
    improvedConditions: "Symptoms improve with inhaler use",
    individualTherapyHours: "10",
    individualTherapyYears: "1",
    individualTherapyEndYears: "0",
    groupTherapyHours: "5",
    psychiatricHospitalizationMonths: "0",
    currentTreatment: "Yes",
    antidepressantsCount: "0",
    psychotherapyType: "Supportive therapy",
    additionalInfo: "Allergy testing recommended",
  },
];

export const addMedicalInformationData = async (newData) => {
    // Simulate a delay of 500 milliseconds
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate a new unique ID
    const newId = (medicalInformationData.length + 1).toString();

    // Create new medical information record
    const newRecord = {
        patientId: newId,
        physicalAilments: newData.physicalAilments || '',
        mainComplaints: newData.mainComplaints || '',
        pastComplaints: newData.pastComplaints || '',
        worseConditions: newData.worseConditions || '',
        improvedConditions: newData.improvedConditions || '',
        individualTherapyHours: newData.individualTherapyHours || '',
        individualTherapyYears: newData.individualTherapyYears || '',
        individualTherapyEndYears: newData.individualTherapyEndYears || '',
        groupTherapyHours: newData.groupTherapyHours || '',
        psychiatricHospitalizationMonths: newData.psychiatricHospitalizationMonths || '',
        currentTreatment: newData.currentTreatment || '',
        antidepressantsCount: newData.antidepressantsCount || '',
        psychotherapyType: newData.psychotherapyType || '',
        additionalInfo: newData.additionalInfo || ''
    };

    // Validate required fields
    const requiredFields = [
        'physicalAilments',
        'mainComplaints',
        'currentTreatment'
    ];

    for (const field of requiredFields) {
        if (!newRecord[field] || newRecord[field].toString().trim() === '') {
            return { success: false, message: `${field.replace(/([A-Z])/g, ' $1').trim()} is required` };
        }
    }

    // Validate numeric fields
    const numericFields = [
        'individualTherapyHours',
        'individualTherapyYears',
        'individualTherapyEndYears',
        'groupTherapyHours',
        'psychiatricHospitalizationMonths',
        'antidepressantsCount'
    ];

    for (const field of numericFields) {
        const value = newRecord[field];
        if (value && (isNaN(value) || Number(value) < 0)) {
            return { success: false, message: `${field.replace(/([A-Z])/g, ' $1').trim()} must be a valid non-negative number` };
        }
    }

    // Validate currentTreatment
    if (newRecord.currentTreatment && !['Yes', 'No'].includes(newRecord.currentTreatment)) {
        return { success: false, message: 'Current Treatment must be either "Yes" or "No"' };
    }

    // Add to medicalInformationData array
    medicalInformationData.push(newRecord);

    return { success: true, data: newRecord };
};

export const updateMedicalInformationData = async (patientId, updatedData) => {
       await new Promise(resolve => setTimeout(resolve, 500));
  const index = medicalInformationData.findIndex((p) => p.patientId === patientId);
  if (index === -1) return { success: false, message: "Record not found" };
  medicalInformationData[index] = { ...medicalInformationData[index], ...updatedData };
  //throw new Error("dfsjfloooooooooooooooo")
  return { success: true, data: medicalInformationData[index] };
};

export const deleteMedicalInformationData = async (patientId) => {
      await new Promise(resolve => setTimeout(resolve, 500));
  const index = medicalInformationData.findIndex((p) => p.patientId === patientId);
  if (index === -1) return { success: false, message: "Record not found" };
  const deleted = medicalInformationData.splice(index, 1)[0];
  return { success: true, data: deleted };
};






export const getEducationData = async (patientId) => {
    // Simulate a delay of 1 second (1000 milliseconds)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const data = educationData.find((p) => p.patientId === patientId);
    return { data };
}


export const addEducationData = async (patientId, newData) => {
    // Simulate a delay of 500 milliseconds
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create new education record
    const newRecord = {
        patientId: patientId,
        educationYears: newData.educationYears || '',
        scholarship: {
            enabled: newData.scholarship?.enabled !== false,
            marks: newData.scholarship?.marks || '',
            schoolAdmitted: newData.scholarship?.schoolAdmitted || '',
            result: newData.scholarship?.result || '',
            remark: newData.scholarship?.remark || ''
        },
        ol: {
            enabled: newData.ol?.enabled !== false,
            subjects: newData.ol?.subjects || [],
            remark: newData.ol?.remark || ''
        },
        al: {
            enabled: newData.al?.enabled !== false,
            stream: newData.al?.stream || '',
            subjects: newData.al?.subjects || [],
            remark: newData.al?.remark || ''
        },
        university: {
            enabled: newData.university?.enabled !== false,
            subjects: newData.university?.subjects || [],
            remark: newData.university?.remark || ''
        }
    };

    // Validate educationYears
    if (!newRecord.educationYears || newRecord.educationYears.toString().trim() === '') {
        return { success: false, message: 'Years of formal education is required' };
    }
    if (isNaN(newRecord.educationYears) || Number(newRecord.educationYears) < 0) {
        return { success: false, message: 'Years of formal education must be a valid non-negative number' };
    }

    // Validate scholarship if enabled
    if (newRecord.scholarship.enabled) {
        if (!newRecord.scholarship.marks || newRecord.scholarship.marks.toString().trim() === '') {
            return { success: false, message: 'Scholarship marks are required' };
        }
        if (!newRecord.scholarship.schoolAdmitted || newRecord.scholarship.schoolAdmitted.trim() === '') {
            return { success: false, message: 'School admitted is required' };
        }
        if (!newRecord.scholarship.result || !['Pass', 'Fail'].includes(newRecord.scholarship.result)) {
            return { success: false, message: 'Scholarship result must be either "Pass" or "Fail"' };
        }
    }

    // Validate O/L subjects if enabled
    if (newRecord.ol.enabled && newRecord.ol.subjects.length > 0) {
        const subjectSet = new Set();
        for (let i = 0; i < newRecord.ol.subjects.length; i++) {
            const subject = newRecord.ol.subjects[i];
            if (!subject.name || subject.name.trim() === '') {
                return { success: false, message: `O/L subject ${i + 1} name is required` };
            }
            if (!subject.marks || subject.marks.trim() === '') {
                return { success: false, message: `O/L subject ${i + 1} grade is required` };
            }
            if (!subject.year || isNaN(subject.year) || subject.year < 1900 || subject.year > 2025) {
                return { success: false, message: `O/L subject ${i + 1} year must be a valid year between 1900 and 2025` };
            }
            const key = `${subject.name.toLowerCase()}|${subject.year}`;
            if (subjectSet.has(key)) {
                return { success: false, message: `Duplicate O/L subject "${subject.name}" for year ${subject.year}` };
            }
            subjectSet.add(key);
        }
    }

    // Validate A/L stream and subjects if enabled
    if (newRecord.al.enabled) {
        if (!newRecord.al.stream || newRecord.al.stream.trim() === '') {
            return { success: false, message: 'A/L stream is required' };
        }
        if (newRecord.al.subjects.length > 0) {
            const subjectSet = new Set();
            for (let i = 0; i < newRecord.al.subjects.length; i++) {
                const subject = newRecord.al.subjects[i];
                if (!subject.name || subject.name.trim() === '') {
                    return { success: false, message: `A/L subject ${i + 1} name is required` };
                }
                if (!subject.marks || subject.marks.trim() === '') {
                    return { success: false, message: `A/L subject ${i + 1} grade is required` };
                }
                if (!subject.year || isNaN(subject.year) || subject.year < 1900 || subject.year > 2025) {
                    return { success: false, message: `A/L subject ${i + 1} year must be a valid year between 1900 and 2025` };
                }
                const key = `${subject.name.toLowerCase()}|${subject.year}`;
                if (subjectSet.has(key)) {
                    return { success: false, message: `Duplicate A/L subject "${subject.name}" for year ${subject.year}` };
                }
                subjectSet.add(key);
            }
        }
    }

    // Validate university qualifications if enabled
    if (newRecord.university.enabled && newRecord.university.subjects.length > 0) {
        for (let i = 0; i < newRecord.university.subjects.length; i++) {
            const qualification = newRecord.university.subjects[i];
            if (!qualification.name || qualification.name.trim() === '') {
                return { success: false, message: `University qualification ${i + 1} degree is required` };
            }
            if (!qualification.institution || qualification.institution.trim() === '') {
                return { success: false, message: `University qualification ${i + 1} institution is required` };
            }
            if (!qualification.marks || qualification.marks.trim() === '') {
                return { success: false, message: `University qualification ${i + 1} marks/grade is required` };
            }
        }
    }

    // Add to educationData array
    console.log('newRecord',newRecord)
    try {
        educationData.push(newRecord);
        return { success: true, data: newRecord, educationData };
    } catch (error) {
        return { success: false, error: `Error saving data: ${error.message}` };
    }
};
export const updateEducationData = async (patientId, updatedData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
  const index = educationData.findIndex((p) => p.patientId === patientId);
  if (index === -1) return { success: false, message: "Record not found" };
  educationData[index] = { ...educationData[index], ...updatedData };
  return { success: true, data: educationData[index] };
};



export const updateEducationYearsData = async (patientId, updatedData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
  const index = educationData.findIndex((p) => p.patientId === patientId);
  if (index === -1) return { success: false, message: "Record not found" };
  educationData[index] = { ...educationData[index], ...updatedData };
     // throw new Error("error updateEducationYearsData")
  return { success: true, data: educationData[index] };
};

export const updateScholarshipData = async (patientId, updatedData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
  const index = educationData.findIndex((p) => p.patientId === patientId);
  if (index === -1) return { success: false, message: "Record not found" };
  educationData[index] = { ...educationData[index], ...updatedData };
     // throw new Error("error updateScholarshipData")
  return { success: true, data: educationData[index] };
};


export const updateOLData = async (patientId, updatedData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
  const index = educationData.findIndex((p) => p.patientId === patientId);
  if (index === -1) return { success: false, message: "Record not found" };
  educationData[index] = { ...educationData[index], ...updatedData };
   // throw new Error("error updateOLData")
  return { success: true, data: educationData[index] };
};

export const updateALData = async (patientId, updatedData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
  const index = educationData.findIndex((p) => p.patientId === patientId);
  if (index === -1) return { success: false, message: "Record not found" };
  educationData[index] = { ...educationData[index], ...updatedData };
   // throw new Error("error updateALData")
  return { success: true, data: educationData[index] };
};

export const updateUniversityData = async (patientId, updatedData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
  const index = educationData.findIndex((p) => p.patientId === patientId);
  if (index === -1) return { success: false, message: "Record not found" };
  educationData[index] = { ...educationData[index], ...updatedData };
   //   throw new Error("error updateUniversityData")
  return { success: true, data: educationData[index] };
};

export const deleteEducationData = async (patientId) => {
       await new Promise(resolve => setTimeout(resolve, 500));
  const index = educationData.findIndex((p) => p.patientId === patientId);
  if (index === -1) return { success: false, message: "Record not found" };
  const deleted = educationData.splice(index, 1)[0];
  return { success: true, data: deleted };
};





export const getEducationYearsData = async (patientId) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const record = educationData.find((p) => p.patientId === patientId);
  return { data: record ? record.educationYears : null };
};

export const getScholarshipData = async (patientId) => {
    await new Promise(resolve => setTimeout(resolve, 100));
  const record = educationData.find((p) => p.patientId === patientId);
  return { data: record ?  record.scholarship : null };
};

export const getOLData = async (patientId) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const record = educationData.find((p) => p.patientId === patientId);
  return { data: record ? record.ol : null };
};

export const getALData = async (patientId) => {
    await new Promise(resolve => setTimeout(resolve, 100));
  const record = educationData.find((p) => p.patientId === patientId);
  console.log("edudata record getALData",record)
  return { data: record ? record.al : null };
};

export const getUniversityData = async (patientId) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const record = educationData.find((p) => p.patientId === patientId);
     console.log("edudata record",record)
  return { data: record ? record.university:null};
};



export const educationData = [
  {
    patientId: "1",
    educationYears: "12",
    scholarship: {
      enabled: true,
      marks: "185",
      schoolAdmitted: "Royal College, Colombo",
      result: "Pass",
      remark: "Received scholarship for academic excellence",
    },
    ol: {
      enabled: true,
      subjects: [
        { name: "First Language (Sinhala)", marks: "A", year: 2015 },
        { name: "Mathematics", marks: "A", year: 2015 },
        { name: "English", marks: "B", year: 2015 },
        { name: "Science", marks: "A", year: 2015 },
      ],
      remark: "Completed O/Ls with distinction",
    },
    al: {
      enabled: true,
      stream: "Science",
      subjects: [
        { name: "Combined Mathematics", marks: "A", year: 2017 },
        { name: "Physics", marks: "B", year: 2017 },
        { name: "Chemistry", marks: "A", year: 2017 },
      ],
      remark: "Strong performance in Science stream",
    },



  university: {
      enabled: true,
      subjects: [
        { name: "BSc Computer Science",institution: "University of Colombo", marks: "First Class" },
      ],
      remark: "",
    },

    // university: [
    //   {
    //     degree: "BSc Computer Science",
    //     institution: "University of Colombo",
    //     marks: "First Class",
    //   },
    // ],
    // universityEnabled: true,
    // universityRemark: "Graduated with honors",
  },
  {
    patientId: "2",
    patientNo: "PT-0002",
    educationYears: "10",
    scholarship: {
      enabled: false,
      marks: "",
      schoolAdmitted: "",
      result: "",
      remark: "",
    },
    ol: {
      enabled: true,
      subjects: [
        { name: "First Language (Tamil)", marks: "B", year: 2016 },
        { name: "Mathematics", marks: "C", year: 2016 },
        { name: "English", marks: "C", year: 2016 },
      ],
      remark: "Completed O/Ls",
    },
    al: {
      enabled: false,
      stream: "",
      subjects: [],
      remark: "",
    },
     university: {
      enabled: true,
      subjects: [
        { name: "BSc Computer Science",institution: "University of Colombo", marks: "First Class" },
      ],
      remark: "Completed O/Ls with distinction",
    },
    
  },
  {
    patientId: "3",
    patientNo: "PT-0003",
    educationYears: "13",
    scholarship: {
      enabled: true,
      marks: "170",
      schoolAdmitted: "Ananda College, Colombo",
      result: "Pass",
      remark: "Admitted to prestigious school",
    },
    ol: {
      enabled: true,
      subjects: [
        { name: "First Language (Sinhala)", marks: "A", year: 2014 },
        { name: "Mathematics", marks: "B", year: 2014 },
        { name: "Science", marks: "B", year: 2014 },
        { name: "History", marks: "A", year: 2014 },
      ],
      remark: "Good performance in O/Ls",
    },
    al: {
      enabled: true,
      stream: "Commerce",
      subjects: [
        { name: "Economics", marks: "A", year: 2016 },
        { name: "Business Studies", marks: "B", year: 2016 },
        { name: "Accounting", marks: "A", year: 2016 },
      ],
      remark: "Excelled in Commerce subjects",
    },

     university: {
      enabled: true,
      subjects: [
        { name: "BCom",institution: "University of Sri Jayewardenepura", marks: "First Class" },
      ],
      remark: "Active in university societies",
    },


  },
  {
    patientId: "4",
    patientNo: "PT-0004",
    educationYears: "15",
    scholarship: {
      enabled: true,
      marks: "190",
      schoolAdmitted: "Visakha Vidyalaya, Colombo",
      result: "Pass",
      remark: "Top performer in scholarship exam",
    },
    ol: {
      enabled: true,
      subjects: [
        { name: "First Language (Sinhala)", marks: "A", year: 2013 },
        { name: "Mathematics", marks: "A", year: 2013 },
        { name: "English", marks: "A", year: 2013 },
        { name: "Science", marks: "B", year: 2013 },
        { name: "Art", marks: "A", year: 2013 },
      ],
      remark: "Outstanding O/L results",
    },
    al: {
      enabled: true,
      stream: "Arts",
      subjects: [
        { name: "Geography", marks: "A", year: 2015 },
        { name: "Political Science", marks: "A", year: 2015 },
        { name: "History", marks: "B", year: 2015 },
      ],
      remark: "Strong interest in social sciences",
    },

       university: {
      enabled: true,
      subjects: [
        { name: "BA English",institution: "University of Peradeniya", marks: "First Class" },
         { name: "MA English Literature",institution: "University of Peradeniya", marks: "First Class" },
      ],
      remark: "Pursued postgraduate studies",
    },

  },
  {
    patientId: "5",
    patientNo: "PT-0005",
    educationYears: "11",
    scholarship: {
      enabled: false,
      marks: "",
      schoolAdmitted: "",
      result: "",
      remark: "",
    },
    ol: {
      enabled: true,
      subjects: [
        { name: "First Language (Tamil)", marks: "B", year: 2017 },
        { name: "Mathematics", marks: "C", year: 2017 },
        { name: "English", marks: "B", year: 2017 },
        { name: "Commerce", marks: "B", year: 2017 },
      ],
      remark: "Satisfactory O/L performance",
    },
    al: {
      enabled: true,
      stream: "Technology",
      subjects: [
        { name: "Engineering Technology", marks: "B", year: 2019 },
        { name: "Science for Technology", marks: "C", year: 2019 },
        { name: "Information Technology", marks: "B", year: 2019 },
      ],
      remark: "Interested in technical fields",
    },

         university: {
      enabled: false,
      subjects: [],
      remark: "",
    },
  },
];



// Mock occupations data
export const occupations = [
  { patientId: 1, name: "Engineer" },
  { patientId: 2, name: "Teacher" },
  { patientId: 3, name: "Doctor" },
  { patientId: 4, name: "Other" },
];

// Mock options for DescriptionInput
export const getGoodPointsOptionsData =async()=>{
const data=  [
  { patientId: "1", name: "Problem-solver – I enjoy analyzing issues and finding effective solutions." },
  { patientId: "2", name: "Quick learner – I can pick up new tools and frameworks rapidly." },
  { patientId: "3", name: "Strong work ethic – I am committed to meeting deadlines and taking responsibility." },
  { patientId: "4", name: "Adaptable – I can adjust to new environments, teams, or technologies easily." },
  { patientId: "5", name: "Team player – I communicate well and collaborate effectively with others." },
  { patientId: "6", name: "Detail-oriented – I notice small issues before they grow into big problems." },
  { patientId: "7", name: "Other" },
]
return {data};
};

export const getBadPointsOptions = async()=>{
  const data=  [
  { patientId: "101", name: "Procrastination" },
  { patientId: "102", name: "Shyness" },
  { patientId: "103", name: "Impatience" },
  { patientId: "104", name: "Perfectionism" },
  { patientId: "105", name: "Other" },
]
return {data};
};





export const getOLSubjects =async()=>{ 

      await new Promise(resolve => setTimeout(resolve, 100));

 const data= [
 { value: 'first-language', name: 'First Language (Sinhala/Tamil)' },
  { value: 'mathematics', name: 'Mathematics' },
  { value: 'english', name: 'English' },
  { value: 'science', name: 'Science' },
  { value: 'religion', name: 'Religion' },
  { value: 'history', name: 'History' },
  { value: 'art', name: 'Art' },
  { value: 'literature', name: 'Literature' },
  { value: 'commerce', name: 'Commerce' },
];

return {data};

}


export const getALSubjects =async()=>{ 

      await new Promise(resolve => setTimeout(resolve, 100));

 const data= [
   { value: 'combined-mathematics', name: 'Combined Mathematics' },
  { value: 'physics', name: 'Physics' },
  { value: 'chemistry', name: 'Chemistry' },
  { value: 'biology', name: 'Biology' },
  { value: 'economics', name: 'Economics' },
  { value: 'business-studies', name: 'Business Studies' },
  { value: 'accounting', name: 'Accounting' },
  { value: 'geography', name: 'Geography' },
  { value: 'political-science', name: 'Political Science' },
];

return {data};

}

export const getALStreams =async()=>{ 

      await new Promise(resolve => setTimeout(resolve, 500));

 const data= [
 { value: 'science', name: 'Science' },
  { value: 'commerce', name: 'Commerce' },
  { value: 'arts', name: 'Arts' },
  { value: 'technology', name: 'Technology' },
];

return {data};

}



export const getDegrees =async()=>{ 

      await new Promise(resolve => setTimeout(resolve, 500));

 const data= [
  { value: 'bsc-computer-science', name: 'BSc Computer Science' },
  { value: 'bsc-engineering', name: 'BSc Engineering' },
  { value: 'ba-economics', name: 'BA Economics' },
  { value: 'bcom', name: 'BCom' },
  { value: 'llb', name: 'LLB' },
  { value: 'mbbs', name: 'MBBS' },
  { value: 'bba', name: 'BBA' },
  { value: 'bsc-physics', name: 'BSc Physics' },
  { value: 'ba-english', name: 'BA English' },
  { value: 'bsc-mathematics', name: 'BSc Mathematics' },
];

return {data};

}





const mockPatients = [
  {
    patientNo: "P001",
    firstName: "John",
    lastName: "Doe",
  },
  {
    patientNo: "P002",
    firstName: "Jane",
    lastName: "Smith",
  },
  {
    patientNo: "P003",
    firstName: "Alice",
    lastName: "Johnson",
  },
  {
    patientNo: "P004",
    firstName: "Bob",
    lastName: "Williams",
  },
  {
    patientNo: "P005",
    firstName: "Emma",
    lastName: "Brown",
  },
  {
    patientNo: "P006",
    firstName: "Michael",
    lastName: "Davis",
  },
];

let mockAppointments = [
  {
    appointmentId: "appt1",
    patientNo: "PT-0001",
    firstName: "John",
    lastName: "Perera",
    mobileNo:"0774458545",
    appointmentDate: "2025-06-01T10:00:00Z",
    status: "Scheduled",
  },
  {
    appointmentId: "appt2",
    patientNo: "PT-0002",
    firstName: "Ama",
    lastName: "Silva",
    mobileNo:"0744448545",
    appointmentDate: "2025-06-01T14:30:00Z",
    status: "Completed",
  },
  {
    appointmentId: "appt3",
    patientNo: "PT-0003",
    firstName: "Nimal",
    lastName: "Fernando",
    mobileNo:"0714489522",
    appointmentDate: "2025-06-05T09:15:00Z",
    status: "Scheduled",
  },
  {
    appointmentId: "appt4",
    patientNo: "PT-0004",
    firstName: "Sita",
    lastName: "Wijesinghe",
        mobileNo:"0714489522",
    appointmentDate: "2025-06-10T11:00:00Z",
    status: "Cancelled",
  },
  {
    appointmentId: "appt5",
    patientNo: "PT-0001",
    firstName: "John",
    lastName: "Perera",
        mobileNo:"0714489522",
    appointmentDate: "2025-06-15T16:00:00Z",
    status: "Scheduled",
  },
  {
    appointmentId: "appt6",
    patientNo: "PT-0005",
    firstName: "Tharushi",
    lastName: "Jayasinghe",
    appointmentDate: "2025-06-20T13:45:00Z",
    status: "Completed",
  },
  {
    appointmentId: "appt7",
    patientNo: "PT-0003",
    firstName: "Nimal",
    lastName: "Fernando",
        mobileNo:"0714489522",
    appointmentDate: "2025-06-25T10:30:00Z",
    status: "Scheduled",
  },
  {
    appointmentId: "appt8",
    patientNo: "PT-0002",
    firstName: "Ama",
    lastName: "Silva",
        mobileNo:"0714489522",
    appointmentDate: "2025-06-30T15:00:00Z",
    status: "Scheduled",
  },
];
// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getPatientAppointments = async (payload) => {
  const { startDate, endDate, status } = payload;

  await delay(500);

  try {
    let filteredAppointments = mockAppointments.filter((appt) => {
      const apptDate = appt.appointmentDate.split('T')[0];
      return apptDate >= startDate && apptDate <= endDate;
    });

    if (status) {
      filteredAppointments = filteredAppointments.filter(
        (appt) => appt.status.toLowerCase() === status.toLowerCase()
      );
    }

    return {
      data: {
        results: filteredAppointments,
        outputValues: {
          totalRows: filteredAppointments.length,
        },
      },
    };
  } catch (err) {
    throw new Error('Failed to fetch appointments');
  }
};

export const addPatientAppointment = async (payload) => {
  await delay(500);

  try {
    const patient = basicInformationData.find((p) => p.patientNo === payload.patientNo);
    if (!patient) {
      throw new Error('Invalid patient selected');
    }
    const newAppointment = {
      appointmentId: `appt${mockAppointments.length + 1}`,
      patientNo: payload.patientNo,
      firstName: patient.firstName,
      lastName: patient.lastName,
      appointmentDate: payload.appointmentDate,
      status: payload.status,
    };
    mockAppointments.push(newAppointment);
    return { data: { result: newAppointment } };
  } catch (err) {
    throw new Error(err.message || 'Failed to add appointment');
  }
};

export const getPatients = async () => {
  await delay(500);
  try {
    return {
      data: {
        results: basicInformationData,
        outputValues: { totalRows: basicInformationData.length },
      },
    };
  } catch (err) {
    throw new Error('Failed to fetch patients');
  }
};