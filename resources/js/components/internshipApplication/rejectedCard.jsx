import { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import BasicInfoModal from './basicInfoModal';
import InternseekResumeModal from './resumeModal';
import Modal from './modal';

const RejectedApplicantCard = ({ application }) => {


  const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(false);
  const [isInternseekResumeOpen, setIsInternseekResumeOpen] = useState(false);

  const handleOpenBasicInfo = () => {
    setIsBasicInfoOpen(true);
  };

  const handleOpenResume = () => {
    setIsInternseekResumeOpen(true);
  };

  const handleMessage = () => {
    router.get(`/messages/${application.student.id}?receiverType=${encodeURIComponent('student')}`)
  };




  return (
    <div className="w-full p-5 mt-2 bg-white border border-gray-200 rounded-lg shadow">
      <div className='flex justify-between'>
        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900"> Apply Internship: {application.internship.internshipTitle} </h5>
        <p className="mb-2 text-sm font-semibold text-gray-800">Status: {application.applicationStatus}</p>
      </div>
      <div className="flex justify-between gap-4">
        <div>
          <img src={`/storage/profile/student/profile_pictures/${application.student.profilePicture}`} alt="StudentProfilePic" className="rounded-full w-24 h-24 mx-auto border ring-1 ring-gray-900" />
          <p className='text-center text-sm font-medium text-gray-800 mt-2'>Name: {application.student.firstName} {application.student.lastName}</p>
          <p className='text-center text-sm font-medium text-blue-600 mt-1 cursor-pointer' onClick={handleOpenBasicInfo}>View Basic Info</p>
          <p className='text-center text-sm font-medium text-red-800 mt-1 cursor-pointer' onClick={handleOpenResume}>View Internseek Resume</p>
        </div>
        <div>
          <div className="flex flex-col">
            <label className='text-sm font-semibold text-gray-600'>Expected Start Date</label>
            <input type="date" className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 w-40' value={application.expectedStartDate} disabled />
          </div>
          <div className="flex flex-col mt-2">
            <label className='text-sm font-semibold text-gray-600'>Expected End Date</label>
            <input type="date" className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 w-40' value={application.expectedEndDate} disabled />
          </div>
        </div>
        <div>
          <div className="flex flex-col">
            <label className='text-sm font-semibold text-gray-600'>Availability</label>
            <input type="text" className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 w-40' value={`${application.availability} months later`} disabled />
          </div>
          <div className="flex flex-col mt-2">
            <label className='text-sm font-semibold text-gray-600'>Expected Allowance</label>
            <input type="text" className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 w-40' value={`RM ${application.expectedAllowance}`} disabled />
          </div>
        </div>
        <div>
          <div className='flex flex-col transcript'>
            <label className='text-sm font-semibold text-gray-600'>Transcript</label>
            <a id="transcript-download-link" href={`/storage/InternshipApplication/documents/transcript/${application.student.id}/${application.transcript}`} target="_blank" style={{ display: 'none' }} />
            <button onClick={(e) => { e.preventDefault(); document.getElementById('transcript-download-link').click() }} className='text-sm font-semibold text-white mt-2 bg-blue-800 px-4 py-2 rounded-lg w-40 h-10'>View Transcript</button>
          </div>

          <div className='flex flex-col SAL mt-2'>
            <label className='text-sm font-semibold text-gray-600'>Student Application Letter</label>
            <a id="sal-download-link" href={`/storage/InternshipApplication/documents/SAL/${application.student.id}/${application.SAL}`} target="_blank" style={{ display: 'none' }} />
            <button onClick={(e) => { e.preventDefault(); document.getElementById('sal-download-link').click() }} className='text-sm font-semibold text-white mt-2 bg-blue-800 px-4 py-2 rounded-lg w-40 h-10'>View SAL</button>
          </div>
        </div>
        <div>
          <div className='flex flex-col CoverLetter'>
            <label className='text-sm font-semibold text-gray-600'>Cover Letter</label>
            <a id="cover-letter-download-link" href={`/storage/InternshipApplication/documents/coverLetter/${application.student.id}/${application.coverLetter}`} target="_blank" style={{ display: 'none' }} />
            <button onClick={(e) => { e.preventDefault(); document.getElementById('cover-letter-download-link').click() }} className='text-sm font-semibold text-white mt-2 bg-blue-800 px-4 py-2 rounded-lg w-40 h-10'>View Cover Letter</button>
          </div>

          {application.ownResume && (
            <div className='flex flex-col Resume mt-2'>
              <label className='text-sm font-semibold text-gray-600'>Resume</label>
              <a id="resume-download-link" href={`/storage/InternshipApplication/documents/ownResume/${application.student.id}/${application.ownResume}`} target="_blank" style={{ display: 'none' }} />
              <button onClick={(e) => { e.preventDefault(); document.getElementById('resume-download-link').click() }} className='text-sm font-semibold text-white mt-2 bg-blue-800 px-4 py-2 rounded-lg w-40 h-10'>View Resume</button>
            </div>
          )}
        </div>
        <div className='flex flex-col justify-end gap-4'>
          {
            application.reasonRejected && (
              <div className='flex flex-col'>
                <label className='text-sm font-semibold text-gray-600'>Reason Rejected</label>
                <textarea className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 w-40' rows={6} value={application.reasonRejected} disabled />
              </div>
            )
          }
          <button type='button' onClick={handleMessage} className='text-sm font-semibold text-blue-600 border border-blue-600 bg-white rounded-lg px-4 py-2'>Message</button>
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

export default RejectedApplicantCard;
