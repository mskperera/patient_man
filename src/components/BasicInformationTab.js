import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { addBasicInformationData, getBasicInformationData, updateBasicInformationData } from "../data/mockData";
import LoadingSpinner from "./LoadingSpinner";
import MessageModel from "./MessageModel";
import { getPatientBasicInfo } from "../functions/patient";
import moment from "moment";

const BasicInformationTab = ({ id,setNewId }) => {


  const [basicInformationErrors, setBasicInformationErrors] = useState({});
  const [mode, setMode] = useState("add");
  const [editingSection, setEditingSection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
   const [isSaving, setIsSaving] = useState(false);
  const [initialBasicInformation, setInitialBasicInformation] = useState(null); // Store initial state for cancel
 const [modal, setModal] = useState({ isOpen: false, message: "", type: "error" });

  const [basicInformation, setBasicInformation] = useState({
    patientNo: {
      label: "Patient ID",
      value: "NEW",
      isTouched: false,
      isValid: false,
      required: true,
      dataType: "string",
    },
    firstName: {
      label: "First Name",
      value: "",
      isTouched: false,
      isValid: false,
      required: true,
      dataType: "string",
    },
    lastName: {
      label: "Last Name",
      value: "",
      isTouched: false,
      isValid: false,
      required: true,
      dataType: "string",
    },
    middleName: {
      label: "Middle Name",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "string",
    },
    dob: {
      label: "Date of Birth",
      value: "",
      isTouched: false,
      isValid: false,
      required: true,
      dataType: "date",
    },
    age: {
      label: "Age",
      value: "",
      isTouched: false,
      isValid: false,
      required: true,
      dataType: "number",
    },
    gender: {
      label: "Gender",
      value: "",
      isTouched: false,
      isValid: false,
      required: true,
      dataType: "string",
    },
    email: {
      label: "Email",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "email",
    },
    homePhone: {
      label: "Home Phone",
      value: "",
      isTouched: false,
      isValid: false,
      required: true,
      dataType: "phone",
    },
    businessPhone: {
      label: "Business Phone",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "phone",
    },
    permanentAddress: {
      label: "Permanent Address",
      value: "",
      isTouched: false,
      isValid: false,
      required: true,
      dataType: "string",
    },
    referralSource: {
      label: "Referral Source",
      value: "",
      isTouched: false,
      isValid: false,
      required: true,
      dataType: "string",
    },
    referralPartyPresent: {
      label: "Referral Party Present",
      value: "",
      isTouched: false,
      isValid: false,
      required: true,
      dataType: "string",
    },
  });



  const loadBasicInformationData = async () => {
    setIsLoading(true);
   // const result = await getBasicInformationData(id);
    const result = await getPatientBasicInfo(id);

    const patientData = result.data;

      if(patientData.error){
    console.log('patientData.error',patientData.error)
     setModal({
        isOpen: true,
        message: patientData.error.message,
        type: "error",
      });
  }
  
    //console.log('patientData', patientData.patientNo);
    if (patientData) {
      setBasicInformation({
        patientNo: {
          ...basicInformation.patientNo,
          value: patientData.patientNo || '',
          isTouched: false,
          isValid: true,
        },
        firstName: {
          ...basicInformation.firstName,
          value: patientData.firstName,
          isTouched: false,
          isValid: true,
        },
        lastName: {
          ...basicInformation.lastName,
          value: patientData?.lastName || '',
         isTouched: false,
          isValid: true,
        },
        middleName: {
          ...basicInformation.middleName,
          value: patientData.middleName,
          isTouched: false,
          isValid: true,
        },
        dob: {
          ...basicInformation.dob,
          value: patientData.dateOfBirth,
          isTouched: false,
          isValid: true,
        },
        age: {
          ...basicInformation.age,
          value: patientData.age,
          isTouched: false,
          isValid: true,
        },
        gender: {
          ...basicInformation.gender,
          value: patientData.gender,
         isTouched: false,
          isValid: true,
        },
        email: {
          ...basicInformation.email,
          value: patientData.email,
         isTouched: false,
          isValid: true,
        },
        homePhone: {
          ...basicInformation.homePhone,
          value: patientData.homePhone,
          isTouched: false,
          isValid: true,
        },
        businessPhone: {
          ...basicInformation.businessPhone,
          value: patientData.businessPhone,
         isTouched: false,
          isValid: true,
        },
        permanentAddress: {
          ...basicInformation.permanentAddress,
          value: patientData.permanentAddress,
        isTouched: false,
          isValid: true,
        },
        referralSource: {
          ...basicInformation.referralSource,
          value: patientData.referralSource,
       isTouched: false,
          isValid: true,
        },
        referralPartyPresent: {
          ...basicInformation.referralPartyPresent,
          value: patientData.referralPartyPresent,
         isTouched: false,
          isValid: true,
        },
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      loadBasicInformationData();
      setMode("edit");
    }
  }, [id]);


  useEffect(() => {
    if (editingSection === "basic") {
      setInitialBasicInformation({ ...basicInformation });
    }
  }, [editingSection]);

  const toggleSectionEdit =async (section) => {
    if (editingSection === section) {
      const isValid=await handleSubmitp(section);
      if(isValid)
      setEditingSection(null);

    } else {
      setEditingSection(section);
    }
  };


  const handleCancel = () => {
    if (initialBasicInformation) {
      setBasicInformation(initialBasicInformation); // Restore initial state
      setBasicInformationErrors({}); // Clear errors
    }
    setEditingSection(null); // Exit edit mode
  };

  // Modified handleSubmit to handle section-specific saving
  const handleSubmitp = async (section) => {
setIsSaving(true);
      // Validate the form before saving
    const isValid = validateBasicInformation();
    if (!isValid) {
      console.log("Validation failed, not saving.");
      setIsSaving(false);
      return false;
    }

    // Generate payload with only touched fields and add status
    const payload = {};
    Object.entries(basicInformation).forEach(([key, field]) => {
     // console.log("field.",field);
      if (field.isTouched) {
        payload[key] = field.value;
      }
    });

    console.log("Save Payload:", payload);

    try{
   const res=await updateBasicInformationData(id,payload);
   await loadBasicInformationData();
     console.log("update result:", res);
     setIsSaving(false);

    return true;
    }
    catch(err){


   console.log("Save Payload: err", err.message);
      setModal({
        isOpen: true,
        message: err.message,
        type: "error",
      });
  // setBasicInformation(initialBasicInformation); // Restore initial state
      setIsSaving(false);
      return false;
    }
    // const savedPatientId = mode === "add" ? Date.now().toString() : "patientNo";
    // if (mode === "add") {
    //   navigate(`/patients/${savedPatientId}`);
    // }
  };

  const validateField = (name, value, required) => {
    if (required && value.trim() === "") {
      return `${name} is required`;
    }
    return "";
  };

  const handleChangeBasicInfo = (e) => {
    const { name, value } = e.target;
    console.log('handlechangebais', name, value);
    const required = basicInformation[name].required;
    const error = validateField(basicInformation[name].label, value, required);

    const updatedInfo = {
      ...basicInformation,
      [name]: {
        ...basicInformation[name],
        value,
        isTouched: true,
        isValid: error === "",
      },
    };

    if (name === "dob") {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      updatedInfo["age"] = {
        ...basicInformation["age"],
        value: age.toString(),
        isTouched: true,
        isValid: true,
      };
    }

    setBasicInformation(updatedInfo);
    setBasicInformationErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateBasicInformation = () => {
    const errors = {};
    let isFormValid = true;

    const updatedInfo = { ...basicInformation };

    Object.entries(basicInformation).forEach(([key, field]) => {
      if (!field || typeof field !== "object" || !("value" in field)) return;

      const { value, required, dataType } = field;
      let errorMessage = "";

      if (required && (!value || value.toString().trim() === "")) {
        errorMessage = `${field.label} is required.`;
      }

      if (!errorMessage && value) {
        switch (dataType) {
          case "email":
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
              errorMessage = "Invalid email address.";
            }
            break;
          case "number":
            if (isNaN(value)) {
              errorMessage = `${field.label} must be a number.`;
            }
            break;
          case "date":
            if (isNaN(Date.parse(value))) {
              errorMessage = "Invalid date format.";
            }
            break;
          case "phone":
            const phoneRegex = /^[0-9]{10,15}$/;
            if (!phoneRegex.test(value)) {
              errorMessage = "Invalid phone number.";
            }
            break;
          case "boolean":
            if (typeof value !== "boolean") {
              errorMessage = `${field.label} must be true or false.`;
            }
            break;
          default:
            break;
        }
      }

      if (errorMessage) {
        isFormValid = false;
        errors[key] = errorMessage;
        updatedInfo[key].isValid = false;
      } else {
        updatedInfo[key].isValid = true;
      }

    //  updatedInfo[key].isTouched = true;
    updatedInfo[key].isTouched = updatedInfo[key].isTouched || false;
    });

    setBasicInformation(updatedInfo);
    setBasicInformationErrors(errors);
    return isFormValid;
  };

  const generateSubmitPayload = (infoObject) => {
    const payload = {};
    for (const key in infoObject) {
      if (infoObject.hasOwnProperty(key)) {
        payload[key] = infoObject[key].value;
      }
    }
    return payload;
  };

  const handleSubmitBasicInformation =async (e) => {
    e.preventDefault();
       setIsSaving(true);
    const isValid = validateBasicInformation();
    console.log("isValid", isValid);

if(!isValid){
  setIsSaving(false);
  return;
}

      const submitPayload = generateSubmitPayload(basicInformation);
      try{
      
    const res=await addBasicInformationData(submitPayload);
setNewId(res.newId);
      console.log(submitPayload);
      setMode("edit");
       setIsSaving(false);
      }
      catch(err){
         console.log("Save Payload: err", err.message);
      setModal({
        isOpen: true,
        message: err.message,
        type: "error",
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
    <div className="px-8">
      <section className="mb-4">
        <div className="flex justify-between items-center mb-2 pb-2">
          <h3 className="text-2xl font-semibold text-gray-800">
            Basic Information
          </h3>
          {mode !== "add" && (
            <div className="flex space-x-4">
              <button
                onClick={() => toggleSectionEdit("basic")}
                className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                aria-label={
                  editingSection === "basic"
                    ? "Save Basic Info"
                    : "Edit Basic Info"
                }
                disabled={isSaving}
              >
                <FaEdit className="mr-2" />
                {editingSection === "basic" ? (isSaving ? "Saving...": "Save") : "Edit"}
              </button>
              {editingSection === "basic" && (
                <button
                  onClick={handleCancel}
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
        {editingSection === "basic" || mode === "add" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
  <label className="block text-sm font-medium text-gray-700">
    Last Name {basicInformation.lastName.required && <span className="text-red-500">*</span>}
  </label>
  <input
    name="lastName"
    value={basicInformation.lastName.value}
    onChange={handleChangeBasicInfo}
    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
    placeholder="Enter last name"
    aria-label="Last name"
    required
  />
  {basicInformationErrors.lastName && (
    <p className="mt-1 text-sm text-red-600">
      {basicInformationErrors.lastName}
    </p>
  )}
</div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name {basicInformation.firstName.required && <span className="text-red-500">*</span>}
              </label>
              <input
                name="firstName"
                value={basicInformation.firstName.value}
                onChange={handleChangeBasicInfo}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                placeholder="Enter first name"
                aria-label="First name"
              />
              {basicInformationErrors.firstName && (
                <p className="mt-1 text-sm text-red-600">
                  {basicInformationErrors.firstName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Middle Name  {basicInformation.middleName.required && <span className="text-red-500">*</span>}
              </label>
              <input
                name="middleName"
                value={basicInformation.middleName.value}
                onChange={handleChangeBasicInfo}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                placeholder="Enter middle name"
                aria-label="Middle name"
              />
              {basicInformationErrors.middleName && (
                <p className="mt-1 text-sm text-red-600">
                  {basicInformationErrors.middleName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth {basicInformation.dob.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type="date"
                name="dob"
                value={basicInformation.dob.value}
                onChange={handleChangeBasicInfo}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                aria-label="Date of birth"
              />
              {basicInformationErrors.dob && (
                <p className="mt-1 text-sm text-red-600">
                  {basicInformationErrors.dob}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age  {basicInformation.age.required && <span className="text-red-500">*</span>}
              </label>
              <div className="flex items-center gap-2 p-3 border text-sm border-gray-300 rounded-md bg-gray-50">
                <span className="text-gray-900 text-base font-medium">
                  {basicInformation.age.value || "--"}
                </span>
                <span className="text-gray-600 text-sm">Years</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sex{basicInformation.gender.required && <span className="text-red-500">*</span>}
              </label>
              <div className="flex space-x-4 mt-1">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={basicInformation.gender.value === "Male"}
                    onChange={handleChangeBasicInfo}
                    className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                    aria-label="Male"
                  />
                  <span className="ml-2 text-sm text-gray-700">Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={basicInformation.gender.value === "Female"}
                    onChange={handleChangeBasicInfo}
                    className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                    aria-label="Female"
                  />
                  <span className="ml-2 text-sm text-gray-700">Female</span>
                </label>
              </div>
              {basicInformationErrors.gender && (
                <p className="mt-1 text-sm text-red-600">
                  {basicInformationErrors.gender}
                </p>
              )}
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Permanent Address{basicInformation.permanentAddress.required && <span className="text-red-500">*</span>}
              </label>
              <textarea
                name="permanentAddress"
                value={basicInformation.permanentAddress.value}
                onChange={handleChangeBasicInfo}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                rows="3"
                placeholder="Enter permanent address"
                aria-label="Permanent address"
              />
              {basicInformationErrors.permanentAddress && (
                <p className="mt-1 text-sm text-red-600">
                  {basicInformationErrors.permanentAddress}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Home Phone{basicInformation.homePhone.required && <span className="text-red-500">*</span>}
              </label>
              <input
                name="homePhone"
                value={basicInformation.homePhone.value}
                onChange={handleChangeBasicInfo}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                placeholder="Enter home phone"
                aria-label="Home phone"
              />
              {basicInformationErrors.homePhone && (
                <p className="mt-1 text-sm text-red-600">
                  {basicInformationErrors.homePhone}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business Phone{basicInformation.businessPhone.required && <span className="text-red-500">*</span>}
              </label>
              <input
                name="businessPhone"
                value={basicInformation.businessPhone.value}
                onChange={handleChangeBasicInfo}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                placeholder="Enter business phone"
                aria-label="Business phone"
              />
              {basicInformationErrors.businessPhone && (
                <p className="mt-1 text-sm text-red-600">
                  {basicInformationErrors.businessPhone}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email{basicInformation.email.required && <span className="text-red-500">*</span>}
              </label>
              <input
                name="email"
                type="email"
                value={basicInformation.email.value}
                onChange={handleChangeBasicInfo}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                placeholder="Enter Email"
                aria-label="Email"
              />
              {basicInformationErrors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {basicInformationErrors.email}
                </p>
              )}
            </div>
            <div className="col-span-3 mt-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    Who referred you to the Institute?{basicInformation.referralSource.required && <span className="text-red-500">*</span>}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                    {[
                      "Self",
                      "School or Teacher",
                      "Psychologist or Psychiatrist",
                      "Social Agency",
                      "Hospital or Clinic",
                      "Family Doctor",
                      "Friend",
                      "Relative",
                      "Other",
                    ].map((source) => (
                      <label key={source} className="flex items-center">
                        <input
                          type="radio"
                          name="referralSource"
                          value={source.toLowerCase()}
                          checked={
                            basicInformation.referralSource.value ===
                            source.toLowerCase()
                          }
                          onChange={handleChangeBasicInfo}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                          aria-label={source}
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {source}
                        </span>
                      </label>
                    ))}
                    {basicInformationErrors.referralSource && (
                      <p className="mt-1 text-sm text-red-600">
                        {basicInformationErrors.referralSource}
                      </p>
                    )}
                  </div>
                  {basicInformation.referralSource.value === "other" && (
                    <input
                      name="referralSourceOther"
                      value={basicInformation.referralSourceOther?.value || ""}
                      onChange={handleChangeBasicInfo}
                      className="mt-3 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Please specify"
                      aria-label="Other referral source"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Has this party been here?{basicInformation.referralPartyPresent.required && <span className="text-red-500">*</span>}
                  </label>
                  <div className="flex space-x-4 mt-1">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="referralPartyPresent"
                        value="Yes"
                        checked={
                          basicInformation.referralPartyPresent.value === "Yes"
                        }
                        onChange={handleChangeBasicInfo}
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                        aria-label="Yes"
                      />
                      <span className="ml-2 text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="referralPartyPresent"
                        value="No"
                        checked={
                          basicInformation.referralPartyPresent.value === "No"
                        }
                        onChange={handleChangeBasicInfo}
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                        aria-label="No"
                      />
                      <span className="ml-2 text-sm text-gray-700">No</span>
                    </label>
                  </div>
                  {basicInformationErrors.referralPartyPresent && (
                    <p className="mt-1 text-sm text-red-600">
                      {basicInformationErrors.referralPartyPresent}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          !isLoading ? (
        <div className="max-w-6xl mx-auto my-4 p-6 rounded-xl border-4 border-gradient-to-r from-blue-400 to-purple-500  transition-shadow duration-300">
          {/* Personal Details Section */}
          <div className="mb-6 ">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex justify-between items-center mr-5 p-3 bg-gray-100 rounded-lg border-l-4 border-blue-400 hover:bg-gray-100 hover:border-blue-500 transition-colors">
                <span className="font-semibold text-gray-700 w-1/3">First Name</span>
                <span className="text-gray-800 w-2/3 text-right">{basicInformation.firstName?.value || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center ml-5 p-3 bg-gray-100 rounded-lg border-l-4 border-blue-400 hover:bg-gray-100 hover:border-blue-500 transition-colors">
                <span className="font-semibold text-gray-700 w-1/3">Last Name</span>
                <span className="text-gray-800 w-2/3 text-right">{basicInformation.lastName?.value || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center mr-5 p-3 bg-gray-100 rounded-lg border-l-4 border-blue-400 hover:bg-gray-100 hover:border-blue-500 transition-colors">
                <span className="font-semibold text-gray-700 w-1/3">Middle Name</span>
                <span className="text-gray-800 w-2/3 text-right">{basicInformation.middleName?.value || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center ml-5 p-3 bg-gray-100 rounded-lg border-l-4 border-blue-400 hover:bg-gray-100 hover:border-blue-500 transition-colors">
                <span className="font-semibold text-gray-700 w-1/3">Date of Birth</span>
                <span className="text-gray-800 w-2/3 text-right">{moment(basicInformation.dob?.value).format("yyyy MMM DD") || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center mr-5 p-3 bg-gray-100 rounded-lg border-l-4 border-blue-400 hover:bg-gray-100 hover:border-blue-500 transition-colors">
                <span className="font-semibold text-gray-700 w-1/3">Age</span>
                <span className="text-gray-800 w-2/3 text-right">{basicInformation.age?.value || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center ml-5 p-3 bg-gray-100 rounded-lg border-l-4 border-blue-400 hover:bg-gray-100 hover:border-blue-500 transition-colors">
                <span className="font-semibold text-gray-700 w-1/3">Gender</span>
                <span className="text-gray-800 w-2/3 text-right">{basicInformation.gender?.value || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
         <div className="mb-6 ">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center mr-5 p-3 bg-gray-100 rounded-lg border-l-4 border-blue-400 hover:bg-gray-100 hover:border-green-500 transition-colors">
                <span className="font-semibold text-gray-700 w-1/3">Home Phone</span>
                <span className="text-gray-800 w-2/3 text-right">{basicInformation.homePhone?.value || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center ml-5 p-3 bg-gray-100 rounded-lg border-l-4 border-blue-400 hover:bg-gray-100 hover:border-green-500 transition-colors">
                <span className="font-semibold text-gray-700 w-1/3">Business Phone</span>
                <span className="text-gray-800 w-2/3 text-right">{basicInformation.businessPhone?.value || "N/A"}</span>
              </div>
              <div className="col-span-2 flex justify-between items-center p-3 bg-gray-100 rounded-lg border-l-4 border-blue-400 hover:bg-gray-100 hover:border-green-500 transition-colors">
                <span className="font-semibold text-gray-700 w-1/3">Permanent Address</span>
                <span className="text-gray-800 w-2/3 text-right">{basicInformation.permanentAddress?.value || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Referral Information Section */}
         <div className="mb-6 ">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Referral Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center mr-5 p-3 bg-gray-100 rounded-lg border-l-4 border-blue-400 hover:bg-gray-100 hover:border-purple-500 transition-colors">
                <span className="font-semibold text-gray-700 w-1/3">Referral Source</span>
                <span className="text-gray-800 w-2/3 text-right">
                  {basicInformation.referralSource?.value === "other"
                    ? basicInformation.referralSourceOther?.value
                    : basicInformation.referralSource?.value || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 ml-5 bg-gray-100 rounded-lg border-l-4 border-blue-400 hover:bg-gray-100 hover:border-purple-500 transition-colors">
                <span className="font-semibold text-gray-700 w-1/2">Referral Party Present</span>
                <span className="text-gray-800 w-1/2 text-right">{basicInformation.referralPartyPresent?.value || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
          ) : (
            <LoadingSpinner />
          )
        )}
      </section>

      {mode === "add" && (
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={async (e) => {
              handleSubmitBasicInformation(e);
            }}
            className="flex items-center bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition-all duration-200 shadow-md"
            aria-label="Save and go to next tab"
            disabled={isSaving}
          >
           {isSaving ? 'Saving...': 'Save'}
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default BasicInformationTab;