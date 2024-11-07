'use client';
import DefaultLayout from '@/layout/defaultLayout';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { usePage, Head } from '@inertiajs/react';

export default function ReportRequestList({ problemReports }) {

  const [filter, setFilter] = useState('Reviewing');
  const { flash } = usePage().props;

  const reportsPerPage = 10; // Adjust the number of reports per page as needed
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(problemReports.length / reportsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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

  // Filter reports based on the current filter
  const filteredRequests = problemReports.filter(
    (request) => request.reportStatus === filter
  );

  // Calculate reports for the current page
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredRequests.slice(indexOfFirstReport, indexOfLastReport);

  return (
    <DefaultLayout>
      <Head title="Report Internship from Students" />
      <div className='bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4'>
        <div className='container mx-auto'>
          <h5 className="text-lg font-bold text-blue-800">Report Internship from Students</h5>

          {/* Filter buttons */}
          <div className="inline-flex rounded-md shadow-sm mt-4" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border border-gray-900 rounded-s-lg focus:z-10 focus:ring-2 focus:ring-blue-700 ${filter === 'Reviewing' ? 'bg-blue-800 text-white' : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700'
                }`}
              onClick={() => handleFilterChange('Reviewing')}
            >
              Reviewing
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border-t border-b border-gray-900  focus:z-10 focus:ring-2 focus:ring-blue-700 ${filter === 'Solving' ? 'bg-blue-800 text-white' : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700'}`}
              onClick={() => handleFilterChange('Solving')}
            >
              Solving
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border border-gray-900 rounded-e-lg focus:z-10 focus:ring-2 focus:ring-blue-700 ${filter === 'Resolved' ? 'bg-blue-800 text-white' : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700'}`}
              onClick={() => handleFilterChange('Resolved')}
            >
              Resolved
            </button>
          </div>

          {/* Table of reports */}
          <div className="mx-auto mt-8">
            <table className="border border-gray-900 w-full text-sm text-left rtl:text-right text-gray-500 overflow-x-auto lg:overflow-x-none">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300 border-b border-gray-900 text-center">
                <tr>
                  <th scope="col" className="px-3 py-2 border-r border-gray-900">No.</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Company Name</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Internship Title</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Problem Description</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Status</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Report Date</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Who Reported</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Operation</th>
                </tr>
              </thead>
              <tbody>
                {currentReports.map((reportRequest, index) => (
                  <tr key={reportRequest.id} className="text-center odd:bg-white even:bg-gray-50 border-b border-gray-900 hover:bg-gray-100">
                    <td className="px-3 py-2 border-r border-gray-900">{indexOfFirstReport + index + 1}</td>
                    <td className="px-6 py-3 border-r border-gray-900">{reportRequest.internship.company.companyName}</td>
                    <td className="px-6 py-3 border-r border-gray-900">{reportRequest.internship.internshipTitle}</td>
                    <td className="px-6 py-3 border-r border-gray-900">{reportRequest.problemDesc}</td>
                    <td className="px-6 py-3 border-r border-gray-900">{reportRequest.reportStatus}</td>
                    <td className="px-6 py-3 border-r border-gray-900">
                      {new Date(reportRequest.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-3 border-r border-gray-900">{reportRequest.student.firstName} {reportRequest.student.lastName}</td>
                    <td className="px-6 py-3 border-r border-gray-900">
                      <a href={`/admin/problems-reports/${reportRequest.id}`} className="text-blue-600 cursor-pointer">View Request</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <nav aria-label="Page navigation example" className="mt-6">
            <div className="flex justify-end">
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
                    className={`flex items-center justify-center px-4 h-12 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </DefaultLayout>
  );
}
