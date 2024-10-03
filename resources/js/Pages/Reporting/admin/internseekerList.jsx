import DefaultLayout from "@/layout/defaultLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { FaFilter, FaChevronDown } from "react-icons/fa";

export default function RegisteredInternseekerTable({ internseekers }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState('Latest-to-Old');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterOpen = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleOptionsClick = (option) => {
    setSelectedOptions(option);
    setIsFilterOpen(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredInternseekers = internseekers.filter(internseeker =>
    `${internseeker.firstName} ${internseeker.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort internships based on selected option
  const sortedInternseekers = filteredInternseekers.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);

    return selectedOptions === 'Latest-to-Old' ? dateB - dateA : dateA - dateB;
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedInternseekers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInternseekers = sortedInternseekers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <DefaultLayout>
      <Head title="Registered Internseekers List" />
      <div className="bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4">
        <div className="container mx-auto">
          <h1 className="text-lg font-bold leading-tight tracking-tight text-blue-900 md:text-xl mb-2">Internseekers List</h1>
          <div className="flex justify-center items-center mb-4 relative mt-4">
            <div className="flex items-center relative w-full max-w-2xl">
              <input
                type="search"
                id="default-search"
                className="block w-full px-10 py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-4xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by entering internseeker name"
                value={searchTerm}
                onChange={handleSearchChange}
                required
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center cursor-pointer mt-2' onClick={handleFilterOpen}>
            <FaFilter className='text-gray-500' size={18} />
            <p className='text-gray-500 text-sm font-medium ml-2'>Filter by {selectedOptions}</p>
            <FaChevronDown className='text-gray-500 ml-2' size={18} />
            {isFilterOpen && (
              <div className='absolute right-50 mt-28 w-52 bg-white shadow-lg rounded-lg'>
                <ul className='py-1'>
                  <li className='text-gray-500 text-sm font-medium p-2 cursor-pointer hover:bg-gray-100' onClick={() => handleOptionsClick('Latest-to-Old')}>Latest-to-Old</li>
                  <li className='text-gray-500 text-sm font-medium p-2 cursor-pointer hover:bg-gray-100' onClick={() => handleOptionsClick('Old-to-Latest')}>Old-to-Latest</li>
                </ul>
              </div>
            )}
          </div>
          <div className="mx-auto mt-8">
            <table className="border border-gray-900 w-full text-sm text-left rtl:text-right text-gray-500 overflow-x-auto lg:overflow-x-none">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300 border-b border-gray-900 text-center">
                <tr>
                  <th scope="col" className="px-6 py-3">No.</th>
                  <th scope="col" className="px-6 py-3">Internseeker Name</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Phone Number</th>
                  <th scope="col" className="px-6 py-3">Gender</th>
                  <th scope="col" className="px-6 py-3">Nationality/Citizenship</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedInternseekers.map((internseeker, index) => (
                  <tr key={internseeker.id} className="border-b border-gray-900 odd:bg-white even:bg-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{startIndex + index + 1}.</td>
                    <td className="px-6 py-4 whitespace-nowrap">{internseeker.firstName} {internseeker.lastName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{internseeker.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{internseeker.phoneNum}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{internseeker.gender}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{internseeker.nationality}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a href={`/admin/internseekers/${internseeker.id}`} className="text-blue-600 cursor-pointer">View Details</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <nav aria-label="Page navigation example" className="mt-6">
            <div className='flex justify-end'>
              <ul className="inline-flex flex-wrap -space-x-px text-sm">
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
    </DefaultLayout>
  );
}
