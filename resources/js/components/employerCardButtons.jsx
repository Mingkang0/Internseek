import { FaCheckCircle, FaBusinessTime, FaUserCheck, FaTimesCircle } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { Link } from "@inertiajs/react";


export default function CardButtons({  appliedTotalCount, interviewTotalCount, acceptedTotalCount, rejectedTotalCount, shortlistedOrApprovedTotalCount }) {

  const buttons = [
    {
      name: "Internship Application",
      icon: <MdEditDocument className="text-blue-600" size={36} />,
      count: appliedTotalCount,
      link: "/internship-applications/list",
    },
    {
      name: "Shortlisted/Approved",
      icon: <FaBusinessTime className="text-red-900" size={36} />,
      count: shortlistedOrApprovedTotalCount,
      link: "/internship-applications/shortlisted-approved-applicants",
    },
    {
      name: "Rejected",
      icon: <FaTimesCircle className="text-red-600" size={34} />,
      count: rejectedTotalCount,
      link: "/internship-applications/rejected-applicants",
    },
    {
      name: "Need-to-interview",
      icon: <FaUserCheck className="text-gray-500" size={36} />,
      count: interviewTotalCount,
      link: "/interviews-applicants/list",
    },
    {
      name: "Accepted",
      icon: <FaCheckCircle className="text-green-500" size={34} />,
      count: acceptedTotalCount,
      link: "/internship-applications/accepted-applicants",
    },
  ]
  return (
    <div className="flex flex-wrap justify-center lg:gap-8 gap-2 w-full h-fit-content px-2 py-4">
      {buttons.map((button, index) => (
        <div key={index} className="p-4 bg-gray-100 border border-gray-300 w-52 h-30 rounded-lg cursor-pointer">
          <Link href={button.link}>
            <div className="flex justify-center mt-2">
              {button.icon}
            </div>
            <div className="flex flex-col text-center mt-3">
              <span className="text-gray-900">{button.count}</span>
              <span className="ml-2 mt-1">{button.name}</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}