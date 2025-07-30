import React from 'react';
import CreatableSelect from 'react-select/creatable';

const TypeableDropdown = ({
  options,
  value,
  onChange,
  placeholder,
  isDisabled,
  className,
  classNamePrefix,
  'aria-label': ariaLabel
}) => {
  // Transform options to match react-select's expected format (value/label)
  const transformedOptions = options.map(option => ({
    value: option.value.toString(),
    label: option.name,
  }));

  // Transform the selected value to match react-select's format
  const selectedValue = value.value!==value.name
    ? { value: value.value, label: transformedOptions.find(opt => opt.value == value.value)?.label}
    : { value: value.value, label: value.name};

  // Handle change and pass the option in the format expected by handleSubjectChange
  const handleChange = (option) => {
    const newValue = option ? { value: option.value.toString(), name: option.label } : null;
    onChange(newValue);
  };

  return (
    <>
    {/* {JSON.stringify(value)} */}
    <CreatableSelect
      options={transformedOptions}
      value={selectedValue}
      onChange={handleChange}
      placeholder={placeholder}
      isDisabled={isDisabled}
      className={className}
      classNamePrefix={classNamePrefix}
      aria-label={ariaLabel}
    />
    </>
  );
};

export default TypeableDropdown;