import React, { useState, useRef } from 'react';
import { FaUpload, FaFileImage, FaFilePdf } from 'react-icons/fa';

const IrrationalThoughts = () => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection (via input or drag-and-drop)
  const handleFileChange = (selectedFile) => {
    if (selectedFile) {
      const type = selectedFile.type;
      if (type === 'image/jpeg' || type === 'image/jpg') {
        setFileType('image');
      } else if (type === 'application/pdf') {
        setFileType('pdf');
      } else {
        alert('Please upload a JPG or PDF file.');
        return;
      }
      const fileURL = URL.createObjectURL(selectedFile);
      setFile(fileURL);
    }
  };

  // Handle file input change
  const handleInputChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFileChange(selectedFile);
  };

  // Handle drag-and-drop events
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Remove the uploaded file
  const handleRemoveFile = () => {
    setFile(null);
    setFileType(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className="px-8 py-6">
      <section className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Irrational Thoughts in Students
        </h3>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {!file ? (
            // Upload Interface (when no file is uploaded)
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                dragging ? 'border-sky-500 bg-sky-50' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <FaUpload className="mx-auto text-gray-400 mb-4" size={40} />
              <p className="text-lg font-medium text-gray-700 mb-2">
                Upload a PDF or JPG file
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Drag and drop your file here, or click to browse
              </p>
              <button
                onClick={handleUploadClick}
                className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200 shadow-sm"
              >
                Upload File
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleInputChange}
                accept=".jpg,.jpeg,.pdf"
                className="hidden"
                aria-label="Upload file input"
              />
            </div>
          ) : (
            // Display Uploaded File
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {fileType === 'image' ? (
                    <FaFileImage className="text-blue-600" size={24} />
                  ) : (
                    <FaFilePdf className="text-red-600" size={24} />
                  )}
                  <p className="text-gray-700 font-medium">
                    {fileType === 'image' ? 'Uploaded Image' : 'Uploaded PDF'}
                  </p>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
              <div className="border rounded-lg p-4 bg-gray-50">
                {fileType === 'image' ? (
                  <img
                    src={file}
                    alt="Uploaded irrational thoughts"
                    className="max-w-full h-auto rounded-lg"
                  />
                ) : (
                  <iframe
                    src={file}
                    title="Uploaded PDF"
                    className="w-full h-[600px] rounded-lg"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default IrrationalThoughts;