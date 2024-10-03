import React from 'react';
import { FaEye } from 'react-icons/fa';
import { Link, router } from '@inertiajs/react';
import { MdChatBubbleOutline } from 'react-icons/md';
import Swal from 'sweetalert2';

const AppliedInternshipCard = ({ appliedInternship }) => {

  const internship = appliedInternship.internship;
  const company = internship.company;

  const clicksCount = appliedInternship.internship.clicks.length;
  const bookmarksCount = appliedInternship.internship.bookmarks.length;
  const applicationsCount = appliedInternship.internship.applications.length;

  const handleCancelApplication = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this application!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      confirmButtonColor: '#d33',
      cancelButtonText: 'No, keep it',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        // Cancel application
        router.post(`/internship-application/${appliedInternship.id}/cancel`);
      }
    }
    );
  }
  return (
    <div className="w-full p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow">
      <div className='flex lg:hidden gap-2 justify-end'>
        <span className=" text-sm font-semibold text-gray-600">Status:</span>
        <span className=" text-sm text-gray-600">{appliedInternship.applicationStatus}</span>
      </div>
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
        <div className="flex justify-center">
          <img src={`/storage/company/companyLogo/${company.companyLogo}`} alt="CompanyLogo" className="rounded-full w-24 h-24 md:w-28 md:h-28 mx-auto border ring-1 ring-gray-900" />
        </div>
        <div className="w-full">
          <div className='flex justify-between'>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
              {internship.internshipTitle}
            </h5>
            <div className='hidden lg:flex gap-2 justify-end'>
              <span className=" text-sm font-semibold text-gray-600">Status:</span>
              <span className=" text-sm text-gray-600">{appliedInternship.applicationStatus}</span>
            </div>
          </div>
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
          {appliedInternship.interviewComment && (
            <>
              <h5 className='text-base font-semibold text-gray-800 mt-4 underline'>Interview Ratings & Comment</h5>
              <div className='flex flex-col lg:flex-row gap-2 md:gap-12 mt-2'>
                {appliedInternship.technicalRating && (
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Technical Rating</label>
                    <div className="flex mt-2">
                      {Array(5).fill(0).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ms-1 ${i < appliedInternship.technicalRating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      <p className='block lg:hidden text-sm font-semibold text-gray-600 ml-2 mt-1'>{appliedInternship.technicalRating} out of 5</p>
                    </div>
                    <p className='hidden lg:block text-sm font-semibold text-gray-600 mx-auto mt-1'>{appliedInternship.technicalRating} out of 5</p>
                  </div>
                )}

                {appliedInternship.performanceRating && (
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Performance Rating</label>
                    <div className="flex mt-2">
                      {Array(5).fill(0).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ms-1 ${i < appliedInternship.performanceRating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      <p className='block lg:hidden text-sm font-semibold text-gray-600 ml-2 mt-1'>{appliedInternship.performanceRating} out of 5</p>
                    </div>
                    <p className='hidden lg:block text-sm font-semibold text-gray-600 mx-auto mt-1'>{appliedInternship.performanceRating} out of 5</p>
                  </div>
                )}
                {appliedInternship.softRating && (
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Softskills Rating</label>
                    <div className="flex mt-2">
                      {Array(5).fill(0).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ms-1 ${i < appliedInternship.softRating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      <p className='block lg:hidden text-sm font-semibold text-gray-600 ml-2 mt-1'>{appliedInternship.softRating} out of 5</p>
                    </div>
                    <p className='hidden lg:block text-sm font-semibold text-gray-600 mx-auto mt-1'>{appliedInternship.softRating} out of 5</p>
                  </div>
                )}
                {appliedInternship.overallRating && (
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Overall Rating</label>
                    <div className="flex mt-2">
                      {Array(5).fill(0).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ms-1 ${i < appliedInternship.overallRating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      <p className='block lg:hidden text-sm font-semibold text-gray-600 ml-2 mt-1'>{appliedInternship.overallRating} out of 5</p>
                    </div>
                    <p className='hidden lg:block text-sm font-semibold text-gray-600 mx-auto mt-1'>{appliedInternship.overallRating} out of 5</p>
                  </div>
                )}
              </div>
              <div className='flex flex-col lg:flex-row mt-2'>
                {appliedInternship.interviewComment && (
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Interview Comment</label>
                    <textarea className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 lg:w-96 h-20' value={appliedInternship.interviewComment} disabled />
                  </div>
                )}
              </div>
              
            </>

          )}
          <div className="flex flex-wrap justify-between mt-2 items-center gap-4">
            <div className="flex items-center text-sm font-semibold text-gray-600">
              <span className="inline-block text-sm font-normal text-gray-900"><strong>Last Apply:</strong> {internship.endPostingDate}</span>
            </div>
            <div className="flex flex-wrap gap-4 justify-content:space-between">
              <span className="flex items-center text-sm font-semibold text-gray-800">
                <FaEye className="mr-2" size={20} /> {clicksCount} views
              </span>
              <span className="flex items-center text-sm font-semibold text-red-800">
                {applicationsCount} applications
              </span>
              <span className="flex items-center text-sm font-semibold text-blue-800">
                {bookmarksCount} bookmarks
              </span>
            </div>
            <div className='flex justify-center'>
              <Link href={`/messages/${company.id}?receiverType=${encodeURIComponent('employer')}`} className="flex items-center justify-center px-4 py-3 m-1 border bg-white border-gray-900 text-gray-900' rounded-lg">
                <span><MdChatBubbleOutline size={22} className='mr-2' /></span> <span>Message</span>
              </Link>
              {appliedInternship.applicationStatus === 'Reviewing' && (
                <button onClick={handleCancelApplication} className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 flex items-center justify-center focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-8 m-1 text-center">
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliedInternshipCard;
