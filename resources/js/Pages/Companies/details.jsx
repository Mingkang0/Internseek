import React from 'react';
import { FaBuilding, FaTimesCircle } from "react-icons/fa";
import { Head, Link } from '@inertiajs/react';
import DefaultLayout from '@/layout/defaultLayout';

const CompanyDetails = ({ employer }) => {

  return (
    <DefaultLayout>
      <Head title={`Company Details ${employer.companyName}`} />
      <div className='bg-gray-200 px-6 py-12 min-h-screen overflow-y-auto lg:py-4'>
        <div className="container flex justify-center items-center">
          <div className="w-3/4 px-6 py-6 mt-4 bg-white border border-gray-200 rounded-lg shadow">
            <div className="grid grid-cols-9 gap-4">
              <div className="col-span-1">
                <img src="../../assets/avatar.png" alt="CompanyLogo" className="w-128 h-128 rounded-full mx-auto border ring-1 ring-gray-900" />
              </div>
              <div className="col-span-8">
                <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-800 flex justify-between">
                  {employer.companyName}
                  <Link href='/companies'>
                    <FaTimesCircle size={20} className="mr-2 text-gray-600 cursor-pointer" />
                  </Link>
                </h5>
                <p className="mb-4 flex font-semibold text-normal text-gray-700">
                  <FaBuilding className='mr-2' size={24} /> {employer.companySector}
                </p>
                <p className="mb-4 font-semibold text-sm text-gray-700">
                  Rating: <span className='font-medium'>{employer.companyRating} </span>
                </p>
                <div className="mt-4 aboutUs">
                  <h5 className="text-normal font-semibold text-gray-900">About Us:</h5>
                  <p className="mt-2 text-sm text-gray-700">{employer.companyDescription}</p>
                </div>
                <div className="vision mt-4">
                  <h5 className="text-normal mb-2 font-semibold text-gray-900">Vision:</h5>
                  <p className="mt-2 text-sm text-gray-700">{employer.vision}</p>
                </div>
                <div className="mission mt-4">
                  <h5 className="text-normal mb-2 font-semibold text-gray-900">Mission:</h5>
                  <p className="mt-2 text-sm text-gray-700">{employer.mission}</p>
                </div>
                <div className='grid grid-cols-12 gap-8 search-boxes mt-4'>
                  <div className='col-span-6'>
                    <h5 className="text-normal mb-2 font-semibold text-gray-900">Address:</h5>
                    <p className="mt-2 text-sm text-gray-700">{employer.companyAddress1}, {employer.companyAddress2}</p>
                    <p className="mt-2 text-sm text-gray-700">{employer.companyPostalCode}, {employer.companyCity}, {employer.companyState}, {employer.companyCountry} </p>

                  </div>
                  <div className='col-span-6'>
                    <h5 className="text-normal mb-2 font-semibold text-gray-900">Email Address:</h5>
                    <p className="mt-2 text-sm text-gray-700">{employer.companyEmail}</p>
                  </div>
                </div>
                <div className='grid grid-cols-12 gap-8 mt-6'>
                  <div className='col-span-4'>
                    <h5 className="text-normal mb-2 font-semibold text-gray-900">Company Type:</h5>
                    {employer.companyType === 'SME' ? (
                      <p className="mt-2 text-sm text-gray-700">Small and Medium Enterprise (SMEs)</p>
                    ) : employer.companyType === 'MNC' ? (
                      <p className="mt-2 text-sm text-gray-700">Multinational Corporation (MNCs)</p>
                    ) : employer.companyType === 'International' ? (
                      <p className="mt-2 text-sm text-gray-700">International Company</p>
                    ) : employer.companyType === 'Government Agency' ? (
                      <p className="mt-2 text-sm text-gray-700">Government Agency</p>
                    ) : employer.companyType === 'NGO' ? (
                      <p className="mt-2 text-sm text-gray-700">Non-Governmental Organization (NGOs)</p>
                    ) : employer.companyType === 'Government Company' ? (
                      <p className="mt-2 text-sm text-gray-700">Government-Owned Company</p>
                    ) : null}
                  </div>
                  <div className='col-span-4'>
                    <h5 className="text-normal mb-2 font-semibold text-gray-900">Company Size:</h5>
                    <p className="mt-2 text-sm text-gray-700">{employer.companySize}</p>
                  </div>
                  <div className='col-span-4'>
                    <h5 className="text-normal mb-2 font-semibold text-gray-900">Company Website:</h5>
                    <p className="mt-2 text-sm text-gray-700">{employer.companyWebsite}</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CompanyDetails;