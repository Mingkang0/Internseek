import { useState } from 'react';
import EditBasicInfoModal from './editBasicInfoModal';
import Modal from '../modal.jsx';
import { FaEdit } from 'react-icons/fa';


export default function BasicInfoSection({ student, address }) {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  }
  return (
    <>
      <div className="w-full h-fit-content p-4 mx-2 my-2 bg-white border border-gray-900 rounded-lg ">
        <h5 className="text-lg ml-1 font-bold tracking-tight text-gray-900 flex justify-between">
          Basic Information
          <FaEdit size={18} className="text-gray-600 cursor-pointer" onClick={handleEditModalOpen} />
        </h5>
        <hr className='border-1 border-gray-900 mt-1'></hr>
        <div className='grid grid-cols-2 gap-4'>
          <div className='col-span-1 ml-2 mt-2'>
            <div className='flex mb-2 gap-2'>
              <label className='text-gray-900 font-semibold text-sm'>Name: </label>
              <p className='text-gray-600 font-medium text-sm'>{student.firstName} {student.lastName}</p>
            </div>
            <div className='flex mb-2 gap-2'>
              <label className='text-gray-900 font-semibold text-sm'>Email: </label>
              <p className='text-gray-600 font-medium text-sm'>{student.email}</p>
            </div>
            <div className='flex mb-2 gap-2'>
              <label className='text-gray-900 font-semibold text-sm'>Phone Number: </label>
              <p className='text-gray-600 font-medium text-sm'>{student.phoneNum}</p>
            </div>
            <div className='flex mb-2 gap-2'>
              <label className='text-gray-900 font-semibold text-sm'>Gender: </label>
              <p className='text-gray-600 font-medium text-sm'>{student.gender}</p>
            </div>
            <div className='flex mb-2 gap-2'>
              <label className='text-gray-900 font-semibold text-sm'>IC Number: </label>
              <p className='text-gray-600 font-medium text-sm'>{student.ICNumber}</p>
            </div>
            <div className='flex mb-2 gap-2'>
              <label className='text-gray-900 font-semibold text-sm'>Birth Date: </label>
              <p className='text-gray-600 font-medium text-sm'>{student.dateOfBirth}</p>
            </div>
            <div className='flex mb-2 gap-2'>
              <label className='text-gray-900 font-semibold text-sm'>Nationality/Citizenship: </label>
              <p className='text-gray-600 font-medium text-sm'>{student.nationality}</p>
            </div>
          </div>
          <div className='col-span-1'>
            {address.length > 0 ? (
              <div>
                {address.map(address => (
                  <div key={address.id} className='mt-2'>
                    <p className='text-gray-900 font-bold text-sm underline'>{address.type.charAt(0).toUpperCase() + address.type.slice(1)} Address</p>
                    <p className='text-gray-600 font-medium text-sm'>{address.address1}</p>
                    <p className='text-gray-600 font-medium text-sm'>{address.address2}</p>
                    <p className='text-gray-600 font-medium text-sm'>{address.postcode}, {address.city}, {address.state}</p>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className='text-gray-900 font-bold text-sm underline mt-2'>Address</p>
                <p>No addresses found.</p>
              </>
            )}

          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
          title="Edit Basic Information"
        >
          <EditBasicInfoModal
            student={student}
            addresses={address}
            studentID={student.id}
            onClose={() => {
              setIsEditModalOpen(false);
            }}
          />
        </Modal>
      )}
    </>

  );
}