'use client';
import React, { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { FaUser, FaCaretDown, FaBuilding, FaBell } from 'react-icons/fa';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";



export default function Navbar() {
  const [dropdownNavbar, setDropdownNavbar] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isNotificationClicked, setIsNotificationClicked] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const { auth } = usePage().props;
  const isAuthenticated = auth?.user !== null;
  const userRole = auth?.role; // Adjusted to use `auth.role`

  console.log('auth', auth);

  const handleDropdownNavbar = () => {
    setDropdownNavbar(!dropdownNavbar);
  };

  const openRegistration = () => {
    setIsRegistrationOpen(true);
  };

  const closeRegistration = () => {
    setIsRegistrationOpen(false);
  };

  const openLogin = () => {
    setIsLoginOpen(true);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  const handleStudentViewMessages = () => {
    router.get('/student/receivedMessages/list');
  }

  const handleEmployerViewMessages = () => {
    router.get('/employer/receivedMessages/list');
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  }


  const handleClickOutside = (event) => {
    const employerModal = document.getElementById('employer-registration-modal');
    const studentModal = document.getElementById('student-registration-modal');

    if (employerModal && !employerModal.contains(event.target) && studentModal && !studentModal.contains(event.target)) {
      closeRegistration();
    }
  };

  const handleClickOutsideLogin = (event) => {
    const employerLoginModal = document.getElementById('employer-login-modal');
    const studentLoginModal = document.getElementById('student-login-modal');
    const adminLoginModal = document.getElementById('admin-login-modal');

    if (employerLoginModal && !employerLoginModal.contains(event.target) && studentLoginModal && !studentLoginModal.contains(event.target) && adminLoginModal && !adminLoginModal.contains(event.target)) {
      closeLogin();
    }
  };

  useEffect(() => {
    if (isRegistrationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isRegistrationOpen]);

  useEffect(() => {
    if (isLoginOpen) {
      document.addEventListener('mousedown', handleClickOutsideLogin);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideLogin);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideLogin);
    };
  }
    , [isLoginOpen]);


  return (
    <nav className={`sticky top-0 border-gray-300 ${userRole === 'employer' ? 'bg-yellow-300' : userRole === 'student' ? 'bg-blue-100' : userRole === 'admin' ? 'bg-white' : 'bg-blue-100'} border-b w-full`}>
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-2">
        <div className="flex items-center md:space-x-4 md:space-x-6 rtl:space-x-reverse">
          {/* Mobile menu button */}
          <button onClick={toggleMobileMenu} className="md:hidden lg:mr-0 text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
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
                  <a href="/student/my-internships" className="text-sm font-bold text-gray-900">My Internships</a>
                </>
              )}

              {userRole === 'employer' && (
                <>
                  {auth.user.company && auth.user.company.registrationStatus === 'Approved' && auth.user.status === 'Active' && (
                    <>
                      <a href="/internship-postings" className="text-sm font-bold text-gray-900">Internship Posted</a>
                      <a href="/internship-applications/list" className="text-sm font-bold text-gray-900">Applicants</a>
                      <a href="/interviews-applicants/list" className="text-sm font-bold text-gray-900">Interview List</a>
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

        <div className="flex items-center space-x-4 rtl:space-x-reverse mr-2 lg:mr-0">
          {isAuthenticated ? (
            <>
              {userRole === 'employer' && (
                <>
                  {auth.user.company && auth.user.company.registrationStatus === 'Inquiry' && (
                    <div className='relative z-10'>
                      <FaBell size={24} className='cursor-pointer relative mr-2'
                        onClick={() => setIsNotificationClicked(!isNotificationClicked)}
                      />

                      {auth.notifications.length > 0 && (
                        <span className="absolute top-1 left-4 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                          {auth.notifications.length}
                        </span>
                      )}

                      {/* Tooltip for Hover */}
                      {isNotificationClicked && (
                        <div className="absolute text-center top-8 z-50 right-0 bg-white text-gray-900 text-sm py-2 px-4 w-80 rounded-md shadow-lg">
                          <div className="flex justify-between p-1 items-center">
                            <span className="text-gray-900 font-semibold text-lg">Notifications</span>
                            <Link method='post' href="/employer/notifications/markAsRead" className="text-blue-900">Mark all as Read</Link>
                          </div>
                          {auth.notifications.length > 0 ? (
                            <div>
                              <ul className='overflow-y-auto h-96'>
                                {auth.notifications.map((notification, index) => (
                                  <li key={notification.id} className="my-1 w-full p-3 bg-white text-sm text-left rounded-md border border-gray-300">
                                    <p>{index + 1}.  {JSON.parse(notification.data).message} </p>
                                    <p className="text-xs text-gray-500 text-right">    {new Date(notification.created_at).toLocaleString('en-US', {
                                      year: 'numeric',
                                      month: '2-digit',
                                      day: '2-digit',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      second: '2-digit',
                                      hour12: true,
                                    })}
                                    </p>
                                  </li>
                                ))}
                              </ul>
                              <hr className='h-px my-2 bg-gray-200'></hr>
                              <a href="/employer/notifications" className="text-blue-900">View All Notifications</a>
                            </div>
                          ) : (
                            <>
                              <span>You have no unread notifications</span>
                              <hr className='h-px my-2 bg-gray-200'></hr>
                              <a href="/employer/notifications" className="text-blue-900">View All Notifications</a>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  {auth.user.company && auth.user.company.registrationStatus === 'Approved' && auth.user.status === 'Active' && (
                    <>
                      <div className='relative'>
                        <FaBell size={24} className='cursor-pointer relative mr-2'
                          onClick={() => setIsNotificationClicked(!isNotificationClicked)}
                        />

                        {auth.notifications.length > 0 && (
                          <span className="absolute top-1 left-4 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                            {auth.notifications.length}
                          </span>
                        )}

                        {/* Tooltip for Hover */}
                        {isNotificationClicked && (
                          <div className="absolute text-center top-8 right-0 z-50 bg-white text-gray-900 text-sm py-2 px-4 w-80 rounded-md shadow-lg">
                            <div className="flex justify-between p-1 items-center">
                              <span className="text-gray-900 font-semibold text-lg">Notifications</span>
                              <Link method='post' href="/employer/notifications/markAsRead" className="text-blue-900">Mark all as Read</Link>
                            </div>
                            {auth.notifications.length > 0 ? (
                              <div>
                                <ul className='overflow-y-auto h-96'>
                                  {auth.notifications.map((notification, index) => (
                                    <li key={notification.id} className="my-1 w-full p-3 bg-white text-sm text-left rounded-md border border-gray-300">
                                      <p>{index + 1}.  {JSON.parse(notification.data).message} </p>
                                      <p className="text-xs text-gray-500 text-right">    {new Date(notification.created_at).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        hour12: true,
                                      })}
                                      </p>
                                    </li>
                                  ))}
                                </ul>
                                <hr className='h-px my-2 bg-gray-200'></hr>
                                <a href="/employer/notifications" className="text-blue-900">View All Notifications</a>
                              </div>
                            ) : (
                              <>
                                <span>You have no unread notifications</span>
                                <hr className='h-px my-2 bg-gray-200'></hr>
                                <a href="/employer/notifications" className="text-blue-900">View All Notifications</a>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                      {/* Icon with onClick */}
                      <div className='relative'>
                        <IoChatbubbleEllipses
                          size={24}
                          className="cursor-pointer relative"
                          onClick={handleEmployerViewMessages}
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        />

                        {/* Red Dot for Unread Messages Count */}
                        {auth.unreadMessagesCount > 0 && (
                          <span className="absolute top-1 left-4 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                            {auth.unreadMessagesCount}
                          </span>
                        )}



                        {/* Tooltip for Hover */}
                        {isHovered && (
                          <div className="absolute text-center top-8 left-0 bg-gray-800 text-white text-sm py-1 px-6 w-52 rounded-lg shadow-lg">
                            {auth.unreadMessagesCount > 0 ? (
                              <span>
                                You have {auth.unreadMessagesCount} unread {auth.unreadMessagesCount === 1 ? 'message' : 'messages'}
                              </span>
                            ) : (
                              <span>You have no unread messages</span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="w-px h-8 bg-gray-900 hidden lg:block"></div>
                      <div className="lg:flex items-center space-x-2 hidden">
                        <FaBuilding size={24} />
                        <p className="text-sm font-medium ml-2">

                          {auth.user.company.companyName}
                        </p>
                      </div>
                      <div className="w-px h-8 bg-gray-900 hidden lg:block"></div>
                    </>
                  )}
                </>
              )}

              {
                userRole === 'student' && (
                  <>
                    <div className='relative'>
                      <FaBell size={24} className='cursor-pointer relative mr-2'
                        onClick={() => setIsNotificationClicked(!isNotificationClicked)}
                      />

                      {auth.notifications.length > 0 && (
                        <span className="absolute top-1 left-4 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                          {auth.notifications.length}
                        </span>
                      )}

                      {/* Tooltip for Hover */}

                      {isNotificationClicked && (
                        <div className="absolute text-center z-50 top-8 right-0 bg-white text-gray-900 text-sm py-2 px-4 w-80 rounded-md shadow-lg">
                          <div className="flex justify-between p-1 items-center">
                            <span className="text-gray-900 font-semibold text-lg">Notifications</span>
                            <Link method='post' href="/student/notifications/markAsRead" className="text-blue-900">Mark all as Read</Link>
                          </div>
                          {auth.notifications.length > 0 ? (
                            <div>
                              <ul className='overflow-y-auto h-96'>
                                {auth.notifications.map((notification, index) => (
                                  <li key={notification.id} className="my-1 w-full p-3 bg-white text-sm text-left rounded-md border border-gray-300">
                                    <p>{index + 1}.  {JSON.parse(notification.data).message} </p>
                                    <p className="text-xs text-gray-500 text-right">    {new Date(notification.created_at).toLocaleString('en-US', {
                                      year: 'numeric',
                                      month: '2-digit',
                                      day: '2-digit',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      second: '2-digit',
                                      hour12: true,
                                    })}
                                    </p>
                                  </li>
                                ))}
                              </ul>
                              <hr className='h-px my-2 bg-gray-200'></hr>
                              <a href="/student/notifications" className="text-blue-900">View All Notifications</a>
                            </div>
                          ) : (
                            <>
                              <span>You have no unread notifications</span>
                              <hr className='h-px my-2 bg-gray-200'></hr>
                              <a href="/student/notifications" className="text-blue-900">View All Notifications</a>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="relative">

                      {/* Icon with onClick */}
                      <IoChatbubbleEllipses
                        size={24}
                        className="cursor-pointer relative"
                        onClick={handleStudentViewMessages}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}

                      />

                      {/* Red Dot for Unread Messages Count */}
                      {auth.unreadMessagesCount > 0 && (
                        <span className="absolute top-1 left-4 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                          {auth.unreadMessagesCount}
                        </span>
                      )}

                      {/* Tooltip for Hover */}
                      {isHovered && (
                        <div className="absolute text-center top-8 right-0 bg-gray-800 text-white text-sm py-1 px-6 w-52 rounded-lg shadow-lg">
                          {auth.unreadMessagesCount > 0 ? (
                            <span>
                              You have {auth.unreadMessagesCount} unread {auth.unreadMessagesCount === 1 ? 'message' : 'messages'}
                            </span>
                          ) : (
                            <span>You have no unread messages</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="w-px h-8 bg-gray-900 hidden lg:block"></div>
                  </>
                )
              }

              <div className="relative flex items-center space-x-2 hidden lg:block">
                <button onClick={handleDropdownNavbar} aria-haspopup="true" aria-controls="dropdownNavbar" aria-expanded={dropdownNavbar}
                  id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-center text-gray-900">
                  <FaUser size={20} />
                  <span className="text-sm font-medium ml-2"> {auth.user.email}</span>
                  <FaCaretDown size={18} />
                </button>

                {dropdownNavbar && (
                  <div id="dropdownNavbar" className="absolute right-0 top-8 z-40 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                    <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownLargeButton">
                      {userRole === 'student' && (
                        <>
                          <li><a href="/student/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</a></li>
                          <li><a href="/student/my-report" className="block px-4 py-2 hover:bg-gray-100">My Report</a></li>
                          <li><a href="/student/my-industrial-training/acceptedOffers" className="block px-4 py-2 hover:bg-gray-100">Industrial Training</a></li>
                          <li><a href="/student/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</a></li>
                        </>
                      )}

                      {userRole === 'employer' && auth.user.company && auth.user.company.registrationStatus === 'Approved' && auth.user.status === 'Active' && (
                        <>
                          <li><a href="/employer/profileDetails" className="block px-4 py-2 hover:bg-gray-100">Company Profile</a></li>
                          <li><a href="/employer/branch-details" className="block px-4 py-2 hover:bg-gray-100">Branch & Site Info</a></li>
                          <li><a href="/employer/my-report" className="block px-4 py-2 hover:bg-gray-100">My Report</a></li>
                        </>
                      )}
                      {userRole === 'employer' && (
                        <>
                          <li><a href="/employer-details" className="block px-4 py-2 hover:bg-gray-100">Employer Details</a></li>
                        </>
                      )}

                      {userRole === 'employer' && auth.user.company && auth.user.company.registrationStatus === 'Approved' && auth.user.userType === 'admin'
                        && (
                          <>
                            <li><a href="/employer/admin/userManagement" className="block px-4 py-2 hover:bg-gray-100">Manage User</a></li>
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
              <button onClick={() => { openRegistration() }} className="text-gray-900 bg-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 lg:px-4 py-2">
                Sign Up
              </button>
              <button onClick={() => { openLogin() }} className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-6 py-2 text-center">
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
      {/* Student Registration Modal */}
      {isRegistrationOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col lg:flex-row p-4 md:p-5 gap-8 justify-center items-center">
            <div id="student-registration-modal" className="bg-white rounded-2xl shadow w-full lg:w-96 mx-auto h-48 flex flex-col justify-center items-center p-4">
              <label htmlFor="student-registration" className="gap-4 text-center">
                <div className="w-full font-bold text-xl text-gray-900">Student Registration</div>
                <Link method="get" href="/register/student" className="inline-flex mt-8 justify-center text-white bg-gradient-to-r text-lg from-blue-800 via-blue-900 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-3 text-center me-2 mb-2">
                  SIGN UP <FaArrowUpRightFromSquare size={18} className="inline-block ml-4" />
                </Link>
              </label>
            </div>
            <div id="employer-registration-modal" className="bg-white rounded-2xl shadow w-full lg:w-96 mx-auto h-48 flex flex-col justify-center items-center p-4">
              <label htmlFor="employer-registration" className="gap-4 text-center">
                <div className="w-full font-bold text-xl text-gray-900 text-center">Employer Registration</div>
                <Link method="get" href="/register/employer" className="inline-flex mt-8 justify-center text-white bg-gradient-to-r text-lg from-blue-800 via-blue-900 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-3 text-center me-2 mb-2">
                  SIGN UP <FaArrowUpRightFromSquare size={18} className="inline-block ml-4" />
                </Link>
              </label>
            </div>
          </div>
        </div>
      )}


      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col lg:flex-row p-4 md:p-5 gap-8 lg:gap-4 justify-center items-center w-full">
            <div id="student-login-modal" className="bg-white rounded-2xl shadow p-4 w-full max-w-lg md:max-w-xl lg:max-w-2xl h-48 flex flex-col justify-center items-center">
              <label htmlFor="student-login" className="gap-4 text-center">
                <div className="w-full font-bold text-xl text-gray-900">Student</div>
                <Link method="get" href="/login/student" className="inline-flex mt-8 justify-center text-white bg-gradient-to-r text-lg from-blue-800 via-blue-900 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-3 text-center me-2 mb-2">
                  SIGN IN <FaArrowUpRightFromSquare size={18} className="inline-block ml-4" />
                </Link>
              </label>
            </div>

            <div id="employer-login-modal" className="bg-white rounded-2xl shadow p-4 w-full max-w-lg md:max-w-xl lg:max-w-2xl h-48 flex flex-col justify-center items-center">
              <label htmlFor="employer-login" className="gap-4 text-center">
                <div className="w-full font-bold text-xl text-gray-900 text-center">Employer</div>
                <Link method="get" href="/login/employer" className="inline-flex mt-8 justify-center text-white bg-gradient-to-r text-lg from-blue-800 via-blue-900 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-3 text-center me-2 mb-2">
                  SIGN IN <FaArrowUpRightFromSquare size={18} className="inline-block ml-4" />
                </Link>
              </label>
            </div>

            <div id="admin-login-modal" className="bg-white rounded-2xl shadow mx-auto p-4 w-full max-w-lg md:max-w-xl lg:max-w-80 h-48 flex flex-col justify-center items-center">
              <label htmlFor="admin-login" className="gap-4 text-center">
                <div className="w-full font-bold text-xl text-gray-900 text-center">System Administrator</div>
                <Link method="get" href="/login/admin" className="inline-flex mt-8 justify-center text-white bg-gradient-to-r text-lg from-blue-800 via-blue-900 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-3 text-center me-2 mb-2">
                  SIGN IN <FaArrowUpRightFromSquare size={18} className="inline-block ml-4" />
                </Link>
              </label>
            </div>
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="relative md:hidden fixed z-100 top-15 left-0 w-full bg-white border-b border-gray-200 drop-shadow rounded-sm">
          <div className="flex flex-col p-2">
            {isAuthenticated ? (
              <>
                {/* Student Navigation */}
                {userRole === 'student' ? (
                  <>
                    <a href="/internships" className="text-sm font-semibold py-2">Search Internship</a>
                    <a href="/companies" className="text-sm font-semibold py-2">Search Company</a>
                    <a href="/student/my-internships" className="text-sm font-semibold py-2">My Internships</a>
                    <a href="/student/profile" className="text-sm font-semibold py-2">My Profile</a>
                    <a href="/student/my-report" className="text-sm font-semibold py-2">My Report</a>
                    <a href="/student/my-industrial-training/acceptedOffers" className="text-sm font-semibold py-2">Industrial Training</a>
                    <a href="/student/settings" className="text-sm font-semibold py-2">Settings</a>
                    <hr className='h-px mt-2 mb-1 bg-gray-200'></hr>
                    <Link method="post" href="/logout" className="text-sm text-gray-500 font-bold py-2">Sign out</Link>
                  </>
                ) : userRole === 'employer' ? (
                  <>
                    {auth.user.company && auth.user.company.registrationStatus === 'Approved' && (
                      <>
                        <a href="/internship-postings" className="text-sm font-semibold py-2">Internship Posted</a>
                        <a href="/internship-applications/list" className="text-sm font-semibold py-2">Applicants</a>
                        <a href="/interviews-applicants/list" className="text-sm font-semibold py-2">Interview List</a>
                        <a href="/employer/profileDetails" className="text-sm font-semibold py-2">Company Profile</a>
                        <a href="/employer/branch-details" className="text-sm font-semibold py-2">Branch & Site Info</a>
                        <a href="/employer/my-report" className="text-sm font-semibold py-2">My Report</a>
                      </>
                    )}
                    <a href="/employer-details" className="text-sm font-semibold py-2">Employer Details</a>
                    <hr className='h-px mt-2 mb-1 bg-gray-200'></hr>
                    <Link method="post" href="/logout" className="text-sm text-gray-500 font-bold py-2">Sign out</Link>
                  </>
                ) : userRole === 'admin' ? (
                  <>
                    <a href="/admin/employers" className="text-sm font-semibold py-2">Employer List</a>
                    <a href="/admin/internseekers" className="text-sm font-semibold py-2">Internseeker List</a>
                    <a href="/admin/internships" className="text-sm font-semibold py-2">Internship List</a>
                    <a href="/admin/profile" className="text-sm font-semibold py-2">My Profile</a>
                    <hr className='h-px mt-2 mb-1 bg-gray-200'></hr>
                    <Link method="post" href="/logout" className="text-sm text-gray-700 font-semibold py-2">Sign out</Link>
                  </>
                ) : (
                  <>
                    <a href="/internships" className="text-sm font-semibold py-2">Search Internship</a>
                    <a href="/companies" className="text-sm font-semibold py-2">Search Company</a>
                  </>
                )}
              </>
            ) : (
              <>
                {/* Links for unauthenticated users */}
                <a href="/internships" className="text-sm block px-4 py-2 hover:bg-gray-100">Search Internship</a>
                <a href="/companies" className="text-sm block px-4 py-2 hover:bg-gray-100">Search Company</a>
              </>
            )}
          </div>
        </div>
      )}

    </nav>
  );
}
