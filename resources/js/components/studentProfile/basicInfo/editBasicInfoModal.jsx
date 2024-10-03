import React, { useState, useEffect, useRef } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { router } from '@inertiajs/react';


const EditBasicInfoModal = ({ student, addresses, studentID, onClose }) => {
  const [firstName, setFirstName] = useState(student?.firstName ?? '');
  const [lastName, setLastName] = useState(student?.lastName ?? '');
  const [studentEmail, setStudentEmail] = useState(student?.email ?? '');
  const [studentPhoneNum, setStudentPhoneNum] = useState(student?.phoneNum ?? '');
  const [studentGender, setStudentGender] = useState(student?.gender ?? '');
  const [studentIC, setStudentIC] = useState(student?.ICNumber ?? '');
  const [birthDate, setBirthDate] = useState(student?.dateOfBirth ?? '');
  const [nationality, setNationality] = useState(student?.nationality ?? '');
  const [studentAddresses, setStudentAddresses] = useState(addresses);
  const [homeAddress, setHomeAddress] = useState(studentAddresses.find(address => address.type === 'home') ?? { address1: '', address2: '', postcode: '', city: '', state: '' });
  const [trainingAddress, setTrainingAddress] = useState(studentAddresses.find(address => address.type === 'training') ?? { address1: '', address2: '', postcode: '', city: '', state: '' });
  const [copyToTraining, setCopyToTraining] = useState(false);
  const [errors, setErrors] = useState({});
  const [passportNo, setPassportNo] = useState(student?.passportNo ?? '');

  const dateOfBirthRef = useRef(null);

  useEffect(() => {
    dateOfBirthRef.current.max = new Date().toISOString().split('T')[0];
  }, []);
  const [addressErrors, setAddressErrors] = useState({
    home: {},
    training: {}
  });

  console.log(trainingAddress);
  useEffect(() => {
    // Initialize homeAddress and trainingAddress when studentAddresses change
    setHomeAddress(studentAddresses.find(address => address.type === 'home') ?? { address1: '', address2: '', postcode: '', city: '', state: '' });
    setTrainingAddress(studentAddresses.find(address => address.type === 'training') ?? { address1: '', address2: '', postcode: '', city: '', state: '' });
  }, [studentAddresses]);

  useEffect(() => {
    if (copyToTraining && homeAddress) {
      // Copy home address to training address when copyToTraining is true
      setTrainingAddress({
        ...homeAddress,
        type: 'training', // Ensure correct type
        id: 0, // Handle addressID accordingly
        studentID: homeAddress.studentID // Ensure correct studentID
      });
    }
  }, [copyToTraining, homeAddress]);

  const handleCopyToggle = (event) => {
    setCopyToTraining(event.target.checked);
  };

  const handleEdit = (e) => {
    e.preventDefault();

    if (studentGender === '') {
      setErrors(errors => ({ ...errors, studentGender: 'Please select a gender.' }));

      if (nationality === '') {
        setErrors(errors => ({ ...errors, nationality: 'Please select a nationality.' }));
      }
      return;
    }

    if (nationality === '') {
      setErrors(errors => ({ ...errors, nationality: 'Please select a nationality.' }));

      if (studentGender === '') {
        setErrors(errors => ({ ...errors, studentGender: 'Please select a gender.' }));
      }
      return;
    }

    const updatedStudent = {
      firstName,
      lastName,
      phoneNum: studentPhoneNum,
      ICNumber: studentIC || null,
      passportNo: passportNo || null,
      dateOfBirth: birthDate,
      gender: studentGender,
      nationality
    };

    //console.log(updatedStudent);

    const updatedAddresses = [
      {
        address1: homeAddress?.address1 ?? '',
        address2: homeAddress?.address2 ?? '',
        postcode: homeAddress?.postcode ?? '',
        city: homeAddress?.city ?? '',
        state: homeAddress?.state ?? '',
        type: 'home',
      },
      {
        address1: trainingAddress?.address1 ?? '',
        address2: trainingAddress?.address2 ?? '',
        postcode: trainingAddress?.postcode ?? '',
        city: trainingAddress?.city ?? '',
        state: trainingAddress?.state ?? '',
        type: 'training',
      },
    ];

    router.post(`/basicInfo/update/${studentID}`, {
      student: updatedStudent,
      addresses: updatedAddresses
    });
    onClose();
  };


  return (
    <div>
      <form className="space-y-4" onSubmit={handleEdit}>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <div className='col-span-1'>
            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div className='col-span-1'>
            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <div className='col-span-1'>
            <label htmlFor="studentEmail" className="block mb-2 text-sm font-medium text-gray-900">Email Address</label>
            <input
              type="email"
              id="studentEmail"
              name="studentEmail"
              placeholder='Enter Your Email Address'
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={studentEmail}
              disabled
            />
            {errors.studentEmail && <p className="text-red-500 text-xs mt-1">{errors.studentEmail}</p>}
          </div>
          <div className='col-span-1'>
            <label className="block mb-2 text-sm font-medium text-gray-900">Gender</label>
            <select
              id="studentGender"
              className="bg-gray-50 border border-gray-300 text-gray-900 w-full text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              value={studentGender}
              onChange={(e) => setStudentGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.studentGender && <p className="text-red-500 text-xs mt-1">{errors.studentGender}</p>}
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <div className='col-span-1'>
            <label htmlFor="birthDate" className="block mb-2 text-sm font-medium text-gray-900">Birth Date</label>
            <input
              type="date"
              name="birthDate"
              id="birthDate"
              placeholder='YYYY-MM-DD'
              ref={dateOfBirthRef}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
            {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>}
          </div>
          <div className='col-span-1'>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Enter your phone number"
              value={studentPhoneNum}
              onChange={(e) => setStudentPhoneNum(e.target.value)}
              pattern="^01[0-46-9]-*[0-9]{7,8}$"
              title="Please enter a valid Malaysian phone number (e.g., 012-3456789 or 016-3456789)"
              required
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>

          <div className='col-span-1'>
            <label className="block mb-2 text-sm font-medium text-gray-900">Nationality/Citizenship</label>
            <select
              id="nationality"
              name="nationality"
              className="bg-gray-50 border border-gray-300 text-gray-900 w-full text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
            >
              <option value="">Select Nationality</option>
              <option value="Malaysian Citizen">Malaysian Citizen</option>
              <option value="Permanent Resident">Permanent Resident</option>
              <option value="International">International Student</option>
            </select>
            {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>}
          </div>
          <div className='col-span-1'>
            {nationality === 'Malaysian Citizen' || nationality === 'Permanent Resident' ? (
              <>
                <label htmlFor="ICNumber" className="block mb-2 text-sm font-medium text-gray-900">Identification Card Number</label>
                <input
                  type="text"
                  name="ICNumber"
                  id="ICNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={studentIC}
                  onChange={(e) => setStudentIC(e.target.value)}
                  placeholder="eg. 010228060088"
                  maxLength={12}
                  required
                />
                {errors.ICNumber && <p className="text-red-500 text-xs mt-1">{errors.ICNumber}</p>}
              </>
            ) : (nationality === 'International' ? (
              <>
                <label htmlFor="passportNo" className="block mb-2 text-sm font-medium text-gray-900">Passport Number</label>
                <input
                  type="text"
                  name="passportNo"
                  id="passportNo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={passportNo}
                  onChange={(e) => setPassportNo(e.target.value)}
                  placeholder="eg. A1234567"
                  required
                />
                {errors.passportNo && <p className="text-red-500 text-xs mt-1">{errors.passportNo}</p>}
              </>
            ) : null)}
          </div>

        </div>

        <div className='home-address mb-2'>
          <label className="block mb-2 text-sm font-medium text-gray-900">Home Address</label>
          <div className='mb-2'>
            <input
              type="text"
              id="homeAddressLine1"
              className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Address Line 1"
              value={homeAddress?.address1 ?? ''}
              onChange={(e) => setHomeAddress(prev => prev ? { ...prev, address1: e.target.value } : null)}
              required
            />
            {addressErrors.home?.address1 && <p className="text-red-500 text-xs mt-1">{addressErrors.home.address1}</p>}
            <input
              type="text"
              id="homeAddressLine2"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Address Line 2"
              value={homeAddress?.address2 ?? ''}
              onChange={(e) => setHomeAddress(prev => prev ? { ...prev, address2: e.target.value } : null)}
            />
            {addressErrors.home?.address2 && <p className="text-red-500 text-xs mt-1">{addressErrors.home.address2}</p>}
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4'>
            <div className='col-span-1'>
              <label htmlFor="homePostalCode" className="block mb-2 text-sm font-medium text-gray-900">Postal Code</label>
              <input
                type="text"
                id="homePostalCode"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter Postal Code"
                value={homeAddress?.postcode ?? ''}
                onChange={(e) => setHomeAddress(prev => prev ? { ...prev, postcode: e.target.value } : null)}
                required
              />
            </div>
            <div className='col-span-1'>
              <label htmlFor="homeCity" className="block mb-2 text-sm font-medium text-gray-900">City</label>
              <input
                type="text"
                id="homeCity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter City"
                value={homeAddress?.city ?? ''}
                onChange={(e) => setHomeAddress(prev => prev ? { ...prev, city: e.target.value } : null)}
                required
              />
              {addressErrors.home?.city && <p className="text-red-500 text-xs mt-1">{addressErrors.home.city}</p>}
            </div>
            <div className='col-span-1'>
              <label htmlFor="homeState" className="block mb-2 text-sm font-medium text-gray-900">State</label>
              <input
                type="text"
                id="homeState"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter State"
                value={homeAddress?.state ?? ''}
                onChange={(e) => setHomeAddress(prev => prev ? { ...prev, state: e.target.value } : null)}
                required
              />
              {addressErrors.home?.state && <p className="text-red-500 text-xs mt-1">{addressErrors.home.state}</p>}
            </div>
          </div>
        </div>

        <div className='flex items-center mb-4'>
          <input
            type="checkbox"
            id="copyToTraining"
            checked={copyToTraining}
            onChange={handleCopyToggle}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="copyToTraining" className="ml-2 text-sm font-medium text-gray-900">Same as Home Address to Training Address</label>
        </div>

        <div className='training-address mb-2'>
          <label className="block mb-2 text-sm font-medium text-gray-900">Training Address</label>
          <div className='mb-2'>
            <input
              type="text"
              id="trainingAddressLine1"
              className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Address Line 1"
              value={trainingAddress?.address1 ?? ''}
              onChange={(e) => setTrainingAddress(prev => prev ? { ...prev, address1: e.target.value } : null)}
              required
            />
            {addressErrors.training?.address1 && <p className="text-red-500 text-xs mt-1">{addressErrors.training.address1}</p>}
            <input
              type="text"
              id="trainingAddressLine2"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Address Line 2"
              value={trainingAddress?.address2 ?? ''}
              onChange={(e) => setTrainingAddress(prev => prev ? { ...prev, address2: e.target.value } : null)}
            />
            {addressErrors.training?.address2 && <p className="text-red-500 text-xs mt-1">{addressErrors.training.address2}</p>}
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4'>
            <div className='col-span-1'>
              <label htmlFor="trainingPostalCode" className="block mb-2 text-sm font-medium text-gray-900">Postal Code</label>
              <input
                type="text"
                id="trainingPostalCode"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter Postal Code"
                value={trainingAddress?.postcode ?? ''}
                onChange={(e) => setTrainingAddress(prev => prev ? { ...prev, postcode: e.target.value } : null)}
                required
              />
              {addressErrors.training?.postcode && <p className="text-red-500 text-xs mt-1">{addressErrors.training.postcode}</p>}
            </div>
            <div className='col-span-1'>
              <label htmlFor="trainingCity" className="block mb-2 text-sm font-medium text-gray-900">City</label>
              <input
                type="text"
                id="trainingCity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter City"
                value={trainingAddress?.city ?? ''}
                onChange={(e) => setTrainingAddress(prev => prev ? { ...prev, city: e.target.value } : null)}
                required
              />
              {addressErrors.training?.city && <p className="text-red-500 text-xs mt-1">{addressErrors.training.city}</p>}
            </div>
            <div className='col-span-1'>
              <label htmlFor="trainingState" className="block mb-2 text-sm font-medium text-gray-900">State</label>
              <input
                type="text"
                id="trainingState"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter State"
                value={trainingAddress?.state ?? ''}
                onChange={(e) => setTrainingAddress(prev => prev ? { ...prev, state: e.target.value } : null)}
                required
              />
              {addressErrors.training?.state && <p className="text-red-500 text-xs mt-1">{addressErrors.training.state}</p>}
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center gap-4'>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
            Edit
          </button>
          <button type="button" onClick={onClose} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBasicInfoModal;
