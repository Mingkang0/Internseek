import React from 'react';
import { Head, useForm } from '@inertiajs/react';

const RegisterStudentForm = () => {

  const { data, setData, post, processing, errors } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    phoneNum: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      setData('errors', { ...errors, password: 'Passwords do not match' });
      return;
    }

    if (data.phoneNum.length < 10 || data.phoneNum.length > 11) {
      setData('errors', { ...errors, phoneNum: 'Phone number must be at least 10/11 characters' });
      return;
    }
    post('/create/student', {
      onError: () => {
        if (data.password !== data.confirmPassword) {
          setData('errors', { ...errors, confirmPassword: 'Passwords do not match' });
        }
      },
    });

  }

  return (
    <>
    <Head title="Student Registration" />
    <div className='bg-gray-200 px-6 min-h-screen overflow-y-auto'>
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full mx-auto mx-4 my-4">
      <div className="flex flex-col items-center mb-2">
        <a href="/">
          <img src="../../assets/logo.png" className="w-40 h-12" alt="Internseek Logo" />
        </a>
      </div>
      <h1 className="text-lg font-bold leading-tight tracking-tight text-blue-900 md:text-xl mb-2">
        Sign Up for Internseeker
      </h1>
      <form className="space-y-2 md:space-y-4" action="#" onSubmit={handleSubmit}>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
            <input type="text"
              name="firstName" id="firstName"
              value={data.firstName}
              onChange={(e) => setData('firstName', e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="First name" required />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div className="col-span-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
            <input type="text" name="lastName" id="lastName"
              value={data.lastName}
              onChange={(e) => setData('lastName', e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Last name" required />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Email Address</label>
          <input type="email"
            name="email" id="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter your email address" required />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
          <input type="tel" name="phoneNum" id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Enter your phone number"
            pattern="^01[0-46-9]-*[0-9]{7,8}$"
            title="Please enter a valid Malaysian phone number (e.g., 012-3456789 or 016-3456789)"
            value={data.phoneNum}
            onChange={(e) => setData('phoneNum', e.target.value)}
            required />
          {errors.phoneNum && <p className="text-red-500 text-xs mt-1">{errors.phoneNum}</p>}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input type="password" name="password" id="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            placeholder="Enter your password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        <div className='mb-4'>
          <label className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
          <input type="password"
            name="confirmPassword" id="confirmPassword"
            value={data.confirmPassword}
            onChange={(e) => setData('confirmPassword', e.target.value)}
            placeholder="Confirm your password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>
        <button type="submit"
          className="w-full text-black bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          disabled={processing}>Sign Up</button>
        <p className="text-sm font-light text-gray-500">
          Already have an account? <a href='/login' className="font-medium text-primary-600 hover:underline">Sign In</a>
        </p>
      </form>
    </div>
    </div>
    </>
  )
};

export default RegisterStudentForm;
