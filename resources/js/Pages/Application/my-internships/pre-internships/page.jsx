'use client';
import DefaultLayout from '@/layout/defaultLayout';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { usePage } from '@inertiajs/react';
import BookmarkInternshipCard from '@/components/my-internship/bookmarkInternshipCard';
import MatchedInternshipCard from '@/components/my-internship/matchedInternshipCard';



export default function PreInternships({ bookmarks, matchs }) {

  const [filter, setFilter] = useState('Matched');
  const [processFilter, setProcessFilter] = useState('applied'); // State for process filter

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
  };

  const handleProcessInternshipFilterChange = (newFilter) => {
    setProcessFilter(newFilter); // Handle process filter change
  };



  return (
    <DefaultLayout>
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
                  {bookmarks.map((bookmark) => (
                    <BookmarkInternshipCard key={bookmark.id} bookmark={bookmark} />
                  ))}
                  {bookmarks.length === 0 && (
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
                  {matchs.map((match) => (
                    <MatchedInternshipCard key={match.id} match={match} />
                  ))}
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </DefaultLayout>
  );
}
