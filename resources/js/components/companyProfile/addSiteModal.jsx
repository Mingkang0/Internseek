
import React, { useState } from 'react';
import { countries } from '../country';
import { MalaysianStates } from '../state';
import { useForm, router } from '@inertiajs/react';

export default function AddSiteModal({ branch , closeModal }) {

  console.log(branch);

  const { data, setData, post, errors, setError } = useForm({
    siteName: '',
    siteCountry: '',
    siteAddress1: '',
    siteAddress2: '',
    sitePostcode: '',
    siteCity: '',
    siteState: '',
    sitePhone: '',
    siteEmail: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    router.post(`/employer/site/store/${branch.id}`, data);
    closeModal();
  }
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">Site Name</label>
        <input
          id="siteName"
          type="text"
          value={data.siteName}
          onChange={(e) => setData('siteName', e.target.value)}
          placeholder='Enter site name'
          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
      </div>
      <div>
        <label htmlFor="siteCountry" className="block text-sm font-medium text-gray-700">Site Country</label>
        <select id="siteCountry" value={data.siteCountry} onChange={(e) => setData('siteCountry', e.target.value)} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required>
          <option value="" selected disabled>Select a country</option>
          {countries.map((country) => (
            <option key={country.value} value={country.value}>{country.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="siteAddress" className="block text-sm font-medium text-gray-700">Site Address</label>
        <input
          id="siteAddress1"
          type="text"
          value={data.siteAddress1}
          onChange={(e) => setData('siteAddress1', e.target.value)}
          placeholder='Enter address line 1'
          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        <input
          id="siteAddress2"
          type="text"
          value={data.siteAddress2}
          onChange={(e) => setData('siteAddress2', e.target.value)}
          placeholder='Enter address line 2'
          className="mt-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <label htmlFor="sitePostcode" className="block text-sm font-medium text-gray-700">Postal Code</label>
          <input
            id="sitePostcode"
            type="text"
            value={data.sitePostcode}
            onChange={(e) => setData('sitePostcode', e.target.value)}
            placeholder='Enter postal code'
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        </div>
        <div className="col-span-1">
          <label htmlFor="siteCity" className="block text-sm font-medium text-gray-700">City</label>
          <input
            id="siteCity"
            type="text"
            value={data.siteCity}
            onChange={(e) => setData('siteCity', e.target.value)}
            placeholder='Enter city'
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        </div>
        <div className="col-span-1">
          <label htmlFor="siteState" className="block text-sm font-medium text-gray-700">State</label>
          {data.siteCountry === 'Malaysia' ? (
            <select
              id="siteState"
              value={data.siteState}
              onChange={(e) => setData('siteState', e.target.value)}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required>
              <option value="" selected disabled>Select a state</option>
              {MalaysianStates.map((state) => (
                <option key={state.value} value={state.name}>{state.name}</option>
              ))}
            </select>
          ) : (
            <input
              id="siteState"
              type="text"
              value={data.siteState}
              onChange={(e) => setData('siteState', e.target.value)}
              placeholder='Enter state'
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className='col-span-1'>
          <label htmlFor="sitePhone" className="block text-sm font-medium text-gray-700">Site Phone</label>
          <input
            id="sitePhone"
            type="text"
            value={data.sitePhone}
            onChange={(e) => setData('sitePhone', e.target.value)}
            placeholder='Enter phone number'
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        </div>
        <div className='col-span-1'>
          <label htmlFor="siteEmail" className="block text-sm font-medium text-gray-700">Site Email</label>
          <input
            id="siteEmail"
            type="text"
            value={data.siteEmail}
            onChange={(e) => setData('siteEmail', e.target.value)}
            placeholder='Enter email address'
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        </div>
      </div>
      <button type="submit" className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Submit
      </button>
    </form>
  );

}