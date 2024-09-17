import React from 'react';
import { FaEye } from 'react-icons/fa';
import { Link, router } from '@inertiajs/react';
import { MdChatBubbleOutline } from 'react-icons/md';
import Swal from 'sweetalert2';

const AppliedInternshipCard = ({ appliedInternship }) => {

  const internship = appliedInternship.internship;
  const employer = internship.employer;

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
      <div className="grid grid-cols-10">
        <div className="col-span-1 companyLogo">
          <img src={`/storage/company/companyLogo/${employer.companyLogo}`} alt="CompanyLogo" className="rounded-full mx-auto border ring-1 ring-gray-900" />
        </div>
        <div className="col-span-9 pl-4">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
            {internship.internshipTitle}
          </h5>
          <p className="mb-3 font-semibold text-normal text-gray-700">
            {employer.companyName}
          </p>
          <p className="mb-3 font-semibold text-normal text-gray-700">
            {employer?.companyCity}, {employer?.companyState}
          </p>
          <p className="mb-3 font-normal text-gray-700">
            {internship.internshipDescription}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">Allowance: RM {internship.internshipAllowance}</span>
            <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">Internship Period: {internship.internshipPeriods} months</span>
            <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">Working Hour: {internship.workingHour} hours per day</span>
            <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">{internship.studyScope}</span>
          </div>
          <div className="flex justify-between mt-2 items-center">
            <div className="flex items-center text-sm font-semibold text-gray-600">
              <span className="inline-block text-sm font-normal text-gray-900"><strong>Last Apply:</strong> {internship.endPostingDate}</span>
            </div>
            <div className="flex gap-4 justify-content:space-between">
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
            <div className='flex'>
              <Link href={`/messages/${employer.id}?receiverType=${encodeURIComponent('employer')}`} className="flex items-center justify-center px-4 py-3 m-1 border bg-white border-gray-900 text-gray-900' rounded-lg">
                <span><MdChatBubbleOutline size={22} className='mr-2' /></span> <span>Message</span>
              </Link>
              {appliedInternship.applicationStatus === 'Reviewing' && (
                <button onClick={handleCancelApplication} className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 flex items-center justify-center focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-6 m-1 text-center">
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
