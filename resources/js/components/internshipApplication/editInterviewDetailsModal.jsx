import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function EditInterviewDetailsModal({ interview, onClose }) {
  const [formData, setFormData] = useState({
    interviewDate: interview.interviewDate || '',
    interviewMethod: interview.interviewMethod || 'Face-to-face',
    interviewStartTime: interview.interviewStartTime || '',
    interviewEndTime: interview.interviewEndTime || '',
    interviewLink: interview.interviewLink || '',
    interviewLocation: interview.interviewLocation || ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.interviewStartTime >= formData.interviewEndTime) {
      setErrors({ interviewStartTime: 'Start time must be less than end time' });
      return;
    }

    router.post(`/interviews-applicants/${interview.id}/update-interview-details`, formData, {
      onSuccess: () => {
        // Optional success callback
        console.log("Interview details updated successfully!");
        onClose();
      },
      onError: (errors) => {
        // Handle errors
        console.log(errors);
        setErrors(errors);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(errors).length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error:</strong>
          <ul className="list-disc pl-5 mt-2">
            {Object.entries(errors).map(([key, message]) => (
              <li key={key}>{message}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <label htmlFor="interviewDate" className="block mb-2 text-sm font-medium text-gray-900">Interview Date</label>
          <input
            type="date"
            name="interviewDate"
            id="interviewDate"
            value={formData.interviewDate}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="col-span-1 mt-2">
          <label htmlFor="interviewType" className="block mb-2 text-sm font-medium text-gray-900">Interview Method</label>
          <select
            name="interviewMethod"
            id="interviewMethod"
            value={formData.interviewMethod}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value="Face-to-face">Face-to-face</option>
            <option value="Online">Online</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="col-span-1">
          <label htmlFor="interviewStartTime" className="block mb-2 text-sm font-medium text-gray-900">Start Time</label>
          <input
            type="time"
            name="interviewStartTime"
            id="interviewStartTime"
            value={formData.interviewStartTime}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
          {errors.interviewStartTime && <p className="text-red-500 text-sm mt-1">{errors.interviewStartTime}</p>}
        </div>
        <div className="col-span-1">
          <label htmlFor="interviewEndTime" className="block mb-2 text-sm font-medium text-gray-900">End Time</label>
          <input
            type="time"
            name="interviewEndTime"
            id="interviewEndTime"
            value={formData.interviewEndTime}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
          {errors.interviewStartTime && <p className="text-red-500 text-sm mt-1">{errors.interviewStartTime}</p>}
        </div>
      </div>
      {formData.interviewMethod === 'Online' && (
        <div className='mt-2'>
          <label htmlFor="interviewLink" className="block mb-2 text-sm font-medium text-gray-900">Interview Link</label>
          <input
            type="text"
            name="interviewLink"
            id="interviewLink"
            value={formData.interviewLink}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
      )}
      {formData.interviewMethod === 'Face-to-face' && (
        <div className='mt-2'>
          <label htmlFor="interviewLocation" className="block mb-2 text-sm font-medium text-gray-900">Interview Location</label>
          <input
            type="text"
            name="interviewLocation"
            id="interviewLocation"
            value={formData.interviewLocation}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
      )}
      <div className="mt-4 text-center">
        <button
          type="submit"
          className="mt-4 bg-blue-800 text-sm text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
        <button type='button' className="mt-4 ml-2 bg-red-600 text-sm text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-700" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
