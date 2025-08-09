import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";
import MessageModel from "../MessageModel";
import {
  addMedicalInformationFamily,
  drpACES,
  getPatientMedicalInfo,
  updateMedicalInformationFamily,
} from "../../functions/patient";
import VoiceToText from "../VoiceToText";
import EditButton from "../EditButton";
import DescriptionInput from "../DescriptionInput";

const TabMentalHealthFamily = ({ id, refreshTabDetails, setActiveTab }) => {
  const [mode, setMode] = useState("add");
  const [editingSection, setEditingSection] = useState(null);
  const [medicalInformationErrors, setMedicalInformationErrors] = useState({});
  const [medicalInformation, setMedicalInformation] = useState({
    physicalAilmentsHusband: {
      label: "Husband Physical Ailments",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
    physicalAilmentsWife: {
      label: "Wife Physical Ailments",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
    mainComplaintsHusband: {
      label: "Husband Main Complaints",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
    mainComplaintsWife: {
      label: "Wife Main Complaints",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
    worseConditionsHusband: {
      label: "Husband Worse Conditions",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
    worseConditionsWife: {
      label: "Wife Worse Conditions",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
    improvedConditionsHusband: {
      label: "Husband Improved Conditions",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
    improvedConditionsWife: {
      label: "Wife Improved Conditions",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
    isHistoryOfPsychiatricTreatmentsHusband: {
      label: "Husband Psychiatric Treatment History",
      value: false,
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "boolean",
    },
    isHistoryOfPsychiatricTreatmentsWife: {
      label: "Wife Psychiatric Treatment History",
      value: false,
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "boolean",
    },
    isPsychiatricHospitalizationHusband: {
      label: "Husband Psychiatric Hospitalization",
      value: false,
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "boolean",
    },
    isPsychiatricHospitalizationWife: {
      label: "Wife Psychiatric Hospitalization",
      value: false,
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "boolean",
    },
    historyOfMentalIllnessHusband: {
      label: "Husband Mental Illness History",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
    historyOfMentalIllnessWife: {
      label: "Wife Mental Illness History",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
    historyOfSubstanceAbuseHusband: {
      label: "Husband Substance Abuse History",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
    historyOfSubstanceAbuseWife: {
      label: "Wife Substance Abuse History",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
    historyOfACESHusband: {
      label: "Husband ACES History",
      value: [],
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "array",
    },
    historyOfACESWife: {
      label: "Wife ACES History",
      value: [],
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "array",
    },
    additionalInfoHusband: {
      label: "Husband Additional Information",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
    additionalInfoWife: {
      label: "Wife Additional Information",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
  });

  const [initialMedicalInformation, setInitialMedicalInformation] = useState(null);
  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    type: "error",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [acesOptions, setAcesOptions] = useState([]);

  const loadDrpAces = async () => {
    const aces = await drpACES();
    setAcesOptions(aces.data.results[0]);
  };

  useEffect(() => {
    loadDropdowns();
  }, []);

  const loadDropdowns = async () => {
    await loadDrpAces();
  };

  const loadMedicalInformationData = async () => {
    setIsLoading(true);
    const result = await getPatientMedicalInfo(id);
    const patientData = result.data;
    if (patientData.error) {
      setModal({
        isOpen: true,
        message: patientData.error.message,
        type: "error",
      });
    }

    if (patientData) {
      setMedicalInformation({
        physicalAilmentsHusband: {
          ...medicalInformation.physicalAilmentsHusband,
          value: patientData.physicalAilmentsHusband || "",
        },
        physicalAilmentsWife: {
          ...medicalInformation.physicalAilmentsWife,
          value: patientData.physicalAilmentsWife || "",
        },
        mainComplaintsHusband: {
          ...medicalInformation.mainComplaintsHusband,
          value: patientData.mainComplaintsHusband || "",
        },
        mainComplaintsWife: {
          ...medicalInformation.mainComplaintsWife,
          value: patientData.mainComplaintsWife || "",
        },
        worseConditionsHusband: {
          ...medicalInformation.worseConditionsHusband,
          value: patientData.worseConditionsHusband || "",
        },
        worseConditionsWife: {
          ...medicalInformation.worseConditionsWife,
          value: patientData.worseConditionsWife || "",
        },
        improvedConditionsHusband: {
          ...medicalInformation.improvedConditionsHusband,
          value: patientData.improvedConditionsHusband || "",
        },
        improvedConditionsWife: {
          ...medicalInformation.improvedConditionsWife,
          value: patientData.improvedConditionsWife || "",
        },
        isHistoryOfPsychiatricTreatmentsHusband: {
          ...medicalInformation.isHistoryOfPsychiatricTreatmentsHusband,
          value: patientData.isHistoryOfPsychiatricTreatmentsHusband || false,
        },
        isHistoryOfPsychiatricTreatmentsWife: {
          ...medicalInformation.isHistoryOfPsychiatricTreatmentsWife,
          value: patientData.isHistoryOfPsychiatricTreatmentsWife || false,
        },
        isPsychiatricHospitalizationHusband: {
          ...medicalInformation.isPsychiatricHospitalizationHusband,
          value: patientData.isPsychiatricHospitalizationHusband || false,
        },
        isPsychiatricHospitalizationWife: {
          ...medicalInformation.isPsychiatricHospitalizationWife,
          value: patientData.isPsychiatricHospitalizationWife || false,
        },
        historyOfMentalIllnessHusband: {
          ...medicalInformation.historyOfMentalIllnessHusband,
          value: patientData.historyOfMentalIllnessHusband || "",
        },
        historyOfMentalIllnessWife: {
          ...medicalInformation.historyOfMentalIllnessWife,
          value: patientData.historyOfMentalIllnessWife || "",
        },
        historyOfSubstanceAbuseHusband: {
          ...medicalInformation.historyOfSubstanceAbuseHusband,
          value: patientData.historyOfSubstanceAbuseHusband || "",
        },
        historyOfSubstanceAbuseWife: {
          ...medicalInformation.historyOfSubstanceAbuseWife,
          value: patientData.historyOfSubstanceAbuseWife || "",
        },
        historyOfACESHusband: {
          ...medicalInformation.historyOfACESHusband,
          value: patientData.historyOfACESHusband.split(";;"),
        },
        historyOfACESWife: {
          ...medicalInformation.historyOfACESWife,
          value: patientData.historyOfACESWife.split(";;"),
        },
        additionalInfoHusband: {
          ...medicalInformation.additionalInfoHusband,
          value: patientData.additionalInfoHusband || "",
        },
        additionalInfoWife: {
          ...medicalInformation.additionalInfoWife,
          value: patientData.additionalInfoWife || "",
        },
      });

      setIsLoading(false);
      setMode("edit");
    } else {
      setMode("add");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadMedicalInformationData();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setMode("edit");
    }
  }, [id]);

  const validateField = (name, value, required, dataType) => {
    if (dataType === "string") {
      if (required && value.trim() === "") {
        return `${name} is required`;
      }
    }

    if (dataType === "array") {
      if (required && value.length === 0) {
        return `${name} is required`;
      }
    }

    if (dataType === "boolean") {
      if (required && value === null) {
        return `${name} is required`;
      }
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const { required, dataType } = medicalInformation[name];
    const finalValue = type === "checkbox" ? checked : value;
    const error = validateField(
      medicalInformation[name].label,
      finalValue,
      required,
      dataType
    );

    setMedicalInformation((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value: finalValue,
        isTouched: true,
        isValid: error === "",
      },
    }));

    setMedicalInformationErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateMedicalInformation = () => {
    const errors = {};
    let isFormValid = true;
    const updatedInfo = { ...medicalInformation };

    Object.entries(medicalInformation).forEach(([key, field]) => {
      if (!field || typeof field !== "object" || !("value" in field)) return;

      const { value, dataType, required } = field;
      const errorMessage = validateField(
        field.label,
        value,
        required,
        dataType
      );

      if (errorMessage) {
        isFormValid = false;
        errors[key] = errorMessage;
        updatedInfo[key].isValid = false;
      } else {
        updatedInfo[key].isValid = true;
      }

      updatedInfo[key].isTouched = updatedInfo[key].isTouched || false;
    });

    setMedicalInformation(updatedInfo);
    setMedicalInformationErrors(errors);
    return isFormValid;
  };

  const handleSubmitMedicalInformation = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const isValid = validateMedicalInformation();
    if (isValid) {
      const payload = {
        patientId: id,
        physicalAilmentsHusband: medicalInformation.physicalAilmentsHusband.value,
        physicalAilmentsWife: medicalInformation.physicalAilmentsWife.value,
        mainComplaintsHusband: medicalInformation.mainComplaintsHusband.value,
        mainComplaintsWife: medicalInformation.mainComplaintsWife.value,
        worseConditionsHusband: medicalInformation.worseConditionsHusband.value,
        worseConditionsWife: medicalInformation.worseConditionsWife.value,
        improvedConditionsHusband: medicalInformation.improvedConditionsHusband.value,
        improvedConditionsWife: medicalInformation.improvedConditionsWife.value,
        isHistoryOfPsychiatricTreatmentsHusband: medicalInformation.isHistoryOfPsychiatricTreatmentsHusband.value,
        isHistoryOfPsychiatricTreatmentsWife: medicalInformation.isHistoryOfPsychiatricTreatmentsWife.value,
        isPsychiatricHospitalizationHusband: medicalInformation.isPsychiatricHospitalizationHusband.value,
        isPsychiatricHospitalizationWife: medicalInformation.isPsychiatricHospitalizationWife.value,
        historyOfMentalIllnessHusband: medicalInformation.historyOfMentalIllnessHusband.value,
        historyOfMentalIllnessWife: medicalInformation.historyOfMentalIllnessWife.value,
        historyOfSubstanceAbuseHusband: medicalInformation.historyOfSubstanceAbuseHusband.value,
        historyOfSubstanceAbuseWife: medicalInformation.historyOfSubstanceAbuseWife.value,
        historyOfACESHusband: medicalInformation.historyOfACESHusband.value.map((item) => ({
        name: item,
      })),
        historyOfACESWife: medicalInformation.historyOfACESWife.value.map((item) => ({
        name: item,
      })),
        additionalInfoHusband: medicalInformation.additionalInfoHusband.value,
        additionalInfoWife: medicalInformation.additionalInfoWife.value,
        utcOffset: new Date().getTimezoneOffset(),
        pageName: "medical",
        isConfirm: true,
      };

      try {
        const res = await addMedicalInformationFamily(payload);
          
        if (res.data.error) {
          setModal({
            isOpen: true,
            message: res.data.error.message,
            type: "warning",
          });
          setIsSaving(false);
          return;
        }
      
        if (res.data.responseStatus === "failed") {
          setModal({
            isOpen: true,
            message: res.data.outputMessage,
            type: "warning",
          });
          setIsSaving(false);
          return;
        }

        setMode("edit");
        setIsSaving(false);
           loadMedicalInformationData();
        setModal({
          isOpen: true,
          message: res.data.outputValues.outputMessage,
          type: "success",
        });
        refreshTabDetails(Math.random());
      } catch (err) {
        setModal({
          isOpen: true,
          message: err.message,
          type: "error",
        });
        setIsSaving(false);
      }
    }
    setIsSaving(false);
  };

  const handleSubmitp = async (section) => {
    setIsSaving(true);
    const isValid = validateMedicalInformation();
    if (!isValid) {
      setIsSaving(false);
      return false;
    }

    const payload = {
      physicalAilmentsHusband: medicalInformation.physicalAilmentsHusband.value,
      physicalAilmentsWife: medicalInformation.physicalAilmentsWife.value,
      mainComplaintsHusband: medicalInformation.mainComplaintsHusband.value,
      mainComplaintsWife: medicalInformation.mainComplaintsWife.value,
      worseConditionsHusband: medicalInformation.worseConditionsHusband.value,
      worseConditionsWife: medicalInformation.worseConditionsWife.value,
      improvedConditionsHusband: medicalInformation.improvedConditionsHusband.value,
      improvedConditionsWife: medicalInformation.improvedConditionsWife.value,
      isHistoryOfPsychiatricTreatmentsHusband: !!medicalInformation.isHistoryOfPsychiatricTreatmentsHusband.value,
      isHistoryOfPsychiatricTreatmentsWife: !!medicalInformation.isHistoryOfPsychiatricTreatmentsWife.value,
      isPsychiatricHospitalizationHusband: !!medicalInformation.isPsychiatricHospitalizationHusband.value,
      isPsychiatricHospitalizationWife: !!medicalInformation.isPsychiatricHospitalizationWife.value,
      historyOfMentalIllnessHusband: medicalInformation.historyOfMentalIllnessHusband.value,
      historyOfMentalIllnessWife: medicalInformation.historyOfMentalIllnessWife.value,
      historyOfSubstanceAbuseHusband: medicalInformation.historyOfSubstanceAbuseHusband.value,
      historyOfSubstanceAbuseWife: medicalInformation.historyOfSubstanceAbuseWife.value,
      historyOfACESHusband: medicalInformation.historyOfACESHusband.value.map((item) => ({
        name: item,
      })),
      historyOfACESWife: medicalInformation.historyOfACESWife.value.map((item) => ({
        name: item,
      })),
      additionalInfoHusband: medicalInformation.additionalInfoHusband.value,
      additionalInfoWife: medicalInformation.additionalInfoWife.value,
      utcOffset: new Date().getTimezoneOffset(),
      pageName: "medical",
      isConfirm: true,
    };

    console.log('handleSubmitp', payload);

    try {
      const res = await updateMedicalInformationFamily(id, payload);
        
      if (res.data.error) {
        setModal({
          isOpen: true,
          message: res.data.error.message,
          type: "warning",
        });
        setIsSaving(false);
        return;
      }
     
      if (res.data.responseStatus === "failed") {
        setModal({
          isOpen: true,
          message: res.data.outputMessage,
          type: "warning",
        });
        setIsSaving(false);
        return;
      }

      setIsSaving(false);
           loadMedicalInformationData();

      setModal({
        isOpen: true,
        message: res.data.outputValues.outputMessage,
        type: "success",
      });
      return true;
    } catch (err) {
      setModal({
        isOpen: true,
        message: err.message,
        type: "error",
      });
      setIsSaving(false);
      return false;
    }
  };

  const toggleSectionEdit = async (section) => {
    if (editingSection === section) {
      const isValid = await handleSubmitp(section);
      if (isValid) setEditingSection(null);
    } else {
      setEditingSection(section);
    }
  };

  const renderListItems = (value) => {
    if (!value) return <p className="text-gray-500 italic">N/A</p>;

    if (Array.isArray(value)) {
      return (
        <ul className="list-disc pl-5 space-y-1">
          {value.map((item, index) => (
            <li key={index} className="text-gray-800">
              {item}
            </li>
          ))}
        </ul>
      );
    }

    if (typeof value === "string" && value.includes(";")) {
      const items = value.split(";").filter((item) => item.trim());
      return (
        <ul className="list-disc pl-5 space-y-1">
          {items.map((item, index) => (
            <li key={index} className="text-gray-800">
              {item}
            </li>
          ))}
        </ul>
      );
    }

    return <p className="text-gray-800">{value}</p>;
  };

    const handleDescriptionChange = (fieldName, value) => {
    const { required, dataType } = medicalInformation[fieldName];
    const error = validateField(
      medicalInformation[fieldName].label,
      value,
      required,
      dataType
    );

    setMedicalInformation((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value: value.split(";;").filter((item) => item.trim()),
        isTouched: true,
        isValid: error === "",
      },
    }));

    setMedicalInformationErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

 

  useEffect(() => {
    setInitialMedicalInformation({ ...medicalInformation });
  }, [editingSection]);

  const handleCancel = (editingSection) => {
    if (initialMedicalInformation) {
      setMedicalInformation(initialMedicalInformation);
      setMedicalInformationErrors({});
    }
    setEditingSection(null);
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
        <div className="px-8">
          <section className="mb-12">
            <div className="flex justify-between items-center mb-2 pb-2">
              <h3 className="text-xl font-semibold text-gray-800">
                Health Details
              </h3>
              {mode !== "add" && (
                <div className="flex space-x-4">
                  <EditButton
                    onClick={() => toggleSectionEdit("health")}
                    ariaLabel={
                      editingSection === "health"
                        ? "Save Health Details"
                        : "Edit Health Details"
                    }
                    disabled={isSaving}
                  >
                    {editingSection === "health"
                      ? isSaving
                        ? "Saving..."
                        : "Save"
                      : "Edit"}
                  </EditButton>
                  {editingSection === "health" && (
                    <button
                      onClick={() => handleCancel("health")}
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
            {editingSection === "health" || mode === "add" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div></div>
                  <h4 className="text-lg font-semibold text-sky-700">Husband</h4>
                  <h4 className="text-lg font-semibold text-sky-700">Wife</h4>
                </div>

                <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                  <label className="block text-sm font-medium text-gray-700 mt-2">
                    Physical Ailments
                  </label>
                  <div className="col-span-2">
                    <VoiceToText
                      name="physicalAilmentsHusband"
                      value={medicalInformation.physicalAilmentsHusband.value}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="List physical health issues"
                      aria-label="Husband physical ailments"
                    />
                    {medicalInformationErrors.physicalAilmentsHusband && (
                      <p className="mt-1 text-sm text-red-600">
                        {medicalInformationErrors.physicalAilmentsHusband}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <VoiceToText
                      name="physicalAilmentsWife"
                      value={medicalInformation.physicalAilmentsWife.value}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="List physical health issues"
                      aria-label="Wife physical ailments"
                    />
                    {medicalInformationErrors.physicalAilmentsWife && (
                      <p className="mt-1 text-sm text-red-600">
                        {medicalInformationErrors.physicalAilmentsWife}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                  <label className="block text-sm font-medium text-gray-700 mt-2">
                    Main Complaints
                  </label>
                  <div className="col-span-2">
                    <VoiceToText
                      name="mainComplaintsHusband"
                      value={medicalInformation.mainComplaintsHusband.value}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="List current issues"
                      aria-label="Husband main complaints"
                    />
                    {medicalInformationErrors.mainComplaintsHusband && (
                      <p className="mt-1 text-sm text-red-600">
                        {medicalInformationErrors.mainComplaintsHusband}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <VoiceToText
                      name="mainComplaintsWife"
                      value={medicalInformation.mainComplaintsWife.value}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="List current issues"
                      aria-label="Wife main complaints"
                    />
                    {medicalInformationErrors.mainComplaintsWife && (
                      <p className="mt-1 text-sm text-red-600">
                        {medicalInformationErrors.mainComplaintsWife}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                  <label className="block text-sm font-medium text-gray-700 mt-2">
                    Worse Conditions
                  </label>
                  <div className="col-span-2">
                    <VoiceToText
                      name="worseConditionsHusband"
                      value={medicalInformation.worseConditionsHusband.value}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="Describe conditions"
                      aria-label="Husband worse conditions"
                    />
                    {medicalInformationErrors.worseConditionsHusband && (
                      <p className="mt-1 text-sm text-red-600">
                        {medicalInformationErrors.worseConditionsHusband}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <VoiceToText
                      name="worseConditionsWife"
                      value={medicalInformation.worseConditionsWife.value}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="Describe conditions"
                      aria-label="Wife worse conditions"
                    />
                    {medicalInformationErrors.worseConditionsWife && (
                      <p className="mt-1 text-sm text-red-600">
                        {medicalInformationErrors.worseConditionsWife}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                  <label className="block text-sm font-medium text-gray-700 mt-2">
                    Improved Conditions
                  </label>
                  <div className="col-span-2">
                    <VoiceToText
                      name="improvedConditionsHusband"
                      value={medicalInformation.improvedConditionsHusband.value}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="Describe conditions"
                      aria-label="Husband improved conditions"
                    />
                    {medicalInformationErrors.improvedConditionsHusband && (
                      <p className="mt-1 text-sm text-red-600">
                        {medicalInformationErrors.improvedConditionsHusband}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <VoiceToText
                      name="improvedConditionsWife"
                      value={medicalInformation.improvedConditionsWife.value}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="Describe conditions"
                      aria-label="Wife improved conditions"
                    />
                    {medicalInformationErrors.improvedConditionsWife && (
                      <p className="mt-1 text-sm text-red-600">
                        {medicalInformationErrors.improvedConditionsWife}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mb-5 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div></div>
                  <h4 className="text-lg font-semibold text-sky-700 mb-4">Husband</h4>
                  <h4 className="text-lg font-semibold text-sky-700 mb-4">Wife</h4>
                </div>

                <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                  <strong className="text-sm">Physical Ailments:</strong>
                  <div className="col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="whitespace-pre-line">
                        {medicalInformation.physicalAilmentsHusband.value}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="whitespace-pre-line">
                        {medicalInformation.physicalAilmentsWife.value}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                  <strong className="text-sm">Main Complaints:</strong>
                  <div className="col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="whitespace-pre-line">
                        {medicalInformation.mainComplaintsHusband.value}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="whitespace-pre-line">
                        {medicalInformation.mainComplaintsWife.value}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                  <strong className="text-sm">Worse Conditions:</strong>
                  <div className="col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="whitespace-pre-line">
                        {medicalInformation.worseConditionsHusband.value}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="whitespace-pre-line">
                        {medicalInformation.worseConditionsWife.value}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                  <strong className="text-sm">Improved Conditions:</strong>
                  <div className="col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="whitespace-pre-line">
                        {medicalInformation.improvedConditionsHusband.value}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="whitespace-pre-line">
                        {medicalInformation.improvedConditionsWife.value}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          <section className="mb-12">
            <div className="flex justify-between items-center mb-2 pb-2">
              <h3 className="text-xl font-semibold text-gray-800">Treatment History</h3>
              {mode !== "add" && (
                <div className="flex space-x-4">
                  <EditButton
                    onClick={() => toggleSectionEdit("treatment")}
                    ariaLabel={
                      editingSection === "treatment"
                        ? "Save Treatment History"
                        : "Edit Treatment History"
                    }
                    disabled={isSaving}
                  >
                    {editingSection === "treatment"
                      ? isSaving
                        ? "Saving..."
                        : "Save"
                      : "Edit"}
                  </EditButton>
                  {editingSection === "treatment" && (
                    <button
                      onClick={() => handleCancel("treatment")}
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
            {editingSection === "treatment" || mode === "add" ? (
              <div className="space-y-4">
                {/* <div className="mb-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div></div>
                  <h4 className="text-lg font-semibold text-sky-700">Husband</h4>
                  <h4 className="text-lg font-semibold text-sky-700">Wife</h4>
                </div> */}

                <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6">
                  <label className="block text-sm font-medium text-gray-600 mt-2">
                    History of Psychiatric Treatments
                  </label>
                  {/* {JSON.stringify(medicalInformation.isHistoryOfPsychiatricTreatmentsHusband.value)} */}
                  <div className="col-span-2">
                    <div className="flex space-x-4 mt-1">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="isHistoryOfPsychiatricTreatmentsHusband"
                          checked={medicalInformation.isHistoryOfPsychiatricTreatmentsHusband.value}
                          onChange={handleChange}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                          aria-label="Husband psychiatric treatment history"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                    </div>
                    {medicalInformationErrors.isHistoryOfPsychiatricTreatmentsHusband && (
                      <p className="mt-1 text-sm text-red-600">
                        {medicalInformationErrors.isHistoryOfPsychiatricTreatmentsHusband}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <div className="flex space-x-4 mt-1">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="isHistoryOfPsychiatricTreatmentsWife"
                          checked={medicalInformation.isHistoryOfPsychiatricTreatmentsWife.value}
                          onChange={handleChange}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                          aria-label="Wife psychiatric treatment history"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                    </div>
                    {medicalInformationErrors.isHistoryOfPsychiatricTreatmentsWife && (
                      <p className="mt-1 text-sm text-red-600">
                        {medicalInformationErrors.isHistoryOfPsychiatricTreatmentsWife}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6">
                  <label className="block text-sm font-medium text-gray-600 mt-2">
                    Psychiatric Hospitalization
                  </label>
                  <div className="col-span-2">
                    <div className="flex space-x-4 mt-1">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="isPsychiatricHospitalizationHusband"
                          checked={medicalInformation.isPsychiatricHospitalizationHusband.value}
                          onChange={handleChange}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                          aria-label="Husband psychiatric hospitalization"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                    </div>
                    {medicalInformationErrors.isPsychiatricHospitalizationHusband && (
                      <p className="mt-1 text-sm text-red-600">
                        {medicalInformationErrors.isPsychiatricHospitalizationHusband}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <div className="flex space-x-4 mt-1">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="isPsychiatricHospitalizationWife"
                          checked={medicalInformation.isPsychiatricHospitalizationWife.value}
                          onChange={handleChange}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                          aria-label="Wife psychiatric hospitalization"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                    </div>
                    {medicalInformationErrors.isPsychiatricHospitalizationWife && (
                      <p className="mt-1 text-sm text-red-600">
                        {medicalInformationErrors.isPsychiatricHospitalizationWife}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6">
                  <label className="block text-sm font-medium text-gray-700 mt-2">
                    History of Mental Illness
                  </label>
                  <div className="col-span-2">
                    <VoiceToText
                      name="historyOfMentalIllnessHusband"
                      value={medicalInformation.historyOfMentalIllnessHusband.value}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="Provide mental illness history"
                      aria-label="Husband mental illness history"
                    />
                    {medicalInformationErrors.historyOfMentalIllnessHusband && (
                      <p className="mt-1 text-sm text-red-600">
                        {medicalInformationErrors.historyOfMentalIllnessHusband}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <VoiceToText
                      name="historyOfMentalIllnessWife"
                      value={medicalInformation.historyOfMentalIllnessWife.value}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="Provide mental illness history"
                      aria-label="Wife mental illness history"
                    />
                    {medicalInformationErrors.historyOfMentalIllnessWife && (
                      <p className="mt-1 text-sm text-red-600">
                        {medicalInformationErrors.historyOfMentalIllnessWife}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6">
                  <label className="block text-sm font-medium text-gray-700 mt-2">
                    History of Substance Abuse
                  </label>
                  <div className="col-span-2">
                    <VoiceToText
                      name="historyOfSubstanceAbuseHusband"
                      value={medicalInformation.historyOfSubstanceAbuseHusband.value}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="Provide substance abuse history"
                      aria-label="Husband substance abuse history"
                    />
                    {medicalInformationErrors.historyOfSubstanceAbuseHusband && (
                      <p className="mt-1 text-sm text-red-600">
                        {medicalInformationErrors.historyOfSubstanceAbuseHusband}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <VoiceToText
                      name="historyOfSubstanceAbuseWife"
                      value={medicalInformation.historyOfSubstanceAbuseWife.value}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="Provide substance abuse history"
                      aria-label="Wife substance abuse history"
                    />
                    {medicalInformationErrors.historyOfSubstanceAbuseWife && (
                      <p className="mt-1 text-sm text-red-600">
                        {medicalInformationErrors.historyOfSubstanceAbuseWife}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6">
                  
                  <label className="block text-sm font-medium text-gray-700 mt-2">
                    History of ACES
                  </label>
                  
                  <div className="col-span-2">
                              {/* {JSON.stringify(medicalInformation.historyOfACESHusband.value)} */}
                    <DescriptionInput
                      patient={medicalInformation}
                      setValue={(value) => {
                        handleDescriptionChange("historyOfACESHusband", value);
                      }}
                      setPatient={(newPatient) => {
                        setMedicalInformation(newPatient);
                      }}
                      isEditing={editingSection === "treatment" || mode === "add"}
                      fieldName="historyOfACESHusband"
                      label="Husband ACES History"
                      placeholder="Select or enter ACES history"
                      descriptionOptions={acesOptions}
                      isTypeable={false}
                    />
                    {medicalInformationErrors.historyOfACESHusband && (
                      <p className="mt-1 text-sm text-red-600">
                        {medicalInformationErrors.historyOfACESHusband}
                      </p>
                    )}
                  </div>
        
                  <div className="col-span-2">
                    {/* {JSON.stringify(medicalInformation.historyOfACESWife.value)} */}
                    <DescriptionInput
                      patient={medicalInformation}
                      setValue={(value) => {
                        handleDescriptionChange("historyOfACESWife", value);
                      }}
                      setPatient={(newPatient) => {
                        setMedicalInformation(newPatient);
                      }}
                      isEditing={editingSection === "treatment" || mode === "add"}
                      fieldName="historyOfACESWife"
                      label="Wife ACES History"
                      placeholder="Select or enter ACES history"
                      descriptionOptions={acesOptions}
                      isTypeable={false}
                    />
                    {medicalInformationErrors.historyOfACESWife && (
                      <p className="mt-1 text-sm text-red-600">
                        {medicalInformationErrors.historyOfACESWife}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6">
                  <label className="block text-sm font-medium text-gray-700 mt-2">
                    Additional Information
                  </label>
                  <div className="col-span-2">
                    <VoiceToText
                      name="additionalInfoHusband"
                      value={medicalInformation.additionalInfoHusband.value}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="Provide additional details"
                      aria-label="Husband additional info"
                    />
                    {medicalInformationErrors.additionalInfoHusband && (
                      <p className="mt-1 text-sm text-red-600">
                        {medicalInformationErrors.additionalInfoHusband}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <VoiceToText
                      name="additionalInfoWife"
                      value={medicalInformation.additionalInfoWife.value}
                      onChange={handleChange}
                      className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      rows="4"
                      placeholder="Provide additional details"
                      aria-label="Wife additional info"
                    />
                    {medicalInformationErrors.additionalInfoWife && (
                      <p className="mt-1 text-sm text-red-600">
                        {medicalInformationErrors.additionalInfoWife}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
                <div className="space-y-4">
                {/* <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div></div>
                  <h4 className="text-lg font-semibold text-sky-700 mb-4">Husband</h4>
                  <h4 className="text-lg font-semibold text-sky-700 mb-4">Wife</h4>
                </div> */}
         
               
                   <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                   <strong className="text-sm">Psychiatric Treatment History:</strong>
                  <div className="col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="whitespace-pre-line">
                                {medicalInformation.isHistoryOfPsychiatricTreatmentsHusband.value ? "Yes" : "No"}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="whitespace-pre-line">
                      {medicalInformation.isHistoryOfPsychiatricTreatmentsWife.value ? "Yes" : "No"}
                      </div>
                    </div>
                  </div>
                </div>
               



 <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <strong className="text-sm">Psychiatric Hospitalization:</strong>
                  <div className="col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="whitespace-pre-line">
                                {medicalInformation.isPsychiatricHospitalizationHusband.value ? "Yes" : "No"}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="whitespace-pre-line">
                      {medicalInformation.isPsychiatricHospitalizationWife.value ? "Yes" : "No"}
                      </div>
                    </div>
                  </div>
                </div>


            
                <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
       <strong className="text-sm whitespace-pre-line">Mental Illness History:</strong>
                  <div className="col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="whitespace-pre-line">
                                    {medicalInformation.historyOfMentalIllnessHusband.value}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="whitespace-pre-line">
                       {medicalInformation.historyOfMentalIllnessWife.value}
                      </div>
                    </div>
                  </div>
                </div>

       


         
                <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <strong className="text-sm whitespace-pre-line">Substance Abuse History:</strong>
                  <div className="col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="whitespace-pre-line">
                                    {medicalInformation.historyOfSubstanceAbuseHusband.value}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="whitespace-pre-line">
                       {medicalInformation.historyOfSubstanceAbuseWife.value}
                      </div>
                    </div>
                  </div>
                </div>

      <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                <strong className="text-sm whitespace-pre-line">ACES History:</strong>
                  <div className="col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="whitespace-pre-line">
                      {renderListItems(medicalInformation.historyOfACESHusband.value)}
                    </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="whitespace-pre-line">
                      {renderListItems(medicalInformation.historyOfACESWife.value)}
                    </div>
                    </div>
                  </div>
                </div>

           
               

                <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                   <strong className="text-sm whitespace-pre-line">Additional Information:</strong>
                  <div className="col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="whitespace-pre-line">
                                    {medicalInformation.additionalInfoHusband.value}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="whitespace-pre-line">
                       {medicalInformation.additionalInfoWife.value}
                      </div>
                    </div>
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
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default TabMentalHealthFamily;