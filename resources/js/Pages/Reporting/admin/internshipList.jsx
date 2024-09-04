import { FaChevronDown, FaFilter } from "react-icons/fa";
import { useState } from "react";
import DefaultLayout from "@/layout/defaultLayout";
import { Head } from "@inertiajs/react";

export default function AvailableInternshipsTable({ internships }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState('Latest-to-Old');
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterOpen = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleOptionsClick = (option) => {
    setSelectedOptions(option);
    setIsFilterOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredInterships = internships.filter(internship =>
    internship.internshipTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    internship.employer.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

    // Sort internships based on selected option
    const sortedInternships = filteredInterships.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      
      return selectedOptions === 'Latest-to-Old' ? dateB - dateA : dateA - dateB;
    });

    
  return (
    <DefaultLayout>
      <Head title="Available Internships List" />
      <div className="bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4">
        <div className="container mx-auto">
          <div>
            <h1 className="text-lg font-bold leading-tight tracking-tight text-blue-900 md:text-xl mb-2">Available Internships List</h1>
            <div className="flex justify-center items-center mb-4 relative mt-4">
              <div className="flex items-center w-full max-w-3xl">
                <input
                  type="search"
                  id="default-search"
                  className="block w-full px-10 py-2 pl-10 text-base text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search by entering internship title or company name"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  required
                />
                <div className="absolute inset-y-0 left-50 flex items-center pl-3">
                  <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
              </div>



            </div>
            <div className='flex items-center justify-center justify-center cursor-pointer mt-2' onClick={handleFilterOpen}>
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
          </div>
          <div className="border border-gray-900 mx-auto mt-8">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300 border-b border-gray-900 text-center">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Company Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Internship Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Allowance (RM)
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Start Posting Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    End Posting Date
                  </th>
                  <th>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedInternships.map((internship, index) => {
                  const employer = internship.employer;

                  return (
                    <tr key={internship.id} className="border-b odd:bg-white even:bg-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{employer?.companyName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{internship.internshipTitle}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{internship.internshipAllowance}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{internship.startPostingDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{internship.endPostingDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap"> <a href={`/admin/internships/${internship.id}`} className="text-blue-600 cursor-pointer">View Details</a></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}