import DefaultLayout from '@/layout/defaultLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function RegistrationRequestList({ companies }) {
  const [filter, setFilter] = useState('Pending');
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

  const filteredRequests = companies.filter(request => request.registrationStatus === filter);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  // Get the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent going out of bounds
    setCurrentPage(page);
  };

  return (
    <DefaultLayout>
      <Head title="Company Registration Requests List" />
      <div className='bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4'>
        <div className='container mx-auto'>
          <h5 className="text-lg font-bold text-blue-800">Company Registration Requests List</h5>
          <div className="inline-flex rounded-md shadow-sm mt-4" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border border-gray-900 rounded-s-lg focus:z-10 focus:ring-2 focus:ring-blue-700 ${filter === 'Pending' ? 'bg-blue-800 text-white' : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700'}`}
              onClick={() => handleFilterChange('Pending')}
            >
              Pending
            </button>
            <button
              type="button"
              className={`px-4 py-3 text-sm font-medium border-t border-b border-gray-900  focus:z-10 focus:ring-2 focus:ring-blue-700 ${filter === 'Inquiry' ? 'bg-blue-800 text-white' : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700'}`}
              onClick={() => handleFilterChange('Inquiry')}
            >
              Inquiry
            </button>
            <button
              type="button"
              className={`px-4 py-3 text-sm font-medium border border-gray-900 rounded-e-lg focus:z-10 focus:ring-2 focus:ring-blue-700 ${filter === 'Approved' ? 'bg-blue-800 text-white' : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700'}`}
              onClick={() => handleFilterChange('Approved')}
            >
              Approved
            </button>
          </div>
          <div className="mx-auto mt-8">
            <table className="border border-gray-900 w-full text-sm text-left rtl:text-right text-gray-500 overflow-x-auto lg:overflow-x-none">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300 border-b border-gray-900 text-center">
                <tr>
                  <th scope="col" className="px-3 py-2 border-r border-gray-900">No.</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Company Name</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Business Registration Number</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Business Registration Date</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Status</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Requested Date</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Company Type</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Operation</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((registrationRequest, index) => (
                  <tr key={registrationRequest.id} className="text-center odd:bg-white even:bg-gray-50 border-b border-gray-900 hover:bg-gray-100">
                    <td className="px-3 py-2 border-r border-gray-900">{index + indexOfFirstItem + 1}</td>
                    <td className="px-6 py-3 border-r border-gray-900">{registrationRequest.companyName}</td>
                    <td className="px-6 py-3 border-r border-gray-900">{registrationRequest.businessRegNum}</td>
                    <td className="px-6 py-3 border-r border-gray-900">{registrationRequest.businessRegDate}</td>
                    <td className="px-6 py-3 border-r border-gray-900">{registrationRequest.registrationStatus}</td>
                    <td className="px-6 py-3 border-r border-gray-900">{new Date(registrationRequest.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-3 border-r border-gray-900">{registrationRequest.companyType}</td>
                    <td className="px-6 py-3 border-r border-gray-900">
                      <a href={`/admin/employer-requests/${registrationRequest.id}`} className="text-blue-600 cursor-pointer">View Request</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Component */}
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
