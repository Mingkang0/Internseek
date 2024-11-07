import DefaultLayout from "@/layout/defaultLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from 'react';

export default function UpdateInterviewResult({ application }) {
  const [applicationStatus, setApplicationStatus] = useState('');
  const [offerLetter, setOfferLetter] = useState(null);
  const [actualAllowance, setActualAllowance] = useState('');
  const [errors, setErrors] = useState({});
  const [meetingDate, setMeetingDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [meetingMethod, setMeetingMethod] = useState('');
  const [location, setLocation] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [technicalRating, setTechnicalRating] = useState(0);  
  const [performanceRating, setPerformanceRating] = useState(0); 
  const [softRating, setSoftRating] = useState(0); 
  const [overallRating, setOverallRating] = useState(0); 
  const [interviewComment, setInterviewComment] = useState('');
  const [hoverRating, setHoverRating] = useState(null); // For hover state

  const [technicalHover, setTechnicalHover] = useState(null);  // Hover state for technical rating
  const [performanceHover, setPerformanceHover] = useState(null);  // Hover state for performance rating
  const [softHover, setSoftHover] = useState(null);  // Hover state for soft skills rating
  const [overallHover, setOverallHover] = useState(null);  // Hover state for overall rating


  const handleRatingClick = (index, setRatingFunction) => {
    setRatingFunction(index + 1); // Set rating based on index clicked
  };

  // Handle mouse over (hover effect)
  const handleMouseOver = (index, setHoverFunction) => {
    setHoverFunction(index + 1);
  };

  // Handle mouse leave (reset to the original rating)
  const handleMouseLeave = (setHoverFunction) => {
    setHoverFunction(null); // Reset hover to null after leaving
  };

  const handleApplicationStatusChange = (e) => {
    setApplicationStatus(e.target.value);
  };

  const handleMeetingMethodChange = (e) => {
    setMeetingMethod(e.target.value);
  };


  const handleOfferLetterChange = (e) => {
    const file = e.target.files[0];
    setOfferLetter(file);
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
    formData.append('technicalRating', technicalRating); 
    formData.append('performanceRating', performanceRating);  
    formData.append('softRating', softRating);
    formData.append('overallRating', overallRating);
    formData.append('interviewComment', interviewComment); 

    if (applicationStatus === 'Approved') {
      if (offerLetter) {
        formData.append('offerLetter', offerLetter);
      }
      formData.append('actualAllowance', actualAllowance || '');
    }

    if (applicationStatus === 'Interview') {
      formData.append('interviewDate', meetingDate);
      formData.append('interviewStartTime', startTime);
      formData.append('interviewEndTime', endTime);
      formData.append('interviewMethod', meetingMethod);
      if (meetingMethod === 'Face-to-face') {
        formData.append('interviewLocation', location);
      } else {
        formData.append('interviewLink', meetingLink);
      }
    }

    router.post(`/internship-applications/${application.id}/update-interview-result`, formData, {
      onError: (errors) => {
        console.error(errors);
        setErrors(errors);
      },
    });
  };

  return (
    <DefaultLayout>
      <Head title="Update Interview Result" />
      <div className="bg-gray-200 px-6 py-4 min-h-screen mx-auto overflow-y-auto lg:py-4">
        <div className="w-full p-5 mt-2 mx-auto bg-white border border-gray-200 rounded-lg shadow lg:max-w-2xl">
          <h5 className="text-center mb-2 text-lg font-bold tracking-tight text-gray-900">
            Update Interview Result
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

          <div className="grid grid-cols-6 lg:grid-cols-12 gap-4 lg:gap-6 text-left mt-4">
            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700">Application Status</label>
              <select
                name="applicationStatus"
                id="applicationStatus"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={applicationStatus}
                onChange={handleApplicationStatusChange}
              >
                <option value=''>Select Status</option>
                <option value="Interview">Need-to-Interview</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Approved">Approved</option>
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
            {applicationStatus && (
              <>
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Technical Rating</label>
                  <div className="flex flex-col lg:flex-row items-center mt-2">
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-8 h-8 ms-1 ${i < (technicalHover !== null ? technicalHover : technicalRating) ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                        onClick={() => handleRatingClick(i, setTechnicalRating)}
                        onMouseOver={() => handleMouseOver(i, setTechnicalHover)}
                        onMouseLeave={() => handleMouseLeave(setTechnicalHover)}
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                    </div>
                    {technicalRating > 0 && (
                      <span className="text-gray-500 dark:text-gray-400 text-sm font-medium ms-2">
                        {technicalRating} out of 5
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Performance Rating</label>
                  <div className="flex flex-col lg:flex-row items-center mt-2">
                    <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-8 h-8 ms-1 ${i < (performanceHover !== null ? performanceHover : performanceRating) ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                        onClick={() => handleRatingClick(i, setPerformanceRating)}
                        onMouseOver={() => handleMouseOver(i, setPerformanceHover)}
                        onMouseLeave={() => handleMouseLeave(setPerformanceHover)}
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                    </div>
                    {performanceRating > 0 && (
                      <span className="text-gray-500 dark:text-gray-400 text-sm font-medium ms-2">
                        {performanceRating} out of 5
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Softskills Rating</label>
                  <div className="flex flex-col lg:flex-row items-center mt-2">
                    <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-8 h-8 ms-1 ${i < (softHover !== null ? softHover : softRating) ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                        onClick={() => handleRatingClick(i, setSoftRating)}
                        onMouseOver={() => handleMouseOver(i, setSoftHover)}
                        onMouseLeave={() => handleMouseLeave(setSoftHover)}
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                    </div>
                    {softRating > 0 && (
                      <span className="text-gray-500 dark:text-gray-400 text-sm font-medium ms-2">
                        {softRating} out of 5
                      </span>
                    )}

                  </div>
                </div>

                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Overall Rating</label>
                  <div className="flex flex-col lg:flex-row items-center mt-2">
                    <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-8 h-8 ms-1 ${i < (overallHover !== null ? overallHover : overallRating) ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                        onClick={() => handleRatingClick(i, setOverallRating)}
                        onMouseOver={() => handleMouseOver(i, setOverallHover)}
                        onMouseLeave={() => handleMouseLeave(setOverallHover)}
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                    </div>
                    {overallRating > 0 && (
                      <span className="text-gray-500 dark:text-gray-400 text-sm font-medium ms-2">
                        {overallRating} out of 5
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Overall Comment</label>
                  <textarea
                    name="interviewComment"
                    id="interviewComment"
                    rows={5}
                    value={interviewComment}
                    onChange={(e) => setInterviewComment(e.target.value)}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </>
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
