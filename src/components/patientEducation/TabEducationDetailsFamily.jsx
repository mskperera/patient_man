import React, { useState, useEffect } from "react";
import TypeableDropdown from "../TypeableDropdown";
import LoadingSpinner from "../LoadingSpinner";
import MessageModel from "../MessageModel";
import {
  drpALStreams,
  drpInstitutions,
  drpUniversitySubjects,
  getAl,
  getInternationalCurriculum,
  getEducationYears,
  getOl,
  getUniversity,
  updateEducationFamily,
  addEducationFamily,
} from "../../functions/patient";
import EditButton from "../EditButton";
import VoiceToText from "../VoiceToText";
import { FaCheckCircle, FaGraduationCap, FaInfoCircle, FaTimesCircle } from "react-icons/fa";


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

const PrintEducationDetailsFamilyA4 = ({
  education,
}) => {

  const renderNA = (value) => (value != null && value !== "" ? value : "N/A");

  const renderYears = (years) => {
    if (years == null) return "N/A";
    return years === 20 ? "More than 20" : years;
  };

  const renderResult = (isPassed) => {
    if (isPassed === null) return "N/A";
    return isPassed ? "Pass" : "Fail";
  };

  const renderCurriculum = (curriculum) => {
    const items = [];
    if (curriculum.isEdexcel) items.push("Edexcel");
    if (curriculum.isCambridge) items.push("Cambridge");
    return items.length > 0 ? items.join(", ") : "None";
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />

      <div className="print-break font-sans text-sm leading-relaxed max-w-[210mm] mx-auto bg-white">

        {/* ========== PAGE 1: Header + Educational Background + O/L ========== */}
        <div>
          <h1 className="text-center text-xl font-bold text-sky-700 mb-6">Family Education Details</h1>

          {/* Educational Background */}
          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-4">
            Educational Background
          </h3>

          <table className="w-full border-collapse border border-gray-300 mt-2 text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Person</th>
                <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Years of Formal Education</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-2 py-1 font-semibold">Husband</td>
                <td className="border border-gray-300 px-2 py-1">{renderYears(education.educationYearsHusband)}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1 font-semibold">Wife</td>
                <td className="border border-gray-300 px-2 py-1">{renderYears(education.educationYearsWife)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* G.C.E Ordinary Level (O/L) */}
            <div className="mt-10">
          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-4">
            G.C.E Ordinary Level (O/L) Qualifications
          </h3>

          <table className="w-full border-collapse border border-gray-300 mt-2 text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Person</th>
                <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Attempted</th>
                <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-2 py-1 font-semibold">Husband</td>
                <td className="border border-gray-300 px-2 py-1">{education.olHusband.enabled ? "Yes" : "No"}</td>
                <td className="border border-gray-300 px-2 py-1">
                  {education.olHusband.enabled ? renderResult(education.olHusband.isPassed) : "N/A"}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1 font-semibold">Wife</td>
                <td className="border border-gray-300 px-2 py-1">{education.olWife.enabled ? "Yes" : "No"}</td>
                <td className="border border-gray-300 px-2 py-1">
                  {education.olWife.enabled ? renderResult(education.olWife.isPassed) : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>

          {/* O/L Remarks */}
          {(education.olHusband.remark || education.olWife.remark) && (
            <div className="mt-4">
              <span className="font-semibold text-gray-700">Remarks:</span>
              <div className="mt-2 space-y-2 text-xs">
                {education.olHusband.remark && (
                  <div>
                    <span className="font-semibold">Husband:</span>
                    <div className="bg-gray-50 border border-gray-300 rounded-md p-2 mt-1 whitespace-pre-line text-gray-800">
                      {education.olHusband.remark}
                    </div>
                  </div>
                )}
                {education.olWife.remark && (
                  <div>
                    <span className="font-semibold">Wife:</span>
                    <div className="bg-gray-50 border border-gray-300 rounded-md p-2 mt-1 whitespace-pre-line text-gray-800">
                      {education.olWife.remark}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ========== PAGE 4: International Curriculum ========== */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-4">
            International Curriculum
          </h3>

          <table className="w-full border-collapse border border-gray-300 mt-2 text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Person</th>
                <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Curriculum Followed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-2 py-1 font-semibold">Husband</td>
                <td className="border border-gray-300 px-2 py-1">
                  {renderCurriculum(education.internationalCurriculumHusband)}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1 font-semibold">Wife</td>
                <td className="border border-gray-300 px-2 py-1">
                  {renderCurriculum(education.internationalCurriculumWife)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ========== PAGE 2: A/L ========== */}
        <div className="print-break">
          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-4">
            G.C.E Advanced Level (A/L) Qualifications
          </h3>

          <table className="w-full border-collapse border border-gray-300 mt-2 text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Person</th>
                <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Attempted</th>
                <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Stream</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-2 py-1 font-semibold">Husband</td>
                <td className="border border-gray-300 px-2 py-1">{education.alHusband.enabled ? "Yes" : "No"}</td>
                <td className="border border-gray-300 px-2 py-1">
                  {education.alHusband.enabled ? renderNA(education.alHusband.alStreamName) : "N/A"}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1 font-semibold">Wife</td>
                <td className="border border-gray-300 px-2 py-1">{education.alWife.enabled ? "Yes" : "No"}</td>
                <td className="border border-gray-300 px-2 py-1">
                  {education.alWife.enabled ? renderNA(education.alWife.alStreamName) : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>

          {/* A/L Remarks */}
          {(education.alHusband.remark || education.alWife.remark) && (
            <div className="mt-4">
              <span className="font-semibold text-gray-700">Remarks:</span>
              <div className="mt-2 space-y-2 text-xs">
                {education.alHusband.remark && (
                  <div>
                    <span className="font-semibold">Husband:</span>
                    <div className="bg-gray-50 border border-gray-300 rounded-md p-2 mt-1 whitespace-pre-line text-gray-800">
                      {education.alHusband.remark}
                    </div>
                  </div>
                )}
                {education.alWife.remark && (
                  <div>
                    <span className="font-semibold">Wife:</span>
                    <div className="bg-gray-50 border border-gray-300 rounded-md p-2 mt-1 whitespace-pre-line text-gray-800">
                      {education.alWife.remark}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ========== PAGE 3: University ========== */}
        <div className="">
          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-4">
            University Qualifications
          </h3>

          {/* Husband */}
          <div className="mb-6">
            <h4 className="font-semibold text-sky-700 mb-2">Husband</h4>
            {education.universityHusband.enabled && education.universityHusband.subjects.length > 0 ? (
              <table className="w-full border-collapse border border-gray-300 mt-1 text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Degree</th>
                    <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Institution</th>
                    <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Year</th>
                    <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Marks/Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {education.universityHusband.subjects.map((q, i) => (
                    <tr key={i}>
                      <td className="border border-gray-300 px-2 py-1">{renderNA(q.name)}</td>
                      <td className="border border-gray-300 px-2 py-1">{renderNA(q.institutionName)}</td>
                      <td className="border border-gray-300 px-2 py-1">{renderNA(q.year)}</td>
                      <td className="border border-gray-300 px-2 py-1">{renderNA(q.marks)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center gap-2 text-gray-600 italic">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>No university qualifications recorded.</span>
              </div>
            )}

            {education.universityHusband.remark && (
              <div className="mt-3">
                <span className="font-semibold text-gray-700">Remark:</span>
                <div className="bg-gray-50 border border-gray-300 rounded-md p-2 mt-1 text-xs whitespace-pre-line text-gray-800">
                  {education.universityHusband.remark}
                </div>
              </div>
            )}
          </div>

          {/* Wife */}
          <div>
            <h4 className="font-semibold text-sky-700 mb-2">Wife</h4>
            {education.universityWife.enabled && education.universityWife.subjects.length > 0 ? (
              <table className="w-full border-collapse border border-gray-300 mt-1 text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Degree</th>
                    <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Institution</th>
                    <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Year</th>
                    <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Marks/Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {education.universityWife.subjects.map((q, i) => (
                    <tr key={i}>
                      <td className="border border-gray-300 px-2 py-1">{renderNA(q.name)}</td>
                      <td className="border border-gray-300 px-2 py-1">{renderNA(q.institutionName)}</td>
                      <td className="border border-gray-300 px-2 py-1">{renderNA(q.year)}</td>
                      <td className="border border-gray-300 px-2 py-1">{renderNA(q.marks)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center gap-2 text-gray-600 italic">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>No university qualifications recorded.</span>
              </div>
            )}

            {education.universityWife.remark && (
              <div className="mt-3">
                <span className="font-semibold text-gray-700">Remark:</span>
                <div className="bg-gray-50 border border-gray-300 rounded-md p-2 mt-1 text-xs whitespace-pre-line text-gray-800">
                  {education.universityWife.remark}
                </div>
              </div>
            )}
          </div>
        </div>


      </div>
    </>
  );
};



const TabEducationDetailsFamily = ({ id, refreshTabDetails,printPreviewMode }) => {
  const currentYear = 2025;
  const yearOptions = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  const [editingSection, setEditingSection] = useState(null);
  const [mode, setMode] = useState("add");
  const [education, setEducation] = useState({
    educationYearsHusband: "",
    educationYearsWife: "",
    olHusband: { enabled: false, isPassed: null, remark: "" },
    olWife: { enabled: false, isPassed: null, remark: "" },
    alHusband: { enabled: false, alStreamId: "", alStreamName: "", remark: "" },
    alWife: { enabled: false, alStreamId: "", alStreamName: "", remark: "" },
    universityHusband: { enabled: false, subjects: [], remark: "" },
    universityWife: { enabled: false, subjects: [], remark: "" },
    internationalCurriculumHusband: { isEdexcel: false, isCambridge: false },
    internationalCurriculumWife: { isEdexcel: false, isCambridge: false },
  });

  const [educationYearsErrors, setEducationYearsErrors] = useState({});
  const [scholarshipErrors, setScholarshipErrors] = useState({});
  const [olErrors, setOLErrors] = useState({});
  const [alErrors, setALErrors] = useState({});
  const [universityErrors, setUniversityErrors] = useState({});
  const [internationalCurriculumErrors, setInternationalCurriculumErrors] = useState({});
  const [alStremsOptions, setAlStremsOptions] = useState([]);
  const [degreeOptions, setDegreeOptions] = useState([]);
  const [institutionsOptions, setInstitutionsOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [initialEducationInformation, setInitialEducationInformation] = useState(null);
  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    type: "error",
  });
  const [universitySubjectListError, setUniversitySubjectListError] = useState("");

  useEffect(() => {
    loadDropdowns();
  }, []);

  const loadDrpALStreams = async () => {
    const alStrems = await drpALStreams();
    setAlStremsOptions(alStrems.data.results[0]);
  };

  const loadDrpUniversitySubjects = async () => {
    const degreeOptions = await drpUniversitySubjects();
    setDegreeOptions(degreeOptions.data.results[0]);
  };

  const loadDrpInstitutions = async () => {
    const institutionsOptions = await drpInstitutions();
    setInstitutionsOptions(institutionsOptions.data.results[0]);
  };

  const loadDropdowns = () => {
    loadDrpALStreams();
    loadDrpUniversitySubjects();
    loadDrpInstitutions();
  };

  const loadEducationYearsData = async () => {
    const result = await getEducationYears(id);
    const patientData = result.data;
    if (patientData.error) {
      setModal({ isOpen: true, message: patientData.error.message, type: "error" });
    }
    if (patientData) {
      setEducation((prev) => ({
        ...prev,
        educationYearsHusband: patientData.educationYearsHusband,
        educationYearsWife: patientData.educationYearsWife,
      }));
      setMode("edit");
    } else {
      setIsLoading(false);
    }
  };

  const loadOLData = async () => {
    const result = await getOl(id);
    const patientData = result.data;
    console.log('loadData',patientData)
    if (patientData?.error) {
      setModal({ isOpen: true, message: patientData.error.message, type: "error" });
    }
    if (patientData) {
      setEducation((prev) => ({
        ...prev,
        olHusband: {
          enabled: !!patientData.enabledHusband,
          isPassed: !!patientData.isPassedHusband,
          remark: patientData.remarkHusband
        },
        olWife: {
          enabled: !!patientData.enabledWife,
          isPassed: !!patientData.isPassedWife,
          remark: patientData.remarkWife
        }
      }));
    }
  };

  const loadALData = async () => {
    const result = await getAl(id);
    const patientData = result.data;
    if (patientData?.error) {
      setModal({ isOpen: true, message: patientData.error.message, type: "error" });
    }
    if (patientData) {
      setEducation((prev) => ({
        ...prev,
        alHusband: {
          enabled: patientData.enabledHusband,
          alStreamId: patientData.alStreamIdHusband,
          alStreamName: patientData.alStreamNameHusband,
          remark: patientData.remarkHusband
        },
        alWife: {
          enabled: patientData.enabledWife,
          alStreamId: patientData.alStreamIdWife,
          alStreamName: patientData.alStreamNameWife,
          remark: patientData.remarkWife
        }
      }));
    }
  };

  const loadUniversityData = async () => {
    const result = await getUniversity(id);
    const patientData = result.data;
    if (patientData?.error) {
      setModal({ isOpen: true, message: patientData.error.message, type: "error" });
    }
    if (patientData) {
      setEducation((prev) => ({
        ...prev,
        universityHusband: {
          enabled: patientData.enabledHusband,
          subjects: patientData.subjectsHusband,
          remark: patientData.remarkHusband
        },
        universityWife: {
          enabled: patientData.enabledWife,
          subjects: patientData.subjectsWife,
          remark: patientData.remarkWife
        }
      }));
    }
  };

  const loadInternationalCurriculumData = async () => {
    const result = await getInternationalCurriculum(id);
    setEducation((prev) => ({
      ...prev,
      internationalCurriculumHusband: {
        isEdexcel: result.data.isEdexcelHusband,
        isCambridge: result.data.isCambridgeHusband,
      },
      internationalCurriculumWife: {
        isEdexcel: result.data.isEdexcelWife,
        isCambridge: result.data.isCambridgeWife,
      },
    }));
  };

  const loadAllEducationData = async () => {
    setIsLoading(true);
    await loadEducationYearsData();
    await loadOLData();
    await loadALData();
    await loadUniversityData();
    await loadInternationalCurriculumData();
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      loadAllEducationData();
    }
  }, [id]);

  const handleSubmitp = async (section) => {
    setIsSaving(true);
    const validations = validateAllFields();
    const isAllValidated = validations.every((v) => v !== false);
    if (isAllValidated && isFormValid()) {
      const transformedPayload = {
        educationYearsHusband: education.educationYearsHusband,
        isOLHusband: education.olHusband.enabled,
        isOLPassedHusband: education.olHusband.isPassed,
        olRemarkHusband: education.olHusband.remark,
        isALHusband: education.alHusband.enabled,
        alStreamNameHusband: education.alHusband.alStreamName,
        alRemarkHusband: education.alHusband.remark,
        isUniversityHusband: education.universityHusband.enabled,
        universitySubjectsHusband: education.universityHusband.subjects.map((subject) => ({
          name: subject.name,
          institution: subject.institutionName,
          marks: subject.marks,
          year: subject.year,
        })) || [],
        universityRemarkHusband: education.universityHusband.remark,
        isEdexcelHusband: education.internationalCurriculumHusband.isEdexcel,
        isCambridgeHusband: education.internationalCurriculumHusband.isCambridge,
        educationYearsWife: education.educationYearsWife,
        isOLWife: education.olWife.enabled,
        isOLPassedWife: education.olWife.isPassed,
        olRemarkWife: education.olWife.remark,
        isALWife: education.alWife.enabled,
        alStreamNameWife: education.alWife.alStreamName,
        alRemarkWife: education.alWife.remark,
        isUniversityWife: education.universityWife.enabled,
        universitySubjectsWife: education.universityWife.subjects.map((subject) => ({
          name: subject.name,
          institution: subject.institutionName,
          marks: subject.marks,
          year: subject.year,
        })) || [],
        universityRemarkWife: education.universityWife.remark,
        isEdexcelWife: education.internationalCurriculumWife.isEdexcel,
        isCambridgeWife: education.internationalCurriculumWife.isCambridge,
        isConfirm: true,
      };

      const res = await updateEducationFamily(id, transformedPayload);

      if (res.data.error) {
        setModal({ isOpen: true, message: res.data.error.message, type: "error" });
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

      if (section === "ol") await loadOLData();
      if (section === "al") {
        await loadDrpALStreams();
        await loadALData();
      }
      if (section === "university") {
        await loadDrpUniversitySubjects();
        await loadDrpInstitutions();
        await loadUniversityData();
      }
      if (section === "internationalCurriculum") await loadInternationalCurriculumData();

      await loadEducationYearsData();

      setModal({
        isOpen: true,
        message: res.data.outputValues.outputMessage,
        type: "success",
      });
      setIsSaving(false);
      refreshTabDetails(Math.random());
      setMode("edit");
    } else {
      setModal({
        isOpen: true,
        message: "Please correct the errors in the form before saving.",
        type: "warning",
      });
      setIsSaving(false);
    }
    setIsSaving(false);
    return isAllValidated;
  };

  const toggleSectionEdit = async (section) => {
    if (editingSection === section) {
      const isValid = await handleSubmitp(section);
      if (isValid) setEditingSection(null);
    } else {
      setEditingSection(section);
    }
  };

  useEffect(() => {
    setInitialEducationInformation({ ...education });
  }, [editingSection]);

  const handleCancel = (editingSection) => {
    if (initialEducationInformation) {
      setEducation(initialEducationInformation);
      setEducationYearsErrors({});
      setScholarshipErrors({});
      setOLErrors({});
      setALErrors({});
      setUniversityErrors({});
      setInternationalCurriculumErrors({});
    }
    setEditingSection(null);
  };

  const validateEducationYears = (value, field) => {
    setEducationYearsErrors((prev) => {
      const newErrors = { ...prev };
      if (!value) {
        newErrors[field] = "Years of formal education is required.";
      } else {
        delete newErrors[field];
      }
      return newErrors;
    });
    return !!value;
  };

  const validateOL = (field, value, person) => {
    if (person === "Husband" && !education.olHusband.enabled) {
      setOLErrors((prev) => ({ ...prev, husband: {} }));
      return true;
    }
    if (person === "Wife" && !education.olWife.enabled) {
      setOLErrors((prev) => ({ ...prev, wife: {} }));
      return true;
    }

    setOLErrors((prev) => {
      const newErrors = { ...prev, [person.toLowerCase()]: { ...prev[person.toLowerCase()] } };
      if (field === "result") {
        if (value === null) {
          newErrors[person.toLowerCase()].result = "Result is required.";
        } else {
          delete newErrors[person.toLowerCase()].result;
        }
      }
      return newErrors;
    });

    return value !== null;
  };

  const validateALStream = (field, value) => {
    if (field === "husband" && !education.alHusband.enabled) {
      setALErrors((prev) => ({ ...prev, husband: {} }));
      return true;
    }
    if (field === "wife" && !education.alWife.enabled) {
      setALErrors((prev) => ({ ...prev, wife: {} }));
      return true;
    }

   
  setALErrors((prev) => {
      const newErrors = { ...prev, wife: { ...prev.wife }, husband: { ...prev.husband } };
      if (field === "husband") {
        if (!value?.trim()) {
          newErrors.husband.stream = "Stream is required.";
        } else {
          delete newErrors.husband.stream;
        }
      }
          if (field === "wife") {
        if (!value?.trim()) {
          newErrors.wife.stream = "Stream is required.";
        } else {
          delete newErrors.wife.stream;
        }
      }
      return newErrors;
    });


    
   
    return !!value;
  };

  const validateUniversity = (index, field, value, person) => {
    if (person === "Husband" && !education.universityHusband.enabled) {
      setUniversityErrors((prev) => ({ ...prev, husband: {} }));
      return true;
    }
    if (person === "Wife" && !education.universityWife.enabled) {
      setUniversityErrors((prev) => ({ ...prev, wife: {} }));
      return true;
    }

    setUniversityErrors((prev) => {
      const newErrors = { ...prev, [person.toLowerCase()]: { ...prev[person.toLowerCase()] } };
      const qualification = person === "Husband"
        ? education.universityHusband.subjects[index] || {}
        : education.universityWife.subjects[index] || {};

      if (field === "degree") {
        if (!value?.trim()) {
          newErrors[person.toLowerCase()][`qualification_${index}_name`] = "Degree is required.";
        } else {
          delete newErrors[person.toLowerCase()][`qualification_${index}_name`];
        }
      }
      if (field === "institution") {
        if (!value?.trim()) {
          newErrors[person.toLowerCase()][`qualification_${index}_institution`] = "Institution is required.";
        } else {
          delete newErrors[person.toLowerCase()][`qualification_${index}_institution`];
        }
      }
      if (field === "marks") {
        if (value === undefined || value === null || (typeof value === "string" && !value.trim())) {
          newErrors[person.toLowerCase()][`qualification_${index}_marks`] = "Marks/Grade is required.";
        } else {
          delete newErrors[person.toLowerCase()][`qualification_${index}_marks`];
        }
      }
      return newErrors;
    });
    return !!value;
  };

  const _validateEducationYears = () => {
    const husbandValid = validateEducationYears(education.educationYearsHusband, "educationYearsHusband");
    const wifeValid = validateEducationYears(education.educationYearsWife, "educationYearsWife");
    return husbandValid && wifeValid;
  };

  const _validateOL = () => {
    const husbandValid = validateOL("result", education.olHusband.isPassed, "Husband");
    const wifeValid = validateOL("result", education.olWife.isPassed, "Wife");
    return husbandValid && wifeValid;
  };

  const _validateALStream = () => {
    const husbandValid = validateALStream("husband", education.alHusband.alStreamName );
    const wifeValid = validateALStream( "wife", education.alWife.alStreamName);
    return husbandValid && wifeValid;
  };

  const _validateUniversity = () => {
    const validations = [];
    if (education.universityHusband.enabled && education.universityHusband.subjects.length === 0) {
      setUniversitySubjectListError("At least one subject is required for Husband.");
      return false;
    }
    if (education.universityWife.enabled && education.universityWife.subjects.length === 0) {
      setUniversitySubjectListError("At least one subject is required for Wife.");
      return false;
    }
    setUniversitySubjectListError("");

    education.universityHusband.subjects.forEach((s, index) => {
      validations.push(validateUniversity(index, "degree", s.name, "Husband"));
      validations.push(validateUniversity(index, "institution", s.institutionName, "Husband"));
      validations.push(validateUniversity(index, "marks", s.marks, "Husband"));
    });
    education.universityWife.subjects.forEach((s, index) => {
      validations.push(validateUniversity(index, "degree", s.name, "Wife"));
      validations.push(validateUniversity(index, "institution", s.institutionName, "Wife"));
      validations.push(validateUniversity(index, "marks", s.marks, "Wife"));
    });
    return validations.every((v) => v === true);
  };

  const validateAllFields = () => {
    return [
    //  _validateEducationYears(),
      _validateOL(),
      _validateALStream(),
      _validateUniversity(),
    ];
  };

  const isFormValid = () => {
    return (
      Object.keys(educationYearsErrors).length === 0 &&
      Object.keys(scholarshipErrors).length === 0 &&
      Object.keys(olErrors.husband || {}).length === 0 &&
      Object.keys(olErrors.wife || {}).length === 0 &&
      Object.keys(alErrors.husband || {}).length === 0 &&
      Object.keys(alErrors.wife || {}).length === 0 &&
      Object.keys(universityErrors.husband || {}).length === 0 &&
      Object.keys(universityErrors.wife || {}).length === 0 &&
      Object.keys(internationalCurriculumErrors).length === 0
    );
  };

  const canAddUniversityQualification = (person) => {
    return person === "Husband"
      ? Object.keys(universityErrors.husband || {}).length === 0
      : Object.keys(universityErrors.wife || {}).length === 0;
  };

  const handleTextInputChange = (e) => {
    const { name, value } = e.target;
    try {
      if (name.includes("remark")) {
        const [section, field] = name.split(".");
        console.log('handleTextInputChange',{section, field})
        setEducation((prev) => ({
          ...prev,
          [section]: { ...prev[section], [field]: value },
        }));
      }
    } catch (error) {
      console.error(`Error in handleTextInputChange for name=${name}:`, error);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    

    try {
      if (name.includes("internationalCurriculum")) {
        const [level, person, field] = name.split(".");

            console.log('handleCheckboxChange', { level, checked,field } )


            if(person==="husband"){
        setEducation((prev) => ({
          ...prev,
          internationalCurriculumHusband: {
            ...prev.internationalCurriculumHusband,
            [field]: checked,
          },
        }));

      }

              if(person==="wife"){
        setEducation((prev) => ({
          ...prev,
          internationalCurriculumWife: {
            ...prev.internationalCurriculumWife,
            [field]: checked,
          },
        }));

      }


      } 
      
      else if (name.includes("enabled")) {
        const [section, person] = name.split(".");
         console.log('handleCheckboxChange',{checked,section,person})

  if (section === "olHusband") {
        setEducation((prev) => ({
          ...prev,
          olHusband: { ...prev.olHusband, enabled: checked },
        }));
  }
    if (section === "olWife") {
        setEducation((prev) => ({
          ...prev,
            olWife: { ...prev.olWife, enabled: checked },
        }));
  }

  

        if (section === "alHusband") {
           setEducation((prev) => ({
          ...prev,
          alHusband: { ...prev.alHusband, enabled: checked },
        }));
          validateALStream("husband", education.alHusband.alStreamName);
        }

            if (section === "alWife") {
           setEducation((prev) => ({
          ...prev,
          alWife: { ...prev.alWife, enabled: checked },
        }));
          validateALStream("wife", education.alWife.alStreamName);
        }

        
         if (section === "universityHusband") {
              
          setEducation((prev) => ({
          ...prev,
          universityHusband: { ...prev.universityHusband, enabled: checked },
        }));

          education.universityHusband.subjects.forEach((s, index) => {
            validateUniversity(index, "name", s.name, person);
            validateUniversity(index, "institution", s.institutionName, person);
            validateUniversity(index, "marks", s.marks, person);
          });
        }

 else if (section === "universityWife") {

    setEducation((prev) => ({
          ...prev,
          universityWife: { ...prev.universityWife, enabled: checked },
        }));

          education.universityWife.subjects.forEach((s, index) => {
            validateUniversity(index, "name", s.name, person);
            validateUniversity(index, "institution", s.institutionName, person);
            validateUniversity(index, "marks", s.marks, person);
          });
        }


      }
    } catch (error) {
      console.error(`Error in handleCheckboxChange for name=${name}:`, error);
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setEducation((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateEducationYears(value, name);
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    const [stateName, person] = name.split(".");
    setEducation((prev) => ({
      ...prev,
      [stateName]: {
        ...prev[stateName],
        isPassed: value === "Pass",
        result: value,
      },
    }));
    validateOL("result", value === "Pass" ? true : false, person);
  };

  const handleSubjectChange = async (level, index, selectedOption, field, person) => {
    const value = selectedOption ? selectedOption.value : "";
    setEducation((prev) => {
      if (level === "stream") {
        return {
          ...prev,
          [`al${person}`]: {
            ...prev[`al${person}`],
            alStreamId: value,
            alStreamName: selectedOption.name,
          },
        };
      } else if (level === "university") {
        const updatedSubjects = [...prev[`university${person}`].subjects];
        if (field === "institution") {
          updatedSubjects[index] = {
            ...updatedSubjects[index],
            institutionId: value,
            institutionName: selectedOption.name,
          };
        } else if (field === "degree") {
          updatedSubjects[index] = {
            ...updatedSubjects[index],
            value: value,
            name: selectedOption.name,
          };
        }
        return {
          ...prev,
          [`university${person}`]: { ...prev[`university${person}`], subjects: updatedSubjects },
        };
      }
      return prev;
    });

    if (level === "stream") {
      validateALStream(person.toLowerCase(), value, person);
    } else if (level === "university") {
      validateUniversity(index, field === "degree" ? "degree" : "institution", value, person);
    }
  };

  const addUniversityQualification = (person) => {
    const newQualification = {
      value: "",
      institution: "Other",
      institutionName: "Other",
      institutionId: "Other",
      marks: "1",
      year: currentYear,
      isNew: true,
    };
    setEducation((prev) => {
      const newSubjects = [...prev[`university${person}`].subjects, newQualification];
      validateUniversity(newSubjects.length - 1, undefined, "", person);
      return {
        ...prev,
        [`university${person}`]: { ...prev[`university${person}`], subjects: newSubjects },
      };
    });
  };

  const removeItem = (type, index, person) => {
    setEducation((prev) => {
      const updatedSubjects = [...prev[`university${person}`].subjects];
      updatedSubjects.splice(index, 1);
      setUniversityErrors((prevErrors) => {
        const newErrors = { ...prevErrors, [person.toLowerCase()]: { ...prevErrors[person.toLowerCase()] } };
        Object.keys(newErrors[person.toLowerCase()]).forEach((key) => {
          if (key.startsWith(`qualification_${index}_`)) delete newErrors[person.toLowerCase()][key];
        });
        return newErrors;
      });
      return {
        ...prev,
        [`university${person}`]: { ...prev[`university${person}`], subjects: updatedSubjects },
      };
    });
  };

  const handleSave = async () => {
    const validations = validateAllFields();
    const isAllValidated = validations.every((v) => v !== false);
    if (isAllValidated && isFormValid()) {
      const transformedPayload = {
        patientId: id,
        educationYearsHusband: education.educationYearsHusband ?  education.educationYearsHusband:null,
        isOLHusband: education.olHusband.enabled,
        isOLPassedHusband: education.olHusband.isPassed,
        olRemarkHusband: education.olHusband.remark,
        isALHusband: education.alHusband.enabled,
        alStreamNameHusband: education.alHusband.alStreamName,
        alRemarkHusband: education.alHusband.remark,
        isUniversityHusband: education.universityHusband.enabled,
        universitySubjectsHusband: education.universityHusband.subjects.map((subject) => ({
          name: subject.name,
          institution: subject.institutionName,
          marks: subject.marks,
          year: subject.year,
        })) || [],
        universityRemarkHusband: education.universityHusband.remark,
        isEdexcelHusband: education.internationalCurriculumHusband.isEdexcel,
        isCambridgeHusband: education.internationalCurriculumHusband.isCambridge,
        educationYearsWife: education.educationYearsWife ? education.educationYearsWife:null,
        isOLWife: education.olWife.enabled,
        isOLPassedWife: education.olWife.isPassed,
        olRemarkWife: education.olWife.remark,
        isALWife: education.alWife.enabled,
        alStreamNameWife: education.alWife.alStreamName,
        alRemarkWife: education.alWife.remark,
        isUniversityWife: education.universityWife.enabled,
        universitySubjectsWife: education.universityWife.subjects.map((subject) => ({
          name: subject.name,
          institution: subject.institutionName,
          marks: subject.marks,
          year: subject.year,
        })) || [],
        universityRemarkWife: education.universityWife.remark,
        isEdexcelWife: education.internationalCurriculumWife.isEdexcel,
        isCambridgeWife: education.internationalCurriculumWife.isCambridge,
        isConfirm: true,
      };

      const res = await addEducationFamily(transformedPayload);
      if (res.data.error) {
        setModal({ isOpen: true, message: res.data.error.message, type: "error" });
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

      loadDropdowns();
      loadAllEducationData();
      setModal({
        isOpen: true,
        message: res.data.outputValues.outputMessage,
        type: "success",
      });
      setIsSaving(false);
      refreshTabDetails(Math.random());
      setMode("edit");
    } else {
      setModal({
        isOpen: true,
        message: "Please correct the errors in the form before saving.",
        type: "warning",
      });
      setIsSaving(false);
    }
  };

  return (
    <>
      <MessageModel
        isOpen={modal.isOpen}
        onClose={() => setModal({ isOpen: false, message: "", type: "error" })}
        message={modal.message}
        type={modal.type}
      />
      {!isLoading ? (

!printPreviewMode ?
        <div className="px-8 py-6">
          {/* Educational Background */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-xl font-semibold text-gray-800">Educational Background</h3>
              {mode !== "add" && (
                <div className="flex space-x-4">
                  <EditButton
                    onClick={() => toggleSectionEdit("educationYears")}
                    ariaLabel={editingSection === "educationYears" ? "Save Educational Background" : "Edit Educational Background"}
                    disabled={isSaving}
                  >
                    {editingSection === "educationYears" ? (isSaving ? "Saving..." : "Save") : "Edit"}
                  </EditButton>
                  {editingSection === "educationYears" && (
                    <button
                      onClick={() => handleCancel("educationYears")}
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
            {editingSection === "educationYears" || mode === "add" ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div></div>
                  <div className="col-span-2">
                  <h4 className="text-lg font-semibold text-sky-700">Husband</h4>
                  </div>
                    <div className="col-span-2">
                  <h4 className="text-lg font-semibold text-sky-700">Wife</h4>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    Years of Formal Education <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-2">
                  <div>
                    <select
                      name="educationYearsHusband"
                      value={education.educationYearsHusband || ""}
                      onChange={handleSelectChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      disabled={editingSection !== "educationYears" && mode !== "add"}
                      aria-label="Husband Years of Formal Education"
                    >
                      <option value="">Select years</option>
                      {[...Array(21)].map((_, i) => (
                        <option key={i} value={i}>
                          {i === 20 ? "More than 20" : i}
                        </option>
                      ))}
                    </select>
                    {educationYearsErrors.educationYearsHusband && (
                      <p className="mt-1 text-sm text-red-600">{educationYearsErrors.educationYearsHusband}</p>
                    )}
                  </div>
               </div>
                <div className="col-span-2">
                  <div>
                    <select
                      name="educationYearsWife"
                      value={education.educationYearsWife || ""}
                      onChange={handleSelectChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      disabled={editingSection !== "educationYears" && mode !== "add"}
                      aria-label="Wife Years of Formal Education"
                    >
                      <option value="">Select years</option>
                      {[...Array(21)].map((_, i) => (
                        <option key={i} value={i}>
                          {i === 20 ? "More than 20" : i}
                        </option>
                      ))}
                    </select>
                    {educationYearsErrors.educationYearsWife && (
                      <p className="mt-1 text-sm text-red-600">{educationYearsErrors.educationYearsWife}</p>
                    )}
                  </div>
                </div>
                  </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div></div>
                    <div className="col-span-2">
                  <h4 className="text-lg font-semibold text-sky-700">Husband</h4>
                  </div>
  <div className="col-span-2">
                  <h4 className="text-lg font-semibold text-sky-700">Wife</h4>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                  <label className="block font-medium text-gray-700">Years of Formal Education</label>
                      <div className="col-span-2">
                  <div className=" border border-gray-200 rounded-lg p-3">
                    {education.educationYearsHusband || education.educationYearsHusband === 0
                      ? education.educationYearsHusband === 20
                        ? "More than 20"
                        : education.educationYearsHusband
                      : "N/A"}
                  </div>
                </div>
                        <div className="col-span-2">
                  <div className=" border border-gray-200 rounded-lg p-3">
                    {education.educationYearsWife || education.educationYearsWife === 0
                      ? education.educationYearsWife === 20
                        ? "More than 20"
                        : education.educationYearsWife
                      : "N/A"}
                  </div></div>
                </div>
              </div>
            )}
          </section>

          {/* G.C.E Ordinary Level (O/L) Qualifications */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <div className="flex items-center space-x-3">
             
                <h3 className="text-xl font-semibold text-gray-800">G.C.E Ordinary Level (O/L) Qualifications</h3>
              </div>
              {mode !== "add" && (
                <div className="flex space-x-4">
                  <EditButton
                    onClick={() => toggleSectionEdit("ol")}
                    ariaLabel={editingSection === "ol" ? "Save O/L Qualifications" : "Edit O/L Qualifications"}
                    disabled={isSaving}
                  >
                    {editingSection === "ol" ? (isSaving ? "Saving..." : "Save") : "Edit"}
                  </EditButton>
                  {editingSection === "ol" && (
                    <button
                      onClick={() => handleCancel("ol")}
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
            {editingSection === "ol" || mode === "add" ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div></div>
                  <div className="col-span-2">

                    
                       <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="olHusband.enabled"
                    checked={education.olHusband.enabled}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                    disabled={editingSection !== "ol" && mode !== "add"}
                    aria-label="Husband Has G.C.E O/L Qualifications"
                  />
                   <span className="text-lg ml-2 font-semibold text-sky-700">Husband</span>
                </label>
             
                  </div>

                   <div className="col-span-2">
                    <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="olWife.enabled"
                    checked={education.olWife.enabled}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                    disabled={editingSection !== "ol" && mode !== "add"}
                    aria-label="Husband Has G.C.E O/L Qualifications"
                  />
                   <span className="text-lg ml-2 font-semibold text-sky-700">Wife</span>
                </label>
                
                            
                  </div>


                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                  <label className="block font-medium text-gray-700">
                    Result <span className="text-red-500">*</span>
                  </label>
                       <div className="col-span-2">
                 
                      <div>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="olHusband.result"
                              value="Pass"
                              checked={education.olHusband.isPassed === true}
                              onChange={handleRadioChange}
                              className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                              disabled={!education.olHusband.enabled}
                              aria-label="Husband O/L Result Pass"
                              required
                            />
                            <span className="ml-2 text-sm text-gray-700">Pass</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="olHusband.result"
                              value="Fail"
                              checked={education.olHusband.isPassed === false}
                              onChange={handleRadioChange}
                              className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                              disabled={!education.olHusband.enabled}
                              aria-label="Husband O/L Result Fail"
                              required
                            />
                            <span className="ml-2 text-sm text-gray-700">Fail</span>
                          </label>
                        </div>
                        {olErrors.husband?.result && (
                          <p className="mt-1 text-sm text-red-600">{olErrors.husband.result}</p>
                        )}
                      </div>
                
                  </div>
                       <div className="col-span-2">
            
                      <div>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="olWife.result"
                              value="Pass"
                              checked={education.olWife.isPassed === true}
                              onChange={handleRadioChange}
                              className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                              disabled={!education.olWife.enabled}
                              aria-label="Wife O/L Result Pass"
                              required
                            />
                            <span className="ml-2 text-sm text-gray-700">Pass</span>
                          </label>
                      
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="olWife.result"
                              value="Fail"
                              checked={education.olWife.isPassed === false}
                              onChange={handleRadioChange}
                              className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                              disabled={!education.olWife.enabled}
                              aria-label="Wife O/L Result Fail"
                              required
                            />
                            <span className="ml-2 text-sm text-gray-700">Fail</span>
                          </label>
                        </div>
                        {olErrors.wife?.result && (
                          <p className="mt-1 text-sm text-red-600">{olErrors.wife.result}</p>
                        )}
                      </div>
                
              
                  </div>
                </div>


 <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
     <label className="block font-medium text-gray-700 mt-4">Remark</label>
  
   <div className="col-span-2">

                    <VoiceToText
                      name="olHusband.remark"
                      value={education.olHusband.remark || ""}
                      onChange={handleTextInputChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter any additional remarks"
                      disabled={!education.olHusband.enabled}
                      aria-label="Husband O/L Remark"
                      rows="4"
                    />
               
  </div>

    <div className="col-span-2">
 
      <VoiceToText
                      name="olWife.remark"
                      value={education.olWife.remark || ""}
                      onChange={handleTextInputChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter any additional remarks"
                      disabled={!education.olWife.enabled}
                      aria-label="Wife O/L Remark"
                      rows="4"
                    />

    </div>

 </div>


              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div></div>
                    <div className="col-span-2">
                  <h4 className="text-lg font-semibold text-sky-700">Husband</h4></div>
                    <div className="col-span-2">
                  <h4 className="text-lg font-semibold text-sky-700">Wife</h4></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                  <div>
                 {education.olHusband.enabled || education.olWife.enabled ? 
                  <label className="block font-medium text-gray-700">Result 
                    <span className="text-red-500">*</span></label>:null}
</div>

                   <div className="col-span-2">
                    
                    {education.olHusband.enabled ? (
                      <div className="flex items-center space-x-2 font-semibold">
                        {education.olHusband.isPassed ? (
                          <><FaCheckCircle className="text-xl text-green-600" /><span>Passed</span></>
                        ) : (
                          <><FaTimesCircle className="text-xl text-red-600" /><span>Failed</span></>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-500 font-semibold">
                        <FaInfoCircle className="text-xl" /><span>No O/L qualifications</span>
                      </div>
                    )}
              
                  </div>
                   <div className="col-span-2">
                    {education.olWife.enabled ? (
                      <div className="flex items-center space-x-2 font-semibold">
                        {education.olWife.isPassed ? (
                          <><FaCheckCircle className="text-xl text-green-600" /><span>Passed</span></>
                        ) : (
                          <><FaTimesCircle className="text-xl text-red-600" /><span>Failed</span></>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-500 font-semibold">
                        <FaInfoCircle className="text-xl" /><span>No O/L qualifications</span>
                      </div>
                    )}


                  </div>
                </div>

 <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
  <div>
      {education.olHusband.enabled || education.olWife.enabled ? 
         <label className="block font-medium text-gray-700">Remark</label>:null}
</div>
         <div className="col-span-2">
      {education.olHusband.remark ? (
                      <div className="mt-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-3 mt-1 whitespace-pre-line">
                          {education.olHusband.remark}
                        </div>
                      </div>
                    ):''}
</div>

         <div className="col-span-2">
                    {education.olWife.remark ? (                   
                      <div className="mt-4">
                   
                        <div className="bg-white border border-gray-200 rounded-lg p-3 mt-1 whitespace-pre-line">
                          {education.olWife.remark}
                        </div>
                      </div>
                  
                    ):''}
</div>
                        </div>


              </div>
            )}
          </section>

          {/* International Curriculum */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-xl font-semibold text-gray-800">International Curriculum</h3>
              {mode !== "add" && (
                <div className="flex space-x-4">
                  <EditButton
                    onClick={() => toggleSectionEdit("internationalCurriculum")}
                    ariaLabel={editingSection === "internationalCurriculum" ? "Save International Curriculum" : "Edit International Curriculum"}
                    disabled={isSaving}
                  >
                    {editingSection === "internationalCurriculum" ? (isSaving ? "Saving..." : "Save") : "Edit"}
                  </EditButton>
                  {editingSection === "internationalCurriculum" && (
                    <button
                      onClick={() => handleCancel("internationalCurriculum")}
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
            {editingSection === "internationalCurriculum" || mode === "add" ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div></div>
                  <div className="col-span-2">
                  <h4 className="text-lg font-semibold text-sky-700">Husband</h4></div>
                    <div className="col-span-2">
                  <h4 className="text-lg font-semibold text-sky-700">Wife</h4></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                  <label className="block font-medium text-gray-700">Curriculum</label>
                    <div className="col-span-2">
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="internationalCurriculumHusband.husband.isEdexcel"
                        checked={education.internationalCurriculumHusband.isEdexcel}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                        aria-label="Husband Followed Edexcel Curriculum"
                      />
                      <span className="ml-2 text-sm text-gray-700">Edexcel</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="internationalCurriculumHusband.husband.isCambridge"
                        checked={education.internationalCurriculumHusband.isCambridge}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                        aria-label="Husband Followed Cambridge Curriculum"
                      />
                      <span className="ml-2 text-sm text-gray-700">Cambridge</span>
                    </label>
                  </div>
                  </div>
                    <div className="col-span-2">
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="internationalCurriculumWife.wife.isEdexcel"
                        checked={education.internationalCurriculumWife.isEdexcel}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                        aria-label="Wife Followed Edexcel Curriculum"
                      />
                      <span className="ml-2 text-sm text-gray-700">Edexcel</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="internationalCurriculumWife.wife.isCambridge"
                        checked={education.internationalCurriculumWife.isCambridge}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                        aria-label="Wife Followed Cambridge Curriculum"
                      />
                      <span className="ml-2 text-sm text-gray-700">Cambridge</span>
                    </label>
                  </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div></div>
                          <div className="col-span-2">
                  <h4 className="text-lg font-semibold text-sky-700">Husband</h4></div>
                          <div className="col-span-2">
                  <h4 className="text-lg font-semibold text-sky-700">Wife</h4></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                  <label className="block font-medium text-gray-700 mt-4">Curriculum</label>
                        <div className="col-span-2">
                  <div className="flex flex-col space-y-2">
                    {education.internationalCurriculumHusband.isEdexcel ? (
                        <div  className="flex items-center p-2">
                          <FaGraduationCap className="text-sky-600 mr-2" />
                          <span>Edexcel</span>
                        </div>
                    ):null}
                    {education.internationalCurriculumHusband.isCambridge ? (
                          <div  className="flex items-center p-2">
                          <FaGraduationCap className="text-sky-600 mr-2" />
                          <span>Cambridge</span>
                        </div>
                    ):null}
                    {!education.internationalCurriculumHusband.isEdexcel && !education.internationalCurriculumHusband.isCambridge && (
                      <div className="flex items-center space-x-2 text-gray-500 font-semibold">
                        <FaInfoCircle className="text-xl" /><span>No international curriculum</span>
                      </div>
                    )}
                  </div>
</div>
                         <div className="col-span-2">
                  <div className="flex flex-col space-y-2">
                    {education.internationalCurriculumWife.isEdexcel ? (
                     <div  className="flex items-center p-2">
                          <FaGraduationCap className="text-sky-600 mr-2" />
                          <span>Edexcel</span>
                        </div>
                    ):null}
                    {education.internationalCurriculumWife.isCambridge ? (
                    <div  className="flex items-center p-2">
                          <FaGraduationCap className="text-sky-600 mr-2" />
                          <span>Cambridge</span>
                        </div>
                    ):null}
                    {!education.internationalCurriculumWife.isEdexcel && !education.internationalCurriculumWife.isCambridge && (
                      <div className="flex items-center space-x-2 text-gray-500 font-semibold">
                        <FaInfoCircle className="text-xl" /><span>No international curriculum</span>
                      </div>
                    )}
                  </div>
                </div>
                </div>
              </div>
            )}
          </section>
          
          {/* G.C.E Advanced Level (A/L) Qualifications */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <div className="flex items-center space-x-3">
             
                <h3 className="text-xl font-semibold text-gray-800">G.C.E Advanced Level (A/L) Qualifications</h3>
              </div>
              {mode !== "add" && (
                <div className="flex space-x-4">
                  <EditButton
                    onClick={() => toggleSectionEdit("al")}
                    ariaLabel={editingSection === "al" ? "Save A/L Qualifications" : "Edit A/L Qualifications"}
                    disabled={isSaving}
                  >
                    {editingSection === "al" ? (isSaving ? "Saving..." : "Save") : "Edit"}
                  </EditButton>
                  {editingSection === "al" && (
                    <button
                      onClick={() => handleCancel("al")}
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
            {editingSection === "al" || mode === "add" ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div></div>
                 
                 <div className="col-span-2">

                     <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="alHusband.enabled"
                    checked={education.alHusband.enabled}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                    disabled={editingSection !== "al" && mode !== "add"}
                    aria-label="Husband Has G.C.E A/L Qualifications"
                  />
                     <span className="text-lg ml-2 font-semibold text-sky-700">Husband</span>
                </label>

            
                  </div>

                   <div className="col-span-2">
                              <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="alWife.enabled"
                    checked={education.alWife.enabled}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                    disabled={editingSection !== "al" && mode !== "add"}
                    aria-label="Wife Has G.C.E A/L Qualifications"
                  />
                     <span className="text-lg ml-2 font-semibold text-sky-700">Wife</span>
                </label>
                </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                  <label className="block font-medium text-gray-700">
                    Stream <span className="text-red-500">*</span>
                  </label>
                   <div className="col-span-2">
                  <div>
                    <TypeableDropdown
                      options={alStremsOptions}
                      value={{ value: education.alHusband.alStreamId, name: education.alHusband.alStreamName }}
                      onChange={(option) => handleSubjectChange("stream", null, option, null, "Husband")}
                      placeholder="Select or type stream"
                      isDisabled={!education.alHusband.enabled}
                      className="mt-1"
                      classNamePrefix="select"
                      aria-label="Husband A/L Stream"
                    />
                    {alErrors.husband?.stream && (
                      <p className="mt-1 text-sm text-red-600">{alErrors.husband.stream}</p>
                    )}
                </div>
                  </div>
                   <div className="col-span-2">
                  <div>
                    <TypeableDropdown
                      options={alStremsOptions}
                      value={{ value: education.alWife.alStreamId, name: education.alWife.alStreamName }}
                      onChange={(option) => handleSubjectChange("stream", null, option, null, "Wife")}
                      placeholder="Select or type stream"
                      isDisabled={!education.alWife.enabled}
                      className="mt-1"
                      classNamePrefix="select"
                      aria-label="Wife A/L Stream"
                    />
                    {alErrors.wife?.stream && (
                      <p className="mt-1 text-sm text-red-600">{alErrors.wife.stream}</p>
                    )}
               </div>
                  </div>
                </div>


                 <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                    <label className="block font-medium text-gray-700 mt-4">Remark</label>
          
                
             <div className="col-span-2">
                    <VoiceToText
                      name="alHusband.remark"
                      value={education.alHusband.remark || ""}
                      onChange={handleTextInputChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter any additional remarks"
                      disabled={!education.alHusband.enabled}
                      aria-label="Husband A/L Remark"
                      rows="4"
                    />
                  </div>

                    <div className="col-span-2">
                    <VoiceToText
                      name="alWife.remark"
                      value={education.alWife.remark || ""}
                      onChange={handleTextInputChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter any additional remarks"
                      disabled={!education.alWife.enabled}
                      aria-label="Wife A/L Remark"
                      rows="4"
                    />
                  </div>
           

</div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div></div>
                     <div className="col-span-2">
                  <h4 className="text-lg font-semibold text-sky-700">Husband</h4></div>
                     <div className="col-span-2">
                  <h4 className="text-lg font-semibold text-sky-700">Wife</h4></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                  <label className="block font-medium text-gray-700">Stream</label>
                           <div className="col-span-2">
                    {education.alHusband.enabled ? (
                      <div className=" border border-gray-200 rounded-lg p-3">
                        {education.alHusband.alStreamName || "N/A"}
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-500 font-semibold">
                        <FaInfoCircle className="text-xl" /><span>No A/L qualifications</span>
                      </div>
                    )}
                 
                  </div>
                           <div className="col-span-2">
                    {education.alWife.enabled ? (
                      <div className=" border border-gray-200 rounded-lg p-3">
                        {education.alWife.alStreamName || "N/A"}
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-500 font-semibold">
                        <FaInfoCircle className="text-xl" /><span>No A/L qualifications</span>
                      </div>
                    )}
                  
                  </div>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                                     <label className="block font-medium text-gray-700">Remark</label>
                
                            <div className="col-span-2">
                    {education.alHusband.remark && (
                      <div className="mt-4">
     
                        <div className="bg-white border border-gray-200 rounded-lg p-3 mt-1 whitespace-pre-line">
                          {education.alHusband.remark}
                        </div>
                      </div>
                    )}
                  </div>
              

                   <div className="col-span-2">
                    {education.alWife.remark && (
                      <div className="mt-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-3 mt-1 whitespace-pre-line">
                          {education.alWife.remark}
                        </div>
                      </div>
                    )}
                  </div>
                </div>


              </div>
            )}
          </section>



          {/* University Qualifications */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <div className="flex items-center space-x-3">
              
                <h3 className="text-xl font-semibold text-gray-800">University Qualifications</h3>
              </div>
              {mode !== "add" && (
                <div className="flex space-x-4">
                  <EditButton
                    onClick={() => toggleSectionEdit("university")}
                    ariaLabel={editingSection === "university" ? "Save University Qualifications" : "Edit University Qualifications"}
                    disabled={isSaving}
                  >
                    {editingSection === "university" ? (isSaving ? "Saving..." : "Save") : "Edit"}
                  </EditButton>
                  {editingSection === "university" && (
                    <button
                      onClick={() => handleCancel("university")}
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
            {editingSection === "university" || mode === "add" ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div></div>
                  
                  <div className="col-span-2">
                      <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="universityHusband.enabled"
                    checked={education.universityHusband.enabled}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                    disabled={editingSection !== "university" && mode !== "add"}
                    aria-label="Husband Has University Qualifications"
                  />
                  <span className="ml-2 text-lg font-semibold text-sky-700">Husband</span>
                </label>     
</div>
                  <div className="col-span-2">
                           <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="universityWife.enabled"
                    checked={education.universityWife.enabled}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                    disabled={editingSection !== "university" && mode !== "add"}
                    aria-label="Wife Has University Qualifications"
                  />
                  <span className="ml-2 text-lg font-semibold text-sky-700">Wife</span>
                </label>  
                </div>
                </div>
                {universitySubjectListError && (
                  <p className="mt-1 text-sm text-white bg-red-600 p-3 rounded-lg">{universitySubjectListError}</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                  <label className="block font-medium text-gray-700">Qualifications <span className="text-red-500">*</span></label>
                    <div className="col-span-2">
                    {education.universityHusband.subjects.map((qualification, index) => (
                      <div key={index} className="flex items-center space-x-4 mb-4">
                        <div className="grid grid-cols-1 gap-4 flex-1">
                          <div>
                            <label className="block font-medium text-gray-700">
                              Degree <span className="text-red-500">*</span>
                            </label>
                            <TypeableDropdown
                              options={degreeOptions}
                              value={{ value: qualification.value, name: qualification.name }}
                              onChange={(option) => handleSubjectChange("university", index, option, "degree", "Husband")}
                              placeholder="Select or type degree"
                              isDisabled={!qualification.isNew}
                              className="mt-1"
                              classNamePrefix="select"
                              aria-label={`Husband Degree ${index + 1}`}
                            />
                            {universityErrors.husband?.[`qualification_${index}_name`] && (
                              <p className="mt-1 text-sm text-red-600">{universityErrors.husband[`qualification_${index}_name`]}</p>
                            )}
                          </div>
                          {/* <div>
                            <label className="block font-medium text-gray-700">
                              Institution <span className="text-red-500">*</span>
                            </label>
                            <TypeableDropdown
                              options={institutionsOptions}
                              value={{ value: qualification.institutionId, name: qualification.institutionName }}
                              onChange={(option) => handleSubjectChange("university", index, option, "institution", "Husband")}
                              placeholder="e.g., University of Colombo"
                              isDisabled={!qualification.isNew}
                              className="mt-1"
                              classNamePrefix="select"
                              aria-label={`Husband Institution ${index + 1}`}
                            />
                            {universityErrors.husband?.[`qualification_${index}_institution`] && (
                              <p className="mt-1 text-sm text-red-600">{universityErrors.husband[`qualification_${index}_institution`]}</p>
                            )}
                          </div>
                          <div>
                            <label className="block font-medium text-gray-700">
                              Year <span className="text-red-500">*</span>
                            </label>
                            <select
                              name={`education.universityHusband.subjects.${index}.year`}
                              value={qualification.year || currentYear}
                              onChange={handleTextInputChange}
                              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                              disabled={!qualification.isNew}
                              aria-label={`Husband University Qualification ${index + 1} Year`}
                            >
                              {yearOptions.map((year) => (
                                <option key={year} value={year}>{year}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block font-medium text-gray-700">
                              Marks/Grade <span className="text-red-500">*</span>
                            </label>
                            <input
                              name={`education.universityHusband.subjects.${index}.marks`}
                              value={qualification.marks || ""}
                              onChange={handleTextInputChange}
                              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                              placeholder="e.g., First Class, 3.8 GPA"
                              aria-label={`Husband University Qualification ${index + 1} Marks`}
                              required
                            />
                            {universityErrors.husband?.[`qualification_${index}_marks`] && (
                              <p className="mt-1 text-sm text-red-600">{universityErrors.husband[`qualification_${index}_marks`]}</p>
                            )}
                          </div> */}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem("universityHusband", index, "Husband")}
                          className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-all duration-200 mt-5"
                          disabled={!education.universityHusband.enabled}
                          aria-label="Remove Husband University Qualification"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1H5a1 1 0 00-1 1v1h16V5a1 1 0 00-1-1h-4a1 1 0 00-1-1zM8 10v8m4-8v8m4-8v8"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addUniversityQualification("Husband")}
                      className="mt-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-all duration-200"
                      disabled={!education.universityHusband.enabled || !canAddUniversityQualification("Husband")}
                      aria-label="Add Husband University Qualification"
                    >
                      Add Qualification
                    </button>
                  
                      <div className="mt-4">
                        <label className="block font-medium text-gray-700">Remark</label>
                        <VoiceToText
                          name="universityHusband.remark"
                          value={education.universityHusband.remark || ""}
                          onChange={handleTextInputChange}
                          className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                          placeholder="Enter any additional remarks"
                          disabled={!education.universityHusband.enabled}
                          aria-label="Husband University Remark"
                          rows="4"
                        />
                      </div>
                 
                  </div>
                      <div className="col-span-2">
                    {education.universityWife.subjects.map((qualification, index) => (
                      <div key={index} className="flex items-center space-x-4 mb-4">
                        <div className="grid grid-cols-1 gap-4 flex-1">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Degree <span className="text-red-500">*</span>
                            </label>
                            <TypeableDropdown
                              options={degreeOptions}
                              value={{ value: qualification.value, name: qualification.name }}
                              onChange={(option) => handleSubjectChange("university", index, option, "degree", "Wife")}
                              placeholder="Select or type degree"
                              isDisabled={!qualification.isNew}
                              className="mt-1"
                              classNamePrefix="select"
                              aria-label={`Wife Degree ${index + 1}`}
                            />
                            {universityErrors.wife?.[`qualification_${index}_name`] && (
                              <p className="mt-1 text-sm text-red-600">{universityErrors.wife[`qualification_${index}_name`]}</p>
                            )}
                          </div>
                         
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem("universityWife", index, "Wife")}
                          className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-all duration-200 mt-5"
                          disabled={!education.universityWife.enabled}
                          aria-label="Remove Wife University Qualification"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1H5a1 1 0 00-1 1v1h16V5a1 1 0 00-1-1h-4a1 1 0 00-1-1zM8 10v8m4-8v8m4-8v8"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addUniversityQualification("Wife")}
                      className="mt-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-all duration-200"
                      disabled={!education.universityWife.enabled || !canAddUniversityQualification("Wife")}
                      aria-label="Add Wife University Qualification"
                    >
                      Add Qualification
                    </button>
                   
                      <div className="mt-4">
                        <label className="block font-medium text-gray-700">Remark</label>
                        <VoiceToText
                          name="universityWife.remark"
                          value={education.universityWife.remark || ""}
                          onChange={handleTextInputChange}
                          className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                          placeholder="Enter any additional remarks"
                          disabled={!education.universityWife.enabled}
                          aria-label="Wife University Remark"
                          rows="4"
                        />
                      </div>
                 
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div></div>
                      <div className="col-span-2">
                  <h4 className="text-lg font-semibold text-sky-700">Husband</h4></div>

                      <div className="col-span-2">
                  <h4 className="text-lg font-semibold text-sky-700">Wife</h4></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                  <label className="block font-medium text-gray-700 mt-4">Degree</label>
                           <div className="col-span-2">
                    {education.universityHusband.enabled ? (
                      <div>
                    
                            {education.universityHusband.subjects.map((qualification, index) => (
                          
                                
                                    <div key={index} className="flex items-center p-2">
                          <FaGraduationCap className="text-sky-600 mr-2" />
                          <span>{qualification.name}</span>
                        </div>

                          
                            ))}
                       
                      
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-500 font-semibold">
                        <FaInfoCircle className="text-xl" /><span>No University qualifications</span>
                      </div>
                    )}
                  </div>
                          <div className="col-span-2">
                    {education.universityWife.enabled ? (
                      <div>
                       
                            {education.universityWife.subjects.map((qualification, index) => (
           
                                    <div key={index} className="flex items-center p-2">
                          <FaGraduationCap className="text-sky-600 mr-2" />
                          <span>{qualification.name}</span>
                        </div>

                            ))}

                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-500 font-semibold">
                        <FaInfoCircle className="text-xl" /><span>No University qualifications</span>
                      </div>
                    )}
                  </div>
                </div>


   <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                <label className="block font-medium text-gray-700 mt-7">Remark</label>
      <div className="col-span-2">
  {education.universityHusband.remark && (
                          <div className="mt-4">
                            <div className="bg-white border border-gray-200 rounded-lg p-3 mt-1 whitespace-pre-line">
                              {education.universityHusband.remark}
                            </div>
                          </div>
                        )}
      </div>

            <div className="col-span-2">
     {education.universityWife.remark && (
                          <div className="mt-4">
                            <div className="bg-white border border-gray-200 rounded-lg p-3 mt-1 whitespace-pre-line">
                              {education.universityWife.remark}
                            </div>
                          </div>
                        )}
            </div>

   </div>


              </div>
            )}
          </section>

          {/* Save Button for Add Mode */}
          {mode === "add" && (
            <div className="flex justify-end mt-10">
              <button
                onClick={handleSave}
                className="bg-sky-600 text-white px-6 py-3 rounded-md hover:bg-sky-700 transition-all duration-200"
                disabled={isSaving}
                aria-label="Save All Education Details"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </div>
:
<PrintEducationDetailsFamilyA4 
  education={education} 
  printPreviewMode={true} 
/>

      ) : (
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
};

export default TabEducationDetailsFamily;