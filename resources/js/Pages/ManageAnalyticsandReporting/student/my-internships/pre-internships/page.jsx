'use client';
import DefaultLayout from '@/layout/defaultLayout';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Head, usePage } from '@inertiajs/react';
import BookmarkInternshipCard from '@/components/my-internship/bookmarkInternshipCard';
import MatchedInternshipCard from '@/components/my-internship/matchedInternshipCard';

export default function PreInternships({ bookmarks, matchs }) {
  const [filter, setFilter] = useState('Matched');
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 10; // Number of internships per page

  const { flash } = usePage().props;

  useEffect(() => {
    if (flash.success) {
      Swal.fire({
        title: flash.success,
        text: flash.message,
        icon: 'success',
        timer: 4000,
        timerProgressBar: true,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3085d6',
      });
    }
  }, [flash]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  const totalPages = Math.ceil(
    (filter === 'Bookmark' ? bookmarks.length : matchs.length) / itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page changes
    setCurrentPage(page);
  };

  // Calculate internships to display based on current page
  const currentInternships = (filter === 'Bookmark' ? bookmarks : matchs).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <DefaultLayout>
      <Head title="Pre-Internships" />
      <div className='bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4'>
        <div className='container mx-auto'>
          {/* Pre-Internships */}
          <div className='pre-internship mt-2'>
            <h3 className="text-lg font-bold text-grey-800 underline">Pre-Internships</h3>
            <div className="inline-flex rounded-md shadow-sm mt-4" role="group">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium border border-gray-900 rounded-s-lg focus:z-10 focus:ring-2 focus:ring-blue-700 ${filter === 'Matched' ? 'bg-blue-800 text-white' : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700'
                  }`}
                onClick={() => handleFilterChange('Matched')}
              >
                Matched Internships
              </button>
              <button
                type="button"
                className={`px-4 py-3 text-sm font-medium border-t border-b border-r border-gray-900 rounded-r-lg focus:z-10 focus:ring-2 focus:ring-blue-700 ${filter === 'Bookmark' ? 'bg-blue-800 text-white' : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700'}`}
                onClick={() => handleFilterChange('Bookmark')}
              >
                Bookmark Internships
              </button>
            </div>
            <div className="mt-4">
              {filter === 'Bookmark' && (
                <>
                  <h5 className="text-lg font-semibold text-grey-800 mt-2">
                    Bookmarked Internships ({bookmarks.length})
                  </h5>
                  {currentInternships.map((bookmark) => (
                    <BookmarkInternshipCard key={bookmark.id} bookmark={bookmark} />
                  ))}
                  {currentInternships.length === 0 && (
                    <div className="text-center mt-4">
                      <p className="text-lg font-semibold text-grey-800">No Bookmarked Internships</p>
                    </div>
                  )}
                </>
              )}
              {filter === 'Matched' && (
                <>
                  <h5 className="text-lg font-semibold text-grey-800 mt-2">
                    Matched Internships ({matchs.length})
                  </h5>
                  {currentInternships.map((match) => (
                    <MatchedInternshipCard key={match.id} match={match} />
                  ))}
                  {currentInternships.length === 0 && (
                    <div className="text-center mt-4">
                      <p className="text-lg font-semibold text-grey-800">No Matched Internships</p>
                    </div>
                  )}
                </>
              )}
            </div>
            {/* Pagination Controls */}
            <nav aria-label="Page navigation example" className="mt-6">
              <div className='flex justify-end'>
                <ul className="inline-flex -space-x-px text-sm">
                  <li>
                    <a
                      href="#"
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={`flex items-center justify-center px-4 h-12 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
                    >
                      Previous
                    </a>
                  </li>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index + 1}>
                      <a
                        href="#"
                        onClick={() => handlePageChange(index + 1)}
                        aria-current={currentPage === index + 1 ? "page" : undefined}
                        className={`flex items-center justify-center px-4 h-12 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${currentPage === index + 1 ? 'text-blue-600 border-blue-300 bg-blue-50' : ''}`}
                      >
                        {index + 1}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#"
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={`flex items-center justify-center px-3 h-12 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
