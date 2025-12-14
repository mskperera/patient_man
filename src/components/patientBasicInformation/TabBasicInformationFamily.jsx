import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import LoadingSpinner from "../LoadingSpinner";
import MessageModel from "../MessageModel";
import {
  addBasicInformation,
  addFamilyBasicInformation,
  getPatientBasicInfo,
  updateBasicInformation,
  updateFamilyBasicInformation,
} from "../../functions/patient";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import EditButton from "../EditButton";

/* --------------------------------------------------------------
   Print-Only CSS: Page breaks, A4 size, color accuracy
   -------------------------------------------------------------- */
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
  }
`;

/* --------------------------------------------------------------
   Print View Component – Family Basic Information (Husband + Wife)
   -------------------------------------------------------------- */
const FamilyInfoPrint = ({ basicInformation }) => {
  // Format date: "2025 Jan 15"
  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        })
      : "";

  return (
    <>
      {/* Inject print CSS */}
      <style>{printStyles}</style>

      {/* A4 Container */}
      <div className="mx-auto max-w-[210mm] bg-white font-sans text-sm leading-relaxed">

        {/* Main Header */}
        <header className="text-center mb-6">
          <h3 className="text-xl font-bold text-sky-700 tracking-wide">
            Family Basic Information
          </h3>
        </header>

        {/* Table Header: Husband | Wife */}
        <div className="grid grid-cols-5 gap-4 font-semibold text-sky-700 text-sm">
          <div></div>
          <div className="col-span-2 text-center font-bold">Husband</div>
          <div className="col-span-2 text-center font-bold">Wife</div>
        </div>

        {/* ========== Personal Details ========== */}
        <section className="mb-8">
          <h3 className="mb-3 border-b-2 border-sky-700 pb-1 text-lg font-bold text-sky-700">
            Personal Details
          </h3>

          {/* First Name */}
          <div className="grid grid-cols-5 gap-4 mb-2">
            <span className="font-medium text-gray-700">First Name:</span>
            <div className="col-span-2 flex justify-between py-1.5 border-b border-dashed border-gray-300">
              <span className="text-gray-900">{basicInformation.husbandFirstName.value || "N/A"}</span>
            </div>
            <div className="col-span-2 flex justify-between py-1.5 border-b border-dashed border-gray-300">
              <span className="text-gray-900">{basicInformation.wifeFirstName.value || "N/A"}</span>
            </div>
          </div>

          {/* Middle Name */}
          <div className="grid grid-cols-5 gap-4 mb-2">
            <span className="font-medium text-gray-700">Middle Name:</span>
            <div className="col-span-2 flex justify-between py-1.5 border-b border-dashed border-gray-300">
              <span className="text-gray-900">{basicInformation.husbandMiddleName.value || "N/A"}</span>
            </div>
            <div className="col-span-2 flex justify-between py-1.5 border-b border-dashed border-gray-300">
              <span className="text-gray-900">{basicInformation.wifeMiddleName.value || "N/A"}</span>
            </div>
          </div>

          {/* Last Name */}
          <div className="grid grid-cols-5 gap-4 mb-2">
            <span className="font-medium text-gray-700">Last Name:</span>
            <div className="col-span-2 flex justify-between py-1.5 border-b border-dashed border-gray-300">
              <span className="text-gray-900">{basicInformation.husbandLastName.value || "N/A"}</span>
            </div>
            <div className="col-span-2 flex justify-between py-1.5 border-b border-dashed border-gray-300">
              <span className="text-gray-900">{basicInformation.wifeLastName.value || "N/A"}</span>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="grid grid-cols-5 gap-4 mb-2">
            <span className="font-medium text-gray-700">Date of Birth:</span>
            <div className="col-span-2 flex justify-between py-1.5 border-b border-dashed border-gray-300">
              <span className="text-gray-900">{formatDate(basicInformation.husbandDateOfBirth.value)}</span>
            </div>
            <div className="col-span-2 flex justify-between py-1.5 border-b border-dashed border-gray-300">
              <span className="text-gray-900">{formatDate(basicInformation.wifeDateOfBirth.value)}</span>
            </div>
          </div>

          {/* Age */}
          <div className="grid grid-cols-5 gap-4 mb-2">
            <span className="font-medium text-gray-700">Age:</span>
            <div className="col-span-2 flex justify-between py-1.5 border-b border-dashed border-gray-300">
              <span className="text-gray-900">
                {basicInformation.husbandAge.value ? `${basicInformation.husbandAge.value} Years` : "N/A"}
              </span>
            </div>
            <div className="col-span-2 flex justify-between py-1.5 border-b border-dashed border-gray-300">
              <span className="text-gray-900">
                {basicInformation.wifeAge.value ? `${basicInformation.wifeAge.value} Years` : "N/A"}
              </span>
            </div>
          </div>

          {/* Gender */}
          <div className="grid grid-cols-5 gap-4 mb-2">
            <span className="font-medium text-gray-700">Gender:</span>
            <div className="col-span-2 flex justify-between py-1.5 border-b border-dashed border-gray-300">
              <span className="text-gray-900">{basicInformation.husbandGender.value || "N/A"}</span>
            </div>
            <div className="col-span-2 flex justify-between py-1.5 border-b border-dashed border-gray-300">
              <span className="text-gray-900">{basicInformation.wifeGender.value || "N/A"}</span>
            </div>
          </div>
        </section>

        {/* ========== Contact Information ========== */}
        <section className="mb-8">
          <h3 className="mb-3 border-b-2 border-sky-700 pb-1 text-lg font-bold text-sky-700">
            Contact Information
          </h3>

          {/* Permanent Address */}
          <div className="grid grid-cols-5 gap-4 mb-2">
            <span className="font-medium text-gray-700">Permanent Address:</span>
            <div className="col-span-2 flex justify-between py-1.5 border-b border-dashed border-gray-300">
              <span className="text-gray-900 max-w-[70%] text-right">
                {basicInformation.husbandPermanentAddress.value || "N/A"}
              </span>
            </div>
            <div className="col-span-2 flex justify-between py-1.5 border-b border-dashed border-gray-300">
              <span className="text-gray-900 max-w-[70%] text-right">
                {basicInformation.wifePermanentAddress.value || "N/A"}
              </span>
            </div>
          </div>

          {/* Home Phone */}
          <div className="grid grid-cols-5 gap-4 mb-2">
            <span className="font-medium text-gray-700">Home Phone:</span>
            <div className="col-span-2 flex justify-between py-1.5 border-b border-dashed border-gray-300">
              <span className="text-gray-900">{basicInformation.husbandHomePhone.value || "N/A"}</span>
            </div>
            <div className="col-span-2 flex justify-between py-1.5 border-b border-dashed border-gray-300">
              <span className="text-gray-900">{basicInformation.wifeHomePhone.value || "N/A"}</span>
            </div>
          </div>

          {/* Mobile Phone */}
          <div className="grid grid-cols-5 gap-4 mb-2">
            <span className="font-medium text-gray-700">Mobile Phone:</span>
            <div className="col-span-2 flex justify-between py-1.5 border-b border-dashed border-gray-300">
              <span className="text-gray-900">{basicInformation.husbandMobilePhone.value || "N/A"}</span>
            </div>
            <div className="col-span-2 flex justify-between py-1.5 border-b border-dashed border-gray-300">
              <span className="text-gray-900">{basicInformation.wifeMobilePhone.value || "N/A"}</span>
            </div>
          </div>

          {/* Email */}
          <div className="grid grid-cols-5 gap-4 mb-2">
            <span className="font-medium text-gray-700">Email:</span>
            <div className="col-span-2 flex justify-between py-1.5 border-b border-dashed border-gray-300">
              <span className="text-gray-900 break-all">{basicInformation.husbandEmail.value || "N/A"}</span>
            </div>
            <div className="col-span-2 flex justify-between py-1.5 border-b border-dashed border-gray-300">
              <span className="text-gray-900 break-all">{basicInformation.wifeEmail.value || "N/A"}</span>
            </div>
          </div>
        </section>

        {/* ========== Referral Information ========== */}
        <section className="mb-6">
          <h3 className="mb-3 border-b-2 border-sky-700 pb-1 text-lg font-bold text-sky-700">
            Referral Information
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Referral Source */}
            <div className="flex justify-between py-1.5 border-b border-dashed border-gray-300">
              <span className="font-medium text-gray-700">Referral Source:</span>
              <span className="text-gray-900">
                {basicInformation.referralSource.value === "other"
                  ? basicInformation.referralSourceOther.value
                  : basicInformation.referralSource.value || "N/A"}
              </span>
            </div>

            {/* Referral Party Present */}
            <div className="flex justify-between py-1.5 border-b border-dashed border-gray-300">
              <span className="font-medium text-gray-700">Referral Party Present:</span>
              <span className="text-gray-900">
                {basicInformation.referralPartyPresent.value ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </section>

        {/* ========== Form Metadata ========== */}
        {/* <footer className="mt-8 text-xs text-gray-600 border-t pt-2">
          <div className="flex justify-between">
            <span>
              <strong>Form Date:</strong>{" "}
              {basicInformation.formDate.value
                ? formatDate(basicInformation.formDate.value)
                : "N/A"}
            </span>
            <span>
              <strong>Last Modified:</strong>{" "}
              {basicInformation.lastModified.value
                ? new Date(basicInformation.lastModified.value).toLocaleString("en-GB")
                : "N/A"}
            </span>
          </div>
        </footer> */}
      </div>
    </>
  );
};



const TabBasicInformationFamily = ({
  id,
  refreshTabDetails,
  setNewId,
  patientTypeId,
  printPreviewMode
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
      label: "Patient Number",
      value: "NEW",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "string",
    },
    husbandFirstName: {
      label: "Husband First Name",
      value: "",
      isTouched: false,
      isValid: false,
      required: true,
      dataType: "string",
    },
    husbandLastName: {
      label: "Husband Last Name",
      value: "",
      isTouched: false,
      isValid: false,
      required: true,
      dataType: "string",
    },
    husbandMiddleName: {
      label: "Husband Middle Name",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "string",
    },
    husbandDateOfBirth: {
      label: "Husband Date of Birth",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "date",
    },
    husbandAge: {
      label: "Husband Age",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "number",
    },
    husbandGender: {
      label: "Husband Gender",
      value: "",
      isTouched: false,
      isValid: false,
      required: true,
      dataType: "string",
    },
    husbandEmail: {
      label: "Husband Email",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "email",
    },
    husbandHomePhone: {
      label: "Husband Home Phone",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "phone",
    },
    husbandMobilePhone: {
      label: "Husband Mobile Phone",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "phone",
    },
    husbandPermanentAddress: {
      label: "Husband Permanent Address",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "string",
    },
    wifeFirstName: {
      label: "Wife First Name",
      value: "",
      isTouched: false,
      isValid: false,
      required: true,
      dataType: "string",
    },
    wifeLastName: {
      label: "Wife Last Name",
      value: "",
      isTouched: false,
      isValid: false,
      required: true,
      dataType: "string",
    },
    wifeMiddleName: {
      label: "Wife Middle Name",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "string",
    },
    wifeDateOfBirth: {
      label: "Wife Date of Birth",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "date",
    },
    wifeAge: {
      label: "Wife Age",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "number",
    },
    wifeGender: {
      label: "Wife Gender",
      value: "",
      isTouched: false,
      isValid: false,
      required: true,
      dataType: "string",
    },
    wifeEmail: {
      label: "Wife Email",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "email",
    },
    wifeHomePhone: {
      label: "Wife Home Phone",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "phone",
    },
    wifeMobilePhone: {
      label: "Wife Mobile Phone",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "phone",
    },
    wifePermanentAddress: {
      label: "Wife Permanent Address",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "string",
    },
    referralSource: {
      label: "Referral Source",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
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
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "boolean",
    },
    formDate: {
      label: "Form Date",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "date",
    },
    lastModified: {
      label: "Last Modified",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "date",
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
          patientId: {
            ...basicInformation.patientId,
            value: patientData.patientId?.toString() || "",
            isTouched: false,
            isValid: true,
          },
          patientNo: {
            ...basicInformation.patientNo,
            value: patientData.patientNo || "",
            isTouched: false,
            isValid: true,
          },
          husbandFirstName: {
            ...basicInformation.husbandFirstName,
            value: patientData.husbandFirstName || "",
            isTouched: false,
            isValid: true,
          },
          husbandLastName: {
            ...basicInformation.husbandLastName,
            value: patientData.husbandLastName || "",
            isTouched: false,
            isValid: true,
          },
          husbandMiddleName: {
            ...basicInformation.husbandMiddleName,
            value: patientData.husbandMiddleName || "",
            isTouched: false,
            isValid: true,
          },
          husbandDateOfBirth: {
            ...basicInformation.husbandDateOfBirth,
            value: patientData.husbandDateOfBirth
              ? moment(patientData.husbandDateOfBirth).format("YYYY-MM-DD")
              : "",
              display: patientData.husbandDateOfBirth
    ? moment(patientData.husbandDateOfBirth).format("DD-MM-YYYY")
    : "",
            isTouched: false,
            isValid: true,
          },
          husbandAge: {
            ...basicInformation.husbandAge,
            value: patientData.husbandAge?.toString() || "",
            isTouched: false,
            isValid: true,
          },
          husbandGender: {
            ...basicInformation.husbandGender,
            value: patientData.husbandGender || "",
            isTouched: false,
            isValid: true,
          },
          husbandEmail: {
            ...basicInformation.husbandEmail,
            value: patientData.husbandEmail || "",
            isTouched: false,
            isValid: true,
          },
          husbandHomePhone: {
            ...basicInformation.husbandHomePhone,
            value: patientData.husbandHomePhone || "",
            isTouched: false,
            isValid: true,
          },
          husbandMobilePhone: {
            ...basicInformation.husbandMobilePhone,
            value: patientData.husbandMobilePhone || "",
            isTouched: false,
            isValid: true,
          },
          husbandPermanentAddress: {
            ...basicInformation.husbandPermanentAddress,
            value: patientData.husbandPermanentAddress || "",
            isTouched: false,
            isValid: true,
          },
          wifeFirstName: {
            ...basicInformation.wifeFirstName,
            value: patientData.wifeFirstName || "",
            isTouched: false,
            isValid: true,
          },
          wifeLastName: {
            ...basicInformation.wifeLastName,
            value: patientData.wifeLastName || "",
            isTouched: false,
            isValid: true,
          },
          wifeMiddleName: {
            ...basicInformation.wifeMiddleName,
            value: patientData.wifeMiddleName || "",
            isTouched: false,
            isValid: true,
          },
          wifeDateOfBirth: {
            ...basicInformation.wifeDateOfBirth,
            value: patientData.wifeDateOfBirth
              ? moment(patientData.wifeDateOfBirth).format("YYYY-MM-DD")
              : "",
              display: patientData.wifeDateOfBirth
    ? moment(patientData.wifeDateOfBirth).format("DD-MM-YYYY")
    : "",
            isTouched: false,
            isValid: true,
          },
          wifeAge: {
            ...basicInformation.wifeAge,
            value: patientData.wifeAge?.toString() || "",
            isTouched: false,
            isValid: true,
          },
          wifeGender: {
            ...basicInformation.wifeGender,
            value: patientData.wifeGender || "",
            isTouched: false,
            isValid: true,
          },
          wifeEmail: {
            ...basicInformation.wifeEmail,
            value: patientData.wifeEmail || "",
            isTouched: false,
            isValid: true,
          },
          wifeHomePhone: {
            ...basicInformation.wifeHomePhone,
            value: patientData.wifeHomePhone || "",
            isTouched: false,
            isValid: true,
          },
          wifeMobilePhone: {
            ...basicInformation.wifeMobilePhone,
            value: patientData.wifeMobilePhone || "",
            isTouched: false,
            isValid: true,
          },
          wifePermanentAddress: {
            ...basicInformation.wifePermanentAddress,
            value: patientData.wifePermanentAddress || "",
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
          formDate: {
            ...basicInformation.formDate,
            value: patientData.formDate
              ? moment(patientData.formDate).format("YYYY-MM-DD")
              : "",
            isTouched: false,
            isValid: true,
          },
          lastModified: {
            ...basicInformation.lastModified,
            value: patientData.lastModified
              ? moment(patientData.lastModified).format("YYYY-MM-DD")
              : "",
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
      console.log('handleSubmit save:',isValid)
    if (!isValid) {
      setIsSaving(false);
      return false;
    }

  

    const payload = {
      patientNo: basicInformation.patientNo.value,
      husbandFirstName: basicInformation.husbandFirstName.value,
      husbandLastName: basicInformation.husbandLastName.value,
      husbandMiddleName: basicInformation.husbandMiddleName.value,
      husbandDateOfBirth: basicInformation.husbandDateOfBirth.value.trim().length===0 ? null:basicInformation.husbandDateOfBirth.value,
      husbandAge: basicInformation.husbandAge.value.trim().length===0 ? null:basicInformation.husbandAge.value,
      husbandGender: basicInformation.husbandGender.value,
      husbandEmail: basicInformation.husbandEmail.value,
      husbandHomePhone: basicInformation.husbandHomePhone.value,
      husbandMobilePhone: basicInformation.husbandMobilePhone.value,
      husbandPermanentAddress: basicInformation.husbandPermanentAddress.value,
      wifeFirstName: basicInformation.wifeFirstName.value,
      wifeLastName: basicInformation.wifeLastName.value,
      wifeMiddleName: basicInformation.wifeMiddleName.value,
      wifeDateOfBirth: basicInformation.wifeDateOfBirth.value.trim().length===0 ? null:basicInformation.wifeDateOfBirth.value,
      wifeAge: basicInformation.wifeAge.value.trim().length===0 ? null:basicInformation.wifeAge.value,
      wifeGender: basicInformation.wifeGender.value,
      wifeEmail: basicInformation.wifeEmail.value,
      wifeHomePhone: basicInformation.wifeHomePhone.value,
      wifeMobilePhone: basicInformation.wifeMobilePhone.value,
      wifePermanentAddress: basicInformation.wifePermanentAddress.value,
      referralSource: basicInformation.referralSource.value,
      referralSourceOther: basicInformation.referralSourceOther.value,
      referralPartyPresent: basicInformation.referralPartyPresent.value ? 1 : 0,
      formDate: basicInformation.formDate.value,
      lastModified: basicInformation.lastModified.value,
      utcOffset: "+05:30",
      pageName: "PatientRegistration",
      patientTypeId,
      isConfirm: true,
    };

       try {
      const res = await updateFamilyBasicInformation(id, payload);
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
    const error = validateField(basicInformation[name].label, value, required, basicInformation[name].dataType);

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
    console.log('handleChangeBasicInfo name:',name)
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

    if (name === "husbandDateOfBirth") {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      updatedInfo["husbandAge"] = {
        ...basicInformation["husbandAge"],
           value: age.toString()=="NaN" ? '' : age.toString(),
        isTouched: true,
        isValid: true,
      };
    }

        if (name === "wifeDateOfBirth") {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      updatedInfo["wifeAge"] = {
        ...basicInformation["wifeAge"],
            value: age.toString()=="NaN" ? '' : age.toString(),
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

      let errorMessage = validateField(field.label, value, required, dataType);

 console.log('handle :',field,errorMessage)

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
  console.log('handle update',isValid)

    if (!isValid) {
      setIsSaving(false);
      return;
    }

    const payload = {
      patientNo: basicInformation.patientNo.value,
      husbandFirstName: basicInformation.husbandFirstName.value,
      husbandLastName: basicInformation.husbandLastName.value,
      husbandMiddleName: basicInformation.husbandMiddleName.value,
      husbandDateOfBirth: basicInformation.husbandDateOfBirth.value.trim().length===0 ? null:basicInformation.husbandDateOfBirth.value,
      husbandAge: basicInformation.husbandAge.value.trim().length===0 ? null:basicInformation.husbandAge.value,
      husbandGender: basicInformation.husbandGender.value,
      husbandEmail: basicInformation.husbandEmail.value,
      husbandHomePhone: basicInformation.husbandHomePhone.value,
      husbandMobilePhone: basicInformation.husbandMobilePhone.value,
      husbandPermanentAddress: basicInformation.husbandPermanentAddress.value,
      wifeFirstName: basicInformation.wifeFirstName.value,
      wifeLastName: basicInformation.wifeLastName.value,
      wifeMiddleName: basicInformation.wifeMiddleName.value,
      wifeDateOfBirth: basicInformation.wifeDateOfBirth.value.trim().length===0 ? null:basicInformation.wifeDateOfBirth.value,
      wifeAge: basicInformation.wifeAge.value.trim().length===0 ? null:basicInformation.wifeAge.value,
      wifeGender: basicInformation.wifeGender.value,
      wifeEmail: basicInformation.wifeEmail.value,
      wifeHomePhone: basicInformation.wifeHomePhone.value,
      wifeMobilePhone: basicInformation.wifeMobilePhone.value,
      wifePermanentAddress: basicInformation.wifePermanentAddress.value,
      referralSource: basicInformation.referralSource.value,
      referralSourceOther: basicInformation.referralSourceOther.value,
      referralPartyPresent: basicInformation.referralPartyPresent.value ? 1 : 0,
      formDate: basicInformation.formDate.value,
      lastModified: basicInformation.lastModified.value,
      utcOffset: "+05:30",
      pageName: "PatientRegistration",
      patientTypeId,
      isConfirm: true,
    };

  try {
      const res = await addFamilyBasicInformation(payload);
      console.log('addFamily',res.data)
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


//   const MaskedDateInput = ({ fieldKey, label, required }) => {
//   const handleChange = (e) => handleMaskedDateChange(e, fieldKey);
//   const clearDate = () => clearDateOfBirth(fieldKey);

//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700">
//         {label}
//         {required && <span className="text-red-500">*</span>}
//       </label>

//       <div className="mt-1 relative">
//         <input
//           type="text"
//           inputMode="numeric"
//           placeholder="DD-MM-YYYY"
//           value={basicInformation[fieldKey]?.display || ""}
//           onChange={handleChange}
//           onKeyDown={handleKeyDown}
//           className="w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
//           aria-label={`${label} (DD-MM-YYYY)`}
//           maxLength="10"
//         />

//         {/* Clear button */}
//         {basicInformation[fieldKey]?.value && (
//           <button
//             type="button"
//             onClick={clearDate}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//             aria-label="Clear date"
//           >
//             <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         )}
//       </div>

//       {basicInformationErrors[fieldKey] && (
//         <p className="mt-1 text-sm text-red-600">
//           {basicInformationErrors[fieldKey]}
//         </p>
//       )}
//     </div>
//   );
// };


const handleMaskedDateChange = (e, fieldKey) => {
  let input = e.target.value.replace(/\D/g, "");
  if (input.length > 8) input = input.slice(0, 8);

  let formatted = "";
  if (input.length > 0) formatted += input.slice(0, 2);
  if (input.length >= 3) formatted += "-" + input.slice(2, 4);
  if (input.length >= 5) formatted += "-" + input.slice(4, 8);

  let isoDate = "";
  let isValid = false;
  let isComplete = input.length === 8;

  if (isComplete) {
    const dd = parseInt(input.slice(0, 2), 10);
    const mm = parseInt(input.slice(2, 4), 10);
    const yyyy = parseInt(input.slice(4, 8), 10);

    if (dd >= 1 && dd <= 31 && mm >= 1 && mm <= 12 && yyyy >= 1900 && yyyy <= 2100) {
      const date = new Date(yyyy, mm - 1, dd);
      if (
        date.getFullYear() === yyyy &&
        date.getMonth() === mm - 1 &&
        date.getDate() === dd
      ) {
        isoDate = `${yyyy}-${String(mm).padStart(2, "0")}-${String(dd).padStart(2, "0")}`;
        isValid = true;
      }
    }
  }

  const ageKey = fieldKey === "husbandDateOfBirth" ? "husbandAge" : "wifeAge";

  const updatedInfo = {
    ...basicInformation,
    [fieldKey]: {
      ...basicInformation[fieldKey],
      value: isoDate,
      display: formatted,
      isTouched: true,
      isValid: isValid || input.length === 0 || !basicInformation[fieldKey].required,
    },
  };

  if (isoDate) {
    const birthDate = new Date(isoDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

    updatedInfo[ageKey] = {
      ...basicInformation[ageKey],
      value: age >= 0 ? age.toString() : "",
      isTouched: true,
      isValid: true,
    };
  } else if (input.length === 0) {
    updatedInfo[ageKey] = {
      ...basicInformation[ageKey],
      value: "",
      isTouched: true,
      isValid: true,
    };
  }

  setBasicInformation(updatedInfo);

  setBasicInformationErrors((prev) => ({
    ...prev,
    [fieldKey]:
      isComplete && !isValid
        ? "Invalid date"
        : !isComplete && basicInformation[fieldKey].required && input.length > 0
        ? "Incomplete date"
        : "",
  }));
};

const clearDateOfBirth = (fieldKey) => {
  const ageKey = fieldKey === "husbandDateOfBirth" ? "husbandAge" : "wifeAge";

  const updatedInfo = {
    ...basicInformation,
    [fieldKey]: {
      ...basicInformation[fieldKey],
      value: "",
      display: "",
      isTouched: true,
      isValid: !basicInformation[fieldKey].required,
    },
    [ageKey]: {
      ...basicInformation[ageKey],
      value: "",
      isTouched: true,
      isValid: true,
    },
  };

  setBasicInformation(updatedInfo);
  setBasicInformationErrors((prev) => ({
    ...prev,
    [fieldKey]: basicInformation[fieldKey].required
      ? `${basicInformation[fieldKey].label} is required.`
      : "",
  }));
};

const handleKeyDown = (e) => {
  if (e.key === "Backspace") {
    const input = e.target;
    const cursorPos = input.selectionStart;
    if (cursorPos > 0 && [3, 6].includes(cursorPos)) {
      input.setSelectionRange(cursorPos - 1, cursorPos - 1);
    }
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

        {!printPreviewMode ?
             
       
    <div className="px-8">
      <section className="mb-4">
        <div className="flex justify-between items-center mb-2 pb-2">
          <h3 className="text-xl font-semibold text-gray-700">Basic Information</h3>
          {mode !== "add" && (
            <div className="flex space-x-4">
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
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : editingSection === "basic" || mode === "add" ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div></div>
              <h4 className="text-lg font-semibold text-sky-700">Husband</h4>
              <h4 className="text-lg font-semibold text-sky-700">Wife</h4>
            </div>
       
            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <label className="block text-sm font-medium text-gray-700">
                First Name{" "}
                {basicInformation.husbandFirstName.required && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <div className="col-span-2">
                <input
                  name="husbandFirstName"
                  value={basicInformation.husbandFirstName.value}
                  onChange={handleChangeBasicInfo}
                  className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter first name"
                  aria-label="Husband First Name"
                  required
                />
                {basicInformationErrors.husbandFirstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {basicInformationErrors.husbandFirstName}
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <input
                  name="wifeFirstName"
                  value={basicInformation.wifeFirstName.value}
                  onChange={handleChangeBasicInfo}
                  className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter first name"
                  aria-label="Wife First Name"
                />
                {basicInformationErrors.wifeFirstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {basicInformationErrors.wifeFirstName}
                  </p>
                )}
              </div>
            </div>
                <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <label className="block text-sm font-medium text-gray-700">
                Middle Name
              </label>
              <div className="col-span-2">
                <input
                  name="husbandMiddleName"
                  value={basicInformation.husbandMiddleName.value}
                  onChange={handleChangeBasicInfo}
                  className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter middle name"
                  aria-label="Husband Middle Name"
                />
                {basicInformationErrors.husbandMiddleName && (
                  <p className="mt-1 text-sm text-red-600">
                    {basicInformationErrors.husbandMiddleName}
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <input
                  name="wifeMiddleName"
                  value={basicInformation.wifeMiddleName.value}
                  onChange={handleChangeBasicInfo}
                  className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter middle name"
                  aria-label="Wife Middle Name"
                />
                {basicInformationErrors.wifeMiddleName && (
                  <p className="mt-1 text-sm text-red-600">
                    {basicInformationErrors.wifeMiddleName}
                  </p>
                )}
              </div>
            </div>

                 <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <label className="block text-sm font-medium text-gray-700">
                Last Name{" "}
                {basicInformation.husbandLastName.required && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <div className="col-span-2">
                <input
                  name="husbandLastName"
                  value={basicInformation.husbandLastName.value}
                  onChange={handleChangeBasicInfo}
                  className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter last name"
                  aria-label="Husband Last Name"
                  required
                />
                {basicInformationErrors.husbandLastName && (
                  <p className="mt-1 text-sm text-red-600">
                    {basicInformationErrors.husbandLastName}
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <input
                  name="wifeLastName"
                  value={basicInformation.wifeLastName.value}
                  onChange={handleChangeBasicInfo}
                  className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter last name"
                  aria-label="Wife Last Name"
                />
                {basicInformationErrors.wifeLastName && (
                  <p className="mt-1 text-sm text-red-600">
                    {basicInformationErrors.wifeLastName}
                  </p>
                )}
              </div>
            </div>
        
            {/* <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth{" "}
                {basicInformation.husbandDateOfBirth.required && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <div className="col-span-2">
                <input
                  type="date"
                  name="husbandDateOfBirth"
                  value={basicInformation.husbandDateOfBirth.value}
                  onChange={handleChangeBasicInfo}
                  className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  aria-label="Husband Date of Birth"
                />
                {basicInformationErrors.husbandDateOfBirth && (
                  <p className="mt-1 text-sm text-red-600">
                    {basicInformationErrors.husbandDateOfBirth}
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <input
                  type="date"
                  name="wifeDateOfBirth"
                  value={basicInformation.wifeDateOfBirth.value}
                  onChange={handleChangeBasicInfo}
                  className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  aria-label="Wife Date of Birth"
                />
                {basicInformationErrors.wifeDateOfBirth && (
                  <p className="mt-1 text-sm text-red-600">
                    {basicInformationErrors.wifeDateOfBirth}
                  </p>
                )}
              </div>
            </div> */}
     <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
  <label className="block text-sm font-medium text-gray-700 pt-3">
    Date of Birth
  </label>

  {/* Husband Date of Birth */}
  <div className="col-span-2">
    <div>
      <div className="mt-1 relative">
        <input
          type="text"
          inputMode="numeric"
          placeholder="DD-MM-YYYY"
          value={basicInformation.husbandDateOfBirth.display || ""}
          onChange={(e) => handleMaskedDateChange(e, "husbandDateOfBirth")}
          onKeyDown={handleKeyDown}
          className="w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
          aria-label="Husband Date of Birth (DD-MM-YYYY)"
          maxLength="10"
        />

        {/* Clear button - Husband */}
        {basicInformation.husbandDateOfBirth.value && (
          <button
            type="button"
            onClick={() => clearDateOfBirth("husbandDateOfBirth")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            aria-label="Clear husband date"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {basicInformationErrors.husbandDateOfBirth && (
        <p className="mt-1 text-sm text-red-600">
          {basicInformationErrors.husbandDateOfBirth}
        </p>
      )}
    </div>
  </div>

  {/* Wife Date of Birth */}
  <div className="col-span-2">
    <div>
      <div className="mt-1 relative">
     
        <input
          type="text"
          inputMode="numeric"
          placeholder="DD-MM-YYYY"
          value={basicInformation.wifeDateOfBirth.display || ""}
          onChange={(e) => handleMaskedDateChange(e, "wifeDateOfBirth")}
          onKeyDown={handleKeyDown}
          className="w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
          aria-label="Wife Date of Birth (DD-MM-YYYY)"
          maxLength="10"
        />

        {/* Clear button - Wife */}
        {basicInformation.wifeDateOfBirth.value && (
          <button
            type="button"
            onClick={() => clearDateOfBirth("wifeDateOfBirth")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            aria-label="Clear wife date"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {basicInformationErrors.wifeDateOfBirth && (
        <p className="mt-1 text-sm text-red-600">
          {basicInformationErrors.wifeDateOfBirth}
        </p>
      )}
    </div>
  </div>
</div>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <div className="col-span-2">
                {basicInformation.husbandDateOfBirth.value && (
                  <div className="flex items-center gap-2 p-3 text-sm border border-gray-300 rounded-md bg-gray-50">
                    <span className="text-gray-800 font-medium">
                      {basicInformation.husbandAge.value}
                    </span>
                   {basicInformation.husbandAge.value ? <span className="text-gray-600">Years</span>:''} 
                  </div>
                )}
              </div>
              <div className="col-span-2">
                {basicInformation.wifeDateOfBirth.value && (
                  <div className="flex items-center gap-2 p-3 text-sm border border-gray-300 rounded-md bg-gray-50">
                    <span className="text-gray-800 font-medium">
                      {basicInformation.wifeAge.value}
                    </span>
                  {basicInformation.wifeAge.value ? <span className="text-gray-600">Years</span>:''}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <label className="block text-sm font-medium text-gray-700">
                Gender{" "}
                {basicInformation.husbandGender.required && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <div className="col-span-2">
                <div className="flex space-x-4 mt-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="husbandGender"
                      value="Male"
                      checked={basicInformation.husbandGender.value === "Male"}
                      onChange={handleChangeBasicInfo}
                      className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                      aria-label="Husband Male"
                    />
                    <span className="ml-2 text-sm text-gray-700">Male</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="husbandGender"
                      value="Female"
                      checked={basicInformation.husbandGender.value === "Female"}
                      onChange={handleChangeBasicInfo}
                      className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                      aria-label="Husband Female"
                    />
                    <span className="ml-2 text-sm text-gray-700">Female</span>
                  </label>
                </div>
                {basicInformationErrors.husbandGender && (
                  <p className="mt-1 text-sm text-red-600">
                    {basicInformationErrors.husbandGender}
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <div className="flex space-x-4 mt-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="wifeGender"
                      value="Male"
                      checked={basicInformation.wifeGender.value === "Male"}
                      onChange={handleChangeBasicInfo}
                      className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                      aria-label="Wife Male"
                    />
                    <span className="ml-2 text-sm text-gray-700">Male</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="wifeGender"
                      value="Female"
                      checked={basicInformation.wifeGender.value === "Female"}
                      onChange={handleChangeBasicInfo}
                      className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                      aria-label="Wife Female"
                    />
                    <span className="ml-2 text-sm text-gray-700">Female</span>
                  </label>
                </div>
                {basicInformationErrors.wifeGender && (
                  <p className="mt-1 text-sm text-red-600">
                    {basicInformationErrors.wifeGender}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <label className="block text-sm font-medium text-gray-700">
                Permanent Address{" "}
                {basicInformation.husbandPermanentAddress.required && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <div className="col-span-2">
                <textarea
                  name="husbandPermanentAddress"
                  value={basicInformation.husbandPermanentAddress.value}
                  onChange={handleChangeBasicInfo}
                  className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  rows="3"
                  placeholder="Enter permanent address"
                  aria-label="Husband Permanent Address"
                />
                {basicInformationErrors.husbandPermanentAddress && (
                  <p className="mt-1 text-sm text-red-600">
                    {basicInformationErrors.husbandPermanentAddress}
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <textarea
                  name="wifePermanentAddress"
                  value={basicInformation.wifePermanentAddress.value}
                  onChange={handleChangeBasicInfo}
                  className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  rows="3"
                  placeholder="Enter permanent address"
                  aria-label="Wife Permanent Address"
                />
                {basicInformationErrors.wifePermanentAddress && (
                  <p className="mt-1 text-sm text-red-600">
                    {basicInformationErrors.wifePermanentAddress}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <label className="block text-sm font-medium text-gray-700">
                Home Phone{" "}
                {basicInformation.husbandHomePhone.required && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <div className="col-span-2">
                <input
                  name="husbandHomePhone"
                  value={basicInformation.husbandHomePhone.value}
                  onChange={handleChangeBasicInfo}
                  className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter home phone"
                  aria-label="Husband Home Phone"
                  required
                />
                {basicInformationErrors.husbandHomePhone && (
                  <p className="mt-1 text-sm text-red-600">
                    {basicInformationErrors.husbandHomePhone}
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <input
                  name="wifeHomePhone"
                  value={basicInformation.wifeHomePhone.value}
                  onChange={handleChangeBasicInfo}
                  className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter home phone"
                  aria-label="Wife Home Phone"
                />
                {basicInformationErrors.wifeHomePhone && (
                  <p className="mt-1 text-sm text-red-600">
                    {basicInformationErrors.wifeHomePhone}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <label className="block text-sm font-medium text-gray-700">
                Mobile Phone
              </label>
              <div className="col-span-2">
                <input
                  name="husbandMobilePhone"
                  value={basicInformation.husbandMobilePhone.value}
                  onChange={handleChangeBasicInfo}
                  className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter mobile phone"
                  aria-label="Husband Mobile Phone"
                />
                {basicInformationErrors.husbandMobilePhone && (
                  <p className="mt-1 text-sm text-red-600">
                    {basicInformationErrors.husbandMobilePhone}
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <input
                  name="wifeMobilePhone"
                  value={basicInformation.wifeMobilePhone.value}
                  onChange={handleChangeBasicInfo}
                  className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter mobile phone"
                  aria-label="Wife Mobile Phone"
                />
                {basicInformationErrors.wifeMobilePhone && (
                  <p className="mt-1 text-sm text-red-600">
                    {basicInformationErrors.wifeMobilePhone}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="col-span-2">
                <input
                  name="husbandEmail"
                  type="email"
                  value={basicInformation.husbandEmail.value}
                  onChange={handleChangeBasicInfo}
                  className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter email"
                  aria-label="Husband Email"
                />
                {basicInformationErrors.husbandEmail && (
                  <p className="mt-1 text-sm text-red-600">
                    {basicInformationErrors.husbandEmail}
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <input
                  name="wifeEmail"
                  type="email"
                  value={basicInformation.wifeEmail.value}
                  onChange={handleChangeBasicInfo}
                  className="mt-1 w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter email"
                  aria-label="Wife Email"
                />
                {basicInformationErrors.wifeEmail && (
                  <p className="mt-1 text-sm text-red-600">
                    {basicInformationErrors.wifeEmail}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div></div>
              <h4 className="text-lg font-semibold text-sky-700 mb-4">Husband</h4>
              <h4 className="text-lg font-semibold text-sky-700 mb-4">Wife</h4>
            </div>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <span className="font-bold text-sm">First Name</span>
              <div className="col-span-2">
                 <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className=" whitespace-pre-line">
                    {basicInformation.husbandFirstName.value }
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                             <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className=" whitespace-pre-line">
                    {basicInformation.wifeFirstName.value }
                  </div>
                </div>
              </div>
            </div>
             <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <span className="font-bold text-sm">Middle Name</span>
              <div className="col-span-2">
                            <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className=" whitespace-pre-line">
                    {basicInformation.husbandMiddleName.value }
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                       <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className=" whitespace-pre-line">
                    {basicInformation.wifeMiddleName.value }
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <span className="font-bold text-sm">Last Name</span>
              <div className="col-span-2">
                               <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className=" whitespace-pre-line">
                    {basicInformation.husbandLastName.value }
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                                <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className=" whitespace-pre-line">
                    {basicInformation.wifeLastName.value }
                  </div>
                </div>
              </div>
            </div>
           
            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <span className="font-bold text-sm">Date of Birth</span>
              <div className="col-span-2">
                              <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className=" whitespace-pre-line">
                    {basicInformation.husbandDateOfBirth.value
                      ? moment(basicInformation.husbandDateOfBirth.value).format("YYYY MMM DD")
                      : ""}
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                               <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className=" whitespace-pre-line">
                    {basicInformation.wifeDateOfBirth.value
                      ? moment(basicInformation.wifeDateOfBirth.value).format("YYYY MMM DD")
                      : ""}
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <span className="font-bold text-sm">Age</span>
              <div className="col-span-2">
                              <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className=" whitespace-pre-line">
                    {basicInformation.husbandAge.value} 
                        {basicInformation.husbandAge.value ? "Years":''}
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                 <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className=" whitespace-pre-line">
                    {basicInformation.wifeAge.value}
                        {basicInformation.wifeAge.value ? "Years":''}
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <span className="font-bold text-sm">Gender</span>
              <div className="col-span-2">
                              <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className=" whitespace-pre-line">
                    {basicInformation.husbandGender.value }
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                 <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className=" whitespace-pre-line">
                    {basicInformation.wifeGender.value }
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <span className="font-bold text-sm">Permanent Address</span>
              <div className="col-span-2">
                 <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className=" whitespace-pre-line">
                    {basicInformation.husbandPermanentAddress.value }
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                         <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className=" whitespace-pre-line">
                    {basicInformation.wifePermanentAddress.value }
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <span className="font-bold text-sm">Home Phone</span>
              <div className="col-span-2">
                         <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className=" whitespace-pre-line">
                    {basicInformation.husbandHomePhone.value }
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                 <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className=" whitespace-pre-line">
                    {basicInformation.wifeHomePhone.value }
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <span className="font-bold text-sm">Mobile Phone</span>
              <div className="col-span-2">
                 <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className=" whitespace-pre-line">
                    {basicInformation.husbandMobilePhone.value }
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                 <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className=" whitespace-pre-line">
                    {basicInformation.wifeMobilePhone.value }
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <span className="font-bold text-sm">Email</span>
              <div className="col-span-2">
                 <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className=" whitespace-pre-line">
                    {basicInformation.husbandEmail.value }
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                 <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className=" whitespace-pre-line">
                    {basicInformation.wifeEmail.value }
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
            className="flex items-center bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition-all duration-200 shadow-md"
            aria-label="Save and go to next tab"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      )}
    </div>

:

<FamilyInfoPrint basicInformation={basicInformation} />
}
    </>
  );
};

export default TabBasicInformationFamily;