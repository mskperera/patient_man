import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaNotesMedical,
  FaGraduationCap,
  FaFileAlt,
  FaFirstAid,
  FaMale,
  FaFemale,
  FaBrain,
  FaUsers,
  FaInfoCircle,
  FaPrint,
  FaChild,
} from "react-icons/fa";
import { FaBookMedical, FaHeartPulse } from "react-icons/fa6";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import NotesTab from "./NotesTab";
import TabMentalStatusExam from "./TabMentalStatusExam";
import EducationDetailsTab from "./EducationDetailsTab";

import TabPersonalInformation from "./TabPersonalInformation";
import TabPersonalInformationChild from "./TabPersonalInformationChild";
import TabPersonalInformationIndividual from "./TabPersonalInformationIndividual";


import BasicInformationTab from "./BasicInformationTab";
import FamilyTab from "./FamilyTab";
import MedicalTab from "./MedicalTab";
import TabMedicalChild from "./TabMedicalChild";

import moment from "moment";
import LoadingSpinner from "./LoadingSpinner";
import { getPatientBasicInfo } from "../functions/patient";
import TabBasicInformationChild from "./TabBasicInformationChild";
import TabFamilyChild from "./TabFamilyChild";
import TabEducationDetailsChild from "./TabEducationDetailsChild";

function PatientInfoEdit({ mode = "view" }) {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("basicInformation");
  //const { id } = useParams(); // Get patientNo from URL params
  const [searchParams] = useSearchParams(); // Get query parameters
  const patientType = searchParams.get('type'); // Get 'type' query param, default to 'individual'
  const modeFromQuery = searchParams.get('mode'); // Get 'mode' query param, fallback to prop

  const id= searchParams.get('id');

  const [isLoading, setIsLoading] = useState(false);
  // Default A/L subjects (Science stream as default, will allow stream selection)
 

  const [basicInformation, setBasicInformation] = useState({
    patientNo: "",
    firstName: "",
    lastName: "",
    middleName: "",
    dob: "",
    age: "",
    gender: "",
  });

  const [newId,setNewId]=useState('');

  const loadBasicInformationData = async () => {
    setIsLoading(true);
    const result = await getPatientBasicInfo(id);
    const patientData = result.data;
    console.log('patientData', patientData);
 if (patientData) {

   setBasicInformation({
          patientNo: patientData.patientNo || "",
          firstName: patientData.firstName,
          lastName: patientData?.lastName,
          dob: patientData.dateOfBirth,
          age: patientData.age,
          gender: patientData.gender,
          formDate: patientData.formDate,
          lastModified: patientData.lastModified,
        });

 }
   setIsLoading(false);
  };

   useEffect(() => {
    if (id) {
      loadBasicInformationData();
    }
  }, [id]);


  return (   
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
       {patientType==="1"  && 
       <h2 className="flex items-center text-2xl font-bold text-gray-800  pb-2">
          <FaUser className="mr-3" size={28} />Patient Biographical Information - Individual</h2>}

              {patientType==="2"  && 
       <h2 className="flex items-center text-2xl font-bold text-gray-800  pb-2">
          <FaChild className="mr-3" size={28} />Patient Biographical Information - Child</h2>}

              {patientType==="3"  && 
       <h2 className="flex items-center text-2xl font-bold text-gray-800  pb-2">
          <FaUsers className="mr-3" size={28} />Patient Biographical Information - Family</h2>}
      </div>
   {/* {JSON.stringify(patientType)} */}
      {/* {JSON.stringify(basicInfomation)} */}
     {mode!=="add" && <div>
        <section className="mb-2">
          { (
             !isLoading && basicInformation.firstName ? (
          <div className="mx-4">
           
            {/* {JSON.stringify(basicInformation)} */}
      <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
       

  
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <strong className="text-gray-700 font-semibold">
                Name:
              </strong>
              <span className="text-gray-800">
                {`${basicInformation.firstName || ""} ${
                  basicInformation.middleName
                    ? basicInformation.middleName + " "
                    : ""
                }${basicInformation.lastName || ""}`.trim() || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <strong className="text-gray-700 font-semibold">
                Age:
              </strong>
              <span className="text-gray-800">
                {basicInformation.age || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <strong className="text-gray-700 font-semibold">
                Gender:
              </strong>
              <span className="flex items-center text-gray-800">
                {basicInformation.gender || "N/A"}
                {basicInformation.gender === "Male" && (
                  <FaMale className="ml-2 text-sky-600" />
                )}
                {basicInformation.gender === "Female" && (
                  <FaFemale className="ml-2 text-pink-500" />
                )}
              </span>
            </div>
          </div>

             <div className="col-span-2 md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <strong className="text-gray-700 font-semibold">
                Patient No:
              </strong>
              <span className="text-gray-800">
                {basicInformation.patientNo || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <strong className="text-sky-700 font-semibold">
                Created Date:
              </strong>
              <span className="text-sky-600">
                {moment(basicInformation.formDate).format("yyyy MMM DD hh:mm a") || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <strong className="text-sky-700 font-semibold">
                Last Modified:
              </strong>
              <span className="text-sky-600 rounded-md">
                {basicInformation.lastModified
                  ? moment(basicInformation.lastModified).format("yyyy MMM DD hh:mm a")
                  : "N/A"}
              </span>
            </div>
          </div>

          {/* Profile Image and Print Button Section */}
          <div className="col-span-2 flex flex-col justify-between items-end ">
          
          <div className="flex justify-between">

 <div className="flex flex-col justify-between">
              <p className="text-sky-700 font-semibold text-sm mb-2">
                Handled by:
              </p>
          
               <p className="text-sky-600 text-sm mb-2">
                Dr. Chaminda Weerasiriwardane
              </p>
             
            </div>

             {/* <img
                src={profileImageUrl}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover border-2 border-sky-300 shadow-sm"
              /> */}
            
          </div>
              
            <button
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md"
              aria-label="Print patient summary"
            >
              <FaPrint />
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
              ) : (
            <LoadingSpinner />
          )
          )}
        </section>
      </div>}
{patientType==="1" &&
    <>
         <div className="flex flex-wrap gap-2 mb-6 p-2 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 rounded-lg">

        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "basicInformation"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("basicInformation")}
        >
          <FaInfoCircle className="mr-2" size={16} />
          Basic Information
        </button>
        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "personal"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("personal")}
        >
          <FaUser className="mr-2" size={16} />
          Personal
        </button>
        {/* <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "family"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("family")}
        >
          <FaUsers className="mr-2" size={16} />
          Family
        </button> */}

        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "medical"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("medical")}
        >
          <FaHeartPulse className="mr-2" size={16} />
          Mental Health
        </button>
        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "education"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("education")}
        >
          <FaGraduationCap className="mr-2" size={16} />
          Education
        </button>

        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "mentalExam"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("mentalExam")}
        >
          <FaBrain className="mr-2" size={16} />
          Mental Status Exam
        </button>
         {/* <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "selfEsteemTest"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("selfEsteemTest")}
        >
          <FaBrain className="mr-2" size={16} />
          Self-Esteem Test 
        </button> */}
        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "notes"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("notes")}
        >
          <FaBookMedical className="mr-2" size={16} />
          Management and Notes
        </button>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-8 px-2 ">
        {activeTab === "basicInformation" && <BasicInformationTab id={id || newId} setNewId={setNewId} />}
        {activeTab === "personal" && <TabPersonalInformationIndividual id={id || newId} />}
        {/* {activeTab === "family" && <FamilyTab id={id || newId} />} */}
        {activeTab === "medical" && <MedicalTab id={id || newId} />}
        {activeTab === "education" && <EducationDetailsTab id={id || newId} />}
           {activeTab === "notes" && <NotesTab />}
        {/* {activeTab === "selfEsteemTest" && <NotesTab />} */}
        {activeTab === "mentalExam" && <TabMentalStatusExam />}
      </form>
      </>  }


      {patientType==="2" &&
    <>
         <div className="flex flex-wrap gap-2 mb-6 p-2 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 rounded-lg">

        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "basicInformation"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("basicInformation")}
        >
          <FaInfoCircle className="mr-2" size={16} />
          Basic Information
        </button>
        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "personal"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("personal")}
        >
          <FaUser className="mr-2" size={16} />
          Personal
        </button>
        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "family"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("family")}
        >
          <FaUsers className="mr-2" size={16} />
          Family
        </button>

        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "medical"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("medical")}
        >
          <FaHeartPulse className="mr-2" size={16} />
          Mental Health
        </button>
        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "education"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("education")}
        >
          <FaGraduationCap className="mr-2" size={16} />
          Education
        </button>

        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "mentalExam"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("mentalExam")}
        >
          <FaBrain className="mr-2" size={16} />
          Mental Status Exam
        </button>
        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "notes"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("notes")}
        >
          <FaBookMedical className="mr-2" size={16} />
          Management and Notes
        </button>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-8 px-2 ">
        {activeTab === "basicInformation" && <TabBasicInformationChild id={id || newId} setNewId={setNewId} />}
        {activeTab === "personal" && <TabPersonalInformationChild id={id || newId} />}
        {activeTab === "family" && <TabFamilyChild id={id || newId} />}
        {activeTab === "medical" && <TabMedicalChild id={id || newId} />}
        {activeTab === "education" && <TabEducationDetailsChild id={id || newId} />}
        {activeTab === "notes" && <NotesTab />}
        {activeTab === "mentalExam" && <TabMentalStatusExam />}
      </form>
      </>  }


      {patientType==="3" &&
    <>
         <div className="flex flex-wrap gap-2 mb-6 p-2 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 rounded-lg">

        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "basicInformation"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("basicInformation")}
        >
          <FaInfoCircle className="mr-2" size={16} />
          Basic Information
        </button>
        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "personal"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("personal")}
        >
          <FaUser className="mr-2" size={16} />
          Personal
        </button>
        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "family"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("family")}
        >
          <FaUsers className="mr-2" size={16} />
          Family
        </button>

        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "medical"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("medical")}
        >
          <FaHeartPulse className="mr-2" size={16} />
          Mental Health
        </button>
        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "education"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("education")}
        >
          <FaGraduationCap className="mr-2" size={16} />
          Education
        </button>

        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "mentalExam"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("mentalExam")}
        >
          <FaBrain className="mr-2" size={16} />
          Mental Status Exam
        </button>
        <button
          className={`flex items-center py-2 px-5 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeTab === "notes"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("notes")}
        >
          <FaBookMedical className="mr-2" size={16} />
          Management and Notes
        </button>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-8 px-2 ">
        {activeTab === "basicInformation" && <BasicInformationTab id={id || newId} setNewId={setNewId} />}
        {activeTab === "personal" && <TabPersonalInformation id={id || newId} />}
        {activeTab === "family" && <FamilyTab id={id || newId} />}
        {activeTab === "medical" && <MedicalTab id={id || newId} />}
        {activeTab === "education" && <EducationDetailsTab id={id || newId} />}
        {activeTab === "notes" && <NotesTab />}
        {activeTab === "mentalExam" && <TabMentalStatusExam />}
      </form>
      </>  }

    </div>
   
  );
}

export default PatientInfoEdit;
