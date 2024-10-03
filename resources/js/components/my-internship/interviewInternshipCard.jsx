import React from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import { MdChatBubbleOutline } from 'react-icons/md';

const InterviewInternshipCard = ({ interview }) => {

  return (
    <div className="w-full p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
      <div className="flex justify-center">
          <img src={`/storage/company/companyLogo/${interview.application.internship.company.companyLogo}`} alt="CompanyLogo" className="rounded-full w-24 h-24 md:w-28 md:h-28 border ring-1 ring-gray-900" />
        </div>
        <div className="flex flex-col lg:w-3/4 lg:flex-col">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
            {interview.application.internship.internshipTitle}
          </h5>
          <p className="mb-2 font-semibold text-normal text-gray-700">
            {interview.application.internship.company.companyName}
          </p>
          <p className="mb-2 font-semibold text-normal text-gray-700">
            {interview.application.internship.company?.companyCity}, {interview.application.internship.company?.companyState}
          </p>
          <p className="mb-2 font-normal text-gray-700">
            {interview.application.internship.internshipDescription}
          </p>
          <div className="flex justify-between gap-6">
            <div className="w-full h-fit-content p-4 bg-white border border-gray-900 rounded-lg">
              <h5 className="text-base font-semibold text-gray-900 underline">Meeting Details</h5>
              <div className='grid grid-cols-1 lg:grid-cols-2'>
                <div className='col-span-1 mt-2'>
                  <div className='flex flex-wrap mb-2 gap-2'>
                    <label className='text-gray-900 font-semibold text-sm'>Meeting Date: </label>
                    <p className='text-gray-600 text-sm'>{interview.interviewDate}</p>
                  </div>
                  <div className='flex flex-wrap mb-2 gap-2'>
                    <label className='text-gray-900 font-semibold text-sm'>Start Time: </label>
                    <p className='text-gray-600 text-sm'>
                      {new Date(`1970-01-01T${interview.interviewStartTime}`).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </p>
                  </div>
                  <div className='flex flex-wrap mb-2 gap-2'>
                    <label className='text-gray-900 font-semibold text-sm'>End Time: </label>
                    <p className='text-gray-600 text-sm'>
                      {new Date(`1970-01-01T${interview.interviewEndTime}`).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}</p>
                  </div>
                </div>
                <div className='col-span-1'>
                  {interview.interviewLink && (
                    <div className='flex flex-wrap mb-2 gap-2'>
                      <label className='text-gray-900 font-semibold text-sm'>Meeting Link: </label>
                      <p className='text-gray-600 text-sm'>{interview.interviewLink}</p>
                    </div>
                  )}
                  {interview.interviewLocation && (
                    <div className='flex flex-wrap mb-2 gap-2'>
                      <label className='text-gray-900 font-semibold text-sm'>Meeting Location: </label>
                      <p className='text-gray-600 text-sm'>{interview.interviewLocation}</p>
                    </div>
                  )}
                  <div className='flex flex-wrap mb-2 gap-2'>
                    <label className='text-gray-900 font-semibold text-sm'>Interview Method: </label>
                    <p className='text-gray-600 text-sm'>{interview.interviewMethod}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {interview.application.interviewComment && (
            <>
              <h5 className='text-base font-semibold text-gray-800 mt-4 underline'>Previous Interview Ratings & Comment</h5>
              <div className='flex flex-col lg:flex-row gap-2 md:gap-12 mt-2'>
                {interview.application.technicalRating && (
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Technical Rating</label>
                    <div className="flex mt-2">
                      {Array(5).fill(0).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ms-1 ${i < interview.application.technicalRating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      <p className='block lg:hidden text-sm font-semibold text-gray-600 ml-2 mt-1'>{interview.application.technicalRating} out of 5</p>
                    </div>
                    <p className='hidden lg:block text-sm font-semibold text-gray-600 mx-auto mt-1'>{interview.application.technicalRating} out of 5</p>
                  </div>
                )}

                {interview.application.performanceRating && (
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Performance Rating</label>
                    <div className="flex mt-2">
                      {Array(5).fill(0).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ms-1 ${i < interview.application.performanceRating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      <p className='block lg:hidden text-sm font-semibold text-gray-600 ml-2 mt-1'>{interview.application.performanceRating} out of 5</p>
                    </div>
                    <p className='hidden lg:block text-sm font-semibold text-gray-600 mx-auto mt-1'>{interview.application.performanceRating} out of 5</p>
                  </div>
                )}
                {interview.application.softRating && (
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Softskills Rating</label>
                    <div className="flex mt-2">
                      {Array(5).fill(0).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ms-1 ${i < interview.application.softRating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      <p className='block lg:hidden text-sm font-semibold text-gray-600 ml-2 mt-1'>{interview.application.softRating} out of 5</p>
                    </div>
                    <p className='hidden lg:block text-sm font-semibold text-gray-600 mx-auto mt-1'>{interview.application.softRating} out of 5</p>
                  </div>
                )}
                {interview.application.overallRating && (
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Overall Rating</label>
                    <div className="flex mt-2">
                      {Array(5).fill(0).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ms-1 ${i < interview.application.overallRating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      <p className='block lg:hidden text-sm font-semibold text-gray-600 ml-2 mt-1'>{interview.application.overallRating} out of 5</p>
                    </div>
                    <p className='hidden lg:block text-sm font-semibold text-gray-600 mx-auto mt-1'>{interview.application.overallRating} out of 5</p>
                  </div>
                )}
              </div>
              <div className='flex flex-col lg:flex-row mt-2'>
                {interview.application.interviewComment && (
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Interview Comment</label>
                    <textarea className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 lg:w-96 h-20' value={interview.application.interviewComment} disabled />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className='content-end mt-4 md:mt-0'>
          {interview.interviewStatus === null && (
            <>
              <Link method='post'
                href={`/student/update-interview-status/${interview.id}`}
                data={{ interviewStatus: 'Available' }}
                className="flex items-center justify-center px-4 py-3 border bg-blue-800  text-white rounded-lg">
                Available
              </Link>
              <Link method='post'
                href={`/student/update-interview-status/${interview.id}`}
                data={{ interviewStatus: 'Not Available' }}
                className="flex items-center justify-center text-center px-4 py-3 mt-2 border bg-red-600  text-white rounded-lg">
                Not Available
              </Link>
            </>
          )}
          <Link href={`/messages/${interview.application.internship.company.id}?receiverType=${encodeURIComponent('employer')}`} className="flex items-center justify-center px-4 py-3 mt-2 border bg-white border-gray-900 text-gray-900' rounded-lg">
            <span><MdChatBubbleOutline size={22} className='mr-2' /></span> <span>Message</span>
          </Link>
          <div className='status-container'> {/* Add a container element */}
            {
              interview.interviewStatus === 'Available' && (
                <div className='flex gap-2 mt-2 lg:w-48'>
                  <p className='text-gray-600 font-semibold text-sm'>Note: </p>
                  <p className='text-gray-600 font-medium text-sm'> Please remember to attend for interview</p>
                </div>
              )
            }
            {
              interview.interviewStatus === 'Not Available' && (
                <div className='flex gap-2 mt-2 lg:w-48'>
                  <p className='text-gray-600 font-semibold text-sm'>Note: </p>
                  <p className='text-gray-600 font-medium text-sm'> The interview will be rescheduled</p>
                </div>
              )
            }
          </div>

        </div>
      </div>
    </div>
  );
};

export default InterviewInternshipCard;
