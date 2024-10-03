import { useState,useEffect } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import DefaultLayout from "@/layout/defaultLayout";
import Swal from "sweetalert2";
import ChangePasswordForm from "./changePassword";


export default function EmployerDetails({ employer }) {
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

  // Initialize the form with the employer's existing data
  const { data, setData, post, processing, errors } = useForm({
    firstName: employer?.firstName || "",
    lastName: employer?.lastName || "",
    phoneNum: employer?.phoneNum || "",
    position: employer?.position || "",
    department: employer?.department || "",
  });

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveChanges = () => {
    post(route('employer-details.update', employer.id), {
      preserveScroll: true,
      onSuccess: () => setIsEditMode(false), // Exit edit mode on success
    });
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // Revert form data to the original employer's data
    setData({
      firstName: employer?.firstName || "",
      lastName: employer?.lastName || "",
      email: employer?.email || "",
      phoneNum: employer?.phoneNum || "",
      position: employer?.position || "",
      department: employer?.department || "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  return (
    <DefaultLayout>
      <div className="bg-gray-200 min-h-screen px-4 py-4 overflow-y-auto lg:py-4">
        <Head title="Employer Details" />
        <div className="mx-auto bg-white border border-gray-900 rounded-lg p-6 w-full lg:max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-bold leading-tight tracking-tight text-blue-900 md:text-xl mb-2">
              Employer Details
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
            <div className="grid grid-cols-6 lg:grid-cols-12 gap-4 lg:gap-6">
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
                value={employer.email}
                disabled
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
            <div className="grid grid-cols-6 lg:grid-cols-12 gap-4 lg:gap-6">
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
        <ChangePasswordForm employer={employer}/>
      </div>
    </DefaultLayout>
  );
}

