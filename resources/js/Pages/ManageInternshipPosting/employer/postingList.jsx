import PostingCard from "@/components/internshipPosting/postingCard";
import { FaFilter, FaChevronDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import DefaultLayout from "@/layout/defaultLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function PostingList({ internships }) {
  const { flash } = usePage().props;

  useEffect(() => {
    if (flash.success) {
      Swal.fire({
        title: flash.success,
        text: flash.message,
        icon: "success",
        timer: 4000,
        timerProgressBar: true,
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
      });
    }
  }, [flash]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInternships, setFilteredInternships] = useState(internships);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust this value to change items per page

  const handleFilterOpen = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleOptionsClick = (option) => {
    setSelectedOptions(option);
    setIsFilterOpen(false);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    let results = internships;

    // Filter by posting status
    if (selectedOptions !== 'All') {
      results = results.filter(internship => internship.postingStatus === selectedOptions);
    }

    // Filter by search query
    if (searchQuery) {
      results = results.filter(internship =>
        internship.internshipTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredInternships(results);
  }, [selectedOptions, searchQuery, internships]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent out-of-bounds
    setCurrentPage(page);
  };

  // Get internships for the current page
  const indexOfLastInternship = currentPage * itemsPerPage;
  const indexOfFirstInternship = indexOfLastInternship - itemsPerPage;
  const currentInternships = filteredInternships.slice(indexOfFirstInternship, indexOfLastInternship);

  // Generate page numbers for navigation
  const pageNumbers = [...Array(totalPages).keys()].map(i => i + 1);

  return (
    <DefaultLayout>
      <Head title="Internship Postings" />
      <div className="bg-gray-200 px-6 min-h-screen overflow-y-auto lg:py-4">
        <div className="container mx-auto postings-list">
          <h5 className="text-xl font-bold px-2 py-4 text-blue-800">Internship Postings</h5>
          <div className="flex flex-wrap justify-center md:justify-between w-full h-fit-content ml-2 lg:gap-2 gap-4">
              <div className="flex items-center w-full lg:max-w-3xl" >
                <span className="inline-flex items-center px-3 py-3 text-sm text-gray-900 bg-white border border-e-0 border-gray-300 rounded-s-md">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </span>
                <input
                  type="search"
                  id="default-search"
                  className="rounded-none rounded-e-lg bg-white border border-gray-300  border-s-0 border-l text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                  placeholder="Search by entering internship title"
                  value={searchQuery}
                  onChange={handleSearch}
                  required
                />
            </div>
            <Link href="/internship-postings/create" className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-4 px-4 rounded-lg">+ Post an Internship</Link>
          </div>
          <div className="flex justify-center mt-4 gap-20">
            <div className='flex items-center justify-center cursor-pointer' onClick={handleFilterOpen}>
              <FaFilter className='text-gray-500' size={18} />
              <p className='text-gray-500 text-sm font-medium ml-2'>Filter by {selectedOptions}</p>
              <FaChevronDown className='text-gray-500 ml-2' size={18} />
            </div>
            {isFilterOpen && (
              <div className='absolute left-1/2 transform -translate-x-1/2 mt-6 w-48 bg-white shadow-lg rounded-lg'>
                <ul className='py-1'>
                  <li className='text-gray-500 text-sm font-medium p-2 cursor-pointer hover:bg-gray-100' onClick={() => handleOptionsClick('All')}>All</li>
                  <li className='text-gray-500 text-sm font-medium p-2 cursor-pointer hover:bg-gray-100' onClick={() => handleOptionsClick('Published')}>Published</li>
                  <li className='text-gray-500 text-sm font-medium p-2 cursor-pointer hover:bg-gray-100' onClick={() => handleOptionsClick('Unpublished')}>Unpublished</li>
                  <li className='text-gray-500 text-sm font-medium p-2 cursor-pointer hover:bg-gray-100' onClick={() => handleOptionsClick('Expired')}>Expired</li>
                  <li className='text-gray-500 text-sm font-medium p-2 cursor-pointer hover:bg-gray-100' onClick={() => handleOptionsClick('Archived')}>Archived</li>
                </ul>
              </div>
            )}
          </div>
          <div className="internship-postings mt-2 ml-2">
            <div className="internship-posting-card py-2">
              {currentInternships.map((internship) => (
                <PostingCard internship={internship} key={internship.id} />
              ))}
              {currentInternships.length === 0 && (
                <div className="text-gray-600 font-semibold text-center mt-4">No internship postings found</div>
              )}
            </div>
          </div>

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
                {pageNumbers.map(number => (
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
