import DefaultLayout from "@/layout/defaultLayout";
import { usePage, router, Head } from "@inertiajs/react";
import { FaEnvelope, FaPhoneAlt, FaBriefcase, FaUserTie } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";

export default function UserList({ employers }) {
  const { auth } = usePage().props;

  const [error, setError] = useState({ status: '' });

  const [searchTerm, setSearchTerm] = useState("");
  const [statuses, setStatuses] = useState(
    employers.reduce((acc, employer) => {
      acc[employer.id] = employer.status; // Initialize each employer's status
      return acc;
    }, {})
  );

  // Handle form submission for each employer
  const handleSubmit = (e, employerId) => {
    e.preventDefault();
    const status = statuses[employerId];
    router.post(`/employer/admin/update-status/${employerId}`, { status }, {
      onSuccess: () => {
        Swal.fire({
          title: 'Success',
          text: 'Status updated successfully',
          icon: 'success',
          timer: 4000,
          timerProgressBar: true,
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3085d6',
        });
      },
      onError: (error) => {
        setError('status', error.status);
      },
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Centralize status management for all employers

  console.log(statuses);
  // Update the status for a specific employer
  const handleStatusChange = (employerId, newStatus) => {
    setStatuses({
      ...statuses,
      [employerId]: newStatus
    });
  };


  const filteredEmployers = employers.filter((employer) =>
    `${employer.firstName} ${employer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // Unauthorized access logic
  if (auth.user.userType === 'user') {
    Swal.fire({
      title: 'Unauthorized',
      text: 'You are not authorized to view this page',
      icon: 'error',
      timer: 4000,
      timerProgressBar: true,
      confirmButtonText: 'Ok',
      confirmButtonColor: '#3085d6',
    });
    return null;
  }

  return (
    <DefaultLayout>
      <div className="bg-gray-200 px-6 py-4 min-h-screen mx-auto overflow-y-auto lg:py-4">
        <Head title="Employer List" />
        <h5 className="text-center mb-2 text-lg font-bold tracking-tight text-gray-900">Manage Employer Within Company</h5>

        <div className="flex justify-center items-center mb-6 relative mt-4">
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
              placeholder="Search by entering name"
              value={searchTerm}
              onChange={handleSearchChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center">
          {filteredEmployers.map((employer) => {
            return (
              <div className="mx-auto lg:w-1/3" key={employer.id}>
                <div className="p-5 mb-4 shadow rounded bg-gray-50">
                  <div className="flex justify-between items-center">
                    <h5 className="text-lg font-bold tracking-tight text-gray-900">
                      {employer.firstName} {employer.lastName}
                    </h5>
                    <div className="flex">
                      <p className="text-normal font-semibold text-gray-700">Status:</p>
                      <p className="ml-2 text-normal text-gray-700">{employer.status}</p>
                    </div>
                  </div>
                  <div className="flex mt-4">
                    <FaEnvelope className="text-gray-600" size={20} />
                    <p className="ml-2 text-normal text-gray-900">{employer.email}</p>
                  </div>
                  <div className="flex mt-2">
                    <FaPhoneAlt className="text-gray-600" size={20} />
                    <p className="ml-2 text-normal text-gray-900">{employer.phoneNum}</p>
                  </div>
                  <div className="flex mt-2">
                    <FaBriefcase className="text-gray-600" size={20} />
                    <p className="ml-2 text-normal text-gray-600">{employer.department}</p>
                  </div>
                  <div className="flex mt-2">
                    <FaUserTie className="text-gray-600" size={20} />
                    <p className="ml-2 text-normal text-gray-600">{employer.position}</p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <p className="text-normal font-semibold text-gray-700">Date Joined:</p>
                    <p className="text-normal text-gray-600">{new Date(employer.created_at).toISOString().split('T')[0]}</p>
                  </div>
                  <form onSubmit={(e) => handleSubmit(e, employer.id)}>
                    <div className="flex items-center justify-between mt-3">
                      <select
                        className="border border-gray-300 rounded-md p-2"
                        value={statuses[employer.id]}
                        onChange={(e) => handleStatusChange(employer.id, e.target.value)}
                      >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                      <button
                        type="submit"
                        className="bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg ml-2"
                      >
                        Update Status
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            );
          })}
          {filteredEmployers.length === 0 && (
            <div className="text-center mt-4 w-full">
              <p className="text-gray-700 font-semibold">There are no users available</p>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}
