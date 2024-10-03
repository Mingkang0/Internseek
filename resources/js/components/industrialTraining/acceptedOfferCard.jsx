import { FaEye } from 'react-icons/fa';
import { Link, router } from '@inertiajs/react';
import { MdChatBubbleOutline } from 'react-icons/md';
import { useState } from 'react';

const AcceptedInternshipCard = ({ acceptedOffer }) => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [reasonRejected, setReasonRejected] = useState('');

  // Handle Cancel button click - Open modal
  const handleCancelClick = () => {
    setModalOpen(true);
  };

  // Handle modal close
  const closeModal = () => {
    setModalOpen(false);
  };

  // Handle form submission for cancellation
  const handleCancelSubmit = (e) => {
    e.preventDefault();
    // Send the reasonRejected to the backend (assuming you have an endpoint)
    router.post(`/cancel-accepted-offer/${acceptedOffer.application.id}`, {
      reasonRejected,
    });

    // Close modal after submission
    setModalOpen(false);
  };


  return (
    <div className="w-full p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="flex-shrink-0">
          <img
            src={`/storage/company/companyLogo/${acceptedOffer.application.internship.company.companyLogo}`}
            alt="CompanyLogo"
            className="rounded-full mx-auto md:mx-0 w-24 h-24 md:w-28 md:h-28 border ring-1 ring-gray-900"
          />
        </div>

        {/* Internship Title and Details */}
        <div className="flex-grow w-full md:w-4/5">
          <div className="flex-col gap-2">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
              {acceptedOffer.application.internship.internshipTitle}
            </h5>
            <p className="mb-2 font-semibold text-normal text-gray-700">
              {acceptedOffer.application.internship.company.companyName}
            </p>
            <p className="mb-2 font-semibold text-normal text-gray-700">
              {acceptedOffer.application.internship.company?.companyCity}, {acceptedOffer.application.internship.company?.companyState}
            </p>
            <p className="mb-2 font-normal text-gray-700">
              {acceptedOffer.application.internship.internshipDescription}
            </p>

            {/* Working Details Section */}
            <div className="w-full h-fit-content p-4 bg-white border border-gray-900 rounded-lg">
              <h5 className="text-base font-semibold text-gray-900 underline">Working Details</h5>
              <div className="flex flex-wrap md:grid md:grid-cols-2 gap-6 mt-4">
                {!acceptedOffer.supervisorName && (
                  <div className="text-center">
                    <p className="text-base text-gray-600 mt-2">The employer still has not updated the working details.</p>
                  </div>
                )}

                {acceptedOffer.supervisorName && (
                  <>
                    <div className="flex gap-2">
                      <span className="text-sm font-semibold text-gray-800">Supervisor Name:</span>
                      <span className="text-sm font-medium text-gray-800">{acceptedOffer.supervisorName}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm font-semibold text-gray-800">Supervisor Email:</span>
                      <span className="text-sm font-medium text-gray-800">{acceptedOffer.supervisorEmail}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm font-semibold text-gray-800">Supervisor Phone:</span>
                      <span className="text-sm font-medium text-gray-800">{acceptedOffer.supervisorPhone}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm font-semibold text-gray-800">Supervisor Position:</span>
                      <span className="text-sm font-medium text-gray-800">{acceptedOffer.supervisorPosition}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm font-semibold text-gray-800">Supervisor Department:</span>
                      <span className="text-sm font-medium text-gray-800">{acceptedOffer.supervisorDepartment}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm font-semibold text-gray-800">Working Days:</span>
                      <span className="text-sm font-medium text-gray-800">{acceptedOffer.workingDays} days</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm font-semibold text-gray-800">Allowance:</span>
                      <span className="text-sm font-medium text-gray-800">RM {acceptedOffer.allowance}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm font-semibold text-gray-800">Start Time:</span>
                      <span className="text-sm font-medium text-gray-800">
                        {new Date(`1970-01-01T${acceptedOffer.startTime}`).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm font-semibold text-gray-800">End Time:</span>
                      <span className="text-sm font-medium text-gray-800">
                        {new Date(`1970-01-01T${acceptedOffer.endTime}`).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })}

                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm font-semibold text-gray-800">Working Month:</span>
                      <span className="text-sm font-medium text-gray-800">{acceptedOffer.application.internship.internshipDuration} months</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm font-semibold text-gray-800">Working Hour:</span>
                      <span className="text-sm font-medium text-gray-800">{acceptedOffer.application.internship.workingHour} hours per day</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full md:w-48 min-w-0 flex flex-col items-center md:items-end justify-end mt-4 md:mt-0">
          <button type='button' onClick={handleCancelClick} className="flex items-center justify-center px-10 py-3 mt-2 border bg-red-600 text-white rounded-lg">
            Cancel
          </button>
          <Link
            href={`/messages/${acceptedOffer.application.internship.company.id}?receiverType=${encodeURIComponent('employer')}`}
            className="flex items-center justify-center px-4 py-3 mt-2 border bg-white border-gray-900 text-gray-900 rounded-lg"
          >
            <MdChatBubbleOutline size={22} className="mr-2" /> Message
          </Link>
        </div>
      </div>

      {/* Modal for reasonRejected */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg lg:w-1/2">
            <h3 className="text-lg font-semibold mb-4">Cancel Internship</h3>
            <form onSubmit={handleCancelSubmit}>
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

export default AcceptedInternshipCard;
