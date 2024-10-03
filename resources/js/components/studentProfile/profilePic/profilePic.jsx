import { useState } from 'react';
import Modal from '../modal.jsx';
import { FaLinkedin, FaPen } from 'react-icons/fa';
import EditProfilePic from './editProfilePic';
import AddUrlModal from './addUrlModal.jsx';


export default function ProfilePicSection({ student, studentID, profileCompletion }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  }

  const [isAddUrlModalOpen, setIsAddUrlModalOpen] = useState(false);
  const handleAddUrlModalOpen = () => {
    setIsAddUrlModalOpen(true);
  }

  return (
    <>
      <div className="w-full h-fit-content p-4 mx-2 my-2 bg-white border border-gray-900 rounded-lg ">
        <h5 className='text-lg ml-1 font-bold tracking-tight text-gray-900 text-center relative'>My Profile

          <FaPen className="absolute top-0 right-0 mr-1 cursor-pointer text-gray-600 hover:text-gray-400 focus:text-gray-700" size={18} onClick={handleEditModalOpen} />
        </h5>
        <div className="flex justify-center items-center mt-4">
          {student.linkedin_id && student.profilePicture && typeof student.profilePicture === 'string' && student.profilePicture.startsWith('http') ? (
            <img
              className="w-36 h-36 rounded-full border border-gray-900"
              src={student.profilePicture}
              alt="LinkedIn Profile Pic"
            />
          ) : student.profilePicture && typeof student.profilePicture === 'string' ? (
            <img
              className="w-36 h-36 rounded-full border border-gray-900"
              src={`/storage/profile/student/profile_pictures/${student.profilePicture}`}
              alt="Local Profile Pic"
            />
          ) : (
            <img
              className="w-36 h-36 rounded-full border border-gray-900"
              src="../../assets/avatar.png"
              alt="Default Avatar"
            />
          )}
        </div>
        {
          student.linkedin_public_url && (
            <div className="flex justify-center items-center mt-4">
              <a
                href={`https://${student.linkedin_public_url}`} // Use the full LinkedIn URL
                target="_blank"
                rel="noopener noreferrer" // Recommended for security reasons
                className="flex justify-center text-white items-center bg-blue-700 font-medium text-base px-2 py-2 rounded-lg"
              >
                <FaLinkedin size={24} className="mr-2" />
                @{student.firstName} {student.lastName}
              </a>
            </div>
          )
        }
        {
          !student.linkedin_public_url && (
            <div className="flex flex-col items-center justify-center mt-4">
              <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium text-base px-2 py-2 rounded-lg" onClick={handleAddUrlModalOpen}>
                Add Url
              </button>
              <p className="text-red-600 text-sm">Note: Please upload your LinkedIn Public Url</p>
            </div>
          )
        }
        <div className="text-center mt-4">
          Profile Completion Progress: {profileCompletion}%
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${profileCompletion}%` }}></div>
          </div>
        </div>
      </div>

      {isAddUrlModalOpen && (
        <Modal
          isOpen={isAddUrlModalOpen}
          onClose={() => setIsAddUrlModalOpen(false)}
          title="Add LinkedIn Public URL"
        >
          <AddUrlModal
            studentID={studentID}
            onClose={() => setIsAddUrlModalOpen(false)}
          />
        </Modal>
      )}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Profile Picture"
        >
          <EditProfilePic
            profilePic={student.profilePicture}
            studentID={studentID}
            linkedin_id={student.linkedin_id}
            closeModal={() => setIsEditModalOpen(false)}
          />
        </Modal>
      )}
    </>

  );
}