import React from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import { MdChatBubbleOutline } from 'react-icons/md';

const ShortlistedInternshipCard = ({ shortlisted }) => {

  const internship = shortlisted.internship;
  const employer = internship.employer;

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
              <span className="inline-block text-sm font-normal text-gray-900"><strong>Note:</strong> Great New! You already entered the final selection, please wait for your final result.</span>
            </div>
            <div>
              <Link href={`/messages/${employer.id}?receiverType=${encodeURIComponent('employer')}`} className="flex items-center justify-center px-4 py-3 m-1 border bg-white border-gray-900 text-gray-900' rounded-lg">
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
