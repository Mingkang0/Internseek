import React from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

const InternshipCard = ({ internship }) => {

  const { auth } = usePage().props;
  const isAuthenticated = auth?.user !== null;
  const userRole = auth?.role; // Adjusted to use `auth.role`


  const employer = internship.employer;
  return (
    <div className="w-full p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow">
      <div className="grid grid-cols-10">
        <div className="col-span-1 companyLogo">
          <img src="../../assets/avatar.png" alt="CompanyLogo" className="rounded-full mx-auto border ring-1 ring-gray-900" />
        </div>
        <div className="col-span-9 pl-4">
          <Link href={`/internships/${internship.id}`}>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
              {internship.internshipTitle}
            </h5>
          </Link>
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
          <div className="flex justify-between mt-4 items-center">
            <div className="flex items-center text-sm font-semibold text-gray-600">
              <span className="inline-block text-sm font-normal text-gray-900"><strong>Last Apply:</strong> {internship.endPostingDate}</span>
            </div>
            <div className="flex gap-4 justify-content: space-between">
              <span className="flex items-center text-sm font-semibold text-gray-800">
                <FaEye className="mr-2" size={20} /> {internship.clicks_count} views
              </span>
              <span className="flex items-center text-sm font-semibold text-red-800">
                {internship.bookmark} applications
              </span>
              <span className="flex items-center text-sm font-semibold text-blue-800">
                {internship.bookmarks_count} bookmarks
              </span>
            </div>
            {
              isAuthenticated && userRole === 'student' && (
                <Link href={`/internships/apply/${internship.id}`} className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center">
                  Apply Now
                </Link>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;
