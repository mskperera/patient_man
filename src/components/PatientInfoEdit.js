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
import BasicInformationSection from "./BasicInformationSection";
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

function PatientInfoEdit({ mode = "view" }) {

  const [activeTab, setActiveTab] = useState("basicInformation");

  const userId=localStorage.getItem('userId');
  //const { id } = useParams(); // Get patientNo from URL params
  const [searchParams] = useSearchParams(); // Get query parameters
  const patientType = searchParams.get("type"); // Get 'type' query param, default to 'individual'
  const modeFromQuery = searchParams.get("mode"); // Get 'mode' query param, fallback to prop

  const id = searchParams.get("id");
  const user =localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

  
  const [isLoading, setIsLoading] = useState(true);
  // Default A/L subjects (Science stream as default, will allow stream selection)

  useEffect(()=>{
if(id===null){
  setIsLoading(false);
}
  },[])


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
   // setIsLoading(true);
    const result = await getProfileTabDetails(id);
    const data = result.data;
    setTabDetails(data);
    console.log("getProfileTabDetails", data);
    if (data) {
    }
   // setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      loadBasicInformationData();
      loadProfileTabDetails();
    }
  }, [id]);

  const refreshTabDetailsHandler = (newId) => {
    //setNewId(newId);
    //loadBasicInformationData();
    loadProfileTabDetails();
  };

  return (
    <div className="p-6 min-h-screen">
     {isLoading ? <LoadingSpinner/> : <>
      
    
      <div className="flex justify-between items-center mb-4 ">
        {patientType === "1" && (
          <h2 className="flex items-center text-xl font-bold text-gray-800  pb-2">
            <FaUser className="mr-3" size={28} />
            Patient Biographical Information - Individual
          </h2>
        )}

        {patientType === "2" && (
          <h2 className="flex items-center text-xl font-bold text-gray-800  pb-2">
            <FaChild className="mr-3" size={28} />
            Patient Biographical Information - Child
          </h2>
        )}

        {patientType === "3" && (
          <h2 className="flex items-center text-xl font-bold text-gray-800  pb-2">
            <FaUsers className="mr-3" size={28} />
            Patient Biographical Information - Family
          </h2>
        )}


      </div>
      {mode !== "add" && (
        <div>
        {basicInformation && <BasicInformationSection basicInformation={basicInformation} patientTypeId={patientType} />}
        </div>
      )}
      {patientType === "1" && (
        <>
          <div className="flex flex-wrap gap-2 mb-6 p-1 bg-sky-100 border-2 border-sky-200 rounded-lg">
            <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "basicInformation"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              }`}
              onClick={() => setActiveTab("basicInformation")}
            >
              <FaInfoCircle className="mr-2" size={16} />
              Basic Information
              <span className="ml-1">
                {!tabDetails.isBasicInfo && (
                  <FaExclamationCircle className="text-orange-500 text-lg" />
                )}
              </span>
            </button>
          
          <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "personal"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              }  disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
              onClick={() => setActiveTab("personal")}
              disabled={tabDetails.isBasicInfo? false : true}
            >
              <FaUser className="mr-2" size={16} />
              Personal
              <span className="ml-1">
                {!tabDetails.isPersonalInfo && (
                  <FaExclamationCircle className="text-orange-500 text-lg" />
                )}
              </span>
            </button>

         <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "medical"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              }  disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
              onClick={() => setActiveTab("medical")}
                  disabled={tabDetails.isBasicInfo? false : true}
            >
              <FaHeartPulse className="mr-2" size={16} />
              Mental Health
              <span className="ml-1">
                {!tabDetails.isMedicalInfo && (
                  <FaExclamationCircle className="text-orange-500 text-lg" />
                )}
              </span>
            </button>
          
         <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "education"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              } disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
              onClick={() => setActiveTab("education")}
                  disabled={tabDetails.isBasicInfo? false : true}
            >
              <FaGraduationCap className="mr-2" size={16} />
              Education
              <span className="ml-1">
                {!tabDetails.isEducationInfo && (
                  <FaExclamationCircle className="text-orange-500 text-lg" />
                )}
              </span>
            </button>

 <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "mentalExam"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              } disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
              onClick={() => setActiveTab("mentalExam")}
                  disabled={tabDetails.isBasicInfo? false : true}
            >
              <FaBrain className="mr-2" size={16} />
              Mental Status Exam
                  <span className="ml-1">
                {!tabDetails.isMentalStatusExam && (
                  <FaExclamationCircle className="text-orange-500 text-lg" />
                )}
              </span>
            </button>

   <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "notes"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              } disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed `}
              onClick={() => setActiveTab("notes")}
                  disabled={tabDetails.isBasicInfo? false : true}
            >
              <FaBookMedical className="mr-2" size={16} />
                 Clinical Notes
            </button>

        <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "psychiatricNotes"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              } disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed `}
              onClick={() => setActiveTab("psychiatricNotes")}
                  disabled={tabDetails.isBasicInfo? false : true}
            >
              <FaBookMedical className="mr-2" size={16} />
              Psychiatric Notes
            </button>

 

          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4 px-2 "
          >
            {activeTab === "basicInformation" && (
              <TabBasicInformation
                patientTypeId={patientType}
                refreshTabDetails={refreshTabDetailsHandler}
                id={id || newId}
                setNewId={setNewId}
              />
            )}
            {activeTab === "personal" && (
              <TabPersonalInformationIndividual
                refreshTabDetails={refreshTabDetailsHandler}
                id={id || newId}
              />
            )}
            {/* {activeTab === "family" && <FamilyTab id={id || newId} />} */}
            {activeTab === "medical" && (
              <TabMentalHealthIndividual
                refreshTabDetails={refreshTabDetailsHandler}
                id={id || newId}
              />
            )}
            {activeTab === "education" && (
              <TabEducationDetailsIndividual
                refreshTabDetails={refreshTabDetailsHandler}
                id={id || newId}
              />
            )}
            {activeTab === "notes" && <NotesTab patientId={id || newId} userId={userId} />}
            {/* {activeTab === "selfEsteemTest" && <NotesTab />} */}
            {activeTab === "mentalExam" && <TabMentalStatusExam 
                    refreshTabDetails={refreshTabDetailsHandler}
            id={id || newId} />}


               {activeTab === "psychiatricNotes" && <PsychiatricNotesTab patientId={id || newId} userId={userId} />}


          </form>
        </>
      )}

      {patientType === "2" && (
        <>
               <div className="flex flex-wrap gap-2 mb-6 p-1 bg-sky-100 border-2 border-sky-200 rounded-lg">
            <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "basicInformation"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              }`}
              onClick={() => setActiveTab("basicInformation")}
            >
              <FaInfoCircle className="mr-2" size={16} />
              Basic Information
              <span className="ml-1">
                {!tabDetails.isBasicInfo && (
                  <FaExclamationCircle className="text-orange-500 text-lg" />
                )}
              </span>
            </button>
      <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "personal"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              } disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
              onClick={() => setActiveTab("personal")}
                  disabled={tabDetails.isBasicInfo? false : true}
            >
              <FaUser className="mr-2" size={16} />
              Personal
              <span className="ml-1">
                {!tabDetails.isPersonalInfo && (
                  <FaExclamationCircle className="text-orange-500 text-lg" />
                )}
              </span>
            </button>
          
         <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "family"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              } disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
              onClick={() => setActiveTab("family")}
                  disabled={tabDetails.isBasicInfo? false : true}
            >
              <FaUsers className="mr-2" size={16} />
              Family
              <span className="ml-1">
                {!tabDetails.isFamilyInfo && (
                  <FaExclamationCircle className="text-orange-500 text-lg" />
                )}
              </span>
            </button>

    <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "medical"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              } disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
              onClick={() => setActiveTab("medical")}
                  disabled={tabDetails.isBasicInfo? false : true}
            >
              <FaHeartPulse className="mr-2" size={16} />
              Mental Health
              <span className="ml-1">
                {!tabDetails.isMedicalInfo && (
                  <FaExclamationCircle className="text-orange-500 text-lg" />
                )}
              </span>
            </button>
          
        <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "education"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              } disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
              onClick={() => setActiveTab("education")}
                  disabled={tabDetails.isBasicInfo? false : true}
            >
              <FaGraduationCap className="mr-2" size={16} />
              Education
              <span className="ml-1">
                {!tabDetails.isEducationInfo && (
                  <FaExclamationCircle className="text-orange-500 text-lg" />
                )}
              </span>
            </button>

            <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "mentalExam"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              } disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
              onClick={() => setActiveTab("mentalExam")}
                  disabled={tabDetails.isBasicInfo? false : true}
            >
              <FaBrain className="mr-2" size={16} />
              Mental Status Exam
                  <span className="ml-1">
                {!tabDetails.isMentalStatusExam && (
                  <FaExclamationCircle className="text-orange-500 text-lg" />
                )}
              </span>
            </button>
         <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "notes"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              } disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
              onClick={() => setActiveTab("notes")}
                  disabled={tabDetails.isBasicInfo? false : true}
            >
              <FaBookMedical className="mr-2" size={16} />
                 Clinical Notes
            </button>
           <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "psychiatricNotes"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              } disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed `}
              onClick={() => setActiveTab("psychiatricNotes")}
                  disabled={tabDetails.isBasicInfo? false : true}
            >
              <FaBookMedical className="mr-2" size={16} />
              Psychiatric Notes
            </button>

          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4 px-2 "
          >
            {activeTab === "basicInformation" && (
              <TabBasicInformation
                patientTypeId={patientType}
                refreshTabDetails={refreshTabDetailsHandler}
                id={id || newId}
                setNewId={setNewId}
              />
            )}
            {activeTab === "personal" && (
              <TabPersonalInformationChild
                id={id || newId}
                refreshTabDetails={refreshTabDetailsHandler}
              />
            )}
            {activeTab === "family" && (
              <TabFamilyInformationChild
                refreshTabDetails={refreshTabDetailsHandler}
                id={id || newId}
              />
            )}
            {activeTab === "medical" && (
              <TabMentalHealthChild
                refreshTabDetails={refreshTabDetailsHandler}
                id={id || newId}
              />
            )}
            {activeTab === "education" && (
              <TabEducationDetailsChild
                refreshTabDetails={refreshTabDetailsHandler}
                id={id || newId}
              />
            )}
            {activeTab === "notes" && <NotesTab patientId={id || newId} userId={userId} />}
            {activeTab === "mentalExam" && <TabMentalStatusExam 
                    refreshTabDetails={refreshTabDetailsHandler}
            id={id || newId} />}

            {activeTab === "psychiatricNotes" && <PsychiatricNotesTab patientId={id || newId} userId={userId} />}



          </form>
        </>
      )}

      {patientType === "3" && (
        <>
           <div className="flex flex-wrap gap-2 mb-6 p-1 bg-sky-100 border-2 border-sky-200 rounded-lg">
            <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "basicInformation"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              }`}
              onClick={() => setActiveTab("basicInformation")}
            >
              <FaInfoCircle className="mr-2" size={16} />
              Basic Information
              <span className="ml-1">
                {!tabDetails.isBasicInfo && (
                  <FaExclamationCircle className="text-orange-500 text-lg" />
                )}
              </span>
            </button>
   <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "personal"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              } disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
              onClick={() => setActiveTab("personal")}
                  disabled={tabDetails.isBasicInfo? false : true}
            >
              <FaUser className="mr-2" size={16} />
              Personal
              <span className="ml-1">
                {!tabDetails.isPersonalInfo && (
                  <FaExclamationCircle className="text-orange-500 text-lg" />
                )}
              </span>
            </button>
            {/* <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "family"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              }`}
              onClick={() => setActiveTab("family")}
            >
              <FaUsers className="mr-2" size={16} />
              Family
              <span className="ml-1">
                {!tabDetails.isFamilyInfo && (
                  <FaExclamationCircle className="text-orange-500 text-lg" />
                )}
              </span>
            </button> */}

          <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "medical"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              } disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
              onClick={() => setActiveTab("medical")}
                  disabled={tabDetails.isBasicInfo? false : true}
            >
              <FaHeartPulse className="mr-2" size={16} />
              Mental Health
              <span className="ml-1">
                {!tabDetails.isMedicalInfo && (
                  <FaExclamationCircle className="text-orange-500 text-lg" />
                )}
              </span>
            </button>
  <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "education"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              } disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
              onClick={() => setActiveTab("education")}
                  disabled={tabDetails.isBasicInfo? false : true}
            >
              <FaGraduationCap className="mr-2" size={16} />
              Education
              <span className="ml-1">
                {!tabDetails.isEducationInfo && (
                  <FaExclamationCircle className="text-orange-500 text-lg" />
                )}
              </span>
            </button>

        <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "mentalExam"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              } disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
              onClick={() => setActiveTab("mentalExam")}
                  disabled={tabDetails.isBasicInfo? false : true}
            >
              <FaBrain className="mr-2" size={16} />
              Mental Status Exam
                  <span className="ml-1">
                {!tabDetails.isMentalStatusExam && (
                  <FaExclamationCircle className="text-orange-500 text-lg" />
                )}
              </span>
            </button>
    <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "notes"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              } disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
              onClick={() => setActiveTab("notes")}
                  disabled={tabDetails.isBasicInfo? false : true}
            >
              <FaBookMedical className="mr-2" size={16} />
                Clinical Notes
            </button>

        <button
              className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === "psychiatricNotes"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-transparent text-sky-800  hover:bg-sky-200"
              } disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed `}
              onClick={() => setActiveTab("psychiatricNotes")}
                  disabled={tabDetails.isBasicInfo? false : true}
            >
              <FaBookMedical className="mr-2" size={16} />
              Psychiatric Notes
            </button>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4 px-2 "
          >
            {activeTab === "basicInformation" && (
              <TabBasicInformationFamily
                patientTypeId={patientType}
                refreshTabDetails={refreshTabDetailsHandler}
                id={id || newId}
                setNewId={setNewId}
              />
            )}
            {activeTab === "personal" && (
              <TabPersonalInformationFamily
                refreshTabDetails={refreshTabDetailsHandler}
                id={id || newId}
              />
            )}
            {/* {activeTab === "family" && (
              <FamilyTab
                refreshTabDetails={refreshTabDetailsHandler}
                id={id || newId}
              />
            )} */}
            {activeTab === "medical" && (
              <TabMentalHealthFamily
                refreshTabDetails={refreshTabDetailsHandler}
                id={id || newId}
              />
            )}
            {activeTab === "education" && (
              <TabEducationDetailsFamily
                refreshTabDetails={refreshTabDetailsHandler}
                id={id || newId}
              />
            )}
            {activeTab === "notes" && <NotesTab patientId={id || newId} userId={userId} />}
            {activeTab === "mentalExam" && <TabMentalStatusExamFamily 
                    refreshTabDetails={refreshTabDetailsHandler}
                     id={id || newId} />}

                        {activeTab === "psychiatricNotes" && <PsychiatricNotesTab patientId={id || newId} userId={userId} />}


          </form>
        </>
      )}
        </>}
    </div>
    
  );
}

export default PatientInfoEdit;
