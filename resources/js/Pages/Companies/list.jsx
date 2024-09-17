import React, { useState } from 'react';
import CompanyCard from '@/components/companyCard';
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

const CompanyListing = ({ employers }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [filteredEmployers, setFilteredEmployers] = useState(employers);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleLocationChange = (event) => {
    const locationValue = event.target.value;
    const locationName = locationMap[locationValue] || '';
    setLocation(locationName);
  };

  const handleShowEmployers = () => {
    const filtered = employers
      .filter((employer) => {
        return (
          (!keyword || employer.companyName.toLowerCase().includes(keyword.toLowerCase())) &&
          (!location || (employer?.state === location))
        );
      });
    setFilteredEmployers(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Calculate the indices for slicing the array
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredEmployers.slice(indexOfFirstCard, indexOfLastCard);

  // Generate page numbers
  const totalPages = Math.ceil(filteredEmployers.length / cardsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <DefaultLayout>
      <Head title="Company Listing" />
      <div className='bg-gray-200 px-2 min-h-screen overflow-y-auto lg:py-4'>
        <div className="container flex flex-col px-2 py-2 mx-auto">
          <div className="flex flex-wrap gap-6 justify-center items-center search-boxes mt-2 lg:w-full">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900">I'm Looking For</label>
              <input
                type="text"
                id="keyword"
                onChange={handleKeywordChange}
                className="bg-white border border-gray-300 text-gray-900 text-sm w-80 rounded-lg focus:ring-blue-500 block p-2.5"
                placeholder="Search Keyword"
                required
              />
            </div>
            <div className="col-span-5">
              <label className="block mb-2 text-sm font-semibold text-gray-900">Location</label>
              <select
                id="location"
                value={Object.keys(locationMap).find(key => locationMap[key] === location) || ""}
                onChange={handleLocationChange}
                className="bg-white border border-gray-300 text-gray-900 w-80 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              >
                <option value="">Select State</option>
                {Object.entries(locationMap).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-span-2'>
              <button
                type="button"
                onClick={handleShowEmployers}
                className="text-white mt-4 bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-4 text-center ml-auto"
              >
                Show Companies
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center employer-listing mx-auto">
            {currentCards.length > 0 ? (
              currentCards.map((employer) => (
                <div key={employer.id} className="lg:w-1/2">
                  <CompanyCard key={employer.id} employer={employer} />
                </div>
              ))
            ) : (
              <div className='mt-6 text-center'>No companies found that match your search criteria.</div>
            )}
          </div>
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
                  {pageNumbers.map(number => (
                    <li key={number}>
                      <a
                        href="#"
                        onClick={() => handlePageChange(number)}
                        aria-current={currentPage === number ? "page" : undefined}
                        className={`flex items-center justify-center px-4 h-12 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${currentPage === number ? 'text-blue-600 border-blue-300 bg-blue-50' : ''}`}
                      >
                        {number}
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

export default CompanyListing;

