import React, { useState, useEffect, useRef } from 'react';
import { StudyField } from './studyField';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';

export default function EditEducationModal({ education, studentID, onClose }) {
  const [courseName, setCourseName] = useState(education.programName);
  const [schoolName, setSchoolName] = useState(education.schoolName);
  const [studyField, setStudyField] = useState(education.studyField);
  const [startDate, setStartDate] = useState(education.startDate);
  const [endDate, setEndDate] = useState(education.endDate);
  const [CGPA, setCGPA] = useState(education.CGPA);
  const [educationLevel, setEducationLevel] = useState(education.educationLevel);
  const [isOtherField, setIsOtherField] = useState(null); // Track if "Other" is selected
  const [errors, setErrors] = useState({});

  const startDateRef = useRef(null);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    if (startDateRef.current) {
      startDateRef.current.max = currentDate;
    }
  }, []);

  useEffect(() => {
    const isFieldOther = !StudyField.some(field => field.value === education.studyField);
    setIsOtherField(isFieldOther || education.studyField === 'other');
  }, [education.studyField]);


  const handleEdit = (e) => {
    e.preventDefault();

    const updatedEducation = {
      programName: courseName,
      schoolName,
      studyField,
      startDate,
      endDate,
      CGPA,
      educationLevel,
    };

    if (startDate >= endDate) {
      setErrors({
        startDate: 'Start date must not exceed the end date',
        endDate: 'End date must be greater than the start date',
      });
      return;
    }

    router.post(`/education/update/${studentID}/${education.id}`, updatedEducation, {
      onSuccess: () => {
        onClose(); // Close the modal on success
      },
      onError: (errors) => {
        console.error(errors); // Handle errors if necessary
      },
    });
    onClose();

  }

  const handleDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Delete Education',
      text: 'Are you sure you want to delete this education?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        router.post(`/education/delete/${studentID}/${education.id}`);
      }
    });
    onClose();

  }

  return (
    <form className="space-y-4" onSubmit={handleEdit}>
      <div>
        <label htmlFor="courseName" className="block mb-2 text-sm font-medium text-gray-900">Course Name</label>
        <input
          type="text"
          name="courseName"
          id="courseName"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter the course name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='col-span-1'>
          <label htmlFor="schoolName" className="block mb-2 text-sm font-medium text-gray-900">School Name</label>
          <input
            type="text"
            name="schoolName"
            id="schoolName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter the school name"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            required
          />
        </div>
        <div className='col-span-1'>
          <label className="block mb-2 text-sm font-medium text-gray-900">Education Level</label>
          <select
            id="educationLevel"
            className="bg-gray-50 border border-gray-300 text-gray-900 w-full text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
          >
            <option disabled>Select Education Level</option>
            <option value="Diploma">Diploma</option>
            <option value="STPM">STPM</option>
            <option value="A-Level">A-Level</option>
            <option value="Foundation">Foundation</option>
            <option value="Degree">Bachelor's Degree</option>
          </select>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='col-span-1'>
          <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900">Start Date</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            placeholder='YYYY-MM-DD'
            ref={startDateRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
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
            placeholder='YYYY-MM-DD'
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='col-span-1'>
          <label htmlFor="CGPA" className="block mb-2 text-sm font-medium text-gray-900">CGPA</label>
          <input
            type="number"
            id="CGPA"
            name="CGPA"
            min="0"
            max="4"
            step="0.01"
            placeholder='Enter Your CGPA (0.00 - 4.00)'
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={CGPA}
            onChange={(e) => setCGPA(parseFloat(e.target.value))}
            required
          />
        </div>
        <div className='col-span-1'>
          <label className="block mb-2 text-sm font-medium text-gray-900">Study Field</label>
          <select
            id="studyField"
            className="bg-gray-50 border border-gray-300 text-gray-900 w-full text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            value={isOtherField ? 'other' : studyField}
            onChange={(e) => {
              const value = e.target.value;
              setStudyField(value);
              setIsOtherField(value === 'other');
            }}
          >
            <option value="" disabled>Select a field of study</option>
            {StudyField.map((field) => (
              <option key={field.value} value={field.value}>{field.name}</option>
            ))}
            <option value="other">Other</option>
          </select>
          {isOtherField && (
            <input
              type="text"
              id="otherField"
              name="otherField"
              value={studyField}
              onChange={(e) => setStudyField(e.target.value)}
              placeholder="Enter your field of study"
              className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          )}
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
