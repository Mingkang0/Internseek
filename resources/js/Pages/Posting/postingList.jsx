import PostingCard from "@/components/postingCard";
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

  return (
    <DefaultLayout>
      <Head title="Internship Postings" />
      <div className="bg-gray-200 px-6 py-12 min-h-screen overflow-y-auto lg:py-4">
        <div className="container mx-auto postings-list">
          <h5 className="text-xl font-bold px-2 py-4 text-blue-800">Internship Postings</h5>
          <div className="flex justify-between w-full h-fit-content ml-2">
            <div className="relative w-full max-w-4xl">
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by entering internship title"
                value={searchQuery}
                onChange={handleSearch}
                required
              />
              <div className="absolute inset-y-0 end-0 flex items-center ps-3 pointer-events-none mr-6">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
            </div>
            <Link href="/internship-postings/create" className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-4 px-4 rounded-lg">+ Post an Internship</Link>
          </div>
          <div className="flex justify-center relative mt-4 gap-20">
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
              {filteredInternships.map((internship) => (
                <PostingCard internship={internship} key={internship.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
