'use client';
import DefaultLayout from '@/layout/defaultLayout';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { usePage, Head } from '@inertiajs/react';
import AppliedInternshipCard from '@/components/my-internship/appliedInternshipCard';
import InterviewInternshipCard from '@/components/my-internship/interviewInternshipCard';
import ApprovedInternshipCard from '@/components/my-internship/approvedInternshipCard';
import ShortlistedInternshipCard from '@/components/my-internship/shortlistedInternshipCard';

export default function MyInternships({ appliedInternships, interviews, approvedInternships, shortlistedInternships }) {
  const [processFilter, setProcessFilter] = useState('applied'); // State for process filter
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(5); // Set your preferred number of items per page
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
    setCurrentPage(1); // Reset to the first page when the filter changes
  };

  // Filter internships based on the selected filter
  const getFilteredInternships = () => {
    switch (processFilter) {
      case 'interview':
        return interviews.filter(internship => internship.application.applicationStatus === 'Interview');
      case 'approved':
        return approvedInternships.filter(internship => internship.applicationStatus === 'Approved');
      case 'shortlisted':
        return shortlistedInternships.filter(internship => internship.applicationStatus === 'Shortlisted');
      case 'applied':
      default:
        return appliedInternships.filter(internship => 
          internship.applicationStatus === 'Reviewing' || internship.applicationStatus === 'Unsuccessful');
    }
  };

  const filteredInternships = getFilteredInternships();

  // Calculate pagination
  const totalItems = filteredInternships.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Get the current internships to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentInternships = filteredInternships.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <DefaultLayout>
      <Head title="Process Internships" />
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
            {currentInternships.length > 0 ? (
              <>
                <h5 className="text-lg font-semibold text-grey-800 mt-2">
                  {processFilter.charAt(0).toUpperCase() + processFilter.slice(1)} Internships ({currentInternships.length})
                </h5>
                {currentInternships.map(internship => {
                  switch (processFilter) {
                    case 'interview':
                      return <InterviewInternshipCard key={internship.id} interview={internship} />;
                    case 'approved':
                      return <ApprovedInternshipCard key={internship.id} approved={internship} />;
                    case 'shortlisted':
                      return <ShortlistedInternshipCard key={internship.id} shortlisted={internship} />;
                    case 'applied':
                    default:
                      return <AppliedInternshipCard key={internship.id} appliedInternship={internship} />;
                  }
                })}
              </>
            ) : (
              <div className="text-center mt-4">
                <p className="text-lg font-semibold text-grey-800">No {processFilter.charAt(0).toUpperCase() + processFilter.slice(1)} Internships</p>
              </div>
            )}

            {/* Pagination Navigation */}
            <nav aria-label="Page navigation example" className="mt-6">
              <div className='flex justify-end'>
                <ul className="inline-flex flex-wrap -space-x-px text-sm md:text-base">
                  <li>
                    <a
                      href="#"
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={`flex items-center justify-center px-4 md:px-6 h-12 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
                    >
                      Previous
                    </a>
                  </li>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => (
                    <li key={number}>
                      <a
                        href="#"
                        onClick={() => handlePageChange(number)}
                        aria-current={currentPage === number ? "page" : undefined}
                        className={`flex items-center justify-center px-4 md:px-6 h-12 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${currentPage === number ? 'text-blue-600 border-blue-300 bg-blue-50' : ''}`}
                      >
                        {number}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#"
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={`flex items-center justify-center px-3 md:px-6 h-12 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
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
