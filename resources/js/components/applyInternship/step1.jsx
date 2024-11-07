'use client';
import { FaEdit } from 'react-icons/fa';
import { router } from '@inertiajs/react';

export default function ApplyStep1({ student, formData, setFormData }) {

  // Handler for editing basic information
  const handleEditBasicInfo = () => {
    router.get('/student/profile');
  };

  console.log(formData);

  // Handle input change to update formData
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addresses = student.addresses;


  return (
    <div className='mx-auto lg:w-3/5'>
      <div className="mt-2 text-left">
        <label className="block text-sm font-medium text-gray-700">Expected Allowance</label>
        <input
          type="number"
          name="expectedAllowance"
          id="allowance"
          placeholder="Expected Allowance"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={formData.expectedAllowance || ''}
          onChange={handleInputChange}
        />
      </div>
      <div className="mt-2 text-left">
        <label className="block text-sm font-medium text-gray-700">Availability</label>
        <select
          id="availability"
          name="availability"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={formData.availability || ''}
          onChange={handleInputChange}
        >
          <option value="" disabled>Select your availability</option>
          <option value="1">1 Month Later</option>
          <option value="2">2 Months Later</option>
          <option value="3">3 Months Later</option>
          <option value="4">4 Months Later</option>
          <option value="5">5 Months Later</option>
          <option value="6">6 Months Later</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left mt-2">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="expectedStartDate"
            id="expectedStartDate"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={formData.expectedStartDate || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="expectedEndDate"
            id="expectedEndDate"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={formData.expectedEndDate || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mt-4 text-left">
        <label className="block text-sm font-medium text-gray-700">Basic Information</label>
        <div className="w-full h-fit-content p-4 my-2 bg-white border border-gray-900 rounded-lg ">
          <h5 className="text-lg ml-1 font-bold tracking-tight text-gray-900 flex justify-between">
            Basic Information
            <FaEdit size={18} className="text-gray-600 cursor-pointer" onClick={handleEditBasicInfo} />
          </h5>
          <hr className='border-1 border-gray-900 mt-1'></hr>
          <div className='grid grid-cols-1 sm:grid-cols-2 text-left mt-2'>
            <div className='col-span-1'>
              <div className='flex mb-2 gap-2'>
                <label className='text-gray-900 font-semibold text-sm'>Name: </label>
                <p className='text-gray-600 font-medium text-sm'>{student.firstName} {student.lastName}</p>
              </div>
              <div className='flex mb-2 gap-2'>
                <label className='text-gray-900 font-semibold text-sm'>Email: </label>
                <p className='text-gray-600 font-medium text-sm'>{student.email}</p>
              </div>
              <div className='flex mb-2 gap-2'>
                <label className='text-gray-900 font-semibold text-sm'>Phone Number: </label>
                <p className='text-gray-600 font-medium text-sm'>{student.phoneNum}</p>
              </div>
              <div className='flex mb-2 gap-2'>
                <label className='text-gray-900 font-semibold text-sm'>Gender: </label>
                <p className='text-gray-600 font-medium text-sm'>{student.gender}</p>
              </div>
              <div className='flex mb-2 gap-2'>
                <label className='text-gray-900 font-semibold text-sm'>IC Number: </label>
                <p className='text-gray-600 font-medium text-sm'>{student.ICNumber}</p>
              </div>
              <div className='flex mb-2 gap-2'>
                <label className='text-gray-900 font-semibold text-sm'>Birth Date: </label>
                <p className='text-gray-600 font-medium text-sm'>{student.dateOfBirth}</p>
              </div>
              <div className='flex mb-2 gap-2'>
                <label className='text-gray-900 font-semibold text-sm'>Nationality/Citizenship: </label>
                <p className='text-gray-600 font-medium text-sm'>{student.nationality}</p>
              </div>
            </div>
            <div className='col-span-1'>
              <div>
                {addresses.map((address) => (
                  <div key={address.id} className='mt-2'>
                    <p className='text-gray-900 font-bold text-sm'>
                      {address.type === 'home' ? 'Home Address' : 'Training Address'}
                    </p>
                    <p className='text-gray-600 font-medium text-sm'>{address.address1}</p>
                    <p className='text-gray-600 font-medium text-sm'>{address.address2}</p>
                    <p className='text-gray-600 font-medium text-sm'>{address.postcode}, {address.city}, {address.state}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
