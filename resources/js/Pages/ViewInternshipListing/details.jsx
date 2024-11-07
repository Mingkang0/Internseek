'use client';
import React, { useState } from 'react';
import { FaEye, FaTimesCircle } from "react-icons/fa";
import InternshipButtons from '@/components/internshipListing/internshipButtons';
import DefaultLayout from '@/layout/defaultLayout';
import { Head, Link, router } from '@inertiajs/react';
import Modal from '@/components/Modal';
import { usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';

const InternshipDetails = ({ internship, clickCount, bookmarkCount, applicationCount }) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  const company = internship.company;

  const { auth } = usePage().props;
  const isAuthenticated = auth?.user !== null;
  const userRole = auth?.role; // Adjusted to use `auth.role`

  const openReportModal = () => {
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
  };

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
  };

  const handleOtherReasonChange = (event) => {
    setOtherReason(event.target.value);
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const problemDesc = selectedReason === 'Other' ? otherReason : selectedReason;

    // Post the data using Inertia
    router.post(`/report-internship/${internship.id}`, { problemDesc }, {
      onSuccess: () => {
        console.log('Report submitted successfully');
      },
      onError: (errors) => {
        console.log(errors);

        Swal.fire({
          title: 'Error',
          text: 'Sorry, There is an error occurs during submission',
          icon: 'error',
          timer: 3000,
          timerProgressBar: true,
          confirmButtonText: 'OK'
        })
      }
    });
    closeReportModal();
  };

  return (
    <DefaultLayout>
      <Head title={`Internship Details ${internship.internshipTitle}`} />
      <div className='bg-gray-200 px-6 py-12 min-h-screen overflow-y-auto lg:py-4'>
        <div className="container flex flex-wrap justify-center items-center mx-auto">
          <div className="w-full px-6 py-6 mt-4 bg-white border border-gray-200 rounded-lg shadow lg:max-w-5xl lg:w-full">
            <div className='content-end mb-2'>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 flex justify-between">
                Internship Title: {internship.internshipTitle}
                <FaTimesCircle size={24} onClick={handleBack} className="mr-2 text-gray-600 cursor-pointer" />
              </h5>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className='md:mr-2 mx-auto'>
                <img src={`/storage/company/companyLogo/${company.companyLogo}`} alt="CompanyLogo" className="rounded-full w-24 h-24 md:w-28 md:h-28 mx-auto border ring-1 ring-gray-900" />
              </div>
              <div>
                <div className="flex gap-2">
                  <p className="mb-3 font-semibold text-normal text-gray-800">Company Name:  </p>
                  <p className='text-normal text-gray-800'>{company.companyName}</p>
                </div>

                <div className="flex gap-2">
                  <p className="mb-3 font-semibold text-normal text-gray-800"> Location:  </p>
                  <p className='text-normal text-gray-800'>{company.companyCity}, {company.companyState}</p>

                </div>
                {isAuthenticated && userRole === 'student' && (
                  <div className='flex flex-wrap items-center gap-4 justify-center mb-4'>
                    <InternshipButtons id={internship.id} companyID={internship.company.id} onReportClick={openReportModal} />
                  </div>
                )}
                <div className="flex flex-wrap gap-2 md:gap-4">
                  <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">Allowance: RM {internship.internshipAllowance}</span>
                  <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">Internship Period: {internship.internshipDuration} months</span>
                  <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">Working Hour: {internship.workingHour} hours per day</span>
                  <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">{internship.studyScope}</span>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  <span className='flex items-center text-sm font-semibold text-gray-600'>
                    <FaEye className='mr-2' size={20} /> {clickCount} views </span>
                  <span className='flex items-center text-sm font-semibold text-red-800'> {applicationCount} applications </span>
                  <span className='flex items-center text-sm font-semibold text-blue-800'> {bookmarkCount} bookmarks </span>
                </div>
                <div className="mt-4 internship-desc">
                  <h5 className="text-normal font-semibold text-gray-900">Internship Description:</h5>
                  <p className="mt-2 text-normal text-gray-700">{internship.internshipDescription}</p>
                </div>
                <div className="internship-responsibilities mt-4">
                  <h5 className="text-normal mb-2 font-semibold text-gray-900">Internship Responsibilities:</h5>
                  {internship.internshipResponsibility}
                  <ul className='max-w-md ml-2 space-y-1 text-gray-500 list-disc list-inside'>
                  </ul>
                </div>
                <div className="internship-requirements mt-4">
                  <h5 className="text-normal mb-2 font-semibold text-gray-900">Internship Requirements:</h5>
                  {internship.internshipRequirement}
                  <ul className='max-w-md ml-2 space-y-1 text-gray-500 list-disc list-inside'>

                  </ul>
                </div>
                <div className="posting-date flex flex-wrap justify-between">
                  <p className="mt-4 text-sm font-semibold text-gray-900">Posting Date:
                    <span className='ml-2 font-normal'>{internship.startPostingDate}</span></p>
                  <p className="mt-4 text-sm font-semibold text-gray-900 mr-4">Last Apply:
                    <span className='ml-2 font-normal'>{internship.endPostingDate}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal for Report */}
        <Modal show={isReportModalOpen} onClose={closeReportModal}>
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 flex justify-between">Report Internship
              <FaTimesCircle size={20} className="text-gray-600 cursor-pointer" onClick={closeReportModal} />
            </h2>
            <hr className="my-2" />
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Reason for reporting (Choose a problem):
                </label>
                <div className="flex flex-col">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="problemDesc"
                      value="It’s trying to sell something unrelated to the internship"
                      onChange={handleReasonChange}
                    />
                    <span className="ml-2">It’s trying to sell something unrelated to the internship</span>
                  </label>
                  <label className="inline-flex items-center mt-2">
                    <input
                      type="radio"
                      className="form-radio"
                      name="problemDesc"
                      value="It’s offensive and/or discriminatory"
                      onChange={handleReasonChange}
                    />
                    <span className="ml-2">It’s offensive and/or discriminatory</span>
                  </label>
                  <label className="inline-flex items-center mt-2">
                    <input
                      type="radio"
                      className="form-radio"
                      name="problemDesc"
                      value="Asking for money or seems like a fake internship"
                      onChange={handleReasonChange}
                    />
                    <span className="ml-2">Asking for money or seems like a fake internship</span>
                  </label>
                  <label className="inline-flex items-center mt-2">
                    <input
                      type="radio"
                      className="form-radio"
                      name="problemDesc"
                      value="Incorrect Company, Location, or internship details"
                      onChange={handleReasonChange}
                    />
                    <span className="ml-2">Incorrect Company, Location, or internship details</span>
                  </label>
                  <label className="inline-flex items-center mt-2">
                    <input
                      type="radio"
                      className="form-radio"
                      value="Other"
                      onChange={handleReasonChange}
                    />
                    <span className="ml-2">Other</span>
                  </label>
                </div>
              </div>
              {selectedReason === 'Other' && (
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Please specify:
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={4}
                    name="problemDesc"
                    onChange={handleOtherReasonChange}
                    value={otherReason}
                  />
                </div>
              )}
              <div className="mt-4 flex justify-center gap-4">
                <button
                  className="px-4 py-2 bg-blue-900 text-white rounded"
                  onClick={handleSubmit}
                  type="submit"
                >
                  Report
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded"
                  onClick={closeReportModal}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </DefaultLayout>
  );
};

export default InternshipDetails;