import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';


export default function EditRefereeModal({ referee, studentID, onClose }) {
  const [refereeName, setRefereeName] = useState(referee.refereeName);
  const [refereeCompany, setRefereeCompany] = useState(referee.refereeCompany);
  const [refereePosition, setRefereePosition] = useState(referee.refereePosition);
  const [refereePhone, setRefereePhone] = useState(referee.refereePhone);
  const [refereeEmail, setRefereeEmail] = useState(referee.refereeEmail);

  const handleEdit = (event) => {
    event.preventDefault();

    const updatedReferee = {
      refereeName,
      refereeCompany,
      refereePosition,
      refereePhone,
      refereeEmail,
    };

    router.post(`/referee/update/${studentID}/${referee.id}`, updatedReferee, {
      onSuccess: () => {
        onClose(); // Close the modal on success
      },
      onError: (errors) => {
        console.error(errors); // Handle errors if necessary
        Swal.fire({
          title: 'Error',
          text: 'There was an error while updating the referee',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
    onClose();
  };

  const handleDelete = (event) => {
    event.preventDefault();

    Swal.fire({
      title: 'Delete Referee',
      text: 'Are you sure you want to delete this referee?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        router.post(`/referee/delete/${studentID}/${referee.id}`);
      }
    });
    onClose();
  };

  return (
    <form className="space-y-4" onSubmit={handleEdit}>
      <div>
        <label htmlFor="refereeName" className="block mb-2 text-sm font-medium text-gray-900">Referee Name</label>
        <input
          type="text"
          name="refereeName"
          id="refereeName"
          value={refereeName}
          onChange={(e) => setRefereeName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter the referee name"
          required
        />
      </div>
      <div>
        <label htmlFor="refereeCompany" className="block mb-2 text-sm font-medium text-gray-900">Company Name</label>
        <input
          type="text"
          name="refereeCompany"
          id="refereeCompany"
          value={refereeCompany}
          onChange={(e) => setRefereeCompany(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter company name"
          required
        />
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='col-span-1'>
          <label htmlFor="refereePosition" className="block mb-2 text-sm font-medium text-gray-900">Job Position</label>
          <input
            type="text"
            name="refereePosition"
            id="refereePosition"
            value={refereePosition}
            onChange={(e) => setRefereePosition(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter referee's job position"
            required
          />
        </div>
        <div className='col-span-1'>
        <label htmlFor="refereePhone" className="block mb-2 text-sm font-medium text-gray-900">Referee's Phone Number</label>
            <input type="tel" name="refereePhone" id="refereePhone" 
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
            placeholder="Enter your phone number"
            value={refereePhone}
            onChange={(e) => setRefereePhone(e.target.value)} 
            pattern="^01[0-46-9]-*[0-9]{7,8}$"
            title="Please enter a valid Malaysian phone number (e.g., 012-3456789 or 016-3456789)"
            required />
        </div>
      </div>
      <div>
        <label htmlFor="refereeEmail" className="block mb-2 text-sm font-medium text-gray-900">Referee's Email</label>
        <input type="email" name="refereeEmail" 
        id="refereeEmail" 
        value={refereeEmail}
        onChange={(e) => setRefereeEmail(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter referee's email address" required />
      </div>
      <div className='text-center'>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">Edit</button>
      <button type="button" onClick={handleDelete} className="ml-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5">Delete</button>
      </div>
    </form>
  );
}