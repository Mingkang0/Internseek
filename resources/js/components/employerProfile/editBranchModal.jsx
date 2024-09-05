import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { countries } from '../country';
import { MalaysianStates } from '../state';
import Swal from 'sweetalert2';
import { useForm, router } from '@inertiajs/react';

export default function EditBranchModal({ branch, employerID, closeModal }) {


  const { data, setData, post, errors, setError } = useForm({
    branchName: branch.branchName || '',
    branchCountry: branch.branchCountry || '',
    branchAddress1: branch.branchAddress1 || '',
    branchAddress2: branch.branchAddress2 || '',
    branchPostcode: branch.branchPostcode || '',
    branchCity: branch.branchCity || '',
    branchState: branch.branchState || '',
    branchPhoneNum: branch.branchPhoneNum || '',
    branchEmail: branch.branchEmail || '',
  });


  const handleEdit = (e) => {
    e.preventDefault();
    router.post(`/employer/branch/update/${branch.id}`, {
      branchName: data.branchName,
      branchCountry: data.branchCountry,
      branchAddress1: data.branchAddress1,
      branchAddress2: data.branchAddress2,
      branchPostcode: data.branchPostcode,
      branchCity: data.branchCity,
      branchState: data.branchState,
      branchPhoneNum: data.branchPhoneNum,
      branchEmail: data.branchEmail
    });
    closeModal();
  }

  const handleDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Delete Branch',
      text: 'Are you sure you want to delete this branch?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        router.post(`/employer/branch/delete/${branch.id}`);
        closeModal();
      }
    });

  }

  return (
    <form className="space-y-4" onSubmit={handleEdit}>

      <div>
        <label htmlFor="branchName" className="block text-sm font-medium text-gray-700">Branch Name</label>
        <input
          id="branchName"
          type="text"
          value={data.branchName}
          onChange={(e) => setData('branchName', e.target.value)}
          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />

      </div>

      <div>
        <label htmlFor="branchCountry" className="block text-sm font-medium text-gray-700">Branch Country</label>
        <select id="branchCountry"
          value={data.branchCountry}
          onChange={(e) => setData('branchCountry', e.target.value)}
          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required>
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
          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        <input
          id="branchAddress2"
          type="text"
          value={data.branchAddress2}
          onChange={(e) => setData('branchAddress2', e.target.value)}
          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
      </div>


      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-1'>
          <label htmlFor="branchPostcode" className="block text-sm font-medium text-gray-700">Postal Code</label>
          <input
            id="branchPostcode"
            type="text"
            value={data.branchPostcode}
            onChange={(e) => setData('branchPostcode', e.target.value)}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        </div>
        <div className='col-span-1'>
          <label htmlFor="branchCity" className="block text-sm font-medium text-gray-700">City</label>
          <input
            id="branchCity"
            type="text"
            value={data.branchCity}
            onChange={(e) => setData('branchCity', e.target.value)}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        </div>
        <div className='col-span-1'>
          <label htmlFor="branchState" className="block text-sm font-medium text-gray-700">State</label>
          {data.branchCountry === 'Malaysia' ? (
            <select id="branchState"
              value={data.branchState}
              onChange={(e) => setData('branchState', e.target.value)}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required>
              {MalaysianStates.map((state) => (
                <option key={state.value} value={state.name}>{state.name}</option>
              ))}
            </select>
          ) :
            <input
              id="branchState"
              type="text"
              value={data.branchState}
              onChange={(e) => setData('branchState', e.target.value)}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
          }
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='col-span-1'>
          <label htmlFor="branchPhoneNum" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            id="branchPhoneNum"
            type="text"
            value={data.branchPhoneNum}
            onChange={(e) => setData('branchPhoneNum', e.target.value)}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        </div>
        <div className='col-span-1'>
          <label htmlFor="branchEmail" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            id="branchFax"
            type="email"
            value={data.branchEmail}
            onChange={(e) => setData('branchEmail', e.target.value)}
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
