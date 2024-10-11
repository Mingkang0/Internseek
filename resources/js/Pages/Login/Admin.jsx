'use client';
import React, { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { FaLinkedin } from 'react-icons/fa';

const AdminLoginPage = ({ remember_email }) => {

  const { data, setData, post, processing, errors } = useForm({
    email: remember_email || '',
    password: '',
    role: 'admin',
    remember: false,
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/login/admin/post`);
  };


  return (
    <>
      <Head title="Admin Login Page" />
      <div className="bg-gray-200 px-6 py-12 min-h-screen overflow-y-auto lg:py-24">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-lg mx-auto w-full h-full">
          <div className="flex flex-col items-center mb-6">
            <a href="/">
              <img src="../../assets/logo.png" className="w-40 h-12" alt="Internseek Logo" />
            </a>
          </div>
          <h5 className="text-lg font-bold leading-tight tracking-tight text-blue-900 md:text-xl mb-2">
            Sign In for Administrator (Admin)
          </h5>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Email Address</label>
              <input
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter your email address"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                required
              />
              {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input
                type="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter your password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                required
              />
              {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    checked={data.remember}
                    onChange={(e) => setData('remember', e.target.checked)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="text-gray-500">Remember me</label>
                </div>
              </div>
              <a href='/forgot-password' className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full text-black bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              disabled={processing}
            >
              {processing ? 'Signing In...' : 'Sign In'}
            </button>

            <p className="text-sm font-light text-gray-500">
              Don’t have an account yet? <a href='/register/employer' className="font-medium text-primary-600 hover:underline">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;

