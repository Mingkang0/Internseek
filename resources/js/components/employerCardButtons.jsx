import { FaCheckCircle, FaBusinessTime, FaUserCheck, FaTimesCircle } from "react-icons/fa"; 
import { MdEditDocument } from "react-icons/md";


 export default function CardButtons() {

  const buttons = [
    { name: "Internship Application",
      icon: <MdEditDocument className="text-blue-600" size={36} />,
      link: "",
     },
    { name: "Shortlisted",
      icon: <FaBusinessTime className="text-red-900" size={36}/>,
      link: "",
     },
    { name: "Rejected", 
      icon: <FaTimesCircle className="text-red-600" size={34}/>,
      link: "",
     },
    { name: "Need-to-interview", 
      icon: <FaUserCheck className="text-gray-500" size={36}/>,
      link: "",
     },
    { name: "Accepted",
      icon: <FaCheckCircle className="text-green-500"  size={34}/>,
      link: "",
     },
  ]
  return (
    <div className="flex justify-between w-full h-fit-content px-2 py-4">
      {buttons.map((button, index) => (
        <div key={index} className="p-4 bg-gray-100 border border-gray-300 w-52 h-30 rounded-lg cursor-pointer">
          <div className="flex justify-center mt-2">
          {button.icon}
          </div>
          <div className="text-center mt-4">
          <span className="ml-2">{button.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
 }