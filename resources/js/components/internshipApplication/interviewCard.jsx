import { useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import { usePage, router } from '@inertiajs/react';
import BasicInfoModal from './basicInfoModal';
import InternseekResumeModal from './resumeModal';
import Modal from './modal';
import EditInterviewDetailsModal from './editInterviewDetailsModal';

const InterviewCard = ({ application }) => {


  const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(false);
  const [isInternseekResumeOpen, setIsInternseekResumeOpen] = useState(false);
  const [isEditInterviewDetailsOpen, setIsEditInterviewDetailsOpen] = useState(false);

  const handleOpenBasicInfo = () => {
    setIsBasicInfoOpen(true);
  };

  const handleOpenResume = () => {
    setIsInternseekResumeOpen(true);
  };

  const handleEditInterviewDetails = () => {
    setIsEditInterviewDetailsOpen(true);
  };

  const handleMessage = () => {
    router.get(`/messages/${application.student.id}?receiverType=${encodeURIComponent('student')}`)
  };

  const handleUpdateStatus = () => {
    router.get(`/interviews-applicants/${application.id}/update-interview-result`)
  };

  return (
    <div className="w-full p-5 mt-2 bg-white border border-gray-200 rounded-lg shadow">
      <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 flex justify-between">
        Apply Internship: {application.internship.internshipTitle}
        {application.interview.interviewStatus && (
          <div className='flex gap-2'>
            <p className='text-center text-base font-semibold text-gray-800'>Status: </p>
            <p className='text-center text-base font-medium text-gray-800'> {application.interview.interviewStatus}</p>
          </div>
        )}
      </h5>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-2'>
          <div className='flex flex-col gap-2'>
            <img src={`/storage/profile/student/profile_pictures/${application.student.profilePicture}`} alt="StudentProfilePic" className="rounded-full w-24 h-24 mx-auto border ring-1 ring-gray-900" />
            <p className='text-center text-sm font-medium text-gray-800 mt-2'>Name: {application.student.firstName} {application.student.lastName}</p>
            <p className='text-center text-sm font-medium text-blue-600 mt-1 cursor-pointer' onClick={handleOpenBasicInfo}>View Basic Info</p>
            <p className='text-center text-sm font-medium text-red-800 mt-1 cursor-pointer' onClick={handleOpenResume}>View Internseek Resume</p>

          </div>
        </div>
        <div className='col-span-8'>
          <div className='flex gap-4'>
            <div className="flex flex-col">
              <label className='text-sm font-semibold text-gray-600'>Expected Start Date</label>
              <input type="date" className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 w-40' value={application.expectedStartDate} disabled />
            </div>

            <div className="flex flex-col">
              <label className='text-sm font-semibold text-gray-600'>Expected End Date</label>
              <input type="date" className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 w-40' value={application.expectedEndDate} disabled />
            </div>

            <div className="flex flex-col">
              <label className='text-sm font-semibold text-gray-600'>Availability</label>
              <input type="text" className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 w-40' value={`${application.availability} months later`} disabled />
            </div>

            <div className="flex flex-col">
              <label className='text-sm font-semibold text-gray-600'>Expected Allowance</label>
              <input type="text" className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 w-40' value={`RM ${application.expectedAllowance}`} disabled />
            </div>

          </div>

          <div className='flex gap-4 mt-2'>
            <div className='flex flex-col transcript'>
              <label className='text-sm font-semibold text-gray-600'>Transcript</label>
              <a id="transcript-download-link" href={`/storage/InternshipApplication/documents/transcript/${application.student.id}/${application.transcript}`} target="_blank" style={{ display: 'none' }} />
              <button onClick={(e) => { e.preventDefault(); document.getElementById('transcript-download-link').click() }} className='text-sm font-semibold text-white mt-2 bg-blue-800 px-4 py-2 rounded-lg w-40 h-10'>View Transcript</button>
            </div>

            <div className='flex flex-col SAL'>
              <label className='text-sm font-semibold text-gray-600'>Application Letter(SAL)</label>
              <a id="sal-download-link" href={`/storage/InternshipApplication/documents/SAL/${application.student.id}/${application.SAL}`} target="_blank" style={{ display: 'none' }} />
              <button onClick={(e) => { e.preventDefault(); document.getElementById('sal-download-link').click() }} className='text-sm font-semibold text-white mt-2 bg-blue-800 px-4 py-2 rounded-lg w-40 h-10'>View SAL</button>
            </div>

            <div className='flex flex-col CoverLetter'>
              <label className='text-sm font-semibold text-gray-600'>Cover Letter</label>
              <a id="cover-letter-download-link" href={`/storage/InternshipApplication/documents/coverLetter/${application.student.id}/${application.coverLetter}`} target="_blank" style={{ display: 'none' }} />
              <button onClick={(e) => { e.preventDefault(); document.getElementById('cover-letter-download-link').click() }} className='text-sm font-semibold text-white mt-2 bg-blue-800 px-4 py-2 rounded-lg w-40 h-10'>View Cover Letter</button>
            </div>

            {application.ownResume && (
              <div className='flex flex-col Resume'>
                <label className='text-sm font-semibold text-gray-600'>Resume</label>
                <a id="resume-download-link" href={`/storage/InternshipApplication/documents/ownResume/${application.student.id}/${application.ownResume}`} target="_blank" style={{ display: 'none' }} />
                <button onClick={(e) => { e.preventDefault(); document.getElementById('resume-download-link').click() }} className='text-sm font-semibold text-white mt-2 bg-blue-800 px-4 py-2 rounded-lg w-40 h-10'>View Resume</button>
              </div>
            )}

          </div>
          <div className='flex gap-4 mt-2'>
            <div className='flex flex-col'>
              <label className='text-sm font-semibold text-gray-600'>Interview Date</label>
              <input type="date" className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 w-56' value={application.interview.interviewDate} disabled />
            </div>
            <div className='flex flex-col'>
              <label className='text-sm font-semibold text-gray-600'>Start Time</label>
              <input type="time" className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 w-56' value={application.interview.interviewStartTime} disabled />
            </div>
            <div className='flex flex-col'>
              <label className='text-sm font-semibold text-gray-600'>End Time</label>
              <input type="time" className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 w-56' value={application.interview.interviewEndTime} disabled />
            </div>

          </div>
          <div className='flex gap-8 mt-2'>
            <div className='flex flex-col'>
              <label className='text-sm font-semibold text-gray-600'>Interview Method</label>
              <input type="text" className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 w-72' value={application.interview.interviewMethod} disabled />
            </div>
            {application.interview.interviewLocation && (
              <div className='flex flex-col'>
                <label className='text-sm font-semibold text-gray-600'>Interview Location</label>
                <input type="text" className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 w-96' value={application.interview.interviewLocation} disabled />
              </div>
            )}
            {application.interview.interviewLink && (
              <div className='flex flex-col'>
                <label className='text-sm font-semibold text-gray-600'>Interview Link</label>
                <input type="text" className='mt-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 w-96' value={application.interview.interviewLink} disabled />
              </div>
            )}
          </div>
        </div>
        <div className='col-span-2 flex flex-col justify-end gap-2'>
          {application.interview.interviewStatus === 'Not Available' && (
            <button type='button' onClick={handleEditInterviewDetails} className='flex text-sm font-semibold text-gray-800 border border-gray-800 bg-white rounded-lg px-4 py-2'><FaPen className='mr-2 mt-1' />Edit Interview Details</button>
          )}
          <button type='button' onClick={handleMessage} className='text-sm font-semibold text-blue-600 border border-blue-600 bg-white rounded-lg px-4 py-2'>Message</button>
          <button type='button' onClick={handleUpdateStatus} className='text-sm font-semibold text-gray-800 border border-gray-800 bg-white rounded-lg px-4 py-2'>Update Status</button>
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
        isEditInterviewDetailsOpen && (
          <Modal
            isOpen={isEditInterviewDetailsOpen}
            onClose={() => {
              setIsEditInterviewDetailsOpen(false);
            }}
            title={`Edit Interview Details`}
          >
            <EditInterviewDetailsModal
              interview={application.interview}
              onClose={() => {
                setIsEditInterviewDetailsOpen(false);
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

export default InterviewCard;
