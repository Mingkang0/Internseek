import { useForm, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function ChangePasswordForm({ admin }) {

  const { data, setData, post, processing, setError, errors } = useForm({
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      setError('confirmPassword', 'Passwords do not match');
      setError('newPassword', 'Passwords do not match');
      return;
    }

    post(`/admin/change-password/${admin.id}`, {
      onSuccess: () => {
        setData({ newPassword: '', confirmPassword: '' });
      },
      onError: () => {
        // Handle errors if needed
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'New Password is same as Current Password',
          showConfirmButton: true,
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3085d6',
        });
      }
    });
  };

  return (
    <div className="container mx-auto bg-white border border-gray-900 rounded-lg p-6 max-w-4xl mt-4">
      <h1 className="text-lg font-bold leading-tight tracking-tight text-blue-900 md:text-xl mb-2">
        Change Password
      </h1>
      <div className="flex justify-between items-center mb-4">
        <p className="text-base font-medium text-gray-900">Name: {admin.firstName} {admin.lastName}</p>
        <p className="text-base font-medium text-gray-900">Email: {admin.email} </p>
      </div>
      <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
          <input type="password" name="newPassword" id="newPassword"
            value={data.newPassword}
            onChange={(e) => setData('newPassword', e.target.value)}
            className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter new password" required />
          {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
          <input type="password" name="confirmPassword" id="confirmPassword"
            value={data.confirmPassword}
            onChange={(e) => setData('confirmPassword', e.target.value)}
            className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Confirm your password" required />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>
        <div className="text-center">
          <button type="submit" disabled={processing} className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Submit</button>
        </div>
      </form>
    </div>
  );
}