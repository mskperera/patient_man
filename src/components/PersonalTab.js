import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';

const PersonalTab = ({ mode, patientId, onSave, onNext }) => {
  // Mock data for the Personal tab
  const mockData = {
    patientId: 'PT-0001',
    firstName: 'John',
    middleName: 'Peter',
    lastName: 'Perera',
    dob: '1990-01-01',
    age: '35',
    gender: 'Male',
    address: { street: '123 Main St', city: 'Colombo', state: 'Western', zip: '10100' },
    homePhone: '0114547854',
    businessPhone: '0774454785',
    permanentAddress: '',
    referralSource: 'self',
    referralPartyPresent: 'No',
    maritalStatus: 'Single',
    yearsMarried: '',
    maleChildrenAges: '',
    femaleChildrenAges: '',
    educationYears: '16',
    religiosity: '3',
    thingsLiked: 'Reading, hiking',
    assets: 'Optimistic, good communicator',
    formDate: '1990-01-01',
  };

  // Initialize state
  const [data, setData] = useState({
    patientId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    age: '',
    gender: '',
    address: { street: '', city: '', state: '', zip: '' },
    homePhone: '',
    businessPhone: '',
    permanentAddress: '',
    referralSource: '',
    referralPartyPresent: '',
    maritalStatus: '',
    yearsMarried: '',
    maleChildrenAges: '',
    femaleChildrenAges: '',
    educationYears: '',
    religiosity: '',
    thingsLiked: '',
    assets: '',
    formDate: '',
  });
  const [editingSection, setEditingSection] = useState(null);
  const isEditing = mode === 'add' || mode === 'edit';

  // Load mock data for edit/view modes
  useEffect(() => {
    if (mode === 'edit' || mode === 'view') {
      setData(mockData);
    }
    if (mode === 'add') {
      setData((prev) => ({
        ...prev,
        patientId: `PT-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
        formDate: new Date().toISOString().split('T')[0],
      }));
    }
  }, [mode]);

  // Handle field changes
  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle nested field changes (e.g., address)
  const handleNestedChange = (field, subField, value) => {
    setData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [subField]: value },
    }));
  };

  // Toggle section editing
  const toggleSectionEdit = (section) => {
    if (editingSection === section) {
      onSave(data);
      setEditingSection(null);
    } else {
      setEditingSection(section);
    }
  };

  // Handle save and next
  const handleSaveAndNext = async () => {
    await onSave(data);
    onNext();
  };

  return (
    <div className="px-8">
      {/* Basic Information */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-2xl font-semibold text-gray-800">Basic Information</h3>
          {mode !== 'add' && (
            <button
              onClick={() => toggleSectionEdit('basic')}
              className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200"
              aria-label={editingSection === 'basic' ? 'Save Basic Info' : 'Edit Basic Info'}
            >
              <FaEdit className="mr-2" />
              {editingSection === 'basic' ? 'Save' : 'Edit'}
            </button>
          )}
        </div>
        {(editingSection === 'basic' || mode === 'add') && isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Patient ID</label>
              <input
                name="patientId"
                value={data.patientId}
                readOnly
                className="mt-1 w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                aria-label="Patient ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Form Date</label>
              <input
                type="date"
                name="formDate"
                value={data.formDate}
                onChange={(e) => handleChange('formDate', e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                aria-label="Form date"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                name="lastName"
                value={data.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                placeholder="Enter last name"
                aria-label="Last name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                name="firstName"
                value={data.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                placeholder="Enter first name"
                aria-label="First name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Middle Name</label>
              <input
                name="middleName"
                value={data.middleName}
                onChange={(e) => handleChange('middleName', e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                placeholder="Enter middle name"
                aria-label="Middle name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={data.dob}
                onChange={(e) => handleChange('dob', e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                aria-label="Date of birth"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={data.age}
                onChange={(e) => handleChange('age', e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                placeholder="Enter age"
                aria-label="Age"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sex</label>
              <div className="flex space-x-4 mt-1">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={data.gender === 'Male'}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                    aria-label="Male"
                  />
                  <span className="ml-2 text-sm text-gray-700">Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={data.gender === 'Female'}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                    aria-label="Female"
                  />
                  <span className="ml-2 text-sm text-gray-700">Female</span>
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Patient ID:</strong> {data.patientId || 'N/A'}</div>
            <div><strong>Form Date:</strong> {data.formDate || 'N/A'}</div>
            <div><strong>Last Name:</strong> {data.lastName || 'N/A'}</div>
            <div><strong>First Name:</strong> {data.firstName || 'N/A'}</div>
            <div><strong>Middle Name:</strong> {data.middleName || 'N/A'}</div>
            <div><strong>Date of Birth:</strong> {data.dob || 'N/A'}</div>
            <div><strong>Age:</strong> {data.age || 'N/A'}</div>
            <div><strong>Gender:</strong> {data.gender || 'N/A'}</div>
          </div>
        )}
      </section>

      {/* Address Information */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-2xl font-semibold text-gray-800">Address Information</h3>
          {mode !== 'add' && (
            <button
              onClick={() => toggleSectionEdit('address')}
              className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700"
              aria-label={editingSection === 'address' ? 'Save Address Info' : 'Edit Address Info'}
            >
              <FaEdit className="mr-2" />
              {editingSection === 'address' ? 'Save' : 'Edit'}
            </button>
          )}
        </div>
        {(editingSection === 'address' || mode === 'add') && isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Street</label>
              <input
                name="street"
                value={data.address.street}
                onChange={(e) => handleNestedChange('address', 'street', e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                placeholder="Enter street"
                aria-label="Street"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                name="city"
                value={data.address.city}
                onChange={(e) => handleNestedChange('address', 'city', e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                placeholder="Enter city"
                aria-label="City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                name="state"
                value={data.address.state}
                onChange={(e) => handleNestedChange('address', 'state', e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                placeholder="Enter state"
                aria-label="State"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Zip</label>
              <input
                name="zip"
                value={data.address.zip}
                onChange={(e) => handleNestedChange('address', 'zip', e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                placeholder="Enter zip"
                aria-label="Zip"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Permanent Address</label>
              <textarea
                name="permanentAddress"
                value={data.permanentAddress}
                onChange={(e) => handleChange('permanentAddress', e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                rows="3"
                placeholder="Enter permanent address"
                aria-label="Permanent address"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Address:</strong> {`${data.address.street}, ${data.address.city}, ${data.address.state} ${data.address.zip}` || 'N/A'}</div>
            <div><strong>Permanent Address:</strong> {data.permanentAddress || 'N/A'}</div>
          </div>
        )}
      </section>

      {/* Contact Information */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-2xl font-semibold text-gray-800">Contact Information</h3>
          {mode !== 'add' && (
            <button
              onClick={() => toggleSectionEdit('contact')}
              className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700"
              aria-label={editingSection === 'contact' ? 'Save Contact Info' : 'Edit Contact Info'}
            >
              <FaEdit className="mr-2" />
              {editingSection === 'contact' ? 'Save' : 'Edit'}
            </button>
          )}
        </div>
        {(editingSection === 'contact' || mode === 'add') && isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Home Phone</label>
              <input
                name="homePhone"
                value={data.homePhone}
                onChange={(e) => handleChange('homePhone', e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                placeholder="Enter home phone"
                aria-label="Home phone"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Phone</label>
              <input
                name="businessPhone"
                value={data.businessPhone}
                onChange={(e) => handleChange('businessPhone', e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                placeholder="Enter business phone"
                aria-label="Business phone"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Home Phone:</strong> {data.homePhone || 'N/A'}</div>
            <div><strong>Business Phone:</strong> {data.businessPhone || 'N/A'}</div>
          </div>
        )}
      </section>

      {/* Referral Information */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-2xl font-semibold text-gray-800">Referral Information</h3>
          {mode !== 'add' && (
            <button
              onClick={() => toggleSectionEdit('referral')}
              className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700"
              aria-label={editingSection === 'referral' ? 'Save Referral Info' : 'Edit Referral Info'}
            >
              <FaEdit className="mr-2" />
              {editingSection === 'referral' ? 'Save' : 'Edit'}
            </button>
          )}
        </div>
        {(editingSection === 'referral' || mode === 'add') && isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Who referred you?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                {[
                  'Self',
                  'School or Teacher',
                  'Psychologist or Psychiatrist',
                  'Social Agency',
                  'Hospital or Clinic',
                  'Family Doctor',
                  'Friend',
                  'Relative',
                  'Other',
                ].map((source) => (
                  <label key={source} className="flex items-center">
                    <input
                      type="radio"
                      name="referralSource"
                      value={source.toLowerCase()}
                      checked={data.referralSource === source.toLowerCase()}
                      onChange={(e) => handleChange('referralSource', e.target.value)}
                      className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                      aria-label={source}
                    />
                    <span className="ml-2 text-sm text-gray-700">{source}</span>
                  </label>
                ))}
              </div>
              {data.referralSource === 'other' && (
                <input
                  name="referralSourceOther"
                  value={data.referralSourceOther || ''}
                  onChange={(e) => handleChange('referralSourceOther', e.target.value)}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                  placeholder="Please specify"
                  aria-label="Other referral source"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Has this party been here?</label>
              <div className="flex space-x-4 mt-1">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="referralPartyPresent"
                    value="Yes"
                    checked={data.referralPartyPresent === 'Yes'}
                    onChange={(e) => handleChange('referralPartyPresent', e.target.value)}
                    className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                    aria-label="Yes"
                  />
                  <span className="ml-2 text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="referralPartyPresent"
                    value="No"
                    checked={data.referralPartyPresent === 'No'}
                    onChange={(e) => handleChange('referralPartyPresent', e.target.value)}
                    className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                    aria-label="No"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>Referral Source:</strong>{' '}
              {data.referralSource === 'other' ? data.referralSourceOther : data.referralSource || 'N/A'}
            </div>
            <div>
              <strong>Referral Party Present:</strong> {data.referralPartyPresent || 'N/A'}
            </div>
          </div>
        )}
      </section>

      {/* Personal Details */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-2xl font-semibold text-gray-800">Personal Details</h3>
          {mode !== 'add' && (
            <button
              onClick={() => toggleSectionEdit('personalDetails')}
              className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700"
              aria-label={editingSection === 'personalDetails' ? 'Save Personal Details' : 'Edit Personal Details'}
            >
              <FaEdit className="mr-2" />
              {editingSection === 'personalDetails' ? 'Save' : 'Edit'}
            </button>
          )}
        </div>
        {(editingSection === 'personalDetails' || mode === 'add') && isEditing ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Present Marital Status</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {[
                  'Never Married',
                  'Married (Living Together) Now for First Time',
                  'Married (Living Together) Now for Second (or More) Time',
                  'Separated',
                  'Divorced and Not Remarried',
                  'Widowed and Not Remarried',
                ].map((status) => (
                  <label key={status} className="flex items-center">
                    <input
                      type="radio"
                      name="maritalStatus"
                      value={status.toLowerCase()}
                      checked={data.maritalStatus === status.toLowerCase()}
                      onChange={(e) => handleChange('maritalStatus', e.target.value)}
                      className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                      aria-label={status}
                    />
                    <span className="ml-2 text-sm text-gray-700">{status}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Years Married</label>
                <input
                  type="number"
                  name="yearsMarried"
                  value={data.yearsMarried}
                  onChange={(e) => handleChange('yearsMarried', e.target.value)}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                  placeholder="Enter years"
                  disabled={!data.maritalStatus.includes('now for')}
                  aria-label="Years married"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ages of Male Children</label>
                <input
                  name="maleChildrenAges"
                  value={data.maleChildrenAges}
                  onChange={(e) => handleChange('maleChildrenAges', e.target.value)}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                  placeholder="e.g., 5, 10"
                  aria-label="Male children ages"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ages of Female Children</label>
                <input
                  name="femaleChildrenAges"
                  value={data.femaleChildrenAges}
                  onChange={(e) => handleChange('femaleChildrenAges', e.target.value)}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                  placeholder="e.g., 3, 8"
                  aria-label="Female children ages"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Years of Education</label>
                <select
                  name="educationYears"
                  value={data.educationYears}
                  onChange={(e) => handleChange('educationYears', e.target.value)}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                  aria-label="Education years"
                >
                  <option value="">Select years</option>
                  {[...Array(21)].map((_, i) => (
                    <option key={i} value={i}>
                      {i === 20 ? 'More than 20' : i}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Religiosity (1=Very Religious, 9=Atheist)</label>
                <div className="mt-2 flex justify-between text-xs text-gray-600">
                  <span>Very</span>
                  <span>Average</span>
                  <span>Atheist</span>
                </div>
                <div className="flex items-center justify-between mt-1 space-x-1">
                  {[...Array(9)].map((_, i) => {
                    const value = (i + 1).toString();
                    return (
                      <label key={value} className="flex flex-col items-center">
                        <input
                          type="radio"
                          name="religiosity"
                          value={value}
                          checked={data.religiosity === value}
                          onChange={(e) => handleChange('religiosity', e.target.value)}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                          aria-label={`Religiosity level ${value}`}
                        />
                        <span className="mt-1 text-sm text-gray-700">{value}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Marital Status:</strong> {data.maritalStatus || 'N/A'}</div>
            <div><strong>Years Married:</strong> {data.yearsMarried || 'N/A'}</div>
            <div><strong>Male Children Ages:</strong> {data.maleChildrenAges || 'N/A'}</div>
            <div><strong>Female Children Ages:</strong> {data.femaleChildrenAges || 'N/A'}</div>
            <div><strong>Years of Education:</strong> {data.educationYears || 'N/A'}</div>
            <div><strong>Religiosity:</strong> {data.religiosity ? `${data.religiosity} (1=Very Religious, 9=Atheist)` : 'N/A'}</div>
          </div>
        )}
      </section>

      {/* Personal Insights */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-2xl font-semibold text-gray-800">Personal Insights</h3>
          {mode !== 'add' && (
            <button
              onClick={() => toggleSectionEdit('insights')}
              className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700"
              aria-label={editingSection === 'insights' ? 'Save Personal Insights' : 'Edit Personal Insights'}
            >
              <FaEdit className="mr-2" />
              {editingSection === 'insights' ? 'Save' : 'Edit'}
            </button>
          )}
        </div>
        {(editingSection === 'insights' || mode === 'add') && isEditing ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Things You Like to Do</label>
              <textarea
                name="thingsLiked"
                value={data.thingsLiked}
                onChange={(e) => handleChange('thingsLiked', e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                rows="4"
                placeholder="Describe your interests and pleasures"
                aria-label="Things liked"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Main Assets and Good Points</label>
              <textarea
                name="assets"
                value={data.assets}
                onChange={(e) => handleChange('assets', e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                rows="4"
                placeholder="List your strengths"
                aria-label="Assets"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div><strong>Things Liked:</strong> {data.thingsLiked || 'N/A'}</div>
            <div><strong>Assets:</strong> {data.assets || 'N/A'}</div>
          </div>
        )}
      </section>

      {isEditing && (
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={handleSaveAndNext}
            className="flex items-center bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 shadow-md"
            aria-label="Save and go to next tab"
          >
            Save & Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalTab;