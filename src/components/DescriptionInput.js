import { useState, useRef, useEffect } from 'react';
import { FaPlusSquare, FaTimesCircle } from 'react-icons/fa';
import CreatableSelect from 'react-select/creatable';

const DescriptionInput = ({ patient, setPatient, setValue, isEditing, fieldName, label, placeholder, descriptionOptions, isTypeable = false }) => {
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [customDescription, setCustomDescription] = useState('');
  const customInputRef = useRef(null);

  // Convert description string to array for display
  const descriptionList = patient[fieldName]?.value
    ? Array.isArray(patient[fieldName].value)
      ? patient[fieldName].value
      : patient[fieldName].value.split(';;').map(item => item.trim()).filter(item => item)
    : [];

  // Format descriptionOptions for CreatableSelect
  const formattedOptions = descriptionOptions.map(option => ({
    value: option.name,
    label: option.name,
    id: option.id
  }));

  // Focus custom input when 'Other' is selected
  useEffect(() => {
    if (selectedDescription?.value === 'Other' && customInputRef.current) {
      customInputRef.current.focus();
    }
  }, [selectedDescription]);

  const handleAddDescription = () => {
    const descriptionToAdd = selectedDescription?.value === 'Other' ? customDescription : selectedDescription?.value;
    if (descriptionToAdd && !descriptionList.includes(descriptionToAdd)) {
      const updatedList = [...descriptionList, descriptionToAdd];
      const updatedDescription = updatedList; // Store as array
      
      setPatient(prev => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          value: updatedDescription,
          isTouched: true,
          isValid: prev[fieldName].required ? updatedDescription.length > 0 : true
        }
      }));
      setValue(updatedList.join(';;')); // Join with '|' for string representation
      setSelectedDescription(null);
      setCustomDescription('');
    }
  };

  const handleRemoveDescription = (descriptionToRemove) => {
    const updatedList = descriptionList.filter(desc => desc !== descriptionToRemove);
    setPatient(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value: updatedList,
        isTouched: true,
        isValid: prev[fieldName].required ? updatedList.length > 0 : true
      }
    }));
    setValue(updatedList.join(';;')); // Join with '|' for string representation
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (selectedDescription?.value || (selectedDescription?.value === 'Other' && customDescription))) {
      handleAddDescription();
    }
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={`${fieldName}-description`}
        className="block text-sm text-gray-800"
      >
        {label}
      </label>
      {isEditing ? (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <CreatableSelect
                options={formattedOptions}
                value={selectedDescription}
                onChange={(option) => setSelectedDescription(option)}
                onKeyDown={handleKeyPress}
                placeholder="Select or enter a new value"
                isDisabled={!isEditing}
                className="text-sm"
                classNamePrefix="select"
                aria-label={`Select ${fieldName} description`}
                isClearable
                formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
              />
            </div>
            <button
              onClick={handleAddDescription}
              disabled={!selectedDescription || (selectedDescription?.value === 'Other' && !customDescription)}
              className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-1"
              aria-label="Add description"
            >
              <FaPlusSquare className="w-4 h-4" />
              Add
            </button>
          </div>
          {selectedDescription?.value === 'Other' && (
            <input
              ref={customInputRef}
              type="text"
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={placeholder}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
              aria-label={`Custom ${fieldName} description`}
            />
          )}
          {descriptionList.length > 0 && (
            <div className="mt-3">
              <div className="flex justify-start flex-wrap gap-2">
                {descriptionList.map((desc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <span className="text-sm text-gray-700 mr-2">{desc}</span>
                    <button
                      onClick={() => handleRemoveDescription(desc)}
                      className="text-red-500 hover:text-red-600 transition-colors duration-200 flex items-center gap-1"
                      aria-label={`Remove ${desc}`}
                    >
                      <FaTimesCircle className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">
            {descriptionList.length > 0 ? descriptionList.join(', ') : 'No description provided'}
          </p>
        </div>
      )}
    </div>
  );
};

export default DescriptionInput;
