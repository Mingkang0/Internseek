import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import AddEducationModal from './addEducationModal';
import EditEducationModal from './editEducationModal';
import Modal from '../modal.jsx';
import { FaEdit } from 'react-icons/fa';


export default function EducationSection({ education, studentID }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);

  const handleAddModalOpen = () => {
    setIsAddModalOpen(!isAddModalOpen);
  }

  const handleEditModalOpen = (education) => {
    setSelectedEducation(education);
    setIsEditModalOpen(true);
  }

  return (
    <>
      <div className="w-full h-fit-content p-4 mx-2 my-2 bg-white border border-gray-900 rounded-lg ">
        <h5 className="text-lg ml-1 font-bold tracking-tight text-gray-900 flex justify-between">
          Education
          <FaPlus size={18} className="text-gray-900 cursor-pointer" onClick={handleAddModalOpen} />
        </h5>
        <hr className='border-1 border-gray-900 mt-1'></hr>
        <ul>
          {education.map((education) => (
            <div key={education.id} className="flex justify-between ml-2 py-2">
              <div>
                <p className='text-gray-700 font-semibold text-sm'>{education.educationLevel}, {education.studyField} </p>
                <p className='text-gray-600 font-semibold text-sm'>{education.schoolName} </p>
                <p className='text-gray-500 font-medium text-sm'>Start: {education.startDate} End: {education.endDate} </p>
                <p className='text-gray-500 font-medium text-sm'>CGPA: {education.CGPA} </p>
              </div>
              <div className='edit-btn'>
                <FaEdit size={18} className="text-gray-600 cursor-pointer" onClick={() => handleEditModalOpen(education)} /></div>
            </div>
          ))}
        </ul>
        {education.length === 0 && <p className="text-gray-500 text-sm text-center mt-2 ">No education added yet</p>}
      </div>
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add Education"
        >
          <AddEducationModal studentID={studentID} />
        </Modal>
      )}
      {isEditModalOpen && selectedEducation && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedEducation(null);
          }}
          title="Edit Education"
        >
          <EditEducationModal
            education={selectedEducation}
            studentID={studentID}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedEducation(null);
            }}
          />
        </Modal>
      )}
    </>

  );
}