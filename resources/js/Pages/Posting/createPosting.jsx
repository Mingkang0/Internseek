'use client';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import DefaultLayout from "@/layout/defaultLayout";
import { Inertia } from '@inertiajs/inertia';
import { useState, useEffect } from 'react';


const AddPostingForm = () => {
  const { auth } = usePage().props; // Assuming auth is passed from the backend.
  const [formErrors, setFormErrors] = useState({});
  const [today, setToday] = useState('');;

  useEffect(() => {
    const todayDate = new Date();
    const formattedDate = todayDate.toLocaleDateString('en-CA', { timeZone: 'Asia/Kuala_Lumpur' });
    setToday(formattedDate);
  }, []);

  const { data, setData, post, processing, errors } = useForm({
    internshipTitle: '',
    internshipAllowance: '',
    internshipDescription: '',
    internshipRequirement: '',
    internshipResponsibility: '',
    startPostingDate: '',
    endPostingDate: '',
    internshipDuration: '',
    workingHour: '',
    studyScope: '',
    workingMethod: '',
  });


  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kuala_Lumpur' });

    const errors = {};

    if (data.startPostingDate < today) {
      errors.startPostingDate = 'Start Posting Date cannot be before today.';
    }

    if (data.endPostingDate < data.startPostingDate) {
      errors.endPostingDate = 'End Posting Date cannot be before the Start Posting Date.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }


    Inertia.post('/internship-postings/add', data, {
      onError: (errors) => {
        console.error(errors);
      },
    });
  };

  const handleCancel = () => {
    Inertia.get('/internship-postings');
  }
  return (
    <DefaultLayout>
      <Head title="Post Internship" />
      <div className="bg-gray-200 px-6 py-12 min-h-screen overflow-y-auto lg:py-4">
        <div className="container max-w-4xl mx-auto px-6 py-6 bg-white border border-gray-200 rounded-lg shadow">
          <div className="header-text">
            <h5 className="text-xl font-bold text-blue-800">Post an Internship</h5>
            <p className="text-base font-medium mt-2">Company Name: {auth.user.companyName}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-6 mt-4">
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">Internship Title</label>
                <input
                  type="text"
                  name="internshipTitle"
                  placeholder="Internship Title"
                  className="mt-2 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={data.internshipTitle}
                  onChange={(e) => setData('internshipTitle', e.target.value)}
                  required
                />
              </div>
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">Allowance (in RM)</label>
                <input
                  type="text"
                  name="internshipAllowance"
                  placeholder="Allowance"
                  className="mt-2 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={data.internshipAllowance}
                  onChange={(e) => setData('internshipAllowance', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="internship-desc mt-4">
              <label className="block text-sm font-medium text-gray-700">Internship Description</label>
              <textarea
                id="message"
                rows={3}
                name="internshipDescription"
                className="mt-2 block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Internship Description here..."
                value={data.internshipDescription}
                onChange={(e) => setData('internshipDescription', e.target.value)}
                required
              ></textarea>
            </div>
            <div className="internship-reqs mt-4">
              <label className="block text-sm font-medium text-gray-700">Internship Requirements</label>
              <textarea
                id="message"
                rows={5}
                name="internshipRequirement"
                className="mt-2 block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Internship Requirements here..."
                value={data.internshipRequirement}
                onChange={(e) => setData('internshipRequirement', e.target.value)}
                required
              ></textarea>
            </div>
            <div className="internship-responsibilities mt-4">
              <label className="block text-sm font-medium text-gray-700">Internship Responsibilities</label>
              <textarea
                id="message"
                rows={5}
                name="internshipResponsibility"
                className="mt-2 block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Internship Responsibilities here..."
                value={data.internshipResponsibility}
                onChange={(e) => setData('internshipResponsibility', e.target.value)}
                required
              ></textarea>
            </div>
            <div className="grid grid-cols-12 date mt-4 gap-6">
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">Start Posting Date</label>
                <input
                  type="date"
                  name="startPostingDate"
                  className="mt-2 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={data.startPostingDate}
                  onChange={(e) => setData('startPostingDate', e.target.value)}
                  min={today}
                  required
                />
                {formErrors.startPostingDate && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.startPostingDate}</p>
                )}
              </div>
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">End Posting Date</label>
                <input
                  type="date"
                  name="endPostingDate"
                  className="mt-2 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={data.endPostingDate}
                  onChange={(e) => setData('endPostingDate', e.target.value)}
                  min={today}
                  required
                />
                {formErrors.endPostingDate && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.endPostingDate}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-12 mt-4 gap-6">
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">Internship Period (in months)</label>
                <input
                  type="number"
                  name="internshipDuration"
                  placeholder="Internship Period (eg. 6)"
                  className="mt-2 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={data.internshipDuration}
                  onChange={(e) => setData('internshipDuration', e.target.value)}
                  required
                />
              </div>
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">Working Hour (per day)</label>
                <input
                  type="number"
                  name="workingHour"
                  placeholder="Working Hours (eg. 8)"
                  className="mt-2 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={data.workingHour}
                  onChange={(e) => setData('workingHour', e.target.value)}
                  required
                />
              </div>
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">Study Scope</label>
                <select
                  id="studyField"
                  name="studyScope"
                  className="mt-2 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={data.studyScope}
                  onChange={(e) => setData('studyScope', e.target.value)}
                  required
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
            </div>
            <div className="grid grid-cols-12 mt-4 gap-6">
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">Working Method</label>
                <select
                  id="Working Method"
                  name="workingMethod"
                  className="mt-2 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={data.workingMethod}
                  onChange={(e) => setData('workingMethod', e.target.value)}
                  required
                >
                  <option value="">Select Working Method</option>
                  <option value="Onsite">Onsite</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="OnOffice">OnOffice</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">Branch</label>
                <select
                  name="branch"
                  className="mt-2 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Branch</option>
                  {/* Options should be dynamically added here */}
                </select>
              </div>
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">Site</label>
                <select
                  name="site"
                  className="mt-2 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Site</option>
                  {/* Options should be dynamically added here */}
                </select>
              </div>
            </div>
            <div className="mt-4 text-center">
              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
                disabled={processing}
              >
                Submit
              </button>
              <button type="button" onClick={handleCancel} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg ml-4">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddPostingForm;
