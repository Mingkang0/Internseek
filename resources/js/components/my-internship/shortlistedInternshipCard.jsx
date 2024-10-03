import React from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import { MdChatBubbleOutline } from 'react-icons/md';

const ShortlistedInternshipCard = ({ shortlisted }) => {

  const internship = shortlisted.internship;
  const company = internship.company;

  return (
    <div className="w-full p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
        <div className="flex justify-center">
          <img src={`/storage/company/companyLogo/${company.companyLogo}`} alt="CompanyLogo" className="rounded-full w-24 h-24 md:w-28 md:h-28 mx-auto border ring-1 ring-gray-900" />
        </div>
        <div className="w-full">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
            {internship.internshipTitle}
          </h5>
          <p className="mb-3 font-semibold text-normal text-gray-700">
            {company.companyName}
          </p>
          <p className="mb-3 font-semibold text-normal text-gray-700">
            {company?.companyCity}, {company?.companyState}
          </p>
          <p className="mb-3 font-normal text-gray-700">
            {internship.internshipDescription}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">Allowance: RM {internship.internshipAllowance}</span>
            <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">Internship Period: {internship.internshipDuration} months</span>
            <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">Working Hour: {internship.workingHour} hours per day</span>
            <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">{internship.studyScope}</span>
          </div>
          {shortlisted.interviewComment && (
            <>
              <h5 className='text-base font-semibold text-gray-800 mt-4 underline'>Interview Ratings & Comment</h5>
              <div className='flex flex-col lg:flex-row gap-2 md:gap-12 mt-2'>
                {shortlisted.technicalRating && (
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Technical Rating</label>
                    <div className="flex mt-2">
                      {Array(5).fill(0).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ms-1 ${i < shortlisted.technicalRating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      <p className='block lg:hidden text-sm font-semibold text-gray-600 ml-2 mt-1'>{shortlisted.technicalRating} out of 5</p>
                    </div>
                    <p className='hidden lg:block text-sm font-semibold text-gray-600 mx-auto mt-1'>{shortlisted.technicalRating} out of 5</p>
                  </div>
                )}

                {shortlisted.performanceRating && (
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Performance Rating</label>
                    <div className="flex mt-2">
                      {Array(5).fill(0).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ms-1 ${i < shortlisted.performanceRating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      <p className='block lg:hidden text-sm font-semibold text-gray-600 ml-2 mt-1'>{shortlisted.performanceRating} out of 5</p>
                    </div>
                    <p className='hidden lg:block text-sm font-semibold text-gray-600 mx-auto mt-1'>{shortlisted.performanceRating} out of 5</p>
                  </div>
                )}
                {shortlisted.softRating && (
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Softskills Rating</label>
                    <div className="flex mt-2">
                      {Array(5).fill(0).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ms-1 ${i < shortlisted.softRating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      <p className='block lg:hidden text-sm font-semibold text-gray-600 ml-2 mt-1'>{shortlisted.softRating} out of 5</p>
                    </div>
                    <p className='hidden lg:block text-sm font-semibold text-gray-600 mx-auto mt-1'>{shortlisted.softRating} out of 5</p>
                  </div>
                )}
                {shortlisted.overallRating && (
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Overall Rating</label>
                    <div className="flex mt-2">
                      {Array(5).fill(0).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ms-1 ${i < shortlisted.overallRating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      <p className='block lg:hidden text-sm font-semibold text-gray-600 ml-2 mt-1'>{shortlisted.overallRating} out of 5</p>
                    </div>
                    <p className='hidden lg:block text-sm font-semibold text-gray-600 mx-auto mt-1'>{shortlisted.overallRating} out of 5</p>
                  </div>
                )}
              </div>
              <div className='flex flex-col lg:flex-row mt-2'>
                {shortlisted.interviewComment && (
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Interview Comment</label>
                    <textarea className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 lg:w-96 h-20' value={shortlisted.interviewComment} disabled />
                  </div>
                )}
              </div>
            </>
          )}

          <div className="flex flex-wrap justify-center md:justify-between mt-2 items-center gap-2">
            <div className="flex items-center text-sm font-semibold text-gray-600">
              <span className="inline-block text-sm font-normal text-gray-900"><strong>Note:</strong> Great New! You already entered the final selection, please wait for your final result.</span>
            </div>
            <div>
              <Link href={`/messages/${company.id}?receiverType=${encodeURIComponent('employer')}`} className="flex items-center justify-center px-4 py-3 m-1 border bg-white border-gray-900 text-gray-900' rounded-lg">
                <span><MdChatBubbleOutline size={22} className='mr-2' /></span> <span>Message</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortlistedInternshipCard;
