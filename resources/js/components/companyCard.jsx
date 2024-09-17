import React from 'react';
import { FaBriefcase } from "react-icons/fa";
import { FaLocationDot } from 'react-icons/fa6';


const CompanyCard = ({ employer }) => {
  return (
    <div className="flex flex-wrap w-full my-6">
      <div className='h-full bg-white border border-gray-200 rounded-lg shadow p-4'>
        <div className="mb-2">
          <img src="../../assets/avatar.png" alt="CompanyLogo" className="w-28 h-28 rounded-full mx-auto border ring-1 ring-gray-900" />
        </div>
        <div className="">
          <a href={`/companies/${employer.id}`}>
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
              {employer.companyName}
            </h5>
          </a>
          <p className="mb-3 font-medium text-sm text-gray-700">
            {employer.companyDescription}
          </p>
        </div>
        <div className='company-rating mt-2'>
          <span className="text-sm font-semibold text-gray-600">Rating: <span className='font-medium ml-1'> {employer.companyRating}</span></span>
        </div>
        <hr className='h-px my-2 bg-gray-200'></hr>
        <div className='company-attributes flex flex-wrap justify-between'>
          <p className='flex text-sm font-semibold text-gray-500 ml-2 mt-1'><FaLocationDot className='mr-2' size={20} /> {employer.companyCity}, {employer.companyState}</p>
          <p className='flex text-sm font-semibold text-gray-500 mr-2 mt-1'><FaBriefcase className='mr-2' size={20} /> {employer.companySector}</p>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
};

export default CompanyCard;