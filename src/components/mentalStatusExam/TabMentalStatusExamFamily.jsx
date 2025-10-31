import React, { useEffect, useRef, useState } from 'react';
import { FaBalanceScale, FaBook, FaBrain, FaBullseye, FaClipboard, FaComment, FaEye, FaEyeSlash, FaHandshake, FaLightbulb, FaMapMarkedAlt, FaMeh, FaProjectDiagram, FaShieldAlt, FaSmile, FaStethoscope, FaStream, FaUser, FaUserClock, FaUserFriends, FaUserSecret, FaUserTie, FaWalking } from 'react-icons/fa';
import { addMentalStatusExam, addMentalStatusExamFamily, getMentalStatusExam, updateMentalStatusExam, updateMentalStatusExamFamily } from '../../functions/patient';
import moment from 'moment';
import LoadingSpinner from '../LoadingSpinner';
import VoiceToText from '../VoiceToText';
import EditButton from '../EditButton';
import MessageModel from '../MessageModel';

const printStyles = `
  @media print {
    @page { size: A4; margin: 1cm; }
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .print-break { page-break-before: always; }
  }
  @media screen {
    .print-break { 
      break-before: page;
      margin-top: 30mm;
    }
  }
`;

const PrintMentalStatusExamFamilyA4 = ({ mse}) => {

  const renderOptions = (options = []) => {
    if (!options.length) return <span className="text-gray-500 italic">N/A</span>;
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-1">
        {options.map((opt) => (
          <div key={opt} className="flex items-center gap-1.5 text-sky-600 font-medium text-xs">
            <div className="w-4 h-4 border-2 border-sky-600 rounded flex items-center justify-center bg-sky-600">
              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>{opt}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderValue = (value) => {
    return value ? (
      <div className="text-gray-800 whitespace-pre-line text-sm">{value}</div>
    ) : (
      <span className="text-gray-500 italic">N/A</span>
    );
  };

  const renderField = (label, husbandOpts, wifeOpts, husbandComment, wifeComment) => (
    <div className="grid grid-cols-2 gap-4 mb-3">
      <div>
        {label && <span className="block font-semibold text-gray-700 text-sm mb-1">{label} (Husband)</span>}
        {renderOptions(husbandOpts)}
        {husbandComment && (
          <div className="mt-2">
            <span className="text-xs font-medium text-gray-600">Comment:</span>
            <div className="text-gray-800 text-sm mt-0.5 whitespace-pre-line">{husbandComment}</div>
          </div>
        )}
      </div>
      <div>
        {label && <span className="block font-semibold text-gray-700 text-sm mb-1">{label} (Wife)</span>}
        {renderOptions(wifeOpts)}
        {wifeComment && (
          <div className="mt-2">
            <span className="text-xs font-medium text-gray-600">Comment:</span>
            <div className="text-gray-800 text-sm mt-0.5 whitespace-pre-line">{wifeComment}</div>
          </div>
        )}
      </div>
    </div>
  );

  const renderSingleField = (label, options, comment) => (
    <div className="bg-white border border-gray-300 border-dashed rounded-md p-3 mb-3">
      {label && <span className="block font-semibold text-gray-700 text-sm mb-1">{label}</span>}
      {renderOptions(options)}
      {comment && (
        <div className="mt-2">
          <span className="text-xs font-medium text-gray-600">Comment:</span>
          <div className="text-gray-800 text-sm mt-0.5 whitespace-pre-line">{comment}</div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />

      <div className="print-break font-sans text-sm leading-relaxed max-w-[210mm] mx-auto bg-white">

        {/* ========== PAGE 1: Header + Circumstance ========== */}
        <div>
          <h2 className="text-center text-xl font-bold text-sky-700 mb-3 pb-1 ">
            Mental Status Examination
          </h2>

          {/* <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <strong>Form Date:</strong>{" "}
              {mse.formDate ? new Date(mse.formDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "N/A"}
            </div>
            <div className="text-right">
              <strong>Last Modified:</strong>{" "}
              {mse.lastModified
                ? new Date(mse.lastModified).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A"}
            </div>
          </div> */}

          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3">
            Circumstance of Presentation
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-300 rounded-md p-3">
              <strong className="block text-sm font-semibold text-gray-700 mb-1">Husband</strong>
              {renderValue(mse.circumstanceOfPresentationHusband)}
            </div>
            <div className="bg-white border border-gray-300 rounded-md p-3">
              <strong className="block text-sm font-semibold text-gray-700 mb-1">Wife</strong>
              {renderValue(mse.circumstanceOfPresentationWife)}
            </div>
          </div>
        </div>

        {/* ========== PAGE 2: Appearance & Behavior ========== */}
        <div className="print-break">
          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3">Appearance</h3>
          {renderField("Weight", mse.appearanceHusband?.weight?.options, mse.appearanceWife?.weight?.options, mse.appearanceHusband?.comments, mse.appearanceWife?.comments)}
          {renderField("Hair", mse.appearanceHusband?.hair?.options, mse.appearanceWife?.hair?.options)}
          {renderField("Other Features", mse.appearanceHusband?.otherFeatures?.options, mse.appearanceWife?.otherFeatures?.options)}
          {renderField("Grooming", mse.appearanceHusband?.grooming?.options, mse.appearanceWife?.grooming?.options)}
          {renderField("Dress", mse.appearanceHusband?.dress?.options, mse.appearanceWife?.dress?.options)}

          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3 mt-6">Behavior</h3>
          {renderField("Walk", mse.behaviorHusband?.walk?.options, mse.behaviorWife?.walk?.options, mse.behaviorHusband?.comments, mse.behaviorWife?.comments)}
          {renderField("Combativeness", mse.behaviorHusband?.combativeness?.options, mse.behaviorWife?.combativeness?.options)}
          {renderField("Repetition", mse.behaviorHusband?.repetition?.options, mse.behaviorWife?.repetition?.options)}
          {renderField("Overactivity", mse.behaviorHusband?.overactivity?.options, mse.behaviorWife?.overactivity?.options)}
          {renderField("Catatonia", mse.behaviorHusband?.catatonia?.options, mse.behaviorWife?.catatonia?.options)}
        </div>

        {/* ========== PAGE 3: Speech & Attitude ========== */}
        <div className="print-break">
          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3">Speech</h3>
          {renderField("Rate", mse.speechHusband?.rate?.options, mse.speechWife?.rate?.options, mse.speechHusband?.comments, mse.speechWife?.comments)}
          {renderField("Intelligibility", mse.speechHusband?.intelligibility?.options, mse.speechWife?.intelligibility?.options)}
          {renderField("Volume", mse.speechHusband?.volume?.options, mse.speechWife?.volume?.options)}
          {renderField("Speech Quality", mse.speechHusband?.speechQuality?.options, mse.speechWife?.speechQuality?.options)}
          {renderField("Speech Quantity", mse.speechHusband?.speechQuantity?.options, mse.speechWife?.speechQuantity?.options)}

          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3 mt-6">Attitude to Examiner</h3>
          {renderField("", mse.attitudeToExaminerHusband?.attitudeToExaminer?.options, mse.attitudeToExaminerWife?.attitudeToExaminer?.options, mse.attitudeToExaminerHusband?.comments, mse.attitudeToExaminerWife?.comments)}
        </div>

        {/* ========== PAGE 4: Mood, Affect, Hallucinations ========== */}
        <div className="print-break">
          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3">Mood and Affect</h3>
          {renderField("Mood", mse.moodAndAffectHusband?.mood?.options, mse.moodAndAffectWife?.mood?.options, mse.moodAndAffectHusband?.comments, mse.moodAndAffectWife?.comments)}
          {renderField("Other Emotions", mse.moodAndAffectHusband?.otherEmotions?.options, mse.moodAndAffectWife?.otherEmotions?.options)}
          {renderField("Other Signs", mse.moodAndAffectHusband?.otherSigns?.options, mse.moodAndAffectWife?.otherSigns?.options)}
          {renderField("Neurovegetative", mse.moodAndAffectHusband?.neuroVegetative?.options, mse.moodAndAffectWife?.neuroVegetative?.options)}

          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3 mt-6">Affective Expression</h3>
          {renderField("", mse.affectiveExpressionHusband?.affectiveExpression?.options, mse.affectiveExpressionWife?.affectiveExpression?.options, mse.affectiveExpressionHusband?.comments, mse.affectiveExpressionWife?.comments)}

          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3 mt-6">Appropriateness</h3>
          {renderField("", mse.appropriatenessHusband?.appropriateness?.options, mse.appropriatenessWife?.appropriateness?.options, mse.appropriatenessHusband?.comments, mse.appropriatenessWife?.comments)}

          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3 mt-6">Hallucinations</h3>
          {renderField("", mse.hallucinationsHusband?.hallucinations?.options, mse.hallucinationsWife?.hallucinations?.options, mse.hallucinationsHusband?.comments, mse.hallucinationsWife?.comments)}
        </div>

        {/* ========== PAGE 5: Disassociation, Agnosia, Thought Content ========== */}
        <div className="print-break">
          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3">Disassociation</h3>
          {renderField("", mse.disassociationHusband?.disassociation?.options, mse.disassociationWife?.disassociation?.options, mse.disassociationHusband?.comments, mse.disassociationWife?.comments)}

          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3 mt-6">Agnosia</h3>
          {renderField("", mse.agnosiaHusband?.agnosia?.options, mse.agnosiaWife?.agnosia?.options, mse.agnosiaHusband?.comments, mse.agnosiaWife?.comments)}

          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3 mt-6">Content of Thought</h3>
          {renderField("", mse.contentOfThoughtHusband?.contentOfThought?.options, mse.contentOfThoughtWife?.contentOfThought?.options, mse.contentOfThoughtHusband?.comments, mse.contentOfThoughtWife?.comments)}
          {renderField("Preoccupations (SI)", mse.contentOfThoughtHusband?.preoccupationsSI?.options, mse.contentOfThoughtWife?.preoccupationsSI?.options)}
          {renderField("Hostile Intent", mse.contentOfThoughtHusband?.hostileIntent?.options, mse.contentOfThoughtWife?.hostileIntent?.options)}
          {renderField("Phobia", mse.contentOfThoughtHusband?.phobia?.options, mse.contentOfThoughtWife?.phobia?.options)}

          {(mse.contentOfThoughtHusband?.contentOfThought?.options?.includes("Delusions") ||
            mse.contentOfThoughtWife?.contentOfThought?.options?.includes("Delusions")) && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {mse.contentOfThoughtHusband?.contentOfThought?.options?.includes("Delusions") && (
                <div className="bg-white border border-sky-300 rounded-md p-3 border-l-4 border-l-sky-400">
                  <span className="block font-semibold text-gray-700 text-sm mb-1">Delusion Types (Husband)</span>
                  {renderOptions(mse.delusions0Husband?.delusions0?.options)}
                </div>
              )}
              {mse.contentOfThoughtWife?.contentOfThought?.options?.includes("Delusions") && (
                <div className="bg-white border border-sky-300 rounded-md p-3 border-l-4 border-l-sky-400">
                  <span className="block font-semibold text-gray-700 text-sm mb-1">Delusion Types (Wife)</span>
                  {renderOptions(mse.delusions0Wife?.delusions0?.options)}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ========== PAGE 6: Thought Form & Cognitive ========== */}
        <div className="print-break">
          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3">Thought Form</h3>
          {renderField("General", mse.thoughtFormHusband?.general?.options, mse.thoughtFormWife?.general?.options, mse.thoughtFormHusband?.comments, mse.thoughtFormWife?.comments)}
          {renderField("Specific", mse.thoughtFormHusband?.specific?.options, mse.thoughtFormWife?.specific?.options)}
          {renderField("Disturbances of Speech", mse.thoughtFormHusband?.disturbancesOfSpeech?.options, mse.thoughtFormWife?.disturbancesOfSpeech?.options)}
          {renderField("Aphasic Disturbances", mse.thoughtFormHusband?.aphasicDisturbances?.options, mse.thoughtFormWife?.aphasicDisturbances?.options)}

          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3 mt-6">Consciousness</h3>
          {renderField("", mse.consciousnessHusband?.consciousness?.options, mse.consciousnessWife?.consciousness?.options, mse.consciousnessHusband?.comments, mse.consciousnessWife?.comments)}

          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3 mt-6">Orientation</h3>
          {renderField("", mse.orientationHusband?.orientation?.options, mse.orientationWife?.orientation?.options, mse.orientationHusband?.comments, mse.orientationWife?.comments)}

          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3 mt-6">Concentration</h3>
          {renderField("", mse.concentrationHusband?.concentration?.options, mse.concentrationWife?.concentration?.options, mse.concentrationHusband?.comments, mse.concentrationWife?.comments)}

          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3 mt-6">Memory</h3>
          {renderField("", mse.memoryHusband?.memory?.options, mse.memoryWife?.memory?.options, mse.memoryHusband?.comments, mse.memoryWife?.comments)}
        </div>

        {/* ========== PAGE 7: Intelligence, Judgment, Insight ========== */}
        <div className="print-break">
          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3">Information & Intelligence</h3>
          {renderField("Attention", mse.informationAndIntelligenceHusband?.attention?.options, mse.informationAndIntelligenceWife?.attention?.options, mse.informationAndIntelligenceHusband?.comments, mse.informationAndIntelligenceWife?.comments)}
          {renderField("Suggestibility", mse.informationAndIntelligenceHusband?.suggestibility?.options, mse.informationAndIntelligenceWife?.suggestibility?.options)}
          {renderField("Memory", mse.informationAndIntelligenceHusband?.memory2?.options, mse.informationAndIntelligenceWife?.memory2?.options)}
          {renderField("Intelligence", mse.informationAndIntelligenceHusband?.intelligence?.options, mse.informationAndIntelligenceWife?.intelligence?.options)}

          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3 mt-6">Judgment</h3>
          {renderField("", mse.judgmentHusband?.judgment?.options, mse.judgmentWife?.judgment?.options, mse.judgmentHusband?.comments, mse.judgmentWife?.comments)}

          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3 mt-6">Insight</h3>
          {renderField("", mse.insightHusband?.insight?.options, mse.insightWife?.insight?.options, mse.insightHusband?.comments, mse.insightWife?.comments)}

          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3 mt-6">Reliability</h3>
          {renderField("", mse.reliabilityHusband?.reliability?.options, mse.reliabilityWife?.reliability?.options, mse.reliabilityHusband?.comments, mse.reliabilityWife?.comments)}
        </div>

        {/* ========== PAGE 8: Summary & Recommendations ========== */}
        <div className="print-break">
          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3">Summary</h3>
          {renderField("Global Functioning", mse.summaryHusband?.globalFunctioning?.options, mse.summaryWife?.globalFunctioning?.options, mse.summaryHusband?.comments, mse.summaryWife?.comments)}

          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3 mt-6">Indications & Recommendations</h3>
          <div className="bg-white border border-gray-300 rounded-md p-3">
            {renderValue(mse.indicationsAndRecommendations)}
          </div>
        </div>
      </div>
    </>
  );
};




const TabMentalStatusExamFamily = ({ id, refreshTabDetails,printPreviewMode }) => {
  const [isAddMode, setIsAddMode] = useState(true);

  const [patient, setPatient] = useState({
  mentalStatusExam: {
    circumstanceOfPresentationHusband: '',
    circumstanceOfPresentationWife: '',
    indicationsAndRecommendations: '',
    appearanceHusband: {
      appearance: { options: [] },
      weight: { options: [] },
      hair: { options: [] },
      otherFeatures: { options: [] },
      grooming: { options: [] },
      dress: { options: [] },
      comments: ''
    },
    appearanceWife: {
      appearance: { options: [] },
      weight: { options: [] },
      hair: { options: [] },
      otherFeatures: { options: [] },
      grooming: { options: [] },
      dress: { options: [] },
      comments: ''
    },
    behaviorHusband: {
      walk: { options: [] },
      combativeness: { options: [] },
      repetition: { options: [] },
      overactivity: { options: [] },
      catatonia: { options: [] },
      comments: ''
    },
    behaviorWife: {
      walk: { options: [] },
      combativeness: { options: [] },
      repetition: { options: [] },
      overactivity: { options: [] },
      catatonia: { options: [] },
      comments: ''
    },
    speechHusband: {
      rate: { options: [] },
      intelligibility: { options: [] },
      volume: { options: [] },
      speechQuality: { options: [] },
      speechQuantity: { options: [] },
      comments: ''
    },
    speechWife: {
      rate: { options: [] },
      intelligibility: { options: [] },
      volume: { options: [] },
      speechQuality: { options: [] },
      speechQuantity: { options: [] },
      comments: ''
    },
    attitudeToExaminerHusband: {
      attitudeToExaminer: { options: [] },
      comments: ''
    },
    attitudeToExaminerWife: {
      attitudeToExaminer: { options: [] },
      comments: ''
    },
    moodAndAffectHusband: {
      mood: { options: [] },
      otherEmotions: { options: [] },
      otherSigns: { options: [] },
      neuroVegetative: { options: [] },
      comments: ''
    },
    moodAndAffectWife: {
      mood: { options: [] },
      otherEmotions: { options: [] },
      otherSigns: { options: [] },
      neuroVegetative: { options: [] },
      comments: ''
    },
    affectiveExpressionHusband: {
      affectiveExpression: { options: [] },
      comments: ''
    },
    affectiveExpressionWife: {
      affectiveExpression: { options: [] },
      comments: ''
    },
    appropriatenessHusband: {
      appropriateness: { options: [] },
      comments: ''
    },
    appropriatenessWife: {
      appropriateness: { options: [] },
      comments: ''
    },
    hallucinationsHusband: {
      hallucinations: { options: [] },
      comments: ''
    },
    hallucinationsWife: {
      hallucinations: { options: [] },
      comments: ''
    },
    disassociationHusband: {
      disassociation: { options: [] },
      comments: ''
    },
    disassociationWife: {
      disassociation: { options: [] },
      comments: ''
    },
    agnosiaHusband: {
      agnosia: { options: [] },
      comments: ''
    },
    agnosiaWife: {
      agnosia: { options: [] },
      comments: ''
    },
    contentOfThoughtHusband: {
      contentOfThought: { options: [] },
      preoccupationsSI: { options: [] },
      hostileIntent: { options: [] },
      phobia: { options: [] },
      comments: ''
    },
    contentOfThoughtWife: {
      contentOfThought: { options: [] },
      preoccupationsSI: { options: [] },
      hostileIntent: { options: [] },
      phobia: { options: [] },
      comments: ''
    },
    delusions0Husband: {
      delusions0: { options: [] },
      comments: ''
    },
    delusions0Wife: {
      delusions0: { options: [] },
      comments: ''
    },
    thoughtFormHusband: {
      general: { options: [] },
      specific: { options: [] },
      disturbancesOfSpeech: { options: [] },
      aphasicDisturbances: { options: [] },
      comments: ''
    },
    thoughtFormWife: {
      general: { options: [] },
      specific: { options: [] },
      disturbancesOfSpeech: { options: [] },
      aphasicDisturbances: { options: [] },
      comments: ''
    },
    consciousnessHusband: {
      consciousness: { options: [] },
      comments: ''
    },
    consciousnessWife: {
      consciousness: { options: [] },
      comments: ''
    },
    orientationHusband: {
      orientation: { options: [] },
      comments: ''
    },
    orientationWife: {
      orientation: { options: [] },
      comments: ''
    },
    concentrationHusband: {
      concentration: { options: [] },
      comments: ''
    },
    concentrationWife: {
      concentration: { options: [] },
      comments: ''
    },
    memoryHusband: {
      memory: { options: [] },
      comments: ''
    },
    memoryWife: {
      memory: { options: [] },
      comments: ''
    },
    informationAndIntelligenceHusband: {
      attention: { options: [] },
      suggestibility: { options: [] },
      memory2: { options: [] },
      intelligence: { options: [] },
      comments: ''
    },
    informationAndIntelligenceWife: {
      attention: { options: [] },
      suggestibility: { options: [] },
      memory2: { options: [] },
      intelligence: { options: [] },
      comments: ''
    },
    judgmentHusband: {
      judgment: { options: [] },
      comments: ''
    },
    judgmentWife: {
      judgment: { options: [] },
      comments: ''
    },
    insightHusband: {
      insight: { options: [] },
      comments: ''
    },
    insightWife: {
      insight: { options: [] },
      comments: ''
    },
    reliabilityHusband: {
      reliability: { options: [] },
      comments: ''
    },
    reliabilityWife: {
      reliability: { options: [] },
      comments: ''
    },
    summaryHusband: {
      globalFunctioning: { options: [] },
      comments: ''
    },
    summaryWife: {
      globalFunctioning: { options: [] },
      comments: ''
    },
    generalObservationsHusband: {
      appearance: { options: [] },
      speech: { options: [] },
      eyeContact: { options: [] },
      motorActivity: { options: [] },
      affect: { options: [] },
      comments: ''
    },
    generalObservationsWife: {
      appearance: { options: [] },
      speech: { options: [] },
      eyeContact: { options: [] },
      motorActivity: { options: [] },
      affect: { options: [] },
      comments: ''
    },
    cognitionHusband: {
      orientationImpairment: { options: [] },
      memoryImpairment: { options: [] },
      attention: { options: [] },
      comments: ''
    },
    cognitionWife: {
      orientationImpairment: { options: [] },
      memoryImpairment: { options: [] },
      attention: { options: [] },
      comments: ''
    },
    thoughtsHusband: {
      suicidality: { options: [] },
      homicidality: { options: [] },
      delusions: { options: [] },
      comments: ''
    },
    thoughtsWife: {
      suicidality: { options: [] },
      homicidality: { options: [] },
      delusions: { options: [] },
      comments: ''
    }
  },
  formDate: null,
  lastModified: null
});


  const [initialPatientInformation, setInitialPatientInformation] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    type: "error",
  });
  const timeoutRef = useRef(null);
  const patientId = id;

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIsReady(true);
    }, 1000);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (patientId) {
      loadMentalStatusExam();
    }
  }, [patientId]);

  useEffect(() => {
    setInitialPatientInformation({ ...patient });
  }, [editingSection]);

  const loadMentalStatusExam = async () => {
    try {
      setIsLoading(true);
      const response = await getMentalStatusExam(patientId);
      const mseData = response.data;

      console.log('getMentalStatusExam',mseData)
      if (mseData.error) {
        setModal({
          isOpen: true,
          message: mseData.error.message,
          type: "error",
        });
        return;
      }

      setPatient(prev => ({
        ...prev,
        mentalStatusExam: {
          circumstanceOfPresentationHusband: mseData.circumstanceOfPresentationHusband || prev.mentalStatusExam.circumstanceOfPresentationHusband,
          circumstanceOfPresentationWife: mseData.circumstanceOfPresentationWife || prev.mentalStatusExam.circumstanceOfPresentationWife,
          indicationsAndRecommendations: mseData.indicationsAndRecommendations || prev.mentalStatusExam.indicationsAndRecommendations,
          appearanceHusband: mseData.appearanceHusband || prev.mentalStatusExam.appearanceHusband,
          appearanceWife: mseData.appearanceWife || prev.mentalStatusExam.appearanceWife,
          behaviorHusband: mseData.behaviorHusband || prev.mentalStatusExam.behaviorHusband,
          behaviorWife: mseData.behaviorWife || prev.mentalStatusExam.behaviorWife,
          speechHusband: mseData.speechHusband || prev.mentalStatusExam.speechHusband,
          speechWife: mseData.speechWife || prev.mentalStatusExam.speechWife,
          attitudeToExaminerHusband: mseData.attitudeToExaminerHusband || prev.mentalStatusExam.attitudeToExaminerHusband,
          attitudeToExaminerWife: mseData.attitudeToExaminerWife || prev.mentalStatusExam.attitudeToExaminerWife,
          moodAndAffectHusband: mseData.moodAndAffectHusband || prev.mentalStatusExam.moodAndAffectHusband,
          moodAndAffectWife: mseData.moodAndAffectWife || prev.mentalStatusExam.moodAndAffectWife,
          affectiveExpressionHusband: mseData.affectiveExpressionHusband || prev.mentalStatusExam.affectiveExpressionHusband,
          affectiveExpressionWife: mseData.affectiveExpressionWife || prev.mentalStatusExam.affectiveExpressionWife,
          appropriatenessHusband: mseData.appropriatenessHusband || prev.mentalStatusExam.appropriatenessHusband,
          appropriatenessWife: mseData.appropriatenessWife || prev.mentalStatusExam.appropriatenessWife,
          hallucinationsHusband: mseData.hallucinationsHusband || prev.mentalStatusExam.hallucinationsHusband,
          hallucinationsWife: mseData.hallucinationsWife || prev.mentalStatusExam.hallucinationsWife,
          disassociationHusband: mseData.disassociationHusband || prev.mentalStatusExam.disassociationHusband,
          disassociationWife: mseData.disassociationWife || prev.mentalStatusExam.disassociationWife,
          agnosiaHusband: mseData.agnosiaHusband || prev.mentalStatusExam.agnosiaHusband,
          agnosiaWife: mseData.agnosiaWife || prev.mentalStatusExam.agnosiaWife,
          contentOfThoughtHusband: mseData.contentOfThoughtHusband || prev.mentalStatusExam.contentOfThoughtHusband,
          contentOfThoughtWife: mseData.contentOfThoughtWife || prev.mentalStatusExam.contentOfThoughtWife,
          delusions0Husband: mseData.delusions0Husband || prev.mentalStatusExam.delusions0Husband,
          delusions0Wife: mseData.delusions0Wife || prev.mentalStatusExam.delusions0Wife,
          thoughtFormHusband: mseData.thoughtFormHusband || prev.mentalStatusExam.thoughtFormHusband,
          thoughtFormWife: mseData.thoughtFormWife || prev.mentalStatusExam.thoughtFormWife,
          consciousnessHusband: mseData.consciousnessHusband || prev.mentalStatusExam.consciousnessHusband,
          consciousnessWife: mseData.consciousnessWife || prev.mentalStatusExam.consciousnessWife,
          orientationHusband: mseData.orientationHusband || prev.mentalStatusExam.orientationHusband,
          orientationWife: mseData.orientationWife || prev.mentalStatusExam.orientationWife,
          concentrationHusband: mseData.concentrationHusband || prev.mentalStatusExam.concentrationHusband,
          concentrationWife: mseData.concentrationWife || prev.mentalStatusExam.concentrationWife,
          memoryHusband: mseData.memoryHusband || prev.mentalStatusExam.memoryHusband,
          memoryWife: mseData.memoryWife || prev.mentalStatusExam.memoryWife,
          informationAndIntelligenceHusband: mseData.informationAndIntelligenceHusband || prev.mentalStatusExam.informationAndIntelligenceHusband,
          informationAndIntelligenceWife: mseData.informationAndIntelligenceWife || prev.mentalStatusExam.informationAndIntelligenceWife,
          judgmentHusband: mseData.judgmentHusband || prev.mentalStatusExam.judgmentHusband,
          judgmentWife: mseData.judgmentWife || prev.mentalStatusExam.judgmentWife,
          insightHusband: mseData.insightHusband || prev.mentalStatusExam.insightHusband,
          insightWife: mseData.insightWife || prev.mentalStatusExam.insightWife,
          reliabilityHusband: mseData.reliabilityHusband || prev.mentalStatusExam.reliabilityHusband,
          reliabilityWife: mseData.reliabilityWife || prev.mentalStatusExam.reliabilityWife,
          summaryHusband: mseData.summaryHusband || prev.mentalStatusExam.summaryHusband,
          summaryWife: mseData.summaryWife || prev.mentalStatusExam.summaryWife,
          generalObservationsHusband: mseData.generalObservationsHusband || prev.mentalStatusExam.generalObservationsHusband,
          generalObservationsWife: mseData.generalObservationsWife || prev.mentalStatusExam.generalObservationsWife,
          cognitionHusband: mseData.cognitionHusband || prev.mentalStatusExam.cognitionHusband,
          cognitionWife: mseData.cognitionWife || prev.mentalStatusExam.cognitionWife,
          thoughtsHusband: mseData.thoughtsHusband || prev.mentalStatusExam.thoughtsHusband,
          thoughtsWife: mseData.thoughtsWife || prev.mentalStatusExam.thoughtsWife
        },
        formDate: mseData.formDate || prev.formDate,
        lastModified: mseData.lastModified || prev.lastModified
      }));
      setIsAddMode(!mseData.mseId);
      setEditingSection(null);
    } catch (error) {
      console.error('Error loading MSE data:', error);
      setModal({
        isOpen: true,
        message: error.message || 'Failed to load mental status exam data.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

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
    suicidality: ['None', 'Ideation', 'Plan', 'Intent', 'Self-Harm'],
    homicidality: ['None', 'Aggressive', 'Intent', 'Plan', 'Other'],
    delusions: ['None', 'Grandiose', 'Paranoid', 'Religious', 'Other'],
  };

  const handleCheckboxChange = (e, section, subSection,person) => {
  const { value, checked } = e.target;
  setPatient(prev => {
    // Ensure the section and subSection exist in the state
  const currentSection = prev.mentalStatusExam[`${section}${person}`] || {};
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
         [`${section}${person}`]: {
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



  const handleCommentChange = (e, section, person) => {
    const { value } = e.target;
    setPatient(prev => ({
      ...prev,
      mentalStatusExam: {
        ...prev.mentalStatusExam,
        [`${section}${person}`]: {
          ...prev.mentalStatusExam[`${section}${person}`],
          comments: value,
        },
      },
    }));
  };

  const handleInputTextNormal = (e, section, person) => {
    const { value } = e.target;
    setPatient(prev => ({
      ...prev,
      mentalStatusExam: {
        ...prev.mentalStatusExam,
        [`${section}${person}`]: {
          ...prev.mentalStatusExam[`${section}${person}`],
          value,
        },
      },
    }));
  };

  const handleInputTextIndications = (e, section) => {
    const { value } = e.target;
    setPatient(prev => ({
      ...prev,
      mentalStatusExam: {
        ...prev.mentalStatusExam,
        [section]: {
          ...prev.mentalStatusExam[section],
          value,
        },
      },
    }));
  };

  const handleSubmitSection = async (section) => {
    setIsLoading(true);
    setIsSaving(true);
    const payload = {
      circumstanceOfPresentationHusband: patient.mentalStatusExam.circumstanceOfPresentationHusband,
      circumstanceOfPresentationWife: patient.mentalStatusExam.circumstanceOfPresentationWife,
      indicationsAndRecommendations: patient.mentalStatusExam.indicationsAndRecommendations,
      appearanceHusband: patient.mentalStatusExam.appearanceHusband,
      appearanceWife: patient.mentalStatusExam.appearanceWife,
      behaviorHusband: patient.mentalStatusExam.behaviorHusband,
      behaviorWife: patient.mentalStatusExam.behaviorWife,
      speechHusband: patient.mentalStatusExam.speechHusband,
      speechWife: patient.mentalStatusExam.speechWife,
      attitudeToExaminerHusband: patient.mentalStatusExam.attitudeToExaminerHusband,
      attitudeToExaminerWife: patient.mentalStatusExam.attitudeToExaminerWife,
      moodAndAffectHusband: patient.mentalStatusExam.moodAndAffectHusband,
      moodAndAffectWife: patient.mentalStatusExam.moodAndAffectWife,
      affectiveExpressionHusband: patient.mentalStatusExam.affectiveExpressionHusband,
      affectiveExpressionWife: patient.mentalStatusExam.affectiveExpressionWife,
      appropriatenessHusband: patient.mentalStatusExam.appropriatenessHusband,
      appropriatenessWife: patient.mentalStatusExam.appropriatenessWife,
      hallucinationsHusband: patient.mentalStatusExam.hallucinationsHusband,
      hallucinationsWife: patient.mentalStatusExam.hallucinationsWife,
      disassociationHusband: patient.mentalStatusExam.disassociationHusband,
      disassociationWife: patient.mentalStatusExam.disassociationWife,
      agnosiaHusband: patient.mentalStatusExam.agnosiaHusband,
      agnosiaWife: patient.mentalStatusExam.agnosiaWife,
      contentOfThoughtHusband: patient.mentalStatusExam.contentOfThoughtHusband,
      contentOfThoughtWife: patient.mentalStatusExam.contentOfThoughtWife,
      delusions0Husband: patient.mentalStatusExam.delusions0Husband,
      delusions0Wife: patient.mentalStatusExam.delusions0Wife,
      thoughtFormHusband: patient.mentalStatusExam.thoughtFormHusband,
      thoughtFormWife: patient.mentalStatusExam.thoughtFormWife,
      consciousnessHusband: patient.mentalStatusExam.consciousnessHusband,
      consciousnessWife: patient.mentalStatusExam.consciousnessWife,
      orientationHusband: patient.mentalStatusExam.orientationHusband,
      orientationWife: patient.mentalStatusExam.orientationWife,
      concentrationHusband: patient.mentalStatusExam.concentrationHusband,
      concentrationWife: patient.mentalStatusExam.concentrationWife,
      memoryHusband: patient.mentalStatusExam.memoryHusband,
      memoryWife: patient.mentalStatusExam.memoryWife,
      informationAndIntelligenceHusband: patient.mentalStatusExam.informationAndIntelligenceHusband,
      informationAndIntelligenceWife: patient.mentalStatusExam.informationAndIntelligenceWife,
      judgmentHusband: patient.mentalStatusExam.judgmentHusband,
      judgmentWife: patient.mentalStatusExam.judgmentWife,
      insightHusband: patient.mentalStatusExam.insightHusband,
      insightWife: patient.mentalStatusExam.insightWife,
      reliabilityHusband: patient.mentalStatusExam.reliabilityHusband,
      reliabilityWife: patient.mentalStatusExam.reliabilityWife,
      summaryHusband: patient.mentalStatusExam.summaryHusband,
      summaryWife: patient.mentalStatusExam.summaryWife,
      generalObservationsHusband: patient.mentalStatusExam.generalObservationsHusband,
      generalObservationsWife: patient.mentalStatusExam.generalObservationsWife,
      cognitionHusband: patient.mentalStatusExam.cognitionHusband,
      cognitionWife: patient.mentalStatusExam.cognitionWife,
      thoughtsHusband: patient.mentalStatusExam.thoughtsHusband,
      thoughtsWife: patient.mentalStatusExam.thoughtsWife,
      isConfirm: 1,
    };

    try {
      const res = await updateMentalStatusExamFamily(patientId, payload);
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

  const handleSubmitAll = async () => {
    setIsLoading(true);
    setIsSaving(true);
    const payload = {
      patientId: patientId,
      circumstanceOfPresentationHusband: patient.mentalStatusExam.circumstanceOfPresentationHusband,
      circumstanceOfPresentationWife: patient.mentalStatusExam.circumstanceOfPresentationWife,
      indicationsAndRecommendations: patient.mentalStatusExam.indicationsAndRecommendations,
      appearanceHusband: patient.mentalStatusExam.appearanceHusband,
      appearanceWife: patient.mentalStatusExam.appearanceWife,
      behaviorHusband: patient.mentalStatusExam.behaviorHusband,
      behaviorWife: patient.mentalStatusExam.behaviorWife,
      speechHusband: patient.mentalStatusExam.speechHusband,
      speechWife: patient.mentalStatusExam.speechWife,
      attitudeToExaminerHusband: patient.mentalStatusExam.attitudeToExaminerHusband,
      attitudeToExaminerWife: patient.mentalStatusExam.attitudeToExaminerWife,
      moodAndAffectHusband: patient.mentalStatusExam.moodAndAffectHusband,
      moodAndAffectWife: patient.mentalStatusExam.moodAndAffectWife,
      affectiveExpressionHusband: patient.mentalStatusExam.affectiveExpressionHusband,
      affectiveExpressionWife: patient.mentalStatusExam.affectiveExpressionWife,
      appropriatenessHusband: patient.mentalStatusExam.appropriatenessHusband,
      appropriatenessWife: patient.mentalStatusExam.appropriatenessWife,
      hallucinationsHusband: patient.mentalStatusExam.hallucinationsHusband,
      hallucinationsWife: patient.mentalStatusExam.hallucinationsWife,
      disassociationHusband: patient.mentalStatusExam.disassociationHusband,
      disassociationWife: patient.mentalStatusExam.disassociationWife,
      agnosiaHusband: patient.mentalStatusExam.agnosiaHusband,
      agnosiaWife: patient.mentalStatusExam.agnosiaWife,
      contentOfThoughtHusband: patient.mentalStatusExam.contentOfThoughtHusband,
      contentOfThoughtWife: patient.mentalStatusExam.contentOfThoughtWife,
      delusions0Husband: patient.mentalStatusExam.delusions0Husband,
      delusions0Wife: patient.mentalStatusExam.delusions0Wife,
      thoughtFormHusband: patient.mentalStatusExam.thoughtFormHusband,
      thoughtFormWife: patient.mentalStatusExam.thoughtFormWife,
      consciousnessHusband: patient.mentalStatusExam.consciousnessHusband,
      consciousnessWife: patient.mentalStatusExam.consciousnessWife,
      orientationHusband: patient.mentalStatusExam.orientationHusband,
      orientationWife: patient.mentalStatusExam.orientationWife,
      concentrationHusband: patient.mentalStatusExam.concentrationHusband,
      concentrationWife: patient.mentalStatusExam.concentrationWife,
      memoryHusband: patient.mentalStatusExam.memoryHusband,
      memoryWife: patient.mentalStatusExam.memoryWife,
      informationAndIntelligenceHusband: patient.mentalStatusExam.informationAndIntelligenceHusband,
      informationAndIntelligenceWife: patient.mentalStatusExam.informationAndIntelligenceWife,
      judgmentHusband: patient.mentalStatusExam.judgmentHusband,
      judgmentWife: patient.mentalStatusExam.judgmentWife,
      insightHusband: patient.mentalStatusExam.insightHusband,
      insightWife: patient.mentalStatusExam.insightWife,
      reliabilityHusband: patient.mentalStatusExam.reliabilityHusband,
      reliabilityWife: patient.mentalStatusExam.reliabilityWife,
      summaryHusband: patient.mentalStatusExam.summaryHusband,
      summaryWife: patient.mentalStatusExam.summaryWife,
      generalObservationsHusband: patient.mentalStatusExam.generalObservationsHusband,
      generalObservationsWife: patient.mentalStatusExam.generalObservationsWife,
      cognitionHusband: patient.mentalStatusExam.cognitionHusband,
      cognitionWife: patient.mentalStatusExam.cognitionWife,
      thoughtsHusband: patient.mentalStatusExam.thoughtsHusband,
      thoughtsWife: patient.mentalStatusExam.thoughtsWife,
      isConfirm: 1,
    };

    try {
      const res = await addMentalStatusExamFamily(payload);
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

  const handleCancel = () => {
    if (initialPatientInformation) {
      setPatient(initialPatientInformation);
    }
    setEditingSection(null);
  };

  const renderSection = (title, sectionKey, icon, subSections) => {
    const husbandSection = `${sectionKey}Husband`;
    const wifeSection = `${sectionKey}Wife`;
    return (
      <section className="mb-8 rounded-lg border border-gray-200 bg-white">
        <div className="flex justify-between items-center mb-0 px-6 py-3">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-2 px-6">
              <div></div>
              <div className="col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                  <div className="font-bold text-md">Husband</div>
                  <div className="font-bold text-md">Wife</div>
                </div>
              </div>
            </div>
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                          <div>
                            {mseOptions[key].map((option) => (
                              <label key={option} className="flex items-center flex-wrap mb-1">
                                <input
                                  type="checkbox"
                                  name={`${husbandSection}.${key}.options`}
                                  value={option}
                                  checked={(patient.mentalStatusExam[husbandSection][key]?.options || []).includes(option)}
                                  onChange={(e) => handleCheckboxChange(e, sectionKey, key, 'Husband')}
                                  className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded cursor-pointer"
                                  aria-label={option}
                                />
                                <span className="ml-2 text-md text-gray-700 cursor-pointer">{option}</span>
                              </label>
                            ))}
                          </div>
                          <div>
                            {mseOptions[key].map((option) => (
                              <label key={option} className="flex items-center flex-wrap mb-1">
                                <input
                                  type="checkbox"
                                  name={`${wifeSection}.${key}.options`}
                                  value={option}
                                  checked={(patient.mentalStatusExam[wifeSection][key]?.options || []).includes(option)}
                                  onChange={(e) => handleCheckboxChange(e, sectionKey, key, 'Wife')}
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
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="pr-4">
                        <h4 className="text-md font-bold text-gray-700">{title}</h4>
                      </div>
                      <div className="col-span-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                          <div>
                            {mseOptions[key].map((option) => (
                              <div key={option} className="flex items-center group flex-wrap mb-1" aria-label={option}>
                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 transition-all duration-200 ${
                                    (patient.mentalStatusExam[husbandSection][key]?.options || []).includes(option)
                                      ? "bg-sky-600"
                                      : "bg-gray-200 group-hover:bg-gray-300"
                                  }`}
                                >
                                  {(patient.mentalStatusExam[husbandSection][key]?.options || []).includes(option) && (
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
                                    (patient.mentalStatusExam[husbandSection][key]?.options || []).includes(option)
                                      ? "text-sky-600 font-medium"
                                      : "text-gray-600"
                                  } group-hover:text-gray-800 transition-colors duration-200`}
                                >
                                  {option}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div>
                            {mseOptions[key].map((option) => (
                              <div key={option} className="flex items-center group flex-wrap mb-1" aria-label={option}>
                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 transition-all duration-200 ${
                                    (patient.mentalStatusExam[wifeSection][key]?.options || []).includes(option)
                                      ? "bg-sky-600"
                                      : "bg-gray-200 group-hover:bg-gray-300"
                                  }`}
                                >
                                  {(patient.mentalStatusExam[wifeSection][key]?.options || []).includes(option) && (
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
                                    (patient.mentalStatusExam[wifeSection][key]?.options || []).includes(option)
                                      ? "text-sky-600 font-medium"
                                      : "text-gray-600"
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
                  </div>
                )}
              </div>
            ))}
            <div className="px-6 pb-4">
              {(isAddMode || editingSection === sectionKey) && (
                <h4 className="text-md font-bold text-gray-700 mb-2">Comments:</h4>
              )}
              {(isAddMode || editingSection === sectionKey) ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
                  <div>
                    {/* <h5 className="text-md font-semibold text-gray-700 mb-1">Husband</h5> */}
                    <VoiceToText
                      value={patient.mentalStatusExam[husbandSection].comments}
                      onChange={(e) => handleCommentChange(e, sectionKey, 'Husband')}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="3"
                      placeholder="Enter comments for Husband"
                      aria-label={`${title} Husband comments`}
                    />
                  </div>
                  {/* <div>
                    <h5 className="text-md font-semibold text-gray-700 mb-1">Wife</h5>
                    <VoiceToText
                      value={patient.mentalStatusExam[wifeSection].comments}
                      onChange={(e) => handleCommentChange(e, sectionKey, 'Wife')}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="3"
                      placeholder="Enter comments for Wife"
                      aria-label={`${title} Wife comments`}
                    />
                  </div> */}
                </div>
              ) : (
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
                        {patient.mentalStatusExam[husbandSection].comments &&  <div>
                    <p className="text-md font-bold text-gray-700"> Comments:</p>
                    <p className="text-md text-gray-600 p-3 rounded-md whitespace-pre-line">
                      {patient.mentalStatusExam[husbandSection].comments}
                    </p>
                  </div>}
                  {/* <div>
                    <p className="text-md font-bold text-gray-700">Wife Comments:</p>
                    <p className="text-md text-gray-600 p-3 rounded-md whitespace-pre-line">
                      {patient.mentalStatusExam[wifeSection].comments}
                    </p>
                  </div> */}
                </div>
              )}
            </div>
          </>
        )}
      </section>
    );
  };

  const renderSectionMood = (title, sectionKey, icon, subSections) => {
    const husbandSection = `${sectionKey}Husband`;
    const wifeSection = `${sectionKey}Wife`;
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
                {/* <h4 className="text-md font-bold text-gray-700 mb-2">{title || key.charAt(0).toUpperCase() + key.slice(1)}</h4> */}
                {(isAddMode || editingSection === sectionKey) ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                      <div className="pl-5">
                        <div className="font-bold mb-2">Husband</div>
                        {mseOptions[key].map((option) => (
                          <label key={option} className="flex items-center mb-1">
                            <input
                              type="checkbox"
                              name={`${husbandSection}.${key}.options`}
                              value={option}
                              checked={(patient.mentalStatusExam[husbandSection][key]?.options || []).includes(option)}
                              onChange={(e) => handleCheckboxChange(e, sectionKey, key, 'Husband')}
                              className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded cursor-pointer"
                              aria-label={option}
                            />
                            <span className="ml-2 text-md text-gray-700 cursor-pointer">{option}</span>
                          </label>
                        ))}
                      </div>
                      <div className="pl-5">
                        <div className="font-bold mb-2">Wife</div>
                        {mseOptions[key].map((option) => (
                          <label key={option} className="flex items-center mb-1">
                            <input
                              type="checkbox"
                              name={`${wifeSection}.${key}.options`}
                              value={option}
                              checked={(patient.mentalStatusExam[wifeSection][key]?.options || []).includes(option)}
                              onChange={(e) => handleCheckboxChange(e, sectionKey, key, 'Wife')}
                              className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded cursor-pointer"
                              aria-label={option}
                            />
                            <span className="ml-2 text-md text-gray-700 cursor-pointer">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                      <div className="pl-5">
                        <div className="font-bold mb-2">Husband</div>
                        {mseOptions[key].map((option) => (
                          <div key={option} className="flex items-center group mb-1" aria-label={option}>
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 transition-all duration-200 ${
                                (patient.mentalStatusExam[husbandSection][key]?.options || []).includes(option)
                                  ? "bg-sky-600"
                                  : "bg-gray-200 group-hover:bg-gray-300"
                              }`}
                            >
                              {(patient.mentalStatusExam[husbandSection][key]?.options || []).includes(option) && (
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
                                (patient.mentalStatusExam[husbandSection][key]?.options || []).includes(option)
                                  ? "text-sky-600 font-medium"
                                  : "text-gray-600"
                              } group-hover:text-gray-800 transition-colors duration-200`}
                            >
                              {option}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="pl-5">
                        <div className="font-bold mb-2">Wife</div>
                        {mseOptions[key].map((option) => (
                          <div key={option} className="flex items-center group mb-1" aria-label={option}>
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 transition-all duration-200 ${
                                (patient.mentalStatusExam[wifeSection][key]?.options || []).includes(option)
                                  ? "bg-sky-600"
                                  : "bg-gray-200 group-hover:bg-gray-300"
                              }`}
                            >
                              {(patient.mentalStatusExam[wifeSection][key]?.options || []).includes(option) && (
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
                                (patient.mentalStatusExam[wifeSection][key]?.options || []).includes(option)
                                  ? "text-sky-600 font-medium"
                                  : "text-gray-600"
                              } group-hover:text-gray-800 transition-colors duration-200`}
                            >
                              {option}
                            </span>
                          </div>
                        ))}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
                  <div>
                    {/* <h5 className="text-md font-semibold text-gray-700 mb-1">Husband</h5> */}
                    <VoiceToText
                      value={patient.mentalStatusExam[husbandSection].comments}
                      onChange={(e) => handleCommentChange(e, sectionKey, 'Husband')}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="3"
                      placeholder="Enter comments for Husband"
                      aria-label={`${title} Husband comments`}
                    />
                  </div>
                  {/* <div>
                    <h5 className="text-md font-semibold text-gray-700 mb-1">Wife</h5>
                    <VoiceToText
                      value={patient.mentalStatusExam[wifeSection].comments}
                      onChange={(e) => handleCommentChange(e, sectionKey, 'Wife')}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="3"
                      placeholder="Enter comments for Wife"
                      aria-label={`${title} Wife comments`}
                    />
                  </div> */}
                </div>
              ) : (
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
                {patient.mentalStatusExam[husbandSection].comments &&   <div>
                    <p className="text-md font-bold text-gray-700"> Comments:</p>
                    <p className="text-md text-gray-600 p-3 rounded-md whitespace-pre-line">
                      {patient.mentalStatusExam[husbandSection].comments}
                    </p>
                  </div>}
                  {/* <div>
                    <p className="text-md font-bold text-gray-700">Wife Comments:</p>
                    <p className="text-md text-gray-600 p-3 rounded-md whitespace-pre-line">
                      {patient.mentalStatusExam[wifeSection].comments}
                    </p>
                  </div> */}
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
        <div className="flex justify-between items-center mb-4 px-6 py-2">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center">
            <FaUserClock className="mr-2 text-gray-700" size={20} /> Circumstance of presentation
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-2 px-6">
          <div>
            <div className="font-bold">Husband</div>
            <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0">
              {isLoading && editingSection === sectionKey ? (
                <LoadingSpinner />
              ) : (
                <div className="space-y-4">
                  {(isAddMode || editingSection === sectionKey) ? (
                    <VoiceToText
                      value={patient.mentalStatusExam.circumstanceOfPresentationHusband}
                      onChange={(e) => handleInputTextNormal(e, sectionKey, 'Husband')}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="3"
                      placeholder="Enter Circumstance of presentation for Husband"
                      aria-label="Circumstance of presentation Husband"
                    />
                  ) : (
                    <p className="text-gray-700 mt-1 whitespace-pre-line">{patient.mentalStatusExam.circumstanceOfPresentationHusband}</p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="font-bold">Wife</div>
            <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0">
              {isLoading && editingSection === sectionKey ? (
                <LoadingSpinner />
              ) : (
                <div className="space-y-4">
                  {(isAddMode || editingSection === sectionKey) ? (
                    <VoiceToText
                      value={patient.mentalStatusExam.circumstanceOfPresentationWife}
                      onChange={(e) => handleInputTextNormal(e, sectionKey, 'Wife')}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="3"
                      placeholder="Enter Circumstance of presentation for Wife"
                      aria-label="Circumstance of presentation Wife"
                    />
                  ) : (
                    <p className="text-gray-700 mt-1 whitespace-pre-line">{patient.mentalStatusExam.circumstanceOfPresentationWife}</p>
                  )}
                </div>
              )}
            </div>
          </div>
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
          {isLoading && editingSection === sectionKey ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-4">
              {(isAddMode || editingSection === sectionKey) ? (
                <VoiceToText
                  value={patient.mentalStatusExam.indicationsAndRecommendations}
                  onChange={(e) => handleInputTextIndications(e, 'indicationsAndRecommendations')}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  rows="3"
                  placeholder="Indications & Recommendations"
                  aria-label="Indications & Recommendations"
                />
              ) : (
                <p className="text-gray-700 mt-1 whitespace-pre-line">{patient.mentalStatusExam.indicationsAndRecommendations}</p>
              )}
            </div>
          )}
        </div>

      </section>
    );
  };

  const renderSectionWithNested = (title, sectionKey, icon, subSections) => {
  const husbandSection = `${sectionKey}Husband`;
  const wifeSection = `${sectionKey}Wife`;
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-2 px-6">
            <div></div>
            <div className="col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                <div className="font-bold">Husband</div>
                <div className="font-bold">Wife</div>
              </div>
            </div>
          </div>
          {subSections.map(({ key, title }) => (
            <div
              key={key}
              className="border-b border-gray-200 pb-3 mb-3 last:border-b-0 last:mb-0 px-6"
            >
              {(isAddMode || editingSection === sectionKey) ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="pr-4">
                    <h4 className="text-md font-bold text-gray-700">{title}</h4>
                  </div>
                  <div className="col-span-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                      <div>
                        {mseOptions[key].map((option) => (
                          <label key={option} className="flex items-center flex-wrap mb-1">
                            <input
                              type="checkbox"
                              name={`${husbandSection}.${key}.options`}
                              value={option}
                              checked={(patient.mentalStatusExam[husbandSection][key]?.options || []).includes(option)}
                              onChange={(e) => handleCheckboxChange(e, sectionKey, key, 'Husband')}
                              className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded cursor-pointer"
                              aria-label={option}
                            />
                            <span className="ml-2 text-md text-gray-700 cursor-pointer">{option}</span>
                          </label>
                        ))}
                      </div>
                      <div>
                        {mseOptions[key].map((option) => (
                          <label key={option} className="flex items-center flex-wrap mb-1">
                            <input
                              type="checkbox"
                              name={`${wifeSection}.${key}.options`}
                              value={option}
                              checked={(patient.mentalStatusExam[wifeSection][key]?.options || []).includes(option)}
                              onChange={(e) => handleCheckboxChange(e, sectionKey, key, 'Wife')}
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="pr-4">
                    <h4 className="text-md font-bold text-gray-700">{title}</h4>
                  </div>
                  <div className="col-span-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                      <div>
                        {mseOptions[key].map((option) => (
                          <div key={option} className="flex items-center group flex-wrap mb-1" aria-label={option}>
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 transition-all duration-200 ${
                                (patient.mentalStatusExam[husbandSection][key]?.options || []).includes(option)
                                  ? "bg-sky-600"
                                  : "bg-gray-200 group-hover:bg-gray-300"
                              }`}
                            >
                              {(patient.mentalStatusExam[husbandSection][key]?.options || []).includes(option) && (
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
                                (patient.mentalStatusExam[husbandSection][key]?.options || []).includes(option)
                                  ? "text-sky-600 font-medium"
                                  : "text-gray-600"
                              } group-hover:text-gray-800 transition-colors duration-200`}
                            >
                              {option}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div>
                        {mseOptions[key].map((option) => (
                          <div key={option} className="flex items-center group flex-wrap mb-1" aria-label={option}>
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 transition-all duration-200 ${
                                (patient.mentalStatusExam[wifeSection][key]?.options || []).includes(option)
                                  ? "bg-sky-600"
                                  : "bg-gray-200 group-hover:bg-gray-300"
                              }`}
                            >
                              {(patient.mentalStatusExam[wifeSection][key]?.options || []).includes(option) && (
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
                                (patient.mentalStatusExam[wifeSection][key]?.options || []).includes(option)
                                  ? "text-sky-600 font-medium"
                                  : "text-gray-600"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
                <div>
                  {/* <h5 className="text-md font-semibold text-gray-700 mb-1">Husband</h5> */}
                  <VoiceToText
                    value={patient.mentalStatusExam[husbandSection].comments}
                    onChange={(e) => handleCommentChange(e, sectionKey, 'Husband')}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="3"
                    placeholder="Enter comments for Husband"
                    aria-label={`${title} Husband comments`}
                  />
                </div>
                {/* <div>
                  <h5 className="text-md font-semibold text-gray-700 mb-1">Wife</h5>
                  <VoiceToText
                    value={patient.mentalStatusExam[wifeSection].comments}
                    onChange={(e) => handleCommentChange(e, sectionKey, 'Wife')}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="3"
                    placeholder="Enter comments for Wife"
                    aria-label={`${title} Wife comments`}
                  />
                </div> */}
              </div>
            ) : (
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
                {patient.mentalStatusExam[husbandSection].comments && <div>
                  <p className="text-md font-bold text-gray-700">Comments:</p>
                  <p className="text-md text-gray-600 p-3 rounded-md whitespace-pre-line">
                    {patient.mentalStatusExam[husbandSection].comments}
                  </p>
                </div>}
                {/* <div>
                  <p className="text-md font-bold text-gray-700">Wife Comments:</p>
                  <p className="text-md text-gray-600 p-3 rounded-md whitespace-pre-line">
                    {patient.mentalStatusExam[wifeSection].comments}
                  </p>
                </div> */}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}



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

    {!isLoading ?  (


!printPreviewMode ?
  <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-6">
        <h3 className="flex items-center text-xl font-bold text-gray-700">
          {/* <FaBrain className="mr-3" size={32} /> */}
          Mental Status Exam
        </h3>

   
   
      {/* <div className='text-center text-gray-700'>
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
</div> */}

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

</>
    
:<PrintMentalStatusExamFamilyA4 mse={patient.mentalStatusExam} printPreviewMode={true} />
    )

:null}


    </div>


         </>
  );
};

export default TabMentalStatusExamFamily;
