import generatePostingButtons from "./postingButtons";
import { FaEye } from "react-icons/fa";


export default function PostingCard({ internship }) {
  console.log(internship);
  const postingButtons = generatePostingButtons(internship.id);
  return (
    <div className="w-full p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow">
      <h5 className="flex flex-wrap md:justify-between justify-center mb-2 text-lg font-bold tracking-tight text-gray-900 gap-2">
        {internship.internshipTitle}
        <div className="flex justify-center gap-2">
          {postingButtons.map((button, index) => (
            <button key={index} className={`p-2 ${button.backgroundColor} rounded-sm`} onClick={button.onClick}>
              {button.icon}
            </button>
          ))}
        </div>
      </h5>
      <div className="flex flex-wrap justify-between mt-4">
        <div className="flex flex-wrap gap-3 lg:gap-4">
          <div className="flex gap-2">
            <p className="font-semibold text-base text-gray-700">Period:</p>
            <span className="text-gray-700">{internship.internshipDuration} months</span>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold text-base text-gray-700">Allowance:</p>
            <span className="text-gray-700">RM {internship.internshipAllowance}</span>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold text-base text-gray-700">Start Date:</p>
            <span className="text-gray-700">{internship.startPostingDate}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <p className="font-semibold text-base text-gray-700">End Date:</p>
          <span className="text-gray-700">{internship.endPostingDate}</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-between mt-4 gap-2 lg:gap-4">
        <p className={`flex font-semibold text-normal ${internship.postingStatus === 'Archived' ? 'text-red-500' : 'text-blue-600'} gap-2`}>
          Status: <span className="font-medium">{internship.postingStatus}</span>
        </p>
        <div className="flex gap-4">
          <span className='flex items-center text-sm font-semibold text-gray-600'>
            <FaEye className='mr-2' size={20} /> {internship.clicks_count} views </span>
          <span className='flex items-center text-sm font-semibold text-red-800'> {internship.applications_count} applications </span>
          <span className='flex items-center text-sm font-semibold text-blue-800'> {internship.bookmarks_count} bookmarks </span>
        </div>
        <div className="flex flex-wrap gap-2 lg:gap-4">
          <div className="flex gap-2">
            <p className="font-semibold text-base text-gray-700">Posted By:</p>
            <p className="flex text-normal text-gray-700 gap-2"> {internship.created_by.firstName} {internship.created_by.lastName}</p>
          </div>

          <div className="flex gap-2">
            <p className="font-semibold text-base text-gray-700">Edited By:</p>
            <p className="flex text-normal text-gray-700 gap-2"> {internship.last_edited_by.firstName} {internship.last_edited_by.lastName}</p>
          </div>


        </div>
      </div>
    </div>
  );

}