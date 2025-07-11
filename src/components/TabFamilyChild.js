import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import {  addFamilyInformationData, getFamilyInformationData, getOccupations, getRaisedBy, getReligions, getTypesOfPerson, updateFamilyInformationData } from "../data/mockData";
import DescriptionInput from "./DescriptionInput";
import LoadingSpinner from "./LoadingSpinner";
import MessageModel from "./MessageModel";
import { getPatientFamilyInfo } from "../functions/patient";
import VoiceToText from "./VoiceToText";

const TabFamilyChild = ({ id, setActiveTab }) => {
  const [familyInformationErrors, setFamilyInformationErrors] = useState({});
  const [mode, setMode] = useState("add");
  const [editingSection, setEditingSection] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
 const [isSaving, setIsSaving] = useState(false);
   const [initialFamilyInformation, setInitialFamilyInformation] = useState(null);

  const [modal, setModal] = useState({ isOpen: false, message: "", type: "error" });

  const [familyInformation, setFamilyInformation] = useState({
    spouseOccupation: {
      label: "Spouse's Occupation",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
    spouseOccupationFullTime: {
      label: "Spouse's Occupation Status",
      value: "",
      isTouched: false,
      isValid: true,
      required: false, // Changed to false since not always required
      dataType: "string",
    },
    motherAge: {
      label: "Mother's Age",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "number",
    },
    ageWhenMotherDied: {
      label: "Age When Mother Died",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "number",
    },
    fatherAge: {
      label: "Father's Age",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "number",
    },
    ageWhenFatherDied: {
      label: "Age When Father Died",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "number",
    },
    motherOccupation: {
      label: "Mother's Occupation",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "string",
    },
    fatherOccupation: {
      label: "Father's Occupation",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "string",
    },
    motherReligion: {
      label: "Mother's Religion",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "string",
    },
    fatherReligion: {
      label: "Father's Religion",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "string",
    },
    raisedBy: {
      label: "Raised By",
      value: [],
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "array",
    },
    motherDescription: {
      label: "Mother Description",
      value: [],
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "array",
    },
    fatherDescription: {
      label: "Father Description",
      value: [],
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "array",
    },
    parentalSeparationAge: {
      label: "Parental Separation Age",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "number",
    },
    parentalDivorceAge: {
      label: "Parental Divorce Age",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "number",
    },
    motherDivorceCount: {
      label: "Mother Divorce Count",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "number",
    },
    fatherDivorceCount: {
      label: "Father Divorce Count",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "number",
    },
    livingBrothers: {
      label: "Number of Living Brothers",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "number",
    },
    livingSisters: {
      label: "Number of Living Sisters",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "number",
    },
    brothersAges: {
      label: "Ages of Living Brothers",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "string",
    },
    sistersAges: {
      label: "Ages of Living Sisters",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "string",
    },
    childNumber: {
      label: "Child Number",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "number",
    },
    familyChildren: {
      label: "Total Family Children",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "number",
    },
    adopted: {
      label: "Adopted",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "string",
    },
    brotherDisturbances: {
      label: "Brother Disturbances",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "string",
    },
    sisterDisturbances: {
      label: "Sister Disturbances",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "string",
    },
    maleRelativesDisturbed: {
      label: "Male Relatives Emotionally Disturbed",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "number",
    },
    maleRelativesHospitalized: {
      label: "Male Relatives Hospitalized",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "number",
    },
    femaleRelativesDisturbed: {
      label: "Female Relatives Emotionally Disturbed",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "number",
    },
    femaleRelativesHospitalized: {
      label: "Female Relatives Hospitalized",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "number",
    },
  });

  const [occupations,setOccupations]=useState([]);
  const [religions,setReligions]=useState([]);
    const [typeOfPersonOptions,setTypeOfPersonOptions]=useState([]);
     const [raisedByOptions,setRaisedByOptions]=useState([]);

  useEffect(()=>{
  loadDropdowns();
  },[])
  
  
  const loadDropdowns=async()=>{
    const occupations=await getOccupations();
    setOccupations(occupations.data);
  
    const religions=await getReligions();
    setReligions(religions.data);

    const typeofPerson=await getTypesOfPerson();
    setTypeOfPersonOptions(typeofPerson.data);

    const raisedByOptions=await getRaisedBy();
    setRaisedByOptions(raisedByOptions.data);

  }


const loadBasicInformationData=async()=>{
  
  setIsLoading(true);
  //const result =await getFamilyInformationData(id);
  const result =await getPatientFamilyInfo(id);
  const patientData=result.data;

  if(patientData.error){
    console.log('patientData.error',patientData.error)
     setModal({
        isOpen: true,
        message: patientData.error.message,
        type: "error",
      });
  }

console.log('getPatientFamilyInfo',result)
if(patientData){
 setMode("edit"); 
}
  

 if (patientData) {
        setFamilyInformation({
          spouseOccupation: {
            ...familyInformation.spouseOccupation,
            value: patientData.spouseOccupation || "",
             isTouched: false,
            isValid: true,
          },
          spouseOccupationFullTime: {
            ...familyInformation.spouseOccupationFullTime,
            value: patientData.spouseOccupationFullTime || "",
             isTouched: false,
            isValid: true,
          },
          motherAge: {
            ...familyInformation.motherAge,
            value: patientData.motherAge || "",
             isTouched: false,
            isValid: true,
          },
          ageWhenMotherDied: {
            ...familyInformation.ageWhenMotherDied,
            value: patientData.ageWhenMotherDied || "",
             isTouched: false,
            isValid: true,
          },
          fatherAge: {
            ...familyInformation.fatherAge,
            value: patientData.fatherAge || "",
             isTouched: false,
            isValid: true,
          },
          ageWhenFatherDied: {
            ...familyInformation.ageWhenFatherDied,
            value: patientData.ageWhenFatherDied || "",
             isTouched: false,
            isValid: true,
          },
          motherOccupation: {
            ...familyInformation.motherOccupation,
            value: patientData.motherOccupation || "",
             isTouched: false,
            isValid: true,
          },
          fatherOccupation: {
            ...familyInformation.fatherOccupation,
            value: patientData.fatherOccupation || "",
             isTouched: false,
            isValid: true,
          },
          motherReligion: {
            ...familyInformation.motherReligion,
            value: patientData.motherReligion || "",
             isTouched: false,
            isValid: true,
          },
          fatherReligion: {
            ...familyInformation.fatherReligion,
            value: patientData.fatherReligion || "",
             isTouched: false,
            isValid: true,
          },
          raisedBy: {
            ...familyInformation.raisedBy,
            value:  patientData.raisedBy,
             isTouched: false,
            isValid: true,
          },
          motherDescription: {
            ...familyInformation.motherDescription,
            value: patientData.motherDescription,
             isTouched: false,
            isValid: true,
          },
          fatherDescription: {
            ...familyInformation.fatherDescription,
            value: patientData.fatherDescription,
             isTouched: false,
            isValid: true,
          },
          parentalSeparationAge: {
            ...familyInformation.parentalSeparationAge,
            value: patientData.parentalSeparationAge || "",
             isTouched: false,
            isValid: true,
          },
          parentalDivorceAge: {
            ...familyInformation.parentalDivorceAge,
            value: patientData.parentalDivorceAge || "",
             isTouched: false,
            isValid: true,
          },
          motherDivorceCount: {
            ...familyInformation.motherDivorceCount,
            value: patientData.motherDivorceCount || "",
             isTouched: false,
            isValid: true,
          },
          fatherDivorceCount: {
            ...familyInformation.fatherDivorceCount,
            value: patientData.fatherDivorceCount || "",
             isTouched: false,
            isValid: true,
          },
          livingBrothers: {
            ...familyInformation.livingBrothers,
            value: patientData.livingBrothers || "",
             isTouched: false,
            isValid: true,
          },
          livingSisters: {
            ...familyInformation.livingSisters,
            value: patientData.livingSisters || "",
             isTouched: false,
            isValid: true,
          },
          brothersAges: {
            ...familyInformation.brothersAges,
            value: patientData.brothersAges || "",
             isTouched: false,
            isValid: true,
          },
          sistersAges: {
            ...familyInformation.sistersAges,
            value: patientData.sistersAges || "",
             isTouched: false,
            isValid: true,
          },
          childNumber: {
            ...familyInformation.childNumber,
            value: patientData.childNumber || "",
             isTouched: false,
            isValid: true,
          },
          familyChildren: {
            ...familyInformation.familyChildren,
            value: patientData.familyChildren || "",
             isTouched: false,
            isValid: true,
          },
          adopted: {
            ...familyInformation.adopted,
            value: patientData.adopted || "",
             isTouched: false,
            isValid: true,
          },
          brotherDisturbances: {
            ...familyInformation.brotherDisturbances,
            value: patientData.brotherDisturbances || "",
             isTouched: false,
            isValid: true,
          },
          sisterDisturbances: {
            ...familyInformation.sisterDisturbances,
            value: patientData.sisterDisturbances || "",
             isTouched: false,
            isValid: true,
          },
          maleRelativesDisturbed: {
            ...familyInformation.maleRelativesDisturbed,
            value: patientData.maleRelativesDisturbed || "",
             isTouched: false,
            isValid: true,
          },
          maleRelativesHospitalized: {
            ...familyInformation.maleRelativesHospitalized,
            value: patientData.maleRelativesHospitalized || "",
             isTouched: false,
            isValid: true,
          },
          femaleRelativesDisturbed: {
            ...familyInformation.femaleRelativesDisturbed,
            value: patientData.femaleRelativesDisturbed || "",
             isTouched: false,
            isValid: true,
          },
          femaleRelativesHospitalized: {
            ...familyInformation.femaleRelativesHospitalized,
            value: patientData.femaleRelativesHospitalized || "",
             isTouched: false,
            isValid: true,
          },
        });

     setIsLoading(false);
   
 }
 else{
   // setMode("add");
    setIsLoading(false);
 }


      
}

  // Load mock data based on id
  useEffect(() => {
    if (id) {
     loadBasicInformationData();
     
    }
  }, [id]);

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
  
  // Validate individual field
  // const validateField = (name, value, required, dataType) => {
  //   if (required && (dataType === "array" ? value.length === 0 : !value || value.toString().trim() === "")) {
  //     return `${name} is required`;
  //   }

  //   if (value && dataType === "number") {
  //     if (isNaN(value) || Number(value) < 0) {
  //       return `${name} must be a valid non-negative number`;
  //     }
  //   }

  //   return "";
  // };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    const { required, dataType } = familyInformation[name];
    const error = validateField(familyInformation[name].label, fieldValue, required, dataType);

    setFamilyInformation((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value: fieldValue,
        isTouched: true,
        isValid: error === "",
      },
    }));

    setFamilyInformationErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Handle DescriptionInput changes
  const handleDescriptionChange = (fieldName, value) => {
    const { required, dataType } = familyInformation[fieldName];
    const error = validateField(familyInformation[fieldName].label, value, required, dataType);

    setFamilyInformation((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value: value.split(";;").filter((item) => item.trim()),
        isTouched: true,
        isValid: error === "",
      },
    }));

    setFamilyInformationErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  // Handle spouse occupation status
  const handleOccupationStatusChange = (e) => {
    const value = e.target.value;
    setFamilyInformation((prev) => ({
      ...prev,
      spouseOccupationFullTime: {
        ...prev.spouseOccupationFullTime,
        value,
        isTouched: true,
        isValid: true,
      },
    }));
    setFamilyInformationErrors((prev) => ({
      ...prev,
      spouseOccupationFullTime: "",
    }));
  };

  // Validate entire form
  const validateFamilyInformation = () => {
    const errors = {};
    let isFormValid = true;
    const updatedInfo = { ...familyInformation };

    Object.entries(familyInformation).forEach(([key, field]) => {
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

    setFamilyInformation(updatedInfo);
    setFamilyInformationErrors(errors);
    return isFormValid;
  };

  // Generate payload for submission
  const generateSubmitPayload = (infoObject) => {
    const payload = {};
    for (const key in infoObject) {
      if (infoObject.hasOwnProperty(key)) {
        const value = infoObject[key].value;
        payload[key] = Array.isArray(value) ? value.join(";;") : value;
      }
    }
    return payload;
  };

  // Handle form submission
  const handleSubmitFamilyInformation = async (e) => {
    e.preventDefault();
    const isValid = validateFamilyInformation();
    console.log("isValid", isValid);
    if (isValid) {
      const submitPayload = generateSubmitPayload(familyInformation);
      console.log(submitPayload);
      addFamilyInformationData(submitPayload);
      setMode("edit");
    //  setActiveTab("medical");
    }
  };

  // Section-specific save logic
  const handleSubmitp =async (section) => {

    setIsSaving(true);
    const isValid = validateFamilyInformation();
    if (!isValid) {
 console.log("Validation failed, not saving.");
   setIsSaving(false);
      return false;
    }

 const payload = {
    };
    Object.entries(familyInformation).forEach(([key, field]) => {
     // console.log("field.",field);
      if (field.isTouched) {
        payload[key] = field.value;
      }
    });

    console.log("Save Payload:", payload);

try{
    
        const res=await updateFamilyInformationData(id,payload);
      console.log("update result:", res);
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
      setFamilyInformation(initialFamilyInformation);
      setIsSaving(false);
      return false;
    }

  };

  // Helper function to render list items
  const renderListItems = (value) => {
    let items = [];
    if (typeof value === "string" && value.includes(";;")) {
      items = value.split(";;").filter((item) => item.trim());
    } else if (Array.isArray(value)) {
      items = value.filter((item) => item.trim());
    }

    if (items.length === 0) {
      return <p className="text-gray-500 italic">N/A</p>;
    }

    return (
      <ul className="list-disc pl-5 space-y-1">
        {items.map((item, index) => (
          <li key={index} className="text-gray-800">{item}</li>
        ))}
      </ul>
    );
  };

  // Store initial state when entering edit mode
  useEffect(() => {
    
      setInitialFamilyInformation({ ...familyInformation });
  }, [editingSection]);
  

    const handleCancel = (editingSection) => {

    if (initialFamilyInformation) {
      setFamilyInformation(initialFamilyInformation);
      setFamilyInformationErrors({});

    }
    
    
    setEditingSection(null); // Exit edit mode
  };

  return (
    <>
         <MessageModel
            isOpen={modal.isOpen}
            onClose={() => setModal({ isOpen: false, message: "", type: "error" })}
            message={modal.message}
            type={modal.type}
          />
    
  
  { !isLoading ? (
    <div className="px-8">
   

      {/* Parental Information */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-2 pb-2">
          <h3 className="text-2xl font-semibold text-gray-800">
            Parental Information
          </h3>
          {mode !== "add" && (


 <div className="flex space-x-4">
              <button
                onClick={() => toggleSectionEdit("parental")}
                className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                aria-label={
                  editingSection === "parental"
                    ? "Save Parental Info"
                    : "Edit Parental Info"
                }
                 disabled={isSaving}
              >
                <FaEdit className="mr-2" />
                   {editingSection === "parental" ? (isSaving ? "Saving...": "Save") : "Edit"}
              </button>
              {editingSection === "parental" && (
                <button
                  onClick={() => handleCancel("parental")}
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
        {editingSection === "parental" || mode === "add" ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mother's Age{familyInformation.motherAge.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="number"
                  min="0"
                  name="motherAge"
                  value={familyInformation.motherAge.value}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter mother's age"
                  aria-label="Mother's age"
                />
                {familyInformationErrors.motherAge && (
                  <p className="mt-1 text-sm text-red-600">
                    {familyInformationErrors.motherAge}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  If deceased, how old were you when she died?{familyInformation.ageWhenMotherDied.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="number"
                  min="0"
                  name="ageWhenMotherDied"
                  value={familyInformation.ageWhenMotherDied.value}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter your age at time of death"
                  aria-label="Age when mother died"
                />
                {familyInformationErrors.ageWhenMotherDied && (
                  <p className="mt-1 text-sm text-red-600">
                    {familyInformationErrors.ageWhenMotherDied}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Father's Age{familyInformation.fatherAge.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="number"
                  min="0"
                  name="fatherAge"
                  value={familyInformation.fatherAge.value}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter father's age"
                  aria-label="Father's age"
                />
                {familyInformationErrors.fatherAge && (
                  <p className="mt-1 text-sm text-red-600">
                    {familyInformationErrors.fatherAge}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  If deceased, how old were you when he died?{familyInformation.ageWhenFatherDied.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="number"
                  min="0"
                  name="ageWhenFatherDied"
                  value={familyInformation.ageWhenFatherDied.value}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter your age at time of death"
                  aria-label="Age when father died"
                />
                {familyInformationErrors.ageWhenFatherDied && (
                  <p className="mt-1 text-sm text-red-600">
                    {familyInformationErrors.ageWhenFatherDied}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mother's Occupation{familyInformation.motherOccupation.required && <span className="text-red-500">*</span>}
                </label>
                <select
                  name="motherOccupation"
                  value={familyInformation.motherOccupation.value}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  aria-label="Mother's occupation"
                >
                  <option value="">Select occupation</option>
                  {occupations.map((occupation) => (
                    <option key={occupation.id} value={occupation.name}>
                      {occupation.name}
                    </option>
                  ))}
                </select>
                {familyInformationErrors.motherOccupation && (
                  <p className="mt-1 text-sm text-red-600">
                    {familyInformationErrors.motherOccupation}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Father's Occupation{familyInformation.fatherOccupation.required && <span className="text-red-500">*</span>}
                </label>
                <select
                  name="fatherOccupation"
                  value={familyInformation.fatherOccupation.value}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  aria-label="Father's occupation"
                >
                  <option value="">Select occupation</option>
                  {occupations.map((occupation) => (
                    <option key={occupation.id} value={occupation.name}>
                      {occupation.name}
                    </option>
                  ))}
                </select>
                {familyInformationErrors.fatherOccupation && (
                  <p className="mt-1 text-sm text-red-600">
                    {familyInformationErrors.fatherOccupation}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mother's Religion{familyInformation.motherReligion.required && <span className="text-red-500">*</span>}
                </label>
                <select
                  name="motherReligion"
                  value={familyInformation.motherReligion.value}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  aria-label="Mother's religion"
                >
                  <option value="">Select religion</option>
                  {religions.map((religion) => (
                    <option key={religion.id} value={religion.name}>
                      {religion.name}
                    </option>
                  ))}
                </select>
                {familyInformationErrors.motherReligion && (
                  <p className="mt-1 text-sm text-red-600">
                    {familyInformationErrors.motherReligion}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Father's Religion{familyInformation.fatherReligion.required && <span className="text-red-500">*</span>}
                </label>
                <select
                  name="fatherReligion"
                  value={familyInformation.fatherReligion.value}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  aria-label="Father's religion"
                >
                  <option value="">Select religion</option>
                  {religions.map((religion) => (
                    <option key={religion.id} value={religion.name}>
                      {religion.name}
                    </option>
                  ))}
                </select>
                {familyInformationErrors.fatherReligion && (
                  <p className="mt-1 text-sm text-red-600">
                    {familyInformationErrors.fatherReligion}
                  </p>
                )}
              </div>
            </div>
            <DescriptionInput
              patient={familyInformation}
              setPatient={setFamilyInformation}
              setValue={(value) => handleDescriptionChange("raisedBy", value)}
              isEditing={editingSection === "parental" || mode === "add"}
              fieldName="raisedBy"
              label="If your mother and father did not raise you when you were young, who did?"
              placeholder="Select or enter who raised you"
              descriptionOptions={raisedByOptions}
              isTypeable={false}
            />
            {familyInformationErrors.raisedBy && (
              <p className="mt-1 text-sm text-red-600">
                {familyInformationErrors.raisedBy}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DescriptionInput
                patient={familyInformation}
                setPatient={setFamilyInformation}
                setValue={(value) =>
                  handleDescriptionChange("motherDescription", value)
                }
                isEditing={editingSection === "parental" || mode === "add"}
                fieldName="motherDescription"
                label="Briefly describe the type of person your mother (or stepmother or person who substituted for your mother) was when you were a child and how you got along with her"
                placeholder="Select or enter mother description"
                descriptionOptions={typeOfPersonOptions}
                isTypeable={false}
              />
              {familyInformationErrors.motherDescription && (
                <p className="mt-1 text-sm text-red-600">
                  {familyInformationErrors.motherDescription}
                </p>
              )}
              <DescriptionInput
                patient={familyInformation}
                setPatient={setFamilyInformation}
                setValue={(value) =>
                  handleDescriptionChange("fatherDescription", value)
                }
                isEditing={editingSection === "parental" || mode === "add"}
                fieldName="fatherDescription"
                label="Briefly describe the type of person your father (or stepfather or father substitute) was when you were a child and how you got along with him"
                placeholder="Select or enter father description"
                descriptionOptions={typeOfPersonOptions}
                isTypeable={false}
              />
              {familyInformationErrors.fatherDescription && (
                <p className="mt-1 text-sm text-red-600">
                  {familyInformationErrors.fatherDescription}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border-gray-200 rounded-lg p-4 border-2">
  <div className="mr-5">
    <div className="flex justify-between items-center py-2.5 border-b border-gray-200">
      <span className="font-bold text-sm w-2/3">Mother's Age</span>
      <span className="text-gray-700 text-sm w-1/3 text-right">
        {familyInformation.motherAge.value || "N/A"}
      </span>
    </div>
    <div className="flex justify-between items-center py-2.5 border-b border-gray-200">
      <span className="font-bold text-sm w-2/3">Age When Mother Died</span>
      <span className="text-gray-700 text-sm w-1/3 text-right">
        {familyInformation.ageWhenMotherDied.value || "N/A"}
      </span>
    </div>
    <div className="flex justify-between items-center py-2.5 border-b border-gray-200">
      <span className="font-bold text-sm w-2/3">Mother's Occupation</span>
      <span className="text-gray-700 text-sm w-1/3 text-right">
        {familyInformation.motherOccupation.value || "N/A"}
      </span>
    </div>
    <div className="flex justify-between items-center py-2.5 border-gray-200">
      <span className="font-bold text-sm w-2/3">Mother's Religion</span>
      <span className="text-gray-700 text-sm w-1/3 text-right">
        {familyInformation.motherReligion.value || "N/A"}
      </span>
    </div>
  </div>

  <div className="ml-5">
    <div className="flex justify-between items-center py-2.5 border-b border-gray-200">
      <span className="font-bold text-sm w-2/3">Father's Age</span>
      <span className="text-gray-700 text-sm w-1/3 text-right">
        {familyInformation.fatherAge.value || "N/A"}
      </span>
    </div>
    <div className="flex justify-between items-center py-2.5 border-b border-gray-200">
      <span className="font-bold text-sm w-2/3">Age When Father Died</span>
      <span className="text-gray-700 text-sm w-1/3 text-right">
        {familyInformation.ageWhenFatherDied.value || "N/A"}
      </span>
    </div>
    <div className="flex justify-between items-center py-2.5 border-b border-gray-200">
      <span className="font-bold text-sm w-2/3">Father's Occupation</span>
      <span className="text-gray-700 text-sm w-1/3 text-right">
        {familyInformation.fatherOccupation.value || "N/A"}
      </span>
    </div>
    <div className="flex justify-between items-center py-2.5 border-gray-200">
      <span className="font-bold text-sm w-2/3">Father's Religion</span>
      <span className="text-gray-700 text-sm w-1/3 text-right">
        {familyInformation.fatherReligion.value || "N/A"}
      </span>
    </div>
  </div>
</div>


<div className="mt-6">
   <div className=" bg-white border border-gray-200 rounded-lg p-4">
  <strong className="text-sm">
    If your mother and father did not raise you when you were young, who did?
  </strong>
  <div className="mt-2">
    {renderListItems(familyInformation.raisedBy.value)}
  </div>
</div>
</div>

<div className="mt-6">
  <div className=" bg-white border border-gray-200 rounded-lg p-4">
  <strong className="text-sm">
    Describe your mother when you were a child and how you got along with her:
  </strong>
  <div className="mt-2">
    {renderListItems(familyInformation.motherDescription.value)}
  </div>
</div></div>

<div className="mt-6">
   <div className=" bg-white border border-gray-200 rounded-lg p-4">
 <strong className="text-sm">
    Describe your father when you were a child and how you got along with him:
  </strong>
  <div className=" mt-2">
    {renderListItems(familyInformation.fatherDescription.value)}
  </div>
</div></div>

          </div>
        )}
      </section>

      {/* Sibling Information */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-2 pb-2">
          <h3 className="text-2xl font-semibold text-gray-800">
            Sibling Information
          </h3>
          {mode !== "add" && (

  <div className="flex space-x-4">
              <button
                onClick={() => toggleSectionEdit("sibling")}
                className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                aria-label={
                  editingSection === "sibling"
                    ? "Save Sibling Info"
                    : "Edit Sibling Info"
                }
                 disabled={isSaving}
              >
                <FaEdit className="mr-2" />
                 {editingSection === "sibling" ? (isSaving ? "Saving...": "Save") : "Edit"}
              </button>
              {editingSection === "sibling" && (
                <button
                  onClick={() => handleCancel("sibling")}
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
        {editingSection === "sibling" || mode === "add" ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  If your mother and father separated, how old were you at the
                  time?{familyInformation.parentalSeparationAge.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="number"
                  min="0"
                  name="parentalSeparationAge"
                  value={familyInformation.parentalSeparationAge.value}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter age"
                  aria-label="Parental separation age"
                />
                {familyInformationErrors.parentalSeparationAge && (
                  <p className="mt-1 text-sm text-red-600">
                    {familyInformationErrors.parentalSeparationAge}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  If your mother and father divorced, how old were you at the
                  time?{familyInformation.parentalDivorceAge.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="number"
                  min="0"
                  name="parentalDivorceAge"
                  value={familyInformation.parentalDivorceAge.value}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter age"
                  aria-label="Parental divorce age"
                />
                {familyInformationErrors.parentalDivorceAge && (
                  <p className="mt-1 text-sm text-red-600">
                    {familyInformationErrors.parentalDivorceAge}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total number of times mother divorced{familyInformation.motherDivorceCount.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="number"
                  min="0"
                  name="motherDivorceCount"
                  value={familyInformation.motherDivorceCount.value}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter number"
                  aria-label="Mother divorce count"
                />
                {familyInformationErrors.motherDivorceCount && (
                  <p className="mt-1 text-sm text-red-600">
                    {familyInformationErrors.motherDivorceCount}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total number of times father divorced{familyInformation.fatherDivorceCount.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="number"
                  min="0"
                  name="fatherDivorceCount"
                  value={familyInformation.fatherDivorceCount.value}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter number"
                  aria-label="Father divorce count"
                />
                {familyInformationErrors.fatherDivorceCount && (
                  <p className="mt-1 text-sm text-red-600">
                    {familyInformationErrors.fatherDivorceCount}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of living brothers{familyInformation.livingBrothers.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="number"
                  min="0"
                  name="livingBrothers"
                  value={familyInformation.livingBrothers.value}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter number"
                  aria-label="Living brothers"
                />
                {familyInformationErrors.livingBrothers && (
                  <p className="mt-1 text-sm text-red-600">
                    {familyInformationErrors.livingBrothers}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of living sisters{familyInformation.livingSisters.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="number"
                  min="0"
                  name="livingSisters"
                  value={familyInformation.livingSisters.value}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter number"
                  aria-label="Living sisters"
                />
                {familyInformationErrors.livingSisters && (
                  <p className="mt-1 text-sm text-red-600">
                    {familyInformationErrors.livingSisters}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ages of living brothers{familyInformation.brothersAges.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  name="brothersAges"
                  value={familyInformation.brothersAges.value}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="e.g., 20, 25"
                  aria-label="Brothers ages"
                />
                {familyInformationErrors.brothersAges && (
                  <p className="mt-1 text-sm text-red-600">
                    {familyInformationErrors.brothersAges}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ages of living sisters{familyInformation.sistersAges.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  name="sistersAges"
                  value={familyInformation.sistersAges.value}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="e.g., 18, 22"
                  aria-label="Sisters ages"
                />
                {familyInformationErrors.sistersAges && (
                  <p className="mt-1 text-sm text-red-600">
                    {familyInformationErrors.sistersAges}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  I was child number{familyInformation.childNumber.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="number"
                  min="0"
                  name="childNumber"
                  value={familyInformation.childNumber.value}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter number"
                  aria-label="Child number"
                />
                {familyInformationErrors.childNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {familyInformationErrors.childNumber}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  In a family of children{familyInformation.familyChildren.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="number"
                  min="0"
                  name="familyChildren"
                  value={familyInformation.familyChildren.value}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter total number"
                  aria-label="Family children"
                />
                {familyInformationErrors.familyChildren && (
                  <p className="mt-1 text-sm text-red-600">
                    {familyInformationErrors.familyChildren}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Were you adopted?{familyInformation.adopted.required && <span className="text-red-500">*</span>}
              </label>
              <div className="flex space-x-4 mt-1">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="adopted"
                    value="Yes"
                    checked={familyInformation.adopted.value === "Yes"}
                    onChange={handleChange}
                    className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                    aria-label="Adopted yes"
                  />
                  <span className="ml-2 text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="adopted"
                    value="No"
                    checked={familyInformation.adopted.value === "No"}
                    onChange={handleChange}
                    className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                    aria-label="Adopted no"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
              {familyInformationErrors.adopted && (
                <p className="mt-1 text-sm text-red-600">
                  {familyInformationErrors.adopted}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                If there were unusually disturbing features in your relationship
                to any of your brothers, briefly describe{familyInformation.brotherDisturbances.required && <span className="text-red-500">*</span>}
              </label>
              <VoiceToText
                name="brotherDisturbances"
                value={familyInformation.brotherDisturbances.value}
                onChange={handleChange}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="4"
                placeholder="Describe any issues"
                aria-label="Brother disturbances"
              />
              {familyInformationErrors.brotherDisturbances && (
                <p className="mt-1 text-sm text-red-600">
                  {familyInformationErrors.brotherDisturbances}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                If there were unusually disturbing features in your relationship
                to any of your sisters, briefly describe{familyInformation.sisterDisturbances.required && <span className="text-red-500">*</span>}
              </label>
              <VoiceToText
                name="sisterDisturbances"
                value={familyInformation.sisterDisturbances.value}
                onChange={handleChange}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="4"
                placeholder="Describe any issues"
                aria-label="Sister disturbances"
              />
              {familyInformationErrors.sisterDisturbances && (
                <p className="mt-1 text-sm text-red-600">
                  {familyInformationErrors.sisterDisturbances}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border-gray-200 rounded-lg p-4 border-2">
  <div className="mr-5">
    <div className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-b-0">
      <span className="font-bold text-sm w-2/3">If your mother and father separated, how old were you at the time?</span>
      <span className="text-gray-700 text-sm w-1/3 text-right">
        {familyInformation.parentalSeparationAge.value || "N/A"}
      </span>
    </div>
    <div className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-b-0">
      <span className="font-bold text-sm w-2/3">If your mother and father divorced, how old were you at the time?</span>
      <span className="text-gray-700 text-sm w-1/3 text-right">
        {familyInformation.parentalDivorceAge.value || "N/A"}
      </span>
    </div>
    <div className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-b-0">
      <span className="font-bold text-sm w-2/3">Total number of times mother divorced</span>
      <span className="text-gray-700 text-sm w-1/3 text-right">
        {familyInformation.motherDivorceCount.value || "N/A"}
      </span>
    </div>
    <div className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-b-0">
      <span className="font-bold text-sm w-2/3">Total number of times father divorced</span>
      <span className="text-gray-700 text-sm w-1/3 text-right">
        {familyInformation.fatherDivorceCount.value || "N/A"}
      </span>
    </div>
    <div className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-b-0">
      <span className="font-bold text-sm w-2/3">Number of living brothers</span>
      <span className="text-gray-700 text-sm w-1/3 text-right">
        {familyInformation.livingBrothers.value || "N/A"}
      </span>
    </div>
  </div>

  <div className="ml-5">
    <div className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-b-0">
      <span className="font-bold text-sm w-2/3">Number of living sisters</span>
      <span className="text-gray-700 text-sm w-1/3 text-right">
        {familyInformation.livingSisters.value || "N/A"}
      </span>
    </div>
    <div className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-b-0">
      <span className="font-bold text-sm w-2/3">Ages of living brothers</span>
      <span className="text-gray-700 text-sm w-1/3 text-right">
        {familyInformation.brothersAges.value || "N/A"}
      </span>
    </div>
    <div className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-b-0">
      <span className="font-bold text-sm w-2/3">Ages of living sisters</span>
      <span className="text-gray-700 text-sm w-1/3 text-right">
        {familyInformation.sistersAges.value || "N/A"}
      </span>
    </div>
    <div className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-b-0">
      <span className="font-bold text-sm w-2/3">I was child number</span>
      <span className="text-gray-700 text-sm w-1/3 text-right">
        {familyInformation.childNumber.value || "N/A"}
      </span>
    </div>
    <div className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-b-0">
      <span className="font-bold text-sm w-2/3">In a family of children</span>
      <span className="text-gray-700 text-sm w-1/3 text-right">
        {familyInformation.familyChildren.value || "N/A"}
      </span>
    </div>
  </div>
</div>

             <div className=" bg-white border border-gray-200 rounded-lg p-4">
              <strong className="text-sm">Were you adopted?:</strong>{" "}
              {familyInformation.adopted.value || "N/A"}
            </div>
                    <div className=" bg-white border border-gray-200 rounded-lg p-4">
              <strong className="text-sm">
                If there were unusually disturbing features in your relationship
                to any of your brothers, briefly describe:
              </strong>
              <div className="mt-2">
                <p className="text-gray-800 mt-1">
                  {familyInformation.brotherDisturbances.value || "N/A"}
                </p>
              </div>
            </div>
                    <div className=" bg-white border border-gray-200 rounded-lg p-4">
             <strong className="text-sm">
                If there were unusually disturbing features in your relationship
                to any of your sisters, briefly describe:
              </strong>
              <div className="mt-2">
                <p className="text-gray-800 mt-1">
                  {familyInformation.sisterDisturbances.value || "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Family Mental Health */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-2 pb-2">
          <h3 className="text-2xl font-semibold text-gray-800">
            Family Mental Health
          </h3>
          {mode !== "add" && (
              <div className="flex space-x-4">
              <button
                onClick={() => toggleSectionEdit("familyMentalHealth")}
                className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                aria-label={
                  editingSection === "sifamilyMentalHealthbling"
                    ? "Save Family Mental Health Info"
                    : "Edit Family Mental Health Info"
                }
                 disabled={isSaving}
              >
                <FaEdit className="mr-2" />
                {editingSection === "familyMentalHealth" ? (isSaving ? "Saving...": "Save") : "Edit"}
              </button>
              {editingSection === "familyMentalHealth" && (
                <button
                  onClick={() => handleCancel("familyMentalHealth")}
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
        {editingSection === "familyMentalHealth" || mode === "add" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of close male relatives who have been seriously
                emotionally disturbed{familyInformation.maleRelativesDisturbed.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type="number"
                min="0"
                name="maleRelativesDisturbed"
                value={familyInformation.maleRelativesDisturbed.value}
                onChange={handleChange}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                placeholder="Enter number"
                aria-label="Male relatives disturbed"
              />
              {familyInformationErrors.maleRelativesDisturbed && (
                <p className="mt-1 text-sm text-red-600">
                  {familyInformationErrors.maleRelativesDisturbed}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number that have been hospitalized for psychiatric treatment, or
                have attempted suicide{familyInformation.maleRelativesHospitalized.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type="number"
                min="0"
                name="maleRelativesHospitalized"
                value={familyInformation.maleRelativesHospitalized.value}
                onChange={handleChange}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                placeholder="Enter number"
                aria-label="Male relatives hospitalized"
              />
              {familyInformationErrors.maleRelativesHospitalized && (
                <p className="mt-1 text-sm text-red-600">
                  {familyInformationErrors.maleRelativesHospitalized}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of close female relatives who have been seriously
                emotionally disturbed{familyInformation.femaleRelativesDisturbed.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type="number"
                min="0"
                name="femaleRelativesDisturbed"
                value={familyInformation.femaleRelativesDisturbed.value}
                onChange={handleChange}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                placeholder="Enter number"
                aria-label="Female relatives disturbed"
              />
              {familyInformationErrors.femaleRelativesDisturbed && (
                <p className="mt-1 text-sm text-red-600">
                  {familyInformationErrors.femaleRelativesDisturbed}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number that have been hospitalized for psychiatric treatment, or
                have attempted suicide{familyInformation.femaleRelativesHospitalized.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type="number"
                min="0"
                name="femaleRelativesHospitalized"
                value={familyInformation.femaleRelativesHospitalized.value}
                onChange={handleChange}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                placeholder="Enter number"
                aria-label="Female relatives hospitalized"
              />
              {familyInformationErrors.femaleRelativesHospitalized && (
                <p className="mt-1 text-sm text-red-600">
                  {familyInformationErrors.femaleRelativesHospitalized}
                </p>
              )}
            </div>
          </div>
        ) : (
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border-gray-200 rounded-lg p-4 border-2">
  <div className="mr-5">
    <div className="flex justify-between items-center py-2.5 border-b border-gray-200">
      <span className="font-bold text-sm w-2/3">
        Number of close male relatives who have been seriously emotionally disturbed
      </span>
      <span className="text-gray-700 text-sm w-1/3 text-right">
        {familyInformation.maleRelativesDisturbed.value || "N/A"}
      </span>
    </div>
    <div className="flex justify-between items-center py-2.5 border-gray-200">
      <span className="font-bold text-sm w-2/3">
        Number that have been hospitalized for psychiatric treatment, or have attempted suicide (male)
      </span>
      <span className="text-gray-700 text-sm w-1/3 text-right">
        {familyInformation.maleRelativesHospitalized.value || "N/A"}
      </span>
    </div>
  </div>

  <div className="ml-5">
    <div className="flex justify-between items-center py-2.5 border-b border-gray-200">
      <span className="font-bold text-sm w-2/3">
        Number of close female relatives who have been seriously emotionally disturbed
      </span>
      <span className="text-gray-700 text-sm w-1/3 text-right">
        {familyInformation.femaleRelativesDisturbed.value || "N/A"}
      </span>
    </div>
    <div className="flex justify-between items-center py-2.5 border-gray-200">
      <span className="font-bold text-sm w-2/3">
        Number that have been hospitalized for psychiatric treatment, or have attempted suicide (female)
      </span>
      <span className="text-gray-700 text-sm w-1/3 text-right">
        {familyInformation.femaleRelativesHospitalized.value || "N/A"}
      </span>
    </div>
  </div>
</div>

        )}
      </section>

      {mode === "add" && (
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={handleSubmitFamilyInformation}
            className="flex items-center bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition-all duration-200 shadow-md"
            aria-label="Save and go to next tab"
          >
             {isSaving ? 'Saving...': 'Save'}
          </button>
        </div>
      )}
    </div>
  ) : (
    <LoadingSpinner />
  )
}

  </>
);
};

export default TabFamilyChild;