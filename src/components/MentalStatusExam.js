import React, { useState } from 'react';
import { FaBrain, FaEdit } from 'react-icons/fa';

const MentalStatusExam = () => {
  const [patient, setPatient] = useState({
    mentalStatusExam: {
      generalObservations: {
        appearance: { option: 'Neat' },
        speech: { option: 'Normal' },
        eyeContact: { option: 'Normal' },
        motorActivity: { option: 'Normal' },
        affect: { option: 'Full' },
        comments: 'Well-groomed, appropriately dressed',
      },
      mood: {
        mood: { option: 'Euthymic' },
        comments: '',
      },
      cognition: {
        orientationImpairment: { option: 'None' },
        memoryImpairment: { option: 'None' },
        attention: { option: 'Normal' },
        comments: '',
      },
      perception: {
        hallucinations: { option: 'None' },
        otherPerception: { option: 'None' },
        comments: '',
      },
      thoughts: {
        suicidality: { option: 'None' },
        homicidality: { option: 'None' },
        delusions: { option: 'None' },
        comments: '',
      },
      behavior: {
        behavior: { option: 'Cooperative' },
        comments: '',
      },
      insight: {
        insight: { option: 'Good' },
        comments: '',
      },
      judgment: {
        judgment: { option: 'Good' },
        comments: '',
      },
    },
  });

  const [editingSection, setEditingSection] = useState(null);

  const mseOptions = {
    appearance: ['Neat', 'Disheveled', 'Inappropriate', 'Bizarre', 'Other'],
    speech: ['Normal', 'Tangential', 'Pressured', 'Impoverished', 'Other'],
    eyeContact: ['Normal', 'Intense', 'Avoidant', 'Other'],
    motorActivity: ['Normal', 'Restless', 'Tics', 'Slowed', 'Other'],
    affect: ['Full', 'Constricted', 'Flat', 'Labile', 'Other'],
    mood: ['Euthymic', 'Anxious', 'Angry', 'Depressed', 'Euphoric', 'Irritable', 'Other'],
    orientationImpairment: ['None', 'Place', 'Object', 'Person', 'Time'],
    memoryImpairment: ['None', 'Short-Term', 'Long-Term', 'Other'],
    attention: ['Normal', 'Distracted', 'Other'],
    hallucinations: ['None', 'Auditory', 'Visual', 'Other'],
    otherPerception: ['None', 'Derealization', 'Depersonalization', 'Other'],
    suicidality: ['None', 'Ideation', 'Plan', 'Intent', 'Self-Harm'],
    homicidality: ['None', 'Aggressive', 'Intent', 'Plan', 'Other'],
    delusions: ['None', 'Grandiose', 'Paranoid', 'Religious', 'Other'],
    behavior: ['Cooperative', 'Guarded', 'Hyperactive', 'Agitated', 'Paranoid', 'Stereotyped', 'Aggressive', 'Bizarre', 'Withdrawn', 'Other'],
    insight: ['Good', 'Fair', 'Poor'],
    judgment: ['Good', 'Fair', 'Poor'],
  };

  const handleRadioChange = (e, section, subSection) => {
    const { value } = e.target;
    setPatient(prev => ({
      ...prev,
      mentalStatusExam: {
        ...prev.mentalStatusExam,
        [section]: {
          ...prev.mentalStatusExam[section],
          [subSection]: {
            option: value,
          },
        },
      },
    }));
  };

  const handleCommentChange = (e, section) => {
    const { value } = e.target;
    setPatient(prev => ({
      ...prev,
      mentalStatusExam: {
        ...prev.mentalStatusExam,
        [section]: {
          ...prev.mentalStatusExam[section],
          comments: value,
        },
      },
    }));
  };

  const handleSubmit = section => {
    console.log(`Saving ${section} section:`, patient.mentalStatusExam[section]);
    setEditingSection(null);
  };

  const toggleSectionEdit = section => {
    if (editingSection === section) {
      handleSubmit(section);
    } else {
      setEditingSection(section);
    }
  };

  const renderSection = (title, sectionKey, subSections) => {
    return (
      <section className="mb-8 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4 px-6 py-2 bg-slate-200">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center uppercase">
            {title}
          </h3>
          <button
            onClick={() => toggleSectionEdit(sectionKey)}
            className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
            aria-label={editingSection === sectionKey ? `Save ${title}` : `Edit ${title}`}
          >
            <FaEdit className="mr-2" />
            {editingSection === sectionKey ? 'Save' : 'Edit'}
          </button>
        </div>
        {subSections.map(({ key, title }) => (
          <div key={key} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0 px-6">
            {editingSection === sectionKey ? (
              <div className="">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="pr-4">
                    <h4 className="text-lg font-medium text-gray-700 ">{title}</h4>
                  </div>
                  <div className='col-span-2'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                      {mseOptions[key].map(option => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name={`${sectionKey}.${key}.option`}
                            value={option}
                            checked={patient.mentalStatusExam[sectionKey][key].option === option}
                            onChange={e => handleRadioChange(e, sectionKey, key)}
                            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                            aria-label={option}
                          />
                          <span className="ml-2 text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="pr-4">
                    <h4 className="text-lg font-medium text-gray-700">{title}</h4>
                  </div>
                  <div className='col-span-2'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                      {mseOptions[key].map(option => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name={`${sectionKey}.${key}.option`}
                            value={option}
                            checked={patient.mentalStatusExam[sectionKey][key].option === option}
                            readOnly={patient.mentalStatusExam[sectionKey][key].option === option}
                            disabled={patient.mentalStatusExam[sectionKey][key].option !== option}
                            className={`h-4 w-4 text-sky-600 border-gray-300 ${
                              patient.mentalStatusExam[sectionKey][key].option === option ? 'checked:text-sky-600' : ''
                            }`}
                            aria-label={option}
                          />
                          <span
                            className={`ml-2 text-sm ${
                              patient.mentalStatusExam[sectionKey][key].option === option ? 'text-sky-600 font-medium' : 'text-gray-700'
                            }`}
                          >
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="px-6 pb-4">
          {editingSection === sectionKey && (
            <h4 className="text-lg font-medium text-gray-700 mb-2">Comments:</h4>
          )}
          {editingSection === sectionKey ? (
            <textarea
              value={patient.mentalStatusExam[sectionKey].comments}
              onChange={e => handleCommentChange(e, sectionKey)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
              rows="3"
              placeholder="Enter comments"
              aria-label={`${title} comments`}
            />
          ) : (
            <p>
              <strong>Comments:</strong> {patient.mentalStatusExam[sectionKey].comments || 'N/A'}
            </p>
          )}
        </div>
      </section>
    );
  };


  const renderSectionMood = (title, sectionKey, subSections) => {
    return (
      <section className="mb-8 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4 px-6 py-2 bg-slate-200">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center uppercase">
            {title}
          </h3>
          <button
            onClick={() => toggleSectionEdit(sectionKey)}
            className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
            aria-label={editingSection === sectionKey ? `Save ${title}` : `Edit ${title}`}
          >
            <FaEdit className="mr-2" />
            {editingSection === sectionKey ? 'Save' : 'Edit'}
          </button>
        </div>
        {subSections.map(({ key, title }) => (
          <div key={key} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0 px-6">
            <h4 className="text-lg font-medium text-gray-700 mb-2">{title}</h4>
            {editingSection === sectionKey ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                  {mseOptions[key].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name={`${sectionKey}.${key}.option`}
                        value={option}
                        checked={patient.mentalStatusExam[sectionKey][key].option === option}
                        onChange={e => handleRadioChange(e, sectionKey, key)}
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                        aria-label={option}
                      />
                      <span className="ml-2 text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                  {mseOptions[key].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name={`${sectionKey}.${key}.option`}
                        value={option}
                        checked={patient.mentalStatusExam[sectionKey][key].option === option}
                        readOnly={patient.mentalStatusExam[sectionKey][key].option === option}
                        disabled={patient.mentalStatusExam[sectionKey][key].option !== option}
                        className={`h-4 w-4 text-sky-600 border-gray-300 ${
                          patient.mentalStatusExam[sectionKey][key].option === option ? 'checked:text-sky-600' : ''
                        }`}
                        aria-label={option}
                      />
                      <span
                        className={`ml-2 text-sm ${
                          patient.mentalStatusExam[sectionKey][key].option === option ? 'text-sky-600 font-medium' : 'text-gray-700'
                        }`}
                      >
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="px-6 pb-4">
          {editingSection === sectionKey && (
            <h4 className="text-lg font-medium text-gray-700 mb-2">Comments:</h4>
          )}
          {editingSection === sectionKey ? (
            <textarea
              value={patient.mentalStatusExam[sectionKey].comments}
              onChange={e => handleCommentChange(e, sectionKey)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
              rows="3"
              placeholder="Enter comments"
              aria-label={`${title} comments`}
            />
          ) : (
            <p>
              <strong>Comments:</strong> {patient.mentalStatusExam[sectionKey].comments || 'N/A'}
            </p>
          )}
        </div>
      </section>
    );
}

  return (
    <div className="px-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-6">
        <h3 className="flex items-center text-2xl font-bold text-gray-800">
          {/* <FaBrain className="mr-3" size={32} /> */}
          Mental Status Exam
        </h3>
        <div>
          <strong>Form Date:</strong> {patient.formDate || "N/A"}
        </div>
        <div>
          <strong>Last Modified:</strong> {patient.formDate || "N/A"}
        </div>
      </div>

      {renderSection('Observations', 'generalObservations', [
        { key: 'appearance', title: 'Appearance' },
        { key: 'speech', title: 'Speech' },
        { key: 'eyeContact', title: 'Eye Contact' },
        { key: 'motorActivity', title: 'Motor Activity' },
        { key: 'affect', title: 'Affect' },
      ])}
      {renderSectionMood('Mood', 'mood', [{ key: 'mood', title: '' }])}
      {renderSection('Cognition', 'cognition', [
        { key: 'orientationImpairment', title: 'Orientation Impairment' },
        { key: 'memoryImpairment', title: 'Memory Impairment' },
        { key: 'attention', title: 'Attention' },
      ])}
      {renderSection('Perception', 'perception', [
        { key: 'hallucinations', title: 'Hallucinations' },
        { key: 'otherPerception', title: 'Other' },
      ])}
      {renderSection('Thoughts', 'thoughts', [
        { key: 'suicidality', title: 'Suicidality' },
        { key: 'homicidality', title: 'Homicidality' },
        { key: 'delusions', title: 'Delusions' },
      ])}
      {renderSectionMood('Behavior', 'behavior', [{ key: 'behavior', title: '' }])}
      {renderSection('Insight', 'insight', [{ key: 'insight', title: 'Insight' }])}
      {renderSection('Judgment', 'judgment', [{ key: 'judgment', title: 'Judgment' }])}
    </div>
  );
};

export default MentalStatusExam;
// import React, { useState } from 'react';
// import { FaBrain, FaEdit } from 'react-icons/fa';

// const MentalStatusExam = () => {
//   const [patient, setPatient] = useState({
//     mentalStatusExam: {
//       appearance: { option: 'Neat', comments: 'Well-groomed, appropriately dressed' },
//       speech: { option: 'Normal', comments: '' },
//       eyeContact: { option: 'Normal', comments: '' },
//       motorActivity: { option: 'Normal', comments: '' },
//       affect: { option: 'Full', comments: '' },
//       mood: { option: 'Euthymic', comments: '' },
//       orientationImpairment: { option: 'None', comments: '' },
//       memoryImpairment: { option: 'None', comments: '' },
//       attention: { option: 'Normal', comments: '' },
//       hallucinations: { option: 'None', comments: '' },
//       otherPerception: { option: 'None', comments: '' },
//       suicidality: { option: 'None', comments: '' },
//       homicidality: { option: 'None', comments: '' },
//       delusions: { option: 'None', comments: '' },
//       behavior: { option: 'Cooperative', comments: '' },
//       insight: { option: 'Good', comments: '' },
//       judgment: { option: 'Good', comments: '' },
//     },
//   });

//   const [editingSection, setEditingSection] = useState(null);

//   const mseOptions = {
//     appearance: ['Neat', 'Disheveled', 'Inappropriate', 'Bizarre', 'Other'],
//     speech: ['Normal', 'Tangential', 'Pressured', 'Impoverished', 'Other'],
//     eyeContact: ['Normal', 'Intense', 'Avoidant', 'Other'],
//     motorActivity: ['Normal', 'Restless', 'Tics', 'Slowed', 'Other'],
//     affect: ['Full', 'Constricted', 'Flat', 'Labile', 'Other'],
//     mood: ['Euthymic', 'Anxious', 'Angry', 'Depressed', 'Euphoric', 'Irritable', 'Other'],
//     orientationImpairment: ['None', 'Place', 'Object', 'Person', 'Time'],
//     memoryImpairment: ['None', 'Short-Term', 'Long-Term', 'Other'],
//     attention: ['Normal', 'Distracted', 'Other'],
//     hallucinations: ['None', 'Auditory', 'Visual', 'Other'],
//     otherPerception: ['None', 'Derealization', 'Depersonalization', 'Other'],
//     suicidality: ['None', 'Ideation', 'Plan', 'Intent', 'Self-Harm'],
//     homicidality: ['None', 'Aggressive', 'Intent', 'Plan', 'Other'],
//     delusions: ['None', 'Grandiose', 'Paranoid', 'Religious', 'Other'],
//     behavior: ['Cooperative', 'Guarded', 'Hyperactive', 'Agitated', 'Paranoid', 'Stereotyped', 'Aggressive', 'Bizarre', 'Withdrawn', 'Other'],
//     insight: ['Good', 'Fair', 'Poor'],
//     judgment: ['Good', 'Fair', 'Poor'],
//   };

//   const handleRadioChange = (e, section) => {
//     const { value } = e.target;
//     setPatient(prev => ({
//       ...prev,
//       mentalStatusExam: {
//         ...prev.mentalStatusExam,
//         [section]: {
//           ...prev.mentalStatusExam[section],
//           option: value,
//         },
//       },
//     }));
//   };

//   const handleCommentChange = (e, section) => {
//     const { value } = e.target;
//     setPatient(prev => ({
//       ...prev,
//       mentalStatusExam: {
//         ...prev.mentalStatusExam,
//         [section]: {
//           ...prev.mentalStatusExam[section],
//           comments: value,
//         },
//       },
//     }));
//   };

//   const handleSubmit = section => {
//     console.log(`Saving ${section} section:`, patient.mentalStatusExam[section]);
//     setEditingSection(null);
//   };

//   const toggleSectionEdit = section => {
//     if (editingSection === section) {
//       handleSubmit(section);
//     } else {
//       setEditingSection(section);
//     }
//   };

//   const renderSection = (title, sectionKey, subSections) => {
//     return (
//       <section className="mb-8 rounded-lg border border-gray-200">
       
//         <div className="flex justify-between items-center mb-4 px-6 py-2 bg-slate-200">
//           <h3 className="text-xl font-semibold text-gray-800 flex items-center uppercase">
//             {/* <FaBrain className="mr-2 text-sky-600" /> */}
//             {title}
//           </h3>
//           <button
//             onClick={() => toggleSectionEdit(sectionKey)}
//             className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
//             aria-label={editingSection === sectionKey ? `Save ${title}` : `Edit ${title}`}
//           >
//             <FaEdit className="mr-2" />
//             {editingSection === sectionKey ? 'Save' : 'Edit'}
//           </button>
        
//         </div>
//         {subSections.map(({ key, title }) => (
//           <div key={key} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0  px-6">
//             <h4 className="text-lg font-medium text-gray-700 mb-2">{title}</h4>
//             {editingSection === sectionKey ? (
//               <div className="space-y-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                   {mseOptions[key].map(option => (
//                     <label key={option} className="flex items-center">
//                       <input
//                         type="radio"
//                         name={`${sectionKey}.${key}.option`}
//                         value={option}
//                         checked={patient.mentalStatusExam[key].option === option}
//                         onChange={e => handleRadioChange(e, key)}
//                         className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
//                         aria-label={option}
//                       />
//                       <span className="ml-2 text-sm text-gray-700">{option}</span>
//                     </label>
//                   ))}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Comments:</label>
//                   <textarea
//                     value={patient.mentalStatusExam[key].comments}
//                     onChange={e => handleCommentChange(e, key)}
//                     className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
//                     rows="3"
//                     placeholder="Enter comments"
//                     aria-label={`${title} comments`}
//                   />
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                   {mseOptions[key].map(option => (
//                     <label key={option} className="flex items-center">
//                       <input
//                         type="radio"
//                         name={`${sectionKey}.${key}.option`}
//                         value={option}
//                         checked={patient.mentalStatusExam[key].option === option}
//                         readOnly={patient.mentalStatusExam[key].option === option}
//                         disabled={patient.mentalStatusExam[key].option !== option}
//                         className={`h-4 w-4 text-sky-600 border-gray-300 ${
//                           patient.mentalStatusExam[key].option === option ? 'checked:text-sky-600' : ''
//                         }`}
//                         aria-label={option}
//                       />
//                       <span
//                         className={`ml-2 text-sm ${
//                           patient.mentalStatusExam[key].option === option ? 'text-sky-600 font-medium' : 'text-gray-700'
//                         }`}
//                       >
//                         {option}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//                 <div>
//                   <p>
//                     <strong>Comments:</strong> {patient.mentalStatusExam[key].comments || 'N/A'}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </section>
//     );
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-center mb-6">
//       <h3 className="flex items-center text-2xl font-bold text-gray-800">
//         <FaBrain className="mr-3" size={32} />
//         Mental Status Exam
//       </h3>

//       <div>
//                   <strong>Form Date:</strong> {patient.formDate || "N/A"}
//                 </div>
                
//                   <div>
                  
//                     <strong>Last Modified:</strong> {patient.formDate || "N/A"}
//                   </div>
//         </div>

//       {renderSection('General Observations', 'generalObservations', [
//         { key: 'appearance', title: 'Appearance' },
//         { key: 'speech', title: 'Speech' },
//         { key: 'eyeContact', title: 'Eye Contact' },
//         { key: 'motorActivity', title: 'Motor Activity' },
//         { key: 'affect', title: 'Affect' },
//       ])}
//       {renderSection('Mood', 'mood', [{ key: 'mood', title: 'Mood' }])}
//       {renderSection('Cognition', 'cognition', [
//         { key: 'orientationImpairment', title: 'Orientation Impairment' },
//         { key: 'memoryImpairment', title: 'Memory Impairment' },
//         { key: 'attention', title: 'Attention' },
//       ])}
//       {renderSection('Perception', 'perception', [
//         { key: 'hallucinations', title: 'Hallucinations' },
//         { key: 'otherPerception', title: 'Other' },
//       ])}
//       {renderSection('Thoughts', 'thoughts', [
//         { key: 'suicidality', title: 'Suicidality' },
//         { key: 'homicidality', title: 'Homicidality' },
//         { key: 'delusions', title: 'Delusions' },
//       ])}
//       {renderSection('Behavior', 'behavior', [{ key: 'behavior', title: 'Behavior' }])}
//       {renderSection('Insight and Judgment', 'insightJudgment', [
//         { key: 'insight', title: 'Insight' },
//         { key: 'judgment', title: 'Judgment' },
//       ])}
//     </div>
//   );
// };

// export default MentalStatusExam;

// import React, { useState } from 'react';
// import { FaBrain, FaEdit } from 'react-icons/fa';

// const MentalStatusExam = () => {
//   const [patient, setPatient] = useState({
//     mentalStatusExam: {
//       appearance: { option: 'Neat', comments: 'Well-groomed, appropriately dressed' },
//       speech: { option: 'Normal', comments: '' },
//       eyeContact: { option: 'Normal', comments: '' },
//       motorActivity: { option: 'Normal', comments: '' },
//       affect: { option: 'Full', comments: '' },
//       mood: { option: 'Euthymic', comments: '' },
//       cognition: {
//         orientationImpairment: { option: 'None', comments: '' },
//         memoryImpairment: { option: 'None', comments: '' },
//         attention: { option: 'Normal', comments: '' },
//       },
//       perception: {
//         hallucinations: { option: 'None', comments: '' },
//         other: { option: 'None', comments: '' },
//       },
//       thoughts: {
//         suicidality: { option: 'None', comments: '' },
//         homicidality: { option: 'None', comments: '' },
//         delusions: { option: 'None', comments: '' },
//       },
//       behavior: { option: 'Cooperative', comments: '' },
//       insight: { option: 'Good', comments: '' },
//       judgment: { option: 'Good', comments: '' },
//     },
//   });

//   const [editingSection, setEditingSection] = useState(null);

//   const mseOptions = {
//     appearance: ['Neat', 'Disheveled', 'Bizarre', 'Unhygienic', 'Other'],
//     speech: ['Normal', 'Slow', 'Rapid', 'Loud', 'Soft', 'Slurred', 'Other'],
//     eyeContact: ['Normal', 'Avoidant', 'Intense', 'Other'],
//     motorActivity: ['Normal', 'Restless', 'Slowed', 'Agitated', 'Tics', 'Other'],
//     affect: ['Full', 'Constricted', 'Flat', 'Inappropriate', 'Labile', 'Other'],
//     mood: ['Euthymic', 'Depressed', 'Anxious', 'Angry', 'Elevated', 'Irritable', 'Other'],
//     cognition: {
//       orientationImpairment: ['None', 'Time', 'Place', 'Person', 'Other'],
//       memoryImpairment: ['None', 'Short-Term', 'Long-Term', 'Other'],
//       attention: ['Normal', 'Distracted', 'Impaired', 'Other'],
//     },
//     perception: {
//       hallucinations: ['None', 'Auditory', 'Visual', 'Olfactory', 'Tactile', 'Other'],
//       other: ['None', 'Illusions', 'Depersonalization', 'Derealization', 'Other'],
//     },
//     thoughts: {
//       suicidality: ['None', 'Ideation', 'Plan', 'Intent', 'Other'],
//       homicidality: ['None', 'Ideation', 'Plan', 'Intent', 'Other'],
//       delusions: ['None', 'Grandiose', 'Persecutory', 'Somatic', 'Other'],
//     },
//     behavior: ['Cooperative', 'Withdrawn', 'Agitated', 'Hostile', 'Disorganized', 'Other'],
//     insight: ['Good', 'Fair', 'Poor', 'None'],
//     judgment: ['Good', 'Fair', 'Poor', 'None'],
//   };

//   const handleRadioChange = (e, section, subSection) => {
//     const { value } = e.target;
//     setPatient(prev => {
//       if (subSection) {
//         return {
//           ...prev,
//           mentalStatusExam: {
//             ...prev.mentalStatusExam,
//             [section]: {
//               ...prev.mentalStatusExam[section],
//               [subSection]: {
//                 ...prev.mentalStatusExam[section][subSection],
//                 option: value,
//               },
//             },
//           },
//         };
//       }
//       return {
//         ...prev,
//         mentalStatusExam: {
//           ...prev.mentalStatusExam,
//           [section]: {
//             ...prev.mentalStatusExam[section],
//             option: value,
//           },
//         },
//       };
//     });
//   };

//   const handleCommentChange = (e, section, subSection) => {
//     const { value } = e.target;
//     setPatient(prev => {
//       if (subSection) {
//         return {
//           ...prev,
//           mentalStatusExam: {
//             ...prev.mentalStatusExam,
//             [section]: {
//               ...prev.mentalStatusExam[section],
//               [subSection]: {
//                 ...prev.mentalStatusExam[section][subSection],
//                 comments: value,
//               },
//             },
//           },
//         };
//       }
//       return {
//         ...prev,
//         mentalStatusExam: {
//           ...prev.mentalStatusExam,
//           [section]: {
//             ...prev.mentalStatusExam[section],
//             comments: value,
//           },
//         },
//       };
//     });
//   };

//   const handleSubmit = section => {
//     console.log(`Saving ${section} section:`, patient.mentalStatusExam[section]);
//     setEditingSection(null);
//   };

//   const toggleSectionEdit = section => {
//     if (editingSection === section) {
//       handleSubmit(section);
//     } else {
//       setEditingSection(section);
//     }
//   };

//   const renderSection = (section, title, subSection = null) => {
//     const options = subSection ? mseOptions[section][subSection] : mseOptions[section];
//     const data = subSection ? patient.mentalStatusExam[section][subSection] : patient.mentalStatusExam[section];
//     const sectionKey = subSection ? `${section}.${subSection}` : section;

//     return (
//       <section className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
//         <div className="flex justify-between items-center mb-4 border-b pb-2">
//           <h3 className="text-xl font-semibold text-gray-800 flex items-center">
//             <FaBrain className="mr-2 text-sky-600" />
//             {title}
//           </h3>
//           <button
//             onClick={() => toggleSectionEdit(sectionKey)}
//             className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
//             aria-label={editingSection === sectionKey ? `Save ${title}` : `Edit ${title}`}
//           >
//             <FaEdit className="mr-2" />
//             {editingSection === sectionKey ? 'Save' : 'Edit'}
//           </button>
//         </div>
//         {editingSection === sectionKey ? (
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {options.map(option => (
//                 <label key={option} className="flex items-center">
//                   <input
//                     type="radio"
//                     name={`${sectionKey}.option`}
//                     value={option}
//                     checked={data.option === option}
//                     onChange={e => handleRadioChange(e, section, subSection)}
//                     className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
//                     aria-label={option}
//                   />
//                   <span className="ml-2 text-sm text-gray-700">{option}</span>
//                 </label>
//               ))}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Comments</label>
//               <textarea
//                 value={data.comments}
//                 onChange={e => handleCommentChange(e, section, subSection)}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
//                 rows="3"
//                 placeholder="Enter comments"
//                 aria-label={`${title} comments`}
//               />
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {options.map(option => (
//                 <label key={option} className="flex items-center">
//                   <input
//                     type="radio"
//                     name={`${sectionKey}.option`}
//                     value={option}
//                     checked={data.option === option}
//                     readOnly={data.option === option}
//                     disabled={data.option !== option}
//                     className={`h-4 w-4 text-sky-600 border-gray-300 ${
//                       data.option === option ? 'checked:text-sky-600' : ''
//                     }`}
//                     aria-label={option}
//                   />
//                   <span
//                     className={`ml-2 text-sm ${
//                       data.option === option ? 'text-sky-600 font-medium' : 'text-gray-700'
//                     }`}
//                   >
//                     {option}
//                   </span>
//                 </label>
//               ))}
//             </div>
//             <div>
//               <p>
//                 <strong>Comments:</strong> {data.comments || 'N/A'}
//               </p>
//             </div>
//           </div>
//         )}
//       </section>
//     );
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="flex items-center text-3xl font-bold text-gray-800 mb-6 pb-2">
//         <FaBrain className="mr-3" size={32} />
//         Mental Status Exam
//       </h2>
//       {renderSection('appearance', 'Appearance')}
//       {renderSection('speech', 'Speech')}
//       {renderSection('eyeContact', 'Eye Contact')}
//       {renderSection('motorActivity', 'Motor Activity')}
//       {renderSection('affect', 'Affect')}
//       {renderSection('mood', 'Mood')}
//       {renderSection('cognition', 'Cognition - Orientation Impairment', 'orientationImpairment')}
//       {renderSection('cognition', 'Cognition - Memory Impairment', 'memoryImpairment')}
//       {renderSection('cognition', 'Cognition - Attention', 'attention')}
//       {renderSection('perception', 'Perception - Hallucinations', 'hallucinations')}
//       {renderSection('perception', 'Perception - Other', 'other')}
//       {renderSection('thoughts', 'Thoughts - Suicidality', 'suicidality')}
//       {renderSection('thoughts', 'Thoughts - Homicidality', 'homicidality')}
//       {renderSection('thoughts', 'Thoughts - Delusions', 'delusions')}
//       {renderSection('behavior', 'Behavior')}
//       {renderSection('insight', 'Insight')}
//       {renderSection('judgment', 'Judgment')}
//     </div>
//   );
// };

// export default MentalStatusExam;

// import React, { useState } from 'react';
// import { FaBrain, FaEdit } from 'react-icons/fa';

// const MentalStatusExam = () => {
//   const [patient, setPatient] = useState({
//     mentalStatusExam: {
//       appearance: { option: 'Neat', comments: 'Well-groomed, appropriately dressed' },
//       speech: { option: 'Normal', comments: '' },
//       eyeContact: { option: 'Normal', comments: '' },
//       motorActivity: { option: 'Normal', comments: '' },
//       affect: { option: 'Full', comments: '' },
//       mood: { option: 'Euthymic', comments: '' },
//       cognition: {
//         orientationImpairment: { option: 'None', comments: '' },
//         memoryImpairment: { option: 'None', comments: '' },
//         attention: { option: 'Normal', comments: '' },
//       },
//       perception: {
//         hallucinations: { option: 'None', comments: '' },
//         other: { option: 'None', comments: '' },
//       },
//       thoughts: {
//         suicidality: { option: 'None', comments: '' },
//         homicidality: { option: 'None', comments: '' },
//         delusions: { option: 'None', comments: '' },
//       },
//       behavior: { option: 'Cooperative', comments: '' },
//       insight: { option: 'Good', comments: '' },
//       judgment: { option: 'Good', comments: '' },
//     },
//   });

//   const [editingSection, setEditingSection] = useState(null);

//   const mseOptions = {
//     appearance: ['Neat', 'Disheveled', 'Bizarre', 'Unhygienic', 'Other'],
//     speech: ['Normal', 'Slow', 'Rapid', 'Loud', 'Soft', 'Slurred', 'Other'],
//     eyeContact: ['Normal', 'Avoidant', 'Intense', 'Other'],
//     motorActivity: ['Normal', 'Restless', 'Slowed', 'Agitated', 'Tics', 'Other'],
//     affect: ['Full', 'Constricted', 'Flat', 'Inappropriate', 'Labile', 'Other'],
//     mood: ['Euthymic', 'Depressed', 'Anxious', 'Angry', 'Elevated', 'Irritable', 'Other'],
//     cognition: {
//       orientationImpairment: ['None', 'Time', 'Place', 'Person', 'Other'],
//       memoryImpairment: ['None', 'Short-Term', 'Long-Term', 'Other'],
//       attention: ['Normal', 'Distracted', 'Impaired', 'Other'],
//     },
//     perception: {
//       hallucinations: ['None', 'Auditory', 'Visual', 'Olfactory', 'Tactile', 'Other'],
//       other: ['None', 'Illusions', 'Depersonalization', 'Derealization', 'Other'],
//     },
//     thoughts: {
//       suicidality: ['None', 'Ideation', 'Plan', 'Intent', 'Other'],
//       homicidality: ['None', 'Ideation', 'Plan', 'Intent', 'Other'],
//       delusions: ['None', 'Grandiose', 'Persecutory', 'Somatic', 'Other'],
//     },
//     behavior: ['Cooperative', 'Withdrawn', 'Agitated', 'Hostile', 'Disorganized', 'Other'],
//     insight: ['Good', 'Fair', 'Poor', 'None'],
//     judgment: ['Good', 'Fair', 'Poor', 'None'],
//   };

//   const handleRadioChange = (e, section, subSection) => {
//     const { value } = e.target;
//     setPatient(prev => {
//       if (subSection) {
//         return {
//           ...prev,
//           mentalStatusExam: {
//             ...prev.mentalStatusExam,
//             [section]: {
//               ...prev.mentalStatusExam[section],
//               [subSection]: {
//                 ...prev.mentalStatusExam[section][subSection],
//                 option: value,
//               },
//             },
//           },
//         };
//       }
//       return {
//         ...prev,
//         mentalStatusExam: {
//           ...prev.mentalStatusExam,
//           [section]: {
//             ...prev.mentalStatusExam[section],
//             option: value,
//           },
//         },
//       };
//     });
//   };

//   const handleCommentChange = (e, section, subSection) => {
//     const { value } = e.target;
//     setPatient(prev => {
//       if (subSection) {
//         return {
//           ...prev,
//           mentalStatusExam: {
//             ...prev.mentalStatusExam,
//             [section]: {
//               ...prev.mentalStatusExam[section],
//               [subSection]: {
//                 ...prev.mentalStatusExam[section][subSection],
//                 comments: value,
//               },
//             },
//           },
//         };
//       }
//       return {
//         ...prev,
//         mentalStatusExam: {
//           ...prev.mentalStatusExam,
//           [section]: {
//             ...prev.mentalStatusExam[section],
//             comments: value,
//           },
//         },
//       };
//     });
//   };

//   const handleSubmit = section => {
//     console.log(`Saving ${section} section:`, patient.mentalStatusExam[section]);
//     setEditingSection(null);
//   };

//   const toggleSectionEdit = section => {
//     if (editingSection === section) {
//       handleSubmit(section);
//     } else {
//       setEditingSection(section);
//     }
//   };

//   const renderSection = (section, title, subSection = null) => {
//     const options = subSection ? mseOptions[section][subSection] : mseOptions[section];
//     const data = subSection ? patient.mentalStatusExam[section][subSection] : patient.mentalStatusExam[section];
//     const sectionKey = subSection ? `${section}.${subSection}` : section;

//     return (
//       <section className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
//         <div className="flex justify-between items-center mb-4 border-b pb-2">
//           <h3 className="text-xl font-semibold text-gray-800 flex items-center">
//             <FaBrain className="mr-2 text-sky-600" />
//             {title}
//           </h3>
//           <button
//             onClick={() => toggleSectionEdit(sectionKey)}
//             className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
//             aria-label={editingSection === sectionKey ? `Save ${title}` : `Edit ${title}`}
//           >
//             <FaEdit className="mr-2" />
//             {editingSection === sectionKey ? 'Save' : 'Edit'}
//           </button>
//         </div>
//         {editingSection === sectionKey ? (
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {options.map(option => (
//                 <label key={option} className="flex items-center">
//                   <input
//                     type="radio"
//                     name={`${sectionKey}.option`}
//                     value={option}
//                     checked={data.option === option}
//                     onChange={e => handleRadioChange(e, section, subSection)}
//                     className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
//                     aria-label={option}
//                   />
//                   <span className="ml-2 text-sm text-gray-700">{option}</span>
//                 </label>
//               ))}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Comments</label>
//               <textarea
//                 value={data.comments}
//                 onChange={e => handleCommentChange(e, section, subSection)}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
//                 rows="3"
//                 placeholder="Enter comments"
//                 aria-label={`${title} comments`}
//               />
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {options.map(option => (
//                 <label key={option} className="flex items-center">
//                   <input
//                     type="radio"
//                     name={`${sectionKey}.option`}
//                     value={option}
//                     checked={data.option === option}
//                     readOnly
//                     className={`h-4 w-4 text-sky-600 border-gray-300 ${
//                       data.option === option ? 'checked:text-sky-600' : ''
//                     }`}
//                     aria-label={option}
//                   />
//                   <span
//                     className={`ml-2 text-sm ${
//                       data.option === option ? 'text-sky-600 font-medium' : 'text-gray-700'
//                     }`}
//                   >
//                     {option}
//                   </span>
//                 </label>
//               ))}
//             </div>
//             <div>
//               <p>
//                 <strong>Comments:</strong> {data.comments || 'N/A'}
//               </p>
//             </div>
//           </div>
//         )}
//       </section>
//     );
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="flex items-center text-3xl font-bold text-gray-800 mb-6 pb-2">
//         <FaBrain className="mr-3" size={32} />
//         Mental Status Exam
//       </h2>
//       {renderSection('appearance', 'Appearance')}
//       {renderSection('speech', 'Speech')}
//       {renderSection('eyeContact', 'Eye Contact')}
//       {renderSection('motorActivity', 'Motor Activity')}
//       {renderSection('affect', 'Affect')}
//       {renderSection('mood', 'Mood')}
//       {renderSection('cognition', 'Cognition - Orientation Impairment', 'orientationImpairment')}
//       {renderSection('cognition', 'Cognition - Memory Impairment', 'memoryImpairment')}
//       {renderSection('cognition', 'Cognition - Attention', 'attention')}
//       {renderSection('perception', 'Perception - Hallucinations', 'hallucinations')}
//       {renderSection('perception', 'Perception - Other', 'other')}
//       {renderSection('thoughts', 'Thoughts - Suicidality', 'suicidality')}
//       {renderSection('thoughts', 'Thoughts - Homicidality', 'homicidality')}
//       {renderSection('thoughts', 'Thoughts - Delusions', 'delusions')}
//       {renderSection('behavior', 'Behavior')}
//       {renderSection('insight', 'Insight')}
//       {renderSection('judgment', 'Judgment')}
//     </div>
//   );
// };

// export default MentalStatusExam;

// import React, { useState } from 'react';
// import { FaBrain, FaEdit } from 'react-icons/fa';

// const MentalStatusExam = () => {
//   const [patient, setPatient] = useState({
//     mentalStatusExam: {
//       appearance: { options: ['Neat'], comments: 'Well-groomed, appropriately dressed' },
//       speech: { options: ['Normal'], comments: '' },
//       eyeContact: { options: ['Normal'], comments: '' },
//       motorActivity: { options: ['Normal'], comments: '' },
//       affect: { options: ['Full'], comments: '' },
//       mood: { options: ['Euthymic'], comments: '' },
//       cognition: {
//         orientationImpairment: { options: ['None'], comments: '' },
//         memoryImpairment: { options: ['None'], comments: '' },
//         attention: { options: ['Normal'], comments: '' },
//       },
//       perception: {
//         hallucinations: { options: ['None'], comments: '' },
//         other: { options: ['None'], comments: '' },
//       },
//       thoughts: {
//         suicidality: { options: ['None'], comments: '' },
//         homicidality: { options: ['None'], comments: '' },
//         delusions: { options: ['None'], comments: '' },
//       },
//       behavior: { options: ['Cooperative'], comments: '' },
//       insight: { option: 'Good', comments: '' },
//       judgment: { option: 'Good', comments: '' },
//     },
//   });

//   const [editingSection, setEditingSection] = useState(null);

//   const mseOptions = {
//     appearance: ['Neat', 'Disheveled', 'Bizarre', 'Unhygienic', 'Other'],
//     speech: ['Normal', 'Slow', 'Rapid', 'Loud', 'Soft', 'Slurred', 'Other'],
//     eyeContact: ['Normal', 'Avoidant', 'Intense', 'Other'],
//     motorActivity: ['Normal', 'Restless', 'Slowed', 'Agitated', 'Tics', 'Other'],
//     affect: ['Full', 'Constricted', 'Flat', 'Inappropriate', 'Labile', 'Other'],
//     mood: ['Euthymic', 'Depressed', 'Anxious', 'Angry', 'Elevated', 'Irritable', 'Other'],
//     cognition: {
//       orientationImpairment: ['None', 'Time', 'Place', 'Person', 'Other'],
//       memoryImpairment: ['None', 'Short-Term', 'Long-Term', 'Other'],
//       attention: ['Normal', 'Distracted', 'Impaired', 'Other'],
//     },
//     perception: {
//       hallucinations: ['None', 'Auditory', 'Visual', 'Olfactory', 'Tactile', 'Other'],
//       other: ['None', 'Illusions', 'Depersonalization', 'Derealization', 'Other'],
//     },
//     thoughts: {
//       suicidality: ['None', 'Ideation', 'Plan', 'Intent', 'Other'],
//       homicidality: ['None', 'Ideation', 'Plan', 'Intent', 'Other'],
//       delusions: ['None', 'Grandiose', 'Persecutory', 'Somatic', 'Other'],
//     },
//     behavior: ['Cooperative', 'Withdrawn', 'Agitated', 'Hostile', 'Disorganized', 'Other'],
//     insight: ['Good', 'Fair', 'Poor', 'None'],
//     judgment: ['Good', 'Fair', 'Poor', 'None'],
//   };

//   const handleCheckboxChange = (e, section, subSection) => {
//     const { name, checked } = e.target;
//     const value = name.split('.').pop();
//     setPatient(prev => {
//       const currentOptions = subSection
//         ? [...prev.mentalStatusExam[section][subSection].options]
//         : [...prev.mentalStatusExam[section].options];
//       const updatedOptions = checked
//         ? [...currentOptions, value]
//         : currentOptions.filter(opt => opt !== value);
//       if (subSection) {
//         return {
//           ...prev,
//           mentalStatusExam: {
//             ...prev.mentalStatusExam,
//             [section]: {
//               ...prev.mentalStatusExam[section],
//               [subSection]: {
//                 ...prev.mentalStatusExam[section][subSection],
//                 options: updatedOptions,
//               },
//             },
//           },
//         };
//       }
//       return {
//         ...prev,
//         mentalStatusExam: {
//           ...prev.mentalStatusExam,
//           [section]: {
//             ...prev.mentalStatusExam[section],
//             options: updatedOptions,
//           },
//         },
//       };
//     });
//   };

//   const handleRadioChange = (e, section) => {
//     const { value } = e.target;
//     setPatient(prev => ({
//       ...prev,
//       mentalStatusExam: {
//         ...prev.mentalStatusExam,
//         [section]: {
//           ...prev.mentalStatusExam[section],
//           option: value,
//         },
//       },
//     }));
//   };

//   const handleCommentChange = (e, section, subSection) => {
//     const { value } = e.target;
//     setPatient(prev => {
//       if (subSection) {
//         return {
//           ...prev,
//           mentalStatusExam: {
//             ...prev.mentalStatusExam,
//             [section]: {
//               ...prev.mentalStatusExam[section],
//               [subSection]: {
//                 ...prev.mentalStatusExam[section][subSection],
//                 comments: value,
//               },
//             },
//           },
//         };
//       }
//       return {
//         ...prev,
//         mentalStatusExam: {
//           ...prev.mentalStatusExam,
//           [section]: {
//             ...prev.mentalStatusExam[section],
//             comments: value,
//           },
//         },
//       };
//     });
//   };

//   const handleSubmit = section => {
//     console.log(`Saving ${section} section:`, patient.mentalStatusExam[section]);
//     setEditingSection(null);
//   };

//   const toggleSectionEdit = section => {
//     if (editingSection === section) {
//       handleSubmit(section);
//     } else {
//       setEditingSection(section);
//     }
//   };

//   const renderSection = (section, title, isRadio = false, subSection = null) => {
//     const options = subSection ? mseOptions[section][subSection] : mseOptions[section];
//     const data = subSection ? patient.mentalStatusExam[section][subSection] : patient.mentalStatusExam[section];
//     const sectionKey = subSection ? `${section}.${subSection}` : section;

//     return (
//       <section className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
//         <div className="flex justify-between items-center mb-4 border-b pb-2">
//           <h3 className="text-xl font-semibold text-gray-800 flex items-center">
//             <FaBrain className="mr-2 text-sky-600" />
//             {title}
//           </h3>
//           <button
//             onClick={() => toggleSectionEdit(sectionKey)}
//             className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
//             aria-label={editingSection === sectionKey ? `Save ${title}` : `Edit ${title}`}
//           >
//             <FaEdit className="mr-2" />
//             {editingSection === sectionKey ? 'Save' : 'Edit'}
//           </button>
//         </div>
//         {editingSection === sectionKey ? (
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {options.map(option => (
//                 <label key={option} className="flex items-center">
//                   {isRadio ? (
//                     <input
//                       type="radio"
//                       name={`${sectionKey}.option`}
//                       value={option}
//                       checked={data.option === option}
//                       onChange={e => handleRadioChange(e, section)}
//                       className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
//                       aria-label={option}
//                     />
//                   ) : (
//                     <input
//                       type="checkbox"
//                       name={`${sectionKey}.${option}`}
//                       checked={data.options.includes(option)}
//                       onChange={e => handleCheckboxChange(e, section, subSection)}
//                       className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
//                       aria-label={option}
//                     />
//                   )}
//                   <span className="ml-2 text-sm text-gray-700">{option}</span>
//                 </label>
//               ))}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Comments</label>
//               <textarea
//                 value={data.comments}
//                 onChange={e => handleCommentChange(e, section, subSection)}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
//                 rows="3"
//                 placeholder="Enter comments"
//                 aria-label={`${title} comments`}
//               />
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-2">
//             <p>
//               <strong>{isRadio ? 'Selection' : 'Selections'}:</strong>{' '}
//               {isRadio ? data.option || 'N/A' : data.options.join(', ') || 'N/A'}
//             </p>
//             <p>
//               <strong>Comments:</strong> {data.comments || 'N/A'}
//             </p>
//           </div>
//         )}
//       </section>
//     );
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="flex items-center text-3xl font-bold text-gray-800 mb-6 pb-2">
//         <FaBrain className="mr-3" size={32} />
//         Mental Status Exam
//       </h2>
//       {renderSection('appearance', 'Appearance')}
//       {renderSection('speech', 'Speech')}
//       {renderSection('eyeContact', 'Eye Contact')}
//       {renderSection('motorActivity', 'Motor Activity')}
//       {renderSection('affect', 'Affect')}
//       {renderSection('mood', 'Mood')}
//       {renderSection('cognition', 'Cognition - Orientation Impairment', false, 'orientationImpairment')}
//       {renderSection('cognition', 'Cognition - Memory Impairment', false, 'memoryImpairment')}
//       {renderSection('cognition', 'Cognition - Attention', false, 'attention')}
//       {renderSection('perception', 'Perception - Hallucinations', false, 'hallucinations')}
//       {renderSection('perception', 'Perception - Other', false, 'other')}
//       {renderSection('thoughts', 'Thoughts - Suicidality', false, 'suicidality')}
//       {renderSection('thoughts', 'Thoughts - Homicidality', false, 'homicidality')}
//       {renderSection('thoughts', 'Thoughts - Delusions', false, 'delusions')}
//       {renderSection('behavior', 'Behavior')}
//       {renderSection('insight', 'Insight', true)}
//       {renderSection('judgment', 'Judgment', true)}
//     </div>
//   );
// };

// export default MentalStatusExam;