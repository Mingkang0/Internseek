
import { Link } from "@inertiajs/react";
import { FaBuilding, FaBriefcase, FaUsers } from "react-icons/fa";

export default function CardButtons({ internshipCount, employerCount, studentCount }) {

  const buttons = [
    {
      name: "Registered Internseekers",
      icon: <FaUsers className="ml-2 text-white" size={42} />,
      number: studentCount,
      link: '/admin/internseekers',
    },
    {
      name: "Registered Companies",
      icon: <FaBuilding className="ml-3 text-white" size={40} />,
      number: employerCount,
      link: '/admin/employers',
    },
    {
      name: "Total Internships Posted",
      icon: <FaBriefcase className="ml-2 text-white" size={42} />,
      number: internshipCount,
      link: '/admin/internships',
    }
  ]
  return (
    <div className="flex flex-wrap justify-center items-center w-full h-fit-content px-2 py-4 gap-4 lg:gap-16">
      {buttons.map((button, index) => (
        <div key={index} className="px-4 py-4 bg-blue-800 border border-gray-300 w-72 h-36 rounded-lg cursor-pointer">
          <Link href={button.link}>
            <div className="flex justify-center items-center mt-2">
              {button.icon}
            </div>
            <div className="text-center mt-4">
              <span className="ml-2 text-white font-semibold">{button.number}</span>
            </div>
            <div className="text-center">
              <span className="ml-2 mt-2 text-white">{button.name}</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}