import { useState } from 'react';
import { FaEye, FaLinkedin } from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import { usePage, router } from '@inertiajs/react';
import BasicInfoModal from './basicInfoModal';
import InternseekResumeModal from './resumeModal';
import Modal from './modal';

const ApplicantCard = ({ application }) => {


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

  const handleUpdateStatus = () => {
    router.get(`/internship-applications/${application.id}/update-status`)
  };

  return (
    <div className="w-full p-5 mt-2 bg-white border border-gray-200 rounded-lg shadow">
      <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900"> Apply Internship: {application.internship.internshipTitle} </h5>
      <div className='grid grid-cols-4 lg:grid-cols-12 gap-4'>
        <div className='col-span-4 md:col-span-2'>
          <div>
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
        <div className='col-span-4 md:col-span-8'>
          <div className='flex flex-col lg:flex-row gap-2 lg:gap-8'>
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

          <div className='flex flex-col lg:flex-row gap-2 lg:gap-8 mt-2'>
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
        </div>
        <div className='col-span-4 md:col-span-2 flex lg:flex-col justify-end gap-4 mt-4 lg:mt-0'>
          <button type='button' onClick={handleMessage} className='text-sm font-semibold text-blue-600 border border-blue-600 bg-white rounded-lg px-4 py-2'>Message</button>
          <button type='button' onClick={handleUpdateStatus} className='text-sm font-semibold text-gray-800 border border-gray-800 bg-white lg:mt-2 rounded-lg px-4 py-2'>Update Status</button>
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

export default ApplicantCard;
