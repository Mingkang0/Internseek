'use client';
import DefaultLayout from '@/layout/defaultLayout';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { usePage } from '@inertiajs/react';


export default function ReportRequestList({ problemReports }) {

  const [filter, setFilter] = useState('Reviewing');

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

  console.log(problemReports);
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredRequests = problemReports.filter(request => request.reportStatus === filter);

  return (
    <DefaultLayout>
      <div className='bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4'>
        <div className='container mx-auto'>
          <h5 className="text-lg font-bold text-blue-800">Internship Problem Reports List</h5>
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
              className={`px-4 py-3 text-sm font-medium border-t border-b border-gray-900  focus:z-10 focus:ring-2 focus:ring-blue-700 ${filter === 'Solving' ? 'bg-blue-800 text-white' : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700'}`}
              onClick={() => handleFilterChange('Solving')}
            >
              Solving
            </button>
            <button
              type="button"
              className={`px-4 py-3 text-sm font-medium border border-gray-900 rounded-e-lg focus:z-10 focus:ring-2 focus:ring-blue-700
            ${filter === 'Resolved' ? 'bg-blue-800 text-white' : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700'}`}
              onClick={() => handleFilterChange('Resolved')}
            >
              Resolved
            </button>
          </div>
          <div className="border border-gray-900 mx-auto mt-8">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300 border-b border-gray-900 text-center">
                <tr>
                  <th scope="col" className="px-3 py-2 border-r border-gray-900">No.</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Company Name</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Internship Title</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Problem Description</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Status</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Report Date</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Who Report</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Operation</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((reportRequest, index) => (
                  <tr key={reportRequest.id} className="text-center odd:bg-white even:bg-gray-50 border-b border-gray-150 hover:bg-gray-100">
                    <td className="px-3 py-2 border-r border-gray-900">{index + 1}</td>
                    <td className="px-6 py-3 border-r border-gray-900">{reportRequest.internship.employer.companyName}</td>
                    <td className="px-6 py-3 border-r border-gray-900">{reportRequest.internship.internshipTitle}</td>
                    <td className="px-6 py-3 border-r border-gray-900">{reportRequest.problemDesc}</td>
                    <td className="px-6 py-3 border-r border-gray-900">{reportRequest.reportStatus}</td>
                    <td className="px-6 py-3 border-r border-gray-900">{new Date(reportRequest.created_at).toLocaleDateString('en-GB',
                      {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}</td>
                    <td className="px-6 py-3 border-r border-gray-900">{reportRequest.student.firstName} {reportRequest.student.lastName}</td>
                    <td className="px-6 py-3 border-r border-gray-900">
                      <a href={`/admin/problems-reports/${reportRequest.id}`} className="text-blue-600 cursor-pointer">View Request</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );

}