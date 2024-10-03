export default function BasicInfoModal( { student } ) {
  return (
    <div className="w-full h-fit-content p-4 my-2 bg-white border border-gray-900 rounded-lg ">
    <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-4'>
      <div className='col-span-1 ml-2 mt-2'>
        <div className='flex mb-2 gap-2'>
          <label className='text-gray-900 font-semibold text-sm'>Name: </label>
          <p className='text-gray-600 text-sm'>{student.firstName} {student.lastName}</p>
        </div>
        <div className='flex mb-2 gap-2'>
          <label className='text-gray-900 font-semibold text-sm'>Email: </label>
          <p className='text-gray-600 text-sm'>{student.email}</p>
        </div>
        <div className='flex mb-2 gap-2'>
          <label className='text-gray-900 font-semibold text-sm'>Phone Number: </label>
          <p className='text-gray-600 text-sm'>{student.phoneNum}</p>
        </div>
        <div className='flex mb-2 gap-2'>
          <label className='text-gray-900 font-semibold text-sm'>Gender: </label>
          <p className='text-gray-600 text-sm'>{student.gender}</p>
        </div>
        <div className='flex mb-2 gap-2'>
          <label className='text-gray-900 font-semibold text-sm'>IC Number: </label>
          <p className='text-gray-600  text-sm'>{student.ICNumber}</p>
        </div>
        <div className='flex mb-2 gap-2'>
          <label className='text-gray-900 font-semibold text-sm'>Birth Date: </label>
          <p className='text-gray-600 text-sm'>{student.dateOfBirth}</p>
        </div>
        <div className='flex mb-2 gap-2'>
          <label className='text-gray-900 font-semibold text-sm'>Nationality/Citizenship: </label>
          <p className='text-gray-600 text-sm'>{student.nationality}</p>
        </div>
      </div>
      <div className='col-span-1 ml-2'>
        <div>
          {student.addresses.map((address) => (
            <div key={address.id} className='mt-2'>
              <p className='text-gray-900 font-bold text-sm'>
                {address.type === 'home' ? 'Home Address' : 'Training Address'}
              </p>
              <p className='text-gray-600 font-medium text-sm'>{address.address1}</p>
              <p className='text-gray-600 font-medium text-sm'>{address.address2}</p>
              <p className='text-gray-600 font-medium text-sm'>{address.postcode}, {address.city}, {address.state}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
}