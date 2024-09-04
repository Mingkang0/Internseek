import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { countries } from '../country';
import { MalaysianStates } from '../state';
import Swal from 'sweetalert2';
import { useForm } from '@inertiajs/react';

export default function EditSiteModal({ site, employerID, onClose }) {
  const { data, setData, post, errors, setError } = useForm({
    siteName: site.siteName || '',
    siteCountry: site.siteCountry || '',
    siteAddress1: site.siteAddress1 || '',
    siteAddress2: site.siteAddress2 || '',
    sitePostcode: site.sitePostcode || '',
    siteCity: site.siteCity || '',
    siteState: site.siteState || '',
    sitePhone: site.sitePhone || '',
    siteEmail: site.siteEmail || '',
  });
  const handleEdit = (e) => {
    e.preventDefault();
    Inertia.post(`/employer/site/update/${site.id}`, {
      siteName: data.siteName,
      siteCountry: data.siteCountry,
      siteAddress1: data.siteAddress1,
      siteAddress2: data.siteAddress2,
      sitePostcode: data.sitePostcode,
      siteCity: data.siteCity,
      siteState: data.siteState,
      sitePhone: data.sitePhone,
      siteEmail: data.siteEmail
    }).then(() => {
      onClose(); // Close the modal after the request is successful
    });

  }
  const handleDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Delete Site',
      text: 'Are you sure you want to delete this site?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        Inertia.post(`/employer/site/delete/${site.id}`);
      }
    });
  }
  return (
    <form className="space-y-4" onSubmit={handleEdit}>
      <div>
        <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">Site Name</label>
        <input
          id="siteName"
          type="text"
          value={data.siteName}
          onChange={(e) => setData('siteName', e.target.value)}
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
          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        <input
          id="siteAddress2"
          type="text"
          value={data.siteAddress2}
          onChange={(e) => setData('siteAddress2', e.target.value)}
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
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        </div>
        <div className="col-span-1">
          <label htmlFor="siteCity" className="block text-sm font-medium text-gray-700">City</label>
          <input
            id="siteCity"
            type="text"
            value={data.siteCity}
            onChange={(e) => setData('siteCity', e.target.value)}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        </div>
        <div className="col-span-1">
          <label htmlFor="siteState" className="block text-sm font-medium text-gray-700">State</label>
          <select id="siteState" value={data.siteState} onChange={(e) => setData('siteState', e.target.value)} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required>
            <option value="" selected disabled>Select a state</option>
            {MalaysianStates.map((state) => (
              <option key={state.value} value={state.value}>{state.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='col-span-1'>
          <label htmlFor="sitePhone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            id="sitePhone"
            type="text"
            value={data.sitePhone}
            onChange={(e) => setData('sitePhone', e.target.value)}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        </div>
        <div className='col-span-1'>
          <label htmlFor="siteEmail" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="siteEmail"
            type="email"
            value={data.siteEmail}
            onChange={(e) => setData('siteEmail', e.target.value)}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        </div>
      </div>
      <div className='flex items-center justify-center gap-4'>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
          Edit
        </button>
        <button type="button" onClick={handleDelete} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5">
          Delete
        </button>
      </div>
    </form>
  );
}