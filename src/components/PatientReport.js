import React, { useEffect, useState } from 'react';
import { FaUserMd, FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

function PatientReport() {
  const navigate = useNavigate();
  const { id: patientId } = useParams();

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

  const defaultALSubjects = [
    { name: 'Combined Mathematics', followed: false, marks: '' },
    { name: 'Physics', followed: false, marks: '' },
    { name: 'Chemistry', followed: false, marks: '' }
  ];

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
      address: { street: '123 Main St', city: 'Colombo', state: 'Western', zip: '10001' },
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

  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const foundPatient = mockPatients.find((p) => p.id === patientId);
    if (foundPatient) {
      setPatient(foundPatient);
    } else {
      setPatient({});
    }
  }, [patientId]);

  if (!patient) {
    return <div className="p-6 text-center text-gray-600">Loading...</div>;
  }

  if (!patient.patientId) {
    return <div className="p-6 text-center text-red-600">Patient not found</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="flex items-center text-3xl font-bold text-gray-800">
          <FaUserMd className="mr-3" size={32} />
          Patient Biographical Information (Page View)
        </h2>
        <button
          onClick={() => navigate(`/patients/${patientId}`)}
          className="flex items-center bg-sky-600 text-white px-5 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200 shadow-md"
          aria-label="Back to patient profile"
        >
          <FaArrowLeft className="mr-2" />
          Back to Profile
        </button>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        {/* Basic Information */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Patient ID:</strong> {patient.patientId}</div>
            <div><strong>Form Date:</strong> {patient.formDate}</div>
            <div><strong>Last Name:</strong> {patient.lastName}</div>
            <div><strong>First Name:</strong> {patient.firstName}</div>
            <div><strong>Middle Name:</strong> {patient.middleName || 'N/A'}</div>
            <div><strong>Date of Birth:</strong> {patient.dob}</div>
            <div><strong>Age:</strong> {patient.age}</div>
            <div><strong>Gender:</strong> {patient.gender}</div>
          </div>
        </section>

        {/* Address Information */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Address Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Street:</strong> {patient.address.street}</div>
            <div><strong>City:</strong> {patient.address.city}</div>
            <div><strong>State:</strong> {patient.address.state}</div>
            <div><strong>Zip Code:</strong> {patient.address.zip}</div>
            <div className="md:col-span-2"><strong>Permanent Address:</strong> {patient.permanentAddress || 'N/A'}</div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Home Phone:</strong> {patient.homePhone}</div>
            <div><strong>Business Phone:</strong> {patient.businessPhone || 'N/A'}</div>
          </div>
        </section>

        {/* Referral Information */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Referral Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Referral Source:</strong> {patient.referralSource}</div>
            <div><strong>Referral Party Present:</strong> {patient.referralPartyPresent}</div>
          </div>
        </section>

        {/* Personal Details */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Marital Status:</strong> {patient.maritalStatus}</div>
            <div><strong>Years Married:</strong> {patient.yearsMarried || 'N/A'}</div>
            <div><strong>Male Children Ages:</strong> {patient.maleChildrenAges || 'N/A'}</div>
            <div><strong>Female Children Ages:</strong> {patient.femaleChildrenAges || 'N/A'}</div>
            <div><strong>Years of Education:</strong> {patient.educationYears}</div>
            <div><strong>Religiosity:</strong> {patient.religiosity} (1=Very Religious, 9=Atheist)</div>
          </div>
        </section>

        {/* Personal Insights */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Personal Insights</h3>
          <div className="space-y-4">
            <div><strong>Things Liked:</strong> {patient.thingsLiked || 'N/A'}</div>
            <div><strong>Assets:</strong> {patient.assets || 'N/A'}</div>
            <div><strong>Bad Points:</strong> {patient.badPoints || 'N/A'}</div>
            <div><strong>Social Difficulties:</strong> {patient.socialDifficulties || 'N/A'}</div>
            <div><strong>Love/Sex Difficulties:</strong> {patient.loveSexDifficulties || 'N/A'}</div>
            <div><strong>School/Work Difficulties:</strong> {patient.schoolWorkDifficulties || 'N/A'}</div>
            <div><strong>Life Goals:</strong> {patient.lifeGoals || 'N/A'}</div>
            <div><strong>Things to Change:</strong> {patient.thingsToChange || 'N/A'}</div>
          </div>
        </section>

        {/* Occupation Information */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Occupation Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Occupation:</strong> {patient.occupation}</div>
            <div><strong>Occupation Status:</strong> {patient.occupationFullTime ? 'Full-time' : 'Part-time'}</div>
          </div>
        </section>

        {/* Spouse Information */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Spouse Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Spouse Occupation:</strong> {patient.spouseOccupation || 'N/A'}</div>
            <div><strong>Spouse Occupation Status:</strong> {patient.spouseOccupationFullTime ? 'Full-time' : 'Part-time'}</div>
          </div>
        </section>

        {/* Parental Information */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Parental Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Mother's Age:</strong> {patient.motherAge || 'N/A'}</div>
            <div><strong>Age When Mother Died:</strong> {patient.ageWhenMotherDied || 'N/A'}</div>
            <div><strong>Father's Age:</strong> {patient.fatherAge || 'N/A'}</div>
            <div><strong>Age When Father Died:</strong> {patient.ageWhenFatherDied || 'N/A'}</div>
            <div><strong>Mother's Occupation:</strong> {patient.motherOccupation || 'N/A'}</div>
            <div><strong>Father's Occupation:</strong> {patient.fatherOccupation || 'N/A'}</div>
            <div><strong>Mother's Religion:</strong> {patient.motherReligion || 'N/A'}</div>
            <div><strong>Father's Religion:</strong> {patient.fatherReligion || 'N/A'}</div>
            <div><strong>Raised By:</strong> {patient.raisedBy || 'N/A'}</div>
            <div><strong>Mother Description:</strong> {patient.motherDescription || 'N/A'}</div>
            <div><strong>Father Description:</strong> {patient.fatherDescription || 'N/A'}</div>
            <div><strong>Parental Separation Age:</strong> {patient.parentalSeparationAge || 'N/A'}</div>
            <div><strong>Parental Divorce Age:</strong> {patient.parentalDivorceAge || 'N/A'}</div>
            <div><strong>Mother Divorce Count:</strong> {patient.motherDivorceCount || 'N/A'}</div>
            <div><strong>Father Divorce Count:</strong> {patient.fatherDivorceCount || 'N/A'}</div>
          </div>
        </section>

        {/* Sibling Information */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Sibling Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Living Brothers:</strong> {patient.livingBrothers || 'N/A'}</div>
            <div><strong>Living Sisters:</strong> {patient.livingSisters || 'N/A'}</div>
            <div><strong>Brothers' Ages:</strong> {patient.brothersAges || 'N/A'}</div>
            <div><strong>Sisters' Ages:</strong> {patient.sistersAges || 'N/A'}</div>
            <div><strong>Child Number:</strong> {patient.childNumber || 'N/A'}</div>
            <div><strong>Family Children:</strong> {patient.familyChildren || 'N/A'}</div>
            <div><strong>Adopted:</strong> {patient.adopted || 'N/A'}</div>
          </div>
        </section>

        {/* Mental Health Information */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Mental Health Information</h3>
          <div className="space-y-4">
            <div><strong>Main Complaints:</strong> {patient.mainComplaints || 'N/A'}</div>
            <div><strong>Past Complaints:</strong> {patient.pastComplaints || 'N/A'}</div>
            <div><strong>Worse Conditions:</strong> {patient.worseConditions || 'N/A'}</div>
            <div><strong>Improved Conditions:</strong> {patient.improvedConditions || 'N/A'}</div>
            <div><strong>Physical Ailments:</strong> {patient.physicalAilments || 'N/A'}</div>
            <div><strong>Previous Treatment:</strong> {patient.previousTreatment || 'N/A'}</div>
            <div><strong>Individual Therapy Hours:</strong> {patient.individualTherapyHours || 'N/A'}</div>
            <div><strong>Individual Therapy Years:</strong> {patient.individualTherapyYears || 'N/A'}</div>
            <div><strong>Group Therapy Hours:</strong> {patient.groupTherapyHours || 'N/A'}</div>
            <div><strong>Psychiatric Hospitalization Months:</strong> {patient.psychiatricHospitalizationMonths || 'N/A'}</div>
            <div><strong>Current Treatment:</strong> {patient.currentTreatment || 'N/A'}</div>
            <div><strong>Antidepressants Count:</strong> {patient.antidepressantsCount || 'N/A'}</div>
            <div><strong>Psychotherapy Type:</strong> {patient.psychotherapyType || 'N/A'}</div>
            <div><strong>Brother Disturbances:</strong> {patient.brotherDisturbances || 'N/A'}</div>
            <div><strong>Sister Disturbances:</strong> {patient.sisterDisturbances || 'N/A'}</div>
            <div><strong>Male Relatives Disturbed:</strong> {patient.maleRelativesDisturbed || 'N/A'}</div>
            <div><strong>Male Relatives Hospitalized:</strong> {patient.maleRelativesHospitalized || 'N/A'}</div>
            <div><strong>Female Relatives Disturbed:</strong> {patient.femaleRelativesDisturbed || 'N/A'}</div>
            <div><strong>Female Relatives Hospitalized:</strong> {patient.femaleRelativesHospitalized || 'N/A'}</div>
            <div><strong>Additional Info:</strong> {patient.additionalInfo || 'N/A'}</div>
          </div>
        </section>

        {/* Education Information */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Education Information</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-medium text-gray-700 mb-2">G.C.E Ordinary Level (O/L)</h4>
              {patient.education.ol.enabled !== false ? (
                <ul className="list-disc pl-5">
                  {patient.education.ol.subjects
                    .filter(subject => subject.followed)
                    .map((subject, index) => (
                      <li key={index}>{subject.name}: {subject.marks || 'N/A'}</li>
                    ))}
                </ul>
              ) : (
                <p>Not applicable</p>
              )}
            </div>
            <div>
              <h4 className="text-xl font-medium text-gray-700 mb-2">G.C.E Advanced Level (A/L)</h4>
              {patient.education.al.enabled !== false ? (
                <div>
                  <p><strong>Stream:</strong> {patient.education.al.stream || 'N/A'}</p>
                  <ul className="list-disc pl-5">
                    {patient.education.al.subjects
                      .filter(subject => subject.followed)
                      .map((subject, index) => (
                        <li key={index}>{subject.name}: {subject.marks || 'N/A'}</li>
                      ))}
                  </ul>
                  <p><strong>General English Marks:</strong> {patient.education.al.generalEnglishMarks || 'N/A'}</p>
                  <p><strong>Common General Test Marks:</strong> {patient.education.al.commonGeneralTestMarks || 'N/A'}</p>
                </div>
              ) : (
                <p>Not applicable</p>
              )}
            </div>
            <div>
              <h4 className="text-xl font-medium text-gray-700 mb-2">University Qualifications</h4>
              {patient.education.universityEnabled !== false ? (
                <ul className="list-disc pl-5">
                  {patient.education.university.map((qual, index) => (
                    <li key={index}>
                      {qual.degree} from {qual.institution} ({qual.marks || 'N/A'})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Not applicable</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PatientReport;