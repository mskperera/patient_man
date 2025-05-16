import { useState, useRef, useEffect } from 'react';
import { FaPlusSquare, FaTimesCircle } from 'react-icons/fa';

// Predefined options for the dropdown


const DescriptionInput = ({ patient, setPatient, isEditing, fieldName, label, placeholder, descriptionOptions,isTypeable = false }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const customInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Convert description string to array for display
  const descriptionList = patient[fieldName]
    ? patient[fieldName].split(',').map(item => item.trim()).filter(item => item)
    : [];

  // Filter options based on input for typeable dropdown
  const filteredOptions = isTypeable
    ? descriptionOptions.filter(option => option.toLowerCase().includes(inputValue.toLowerCase()))
    : descriptionOptions;

  // Focus custom input when 'Other' is selected
  useEffect(() => {
    if (selectedDescription === 'Other' && customInputRef.current) {
      customInputRef.current.focus();
    }
  }, [selectedDescription]);

  // Close dropdown when clicking outside (for typeable dropdown)
  useEffect(() => {
    if (!isTypeable) return;
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isTypeable]);

  const handleAddDescription = () => {
    const descriptionToAdd = selectedDescription === 'Other' ? customDescription : selectedDescription;
    if (descriptionToAdd && !descriptionList.includes(descriptionToAdd)) {
      const updatedDescription = patient[fieldName]
        ? `${patient[fieldName]}, ${descriptionToAdd}`
        : descriptionToAdd;
      setPatient(prev => ({ ...prev, [fieldName]: updatedDescription }));
      setSelectedDescription('');
      setCustomDescription('');
      setInputValue('');
      setIsDropdownOpen(false);
    }
  };

  const handleRemoveDescription = (descriptionToRemove) => {
    const updatedList = descriptionList.filter(desc => desc !== descriptionToRemove);
    setPatient(prev => ({
      ...prev,
      [fieldName]: updatedList.join(', ')
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && selectedDescription) {
      handleAddDescription();
    }
  };

  const handleInputKeyDown = (e) => {
    if (!isTypeable) return;
    if (e.key === 'Enter' && filteredOptions.length > 0) {
      setSelectedDescription(filteredOptions[0]);
      setInputValue(filteredOptions[0]);
      setIsDropdownOpen(false);
    } else if (e.key === 'ArrowDown' && filteredOptions.length > 0) {
      setIsDropdownOpen(true);
      dropdownRef.current?.querySelector('li')?.focus();
    }
  };

  const handleOptionClick = (option) => {
    setSelectedDescription(option);
    setInputValue(option);
    setIsDropdownOpen(false);
    if (option !== 'Other') {
      inputRef.current?.focus();
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
            <div className="relative flex-1" ref={dropdownRef}>
              {isTypeable ? (
                <>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setSelectedDescription('');
                      setIsDropdownOpen(true);
                    }}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Type or select a descriptor"
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 bg-white hover:border-gray-300"
                    aria-label={`Select ${fieldName} description`}
                    onFocus={() => setIsDropdownOpen(true)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {isDropdownOpen && filteredOptions.length > 0 && (
                    <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredOptions.map((option, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-sky-100 cursor-pointer focus:bg-sky-100 focus:outline-none"
                          tabIndex={0}
                          onClick={() => handleOptionClick(option)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleOptionClick(option);
                            if (e.key === 'ArrowDown' && index < filteredOptions.length - 1) {
                              dropdownRef.current?.querySelectorAll('li')[index + 1]?.focus();
                            }
                            if (e.key === 'ArrowUp' && index > 0) {
                              dropdownRef.current?.querySelectorAll('li')[index - 1]?.focus();
                            }
                          }}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <>
                  <select
                    id={`${fieldName}-description`}
                    value={selectedDescription}
                    onChange={(e) => setSelectedDescription(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 bg-white hover:border-gray-300 appearance-none"
                    aria-label={`Select ${fieldName} description`}
                  >
                    <option value="" disabled>Select</option>
                    {descriptionOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={handleAddDescription}
              disabled={!selectedDescription || (selectedDescription === 'Other' && !customDescription)}
              className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-1"
              aria-label="Add description"
            >
              <FaPlusSquare className="w-4 h-4" />
              Add
            </button>
          </div>
          {selectedDescription === 'Other' && (
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