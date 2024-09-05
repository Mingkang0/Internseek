'use client';
import React, { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { FaUser, FaCaretDown, FaBuilding, FaBell } from 'react-icons/fa';
import { IoChatbubbleEllipses } from 'react-icons/io5';



export default function Navbar() {
  const [dropdownNavbar, setDropdownNavbar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { auth } = usePage().props;
  const isAuthenticated = auth?.user !== null;
  const userRole = auth?.role; // Adjusted to use `auth.role`


  const handleDropdownNavbar = () => {
    setDropdownNavbar(!dropdownNavbar);
  };

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleViewMessages = () => {
    router.get('/receivedMessages/list');
  }

  return (
    <nav className={`sticky top-0 border-gray-300 ${userRole === 'employer' ? 'bg-yellow-300' : userRole === 'student' ? 'bg-blue-100' : userRole === 'admin' ? 'bg-white' : 'bg-blue-100'} border-b w-full`}>
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-2">
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          {!isAuthenticated ? (
            <a href="/" className="flex items-center rtl:space-x-reverse">
              <img src="../../assets/logo.png" className="w-32 ml-2 h-auto" alt="Internseek Logo" />
            </a>
          ) : isAuthenticated && userRole === 'student' ? (
            <a href="/internships" className="flex items-center rtl:space-x-reverse">
              <img src="../../assets/logo.png" className="w-32 ml-2 h-auto" alt="Internseek Logo" />
            </a>
          ) : isAuthenticated && userRole === 'employer' ? (
            <a href="/employer/dashboard" className="flex items-center rtl:space-x-reverse">
              <img src="../../assets/logo.png" className="w-32 ml-2 h-auto" alt="Internseek Logo" />
            </a>
          ) :
            <a href="/admin/dashboard" className="flex items-center rtl:space-x-reverse">
              <img src="../../assets/logo.png" className="w-32 ml-2 h-auto" alt="Internseek Logo" />
            </a>
          }

          {isAuthenticated ? (
            <div className="hidden md:flex space-x-6 rtl:space-x-reverse">
              {userRole === 'student' && (
                <>
                  <a href="/internships" className="text-sm font-bold text-gray-900">Search Internship</a>
                  <a href="/companies" className="text-sm font-bold text-gray-900">Search Company</a>
                  <a href="/my-internships" className="text-sm font-bold text-gray-900">My Internships</a>
                </>
              )}

              {userRole === 'employer' && (
                <>
                {auth.user.employer && auth.user.employer.registrationStatus ==='Approved' && (
                <>
                  <a href="#" className="text-sm font-bold text-gray-900">Internship Posted</a>
                  <a href="#" className="text-sm font-bold text-gray-900">Applicants</a>
                  <a href="#" className="text-sm font-bold text-gray-900">Interview List</a>
                </>
                )}
                </>
              )}

              {userRole === 'admin' && (
                <>
                  <a href="/admin/employers" className="text-sm font-bold text-gray-900">Employer List</a>
                  <a href="/admin/internseekers" className="text-sm font-bold text-gray-900">Internseeker List</a>
                  <a href="/admin/internships" className="text-sm font-bold text-gray-900">Internship List</a>
                </>
              )}
            </div>
          ) : (
            <div className="hidden md:flex space-x-6 rtl:space-x-reverse">
              <a href="/internships" className="text-sm font-bold text-gray-900">Search Internship</a>
              <a href="/companies" className="text-sm font-bold text-gray-900">Search Company</a>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {isAuthenticated ? (
            <>
              {userRole === 'employer' && (
                <>
                 {auth.user.employer && auth.user.employer.registrationStatus ==='Approved' && (
                  <>
                  <FaBell size={24} className='cursor-pointer mr-2' />
                  <IoChatbubbleEllipses size={24} className='cursor-pointer' onClick={handleViewMessages} />
                  <div className="w-px h-8 bg-gray-900"></div>
                  <div className="flex items-center space-x-2">
                    <FaBuilding size={24} />
                    <p className="text-sm font-medium ml-2">
                   
                    {auth.user.employer.companyName}
                    </p>
                  </div>
                  <div className="w-px h-8 bg-gray-900"></div>
                  </>
                )}
                </>
              )}

              {
                userRole === 'student' && (
                  <>
                    <IoChatbubbleEllipses size={24} className="cursor-pointer" onClick={handleViewMessages} />
                    <div className="w-px h-8 bg-gray-900"></div>
                  </>
                )
              }

              <div className="flex items-center space-x-2">
                <button onClick={handleDropdownNavbar} aria-haspopup="true" aria-controls="dropdownNavbar" aria-expanded={dropdownNavbar}
                  id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-center text-gray-900">
                  <FaUser size={20} />
                  <span className="text-sm font-medium ml-2"> {auth.user.email}</span>
                  <FaCaretDown size={18} />
                </button>

                {dropdownNavbar && (
                  <div id="dropdownNavbar" className="absolute right-0 top-full z-40 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                    <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownLargeButton">
                      {userRole === 'student' && (
                        <>
                          <li><a href="/student/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</a></li>
                          <li><a href="/student/my-report" className="block px-4 py-2 hover:bg-gray-100">My Report</a></li>
                          <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Industrial Training</a></li>
                          <li><a href="/student/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</a></li>
                        </>
                      )}

                      {userRole === 'employer' && auth.user.employer && auth.user.employer.registrationStatus === 'Approved' && (
                        <>
                          <li><a href="/employer/profileDetails" className="block px-4 py-2 hover:bg-gray-100">Company Profile</a></li>
                          <li><a href="/employer/branch-details" className="block px-4 py-2 hover:bg-gray-100">Branch & Site Info</a></li>
                          <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">My Report</a></li>
                        </>
                      )}
                      {userRole === 'employer' && (
                        <>
                          <li><a href="/contact-person-details" className="block px-4 py-2 hover:bg-gray-100">Contact Person Details</a></li>
                        </>
                      )}

                      {userRole === 'admin' && (
                        <>
                          <li><a href="/admin/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</a></li>
                        </>
                      )}
                    </ul>
                    <div className="py-1">
                      <Link method="post" href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold">Sign out</Link>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button onClick={() => { openModal() }} className="text-gray-900 bg-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2">
                Register
              </button>
              <Link method="get" href='/login' className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2 text-center">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
      {/* Student Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-lg font-semibold text-gray-900">
                  Account Registration
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="select-modal" onClick={closeModal}>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <ul className="space-y-4 mb-2">
                  <li>
                  <Link method="get" href="/register/student" className="block">
                    <label HTMLFor="student-registration" className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100">
                        <div className="w-full text-lg font-semibold">Student Registration</div>
                      <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" /></svg>
                    </label>
                    </Link>
                  </li>
                  <li>
                  <Link method="get" href="/register/employer" className="block">
                    <label for="employer-registration" className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100">
                        <div className="w-full text-lg font-semibold">Employer Registration</div>
                      <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" /></svg>
                    </label>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

    </nav>
  );
}
