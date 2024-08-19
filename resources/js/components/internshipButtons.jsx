import React, { useEffect, useState} from 'react';
import { FaBookmark, FaFlag } from 'react-icons/fa';
import { MdOutlineChatBubble } from 'react-icons/md';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import { usePage } from '@inertiajs/react';
const InternshipButtons = ({ id, onReportClick }) => {
  const { flash } = usePage().props; // Get flash messages at the top level

  const [hasShownMessage, setHasShownMessage] = useState(false);
  console.log(flash);

  const handleBookmark = (id) => {
    Inertia.post(`/internships/${id}/bookmark`, {}, {
      preserveScroll: true,
      onFinish: () => {
      }
    });
  };

  useEffect(() => {
    if (flash?.message && !hasShownMessage) {
      Swal.fire({
        title: flash.success ? 'Success!' : 'Info',
        text: flash.message,
        icon: flash.success ? 'success' : 'info',
        timer: 5000,
        timerProgressBar: true,
        confirmButtonText: 'OK'
      }).then(() => {
      // Remove the flash message after displaying it
      Inertia.replace(window.location.pathname);
      });
    }
  }, [flash]);
  

  const buttons = [
    {
      label: 'Apply Now',
      backgroundColor: 'bg-blue-900',
      textColor: 'text-white',
      borderColor: 'border-blue-900',
    },
    {
      label: 'Bookmark',
      backgroundColor: 'bg-white',
      icon: <FaBookmark className="text-blue-800" size={22} />,
      borderColor: 'border-blue-800',
      textColor: 'text-blue-800',
      onClick: () => handleBookmark(id) // Add the internship to the bookmark list
    },
    {
      label: 'Message',
      backgroundColor: 'bg-white',
      borderColor: 'border-gray-900',
      textColor: 'text-gray-900',
      icon: <MdOutlineChatBubble className="text-gray-900" size={22} />,
      onClick: () => { 
        Inertia.get(`/messages/${id}?receiverType=${encodeURIComponent('employer')}`) } // Redirect to the messages page
    },
    {
      label: 'Report',
      backgroundColor: 'bg-gray-300',
      borderColor: 'border-gray-900',
      icon: <FaFlag className="text-gray-900" size={22} />,
      textColor: 'text-gray-900',
      onClick: onReportClick,  // Trigger the modal when this button is clicked
    },
  ];


  return (
    <>
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`flex items-center justify-center px-4 py-3 m-2 border ${button.backgroundColor} ${button.textColor} ${button.borderColor} rounded-lg`}
          onClick={button.onClick}
        >
          {button.icon && <span className="mr-2">{button.icon}</span>}
          {button.label}
        </button>
      ))}
    </>
  );
};

export default InternshipButtons;