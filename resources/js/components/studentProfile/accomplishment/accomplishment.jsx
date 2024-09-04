import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import AddAccomplishmentModal from './addAccomplishmentModal';
import EditAccomplishmentModal from './editAccomplishmentModal';
import Modal from '../modal.jsx';
import { FaEdit } from 'react-icons/fa';


export default function AccomplishmentSection({ accomplishment, studentID}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAccomplishment, setSelectedAccomplishment] = useState(null);
  const handleAddModalOpen = () => {
    setIsAddModalOpen(!isAddModalOpen);
  }

  const handleEditModalOpen = (accomplishment) => {
    setSelectedAccomplishment(accomplishment);
    setIsEditModalOpen(true);
  }



  return (
    <>
      <div className="w-full h-fit-content p-4 mx-2 my-2 bg-white border border-gray-900 rounded-lg ">
        <h5 className="text-lg ml-1 font-bold tracking-tight text-gray-900 flex justify-between">
          Accomplishment
          <FaPlus size={18} className="text-gray-900 cursor-pointer" onClick={handleAddModalOpen} />
        </h5>
        <hr className='border-1 border-gray-900 mt-1'></hr>
        <ul>
          {accomplishment.map((accomplishment) => (
            <div key={accomplishment.id} className="flex justify-between ml-2 py-2">
              <div>
                <p className='text-gray-600 font-semibold text-sm'> {accomplishment.accomplishmentName} ({accomplishment.accomplishmentYear}) </p>
                <p className='text-gray-500 text-sm'>{accomplishment.accomplishmentDescription}</p>
              </div>
              <div className='edit-btn'>
                <FaEdit size={18} className="text-gray-600 cursor-pointer" onClick={() => handleEditModalOpen(accomplishment)} /></div>
            </div>
          ))}
        </ul>
        {
          accomplishment.length === 0 && <p className="text-gray-500 text-sm text-center mt-2 ">No accomplishment added yet</p>
        }
      </div>
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add Accomplishment"
        >
          <AddAccomplishmentModal studentID={studentID}/>
        </Modal>
      )}
      {isEditModalOpen && selectedAccomplishment && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedAccomplishment(null);
          }}
          title="Edit Accomplishment"
        >
          <EditAccomplishmentModal
            accomplishment={selectedAccomplishment}
            studentID={studentID}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedAccomplishment(null);
            }}
          />
        </Modal>
      )}
    </>

  );
}