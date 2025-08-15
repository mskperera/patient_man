import { useEffect, useState } from "react";
import { FaEdit, FaFemale, FaMale, FaPlusCircle, FaSync } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DescriptionInput from "../DescriptionInput";
import LoadingSpinner from "../LoadingSpinner";
import MessageModel from "../MessageModel";
import {
  addPersonalInformation,
  addPersonalInformationChild,
  drpBadPoints,
  drpGoodPoints,
  drpOccupations,
  drpSocialDifficulties,
  getPatientPersonalInfo,
  updatePersonalInformation,
  updatePersonalInformationChild,
} from "../../functions/patient";
import VoiceToText from "../VoiceToText";
import EditButton from "../EditButton";


const TabPersonalInformationChild = ({ id, refreshTabDetails, setActiveTab }) => {
 
  const [personalInformationErrors, setPersonalInformationErrors] = useState(
    {}
  );
  const [mode, setMode] = useState("add");
  const [editingSection, setEditingSection] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [initialPersonalInformation, setInitialPersonalInformation] =
    useState(null); // Store initial state for cancel
  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    type: "error",
  });

  const [isOccupationLoading, setIsOccupationLoading] = useState(false);

  const [personalInformation, setPersonalInformation] = useState({
    // maritalStatus: {
    //   label: "Present Marital Status",
    //   value: "",
    //   isTouched: false,
    //   isValid: false,
    //   required: true,
    //   dataType: "string",
    // },
    // yearsMarried: {
    //   label: "Number of Years Married to Present Spouse",
    //   value: "",
    //   isTouched: false,
    //   isValid: true,
    //   required: false,
    //   dataType: "number",
    // },
    // maleChildrenAges: {
    //   label: "Ages of Male Children",
    //   value: "",
    //   isTouched: false,
    //   isValid: true,
    //   required: false,
    //   dataType: "string",
    // },
    // femaleChildrenAges: {
    //   label: "Ages of Female Children",
    //   value: "",
    //   isTouched: false,
    //   isValid: true,
    //   required: false,
    //   dataType: "string",
    // },
    // religiosity: {
    //   label: "Religiosity",
    //   value: "",
    //   isTouched: false,
    //   isValid: true,
    //   required: true,
    //   dataType: "number",
    // },
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
      dataType: "array",
    },
    badPoints: {
      label: "Main Bad Points",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "array",
    },
    socialDifficulties: {
      label: "Main Social Difficulties",
      value: "",
      isTouched: false,
      isValid: true,
      required: true,
      dataType: "array",
    },
    // loveSexDifficulties: {
    //   label: "Main Love and Sex Difficulties",
    //   value: "",
    //   isTouched: false,
    //   isValid: true,
    //   required: true,
    //   dataType: "string",
    // },
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
    // occupationTrained: {
    //   label: "Occupation(s) Trained For",
    //   value: "",
    //   isTouched: false,
    //   isValid: false,
    //   required: true,
    //   dataType: "string",
    // },
    // occupation: {
    //   label: "Present Occupation",
    //   value: "",
    //   isTouched: false,
    //   isValid: false,
    //   required: true,
    //   dataType: "string",
    // },
    // occupationFullTime: {
    //   label: "Occupation Status",
    //   value: "",
    //   isTouched: false,
    //   isValid: false,
    //   required: true,
    //   dataType: "string",
    // },
  });

  const loadPersonalInformationData = async () => {
    setIsLoading(true);
    //const result =await getPersonalInformationData(id);
    const result = await getPatientPersonalInfo(id);
    const patientData = result.data;

    if (patientData.error) {
      console.log("patientData.error", patientData.error);
      setModal({
        isOpen: true,
        message: patientData.error.message,
        type: "error",
      });
    }

    console.log("loadPersonalInformationData:", result, id);

    if (patientData) {
      setMode("edit");
    }

    if (patientData) {
      setPersonalInformation({
        // maritalStatus: {
        //   ...personalInformation.maritalStatus,
        //   value: patientData.maritalStatus,
        //   isTouched: false,
        //   isValid: true,
        // },
        // yearsMarried: {
        //   ...personalInformation.yearsMarried,
        //   value: patientData.yearsMarried,
        //   isTouched: false,
        //   isValid: true,
        //   required:
        //     patientData.maritalStatus === "married_first_time" ||
        //     patientData.maritalStatus === "married_second_time",
        // },
        // maleChildrenAges: {
        //   ...personalInformation.maleChildrenAges,
        //   value: patientData.maleChildrenAges,
        //   isTouched: false,
        //   isValid: true,
        // },
        // femaleChildrenAges: {
        //   ...personalInformation.femaleChildrenAges,
        //   value: patientData.femaleChildrenAges,
        //   isTouched: false,
        //   isValid: true,
        // },
        // religiosity: {
        //   ...personalInformation.religiosity,
        //   value: patientData.religiosity,
        //   isTouched: false,
        //   isValid: true,
        // },
        thingsLiked: {
          ...personalInformation.thingsLiked,
          value: patientData.thingsLiked,
          isTouched: false,
          isValid: true,
        },
        assets: {
          ...personalInformation.assets,
          value: patientData.assets.split(";;"),
          isTouched: false,
          isValid: true,
        },
        badPoints: {
          ...personalInformation.badPoints,
          value: patientData.badPoints.split(";;"),
          isTouched: false,
          isValid: true,
        },
          socialDifficulties: {
          ...personalInformation.socialDifficulties,
          value: patientData.socialDifficulties.split(";;"),
          isTouched: false,
          isValid: true,
        },
        // loveSexDifficulties: {
        //   ...personalInformation.loveSexDifficulties,
        //   value: patientData.loveSexDifficulties,
        //   isTouched: false,
        //   isValid: true,
        // },
        schoolWorkDifficulties: {
          ...personalInformation.schoolWorkDifficulties,
          value: patientData.schoolWorkDifficulties,
          isTouched: false,
          isValid: true,
        },
        lifeGoals: {
          ...personalInformation.lifeGoals,
          value: patientData.lifeGoals,
          isTouched: false,
          isValid: true,
        },
        thingsToChange: {
          ...personalInformation.thingsToChange,
          value: patientData.thingsToChange,
          isTouched: false,
          isValid: true,
        },
        // occupationTrained: {
        //   ...personalInformation.occupationTrained,
        //   value: patientData.occupationTrained,
        //   isTouched: false,
        //   isValid: true,
        // },
        // occupation: {
        //   ...personalInformation.occupation,
        //   value: patientData.occupation,
        //   isTouched: false,
        //   isValid: true,
        // },
        // occupationFullTime: {
        //   ...personalInformation.occupationFullTime,
        //   value: patientData.occupationFullTime,
        //   isTouched: false,
        //   isValid: true,
        // },
      });

      setIsLoading(false);
    } else {
      // setMode("add");
      setIsLoading(false);
    }
  };
  // Load mock data based on id
  useEffect(() => {
    if (id) {
      loadPersonalInformationData();
    }
  }, [id]);

  const [goodPointsOptions, setGoodPointsOptions] = useState([]);
  const [badPointsOptions, setBadPointsOptions] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const [socialDifficultiesOptions, setSocialDifficultiesOptions] = useState([]);
  
  const loadDrpGoodPoints = async () => {
    const goodPoints = await drpGoodPoints();
    setGoodPointsOptions(goodPoints.data.results[0]);
  };

  const loadDrpBadPoints = async () => {
    const badPoints = await drpBadPoints();
    setBadPointsOptions(badPoints.data.results[0]);
  };

  const loadDrpOccupations = async () => {
    const occupations = await drpOccupations();
    setOccupations(occupations.data.results[0]);
  };

      const loadDrpSocialDifficulties = async () => {
      const result = await drpSocialDifficulties();
      setSocialDifficultiesOptions(result.data.results[0]);
    };

  useEffect(() => {
    loadDropdowns();
  }, []);

  const loadDropdowns = async () => {
    await loadDrpGoodPoints();
    await loadDrpBadPoints();
    await loadDrpOccupations();
    await loadDrpSocialDifficulties();
  };

  // Store initial state when entering edit mode
  useEffect(() => {
    setInitialPersonalInformation({ ...personalInformation });
  }, [editingSection]);

  // Toggle edit mode for a specific section
  const toggleSectionEdit = async (section) => {
    if (editingSection === section) {
      const isValid = await handleSubmitp(section);
      console.log("isValidoo.", isValid);
      if (isValid) setEditingSection(null);
    } else {
      setEditingSection(section);
    }
  };

  const handleSubmitp = async (section) => {
    setIsSaving(true);
    const isValid = validatePersonalInformation();
    if (!isValid) {
      console.log("Validation failed, not saving.");
      setIsSaving(false);
      return false;
    }

    console.log("section", section);
    const payload = {
      patientId: id,
      // maritalStatus: personalInformation.maritalStatus.value,
      // yearsMarried:
      //   personalInformation.yearsMarried.value === ""
      //     ? null
      //     : personalInformation.yearsMarried.value,
      // maleChildrenAges: personalInformation.maleChildrenAges.value,
      // femaleChildrenAges: personalInformation.femaleChildrenAges.value,
      // religiosity: personalInformation.religiosity.value,
      thingsLiked: personalInformation.thingsLiked.value,
      assets: personalInformation.assets.value.map((item) => ({ name: item })),
      badPoints: personalInformation.badPoints.value.map((item) => ({
        name: item,
      })),
    socialDifficulties: personalInformation.socialDifficulties.value.map((item) => ({ name: item })),
     // loveSexDifficulties: personalInformation.loveSexDifficulties.value,
      schoolWorkDifficulties: personalInformation.schoolWorkDifficulties.value,
      lifeGoals: personalInformation.lifeGoals.value,
      thingsToChange: personalInformation.thingsToChange.value,
      // occupationTrained: personalInformation.occupationTrained.value,
      // occupation: personalInformation.occupation.value,
      // occupationFullTime: personalInformation.occupationFullTime.value,
      pageName: "PatientBackgroundForm",
      isConfirm: true,
    };

    console.log("Save Payload:", payload);

    try {
      const res = await updatePersonalInformationChild(id, payload);
      console.log("update result:", res);

      if (res.data.error) {
        setModal({
          isOpen: true,
          message: res.data.error.message,
          type: "error",
        });
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

      // if(section==="occupation"){
      //   console.log('dddhhhhhhlllllll drop')
      //     await loadDrpOccupations();
      // }

      await loadPersonalInformationData();

      setModal({
        isOpen: true,
        message: res.data.outputValues.outputMessage,
        type: "success",
      });

      setIsSaving(false);
      return true;
    } catch (err) {
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
   
    if (dataType === "string") {
    if (required && (typeof value !== "string" ? String(value).trim() : value.trim()) === "") {
  return `${name} is required`;
}
    }

    if (dataType === "array") {
      if (required && value.length === 0) {
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
  const handleChangePersonalInfo = (e) => {
    const { name, value } = e.target;
    const { required, dataType } = personalInformation[name];
    const error = validateField(
      personalInformation[name].label,
      value,
      required,
      dataType
    );

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
      const isMarriedNow =
        value === "married_first_time" || value === "married_second_time";
      setPersonalInformation((prev) => ({
        ...prev,
        yearsMarried: {
          ...prev.yearsMarried,
          required: isMarriedNow,
          isValid:
            !isMarriedNow ||
            (typeof prev.yearsMarried.value === "string"
              ? prev.yearsMarried.value.trim() !== ""
              : prev.yearsMarried.value !== null &&
                prev.yearsMarried.value !== undefined),
        },
      }));

      setPersonalInformationErrors((prev) => ({
        ...prev,
        yearsMarried:
          isMarriedNow && !prev.yearsMarried?.value
            ? "Number of Years Married is required for current marriage"
            : "",
      }));
    }
  };

  const handleSubjectChange = async (selectedOption, field) => {
    const { name, value } = selectedOption;

    console.log("handleSubjectChange name:", selectedOption.name);
    console.log("handleSubjectChange field", field);
    let outputSubjectId = "";

    const { required, dataType } = personalInformation[field];
    const error = validateField(
      personalInformation[field].label,
      selectedOption.name,
      required,
      dataType
    );

    setPersonalInformation((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value: selectedOption.name,
        isTouched: true,
        isValid: error === "",
      },
    }));

    setPersonalInformationErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  // Handle DescriptionInput changes
  const handleDescriptionChange = (fieldName, value) => {
    const { required, dataType } = personalInformation[fieldName];
    const error = validateField(
      personalInformation[fieldName].label,
      value,
      required,
      dataType
    );

    setPersonalInformation((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value: value.split(";;").filter((item) => item.trim()),
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

      console.log("key,value ", key, value);
      let errorMessage = validateField(field.label, value, required, dataType);

      if (
        key === "yearsMarried" &&
        ["married_first_time", "married_second_time"].includes(
          personalInformation.maritalStatus.value
        )
      ) {
        if (
          value === null ||
          value === undefined ||
          (typeof value === "string" && value.trim() === "")
        ) {
          errorMessage =
            "Number of Years Married is required for current marriage";
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
    setIsSaving(true);
    const isValid = validatePersonalInformation();
    console.log("isValid", isValid);
    if (isValid) {
      const payload = {
        patientId: id,
        // maritalStatus: personalInformation.maritalStatus.value,
        // yearsMarried:
        //   personalInformation.yearsMarried.value === ""
        //     ? null
        //     : personalInformation.yearsMarried.value,
        // maleChildrenAges: personalInformation.maleChildrenAges.value,
        // femaleChildrenAges: personalInformation.femaleChildrenAges.value,
        // religiosity: personalInformation.religiosity.value,
        thingsLiked: personalInformation.thingsLiked.value,
        assets: personalInformation.assets.value.map((item) => ({
          name: item,
        })),
        badPoints: personalInformation.badPoints.value.map((item) => ({
          name: item,
        })),
      socialDifficulties: personalInformation.socialDifficulties.value.map((item) => ({ name: item })),
       // loveSexDifficulties: personalInformation.loveSexDifficulties.value,
      schoolWorkDifficulties: personalInformation.schoolWorkDifficulties.value,
        lifeGoals: personalInformation.lifeGoals.value,
        thingsToChange: personalInformation.thingsToChange.value,
        // occupationTrained: personalInformation.occupationTrained.value,
        // occupation: personalInformation.occupation.value,
        // occupationFullTime: personalInformation.occupationFullTime.value,
        pageName: "PatientBackgroundForm",
        isConfirm: true,
      };

      const submitPayloadWithPatientId = {
        ...payload,
        patientId: id,
      };

      try {
        const res = await addPersonalInformationChild(submitPayloadWithPatientId);
        console.log("Save res:", res);
        //await loadPersonalInformationData();
        console.log("update result:", res);

        if (res.data.error) {
          setModal({
            isOpen: true,
            message: res.data.error.message,
            type: "error",
          });
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

        // if(section==="occupation"){
        //   console.log('dddhhhhhhlllllll drop')
        //     await loadDrpOccupations();
        // }

        await loadPersonalInformationData();

        setModal({
          isOpen: true,
          message: res.data.outputValues.outputMessage,
          type: "success",
        });

        refreshTabDetails(Math.random());
      } catch (err) {
        console.log("Save Payload: err", err.message);
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
    if (typeof value === "string") {
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
          <li key={index} className="text-gray-700">
            {item}
          </li>
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

      {!isLoading ? (
        <div className="px-8">
     

          {/* Personal Insights */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-2 pb-2">
              <h3 className="text-xl font-semibold text-gray-700">
                Personal Insights
              </h3>
              {mode !== "add" && (
                <div className="flex space-x-4">
                  <EditButton
                    onClick={() => toggleSectionEdit("insights")}
                    ariaLabel={
                      editingSection === "insights"
                        ? "Save Personal Insights"
                        : "Edit Personal Insights"
                    }
                    disabled={isSaving}
                  >
                    {editingSection === "insights"
                      ? isSaving
                        ? "Saving..."
                        : "Save"
                      : "Edit"}
                  </EditButton>

              
                  {editingSection === "insights" && (
                    <button
                      onClick={() => handleCancel("insights")}
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
                    List the things you like to do most, kinds of things and
                    persons that give you pleasure{" "}
                    {personalInformation.thingsLiked.required && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <VoiceToText
                    name="thingsLiked"
                    value={personalInformation.thingsLiked.value}
                    onChange={handleChangePersonalInfo}
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="Describe your interests and pleasures"
                    aria-label="Things liked"
                  />
                  {personalInformationErrors.thingsLiked && (
                    <p className="mt-1 text-sm text-red-600">
                      {personalInformationErrors.thingsLiked}
                    </p>
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
                      isEditing={
                        editingSection === "insights" || mode === "add"
                      }
                      fieldName="assets"
                      label="List your main assets and good points"
                      placeholder="Select or enter your strengths"
                      descriptionOptions={goodPointsOptions}
                      isTypeable={false}
                    />
                    {personalInformationErrors.assets && (
                      <p className="mt-1 text-sm text-red-600">
                        {personalInformationErrors.assets}
                      </p>
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
                      isEditing={
                        editingSection === "insights" || mode === "add"
                      }
                      fieldName="badPoints"
                      label="List your main bad points"
                      placeholder="Select or enter your weaknesses"
                      descriptionOptions={badPointsOptions}
                      isTypeable={false}
                    />
                    {personalInformationErrors.badPoints && (
                      <p className="mt-1 text-sm text-red-600">
                        {personalInformationErrors.badPoints}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                
                   <DescriptionInput
                    patient={personalInformation}
                    setValue={(value) => {
                      handleDescriptionChange("socialDifficulties", value);
                    }}
                    setPatient={(newPatient) => {
                      setPersonalInformation(newPatient);
                    }}
                    isEditing={editingSection === "insights" || mode === "add"}
                    fieldName="socialDifficulties"
                    label="List your main social difficulties"
                    placeholder="Select social challenges"
                    descriptionOptions={socialDifficultiesOptions}
                    isTypeable={false}
                  />
                  {personalInformationErrors.socialDifficulties && (
                    <p className="mt-1 text-sm text-red-600">
                      {personalInformationErrors.socialDifficulties}
                    </p>
                  )}
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700">
                    List your main love and sex difficulties
                    {personalInformation.loveSexDifficulties.required && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <VoiceToText
                    name="loveSexDifficulties"
                    value={personalInformation.loveSexDifficulties.value}
                    onChange={handleChangePersonalInfo}
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="Describe relationship challenges"
                    aria-label="Love and sex difficulties"
                  />
                  {personalInformationErrors.loveSexDifficulties && (
                    <p className="mt-1 text-sm text-red-600">
                      {personalInformationErrors.loveSexDifficulties}
                    </p>
                  )}
                </div> */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    List your main school difficulties
                    {personalInformation.schoolWorkDifficulties.required && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <VoiceToText
                    name="schoolWorkDifficulties"
                    value={personalInformation.schoolWorkDifficulties.value}
                    onChange={handleChangePersonalInfo}
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="Describe professional/academic challenges"
                    aria-label="School or work difficulties"
                  />
                  {personalInformationErrors.schoolWorkDifficulties && (
                    <p className="mt-1 text-sm text-red-600">
                      {personalInformationErrors.schoolWorkDifficulties}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    List your main life goals
                    {personalInformation.lifeGoals.required && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <VoiceToText
                    name="lifeGoals"
                    value={personalInformation.lifeGoals.value}
                    onChange={handleChangePersonalInfo}
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="List your life goals"
                    aria-label="Life goals"
                  />
                  {personalInformationErrors.lifeGoals && (
                    <p className="mt-1 text-sm text-red-600">
                      {personalInformationErrors.lifeGoals}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    List the things about yourself you would most like to change
                    {personalInformation.thingsToChange.required && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <VoiceToText
                    name="thingsToChange"
                    value={personalInformation.thingsToChange.value}
                    onChange={handleChangePersonalInfo}
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    rows="4"
                    placeholder="Describe desired changes"
                    aria-label="Things to change"
                  />
                  {personalInformationErrors.thingsToChange && (
                    <p className="mt-1 text-sm text-red-600">
                      {personalInformationErrors.thingsToChange}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className=" bg-white border border-gray-200 rounded-lg p-4">
                  <strong className="text-sm">Things Liked:</strong>
                  <div className="mt-2">
                    <p className="text-gray-700 mt-1 whitespace-pre-line">
                      {personalInformation.thingsLiked.value}
                    </p>
                  </div>
                </div>

                <div className=" bg-white border border-gray-200 rounded-lg p-4">
                  <strong className="text-sm">
                    Main assets and good points:
                  </strong>
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
                 
                      {renderListItems(personalInformation.socialDifficulties.value)}
                
                  </div>
                </div>
                {/* <div className=" bg-white border border-gray-200 rounded-lg p-4">
                  <strong className="text-sm">
                    Main Love/Sex Difficulties:
                  </strong>
                  <div className="mt-2">
                    <p className="text-gray-700 mt-1">
                      {personalInformation.loveSexDifficulties.value}
                    </p>
                  </div>
                </div> */}
                <div className=" bg-white border border-gray-200 rounded-lg p-4">
                  <strong className="text-sm">
                    Main School Difficulties:
                  </strong>
                  <div className="mt-2">
                    <p className="text-gray-700 mt-1 whitespace-pre-line">
                      {personalInformation.schoolWorkDifficulties.value ||
                        "N/A"}
                    </p>
                  </div>
                </div>
                <div className=" bg-white border border-gray-200 rounded-lg p-4">
                  <strong className="text-sm">Main Life Goals:</strong>
                  <div className="mt-2">
                    <p className="text-gray-700 mt-1 whitespace-pre-line">
                      {personalInformation.lifeGoals.value}
                    </p>
                  </div>
                </div>
                <div className=" bg-white border border-gray-200 rounded-lg p-4">
                  <strong className="text-sm">
                    Things Most Like to Change:
                  </strong>
                  <div className="mt-2">
                    <p className="text-gray-700 mt-1 whitespace-pre-line">
                      {personalInformation.thingsToChange.value}
                    </p>
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

export default TabPersonalInformationChild;
