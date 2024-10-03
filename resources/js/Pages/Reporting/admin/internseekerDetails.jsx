import DefaultLayout from "@/layout/defaultLayout";
import { Head, Link } from "@inertiajs/react";


export default function RegisteredInternseekerDetails({ internseeker, addresses }) {
  console.log(addresses);

  return (
    <DefaultLayout>
      <Head title="Internseeker Details" />
      <div className="bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4">
        <div className="container mx-auto p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow max-w-2xl">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-blue-800">Internseeker Details</h5>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4'>
            <div className='col-span-1'>
              <label className="block text-sm font-semibold text-gray-900">First Name</label>
              <input type="text" value={internseeker.firstName} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
            </div>
            <div className='col-span-1'>
              <label className="block text-sm font-semibold text-gray-900">Last Name</label>
              <input type="text" value={internseeker.lastName} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100  shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4'>
            <div className='col-span-1'>
              <label className="block text-sm font-semibold text-gray-900">Email Address</label>
              <input type="text" value={internseeker.email} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
            </div>
            <div className='col-span-1'>
              <label className="block text-sm font-semibold text-gray-900">Phone Number</label>
              <input type="text" value={internseeker.phoneNum} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100  shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4'>
            <div className='col-span-1'>
              <label className="block text-sm font-semibold text-gray-900">IC Number</label>
              <input type="text" value={internseeker.ICNumber} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
            </div>
            <div className='col-span-1'>
              <label className="block text-sm font-semibold text-gray-900">Gender</label>
              <input type="text" value={internseeker.gender} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4'>
            <div className='col-span-1'>
              <label className="block text-sm font-semibold text-gray-900">Birth Date</label>
              <input type="text" value={internseeker.dateOfBirth} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
            </div>
            <div className='col-span-1'>
              <label className="block text-sm font-semibold text-gray-900">Nationality/Citizen</label>
              <input type="text" value={internseeker.nationality} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
            </div>
          </div>
          {addresses.map((address, index) => (
            <div key={index}>
              {address.type === 'home' && (
                <>
                  <div className="mt-2">
                    <label className="block text-sm font-semibold text-gray-900">Home Address</label>
                    <input type="text" value={address.address1} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
                    <input type="text" value={address.address2} className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
                  </div>
                  <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4'>
                    <div className='col-span-1'>
                      <label className="block text-sm font-semibold text-gray-900">Postal Code</label>
                      <input type="text" value={address.postcode} className="w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
                    </div>
                    <div className='col-span-1'>
                      <label className="block text-sm font-semibold text-gray-900">City</label>
                      <input type="text" value={address.city} className="w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-semibold text-gray-900">State</label>
                      <input type="text" value={address.state} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
                    </div>
                  </div>
                </>
              )}

              {address.type === 'training' && (
                <>
                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-gray-900">Training Address</label>
                    <input type="text" value={address.address1} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
                    <input type="text" value={address.address2} className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
                  </div>
                  <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4'>
                    <div className='col-span-1'>
                      <label className="block text-sm font-semibold text-gray-900">Postal Code</label>
                      <input type="text" value={address.postcode} className="w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
                    </div>
                    <div className='col-span-1'>
                      <label className="block text-sm font-semibold text-gray-900">City</label>
                      <input type="text" value={address.city} className="w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-semibold text-gray-900">State</label>
                      <input type="text" value={address.state} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

          <div className="text-center mt-4">
            <Link href='/admin/internseekers' className="px-4 py-2 text-sm font-semibold text-gray-900 border border-gray-900 bg-white rounded-lg">Back</Link>
          </div>
        </div>
      </div>
    </DefaultLayout>

  );
}