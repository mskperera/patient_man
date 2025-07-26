import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";
import MessageModel from "./MessageModel";
import {
  addBasicInformation,
  getPatientBasicInfo,
  updateBasicInformation,
} from "../functions/patient";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import EditButton from "./EditButton";

const TabBasicInformation = ({
  id,
  refreshTabDetails,
  setNewId,
  patientTypeId,
}) => {
  const navigate = useNavigate();
  const [basicInformationErrors, setBasicInformationErrors] = useState({});
  const [mode, setMode] = useState("add");
  const [editingSection, setEditingSection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [initialBasicInformation, setInitialBasicInformation] = useState(null);
  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    type: "error",
  });

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
    dateOfBirth: {
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
      label: "Mobile Phone",
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
    referralSourceOther: {
      label: "Referral Source Other",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "string",
    },
    referralPartyPresent: {
      label: "Referral Party Present",
      value: false,
      isTouched: false,
      isValid: false,
      required: true,
      dataType: "boolean",
    },
  });

  const loadBasicInformationData = async () => {
    setIsLoading(true);
    try {
      const result = await getPatientBasicInfo(id);
      const patientData = result.data;
      if (patientData.error) {
        setModal({
          isOpen: true,
          message: patientData.error.message,
          type: "error",
        });
      } else if (patientData) {
        setBasicInformation({
          patientNo: {
            ...basicInformation.patientNo,
            value: patientData.patientNo || "",
            isTouched: false,
            isValid: true,
          },
          firstName: {
            ...basicInformation.firstName,
            value: patientData.firstName || "",
            isTouched: false,
            isValid: true,
          },
          lastName: {
            ...basicInformation.lastName,
            value: patientData.lastName || "",
            isTouched: false,
            isValid: true,
          },
          middleName: {
            ...basicInformation.middleName,
            value: patientData.middleName || "",
            isTouched: false,
            isValid: true,
          },
          dateOfBirth: {
            ...basicInformation.dateOfBirth,
            value: patientData.dateOfBirth
              ? moment(patientData.dateOfBirth).format("YYYY-MM-DD")
              : "",
            isTouched: false,
            isValid: true,
          },
          age: {
            ...basicInformation.age,
            value: patientData.age?.toString() || "",
            isTouched: false,
            isValid: true,
          },
          gender: {
            ...basicInformation.gender,
            value: patientData.gender || "",
            isTouched: false,
            isValid: true,
          },
          email: {
            ...basicInformation.email,
            value: patientData.email || "",
            isTouched: false,
            isValid: true,
          },
          homePhone: {
            ...basicInformation.homePhone,
            value: patientData.homePhone || "",
            isTouched: false,
            isValid: true,
          },
          businessPhone: {
            ...basicInformation.businessPhone,
            value: patientData.businessPhone || "",
            isTouched: false,
            isValid: true,
          },
          permanentAddress: {
            ...basicInformation.permanentAddress,
            value: patientData.permanentAddress || "",
            isTouched: false,
            isValid: true,
          },
          referralSource: {
            ...basicInformation.referralSource,
            value: patientData.referralSource || "",
            isTouched: false,
            isValid: true,
          },
          referralSourceOther: {
            ...basicInformation.referralSourceOther,
            value: patientData.referralSourceOther || "",
            isTouched: false,
            isValid: true,
          },
          referralPartyPresent: {
            ...basicInformation.referralPartyPresent,
            value: !!patientData.referralPartyPresent,
            isTouched: false,
            isValid: true,
          },
        });
      }
    } catch (error) {
      setModal({ isOpen: true, message: error.message, type: "error" });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      loadBasicInformationData();
      setMode("edit");
    } else {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (editingSection === "basic") {
      setInitialBasicInformation({ ...basicInformation });
    }
  }, [editingSection]);

  const toggleSectionEdit = async (section) => {
    if (editingSection === section) {
      const isValid = await handleSubmit(section);
      if (isValid) setEditingSection(null);
    } else {
      setEditingSection(section);
    }
  };

  const handleCancel = () => {
    if (initialBasicInformation) {
      setBasicInformation(initialBasicInformation);
      setBasicInformationErrors({});
    }
    setEditingSection(null);
  };

  const handleSubmit = async (section) => {
    setIsSaving(true);
    const isValid = validateBasicInformation();
    if (!isValid) {
      setIsSaving(false);
      return false;
    }

    const payload = {
      lastName: basicInformation.lastName.value,
      firstName: basicInformation.firstName.value,
      middleName: basicInformation.middleName.value,
      dateOfBirth: basicInformation.dateOfBirth.value,
      age: basicInformation.age.value,
      gender: basicInformation.gender.value,
      email: basicInformation.email.value,
      homePhone: basicInformation.homePhone.value,
      businessPhone: basicInformation.businessPhone.value,
      permanentAddress: basicInformation.permanentAddress.value,
      referralSource: basicInformation.referralSource.value,
      referralSourceOther: basicInformation.referralSourceOther.value,
      referralPartyPresent: basicInformation.referralPartyPresent.value ? 1 : 0,
      utcOffset: "+05:30",
      pageName: "PatientRegistration",
      patientTypeId,
      isConfirm: true,
    };

    try {
      const res = await updateBasicInformation(id, payload);
      await loadBasicInformationData();
      if (res.data.error) {
        setModal({
          isOpen: true,
          message: res.data.error.message,
          type: "error",
        });
        setIsSaving(false);
        return false;
      }
      if (res.data.outputValues.responseStatus === "failed") {
        setModal({
          isOpen: true,
          message: res.data.outputValues.outputMessage,
          type: "warning",
        });
        setIsSaving(false);
        return false;
      }
      setModal({
        isOpen: true,
        message: res.data.outputValues.outputMessage,
        type: "success",
      });
      setIsSaving(false);
      return true;
    } catch (err) {
      setModal({ isOpen: true, message: err.message, type: "error" });
      setIsSaving(false);
      return false;
    }
  };

  const validateField = (name, value, required) => {
    if (required && value.toString().trim() === "") {
      return `${name} is required`;
    }
    return "";
  };

  const handleChangeCheckBox = (e) => {
    const { name, value } = e.target;
    const required = basicInformation[name].required;
    const error = validateField(basicInformation[name].label, value, required);

    setBasicInformation({
      ...basicInformation,
      [name]: {
        ...basicInformation[name],
        value: value === "true",
        isTouched: true,
        isValid: error === "",
      },
    });
    setBasicInformationErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleChangeBasicInfo = (e) => {
    const { name, value } = e.target;
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

    if (name === "dateOfBirth") {
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

      if (
        required &&
        (value === null ||
          value === undefined ||
          value.toString().trim() === "")
      ) {
        errorMessage = `${field.label} is required.`;
      } else if (value) {
        switch (dataType) {
          case "email":
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
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
            if (!/^[0-9]{10,15}$/.test(value)) {
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
      updatedInfo[key].isTouched = updatedInfo[key].isTouched || false;
    });

    setBasicInformation(updatedInfo);
    setBasicInformationErrors(errors);
    return isFormValid;
  };

  const handleSubmitBasicInformation = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const isValid = validateBasicInformation();
    if (!isValid) {
      setIsSaving(false);
      return;
    }

    const payload = {
      lastName: basicInformation.lastName.value,
      firstName: basicInformation.firstName.value,
      middleName: basicInformation.middleName.value,
      dateOfBirth: basicInformation.dateOfBirth.value,
      age: basicInformation.age.value,
      gender: basicInformation.gender.value,
      email: basicInformation.email.value,
      homePhone: basicInformation.homePhone.value,
      businessPhone: basicInformation.businessPhone.value,
      permanentAddress: basicInformation.permanentAddress.value,
      referralSource: basicInformation.referralSource.value,
      referralSourceOther: basicInformation.referralSourceOther.value,
      referralPartyPresent: basicInformation.referralPartyPresent.value ? 1 : 0,
      utcOffset: "+05:30",
      pageName: "PatientRegistration",
      patientTypeId,
      isConfirm: true,
    };

    try {
      const res = await addBasicInformation(payload);
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
      setModal({
        isOpen: true,
        message: res.data.outputValues.outputMessage,
        type: "success",
      });
      setNewId(res.data.outputValues.patientId);
      setMode("edit");
      setIsSaving(false);
      navigate(
        `/patient?id=${res.data.outputValues.patientId}&type=${patientTypeId}`
      );
    } catch (err) {
      setModal({ isOpen: true, message: err.message, type: "error" });
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
      <div className="px-2">
        <section className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Basic Information
            </h3>
            {mode !== "add" && (
              <div className="flex space-x-3">
                <EditButton
                  onClick={() => toggleSectionEdit("basic")}
                  ariaLabel={
                    editingSection === "basic"
                      ? isSaving
                        ? "Saving Basic Info"
                        : "Save Basic Info"
                      : "Edit Basic Info"
                  }
                  disabled={isSaving}
                >
                  {editingSection === "basic"
                    ? isSaving
                      ? "Saving..."
                      : "Save"
                    : "Edit"}
                </EditButton>

                {editingSection === "basic" && (
                  <button
                    onClick={handleCancel}
                    className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
                    aria-label="Cancel Editing"
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                )}
              </div>
            )}
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          ) : editingSection === "basic" || mode === "add" ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="space-y-8">
                {/* Personal Details */}
                <div>
                  <h4 className="text-lg font-semibold text-sky-700 mb-4">
                    Personal Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="lastName"
                        value={basicInformation.lastName.value}
                        onChange={handleChangeBasicInfo}
                        className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter last name"
                        aria-label="Last Name"
                        required
                      />
                      {basicInformationErrors.lastName && (
                        <p className="mt-1 text-sm text-red-600">
                          {basicInformationErrors.lastName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="firstName"
                        value={basicInformation.firstName.value}
                        onChange={handleChangeBasicInfo}
                        className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter first name"
                        aria-label="First Name"
                        required
                      />
                      {basicInformationErrors.firstName && (
                        <p className="mt-1 text-sm text-red-600">
                          {basicInformationErrors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Middle Name
                      </label>
                      <input
                        name="middleName"
                        value={basicInformation.middleName.value}
                        onChange={handleChangeBasicInfo}
                        className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter middle name"
                        aria-label="Middle Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={basicInformation.dateOfBirth.value}
                        onChange={handleChangeBasicInfo}
                        className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        aria-label="Date of Birth"
                        required
                      />
                      {basicInformationErrors.dateOfBirth && (
                        <p className="mt-1 text-sm text-red-600">
                          {basicInformationErrors.dateOfBirth}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Age <span className="text-red-500">*</span>
                      </label>
                      {basicInformation.dateOfBirth.value && (
                        <div className="flex items-center gap-2 p-3 text-sm border border-gray-300 rounded-lg bg-gray-50">
                          <span className="text-gray-800 font-medium">
                            {basicInformation.age.value}
                          </span>
                          <span className="text-gray-600">{"Years"}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <div className="flex space-x-4 mt-2">
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
                          <span className="ml-2 text-sm text-gray-600">
                            Male
                          </span>
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
                          <span className="ml-2 text-sm text-gray-600">
                            Female
                          </span>
                        </label>
                      </div>
                      {basicInformationErrors.gender && (
                        <p className="mt-1 text-sm text-red-600">
                          {basicInformationErrors.gender}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h4 className="text-lg font-semibold text-sky-700 mb-4">
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Home Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="homePhone"
                        value={basicInformation.homePhone.value}
                        onChange={handleChangeBasicInfo}
                        className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter home phone"
                        aria-label="Home Phone"
                        required
                      />
                      {basicInformationErrors.homePhone && (
                        <p className="mt-1 text-sm text-red-600">
                          {basicInformationErrors.homePhone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Mobile Phone
                      </label>
                      <input
                        name="businessPhone"
                        value={basicInformation.businessPhone.value}
                        onChange={handleChangeBasicInfo}
                        className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter mobile phone"
                        aria-label="Mobile Phone"
                      />
                      {basicInformationErrors.businessPhone && (
                        <p className="mt-1 text-sm text-red-600">
                          {basicInformationErrors.businessPhone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={basicInformation.email.value}
                        onChange={handleChangeBasicInfo}
                        className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Enter email"
                        aria-label="Email"
                      />
                      {basicInformationErrors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {basicInformationErrors.email}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-2 lg:col-span-3">
                      <label className="block text-sm font-medium text-gray-600">
                        Permanent Address{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="permanentAddress"
                        value={basicInformation.permanentAddress.value}
                        onChange={handleChangeBasicInfo}
                        className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        rows="3"
                        placeholder="Enter permanent address"
                        aria-label="Permanent Address"
                        required
                      />
                      {basicInformationErrors.permanentAddress && (
                        <p className="mt-1 text-sm text-red-600">
                          {basicInformationErrors.permanentAddress}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Referral Information */}
                <div>
                  <h4 className="text-lg font-semibold text-sky-700 mb-4">
                    Referral Information
                  </h4>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Who referred you to the Institute?{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
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
                            <span className="ml-2 text-sm text-gray-600">
                              {source}
                            </span>
                          </label>
                        ))}
                      </div>
                      {basicInformationErrors.referralSource && (
                        <p className="mt-2 text-sm text-red-600">
                          {basicInformationErrors.referralSource}
                        </p>
                      )}
                      {basicInformation.referralSource.value === "other" && (
                        <input
                          name="referralSourceOther"
                          value={basicInformation.referralSourceOther.value}
                          onChange={handleChangeBasicInfo}
                          className="mt-3 w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                          placeholder="Please specify"
                          aria-label="Other Referral Source"
                        />
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Has this party been here?{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="flex space-x-4 mt-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="referralPartyPresent"
                            value={true}
                            checked={
                              basicInformation.referralPartyPresent.value ===
                              true
                            }
                            onChange={handleChangeCheckBox}
                            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                            aria-label="Yes"
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            Yes
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="referralPartyPresent"
                            value={false}
                            checked={
                              basicInformation.referralPartyPresent.value ===
                              false
                            }
                            onChange={handleChangeCheckBox}
                            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                            aria-label="No"
                          />
                          <span className="ml-2 text-sm text-gray-600">No</span>
                        </label>
                      </div>
                      {basicInformationErrors.referralPartyPresent && (
                        <p className="mt-2 text-sm text-red-600">
                          {basicInformationErrors.referralPartyPresent}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="space-y-8">
                {/* Personal Details */}
                <div>
                  <h4 className="text-lg font-semibold text-sky-700 mb-4">
                    Personal Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <span className="text-gray-600 font-medium font-semibold">
                        First Name:
                      </span>
                      <span className="text-gray-800 text-right">
                        {basicInformation.firstName.value || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <span className="text-gray-600 font-medium font-semibold">
                        Last Name:
                      </span>
                      <span className="text-gray-800 text-right">
                        {basicInformation.lastName.value || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <span className="text-gray-600 font-medium font-semibold">
                        Middle Name:
                      </span>
                      <span className="text-gray-800 text-right">
                        {basicInformation.middleName.value || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <span className="text-gray-600 font-medium font-semibold">
                        Date of Birth:
                      </span>
                      <span className="text-gray-800 text-right">
                        {basicInformation.dateOfBirth.value
                          ? moment(basicInformation.dateOfBirth.value).format(
                              "YYYY MMM DD"
                            )
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <span className="text-gray-600 font-medium font-semibold">
                        Age:
                      </span>
                      <span className="text-gray-800 text-right">
                        {basicInformation.age.value} Years
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <span className="text-gray-600 font-medium font-semibold">
                        Gender:
                      </span>
                      <span className="text-gray-800 text-right">
                        {basicInformation.gender.value || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h4 className="text-lg font-semibold text-sky-700 mb-4">
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <span className="text-gray-600 font-medium font-semibold">
                        Home Phone:
                      </span>
                      <span className="text-gray-800 text-right">
                        {basicInformation.homePhone.value || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <span className="text-gray-600 font-medium font-semibold">
                        Mobile Phone:
                      </span>
                      <span className="text-gray-800 text-right">
                        {basicInformation.businessPhone.value || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <span className="text-gray-600 font-medium font-semibold">
                        Email:
                      </span>
                      <span className="text-gray-800 text-right">
                        {basicInformation.email.value || "N/A"}
                      </span>
                    </div>
                    <div className="md:col-span-2 lg:col-span-3 flex justify-between items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <span className="text-gray-600 font-medium font-semibold">
                        Permanent Address:
                      </span>
                      <span className="text-gray-800 text-right max-w-[70%]">
                        {basicInformation.permanentAddress.value || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Referral Information */}
                <div>
                  <h4 className="text-lg font-semibold text-sky-700 mb-4">
                    Referral Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <span className="text-gray-600 font-medium font-semibold">
                        Referral Source:
                      </span>
                      <span className="text-gray-800 text-right">
                        {basicInformation.referralSource.value === "other"
                          ? basicInformation.referralSourceOther.value
                          : basicInformation.referralSource.value || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <span className="text-gray-600 font-medium font-semibold">
                        Referral Party Present:
                      </span>
                      <span className="text-gray-800 text-right">
                        {basicInformation.referralPartyPresent.value
                          ? "Yes"
                          : "No"}
                      </span>
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
              onClick={handleSubmitBasicInformation}
              className="flex items-center bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
              aria-label="Save and go to next tab"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TabBasicInformation;
