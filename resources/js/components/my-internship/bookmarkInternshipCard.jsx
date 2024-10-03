import React from 'react';
import { FaBookmark, FaEye } from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import { usePage, router } from '@inertiajs/react';
import Swal from 'sweetalert2';


const BookmarkInternshipCard = ({ bookmark }) => {

  console.log(bookmark);
  const internship = bookmark.internship;
  const company = internship.company;
  const clicksCount = bookmark.internship.clicks.length;
  const bookmarksCount = bookmark.internship.bookmarks.length;
  const applicationsCount = bookmark.internship.applications.length;
  const handleCancelBookmark = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this bookmark!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      confirmButtonColor: '#d33',
      cancelButtonText: 'No, keep it',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        // Cancel bookmark
        router.post(`/internships/${internship.id}/delete/bookmark`);
      }
    }
    )
  };
  return (
    <div className="w-full p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow">
      <div className='block lg:hidden flex justify-between'>
        <Link href={`/internships/${internship.id}`}>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
            {internship.internshipTitle}
          </h5>
        </Link>
        <FaBookmark className="text-blue-500 cursor-pointer" onClick={handleCancelBookmark} size={24} />
      </div>
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
        <div className="flex justify-center">
          <img src={`/storage/company/companyLogo/${company.companyLogo}`} alt="CompanyLogo" className="rounded-full w-24 h-24 md:w-28 md:w-28 mx-auto border ring-1 ring-gray-900" />
        </div>
        <div className="w-full">
          <div className='hidden lg:block lg:flex lg:justify-between'>
            <Link href={`/internships/${internship.id}`}>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                {internship.internshipTitle}
              </h5>
            </Link>
            <FaBookmark className="text-blue-500 cursor-pointer" onClick={handleCancelBookmark} size={24} />
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
          <div className="flex flex-wrap justify-between mt-4 items-center gap-4">
            <div className="flex items-center text-sm font-semibold text-gray-600">
              <span className="inline-block text-sm font-normal text-gray-900"><strong>Last Apply:</strong> {internship.endPostingDate}</span>
            </div>
            <div className="flex flex-wrap gap-4 justify-content: space-between">
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
            <Link href={`/student/applyInternship/${internship.id}`} className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center">
              Apply Now
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkInternshipCard;
