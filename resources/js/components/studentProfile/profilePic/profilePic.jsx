import { useState } from 'react';
import Modal from '../modal.jsx';
import { FaPen } from 'react-icons/fa';
import EditProfilePic from './editProfilePic';


export default function ProfilePicSection({ student, studentID, profileCompletion }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  }

  console.log(student.profilePicture);

  return (
    <>
      <div className="w-full h-fit-content p-4 mx-2 my-2 bg-white border border-gray-900 rounded-lg ">
        <h5 className='text-lg ml-1 font-bold tracking-tight text-gray-900 text-center relative'>My Profile

          <FaPen className="absolute top-0 right-0 mr-1 cursor-pointer text-gray-600 hover:text-gray-400 focus:text-gray-700" size={18} onClick={handleEditModalOpen} />
        </h5>
        <div className="flex justify-center items-center mt-4">
          {student.profilePicture ? (
            <img className="w-36 h-36 rounded-full border border-gray-900" src={`/storage/profile/student/profile_pictures/${student.profilePicture}`} alt="Profile Pic" />
          ) : (
            <img className="w-36 h-36 rounded-full border border-gray-900" src="../../assets/avatar.png" alt="Profile Pic" />
          )}

        </div>
        <div className="text-center mt-4">
          Profile Completion Progress: {profileCompletion}%
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width:  `${profileCompletion}%` }}></div>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Profile Picture"
        >
          <EditProfilePic  
          profilePic={student.profilePicture}
          studentID={studentID}
          />
        </Modal>
      )}
    </>

  );
}