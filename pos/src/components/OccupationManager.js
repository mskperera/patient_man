import React, { useState, useEffect } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';
import MessageModel from './MessageModel';
import LoadingSpinner from './LoadingSpinner';
import { getOccupations, addOccupation, deleteOccupation } from '../functions/occupation';

function OccupationManager() {
  const [occupations, setOccupations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, message: '', type: 'error' });
  const [newOccupation, setNewOccupation] = useState({
    occupationName: {
      label: 'Occupation Name',
      value: '',
      isTouched: false,
      isValid: false,
      required: true,
      dataType: 'string',
    },
  });
  const [occupationErrors, setOccupationErrors] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Fetch occupations
  const loadOccupations = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getOccupations(1); // Assuming userLogId=1
      const results = response.data || [];
      setOccupations(results);
    } catch (err) {
      setError('Failed to load occupations. Please try again later.');
      console.error('Error fetching occupations:', err);
      setOccupations([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOccupations();
  }, []);

  // Validate occupation name
  const validateField = (name, value, required) => {
    if (required && value.trim() === '') {
      return `${name} is required`;
    }
    return '';
  };

  // Handle input change for new occupation
  const handleChangeOccupation = (e) => {
    const { name, value } = e.target;
    const required = newOccupation[name].required;
    const error = validateField(newOccupation[name].label, value, required);

    setNewOccupation({
      ...newOccupation,
      [name]: {
        ...newOccupation[name],
        value,
        isTouched: true,
        isValid: error === '',
      },
    });
    setOccupationErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Validate form before submission
  const validateOccupation = () => {
    const errors = {};
    let isFormValid = true;

    Object.entries(newOccupation).forEach(([key, field]) => {
      const { value, required, label } = field;
      const errorMessage = validateField(label, value, required);

      if (errorMessage) {
        isFormValid = false;
        errors[key] = errorMessage;
      }
    });

    setOccupationErrors(errors);
    return isFormValid;
  };

  // Handle adding new occupation
  const handleAddOccupation = async (e) => {
    e.preventDefault();
    const isValid = validateOccupation();
    if (!isValid) {
      return;
    }

    try {
      const payload = {
        occupationName: newOccupation.occupationName.value,
      };
      const response = await addOccupation(payload);
      if (response.data.responseStatus === 'failed') {
        setModal({
          isOpen: true,
          message: response.data.outputMessage,
          type: 'error',
        });
        return;
      }

      setModal({
        isOpen: true,
        message: response.data.outputMessage,
        type: 'success',
      });
      setNewOccupation({
        occupationName: {
          label: 'Occupation Name',
          value: '',
          isTouched: false,
          isValid: false,
          required: true,
          dataType: 'string',
        },
      });
      setIsAddModalOpen(false);
      await loadOccupations();
    } catch (err) {
      setModal({
        isOpen: true,
        message: err.message || 'Failed to add occupation.',
        type: 'error',
      });
    }
  };

  // Handle deleting occupation
  const handleDeleteOccupation = async (occupationId, occupationName) => {
    if (!window.confirm(`Are you sure you want to delete "${occupationName}"?`)) {
      return;
    }

    try {
      const response = await deleteOccupation(occupationId);
      if (response.data.responseStatus === 'failed') {
        setModal({
          isOpen: true,
          message: response.data.outputMessage,
          type: 'error',
        });
        return;
      }

      setModal({
        isOpen: true,
        message: response.data.outputMessage,
        type: 'success',
      });
      await loadOccupations();
    } catch (err) {
      setModal({
        isOpen: true,
        message: err.message || 'Failed to delete occupation.',
        type: 'error',
      });
    }
  };

  return (
    <div className="px-8">
      <MessageModel
        isOpen={modal.isOpen}
        onClose={() => setModal({ isOpen: false, message: '', type: 'error' })}
        message={modal.message}
        type={modal.type}
      />
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-gray-800">Occupations</h3>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
          aria-label="Add New Occupation"
        >
          <FaPlus className="mr-2" /> Add Occupation
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md" role="alert">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700 w-32">
                Occupation ID
              </th>
              <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
                Occupation Name
              </th>
              <th scope="col" className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="3" className="py-3 px-4 text-center text-gray-500">
                  <LoadingSpinner />
                </td>
              </tr>
            ) : occupations.length === 0 ? (
              <tr>
                <td colSpan="3" className="py-3 px-4 text-center text-gray-500">
                  No occupations found
                </td>
              </tr>
            ) : (
              occupations.map((occupation) => (
                <tr key={occupation.value} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 border text-gray-800">{occupation.value}</td>
                  <td className="py-3 px-4 border text-gray-800">{occupation.name}</td>
                  <td className="py-3 px-4 border">
                    <button
                      onClick={() => handleDeleteOccupation(occupation.value, occupation.name)}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
                      aria-label={`Delete occupation ${occupation.name}`}
                    >
                      <FaTrash size={20} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Occupation Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Occupation</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Occupation Name <span className="text-red-500">*</span>
              </label>
              <input
                name="occupationName"
                value={newOccupation.occupationName.value}
                onChange={handleChangeOccupation}
                className="mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                placeholder="Enter occupation name"
                aria-label="Occupation name"
              />
              {occupationErrors.occupationName && (
                <p className="mt-1 text-sm text-red-600">{occupationErrors.occupationName}</p>
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all duration-200"
                aria-label="Cancel"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOccupation}
                className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
                aria-label="Save Occupation"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OccupationManager;