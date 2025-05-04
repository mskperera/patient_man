import React from 'react';
import { useParams } from 'react-router-dom';
import PatientInfo from './PatientInfo';
import Notes from './Notes';
import PatientInfoEdit from './PatientInfoEdit';
import MentalStatusExam from './MentalStatusExam';

function PatientProfile() {
  const { id } = useParams();
  // Mock patient fetch (replace with real API)
  // const patient = fetchPatient(id);

  return (
    <div className="grid gap-6">
      <PatientInfoEdit mode="view" />

    </div>
  );
}

export default PatientProfile;

// import React from 'react';
// import { useParams } from 'react-router-dom';
// import PatientInfo from './PatientInfo';
// import Notes from './Notes';

// function PatientProfile() {
//   const { id } = useParams();
//   // Mock patient fetch (replace with real API)
//   // const patient = fetchPatient(id);

//   return (
//     <div className="grid gap-6">
//       <PatientInfo />
//       <Notes />
//     </div>
//   );
// }

// export default PatientProfile;