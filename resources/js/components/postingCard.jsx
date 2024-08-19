import generatePostingButtons from "./postingButtons";
import { FaEye } from "react-icons/fa";


export default function PostingCard ( { internship } ) {
  const employer = internship.employer;
  const postingButtons = generatePostingButtons(internship.id);
  return (
    <div className="w-full p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow">
      <h5 className="flex justify-between mb-2 text-lg font-bold tracking-tight text-gray-900">
        {internship.internshipTitle}
        <div className="flex gap-2">
          {postingButtons.map((button, index) => (
            <button key={index} className={`p-2 ${button.backgroundColor} rounded-sm`} onClick={button.onClick}>
              {button.icon}
            </button>
          ))}
        </div>
      </h5>
      <div className="flex justify-between mt-4">
        <div className="flex gap-4">
          <p className="flex font-semibold text-base text-gray-700 gap-2">
            Period:<span className="font-medium">{internship.internshipDuration} months</span>
          </p>
          <p className="flex font-semibold text-base text-gray-700 gap-2">
            Allowance: RM<span className="font-medium">{internship.internshipAllowance}</span>
          </p>
          <p className="flex font-semibold text-base text-gray-700 gap-2">
            Posted Date:<span className="font-medium">{internship.startPostingDate}</span>
          </p>
        </div>
        <p className="flex font-semibold text-base text-gray-700 gap-2">
          Last Apply:<span className="font-medium">{internship.endPostingDate}</span>
        </p>
      </div>
      <div className="flex justify-center mt-4 gap-4">
        <p className="flex font-semibold text-normal text-blue-600 gap-2">
          Status: <span className="font-medium">{internship.postingStatus}</span>
        </p>
        <span className='flex items-center text-sm font-semibold text-gray-600'>
          <FaEye className='mr-2' size={20} /> {internship.clicks_count} views </span>
        <span className='flex items-center text-sm font-semibold text-red-800'> {internship.application} applications </span>
        <span className='flex items-center text-sm font-semibold text-blue-800'> {internship.bookmarks_count} bookmarks </span>
      </div>
    </div>
  );

}