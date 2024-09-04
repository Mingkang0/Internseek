import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';

export default function EditExperienceModal({ experience, onClose, studentID }) {
  const [jobTitle, setJobTitle] = useState(experience.jobTitle);
  const [companyName, setCompanyName] = useState(experience.companyName);
  const [startDate, setStartDate] = useState(experience.startDate);
  const [endDate, setEndDate] = useState(experience.endDate);
  const [jobDescription, setJobDescription] = useState(experience.jobDescription);
  const [errors, setErrors] = useState({});


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


  const handleEdit = (e) => {
    e.preventDefault();

    const updatedExperience = {
      jobTitle,
      companyName,
      startDate,
      endDate,
      jobDescription,
    };

    if (startDate >= endDate) {
      setErrors({
        startDate: 'Start date must not exceed the end date',
        endDate: 'End date must be greater than the start date',
      });
      return;
    }

    Inertia.post(`/experience/update/${studentID}/${experience.id}`, updatedExperience, {
      onSuccess: () => {
        onClose(); // Close the modal on success
      },
      onError: (errors) => {
        console.error(errors); // Handle errors if necessary
        Swal.fire({
          title: 'Error',
          text: 'There was an error while updating the experience',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });

  }

  const handleDelete = (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Delete Experience',
      text: 'Are you sure you want to delete this experience?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        Inertia.post(`/experience/delete/${studentID}/${experience.id}`);
      }
    });
  };
  return (
    <form className="space-y-4" >
      <div>
        <label htmlFor="jobName" className="block mb-2 text-sm font-medium text-gray-900">Job Position</label>
        <input
          type="text"
          name="jobName"
          id="jobName"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter the job name"
          required
        />
      </div>
      <div>
        <label htmlFor="schoolName" className="block mb-2 text-sm font-medium text-gray-900">Company Name</label>
        <input
          type="text"
          name="companyName"
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter company name"
          required
        />
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='col-span-1'>
          <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900">Start Date</label>
          <input
            type="date"
            name="starDate"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            ref={startDateRef}
            placeholder='YYYY-MM-DD'
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
          {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
        </div>
        <div className='col-span-1'>
          <label htmlFor='endDate' className="block mb-2 text-sm font-medium text-gray-900">End Date</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            ref={endDateRef}
            placeholder='YYYY-MM-DD'
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required />
          {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="jobDescription" className="block mb-2 text-sm font-medium text-gray-900">Job Description</label>
        <textarea id="jobDescription" name='jobDescription'
          rows={4}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
      </div>
      <div className='text-center'>
        <button type="submit" onClick={handleEdit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">Edit</button>
        <button type="button" onClick={handleDelete} className='ml-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5'>Delete</button>
      </div>
    </form>
  );
}