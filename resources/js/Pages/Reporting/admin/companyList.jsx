import DefaultLayout from "@/layout/defaultLayout";
import { usePage, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { FaChevronDown, FaFilter } from "react-icons/fa";
import Swal from "sweetalert2";

export default function RegisteredEmployerTable({ companies }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState("Latest-to-Old");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Define how many items per page

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

  const handleFilterOpen = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleOptionsClick = (option) => {
    setSelectedOptions(option);
    setIsFilterOpen(false);
    setCurrentPage(1); // Reset to the first page when changing filter
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Filter companies by search term
  const filteredCompanies = companies.filter((company) =>
    company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort companies based on the selected option
  const sortedCompanies = filteredCompanies.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return selectedOptions === "Latest-to-Old" ? dateB - dateA : dateA - dateB;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedCompanies.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCompanies = sortedCompanies.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <DefaultLayout>
      <Head title="Registered Companies List" />
      <div className="bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4">
        <div className="container mx-auto">
          <h1 className="text-lg font-bold leading-tight tracking-tight text-blue-900 md:text-xl mb-2">
            Registered Companies List
          </h1>

          {/* Search and Filter Components */}
          <div className="mt-4">
            <div className="flex justify-center items-center mb-4 relative mt-4">
              <div className="flex items-center w-full max-w-3xl">
                <input
                  type="search"
                  id="default-search"
                  className="block w-full px-10 py-2 pl-10 text-base text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search by entering company name"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  required
                />
                <div className="absolute inset-y-0 left-50 flex items-center pl-3">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div
              className="flex items-center justify-center cursor-pointer mt-2"
              onClick={handleFilterOpen}
            >
              <FaFilter className="text-gray-500" size={18} />
              <p className="text-gray-500 text-sm font-medium ml-2">
                Filter by {selectedOptions}
              </p>
              <FaChevronDown className="text-gray-500 ml-2" size={18} />
              {isFilterOpen && (
                <div className="absolute right-50 mt-28 w-52 bg-white shadow-lg rounded-lg">
                  <ul className="py-1">
                    <li
                      className="text-gray-500 text-sm font-medium p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleOptionsClick("Latest-to-Old")}
                    >
                      Latest-to-Old
                    </li>
                    <li
                      className="text-gray-500 text-sm font-medium p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleOptionsClick("Old-to-Latest")}
                    >
                      Old-to-Latest
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="mx-auto mt-8">
            <table className="border border-gray-900 w-full text-sm text-left rtl:text-right text-gray-500 overflow-x-auto lg:overflow-x-none">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300 border-b border-gray-900 text-center">
                <tr>
                  <th scope="col" className="px-6 py-3">No.</th>
                  <th scope="col" className="px-6 py-3">Company Name</th>
                  <th scope="col" className="px-6 py-3">Business Registration No.</th>
                  <th scope="col" className="px-6 py-3">Business Registration Date</th>
                  <th scope="col" className="px-6 py-3">Rating</th>
                  <th scope="col" className="px-6 py-3">Company Email</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentCompanies.map((company, index) => (
                  <tr
                    key={company.id}
                    className="border-b border-gray-900 odd:bg-white even:bg-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {indexOfFirstItem + index + 1}.
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{company.companyName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{company.businessRegNum}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{company.businessRegDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{company.companyRating}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{company.companyEmail}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={`/admin/employers/${company.id}`}
                        className="text-blue-600 cursor-pointer"
                      >
                        View Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <nav aria-label="Page navigation example" className="mt-6">
            <div className="flex justify-end">
              <ul className="inline-flex flex-wrap -space-x-px text-sm">
                <li>
                  <a
                    href="#"
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`flex items-center justify-center px-4 h-12 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${
                      currentPage === 1 ? "cursor-not-allowed" : ""
                    }`}
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
                      className={`flex items-center justify-center px-4 h-12 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                        currentPage === index + 1
                          ? "text-blue-600 border-blue-300 bg-blue-50"
                          : ""
                      }`}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#"
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`flex items-center justify-center px-3 h-12 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${
                      currentPage === totalPages ? "cursor-not-allowed" : ""
                    }`}
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
