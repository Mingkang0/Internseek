import React from 'react';
import { Link, Head } from '@inertiajs/react';
import DefaultLayout from '@/layout/defaultLayout';


export default function AvailableInternshipDetails({ internship }) {
  const company = internship.company;
  return (
    <DefaultLayout>
      <Head title="Available Internship Details" />
      <div className='bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4'>
        <div className="mx-auto p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow w-full lg:max-w-3xl">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-blue-800">Available Internship Details</h5>
          <p className="text-sm text-gray-900 font-semibold">Company Name: {company?.companyName}</p>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4'>
            <div className='col-span-1'>
              <label className="block text-sm font-semibold text-gray-900">Internship Title</label>
              <input type="text" value={internship.internshipTitle} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
            </div>
            <div className='col-span-1'>
              <label className="block text-sm font-semibold text-gray-900">Allowance</label>
              <input type="text" value={internship.internshipAllowance} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100  shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
            </div>
          </div>
          <div className='mt-2'>
            <label className="block text-sm font-semibold text-gray-900">Internship Description</label>
            <textarea value={internship.internshipDescription} rows={4} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
          </div>
          <div className='mt-2'>
            <label className="block text-sm font-semibold text-gray-900">Internship Responsibilities</label>
            <textarea value={internship.internshipResponsibility.split('. ').join('\n')} rows={6} className="w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-100  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
          </div>
          <div className='mt-2'>
            <label className="block text-sm font-semibold text-gray-900">Internship Requirements</label>
            <textarea value={internship.internshipRequirement.split('. ').join('\n')} rows={6} className="w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-100  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2'>
            <div className='col-span-1'>
              <label className="block text-sm font-semibold text-gray-900">Start Posting Date</label>
              <input type="text" value={internship.startPostingDate} className="w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-100  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
            </div>
            <div className='col-span-1'>
              <label className="block text-sm font-semibold text-gray-900">End Posting Date</label>
              <input type="text" value={internship.endPostingDate} className="w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-100  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4'>
            <div className='col-span-1'>
              <div className=''>
                <label className="block text-sm font-semibold text-gray-900">Internship Period</label>
                <input type="text" value={internship.internshipDuration} className="w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
              </div>
              <div className='mt-2'>
                <label className="block text-sm font-semibold text-gray-900">Working Method</label>
                <input type="text" value={internship.workingMethod} className="w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
              </div>
            </div>
            <div className='col-span-1'>
              <div>
                <label className="block text-sm font-semibold text-gray-900">Working Hour</label>
                <input type="text" value={internship.workingHour} className="w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
              </div>
              {
                internship.branch && (
                  <div className='mt-2'>
                    <label className="block text-sm font-semibold text-gray-900">Branch</label>
                    <input type="text" value={internship.branch.branchName} className="w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
                  </div>
                )
              }
            </div>
            <div className='col-span-1'>
              <div className=''>
                <label className="block text-sm font-semibold text-gray-900">Study Scope</label>
                <input type="text" value={internship.studyScope} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100  shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
              </div>
              {
                internship.site && (

                  <div className='mt-2'>
                    <label className="block text-sm font-semibold text-gray-900">Site</label>
                    <input type="text" value={internship.site.siteName} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100  shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
                  </div>
                )}
            </div>
          </div>
          <div className='text-center mt-4'>
            <Link href='/admin/internships' className="px-4 py-2 text-sm font-semibold text-gray-900 border border-gray-900 bg-white rounded-lg">Back</Link>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );

}