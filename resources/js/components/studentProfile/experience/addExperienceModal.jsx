import React, { useEffect, useRef } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';


export default function AddExperienceModal({ studentID }) {

  const { data, setData, post, processing, errors, setError } = useForm({
    jobTitle: '',
    companyName: '',
    startDate: '',
    endDate: '',
    jobDescription: '',
  });

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    if (startDateRef.current) {
      startDateRef.current.max = currentDate;
    }
    if (endDateRef.current) {
      endDateRef.current.max = currentDate;
    }
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();

    if(data.startDate > data.endDate) {
      setError('startDate', 'Start date must not exceed the end date');
      setError('endDate', 'End date must be greater than the start date');
      return;
    }

    Inertia.post(`/experience/store/${studentID}`, data).
      onError((error) => {
        Swal.fire({
          title: 'Error',
          text: 'There was an error while adding the experience',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="jobTitle" className="block mb-2 text-sm font-medium text-gray-900">Job Position</label>
        <input
          type="text"
          name="jobTitle"
          id="jobTitle"
          value={data.jobTitle}
          onChange={(e) => setData('jobTitle', e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter the job name"
          required
        />
        {errors.jobTitle && <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>}
      </div>
      <div>
        <label htmlFor="schoolName" className="block mb-2 text-sm font-medium text-gray-900">Company Name</label>
        <input
          type="text"
          name="companyName"
          id="companyName"
          value={data.companyName}
          onChange={(e) => setData('companyName', e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter company name"
          required
        />
        {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='col-span-1'>
          <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900">Start Date</label>
          <input
            type="date"
            name="starDate"
            id="startDate"
            placeholder='YYYY-MM-DD'
            value={data.startDate}
            onChange={(e) => setData('startDate', e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            ref={startDateRef}
          />
          {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
        </div>
        <div className='col-span-1'>
          <label htmlFor='endDate' className="block mb-2 text-sm font-medium text-gray-900">End Date</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={data.endDate}
            onChange={(e) => setData('endDate', e.target.value)}
            placeholder='YYYY-MM-DD'
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required 
            ref={endDateRef}
            />
          {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="jobDescription" className="block mb-2 text-sm font-medium text-gray-900">Job Description</label>
        <textarea id="jobDescription" name='jobDescription' rows={4}
          value={data.jobDescription}
          onChange={(e) => setData('jobDescription', e.target.value)}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your job description here..."></textarea>
        {errors.jobDescription && <p className="text-red-500 text-xs mt-1">{errors.jobDescription}</p>}
      </div>
      <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">Submit</button>
    </form>
  );
}