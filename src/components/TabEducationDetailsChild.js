import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { addEducationData, getALData, getALStreams, getALSubjects, getDegrees, getEducationYearsData, getOLData, getOLSubjects, getScholarshipData, getUniversityData, updateALData, updateEducationYearsData, updateOLData, updateScholarshipData, updateUniversityData } from '../data/mockData';
import TypeableDropdown from './TypeableDropdown';
import LoadingSpinner from './LoadingSpinner';
import MessageModel from './MessageModel';
import { getAl, getEducationYears, getOl, getScholarship } from '../functions/patient';
import VoiceToText from './VoiceToText';

const TabEducationDetailsChild = ({ id }) => {
  const currentYear = 2025;
  const yearOptions = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  const [editingSection, setEditingSection] = useState(null);
  const [mode, setMode] = useState("add");
  const [education, setEducation] = useState({
    educationYears: '',
    scholarship: { enabled: true, marks: '', schoolAdmitted: '', result: '', remark: '' },
    ol: { enabled: true, subjects: [], remark: '' },
    al: { enabled: true, stream: '', subjects: [], remark: '' },
    university: { enabled: true, subjects: [], remark: '' },
  });

  const [educationYearsErrors, setEducationYearsErrors] = useState({});
  const [scholarshipErrors, setScholarshipErrors] = useState({});
  const [olErrors, setOLErrors] = useState({});
  const [alErrors, setALErrors] = useState({});
  const [universityErrors, setUniversityErrors] = useState({});
  const [olsubjectsOptions, setOlsubjectsOptions] = useState([]);
  const [alStremsOptions, setAlStremsOptions] = useState([]);
  const [alSubjectsOptions, setAlSubjectsOptions] = useState([]);
  const [degreeOptions, setDegreeOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [initialEducationInformation, setInitialEducationInformation] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, message: "", type: "error" });

  useEffect(() => {
    loadDropdowns();
  }, []);

  const loadDropdowns = async () => {
    const olsubjectsOptions = await getOLSubjects();
    setOlsubjectsOptions(olsubjectsOptions.data);
    const alStrems = await getALStreams();
    setAlStremsOptions(alStrems.data);
    const alSubjects = await getALSubjects();
    setAlSubjectsOptions(alSubjects.data);
    const degreeOptions = await getDegrees();
    setDegreeOptions(degreeOptions.data);
  };

  const loadEducationYearsData = async () => {
   //const result = await getEducationYearsData(id);
   const result=await getEducationYears(id);
      
    const patientData = result.data;
      if(patientData.error){
    console.log('patientData.error',patientData.error)
     setModal({
        isOpen: true,
        message: patientData.error.message,
        type: "error",
      });
  }
    console.log('loadEducationYearsData',patientData)
    if (patientData) {
      setEducation(prev => ({
        ...prev,
        educationYears: patientData.educationYears || '',
      }));
      setMode("edit");
    } else {
      setIsLoading(false);
    }
  };

  const loadScholarshipData = async () => {
   // const result = await getScholarshipData(id);
    const result = await getScholarship(id);
     console.log('getScholarshipData',result)
    const patientData = result.data;
      if(patientData.error){
    console.log('patientData.error',patientData.error)
     setModal({
        isOpen: true,
        message: patientData.error.message,
        type: "error",
      });
  }
    if (patientData) {
      setEducation(prev => ({
        ...prev,
        scholarship: patientData,
      }));
    }
  };

  const loadOLData = async () => {
    //const result = await getOLData(id);
    const result = await getOl(id);
         console.log('getOLData',result)
    const patientData = result.data;
      if(patientData?.error){
    console.log('patientData.error',patientData.error)
     setModal({
        isOpen: true,
        message: patientData.error.message,
        type: "error",
      });
  }
    if (patientData) {
      setEducation(prev => ({ ...prev, ol: patientData }));
    }
  };

  const loadALData = async () => {
    //const result = await getALData(id);
    const result = await getAl(id);
    const patientData = result.data;
      if(patientData?.error){
    console.log('patientData.error',patientData.error)
     setModal({
        isOpen: true,
        message: patientData.error.message,
        type: "error",
      });
  }
    if (patientData) {
      setEducation(prev => ({ ...prev, al: patientData }));
    }
  };

  const loadUniversityData = async () => {
    const result = await getUniversityData(id);
    const patientData = result.data;
      if(patientData?.error){
    console.log('patientData.error',patientData.error)
     setModal({
        isOpen: true,
        message: patientData.error.message,
        type: "error",
      });
  }
    if (patientData) {
      setEducation(prev => ({ ...prev, university: patientData }));
    }
  };

  const loadAllEducationData = async () => {
    setIsLoading(true);
    await loadEducationYearsData();
    await loadScholarshipData();
    await loadOLData();
    await loadALData();
    await loadUniversityData();
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      loadAllEducationData();
    }
  }, [id]);

  const handleSubmitp = async (section) => {
    setIsSaving(true);
    let isValid = false;
    if (section === 'educationYears') {
      isValid = _validateEducationYears();
      if (!isValid) {
        console.log("Validation failed, not saving.");
        setIsSaving(false);
        return false;
      }
      try {
        const res = await updateEducationYearsData(id, education.educationYears);
        console.log("update result:", res);
        setIsSaving(false);
        return true;
      } catch (err) {
        console.log("Save Payload: err", err.message);
        setModal({ isOpen: true, message: err.message, type: "error" });
        setIsSaving(false);
        return false;
      }
    } else if (section === 'scholarship') {
      isValid = _validateScholarship();
      if (!isValid) {
        console.log("Validation failed, not saving.");
        setIsSaving(false);
        return false;
      }
      try {
        const res = await updateScholarshipData(id, education.scholarship);
        console.log("update result:", res);
        setIsSaving(false);
        return true;
      } catch (err) {
        console.log("Save Payload: err", err.message);
        setModal({ isOpen: true, message: err.message, type: "error" });
        setIsSaving(false);
        return false;
      }
    } else if (section === 'ol') {
      isValid = _validateOLSubject();
      if (!isValid) {
        console.log("Validation failed, not saving.");
        setIsSaving(false);
        return false;
      }
      try {
        const res = await updateOLData(id, education.ol);
        console.log("update result:", res);
        setIsSaving(false);
        return true;
      } catch (err) {
        console.log("Save Payload: err", err.message);
        setModal({ isOpen: true, message: err.message, type: "error" });
        setIsSaving(false);
        return false;
      }
    } else if (section === 'al') {
      isValid = _validateALSubject();
      if (!isValid) {
        console.log("Validation failed, not saving.");
        setIsSaving(false);
        return false;
      }
      try {
        const res = await updateALData(id, education.al);
        console.log("update result:", res);
        setIsSaving(false);
        return true;
      } catch (err) {
        console.log("Save Payload: err", err.message);
        setModal({ isOpen: true, message: err.message, type: "error" });
        setIsSaving(false);
        return false;
      }
    } else if (section === 'university') {
      isValid = _validateUniversity();
      if (!isValid) {
        console.log("Validation failed, not saving.");
        setIsSaving(false);
        return false;
      }
      try {
        const res = await updateUniversityData(id, education.university);
        console.log("update result:", res);
        setIsSaving(false);
        return true;
      } catch (err) {
        console.log("Save Payload: err", err.message);
        setModal({ isOpen: true, message: err.message, type: "error" });
        setIsSaving(false);
        return false;
      }
    }
    setIsSaving(false);
    return isValid;
  };

  const toggleSectionEdit = async (section) => {
    if (editingSection === section) {
      const isValid = await handleSubmitp(section);
      if (isValid) setEditingSection(null);
    } else {
      setEditingSection(section);
    }
  };

  useEffect(() => {
    setInitialEducationInformation({ ...education });
  }, [editingSection]);

  const handleCancel = (editingSection) => {
    if (initialEducationInformation) {
      setEducation(initialEducationInformation);
      setEducationYearsErrors({});
      setScholarshipErrors({});
      setOLErrors({});
      setALErrors({});
      setUniversityErrors({});
    }
    setEditingSection(null);
  };

  const validateEducationYears = (value) => {
    setEducationYearsErrors((prev) => {
      const newErrors = { ...prev };
      if (!value) {
        newErrors.educationYears = 'Years of formal education is required.';
      } else {
        delete newErrors.educationYears;
      }
      return newErrors;
    });
    return !!value;
  };

  const validateScholarship = (field, value) => {
    if (!education.scholarship.enabled) {
      setScholarshipErrors({});
      return true;
    }
    setScholarshipErrors((prev) => {
      const newErrors = { ...prev };
      if (field === 'marks' || field === undefined) {
        if (!value?.trim()) {
          newErrors.marks = 'Marks are required.';
        } else {
          delete newErrors.marks;
        }
      }
      if (field === 'schoolAdmitted' || field === undefined) {
        if (!value?.trim()) {
          newErrors.schoolAdmitted = 'School admitted is required.';
        } else {
          delete newErrors.schoolAdmitted;
        }
      }
      if (field === 'result' || field === undefined) {
        if (!value) {
          newErrors.result = 'Result is required.';
        } else {
          delete newErrors.result;
        }
      }
      return newErrors;
    });
    return !!value;
  };

  const validateOLSubject = (index, field, value) => {
    if (!education.ol.enabled) {
      setOLErrors({});
      return true;
    }
    setOLErrors((prev) => {
      const newErrors = { ...prev };
      const subject = education.ol.subjects[index] || {};
      if (field === 'name' || field === 'year' || field === undefined) {
        const subjectName = field === 'name' ? value : subject.name;
        const year = field === 'year' ? value : subject.year || currentYear;
        const isDuplicate = education.ol.subjects.some((sub, i) =>
          i !== index &&
          sub.name &&
          sub.name.toLowerCase() === (subjectName || '').toLowerCase() &&
          sub.year === year
        );
        if (isDuplicate) {
          newErrors[`subject_${index}_duplicate`] = `Subject "${subjectName}" for year ${year} is already added.`;
        } else {
          delete newErrors[`subject_${index}_duplicate`];
        }
      }
      if (field === 'name' || field === undefined) {
        if (!value?.trim()) {
          newErrors[`subject_${index}_name`] = 'Subject is required.';
        } else {
          delete newErrors[`subject_${index}_name`];
        }
      }
      if (field === 'marks' || field === undefined) {
        if (!value?.trim()) {
          newErrors[`subject_${index}_marks`] = 'Grade is required.';
        } else {
          delete newErrors[`subject_${index}_marks`];
        }
      }
      return newErrors;
    });
    return !!value;
  };

  const validateALStream = (field, value) => {
    if (!education.al.enabled) {
      setALErrors({});
      return true;
    }
    setALErrors((prev) => {
      const newErrors = { ...prev };
      if (field === 'stream' || field === undefined) {
        if (!value) {
          newErrors.stream = 'Stream is required.';
        } else {
          delete newErrors.stream;
        }
      }
      return newErrors;
    });
    return !!value;
  };

  const validateALSubject = (index, field, value) => {
    if (!education.al.enabled) {
      setALErrors({});
      return true;
    }
    setALErrors((prev) => {
      const newErrors = { ...prev };
      const subject = education.al.subjects[index] || {};
      if (field === 'name' || field === 'year' || field === undefined) {
        const subjectName = field === 'name' ? value : subject.name;
        const year = field === 'year' ? value : subject.year || currentYear;
        const isDuplicate = education.al.subjects.some((sub, i) =>
          i !== index &&
          sub.name &&
          sub.name.toLowerCase() === (subjectName || '').toLowerCase() &&
          sub.year === year
        );
        if (isDuplicate) {
          newErrors[`subject_${index}_duplicate`] = `Subject "${subjectName}" for year ${year} is already added.`;
        } else {
          delete newErrors[`subject_${index}_duplicate`];
        }
      }
      if (field === 'name' || field === undefined) {
        if (!value?.trim()) {
          newErrors[`subject_${index}_name`] = 'Subject is required.';
        } else {
          delete newErrors[`subject_${index}_name`];
        }
      }
      if (field === 'marks' || field === undefined) {
        if (!value?.trim()) {
          newErrors[`subject_${index}_marks`] = 'Grade is required.';
        } else {
          delete newErrors[`subject_${index}_marks`];
        }
      }
      return newErrors;
    });
    return !!value;
  };

  const validateUniversity = (index, field, value) => {
    if (!education.university.enabled) {
      setUniversityErrors({});
      return true;
    }
    setUniversityErrors((prev) => {
      const newErrors = { ...prev };
      const qualification = education.university.subjects[index] || {};
      if (field === 'name' || field === undefined) {
        if (!value?.trim()) {
          newErrors[`qualification_${index}_name`] = 'Degree is required.';
        } else {
          delete newErrors[`qualification_${index}_name`];
        }
      }
      if (field === 'institution' || field === undefined) {
        if (!value?.trim()) {
          newErrors[`qualification_${index}_institution`] = 'Institution is required.';
        } else {
          delete newErrors[`qualification_${index}_institution`];
        }
      }
      if (field === 'marks' || field === undefined) {
        if (!value?.trim()) {
          newErrors[`qualification_${index}_marks`] = 'Marks/Grade is required.';
        } else {
          delete newErrors[`qualification_${index}_marks`];
        }
      }
      return newErrors;
    });
    return !!value;
  };

  const _validateEducationYears = () => {
    return validateEducationYears(education.educationYears);
  };

  const _validateScholarship = () => {
    return (
      validateScholarship('marks', education.scholarship.marks) &&
      validateScholarship('schoolAdmitted', education.scholarship.schoolAdmitted) &&
      validateScholarship('result', education.scholarship.result)
    );
  };

  const _validateOLSubject = () => {
    const validations = [];
    education.ol.subjects.forEach((s, index) => {
      validations.push(validateOLSubject(index, 'name', s.name));
      validations.push(validateOLSubject(index, 'marks', s.marks));
      validations.push(validateOLSubject(index, 'year', s.year));
    });
    return validations.every(v => v === true);
  };

  const _validateALSubject = () => {
    const validations = [];
    validations.push(validateEducationYears(education.educationYears));
    validations.push(validateALStream(undefined, education.al.stream));
    education.al.subjects.forEach((s, index) => {
      validations.push(validateALSubject(index, 'name', s.name));
      validations.push(validateALSubject(index, 'marks', s.marks));
      validations.push(validateALSubject(index, 'year', s.year));
    });
    return validations.every(v => v === true);
  };

  const _validateUniversity = () => {
    const validations = [];
    education.university.subjects.forEach((s, index) => {
      validations.push(validateUniversity(index, 'name', s.name));
      validations.push(validateUniversity(index, 'institution', s.institution));
      validations.push(validateUniversity(index, 'marks', s.marks));
    });
    return validations.every(v => v === true);
  };

  const validateAllFields = () => {
    const isValid = [];
    isValid.push(_validateEducationYears());
    isValid.push(_validateScholarship());
    isValid.push(_validateOLSubject());
    isValid.push(_validateALSubject());
    isValid.push(_validateUniversity());
    return isValid;
  };

  const isFormValid = () => {
    return (
      Object.keys(educationYearsErrors).length === 0 &&
      Object.keys(scholarshipErrors).length === 0 &&
      Object.keys(olErrors).length === 0 &&
      Object.keys(alErrors).length === 0 &&
      Object.keys(universityErrors).length === 0
    );
  };

  const canAddOLSubject = () => Object.keys(olErrors).length === 0;
  const canAddALSubject = () => Object.keys(alErrors).length === 0;
  const canAddUniversityQualification = () => Object.keys(universityErrors).length === 0;

const handleTextInputChange = (e) => {
  const { name, value } = e.target;

  console.log('Input change:', { name, value });

  try {
    if (name.includes('scholarship')) {
      const field = name.split('.')[2];
      setEducation((prev) => ({
        ...prev,
        scholarship: { ...prev.scholarship, [field]: value },
      }));
      if (field !== 'remark') {
        validateScholarship(field, value);
      }
    } else if (name.includes('ol.subjects')) {
      const [, , , index, field] = name.split('.');
      const indexNum = parseInt(index);
      if (isNaN(indexNum)) {
        console.error('Invalid index for O/L subject:', index);
        return;
      }
      setEducation((prev) => {
        const updatedSubjects = [...prev.ol.subjects];
        updatedSubjects[indexNum] = {
          ...updatedSubjects[indexNum],
          [field]: field === 'year' ? parseInt(value) || value : value,
        };
        return {
          ...prev,
          ol: { ...prev.ol, subjects: updatedSubjects },
        };
      });
      validateOLSubject(indexNum, field, value);
    } else if (name.includes('al.subjects')) {
      const [, , , index, field] = name.split('.');
      const indexNum = parseInt(index);
      if (isNaN(indexNum)) {
        console.error('Invalid index for A/L subject:', index);
        return;
      }
      setEducation((prev) => {
        const updatedSubjects = [...prev.al.subjects];
        updatedSubjects[indexNum] = {
          ...updatedSubjects[indexNum],
          [field]: field === 'year' ? parseInt(value) || value : value,
        };
        return {
          ...prev,
          al: { ...prev.al, subjects: updatedSubjects },
        };
      });
      validateALSubject(indexNum, field, value);
    } else if (name.includes('university.subjects')) {
      console.log('University input:', { name, value });
      const splitName = name.split('.');
      if (splitName.length !== 5) {
        console.error('Malformed university input name:', name);
        return;
      }
      const [, , , index, field] = splitName;
      const indexNum = parseInt(index);
      if (isNaN(indexNum)) {
        console.error('Invalid index for university subject:', index);
        return;
      }
      setEducation((prev) => {
        const updatedSubjects = [...prev.university.subjects];
        updatedSubjects[indexNum] = {
          ...updatedSubjects[indexNum],
          [field]: value,
        };
        console.log('Updated university subjects:', updatedSubjects);
        return {
          ...prev,
          university: { ...prev.university, subjects: updatedSubjects },
        };
      });
      validateUniversity(indexNum, field, value);
    } else if (name === 'ol.remark') {
      setEducation((prev) => ({
        ...prev,
        ol: { ...prev.ol, remark: value },
      }));
    } else if (name === 'al.remark') {
      setEducation((prev) => ({
        ...prev,
        al: { ...prev.al, remark: value },
      }));
    } else if (name === 'university.remark') {
      setEducation((prev) => ({
        ...prev,
        university: { ...prev.university, remark: value },
      }));
    } else {
      console.warn('Unhandled input name:', name);
    }
  } catch (error) {
    console.error(`Error in handleTextInputChange for name=${name}:`, error);
  }
};

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    try {
      if (name.includes('scholarship.enabled')) {
        setEducation((prev) => ({
          ...prev,
          scholarship: { ...prev.scholarship, enabled: checked },
        }));
        if (checked) {
          validateScholarship('marks', education.scholarship.marks);
          validateScholarship('schoolAdmitted', education.scholarship.schoolAdmitted);
          validateScholarship('result', education.scholarship.result);
        }
      } else if (name.includes('ol.enabled')) {
        setEducation((prev) => ({
          ...prev,
          ol: { ...prev.ol, enabled: checked },
        }));
        if (checked) {
          education.ol.subjects.forEach((s, index) => {
            validateOLSubject(index, 'name', s.name);
            validateOLSubject(index, 'marks', s.marks);
            validateOLSubject(index, 'year', s.year);
          });
        }
      } else if (name.includes('al.enabled')) {
        setEducation((prev) => ({
          ...prev,
          al: { ...prev.al, enabled: checked },
        }));
        if (checked) {
          validateALStream('stream', education.al.stream);
          education.al.subjects.forEach((s, index) => {
            validateALSubject(index, 'name', s.name);
            validateALSubject(index, 'marks', s.marks);
            validateALSubject(index, 'year', s.year);
          });
        }
      } else if (name.includes('university.enabled')) {
        setEducation((prev) => ({
          ...prev,
          university: { ...prev.university, enabled: checked },
        }));
        if (checked) {
          education.university.subjects.forEach((s, index) => {
            validateUniversity(index, 'name', s.name);
            validateUniversity(index, 'institution', s.institution);
            validateUniversity(index, 'marks', s.marks);
          });
        }
      }
    } catch (error) {
      console.error(`Error in handleCheckboxChange for name=${name}:`, error);
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === 'educationYears') {
      setEducation((prev) => ({
        ...prev,
        educationYears: value,
      }));
      validateEducationYears(value);
    }
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('scholarship.result')) {
      setEducation((prev) => ({
        ...prev,
        scholarship: { ...prev.scholarship, result: value },
      }));
      validateScholarship('result', value);
    }
  };

  const handleSubjectChange = (level, index, selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    console.log('handleSubjectChange',selectedOption)
    setEducation((prev) => {
      if (level === 'ol') {
        const updatedSubjects = [...prev.ol.subjects];
        updatedSubjects[index] = { ...updatedSubjects[index], name: value };
        return { ...prev, ol: { ...prev.ol, subjects: updatedSubjects } };
      } else if (level === 'al') {
        const updatedSubjects = [...prev.al.subjects];
        updatedSubjects[index] = { ...updatedSubjects[index], name: value };
        return { ...prev, al: { ...prev.al, subjects: updatedSubjects } };
      } else if (level === 'stream') {
        return { ...prev, al: { ...prev.al, stream: value } };
      } else if (level === 'university') {
        const updatedSubjects = [...prev.university.subjects];
        updatedSubjects[index] = { ...updatedSubjects[index], name: value };
        return { ...prev, university: { ...prev.university, subjects: updatedSubjects } };
      }
      return prev;
    });
    if (level === 'ol') {
      validateOLSubject(index, 'name', value);
    } else if (level === 'al') {
      validateALSubject(index, 'name', value);
    } else if (level === 'stream') {
      validateALStream('stream', value);
    } else if (level === 'university') {
      validateUniversity(index, 'name', value);
    }
  };

  const addCustomSubject = (level) => {
    const newSubject = { name: '', marks: '', year: currentYear };
    setEducation((prev) => {
      if (level === 'ol') {
        const newSubjects = [...prev.ol.subjects, newSubject];
        validateOLSubject(newSubjects.length - 1, undefined, '');
        return { ...prev, ol: { ...prev.ol, subjects: newSubjects } };
      } else if (level === 'al') {
        const newSubjects = [...prev.al.subjects, newSubject];
        validateALStream('stream', education.al.stream);
        validateALSubject(newSubjects.length - 1, undefined, '');
        return { ...prev, al: { ...prev.al, subjects: newSubjects } };
      }
      return prev;
    });
  };

  const addUniversityQualification = () => {
    const newQualification = { name: '', institution: '', marks: '' };
    setEducation((prev) => {
      const newSubjects = [...prev.university.subjects, newQualification];
      validateUniversity(newSubjects.length - 1, undefined, '');
      return { ...prev, university: { ...prev.university, subjects: newSubjects } };
    });
  };

  const removeItem = (type, index) => {
    setEducation((prev) => {
      if (type === 'ol') {
        const updatedSubjects = [...prev.ol.subjects];
        updatedSubjects.splice(index, 1);
        setOLErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          Object.keys(newErrors).forEach((key) => {
            if (key.startsWith(`subject_${index}_`)) delete newErrors[key];
          });
          return newErrors;
        });
        return { ...prev, ol: { ...prev.ol, subjects: updatedSubjects } };
      } else if (type === 'al') {
        const updatedSubjects = [...prev.al.subjects];
        updatedSubjects.splice(index, 1);
        setALErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          Object.keys(newErrors).forEach((key) => {
            if (key.startsWith(`subject_${index}_`)) delete newErrors[key];
          });
          return newErrors;
        });
        return { ...prev, al: { ...prev.al, subjects: updatedSubjects } };
      } else if (type === 'university') {
        const updatedSubjects = [...prev.university.subjects];
        updatedSubjects.splice(index, 1);
        setUniversityErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          Object.keys(newErrors).forEach((key) => {
            if (key.startsWith(`qualification_${index}_`)) delete newErrors[key];
          });
          return newErrors;
        });
        return { ...prev, university: { ...prev.university, subjects: updatedSubjects } };
      }
      return prev;
    });
  };

  const handleSave = async () => {
    const validations = validateAllFields();
    const isAllValidated = validations.every((v) => v !== false);
    if (isAllValidated && isFormValid()) {
      console.log('Payload:', education);
      const res = await addEducationData(id, education);
      console.log('ddddsa', res);
      if (res.error) {
        setModal({ isOpen: true, message: res.error, type: "error" });
        setIsSaving(false);
        return;
      }
      setMode("edit");
    } else {
     // alert('Please correct the errors in the form before saving.');
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
      {!isLoading ? (
        <div className="px-8">
          {/* Educational Background */}
           {/*{JSON.stringify(education)}*/}
          <section className="mb-12">
    
            <div className="flex justify-between items-center mb-2 pb-2">
              <h3 className="text-2xl font-semibold text-gray-800">Educational Background</h3>
              {mode !== 'add' && (
                <div className="flex space-x-4">
                  <button
                    onClick={() => toggleSectionEdit("educationYears")}
                    className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                    aria-label={editingSection === "educationYears" ? "Save Educational Background" : "Edit Educational Background"}
                    disabled={isSaving}
                  >
                    <FaEdit className="mr-2" />
                    {editingSection === "educationYears" ? (isSaving ? "Saving..." : "Save") : "Edit"}
                  </button>
                  {editingSection === "educationYears" && (
                    <button
                      onClick={() => handleCancel("educationYears")}
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
            {editingSection === 'educationYears' || mode === 'add' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Years of Formal Education Completed{ <span className="text-red-500">*</span>}</label>
                  <select
                    name="educationYears"
                    value={education.educationYears || ''}
                    onChange={handleSelectChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    disabled={editingSection !== 'educationYears' && mode !== 'add'}
                    aria-label="Years of formal education"
                    required
                  >
                    <option value="">Select years</option>
                    {[...Array(21)].map((_, i) => (
                      <option key={i} value={i}>
                        {i === 20 ? 'More than 20' : i}
                      </option>
                    ))}
                  </select>
                  {educationYearsErrors.educationYears && (
                    <p className="mt-1 text-sm text-red-600">{educationYearsErrors.educationYears}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <strong>Years of Formal Education:</strong>{' '}
                  {education.educationYears || education.educationYears === 0
                    ? education.educationYears === 20
                      ? 'More than 20'
                      : education.educationYears
                    : 'N/A'}
                </div>
              </div>
            )}
          </section>

          {/* Grade 5 Scholarship Qualification */}
          <section className="mb-14">
            <div className="flex justify-between items-center mb-2 pb-2">
              <div className="flex items-center space-x-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="scholarship.enabled"
                    checked={education.scholarship.enabled !== false}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                    disabled={editingSection !== 'scholarship' && mode !== 'add'}
                    aria-label="Has Grade 5 Scholarship Qualification"
                  />
                  <span className="ml-2 text-sm text-gray-700"></span>
                </label>
                <h3 className="text-2xl font-semibold text-gray-800">Grade 5 Scholarship Qualification</h3>
              </div>
              {mode !== 'add' && (
                <div className="flex space-x-4">
                  <button
                    onClick={() => toggleSectionEdit("scholarship")}
                    className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                    aria-label={editingSection === "scholarship" ? "Save Grade 5 Scholarship Qualification" : "Edit Grade 5 Scholarship Qualification"}
                    disabled={isSaving}
                  >
                    <FaEdit className="mr-2" />
                    {editingSection === "scholarship" ? (isSaving ? "Saving..." : "Save") : "Edit"}
                  </button>
                  {editingSection === "scholarship" && (
                    <button
                      onClick={() => handleCancel("scholarship")}
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
            {editingSection === 'scholarship' || mode === 'add' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Marks{ <span className="text-red-500">*</span>}</label>
                    <input
                      name="education.scholarship.marks"
                      value={education.scholarship.marks || ''}
                      onChange={handleTextInputChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter marks (e.g., 180)"
                      disabled={education.scholarship.enabled === false}
                      aria-label="Scholarship Marks"
                      required
                    />
                    {scholarshipErrors.marks && <p className="mt-1 text-sm text-red-600">{scholarshipErrors.marks}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">School Admitted{ <span className="text-red-500">*</span>}</label>
                    <input
                      name="education.scholarship.schoolAdmitted"
                      value={education.scholarship.schoolAdmitted || ''}
                      onChange={handleTextInputChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter school name"
                      disabled={education.scholarship.enabled === false}
                      aria-label="School Admitted"
                      required
                    />
                    {scholarshipErrors.schoolAdmitted && <p className="mt-1 text-sm text-red-600">{scholarshipErrors.schoolAdmitted}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Result{ <span className="text-red-500">*</span>}</label>
                    <div className="mt-1 flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="education.scholarship.result"
                          value="Pass"
                          checked={education.scholarship.result === 'Pass'}
                          onChange={handleRadioChange}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                          disabled={education.scholarship.enabled === false}
                          aria-label="Scholarship Result Pass"
                          required
                        />
                        <span className="ml-2 text-sm text-gray-700">Pass</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="education.scholarship.result"
                          value="Fail"
                          checked={education.scholarship.result === 'Fail'}
                          onChange={handleRadioChange}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                          disabled={education.scholarship.enabled === false}
                          aria-label="Scholarship Result Fail"
                        />
                        <span className="ml-2 text-sm text-gray-700">Fail</span>
                      </label>
                    </div>
                    {scholarshipErrors.result && <p className="mt-1 text-sm text-red-600">{scholarshipErrors.result}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Remark</label>
                  <VoiceToText
                    name="education.scholarship.remark"
                    value={education.scholarship.remark || ''}
                    onChange={handleTextInputChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter any additional remarks"
                    disabled={education.scholarship.enabled === false}
                    aria-label="Scholarship Remark"
                    rows="4"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <strong>Has Grade 5 Scholarship Qualification:</strong>{' '}
                  {education.scholarship.enabled !== false ? 'Yes' : 'No'}
                </div>
                {education.scholarship.enabled !== false && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <strong>Marks:</strong> {education.scholarship.marks || 'N/A'}
                    </div>
                    <div>
                      <strong>School Admitted:</strong> {education.scholarship.schoolAdmitted || 'N/A'}
                    </div>
                    <div>
                      <strong>Result:</strong> {education.scholarship.result || 'N/A'}
                    </div>
                    <div className="col-span-3">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <strong>Remark:</strong> {education.scholarship.remark || 'N/A'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
          {/* G.C.E Ordinary Level (O/L) Qualifications */}
          <section className="mb-14">
            <div className="flex justify-between items-center mb-2 pb-2">
              <div className="flex items-center space-x-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="ol.enabled"
                    checked={education.ol.enabled !== false}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                    disabled={editingSection !== 'ol' && mode !== 'add'}
                    aria-label="Has G.C.E O/L Qualifications"
                  />
                  <span className="ml-2 text-sm text-gray-700"></span>
                </label>
                <h3 className="text-2xl font-semibold text-gray-800">G.C.E Ordinary Level (O/L) Qualifications</h3>
              </div>
              {mode !== 'add' && (
                <div className="flex space-x-4">
                  <button
                    onClick={() => toggleSectionEdit("ol")}
                    className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                    aria-label={editingSection === "ol" ? "Save O/L Qualifications" : "Edit O/L Qualifications"}
                    disabled={isSaving}
                  >
                    <FaEdit className="mr-2" />
                    {editingSection === "ol" ? (isSaving ? "Saving..." : "Save") : "Edit"}
                  </button>
                  {editingSection === "ol" && (
                    <button
                      onClick={() => handleCancel("ol")}
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
            {editingSection === 'ol' || mode === 'add' ? (
              <div className="space-y-4">
       
                {education.ol.subjects.map((subject, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-1/3">
                      <label className="block text-sm font-medium text-gray-700">Subject{ <span className="text-red-500">*</span>}</label>
                      <TypeableDropdown
                        options={olsubjectsOptions}
                        value={subject.name ? { value: subject.name, name: subject.name } : null}
                        onChange={(option) => handleSubjectChange('ol', index, option)}
                        placeholder="Select or type subject"
                        isDisabled={education.ol.enabled === false}
                        className="mt-1"
                        classNamePrefix="select"
                        aria-label={`O/L Subject ${index + 1}`}
                      />
                      {(olErrors[`subject_${index}_name`] || olErrors[`subject_${index}_duplicate`]) && (
                        <p className="mt-1 text-sm text-red-600">
                          {olErrors[`subject_${index}_name`] || olErrors[`subject_${index}_duplicate`]}
                        </p>
                      )}
                    </div>
                    <div className="w-1/4">
                      <label className="block text-sm font-medium text-gray-700">Year{ <span className="text-red-500">*</span>}</label>
                      <select
                        name={`education.ol.subjects.${index}.year`}
                        value={subject.year || currentYear}
                        onChange={handleTextInputChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        disabled={education.ol.enabled === false}
                        aria-label={`O/L Subject ${index + 1} year`}
                      >
                        {yearOptions.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-1/4">
                      <label className="block text-sm font-medium text-gray-700">Grade{ <span className="text-red-500">*</span>}</label>
                      <input
                        name={`education.ol.subjects.${index}.marks`}
                        value={subject.marks || ''}
                        onChange={handleTextInputChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Grade (e.g., A, B, C, S, W)"
                        disabled={education.ol.enabled === false}
                        aria-label={`O/L Subject ${index + 1} marks`}
                        required
                      />
                      {olErrors[`subject_${index}_marks`] && (
                        <p className="mt-1 text-sm text-red-600">{olErrors[`subject_${index}_marks`]}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem('ol', index)}
                      className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-all duration-200 mt-5"
                      disabled={education.ol.enabled === false}
                      aria-label="Remove O/L Subject"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1H5a1 1 0 00-1 1v1h16V5a1 1 0 00-1-1h-4a1 1 0 00-1-1zM8 10v8m4-8v8m4-8v8"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addCustomSubject('ol')}
                  className="mt-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-all duration-200"
                  disabled={education.ol.enabled === false || !canAddOLSubject()}
                  aria-label="Add O/L Subject"
                >
                  Add O/L Subject
                </button>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Remark</label>
                  <VoiceToText
                    name="ol.remark"
                    value={education.ol.remark || ''}
                    onChange={handleTextInputChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter any additional remarks"
                    disabled={education.ol.enabled === false}
                    aria-label="O/L Remark"
                    rows="4"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <strong>Has O/L Qualifications:</strong>{' '}
                  {education.ol.enabled !== false ? 'Yes' : 'No'}
                </div>
                {education.ol.enabled !== false && education.ol.subjects.length > 0 ? (
                  <div>
                    <strong>Subjects:</strong>
                    <table className="w-full border-collapse border bg-white mt-2 border-gray-200">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border border-gray-300 p-2 text-left text-sm font-bold text-gray-700">Subject</th>
                          <th className="border border-gray-300 p-2 text-left text-sm font-bold text-gray-700">Year</th>
                          <th className="border border-gray-300 p-2 text-left text-sm font-bold text-gray-700">Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {education.ol.subjects.map((subject, index) => (
                          <tr key={index}>
                            <td className="border border-gray-300 p-2">{subject.name || 'N/A'}</td>
                            <td className="border border-gray-300 p-2">{subject.year || 'N/A'}</td>
                            <td className="border border-gray-300 p-2">{subject.marks || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-2">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <strong>Remark:</strong> {education.ol.remark || 'N/A'}
                      </div>
                    </div>
                  </div>
                ) : education.ol.enabled !== false ? (
                  <div>No subjects studied.</div>
                ) : null}
              </div>
            )}
          </section>

          {/* G.C.E Advanced Level (A/L) Qualifications */}
          <section className="mb-14">
            <div className="flex justify-between items-center mb-2 pb-2">
              <div className="flex items-center space-x-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="al.enabled"
                    checked={education.al.enabled !== false}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                    disabled={editingSection !== 'al' && mode !== 'add'}
                    aria-label="Has G.C.E A/L Qualifications"
                  />
                  <span className="ml-2 text-sm text-gray-700"></span>
                </label>
                <h3 className="text-2xl font-semibold text-gray-800">G.C.E Advanced Level (A/L) Qualifications</h3>
              </div>
              {mode !== 'add' && (
                <div className="flex space-x-4">
                  <button
                    onClick={() => toggleSectionEdit("al")}
                    className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                    aria-label={editingSection === "al" ? "Save A/L Qualifications" : "Edit A/L Qualifications"}
                    disabled={isSaving}
                  >
                    <FaEdit className="mr-2" />
                    {editingSection === "al" ? (isSaving ? "Saving..." : "Save") : "Edit"}
                  </button>
                  {editingSection === "al" && (
                    <button
                      onClick={() => handleCancel("al")}
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
            {editingSection === 'al' || mode === 'add' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stream{ <span className="text-red-500">*</span>}</label>
                  <TypeableDropdown
                    options={alStremsOptions}
                    value={education.al.stream ? { value: education.al.stream, label: education.al.stream } : null}
                    onChange={(option) => handleSubjectChange('stream', null, option)}
                    placeholder="Select or type stream"
                    isDisabled={education.al.enabled === false}
                    className="mt-1"
                    classNamePrefix="select"
                    aria-label="A/L Stream"
                  />
                  {alErrors.stream && <p className="mt-1 text-sm text-red-600">{alErrors.stream}</p>}
                </div>
                {education.al.subjects.map((subject, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-1/3">
                      <label className="block text-sm font-medium text-gray-700">Subject{ <span className="text-red-500">*</span>}</label>
                      <TypeableDropdown
                        options={alSubjectsOptions}
                        value={subject.name ? { value: subject.name, label: subject.name } : null}
                        onChange={(option) => handleSubjectChange('al', index, option)}
                        placeholder="Select or type subject"
                        isDisabled={education.al.enabled === false}
                        className="mt-1"
                        classNamePrefix="select"
                        aria-label={`A/L Subject ${index + 1}`}
                      />
                      {(alErrors[`subject_${index}_name`] || alErrors[`subject_${index}_duplicate`]) && (
                        <p className="mt-1 text-sm text-red-600">
                          {alErrors[`subject_${index}_name`] || alErrors[`subject_${index}_duplicate`]}
                        </p>
                      )}
                    </div>
                    <div className="w-1/4">
                      <label className="block text-sm font-medium text-gray-700">Year{ <span className="text-red-500">*</span>}</label>
                      <select
                        name={`education.al.subjects.${index}.year`}
                        value={subject.year || currentYear}
                        onChange={handleTextInputChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        disabled={education.al.enabled === false}
                        aria-label={`A/L Subject ${index + 1} year`}
                      >
                        {yearOptions.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-1/4">
                      <label className="block text-sm font-medium text-gray-700">Grade{ <span className="text-red-500">*</span>}</label>
                      <input
                        name={`education.al.subjects.${index}.marks`}
                        value={subject.marks || ''}
                        onChange={handleTextInputChange}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        placeholder="Grade (e.g., A, B, C, S, W)"
                        disabled={education.al.enabled === false}
                        aria-label={`A/L Subject ${index + 1} marks`}
                        required
                      />
                      {alErrors[`subject_${index}_marks`] && (
                        <p className="mt-1 text-sm text-red-600">{alErrors[`subject_${index}_marks`]}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem('al', index)}
                      className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-all duration-200 mt-5"
                      disabled={education.al.enabled === false}
                      aria-label="Remove A/L Subject"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1H5a1 1 0 00-1 1v1h16V5a1 1 0 00-1-1h-4a1 1 0 00-1-1zM8 10v8m4-8v8m4-8v8"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addCustomSubject('al')}
                  className="mt-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-all duration-200"
                  disabled={education.al.enabled === false || !canAddALSubject()}
                  aria-label="Add A/L Subject"
                >
                  Add A/L Subject
                </button>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Remark</label>
                  <VoiceToText
                    name="al.remark"
                    value={education.al.remark || ''}
                    onChange={handleTextInputChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                    placeholder="Enter any additional remarks"
                    disabled={education.al.enabled === false}
                    aria-label="A/L Remark"
                    rows="4"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <strong>Has A/L Qualifications:</strong>{' '}
                  {education.al.enabled !== false ? 'Yes' : 'No'}
                </div>
                {education.al.enabled !== false && (
                  <>
                    <div>
                      <strong>Stream:</strong> {education.al.stream || 'N/A'}
                    </div>
                    {education.al.subjects.length > 0 ? (
                      <div>
                        <strong>Subjects:</strong>
                        <table className="w-full border-collapse border bg-white mt-2 border-gray-200">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border border-gray-300 p-2 text-left text-sm font-bold text-gray-700">Subject</th>
                              <th className="border border-gray-300 p-2 text-left text-sm font-bold text-gray-700">Year</th>
                              <th className="border border-gray-300 p-2 text-left text-sm font-bold text-gray-700">Grade</th>
                            </tr>
                          </thead>
                          <tbody>
                            {education.al.subjects.map((subject, index) => (
                              <tr key={index}>
                                <td className="border border-gray-300 p-2">{subject.name || 'N/A'}</td>
                                <td className="border border-gray-300 p-2">{subject.year || 'N/A'}</td>
                                <td className="border border-gray-300 p-2">{subject.marks || 'N/A'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="mt-2">
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <strong>Remark:</strong> {education.al.remark || 'N/A'}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>No subjects studied.</div>
                    )}
                  </>
                )}
              </div>
            )}
          </section>


          {/* Save Button */}
          {mode === 'add' && (
            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={handleSave}
                className="bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition-all duration-200"
                aria-label="Save All Education Details"
              >
                {isSaving ? 'Saving...' : 'Save'}
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

export default TabEducationDetailsChild;