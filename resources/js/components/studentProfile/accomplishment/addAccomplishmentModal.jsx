import React, { useEffect, useRef } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import { useForm } from '@inertiajs/react';


export default function AddAccomplishmentModal({ studentID }) {
  const yearInputRef = useRef(null);

  const { data, setData, post, processing, errors, setError } = useForm({
    accomplishmentName: '',
    accomplishmentDescription: '',
    accomplishmentYear: '',
  });

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    if (yearInputRef.current) {
      yearInputRef.current.setAttribute('max', currentYear.toString());
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    Inertia.post(`/accomplishment/store/${studentID}`, data).
      onError((error) => {
        Swal.fire({
          title: 'Error',
          text: 'There was an error while adding the accomplishment',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      });
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="accomplishment" className="block mb-2 text-sm font-medium text-gray-900">Accomplishment</label>
        <input
          type="text"
          name="accomplishmentName"
          id="accomplishmentName"
          value={data.accomplishmentName}
          onChange={(e) => setData('accomplishmentName', e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter your accomplishment"
          required
        />
      </div>
      <div>
        <label htmlFor="accomplishmentDescription" className="block mb-2 text-sm font-medium text-gray-900">Accomplishment Description</label>
        <textarea
          name="accomplishmentDescription"
          id="accomplishmentDescription"
          value={data.accomplishmentDescription}
          onChange={(e) => setData('accomplishmentDescription', e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter your accomplishment description"
          required />
      </div>
      <div>
        <label htmlFor="accomplishmentYear" className="block mb-2 text-sm font-medium text-gray-900">Accomplishment Year</label>
        <input
          type="number"
          placeholder="YYYY"
          ref={yearInputRef}
          name="accomplishmentYear"
          id="accomplishmentYear"
          value={data.accomplishmentYear}
          onChange={(e) => setData('accomplishmentYear', e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">Submit</button>
    </form>
  );
}