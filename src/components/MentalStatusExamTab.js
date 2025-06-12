import React, { useState } from 'react';
import { FaBrain, FaEdit } from 'react-icons/fa';

const MentalStatusExam = () => {
  const [isAddMode, setIsAddMode] = useState(true); // New state for Add Mode
  const [patient, setPatient] = useState({
    mentalStatusExam: {
      circumstanceOfPresentation: '',
      indicationsAndRecommendations: '',
      appearance: {
        appearance: { options: ['Neat'] },
        weight: { options: ['Obese'] },
        hair: { options: ['Bizarre style'] },
        otherFeatures: { options: ['Scars'] },
        grooming: { options: ['Disheveled'] },
        dress: { options: ['Underdressed'] },
        comments: '',
      },
      behavior: {
        walk: { options: ['Gait/march'] },
        combativeness: { options: ['Aggressive'] },
        repetition: { options: ['Twitches'] },
        overactivity: { options: ['Overactivity'] },
        catatonia: { options: ['Catalepsy'] },
        comments: '',
      },
      speech: {
        rate: { options: ['Rapid'] },
        intelligibility: { options: ['Slurred'] },
        volume: { options: ['Loud'] },
        speechQuality: { options: ['Emotional'] },
        speechQuantity: { options: ['Talkative'] },
        comments: '',
      },
      attitudeToExaminer: {
        attitudeToExaminer: { options: ['Seductive'] },
      },
      moodAndAffect: {
        mood: { options: ['Euthymic'] },
        otherEmotions: { options: ['Panicked'] },
        otherSigns: { options: ['Ambivalence'] },
        neuroVegetative: { options: ['Hypersomnia'] },
        comments: '',
      },
      affectiveExpression: {
        affectiveExpression: { options: ['Normal'] },
      },
      appropriateness: {
        appropriateness: { options: ['Labile'] },
      },
      hallucinations: {
        hallucinations: { options: ['Hypnogogic'] },
        comments: '',
      },
      disassociation: {
        disassociation: { options: ['Macropsia'] },
        comments: '',
      },
      agnosia: {
        agnosia: { options: ['Anosognosia'] },
        comments: '',
      },
      contentOfThought: {
        contentOfThought: { options: ['Overvalued idea'] },
        preoccupationsSI: { options: ['Current ideation'] },
        hostileIntent: { options: ['History of violence'] },
        phobia: { options: ['Simple'] },
        comments: '',
      },
      delusions0: {
        delusions0: { options: ['Somatic'] },
        comments: '',
      },
      thoughtForm: {
        general: { options: ['Neurosis'] },
        specific: { options: ['Circumstantiality'] },
        disturbancesOfSpeech: { options: ['Voluble'] },
        aphasicDisturbances: { options: ['Jargon'] },
        comments: '',
      },
      consciousness: {
        consciousness: { options: ['Disoriented'] },
        comments: '',
      },
      orientation: {
        orientation: { options: ['Time Disorientation'] },
        comments: '',
      },
      concentration: {
        concentration: { options: ['Serial 7’s inattention'] },
        comments: '',
      },
      memory: {
        memory: { options: ['Remote memory deficit'] },
        comments: '',
      },
      informationAndIntelligence: {
        attention: { options: ['Distractible'] },
        suggestibility: { options: ['Hypnotized'] },
        memory2: { options: ['Localized amnesia'] },
        intelligence: { options: ['Dementia'] },
        comments: '',
      },
      judgment: {
        judgment: { options: ['Critical'] },
        comments: '',
      },
      insight: {
        insight: { options: ['Impaired insight'] },
        comments: '',
      },
      reliability: {
        reliability: { options: ['Reason to fake bad'] },
        comments: '',
      },
      summary: {
        globalFunctioning: { options: ['20 Possible harm'] },
        comments: '',
      },
      generalObservations: {
        appearance: { options: ['Neat'] },
        speech: { options: ['Normal'] },
        eyeContact: { options: ['Normal'] },
        motorActivity: { options: ['Normal'] },
        affect: { options: ['Full'] },
        comments: 'Well-groomed, appropriately dressed',
      },
      cognition: {
        orientationImpairment: { options: ['None'] },
        memoryImpairment: { options: ['None'] },
        attention: { options: ['Normal'] },
        comments: '',
      },
      thoughts: {
        suicidality: { options: ['None'] },
        homicidality: { options: ['None'] },
        delusions: { options: ['None'] },
        comments: '',
      },
    },
  });

  const [isSaving,setIsSaving]=useState(false);

  const [editingSection, setEditingSection] = useState(null);

  const mseOptions = {
    appearance: ['Neat', 'Disheveled', 'Inappropriate', 'Bizarre', 'Other'],
    weight: ['Obese', 'Over-weight', 'Under-weight', 'Emaciated'],
    hair: ['Bizarre style', 'Unnatural color', 'Unshaven'],
    otherFeatures: ['Scars', 'Tattoos', 'Jewelry', 'Glasses', 'Dental braces'],
    grooming: ['Disheveled', 'Soiled', 'Body odor', 'Halitosis'],
    dress: ['Underdressed', 'Overdressed', 'Bizarre', 'Militaristic'],
    walk: ['Gait/march', 'Limp', 'Shuffle', 'Assisted'],
    combativeness: ['Cataplexy', 'Aggressive'],
    repetition: ['Gestures', 'Twitches', 'Stereotypical', 'Automatism', 'Mimicry', 'Echopraxia'],
    overactivity: ['Psychomotor Agitation', 'Hyperactivity', 'Tic', 'Sleepwalking', 'Compulsion'],
    catatonia: ['Catalepsy', 'Exited', 'Stupor', 'Rigidity', 'Posturing', 'Cerea Flexibilitas', 'Negativism'],
    rate: ['Rapid', 'Slow'],
    intelligibility: ['Slurred', 'Mumbled', 'Stuttered', 'Accented'],
    volume: ['Loud', 'Whispered'],
    speechQuality: ['Hesitant', 'Emotional', 'Monotonous', 'Stereotypical', 'Unspontaneous', 'Echolalia', 'Verbigeria'],
    speechQuantity: ['Garrulous', 'Talkative', 'Responsive', 'Taciturn', 'Mutism'],
    attitudeToExaminer: ['Seductive', 'Playful', 'Ingratiating', 'Friendly', 'Cooperative', 'Interested', 'Attentive', 'Frank', 'Indifferent', 'Evasive', 'Defensive', 'Hostile'],
    mood: ['Ecstatic', 'Euphoric', 'Expansive', 'Elevated', 'Euthymic', 'Dysphoric', 'Anhedonic', 'Depressed', 'Alexithymic', 'Grieving', 'Anxious', 'Angry', 'Irritable', 'Other'],
    affectiveExpression: ['Normal', 'Restricted', 'Blunted', 'Flat'],
    appropriateness: ['Appropriate', 'Inappropriate', 'Labile'],
    hallucinations: ['Hypnogogic', 'Hypnopompic', 'Auditory', 'Visual', 'Olfactory', 'Gustatory', 'Tactile', 'Somatic', 'Lilliputian', 'Mood-congruent', 'Mood-incongruent', 'Hallucinosis', 'Synesthesia', 'Trailing'],
    disassociation: ['Hysterical anesthesia', 'Macropsia', 'Micropsia', 'Depersonalization', 'Derealization', 'Fugue', 'Multiple personality'],
    agnosia: ['Anosognosia', 'Autotopagnosia', 'Visual agnosia', 'Astereognosia', 'Prosopagnosia'],
    contentOfThought: ['Poverty of thought', 'Overvalued idea', 'Trend of thought', 'Egomania', 'Monomania', 'Hypochondria', 'Obsession', 'Compulsion', 'Noesis', 'Unio mystica', 'Delusions'],
    delusions0: ['Bizarre', 'Systematized', 'Mood-congruent', 'Mood-incongruent', 'Nihilistic', 'Somatic', 'Paranoid', 'Persecutory', 'Grandeur', 'Referential', 'Self-accusatory', 'Control', 'Thought withdrawal', 'Thought insertion', 'Thought broadcasting', 'Infidelity', 'Erotomania', 'Pseudologia fantastica'],
    preoccupationsSI: ['Ideation history', 'Previous attempt/s', 'Current ideation', 'Impulsiveness', 'Viable plan', 'Available means', 'Settling of affairs'],
    hostileIntent: ['Previous intimidation', 'History of violence', 'Current intent', 'Impulsiveness', 'Viable plan', 'Available means'],
    phobia: ['Simple', 'Social', 'Acrophobia', 'Agoraphobia', 'Claustrophobia', 'Xenophobia', 'Zoophobia'],
    general: ['Mental disorder', 'Neurosis', 'Psychosis', 'Reality testing dis.', 'Illogical thinking', 'Dereism', 'Autistic thinking', 'Magical thinking', 'Concrete thinking', 'Abstract thinking'],
    specific: ['Neologism', 'Word salad', 'Circumstantiality', 'Tangentiality', 'Incoherence', 'Perseveration', 'Condensation', 'Irrelevant answers', 'Loosening', 'Derailment', 'Flight of ideas', 'Clang association', 'Blocking', 'Glossolalia'],
    disturbancesOfSpeech: ['Pressured', 'Voluble', 'Poverty of Speech', 'Poverty of Content', 'Dysprosody', 'Dysarthria'],
    aphasicDisturbances: ['Motor', 'Sensory', 'Syntactical', 'Jargon', 'Global'],
    consciousness: ['Disoriented', 'Clouding', 'Stupor', 'Delirium', 'Coma', 'Coma vigil', 'Twilight state', 'Dreamlike state', 'Somnolence'],
    orientation: ['Time Disorientation', 'Place Disorientation', 'Person Disorientation'],
    concentration: ['Serial 7’s inattention', 'Easily distracted', 'Often distracted'],
    memory: ['Remote memory deficit', 'Recent past deficit', 'Recent memory deficit', 'Immediate recall deficit'],
    attention: ['Distractible', 'Selective attention', 'Syntactical', 'Jargon', 'Global'],
    suggestibility: ['Folie à deux', 'Hypnotized'],
    memory2: ['Localized amnesia', 'Generalized amnesia', 'Selective amnesia', 'Continuous amnesia', 'Paramnesia', 'Fausse reconnaissance', 'Retro. falsification', 'Confabulation', 'Déjà entendu', 'Déjà pensé', 'Déjà vu', 'Jamais vu', 'Hypermnesia', 'Eidetic images'],
    intelligence: ['Mild retardation', 'Moderate retardation', 'Severe retardation', 'Profound retardation', 'Dementia', 'Pseudodementia'],
    judgment: ['Critical', 'Automatic', 'Impaired'],
    insight: ['Impaired insight', 'Denial of disorder', 'External locus of disorder', 'Intellectual insight', 'True insight'],
    reliability: ['Reason to fake bad', 'Reason to fake good', 'Compulsory examination'],
    globalFunctioning: ['10 Imminent harm', '20 Possible harm', '30 Serious Impairment', '40 Major Impairment', '50 Serious Symptoms', '60 Moderate Symptoms', '70 Mild Symptoms', '80 Slight Impairment', '90 No Symptoms', '100 Superior Function'],
    otherEmotions: ['Panicked', 'Fearful', 'Anxious', 'Tense', 'Agitated', 'Apathetic', 'Irritable', 'Angry'],
    otherSigns: ['Ambivalence', 'Mood Swings'],
    neuroVegetative: ['Anorexia', 'Insomnia', 'Hypersomnia', 'Diminished Libido', 'Constipation'],
    speech: ['Normal', 'Tangential', 'Pressured', 'Impoverished', 'Other'],
    eyeContact: ['Normal', 'Intense', 'Avoidant', 'Other'],
    motorActivity: ['Normal', 'Restless', 'Tics', 'Slowed', 'Other'],
    affect: ['Full', 'Constricted', 'Flat', 'Labile', 'Other'],
    orientationImpairment: ['None', 'Place', 'Object', 'Person', 'Time'],
    memoryImpairment: ['None', 'Short-Term', 'Long-Term', 'Other'],
    otherPerception: ['None', 'Derealization', 'Depersonalization', 'Other'],
    suicidality: ['None', 'Ideation', 'Plan', 'Intent', 'Self-Harm'],
    homicidality: ['None', 'Aggressive', 'Intent', 'Plan', 'Other'],
    delusions: ['None', 'Grandiose', 'Paranoid', 'Religious', 'Other'],
  };

  const handleCheckboxChange = (e, section, subSection) => {
    const { value, checked } = e.target;
    setPatient(prev => {
      const currentOptions = prev.mentalStatusExam[section][subSection].options || [];
      let updatedOptions;
      if (checked) {
        updatedOptions = [...new Set([...currentOptions, value])];
      } else {
        updatedOptions = currentOptions.filter(opt => opt !== value);
      }
      return {
        ...prev,
        mentalStatusExam: {
          ...prev.mentalStatusExam,
          [section]: {
            ...prev.mentalStatusExam[section],
            [subSection]: {
              options: updatedOptions,
            },
          },
        },
      };
    });
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

  const handleInputTextNormal = (e, section) => {
    const { value } = e.target;
    setPatient(prev => ({
      ...prev,
      mentalStatusExam: {
        ...prev.mentalStatusExam,
        [section]: value,
      },
    }));
  };

  const createSectionPayload = (section) => {
    return {
      section,
      data: patient.mentalStatusExam[section],
    };
  };

  const createFullPayload = () => {
    return {
      mentalStatusExam: patient.mentalStatusExam,
    };
  };

  const handleSubmitSection = (section) => {
    const payload = createSectionPayload(section);
    console.log(`Saving ${section} section payload:`, payload);
    setEditingSection(null);
  };

  const handleSubmitAll = () => {
    const payload = createFullPayload();
    console.log('Saving all sections payload:', payload);
    setIsAddMode(false); // Exit Add Mode after saving
  };

  const toggleSectionEdit = (section) => {
    if (editingSection === section) {
      handleSubmitSection(section);
    } else {
      setEditingSection(section);
    }
  };

  const renderSection = (title, sectionKey, subSections) => {
    return (
      <section className="mb-8 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4 px-6 py-2 bg-slate-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center uppercase">
            {title}
          </h3>
          {!isAddMode && (
            <button
              onClick={() => toggleSectionEdit(sectionKey)}
              className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
              aria-label={editingSection === sectionKey ? `Save ${title}` : `Edit ${title}`}
            >
              <FaEdit className="mr-2" />
              {editingSection === sectionKey ? 'Save' : 'Edit'}
            </button>
          )}
        </div>
        {subSections.map(({ key, title }) => (
          <div key={key} className="border-b border-gray-200 pb-3 mb-3 last:border-b-0 last:mb-0 px-6">
            {(isAddMode || editingSection === sectionKey) ? (
              <div className="">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="pr-4">
                    <h4 className="text-md font-medium text-gray-700">{title}</h4>
                  </div>
                  <div className="col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                      {mseOptions[key].map(option => (
                        <label key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            name={`${sectionKey}.${key}.options`}
                            value={option}
                            checked={patient.mentalStatusExam[sectionKey][key].options.includes(option)}
                            onChange={e => handleCheckboxChange(e, sectionKey, key)}
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
                    <h4 className="text-md font-medium text-gray-700">{title}</h4>
                  </div>
                  <div className="col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                      {mseOptions[key].map(option => (
                        <label key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            name={`${sectionKey}.${key}.options`}
                            value={option}
                            checked={patient.mentalStatusExam[sectionKey][key].options.includes(option)}
                            disabled
                            className="h-4 w-4 text-sky-600 border-gray-300"
                            aria-label={option}
                          />
                          <span
                            className={`ml-2 text-sm ${
                              patient.mentalStatusExam[sectionKey][key].options.includes(option)
                                ? 'text-sky-600 font-medium'
                                : 'text-gray-700'
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
          {(isAddMode || editingSection === sectionKey) && (
            <h4 className="text-lg font-medium text-gray-700 mb-2">Comments:</h4>
          )}
          {(isAddMode || editingSection === sectionKey) ? (
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
          {!isAddMode && (
            <button
              onClick={() => toggleSectionEdit(sectionKey)}
              className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
              aria-label={editingSection === sectionKey ? `Save ${title}` : `Edit ${title}`}
            >
              <FaEdit className="mr-2" />
              {editingSection === sectionKey ? 'Save' : 'Edit'}
            </button>
          )}
        </div>
        {subSections.map(({ key, title, nested }) => (
          <div key={key} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0 px-6">
            <h4 className="text-lg font-medium text-gray-700 mb-2">{title}</h4>
            {(isAddMode || editingSection === sectionKey) ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                  {mseOptions[key].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        name={`${sectionKey}.${key}.options`}
                        value={option}
                        checked={patient.mentalStatusExam[sectionKey][key].options.includes(option)}
                        onChange={e => handleCheckboxChange(e, sectionKey, key)}
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                        aria-label={option}
                      />
                      <span className="ml-2 text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                {nested}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                  {mseOptions[key].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        name={`${sectionKey}.${key}.options`}
                        value={option}
                        checked={patient.mentalStatusExam[sectionKey][key].options.includes(option)}
                        disabled
                        className="h-4 w-4 text-sky-600 border-gray-300"
                        aria-label={option}
                      />
                      <span
                        className={`ml-2 text-sm ${
                          patient.mentalStatusExam[sectionKey][key].options.includes(option)
                            ? 'text-sky-600 font-medium'
                            : 'text-gray-700'
                        }`}
                      >
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                {nested}
              </div>
            )}
          </div>
        ))}
        <div className="px-6 pb-4">
          {(isAddMode || editingSection === sectionKey) && (
            <h4 className="text-lg font-medium text-gray-700 mb-2">Comments:</h4>
          )}
          {(isAddMode || editingSection === sectionKey) ? (
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

  const circumstanceOfPresentation = (sectionKey) => {
    return (
      <section className="mb-8 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4 px-6 py-2 bg-slate-200">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center uppercase">
            Circumstance of presentation
          </h3>
          {!isAddMode && (
            <button
              onClick={() => toggleSectionEdit(sectionKey)}
              className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
              aria-label={editingSection === sectionKey ? `Save Circumstance of presentation` : `Edit Circumstance of presentation`}
            >
              <FaEdit className="mr-2" />
              {editingSection === sectionKey ? 'Save' : 'Edit'}
            </button>
          )}
        </div>
        <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0 px-6">
          <div className="space-y-4">
            {(isAddMode || editingSection === sectionKey) ? (
              <textarea
                value={patient.mentalStatusExam.circumstanceOfPresentation}
                onChange={e => handleInputTextNormal(e, 'circumstanceOfPresentation')}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="3"
                placeholder="Enter Circumstance of presentation"
                aria-label={`Circumstance of presentation`}
              />
            ) : (
              <p>{patient.mentalStatusExam.circumstanceOfPresentation || 'N/A'}</p>
            )}
          </div>
        </div>
      </section>
    );
  };

  const indicationsAndRecommendations = (sectionKey) => {
    return (
      <section className="mb-8 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4 px-6 py-2 bg-slate-200">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center uppercase">
            Indications & Recommendations
          </h3>
          {!isAddMode && (
            <button
              onClick={() => toggleSectionEdit(sectionKey)}
              className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
              aria-label={editingSection === sectionKey ? `Save Indications & Recommendations` : `Edit Indications & Recommendations`}
            >
              <FaEdit className="mr-2" />
              {editingSection === sectionKey ? 'Save' : 'Edit'}
            </button>
          )}
        </div>
        <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0 px-6">
          <div className="space-y-4">
            {(isAddMode || editingSection === sectionKey) ? (
              <textarea
                value={patient.mentalStatusExam.indicationsAndRecommendations}
                onChange={e => handleInputTextNormal(e, 'indicationsAndRecommendations')}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="3"
                placeholder="Indications & Recommendations"
                aria-label={`Indications & Recommendations`}
              />
            ) : (
              <p>{patient.mentalStatusExam.indicationsAndRecommendations || 'N/A'}</p>
            )}
          </div>
        </div>
      </section>
    );
  };

  const renderSectionWithNested = (title, sectionKey, subSections) => {
    return (
      <section className="mb-8 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4 px-6 py-2 bg-slate-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center uppercase">
            {title}
          </h3>
          {!isAddMode && (
            <button
              onClick={() => toggleSectionEdit(sectionKey)}
              className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
              aria-label={editingSection === sectionKey ? `Save ${title}` : `Edit ${title}`}
            >
              <FaEdit className="mr-2" />
              {editingSection === sectionKey ? 'Save' : 'Edit'}
            </button>
          )}
        </div>
        {subSections.map(({ key, title }) => (
          <div key={key} className="border-b border-gray-200 pb-3 mb-3 last:border-b-0 last:mb-0 px-6">
            {(isAddMode || editingSection === sectionKey) ? (
              <div className="">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {title && (
                    <div className="pr-4">
                      <h4 className="text-md font-medium text-gray-700">{title}</h4>
                    </div>
                  )}
                  <div className={`${title ? 'col-span-2' : 'col-span-3'}`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                      {mseOptions[key].map(option => (
                        <label key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            name={`${sectionKey}.${key}.options`}
                            value={option}
                            checked={patient.mentalStatusExam[sectionKey][key].options.includes(option)}
                            onChange={e => handleCheckboxChange(e, sectionKey, key)}
                            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                            aria-label={option}
                          />
                          <span className="ml-2 text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                    {key === 'contentOfThought' &&
                      patient.mentalStatusExam.contentOfThought.contentOfThought.options.includes('Delusions') && (
                        <div className="mt-4 border p-4">
                          <h4 className="text-md font-bold text-gray-700">Delusions</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-2">
                            {mseOptions.delusions0.map(option => (
                              <label key={option} className="flex items-center">
                                <input
                                  type="checkbox"
                                  name={`delusions0.delusions0.options`}
                                  value={option}
                                  checked={patient.mentalStatusExam.delusions0.delusions0.options.includes(option)}
                                  onChange={e => handleCheckboxChange(e, 'delusions0', 'delusions0')}
                                  className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                                  aria-label={option}
                                />
                                <span className="ml-2 text-sm text-gray-700">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {title && (
                    <div className="pr-4">
                      <h4 className="text-md font-medium text-gray-700">{title}</h4>
                    </div>
                  )}
                  <div className={`${title ? 'col-span-2' : 'col-span-3'}`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                      {mseOptions[key].map(option => (
                        <label key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            name={`${sectionKey}.${key}.options`}
                            value={option}
                            checked={patient.mentalStatusExam[sectionKey][key].options.includes(option)}
                            disabled
                            className="h-4 w-4 text-sky-600 border-gray-300"
                            aria-label={option}
                          />
                          <span
                            className={`ml-2 text-sm ${
                              patient.mentalStatusExam[sectionKey][key].options.includes(option)
                                ? 'text-sky-600 font-medium'
                                : 'text-gray-700'
                            }`}
                          >
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                    {key === 'contentOfThought' &&
                      patient.mentalStatusExam.contentOfThought.contentOfThought.options.includes('Delusions') && (
                        <div className="mt-4 ml-6">
                          <h4 className="text-md font-medium text-gray-700">Delusion Type</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-2">
                            {mseOptions.delusions0.map(option => (
                              <label key={option} className="flex items-center">
                                <input
                                  type="checkbox"
                                  name={`delusions0.delusions0.options`}
                                  value={option}
                                  checked={patient.mentalStatusExam.delusions0.delusions0.options.includes(option)}
                                  disabled
                                  className="h-4 w-4 text-sky-600 border-gray-300"
                                  aria-label={option}
                                />
                                <span
                                  className={`ml-2 text-sm ${
                                    patient.mentalStatusExam.delusions0.delusions0.options.includes(option)
                                      ? 'text-sky-600 font-medium'
                                      : 'text-gray-700'
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
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="px-6 pb-4">
          {(isAddMode || editingSection === sectionKey) && (
            <h4 className="text-lg font-medium text-gray-700 mb-2">Comments:</h4>
          )}
          {(isAddMode || editingSection === sectionKey) ? (
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

  return (
    <div className="px-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-6">
        <h3 className="flex items-center text-2xl font-bold text-gray-800">
          <FaBrain className="mr-3" size={32} />
          Mental Status Exam
        </h3>
        <div>
          <strong>Form Date:</strong> {patient.formDate || 'N/A'}
        </div>
        <div>
          <strong>Last Modified:</strong> {patient.formDate || 'N/A'}
        </div>
      </div>



      {circumstanceOfPresentation('circumstanceOfPresentation')}

      {renderSection('Appearance', 'appearance', [
        { key: 'weight', title: 'Weight' },
        { key: 'hair', title: 'Hair' },
        { key: 'otherFeatures', title: 'Other Features' },
        { key: 'grooming', title: 'Grooming' },
        { key: 'dress', title: 'Dress' },
      ])}

      {renderSection('Behavior', 'behavior', [
        { key: 'walk', title: 'Walk' },
        { key: 'combativeness', title: 'Combativeness' },
        { key: 'repetition', title: 'Repetition' },
        { key: 'overactivity', title: 'Overactivity' },
        { key: 'catatonia', title: 'Catatonia' },
      ])}

      {renderSection('Speech', 'speech', [
        { key: 'rate', title: 'Rate' },
        { key: 'intelligibility', title: 'Intelligibility' },
        { key: 'volume', title: 'Volume' },
        { key: 'speechQuality', title: 'Speech Quality' },
        { key: 'speechQuantity', title: 'Speech Quantity' },
      ])}

      {renderSectionMood('Attitude to Examiner', 'attitudeToExaminer', [{ key: 'attitudeToExaminer', title: '' }])}

      {renderSection('Mood and Affect', 'moodAndAffect', [
        { key: 'mood', title: 'Mood' },
        { key: 'otherEmotions', title: 'Other Emotions' },
        { key: 'otherSigns', title: 'Other Signs' },
        { key: 'neuroVegetative', title: 'Neuro Vegetative' },
      ])}

      {renderSectionMood('Affective Expression', 'affectiveExpression', [{ key: 'affectiveExpression', title: '' }])}

      {renderSectionMood('Appropriateness', 'appropriateness', [{ key: 'appropriateness', title: '' }])}

      {renderSectionMood('Hallucinations', 'hallucinations', [{ key: 'hallucinations', title: '' }])}

      {renderSectionMood('Disassociation', 'disassociation', [{ key: 'disassociation', title: '' }])}

      {renderSectionMood('Agnosia', 'agnosia', [{ key: 'agnosia', title: '' }])}

      {renderSectionWithNested('Content of Thought', 'contentOfThought', [
        { key: 'contentOfThought', title: '' },
        { key: 'preoccupationsSI', title: 'Preoccupations Suicidal Ideation' },
        { key: 'hostileIntent', title: 'Hostile Intent' },
        { key: 'phobia', title: 'Phobia' },
      ])}

      {renderSection('Thought Form', 'thoughtForm', [
        { key: 'general', title: 'General' },
        { key: 'specific', title: 'Specific' },
        { key: 'disturbancesOfSpeech', title: 'Disturbances of speech' },
        { key: 'aphasicDisturbances', title: 'Aphasic Disturbances' },
      ])}

      {renderSectionMood('Consciousness', 'consciousness', [{ key: 'consciousness', title: '' }])}

      {renderSectionMood('Orientation', 'orientation', [{ key: 'orientation', title: '' }])}

      {renderSectionMood('Concentration', 'concentration', [{ key: 'concentration', title: '' }])}

      {renderSectionMood('Memory', 'memory', [{ key: 'memory', title: '' }])}

      {renderSection('Information & Intelligence', 'informationAndIntelligence', [
        { key: 'attention', title: 'Attention' },
        { key: 'suggestibility', title: 'Suggestibility' },
        { key: 'memory2', title: 'Memory' },
        { key: 'intelligence', title: 'Intelligence' },
      ])}

      {renderSection('Judgment', 'judgment', [{ key: 'judgment', title: 'Judgment' }])}

      {renderSection('Insight', 'insight', [{ key: 'insight', title: 'Insight' }])}

      {renderSectionMood('Reliability', 'reliability', [{ key: 'reliability', title: '' }])}

      {renderSection('Summary', 'summary', [{ key: 'globalFunctioning', title: 'Global Functioning' }])}

      {indicationsAndRecommendations('indicationsAndRecommendations')}



            {isAddMode && (
    <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
           onClick={handleSubmitAll}
            className="flex items-center bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition-all duration-200 shadow-md"
            aria-label="Save and go to next tab"
            disabled={isSaving}
          >
           {isSaving ? 'Saving...': 'Save All'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MentalStatusExam;

// import React, { useState } from 'react';
// import { FaBrain, FaEdit } from 'react-icons/fa';

// const MentalStatusExam = () => {
//   const [patient, setPatient] = useState({
//     mentalStatusExam: {
    
// circumstanceOfPresentation:'',
// indicationsAndRecommendations:'',

//       appearance: {
//         appearance: { options: ['Neat'] },
//         weight: { options: ['Obese'] },
//         hair: { options: ['Bizarre style'] },
//         otherFeatures: { options: ['Scars'] },
//         grooming: { options: ['Disheveled'] },
//         dress: { options: ['Underdressed'] },
//         comments: '',
//       },

//       behavior: {
//         walk: { options: ['Gait/march'] },
//         combativeness: { options: ['Aggressive'] },
//         repetition: { options: ['Twitches'] },
//         overactivity: { options: ['Overactivity'] },
//         catatonia: { options: ['Catalepsy'] },
//         comments: '',
//       },

//       speech: {
//         rate: { options: ['Rapid'] },
//         intelligibility: { options: ['Slurred'] },
//         volume: { options: ['Loud'] },
//         speechQuality: { options: ['Emotional'] },
//         speechQuantity: { options: ['Talkative'] },
//         comments: '',
//       },

//       attitudeToExaminer:{
//         attitudeToExaminer:{options: ['Seductive']}
//       },

//       moodAndAffect: {
//         mood: { options: ['Euthymic'] },
//         otherEmotions: { options: ['Panicked'] },
//         otherSigns: { options: ['Ambivalence'] },
//         neuroVegetative: { options: ['Hypersomnia'] },
//         comments: '',
//       },


//       affectiveExpression:{
//         affectiveExpression:{options: ['Normal']}
//       },

//       appropriateness:{
//         appropriateness:{options: ['Labile']}
//       },

//       hallucinations: {
//         hallucinations: { options: ['Hypnogogic'] },
//         comments: '',
//       },
//       disassociation: {
//         disassociation: { options: ['Macropsia'] },
//         comments: '',
//       },
//       agnosia: {
//         agnosia: { options: ['Anosognosia'] },
//         comments: '',
//       },

//       contentOfThought: {
//         contentOfThought: { options: ['Overvalued idea'] },
//         preoccupationsSI: { options: ['Current ideation'] },
//         hostileIntent: { options: ['History of violence'] },
//            phobia: { options: ['Simple'] },
//         comments: '',
//       },
      
//       delusions0: {
//         delusions0: { options: ['Somatic'] },
//         comments: '',
//       },



//  thoughtForm: {
//         general: { options: ['Neurosis'] },
//         specific: { options: ['Circumstantiality'] },
//         disturbancesOfSpeech: { options: ['Voluble'] },
//            aphasicDisturbances: { options: ['Jargon'] },
//         comments: '',
//       },
    

//        consciousness: {
//         consciousness: { options: ['Disoriented'] },
//         comments: '',
//       },

//       orientation: {
//         orientation: { options: ['Time Disorientation'] },
//         comments: '',
//       },

//         concentration: {
//         concentration: { options: ['Serial 7’s inattention'] },
//         comments: '',
//       },

//       memory: {
//         memory: { options: ['Remote memory deficit'] },
//         comments: '',
//       },

//       informationAndIntelligence : {
//         attention: { options: ['Distractible'] },
//         suggestibility: { options: ['Hypnotized'] },
//         memory2: { options: ['Localized amnesia'] },
//         intelligence: { options: ['Dementia'] },
//         comments: '',
//       },

//   judgment: {
//         judgment: { options: ['Critical'] },
//         comments: '',
//       },

//        insight: {
//         insight: { options: ['Impaired insight'] },
//         comments: '',
//       },

//        reliability: {
//         reliability: { options: ['Reason to fake bad'] },
//         comments: '',
//       },

//       summary: {
//         globalFunctioning: { options: ['20 Possible harm'] },
//         comments: '',
//       },

//       generalObservations: {
//         appearance: { options: ['Neat'] },
//         speech: { options: ['Normal'] },
//         eyeContact: { options: ['Normal'] },
//         motorActivity: { options: ['Normal'] },
//         affect: { options: ['Full'] },
//         comments: 'Well-groomed, appropriately dressed',
//       },

//       cognition: {
//         orientationImpairment: { options: ['None'] },
//         memoryImpairment: { options: ['None'] },
//         attention: { options: ['Normal'] },
//         comments: '',
//       },
//       // perception: {
//       //   hallucinations: { options: ['None'] },
//       //   otherPerception: { options: ['None'] },
//       //   comments: '',
//       // },
//       thoughts: {
//         suicidality: { options: ['None'] },
//         homicidality: { options: ['None'] },
//         delusions: { options: ['None'] },
//         comments: '',
//       },
//       // behavior: {
//       //   behavior: { options: ['Cooperative'] },
//       //   comments: '',
//       // },
     
    
//     },
//   });

//   const [editingSection, setEditingSection] = useState(null);

//   const mseOptions = {
//     appearance: ['Neat', 'Disheveled', 'Inappropriate', 'Bizarre', 'Other'],

//     weight: ['Obese', 'Over-weight', 'Under-weight', 'Emaciated'],
//     hair: ['Bizarre style', 'Unnatural color', 'Unshaven'],
//     otherFeatures: ['Scars', 'Tattoos', 'Jewelry', 'Glasses', 'Dental braces'],
//     grooming: ['Disheveled', 'Soiled', 'Body odor', 'Halitosis'],
//     dress: ['Underdressed', 'Overdressed', 'Bizarre', 'Militaristic'],

//     walk: ['Gait/march', 'Limp', 'Shuffle','Assisted'],
//   combativeness: ['Cataplexy', 'Aggressive'],
//   repetition: ['Gestures','Twitches', 'Stereotypical', 'Automatism', 'Mimicry','Echopraxia'],
//   overactivity: ['Psychomotor Agitation', 'Hyperactivity', 'Tic', 'Sleepwalking','Compulsion'],
//   catatonia: ['Catalepsy','Exited', 'Stupor', 'Rigidity', 'Posturing', 'Cerea Flexibilitas', 'Negativism'],

//   rate: ['Rapid', 'Slow'],
//   intelligibility: ['Slurred', 'Mumbled', 'Stuttered', 'Accented'],
//   volume: ['Loud', 'Whispered'],
//   speechQuality: ['Hesitant','Emotional', 'Monotonous', 'Stereotypical', 'Unspontaneous', 'Echolalia', 'Verbigeria'],
//   speechQuantity: ['Garrulous','Talkative', 'Responsive', 'Taciturn', 'Mutism'],

//   attitudeToExaminer :['Seductive','Playful','Ingratiating','Friendly','Cooperative','Interested','Attentive','Frank','Indifferent','Evasive','Defensive','Hostile'],
  
//   mood: ['Ecstatic', 'Euphoric','Expansive','Elevated','Euthymic','Dysphoric','Anhedonic','Depressed','Alexithymic','Grieving', 'Anxious', 'Angry', 'Irritable', 'Other'],
//   affectiveExpression: ['Normal', 'Restricted','Blunted','Flat'],
//   appropriateness: ['Appropriate', 'Inappropriate','Labile'],

//   hallucinations: ['Hypnogogic','Hypnopompic', 'Auditory', 'Visual', 'Olfactory', 'Gustatory', 'Tactile', 'Somatic', 'Lilliputian', 'Mood-congruent', 'Mood-incongruent', 'Hallucinosis','Synesthesia', 'Trailing'],
//   disassociation: ['Hysterical anesthesia','Macropsia', 'Micropsia', 'Depersonalization', 'Derealization', 'Fugue',' Multiple personality'],
//   agnosia: ['Anosognosia', 'Autotopagnosia', 'Visual agnosia', 'Astereognosia', 'Prosopagnosia'],

//   contentOfThought: ['Poverty of thought', 'Overvalued idea', 'Trend of thought', 'Egomania', 'Monomania', 'Hypochondria', 'Obsession', 'Compulsion', 'Noesis', 'Unio mystica','Delusions'],
//  delusions0: ['Bizarre','Systematized', 'Mood-congruent', 'Mood-incongruent', 'Nihilistic', 'Somatic', 'Paranoid', 'Persecutory', 'Grandeur', 'Referential', 'Self-accusatory', 'Control','Thought withdrawal','Thought insertion','Thought broadcasting','Infidelity','Erotomania','Pseudologia fantastica'],

// preoccupationsSI:['Ideation history','Previous attempt/s','Current ideation','Impulsiveness','Viable plan','Available means','Settling of affairs'],
// hostileIntent:['Previous intimidation','History of violence','Current intent','Impulsiveness','Viable plan','Available means'],
//  phobia:['Simple','Social','Acrophobia','Agoraphobia','Claustrophobia','Xenophobia','Zoophobia'],
 
// general: [
//     'Mental disorder','Neurosis', 'Psychosis', 'Reality testing dis.','Illogical thinking',
//     'Dereism','Autistic thinking','Magical thinking','Concrete thinking','Abstract thinking'
//   ],
//   specific: ['Neologism', 'Word salad','Circumstantiality','Tangentiality','Incoherence','Perseveration','Condensation','Irrelevant answers','Loosening','Derailment','Flight of ideas','Clang association','Blocking','Glossolalia'],
//   disturbancesOfSpeech: ['Pressured','Voluble','Poverty of Speech','Poverty of Content','Dysprosody','Dysarthria'],
//   aphasicDisturbances: ['Motor', 'Sensory', 'Syntactical','Jargon', 'Global'],

//   consciousness: ['Disoriented', 'Clouding', 'Stupor','Delirium', 'Coma','Coma vigil','Twilight state','Dreamlike state','Somnolence'],
//  orientation: ['Time Disorientation', 'Place Disorientation', 'Person Disorientation'],

//  concentration: ['Serial 7’s inattention', 'Easily distracted', 'Often distracted'],
//  memory: ['Remote memory deficit', 'Recent past deficit', 'Recent memory deficit','Immediate recall deficit'],

//  attention: ['Distractible', 'Selective attention', 'Syntactical','Jargon', 'Global'],

//  suggestibility: ['Folie à deux', 'Hypnotized'],
//  memory2: ['Localized amnesia', 'Generalized amnesia','Selective amnesia','Continuous amnesia','Paramnesia','Fausse reconnaissance','Retro. falsification','Confabulation','Déjà entendu','Déjà pensé','Déjà vu','Jamais vu','Hypermnesia','Eidetic images'],

// intelligence: ['Mild retardation', 'Moderate retardation','Severe retardation','Profound retardation','Dementia','Pseudodementia'],

//     judgment: ['Critical', 'Automatic', 'Impaired'],

//     insight: ['Impaired insight', 'Denial of disorder', 'External locus of disorder','Intellectual insight','True insight'],

//     reliability: ['Reason to fake bad', 'Reason to fake good', 'Compulsory examination'],

//     globalFunctioning: ['10 Imminent harm','20 Possible harm','30 Serious Impairment','40 Major Impairment','50 Serious Symptoms','60 Moderate Symptoms','70 Mild Symptoms','80 Slight Impairment','90 No Symptoms','100 Superior Function'],

// otherEmotions:['Panicked','Fearful','Anxious','Tense','Agitated','Apathetic','Irritable','Angry'],
  
//   otherSigns:['Ambivalence',' Mood Swings'],
//   neuroVegetative:['Anorexia','Insomnia','Hypersomnia',' Diminished Libido','Constipation'],

//     speech: ['Normal', 'Tangential', 'Pressured', 'Impoverished', 'Other'],
//     eyeContact: ['Normal', 'Intense', 'Avoidant', 'Other'],
//     motorActivity: ['Normal', 'Restless', 'Tics', 'Slowed', 'Other'],
//     affect: ['Full', 'Constricted', 'Flat', 'Labile', 'Other'],

//     orientationImpairment: ['None', 'Place', 'Object', 'Person', 'Time'],
//     memoryImpairment: ['None', 'Short-Term', 'Long-Term', 'Other'],
//     //attention: ['Normal', 'Distracted', 'Other'],
//     //hallucinations: ['None', 'Auditory', 'Visual', 'Other'],
//     otherPerception: ['None', 'Derealization', 'Depersonalization', 'Other'],
//     suicidality: ['None', 'Ideation', 'Plan', 'Intent', 'Self-Harm'],
//     homicidality: ['None', 'Aggressive', 'Intent', 'Plan', 'Other'],
//     delusions: ['None', 'Grandiose', 'Paranoid', 'Religious', 'Other'],
//    // behavior: ['Cooperative', 'Guarded', 'Hyperactive', 'Agitated', 'Paranoid', 'Stereotyped', 'Aggressive', 'Bizarre', 'Withdrawn', 'Other'],


//   };

//   const handleCheckboxChange = (e, section, subSection) => {
//     const { value, checked } = e.target;
//     setPatient(prev => {
//       const currentOptions = prev.mentalStatusExam[section][subSection].options || [];
//       let updatedOptions;
//       if (checked) {
//         updatedOptions = [...new Set([...currentOptions, value])];
//       } else {
//         updatedOptions = currentOptions.filter(opt => opt !== value);
//       }
//       return {
//         ...prev,
//         mentalStatusExam: {
//           ...prev.mentalStatusExam,
//           [section]: {
//             ...prev.mentalStatusExam[section],
//             [subSection]: {
//               options: updatedOptions,
//             },
//           },
//         },
//       };
//     });
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

//     const handleInputTextNormal = (e, section) => {
//     const { value } = e.target;
//     setPatient(prev => ({
//       ...prev,
//       mentalStatusExam: {
//         ...prev.mentalStatusExam,
//         [section]: value
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
//           <h3 className="text-lg font-semibold text-gray-800 flex items-center uppercase">
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
//           <div key={key} className="border-b border-gray-200 pb-3 mb-3 last:border-b-0 last:mb-0 px-6">
//             {editingSection === sectionKey ? (
//               <div className="">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className="pr-4">
//                     <h4 className="text-md font-medium text-gray-700">{title}</h4>
//                   </div>
//                   <div className="col-span-2">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
//                       {mseOptions[key].map(option => (
//                         <label key={option} className="flex items-center">
//                           <input
//                             type="checkbox"
//                             name={`${sectionKey}.${key}.options`}
//                             value={option}
//                             checked={patient.mentalStatusExam[sectionKey][key].options.includes(option)}
//                             onChange={e => handleCheckboxChange(e, sectionKey, key)}
//                             className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
//                             aria-label={option}
//                           />
//                           <span className="ml-2 text-sm text-gray-700">{option}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className="pr-4">
//                     <h4 className="text-md font-medium text-gray-700">{title}</h4>
//                   </div>
//                   <div className="col-span-2">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
//                       {mseOptions[key].map(option => (
//                         <label key={option} className="flex items-center">
//                           <input
//                             type="checkbox"
//                             name={`${sectionKey}.${key}.options`}
//                             value={option}
//                             checked={patient.mentalStatusExam[sectionKey][key].options.includes(option)}
//                             disabled
//                             className="h-4 w-4 text-sky-600 border-gray-300"
//                             aria-label={option}
//                           />
//                           <span
//                             className={`ml-2 text-sm ${
//                               patient.mentalStatusExam[sectionKey][key].options.includes(option)
//                                 ? 'text-sky-600 font-medium'
//                                 : 'text-gray-700'
//                             }`}
//                           >
//                             {option}
//                           </span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//         <div className="px-6 pb-4">
//           {editingSection === sectionKey && (
//             <h4 className="text-lg font-medium text-gray-700 mb-2">Comments:</h4>
//           )}
//           {editingSection === sectionKey ? (
//             <textarea
//               value={patient.mentalStatusExam[sectionKey].comments}
//               onChange={e => handleCommentChange(e, sectionKey)}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
//               rows="3"
//               placeholder="Enter comments"
//               aria-label={`${title} comments`}
//             />
//           ) : (
//             <p>
//               <strong>Comments:</strong> {patient.mentalStatusExam[sectionKey].comments || 'N/A'}
//             </p>
//           )}
//         </div>
//       </section>
//     );
//   };

//   const renderSectionMood = (title, sectionKey, subSections) => {
//     return (
//       <section className="mb-8 rounded-lg border border-gray-200">
//         <div className="flex justify-between items-center mb-4 px-6 py-2 bg-slate-200">
//           <h3 className="text-xl font-semibold text-gray-800 flex items-center uppercase">
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
//         {subSections.map(({ key, title,nested }) => (
//           <div key={key} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0 px-6">
//             <h4 className="text-lg font-medium text-gray-700 mb-2">{title}</h4>
//             {editingSection === sectionKey ? (
//               <div className="space-y-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
//                   {mseOptions[key].map(option => (
//                     <label key={option} className="flex items-center">
//                       <input
//                         type="checkbox"
//                         name={`${sectionKey}.${key}.options`}
//                         value={option}
//                         checked={patient.mentalStatusExam[sectionKey][key].options.includes(option)}
//                         onChange={e => handleCheckboxChange(e, sectionKey, key)}
//                         className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
//                         aria-label={option}
//                       />
//                       <span className="ml-2 text-sm text-gray-700">{option}</span>
//                     </label>
//                   ))}
//                 </div>
//                 {nested}
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
//                   {mseOptions[key].map(option => (
//                     <label key={option} className="flex items-center">
//                       <input
//                         type="checkbox"
//                         name={`${sectionKey}.${key}.options`}
//                         value={option}
//                         checked={patient.mentalStatusExam[sectionKey][key].options.includes(option)}
//                         disabled
//                         className="h-4 w-4 text-sky-600 border-gray-300"
//                         aria-label={option}
//                       />
//                       <span
//                         className={`ml-2 text-sm ${
//                           patient.mentalStatusExam[sectionKey][key].options.includes(option)
//                             ? 'text-sky-600 font-medium'
//                             : 'text-gray-700'
//                         }`}
//                       >
//                         {option}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//                 {nested}
//               </div>
//             )}
//           </div>
//         ))}
//         <div className="px-6 pb-4">
//           {editingSection === sectionKey && (
//             <h4 className="text-lg font-medium text-gray-700 mb-2">Comments:</h4>
//           )}
//           {editingSection === sectionKey ? (
//             <textarea
//               value={patient.mentalStatusExam[sectionKey].comments}
//               onChange={e => handleCommentChange(e, sectionKey)}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
//               rows="3"
//               placeholder="Enter comments"
//               aria-label={`${title} comments`}
//             />
//           ) : (
//             <p>
//               <strong>Comments:</strong> {patient.mentalStatusExam[sectionKey].comments || 'N/A'}
//             </p>
//           )}
//         </div>
//       </section>
//     );
//   };

//   const circumstanceOfPresentation = (sectionKey) => {
//     return (
//       <section className="mb-8 rounded-lg border border-gray-200">
       
//           <div className="flex justify-between items-center mb-4 px-6 py-2 bg-slate-200">
//           <h3 className="text-xl font-semibold text-gray-800 flex items-center uppercase">
//           Circumstance of presentation
//           </h3>
//           <button
//             onClick={() => toggleSectionEdit(sectionKey)}
//             className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
//             aria-label={editingSection === sectionKey ? `Save Circumstance of presentation` : `Edit Circumstance of presentation`}
//           >
//             <FaEdit className="mr-2" />
//             {editingSection === sectionKey ? 'Save' : 'Edit'}
//           </button>
//         </div>

//           <div  className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0 px-6">
       
//               <div className="space-y-4">

//  {editingSection === sectionKey ? (
//                       <textarea
//             value={patient.mentalStatusExam.circumstanceOfPresentation}
//             onChange={e => handleInputTextNormal(e, 'circumstanceOfPresentation')}
//             className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
//             rows="3"
//             placeholder="Enter Circumstance of presentation"
//             aria-label={`Circumstance of presentation`}
//           />
               
//         ) : (
//           <p>
//              {patient.mentalStatusExam.circumstanceOfPresentation || 'N/A'}
//           </p>
//         )}

                
              
//               </div>
            
             
//           </div>
        
     
//       </section>
//     );
//   };


//     const indicationsAndRecommendations = (sectionKey) => {
//     return (
//       <section className="mb-8 rounded-lg border border-gray-200">
       
//           <div className="flex justify-between items-center mb-4 px-6 py-2 bg-slate-200">
//           <h3 className="text-xl font-semibold text-gray-800 flex items-center uppercase">
//          Indications & Recommendations
//           </h3>
//           <button
//             onClick={() => toggleSectionEdit(sectionKey)}
//             className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
//             aria-label={editingSection === sectionKey ? `Save Circumstance of presentation` : `Edit Circumstance of presentation`}
//           >
//             <FaEdit className="mr-2" />
//             {editingSection === sectionKey ? 'Save' : 'Edit'}
//           </button>
//         </div>

//           <div  className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0 px-6">
       
//               <div className="space-y-4">

//  {editingSection === sectionKey ? (
//                       <textarea
//             value={patient.mentalStatusExam.indicationsAndRecommendations}
//             onChange={e => handleInputTextNormal(e, 'indicationsAndRecommendations')}
//             className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
//             rows="3"
//             placeholder="Indications & Recommendations"
//             aria-label={`Indications & Recommendations`}
//           />
               
//         ) : (
//           <p>
//              {patient.mentalStatusExam.indicationsAndRecommendations || 'N/A'}
//           </p>
//         )}
   
//               </div>   
//           </div>
      
//       </section>
//     );
//   };


//   // New renderSectionWithNested function to handle nested subsections
// const renderSectionWithNested = (title, sectionKey, subSections) => {
//   return (
//     <section className="mb-8 rounded-lg border border-gray-200">
//       <div className="flex justify-between items-center mb-4 px-6 py-2 bg-slate-200">
//         <h3 className="text-lg font-semibold text-gray-800 flex items-center uppercase">
//           {title}
//         </h3>
//         <button
//           onClick={() => toggleSectionEdit(sectionKey)}
//           className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
//           aria-label={editingSection === sectionKey ? `Save ${title}` : `Edit ${title}`}
//         >
//           <FaEdit className="mr-2" />
//           {editingSection === sectionKey ? 'Save' : 'Edit'}
//         </button>
//       </div>
//       {subSections.map(({ key, title }) => (
//         <div key={key} className="border-b border-gray-200 pb-3 mb-3 last:border-b-0 last:mb-0 px-6">
//           {editingSection === sectionKey ? (
//             <div className="">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {title && <div className="pr-4">
//                   <h4 className="text-md font-medium text-gray-700">{title}</h4>
//                 </div>}
//                 <div className={`${title ? 'col-span-2': 'col-span-3'}`}>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
//                     {mseOptions[key].map(option => (
//                       <label key={option} className="flex items-center">
//                         <input
//                           type="checkbox"
//                           name={`${sectionKey}.${key}.options`}
//                           value={option}
//                           checked={patient.mentalStatusExam[sectionKey][key].options.includes(option)}
//                           onChange={e => handleCheckboxChange(e, sectionKey, key)}
//                           className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
//                           aria-label={option}
//                         />
//                         <span className="ml-2 text-sm text-gray-700">{option}</span>
//                       </label>
//                     ))}
//                   </div>
//                   {/* Nested Delusions section when 'Delusions' is checked */}
//                   {key === 'contentOfThought' &&
//                     patient.mentalStatusExam.contentOfThought.contentOfThought.options.includes('Delusions') && (
//                       <div className="mt-4 border p-4">
//                         <h4 className="text-md font-bold text-gray-700">Delusions</h4>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-2">
//                           {mseOptions.delusions0.map(option => (
//                             <label key={option} className="flex items-center">
//                               <input
//                                 type="checkbox"
//                                 name={`delusions0.delusions0.options`}
//                                 value={option}
//                                 checked={patient.mentalStatusExam.delusions0.delusions0.options.includes(option)}
//                                 onChange={e => handleCheckboxChange(e, 'delusions0', 'delusions0')}
//                                 className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
//                                 aria-label={option}
//                               />
//                               <span className="ml-2 text-sm text-gray-700">{option}</span>
//                             </label>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {title && <div className="pr-4">
//                   <h4 className="text-md font-medium text-gray-700">{title}</h4>
//                 </div>}
//                   <div className={`${title ? 'col-span-2': 'col-span-3'}`}>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
//                     {mseOptions[key].map(option => (
//                       <label key={option} className="flex items-center">
//                         <input
//                           type="checkbox"
//                           name={`${sectionKey}.${key}.options`}
//                           value={option}
//                           checked={patient.mentalStatusExam[sectionKey][key].options.includes(option)}
//                           disabled
//                           className="h-4 w-4 text-sky-600 border-gray-300"
//                           aria-label={option}
//                         />
//                         <span
//                           className={`ml-2 text-sm ${
//                             patient.mentalStatusExam[sectionKey][key].options.includes(option)
//                               ? 'text-sky-600 font-medium'
//                               : 'text-gray-700'
//                           }`}
//                         >
//                           {option}
//                         </span>
//                       </label>
//                     ))}
//                   </div>
//                   {/* Display Delusions when not editing */}
//                   {key === 'contentOfThought' &&
//                     patient.mentalStatusExam.contentOfThought.contentOfThought.options.includes('Delusions') && (
//                       <div className="mt-4 ml-6">
//                         <h4 className="text-md font-medium text-gray-700">Delusion Type</h4>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-2">
//                           {mseOptions.delusions0.map(option => (
//                             <label key={option} className="flex items-center">
//                               <input
//                                 type="checkbox"
//                                 name={`delusions0.delusions0.options`}
//                                 value={option}
//                                 checked={patient.mentalStatusExam.delusions0.delusions0.options.includes(option)}
//                                 disabled
//                                 className="h-4 w-4 text-sky-600 border-gray-300"
//                                 aria-label={option}
//                               />
//                               <span
//                                 className={`ml-2 text-sm ${
//                                   patient.mentalStatusExam.delusions0.delusions0.options.includes(option)
//                                     ? 'text-sky-600 font-medium'
//                                     : 'text-gray-700'
//                                 }`}
//                               >
//                                 {option}
//                               </span>
//                             </label>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//       <div className="px-6 pb-4">
//         {editingSection === sectionKey && (
//           <h4 className="text-lg font-medium text-gray-700 mb-2">Comments:</h4>
//         )}
//         {editingSection === sectionKey ? (
//           <textarea
//             value={patient.mentalStatusExam[sectionKey].comments}
//             onChange={e => handleCommentChange(e, sectionKey)}
//             className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
//             rows="3"
//             placeholder="Enter comments"
//             aria-label={`${title} comments`}
//           />
//         ) : (
//           <p>
//             <strong>Comments:</strong> {patient.mentalStatusExam[sectionKey].comments || 'N/A'}
//           </p>
//         )}
//       </div>
//     </section>
//   );
// };





//   return (
//     <div className="px-6 bg-gray-50 min-h-screen">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-6">
//         <h3 className="flex items-center text-2xl font-bold text-gray-800">
//           <FaBrain className="mr-3" size={32} />
//           Mental Status Exam
//         </h3>
//         <div>
//           <strong>Form Date:</strong> {patient.formDate || 'N/A'}
//         </div>
//         <div>
//           <strong>Last Modified:</strong> {patient.formDate || 'N/A'}
//         </div>
//       </div>

// {circumstanceOfPresentation()}

//       {renderSection('Appearance', 'appearance', [
//   { key: 'weight', title: 'Weight' },
//   { key: 'hair', title: 'Hair' },
//   { key: 'otherFeatures', title: 'Other Features' },
//   { key: 'grooming', title: 'Grooming' },
//   { key: 'dress', title: 'Dress' },
// ])}

// {renderSection('Behavior', 'behavior', [
//   { key: 'walk', title: 'Walk' },
//   { key: 'combativeness', title: 'Combativeness' },
//   { key: 'repetition', title: 'Repetition' },
//   { key: 'overactivity', title: 'Overactivity' },
//   { key: 'catatonia', title: 'Catatonia' },
// ])}

// {renderSection('Speech', 'speech', [
//   { key: 'rate', title: 'Rate' },
//   { key: 'intelligibility', title: 'Intelligibility' },
//   { key: 'volume', title: 'Volume' },
//   { key: 'speechQuality', title: 'Speech Quality' },
//   { key: 'speechQuantity', title: 'Speech Quantity' },
// ])}

// {renderSectionMood('Attitude to Examiner ', 'attitudeToExaminer', [{ key: 'attitudeToExaminer', title: '' }])}

// {renderSection('Mood and Affect', 'moodAndAffect', [
//         { key: 'mood', title: 'Mood' },
//         { key: 'otherEmotions', title: 'Other Emotions' },
//         { key: 'otherSigns', title: 'Other Signs' },
//         { key: 'neuroVegetative', title: 'Neuro Vegetative' },
//       ])}


// {renderSectionMood('Affective Expression', 'affectiveExpression', [
//         { key: 'affectiveExpression', title: '' },
//       ])}

// {renderSectionMood('Appropriateness', 'appropriateness', [
//         { key: 'appropriateness', title: '' }
//       ])}


// {renderSectionMood('Hallucinations', 'hallucinations', [
//         { key: 'hallucinations', title: '' }
//       ])}
// {renderSectionMood('Disassociation', 'disassociation', [
//         { key: 'disassociation', title: '' }
//       ])}

// {renderSectionMood('Agnosia', 'agnosia', [
//         { key: 'agnosia', title: '' }
//       ])}


// {/* {renderSectionMood('Content of Thought', 'contentOfThought', [
//   { 
//     key: 'contentOfThought', 
//     title: '',
    
//   },
// ])} */}

// {
//   renderSectionWithNested('Content of Thought', 'contentOfThought', [
//     { key: 'contentOfThought', title: '' },
//      { key: 'preoccupationsSI', title: 'Preoccupations Suicidal Ideation' },
// { key: 'hostileIntent', title: 'Hostile Intent' },
//     { key: 'phobia', title: 'Phobia' }, 

//   ])
// }

// {renderSection('Thought Form', 'thoughtForm', [
//         { key: 'general', title: 'General' },
//         { key: 'specific', title: 'Specific' },
//         { key: 'disturbancesOfSpeech', title: 'Disturbances of speech' },
//         { key: 'aphasicDisturbances', title: 'Aphasic Disturbances' },
//       ])}


// {renderSectionMood('Consciousness', 'consciousness', [
//         { key: 'consciousness', title: '' }
//       ])}

// {renderSectionMood('Orientation', 'orientation', [
//         { key: 'orientation', title: '' }
//       ])}

//       {renderSectionMood('Concentration', 'concentration', [
//         { key: 'concentration', title: '' }
//       ])}

//       {renderSectionMood('Memory', 'memory', [
//         { key: 'memory', title: '' }
//       ])}

//      {renderSection('Information & Intelligence', 'informationAndIntelligence', [
//         { key: 'attention', title: 'Attention' },
//           { key: 'suggestibility', title: 'suggestibility' },
//           { key: 'memory2', title: 'Memory' },
//            { key: 'intelligence', title: 'Intelligence' },
//       ])}

//   {renderSection('Judgment', 'judgment', [{ key: 'judgment', title: 'Judgment' }])}

//       {renderSection('Insight', 'insight', [{ key: 'insight', title: 'Insight' }])}
       
//        {renderSectionMood('Reliability', 'reliability', [{ key: 'reliability', title: '' }])}
    
//   {renderSection('Summary', 'summary', [{ key: 'globalFunctioning', title: 'Global Functioning' }])}
       
//        {indicationsAndRecommendations()}
//     </div>
//   );
// };

// export default MentalStatusExam;