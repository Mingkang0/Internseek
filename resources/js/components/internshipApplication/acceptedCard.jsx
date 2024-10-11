import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import { usePage, router } from '@inertiajs/react';
import BasicInfoModal from './basicInfoModal';
import InternseekResumeModal from './resumeModal';
import Modal from './modal';
import { FaLinkedin } from 'react-icons/fa';

const AcceptedApplicantCard = ({ application }) => {


  console.log(application);
  const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(false);
  const [isInternseekResumeOpen, setIsInternseekResumeOpen] = useState(false);

  const handleOpenBasicInfo = () => {
    setIsBasicInfoOpen(true);
  };

  const handleOpenResume = () => {
    setIsInternseekResumeOpen(true);
  };

  const handleMessage = () => {
    router.get(`/employer/messages/${application.student.id}?receiverType=${encodeURIComponent('student')}`)
  };


  const handleUpdateDetails = () => {
    router.get(`/accepted-offer/${application.accepted_offer.id}/update-details`)
  }

  return (
    <div className="w-full p-5 mt-2 bg-white border border-gray-200 rounded-lg shadow">
      <div className='flex flex-wrap justify-between'>
        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900"> Apply Internship: {application.internship.internshipTitle} </h5>
        <p className="mb-2 text-sm font-semibold text-gray-800">Status: {application.applicationStatus}</p>
      </div>
      <div className='grid grid-cols-4 lg:grid-cols-12 gap-4'>
        <div className='col-span-4 lg:col-span-2'>
          <div className='flex flex-col gap-2'>
            {application.student.linkedin_id && application.student.profilePicture && typeof application.student.profilePicture === 'string' && application.student.profilePicture.startsWith('http') ? (
              <img
                className="w-24 h-24 mx-auto rounded-full border border-gray-900"
                src={application.student.profilePicture}
                alt="LinkedIn Profile Pic"
              />
            ) : application.student.profilePicture && typeof application.student.profilePicture === 'string' ? (
              <img
                className="w-24 h-24 mx-auto rounded-full border border-gray-900"
                src={`/storage/profile/student/profile_pictures/${application.student.profilePicture}`}
                alt="Local Profile Pic"
              />
            ) : (
              <img
                className="w-24 h-24 mx-auto rounded-full border border-gray-900"
                src="../../assets/avatar.png"
                alt="Default Avatar"
              />
            )}
            {application.student.linkedin_public_url &&
              <div className='flex justify-center items-center mx-auto mt-2 px-1 py-1 bg-blue-700 text-white cursor-pointer w-40 rounded-lg'>
                <FaLinkedin size={18} />
                <a href={`https://${application.student.linkedin_public_url}`} target="_blank" className='text-sm ml-2'>LinkedIn Account</a>
              </div>
            }
            <p className='text-center text-sm font-medium text-gray-800 mt-2'>Name: {application.student.firstName} {application.student.lastName}</p>
            <p className='text-center text-sm font-medium text-blue-600 mt-1 cursor-pointer' onClick={handleOpenBasicInfo}>View Basic Info</p>
            <p className='text-center text-sm font-medium text-red-800 mt-1 cursor-pointer' onClick={handleOpenResume}>View Internseek Resume</p>
          </div>
        </div>
        <div className='col-span-4 mt-2 lg:col-span-8'>
          <div className='flex flex-col lg:flex-row gap-4'>
            <div className="flex flex-col">
              <label className='text-sm font-semibold text-gray-600'>Expected Start Date</label>
              <input type="date" className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 lg:w-40' value={application.expectedStartDate} disabled />
            </div>
            <div className="flex flex-col">
              <label className='text-sm font-semibold text-gray-600'>Expected End Date</label>
              <input type="date" className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 lg:w-40' value={application.expectedEndDate} disabled />
            </div>
            <div className="flex flex-col">
              <label className='text-sm font-semibold text-gray-600'>Availability</label>
              <input type="text" className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 lg:w-40' value={`${application.availability} months later`} disabled />
            </div>
            <div className="flex flex-col">
              <label className='text-sm font-semibold text-gray-600'>Expected Allowance</label>
              <input type="text" className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 lg:w-40' value={`RM ${application.expectedAllowance}`} disabled />
            </div>
          </div>
          <div className='flex flex-col lg:flex-row gap-4 mt-2'>
            <div className='flex flex-col transcript'>
              <label className='text-sm font-semibold text-gray-600'>Transcript</label>
              <a id="transcript-download-link" href={`/storage/InternshipApplication/documents/transcript/${application.student.id}/${application.transcript}`} target="_blank" style={{ display: 'none' }} />
              <button onClick={(e) => { e.preventDefault(); document.getElementById('transcript-download-link').click() }} className='text-sm font-semibold text-white mt-2 bg-blue-800 px-4 py-2 rounded-lg lg:w-40 h-10'>View Transcript</button>
            </div>

            <div className='flex flex-col SAL'>
              <label className='text-sm font-semibold text-gray-600'>Student Application Letter</label>
              <a id="sal-download-link" href={`/storage/InternshipApplication/documents/SAL/${application.student.id}/${application.SAL}`} target="_blank" style={{ display: 'none' }} />
              <button onClick={(e) => { e.preventDefault(); document.getElementById('sal-download-link').click() }} className='text-sm font-semibold text-white mt-2 bg-blue-800 px-4 py-2 rounded-lg lg:w-40 h-10'>View SAL</button>
            </div>
            <div className='flex flex-col CoverLetter'>
              <label className='text-sm font-semibold text-gray-600'>Cover Letter</label>
              <a id="cover-letter-download-link" href={`/storage/InternshipApplication/documents/coverLetter/${application.student.id}/${application.coverLetter}`} target="_blank" style={{ display: 'none' }} />
              <button onClick={(e) => { e.preventDefault(); document.getElementById('cover-letter-download-link').click() }} className='text-sm font-semibold text-white mt-2 bg-blue-800 px-4 py-2 rounded-lg lg:w-40 h-10'>View Cover Letter</button>
            </div>

            {application.ownResume && (
              <div className='flex flex-col Resume'>
                <label className='text-sm font-semibold text-gray-600'>Resume</label>
                <a id="resume-download-link" href={`/storage/InternshipApplication/documents/ownResume/${application.student.id}/${application.ownResume}`} target="_blank" style={{ display: 'none' }} />
                <button onClick={(e) => { e.preventDefault(); document.getElementById('resume-download-link').click() }} className='text-sm font-semibold text-white mt-2 bg-blue-800 px-4 py-2 rounded-lg lg:w-40 h-10'>View Resume</button>
              </div>
            )}
          </div>
          {application.interviewComment && (
            <>
              <h5 className='text-base font-semibold text-gray-800 mt-4 underline'>Interview Ratings & Comment</h5>
              <div className='flex flex-col lg:flex-row gap-2 md:gap-12 mt-2'>
                {application.technicalRating && (
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Technical Rating</label>
                    <div className="flex mt-2">
                      {Array(5).fill(0).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ms-1 ${i < application.technicalRating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      <p className='block lg:hidden text-sm font-semibold text-gray-600 ml-2 mt-1'>{application.technicalRating} out of 5</p>
                    </div>
                    <p className='hidden lg:block text-sm font-semibold text-gray-600 mx-auto mt-1'>{application.technicalRating} out of 5</p>
                  </div>
                )}

                {application.performanceRating && (
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Performance Rating</label>
                    <div className="flex mt-2">
                      {Array(5).fill(0).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ms-1 ${i < application.performanceRating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      <p className='block lg:hidden text-sm font-semibold text-gray-600 ml-2 mt-1'>{application.performanceRating} out of 5</p>
                    </div>
                    <p className='hidden lg:block text-sm font-semibold text-gray-600 mx-auto mt-1'>{application.performanceRating} out of 5</p>
                  </div>
                )}
                {application.softRating && (
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Softskills Rating</label>
                    <div className="flex mt-2">
                      {Array(5).fill(0).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ms-1 ${i < application.softRating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      <p className='block lg:hidden text-sm font-semibold text-gray-600 ml-2 mt-1'>{application.softRating} out of 5</p>
                    </div>
                    <p className='hidden lg:block text-sm font-semibold text-gray-600 mx-auto mt-1'>{application.softRating} out of 5</p>
                  </div>
                )}
                {application.overallRating && (
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Overall Rating</label>
                    <div className="flex mt-2">
                      {Array(5).fill(0).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ms-1 ${i < application.overallRating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      <p className='block lg:hidden text-sm font-semibold text-gray-600 ml-2 mt-1'>{application.overallRating} out of 5</p>
                    </div>
                    <p className='hidden lg:block text-sm font-semibold text-gray-600 mx-auto mt-1'>{application.overallRating} out of 5</p>
                  </div>
                )}
              </div>
              <div className='flex flex-col lg:flex-row mt-2'>
                {application.interviewComment && (
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Interview Comment</label>
                    <textarea className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 lg:w-96 h-20' value={application.interviewComment} disabled />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className='col-span-4 lg:col-span-2 flex flex-col justify-end gap-4'>
          <button type='button' onClick={handleMessage} className='text-sm font-semibold text-blue-600 border border-blue-600 bg-white rounded-lg px-4 py-2'>Message</button>
          <button type='button' onClick={handleUpdateDetails} className='text-sm font-semibold text-gray-800 border border-gray-800 bg-white mt-2 rounded-lg px-4 py-2'>Update Details</button>
          {application.accepted_offer.employer && (
            <div className='flex gap-2 justify-end'>
              <p className='text-sm font-semibold text-gray-800'>Last Updated:</p>
              <p className='text-sm text-gray-800'>{application.accepted_offer.employer.firstName} {application.accepted_offer.employer.lastName}</p>
            </div>
          )}
        </div>

      </div>

      {
        isBasicInfoOpen && (
          <Modal
            isOpen={isBasicInfoOpen}
            onClose={() => {
              setIsBasicInfoOpen(false);
            }}
            title={`${application.student.firstName} ${application.student.lastName}'s Basic Info`}
          >
            <BasicInfoModal
              student={application.student}
              onClose={() => {
                setIsBasicInfoOpen(false);
              }}
            />
          </Modal>
        )
      }

      {
        isInternseekResumeOpen && (
          <Modal
            isOpen={isInternseekResumeOpen}
            onClose={() => {
              setIsInternseekResumeOpen(false);
            }}
            title={`${application.student.firstName} ${application.student.lastName}'s Internseek Resume`}
          >
            <InternseekResumeModal
              student={application.student}
              onClose={() => {
                setIsInternseekResumeOpen(false);
              }}
            />
          </Modal>
        )
      }
    </div >


  );
};

export default AcceptedApplicantCard;
