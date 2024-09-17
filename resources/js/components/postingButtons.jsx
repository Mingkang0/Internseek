
import { FaTrash, FaPen, FaSearch } from "react-icons/fa";
import Swal from 'sweetalert2';
import { router } from "@inertiajs/react";



const generatePostingButtons = (id) => {

  const handleDelete = (id) => {
    // Add your delete logic here
    Swal.fire({
      title: 'Delete Confirmation',
      text: 'Do you want to delete this internship posting?',
      icon: 'warning',
      confirmButtonText: "Yes, I'm sure",
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        router.post(`/internship-postings/${id}/delete`);
  }});
  }

  const handleEdit = (id) => {
    // Add your edit logic here
    router.get(`/internship-postings/${id}/edit`);
  }

  const handleView = (id) => {
    // Add your view logic here
    router.get(`/internship-postings/${id}`);
  }

  return [
    {
      label: "View",
      icon: <FaSearch className="text-white" size={18} />,
      backgroundColor: "bg-blue-600",
      onClick: () => handleView(id),
    },
    {
      label: "Edit",
      icon: <FaPen className="text-white" size={18} />,
      backgroundColor: "bg-yellow-400",
      onClick: () => handleEdit(id),
    },
    {
      label: "Delete",
      icon: <FaTrash className="text-white" size={18} />,
      backgroundColor: "bg-red-500",
      onClick: () => handleDelete(id), // Adjust the action as needed
    },
  ];
};

export default generatePostingButtons;