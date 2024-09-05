
import React, { useState } from 'react';
import { countries } from '../country';
import { MalaysianStates } from '../state';
import { useForm, router } from '@inertiajs/react';

export default function AddBranchModal({ employerID, closeModal }) {

  const { data, setData, post, errors, setError } = useForm({
    branchName: '',
    branchCountry: '',
    branchAddress1: '',
    branchAddress2: '',
    branchPostcode: '',
    branchCity: '',
    branchState: '',
    branchPhoneNum: '',
    branchEmail: '',
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    router.post(`/employer/branch/store/${employerID}`, data);
    closeModal();
  }
  return (

    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="branchName" className="block text-sm font-medium text-gray-700">Branch Name</label>
        <input
          id="branchName"
          type="text"
          value={data.branchName}
          onChange={(e) => setData('branchName', e.target.value)}
          placeholder='Enter branch name'
          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />

      </div>
      <div>
        <label htmlFor="branchCountry" className="block text-sm font-medium text-gray-700">Branch Country</label>
        <select id="branchCountry" value={data.branchCountry} onChange={(e) => setData('branchCountry', e.target.value)} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required>
          <option value="" selected disabled>Select a country</option>
          {countries.map((country) => (
            <option key={country.value} value={country.value}>{country.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="branchAddress" className="block text-sm font-medium text-gray-700">Branch Address</label>
        <input
          id="branchAddress1"
          type="text"
          value={data.branchAddress1}
          onChange={(e) => setData('branchAddress1', e.target.value)}
          placeholder='Enter address line 1'
          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        <input
          id="branchAddress2"
          type="text"
          value={data.branchAddress2}
          onChange={(e) => setData('branchAddress2', e.target.value)}
          placeholder='Enter address line 2'
          className="mt-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-1'>
          <label htmlFor="branchPostcode" className="block text-sm font-medium text-gray-700">Postal Code</label>
          <input
            id="branchPostcode"
            type="text"
            value={data.branchPostcode}
            onChange={(e) => setData('branchPostcode', e.target.value)}
            placeholder='Enter postal code'
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        </div>
        <div className='col-span-1'>
          <label htmlFor="branchCity" className="block text-sm font-medium text-gray-700">City</label>
          <input
            id="branchCity"
            type="text"
            value={data.branchCity}
            onChange={(e) => setData('branchCity', e.target.value)}
            placeholder='Enter city'
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        </div>
        <div className='col-span-1'>
          <label htmlFor="branchState" className="block text-sm font-medium text-gray-700">State</label>
          {data.branchCountry === 'Malaysia' ? (
            <select id="branchState" value={data.branchState} onChange={(e) => setData('branchState', e.target.value)} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required>
              <option value="" selected disabled>Select a state</option>
              {MalaysianStates.map((state) => (
                <option key={state.value} value={state.name}>{state.name}</option>
              ))}
            </select>
          ) : (
            <input
              id="branchState"
              type="text"
              value={data.branchState}
              onChange={(e) => setData('branchState', e.target.value)}
              placeholder='Enter state'
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
          )}
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='col-span-1'>
          <label htmlFor="branchPhoneNum" className="block text-sm font-medium text-gray-700">Branch Phone</label>
          <input
            id="branchPhoneNum"
            type="text"
            value={data.branchPhoneNum}
            onChange={(e) => setData('branchPhoneNum', e.target.value)}
            placeholder='Enter phone number'
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        </div>
        <div className='col-span-1'>
          <label htmlFor="branchEmail" className="block text-sm font-medium text-gray-700">Branch Email</label>
          <input
            id="branchEmail"
            type="email"
            value={data.branchEmail}
            onChange={(e) => setData('branchEmail', e.target.value)}
            placeholder='Enter email address'
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        </div>
      </div>
      <div className="text-center">
        <button type="submit" className="inline-flex w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Submit
        </button>
      </div>
    </form>

  );

}