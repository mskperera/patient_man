import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";
import MessageModel from "./MessageModel";
import { addMedicalInformation, getPatientMedicalInfo, updateMedicalInformation } from "../functions/patient";
import VoiceToText from "./VoiceToText";


const MedicalTab = ({ id,refreshTabDetails, setActiveTab }) => {
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

  const [initialMedicalInformation, setInitialMedicalInformation] = useState(null);
    const [modal, setModal] = useState({ isOpen: false, message: "", type: "error" });

    const [isLoading, setIsLoading] = useState(false);
     const [isSaving, setIsSaving] = useState(false);
  
    const loadMedicalInformationData=async()=>{
      setIsLoading(true);
      // const result =await getMedicalInformationData(id);
       const result =await getPatientMedicalInfo(id);
        const patientData=result.data;
        if(patientData.error){
    console.log('patientData.error',patientData.error)
     setModal({
        isOpen: true,
        message: patientData.error.message,
        type: "error",
      });
  }

        if (patientData) {
    
        setMedicalInformation({
          physicalAilments: {
            ...medicalInformation.physicalAilments,
            value: patientData.physicalAilments || "",
            isTouched: false,
            isValid: true,
          },
          mainComplaints: {
            ...medicalInformation.mainComplaints,
            value: patientData.mainComplaints || "",
            isTouched: false,
            isValid: true,
          },
          pastComplaints: {
            ...medicalInformation.pastComplaints,
            value: patientData.pastComplaints || "",
            isTouched: false,
            isValid: true,
          },
          worseConditions: {
            ...medicalInformation.worseConditions,
            value: patientData.worseConditions || "",
            isTouched: false,
            isValid: true,
          },
          improvedConditions: {
            ...medicalInformation.improvedConditions,
            value: patientData.improvedConditions || "",
            isTouched: false,
            isValid: true,
          },
          individualTherapyHours: {
            ...medicalInformation.individualTherapyHours,
            value: patientData.individualTherapyHours || "",
            isTouched: false,
            isValid: true,
          },
          individualTherapyYears: {
            ...medicalInformation.individualTherapyYears,
            value: patientData.individualTherapyYears || "",
            isTouched: false,
            isValid: true,
          },
          individualTherapyEndYears: {
            ...medicalInformation.individualTherapyEndYears,
            value: patientData.individualTherapyEndYears || "",
            isTouched: false,
            isValid: true,
          },
          groupTherapyHours: {
            ...medicalInformation.groupTherapyHours,
            value: patientData.groupTherapyHours || "",
            isTouched: false,
            isValid: true,
          },
          psychiatricHospitalizationMonths: {
            ...medicalInformation.psychiatricHospitalizationMonths,
            value: patientData.psychiatricHospitalizationMonths || "",
            isTouched: false,
            isValid: true,
          },
          currentTreatment: {
            ...medicalInformation.currentTreatment,
            value: patientData.currentTreatment || "",
            isTouched: false,
            isValid: true,
          },
          antidepressantsCount: {
            ...medicalInformation.antidepressantsCount,
            value: patientData.antidepressantsCount || "",
            isTouched: false,
            isValid: true,
          },
          psychotherapyType: {
            ...medicalInformation.psychotherapyType,
            value: patientData.psychotherapyType || "",
            isTouched: false,
            isValid: true,
          },
          additionalInfo: {
            ...medicalInformation.additionalInfo,
            value: patientData.additionalInfo || "",
            isTouched: false,
            isValid: true,
          },
        });

       setIsLoading(false);
 setMode("edit");
    }
    else{
  setMode("add");
    setIsLoading(false);
    }
   
    }
    
    useEffect(() => {
      if (id) {  
        loadMedicalInformationData();
       
      }
    }, [id]);

  // Load mock data based on id
  useEffect(() => {
    if (id) {
     

        setMode("edit");
      
    }
  }, [id]);

  // Validate individual field
  const validateField = (name, value, required, dataType) => {
   
    console.log('ddddata',name,dataType)
   if(dataType==="string"){
    if (required && value.trim() === "") {
      return `${name} is required`;
    }
  }

  if(dataType==="array"){
    if (required && value.length===0) {
      return `${name} is required`;
    }
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

     // updatedInfo[key].isTouched = true;
     updatedInfo[key].isTouched = updatedInfo[key].isTouched || false;
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
        setIsSaving(true);
        const isValid = validateMedicalInformation();
        console.log("isValid", isValid);
        if (isValid) {
            const payload = {
        patientId:id,
  physicalAilments: medicalInformation.physicalAilments.value,
  mainComplaints: medicalInformation.mainComplaints.value,
  pastComplaints: medicalInformation.pastComplaints.value,
  worseConditions: medicalInformation.worseConditions.value,
  improvedConditions: medicalInformation.improvedConditions.value,
  individualTherapyHours: medicalInformation.individualTherapyHours.value,
  individualTherapyYears: medicalInformation.individualTherapyYears.value,
  individualTherapyEndYears: medicalInformation.individualTherapyEndYears.value,
  groupTherapyHours: medicalInformation.groupTherapyHours.value,
  psychiatricHospitalizationMonths: medicalInformation.psychiatricHospitalizationMonths.value,
  currentTreatment: medicalInformation.currentTreatment.value,
  antidepressantsCount: medicalInformation.antidepressantsCount.value,
  psychotherapyType: medicalInformation.psychotherapyType.value,
  additionalInfo: medicalInformation.additionalInfo.value,
    pageName: "medical",
    isConfirm: true
  };
      
    
    
          const submitPayloadWithPatientId = {
            ...payload,
            patientId: id,
          };
     
      try{
           const res=  await addMedicalInformation(submitPayloadWithPatientId)
          console.log("Save res:", res);
           //await loadPersonalInformationData();
              console.log("update result:", res);
              if(res.data.responseStatus === "failed") {
          
                setModal({
            isOpen: true,
            message: res.data.outputMessage,
            type: "warning",
          });
    
             setIsSaving(false);
    
                return;
              }
    
              if(res.data.error){
                      setModal({
            isOpen: true,
            message: res.data.error.message,
            type: "warning",
          });
    
           setIsSaving(false);
    
                return;
    
              }
    
                  setMode("edit");
              setIsSaving(false);
                setModal({ isOpen: true, message: res.data.outputValues.outputMessage, type: "success" });
              refreshTabDetails(Math.random())
              
        }
         catch (err) {
           console.log("Save Payload: err", err.message);
          setModal({
            isOpen: true,
            message: err.message,
            type: "error",
          });
         setIsSaving(false);
        }
    
          setIsSaving(false);
      }
      };

  // const handleSubmitMedicalInformation = async (e) => {
  //   e.preventDefault();
  //   const isValid = validateMedicalInformation();
  //   if (isValid) {
  //     const submitPayload = generateSubmitPayload(medicalInformation);
  //     console.log("Medical Information Payload:", submitPayload);
  //     addMedicalInformationData(submitPayload);
  //     setMode("edit");
  //    // setActiveTab("education"); // Navigate to the next tab
  //   }
  // };

  // Modified handleSubmit to handle section-specific saving

      const handleSubmitp =async (section) => {
      
    setIsSaving(true);
        const isValid = validateMedicalInformation();
        if (!isValid) {
          console.log("Validation failed, not saving.");
           setIsSaving(false);
          return false;
        }
    
    
        const payload = {
     physicalAilments: medicalInformation.physicalAilments.value,
  mainComplaints: medicalInformation.mainComplaints.value,
  pastComplaints: medicalInformation.pastComplaints.value,
  worseConditions: medicalInformation.worseConditions.value,
  improvedConditions: medicalInformation.improvedConditions.value,
  individualTherapyHours: medicalInformation.individualTherapyHours.value,
  individualTherapyYears: medicalInformation.individualTherapyYears.value,
  individualTherapyEndYears: medicalInformation.individualTherapyEndYears.value,
  groupTherapyHours: medicalInformation.groupTherapyHours.value,
  psychiatricHospitalizationMonths: medicalInformation.psychiatricHospitalizationMonths.value,
  currentTreatment: medicalInformation.currentTreatment.value,
  antidepressantsCount: medicalInformation.antidepressantsCount.value,
  psychotherapyType: medicalInformation.psychotherapyType.value,
  additionalInfo: medicalInformation.additionalInfo.value,
    pageName: "medical",
    isConfirm: true
        };
    
    
        console.log("Save Payload:", payload);
    
     
        try{
          const res=await updateMedicalInformation(id,payload);
            //await loadPersonalInformationData();
              console.log("update result:", res);
  
  
  
   if(res.data.responseStatus === "failed") {
          
                setModal({
            isOpen: true,
            message: res.data.outputMessage,
            type: "warning",
          });
    
             setIsSaving(false);
    
                return;
              }
    
              if(res.data.error){
                      setModal({
            isOpen: true,
            message: res.data.error.message,
            type: "warning",
          });
    
           setIsSaving(false);
    
                return;
    
              }
  
  
              setIsSaving(false);
              return true;
        }
         catch (err) {
           console.log("Save Payload: err", err.message);
          setModal({
            isOpen: true,
            message: err.message,
            type: "error",
          });
          //setPersonalInformation(initialPersonalInformation);
          setIsSaving(false);
          return false;
        }
    
    
      };

  // const handleSubmitp =async (section) => {
  //      setIsSaving(true);
  //   const isValid = validateMedicalInformation();
  //   if (!isValid) {
  //        console.log("Validation failed, not saving.");
  //           setIsSaving(false);
  //    return false;
  //   }

  // const payload = {
  //   };
  //   Object.entries(medicalInformation).forEach(([key, field]) => {
  //    // console.log("field.",field);
  //     if (field.isTouched) {
  //       payload[key] = field.value;
  //     }
  //   });






  // try{
  //    console.log("Save Payload:", payload);
  //         const res=await updateMedicalInformationData(id,payload);
  //       //await loadPersonalInformationData();
  //         console.log("update result:", res);
  //         setIsSaving(false);
  //         return true;
  //   }
  //    catch (err) {
  //      console.log("Save Payload: err", err.message);
  //     setModal({
  //       isOpen: true,
  //       message: err.message,
  //       type: "error",
  //     });
  //    // setMedicalInformation(initialMedicalInformation);
  //     setIsSaving(false);
  //     return false;
  //   }

  // };


    // Toggle edit mode for a specific section
  const toggleSectionEdit =async (section) => {
    if (editingSection === section) {
    const isValid=await handleSubmitp(section);
      if(isValid)
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


 useEffect(() => {
    
      setInitialMedicalInformation({ ...medicalInformation });
  }, [editingSection]);
  

    const handleCancel = (editingSection) => {

    if (initialMedicalInformation) {
      setMedicalInformation(initialMedicalInformation);
      setMedicalInformationErrors({});

    }

        setEditingSection(null);
  }


  return (
<>
     <MessageModel
        isOpen={modal.isOpen}
        onClose={() => setModal({ isOpen: false, message: "", type: "error" })}
        message={modal.message}
        type={modal.type}
      />

{
   !isLoading ?
    <div className="px-8">
      {/* Health Details */}
      <section className=" mb-12">
        <div className="flex justify-between items-center mb-2 pb-2">
          <h3 className="text-2xl font-semibold text-gray-800">Health Details</h3>
          {mode !== "add" && (
             <div className="flex space-x-4">
                          <button
                            onClick={() => toggleSectionEdit("health")}
                            className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                            aria-label={
                              editingSection === "health"
                                ? "Save Health Details"
                                : "Edit Health Details"
                            }
                            disabled={isSaving}
                          >
                            <FaEdit className="mr-2" />
                           {editingSection === "health" ? (isSaving ? "Saving...": "Save") : "Edit"}
                        
                          </button>

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
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                List your chief physical ailments, diseases, complaints, or handicaps {medicalInformation.physicalAilments.required && <span className="text-red-500">*</span>}
              </label>
                <VoiceToText
                name="physicalAilments"
                value={medicalInformation.physicalAilments.value}
                onChange={handleChange}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
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
                Briefly list (PRINT) your present main complaints, symptoms, and problems{medicalInformation.mainComplaints.required && <span className="text-red-500">*</span>}
              </label>
                 <VoiceToText
                name="mainComplaints"
                value={medicalInformation.mainComplaints.value}
                onChange={handleChange}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
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
                Briefly list any additional past complaints, symptoms, and problems{medicalInformation.pastComplaints.required && <span className="text-red-500">*</span>}
              </label>
                <VoiceToText
                name="pastComplaints"
                value={medicalInformation.pastComplaints.value}
                onChange={handleChange}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
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
                Under what conditions are your problems worse?{medicalInformation.worseConditions.required && <span className="text-red-500">*</span>}
              </label>
                <VoiceToText
                name="worseConditions"
                value={medicalInformation.worseConditions.value}
                onChange={handleChange}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
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
                Under what conditions are they improved?{medicalInformation.improvedConditions.required && <span className="text-red-500">*</span>}
              </label>
                  <VoiceToText
                name="improvedConditions"
                value={medicalInformation.improvedConditions.value}
                onChange={handleChange}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
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
           <div className=" bg-white border border-gray-200 rounded-lg p-4">
             <strong className="text-sm">Chief Physical Ailments:</strong>{" "}
              <div className="mt-2">
                {renderListItems(medicalInformation.physicalAilments.value)}
              </div>
            </div>
          <div className=" bg-white border border-gray-200 rounded-lg p-4">
             <strong className="text-sm">Present Main Complaints:</strong>{" "}
              <div className="mt-2">
                {renderListItems(medicalInformation.mainComplaints.value)}
              </div>
            </div>
             <div className=" bg-white border border-gray-200 rounded-lg p-4">
             <strong className="text-sm">Past Complaints:</strong>{" "}
              <div className="mt-2">
                {renderListItems(medicalInformation.pastComplaints.value)}
              </div>
            </div>
             <div className=" bg-white border border-gray-200 rounded-lg p-4">
             <strong className="text-sm">Conditions When Problems Worsen:</strong>{" "}
              <div className=" mt-2">
                {renderListItems(medicalInformation.worseConditions.value)}
              </div>
            </div>
            <div className=" bg-white border border-gray-200 rounded-lg p-4">
             <strong className="text-sm">Conditions When Problems Improve:</strong>{" "}
              <div className=" mt-2">
                {renderListItems(medicalInformation.improvedConditions.value)}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Treatment History */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-2 pb-2">
          <h3 className="text-2xl font-semibold text-gray-800">Treatment History</h3>
          {mode !== "add" && (

               <div className="flex space-x-4">
                          <button
                            onClick={() => toggleSectionEdit("treatment")}
                            className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                            aria-label={
                              editingSection === "treatment"
                                ? "Save Treatment History"
                                : "Edit Treatment History"
                            }
                                   disabled={isSaving}
                          >
                            <FaEdit className="mr-2" />
                             {editingSection === "treatment" ? (isSaving ? "Saving...": "Save") : "Edit"}
                          </button>

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
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                What kind of treatment have you previously had for emotional problems?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Hours of individual therapy{medicalInformation.individualTherapyHours.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="individualTherapyHours"
                    value={medicalInformation.individualTherapyHours.value}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter hours"
                    aria-label="Individual therapy hours"
                  />
                  {medicalInformationErrors.individualTherapyHours && (
                    <p className="mt-1 text-sm text-red-600">{medicalInformationErrors.individualTherapyHours}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Spread over years{medicalInformation.individualTherapyYears.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="individualTherapyYears"
                    value={medicalInformation.individualTherapyYears.value}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter years"
                    aria-label="Individual therapy years"
                  />
                  {medicalInformationErrors.individualTherapyYears && (
                    <p className="mt-1 text-sm text-red-600">{medicalInformationErrors.individualTherapyYears}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Ending years ago{medicalInformation.individualTherapyEndYears.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="individualTherapyEndYears"
                    value={medicalInformation.individualTherapyEndYears.value}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
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
                    Hours of group therapy{medicalInformation.groupTherapyHours.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="groupTherapyHours"
                    value={medicalInformation.groupTherapyHours.value}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter hours"
                    aria-label="Group therapy hours"
                  />
                  {medicalInformationErrors.groupTherapyHours && (
                    <p className="mt-1 text-sm text-red-600">{medicalInformationErrors.groupTherapyHours}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Months of psychiatric hospitalization{medicalInformation.psychiatricHospitalizationMonths.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="psychiatricHospitalizationMonths"
                    value={medicalInformation.psychiatricHospitalizationMonths.value}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
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
                Are you undergoing treatment anywhere else now?{medicalInformation.currentTreatment.required && <span className="text-red-500">*</span>}
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
                Number of times during past year you have taken antidepressants{medicalInformation.antidepressantsCount.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type="number"
                min="0"
                name="antidepressantsCount"
                value={medicalInformation.antidepressantsCount.value}
                onChange={handleChange}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                placeholder="Enter number"
                aria-label="Antidepressants count"
              />
              {medicalInformationErrors.antidepressantsCount && (
                <p className="mt-1 text-sm text-red-600">{medicalInformationErrors.antidepressantsCount}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type of psychotherapy you have mainly had{medicalInformation.psychotherapyType.required && <span className="text-red-500">*</span>} (briefly describe method of treatment—ex., dream analysis, free association, drugs, hypnosis, etc.)
              </label>
              <input
                name="psychotherapyType"
                value={medicalInformation.psychotherapyType.value}
                onChange={handleChange}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                placeholder="Enter type of psychotherapy"
                aria-label="Psychotherapy type"
              />
              {medicalInformationErrors.psychotherapyType && (
                <p className="mt-1 text-sm text-red-600">{medicalInformationErrors.psychotherapyType}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Additional information that you think might be helpful{medicalInformation.additionalInfo.required && <span className="text-red-500">*</span>}
              </label>
              <textarea
                name="additionalInfo"
                value={medicalInformation.additionalInfo.value}
                onChange={handleChange}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
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
          <div className="grid grid-cols-1 md:grid-cols-2  bg-white border border-gray-200 rounded-lg p-4">
              <strong className="text-sm">Individual Therapy Hours:</strong>{" "}
              <div className="text-sm text-right">
                {medicalInformation.individualTherapyHours.value || "N/A"}
              </div>
            </div>
 <div className="grid grid-cols-1 md:grid-cols-2  bg-white border border-gray-200 rounded-lg p-4">
             <strong className="text-sm">Individual Therapy Years:</strong>{" "}
              <div className="text-sm text-right">
                {medicalInformation.individualTherapyYears.value || "N/A"}
              </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2  bg-white border border-gray-200 rounded-lg p-4">
             <strong className="text-sm">Individual Therapy Ended Years Ago:</strong>{" "}
              <div className="text-sm text-right">
                {medicalInformation.individualTherapyEndYears.value || "N/A"}
              </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2  bg-white border border-gray-200 rounded-lg p-4">
             <strong className="text-sm">Group Therapy Hours:</strong>{" "}
             <div className="text-sm text-right">
                {medicalInformation.groupTherapyHours.value || "N/A"}
              </div>
            </div>
              <div className="grid grid-cols-1 md:grid-cols-2  bg-white border border-gray-200 rounded-lg p-4">
             <strong className="text-sm">Psychiatric Hospitalization Months:</strong>{" "}
             <div className="text-sm text-right">
                {medicalInformation.psychiatricHospitalizationMonths.value || "N/A"}
              </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2  bg-white border border-gray-200 rounded-lg p-4">
             <strong className="text-sm">Current Treatment:</strong>{" "}
              <div className="text-sm text-right">
                {medicalInformation.currentTreatment.value || "N/A"}
              </div>
            </div>
               <div className="grid grid-cols-1 md:grid-cols-2  bg-white border border-gray-200 rounded-lg p-4">
             <strong className="text-sm">Antidepressants Count (Past Year):</strong>{" "}
            <div className="text-sm text-right">
                {medicalInformation.antidepressantsCount.value || "N/A"}
              </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2  bg-white border border-gray-200 rounded-lg p-4">
             <strong className="text-sm">Psychotherapy Type:</strong>{" "}
              <div className="">
                {medicalInformation.psychotherapyType.value || "N/A"}
              </div>
            </div>
            <div className="md:col-span-2">
               <div className=" bg-white border border-gray-200 rounded-lg p-4">
             <strong className="text-sm">Additional Information:</strong>{" "}
             
                {renderListItems(medicalInformation.additionalInfo.value)}
              
            </div>
          </div></div>
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
           {isSaving ? 'Saving...': 'Save'}
          </button>
        </div>
      )}
    </div>
        :
        <LoadingSpinner />

}

</>

 
  );
};

export default MedicalTab;