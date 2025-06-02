import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { medicalInformationData } from "../data/mockData";


const MedicalTab = ({ id, setActiveTab }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("add");
  const [editingSection, setEditingSection] = useState(null);
  const [medicalInformationErrors, setMedicalInformationErrors] = useState({});
  const [medicalInformation, setMedicalInformation] = useState({
    physicalAilments: {
      label: "Physical Ailments",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "string",
    },
    mainComplaints: {
      label: "Main Complaints",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "string",
    },
    pastComplaints: {
      label: "Past Complaints",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
    worseConditions: {
      label: "Worse Conditions",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
    improvedConditions: {
      label: "Improved Conditions",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
    individualTherapyHours: {
      label: "Individual Therapy Hours",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "number",
    },
    individualTherapyYears: {
      label: "Individual Therapy Years",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "number",
    },
    individualTherapyEndYears: {
      label: "Individual Therapy End Years",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "number",
    },
    groupTherapyHours: {
      label: "Group Therapy Hours",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "number",
    },
    psychiatricHospitalizationMonths: {
      label: "Psychiatric Hospitalization Months",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "number",
    },
    currentTreatment: {
      label: "Current Treatment",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "string",
    },
    antidepressantsCount: {
      label: "Antidepressants Count",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "number",
    },
    psychotherapyType: {
      label: "Psychotherapy Type",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
    additionalInfo: {
      label: "Additional Information",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
  });

  // Load mock data based on id
  useEffect(() => {
    if (id) {
      const patientData = medicalInformationData.find((p) => p.id === id);
      console.log("patientData", patientData?.patientId);
      if (patientData) {
        setMedicalInformation({
          physicalAilments: {
            ...medicalInformation.physicalAilments,
            value: patientData.physicalAilments || "",
            isTouched: true,
            isValid: true,
          },
          mainComplaints: {
            ...medicalInformation.mainComplaints,
            value: patientData.mainComplaints || "",
            isTouched: true,
            isValid: true,
          },
          pastComplaints: {
            ...medicalInformation.pastComplaints,
            value: patientData.pastComplaints || "",
            isTouched: true,
            isValid: true,
          },
          worseConditions: {
            ...medicalInformation.worseConditions,
            value: patientData.worseConditions || "",
            isTouched: true,
            isValid: true,
          },
          improvedConditions: {
            ...medicalInformation.improvedConditions,
            value: patientData.improvedConditions || "",
            isTouched: true,
            isValid: true,
          },
          individualTherapyHours: {
            ...medicalInformation.individualTherapyHours,
            value: patientData.individualTherapyHours || "",
            isTouched: true,
            isValid: true,
          },
          individualTherapyYears: {
            ...medicalInformation.individualTherapyYears,
            value: patientData.individualTherapyYears || "",
            isTouched: true,
            isValid: true,
          },
          individualTherapyEndYears: {
            ...medicalInformation.individualTherapyEndYears,
            value: patientData.individualTherapyEndYears || "",
            isTouched: true,
            isValid: true,
          },
          groupTherapyHours: {
            ...medicalInformation.groupTherapyHours,
            value: patientData.groupTherapyHours || "",
            isTouched: true,
            isValid: true,
          },
          psychiatricHospitalizationMonths: {
            ...medicalInformation.psychiatricHospitalizationMonths,
            value: patientData.psychiatricHospitalizationMonths || "",
            isTouched: true,
            isValid: true,
          },
          currentTreatment: {
            ...medicalInformation.currentTreatment,
            value: patientData.currentTreatment || "",
            isTouched: true,
            isValid: true,
          },
          antidepressantsCount: {
            ...medicalInformation.antidepressantsCount,
            value: patientData.antidepressantsCount || "",
            isTouched: true,
            isValid: true,
          },
          psychotherapyType: {
            ...medicalInformation.psychotherapyType,
            value: patientData.psychotherapyType || "",
            isTouched: true,
            isValid: true,
          },
          additionalInfo: {
            ...medicalInformation.additionalInfo,
            value: patientData.additionalInfo || "",
            isTouched: true,
            isValid: true,
          },
        });
        setMode("edit");
      }
    }
  }, [id]);

  // Validate individual field
  const validateField = (name, value, required, dataType) => {
    if (required && (!value || value.toString().trim() === "")) {
      return `${name} is required`;
    }

    if (value && dataType === "number") {
      if (isNaN(value) || Number(value) < 0) {
        return `${name} must be a valid non-negative number`;
      }
    }

    return "";
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const { required, dataType } = medicalInformation[name];
    const error = validateField(medicalInformation[name].label, value, required, dataType);

    setMedicalInformation((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        isTouched: true,
        isValid: error === "",
      },
    }));

    setMedicalInformationErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Validate entire form
  const validateMedicalInformation = () => {
    const errors = {};
    let isFormValid = true;
    const updatedInfo = { ...medicalInformation };

    Object.entries(medicalInformation).forEach(([key, field]) => {
      if (!field || typeof field !== "object" || !("value" in field)) return;

      const { value, dataType, required } = field;
      const errorMessage = validateField(field.label, value, required, dataType);

      if (errorMessage) {
        isFormValid = false;
        errors[key] = errorMessage;
        updatedInfo[key].isValid = false;
      } else {
        updatedInfo[key].isValid = true;
      }

      updatedInfo[key].isTouched = true;
    });

    setMedicalInformation(updatedInfo);
    setMedicalInformationErrors(errors);
    return isFormValid;
  };

  // Generate payload for submission
  const generateSubmitPayload = (infoObject) => {
    const payload = {};
    for (const key in infoObject) {
      if (infoObject.hasOwnProperty(key)) {
        payload[key] = infoObject[key].value;
      }
    }
    return payload;
  };

  // Handle form submission
  const handleSubmitMedicalInformation = async (e) => {
    e.preventDefault();
    const isValid = validateMedicalInformation();
    if (isValid) {
      const submitPayload = generateSubmitPayload(medicalInformation);
      console.log("Medical Information Payload:", submitPayload);
      setMode("edit");
      setActiveTab("education"); // Navigate to the next tab
    }
  };

  // Modified handleSubmit to handle section-specific saving
  const handleSubmitp = async (section) => {
    const isValid = validateMedicalInformation();
    if (isValid) {
      const savedPatientId = mode === "add" ? Date.now().toString() : id;
      console.log(`Saving ${section} section:`, generateSubmitPayload(medicalInformation));
      if (mode === "add") {
        navigate(`/patients/${savedPatientId}`);
      }
    }
  };

  // Function to toggle edit mode for a specific section
  const toggleSectionEdit = (section) => {
    if (editingSection === section) {
      handleSubmitp(section);
      setEditingSection(null);
    } else {
      setEditingSection(section);
    }
  };

  // Helper function to render list items (for consistency with PersonalInformation)
  const renderListItems = (value) => {
    if (!value) return <p className="text-gray-500 italic">N/A</p>;

    if (typeof value === "string" && value.includes(";")) {
      const items = value.split(";").filter((item) => item.trim());
      return (
        <ul className="list-disc pl-5 space-y-1">
          {items.map((item, index) => (
            <li key={index} className="text-gray-800">{item}</li>
          ))}
        </ul>
      );
    }

    return <p className="text-gray-800">{value}</p>;
  };

  return (
    <div className="px-8">
      {/* Health Details */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-2xl font-semibold text-gray-800">Health Details</h3>
          {mode !== "add" && (
            <button
              onClick={() => toggleSectionEdit("health")}
              className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
              aria-label={editingSection === "health" ? "Save Health Details" : "Edit Health Details"}
            >
              <FaEdit className="mr-2" />
              {editingSection === "health" ? "Save" : "Edit"}
            </button>
          )}
        </div>
        {editingSection === "health" || mode === "add" ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                List your chief physical ailments, diseases, complaints, or handicaps
              </label>
              <textarea
                name="physicalAilments"
                value={medicalInformation.physicalAilments.value}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="4"
                placeholder="List physical health issues"
                aria-label="Physical ailments"
              />
              {medicalInformationErrors.physicalAilments && (
                <p className="mt-1 text-sm text-red-600">{medicalInformationErrors.physicalAilments}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Briefly list (PRINT) your present main complaints, symptoms, and problems
              </label>
              <textarea
                name="mainComplaints"
                value={medicalInformation.mainComplaints.value}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="4"
                placeholder="List current issues"
                aria-label="Main complaints"
              />
              {medicalInformationErrors.mainComplaints && (
                <p className="mt-1 text-sm text-red-600">{medicalInformationErrors.mainComplaints}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Briefly list any additional past complaints, symptoms, and problems
              </label>
              <textarea
                name="pastComplaints"
                value={medicalInformation.pastComplaints.value}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="4"
                placeholder="List past issues"
                aria-label="Past complaints"
              />
              {medicalInformationErrors.pastComplaints && (
                <p className="mt-1 text-sm text-red-600">{medicalInformationErrors.pastComplaints}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Under what conditions are your problems worse?
              </label>
              <textarea
                name="worseConditions"
                value={medicalInformation.worseConditions.value}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="4"
                placeholder="Describe conditions"
                aria-label="Worse conditions"
              />
              {medicalInformationErrors.worseConditions && (
                <p className="mt-1 text-sm text-red-600">{medicalInformationErrors.worseConditions}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Under what conditions are they improved?
              </label>
              <textarea
                name="improvedConditions"
                value={medicalInformation.improvedConditions.value}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="4"
                placeholder="Describe conditions"
                aria-label="Improved conditions"
              />
              {medicalInformationErrors.improvedConditions && (
                <p className="mt-1 text-sm text-red-600">{medicalInformationErrors.improvedConditions}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <strong>Chief Physical Ailments:</strong>{" "}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mt-2">
                {renderListItems(medicalInformation.physicalAilments.value)}
              </div>
            </div>
            <div>
              <strong>Present Main Complaints:</strong>{" "}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mt-2">
                {renderListItems(medicalInformation.mainComplaints.value)}
              </div>
            </div>
            <div>
              <strong>Past Complaints:</strong>{" "}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mt-2">
                {renderListItems(medicalInformation.pastComplaints.value)}
              </div>
            </div>
            <div>
              <strong>Conditions When Problems Worsen:</strong>{" "}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mt-2">
                {renderListItems(medicalInformation.worseConditions.value)}
              </div>
            </div>
            <div>
              <strong>Conditions When Problems Improve:</strong>{" "}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mt-2">
                {renderListItems(medicalInformation.improvedConditions.value)}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Treatment History */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-2xl font-semibold text-gray-800">Treatment History</h3>
          {mode !== "add" && (
            <button
              onClick={() => toggleSectionEdit("treatment")}
              className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
              aria-label={editingSection === "treatment" ? "Save Treatment History" : "Edit Treatment History"}
            >
              <FaEdit className="mr-2" />
              {editingSection === "treatment" ? "Save" : "Edit"}
            </button>
          )}
        </div>
        {editingSection === "treatment" || mode === "add" ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                What kind of treatment have you previously had for emotional problems?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Hours of individual therapy
                  </label>
                  <input
                    type="number"
                    name="individualTherapyHours"
                    value={medicalInformation.individualTherapyHours.value}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter hours"
                    aria-label="Individual therapy hours"
                  />
                  {medicalInformationErrors.individualTherapyHours && (
                    <p className="mt-1 text-sm text-red-600">{medicalInformationErrors.individualTherapyHours}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Spread over years
                  </label>
                  <input
                    type="number"
                    name="individualTherapyYears"
                    value={medicalInformation.individualTherapyYears.value}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter years"
                    aria-label="Individual therapy years"
                  />
                  {medicalInformationErrors.individualTherapyYears && (
                    <p className="mt-1 text-sm text-red-600">{medicalInformationErrors.individualTherapyYears}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Ending years ago
                  </label>
                  <input
                    type="number"
                    name="individualTherapyEndYears"
                    value={medicalInformation.individualTherapyEndYears.value}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter years"
                    aria-label="Individual therapy end years"
                  />
                  {medicalInformationErrors.individualTherapyEndYears && (
                    <p className="mt-1 text-sm text-red-600">{medicalInformationErrors.individualTherapyEndYears}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Hours of group therapy
                  </label>
                  <input
                    type="number"
                    name="groupTherapyHours"
                    value={medicalInformation.groupTherapyHours.value}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter hours"
                    aria-label="Group therapy hours"
                  />
                  {medicalInformationErrors.groupTherapyHours && (
                    <p className="mt-1 text-sm text-red-600">{medicalInformationErrors.groupTherapyHours}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Months of psychiatric hospitalization
                  </label>
                  <input
                    type="number"
                    name="psychiatricHospitalizationMonths"
                    value={medicalInformation.psychiatricHospitalizationMonths.value}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter months"
                    aria-label="Psychiatric hospitalization months"
                  />
                  {medicalInformationErrors.psychiatricHospitalizationMonths && (
                    <p className="mt-1 text-sm text-red-600">{medicalInformationErrors.psychiatricHospitalizationMonths}</p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Are you undergoing treatment anywhere else now?
              </label>
              <div className="flex space-x-4 mt-1">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="currentTreatment"
                    value="Yes"
                    checked={medicalInformation.currentTreatment.value === "Yes"}
                    onChange={handleChange}
                    className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                    aria-label="Current treatment yes"
                  />
                  <span className="ml-2 text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="currentTreatment"
                    value="No"
                    checked={medicalInformation.currentTreatment.value === "No"}
                    onChange={handleChange}
                    className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                    aria-label="Current treatment no"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
              {medicalInformationErrors.currentTreatment && (
                <p className="mt-1 text-sm text-red-600">{medicalInformationErrors.currentTreatment}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of times during past year you have taken antidepressants
              </label>
              <input
                type="number"
                name="antidepressantsCount"
                value={medicalInformation.antidepressantsCount.value}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                placeholder="Enter number"
                aria-label="Antidepressants count"
              />
              {medicalInformationErrors.antidepressantsCount && (
                <p className="mt-1 text-sm text-red-600">{medicalInformationErrors.antidepressantsCount}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type of psychotherapy you have mainly had (briefly describe method of treatment—ex., dream analysis, free association, drugs, hypnosis, etc.)
              </label>
              <input
                name="psychotherapyType"
                value={medicalInformation.psychotherapyType.value}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                placeholder="Enter type of psychotherapy"
                aria-label="Psychotherapy type"
              />
              {medicalInformationErrors.psychotherapyType && (
                <p className="mt-1 text-sm text-red-600">{medicalInformationErrors.psychotherapyType}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Additional information that you think might be helpful
              </label>
              <textarea
                name="additionalInfo"
                value={medicalInformation.additionalInfo.value}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="4"
                placeholder="Provide additional details"
                aria-label="Additional info"
              />
              {medicalInformationErrors.additionalInfo && (
                <p className="mt-1 text-sm text-red-600">{medicalInformationErrors.additionalInfo}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>Individual Therapy Hours:</strong>{" "}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mt-2">
                {medicalInformation.individualTherapyHours.value || "N/A"}
              </div>
            </div>
            <div>
              <strong>Individual Therapy Years:</strong>{" "}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mt-2">
                {medicalInformation.individualTherapyYears.value || "N/A"}
              </div>
            </div>
            <div>
              <strong>Individual Therapy Ended Years Ago:</strong>{" "}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mt-2">
                {medicalInformation.individualTherapyEndYears.value || "N/A"}
              </div>
            </div>
            <div>
              <strong>Group Therapy Hours:</strong>{" "}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mt-2">
                {medicalInformation.groupTherapyHours.value || "N/A"}
              </div>
            </div>
            <div>
              <strong>Psychiatric Hospitalization Months:</strong>{" "}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mt-2">
                {medicalInformation.psychiatricHospitalizationMonths.value || "N/A"}
              </div>
            </div>
            <div>
              <strong>Current Treatment:</strong>{" "}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mt-2">
                {medicalInformation.currentTreatment.value || "N/A"}
              </div>
            </div>
            <div>
              <strong>Antidepressants Count (Past Year):</strong>{" "}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mt-2">
                {medicalInformation.antidepressantsCount.value || "N/A"}
              </div>
            </div>
            <div>
              <strong>Psychotherapy Type:</strong>{" "}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mt-2">
                {medicalInformation.psychotherapyType.value || "N/A"}
              </div>
            </div>
            <div className="md:col-span-2">
              <strong>Additional Information:</strong>{" "}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mt-2">
                {renderListItems(medicalInformation.additionalInfo.value)}
              </div>
            </div>
          </div>
        )}
      </section>

      {mode === "add" && (
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={handleSubmitMedicalInformation}
            className="flex items-center bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition-all duration-200 shadow-md"
            aria-label="Save and go to next tab"
          >
            Save & Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MedicalTab;