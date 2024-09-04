import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import AddExperienceModal from './addExperienceModal';
import EditExperienceModal from './editExperienceModal';
import Modal from '../modal.jsx';
import { FaEdit } from 'react-icons/fa';


export default function ExperienceSection( {experience, studentID} ) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleAddModalOpen = () => {
    setIsAddModalOpen(!isAddModalOpen);
  }
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditModalOpen = (experience ) => {
    setSelectedExperience(experience);
    setIsEditModalOpen(true);
  }
  const [selectedExperience, setSelectedExperience] = useState(null);


  console.log (studentID);
  return (
    <>
      <div className="w-full h-fit-content p-4 mx-2 my-2 bg-white border border-gray-900 rounded-lg ">
        <h5 className="text-lg ml-1 font-bold tracking-tight text-gray-900 flex justify-between">
          Experience
          <FaPlus size={18} className="text-gray-900 cursor-pointer" onClick={handleAddModalOpen} />
        </h5>
        <hr className='border-1 border-gray-900 mt-1'></hr>
        <ul>
          {experience.map((experience) => (
            <div key={experience.id} className="flex justify-between ml-2 py-2">
              <div>
                <p className='text-gray-700 font-semibold text-sm'>{experience.jobTitle}</p>
                <p className='text-gray-600 font-semibold text-sm'>{experience.companyName} </p>
                <p className='text-gray-500 font-medium text-sm'>From: {experience.startDate}  To: {experience.endDate} </p>
                <ul className='list-disc ml-2 list-inside text-sm font-medium text-gray-600'>
                {experience.jobDescription.split('.').map((sentence, idx) => (
                  sentence.trim() && <li key={idx}>{sentence.trim()}.</li>
                ))}
                </ul>
              </div>
              <div className='edit-btn'>
                <FaEdit size={18} className="text-gray-600 cursor-pointer" onClick={() => handleEditModalOpen(experience)} /></div>
            </div>
          ))}
        </ul>
        {experience.length === 0 && <p className="text-gray-500 text-sm text-center mt-2 ">No experience added yet</p>}
      </div>
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add Experience"
        >
          <AddExperienceModal studentID={studentID}/>
        </Modal>
      )}
      {isEditModalOpen && selectedExperience && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedExperience(null);
          }}
          title="Edit Experience"
        >
          <EditExperienceModal
            experience={selectedExperience}
            studentID={studentID}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedExperience(null);
            }}
          />
        </Modal>
      )}
    </>

  );
}