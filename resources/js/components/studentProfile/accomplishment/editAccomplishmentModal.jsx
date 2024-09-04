import React, { useState, useEffect, useRef } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

export default function EditAccomplishmentModal({ accomplishment, studentID, onClose }) {
  const [name, setName] = useState(accomplishment.accomplishmentName);
  const [year, setYear] = useState(accomplishment.accomplishmentYear);
  const [description, setDescription] = useState(accomplishment.accomplishmentDescription);
  const yearInputRef = useRef(null);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    if (yearInputRef.current) {
      yearInputRef.current.setAttribute('max', currentYear.toString());
    }
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();

    const updatedAccomplishment = {
      accomplishmentName: name,
      accomplishmentYear: year,
      accomplishmentDescription: description,
    };

    Inertia.post(`/accomplishment/update/${studentID}/${accomplishment.id}`, updatedAccomplishment, {
      onSuccess: () => {
        onClose(); // Close the modal on success
      },
      onError: (errors) => {
        console.error(errors); // Handle errors if necessary
        Swal.fire({
          title: 'Error',
          text: 'There was an error while updating the accomplishment',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }});
  };

  const handleDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Delete Accomplishment',
      text: 'Are you sure you want to delete this accomplishment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        Inertia.post(`/accomplishment/delete/${studentID}/${accomplishment.id}`);
      }
    });
  }
  return (
    <form className="space-y-4" onSubmit={handleEdit}>
      <div>
        <label htmlFor="accomplishment" className="block mb-2 text-sm font-medium text-gray-900">Accomplishment</label>
        <input
          type="text"
          name="accomplishment"
          id="accomplishment"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter your accomplishment"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="accomplishmentDescription" className="block mb-2 text-sm font-medium text-gray-900">Accomplishment Description</label>
        <textarea 
          name="accomplishmentDescription" 
          id="accomplishmentDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter your accomplishment description"
          required />
      </div>
      <div>
        <label htmlFor="accomplishmentYear" className="block mb-2 text-sm font-medium text-gray-900">Accomplishment Year</label>
        <input
          type="number"
          placeholder="YYYY"
          min="1988"
          ref={yearInputRef}
          name="accomplishmentYear"
          id="accomplishmentYear"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </div>
      <div className='flex items-center justify-center gap-4'>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">Edit</button>
        <button type="button" onClick={handleDelete} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5">Delete</button>
      </div>
    </form>
  );
}