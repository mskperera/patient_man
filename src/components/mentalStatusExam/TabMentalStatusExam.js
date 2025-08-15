import React, { useEffect, useRef, useState } from 'react';
import { FaBalanceScale, FaBook, FaBrain, FaBullseye, FaClipboard, FaComment, FaEye, FaEyeSlash, FaHandshake, FaLightbulb, FaMapMarkedAlt, FaMeh, FaProjectDiagram, FaShieldAlt, FaSmile, FaStethoscope, FaStream, FaUser, FaUserClock, FaUserFriends, FaUserSecret, FaUserTie, FaWalking } from 'react-icons/fa';
import { addMentalStatusExam, getMentalStatusExam, updateMentalStatusExam } from '../../functions/patient';
import moment from 'moment';
import LoadingSpinner from '../LoadingSpinner';
import VoiceToText from '../VoiceToText';
import EditButton from '../EditButton';
import MessageModel from '../MessageModel';

const MentalStatusExam = ({id,refreshTabDetails}) => {
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

  // const [patient, setPatient] = useState({
  //   mentalStatusExam: {
  //     circumstanceOfPresentation: '',
  //     indicationsAndRecommendations: '',
  //     appearance: {
  //       appearance: { options: ['j'] },
  //       weight: { options: ['j'] },
  //       hair: { options: ['h'] },
  //       otherFeatures: { options: ['h'] },
  //       grooming: { options: ['i'] },
  //       dress: { options: ['g'] },
  //       comments: '',
  //     },
  //     behavior: {
  //       walk: { options: ['Gait/march'] },
  //       combativeness: { options: ['Aggressive'] },
  //       repetition: { options: ['Twitches'] },
  //       overactivity: { options: ['Overactivity'] },
  //       catatonia: { options: ['Catalepsy'] },
  //       comments: '',
  //     },
  //     speech: {
  //       rate: { options: ['Rapid'] },
  //       intelligibility: { options: ['Slurred'] },
  //       volume: { options: ['Loud'] },
  //       speechQuality: { options: ['Emotional'] },
  //       speechQuantity: { options: ['Talkative'] },
  //       comments: '',
  //     },
  //     attitudeToExaminer: {
  //       attitudeToExaminer: { options: ['Seductive'] },
  //     },
  //     moodAndAffect: {
  //       mood: { options: ['Euthymic'] },
  //       otherEmotions: { options: ['Panicked'] },
  //       otherSigns: { options: ['Ambivalence'] },
  //       neuroVegetative: { options: ['Hypersomnia'] },
  //       comments: '',
  //     },
  //     affectiveExpression: {
  //       affectiveExpression: { options: ['Normal'] },
  //     },
  //     appropriateness: {
  //       appropriateness: { options: ['Labile'] },
  //     },
  //     hallucinations: {
  //       hallucinations: { options: ['Hypnogogic'] },
  //       comments: '',
  //     },
  //     disassociation: {
  //       disassociation: { options: ['Macropsia'] },
  //       comments: '',
  //     },
  //     agnosia: {
  //       agnosia: { options: ['Anosognosia'] },
  //       comments: '',
  //     },
  //     contentOfThought: {
  //       contentOfThought: { options: ['Overvalued idea'] },
  //       preoccupationsSI: { options: ['Current ideation'] },
  //       hostileIntent: { options: ['History of violence'] },
  //       phobia: { options: ['Simple'] },
  //       comments: '',
  //     },
  //     delusions0: {
  //       delusions0: { options: ['Somatic'] },
  //       comments: '',
  //     },
  //     thoughtForm: {
  //       general: { options: ['Neurosis'] },
  //       specific: { options: ['Circumstantiality'] },
  //       disturbancesOfSpeech: { options: ['Voluble'] },
  //       aphasicDisturbances: { options: ['Jargon'] },
  //       comments: '',
  //     },
  //     consciousness: {
  //       consciousness: { options: ['Disoriented'] },
  //       comments: '',
  //     },
  //     orientation: {
  //       orientation: { options: ['Time Disorientation'] },
  //       comments: '',
  //     },
  //     concentration: {
  //       concentration: { options: ['Serial 7’s inattention'] },
  //       comments: '',
  //     },
  //     memory: {
  //       memory: { options: ['Remote memory deficit'] },
  //       comments: '',
  //     },
  //     informationAndIntelligence: {
  //       attention: { options: ['Distractible'] },
  //       suggestibility: { options: ['Hypnotized'] },
  //       memory2: { options: ['Localized amnesia'] },
  //       intelligence: { options: ['Dementia'] },
  //       comments: '',
  //     },
  //     judgment: {
  //       judgment: { options: ['Critical'] },
  //       comments: '',
  //     },
  //     insight: {
  //       insight: { options: ['Impaired insight'] },
  //       comments: '',
  //     },
  //     reliability: {
  //       reliability: { options: ['Reason to fake bad'] },
  //       comments: '',
  //     },
  //     summary: {
  //       globalFunctioning: { options: ['20 Possible harm'] },
  //       comments: '',
  //     },
  //     generalObservations: {
  //       appearance: { options: ['Neat'] },
  //       speech: { options: ['Normal'] },
  //       eyeContact: { options: ['Normal'] },
  //       motorActivity: { options: ['Normal'] },
  //       affect: { options: ['Full'] },
  //       comments: 'Well-groomed, appropriately dressed',
  //     },
  //     cognition: {
  //       orientationImpairment: { options: ['None'] },
  //       memoryImpairment: { options: ['None'] },
  //       attention: { options: ['Normal'] },
  //       comments: '',
  //     },
  //     thoughts: {
  //       suicidality: { options: ['None'] },
  //       homicidality: { options: ['None'] },
  //       delusions: { options: ['None'] },
  //       comments: '',
  //     },
  //   },
  // });
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
         </>
  );
};

export default MentalStatusExam;
