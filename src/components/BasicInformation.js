import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { basicInformationData } from "../data/mockData";

const BasicInformation = ({id}) => {
  const navigate = useNavigate();

  const [basicInformationErrors, setBasicInformationErrors] = useState({});

  const [mode, setMode] = useState("add");
  const [editingSection, setEditingSection] = useState(null);

  const [basicInformation, setBasicInformation] = useState({
    patientId: {
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



useEffect(() => {
  if (id) {
    const patientData = basicInformationData.find((p) => p.id === id);
    console.log('patientData',patientData.patientId)
    if (patientData) {
      setBasicInformation({
        patientId: {
          ...basicInformation.patientId,
          value: patientData.patientId || '',
          isTouched: true,
          isValid: true,
        },
        firstName: {
          ...basicInformation.firstName,
          value: patientData.firstName,
          isTouched: true,
          isValid: true,
       },

        lastName: {
          ...basicInformation.lastName,
          value: patientData?.lastName || '',
          isTouched: true,
          isValid: true,
        },
        middleName: {
          ...basicInformation.middleName,
          value: patientData.middleName,
          isTouched: true,
          isValid: true,
        },
        dob: {
          ...basicInformation.dob,
          value: patientData.dateOfBirth,
          isTouched: true,
          isValid: true,
        },
        age: {
          ...basicInformation.age,
          value: patientData.age,
          isTouched: true,
          isValid: true,
        },
        gender: {
          ...basicInformation.gender,
          value: patientData.gender,
          isTouched: true,
          isValid: true,
        },
        email: {
          ...basicInformation.email,
          value: patientData.email,
          isTouched: true,
          isValid: true,
        },
        homePhone: {
          ...basicInformation.homePhone,
          value: patientData.homePhone,
          isTouched: true,
          isValid: true,
        },
        businessPhone: {
          ...basicInformation.businessPhone,
          value: patientData.businessPhone,
          isTouched: true,
          isValid: true,
        },
        permanentAddress: {
          ...basicInformation.permanentAddress,
          value: patientData.permanentAddress,
          isTouched: true,
          isValid: true,
        },
        referralSource: {
          ...basicInformation.referralSource,
          value: patientData.referralSource,
          isTouched: true,
          isValid: true,
        },
        referralPartyPresent: {
          ...basicInformation.referralPartyPresent,
          value: patientData.referralPartyPresent,
          isTouched: true,
          isValid: true,
        },
       });
       setMode("edit");
     }
  }
}, [id]);


useEffect(()=>{
  console.log('basicInformation',basicInformation)
},[basicInformation])
  // Function to toggle edit mode for a specific section
  const toggleSectionEdit = (section) => {
    if (editingSection === section) {
      handleSubmitp(section); // Save only the specific section
      setEditingSection(null);
    } else {
      setEditingSection(section);
    }
  };

  // Modified handleSubmit to handle section-specific saving
  const handleSubmitp = async (section) => {
    // Here you can add logic to save only the relevant section data
    const savedPatientId = mode === "add" ? Date.now().toString() : "patientId";
    if (mode === "add") {
      navigate(`/patients/${savedPatientId}`);
    }
  };

  const validateField = (name, value, required) => {
    if (required && value.trim() === "") {
      return `${name} is required`;
    }

    // You can extend here with dataType checks, minLength, etc.
    return "";
  };

  const handleChangeBasicInfo = (e) => {
    const { name, value } = e.target;

    console.log('handlechangebais',name,value)
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

    // If dob is changed, calculate and update age
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
        isValid: true, // Assume age is always valid when calculated from dob
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
      // Skip if field is not in new format (e.g., accidentally unconverted)
      if (!field || typeof field !== "object" || !("value" in field)) return;

      // console.log('key, field',key, field)
      const { value, required, dataType } = field;

      let errorMessage = "";

      // Required check
      if (required && (!value || value.toString().trim() === "")) {
        errorMessage = `${field.label} is required.`;
      }

      // Data type checks
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

      // Set error message if any
      if (errorMessage) {
        isFormValid = false;
        errors[key] = errorMessage;
        updatedInfo[key].isValid = false;
      } else {
        updatedInfo[key].isValid = true;
      }

      updatedInfo[key].isTouched = true;
    });

    // Update state with touched + valid flags
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

  const handleSubmitBasicInformation = (e) => {
    e.preventDefault();
    const isValid = validateBasicInformation();
    console.log("isValid", isValid);
    if (isValid) {
      // Usage
      const submitPayload = generateSubmitPayload(basicInformation);
      console.log(submitPayload);

      setMode("edit");
      // proceed to submit form
    }
  };

  return (
    <div className="px-8">
      {/* Basic Information */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-2xl font-semibold text-gray-800">
            Basic Information
          </h3>
          {mode !== "add" && (
            <button
              onClick={() => toggleSectionEdit("basic")}
              className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
              aria-label={
                editingSection === "basic"
                  ? "Save Basic Info"
                  : "Edit Basic Info"
              }
            >
              <FaEdit className="mr-2" />
              {editingSection === "basic" ? "Save" : "Edit"}
            </button>
          )}
        </div>
        {editingSection === "basic" || mode === "add" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* {JSON.stringify(basicInformation)} */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                name="lastName"
                value={basicInformation.lastName.value}
                onChange={handleChangeBasicInfo}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                placeholder="Enter last name"
                aria-label="Last name"
              />
              {basicInformationErrors.lastName && (
                <p className="mt-1 text-sm text-red-600">
                  {basicInformationErrors.lastName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                name="firstName"
                value={basicInformation.firstName.value}
                onChange={handleChangeBasicInfo}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
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
                Middle Name
              </label>
              <input
                name="middleName"
                value={basicInformation.middleName.value}
                onChange={handleChangeBasicInfo}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
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
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={basicInformation.dob.value}
                onChange={handleChangeBasicInfo}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
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
                Age
              </label>
              <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-md bg-gray-50">
                <span className="text-gray-900 text-base font-medium">
                  {basicInformation.age.value || "--"}
                </span>
                <span className="text-gray-600 text-sm">Years</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sex
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
                Permanent Address
              </label>
              <textarea
                name="permanentAddress"
                value={basicInformation.permanentAddress.value}
                onChange={handleChangeBasicInfo}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
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
                Home Phone
              </label>
              <input
                name="homePhone"
                value={basicInformation.homePhone.value}
                onChange={handleChangeBasicInfo}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
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
                Business Phone
              </label>
              <input
                name="businessPhone"
                value={basicInformation.businessPhone.value}
                onChange={handleChangeBasicInfo}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
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
                Email
              </label>
              <input
                name="email"
                type="email"
                value={basicInformation.email.value}
                onChange={handleChangeBasicInfo}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
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
                    Who referred you to the Institute?
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
                      value={basicInformation.referralSourceOther.value || ""}
                      onChange={handleChangeBasicInfo}
                      className="mt-3 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Please specify"
                      aria-label="Other referral source"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Has this party been here?
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>Last Name:</strong>{" "}
              {basicInformation.lastName?.value || "N/A"}
            </div>
            <div>
              <strong>First Name:</strong>{" "}
              {basicInformation.firstName?.value || "N/A"}
            </div>
            <div>
              <strong>Middle Name:</strong>{" "}
              {basicInformation.middleName?.value || "N/A"}
            </div>
            <div>
              <strong>Date of Birth:</strong>{" "}
              {basicInformation.dob?.value || "N/A"}
            </div>
            <div>
              <strong>Age:</strong> {basicInformation.age?.value || "N/A"}
            </div>
            <div>
              <strong>Gender:</strong> {basicInformation.gender?.value || "N/A"}
            </div>

            <div className="md:col-span-3">
              <strong>Permanent Address:</strong>{" "}
              {basicInformation.permanentAddress?.value || "N/A"}
            </div>

            <div>
              <strong>Home Phone:</strong>{" "}
              {basicInformation.homePhone?.value || "N/A"}
            </div>
            <div>
              <strong>Business Phone:</strong>{" "}
              {basicInformation.businessPhone?.value || "N/A"}
            </div>

            <div>
              <strong>Referral Source:</strong>{" "}
              {basicInformation.referralSource?.value === "other"
                ? basicInformation.referralSourceOther?.value
                : basicInformation.referralSource?.value || "N/A"}
            </div>

            <div>
              <strong>Referral Party Present:</strong>{" "}
              {basicInformation.referralPartyPresent?.value || "N/A"}
            </div>
          </div>

        )}
      </section>

      {mode === "add" && (
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={async (e) => {
              handleSubmitBasicInformation(e);
              //await handleSubmitp("personal");
              //setActiveTab("family");
            }}
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

export default BasicInformation;
