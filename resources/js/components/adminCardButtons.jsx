
import { FaBuilding, FaBriefcase, FaUsers } from "react-icons/fa";

export default function CardButtons() {

  const buttons = [
    {
      name: "Registered Internseekers",
      icon: <FaUsers className="ml-2 text-white" size={42} />,
      number: 1000,
      link: "",
    },
    {
      name: "Registered Companies",
      icon: <FaBuilding className="ml-3 text-white" size={40} />,
      number: 50,
      link: "",
    },
    {
      name: "Total Internships Posted",
      icon: <FaBriefcase className="ml-2 text-white" size={42} />,
      number: 200,
      link: "",
    }
  ]
  return (
    <div className="flex justify-between items-center w-full h-fit-content px-2 py-4 gap-8">
      {buttons.map((button, index) => (
        <div key={index} className="px-4 py-4 bg-blue-800 border border-gray-300 w-72 h-36 rounded-lg cursor-pointer">
          <div className="flex justify-center items-center mt-2">
            {button.icon}
          </div>
          <div className="text-center mt-4">
          <span className="ml-2 text-white font-semibold">{button.number}</span>
          </div>
          <div className="text-center">
            <span className="ml-2 mt-2 text-white">{button.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}