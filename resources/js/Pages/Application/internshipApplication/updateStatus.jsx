import DefaultLayout from "@/layout/defaultLayout";
import { router } from "@inertiajs/react";
import { useState } from 'react';

export default function UpdateApplicationStatus({ application }) {
  const [applicationStatus, setApplicationStatus] = useState('Reviewing');
  const [meetingDate, setMeetingDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [meetingMethod, setMeetingMethod] = useState('');
  const [location, setLocation] = useState('');
  const [meetingLink, setMeetingLink] = useState('');

  const [errors, setErrors] = useState({});

  const handleApplicationStatusChange = (e) => {
    setApplicationStatus(e.target.value);
  };

  const handleMeetingMethodChange = (e) => {
    setMeetingMethod(e.target.value);
  };

  const handleSubmit = () => {
    const data = {
      applicationStatus,
      meetingDate: applicationStatus === 'Interview' ? meetingDate : null,
      startTime: applicationStatus === 'Interview' ? startTime : null,
      endTime: applicationStatus === 'Interview' ? endTime : null,
      meetingMethod: applicationStatus === 'Interview' ? meetingMethod : null,
      location: meetingMethod === 'Face-to-face' ? location : null,
      meetingLink: meetingMethod === 'Online' ? meetingLink : null,
    };

    if (startTime >= endTime) {
      setErrors({ startTime: 'Start time must be less than end time' });
      return;
    }

    router.post(`/internship-applications/${application.id}/update-application-status`, data, {
      onError: (errors) => {
        console.error(errors);
      },
    });
  };


  return (
    <DefaultLayout>
      <div className="bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4">
        <div className="w-3/4 p-5 mt-2 mx-auto bg-white border border-gray-200 rounded-lg shadow">
          <h5 className="text-center mb-2 text-lg font-bold tracking-tight text-gray-900">
            Update Application Status
          </h5>

          <div className="flex justify-between mt-4">
            <p className="flex font-semibold text-base text-gray-700 gap-2">
              Name: <span className="font-medium">{application.student.firstName} {application.student.lastName}</span>
            </p>
            <p className="flex font-semibold text-base text-gray-700 gap-2">
              Applied Internship: <span className="font-medium">{application.internship.internshipTitle}</span>
            </p>
          </div>
          <div className="grid grid-cols-12 gap-6 text-left mt-2">
            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700">Application Status</label>
              <select
                name="applicationStatus"
                id="applicationStatus"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={applicationStatus}
                onChange={handleApplicationStatusChange}
              >
                <option value="Reviewing">Reviewing</option>
                <option value="Interview">Need-to-Interview</option>
                <option value="Unsuccessful">Unsuccessful</option>
              </select>
            </div>

            {applicationStatus === 'Interview' && (
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">Meeting Date</label>
                <input
                  type="date"
                  name="meetingDate"
                  id="meetingDate"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                />
              </div>
            )}

            {applicationStatus === 'Interview' && (
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <div class="relative">
                  <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="time"
                    name="startTime"
                    id="startTime"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required />
                </div>
                {errors.startTime && <p className="text-red-500 text-xs italic">{errors.startTime}</p>}
              </div>
            )}

            {applicationStatus === 'Interview' && (
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <div class="relative">
                  <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="time"
                    name="endTime"
                    id="endTime"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required />
                </div>
                {errors.startTime && <p className="text-red-500 text-xs italic">{errors.startTime}</p>}
              </div>
            )}

            {applicationStatus === 'Interview' && (
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">Meeting Method</label>
                <select
                  name="meetingMethod"
                  id="meetingMethod"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={meetingMethod}
                  onChange={handleMeetingMethodChange}
                >
                  <option value="">Select Meeting Method</option>
                  <option value="Face-to-face">Face-to-Face</option>
                  <option value="Online">Online</option>
                </select>
              </div>
            )}

            {applicationStatus === 'Interview' && meetingMethod === 'Face-to-face' && (
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            )}

            {applicationStatus === 'Interview' && meetingMethod === 'Online' && (
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">Meeting Link</label>
                <input
                  type="text"
                  name="meetingLink"
                  id="meetingLink"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Update Status
            </button>
            <button type="button"
              className=" px-4 py-2 bg-white text-gray-800 font-semibold border border-gray-800 rounded-lg"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </DefaultLayout>
  );
}