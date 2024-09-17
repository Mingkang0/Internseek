import React from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import { MdChatBubbleOutline } from 'react-icons/md';

const InterviewInternshipCard = ({ interview }) => {

  return (
    <div className="w-full p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow">
      <div className="grid grid-cols-10">
        <div className="col-span-1 companyLogo">
          <img src={`/storage/company/companyLogo/${interview.application.internship.employer.companyLogo}`} alt="CompanyLogo" className="rounded-full mx-auto border ring-1 ring-gray-900" />
        </div>
        <div className="col-span-9 pl-4">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
            {interview.application.internship.internshipTitle}
          </h5>
          <p className="mb-2 font-semibold text-normal text-gray-700">
            {interview.application.internship.employer.companyName}
          </p>
          <p className="mb-2 font-semibold text-normal text-gray-700">
            {interview.application.internship.employer?.companyCity}, {interview.application.internship.employer?.companyState}
          </p>
          <p className="mb-2 font-normal text-gray-700">
            {interview.application.internship.internshipDescription}
          </p>
          <div className="flex justify-between gap-6">
            <div className="w-3/5 h-fit-content p-4 bg-white border border-gray-900 rounded-lg">
              <h5 className="text-base font-semibold text-gray-900 underline">Meeting Details</h5>
              <div className='grid grid-cols-2 gap-4'>
                <div className='col-span-1 mt-2'>
                  <div className='flex mb-2 gap-2'>
                    <label className='text-gray-900 font-semibold text-sm'>Meeting Date: </label>
                    <p className='text-gray-600 font-medium text-sm'>{interview.interviewDate}</p>
                  </div>
                  <div className='flex mb-2 gap-2'>
                    <label className='text-gray-900 font-semibold text-sm'>Start Time: </label>
                    <p className='text-gray-600 font-medium text-sm'>
                      {new Date(`1970-01-01T${interview.interviewStartTime}`).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </p>
                  </div>
                  <div className='flex mb-2 gap-2'>
                    <label className='text-gray-900 font-semibold text-sm'>End Time: </label>
                    <p className='text-gray-600 font-medium text-sm'>
                      {new Date(`1970-01-01T${interview.interviewEndTime}`).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}</p>
                  </div>
                </div>
                <div className='col-span-1 mt-2'>
                  {interview.interviewLink && (
                    <div className='flex mb-2 gap-2'>
                      <label className='text-gray-900 font-semibold text-sm'>Meeting Link: </label>
                      <p className='text-gray-600 font-medium text-sm'>{interview.interviewLink}</p>
                    </div>
                  )}
                  {interview.interviewLocation && (
                    <div className='flex mb-2 gap-2'>
                      <label className='text-gray-900 font-semibold text-sm'>Meeting Location: </label>
                      <p className='text-gray-600 font-medium text-sm'>{interview.interviewLocation}</p>
                    </div>
                  )}
                  <div className='flex mb-2 gap-2'>
                    <label className='text-gray-900 font-semibold text-sm'>Interview Method: </label>
                    <p className='text-gray-600 font-medium text-sm'>{interview.interviewMethod}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='content-end'>
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
                    className="flex items-center justify-center px-4 py-3 mt-2 border bg-red-600  text-white rounded-lg">
                    Not Available
                  </Link>
                </>
              )}
              <Link href={`/messages/${interview.application.internship.employer.id}?receiverType=${encodeURIComponent('employer')}`} className="flex items-center justify-center px-4 py-3 mt-2 border bg-white border-gray-900 text-gray-900' rounded-lg">
                <span><MdChatBubbleOutline size={22} className='mr-2' /></span> <span>Message</span>
              </Link>
              <div className='status-container'> {/* Add a container element */}
                {
                  interview.interviewStatus === 'Available' && (
                    <div className='flex gap-2 mt-2 w-48'>
                      <p className='text-gray-600 font-semibold text-sm'>Note: </p>
                      <p className='text-gray-600 font-medium text-sm'> Please remember to attend for interview</p>
                    </div>
                  )
                }
                {
                  interview.interviewStatus === 'Not Available' && (
                    <div className='flex gap-2 mt-2 w-48'>
                      <p className='text-gray-600 font-semibold text-sm'>Note: </p>
                      <p className='text-gray-600 font-medium text-sm'> The interview will be rescheduled</p>
                    </div>
                  )
                }
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewInternshipCard;
