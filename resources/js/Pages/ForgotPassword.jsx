import React, { useEffect, useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';

const ForgotPasswordForm = () => {
  const [userRole, setUserRole] = useState('');



  const { data, setData, post, processing, errors } = useForm({
    email: '',
    role: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();


    try {
      post(`/forgot-password/${userRole}`);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while sending the verification link',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#2563EB'
      });
    }
  };

  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
    setData('role', e.target.value); // Update the form data with the selected role
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <div className="flex flex-col items-center mb-6">
          <a href="/">
            <img src="../../assets/logo.png" className="w-40 h-12" alt="Internseek Logo" />
          </a>
        </div>
        <h1 className="text-lg font-bold leading-tight tracking-tight text-blue-900 md:text-xl mb-2">
          Forgot Password for {userRole === 'admin' ? 'Administrator' : userRole === 'employer' ? 'Employer' : userRole === 'student' ? 'Internseeker' : 'User'}
        </h1>
        <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Email Address</label>
            <input type="email" name="email" id="email" 
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter your email address" required />
          {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Role</label>
            <select name="role" id="role"
              value={data.role}
              onChange={handleRoleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required>
              <option value="">Select Role</option>
              <option value="admin">Administrator</option>
              <option value="employer">Employer</option>
              <option value="student">Internseeker</option>
            </select>
            {errors.role && <div className="text-red-500 text-sm">{errors.role}</div>}
          </div>
          <button type="submit" disabled={processing} className="w-full text-black bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Send Verification Link</button>
          <p className="text-sm font-medium text-gray-500">
            Remember Password? <a href='/login' className=" ml-2 font-semibold text-primary-600 hover:underline">Back to Login Page</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;