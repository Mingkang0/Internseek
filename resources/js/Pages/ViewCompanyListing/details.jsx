import React from 'react';
import { FaBuilding, FaTimesCircle } from "react-icons/fa";
import { Head, Link } from '@inertiajs/react';
import DefaultLayout from '@/layout/defaultLayout';

const CompanyDetails = ({ company }) => {

  return (
    <DefaultLayout>
      <Head title={`Company Details ${company.companyName}`} />
      <div className='bg-gray-200 px-4 min-h-screen overflow-y-auto lg:py-6'>
        <div className="container flex justify-center items-center">
          <div className="px-6 py-6 mt-4 bg-white border border-gray-200 rounded-lg shadow lg:max-w-6xl">
            <div className='content-end lg:hidden'>
              <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-800 flex justify-between items-center">
                {company.companyName}
                <Link href='/companies'>
                  <FaTimesCircle size={20} className="mr-2 text-gray-600 cursor-pointer" />
                </Link>
              </h5>
            </div>
            <div className="flex flex-col lg:flex-row  gap-4">
              <div className='md:mr-2 mx-auto'>
                <img src={`/storage/company/companyLogo/${company.companyLogo}`} alt="CompanyLogo" className="rounded-full w-24 h-24 md:w-28 md:h-28 mx-auto border ring-1 ring-gray-900" />
              </div>
              <div>
                <div className='hidden lg:block'>
                  <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-800 flex justify-between items-center">
                    {company.companyName}
                    <Link href='/companies'>
                      <FaTimesCircle size={20} className="mr-2 text-gray-600 cursor-pointer" />
                    </Link>
                  </h5>
                </div>
                <p className="mb-4 flex font-semibold text-normal text-gray-700">
                  <FaBuilding className='mr-2' size={24} /> {company.companySector}
                </p>
                <p className="mb-4 font-semibold text-sm text-gray-700">
                  Rating: <span className='font-medium'>{company.companyRating} </span>
                </p>
                <div className="mt-4 aboutUs">
                  <h5 className="text-normal font-semibold text-gray-900">About Us:</h5>
                  <p className="mt-2 text-sm text-gray-700">{company.companyDescription}</p>
                </div>
                <div className="vision mt-4">
                  <h5 className="text-normal mb-2 font-semibold text-gray-900">Vision:</h5>
                  <p className="mt-2 text-sm text-gray-700">{company.vision}</p>
                </div>
                <div className="mission mt-4">
                  <h5 className="text-normal mb-2 font-semibold text-gray-900">Mission:</h5>
                  <p className="mt-2 text-sm text-gray-700">{company.mission}</p>
                </div>
                <div className='flex flex-wrap mt-4 gap-4 md:gap-16'>
                  <div className='flex flex-col'>
                    <h5 className="text-normal font-semibold text-gray-900">Address:</h5>
                    <p className="mt-2 text-sm text-gray-700">{company.companyAddress1}, {company.companyAddress2}</p>
                    <p className="text-sm text-gray-700">{company.companyPostalCode}, {company.companyCity}, {company.companyState}, {company.companyCountry} </p>

                  </div>
                  <div className='flex flex-col md:ml-16'>
                    <h5 className="text-normal font-semibold text-gray-900">Email Address:</h5>
                    <p className="mt-2 text-sm text-gray-700">{company.companyEmail}</p>
                  </div>
                </div>
                <div className='flex flex-wrap mt-4 gap-4 md:gap-16'>
                  <div>
                    <h5 className="text-normal font-semibold text-gray-900">Company Type:</h5>
                    {company.companyType === 'SME' ? (
                      <p className="mt-2 text-sm text-gray-700">Small and Medium Enterprise (SMEs)</p>
                    ) : company.companyType === 'MNC' ? (
                      <p className="mt-2 text-sm text-gray-700">Multinational Corporation (MNCs)</p>
                    ) : company.companyType === 'International' ? (
                      <p className="mt-2 text-sm text-gray-700">International Company</p>
                    ) : company.companyType === 'Government Agency' ? (
                      <p className="mt-2 text-sm text-gray-700">Government Agency</p>
                    ) : company.companyType === 'NGO' ? (
                      <p className="mt-2 text-sm text-gray-700">Non-Governmental Organization (NGOs)</p>
                    ) : company.companyType === 'Government Company' ? (
                      <p className="mt-2 text-sm text-gray-700">Government-Owned Company</p>
                    ) : null}
                  </div>
                  <div className='md:ml-16'>
                    <h5 className="text-normal font-semibold text-gray-900">Company Size:</h5>
                    <p className="mt-2 text-sm text-gray-700">{company.companySize}</p>
                  </div>
                  <div className='md:ml-16'>
                    <h5 className="text-normal font-semibold text-gray-900">Company Website:</h5>
                    <a href={company.companyWebsite} target='_blank' className="mt-2 text-sm text-blue-700">{company.companyWebsite}</a>
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