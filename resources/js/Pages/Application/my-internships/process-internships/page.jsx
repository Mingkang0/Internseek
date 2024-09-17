'use client';
import DefaultLayout from '@/layout/defaultLayout';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { usePage } from '@inertiajs/react';
import AppliedInternshipCard from '@/components/my-internship/appliedInternshipCard';
import InterviewInternshipCard from '@/components/my-internship/interviewInternshipCard';
import ApprovedInternshipCard from '@/components/my-internship/approvedInternshipCard';
import ShortlistedInternshipCard from '@/components/my-internship/shortlistedInternshipCard';


export default function MyInternships({ appliedInternships, interviews, approvedInternships, shortlistedInternships }) {

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
      <div className='bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4'>
        <div className='container mx-auto'>


          {/* Process-Internships */}
          <div className='process-internship mt-6'>
            <h3 className="text-lg font-bold text-grey-800 underline">Process-Internships</h3>
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
                    Interview Internships ({filteredInterviewInternships.length})
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
                    Approved Internships ({filteredApprovedInternships.length})
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
                      Shortlisted Internships ({filterShortlistedInternships.length})
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
                      {processFilter.charAt(0).toUpperCase() + processFilter.slice(1)} Internships ({filteredAppliedInternships.length})
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
