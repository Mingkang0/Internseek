import DefaultLayout from '@/layout/defaultLayout';
import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';


export default function RegistrationRequestList({ employers }) {
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

  const filteredRequests = employers.filter(request => request.registrationStatus === filter);

  return (
    <DefaultLayout>
      <div className='bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4'>
        <div className='container mx-auto'>
          <h5 className="text-lg font-bold text-blue-800">Employer Registration Requests List</h5>
          <div className="inline-flex rounded-md shadow-sm mt-4" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border border-gray-900 rounded-s-lg focus:z-10 focus:ring-2 focus:ring-blue-700 ${filter === 'Pending' ? 'bg-blue-800 text-white' : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700'
                }`}
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
              className={`px-4 py-3 text-sm font-medium border border-gray-900 rounded-e-lg focus:z-10 focus:ring-2 focus:ring-blue-700
            ${filter === 'Approved' ? 'bg-blue-800 text-white' : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700'}`}
              onClick={() => handleFilterChange('Approved')}
            >
              Approved
            </button>
          </div>
          <div className="border border-gray-900 mx-auto mt-8">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300 border-b border-gray-900 text-center">
                <tr>
                  <th scope="col" className="px-3 py-2 border-r border-gray-900">No.</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Company Name</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Business Registration Number</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Business Registration Date</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Status</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Company Email</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Company Type</th>
                  <th scope="col" className="px-6 py-3 border-r border-gray-900">Operation</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((registrationRequest, index) => (
                  <tr key={registrationRequest.id} className="text-center odd:bg-white even:bg-gray-50 border-b border-gray-150 hover:bg-gray-100">
                    <td className="px-3 py-2 border-r border-gray-900">{index + 1}</td>
                    <td className="px-6 py-3 border-r border-gray-900">{registrationRequest.companyName}</td>
                    <td className="px-6 py-3 border-r border-gray-900">{registrationRequest.businessRegNum}</td>
                    <td className="px-6 py-3 border-r border-gray-900">{registrationRequest.businessRegDate}</td>
                    <td className="px-6 py-3 border-r border-gray-900">{registrationRequest.registrationStatus}</td>
                    <td className="px-6 py-3 border-r border-gray-900">{registrationRequest.companyEmail}</td>
                    <td className="px-6 py-3 border-r border-gray-900">{registrationRequest.companyType}</td>
                    <td className="px-6 py-3 border-r border-gray-900">
                      <a href={`/admin/employer-requests/${registrationRequest.id}`} className="text-blue-600 cursor-pointer">View Request</a>
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

