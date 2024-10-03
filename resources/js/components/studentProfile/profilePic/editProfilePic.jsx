import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';

export default function EditProfilePic({ profilePic, studentID, linkedin_id, closeModal }) {
  // Check if profilePic exists, if not, use the avatar image
  const initialImageSrc = linkedin_id && profilePic && typeof profilePic === 'string' && profilePic.startsWith('http')
    ? profilePic // Use the LinkedIn profile picture URL
    : profilePic && typeof profilePic === 'string'
      ? `/storage/profile/student/profile_pictures/${profilePic}` // Construct the path for local profile pictures
      : "../../assets/avatar.png"; // Fallback to default avatar

  const [imageSrc, setImageSrc] = useState(initialImageSrc);
  const [file, setFile] = useState(null);

  const handleEditClick = () => {
    document.getElementById('upload-image')?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] ?? null;
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result;
        setImageSrc(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      router.post(`/profile/picture/${studentID}`, formData, {
        onSuccess: () => {
          Swal.fire({
            title: 'Success',
            text: 'Profile picture updated successfully',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
        },
        onError: (error) => {
          console.error(error);
          Swal.fire({
            title: 'Error',
            text: 'There was an error while updating the profile picture',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Please select an image to upload',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
    closeModal();
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Delete Profile Picture',
      text: 'Are you sure you want to delete your profile picture?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        router.post(`/profile/picture/delete/${studentID}`, {}, {
          onSuccess: () => {
            setImageSrc("../../assets/avatar.png");
            Swal.fire({
              title: 'Success',
              text: 'Profile picture removed successfully',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
          },
          onError: (error) => {
            console.error(error);
            Swal.fire({
              title: 'Error',
              text: 'There was an error while deleting the profile picture',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          },
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-center">
        <img src={imageSrc} alt="Profile Pic" className="w-36 h-36 rounded-full border border-gray-900" />
      </div>
      <div className="flex justify-between mt-4 ml-4">
        <button
          type="button"
          className="text-gray-900 hover:text-gray-800 bg-gray-300 px-2 py-2 rounded-lg transition border border-gray-800 duration-300 flex items-center"
          onClick={handleEditClick}
        >
          <FaUpload size={18} aria-hidden={true} className="mr-2" />
          Upload New Picture
        </button>
        <input type="file" id="upload-image" className="hidden" onChange={handleFileChange} />

        <button
          type="button"
          onClick={handleDelete}
          className="text-white hover:bg-red-700 bg-red-600 px-3 py-2 rounded-lg transition"
        >
          Remove
        </button>
      </div>
      <button type="submit" className="w-full mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
        Submit
      </button>
    </form>
  );
}
