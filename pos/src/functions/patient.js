
import customAxios from "../utils/axios";
import {  getToken } from "./authService";

export const getPatientRegistrations = async (data) => {
  try {
    const token = getToken();

    return await customAxios
      .post(`/patientRegistrations/get`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};

export const getapPatients = async (data) => {
  try {
    const token = getToken();

    return await customAxios
      .post(`/apPatient/get`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};

export const addApPatient = async (data) => {
  try {
    const token = getToken();

    return await customAxios
      .post(`/apPatient`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};


export const getPatientBasicInfo = async (patientId) => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/patient/basicInfo/${patientId}`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};


export const getPatientPersonalInfo = async (patientId) => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/patient/personalInfo/${patientId}`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};

export const getPatientFamilyInfo = async (patientId) => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/patient/familyInfo/${patientId}`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};

export const getPatientMedicalInfo = async (patientId) => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/patient/medicalInfo/${patientId}`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};


export const getPatientEducationInfo = async (patientId) => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/patient/educationInfo/${patientId}`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};

export const getEducationYears = async (patientId) => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/patient/educationYears/${patientId}`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};



export const getScholarship = async (patientId) => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/patient/scholarship/${patientId}`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};

export const getOl = async (patientId) => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/patient/ol/${patientId}`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};


export const getAl = async (patientId) => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/patient/al/${patientId}`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};



export const getUniversity = async (patientId) => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/patient/university/${patientId}`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};


export const getProfileTabDetails = async (id) => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/patient/profileTabDetails/${id}`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};



export const getPatientAppointments = async (data) => {
  try {
    const token = getToken();

    return await customAxios
      .post(`/patientAppointments/get`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};



export const addAppointment = async (data) => {
  try {
    const token = getToken();

    return await customAxios
      .post(`/appointment`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};


export const addBasicInformation = async (data) => {
  try {
    const token = getToken();

    return await customAxios
      .post(`/patient/patientRegistration`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};


export const updateBasicInformation = async (id,data) => {
  try {
    const token = getToken();

    return await customAxios
      .put(`/patient/patientRegistration/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};


export const addFamilyBasicInformation = async (data) => {
  try {
    const token = getToken();

    return await customAxios
      .post(`/patient/familyPatientRegistration`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};

export const updateFamilyBasicInformation = async (id,data) => {
  try {
    const token = getToken();

    return await customAxios
      .put(`/patient/familyPatientRegistration/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};



export const addPersonalInformation = async (data) => {
  try {
    const token = getToken();

    return await customAxios
      .post(`/patient/personalInformation`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};

export const updatePersonalInformation = async (id,data) => {
  try {
    const token = getToken();

    return await customAxios
      .put(`/patient/personalInformation/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};


export const addPersonalInformationFamily = async (data) => {
  try {
    const token = getToken();

    return await customAxios
      .post(`/patient/personalInformationFamily`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};

export const updatePersonalInformationFamily = async (id,data) => {
  try {
    const token = getToken();

    return await customAxios
      .put(`/patient/personalInformationFamily/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};


export const addPersonalInformationChild = async (data) => {
  try {
    const token = getToken();

    return await customAxios
      .post(`/patient/personalInformationChild`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};

export const updatePersonalInformationChild = async (id,data) => {
  try {
    const token = getToken();

    return await customAxios
      .put(`/patient/personalInformationChild/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};


export const addFamilyInformation = async (data) => {
  try {
    const token = getToken();

    return await customAxios
      .post(`/patient/familyInformation`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};

export const updateFamilyInformation = async (id,data) => {
  try {
    const token = getToken();

    return await customAxios
      .put(`/patient/familyInformation/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};

export const addMedicalInformation = async (data) => {
  try {
    const token = getToken();

    return await customAxios
      .post(`/patient/medicalInformation`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};

export const updateMedicalInformation = async (id,data) => {
  try {
    const token = getToken();

    return await customAxios
      .put(`/patient/medicalInformation/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};



export const addMedicalInformationFamily = async (data) => {
  try {
    const token = getToken();

    return await customAxios
      .post(`/patient/medicalInformation_family`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};

export const updateMedicalInformationFamily = async (id,data) => {
  try {
    const token = getToken();

    return await customAxios
      .put(`/patient/medicalInformation_family/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};





export const addEducation = async (data) => {
  try {
    const token = getToken();

    return await customAxios
      .post(`/patient/education`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};


export const updateEducation = async (id,data) => {
  try {
    const token = getToken();

    return await customAxios
      .put(`/patient/education/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }

}


export const addEducationFamily = async (data) => {
  try {
    const token = getToken();

    return await customAxios
      .post(`/patient/education_family`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};


export const updateEducationFamily = async (id,data) => {
  try {
    const token = getToken();

    return await customAxios
      .put(`/patient/education_family/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }

}


export const drpUniversitySubjects = async () => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/dropdown/universitySubjects`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};



export const drpOLSubjects = async () => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/dropdown/olSubjects`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};


export const drpALStreams = async () => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/dropdown/alStreams`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};

export const drpALSubjects = async () => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/dropdown/alSubjects`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};


export const drpInstitutions = async () => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/dropdown/institutions`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};






export const addSubject = async (data) => {
  try {
    const token = getToken();

    return await customAxios
      .post(`/subject`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};



export const drpBadPoints = async () => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/dropdown/badPoints`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};

export const drpGoodPoints = async () => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/dropdown/goodPoints`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};


export const drpOccupations = async () => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/dropdown/occupations`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};




export const drpRaisedBy = async () => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/dropdown/raisedby`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res)
      .catch((err) => err.response);
  } catch (err) {
    return err;
  }
};

export const drpReligions = async () => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/dropdown/religions`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res)
      .catch((err) => err.response);
  } catch (err) {
    return err;
  }
};

export const drpTypesOfPerson = async () => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/dropdown/typesofperson`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res)
      .catch((err) => err.response);
  } catch (err) {
    return err;
  }
};

export const drpSocialDifficulties = async () => {
  try {
    const token = getToken();
    return await customAxios
      .get(`/dropdown/socialdifficulties`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res)
      .catch((err) => err.response);
  } catch (err) {
    return err;
  }
};


// Function to fetch Edexcel IGCSE qualifications
export const getInternationalCurriculum = async (patientId) => {
  try {
    const token = getToken();
    return await customAxios
      .get(`/patient/internationalcurriculum/${patientId}`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};





export const drpACES = async () => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/dropdown/aces`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};


export const getMentalStatusExam = async (patientId) => {
  try {
    const token = getToken();
    return await customAxios
      .get(`/patient/mentalStatusExam/${patientId}`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};



export const addMentalStatusExam = async (data) => {
  try {
    const token = getToken();

    return await customAxios
      .post(`/patient/mental-status-exam`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};

export const updateMentalStatusExam = async (id,data) => {
  try {
    const token = getToken();

    return await customAxios
      .put(`/patient/mental-status-exam/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};



export const addMentalStatusExamFamily = async (data) => {
  try {
    const token = getToken();

    return await customAxios
      .post(`/patient/mental-status-exam-family`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};

export const updateMentalStatusExamFamily = async (id,data) => {
  try {
    const token = getToken();

    return await customAxios
      .put(`/patient/mental-status-exam-family/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};

  export const userLogin = async (data) => {
    try {
  
      return await customAxios
        .post(`/auth/login`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    } catch (err) {
      return err;
    }
  };




  export const addNote = async (data) => {
  try {
    const token = getToken();

    return await customAxios
      .post(`/notes/add`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};

export const updateNote = async (noteId, data) => {
  try {
    const token = getToken();

    return await customAxios
      .post(`/notes/update/${noteId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};

export const getNotes = async (patientId) => {
  try {
    const token = getToken();
    return await customAxios
      .post(`/notes/get`, { patientId }, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};

export const deleteNote = async (noteId) => {
  try {
    const token = getToken();
    return await customAxios
      .post(`/notes/delete/${noteId}`, {}, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};


export const drpDoctors = async () => {
  try {
    const token = getToken();

    return await customAxios
      .get(`/dropdown/doctors`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
};