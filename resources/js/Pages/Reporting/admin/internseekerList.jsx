import DefaultLayout from "@/layout/defaultLayout";
import { useState } from "react";


export default function RegisteredInternseekerTable({ internseekers }) {
  const [searchTerm, setSearchTerm] = useState("");


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredInternseekers = internseekers.filter(internseeker =>
    `${internseeker.firstName} ${internseeker.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DefaultLayout>
      <div className="bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4">
    <div className="container mx-auto">
      <h1 className="text-lg font-bold leading-tight tracking-tight text-blue-900 md:text-xl mb-2">Registered Employers List</h1>
        <div className="flex items-center relative w-full max-w-2xl">
          <input
            type="search"
            id="default-search"
            className="block w-full px-10 py-2 pl-10text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
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
      <div className="border border-gray-900 mx-auto mt-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
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
            {filteredInternseekers.map((internseeker, index) => (
              <tr key={internseeker.id} className="border-b odd:bg-white even:bg-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}.</td>
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
    </div>
    </div>
    </DefaultLayout>
  );
}