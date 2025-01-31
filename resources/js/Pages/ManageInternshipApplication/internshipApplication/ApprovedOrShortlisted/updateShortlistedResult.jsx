import DefaultLayout from "@/layout/defaultLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from 'react';

export default function UpdateShortlistedResult({ application }) {
  const [applicationStatus, setApplicationStatus] = useState('Shortlisted');
  const [offerLetter, setOfferLetter] = useState(null);
  const [actualAllowance, setActualAllowance] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [interviewMethod, setInterviewMethod] = useState('');
  const [location, setLocation] = useState('');
  const [meetingMethod, setMeetingMethod] = useState('');
  const [meetingLink, setMeetingLink] = useState('');


  const [errors, setErrors] = useState({});

  const handleApplicationStatusChange = (e) => {
    setApplicationStatus(e.target.value);
  };

  const handleOfferLetterChange = (e) => {
    const file = e.target.files[0];
    setOfferLetter(file);
  };

  const handleInterviewMethodChange = (e) => {
    setInterviewMethod(e.target.value);
  };

  const handleAllowanceCheckboxChange = (e) => {
    if (e.target.checked) {
      setActualAllowance(application.expectedAllowance);
    } else {
      setActualAllowance('');
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('applicationStatus', applicationStatus);

    if (applicationStatus === 'Approved') {
      if (offerLetter) {
        formData.append('offerLetter', offerLetter);
      }
      formData.append('actualAllowance', actualAllowance || '');
    }
    else if (applicationStatus === 'Interview') {
      formData.append('interviewDate', interviewDate);
      formData.append('startTime', startTime);
      formData.append('endTime', endTime);
      formData.append('interviewMethod', interviewMethod);
      if (interviewMethod === 'Face-to-face') {
        formData.append('location', location);
      } else if (interviewMethod === 'Online') {
        formData.append('meetingLink', meetingLink);
      }

      if(startTime > endTime) {
        setErrors({ startTime: 'Start time must be before end time' });
        return;
      }
    }

    router.post(`/internship-applications/${application.id}/update-shortlisted-results`, formData, {
      onError: (errors) => {
        console.error(errors);
        setErrors(errors);
      },
    });
  };

  return (
    <DefaultLayout>
      <Head title="Update Shortlisted Result" />
      <div className="bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4">
        <div className="w-full p-5 mt-2 mx-auto bg-white border border-gray-200 rounded-lg shadow lg:max-w-2xl">
          <h5 className="text-center mb-2 text-lg font-bold tracking-tight text-gray-900">
            Update Shortlisted Result
          </h5>

          <div className="flex flex-wrap justify-between mt-4">
            <div className="flex flex-wrap gap-2">
              <p className="flex font-semibold text-base text-gray-700 gap-2">
                Name:
              </p>
              <span className="">{application.student.firstName} {application.student.lastName}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <p className="flex font-semibold text-base text-gray-700 ">
                Applied Internship:
              </p>
              <span className="">{application.internship.internshipTitle}</span>
            </div>
          </div>

          <div className="grid grid-cols-6 lg:grid-cols-12 gap-6 text-left mt-4">
            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700">Application Status</label>
              <select
                name="applicationStatus"
                id="applicationStatus"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={applicationStatus}
                onChange={handleApplicationStatusChange}
              >
                <option value="">Select Status</option>
                <option value="Interview">Need-to-Interview</option>
                <option value="Approved">Approved</option>
                <option value="Unsuccessful">Unsuccessful</option>
              </select>
            </div>
            {applicationStatus === 'Approved' && (
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">Offer Letter</label>
                <input
                  type="file"
                  name="offerLetter"
                  id="offerLetter"
                  className="block w-full text-sm text-gray-900 border border-gray-500 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  onChange={handleOfferLetterChange}
                />
                {errors.offerLetter && <p className="text-red-500 text-sm">{errors.offerLetter}</p>}
              </div>
            )}

            {applicationStatus === 'Approved' && (
              <div className="col-span-6">
                <div className='flex items-center mb-2'>
                  <input
                    type="checkbox"
                    id="expectedAllowance"
                    checked={actualAllowance === application.expectedAllowance}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    onChange={handleAllowanceCheckboxChange}
                  />
                  <label htmlFor="expectedAllowance" className="ml-2 text-sm font-medium text-gray-900">Same as Expected Allowance</label>
                </div>

                <label className="block text-sm font-medium text-gray-700">Actual Allowance</label>
                <input
                  type="number"
                  name="actualAllowance"
                  id="actualAllowance"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={actualAllowance}
                  placeholder="Enter actual allowance"
                  onChange={(e) => setActualAllowance(e.target.value)}
                />
              </div>
            )}
            {applicationStatus === 'Interview' && (
              <>
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Interview Date</label>
                  <input
                    type="date"
                    name="interviewDate"
                    id="interviewDate"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Start Time</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <input type="time"
                      name="startTime"
                      id="startTime"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
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
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Interview Method</label>
                  <select
                    name="interviewMethod"
                    id="interviewMethod"
                    value={interviewMethod}
                    onChange={handleInterviewMethodChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="">Select Interview Method</option>
                    <option value="Face-to-face">Face-to-Face</option>
                    <option value="Online">Online</option>
                  </select>
                </div>
              </>
            )}
            {applicationStatus === 'Interview' && interviewMethod === 'Face-to-face' && (
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

            {applicationStatus === 'Interview' && interviewMethod === 'Online' && (
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
            <button
              type="button"
              className="px-4 py-2 bg-white text-gray-800 font-semibold border border-gray-800 rounded-lg"
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
