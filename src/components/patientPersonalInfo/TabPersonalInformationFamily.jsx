import { useEffect, useState } from "react";
import { FaFemale, FaMale, FaPlusCircle, FaSync } from "react-icons/fa";
import LoadingSpinner from "../LoadingSpinner";
import MessageModel from "../MessageModel";
import {
  addOccupation,
  addPersonalInformationFamily,
  drpBadPoints,
  drpGoodPoints,
  drpOccupations,
  drpSocialDifficulties,
  getPatientPersonalInfo,
  updatePersonalInformationFamily,
} from "../../functions/patient";
import VoiceToText from "../VoiceToText";
import EditButton from "../EditButton";
import DialogModel from "../model/DialogModel";

const maritalStatusOptions = [
  { value: "married", text: "Married" },
  { value: "separated", text: "Separated" },
  { value: "divorced", text: "Divorced" },
  { value: "living_together", text: "Living together" },
  { value: "widowed", text: "Widowed" },
  { value: "widowed_remarried", text: "Widowed, remarried" },
];

const workStatusOptions = [
  { value: "full-time", text: "Full-time" },
  { value: "part-time", text: "Part-time" },
];


/* --------------------------------------------------------------
   Print-Only CSS: A4, page breaks, color accuracy
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
   Print View: Family Personal Information (Husband + Wife)
   -------------------------------------------------------------- */
const PrintPersonalInformationFamilyA4 = ({ personalInformation, maritalStatusOptions }) => {

  // Helper: Get marital status text
  const getMaritalText = (value) => {
    const opt = maritalStatusOptions.find(o => o.value === value);
    return opt ? opt.text : "N/A";
  };

  // Helper: Split comma-separated ages
  const splitAges = (field) => {
    const raw = personalInformation[field]?.value;
    if (!raw) return [];
    return raw.split(",").map(a => a.trim()).filter(Boolean);
  };

  const maleAges = splitAges("maleChildrenAges");
  const femaleAges = splitAges("femaleChildrenAges");

  // Helper: Render value or N/A
  const renderValue = (value) => {
    return value ? value : <span className="italic text-gray-500">N/A</span>;
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />

      <div className="print-break mx-auto max-w-[210mm] bg-white font-sans text-sm leading-relaxed">

        {/* ========== PAGE 1: Title + Marital Details ========== */}
        <div>
          <h1 className="text-xl text-center mb-5 font-bold text-sky-700">
            Family Personal Information
          </h1>

          <h3 className="mb-3 border-b-2 border-sky-700 pb-1 text-lg font-bold text-sky-700">
            Marital Details
          </h3>

          {/* Two-column layout */}
          <section className="grid grid-cols-2 gap-6">

            {/* ---- LEFT COLUMN: Husband ---- */}
            <div className="space-y-4">
              {/* Marital Status */}
              <div className="flex justify-between items-start py-2 border-b border-gray-300">
                <span className="font-medium text-gray-700 w-1/2">
                  Present Marital Status
                </span>
                <span className="text-gray-900 w-1/2 text-right">
                  {getMaritalText(personalInformation.maritalStatusHusband.value)}
                </span>
              </div>

              {/* Years Married */}
              {personalInformation.maritalStatusHusband.value === "married" && (
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <span className="font-medium text-gray-700 w-2/3">
                    Number of Years Married to Present Spouse
                  </span>
                  <span className="text-gray-900 w-1/3 text-right">
                    {renderValue(personalInformation.yearsMarriedHusband.value)} yrs
                  </span>
                </div>
              )}

              {/* Male Children Ages */}
              <div className="flex justify-between items-start py-2 border-b border-gray-300">
                <span className="font-medium text-gray-700 w-1/2">
                  Ages of Male Children
                </span>
                <div className="text-gray-900 w-1/2 text-right">
                  {maleAges.length ? maleAges.join(", ") : <span className="italic text-gray-500">N/A</span>}
                </div>
              </div>
            </div>

            {/* ---- RIGHT COLUMN: Wife ---- */}
            <div className="space-y-4">
              {/* Marital Status */}
              <div className="flex justify-between items-start py-2 border-b border-gray-300">
                <span className="font-medium text-gray-700 w-1/2">
                  Present Marital Status
                </span>
                <span className="text-gray-900 w-1/2 text-right">
                  {getMaritalText(personalInformation.maritalStatusWife.value)}
                </span>
              </div>

              {/* Years Married */}
              {personalInformation.maritalStatusWife.value === "married" && (
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <span className="font-medium text-gray-700 w-2/3">
                    Number of Years Married to Present Spouse
                  </span>
                  <span className="text-gray-900 w-1/3 text-right">
                    {renderValue(personalInformation.yearsMarriedWife.value)} yrs
                  </span>
                </div>
              )}

              {/* Female Children Ages */}
              <div className="flex justify-between items-start py-2 border-b border-gray-300">
                <span className="font-medium text-gray-700 w-1/2">
                  Ages of Female Children
                </span>
                <div className="text-gray-900 w-1/2 text-right">
                  {femaleAges.length ? femaleAges.join(", ") : <span className="italic text-gray-500">N/A</span>}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ========== PAGE 2: Personal Insights ========== */}
        <div className="print-break mt-8">
          <h3 className="mb-3 border-b-2 border-sky-700 pb-1 text-lg font-bold text-sky-700">
            Personal Insights
          </h3>

          <div className="space-y-4">
            {/* Love & Sex Difficulties */}
            <div className="py-2">
              <span className="font-medium text-gray-700 block mb-1">
                Main Love and Sex Difficulties
              </span>
              <div className="bg-white border border-dashed border-gray-300 rounded-md p-4 min-h-[3em]">
                {renderValue(personalInformation.loveSexDifficulties.value)}
              </div>
            </div>

            {/* Life Goals */}
            <div className="py-2">
              <span className="font-medium text-gray-700 block mb-1">
                Main Life Goals
              </span>
              <div className="bg-white border border-dashed border-gray-300 rounded-md p-4 min-h-[3em]">
                {renderValue(personalInformation.lifeGoals.value)}
              </div>
            </div>

            {/* Things to Change */}
            <div className="py-2">
              <span className="font-medium text-gray-700 block mb-1">
                Things Most Like to Change About Yourself
              </span>
              <div className="bg-white border border-dashed border-gray-300 rounded-md p-4 min-h-[3em]">
                {renderValue(personalInformation.thingsToChange.value)}
              </div>
            </div>
          </div>
        </div>

        {/* ========== PAGE 3: Occupation Information ========== */}
        <div className="print-break mt-8">
          <h3 className="mb-3 border-b-2 border-sky-700 pb-1 text-lg font-bold text-sky-700">
            Occupation Information
          </h3>

          {/* Column Headers */}
          <div className="grid grid-cols-5 gap-4 mb-4 font-semibold text-sky-700 text-sm">
            <div></div>
            <div className="col-span-2 text-center">Husband</div>
            <div className="col-span-2 text-center">Wife</div>
          </div>

          {/* Occupation Trained For */}
          <div className="grid grid-cols-5 gap-4 mb-4">
            <span className="font-semibold text-gray-700">
              Occupation(s) Trained For
            </span>
            <div className="col-span-2">
              <div className="bg-white border border-dashed border-gray-300 rounded-md p-4">
                {renderValue(personalInformation.occupationTrainedHusband.value)}
              </div>
            </div>
            <div className="col-span-2">
              <div className="bg-white border border-dashed border-gray-300 rounded-md p-4">
                {renderValue(personalInformation.occupationTrainedWife.value)}
              </div>
            </div>
          </div>

          {/* Present Occupation */}
          <div className="grid grid-cols-5 gap-4 mb-4">
            <span className="font-semibold text-gray-700">
              Present Occupation
            </span>
            <div className="col-span-2">
              <div className="bg-white border border-dashed border-gray-300 rounded-md p-4">
                {renderValue(personalInformation.occupationHusband.value)}
              </div>
            </div>
            <div className="col-span-2">
              <div className="bg-white border border-dashed border-gray-300 rounded-md p-4">
                {renderValue(personalInformation.occupationWife.value)}
              </div>
            </div>
          </div>

          {/* Work Status */}
          <div className="grid grid-cols-5 gap-4 mb-4">
            <span className="font-semibold text-gray-700">
              Work Status
            </span>
            <div className="col-span-2">
              <div className="bg-white border border-dashed border-gray-300 rounded-md p-4 text-center font-medium">
                {renderValue(
                  personalInformation.workStatusHusband.value === "full-time" ? "Full-time" :
                  personalInformation.workStatusHusband.value === "part-time" ? "Part-time" : null
                )}
              </div>
            </div>
            <div className="col-span-2">
              <div className="bg-white border border-dashed border-gray-300 rounded-md p-4 text-center font-medium">
                {renderValue(
                  personalInformation.workStatusWife.value === "full-time" ? "Full-time" :
                  personalInformation.workStatusWife.value === "part-time" ? "Part-time" : null
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};




const TabPersonalInformationFamily = ({ id, refreshTabDetails, setActiveTab,printPreviewMode }) => {
  const [personalInformationErrors, setPersonalInformationErrors] = useState({});
  const [mode, setMode] = useState("add");
  const [editingSection, setEditingSection] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [initialPersonalInformation, setInitialPersonalInformation] = useState(null);
  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    type: "error",
  });

  const [isOccupationLoading, setIsOccupationLoading] = useState(false);

  const [personalInformation, setPersonalInformation] = useState({
   
    maritalStatusHusband: {
      label: "Husband Present Marital Status",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "string",
    },
    yearsMarriedHusband: {
      label: "Husband Number of Years Married",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "number",
    },
    maritalStatusWife: {
      label: "Wife Present Marital Status",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "string",
    },
    yearsMarriedWife: {
      label: "Wife Number of Years Married",
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
  

    loveSexDifficulties: {
      label: "Main Love and Sex Difficulties",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },


    lifeGoals: {
      label: "Main Life Goals",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
    thingsToChange: {
      label: "Things to Change About Yourself",
      value: "",
      isTouched: false,
      isValid: true,
      required: false,
      dataType: "string",
    },
    occupationTrainedHusband: {
      label: "Husband Occupation(s) Trained For",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "string",
    },
    occupationTrainedWife: {
      label: "Wife Occupation(s) Trained For",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "string",
    },
    occupationHusband: {
      label: "Husband Present Occupation",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "string",
    },
    occupationWife: {
      label: "Wife Present Occupation",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "string",
    },

     workStatusHusband: {
      label: "Work Status",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "string",
    },

    workStatusWife: {
      label: "Work Status",
      value: "",
      isTouched: false,
      isValid: false,
      required: false,
      dataType: "string",
    },


  });

  const loadPersonalInformationData = async () => {
    setIsLoading(true);
    const result = await getPatientPersonalInfo(id);
    const patientData = result.data;

    if (patientData.error) {
      setModal({
        isOpen: true,
        message: patientData.error.message,
        type: "error",
      });
    }

    if (patientData) {
      setMode("edit");
    }

    if (patientData) {
      setPersonalInformation({
        maritalStatusHusband: {
          ...personalInformation.maritalStatusHusband,
          value: patientData.maritalStatusHusband || "",
          isTouched: false,
          isValid: true,
        },
        yearsMarriedHusband: {
          ...personalInformation.yearsMarriedHusband,
          value: patientData.yearsMarriedHusband || "",
          isTouched: false,
          isValid: true,
          required: patientData.maritalStatusHusband === "married",
        },
        maritalStatusWife: {
          ...personalInformation.maritalStatusWife,
          value: patientData.maritalStatusWife || "",
          isTouched: false,
          isValid: true,
        },
        yearsMarriedWife: {
          ...personalInformation.yearsMarriedWife,
          value: patientData.yearsMarriedWife || "",
          isTouched: false,
          isValid: true,
          required: patientData.maritalStatusWife === "married",
        },
        maleChildrenAges: {
          ...personalInformation.maleChildrenAges,
          value: patientData.maleChildrenAges,
          isTouched: false,
          isValid: true,
        },
        femaleChildrenAges: {
          ...personalInformation.femaleChildrenAges,
          value: patientData.femaleChildrenAges,
          isTouched: false,
          isValid: true,
        },
     
        loveSexDifficulties: {
          ...personalInformation.loveSexDifficulties,
          value: patientData.loveSexDifficulties,
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
        occupationTrainedHusband: {
          ...personalInformation.occupationTrainedHusband,
          value: patientData.occupationTrainedHusband || "",
          isTouched: false,
          isValid: true,
        },
        occupationTrainedWife: {
          ...personalInformation.occupationTrainedWife,
          value: patientData.occupationTrainedWife || "",
          isTouched: false,
          isValid: true,
        },
        occupationHusband: {
          ...personalInformation.occupationHusband,
          value: patientData.occupationHusband || "",
          isTouched: false,
          isValid: true,
        },
        occupationWife: {
          ...personalInformation.occupationWife,
          value: patientData.occupationWife || "",
          isTouched: false,
          isValid: true,
        },
        workStatusHusband: {
          ...personalInformation.occupationFullTimeHusband,
          value: patientData.occupationFullTimeHusband || "",
          isTouched: false,
          isValid: true,
        },
            workStatusWife: {
          ...personalInformation.occupationFullTimeWife,
          value: patientData.occupationFullTimeWife || "",
          isTouched: false,
          isValid: true,
        },
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      loadPersonalInformationData();
    }
  }, [id]);


  const [occupations, setOccupations] = useState([]);


  const loadDrpOccupations = async () => {
    const occupations = await drpOccupations();
    setOccupations(occupations.data.results[0]);
  };

  useEffect(() => {
    loadDropdowns();
  }, []);

  const loadDropdowns = async () => {
    await loadDrpOccupations();
  };

  useEffect(() => {
    setInitialPersonalInformation({ ...personalInformation });
  }, [editingSection]);

  const toggleSectionEdit = async (section) => {
    if (editingSection === section) {
      const isValid = await handleSubmitp(section);
      if (isValid) setEditingSection(null);
    } else {
      setEditingSection(section);
    }
  };

  const handleSubmitp = async (section) => {
    setIsSaving(true);
    const isValid = validatePersonalInformation();
    if (!isValid) {
      setIsSaving(false);
      return false;
    }

    const payload = {
      patientId: id,
      maritalStatusHusband: personalInformation.maritalStatusHusband.value,
      yearsMarriedHusband:
        personalInformation.yearsMarriedHusband.value === ""
          ? null
          : personalInformation.yearsMarriedHusband.value,
      maritalStatusWife: personalInformation.maritalStatusWife.value,
      yearsMarriedWife:
        personalInformation.yearsMarriedWife.value === ""
          ? null
          : personalInformation.yearsMarriedWife.value,
      maleChildrenAges: personalInformation.maleChildrenAges.value,
      femaleChildrenAges: personalInformation.femaleChildrenAges.value,
 
      loveSexDifficulties: personalInformation.loveSexDifficulties.value,

      lifeGoals: personalInformation.lifeGoals.value,
      thingsToChange: personalInformation.thingsToChange.value,
      occupationTrainedHusband:personalInformation.occupationTrainedHusband.value ? personalInformation.occupationTrainedHusband.value:null,
      occupationTrainedWife: personalInformation.occupationTrainedWife.value ? personalInformation.occupationTrainedWife.value:null,
      occupationHusband: personalInformation.occupationHusband.value ? personalInformation.occupationHusband.value:null,
      occupationWife: personalInformation.occupationWife.value ? personalInformation.occupationWife.value:null,
      occupationFullTimeHusband:personalInformation.workStatusHusband.value ? personalInformation.workStatusHusband.value:null,
      occupationFullTimeWife: personalInformation.workStatusWife.value ? personalInformation.workStatusWife.value:null,
      pageName: "PatientBackgroundForm",
      isConfirm: true,
    };

    try {
      const res = await updatePersonalInformationFamily(id, payload);

      if (res.data.error) {
        setModal({ isOpen: true, message: res.data.error.message, type: "error" });
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

      await loadPersonalInformationData();

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

    if (value && dataType === "number") {
      if (isNaN(value) || Number(value) < 0) {
        return `${name} must be a valid non-negative number`;
      }
    }

    return "";
  };

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

    if (name === "maritalStatusHusband" || name === "maritalStatusWife") {
      const isMarried = value === "married";
      const fieldToUpdate = name === "maritalStatusHusband" ? "yearsMarriedHusband" : "yearsMarriedWife";
      setPersonalInformation((prev) => ({
        ...prev,
        [fieldToUpdate]: {
          ...prev[fieldToUpdate],
          required: isMarried,
          isValid: !isMarried || (value.trim() !== "" && !isNaN(value)),
        },
      }));
      setPersonalInformationErrors((prev) => ({
        ...prev,
        [fieldToUpdate]: isMarried && !value.trim() ? `${fieldToUpdate.replace("Husband", "").replace("Wife", "")} Number of Years Married is required` : "",
      }));
    }
  };



  const handleWorkStatusChange = (e) => {
    const {value,name} = e.target;
    setPersonalInformation((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        isTouched: true,
        isValid: true,
      },
    }));
    setPersonalInformationErrors((prev) => ({
      ...prev,
      workStatus: "",
    }));
  };

  const validatePersonalInformation = () => {
    const errors = {};
    let isFormValid = true;
    const updatedInfo = { ...personalInformation };

    Object.entries(personalInformation).forEach(([key, field]) => {

      if(!field.value)
 console.log('validatePersonalInformation:',key,field.value)

      if (!field || typeof field !== "object" || !("value" in field)) return;
   
      const { value, required, dataType } = field;
      let errorMessage = validateField(field.label, value, required, dataType);

      // if (key === "yearsMarriedHusband" && personalInformation.maritalStatusHusband.value === "married") {
      //   if (!value || (typeof value === "string" && value.trim() === "")) {
      //     errorMessage = "Husband Number of Years Married is required";
      //   }
      // }
      // if (key === "yearsMarriedWife" && personalInformation.maritalStatusWife.value === "married") {
      //   if (!value || (typeof value === "string" && value.trim() === "")) {
      //     errorMessage = "Wife Number of Years Married is required";
      //   }
      // }

      if (errorMessage) {
        isFormValid = false;
        errors[key] = errorMessage;
        updatedInfo[key].isValid = false;
      } else {
        updatedInfo[key].isValid = true;
      }
      updatedInfo[key].isTouched = updatedInfo[key].isTouched || false;
    });

    setPersonalInformation(updatedInfo);
    setPersonalInformationErrors(errors);
    return isFormValid;
  };


  const handleSubmitPersonalInformation = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const isValid = validatePersonalInformation();

    console.log('handleSubmitPersonalInformation:',isValid)
    if (isValid) {
      const payload = {
        patientId: id,
        maritalStatusHusband: personalInformation.maritalStatusHusband.value,
        yearsMarriedHusband:
          personalInformation.yearsMarriedHusband.value === ""
            ? null
            : personalInformation.yearsMarriedHusband.value,
        maritalStatusWife: personalInformation.maritalStatusWife.value,
        yearsMarriedWife:
          personalInformation.yearsMarriedWife.value === ""
            ? null
            : personalInformation.yearsMarriedWife.value,
        maleChildrenAges: personalInformation.maleChildrenAges.value,
        femaleChildrenAges: personalInformation.femaleChildrenAges.value,

        loveSexDifficulties: personalInformation.loveSexDifficulties.value,

        lifeGoals: personalInformation.lifeGoals.value,
        thingsToChange: personalInformation.thingsToChange.value,
      occupationTrainedHusband:personalInformation.occupationTrainedHusband.value ? personalInformation.occupationTrainedHusband.value:null,
      occupationTrainedWife: personalInformation.occupationTrainedWife.value ? personalInformation.occupationTrainedWife.value:null,
      occupationHusband: personalInformation.occupationHusband.value ? personalInformation.occupationHusband.value:null,
      occupationWife: personalInformation.occupationWife.value ? personalInformation.occupationWife.value:null,
      occupationFullTimeHusband:personalInformation.workStatusHusband.value ? personalInformation.workStatusHusband.value:null,
      occupationFullTimeWife: personalInformation.workStatusWife.value ? personalInformation.workStatusWife.value:null,
        pageName: "PatientBackgroundForm",
        isConfirm: true,
      };

      const submitPayloadWithPatientId = {
        ...payload,
        patientId: id,
      };

      try {
        const res = await addPersonalInformationFamily(submitPayloadWithPatientId);
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

        await loadPersonalInformationData();

        setModal({
          isOpen: true,
          message: res.data.outputValues.outputMessage,
          type: "success",
        });
        refreshTabDetails(Math.random());
      } catch (err) {
        setModal({ isOpen: true, message: err.message, type: "error" });
      }
    }
    setIsSaving(false);
  };

  const handleCancel = (editingSection) => {
    if (initialPersonalInformation) {
      setPersonalInformation(initialPersonalInformation);
      setPersonalInformationErrors({});
    }
    setEditingSection(null);
  };



//occupation add panel
const [showOccuptionAddPanel,setShowOccuptionAddPanel]=useState(false);
const [newOccupationName,setNewOccupationName]=useState('');
  const [selectedOccupationField,setSelectedOccupationField]=useState('');

const NewOccupationPanel = () => {
  return (
    <div className="mt-4 p-4 border border-blue-200 rounded-lg">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Enter New Occupation Name
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={newOccupationName}
          onChange={(e) => setNewOccupationName(e.target.value)}
          placeholder="e.g., Data Scientist"
          className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          autoFocus
        />
        <button
          onClick={async () => {
            if (!newOccupationName.trim()) {
              setModal({
                isOpen: true,
                message: "Please enter an occupation name.",
                type: "error",
              });
              return;
            }

            setIsSaving(true);
            const occupationRes = await addOccupation({ occupationName: newOccupationName.trim() });

            console.log('occupationRes',occupationRes)
            if (occupationRes.data.error) {
              setModal({
                isOpen: true,
                message: occupationRes.data.error.message,
                type: "error",
              });
              setIsSaving(false);
              return;
            }

            if (occupationRes.data.outputValues.responseStatus === "failed") {
              setModal({
                isOpen: true,
                message: occupationRes.data.outputValues.outputMessage,
                type: "warning",
              });
              setIsSaving(false);
              return;
            }

            await loadDrpOccupations();

            const occupatoinId=occupationRes.data.outputValues.occupationId;

            setPersonalInformation((prev) => ({
              ...prev,
              [selectedOccupationField]: {
                ...prev[selectedOccupationField],
                value: newOccupationName.trim(),
              },
              // occupation: {
              //   ...prev.occupation,
              //   value: newOccupationName.trim(),
              // },
            }));

            setNewOccupationName("");
            setShowOccuptionAddPanel(false);
            setIsSaving(false);

            setModal({
              isOpen: true,
              message: "New occupation added and selected!",
              type: "success",
            });
          }}
          disabled={isSaving}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {isSaving ? "Adding..." : "Add"}
        </button>
        <button
          onClick={() => {
            setShowOccuptionAddPanel(false);
            setNewOccupationName("");
          }}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
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

      <DialogModel
        header={"Add New Occupation"}
        visible={showOccuptionAddPanel}
        onHide={() => setShowOccuptionAddPanel(false)}
      >


<NewOccupationPanel />

</DialogModel>




      {!isLoading ? (


!printPreviewMode ? 

       <div className="px-8">
      {/* Personal Details */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-2 pb-2">
          <h3 className="text-xl font-semibold text-gray-700">Marital Details</h3>
          {mode !== "add" && (
            <div className="flex space-x-4">
              <EditButton
                onClick={() => toggleSectionEdit("personalDetails")}
                ariaLabel={
                  editingSection === "personalDetails"
                    ? "Save Personal Details"
                    : "Edit Personal Details"
                }
                disabled={isSaving}
              >
                {editingSection === "personalDetails"
                  ? isSaving
                    ? "Saving..."
                    : "Save"
                  : "Edit"}
              </EditButton>
              {editingSection === "personalDetails" && (
                <button
                  onClick={() => handleCancel("personalDetails")}
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
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div></div>
              <h4 className="text-lg font-semibold text-sky-700">Husband</h4>
              <h4 className="text-lg font-semibold text-sky-700">Wife</h4>
            </div>

            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <label className="block text-sm font-medium text-gray-700">
                Present Marital Status{" "}
                {personalInformation.maritalStatusHusband.required && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <div className="col-span-2">
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {maritalStatusOptions.map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="maritalStatusHusband"
                        value={option.value}
                        checked={
                          personalInformation.maritalStatusHusband.value === option.value
                        }
                        onChange={handleChangePersonalInfo}
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                        aria-label={option.text}
                      />
                      <span className="ml-2 text-sm text-gray-700">{option.text}</span>
                    </label>
                  ))}
                </div>
                {personalInformationErrors.maritalStatusHusband && (
                  <p className="mt-1 text-sm text-red-600">
                    {personalInformationErrors.maritalStatusHusband}
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {maritalStatusOptions.map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="maritalStatusWife"
                        value={option.value}
                        checked={
                          personalInformation.maritalStatusWife.value === option.value
                        }
                        onChange={handleChangePersonalInfo}
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                        aria-label={option.text}
                      />
                      <span className="ml-2 text-sm text-gray-700">{option.text}</span>
                    </label>
                  ))}
                </div>
                {personalInformationErrors.maritalStatusWife && (
                  <p className="mt-1 text-sm text-red-600">
                    {personalInformationErrors.maritalStatusWife}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <label className="block text-sm font-medium text-gray-700">
                Number of Years Married{" "}
                {personalInformation.yearsMarriedHusband.required && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <div className="col-span-2">
                <input
                  type="number"
                  name="yearsMarriedHusband"
                  value={personalInformation.yearsMarriedHusband.value}
                  onChange={handleChangePersonalInfo}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="e.g., 1, 1.5, 2"
                  disabled={personalInformation.maritalStatusHusband.value !== "married"}
                  aria-label="Husband years married"
                />
                {personalInformationErrors.yearsMarriedHusband && (
                  <p className="mt-1 text-sm text-red-600">
                    {personalInformationErrors.yearsMarriedHusband}
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  name="yearsMarriedWife"
                  value={personalInformation.yearsMarriedWife.value}
                  onChange={handleChangePersonalInfo}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="e.g., 1, 1.5, 2"
                  disabled={personalInformation.maritalStatusWife.value !== "married"}
                  aria-label="Wife years married"
                />
                {personalInformationErrors.yearsMarriedWife && (
                  <p className="mt-1 text-sm text-red-600">
                    {personalInformationErrors.yearsMarriedWife}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <label className="block text-sm font-medium text-gray-700">
                Ages of Children{" "}
                {personalInformation.maleChildrenAges.required && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <div className="col-span-2">
                <input
                  name="maleChildrenAges"
                  type="text"
                  value={personalInformation.maleChildrenAges.value}
                  onChange={handleChangePersonalInfo}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="e.g., 5, 10, 15"
                  aria-label="Male children ages"
                />
                {personalInformationErrors.maleChildrenAges && (
                  <p className="mt-1 text-sm text-red-600">
                    {personalInformationErrors.maleChildrenAges}
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <input
                  name="femaleChildrenAges"
                  type="text"
                  value={personalInformation.femaleChildrenAges.value}
                  onChange={handleChangePersonalInfo}
                  className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="e.g., 3, 8"
                  aria-label="Female children ages"
                />
                {personalInformationErrors.femaleChildrenAges && (
                  <p className="mt-1 text-sm text-red-600">
                    {personalInformationErrors.femaleChildrenAges}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div></div>
              <h4 className="text-lg font-semibold text-sky-700 mb-4">Husband</h4>
              <h4 className="text-lg font-semibold text-sky-700 mb-4">Wife</h4>
            </div>

            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <span className="font-bold text-sm">Marital Status</span>
              <div className="col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="whitespace-pre-line">
                    {maritalStatusOptions.find(
                      (opt) => opt.value === personalInformation.maritalStatusHusband.value
                    )?.text || "N/A"}
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="whitespace-pre-line">
                    {maritalStatusOptions.find(
                      (opt) => opt.value === personalInformation.maritalStatusWife.value
                    )?.text || "N/A"}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <span className="font-bold text-sm">Years Married</span>
              <div className="col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="whitespace-pre-line">
                    {personalInformation.maritalStatusHusband.value === "married"
                      ? `${personalInformation.yearsMarriedHusband.value || "N/A"} yrs`
                      : "N/A"}
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="whitespace-pre-line">
                    {personalInformation.maritalStatusWife.value === "married"
                      ? `${personalInformation.yearsMarriedWife.value || "N/A"} yrs`
                      : "N/A"}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <span className="font-bold text-sm">Ages of Children</span>
              <div className="col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex flex-wrap justify-start gap-2">
                    {personalInformation.maleChildrenAges.value
                      ? personalInformation.maleChildrenAges.value
                          .split(",")
                          .map((age, index) => (
                            <span
                              key={`male-${index}`}
                              className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                            >
                              <FaMale className="mr-1" /> {age.trim()}
                            </span>
                          ))
                      : "N/A"}
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex flex-wrap justify-start gap-2">
                    {personalInformation.femaleChildrenAges.value
                      ? personalInformation.femaleChildrenAges.value
                          .split(",")
                          .map((age, index) => (
                            <span
                              key={`female-${index}`}
                              className="inline-flex items-center px-2 py-1 bg-pink-100 text-pink-800 text-xs font-medium rounded-full"
                            >
                              <FaFemale className="mr-1" /> {age.trim()}
                            </span>
                          ))
                      : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Personal Insights */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-2 pb-2">
          <h3 className="text-xl font-semibold text-gray-700">Personal Insights</h3>
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
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <strong className="text-sm">Main Love/Sex Difficulties:</strong>
              <div className="mt-2">
                <p className="text-gray-700 mt-1 whitespace-pre-line">
                  {personalInformation.loveSexDifficulties.value}
                </p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <strong className="text-sm">Main Life Goals:</strong>
              <div className="mt-2">
                <p className="text-gray-700 mt-1 whitespace-pre-line">
                  {personalInformation.lifeGoals.value}
                </p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <strong className="text-sm">Things Most Like to Change:</strong>
              <div className="mt-2">
                <p className="text-gray-700 mt-1 whitespace-pre-line">
                  {personalInformation.thingsToChange.value}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Occupation Information */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-2 pb-2">
          <h3 className="text-xl font-semibold text-gray-700">Occupation Information</h3>
          {mode !== "add" && (
            <div className="flex space-x-4">
              <EditButton
                onClick={() => toggleSectionEdit("occupation")}
                ariaLabel={
                  editingSection === "occupation"
                    ? "Save Occupation Info"
                    : "Edit Occupation Info"
                }
                disabled={isSaving}
              >
                {editingSection === "occupation"
                  ? isSaving
                    ? "Saving..."
                    : "Save"
                  : "Edit"}
              </EditButton>
              {editingSection === "occupation" && (
                <button
                  onClick={() => handleCancel("occupation")}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div></div>
              <h4 className="text-lg font-semibold text-sky-700">Husband</h4>
              <h4 className="text-lg font-semibold text-sky-700">Wife</h4>
            </div>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <label className="block text-sm font-medium text-gray-700">
                Occupation(s) Trained For{" "}
                {personalInformation.occupationTrainedHusband.required && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <div className="col-span-2">
                <div className="flex items-center justify-start gap-2">
                <select
                    name="occupationTrainedHusband"
                    value={personalInformation.occupationTrainedHusband.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "0") {
                        setShowOccuptionAddPanel(true);
                        setEditingSection("occupation");
                        setSelectedOccupationField("occupationTrainedHusband");
                      } else {
                        handleChangePersonalInfo(e);
                        setShowOccuptionAddPanel(false);
                      }
                    }}
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                                   aria-label="Husband occupation trained for"
                  >
                    <option value="">Select occupation</option>
                    <option value="0">+ Add New Occupation</option>
                    {occupations.map((occupation) => (
                      <option key={occupation.id} value={occupation.name}>
                        {occupation.name}
                      </option>
                    ))}
                  </select>
                
                  <button
                    title="Refresh dropdown"
                    onClick={async () => {
                      setIsOccupationLoading(true);
                      await loadDrpOccupations();
                      setIsOccupationLoading(false);
                    }}
                    disabled={isOccupationLoading}
                    className="text-gray-600 hover:text-sky-600"
                  >
                    <FaSync />
                  </button>
                
                </div>
                
                {/* <div className="flex items-center justify-start gap-2">
                  <select
                    name="occupationTrainedHusband"
                    value={personalInformation.occupationTrainedHusband.value}
                    onChange={handleChangePersonalInfo}
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    aria-label="Husband occupation trained for"
                  >
                    <option value="">Select occupation</option>
                    {occupations.map((occupation) => (
                      <option key={occupation.id} value={occupation.name}>
                        {occupation.name}
                      </option>
                    ))}
                  </select>
                  <button
                    title="Refresh dropdown"
                    onClick={async () => {
                      try {
                        setIsOccupationLoading(true);
                        await loadDrpOccupations();
                      } finally {
                        setIsOccupationLoading(false);
                      }
                    }}
                    disabled={isOccupationLoading}
                  >
                    <FaSync />
                  </button>
                  <button
                    title="Add new occupation"
                    onClick={async () => {
                      try {
                        setIsOccupationLoading(true);
                        await loadDrpOccupations();
                      } finally {
                        setIsOccupationLoading(false);
                      }
                    }}
                    disabled={isOccupationLoading}
                  >
                    <FaPlusCircle className="text-green-600" />
                  </button>
                </div> */}
                {personalInformationErrors.occupationTrainedHusband && (
                  <p className="mt-1 text-sm text-red-600">
                    {personalInformationErrors.occupationTrainedHusband}
                  </p>
                )}
              </div>
              <div className="col-span-2">



                    <div className="flex items-center justify-start gap-2">
                <select
                    name="occupationTrainedWife"
                    value={personalInformation.occupationTrainedWife.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "0") {
                        setShowOccuptionAddPanel(true);
                        setEditingSection("occupation");
                        setSelectedOccupationField("occupationTrainedWife");
                      } else {
                        handleChangePersonalInfo(e);
                        setShowOccuptionAddPanel(false);
                      }
                    }}
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                                  aria-label="Wife occupation trained for"
                  >
                    <option value="">Select occupation</option>
                    <option value="0">+ Add New Occupation</option>
                    {occupations.map((occupation) => (
                      <option key={occupation.id} value={occupation.name}>
                        {occupation.name}
                      </option>
                    ))}
                  </select>
                
                  <button
                    title="Refresh dropdown"
                    onClick={async () => {
                      setIsOccupationLoading(true);
                      await loadDrpOccupations();
                      setIsOccupationLoading(false);
                    }}
                    disabled={isOccupationLoading}
                    className="text-gray-600 hover:text-sky-600"
                  >
                    <FaSync />
                  </button>
                
                </div>
{/*                 
                <div className="flex items-center justify-start gap-2">
                  <select
                    name="occupationTrainedWife"
                    value={personalInformation.occupationTrainedWife.value}
                    onChange={handleChangePersonalInfo}
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    aria-label="Wife occupation trained for"
                  >
                    <option value="">Select occupation</option>
                    {occupations.map((occupation) => (
                      <option key={occupation.id} value={occupation.name}>
                        {occupation.name}
                      </option>
                    ))}
                  </select>
                  <button
                    title="Refresh dropdown"
                    onClick={async () => {
                      try {
                        setIsOccupationLoading(true);
                        await loadDrpOccupations();
                      } finally {
                        setIsOccupationLoading(false);
                      }
                    }}
                    disabled={isOccupationLoading}
                  >
                    <FaSync />
                  </button>
                  <button
                    title="Add new occupation"
                    onClick={async () => {
                      try {
                        setIsOccupationLoading(true);
                        await loadDrpOccupations();
                      } finally {
                        setIsOccupationLoading(false);
                      }
                    }}
                    disabled={isOccupationLoading}
                  >
                    <FaPlusCircle className="text-green-600" />
                  </button>
                </div> */}
                {personalInformationErrors.occupationTrainedWife && (
                  <p className="mt-1 text-sm text-red-600">
                    {personalInformationErrors.occupationTrainedWife}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">

              <label className="block text-sm font-medium text-gray-700">
                Present Occupation{" "}
                {personalInformation.occupationHusband.required && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <div className="col-span-2">


      <div className="flex items-center justify-start gap-2">
                <select
                    name="occupationHusband"
                    value={personalInformation.occupationHusband.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "0") {
                        setShowOccuptionAddPanel(true);
                        setEditingSection("occupation");
                        setSelectedOccupationField("occupationHusband");
                      } else {
                        handleChangePersonalInfo(e);
                        setShowOccuptionAddPanel(false);
                      }
                    }}
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                         aria-label="Husband present occupation"
                  >
                    <option value="">Select occupation</option>
                    <option value="0">+ Add New Occupation</option>
                    {occupations.map((occupation) => (
                      <option key={occupation.id} value={occupation.name}>
                        {occupation.name}
                      </option>
                    ))}
                  </select>
                
                  <button
                    title="Refresh dropdown"
                    onClick={async () => {
                      setIsOccupationLoading(true);
                      await loadDrpOccupations();
                      setIsOccupationLoading(false);
                    }}
                    disabled={isOccupationLoading}
                    className="text-gray-600 hover:text-sky-600"
                  >
                    <FaSync />
                  </button>
                
                </div>


                {/* <div className="flex items-center justify-start gap-2">
                  <select
                    name="occupationHusband"
                    value={personalInformation.occupationHusband.value}
                    onChange={handleChangePersonalInfo}
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    aria-label="Husband present occupation"
                  >
                    <option value="">Select occupation</option>
                    {occupations.map((occupation) => (
                      <option key={occupation.id} value={occupation.name}>
                        {occupation.name}
                      </option>
                    ))}
                  </select>
                  <button
                    title="Refresh dropdown"
                    onClick={async () => {
                      try {
                        setIsOccupationLoading(true);
                        await loadDrpOccupations();
                      } finally {
                        setIsOccupationLoading(false);
                      }
                    }}
                    disabled={isOccupationLoading}
                  >
                    <FaSync />
                  </button>
                  <button
                    title="Add new occupation"
                    onClick={async () => {
                      try {
                        setIsOccupationLoading(true);
                        await loadDrpOccupations();
                      } finally {
                        setIsOccupationLoading(false);
                      }
                    }}
                    disabled={isOccupationLoading}
                  >
                    <FaPlusCircle className="text-green-600" />
                  </button>
                </div> */}
                {personalInformationErrors.occupationHusband && (
                  <p className="mt-1 text-sm text-red-600">
                    {personalInformationErrors.occupationHusband}
                  </p>
                )}
              </div>
              <div className="col-span-2">

                  <div className="flex items-center justify-start gap-2">
                <select
                    name="occupationWife"
                    value={personalInformation.occupationWife.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "0") {
                        setShowOccuptionAddPanel(true);
                        setEditingSection("occupation");
                        setSelectedOccupationField("occupationWife");
                      } else {
                        handleChangePersonalInfo(e);
                        setShowOccuptionAddPanel(false);
                      }
                    }}
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                          aria-label="Wife present occupation"
                  >
                    <option value="">Select occupation</option>
                    <option value="0">+ Add New Occupation</option>
                    {occupations.map((occupation) => (
                      <option key={occupation.id} value={occupation.name}>
                        {occupation.name}
                      </option>
                    ))}
                  </select>
                
                  <button
                    title="Refresh dropdown"
                    onClick={async () => {
                      setIsOccupationLoading(true);
                      await loadDrpOccupations();
                      setIsOccupationLoading(false);
                    }}
                    disabled={isOccupationLoading}
                    className="text-gray-600 hover:text-sky-600"
                  >
                    <FaSync />
                  </button>
                
                </div>


                {/* <div className="flex items-center justify-start gap-2">
                  <select
                    name="occupationWife"
                    value={personalInformation.occupationWife.value}
                    onChange={handleChangePersonalInfo}
                    className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    aria-label="Wife present occupation"
                  >
                    <option value="">Select occupation</option>
                    {occupations.map((occupation) => (
                      <option key={occupation.id} value={occupation.name}>
                        {occupation.name}
                      </option>
                    ))}
                  </select>
                  <button
                    title="Refresh dropdown"
                    onClick={async () => {
                      try {
                        setIsOccupationLoading(true);
                        await loadDrpOccupations();
                      } finally {
                        setIsOccupationLoading(false);
                      }
                    }}
                    disabled={isOccupationLoading}
                  >
                    <FaSync />
                  </button>
                  <button
                    title="Add new occupation"
                    onClick={async () => {
                      try {
                        setIsOccupationLoading(true);
                        await loadDrpOccupations();
                      } finally {
                        setIsOccupationLoading(false);
                      }
                    }}
                    disabled={isOccupationLoading}
                  >
                    <FaPlusCircle className="text-green-600" />
                  </button>
                </div> */}
                {personalInformationErrors.occupationWife && (
                  <p className="mt-1 text-sm text-red-600">
                    {personalInformationErrors.occupationWife}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <label className="block text-sm font-medium text-gray-700">
                Work Status{" "}
                {personalInformation.workStatusHusband.required && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <div className="col-span-2">
                <div className="flex items-center space-x-4 mt-2">
                  {workStatusOptions.map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="workStatusHusband"
                        value={option.value}
                        checked={
                          personalInformation.workStatusHusband.value === option.value
                        }
                        onChange={handleWorkStatusChange}
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                        aria-label={option.text}
                      />
                      <span className="ml-2 text-sm text-gray-700">{option.text}</span>
                    </label>
                  ))}
                </div>
                {personalInformationErrors.workStatusHusband && (
                  <p className="mt-1 text-sm text-red-600">
                    {personalInformationErrors.workStatusHusband}
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <div className="flex items-center space-x-4 mt-2">
                  {workStatusOptions.map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="workStatusWife"
                        value={option.value}
                        checked={
                          personalInformation.workStatusWife.value === option.value
                        }
                        onChange={handleWorkStatusChange}
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                        aria-label={option.text}
                      />
                      <span className="ml-2 text-sm text-gray-700">{option.text}</span>
                    </label>
                  ))}
                </div>
                {personalInformationErrors.workStatusWife && (
                  <p className="mt-1 text-sm text-red-600">
                    {personalInformationErrors.workStatusWife}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div></div>
              <h4 className="text-lg font-semibold text-sky-700 mb-4">Husband</h4>
              <h4 className="text-lg font-semibold text-sky-700 mb-4">Wife</h4>
            </div>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <span className="font-bold text-sm">Occupation(s) Trained For</span>
              <div className="col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="whitespace-pre-line">
                    {personalInformation.occupationTrainedHusband.value || "N/A"}
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="whitespace-pre-line">
                    {personalInformation.occupationTrainedWife.value || "N/A"}
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <span className="font-bold text-sm">Present Occupation</span>
              <div className="col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="whitespace-pre-line">
                    {personalInformation.occupationHusband.value || "N/A"}
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="whitespace-pre-line">
                    {personalInformation.occupationWife.value || "N/A"}
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <span className="font-bold text-sm">Work Status</span>
              <div className="col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="whitespace-pre-line">
                    {personalInformation.workStatusHusband.value || "N/A"}
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="whitespace-pre-line">
                    {personalInformation.workStatusWife.value || "N/A"}
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
            onClick={handleSubmitPersonalInformation}
            className="flex items-center bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition-all duration-200 shadow-md"
            aria-label="Save and go to next tab"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      )}
    </div>
:
<PrintPersonalInformationFamilyA4
    personalInformation={personalInformation}
    maritalStatusOptions={maritalStatusOptions}
  />

      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default TabPersonalInformationFamily;