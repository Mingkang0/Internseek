import { StudyField } from './studyField';
import { useState, useRef, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import { useForm } from '@inertiajs/react';


export default function AddEducationModal({ studentID }) {
  const [selectedField, setSelectedField] = useState('');
  const [otherField, setOtherField] = useState('');
  const startDateRef = useRef(null);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    if (startDateRef.current) {
      startDateRef.current.max = currentDate;
    }
  }
  , []);

  const handleFieldChange = (e) => {
    setSelectedField(e.target.value);
    setData('studyField', e.target.value);
    if (value === 'other') {
        setData('studyField', '');
    }
    
  };

  const { data, setData, post, processing, errors, setError } = useForm({
    programName: '',
    schoolName: '',
    educationLevel: '',
    startDate: '',
    endDate: '',
    CGPA: '',
    studyField: '',
  });

  const handleOtherFieldChange = (e) => {
    const value = e.target.value;
    setOtherField(value);
    setData('studyField', value); // Directly set the otherField value in form data
  };

  const handleSubmit = (event) => {

    event.preventDefault();


    if (data.startDate >= data.endDate) {
      setError({
        'startDate': 'Start date must not exceed the end date',
        'endDate': 'End date must be greater than the start date',
      })
      return;
    }

    Inertia.post(`/education/store/${studentID}`, data).
      onError((error) => {
        Swal.fire({
          title: 'Error',
          text: 'There was an error while adding the education',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="programName" className="block mb-2 text-sm font-medium text-gray-900">Course Name</label>
        <input
          type="text"
          name="programName"
          id="programName"
          value={data.programName}
          onChange={(e) => setData('programName', e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter the course name"
          required
        />
        {errors.programName && <p className="text-red-500 text-xs mt-1">{errors.programName}</p>}
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='col-span-1'>
          <label htmlFor="schoolName" className="block mb-2 text-sm font-medium text-gray-900">School Name</label>
          <input
            type="text"
            name="schoolName"
            id="schoolName"
            value={data.schoolName}
            onChange={(e) => setData('schoolName', e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter the school name"
            required
          />
          {errors.schoolName && <p className="text-red-500 text-xs mt-1">{errors.schoolName}</p>}
        </div>
        <div className='col-span-1' >
          <label className="block mb-2 text-sm font-medium text-gray-900">Education Level</label>
          <select id="educationLevel" 
            value={data.educationLevel}
            onChange={(e) => setData('educationLevel', e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 w-full text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
            <option selected>Select Education Level</option>
            <option value="Diploma">Diploma</option>
            <option value="STPM">STPM</option>
            <option value="A-Level">A-Level</option>
            <option value="Foundation">Foundation</option>
            <option value="Degree">Bachelor's Degree</option>
          </select>
          {errors.educationLevel && <p className="text-red-500 text-xs mt-1">{errors.educationLevel}</p>}
        </div>
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
            ref={startDateRef}
            onChange={(e) => setData('startDate', e.target.value)}
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
            value={data.endDate}
            onChange={(e) => setData('endDate', e.target.value)}
            placeholder='YYYY-MM-DD'
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required />
          {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='col-span-1'>
          <label htmlFor="CGPA" className="block mb-2 text-sm font-medium text-gray-900">CGPA</label>
          <input
            type="number"
            id="CGPA"
            name="CGPA" min="0"
            max="4" step="0.01"
            value={data.CGPA}
            onChange={(e) => setData('CGPA', e.target.value)}
            placeholder='Enter Your CGPA (0.00 - 4.00)'
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className='col-span-1'>
          <label className="block mb-2 text-sm font-medium text-gray-900">Study Field</label>
          <select id="studyField" name='studyField'
            value={selectedField}
            onChange={handleFieldChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 w-full text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
            <option value="" selected disabled>Select a field of study</option>
            {StudyField.map((field) => (
              <option key={field.value} value={field.value}>{field.name}</option>
            ))}
            <option value="other">Other</option>
          </select>

          {/* Conditionally render "Other" input field */}
          {selectedField === 'other' && (
              <input
                type="text"
                id="otherField"
                name="otherField"
                value={otherField}
                onChange={handleOtherFieldChange}
                placeholder="Enter your field of study"
                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
          )}
        </div>
      </div>
      <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">Submit</button>
    </form>
  );
}