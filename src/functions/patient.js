
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


// export const addContact = async (data) => {
//   try {
//     const tenantId = getTenantId();
//     const token = getToken();

//     return await customAxios
//       .post(`/contacts`, data, {
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${token}`,
//           tenantid: tenantId,
//         },
//       })
//       .then((res) => {
//         return res;
//       })
//       .catch((err) => {
//         return err.response;
//       });
//   } catch (err) {
//     return err;
//   }
// };

// export const updateCustomer = async (id, data) => {
//   try {
//     const tenantId = getTenantId();
//     const token = getToken();

//     return await customAxios
//       .put(`/contacts/${id}`, data, {
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${token}`,
//           tenantid: tenantId,
//         },
//       })
//       .then((res) => {
//         return res;
//       })
//       .catch((err) => {
//         return err.response;
//       });
//   } catch (err) {
//     return err;
//   }
// };

// export const deleteCustomer = async (id, isConfirm) => {
//   try {
//     const tenantId = getTenantId();
//     const token = getToken();
//     return await customAxios
//       .delete(`/contacts?contactId=${id}&isConfirm=${isConfirm}`, {
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${token}`,
//           tenantid: tenantId,
//         },
//       })
//       .then((res) => {
//         return res;
//       })
//       .catch((err) => {
//         return err.response;
//       });
//   } catch (err) {
//     return err;
//   }
// };
