import { useState,useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import DefaultLayout from "@/layout/defaultLayout";
import Swal from "sweetalert2";
import ChangePasswordForm from "./changePassword";


export default function ContactPersonDetails({ contactPerson }) {
  const { flash } = usePage().props;

  useEffect(() => {
    if (flash.success) {
      Swal.fire({
        title: flash.success,
        text: flash.message,
        icon: "success",
        timer: 4000,
        timerProgressBar: true,
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
      });
    }
  }, [flash]);

  const [isEditMode, setIsEditMode] = useState(false);

  // Initialize the form with the contact person's existing data
  const { data, setData, post, processing, errors } = useForm({
    firstName: contactPerson?.firstName || "",
    lastName: contactPerson?.lastName || "",
    email: contactPerson?.email || "",
    phoneNum: contactPerson?.phoneNum || "",
    position: contactPerson?.position || "",
    department: contactPerson?.department || "",
  });

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveChanges = () => {
    post(route('contact-person-details.update', contactPerson.id), {
      preserveScroll: true,
      onSuccess: () => setIsEditMode(false), // Exit edit mode on success
    });
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // Revert form data to the original contact person's data
    setData({
      firstName: contactPerson?.firstName || "",
      lastName: contactPerson?.lastName || "",
      email: contactPerson?.email || "",
      phoneNum: contactPerson?.phoneNum || "",
      position: contactPerson?.position || "",
      department: contactPerson?.department || "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  return (
    <DefaultLayout>
      <div className="bg-gray-200 min-h-screen overflow-y-auto lg:py-4">
        <div className="container mx-auto bg-white border border-gray-900 rounded-lg p-6 max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-bold leading-tight tracking-tight text-blue-900 md:text-xl mb-2">
              Contact Person Details
            </h1>
            <div className="flex items-center">
              {isEditMode ? (
                <>
                  <a
                    className="text-base font-medium text-blue-800 cursor-pointer mr-4"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </a>
                  <a
                    className="text-base font-medium text-red-700 cursor-pointer"
                    onClick={handleCancel}
                  >
                    Cancel
                  </a>
                </>
              ) : (
                <a
                  className="text-base font-medium text-blue-800 cursor-pointer"
                  onClick={handleEditClick}
                >
                  Edit
                </a>
              )}
            </div>
          </div>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSaveChanges}>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="First Name"
                  value={data.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  required
                />
              </div>
              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Last Name"
                  value={data.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter Email Address"
                value={data.email}
                onChange={handleInputChange}
                disabled={!isEditMode}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNum"
                id="phoneNum"
                className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter Phone Number"
                value={data.phoneNum}
                onChange={handleInputChange}
                disabled={!isEditMode}
                required
              />
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Job Position
                </label>
                <input
                  type="text"
                  name="position"
                  id="position"
                  className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Job Position"
                  value={data.position}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  required
                />
              </div>
              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  id="department"
                  className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Department"
                  value={data.department}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  required
                />
              </div>
            </div>
          </form>
        </div>
        <ChangePasswordForm contactPerson={contactPerson}/>
      </div>
    </DefaultLayout>
  );
}

