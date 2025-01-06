import React from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

const InternshipCard = ({ internship }) => {

  const { auth } = usePage().props;
  const isAuthenticated = auth?.user !== null;
  const userRole = auth?.role; // Adjusted to use `auth.role`


  const company = internship.company;
  return (
    <div className="w-full p-6 mt-4 mx-auto bg-white border border-gray-200 rounded-lg shadow lg:max-w-5xl">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="md:mr-1 flex justify-center lg:w-[100px]">
          <img src={`/storage/company/companyLogo/${company.companyLogo}`} alt="CompanyLogo" className="rounded-full w-24 h-24 md:w-28 md:h-28 mx-auto border ring-1 ring-gray-900" />
        </div>

        <div className='flex flex-col lg:w-[920px]'>
          <Link href={`/internships/${internship.id}`}>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
              {internship.internshipTitle}
            </h5>
          </Link>
          <p className="mb-3 font-semibold text-normal text-gray-700">
            {company.companyName}
          </p>
          <p className="mb-3 font-semibold text-normal text-gray-700">
            {company?.companyCity}, {company?.companyState}
          </p>
          <p className="mb-3 font-normal text-gray-700">
            {internship.internshipDescription}
          </p>

          <div>
            <div className="flex flex-wrap items-center gap-6">
              <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">Allowance: RM {internship.internshipAllowance}</span>
              <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">Internship Period: {internship.internshipDuration} months</span>
              <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">Working Hour: {internship.workingHour} hours per day</span>
              <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">{internship.studyScope}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-between mt-4 items-center">
            <div className="flex items-center text-sm font-semibold text-gray-600">
              <span className="inline-block text-sm font-normal text-gray-900"><strong>Last Apply:</strong> {internship.endPostingDate}</span>
            </div>
            <div className="flex flex-wrap gap-4 lg:justify-between justify-center">
              <span className="flex items-center text-sm font-semibold text-gray-800">
                <FaEye className="mr-2" size={20} /> {internship.clicks_count} views
              </span>
              <span className="flex items-center text-sm font-semibold text-red-800">
                {internship.applications_count} applications
              </span>
              <span className="flex items-center text-sm font-semibold text-blue-800">
                {internship.bookmarks_count} bookmarks
              </span>
            </div>
            {
              isAuthenticated && userRole === 'student' && (
                <Link href={`/student/applyInternship/${internship.id}`} className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center">
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
