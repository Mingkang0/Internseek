'use client';
import React, { useState } from 'react';
import { FaEye, FaTimesCircle } from "react-icons/fa";
import InternshipButtons from '@/components/internshipButtons';
import DefaultLayout from '@/layout/defaultLayout';
import { Head, Link } from '@inertiajs/react';
import Modal from '@/components/Modal';
import { usePage } from '@inertiajs/react';

const InternshipDetails = ({ internship, clickCount, bookmarkCount }) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  const employer = internship.employer;

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

  const handleSubmit = () => {
    onSubmit(internshipId, selectedReason, otherReason);
  };

  return (
    <DefaultLayout>
      <Head title={`Internship Details ${internship.internshipTitle}`} />
      <div className='bg-gray-200 px-6 py-12 min-h-screen overflow-y-auto lg:py-4'>
        <div className="container flex justify-center items-center">
          <div className="w-full px-6 py-6 mt-4 bg-white border border-gray-200 rounded-lg shadow">
            <div className="grid grid-cols-10 gap-4">
              <div className="col-span-1">
                <img src="../../assets/avatar.png" alt="CompanyLogo" className="w-100 h-100 rounded-full mx-auto border ring-1 ring-gray-900" />
              </div>
              <div className="col-span-9">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 flex justify-between">
                  {internship.internshipTitle}
                  <Link href='/internships'>
                    <FaTimesCircle size={20} className="mr-2 text-gray-600 cursor-pointer" />
                  </Link>
                </h5>
                <p className="mb-3 font-semibold text-normal text-gray-700">
                  {employer.companyName}
                </p>
                <p className="mb-3 font-semibold text-normal text-gray-700">
                  {employer.companyCity}, {employer.companyState}
                </p>
                {isAuthenticated && userRole === 'student' && (
                <div className='flex flex-wrap items-center gap-4 justify-center mb-4'>
                  <InternshipButtons id={internship.id} onReportClick={openReportModal} />
                </div>
                )}
                <div className="flex flex-wrap gap-2 md:gap-4">
                  <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">Allowance: RM {internship.internshipAllowance}</span>
                  <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">Internship Period: {internship.internshipPeriod} months</span>
                  <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">Working Hour: {internship.workingHour} hours per day</span>
                  <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">{internship.studyScope}</span>
                </div>
                <div className="flex gap-4 mt-4">
                  <span className='flex items-center text-sm font-semibold text-gray-600'>
                    <FaEye className='mr-2' size={20} /> {clickCount} views </span>
                  <span className='flex items-center text-sm font-semibold text-red-800'> {internship.bookmark} applications </span>
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
                <div className="posting-date flex justify-between">
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
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Reason for reporting (Choose a problem):
                  </label>
                  <div className="flex flex-col">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio"
                        name="reason"
                        value="It’s trying to sell something unrelated to the internship"
                        onChange={handleReasonChange}
                      />
                      <span className="ml-2">It’s trying to sell something unrelated to the internship</span>
                    </label>
                    <label className="inline-flex items-center mt-2">
                      <input
                        type="radio"
                        className="form-radio"
                        name="reason"
                        value="It’s offensive and/or discriminatory"
                        onChange={handleReasonChange}
                      />
                      <span className="ml-2">It’s offensive and/or discriminatory</span>
                    </label>
                    <label className="inline-flex items-center mt-2">
                      <input
                        type="radio"
                        className="form-radio"
                        name="reason"
                        value="Asking for money or seems like a fake internship"
                        onChange={handleReasonChange}
                      />
                      <span className="ml-2">Asking for money or seems like a fake internship</span>
                    </label>
                    <label className="inline-flex items-center mt-2">
                      <input
                        type="radio"
                        className="form-radio"
                        name="reason"
                        value="Incorrect Company, Location, or internship details"
                        onChange={handleReasonChange}
                      />
                      <span className="ml-2">Incorrect Company, Location, or internship details</span>
                    </label>
                    <label className="inline-flex items-center mt-2">
                      <input
                        type="radio"
                        className="form-radio"
                        name="reason"
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
                      onChange={handleOtherReasonChange}
                      value={otherReason}
                    />
                  </div>
                )}
                <div className="mt-4 flex justify-center gap-4">
                  <button
                    className="px-4 py-2 bg-blue-900 text-white rounded"
                    onClick={handleSubmit}
                    type="button"
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