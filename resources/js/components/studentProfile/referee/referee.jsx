import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import AddRefereeModal from './addRefereeModal';
import EditRefereeModal from './editRefereeModal';
import Modal from '../modal.jsx';
import { FaEdit } from 'react-icons/fa';


export default function RefereeSection({ referee, studentID }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedReferee, setSelectedReferee] = useState(null);

  const handleAddModalOpen = () => {
    setIsAddModalOpen(!isAddModalOpen);
  }
  const handleEditModalOpen = (referee) => {
    setSelectedReferee(referee);
    setIsEditModalOpen(true);
  }



  return (
    <>
      <div className="w-full h-fit-content p-4 mx-2 my-2 bg-white border border-gray-900 rounded-lg ">
        <h5 className="text-lg ml-1 font-bold tracking-tight text-gray-900 flex justify-between">
          Referee
          <FaPlus size={18} className="text-gray-900 cursor-pointer" onClick={handleAddModalOpen} />
        </h5>
        <hr className='border-1 border-gray-900 mt-1'></hr>
        <ul>
          {referee.map((referee) => (
            <div key={referee.id} className="flex justify-between ml-2 py-2">
              <div>
                <p className='text-gray-700 font-semibold text-sm'>{referee.refereeName}</p>
                <p className='text-gray-600 font-semibold text-sm'>{referee.refereePosition}, {referee.refereeCompany} </p>
                <p className='text-gray-500 font-medium text-sm'>Email: {referee.refereeEmail} </p>
                <p className='text-gray-500 font-medium text-sm'>Phone Number: {referee.refereePhone} </p>
              </div>
              <div className='edit-btn'>
                <FaEdit size={18} className="text-gray-600 cursor-pointer" onClick={() => handleEditModalOpen(referee)} /></div>
            </div>
          ))}
        </ul>
        {
          referee.length === 0 && <p className="text-gray-500 text-sm text-center mt-2 ">No referee added yet</p>
        }
      </div>
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add Referee"
        >
          <AddRefereeModal studentID={studentID}
            onClose={() => setIsAddModalOpen(false)} />
        </Modal>
      )}
      {isEditModalOpen && selectedReferee && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedReferee(null);
          }}
          title="Edit Referee"
        >
          <EditRefereeModal
            referee={selectedReferee}
            studentID={studentID}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedReferee(null);
            }}
          />
        </Modal>
      )}
    </>

  );
}