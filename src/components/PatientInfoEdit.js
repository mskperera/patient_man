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
} from "react-icons/fa";
import { FaBookMedical, FaHeartPulse } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import NotesTab from "./NotesTab";
import MentalStatusExamTab from "./MentalStatusExamTab";
import {  getBasicInformationData } from "../data/mockData";
import EducationDetailsTab from "./EducationDetailsTab";

import PersonalInformationTab from "./PersonalInformationTab";
import BasicInformationTab from "./BasicInformationTab";
import FamilyTab from "./FamilyTab";
import MedicalTab from "./MedicalTab";
import moment from "moment";
import LoadingSpinner from "./LoadingSpinner";
import profileImageUrl from '../assets/doctor1.webp';

function PatientInfoEdit({ mode = "view" }) {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("basicInformation");
  const { id } = useParams(); // Get patientId from URL params
  const [isLoading, setIsLoading] = useState(false);
  // Default A/L subjects (Science stream as default, will allow stream selection)
 

  const [basicInformation, setBasicInformation] = useState({
    patientId: "",
    firstName: "",
    lastName: "",
    middleName: "",
    dob: "",
    age: "",
    gender: "",
  });


  const loadBasicInformationData = async () => {
    setIsLoading(true);
    const result = await getBasicInformationData(id);
    const patientData = result.data;
    console.log('patientData', patientData);
 if (patientData) {

   setBasicInformation({
          ...basicInformation,
          patientId: patientData.patientId || "",
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
        <h2 className="flex items-center text-2xl font-bold text-gray-800  pb-2">
          <FaUser className="mr-3" size={28} />
          Patient Biographical Information
        </h2>
      </div>

      {/* {JSON.stringify(basicInfomation)} */}
     {mode!=="add" && <div>
        <section className="mb-2">
          { (
             !isLoading ? (
          <div className="mx-4">
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
                Patient ID:
              </strong>
              <span className="text-gray-800">
                {basicInformation.patientId || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <strong className="text-sky-700 font-semibold">
                Created Date:
              </strong>
              <span className="text-sky-600">
                {basicInformation.formDate || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <strong className="text-sky-700 font-semibold">
                Last Modified:
              </strong>
              <span className="text-sky-600 rounded-md">
                {basicInformation.lastModified
                  ? moment(basicInformation.lastModified).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : "N/A"}
              </span>
            </div>
          </div>

          {/* Profile Image and Print Button Section */}
          <div className="col-span-2 flex justify-end items-end ">
          
               <div className="flex flex-col justify-between ">
              <p className="text-gray-700 font-semibold text-sm mb-2">
                Handled by
              </p>
          
               <p className="text-sky-700 text-sm mb-2">
                Dr. Chaminda Weerasiriwardane
              </p>
              <img
                src={profileImageUrl}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-sky-300 shadow-sm"
              />
            
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
      
      <div className="flex flex-wrap gap-2 mb-6 p-2 bg-gray-200 rounded-lg">
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
        {activeTab === "basicInformation" && <BasicInformationTab id={id} />}
        {activeTab === "personal" && <PersonalInformationTab id={id} />}
        {activeTab === "family" && <FamilyTab id={id} />}
        {activeTab === "medical" && <MedicalTab id={id} />}
        {activeTab === "education" && <EducationDetailsTab id={id} />}
        {activeTab === "notes" && <NotesTab />}
        {activeTab === "mentalExam" && <MentalStatusExamTab />}
      </form>
    </div>
   
  );
}

export default PatientInfoEdit;
