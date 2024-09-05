import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import AddSkillModal from './addSkillModal';
import EditSkillModal from './editSkillModal';
import Modal from '../modal.jsx';
import { FaEdit } from 'react-icons/fa';


export default function SkillSection({skill, studentID}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const handleAddModalOpen = () => {
    setIsAddModalOpen(!isAddModalOpen);
  }

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditModalOpen = (skill) => {
    setSelectedSkill(skill);
    setIsEditModalOpen(true);
  }
 

  return (
    <>
      <div className="w-full h-fit-content p-4 mx-2 my-2 bg-white border border-gray-900 rounded-lg ">
        <h5 className="text-lg ml-1 font-bold tracking-tight text-gray-900 flex justify-between">
          Skill
          <FaPlus size={18} className="text-gray-900 cursor-pointer" onClick={handleAddModalOpen} />
        </h5>
        <hr className='border-1 border-gray-900 mt-1'></hr>
        <ul>
          {skill.map((skill) => (
            <div key={skill.id} className="flex justify-between ml-2 py-2">
              <div>
                <p className='text-gray-600 font-semibold text-sm'> {skill.skillDesc} </p>
                <p className='text-gray-500 text-sm'>{skill.proficiencyLevel} </p>
              </div>
              <div className='edit-btn'>
                <FaEdit size={18} className="text-gray-600 cursor-pointer" onClick={() => handleEditModalOpen(skill)} /></div>
            </div>
          ))}
        </ul>
        {
          skill.length === 0 && <p className="text-gray-500 text-sm text-center mt-2 ">No skill added yet</p>
        }
      </div>
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add Skill"
        >
          <AddSkillModal studentID={studentID}
            onClose={() => setIsAddModalOpen(false)}
          />
        </Modal>
      )}
      {isEditModalOpen && selectedSkill && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedSkill(null);
          }}
          title="Edit Skill"
        >
          <EditSkillModal
            skill={selectedSkill}
            studentID={studentID}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedSkill(null);
            }}
          />
        </Modal>
      )}
    </>

  );
}