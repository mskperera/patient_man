import axios from 'axios';
import customAxios from '../utils/axios';

export const uploadImageResized = async (file) => {
  try {


 const productImageFolderPath=`ichangeStorage/notes`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folderPath', productImageFolderPath);  

    return await customAxios
      .post(`${process.env.REACT_APP_API_CDN}/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error uploading image:', err);
        return err.response;
      });
  } catch (err) {
    console.error('Unexpected error in uploadImage:', err);
    return err;
  }
};




export const uploadFile = async (file) => {
  try {


 const productImageFolderPath=`ichangeStorage/notes`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folderPath', productImageFolderPath);  

    return await customAxios
      .post(`${process.env.REACT_APP_API_CDN}/upload-file`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error uploading file:', err);
        return err.response;
      });
  } catch (err) {
    console.error('Unexpected error in upladFile:', err);
    return err;
  }
};


export const uploadPsyNoteAttachments = async (file) => {
  try {


 const productImageFolderPath=`ichangeStorage/psyNotes`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folderPath', productImageFolderPath);  

    return await customAxios
      .post(`${process.env.REACT_APP_API_CDN}/upload-file`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error uploading file:', err);
        return err.response;
      });
  } catch (err) {
    console.error('Unexpected error in upladFile:', err);
    return err;
  }
};



export const commitFile = async (fileHash) => {
  try {
   
    return await customAxios
      .post(`${process.env.REACT_APP_API_CDN}/imageUpload/commitFile`, {fileHash}, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error uploading image:', err);
        return err.response;
      });
  } catch (err) {
    console.error('Unexpected error in uploadImage:', err);
    return err;
  }
};


export const markFileAsTobeDeleted = async (fileHash) => {
  try {

    return await customAxios
      .post(`${process.env.REACT_APP_API_CDN}/imageUpload/markFileAsTobeDeleted`, {fileHash}, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error uploading image:', err);
        return err.response;
      });
  } catch (err) {
    console.error('Unexpected error in uploadImage:', err);
    return err;
  }
};

