'use client';
import React, { useState, useEffect } from 'react';
import InternshipCard from '@/components/internshipCard';
import DefaultLayout from '@/layout/defaultLayout';
import { Head, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';


const ITEMS_PER_PAGE = 5;

const InternshipListing = ({ internships }) => {
  const [studyField, setStudyField] = useState('');
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [filteredInternships, setFilteredInternships] = useState(internships);
  const [currentPage, setCurrentPage] = useState(1);


  const { flash } = usePage().props;

  useEffect(() => {
    if (flash.error) {
      Swal.fire({
        title: 'Error',
        text: flash.error,
        icon: 'info',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
      });
    }
    if (flash.success) {
      Swal.fire({
        title: 'Success',
        text: flash.success,
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
      });
    }
  }, [flash]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const field = params.get('studyField');
    const searchKeyword = params.get('keyword');
    setStudyField(field || '');
    setKeyword(searchKeyword || '');
    handleShowInternships(); // Apply filters based on URL parameters
  }, [window.location.search]);

  useEffect(() => {
    handleShowInternships(); // Apply filters based on URL parameters
  }, [studyField, keyword, location]);

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleShowInternships = () => {
    const filtered = internships.filter((internship) => {
      console.log(internship);
      const company = internship.company; // Assuming `company` is directly available in `internship`
      return (
        (!studyField || internship.studyScope === studyField) &&
        (!keyword || internship.internshipTitle.toLowerCase().includes(keyword.toLowerCase())) &&
        (!location || (company.companyState && company.companyState.toLowerCase().trim() === location.toLowerCase().trim()))
      );
    });
    setFilteredInternships(filtered);
    setCurrentPage(1); // Reset to the first page whenever the search is performed
  };

  // Pagination logic
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredInternships.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInternships.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <DefaultLayout>
      <Head title="Internship Listing" />
      <div className='bg-gray-200 px-6 min-h-screen overflow-y-auto mx-auto lg:py-4'>
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-8 justify-center items-center search-boxes mt-2 lg:w-full">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900">I'm Studying</label>
              <select
                id="studyField"
                value={studyField}
                onChange={(e) => setStudyField(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 w-80 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 flex-grow"
              >
                <option value="">Any Study Field</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Computer System & Networking">Computer System & Networking</option>
                <option value="Graphic Design & Multimedia">Graphic Design & Multimedia</option>
                <option value="Data Engineering">Data Engineering</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900">I'm Looking For</label>
              <input
                type="text"
                id="keyword"
                value={keyword}
                onChange={handleKeywordChange}
                className="bg-white border border-gray-300 text-gray-900 text-sm w-80 rounded-lg focus:ring-blue-500 block p-2.5 flex-grow"
                placeholder="Search Keyword"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900">Location</label>
              <select
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 w-80 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 flex-grow"
              >
                <option value="">Select State</option>
                <option value="Johor">Johor</option>
                <option value="Kedah">Kedah</option>
                <option value="Kelantan">Kelantan</option>
                <option value="Kuala Lumpur">Kuala Lumpur</option>
                <option value="Labuan">Labuan</option>
                <option value="Melaka">Melaka</option>
                <option value="Negeri Sembilan">Negeri Sembilan</option>
                <option value="Pahang">Pahang</option>
                <option value="Perak">Perak</option>
                <option value="Perlis">Perlis</option>
                <option value="Pulau Pinang">Pulau Pinang</option>
                <option value="Sabah">Sabah</option>
                <option value="Sarawak">Sarawak</option>
                <option value="Selangor">Selangor</option>
                <option value="Terengganu">Terengganu</option>
                <option value="Putrajaya">Putrajaya</option>
              </select>
            </div>
          </div>
          <div className="internship-listing">
            {currentItems.length > 0 ? (
              currentItems.map((internship) => (
                <InternshipCard key={internship.id} internship={internship} />
              ))
            ) : (
              <div className='mt-6 text-center'>No internships found that match your search criteria.</div>
            )}
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
};

export default InternshipListing;
