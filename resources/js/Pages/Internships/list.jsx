'use client';
import React, { useState, useEffect } from 'react';
import InternshipCard from '@/components/internshipCard';
import DefaultLayout from '@/layout/defaultLayout';
import { Head } from '@inertiajs/react';

const locationMap = {
  '1': 'Kuala Lumpur',
  '2': 'Selangor',
  '3': 'Penang',
  '4': 'Labuan',
  '5': 'Putrajaya',
  '6': 'Johor',
  '7': 'Kedah',
  '8': 'Kelantan',
  '9': 'Melaka',
  '10': 'Negeri Sembilan',
  '11': 'Pahang',
  '12': 'Perak',
  '13': 'Perlis',
  '14': 'Sabah',
  '15': 'Sarawak',
  '16': 'Terengganu',
};

const ITEMS_PER_PAGE = 5;

const InternshipListing = ({ internships }) => {
  const [studyField, setStudyField] = useState('');
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [filteredInternships, setFilteredInternships] = useState(internships);
  const [currentPage, setCurrentPage] = useState(1);


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

  const handleLocationChange = (event) => {
    const locationValue = event.target.value;
    setLocation(locationMap[locationValue] || '');
  };

  const handleShowInternships = () => {
    const filtered = internships.filter((internship) => {
      const employer = internship.employer; // Assuming `employer` is directly available in `internship`
      return (
        (!studyField || internship.studyScope === studyField) &&
        (!keyword || internship.internshipTitle.toLowerCase().includes(keyword.toLowerCase())) &&
        (!location || (employer?.state === location))
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
      <div className='bg-gray-200 px-6 py-12 min-h-screen overflow-y-auto lg:py-4'>
        <div className="container flex  flex-col mx-auto px-2 py-2">
          <div className="grid grid-cols-12 gap-8 search-boxes mt-2">
            <div className="col-span-4">
              <label className="block mb-2 text-sm font-semibold text-gray-900">I'm Studying</label>
              <select
                id="studyField"
                value={studyField}
                onChange={(e) => setStudyField(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 w-full text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
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
            <div className="col-span-5">
              <label className="block mb-2 text-sm font-semibold text-gray-900">I'm Looking For</label>
              <input
                type="text"
                id="keyword"
                value={keyword}
                onChange={handleKeywordChange}
                className="bg-white border border-gray-300 text-gray-900 text-sm w-full rounded-lg focus:ring-blue-500 block p-2.5"
                placeholder="Search Keyword"
                required
              />
            </div>
            <div className="col-span-3">
              <label className="block mb-2 text-sm font-semibold text-gray-900">Location</label>
              <select
                id="location"
                value={Object.keys(locationMap).find(key => locationMap[key] === location) || ""}
                onChange={handleLocationChange}
                className="bg-white border border-gray-300 text-gray-900 w-full text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              >
                <option value="">Select State</option>
                {Object.entries(locationMap).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
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
