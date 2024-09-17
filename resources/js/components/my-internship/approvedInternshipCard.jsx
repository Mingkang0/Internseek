import { FaBookmark, FaEye } from 'react-icons/fa';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { MdChatBubbleOutline } from 'react-icons/md';
import Swal from 'sweetalert2';

const ApprovedInternshipCard = ({ approved }) => {
  const internship = approved.internship;
  const employer = internship.employer;

  const [isModalOpen, setModalOpen] = useState(false);
  const [reasonRejected, setReasonRejected] = useState('');

  // Handle Cancel button click - Open modal
  const handleRejectClick = () => {
    setModalOpen(true);
  };

  // Handle modal close
  const closeModal = () => {
    setModalOpen(false);
  };

  // Handle form submission for cancellation
  const handleRejectSubmit = (e) => {
    e.preventDefault();
    // Send the reasonRejected to the backend (assuming you have an endpoint)
    router.post(`/student/update-offer-status/${approved.id}`, {
      applicationStatus: 'Rejected',
      reasonRejected,
    });

    // Close modal after submission
    setModalOpen(false);
  };

  return (
    <div className="w-full p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex items-center justify-end gap-2 mb-2 md:mb-0">
        <span className="text-base font-semibold text-gray-600">Status: </span>
        <p className="text-base font-medium text-gray-600">Approved</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {/* Company Logo */}
        <div className="flex justify-center md:justify-start">
          <img
            src={`/storage/company/companyLogo/${employer.companyLogo}`}
            alt="Company Logo"
            className="rounded-full w-24 h-24 md:w-28 md:h-28 border ring-1 ring-gray-900"
          />
        </div>

        {/* Internship Information */}
        <div className="flex flex-wrap">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
            {internship.internshipTitle}
          </h5>
          <div className="md:flex gap-8">
            <div>
              <p className="mb-3 font-semibold text-normal text-gray-700">
                {employer.companyName}
              </p>
              <p className="mb-3 font-semibold text-normal text-gray-700">
                {employer?.companyCity}, {employer?.companyState}
              </p>
              <p className="mb-3 font-normal text-gray-700">
                {internship.internshipDescription}
              </p>
              <div className="flex flex-wrap items-center gap-2 md:gap-6">
                <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">
                  Allowance: RM {internship.internshipAllowance}
                </span>
                <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">
                  Internship Period: {internship.internshipDuration} months
                </span>
                <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">
                  Working Hour: {internship.workingHour} hours per day
                </span>
                <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">
                  {internship.studyScope}
                </span>
              </div>
              <div className="flex justify-center flex-wrap gap-4 mt-4">
                <a id="download-link" href={`/storage/InternshipApplication/documents/offerLetter/${approved.studentID}/${approved.offerLetter}`} target="_blank" style={{ display: 'none' }} />
                <span onClick={(e) => { e.preventDefault(); document.getElementById('download-link').click() }} className="flex items-center text-sm font-semibold text-red-800 cursor-pointer">
                  View Offer Letter
                </span>
                <span className="flex items-center text-sm font-semibold text-gray-800">
                  Allowance Offered : RM {approved.actualAllowance}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center w-full md:w-auto md:max-w-xs md:items-end justify-end mt-4 md:mt-0">
          <Link
            href={`/messages/${employer.id}?receiverType=${encodeURIComponent('employer')}`}
            className="flex items-center justify-center w-full px-4 py-3 m-1 border bg-white border-gray-900 text-gray-900 rounded-lg"
          >
            <MdChatBubbleOutline size={22} className="mr-2" /> <span>Message</span>
          </Link>
          <Link href={`/student/update-offer-status/${approved.id}`} method="post" data={{ applicationStatus: 'Accepted' }} className="w-full text-white px-4 py-3 bg-blue-900 hover:bg-blue-800 focus:ring-4 flex items-center justify-center focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-6 m-1 text-center">
            Accept Offer
          </Link>
          <button onClick={handleRejectClick} className="w-full text-white px-4 py-3 bg-red-600 hover:bg-red-800 focus:ring-4 flex items-center justify-center focus:outline-none focus:ring-red-400 font-medium rounded-lg text-sm px-6 m-1 text-center">
            Reject Offer
          </button>
        </div>
      </div>
      {/* Modal for reasonRejected */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="text-lg font-semibold mb-4">Cancel Internship</h3>
            <form onSubmit={handleRejectSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Reason for cancellation</label>
                <textarea
                  value={reasonRejected}
                  onChange={(e) => setReasonRejected(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  rows="3"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Confirm Cancellation
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-white border border-gray-800 text-gray-800 rounded-lg"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovedInternshipCard;
