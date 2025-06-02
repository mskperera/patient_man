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
import Notes from "./Notes";
import MentalStatusExam from "./MentalStatusExam";
import { basicInformationData } from "../data/mockData";
import EducationDetails from "./EducationDetails";
import BasicInformation from "./BasicInformation";
import PersonalInformation from "./PersonalInformation";
import Family from "./Family";
import MedicalTab from "./MedicalTab";
import moment from "moment";

function PatientInfoEdit({ mode = "view" }) {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("basicInformation");
  const { id } = useParams(); // Get patientId from URL params

  // Default A/L subjects (Science stream as default, will allow stream selection)
  const defaultALSubjects = [
    { name: "Combined Mathematics", followed: false, marks: "" },
    { name: "Physics", followed: false, marks: "" },
    { name: "Chemistry", followed: false, marks: "" },
  ];

  const defaultOLSubjects = [
    { name: "First Language (Sinhala/Tamil)", followed: false, marks: "" },
    { name: "Mathematics", followed: false, marks: "" },
    { name: "English", followed: false, marks: "" },
    { name: "Science", followed: false, marks: "" },
    { name: "Religion", followed: false, marks: "" },
    { name: "History", followed: false, marks: "" },
    { name: "Art", followed: false, marks: "" },
    { name: "Literature", followed: false, marks: "" },
    { name: "Commerce", followed: false, marks: "" },
  ];

  const [basicInformation, setBasicInformation] = useState({
    patientId: "",
    firstName: "",
    lastName: "",
    middleName: "",
    dob: "",
    age: "",
    gender: "",
  });



  useEffect(() => {
    if (id) {
      const patientData = basicInformationData.find((p) => p.id === id);
      console.log("patientData", patientData.patientId);
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
    }
  }, [id]);

  // Add state for tracking which section is being edited
  const [editingSection, setEditingSection] = useState(null);

  // Function to toggle edit mode for a specific section
  const toggleSectionEdit = (section) => {
    if (editingSection === section) {
      handleSubmitp(section); // Save only the specific section
      setEditingSection(null);
    } else {
      setEditingSection(section);
    }
  };

  // Modified handleSubmit to handle section-specific saving
  const handleSubmitp = async (section) => {
    // Here you can add logic to save only the relevant section data
    const savedPatientId = mode === "add" ? Date.now().toString() : id;
    if (mode === "add") {
      navigate(`/patients/${savedPatientId}`);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="flex items-center text-3xl font-bold text-gray-800  pb-2">
          <FaUser className="mr-3" size={32} />
          Patient Biographical Information
        </h2>
      </div>

      {/* {JSON.stringify(basicInfomation)} */}
      <div>
        <section className="mb-2">
          {editingSection === "basic" || mode === "add" ? (
            <></>
          ) : (
            <div className="mx-4">
              <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Left Section: Patient ID, Form Date, Last Modified */}
                  <div className="col-span-1 md:col-span-2 space-y-4">
                    <div className="flex items-center gap-3">
                      <strong className="text-gray-700 font-semibold">
                        Patient ID:
                      </strong>
                      <span className="text-gray-800">
                        {basicInformation.patientId || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <strong className="text-gray-700 font-semibold">
                        Form Date:
                      </strong>
                      <span className="text-gray-800">
                        {basicInformation.formDate || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <strong className="text-gray-700 font-semibold">
                        Last Modified:
                      </strong>
                      <span className="text-sky-600 font-medium bg-sky-100 px-2 py-1 rounded-md">
                        {basicInformation.lastModified
                          ? moment(basicInformation.lastModified).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )
                          : "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Right Section: Name, Age, Gender */}
                  <div className="col-span-1  space-y-4">
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

                  <div className="col-span-1 space-y-4 flex justify-end">
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
          )}
        </section>
      </div>
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
      <form onSubmit={(e) => e.preventDefault()} className="space-y-8 p-6 ">
        {activeTab === "basicInformation" && <BasicInformation id={id} />}

        {activeTab === "personal" && <PersonalInformation id={id} />}

        {activeTab === "family" && <Family id={id} />}
        {activeTab === "medical" && <MedicalTab id={id} />}
        {activeTab === "education" && (
          <EducationDetails
            id={id}
      
            mode={mode}
            editingSection={editingSection}
            toggleSectionEdit={toggleSectionEdit}
          />
        )}

        {activeTab === "notes" && <Notes />}
        {activeTab === "mentalExam" && <MentalStatusExam />}
      </form>
    </div>
  );
}

export default PatientInfoEdit;
