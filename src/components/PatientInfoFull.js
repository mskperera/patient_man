import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaGraduationCap,
  FaBrain,
  FaUsers,
  FaInfoCircle,
  FaChild,
  FaExclamationCircle,
} from "react-icons/fa";
import { FaBookMedical, FaHeartPulse } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import NotesTab from "./NotesTab";
import TabMentalStatusExam from "../components/mentalStatusExam/TabMentalStatusExam";
import {
  getPatientBasicInfo,
  getProfileTabDetails,
} from "../functions/patient";
import TabBasicInformation from "./patientBasicInformation/TabBasicInformation";
import TabPersonalInformationChild from "./patientPersonalInfo/TabPersonalInformationChild";
import TabPersonalInformationIndividual from "./patientPersonalInfo/TabPersonalInformationIndividual";
import TabFamilyInformationChild from "./TabFamilyInformationChild";
import TabMentalHealthChild from "./patientMentalHealth/TabMentalHealthChild";
import TabBasicInformationFamily from "./patientBasicInformation/TabBasicInformationFamily";
import TabPersonalInformationFamily from "./patientPersonalInfo/TabPersonalInformationFamily";
import TabMentalHealthFamily from "./patientMentalHealth/TabMentalHealthFamily";
import TabEducationDetailsFamily from "./patientEducation/TabEducationDetailsFamily";
import TabEducationDetailsChild from "./patientEducation/TabEducationDetailsChild";
import TabMentalHealthIndividual from "./patientMentalHealth/TabMentalHealthIndividual";
import TabEducationDetailsIndividual from "./patientEducation/TabEducationDetailsIndividual";
import LoadingSpinner from "./LoadingSpinner";
import TabMentalStatusExamFamily from "./mentalStatusExam/TabMentalStatusExamFamily";
import PsychiatricNotesTab from "./PsychiatricNotesTab";

import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";



const printStyles = `
  @media print {
  body * {
    visibility: hidden;
  }

  .print-area, .print-area * {
    visibility: visible;
  }

  .print-area {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }

      .no-print {
      display: none !important;
      visibility: hidden !important;
    }
      
}

`;


function PatientInfoFull({ mode = "view" }) {
  const [searchParams] = useSearchParams();
  const patientType = searchParams.get("type");
  const modeFromQuery = searchParams.get("mode");
  const id = searchParams.get("id");
  const userId = localStorage.getItem("userId");
  const user = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));

// … inside the component, before the return
const navigate = useNavigate();

const BackButton = () => (
  <button
    onClick={() => navigate(-1)}               // go back to previous page
    className="absolute left-10 flex items-center gap-2 text-sky-700 hover:text-sky-900
               font-bold text-lg transition-colors"
  >
    <FaArrowLeft size={20} />
    Back
  </button>
);


  const [isLoading, setIsLoading] = useState(true);
  const [tabDetails, setTabDetails] = useState({
    isBasicInfo: false,
    isEducationInfo: false,
    isFamilyInfo: false,
    isMedicalInfo: false,
    isPersonalInfo: false,
    isMentalStatusExam: false,
  });
  const [basicInformation, setBasicInformation] = useState(null);
  const [newId, setNewId] = useState("");

  const loadBasicInformationData = async () => {
    setIsLoading(true);
    const result = await getPatientBasicInfo(id);
    const patientData = result.data;
    console.log("patientData", patientData);
    if (patientData) {
      setBasicInformation(patientData);
    }
    setIsLoading(false);
  };

  const loadProfileTabDetails = async () => {
    const result = await getProfileTabDetails(id);
    const data = result.data;
    setTabDetails(data);
    console.log("getProfileTabDetails", data);
  };

  useEffect(() => {
    if (id) {
      loadBasicInformationData();
      loadProfileTabDetails();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const refreshTabDetailsHandler = () => {
    loadProfileTabDetails();
  };

  const renderHeader = (title, icon, isComplete) => (
    <div className="flex items-center mb-4 border-b-2 border-sky-200 pb-2">
      {icon}
      <h2 className="text-xl font-bold text-gray-800 ml-3">{title}</h2>
      {!isComplete && (
        <FaExclamationCircle className="text-orange-500 text-lg ml-2" />
      )}
    </div>
  );

    const handlePrint = () => {
    window.print();
  };

  return (
    <>
         {/* Inject print CSS */}
      <style>{printStyles}</style>
   
    <div className="p-6 min-h-screen">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
              <div className="no-print">
     
{/* 
        <div className="flex justify-end items-center">
        

                          <button className="border-gray-100 rounded-xl text-white bg-green-500 hover:bg-green-600 p-4" onClick={handlePrint}>🖨️ Print Report</button>
              </div> */}



          {/* <div className="mb-6">
            {patientType === "1" && (
              <div className="flex justify-between items-center">
              <h1 className="flex items-center text-2xl font-bold text-gray-800">
                <FaUser className="mr-3" size={28} />
                Patient Biographical Information - Individual
              </h1>

                          <button onClick={handlePrint}>🖨️ Print Report</button>
              </div>
            )}
            {patientType === "2" && (
              <h1 className="flex items-center text-2xl font-bold text-gray-800">
                <FaChild className="mr-3" size={28} />
                Patient Biographical Information - Child
              </h1>
            )}
            {patientType === "3" && (
              <h1 className="flex items-center text-2xl font-bold text-gray-800">
                <FaUsers className="mr-3" size={28} />
                Patient Biographical Information - Family
              </h1>
            )}
    
          </div> */}
          </div>

        <div className="print-area bg-white pt-5 relative">
            <div className="no-print">
 <BackButton /> 
              
                <div className="absolute top-4 right-4">
  <button
    className="rounded-xl text-white bg-green-500 hover:bg-green-600 p-4 border border-gray-100 shadow-lg"
    onClick={handlePrint}
  >
    🖨️ Print Report
  </button>
</div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
            {patientType === "1" && (
              <>
    
          <div className="mx-auto max-w-[210mm] bg-white font-sans text-sm leading-relaxed">

                 <header className="text-center mb-5">
        <h2 className="text-2xl uppercase font-bold text-gray-800 tracking-wide">
  Patient Biographical Information (Individual)
</h2>

 
          {/* <div className="mt-2 h-1 w-24 bg-sky-700 mx-auto"></div> */}
        </header>


 {/* <div>
  <svg className="inline w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
  <strong>Printed:</strong>{" "}
  {new Date()
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // 👈 adds AM/PM
    })
    .replace(",", "")}
</div> */}

          </div>
    
                <TabBasicInformation
                  patientTypeId={patientType}
                  refreshTabDetails={refreshTabDetailsHandler}
                  id={id || newId}
                  setNewId={setNewId}
                  printPreviewMode={true}
                />

           
                  <>
                    {/* {renderHeader("Personal", <FaUser size={20} />, tabDetails.isPersonalInfo)} */}
                  {tabDetails.isPersonalInfo ? <TabPersonalInformationIndividual
                      refreshTabDetails={refreshTabDetailsHandler}
                      id={id || newId}
                             printPreviewMode={true}
                    />:''}

                    {/* {renderHeader("Mental Health", <FaHeartPulse size={20} />, tabDetails.isMedicalInfo)} */}
                     {tabDetails.isMedicalInfo ? <TabMentalHealthIndividual
                      refreshTabDetails={refreshTabDetailsHandler}
                      id={id || newId}
                             printPreviewMode={true}
                    />:''}

                    {/* {renderHeader("Education", <FaGraduationCap size={20} />, tabDetails.isEducationInfo)} */}
                      {tabDetails.isEducationInfo ? <TabEducationDetailsIndividual
                      refreshTabDetails={refreshTabDetailsHandler}
                      id={id || newId}
                             printPreviewMode={true}
                    />:''}

                    {/* {renderHeader("Mental Status Exam", <FaBrain size={20} />, tabDetails.isMentalStatusExam)} */}
                    {tabDetails.isMentalStatusExam ? <TabMentalStatusExam
                      refreshTabDetails={refreshTabDetailsHandler}
                      id={id || newId}
                             printPreviewMode={true}
                    />:''}

                    {/* {renderHeader("Management and Notes", <FaBookMedical size={20} />, true)} */}
                    <NotesTab patientId={id || newId} userId={userId} printPreviewMode={true} />

                    {/* {renderHeader("Psychiatric Notes", <FaBookMedical size={20} />, true)} */}
                    <PsychiatricNotesTab patientId={id || newId} userId={userId} printPreviewMode={true} />
                  </>
           
              </>
            )}

            {patientType === "2" && (
              <>

          <div className="mx-auto max-w-[210mm] bg-white font-sans text-sm leading-relaxed">

                 <header className="text-center mb-5">
        <h2 className="text-2xl uppercase font-bold text-gray-800 tracking-wide">
   Patient Biographical Information (Child)
</h2>

 
          {/* <div className="mt-2 h-1 w-24 bg-sky-700 mx-auto"></div> */}
        </header>


 {/* <div>
  <svg className="inline w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
  <strong>Printed:</strong>{" "}
  {new Date()
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // 👈 adds AM/PM
    })
    .replace(",", "")}
</div> */}

          </div>
    



                {/* {renderHeader("Basic Information", <FaInfoCircle size={20} />, tabDetails.isBasicInfo)} */}
                <TabBasicInformation
                  patientTypeId={patientType}
                  refreshTabDetails={refreshTabDetailsHandler}
                  id={id || newId}
                  setNewId={setNewId}
                         printPreviewMode={true}
                />

        
                  <>
                    {/* {renderHeader("Personal", <FaUser size={20} />, tabDetails.isPersonalInfo)} */}
                       {tabDetails.isPersonalInfo ?    <TabPersonalInformationChild
                      refreshTabDetails={refreshTabDetailsHandler}
                      id={id || newId}
                             printPreviewMode={true}
                    />:''}

                    {/* {renderHeader("Family", <FaUsers size={20} />, tabDetails.isFamilyInfo)} */}
                        {tabDetails.isFamilyInfo ?   <TabFamilyInformationChild
                      refreshTabDetails={refreshTabDetailsHandler}
                      id={id || newId}
                             printPreviewMode={true}
                    />:''}

                    {/* {renderHeader("Mental Health", <FaHeartPulse size={20} />, tabDetails.isMedicalInfo)} */}
                      {tabDetails.isMedicalInfo ?     <TabMentalHealthChild
                      refreshTabDetails={refreshTabDetailsHandler}
                      id={id || newId}
                             printPreviewMode={true}
                    /> :''}

                    {/* {renderHeader("Education", <FaGraduationCap size={20} />, tabDetails.isEducationInfo)} */}
                       {tabDetails.isEducationInfo ?    <TabEducationDetailsChild
                      refreshTabDetails={refreshTabDetailsHandler}
                      id={id || newId}
                             printPreviewMode={true}
                    />:''}

                    {/* {renderHeader("Mental Status Exam", <FaBrain size={20} />, tabDetails.isMentalStatusExam)} */}
                       {tabDetails.isMentalStatusExam ?    <TabMentalStatusExam
                      refreshTabDetails={refreshTabDetailsHandler}
                      id={id || newId} printPreviewMode={true}
                    />:''}

                    {/* {renderHeader("Management and Notes", <FaBookMedical size={20} />, true)} */}
                    <NotesTab patientId={id || newId} userId={userId} printPreviewMode={true} />

                    {/* {renderHeader("Psychiatric Notes", <FaBookMedical size={20} />, true)} */}
                    <PsychiatricNotesTab patientId={id || newId} userId={userId} printPreviewMode={true} />
                  </>
              
              </>
            )}

            {patientType === "3" && (
              <>

          <div className="mx-auto max-w-[210mm] bg-white font-sans text-sm leading-relaxed">

                 <header className="text-center mb-5">
        <h2 className="text-2xl uppercase font-bold text-gray-800 tracking-wide">
   Patient Biographical Information (Family)
</h2>

 
          {/* <div className="mt-2 h-1 w-24 bg-sky-700 mx-auto"></div> */}
        </header>


 {/* <div>
  <svg className="inline w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
  <strong>Printed:</strong>{" "}
  {new Date()
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // 👈 adds AM/PM
    })
    .replace(",", "")}
</div> */}

          </div>
        
                {/* {renderHeader("Basic Information", <FaInfoCircle size={20} />, tabDetails.isBasicInfo)} */}
                <TabBasicInformationFamily
                  patientTypeId={patientType}
                  refreshTabDetails={refreshTabDetailsHandler}
                  id={id || newId}
                  setNewId={setNewId}
                         printPreviewMode={true}
                />

                {tabDetails.isBasicInfo && (
                  <>
                    {/* {renderHeader("Personal", <FaUser size={20} />, tabDetails.isPersonalInfo)} */}
                    {tabDetails.isPersonalInfo ?  <TabPersonalInformationFamily
                      refreshTabDetails={refreshTabDetailsHandler}
                      id={id || newId}
                             printPreviewMode={true}
                    />:''}

                    {/* {renderHeader("Mental Health", <FaHeartPulse size={20} />, tabDetails.isMedicalInfo)} */}
                     {tabDetails.isMedicalInfo ?  <TabMentalHealthFamily
                      refreshTabDetails={refreshTabDetailsHandler}
                      id={id || newId}
                             printPreviewMode={true}
                    />:''}

                    {/* {renderHeader("Education", <FaGraduationCap size={20} />, tabDetails.isEducationInfo)} */}
                     {tabDetails.isEducationInfo ?  <TabEducationDetailsFamily
                      refreshTabDetails={refreshTabDetailsHandler}
                      id={id || newId}
                             printPreviewMode={true}
                    />:''}

                    {/* {renderHeader("Mental Status Exam", <FaBrain size={20} />, tabDetails.isMentalStatusExam)} */}
                     {tabDetails.isMentalStatusExam ?  <TabMentalStatusExamFamily
                      refreshTabDetails={refreshTabDetailsHandler}
                      id={id || newId}
                             printPreviewMode={true}
                    />:''}

                    {/* {renderHeader("Management and Notes", <FaBookMedical size={20} />, true)} */}
                    <NotesTab patientId={id || newId} userId={userId} printPreviewMode={true} />

                    {/* {renderHeader("Psychiatric Notes", <FaBookMedical size={20} />, true)} */}
                    <PsychiatricNotesTab patientId={id || newId} userId={userId} printPreviewMode={true} />
                  </>
                )}
              </>
            )}
          </form>
          </div>
        </>
      )}
    </div>
     </>
  );
}

export default PatientInfoFull;