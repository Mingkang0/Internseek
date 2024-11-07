import React from 'react';
import { FaBriefcase } from "react-icons/fa";
import { FaLocationDot } from 'react-icons/fa6';


const CompanyCard = ({ company }) => {
  return (
      <div className='bg-white border border-gray-200 rounded-lg shadow p-4 lg:max-w-3xl'>
        <div className="mb-2">
          <img src={`/storage/company/companyLogo/${company.companyLogo}`} alt="CompanyLogo" className="rounded-full w-24 h-24 md:w-28 md:h-28 mx-auto border ring-1 ring-gray-900" />
        </div>
        <div className="">
          <a href={`/companies/${company.id}`}>
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
              {company.companyName}
            </h5>
          </a>
          <p className="mb-3 font-medium text-sm text-gray-700">
            {company.companyDescription}
          </p>
        </div>
        <div className='company-rating mt-2'>
          <span className="text-sm font-semibold text-gray-600">Rating: <span className='font-medium ml-1'> {company.companyRating}</span></span>
        </div>
        <hr className='h-px my-2 bg-gray-200'></hr>
        <div className='company-attributes flex flex-wrap justify-between'>
          <p className='flex text-sm font-semibold text-gray-500 ml-2 mt-1'><FaLocationDot className='mr-2' size={20} /> {company.companyCity}, {company.companyState}</p>
          <p className='flex text-sm font-semibold text-gray-500 mr-2 mt-1'><FaBriefcase className='mr-2' size={20} /> {company.companySector}</p>
        </div>
        <div>

        </div>
      </div>
  );
};

export default CompanyCard;