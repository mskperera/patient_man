import React, { useState, useEffect } from "react";
import TypeableDropdown from "../TypeableDropdown";
import LoadingSpinner from "../LoadingSpinner";
import MessageModel from "../MessageModel";
import {
  addEducation,
  drpALStreams,
  drpALSubjects,
  drpInstitutions,
  drpOLSubjects,
  drpUniversitySubjects,
  getAl,
getInternationalCurriculum,
  getEducationYears,
  getOl,
  getScholarship,
  getUniversity,
  updateEducation,
} from "../../functions/patient";
import EditButton from "../EditButton";
import VoiceToText from "../VoiceToText";
import { FaGraduationCap, FaInfoCircle } from "react-icons/fa";


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
`;

const PrintEducationDetailsA4 = ({
  education,
  printPreviewMode = true,
}) => {
  if (!printPreviewMode) return null;

  const renderNA = (value) => (value ? value : "N/A");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />

      <div className="print-break font-sans text-sm leading-relaxed max-w-[210mm] mx-auto bg-white">

        {/* ========== PAGE 1: Title + Educational Background + Scholarship ========== */}
        <div>
          <h1 className="text-center text-xl font-bold text-sky-700 mb-6">Education Details</h1>

          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-4">
            Educational Background
          </h3>

          <div className="mb-6">
            <span className="font-semibold text-gray-700">Years of Formal Education Completed:</span>{" "}
            <span className="text-gray-800">
              {education.educationYears == null
                ? "N/A"
                : education.educationYears === 20
                ? "More than 20"
                : education.educationYears}
            </span>
          </div>

          {/* Grade 5 Scholarship */}
          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-4">
            Grade 5 Scholarship Qualification
          </h3>

          <div className="mb-4">
            <span className="font-semibold text-gray-700">Has Grade 5 Scholarship:</span>{" "}
            <span className="text-gray-800">{education.scholarship.enabled ? "Yes" : "No"}</span>
          </div>

          {education.scholarship.enabled && (
            <>
              <table className="w-full border-collapse border border-gray-300 mt-2 text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Marks</th>
                    <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">School Admitted</th>
                    <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-2 py-1">{renderNA(education.scholarship.marks)}</td>
                    <td className="border border-gray-300 px-2 py-1">{renderNA(education.scholarship.schoolAdmitted)}</td>
                    <td className="border border-gray-300 px-2 py-1">{renderNA(education.scholarship.result)}</td>
                  </tr>
                </tbody>
              </table>

              {education.scholarship.remark && (
                <div className="mt-4">
                  <span className="font-semibold text-gray-700">Remark:</span>
                  <div className="bg-gray-50 border border-gray-300 rounded-md p-3 mt-1 text-xs whitespace-pre-line text-gray-800">
                    {education.scholarship.remark}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* ========== PAGE 2: O/L Qualifications ========== */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-4">
            G.C.E Ordinary Level (O/L) Qualifications
          </h3>

          {!education.ol.enabled ? (
            <div className="flex items-center gap-2 text-gray-600 italic">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>No O/L qualifications recorded.</span>
            </div>
          ) : education.ol.subjects.length > 0 ? (
            <>
              <table className="w-full border-collapse border border-gray-300 mt-2 text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Subject</th>
                    <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {education.ol.subjects.map((s, i) => (
                    <tr key={i}>
                      <td className="border border-gray-300 px-2 py-1">{renderNA(s.name)}</td>
                      <td className="border border-gray-300 px-2 py-1">{renderNA(s.marks)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {education.ol.remark && (
                <div className="mt-4">
                  <span className="font-semibold text-gray-700">Remark:</span>
                  <div className="bg-gray-50 border border-gray-300 rounded-md p-3 mt-1 text-xs whitespace-pre-line text-gray-800">
                    {education.ol.remark}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center gap-2 text-gray-600 italic">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>O/L enabled but no subjects added.</span>
            </div>
          )}
        </div>


        {/* ========== PAGE 4: International Curriculum ========== */}
        <div className="print-break">
          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-4">
            International Curriculum
          </h3>

          <div className="flex flex-wrap gap-3 mt-3">
            {education.internationalCurriculum.isEdexcel && (
              <div className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md bg-white">
                <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                <span className="text-sm font-medium">Edexcel</span>
              </div>
            )}
            {education.internationalCurriculum.isCambridge && (
              <div className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md bg-white">
                <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                <span className="text-sm font-medium">Cambridge</span>
              </div>
            )}
            {(!education.internationalCurriculum.isEdexcel && !education.internationalCurriculum.isCambridge) && (
              <div className="flex items-center gap-2 text-gray-600 italic">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>No international curriculum followed.</span>
              </div>
            )}
          </div>
        </div>


        {/* ========== PAGE 3: A/L Qualifications ========== */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-4">
            G.C.E Advanced Level (A/L) Qualifications
          </h3>

          {!education.al.enabled ? (
            <div className="flex items-center gap-2 text-gray-600 italic">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>No A/L qualifications recorded.</span>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <span className="font-semibold text-gray-700">Stream:</span>{" "}
                <span className="text-gray-800">{renderNA(education.al.alStreamName)}</span>
              </div>

              {education.al.subjects.length > 0 ? (
                <>
                  <table className="w-full border-collapse border border-gray-300 mt-2 text-xs">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Subject</th>
                        <th className="border border-gray-300 px-2 py-1 text-left font-bold text-gray-700">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {education.al.subjects.map((s, i) => (
                        <tr key={i}>
                          <td className="border border-gray-300 px-2 py-1">{renderNA(s.name)}</td>
                          <td className="border border-gray-300 px-2 py-1">{renderNA(s.marks)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {education.al.remark && (
                    <div className="mt-4">
                      <span className="font-semibold text-gray-700">Remark:</span>
                      <div className="bg-gray-50 border border-gray-300 rounded-md p-3 mt-1 text-xs whitespace-pre-line text-gray-800">
                        {education.al.remark}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-2 text-gray-600 italic">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>A/L enabled but no subjects added.</span>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </>
  );
};



const TabEducationDetailsChild = ({ id, refreshTabDetails,printPreviewMode }) => {
  const currentYear = 2025;
  const yearOptions = Array.from(
    { length: 21 },
    (_, i) => currentYear - 10 + i
  );

  const [editingSection, setEditingSection] = useState(null);
  const [mode, setMode] = useState("add");
  const [education, setEducation] = useState({
    educationYears: "",
    scholarship: {
      enabled: false,
      marks: "",
      schoolAdmitted: "",
      result: "",
      remark: "",
    },
    ol: { enabled: false, subjects: [], remark: "" },
    al: {
      enabled: false,
      alStreamId: "",
      alStreamName: "",
      subjects: [],
      remark: "",
    },
    university: {
      enabled: false,
      subjects: [],
      remark: "",
      institutionId: "",
      institutionName: "",
    },
    internationalCurriculum: {
      isEdexcel: false,
      isCambridge: false,
    },
  });

  const [educationYearsErrors, setEducationYearsErrors] = useState({});
  const [scholarshipErrors, setScholarshipErrors] = useState({});
  const [olErrors, setOLErrors] = useState({});
  const [alErrors, setALErrors] = useState({});
  const [universityErrors, setUniversityErrors] = useState({});
  const [internationalCurriculumErrors, setInternationalCurriculumErrors] = useState({});
  const [olsubjectsOptions, setOlsubjectsOptions] = useState([]);
  const [alStremsOptions, setAlStremsOptions] = useState([]);
  const [alSubjectsOptions, setAlSubjectsOptions] = useState([]);
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
  const [olSubjectListError, setOLSubjectListError] = useState("");
  const [alSubjectListError, setALSubjectListError] = useState("");
  const [universitySubjectListError, setUniversitySubjectListError] = useState("");

  useEffect(() => {
    loadDropdowns();
  }, []);

  const loadDrpALStreams = async () => {
    const alStrems = await drpALStreams();
    setAlStremsOptions(alStrems.data.results[0]);
  };
  const loadDrpALSubjects = async () => {
    const alSubjects = await drpALSubjects();
    setAlSubjectsOptions(alSubjects.data.results[0]);
  };
  const loadDrpUniversitySubjects = async () => {
    const degreeOptions = await drpUniversitySubjects();
    setDegreeOptions(degreeOptions.data.results[0]);
  };
  const loadDrpOLSubjects = async () => {
    const olsubjectsOptions = await drpOLSubjects();
    setOlsubjectsOptions(olsubjectsOptions.data.results[0]);
  };
  const loadDrpInstitutions = async () => {
    const institutionsOptions = await drpInstitutions();
    setInstitutionsOptions(institutionsOptions.data.results[0]);
  };

  const loadDropdowns = () => {
    loadDrpOLSubjects();
    loadDrpALStreams();
    loadDrpALSubjects();
    loadDrpUniversitySubjects();
    loadDrpInstitutions();
  };

  const loadEducationYearsData = async () => {
    const result = await getEducationYears(id);
    const patientData = result.data;
    if (patientData.error) {
      setModal({
        isOpen: true,
        message: patientData.error.message,
        type: "error",
      });
    }
    if (patientData) {
      setEducation((prev) => ({
        ...prev,
        educationYears: patientData.educationYears || "",
      }));
      setMode("edit");
    } else {
      setIsLoading(false);
    }
  };

  const loadScholarshipData = async () => {
    const result = await getScholarship(id);
    const patientData = result.data;
    if (patientData.error) {
      setModal({
        isOpen: true,
        message: patientData.error.message,
        type: "error",
      });
    }
    if (patientData) {
      setEducation((prev) => ({
        ...prev,
        scholarship: patientData,
      }));
    }
  };

  const loadOLData = async () => {
    const result = await getOl(id);
    const patientData = result.data;
    if (patientData?.error) {
      setModal({
        isOpen: true,
        message: patientData.error.message,
        type: "error",
      });
    }
    if (patientData) {
      setEducation((prev) => ({ ...prev, ol: patientData }));
    }
  };

  const loadALData = async () => {
    const result = await getAl(id);
    const patientData = result.data;
    if (patientData?.error) {
      setModal({
        isOpen: true,
        message: patientData.error.message,
        type: "error",
      });
    }
    if (patientData) {
      setEducation((prev) => ({ ...prev, al: patientData }));
    }
  };

  const loadUniversityData = async () => {
    const result = await getUniversity(id);
    const patientData = result.data;
    if (patientData?.error) {
      setModal({
        isOpen: true,
        message: patientData.error.message,
        type: "error",
      });
    }
    if (patientData) {
      setEducation((prev) => ({ ...prev, university: patientData }));
    }
  };

  const loadInternationalCurriculumData = async () => {
    // Assuming API endpoints exist to fetch Edexcel and Cambridge status
    // For simplicity, we'll use a mock structure; replace with actual API calls
    const result = await getInternationalCurriculum(id)
  
    setEducation((prev) => ({
      ...prev,
      internationalCurriculum: {
        isEdexcel: result.data.isEdexcel,
        isCambridge: result.data.isCambridge,
      },
    }));
  };

  const loadAllEducationData = async () => {
    setIsLoading(true);
    await loadEducationYearsData();
    await loadScholarshipData();
    await loadOLData();
    await loadALData();
   // await loadUniversityData();
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
        patientId: id,
        educationYears: education.educationYears || 0,
        isScholarship: education.scholarship.enabled || false,
        scholarshipMarks: education.scholarship.marks || 0,
        schoolAdmitted: education.scholarship.schoolAdmitted || "",
        isScholarshipPassed: education.scholarship.result === "Pass" ? 1 : 0,
        scholarshipRemark: education.scholarship.remark || "",
        isOL: education.ol.enabled || false,
        olSubjects:
          education.ol.subjects.map((subject) => ({
            name: subject.name,
            marks: subject.marks,
            year: subject.year,
          })) || [],
        olRemark: education.ol.remark || "",
        isAL: education.al.enabled || false,
        alStreamName: education.al.alStreamName || "",
        alSubjects:
          education.al.subjects.map((subject) => ({
            name: subject.name,
            marks: subject.marks,
            year: subject.year,
          })) || [],
        alRemark: education.al.remark || "",
        isUniversity: education.university.enabled || false,
        universitySubjects:
          education.university.subjects.map((subject) => ({
            educationUniversityId:subject.educationUniversityId,
            name: subject.name,
            institution: subject.institutionName,
            marks: subject.marks,
            year: subject.year,
          })) || [],
        universityRemark: education.university.remark || "",
        isEdexcel: education.internationalCurriculum.isEdexcel || false,
        isCambridge: education.internationalCurriculum.isCambridge || false,
        isConfirm: true,
      };

      const res = await updateEducation(id, transformedPayload);

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

      if (section === "ol") {
        await loadDrpOLSubjects();
        await loadOLData();
      }
      if (section === "al") {
        await loadDrpALStreams();
        await loadDrpALSubjects();
        await loadALData();
      }
      // if (section === "university") {
      //   await loadDrpUniversitySubjects();
      //   await loadDrpInstitutions();
      //   await loadUniversityData();
      // }
      if (section === "internationalCurriculum") {
        await loadInternationalCurriculumData();
      }

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

  const validateEducationYears = (value) => {
    setEducationYearsErrors((prev) => {
      const newErrors = { ...prev };
      if (!value) {
        newErrors.educationYears = "Years of formal education is required.";
      } else {
        delete newErrors.educationYears;
      }
      return newErrors;
    });
    return !!value;
  };

  const validateScholarship = (field, value) => {
    if (!education.scholarship.enabled) {
      setScholarshipErrors({});
      return true;
    }
    setScholarshipErrors((prev) => {
      const newErrors = { ...prev };
      if (field === "marks" || field === undefined) {
        if (
          value === undefined ||
          value === null ||
          (typeof value === "string" && !value.trim()) ||
          (typeof value === "number" && !value.toString().trim())
        ) {
          newErrors.marks = "Marks are required.";
        } else {
          delete newErrors.marks;
        }
      }
      if (field === "schoolAdmitted" || field === undefined) {
        if (!value?.trim()) {
          newErrors.schoolAdmitted = "School admitted is required.";
        } else {
          delete newErrors.schoolAdmitted;
        }
      }
      if (field === "result" || field === undefined) {
        if (!value) {
          newErrors.result = "Result is required.";
        } else {
          delete newErrors.result;
        }
      }
      return newErrors;
    });
    return !!value;
  };

  const validateOLSubject = (index, field, value) => {
    if (!education.ol.enabled) {
      setOLErrors({});
      return true;
    }
    setOLErrors((prev) => {
      const newErrors = { ...prev };
      const subject = education.ol.subjects[index] || {};
      if (field === "name" || field === "year" || field === undefined) {
        const subjectName = field === "name" ? value : subject.name;
        const year = field === "year" ? value : subject.year || currentYear;
        const isDuplicate = education.ol.subjects.some(
          (sub, i) =>
            i !== index &&
            sub.name &&
            sub.name.toLowerCase() === (subjectName || "").toLowerCase() &&
            sub.year === year
        );
        if (isDuplicate) {
          newErrors[
            `subject_${index}_duplicate`
          ] = `Subject "${subjectName}" for year ${year} is already added.`;
        } else {
          delete newErrors[`subject_${index}_duplicate`];
        }
      }
      if (field === "name" || field === undefined) {
        if (!value?.trim()) {
          newErrors[`subject_${index}_name`] = "Subject is required.";
        } else {
          delete newErrors[`subject_${index}_name`];
        }
      }
      if (field === "marks" || field === undefined) {
        if (
          value === undefined ||
          value === null ||
          (typeof value === "string" && !value.trim()) ||
          (typeof value === "number" && !value.toString().trim())
        ) {
          newErrors[`subject_${index}_marks`] = "Grade is required.";
        } else {
          delete newErrors[`subject_${index}_marks`];
        }
      }
      return newErrors;
    });
    return !!value;
  };

  const validateALStream = (field, value) => {
    if (!education.al.enabled) {
      setALErrors({});
      return true;
    }
    setALErrors((prev) => {
      const newErrors = { ...prev };
      if (field === "stream" || field === undefined) {
        if (!value?.trim()) {
          newErrors.stream = "Stream is required.";
        } else {
          delete newErrors.stream;
        }
      }
      return newErrors;
    });
    return !!value;
  };

  const validateALSubject = (index, field, value) => {
    if (!education.al.enabled) {
      setALErrors({});
      return true;
    }
    setALErrors((prev) => {
      const newErrors = { ...prev };
      const subject = education.al.subjects[index] || {};
      if (field === "name" || field === "year" || field === undefined) {
        const subjectName = field === "name" ? value : subject.name;
        const year = field === "year" ? value : subject.year || currentYear;
        const isDuplicate = education.al.subjects.some(
          (sub, i) =>
            i !== index &&
            sub.name &&
            sub.name.toLowerCase() === (subjectName || "").toLowerCase() &&
            sub.year === year
        );
        if (isDuplicate) {
          newErrors[
            `subject_${index}_duplicate`
          ] = `Subject "${subjectName}" for year ${year} is already added.`;
        } else {
          delete newErrors[`subject_${index}_duplicate`];
        }
      }
      if (field === "name" || field === undefined) {
        if (!value?.trim()) {
          newErrors[`subject_${index}_name`] = "Subject is required.";
        } else {
          delete newErrors[`subject_${index}_name`];
        }
      }
      if (field === "marks" || field === undefined) {
        if (
          value === undefined ||
          value === null ||
          (typeof value === "string" && !value.trim()) ||
          (typeof value === "number" && !value.toString().trim())
        ) {
          newErrors[`subject_${index}_marks`] = "Grade is required.";
        } else {
          delete newErrors[`subject_${index}_marks`];
        }
      }
      return newErrors;
    });
    return !!value;
  };

  const validateUniversity = (index, field, value) => {
    if (!education.university.enabled) {
      setUniversityErrors({});
      return true;
    }
    setUniversityErrors((prev) => {
      const newErrors = { ...prev };
      const qualification = education.university.subjects[index] || {};
      if (field === "degree") {
        if (!value?.trim()) {
          newErrors[`qualification_${index}_name`] = "Degree is required.";
        } else {
          delete newErrors[`qualification_${index}_name`];
        }
      }
      // if (field === "institution") {
      //   if (!value?.trim()) {
      //     newErrors[`qualification_${index}_institution`] =
      //       "Institution is required.";
      //   } else {
      //     delete newErrors[`qualification_${index}_institution`];
      //   }
      // }
      // if (field === "marks") {
      //   if (
      //     value === undefined ||
      //     value === null ||
      //     (typeof value === "string" && !value.trim()) ||
      //     (typeof value === "number" && !value.toString().trim())
      //   ) {
      //     newErrors[`qualification_${index}_marks`] =
      //       "Marks/Grade is required.";
      //   } else {
      //     delete newErrors[`qualification_${index}_marks`];
      //   }
      // }
      return newErrors;
    });
    return !!value;
  };

  const validateInternationalCurriculum = () => {
    setInternationalCurriculumErrors({});
    return true; // No validation required for checkboxes
  };

  const _validateEducationYears = () => {
    return validateEducationYears(education.educationYears);
  };

  const _validateScholarship = () => {
    return (
      validateScholarship("marks", education.scholarship.marks) &&
      validateScholarship(
        "schoolAdmitted",
        education.scholarship.schoolAdmitted
      ) &&
      validateScholarship("result", education.scholarship.result)
    );
  };

  const _validateOLSubject = () => {
    const validations = [];
    if (education.ol.subjects.length === 0 && education.ol.enabled) {
      setOLSubjectListError("At least one subject is required.");
      return false;
    }
    setOLSubjectListError("");
    education.ol.subjects.forEach((s, index) => {
      validations.push(validateOLSubject(index, "name", s.name));
      validations.push(validateOLSubject(index, "marks", s.marks));
      validations.push(validateOLSubject(index, "year", s.year));
    });
    return validations.every((v) => v === true);
  };

  const _validateALSubject = () => {
    const validations = [];
    if (education.al.subjects.length === 0 && education.al.enabled) {
      setALSubjectListError("At least one subject is required.");
      return false;
    }
    setALSubjectListError("");
    //validations.push(validateEducationYears(education.educationYears));
    validations.push(validateALStream(undefined, education.al.alStreamName));
    education.al.subjects.forEach((s, index) => {
      validations.push(validateALSubject(index, "name", s.name));
      validations.push(validateALSubject(index, "marks", s.marks));
      validations.push(validateALSubject(index, "year", s.year));
    });
    return validations.every((v) => v === true);
  };

  const _validateUniversity = () => {
    const validations = [];
    if (
      education.university.subjects.length === 0 &&
      education.university.enabled
    ) {
      setUniversitySubjectListError("At least one subject is required.");
      return false;
    }
    setUniversitySubjectListError("");
    education.university.subjects.forEach((s, index) => {
      validations.push(validateUniversity(index, "degree", s.name));
      // validations.push(
      //   validateUniversity(index, "institution", s.institutionName)
      // );
      // validations.push(validateUniversity(index, "marks", s.marks));
    });
    return validations.every((v) => v === true);
  };

  const validateAllFields = () => {
    const isValid = [];
   // isValid.push(_validateEducationYears());
   // isValid.push(_validateScholarship());
    isValid.push(_validateOLSubject());
    isValid.push(_validateALSubject());
    isValid.push(_validateUniversity());
    isValid.push(validateInternationalCurriculum());
    return isValid;
  };

  const isFormValid = () => {
    return (
      Object.keys(educationYearsErrors).length === 0 &&
      Object.keys(scholarshipErrors).length === 0 &&
      Object.keys(olErrors).length === 0 &&
      Object.keys(alErrors).length === 0 &&
      Object.keys(universityErrors).length === 0 &&
      Object.keys(internationalCurriculumErrors).length === 0
    );
  };

  const canAddOLSubject = () => Object.keys(olErrors).length === 0;
  const canAddALSubject = () => Object.keys(alErrors).length === 0;
  const canAddUniversityQualification = () =>
    Object.keys(universityErrors).length === 0;

  const handleTextInputChange = (e) => {
    const { name, value } = e.target;
    try {
      if (name.includes("scholarship")) {
        const field = name.split(".")[2];
        setEducation((prev) => ({
          ...prev,
          scholarship: { ...prev.scholarship, [field]: value },
        }));
        if (field !== "remark") {
          validateScholarship(field, value);
        }
      } else if (name.includes("ol.subjects")) {
        const [, , , index, field] = name.split(".");
        const indexNum = parseInt(index);
        if (isNaN(indexNum)) {
          console.error("Invalid index for O/L subject:", index);
          return;
        }
        setEducation((prev) => {
          const updatedSubjects = [...prev.ol.subjects];
          updatedSubjects[indexNum] = {
            ...updatedSubjects[indexNum],
            [field]: field === "year" ? parseInt(value) || value : value,
          };
          return {
            ...prev,
            ol: { ...prev.ol, subjects: updatedSubjects },
          };
        });
        validateOLSubject(indexNum, field, value);
      } else if (name.includes("al.subjects")) {
        const [, , , index, field] = name.split(".");
        const indexNum = parseInt(index);
        if (isNaN(indexNum)) {
          console.error("Invalid index for A/L subject:", index);
          return;
        }
        setEducation((prev) => {
          const updatedSubjects = [...prev.al.subjects];
          updatedSubjects[indexNum] = {
            ...updatedSubjects[indexNum],
            [field]: field === "year" ? parseInt(value) || value : value,
          };
          return {
            ...prev,
            al: { ...prev.al, subjects: updatedSubjects },
          };
        });
        validateALSubject(indexNum, field, value);
      } else if (name.includes("university.subjects")) {
        const splitName = name.split(".");
        if (splitName.length !== 5) {
          console.error("Malformed university input name:", name);
          return;
        }
        const [, , , index, field] = splitName;
        const indexNum = parseInt(index);
        if (isNaN(indexNum)) {
          console.error("Invalid index for university subject:", index);
          return;
        }
        setEducation((prev) => {
          const updatedSubjects = [...prev.university.subjects];
          updatedSubjects[indexNum] = {
            ...updatedSubjects[indexNum],
            [field]: value,
          };
          return {
            ...prev,
            university: { ...prev.university, subjects: updatedSubjects },
          };
        });
        validateUniversity(indexNum, field, value);
      } else if (name === "ol.remark") {
        setEducation((prev) => ({
          ...prev,
          ol: { ...prev.ol, remark: value },
        }));
      } else if (name === "al.remark") {
        setEducation((prev) => ({
          ...prev,
          al: { ...prev.al, remark: value },
        }));
      } else if (name === "university.remark") {
        setEducation((prev) => ({
          ...prev,
          university: { ...prev.university, remark: value },
        }));
      } else {
        console.warn("Unhandled input name:", name);
      }
    } catch (error) {
      console.error(`Error in handleTextInputChange for name=${name}:`, error);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    try {
      if (name.includes("internationalCurriculum.isEdexcel")) {
        setEducation((prev) => ({
          ...prev,
          internationalCurriculum: { ...prev.internationalCurriculum, isEdexcel: checked },
        }));
      } else if (name.includes("internationalCurriculum.isCambridge")) {
        setEducation((prev) => ({
          ...prev,
          internationalCurriculum: { ...prev.internationalCurriculum, isCambridge: checked },
        }));
      } else if (name.includes("scholarship.enabled")) {
        setEducation((prev) => ({
          ...prev,
          scholarship: { ...prev.scholarship, enabled: checked },
        }));
        if (checked) {
          validateScholarship("marks", education.scholarship.marks);
          validateScholarship(
            "schoolAdmitted",
            education.scholarship.schoolAdmitted
          );
          validateScholarship("result", education.scholarship.result);
        }
      } else if (name.includes("ol.enabled")) {
        setEducation((prev) => ({
          ...prev,
          ol: { ...prev.ol, enabled: checked },
        }));
        if (checked) {
          education.ol.subjects.forEach((s, index) => {
            validateOLSubject(index, "name", s.name);
            validateOLSubject(index, "marks", s.marks);
            validateOLSubject(index, "year", s.year);
          });
        }
      } else if (name.includes("al.enabled")) {
        setEducation((prev) => ({
          ...prev,
          al: { ...prev.al, enabled: checked },
        }));
        if (checked) {
          validateALStream("stream", education.al.streamName);
          education.al.subjects.forEach((s, index) => {
            validateALSubject(index, "name", s.name);
            validateALSubject(index, "marks", s.marks);
            validateALSubject(index, "year", s.year);
          });
        }
      } else if (name.includes("university.enabled")) {
        setEducation((prev) => ({
          ...prev,
          university: { ...prev.university, enabled: checked },
        }));
        if (checked) {
          education.university.subjects.forEach((s, index) => {
            validateUniversity(index, "name", s.name);
            validateUniversity(index, "institution", s.institutionName);
            validateUniversity(index, "marks", s.marks);
          });
        }
      }
    } catch (error) {
      console.error(`Error in handleCheckboxChange for name=${name}:`, error);
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === "educationYears") {
      setEducation((prev) => ({
        ...prev,
        educationYears: value,
      }));
      //validateEducationYears(value);
    }
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("scholarship.result")) {
      setEducation((prev) => ({
        ...prev,
        scholarship: { ...prev.scholarship, result: value },
      }));
      validateScholarship("result", value);
    }
  };

  const handleSubjectChange = async (level, index, selectedOption, field) => {
    const value = selectedOption ? selectedOption.value : "";
    setEducation((prev) => {
      if (level === "ol") {
        const updatedSubjects = [...prev.ol.subjects];
        updatedSubjects[index] = {
          ...updatedSubjects[index],
          value: value,
          name: selectedOption.name,
        };
        return { ...prev, ol: { ...prev.ol, subjects: updatedSubjects } };
      } else if (level === "al") {
        const updatedSubjects = [...prev.al.subjects];
        updatedSubjects[index] = {
          ...updatedSubjects[index],
          value: value,
          name: selectedOption.name,
        };
        return { ...prev, al: { ...prev.al, subjects: updatedSubjects } };
      } else if (level === "stream") {
        return {
          ...prev,
          al: {
            ...prev.al,
            alStreamId: value,
            alStreamName: selectedOption.name,
          },
        };
      } else if (level === "university") {
        const updatedSubjects = [...prev.university.subjects];
        if (field === "institution")
          updatedSubjects[index] = {
            ...updatedSubjects[index],
            institutionId: value,
            institutionName: selectedOption.name,
          };
        else
          updatedSubjects[index] = {
            ...updatedSubjects[index],
            value: value,
            name: selectedOption.name,
          };
        return {
          ...prev,
          university: { ...prev.university, subjects: updatedSubjects },
        };
      }
      return prev;
    });

    if (level === "ol") {
      validateOLSubject(index, "name", value);
    } else if (level === "al") {
      validateALSubject(index, "name", value);
    } else if (level === "stream") {
      validateALStream("stream", value);
    } else if (level === "university") {
      validateUniversity(index, "degree", value);
      validateUniversity(index, "institution", value);
      validateUniversity(index, "marks", value);
    }
  };

  const addCustomSubject = (level) => {
    const newSubject = { value: "", marks: "", year: 1900, isNew: true };
    setEducation((prev) => {
      if (level === "ol") {
        const newSubjects = [...prev.ol.subjects, newSubject];
        validateOLSubject(newSubjects.length - 1, undefined, "");
        return { ...prev, ol: { ...prev.ol, subjects: newSubjects } };
      } else if (level === "al") {
        const newSubjects = [...prev.al.subjects, newSubject];
        validateALStream("stream", education.al.alStreamName);
        validateALSubject(newSubjects.length - 1, undefined, "");
        return { ...prev, al: { ...prev.al, subjects: newSubjects } };
      }
      return prev;
    });
  };

  const addUniversityQualification = () => {
    const newQualification = {
      value: "",
      institution: "",
      institutionName: "",
      institutionId: "",
      marks: "",
      year: "",
      isNew: true,
    };
    setEducation((prev) => {
      const newSubjects = [...prev.university.subjects, newQualification];
      validateUniversity(newSubjects.length - 1, undefined, "");
      return {
        ...prev,
        university: { ...prev.university, subjects: newSubjects },
      };
    });
  };

  const removeItem = (type, index) => {
    setEducation((prev) => {
      if (type === "ol") {
        const updatedSubjects = [...prev.ol.subjects];
        updatedSubjects.splice(index, 1);
        setOLErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          Object.keys(newErrors).forEach((key) => {
            if (key.startsWith(`subject_${index}_`)) delete newErrors[key];
          });
          return newErrors;
        });
        return { ...prev, ol: { ...prev.ol, subjects: updatedSubjects } };
      } else if (type === "al") {
        const updatedSubjects = [...prev.al.subjects];
        updatedSubjects.splice(index, 1);
        setALErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          Object.keys(newErrors).forEach((key) => {
            if (key.startsWith(`subject_${index}_`)) delete newErrors[key];
          });
          return newErrors;
        });
        return { ...prev, al: { ...prev.al, subjects: updatedSubjects } };
      } else if (type === "university") {
        const updatedSubjects = [...prev.university.subjects];
        updatedSubjects.splice(index, 1);
        setUniversityErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          Object.keys(newErrors).forEach((key) => {
            if (key.startsWith(`qualification_${index}_`))
              delete newErrors[key];
          });
          return newErrors;
        });
        return {
          ...prev,
          university: { ...prev.university, subjects: updatedSubjects },
        };
      }
      return prev;
    });
  };

  const handleSave = async () => {
    const validations = validateAllFields();
    const isAllValidated = validations.every((v) => v !== false);
    if (isAllValidated && isFormValid()) {
      const transformedPayload = {
        patientId: id,
        educationYears: education.educationYears || 0,
        isScholarship: education.scholarship.enabled || false,
        scholarshipMarks: education.scholarship.marks || 0,
        schoolAdmitted: education.scholarship.schoolAdmitted || "",
        isScholarshipPassed: education.scholarship.result === "Pass" ? 1 : 0,
        scholarshipRemark: education.scholarship.remark || "",
        isOL: education.ol.enabled || false,
        olSubjects:
          education.ol.subjects.map((subject) => ({
            name: subject.name,
            marks: subject.marks,
            year: subject.year,
          })) || [],
        olRemark: education.ol.remark || "",
        isAL: education.al.enabled || false,
        alStreamName: education.al.alStreamName || "",
        alSubjects:
          education.al.subjects.map((subject) => ({
            name: subject.name,
            marks: subject.marks,
            year: subject.year,
          })) || [],
        alRemark: education.al.remark || "",
        isUniversity: education.university.enabled || false,
        universitySubjects:
          education.university.subjects.map((subject) => ({
               educationUniversityId:subject.educationUniversityId,
            name: subject.name,
            institution: subject.institutionName,
            marks: subject.marks,
            year: subject.year,
          })) || [],
        universityRemark: education.university.remark || "",
        isEdexcel: education.internationalCurriculum.isEdexcel || false,
        isCambridge: education.internationalCurriculum.isCambridge || false,
        isConfirm: true,
      };

      const res = await addEducation(transformedPayload);

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
        <div className="px-8">
          {/* Educational Background */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-2 pb-2">
              <h3 className="text-xl font-semibold text-gray-800">
                Educational Background
              </h3>
              {mode !== "add" && (
                <div className="flex space-x-4">
                  <EditButton
                    onClick={() => toggleSectionEdit("educationYears")}
                    ariaLabel={
                      editingSection === "educationYears"
                        ? "Save Educational Background"
                        : "Edit Educational Background"
                    }
                    disabled={isSaving}
                  >
                    {editingSection === "educationYears"
                      ? isSaving
                        ? "Saving..."
                        : "Save"
                      : "Edit"}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Years of Formal Education Completed
                    {<span className="text-red-500">*</span>}
                  </label>
                  <select
                    name="educationYears"
                    value={education.educationYears || ""}
                    onChange={handleSelectChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    disabled={
                      editingSection !== "educationYears" && mode !== "add"
                    }
                    aria-label="Years of formal education"
                  >
                    <option value="">Select years</option>
                    {[...Array(21)].map((_, i) => (
                      <option key={i} value={i}>
                        {i === 20 ? "More than 20" : i}
                      </option>
                    ))}
                  </select>
                  {educationYearsErrors.educationYears && (
                    <p className="mt-1 text-sm text-red-600">
                      {educationYearsErrors.educationYears}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <strong>Years of Formal Education:</strong>{" "}
                  {education.educationYears || education.educationYears === 0
                    ? education.educationYears === 20
                      ? "More than 20"
                      : education.educationYears
                    : "N/A"}
                </div>
              </div>
            )}
          </section>

          {/* Grade 5 Scholarship Qualification */}
          <section className="mb-10 mt-10">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="scholarship.enabled"
                    checked={education.scholarship.enabled}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                    disabled={
                      editingSection !== "scholarship" && mode !== "add"
                    }
                    aria-label="Has Grade 5 Scholarship Qualification"
                  />
                  <span className="ml-2 text-sm text-gray-700"></span>
                </label>
                <h3 className="text-xl font-semibold text-gray-800">
                  Grade 5 Scholarship Qualification
                </h3>
              </div>
              {mode !== "add" && (
                <div className="flex space-x-4">
                  <EditButton
                    onClick={() => toggleSectionEdit("scholarship")}
                    ariaLabel={
                      editingSection === "scholarship"
                        ? "Save Grade 5 Scholarship Qualification"
                        : "Edit Grade 5 Scholarship Qualification"
                    }
                    disabled={isSaving}
                  >
                    {editingSection === "scholarship"
                      ? isSaving
                        ? "Saving..."
                        : "Save"
                      : "Edit"}
                  </EditButton>
                  {editingSection === "scholarship" && (
                    <button
                      onClick={() => handleCancel("scholarship")}
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
            {editingSection === "scholarship" || mode === "add" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Marks{<span className="text-red-500">*</span>}
                    </label>
                    <input
                      name="education.scholarship.marks"
                      value={education.scholarship.marks || ""}
                      onChange={handleTextInputChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter marks (e.g., 180)"
                      disabled={education.scholarship.enabled === false}
                      aria-label="Scholarship Marks"
                    />
                    {scholarshipErrors.marks && (
                      <p className="mt-1 text-sm text-red-600">
                        {scholarshipErrors.marks}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      School Admitted{<span className="text-red-500">*</span>}
                    </label>
                    <input
                      name="education.scholarship.schoolAdmitted"
                      value={education.scholarship.schoolAdmitted || ""}
                      onChange={handleTextInputChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter school name"
                      disabled={education.scholarship.enabled === false}
                      aria-label="School Admitted"
                    />
                    {scholarshipErrors.schoolAdmitted && (
                      <p className="mt-1 text-sm text-red-600">
                        {scholarshipErrors.schoolAdmitted}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Result{<span className="text-red-500">*</span>}
                    </label>
                    <div className="mt-1 flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="education.scholarship.result"
                          value="Pass"
                          checked={education.scholarship.result === "Pass"}
                          onChange={handleRadioChange}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                          disabled={education.scholarship.enabled === false}
                          aria-label="Scholarship Result Pass"
                        />
                        <span className="ml-2 text-sm text-gray-700">Pass</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="education.scholarship.result"
                          value="Fail"
                          checked={education.scholarship.result === "Fail"}
                          onChange={handleRadioChange}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                          disabled={education.scholarship.enabled === false}
                          aria-label="Scholarship Result Fail"
                        />
                        <span className="ml-2 text-sm text-gray-700">Fail</span>
                      </label>
                    </div>
                    {scholarshipErrors.result && (
                      <p className="mt-1 text-sm text-red-600">
                        {scholarshipErrors.result}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Remark
                  </label>
                  <VoiceToText
                    name="education.scholarship.remark"
                    value={education.scholarship.remark || ""}
                    onChange={handleTextInputChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter any additional remarks"
                    disabled={education.scholarship.enabled === false}
                    aria-label="Scholarship Remark"
                    rows="4"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <strong>Has Grade 5 Scholarship Qualification:</strong>{" "}
                  {education.scholarship.enabled !== false ? "Yes" : "No"}
                </div>
                {education.scholarship.enabled !== false && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <strong>Marks:</strong>{" "}
                      {education.scholarship.marks || "N/A"}
                    </div>
                    <div>
                      <strong>School Admitted:</strong>{" "}
                      {education.scholarship.schoolAdmitted || "N/A"}
                    </div>
                    <div>
                      <strong>Result:</strong>{" "}
                      {education.scholarship.result || "N/A"}
                    </div>
                    <div className="col-span-3">
                     {education.scholarship.remark ? <div className="">
                        <strong>Remark:</strong>{" "}
                        <div className="bg-white border border-gray-200 rounded-lg p-4 mt-1 whitespace-pre-line">
                          {education.scholarship.remark}
                        </div>
                      </div> :''}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* G.C.E Ordinary Level (O/L) Qualifications */}
          <section className="mb-10 mt-10">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="ol.enabled"
                    checked={education.ol.enabled}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                    disabled={editingSection !== "ol" && mode !== "add"}
                    aria-label="Has G.C.E O/L Qualifications"
                  />
                  <span className="ml-2 text-sm text-gray-700"></span>
                </label>
                <h3 className="text-xl font-semibold text-gray-800">
                  G.C.E Ordinary Level (O/L) Qualifications
                </h3>
              </div>
              {mode !== "add" && (
                <div className="flex space-x-4">
                  <EditButton
                    onClick={() => toggleSectionEdit("ol")}
                    ariaLabel={
                      editingSection === "ol"
                        ? "Save O/L Qualifications"
                        : "Edit O/L Qualifications"
                    }
                    disabled={isSaving}
                  >
                    {editingSection === "ol"
                      ? isSaving
                        ? "Saving..."
                        : "Save"
                      : "Edit"}
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
              <div className="space-y-4">
                {olSubjectListError && (
                  <p className="mt-1 text-sm text-white w-full bg-red-600 p-3 rounded-lg">
                    {olSubjectListError}
                  </p>
                )}
                {education.ol.subjects.map((subject, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-1/3">
                      <label className="block text-sm font-medium text-gray-700">
                        Subject{<span className="text-red-500">*</span>}
                      </label>
                      <TypeableDropdown
                        options={olsubjectsOptions}
                        value={{ value: subject.value, name: subject.name }}
                        onChange={(option) =>
                          handleSubjectChange("ol", index, option)
                        }
                        placeholder="Select or type subject"
                        isDisabled={!subject.isNew === true}
                        className="mt-1"
                        classNamePrefix="select"
                        aria-label={`O/L Subject ${index + 1}`}
                      />
                      {(olErrors[`subject_${index}_name`] ||
                        olErrors[`subject_${index}_duplicate`]) && (
                        <p className="mt-1 text-sm text-red-600">
                          {olErrors[`subject_${index}_name`] ||
                            olErrors[`subject_${index}_duplicate`]}
                        </p>
                      )}
                    </div>
                    {/* <div className="w-1/4">
                      <label className="block text-sm font-medium text-gray-700">
                        Year{<span className="text-red-500">*</span>}
                      </label>
                      <select
                        name={`education.ol.subjects.${index}.year`}
                        value={subject.year || currentYear}
                        onChange={handleTextInputChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        disabled={!subject.isNew === true}
                        aria-label={`O/L Subject ${index + 1} year`}
                      >
                        {yearOptions.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div> */}
                    <div className="w-1/4">
                      <label className="block text-sm font-medium text-gray-700">
                        Grade{<span className="text-red-500">*</span>}
                      </label>
                      <input
                        name={`education.ol.subjects.${index}.marks`}
                        value={subject.marks || ""}
                        onChange={handleTextInputChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Grade (e.g., A, B, C, S, W)"
                        aria-label={`O/L Subject ${index + 1} marks`}
                        required
                      />
                      {olErrors[`subject_${index}_marks`] && (
                        <p className="mt-1 text-sm text-red-600">
                          {olErrors[`subject_${index}_marks`]}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem("ol", index)}
                      className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-all duration-200 mt-5"
                      disabled={education.ol.enabled === false}
                      aria-label="Remove O/L Subject"
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
                  onClick={() => addCustomSubject("ol")}
                  className="mt-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-all duration-200"
                  disabled={
                    education.ol.enabled === false || !canAddOLSubject()
                  }
                  aria-label="Add O/L Subject"
                >
                  Add O/L Subject
                </button>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Remark
                  </label>
                  <VoiceToText
                    name="ol.remark"
                    value={education.ol.remark || ""}
                    onChange={handleTextInputChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter any additional remarks"
                    disabled={education.ol.enabled === false}
                    aria-label="O/L Remark"
                    rows="4"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                
                {!education.ol.enabled ? 
                 <div className="flex items-center space-x-2 text-gray-500 font-semibold">
                                        <FaInfoCircle className="text-xl" /><span>No O/L qualifications</span>
                                      </div>:null
                                      }
                                      
                {education.ol.enabled &&
                education.ol.subjects.length > 0 ? (
                  <div>
                    <strong>Subjects:</strong>
                    <table className="w-full border-collapse border bg-white mt-2 border-gray-200">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border border-gray-300 p-2 text-left text-sm font-bold text-gray-700">
                            Subject
                          </th>
                          {/* <th className="border border-gray-300 p-2 text-left text-sm font-bold text-gray-700">
                            Year
                          </th> */}
                          <th className="border border-gray-300 p-2 text-left text-sm font-bold text-gray-700">
                            Grade
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {education.ol.subjects.map((subject, index) => (
                          <tr key={index}>
                            <td className="border border-gray-300 p-2">
                              {subject.name || "N/A"}
                            </td>
                            {/* <td className="border border-gray-300 p-2">
                              {subject.year || "N/A"}
                            </td> */}
                            <td className="border border-gray-300 p-2">
                              {subject.marks || "N/A"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-5">
                     
                        {education.ol.remark ?    <div className="">
                            <strong>Remark:</strong>{" "}
                            <div className="bg-white border border-gray-200 rounded-lg p-4 mt-1 whitespace-pre-line">
                              {education.ol.remark}
                            </div>
                          </div>:''}
                    </div>
                  </div>
                ) :  null}
              </div>
            )}
          </section>

          {/* International Curriculum */}
          <section className="mb-10 mt-10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-800">
                International Curriculum
              </h3>
              {mode !== "add" && (
                <div className="flex space-x-4">
                  <EditButton
                    onClick={() => toggleSectionEdit("internationalCurriculum")}
                    ariaLabel={
                      editingSection === "internationalCurriculum"
                        ? "Save International Curriculum"
                        : "Edit International Curriculum"
                    }
                    disabled={isSaving}
                  >
                    {editingSection === "internationalCurriculum"
                      ? isSaving
                        ? "Saving..."
                        : "Save"
                      : "Edit"}
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
              <div className="space-y-4 mt-5">
                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="internationalCurriculum.isEdexcel"
                      checked={education.internationalCurriculum.isEdexcel}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                      aria-label="Followed Edexcel Curriculum"
                    />
                    <span className="ml-2 text-sm text-gray-700">Edexcel</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="internationalCurriculum.isCambridge"
                      checked={education.internationalCurriculum.isCambridge}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                      aria-label="Followed Cambridge Curriculum"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Cambridge
                    </span>
                  </label>
                </div>
              </div>
            ) : (
              <div className="flex gap-4 mt-2">
                {/* Edexcel Logo */}
                {education.internationalCurriculum.isEdexcel ? (
                  <div className="flex items-center justify-start border border-gray-300 p-1 rounded-lg">
                   <div  className="flex items-center p-2">
                                           <FaGraduationCap className="text-sky-600 mr-2" />
                                           <span>Edexcel</span>
                                         </div>
                  </div>
                ) : null}

                {/* Cambridge Logo */}
                {education.internationalCurriculum.isCambridge ? (
                  <div className="flex items-center justify-start border border-gray-300 p-1 rounded-lg">

                     <div  className="flex items-center p-2">
                                           <FaGraduationCap className="text-sky-600 mr-2" />
                                           <span>Cambridge</span>
                                         </div>
                  
                  </div>
                ) : null}

                {!education.internationalCurriculum.isEdexcel &&
                  !education.internationalCurriculum.isCambridge && (
                    <div className="p4">No International Curriculums.</div>
                  )}
              </div>
            )}
          </section>
          
          {/* G.C.E Advanced Level (A/L) Qualifications */}
          <section className="mb-10 mt-10">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="al.enabled"
                    checked={education.al.enabled}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                    disabled={editingSection !== "al" && mode !== "add"}
                    aria-label="Has G.C.E A/L Qualifications"
                  />
                  <span className="ml-2 text-sm text-gray-700"></span>
                </label>
                <h3 className="text-xl font-semibold text-gray-800">
                  G.C.E Advanced Level (A/L) Qualifications
                </h3>
              </div>
              {mode !== "add" && (
                <div className="flex space-x-4">
                  <EditButton
                    onClick={() => toggleSectionEdit("al")}
                    ariaLabel={
                      editingSection === "al"
                        ? "Save A/L Qualifications"
                        : "Edit A/L Qualifications"
                    }
                    disabled={isSaving}
                  >
                    {editingSection === "al"
                      ? isSaving
                        ? "Saving..."
                        : "Save"
                      : "Edit"}
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
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Stream{<span className="text-red-500">*</span>}
                  </label>
                  <TypeableDropdown
                    options={alStremsOptions}
                    value={{
                      value: education.al.alStreamId,
                      name: education.al.alStreamName,
                    }}
                    onChange={(option) =>
                      handleSubjectChange("stream", null, option)
                    }
                    placeholder="Select or type stream"
                    isDisabled={education.al.enabled === false}
                    className="mt-1"
                    classNamePrefix="select"
                    aria-label="A/L Stream"
                  />
                  {alErrors.stream && (
                    <p className="mt-1 text-sm text-red-600">
                      {alErrors.stream}
                    </p>
                  )}
                </div>
                {alSubjectListError && (
                  <p className="mt-1 text-sm text-white w-full bg-red-600 p-3 rounded-lg">
                    {alSubjectListError}
                  </p>
                )}
                {education.al.subjects.map((subject, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-1/3">
                      <label className="block text-sm font-medium text-gray-700">
                        Subject{<span className="text-red-500">*</span>}
                      </label>
                      <TypeableDropdown
                        options={alSubjectsOptions}
                        value={{ value: subject.value, name: subject.name }}
                        onChange={(option) =>
                          handleSubjectChange("al", index, option, "subject")
                        }
                        placeholder="Select or type subject"
                        isDisabled={!subject.isNew === true}
                        className="mt-1"
                        classNamePrefix="select"
                        aria-label={`A/L Subject ${index + 1}`}
                      />
                      {(alErrors[`subject_${index}_name`] ||
                        alErrors[`subject_${index}_duplicate`]) && (
                        <p className="mt-1 text-sm text-red-600">
                          {alErrors[`subject_${index}_name`] ||
                            alErrors[`subject_${index}_duplicate`]}
                        </p>
                      )}
                    </div>
                    {/* <div className="w-1/4">
                      <label className="block text-sm font-medium text-gray-700">
                        Year{<span className="text-red-500">*</span>}
                      </label>
                      <select
                        name={`education.al.subjects.${index}.year`}
                        value={subject.year || currentYear}
                        onChange={handleTextInputChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        disabled={!subject.isNew === true}
                        aria-label={`A/L Subject ${index + 1} year`}
                      >
                        {yearOptions.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div> */}
                    <div className="w-1/4">
                      <label className="block text-sm font-medium text-gray-700">
                        Grade{<span className="text-red-500">*</span>}
                      </label>
                      <input
                        name={`education.al.subjects.${index}.marks`}
                        value={subject.marks || ""}
                        onChange={handleTextInputChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Grade (e.g., A, B, C, S, W)"
                        aria-label={`A/L Subject ${index + 1} marks`}
                        required
                      />
                      {alErrors[`subject_${index}_marks`] && (
                        <p className="mt-1 text-sm text-red-600">
                          {alErrors[`subject_${index}_marks`]}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem("al", index)}
                      className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-all duration-200 mt-5"
                      disabled={education.al.enabled === false}
                      aria-label="Remove A/L Subject"
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
                  onClick={() => addCustomSubject("al")}
                  className="mt-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-all duration-200"
                  disabled={
                    education.al.enabled === false || !canAddALSubject()
                  }
                  aria-label="Add A/L Subject"
                >
                  Add A/L Subject
                </button>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Remark
                  </label>
                  <VoiceToText
                    name="al.remark"
                    value={education.al.remark || ""}
                    onChange={handleTextInputChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter any additional remarks"
                    disabled={education.al.enabled === false}
                    aria-label="A/L Remark"
                    rows="4"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
               
               
                {! education.al.enabled ? <div className="flex items-center space-x-2 text-gray-500 font-semibold">
                                       <FaInfoCircle className="text-xl" /><span>No A/L qualifications</span>
                                     </div> :null}

                {education.al.enabled ? (
                  <>
                    <div>
                      <strong>Stream:</strong>{" "}
                      {education.al.alStreamName || "N/A"}
                    </div>
                    {education.al.subjects.length > 0 ? (
                      <div>
                        <strong>Subjects:</strong>
                        <table className="w-full border-collapse border bg-white mt-2 border-gray-200">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border border-gray-300 p-2 text-left text-sm font-bold text-gray-700">
                                Subject
                              </th>
                              {/* <th className="border border-gray-300 p-2 text-left text-sm font-bold text-gray-700">
                                Year
                              </th> */}
                              <th className="border border-gray-300 p-2 text-left text-sm font-bold text-gray-700">
                                Grade
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {education.al.subjects.map((subject, index) => (
                              <tr key={index}>
                                <td className="border border-gray-300 p-2">
                                  {subject.name || "N/A"}
                                </td>
                                {/* <td className="border border-gray-300 p-2">
                                  {subject.year || "N/A"}
                                </td> */}
                                <td className="border border-gray-300 p-2">
                                  {subject.marks || "N/A"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="mt-5">
                       {education.al.remark ?    <div className="">
                            <strong>Remark:</strong>{" "}
                            <div className="bg-white border border-gray-200 rounded-lg p-4 mt-1 whitespace-pre-line">
                              {education.al.remark}
                            </div>
                          </div>:''}
                        </div>
                      </div>
                    ) : (
                      null
                    )}
                  </>
                ):null}
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
            <div className="print-only">
    <PrintEducationDetailsA4 education={education} printPreviewMode={true} />
  </div>


      ) : (
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
};

export default TabEducationDetailsChild;