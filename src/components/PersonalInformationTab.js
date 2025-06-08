import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getBadPointsOptions, getGoodPointsOptionsData, getOccupations, getPersonalInformationData, goodPointsOptionsData, personalInformationData, updatePersonalInformationData } from "../data/mockData";
import DescriptionInput from "./DescriptionInput";
import LoadingSpinner from "./LoadingSpinner";
import MessageModel from "./MessageModel";


 const maritalStatusOptions = [
  { value: "never_married", text: "Never Married" },
  { value: "married_first_time", text: "Married (Living Together) Now for First Time" },
  { value: "married_second_time", text: "Married (Living Together) Now for Second (or More) Time" },
  { value: "separated", text: "Separated" },
  { value: "divorced_not_remarried", text: "Divorced and Not Remarried" },
  { value: "widowed_not_remarried", text: "Widowed and Not Remarried" },
];



const PersonalInformation = ({ id, setActiveTab }) => {
  const navigate = useNavigate();
  const [personalInformationErrors, setPersonalInformationErrors] = useState({});
  const [mode, setMode] = useState("add");
  const [editingSection, setEditingSection] = useState(null);
 const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
  const [initialPersonalInformation, setInitialPersonalInformation] = useState(null); // Store initial state for cancel
  const [modal, setModal] = useState({ isOpen: false, message: "", type: "error" });

  const [personalInformation, setPersonalInformation] = useState({
    maritalStatus: {
      label: "Present Marital Status",
      value: "",
      isTouched: false,
      isValid: false,
      required: true,
      dataType: "string",
    },
    yearsMarried: {
      label: "Number of Years Married to Present Spouse",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "number",
    },
    maleChildrenAges: {
      label: "Ages of Male Children",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
    femaleChildrenAges: {
      label: "Ages of Female Children",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
    religiosity: {
      label: "Religiosity",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "number",
    },
    thingsLiked: {
      label: "Things You Like to Do Most",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "string",
    },
    assets: {
      label: "Main Assets and Good Points",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "string",
    },
    badPoints: {
      label: "Main Bad Points",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "string",
    },
    socialDifficulties: {
      label: "Main Social Difficulties",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "string",
    },
    loveSexDifficulties: {
      label: "Main Love and Sex Difficulties",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "string",
    },
    schoolWorkDifficulties: {
      label: "Main School or Work Difficulties",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "string",
    },
    lifeGoals: {
      label: "Main Life Goals",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "string",
    },
    thingsToChange: {
      label: "Things to Change About Yourself",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "string",
    },
    occupationTrained: {
      label: "Occupation(s) Trained For",
      value: "",
      isTouched: false,
      isValid: false,
      required: true,
      dataType: "string",
    },
    occupation: {
      label: "Present Occupation",
      value: "",
      isTouched: false,
      isValid: false,
      required: true,
      dataType: "string",
    },
    occupationFullTime: {
      label: "Occupation Status",
      value: "",
      isTouched: false,
      isValid: false,
      required: true,
      dataType: "string",
    },
  });

  const loadPersonalInformationData=async()=>{
  setIsLoading(true);
  const result =await getPersonalInformationData(id);
    const patientData=result.data;
  if (patientData) {
        setPersonalInformation({
          maritalStatus: {
            ...personalInformation.maritalStatus,
            value: patientData.maritalStatus || "",
            isTouched: false,
            isValid: true,
          },
          yearsMarried: {
            ...personalInformation.yearsMarried,
            value: patientData.yearsMarried || "",
        isTouched: false,
            isValid: true,
            required: patientData.maritalStatus === "married_first_time" || patientData.maritalStatus === "married_second_time",
          },
          maleChildrenAges: {
            ...personalInformation.maleChildrenAges,
            value: patientData.maleChildrenAges || "",
             isTouched: false,
            isValid: true,
          },
          femaleChildrenAges: {
            ...personalInformation.femaleChildrenAges,
            value: patientData.femaleChildrenAges || "",
         isTouched: false,
            isValid: true,
          },
          religiosity: {
            ...personalInformation.religiosity,
            value: patientData.religiosity || "",
            isTouched: false,
            isValid: true,
          },
          thingsLiked: {
            ...personalInformation.thingsLiked,
            value: patientData.thingsLiked || "",
            isTouched: false,
            isValid: true,
          },
          assets: {
            ...personalInformation.assets,
            value: patientData.assets || "",
            isTouched: false,
            isValid: true,
          },
          badPoints: {
            ...personalInformation.badPoints,
            value: patientData.badPoints || "",
            isTouched: false,
            isValid: true,
          },
          socialDifficulties: {
            ...personalInformation.socialDifficulties,
            value: patientData.socialDifficulties || "",
            isTouched: false,
            isValid: true,
          },
          loveSexDifficulties: {
            ...personalInformation.loveSexDifficulties,
            value: patientData.loveSexDifficulties || "",
            isTouched: false,
            isValid: true,
          },
          schoolWorkDifficulties: {
            ...personalInformation.schoolWorkDifficulties,
            value: patientData.schoolWorkDifficulties || "",
            isTouched: false,
            isValid: true,
          },
          lifeGoals: {
            ...personalInformation.lifeGoals,
            value: patientData.lifeGoals || "",
            isTouched: false,
            isValid: true,
          },
          thingsToChange: {
            ...personalInformation.thingsToChange,
            value: patientData.thingsToChange || "",
            isTouched: false,
            isValid: true,
          },
          occupationTrained: {
            ...personalInformation.occupationTrained,
            value: patientData.occupationTrained || "",
            isTouched: false,
            isValid: true,
          },
          occupation: {
            ...personalInformation.occupation,
            value: patientData.occupation || "",
            isTouched: false,
            isValid: true,
          },
          occupationFullTime: {
            ...personalInformation.occupationFullTime,
            value: patientData.occupationFullTime || "",
            isTouched: false,
            isValid: true,
          },
        });

 setIsLoading(false);

  }
}
  // Load mock data based on id
  useEffect(() => {
    if (id) {

      loadPersonalInformationData();
        setMode("edit");
      
    }
  }, [id]);

const [goodPointsOptions,setGoodPointsOptions]=useState([]);
const [badPointsOptions,setBadPointsOptions]=useState([]);
const [occupations,setOccupations]=useState([]);

useEffect(()=>{
loadDropdowns();
},[])


const loadDropdowns=async()=>{
  const goodPointsOptions=await getGoodPointsOptionsData();
  setGoodPointsOptions(goodPointsOptions.data);

  const badPoints=await getBadPointsOptions();
  setBadPointsOptions(badPoints.data);

  const occupations=await getOccupations();
  setOccupations(occupations.data);

}

  // Store initial state when entering edit mode
  useEffect(() => {

      setInitialPersonalInformation({ ...personalInformation });
    
  }, [editingSection]);
  
  // Toggle edit mode for a specific section
  const toggleSectionEdit =async (section) => {

    if (editingSection === section) {
     const isValid=await handleSubmitp(section);
      console.log("isValidoo.",isValid);
     if(isValid)
      setEditingSection(null);

    } else {
      setEditingSection(section);
    }
  };


  const handleSubmitp =async (section) => {
  
setIsSaving(true);
    const isValid = validatePersonalInformation();
    if (!isValid) {
      console.log("Validation failed, not saving.");
       setIsSaving(false);
      return false;
    }


    const payload = {
    };
    Object.entries(personalInformation).forEach(([key, field]) => {
     // console.log("field.",field);
      if (field.isTouched) {
        payload[key] = field.value;
      }
    });

    console.log("Save Payload:", payload);
    try{
      const res=await updatePersonalInformationData(id,payload);
        //await loadPersonalInformationData();
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
      //setPersonalInformation(initialPersonalInformation);
      setIsSaving(false);
      return false;
    }


  };

  // Validate individual field
  const validateField = (name, value, required, dataType) => {
    if (required && value.trim() === "") {
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
  const handleChangePersonalInfo = (e) => {
    const { name, value } = e.target;
    const { required, dataType } = personalInformation[name];
    const error = validateField(personalInformation[name].label, value, required, dataType);

    setPersonalInformation((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        isTouched: true,
        isValid: error === "",
      },
    }));

    setPersonalInformationErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    // Update yearsMarried requirement based on maritalStatus
    if (name === "maritalStatus") {
      const isMarriedNow = value === "married_first_time" || value === "married_second_time";
      setPersonalInformation((prev) => ({
        ...prev,
        yearsMarried: {
          ...prev.yearsMarried,
          required: isMarriedNow,
          isValid: !isMarriedNow || prev.yearsMarried.value.trim() !== "",
        },
      }));

      setPersonalInformationErrors((prev) => ({
        ...prev,
        yearsMarried: isMarriedNow && !prev.yearsMarried?.value ? "Number of Years Married is required for current marriage" : "",
      }));
    }
  };

  // Handle DescriptionInput changes
  const handleDescriptionChange = (fieldName, value) => {
    const { required, dataType } = personalInformation[fieldName];
    const error = validateField(personalInformation[fieldName].label, value, required, dataType);

    setPersonalInformation((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value: dataType === "array" ? value.split(";;").filter((item) => item.trim()) : value,
        isTouched: true,
        isValid: error === "",
      },
    }));

    setPersonalInformationErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  // Handle occupation status change
  const handleOccupationStatusChange = (e) => {
    const value = e.target.value;
    setPersonalInformation((prev) => ({
      ...prev,
      occupationFullTime: {
        ...prev.occupationFullTime,
        value,
        isTouched: true,
        isValid: true,
      },
    }));
    setPersonalInformationErrors((prev) => ({
      ...prev,
      occupationFullTime: "",
    }));
  };

  // Validate entire form
  const validatePersonalInformation = () => {
    const errors = {};
    let isFormValid = true;
    const updatedInfo = { ...personalInformation };

    Object.entries(personalInformation).forEach(([key, field]) => {
      if (!field || typeof field !== "object" || !("value" in field)) return;

      const { value, required, dataType } = field;
      let errorMessage = validateField(field.label, value, required, dataType);

      if (key === "yearsMarried" && (["married_first_time", "married_second_time"].includes(personalInformation.maritalStatus.value))) {
        if (!value || value.trim() === "") {
          errorMessage = "Number of Years Married is required for current marriage";
        }
      }

      if (errorMessage) {
        isFormValid = false;
        errors[key] = errorMessage;
        updatedInfo[key].isValid = false;
      } else {
        updatedInfo[key].isValid = true;
      }

      //updatedInfo[key].isTouched = true;
      updatedInfo[key].isTouched = updatedInfo[key].isTouched || false;
    });

    setPersonalInformation(updatedInfo);
    setPersonalInformationErrors(errors);
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
  const handleSubmitPersonalInformation = async (e) => {
    e.preventDefault();
    const isValid = validatePersonalInformation();
    console.log("isValid", isValid);
    if (isValid) {
      const submitPayload = generateSubmitPayload(personalInformation);
      console.log(submitPayload);
      setMode("edit");
      setActiveTab("family");
    }
  };


    // Function to handle cancel action
  const handleCancel = (editingSection) => {

    if (initialPersonalInformation) {
      setPersonalInformation(initialPersonalInformation);
      setPersonalInformationErrors({});

    }
    
    
    setEditingSection(null); // Exit edit mode
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
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    );
  };



  return (
    <>
     <MessageModel
        isOpen={modal.isOpen}
        onClose={() => setModal({ isOpen: false, message: "", type: "error" })}
        message={modal.message}
        type={modal.type}
      />
   
 {!isLoading ?
    <div className="px-8">

      {/* Personal Details */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-2  pb-2">
          <h3 className="text-2xl font-semibold text-gray-700">Personal Details</h3>
          {mode !== "add" && (
          
                 <div className="flex space-x-4">
                        <button
                          onClick={() => toggleSectionEdit("personalDetails")}
                          className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                          aria-label={
                            editingSection === "personalDetails"
                              ? "Save Personal Details"
                              : "Edit Personal Details"
                          }
                          disabled={isSaving}
                        >
                          <FaEdit className="mr-2" />
                         {editingSection === "personalDetails" ? (isSaving ? "Saving...": "Save") : "Edit"}
                        </button>
                        {editingSection === "personalDetails" && (
                          <button
                            onClick={()=>handleCancel("personalDetails")}
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
        {editingSection === "personalDetails" || mode === "add" ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Present Marital Status</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {maritalStatusOptions.map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="maritalStatus"
                      value={option.value}
                      checked={personalInformation.maritalStatus.value === option.value}
                      onChange={handleChangePersonalInfo}
                      className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                      aria-label={option.text}
                    />
                    <span className="ml-2 text-sm text-gray-700">{option.text}</span>
                  </label>
                ))}
              </div>
              {personalInformationErrors.maritalStatus && (
                <p className="mt-1 text-sm text-red-600">{personalInformationErrors.maritalStatus}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of Years Married to Present Spouse
                </label>
                <input
                  type="number"
                  name="yearsMarried"
                  value={personalInformation.yearsMarried.value}
                  onChange={handleChangePersonalInfo}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter years"
                  disabled={!(
                    ["married_first_time", "married_second_time"].includes(personalInformation.maritalStatus.value)
                  )}
                  aria-label="Years married"
                />
                {personalInformationErrors.yearsMarried && (
                  <p className="mt-1 text-sm text-red-600">{personalInformationErrors.yearsMarried}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ages of Male Children</label>
                <input
                  name="maleChildrenAges"
                  value={personalInformation.maleChildrenAges.value}
                  onChange={handleChangePersonalInfo}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="e.g., 5, 10, 15"
                  aria-label="Male children ages"
                />
                {personalInformationErrors.maleChildrenAges && (
                  <p className="mt-1 text-sm text-red-600">{personalInformationErrors.maleChildrenAges}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ages of Female Children</label>
                <input
                  name="femaleChildrenAges"
                  value={personalInformation.femaleChildrenAges.value}
                  onChange={handleChangePersonalInfo}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="e.g., 3, 8"
                  aria-label="Female children ages"
                />
                {personalInformationErrors.femaleChildrenAges && (
                  <p className="mt-1 text-sm text-red-600">{personalInformationErrors.femaleChildrenAges}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2 mx-20">
                <label className="block text-sm font-medium text-gray-700">
                  How religious are you? (1 = Very Religious, 5 = Average, 9 = Atheist)
                </label>
                <div className="mt-2 flex items-start justify-between">
                  <div className="flex w-full justify-between">
                    <span className="text-xs text-gray-600 -ml-1">Very</span>
                    <span className="text-xs text-gray-600">Average</span>
                    <span className="text-xs text-gray-600 -mr-1">Atheist</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1 space-x-1">
                  {[...Array(9)].map((_, i) => {
                    const value = (i + 1).toString();
                    return (
                      <label key={value} className="flex flex-col items-center">
                        <input
                          type="radio"
                          name="religiosity"
                          value={value}
                          checked={personalInformation.religiosity.value === value}
                          onChange={handleChangePersonalInfo}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 custom-radio"
                          aria-label={`Religiosity level ${value}`}
                        />
                        <span className="mt-1 text-sm text-gray-700">{value}</span>
                      </label>
                    );
                  })}
                </div>
                {personalInformationErrors.religiosity && (
                  <p className="mt-1 text-sm text-red-600">{personalInformationErrors.religiosity}</p>
                )}
              </div>
            </div>
          </div>
        ) : (
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border-gray-200 rounded-lg p-4 border-2  ">
      <div className="mr-5">
        <div className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-b-0">
          <span className="font-bold text-sm w-1/3">Present Marital Status</span>
          <span className="text-gray-700 text-sm w-2/3 text-right">
            {maritalStatusOptions.find((opt) => opt.value === personalInformation.maritalStatus.value)?.text || "N/A"}
          </span>
        </div>
        <div className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-b-0">
          <span className="font-bold text-sm w-2/3">Number of Years Married to Present Spouse</span>
          <span className="text-gray-700 text-sm w-1/3 text-right">{personalInformation.yearsMarried.value || "N/A"}</span>
        </div>
        <div className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-b-0">
          <span className="font-bold text-sm w-1/3">Ages of Male Children</span>
          <span className="text-gray-700 text-sm w-2/3 text-right">{personalInformation.maleChildrenAges.value || "N/A"}</span>
        </div>
      </div>
      <div className="ml-5">
        <div className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-b-0">
          <span className="font-bold text-sm w-1/3">Ages of Female Children</span>
          <span className="text-gray-700 text-sm w-2/3 text-right">{personalInformation.femaleChildrenAges.value || "N/A"}</span>
        </div>
        <div className="flex justify-between items-center py-2.5 border-gray-200 last:border-b-0">
          <span className="font-bold text-sm w-2/3">How religious are you?</span>
          <span className="text-gray-700 text-sm w-1/3 text-right">
            {personalInformation.religiosity.value
              ? `${personalInformation.religiosity.value}`
              : "N/A"}
          </span>
        </div>

         <div className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-b-0">
          <span className="text-sm w-2/3">(1 = Very Religious, 5 = Average, 9 = Atheist)</span>
        </div>

      </div>
    </div>
        )}
      </section>

      {/* Personal Insights */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-2 pb-2">
          <h3 className="text-2xl font-semibold text-gray-700">Personal Insights</h3>
          {mode !== "add" && (

   <div className="flex space-x-4">
                        <button
                          onClick={() => toggleSectionEdit("insights")}
                          className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                          aria-label={
                            editingSection === "insights"
                              ? "Save Personal Insights"
                              : "Edit Personal Insights"
                          }
                            disabled={isSaving}
                        >
                          <FaEdit className="mr-2" />
                           {editingSection === "insights" ? (isSaving ? "Saving...": "Save") : "Edit"}
                        </button>
                        {editingSection === "insights" && (
                          <button
                            onClick={()=>handleCancel("insights")}
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
        {editingSection === "insights" || mode === "add" ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                List the things you like to do most, kinds of things and persons that give you pleasure
              </label>
              <textarea
                name="thingsLiked"
                value={personalInformation.thingsLiked.value}
                onChange={handleChangePersonalInfo}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="4"
                placeholder="Describe your interests and pleasures"
                aria-label="Things liked"
              />
              {personalInformationErrors.thingsLiked && (
                <p className="mt-1 text-sm text-red-600">{personalInformationErrors.thingsLiked}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <DescriptionInput
                  patient={personalInformation}
                  setValue={(value) => {
                    handleDescriptionChange("assets", value);
                  }}
                  setPatient={(newPatient) => {
                    setPersonalInformation(newPatient);
                  }}
                  isEditing={editingSection === "insights" || mode === "add"}
                  fieldName="assets"
                  label="List your main assets and good points"
                  placeholder="Select or enter your strengths"
                  descriptionOptions={goodPointsOptions}
                  isTypeable={false}
                />
                {personalInformationErrors.assets && (
                  <p className="mt-1 text-sm text-red-600">{personalInformationErrors.assets}</p>
                )}
              </div>
              <div>
                <DescriptionInput
                  patient={personalInformation}
                  setValue={(value) => {
                    handleDescriptionChange("badPoints", value);
                  }}
                  setPatient={(newPatient) => {
                    setPersonalInformation(newPatient);
                  }}
                  isEditing={editingSection === "insights" || mode === "add"}
                  fieldName="badPoints"
                  label="List your main bad points"
                  placeholder="Select or enter your weaknesses"
                  descriptionOptions={badPointsOptions}
                  isTypeable={false}
                />
                {personalInformationErrors.badPoints && (
                  <p className="mt-1 text-sm text-red-600">{personalInformationErrors.badPoints}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                List your main social difficulties
              </label>
              <textarea
                name="socialDifficulties"
                value={personalInformation.socialDifficulties.value}
                onChange={handleChangePersonalInfo}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="4"
                placeholder="Describe social challenges"
                aria-label="Social difficulties"
              />
              {personalInformationErrors.socialDifficulties && (
                <p className="mt-1 text-sm text-red-600">{personalInformationErrors.socialDifficulties}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                List your main love and sex difficulties
              </label>
              <textarea
                name="loveSexDifficulties"
                value={personalInformation.loveSexDifficulties.value}
                onChange={handleChangePersonalInfo}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="4"
                placeholder="Describe relationship challenges"
                aria-label="Love and sex difficulties"
              />
              {personalInformationErrors.loveSexDifficulties && (
                <p className="mt-1 text-sm text-red-600">{personalInformationErrors.loveSexDifficulties}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                List your main school or work difficulties
              </label>
              <textarea
                name="schoolWorkDifficulties"
                value={personalInformation.schoolWorkDifficulties.value}
                onChange={handleChangePersonalInfo}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="4"
                placeholder="Describe professional/academic challenges"
                aria-label="School or work difficulties"
              />
              {personalInformationErrors.schoolWorkDifficulties && (
                <p className="mt-1 text-sm text-red-600">{personalInformationErrors.schoolWorkDifficulties}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">List your main life goals</label>
              <textarea
                name="lifeGoals"
                value={personalInformation.lifeGoals.value}
                onChange={handleChangePersonalInfo}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="4"
                placeholder="List your life goals"
                aria-label="Life goals"
              />
              {personalInformationErrors.lifeGoals && (
                <p className="mt-1 text-sm text-red-600">{personalInformationErrors.lifeGoals}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                List the things about yourself you would most like to change
              </label>
              <textarea
                name="thingsToChange"
                value={personalInformation.thingsToChange.value}
                onChange={handleChangePersonalInfo}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="4"
                placeholder="Describe desired changes"
                aria-label="Things to change"
              />
              {personalInformationErrors.thingsToChange && (
                <p className="mt-1 text-sm text-red-600">{personalInformationErrors.thingsToChange}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className=" bg-white border border-gray-200 rounded-lg p-4">
              <strong className="text-sm">Things Liked:</strong>
                  <div className="mt-2"> 
              <p className="text-gray-700 mt-1">{personalInformation.thingsLiked.value || "N/A"}</p>
              </div>
            </div>
               <div className=" bg-white border border-gray-200 rounded-lg p-4">
              <strong className="text-sm">Main assets and good points:</strong>
                  <div className="mt-2"> 
                {renderListItems(personalInformation.assets.value)}
              </div>
            </div>
                 <div className=" bg-white border border-gray-200 rounded-lg p-4">
              <strong className="text-sm">Main bad points:</strong>
                <div className="mt-2"> 
                {renderListItems(personalInformation.badPoints.value)}
              </div>
            </div>
                 <div className=" bg-white border border-gray-200 rounded-lg p-4">
              <strong className="text-sm">Main Social Difficulties:</strong>
                 <div className="mt-2"> 
              <p className="text-gray-700 mt-1">{personalInformation.socialDifficulties.value || "N/A"}</p>
           </div>
            </div>
              <div className=" bg-white border border-gray-200 rounded-lg p-4">
              <strong className="text-sm">Main Love/Sex Difficulties:</strong>
                <div className="mt-2"> 
              <p className="text-gray-700 mt-1">{personalInformation.loveSexDifficulties.value || "N/A"}</p>
            </div>
            </div>
             <div className=" bg-white border border-gray-200 rounded-lg p-4">
              <strong className="text-sm">Main School or Work Difficulties:</strong>
                <div className="mt-2"> 
                     <p className="text-gray-700 mt-1">{personalInformation.schoolWorkDifficulties.value || "N/A"}</p>
          </div>
           </div>
            <div className=" bg-white border border-gray-200 rounded-lg p-4">
              <strong className="text-sm">Main Life Goals:</strong>
                <div className="mt-2"> 
              <p className="text-gray-700 mt-1">{personalInformation.lifeGoals.value || "N/A"}</p>
              </div>
            </div>
            <div className=" bg-white border border-gray-200 rounded-lg p-4">
              <strong className="text-sm">Things Most Like to Change:</strong>
                <div className="mt-2"> 
              <p className="text-gray-700 mt-1">{personalInformation.thingsToChange.value || "N/A"}</p>
           </div>
            </div>
          </div>
        )}
      </section>

      {/* Occupation Information */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-2  pb-2">
          <h3 className="text-2xl font-semibold text-gray-700">Occupation Information</h3>
          {mode !== "add" && (

   <div className="flex space-x-4">
                        <button
                          onClick={() => toggleSectionEdit("occupation")}
                          className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                          aria-label={
                            editingSection === "occupation"
                              ? "Save Occupation Info"
                              : "Edit Occupation Info"
                          }
                            disabled={isSaving}
                        >
                          <FaEdit className="mr-2" />
                          {editingSection === "occupation" ? (isSaving ? "Saving...": "Save") : "Edit"}
                        </button>
                        {editingSection === "occupation" && (
                          <button
                            onClick={()=>handleCancel("occupation")}
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
        {editingSection === "occupation" || mode === "add" ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  What occupation(s) have you mainly been trained for?
                </label>
                <select
                  name="occupationTrained"
                  value={personalInformation.occupationTrained.value}
                  onChange={handleChangePersonalInfo}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  aria-label="Occupation trained for"
                >
                  <option value="">Select occupation</option>
                  {occupations.map((occupation) => (
                    <option key={occupation.id} value={occupation.name}>
                      {occupation.name}
                    </option>
                  ))}
                </select>
                {personalInformationErrors.occupationTrained && (
                  <p className="mt-1 text-sm text-red-600">{personalInformationErrors.occupationTrained}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Present Occupation</label>
                <select
                  name="occupation"
                  value={personalInformation.occupation.value}
                  onChange={handleChangePersonalInfo}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  aria-label="Present occupation"
                >
                  <option value="">Select occupation</option>
                  {occupations.map((occupation) => (
                    <option key={occupation.id} value={occupation.name}>
                      {occupation.name}
                    </option>
                  ))}
                </select>
                {personalInformationErrors.occupation && (
                  <p className="mt-1 text-sm text-red-600">{personalInformationErrors.occupation}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Occupation Status</label>
                <div className="flex items-center space-x-4 mt-5">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="occupationFullTime"
                      value="full-time"
                      checked={personalInformation.occupationFullTime.value === "full-time"}
                      onChange={handleOccupationStatusChange}
                      className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                      aria-label="Full-time"
                    />
                    <span className="ml-2 text-sm text-gray-700">Full-time</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="occupationFullTime"
                      value="part-time"
                      checked={personalInformation.occupationFullTime.value === "part-time"}
                      onChange={handleOccupationStatusChange}
                      className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                      aria-label="Part-time"
                    />
                    <span className="ml-2 text-sm text-gray-700">Part-time</span>
                  </label>
                </div>
                {personalInformationErrors.occupationFullTime && (
                  <p className="mt-1 text-sm text-red-600">{personalInformationErrors.occupationFullTime}</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
  <div className="border-2 bg-white  border-gray-200 rounded-lg p-4 ">
    <div className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-b-0">
      <span className="font-bold text-sm w-1/2">What occupation(s) have you mainly been trained for?</span>
      <span className="text-gray-700 text-sm w-1/2 text-right">
        {personalInformation.occupationTrained.value || "N/A"}
      </span>
    </div>
    <div className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-b-0">
      <span className="font-bold text-sm w-1/3">Present Occupation</span>
      <span className="text-gray-700 text-sm w-2/3 text-right">
        {personalInformation.occupation.value || "N/A"}
      </span>
    </div>
    <div className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-b-0">
      <span className="font-bold text-sm w-1/3">Occupation Status</span>
      <span className="text-gray-700 text-sm w-2/3 text-right">
        {personalInformation.occupationFullTime.value || "N/A"}
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
            onClick={handleSubmitPersonalInformation}
            className="flex items-center bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition-all duration-200 shadow-md"
            aria-label="Save and go to next tab"
          >
            Save & Next
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

export default PersonalInformation;
