'use client';
import DefaultLayout from '@/layout/defaultLayout';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Head, usePage } from '@inertiajs/react';
import BookmarkInternshipCard from '@/components/my-internship/bookmarkInternshipCard';
import MatchedInternshipCard from '@/components/my-internship/matchedInternshipCard';
import AppliedInternshipCard from '@/components/my-internship/appliedInternshipCard';
import InterviewInternshipCard from '@/components/my-internship/interviewInternshipCard';
import ApprovedInternshipCard from '@/components/my-internship/approvedInternshipCard';
import ShortlistedInternshipCard from '@/components/my-internship/shortlistedInternshipCard';


export default function MyInternships({ bookmarks, matchs, appliedInternships, interviews, approvedInternships, shortlistedInternships }) {

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

  // Filter applied internships based on the processFilter
  const filteredAppliedInternships = appliedInternships.filter((internship) => {
    return internship.applicationStatus === 'Reviewing' || internship.applicationStatus === 'Unsuccessful';
  });

  const filterShortlistedInternships = shortlistedInternships.filter((internship) => {
    return internship.applicationStatus === 'Shortlisted';
  });

  const filteredApprovedInternships = approvedInternships.filter((internship) => {
    return internship.applicationStatus === 'Approved';
  });

  // Render interview internships when processFilter is 'interview'
  const filteredInterviewInternships = interviews.filter((internship) => {
    return internship.application.applicationStatus === 'Interview';
  });

  return (
    <DefaultLayout>
      <Head title="My Internships" />
      <div className='bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4'>
        <div className='container mx-auto'>
          <h3 className="text-xl font-bold text-gray-800">My Internships</h3>

          {/* Pre-Internships */}
          <div className='pre-internship mt-2'>
          <div className='flex justify-between'>
            <h5 className="text-lg font-bold text-grey-800 underline">Pre-Internships</h5>
            <a href="/student/pre-internships" className="text-blue-800 hover:underline">View All</a>
          </div>  
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
                    Bookmarked Internships 
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
                    Matched Internships
                  </h5>
                  {matchs.map((match) => (
                    <MatchedInternshipCard key={match.id} match={match} />
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Process-Internships */}
          <div className='process-internship mt-6'>
            <div className='flex justify-between'>
            <h5 className="text-lg font-bold text-grey-800 underline">Process-Internships</h5>
            <a href="/student/process-internships" className="text-blue-800 hover:underline">View All</a>
          </div>
            <div className="inline-flex rounded-md shadow-sm mt-4" role="group">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium border border-gray-900 rounded-s-lg focus:z-10 focus:ring-2 focus:ring-blue-700 ${processFilter === 'applied' ? 'bg-blue-800 text-white' : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700'}`}
                onClick={() => handleProcessInternshipFilterChange('applied')}
              >
                Applied Internships
              </button>
              <button
                type="button"
                className={`px-4 py-3 text-sm font-medium border-t border-b border-r border-gray-900 focus:z-10 focus:ring-2 focus:ring-blue-700 ${processFilter === 'interview' ? 'bg-blue-800 text-white' : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700'}`}
                onClick={() => handleProcessInternshipFilterChange('interview')}
              >
                Interview Internships
              </button>
              <button
                type="button"
                className={`px-4 py-3 text-sm font-medium border-t border-b border-r border-gray-900 focus:z-10 focus:ring-2 focus:ring-blue-700 ${processFilter === 'shortlisted' ? 'bg-blue-800 text-white' : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700'}`}
                onClick={() => handleProcessInternshipFilterChange('shortlisted')}
              >
                Shortlisted Internships
              </button>
              <button
                type="button"
                className={`px-4 py-3 text-sm font-medium border-t border-b border-r border-gray-900 rounded-r-lg focus:z-10 focus:ring-2 focus:ring-blue-700 ${processFilter === 'approved' ? 'bg-blue-800 text-white' : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700'}`}
                onClick={() => handleProcessInternshipFilterChange('approved')}
              >
                Approved Internships
              </button>
            </div>

            {/* Display filtered internships */}
            {processFilter === 'interview' ? (
              filteredInterviewInternships.length > 0 ? (
                <>
                  <h5 className="text-lg font-semibold text-grey-800 mt-2">
                    Interview Internships
                  </h5>
                  {filteredInterviewInternships.map((internship) => (
                    <InterviewInternshipCard key={internship.id} interview={internship} />
                  ))}
                </>
              ) : (
                <div className="text-center mt-4">
                  <p className="text-lg font-semibold text-grey-800">No Interview Internships</p>
                </div>
              )
            ) : processFilter === 'approved' ? (
              filteredApprovedInternships.length > 0 ? (
                <>
                  <h5 className="text-lg font-semibold text-grey-800 mt-2">
                    Approved Internships
                  </h5>
                  {filteredApprovedInternships.map((internship) => (
                    <ApprovedInternshipCard key={internship.id} approved={internship} />
                  ))}
                </>
              ) : (
                <div className="text-center mt-4">
                  <p className="text-lg font-semibold text-grey-800">No Approved Internships</p>
                </div>
              )
            ) :

              processFilter === 'shortlisted' ? (
                filterShortlistedInternships.length > 0 ? (
                  <>
                    <h5 className="text-lg font-semibold text-grey-800 mt-2">
                      Shortlisted Internships
                    </h5>
                    {filterShortlistedInternships.map((internship) => (
                      <ShortlistedInternshipCard key={internship.id} shortlisted={internship} />
                    ))}
                  </>
                ) : (
                  <div className="text-center mt-4">
                    <p className="text-lg font-semibold text-grey-800">No Shortlisted Internships</p>
                  </div>

                )
              ) : (
                filteredAppliedInternships.length > 0 ? (
                  <>
                    <h5 className="text-lg font-semibold text-grey-800 mt-2">
                      {processFilter.charAt(0).toUpperCase() + processFilter.slice(1)} Internships
                    </h5>
                    {filteredAppliedInternships.map((internship) => (
                      <AppliedInternshipCard key={internship.id} appliedInternship={internship} />
                    ))}
                  </>
                ) : (
                  <div className="text-center mt-4">
                    <p className="text-lg font-semibold text-grey-800">No {processFilter.charAt(0).toUpperCase() + processFilter.slice(1)} Internships</p>
                  </div>
                )
              )}

          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
