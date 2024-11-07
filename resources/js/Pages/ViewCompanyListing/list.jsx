import React, { useState } from 'react';
import CompanyCard from '@/components/companyListing/companyCard';
import DefaultLayout from '@/layout/defaultLayout';
import { Head } from '@inertiajs/react';

const CompanyListing = ({ companies }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleLocationChange = (event) => {
    const locationValue = event.target.value;
    setLocation(locationValue);
  };

  const handleShowCompanies = () => {
    const filtered = companies
      .filter((company) => {
        return (
          (!keyword || company.companyName.toLowerCase().includes(keyword.toLowerCase())) &&
          (!location || (company?.companyState === location))
        );
      });

      console.log(location);
    setFilteredCompanies(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Calculate the indices for slicing the array
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCompanies.slice(indexOfFirstCard, indexOfLastCard);

  // Generate page numbers
  const totalPages = Math.ceil(filteredCompanies.length / cardsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  }; 4

  return (
    <DefaultLayout>
      <Head title="Company Listing" />
      <div className='bg-gray-200 lg:px-10 px-2 min-h-screen overflow-y-auto lg:py-4'>
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
                value={location}
                onChange={handleLocationChange}
                className="bg-white border border-gray-300 text-gray-900 w-80 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
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
            <div className='col-span-2'>
              <button
                type="button"
                onClick={handleShowCompanies}
                className="text-white mt-4 bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-4 text-center ml-auto"
              >
                Show Companies
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 employer-listing mt-4 gap-8 lg:px-32">
            {currentCards.length > 0 ? (
              currentCards.map((company) => (

                <CompanyCard key={company.id} company={company} className="col-span-1" />
              ))
            ) : (
              <div className='mt-6 col-span-6 text-center'>No companies found that match your search criteria.</div>
            )}
          </div>
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
};

export default CompanyListing;

