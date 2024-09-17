import 'flowbite/dist/flowbite.css';
import { Link, router, usePage } from '@inertiajs/react';
import DefaultLayout from '../layout/defaultLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Home() {
    const [studyField, setStudyField] = useState('');
    const [keyword, setKeyword] = useState('');

    const { flash } = usePage().props;

    useEffect(() => {
      if (flash.success) {
        Swal.fire({
          title: 'Reset Password',
          text: flash.success,
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#2563EB'
        });
      }
    }, [flash]);

    const handleStudyFieldChange = (event) => {
        setStudyField(event.target.value);
    };

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        router.visit(`/internships`, {
            method: 'get',
            data: { studyField, keyword },
        });
    };

    return (
        <DefaultLayout>
            <Head title="Home" />
            <div className="bg-blue-100 min-h-screen mx-auto overflow-y-auto lg:py-6 lg:px-8">
                <div className="max-w-screen-xl mx-auto flex lg:flex-row lg:justify-between overflow-y-auto gap-8">

                    {/* Main content area */}
                    <div className='flex p-4 w-full'>
                        <div className="lg:w-full mx-auto lg:ml-2 mb-6 lg:mb-0">
                            {/* Flex container for header text, input fields, and image */}
                            <div className="flex flex-col lg:flex-row gap-16 lg:items-start lg:justify-between mb-6">

                                {/* Text and Form Section */}
                                <div className="w-full lg:w-2/3 flex flex-col justify-center">
                                    <div className="text-left mb-6">
                                        <p className="text-xl mb-2 font-semibold leading-normal text-gray-900">
                                            Hello, InternSeeker!
                                        </p>
                                        <p className="text-lg font-medium leading-normal text-gray-900">
                                            Find your desired internship at Internseek.
                                        </p>
                                    </div>

                                    {/* Form Section */}
                                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                        <div className='flex gap-6 mb-4'>
                                            <div className="w-full lg:w-1/2">
                                                <label className="block mb-2 text-sm font-semibold text-gray-900">I'm Studying</label>
                                                <select
                                                    id="studyField"
                                                    value={studyField}
                                                    onChange={handleStudyFieldChange}
                                                    className="bg-gray-50 border-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-4 shadow-md"
                                                >
                                                    <option value="">Any Study Field</option>
                                                    <option value="Software Engineering">Software Engineering</option>
                                                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                                                    <option value="Cybersecurity">Cybersecurity</option>
                                                    <option value="Computer System & Networking">Computer System & Networking</option>
                                                    <option value="Graphic Design & Multimedia">Graphic Design & Multimedia</option>
                                                    <option value="Data Engineering">Data Engineering</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-1/2">
                                                <label className="block mb-2 text-sm font-semibold text-gray-900">I'm Looking For</label>
                                                <input
                                                    type="text"
                                                    id="keyword"
                                                    value={keyword}
                                                    onChange={handleKeywordChange}
                                                    className="bg-gray-50 border-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-4 shadow-md"
                                                    placeholder="Search Keyword"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-4 text-center"
                                        >
                                            Show Internships
                                        </button>
                                    </form>
                                </div>

                                {/* Image Section */}
                                <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
                                    <img src="../../assets/avatar.png" className="w-80 h-80 object-cover" alt="Avatar" />
                                </div>
                            </div>

                            {/* Popular Searches */}
                            <div className="mt-8 lg:mt-12">
                                <h2 className="text-lg font-bold text-gray-900">Popular Searches</h2>
                                <div className="flex flex-wrap gap-4 mt-4">
                                    <Link
                                        href="/internships"
                                        method="get"
                                        data={{ studyField: 'Software Engineering' }}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg"
                                    >
                                        Software Engineering
                                    </Link>
                                    <Link
                                        href="/internships"
                                        method="get"
                                        data={{ studyField: 'Computer System & Networking' }}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg"
                                    >
                                        Computer System & Networking
                                    </Link>
                                    <Link
                                        href="/internships"
                                        method="get"
                                        data={{ studyField: 'Cybersecurity' }}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg"
                                    >
                                        Cybersecurity
                                    </Link>
                                    <Link
                                        href="/internships"
                                        method="get"
                                        data={{ studyField: 'Graphic Design & Multimedia' }}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg"
                                    >
                                        Graphic Design & Multimedia
                                    </Link>
                                    <Link
                                        href="/internships"
                                        method="get"
                                        data={{ studyField: 'Artificial Intelligence' }}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg"
                                    >
                                        Artificial Intelligence
                                    </Link>
                                    <Link
                                        href="/internships"
                                        method="get"
                                        data={{ studyField: 'Data Engineering' }}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg"
                                    >
                                        Data Engineering
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
