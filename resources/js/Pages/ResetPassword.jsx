import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const ResetPasswordForm = ({ token, role }) => {

  const { data, setData, post, processing, errors, setError } = useForm({
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.newPassword !== data.confirmPassword) {
      setError('confirmPassword', 'Password does not match');
      return;
    }
    post(`/reset-password/${token}/${role}`);
  };
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <div className="flex flex-col items-center mb-6">
          <a href="/">
            <img src='../../assets/logo.png' className="w-40 h-12" alt="Internseek Logo" />
          </a>
        </div>
        <h1 className="text-lg font-bold leading-tight tracking-tight text-blue-900 md:text-xl mb-2">
          Reset Password for {role === 'admin' ? 'Administrator' : role === 'employer' ? 'Employer' : role === 'student' ? 'Internseeker' : 'User'}
        </h1>
        <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
            <input type="password" name="newPassword" id="newPassword"
              value={data.newPassword}
              onChange={(e) => setData('newPassword', e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter new password" required />
            {errors.confirmPassword && <div className="text-red-500 text-sm">{errors.confirmPassword}</div>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
            <input type="password" name="confirmPassword" id="confirmPassword"
              value={data.confirmPassword}
              onChange={(e) => setData('confirmPassword', e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Confirm your password" required />
            {errors.confirmPassword && <div className="text-red-500 text-sm">{errors.confirmPassword}</div>}
          </div>
          <button type="submit" disabled={processing} className="w-full text-black bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Submit</button>
        </form>
      </div>
    </div>
  )
};

export default ResetPasswordForm;