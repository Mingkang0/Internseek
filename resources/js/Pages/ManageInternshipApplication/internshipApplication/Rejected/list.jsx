import DefaultLayout from '@/layout/defaultLayout';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Head, usePage } from '@inertiajs/react';
import RejectedApplicantCard from '@/components/internshipApplication/rejectedCard';

export default function RejectedApplicantsList({ applications }) {
  const { flash } = usePage().props;

  const [name, setName] = useState('');
  const [internship, setInternship] = useState('');
  const [filteredApplications, setFilteredApplications] = useState(applications);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust as needed
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

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

  useEffect(() => {
    const filtered = applications.filter((application) => {
      const fullName = `${application.student.firstName} ${application.student.lastName}`.toLowerCase();
      const matchesName = fullName.includes(name.toLowerCase());
      const matchesInternship = internship ? application.internship.internshipTitle === internship : true;
      return matchesName && matchesInternship;
    });

    setFilteredApplications(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  }, [name, internship, applications]);

  const uniqueInternships = applications.reduce((acc, application) => {
    const title = application.internship.internshipTitle;
    if (!acc.includes(title)) {
      acc.push(title);
    }
    return acc;
  }, []);

  // Calculate current applications to display
  const indexOfLastApplication = currentPage * itemsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - itemsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <DefaultLayout>
      <div className='bg-gray-200 px-6 py-4 min-h-screen mx-auto overflow-y-auto lg:py-4'>
        <Head title='Rejected Applicants List' />
        <div className='container mx-auto'>
          <h3 className="text-xl font-bold text-gray-800">Applicants (Reject Offer) ({applications.length})</h3>
          <div className='flex flex-col lg:flex-row lg:justify-end mt-2 gap-4 lg:mt-0'>
            <div>
              <select
                value={internship}
                onChange={(e) => setInternship(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 w-full lg:w-56 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 flex-grow"
              >
                <option value="">Select Internship</option>
                {[...uniqueInternships].map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Search by name"
                className="bg-white border border-gray-300 text-gray-900 w-full lg:w-56 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 flex-grow"
              />
            </div>
          </div>
          <div className='applicant-list'>
            <div className="mt-4">
              <>
                {currentApplications.map((application) => (
                  <RejectedApplicantCard key={application.id} application={application} />
                ))}
                {currentApplications.length === 0 &&
                  <div className='text-center text-gray-800'>No applicants found</div>
                }
              </>
            </div>
          </div>

          {/* Pagination Controls */}
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
    </DefaultLayout>
  );
}
