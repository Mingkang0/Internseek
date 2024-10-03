import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { router, useForm } from '@inertiajs/react';


export default function AddRefereeModal({ studentID, onClose }) {
  const { data, setData, post, processing, errors } = useForm({
    refereeName: '',
    refereeCompany: '',
    refereePosition: '',
    refereePhone: '',
    refereeEmail: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    router.post(`/referee/store/${studentID}`, data, {
    onSuccess: () => {
      onClose(); // Close the modal on success
    },
      onError: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'There was an error while adding the referee',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });
    onClose();
  }


  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="refereeName" className="block mb-2 text-sm font-medium text-gray-900">Referee Name</label>
        <input
          type="text"
          name="refereeName"
          id="refereeName"
          value={data.refereeName}
          onChange={(e) => setData('refereeName', e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter the referee name"
          required
        />
        {errors.refereeName && <p className="text-red-500 text-xs mt-1">{errors.refereeName}</p>}
      </div>
      <div>
        <label htmlFor="refereeCompany" className="block mb-2 text-sm font-medium text-gray-900">Company Name</label>
        <input
          type="text"
          name="refereeCompany"
          id="refereeCompany"
          value={data.refereeCompany}
          onChange={(e) => setData('refereeCompany', e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter company name"
          required
        />
        {errors.refereeCompany && <p className="text-red-500 text-xs mt-1">{errors.refereeCompany}</p>}
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className='col-span-1'>
          <label htmlFor="refereePosition" className="block mb-2 text-sm font-medium text-gray-900">Job Position</label>
          <input
            type="text"
            name="refereePosition"
            id="refereePosition"
            value={data.refereePosition}
            onChange={(e) => setData('refereePosition', e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter referee's job position"
            required
          />
          {errors.refereePosition && <p className="text-red-500 text-xs mt-1">{errors.refereePosition}</p>}
        </div>
        <div className='col-span-1'>
          <label htmlFor="refereePhone" className="block mb-2 text-sm font-medium text-gray-900">Referee's Phone Number</label>
          <input type="tel" name="refereePhone" id="refereePhone"
            value={data.refereePhone}
            onChange={(e) => setData('refereePhone', e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Enter your phone number"
            pattern="^01[0-46-9]-*[0-9]{7,8}$"
            title="Please enter a valid Malaysian phone number (e.g., 012-3456789 or 016-3456789)"
            required />
          {errors.refereePhone && <p className="text-red-500 text-xs mt-1">{errors.refereePhone}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="refereeEmail" className="block mb-2 text-sm font-medium text-gray-900">Referee's Email</label>
        <input type="email" name="refereeEmail" id="refereeEmail"
          value={data.refereeEmail}
          onChange={(e) => setData('refereeEmail', e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter referee's email address" required />
        {errors.refereeEmail && <p className="text-red-500 text-xs mt-1">{errors.refereeEmail}</p>}
      </div>
      <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">Submit</button>
    </form>
  );
}