import React, { useEffect, useRef, useState } from 'react';
import { FaBalanceScale, FaBook, FaBrain, FaBullseye, FaClipboard, FaComment, FaEye, FaEyeSlash, FaHandshake, FaLightbulb, FaMapMarkedAlt, FaMeh, FaProjectDiagram, FaShieldAlt, FaSmile, FaStethoscope, FaStream, FaUser, FaUserClock, FaUserFriends, FaUserSecret, FaUserTie, FaWalking } from 'react-icons/fa';
import { addMentalStatusExam, getMentalStatusExam, updateMentalStatusExam } from '../../functions/patient';
import moment from 'moment';
import LoadingSpinner from '../LoadingSpinner';
import VoiceToText from '../VoiceToText';
import EditButton from '../EditButton';
import MessageModel from '../MessageModel';


const printCss = `
  .print-preview {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    max-width: 210mm;
    margin: 0 auto;
    padding: 15mm;
    background: #fff;
  }

  .print-preview .section-title {
    font-size: 18px;
    font-weight: bold;
    margin: 20px 0 10px;
    padding-bottom: 5px;
    border-bottom: 2px solid #0ea5e9;
  }
  .print-preview .info-box {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #6b7280;
    font-style: italic;
    margin: 10px 0;
  }
  .print-preview .field-box {
    background-color: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 12px;
  }
  .print-preview .field-label {
    font-weight: 600;
    color: #374151;
    margin-bottom: 4px;
    display: block;
  }
  .print-preview .field-value {
    white-space: pre-line;
    color: #1f2937;
  }
  .print-preview .checkbox-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 8px;
    margin-top: 6px;
  }
  .print-preview .checkbox-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
  }
  .print-preview .checkbox-item.checked {
    color: #0ea5e9;
    font-weight: 500;
  }
  .print-preview .checkbox-item .check {
    width: 16px;
    height: 16px;
    border: 2px solid #d1d5db;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .print-preview .checkbox-item.checked .check {
    background-color: #0ea5e9;
    border-color: #0ea5e9;
  }
  .print-preview .checkbox-item.checked .check svg {
    width: 10px;
    height: 10px;
    color: white;
  }

  @media print {
    @page { size: A4; margin: 1cm; }
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .print-preview .page-break { page-break-before: always; }
  }

  @media screen {
    .print-preview .page-break { 
      break-before: page;
      margin-top: 30mm;
    }
  }
`;

const PrintMentalStatusExamA4 = ({ mse, printPreviewMode = true }) => {
  if (!printPreviewMode) return null;

  const renderOptions = (options = []) => {
    if (!options.length) return <span className="text-gray-500 italic">N/A</span>;
    return (
      <div className="checkbox-grid">
        {options.map((opt) => (
          <div key={opt} className="checkbox-item checked">
            <div className="check">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>{opt}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderValue = (value) => {
    return value ? <div className="field-value">{value}</div> : <span className="text-gray-500 italic">N/A</span>;
  };

  const renderField = (label, options, comment) => (
    <div className="field-box">
      <span className="field-label">{label}</span>
      {renderOptions(options)}
      {comment && (
        <div className="mt-3">
          <strong className="text-sm text-gray-600">Comment:</strong>
          <div className="field-value mt-1">{comment}</div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: printCss }} />

      <div className="print-preview">

        {/* ========== PAGE 1: Header + Circumstance ========== */}
        <div>
          <h2 className="mb-3 pb-1 text-xl text-center font-bold text-sky-800">Mental Status Examination</h2>

          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <strong>Form Date:</strong> {mse.formDate ? moment(mse.formDate).format("DD MMM YYYY") : "N/A"}
            </div>
            <div className="text-right">
              <strong>Last Modified:</strong> {mse.lastModified ? moment(mse.lastModified).format("DD MMM YYYY HH:mm") : "N/A"}
            </div>
          </div>

          <div className="section-title">Circumstance of Presentation</div>
          <div className="field-box">
            {renderValue(mse.circumstanceOfPresentation)}
          </div>
        </div>

        {/* ========== PAGE 2: Appearance & Behavior ========== */}
        <div className="page-break">
          <div className="section-title">Appearance</div>
          {renderField("Weight", mse.appearance?.weight?.options, mse.appearance?.comments)}
          {renderField("Hair", mse.appearance?.hair?.options)}
          {renderField("Other Features", mse.appearance?.otherFeatures?.options)}
          {renderField("Grooming", mse.appearance?.grooming?.options)}
          {renderField("Dress", mse.appearance?.dress?.options)}

          <div className="section-title">Behavior</div>
          {renderField("Walk", mse.behavior?.walk?.options, mse.behavior?.comments)}
          {renderField("Combativeness", mse.behavior?.combativeness?.options)}
          {renderField("Repetition", mse.behavior?.repetition?.options)}
          {renderField("Overactivity", mse.behavior?.overactivity?.options)}
          {renderField("Catatonia", mse.behavior?.catatonia?.options)}
        </div>

        {/* ========== PAGE 3: Speech & Attitude ========== */}
        <div className="page-break">
          <div className="section-title">Speech</div>
          {renderField("Rate", mse.speech?.rate?.options, mse.speech?.comments)}
          {renderField("Intelligibility", mse.speech?.intelligibility?.options)}
          {renderField("Volume", mse.speech?.volume?.options)}
          {renderField("Speech Quality", mse.speech?.speechQuality?.options)}
          {renderField("Speech Quantity", mse.speech?.speechQuantity?.options)}

          <div className="section-title">Attitude to Examiner</div>
          {renderField("", mse.attitudeToExaminer?.attitudeToExaminer?.options)}
        </div>

        {/* ========== PAGE 4: Mood, Affect, Hallucinations ========== */}
        <div className="page-break">
          <div className="section-title">Mood and Affect</div>
          {renderField("Mood", mse.moodAndAffect?.mood?.options, mse.moodAndAffect?.comments)}
          {renderField("Other Emotions", mse.moodAndAffect?.otherEmotions?.options)}
          {renderField("Other Signs", mse.moodAndAffect?.otherSigns?.options)}
          {renderField("Neurovegetative", mse.moodAndAffect?.neuroVegetative?.options)}

          <div className="section-title">Affective Expression</div>
          {renderField("", mse.affectiveExpression?.affectiveExpression?.options)}

          <div className="section-title">Appropriateness</div>
          {renderField("", mse.appropriateness?.appropriateness?.options)}

          <div className="section-title">Hallucinations</div>
          {renderField("", mse.hallucinations?.hallucinations?.options, mse.hallucinations?.comments)}
        </div>

        {/* ========== PAGE 5: Thought & Perception ========== */}
        <div className="page-break">
          <div className="section-title">Disassociation</div>
          {renderField("", mse.disassociation?.disassociation?.options, mse.disassociation?.comments)}

          <div className="section-title">Agnosia</div>
          {renderField("", mse.agnosia?.agnosia?.options, mse.agnosia?.comments)}

          <div className="section-title">Content of Thought</div>
          {renderField("", mse.contentOfThought?.contentOfThought?.options, mse.contentOfThought?.comments)}
          {renderField("Preoccupations (SI)", mse.contentOfThought?.preoccupationsSI?.options)}
          {renderField("Hostile Intent", mse.contentOfThought?.hostileIntent?.options)}
          {renderField("Phobia", mse.contentOfThought?.phobia?.options)}

          {mse.contentOfThought?.contentOfThought?.options?.includes("Delusions") && (
            <div className="field-box mt-4 ml-6 border-l-4 border-sky-300 pl-4">
              <span className="field-label">Delusion Types</span>
              {renderOptions(mse.delusions0?.delusions0?.options)}
            </div>
          )}
        </div>

        {/* ========== PAGE 6: Thought Form & Cognitive ========== */}
        <div className="page-break">
          <div className="section-title">Thought Form</div>
          {renderField("General", mse.thoughtForm?.general?.options, mse.thoughtForm?.comments)}
          {renderField("Specific", mse.thoughtForm?.specific?.options)}
          {renderField("Disturbances of Speech", mse.thoughtForm?.disturbancesOfSpeech?.options)}
          {renderField("Aphasic Disturbances", mse.thoughtForm?.aphasicDisturbances?.options)}

          <div className="section-title">Consciousness</div>
          {renderField("", mse.consciousness?.consciousness?.options, mse.consciousness?.comments)}

          <div className="section-title">Orientation</div>
          {renderField("", mse.orientation?.orientation?.options, mse.orientation?.comments)}

          <div className="section-title">Concentration</div>
          {renderField("", mse.concentration?.concentration?.options, mse.concentration?.comments)}

          <div className="section-title">Memory</div>
          {renderField("", mse.memory?.memory?.options, mse.memory?.comments)}
        </div>

        {/* ========== PAGE 7: Intelligence, Judgment, Insight ========== */}
        <div className="page-break">
          <div className="section-title">Information & Intelligence</div>
          {renderField("Attention", mse.informationAndIntelligence?.attention?.options, mse.informationAndIntelligence?.comments)}
          {renderField("Suggestibility", mse.informationAndIntelligence?.suggestibility?.options)}
          {renderField("Memory", mse.informationAndIntelligence?.memory2?.options)}
          {renderField("Intelligence", mse.informationAndIntelligence?.intelligence?.options)}

          <div className="section-title">Judgment</div>
          {renderField("", mse.judgment?.judgment?.options, mse.judgment?.comments)}

          <div className="section-title">Insight</div>
          {renderField("", mse.insight?.insight?.options, mse.insight?.comments)}

          <div className="section-title">Reliability</div>
          {renderField("", mse.reliability?.reliability?.options, mse.reliability?.comments)}
        </div>

        {/* ========== PAGE 8: Summary & Recommendations ========== */}
        <div className="page-break">
          <div className="section-title">Summary</div>
          {renderField("Global Functioning", mse.summary?.globalFunctioning?.options, mse.summary?.comments)}

          <div className="section-title">Indications & Recommendations</div>
          <div className="field-box">
            {renderValue(mse.indicationsAndRecommendations)}
          </div>
        </div>
      </div>
    </>
  );
};



const MentalStatusExam = ({id,refreshTabDetails,printPreviewMode}) => {
  const [isAddMode, setIsAddMode] = useState(true);
  const [patient, setPatient] = useState({
  mentalStatusExam: {
    circumstanceOfPresentation: '',
    indicationsAndRecommendations: '',
    appearance: {
      appearance: { options: [] },
      weight: { options: [] },
      hair: { options: [] },
      otherFeatures: { options: [] },
      grooming: { options: [] },
      dress: { options: [] },
      comments: '',
    },
    behavior: {
      walk: { options: [] },
      combativeness: { options: [] },
      repetition: { options: [] },
      overactivity: { options: [] },
      catatonia: { options: [] },
      comments: '',
    },
    speech: {
      rate: { options: [] },
      intelligibility: { options: [] },
      volume: { options: [] },
      speechQuality: { options: [] },
      speechQuantity: { options: [] },
      comments: '',
    },
    attitudeToExaminer: {
      attitudeToExaminer: { options: [] },
    },
    moodAndAffect: {
      mood: { options: [] },
      otherEmotions: { options: [] },
      otherSigns: { options: [] },
      neuroVegetative: { options: [] },
      comments: '',
    },
    affectiveExpression: {
      affectiveExpression: { options: [] },
    },
    appropriateness: {
      appropriateness: { options: [] },
    },
    hallucinations: {
      hallucinations: { options: [] },
      comments: '',
    },
    disassociation: {
      disassociation: { options: [] },
      comments: '',
    },
    agnosia: {
      agnosia: { options: [] },
      comments: '',
    },
    contentOfThought: {
      contentOfThought: { options: [] },
      preoccupationsSI: { options: [] },
      hostileIntent: { options: [] },
      phobia: { options: [] },
      comments: '',
    },
    delusions0: {
      delusions0: { options: [] },
      comments: '',
    },
    thoughtForm: {
      general: { options: [] },
      specific: { options: [] },
      disturbancesOfSpeech: { options: [] },
      aphasicDisturbances: { options: [] },
      comments: '',
    },
    consciousness: {
      consciousness: { options: [] },
      comments: '',
    },
    orientation: {
      orientation: { options: [] },
      comments: '',
    },
    concentration: {
      concentration: { options: [] },
      comments: '',
    },
    memory: {
      memory: { options: [] },
      comments: '',
    },
    informationAndIntelligence: {
      attention: { options: [] },
      suggestibility: { options: [] },
      memory2: { options: [] },
      intelligence: { options: [] },
      comments: '',
    },
    judgment: {
      judgment: { options: [] },
      comments: '',
    },
    insight: {
      insight: { options: [] },
      comments: '',
    },
    reliability: {
      reliability: { options: [] },
      comments: '',
    },
    summary: {
      globalFunctioning: { options: [] },
      comments: '',
    },
    generalObservations: {
      appearance: { options: [] },
      speech: { options: [] },
      eyeContact: { options: [] },
      motorActivity: { options: [] },
      affect: { options: [] },
      comments: '',
    },
    cognition: {
      orientationImpairment: { options: [] },
      memoryImpairment: { options: [] },
      attention: { options: [] },
      comments: '',
    },
    thoughts: {
      suicidality: { options: [] },
      homicidality: { options: [] },
      delusions: { options: [] },
      comments: '',
    },
  },
});

 
  const [initialPatientInformation, setInitialPatientInformation] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
const [isReady, setIsReady] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIsReady(true);
    }, 1000);

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const [isSaving,setIsSaving]=useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    type: "error",
  });

const patientId=id;
   // Loading data function
  const loadMentalStatusExam = async () => {
    try {
      setIsLoading(true);
      const response = await getMentalStatusExam(patientId);
        const mseData = response.data;

    if (mseData.error) {
      console.log("patientData.error", mseData.error);
      setModal({
        isOpen: true,
        message: mseData.error.message,
        type: "error",
      });
    }
          
  if (mseData) {
      setEditingSection(null);
    }

    console.log("loadMentalStatusExam:", mseData);

        setPatient(prev => ({
          ...prev,
          mentalStatusExam: {
            circumstanceOfPresentation: mseData.circumstanceOfPresentation || prev.mentalStatusExam.circumstanceOfPresentation,
            indicationsAndRecommendations: mseData.indicationsAndRecommendations || prev.mentalStatusExam.indicationsAndRecommendations,
            appearance: mseData.appearance || prev.mentalStatusExam.appearance,
            affectiveExpression: mseData.affectiveExpression || prev.mentalStatusExam.affectiveExpression,
            behavior: mseData.behavior || prev.mentalStatusExam.behavior,
            speech: mseData.speech || prev.mentalStatusExam.speech,
            attitudeToExaminer: mseData.attitudeToExaminer || prev.mentalStatusExam.attitudeToExaminer,
            moodAndAffect: mseData.moodAndAffect || prev.mentalStatusExam.moodAndAffect,
            appropriateness: mseData.appropriateness || prev.mentalStatusExam.appropriateness,
            hallucinations: mseData.hallucinations || prev.mentalStatusExam.hallucinations,
            disassociation: mseData.disassociation || prev.mentalStatusExam.disassociation,
            agnosia: mseData.agnosia || prev.mentalStatusExam.agnosia,
            contentOfThought: mseData.contentOfThought || prev.mentalStatusExam.contentOfThought,
            delusions0: mseData.delusions0 || prev.mentalStatusExam.delusions0,
            thoughtForm: mseData.thoughtForm || prev.mentalStatusExam.thoughtForm,
            consciousness: mseData.consciousness || prev.mentalStatusExam.consciousness,
            orientation: mseData.orientation || prev.mentalStatusExam.orientation,
            concentration: mseData.concentration || prev.mentalStatusExam.concentration,
            memory: mseData.memory || prev.mentalStatusExam.memory,
            informationAndIntelligence: mseData.informationAndIntelligence || prev.mentalStatusExam.informationAndIntelligence,
            judgment: mseData.judgment || prev.mentalStatusExam.judgment,
            insight: mseData.insight || prev.mentalStatusExam.insight,
            reliability: mseData.reliability || prev.mentalStatusExam.reliability,
            summary: mseData.summary || prev.mentalStatusExam.summary,
            generalObservations: mseData.generalObservations || prev.mentalStatusExam.generalObservations,
            cognition: mseData.cognition || prev.mentalStatusExam.cognition,
            thoughts: mseData.thoughts || prev.mentalStatusExam.thoughts
          },
          formDate: mseData.formDate || prev.formDate,
          lastModified: mseData.lastModified || prev.lastModified
        }));
        setIsAddMode(!mseData.mseId); // Set to false if data exists
   
    } catch (error) {
      console.error('Error loading MSE data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    if (patientId) {
      loadMentalStatusExam();
    }
  }, [patientId]);


    useEffect(() => {
      console.log('setInitialPatientInformation')
    setInitialPatientInformation({ ...patient });
  }, [editingSection]);
  

  const [isLoading,setIsLoading]=useState(false);


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

  // const handleCheckboxChange = (e, section, subSection) => {
  //   const { value, checked } = e.target;
  //   setPatient(prev => {
  //     const currentOptions = prev.mentalStatusExam[section][subSection].options || [];
  //     let updatedOptions;
  //     if (checked) {
  //       updatedOptions = [...new Set([...currentOptions, value])];
  //     } else {
  //       updatedOptions = currentOptions.filter(opt => opt !== value);
  //     }
  //     return {
  //       ...prev,
  //       mentalStatusExam: {
  //         ...prev.mentalStatusExam,
  //         [section]: {
  //           ...prev.mentalStatusExam[section],
  //           [subSection]: {
  //             options: updatedOptions,
  //           },
  //         },
  //       },
  //     };
  //   });
  // };

  const handleCheckboxChange = (e, section, subSection) => {
  const { value, checked } = e.target;
  setPatient(prev => {
    // Ensure the section and subSection exist in the state
    const currentSection = prev.mentalStatusExam[section] || {};
    const currentSubSection = currentSection[subSection] || { options: [] };
    const currentOptions = currentSubSection.options || [];
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
          ...currentSection,
          [subSection]: {
            ...currentSubSection,
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

  // const handleSubmitSection = (section) => {
  //   const payload = createSectionPayload(section);
  //   console.log(`Saving ${section} section payload:`, payload);
  //   setEditingSection(null);
  // };

    const handleSubmitSection = async (section) => {
    setIsLoading(true);
    setIsSaving(true);
    const payload = {
      circumstanceOfPresentation: patient.mentalStatusExam.circumstanceOfPresentation,
      indicationsAndRecommendations: patient.mentalStatusExam.indicationsAndRecommendations,
      appearance: patient.mentalStatusExam.appearance,
      affectiveExpression: patient.mentalStatusExam.affectiveExpression,
      behavior: patient.mentalStatusExam.behavior,
      speech: patient.mentalStatusExam.speech,
      attitudeToExaminer: patient.mentalStatusExam.attitudeToExaminer,
      moodAndAffect: patient.mentalStatusExam.moodAndAffect,
      appropriateness: patient.mentalStatusExam.appropriateness,
      hallucinations: patient.mentalStatusExam.hallucinations,
      disassociation: patient.mentalStatusExam.disassociation,
      agnosia: patient.mentalStatusExam.agnosia,
      contentOfThought: patient.mentalStatusExam.contentOfThought,
      delusions0: patient.mentalStatusExam.delusions0,
      thoughtForm: patient.mentalStatusExam.thoughtForm,
      consciousness: patient.mentalStatusExam.consciousness,
      orientation: patient.mentalStatusExam.orientation,
      concentration: patient.mentalStatusExam.concentration,
      memory: patient.mentalStatusExam.memory,
      informationAndIntelligence: patient.mentalStatusExam.informationAndIntelligence,
      judgment: patient.mentalStatusExam.judgment,
      insight: patient.mentalStatusExam.insight,
      reliability: patient.mentalStatusExam.reliability,
      summary: patient.mentalStatusExam.summary,
      generalObservations: patient.mentalStatusExam.generalObservations,
      cognition: patient.mentalStatusExam.cognition,
      thoughts: patient.mentalStatusExam.thoughts,
      isConfirm: 1,
    };

    try {
      const res = await updateMentalStatusExam(patientId,payload);
    
    
         console.log("update result:", res);

        if (res.data.error) {
          setModal({
            isOpen: true,
            message: res.data.error.message,
            type: "error",
          });
          setIsSaving(false);
          return;
        }

        if (res.data.outputValues.responseStatus === "failed") {
          setModal({
            isOpen: true,
            message: res.data.outputValues.outputMessage,
            type: "warning",
          });
          setIsSaving(false);
          return;
        }

  
        await loadMentalStatusExam();
setIsSaving(false);


      //      setModal({
      //   isOpen: true,
      //   message: res.data.outputValues.outputMessage,
      //   type: "success",
      // });
     
    } catch (error) {
      setModal({
        isOpen: true,
        message: error.message || 'Failed to update mental status exam section.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSubmitAll = () => {
  //   const payload = createFullPayload();
  //   console.log('Saving all sections payload:', payload);
  //   setIsAddMode(false); // Exit Add Mode after saving
  // };

  
  const handleSubmitAll = async () => {
    setIsLoading(true);
    setIsSaving(true);
    const payload = {
      patientId: patientId,
      circumstanceOfPresentation: patient.mentalStatusExam.circumstanceOfPresentation,
      indicationsAndRecommendations: patient.mentalStatusExam.indicationsAndRecommendations,
      appearance: patient.mentalStatusExam.appearance,
      affectiveExpression: patient.mentalStatusExam.affectiveExpression,
      behavior: patient.mentalStatusExam.behavior,
      speech: patient.mentalStatusExam.speech,
      attitudeToExaminer: patient.mentalStatusExam.attitudeToExaminer,
      moodAndAffect: patient.mentalStatusExam.moodAndAffect,
      appropriateness: patient.mentalStatusExam.appropriateness,
      hallucinations: patient.mentalStatusExam.hallucinations,
      disassociation: patient.mentalStatusExam.disassociation,
      agnosia: patient.mentalStatusExam.agnosia,
      contentOfThought: patient.mentalStatusExam.contentOfThought,
      delusions0: patient.mentalStatusExam.delusions0,
      thoughtForm: patient.mentalStatusExam.thoughtForm,
      consciousness: patient.mentalStatusExam.consciousness,
      orientation: patient.mentalStatusExam.orientation,
      concentration: patient.mentalStatusExam.concentration,
      memory: patient.mentalStatusExam.memory,
      informationAndIntelligence: patient.mentalStatusExam.informationAndIntelligence,
      judgment: patient.mentalStatusExam.judgment,
      insight: patient.mentalStatusExam.insight,
      reliability: patient.mentalStatusExam.reliability,
      summary: patient.mentalStatusExam.summary,
      generalObservations: patient.mentalStatusExam.generalObservations,
      cognition: patient.mentalStatusExam.cognition,
      thoughts: patient.mentalStatusExam.thoughts,
      isConfirm: 1,
    };

    try {
      const res = await addMentalStatusExam(payload);
     
        if (res.data.error) {
          setModal({
            isOpen: true,
            message: res.data.error.message,
            type: "error",
          });
          setIsSaving(false);
          return;
        }

        if (res.data.outputValues.responseStatus === "failed") {
          setModal({
            isOpen: true,
            message: res.data.outputValues.outputMessage,
            type: "warning",
          });
          setIsSaving(false);
          return;
        }

  
        await loadMentalStatusExam();
setIsSaving(false);
        setModal({
          isOpen: true,
          message: res.data.outputValues.outputMessage,
          type: "success",
        });

        refreshTabDetails(Math.random());
        

    } catch (error) {
      setModal({
        isOpen: true,
        message: error.message || 'Failed to save mental status exam.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };


  const toggleSectionEdit = (section) => {
    if (editingSection === section) {
      handleSubmitSection(section);
    } else {
      setEditingSection(section);
    }
  };
  // Function to handle cancel action
  const handleCancel = (editingSection) => {
    if (initialPatientInformation) {
      setPatient(initialPatientInformation);
      //setPersonalInformationErrors({});
    }

    setEditingSection(null); // Exit edit mode
  };


const renderSection = (title, sectionKey, icon, subSections) => {
  return (
    <section className="mb-8 rounded-lg border border-gray-200 bg-white">
      <div className="flex justify-between items-center mb-4 px-6 py-3">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center tracking-wide">
          {icon} {title}
        </h3>
        {(!printPreviewMode && !isAddMode) && (
          <div className="flex space-x-4">
            <EditButton
              onClick={() => toggleSectionEdit(sectionKey)}
              aria-label={editingSection === sectionKey ? `Save ${title}` : `Edit ${title}`}
              disabled={isSaving}
            >
              {editingSection === sectionKey
                ? isSaving
                  ? "Saving..."
                  : "Save"
                : "Edit"}
            </EditButton>
            {editingSection === sectionKey && (
              <button
                onClick={() => handleCancel(sectionKey)}
                className="flex items-center bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all duration-200"
                aria-label="Cancel Editing"
                disabled={isSaving}
              >
                Cancel
              </button>
            )}
          </div>
        )}
      </div>
      {isLoading && editingSection === sectionKey ? (
        <LoadingSpinner />
      ) : (
        <>
          {subSections.map(({ key, title }) => (
            <div
              key={key}
              className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0 px-6"
            >
              {(isAddMode || editingSection === sectionKey) ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="pr-4">
                      <h4 className="text-md font-bold text-gray-700">{title}</h4>
                    </div>
                    <div className="col-span-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                        {mseOptions[key].map((option) => (
                          <label key={option} className="flex items-center flex-wrap">
                            <input
                              type="checkbox"
                              name={`${sectionKey}.${key}.options`}
                              value={option}
                              checked={(patient.mentalStatusExam[sectionKey][key]?.options || []).includes(
                                option
                              )}
                              onChange={(e) => handleCheckboxChange(e, sectionKey, key)}
                              className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded cursor-pointer"
                              aria-label={option}
                            />
                            <span className="ml-2 text-md text-gray-700 cursor-pointer">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="pr-4">
                      <h4 className="text-md font-bold text-gray-700">{title}</h4>
                    </div>
                    <div className="col-span-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                        {mseOptions[key].map((option) => (
                          <div
                            key={option}
                            className="flex items-center group flex-wrap"
                            aria-label={option}
                          >
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 transition-all duration-200 ${
                                (patient.mentalStatusExam[sectionKey][key]?.options || []).includes(option)
                                  ? 'bg-sky-600'
                                  : 'bg-gray-200 group-hover:bg-gray-300'
                              }`}
                            >
                              {(patient.mentalStatusExam[sectionKey][key]?.options || []).includes(
                                option
                              ) && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                            <span
                              className={`text-md ${
                                (patient.mentalStatusExam[sectionKey][key]?.options || []).includes(option)
                                  ? 'text-sky-600 font-medium'
                                  : 'text-gray-600'
                              } group-hover:text-gray-800 transition-colors duration-200`}
                            >
                              {option}
                            </span>
                          </div>
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
              <h4 className="text-md font-bold text-gray-700 mb-2">Comments:</h4>
            )}
            {(isAddMode || editingSection === sectionKey) ? (
              <VoiceToText
                value={patient.mentalStatusExam[sectionKey].comments}
                onChange={(e) => handleCommentChange(e, sectionKey)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="3"
                placeholder="Enter comments"
                aria-label={`${title} comments`}
              />
            ) : (
              <div className="mt-2">
                <p className="text-md font-bold text-gray-700">Comments:</p>
                <p className="text-md text-gray-600 p-3 rounded-md whitespace-pre-line">
                  {patient.mentalStatusExam[sectionKey].comments}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

const renderSectionMood = (title, sectionKey, icon, subSections) => {
  return (
    <section className="mb-8 rounded-lg border border-gray-200 bg-white">
      <div className="flex justify-between items-center mb-4 px-6 py-3">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center tracking-wide">
          {icon} {title}
        </h3>
        {!isAddMode && (
          <div className="flex space-x-4">
            <EditButton
              onClick={() => toggleSectionEdit(sectionKey)}
              aria-label={editingSection === sectionKey ? `Save ${title}` : `Edit ${title}`}
              disabled={isSaving}
            >
              {editingSection === sectionKey
                ? isSaving
                  ? "Saving..."
                  : "Save"
                : "Edit"}
            </EditButton>
            {editingSection === sectionKey && (
              <button
                onClick={() => handleCancel(sectionKey)}
                className="flex items-center bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all duration-200"
                aria-label="Cancel Editing"
                disabled={isSaving}
              >
                Cancel
              </button>
            )}
          </div>
        )}
      </div>
      {isLoading && editingSection === sectionKey ? (
        <LoadingSpinner />
      ) : (
        <>
          {subSections.map(({ key, title, nested }) => (
            <div
              key={key}
              className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0 px-6"
            >
              <h4 className="text-md font-bold text-gray-700 mb-2">{title}</h4>
              {(isAddMode || editingSection === sectionKey) ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                    {mseOptions[key].map((option) => (
                      <label key={option} className="flex items-center flex-wrap">
                        <input
                          type="checkbox"
                          name={`${sectionKey}.${key}.options`}
                          value={option}
                          checked={(patient.mentalStatusExam[sectionKey][key]?.options || []).includes(
                            option
                          )}
                          onChange={(e) => handleCheckboxChange(e, sectionKey, key)}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded cursor-pointer"
                          aria-label={option}
                        />
                        <span className="ml-2 text-md text-gray-700 cursor-pointer">{option}</span>
                      </label>
                    ))}
                  </div>
                  {nested}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                    {mseOptions[key].map((option) => (
                      <div
                        key={option}
                        className="flex items-center group flex-wrap"
                        aria-label={option}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 transition-all duration-200 ${
                            (patient.mentalStatusExam[sectionKey][key]?.options || []).includes(option)
                              ? 'bg-sky-600'
                              : 'bg-gray-200 group-hover:bg-gray-300'
                          }`}
                        >
                          {(patient.mentalStatusExam[sectionKey][key]?.options || []).includes(option) && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`text-md ${
                            (patient.mentalStatusExam[sectionKey][key]?.options || []).includes(option)
                              ? 'text-sky-600 font-medium'
                              : 'text-gray-600'
                          } group-hover:text-gray-800 transition-colors duration-200`}
                        >
                          {option}
                        </span>
                      </div>
                    ))}
                  </div>
                  {nested}
                </div>
              )}
            </div>
          ))}
          <div className="px-6 pb-4">
            {(isAddMode || editingSection === sectionKey) && (
              <h4 className="text-md font-bold text-gray-700 mb-2">Comments:</h4>
            )}
            {(isAddMode || editingSection === sectionKey) ? (
              <VoiceToText
                value={patient.mentalStatusExam[sectionKey].comments}
                onChange={(e) => handleCommentChange(e, sectionKey)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="3"
                placeholder="Enter comments"
                aria-label={`${title} comments`}
              />
            ) : (
              <div className="mt-2">
                <p className="text-md font-bold text-gray-700">Comments:</p>
                <p className="text-md text-gray-600 p-3 rounded-md whitespace-pre-line">
                  {patient.mentalStatusExam[sectionKey].comments}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

  const circumstanceOfPresentation = (sectionKey) => {
    return (
      <section className="mb-8 rounded-lg border bg-white border-gray-200">
        <div className="flex justify-between items-center mb-4 px-6 py-2 ">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center">
           <FaUserClock className="mr-2 text-gray-700" size={20} />  Circumstance of presentation
          </h3>
            {!isAddMode && (
            <div className="flex space-x-4">

          <EditButton
            onClick={() => toggleSectionEdit(sectionKey)}
       aria-label={editingSection === sectionKey ? `Save circumstanceOfPresentation` : `Edit circumstanceOfPresentation`}
            disabled={isSaving}
          >
               {editingSection === sectionKey
                      ? isSaving
                        ? "Saving..."
                        : "Save"
                      : "Edit"}
          </EditButton>

               {editingSection === sectionKey && (
                    <button
                      onClick={() => handleCancel(sectionKey)}
                      className="flex items-center bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all duration-200"
                      aria-label="Cancel Editing"
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                  )}
</div>
        )}
        </div>
        <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0 px-6">
          {isLoading && editingSection === sectionKey  ? <LoadingSpinner/> : <>  <div className="space-y-4">
            {(isAddMode || editingSection === sectionKey) ? (
              <VoiceToText
                value={patient.mentalStatusExam.circumstanceOfPresentation}
                onChange={e => handleInputTextNormal(e, 'circumstanceOfPresentation')}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="3"
                placeholder="Enter Circumstance of presentation"
                aria-label={`Circumstance of presentation`}
              />
            ) : (
              <p className="text-gray-700 mt-1 whitespace-pre-line">{patient.mentalStatusExam.circumstanceOfPresentation}</p>
            )}
          </div> </>}
        </div>
      </section>
    );
  };

  const indicationsAndRecommendations = (sectionKey) => {
    return (
      <section className="mb-8 rounded-lg border bg-white border-gray-200">
        <div className="flex justify-between items-center mb-4 px-6 py-2">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center">
           <FaStethoscope className="mr-2 text-gray-700" size={20} /> Indications & Recommendations
          </h3>
            {!isAddMode && (
            <div className="flex space-x-4">

            

          <EditButton
            onClick={() => toggleSectionEdit(sectionKey)}
       aria-label={editingSection === sectionKey ? `Save indicationsAndRecommendations` : `Edit indicationsAndRecommendations`}
            disabled={isSaving}
          >
               {editingSection === sectionKey
                      ? isSaving
                        ? "Saving..."
                        : "Save"
                      : "Edit"}
          </EditButton>

               {editingSection === sectionKey && (
                    <button
                      onClick={() => handleCancel(sectionKey)}
                      className="flex items-center bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all duration-200"
                      aria-label="Cancel Editing"
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                  )}
</div>
        )}
        </div>
        <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0 px-6">
        {isLoading && editingSection === sectionKey  ? <LoadingSpinner/> : <>    <div className="space-y-4">
            {(isAddMode || editingSection === sectionKey) ? (
              <VoiceToText
                value={patient.mentalStatusExam.indicationsAndRecommendations}
                onChange={e => handleInputTextNormal(e, 'indicationsAndRecommendations')}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="3"
                placeholder="Indications & Recommendations"
                aria-label={`Indications & Recommendations`}
              />
            ) : (
              <p className="text-gray-700 mt-1 whitespace-pre-line">{patient.mentalStatusExam.indicationsAndRecommendations}</p>
            )}
          </div></>}
        </div>
      </section>
    );
  };

const renderSectionWithNested = (title, sectionKey, icon, subSections) => {
  return (
    <section className="mb-8 rounded-lg border border-gray-200 bg-white">
      <div className="flex justify-between items-center mb-4 px-6 py-3 ">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center tracking-wide">
          {icon}{title}
        </h3>
        {!isAddMode && (
          <div className="flex space-x-4">
            <EditButton
              onClick={() => toggleSectionEdit(sectionKey)}
              aria-label={editingSection === sectionKey ? `Save ${title}` : `Edit ${title}`}
              disabled={isSaving}
            >
              {editingSection === sectionKey
                ? isSaving
                  ? "Saving..."
                  : "Save"
                : "Edit"}
            </EditButton>
            {editingSection === sectionKey && (
              <button
                onClick={() => handleCancel(sectionKey)}
                className="flex items-center bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all duration-200"
                aria-label="Cancel Editing"
                disabled={isSaving}
              >
                Cancel
              </button>
            )}
          </div>
        )}
      </div>
      {isLoading && editingSection === sectionKey ? (
        <LoadingSpinner />
      ) : (
        <>
          {subSections.map(({ key, title }) => (
            <div
              key={key}
              className="border-b border-gray-200 pb-3 mb-3 last:border-b-0 last:mb-0 px-6"
            >
              {(isAddMode || editingSection === sectionKey) ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {title && (
                      <div className="pr-4">
                        <h4 className="text-md font-bold text-gray-700">{title}</h4>
                      </div>
                    )}
                    <div className={`${title ? 'col-span-3' : 'col-span-4'}`}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                        {mseOptions[key].map((option) => (
                          <label key={option} className="flex items-center flex-wrap">
                            <input
                              type="checkbox"
                              name={`${sectionKey}.${key}.options`}
                              value={option}
                              checked={(patient.mentalStatusExam[sectionKey][key]?.options || []).includes(
                                option
                              )}
                              onChange={(e) => handleCheckboxChange(e, sectionKey, key)}
                              className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded cursor-pointer"
                              aria-label={option}
                            />
                            <span className="ml-2 text-md text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                      {key === 'contentOfThought' &&
                        (patient.mentalStatusExam.contentOfThought.contentOfThought?.options || []).includes(
                          'Delusions'
                        ) && (
                          <div className="mt-4 border p-4 rounded-md bg-gray-50">
                            <h4 className="text-md font-bold text-gray-700">Delusions</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-2">
                              {mseOptions.delusions0.map((option) => (
                                <label key={option} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    name={`delusions0.delusions0.options`}
                                    value={option}
                                    checked={(patient.mentalStatusExam.delusions0.delusions0?.options || []).includes(
                                      option
                                    )}
                                    onChange={(e) =>
                                      handleCheckboxChange(e, 'delusions0', 'delusions0')
                                    }
                                    className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded cursor-pointer"
                                    aria-label={option}
                                  />
                                  <span className="ml-2 text-sm text-gray-700 cursor-pointer">{option}</span>
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
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {title && (
                      <div className="pr-4">
                        <h4 className="text-md font-bold text-gray-700">{title}</h4>
                      </div>
                    )}
                    <div className={`${title ? 'col-span-3' : 'col-span-4'}`}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                        {mseOptions[key].map((option) => (
                          <div
                            key={option}
                            className="flex items-center group flex-wrap"
                            aria-label={option}
                          >
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 transition-all duration-200 ${
                                (patient.mentalStatusExam[sectionKey][key]?.options || []).includes(option)
                                  ? 'bg-sky-600'
                                  : 'bg-gray-200 group-hover:bg-gray-300'
                              }`}
                            >
                              {(patient.mentalStatusExam[sectionKey][key]?.options || []).includes(
                                option
                              ) && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                            <span
                              className={`text-md ${
                                (patient.mentalStatusExam[sectionKey][key]?.options || []).includes(option)
                                  ? 'text-sky-600 font-medium'
                                  : 'text-gray-600'
                              } group-hover:text-gray-800 transition-colors duration-200`}
                            >
                              {option}
                            </span>
                          </div>
                        ))}
                      </div>
                      {key === 'contentOfThought' &&
                        (patient.mentalStatusExam.contentOfThought.contentOfThought?.options || []).includes(
                          'Delusions'
                        ) && (
                          <div className="mt-4 ml-6 border-l-2 border-sky-200 pl-4">
                            <h4 className="text-md font-medium text-gray-700">Delusion Type</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-2">
                              {mseOptions.delusions0.map((option) => (
                                <div
                                  key={option}
                                  className="flex items-center group"
                                  aria-label={option}
                                >
                                  <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 transition-all duration-200 ${
                                      (patient.mentalStatusExam.delusions0.delusions0?.options || []).includes(
                                        option
                                      )
                                        ? 'bg-sky-600'
                                        : 'bg-gray-200 group-hover:bg-gray-300'
                                    }`}
                                  >
                                    {(patient.mentalStatusExam.delusions0.delusions0?.options || []).includes(
                                      option
                                    ) && (
                                      <svg
                                        className="w-3 h-3 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M5 13l4 4L19 7"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                  <span
                                    className={`text-md ${
                                      (patient.mentalStatusExam.delusions0.delusions0?.options || []).includes(
                                        option
                                      )
                                        ? 'text-sky-600 font-medium'
                                        : 'text-gray-600'
                                    } group-hover:text-gray-800 transition-colors duration-200`}
                                  >
                                    {option}
                                  </span>
                                </div>
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
              <h4 className="text-md font-bold text-gray-700 mb-2">Comments:</h4>
            )}
            {(isAddMode || editingSection === sectionKey) ? (
              <VoiceToText
                value={patient.mentalStatusExam[sectionKey].comments}
                onChange={(e) => handleCommentChange(e, sectionKey)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="3"
                placeholder="Enter comments"
                aria-label={`${title} comments`}
              />
            ) : (
              <div className="mt-2">
                <p className="text-md font-bold text-gray-700">Comments:</p>
                <p className="text-md text-gray-600 p-3 rounded-md whitespace-pre-line">
                  {patient.mentalStatusExam[sectionKey].comments}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

// Render LoadingSpinner until isReady is true
  if (!isReady) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <MessageModel
        isOpen={modal.isOpen}
        onClose={() => setModal({ isOpen: false, message: "", type: "error" })}
        message={modal.message}
        type={modal.type}
      />
   
  {!printPreviewMode ? 
    <div className="px-6  min-h-screen">
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-6">
        <h3 className="flex items-center text-xl font-bold text-gray-700">
          {/* <FaBrain className="mr-3" size={32} /> */}
          Mental Status Exam
        </h3>

   
       {!isLoading ?  <>
      <div className='text-center text-gray-700'>
  <strong>Form Date:</strong>{' '}
  {patient.formDate
    ? moment(patient.formDate).format('DD MMM YYYY')
    : 'N/A'}
</div>
<div className='text-right  text-sky-700'>
  <strong>Last Modified:</strong>{' '}
  {patient.lastModified
    ? moment(patient.lastModified).format('DD MMM YYYY HH:mm a')
    : 'N/A'}
</div>
</>:null}
      </div>

  
      {circumstanceOfPresentation('circumstanceOfPresentation')}

      {renderSection('Appearance', 'appearance',<FaUserTie className="mr-2 text-gray-700" size={20} />, [
        { key: 'weight', title: 'Weight' },
        { key: 'hair', title: 'Hair' },
        { key: 'otherFeatures', title: 'Other Features' },
        { key: 'grooming', title: 'Grooming' },
        { key: 'dress', title: 'Dress' },
      ])}

      {renderSection('Behavior', 'behavior',<FaWalking className="mr-2 text-gray-700" size={20} />, [
        { key: 'walk', title: 'Walk' },
        { key: 'combativeness', title: 'Combativeness' },
        { key: 'repetition', title: 'Repetition' },
        { key: 'overactivity', title: 'Overactivity' },
        { key: 'catatonia', title: 'Catatonia' },
      ])}

      {renderSection('Speech', 'speech',<FaComment className="mr-2 text-gray-700" size={20} />, [
        { key: 'rate', title: 'Rate' },
        { key: 'intelligibility', title: 'Intelligibility' },
        { key: 'volume', title: 'Volume' },
        { key: 'speechQuality', title: 'Speech Quality' },
        { key: 'speechQuantity', title: 'Speech Quantity' },
      ])}

      {renderSectionMood('Attitude to Examiner', 'attitudeToExaminer',<FaHandshake className="mr-2 text-gray-700" size={20} />, [{ key: 'attitudeToExaminer', title: '' }])}

      {renderSection('Mood and Affect', 'moodAndAffect',<FaMeh className="mr-2 text-gray-700" size={20} />, [
        { key: 'mood', title: 'Mood' },
        { key: 'otherEmotions', title: 'Other Emotions' },
        { key: 'otherSigns', title: 'Other Signs' },
        { key: 'neuroVegetative', title: 'Neuro Vegetative' },
      ])}

      {renderSectionMood('Affective Expression', 'affectiveExpression',<FaSmile className="mr-2 text-gray-700" size={20} />, [{ key: 'affectiveExpression', title: '' }])}

      {renderSectionMood('Appropriateness', 'appropriateness',<FaBalanceScale className="mr-2 text-gray-700" size={20} />, [{ key: 'appropriateness', title: '' }])}

      {renderSectionMood('Hallucinations', 'hallucinations',<FaEye className="mr-2 text-gray-700" size={20} />, [{ key: 'hallucinations', title: '' }])}

      { renderSectionMood('Disassociation', 'disassociation',<FaUserSecret className="mr-2 text-gray-700" size={20} />, [{ key: 'disassociation', title: '' }])}

      { renderSectionMood('Agnosia', 'agnosia',<FaEyeSlash className="mr-2 text-gray-700" size={20} />, [{ key: 'agnosia', title: '' }])}

      { renderSectionWithNested('Content of Thought', 'contentOfThought',<FaLightbulb className="mr-2 text-gray-700" size={20} />, [
        { key: 'contentOfThought', title: '' },
        { key: 'preoccupationsSI', title: 'Preoccupations Suicidal Ideation' },
        { key: 'hostileIntent', title: 'Hostile Intent' },
        { key: 'phobia', title: 'Phobia' },
      ])}

      {renderSection('Thought Form', 'thoughtForm',<FaStream className="mr-2 text-gray-700" size={20} />, [
        { key: 'general', title: 'General' },
        { key: 'specific', title: 'Specific' },
        { key: 'disturbancesOfSpeech', title: 'Disturbances of speech' },
        { key: 'aphasicDisturbances', title: 'Aphasic Disturbances' },
      ])}

      {renderSectionMood('Consciousness', 'consciousness',<FaBrain className="mr-2 text-gray-700" size={20} />, [{ key: 'consciousness', title: '' }])}

      {renderSectionMood('Orientation', 'orientation',<FaMapMarkedAlt className="mr-2 text-gray-700" size={20} />, [{ key: 'orientation', title: '' }])}

      {renderSectionMood('Concentration', 'concentration',<FaBullseye className="mr-2 text-gray-700" size={20} />, [{ key: 'concentration', title: '' }])}

      {renderSectionMood('Memory', 'memory',<FaUser className="mr-2 text-gray-700" size={20} />, [{ key: 'memory', title: '' }])}

      {renderSection('Information & Intelligence', 'informationAndIntelligence',<FaBook className="mr-2 text-gray-700" size={20} />, [
        { key: 'attention', title: 'Attention' },
        { key: 'suggestibility', title: 'Suggestibility' },
        { key: 'memory2', title: 'Memory' },
        { key: 'intelligence', title: 'Intelligence' },
      ])}

      {renderSection('Judgment', 'judgment',<FaBalanceScale className="mr-2 text-gray-700" size={20} />, [{ key: 'judgment', title: 'Judgment' }])}

      { renderSection('Insight', 'insight',<FaEye className="mr-2 text-gray-700" size={20} />, [{ key: 'insight', title: 'Insight' }])}

      {renderSectionMood('Reliability', 'reliability',<FaShieldAlt className="mr-2 text-gray-700" size={20} />, [{ key: 'reliability', title: '' }])}

      {renderSection('Summary', 'summary',<FaClipboard className="mr-2 text-gray-700" size={20} />, [{ key: 'globalFunctioning', title: 'Global Functioning' }])}

      {indicationsAndRecommendations('indicationsAndRecommendations')}

            {isAddMode && (
    <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
           onClick={handleSubmitAll}
            className="flex items-center bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition-all duration-200 shadow-md"
            aria-label="Save and go to next tab"
            disabled={isLoading}
          >
           {isLoading ? 'Saving...': 'Save All'}
          </button>
        </div>
      )}




    </div>
:<PrintMentalStatusExamA4
    mse={patient.mentalStatusExam}
    printPreviewMode={printPreviewMode}
  />}
         </>
  );
};

export default MentalStatusExam;
