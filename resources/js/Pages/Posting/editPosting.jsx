import DefaultLayout from "@/layout/defaultLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function EditPostingDetails({ internship }) {
  const [formData, setFormData] = useState({
    internshipTitle: internship.internshipTitle,
    internshipAllowance: internship.internshipAllowance,
    internshipDescription: internship.internshipDescription,
    internshipRequirement: internship.internshipRequirement,
    internshipResponsibility: internship.internshipResponsibility,
    startPostingDate: internship.startPostingDate,
    endPostingDate: internship.endPostingDate,
    internshipDuration: internship.internshipDuration,
    workingHour: internship.workingHour,
    studyScope: internship.studyScope,
    workingMethod: internship.workingMethod,
  });

  const { data, setData, post } = useForm(formData);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/internship-postings/${internship.id}/update`);
  }
  const handleCancel = () => {
    Inertia.get('/internship-postings');
  }
  return (
    <DefaultLayout>
      <Head title="Edit Internship" />
      <div className="bg-gray-200 px-6 py-12 min-h-screen overflow-y-auto lg:py-4">
        <div className="container max-w-4xl mx-auto px-6 py-6 bg-white border border-gray-200 rounded-lg shadow">
          <div className="header-text">
            <h5 className="text-xl font-bold text-blue-800">Edit Internship</h5>
            <p className="text-base font-medium mt-2">Company Name: ABC Company</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-6 mt-4">
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">Internship Title</label>
                <input
                  type="text"
                  name="internshipTitle"
                  placeholder="Internship Title"
                  value={data.internshipTitle}
                  onChange={handleChange}
                  className="mt-2 block w-full px-3 py-2 bg-white border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">Allowance (in RM)</label>
                <input
                  type="text"
                  name="internshipAllowance"
                  placeholder="Allowance"
                  value={data.internshipAllowance}
                  onChange={handleChange}
                  className="mt-2 block w-full px-3 py-2 bg-white border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="internship-desc mt-4">
              <label className="block text-sm font-medium text-gray-700">Internship Description</label>
              <textarea
                name="internshipDescription"
                rows={3}
                value={data.internshipDescription}
                onChange={handleChange}
                className="mt-2 block p-2.5 w-full text-sm bg-white text-gray-900 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Internship Description here..."
              ></textarea>
            </div>
            <div className="internship-reqs mt-4">
              <label className="block text-sm font-medium text-gray-700">Internship Requirements</label>
              <textarea
                name="internshipRequirement"
                rows={5}
                value={data.internshipRequirement}
                onChange={handleChange}
                className="mt-2 block p-2.5 w-full text-sm text-gray-900 rounded-lg bg-white border border-gray-500 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Internship Requirements here..."
              ></textarea>
            </div>
            <div className="internship-responsibilities mt-4">
              <label className="block text-sm font-medium text-gray-700">Internship Responsibilities</label>
              <textarea
                name="internshipResponsibility"
                rows={5}
                value={data.internshipResponsibility}
                onChange={handleChange}
                className="mt-2 block p-2.5 w-full text-sm text-gray-900 rounded-lg bg-white border border-gray-500 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Internship Responsibilities here..."
              ></textarea>
            </div>
            <div className="grid grid-cols-12 date mt-4 gap-6">
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">Start Posting Date</label>
                <input
                  type="date"
                  name="startPostingDate"
                  value={data.startPostingDate}
                  onChange={handleChange}
                  className="mt-2 block w-full px-3 py-2 bg-white border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">End Posting Date</label>
                <input
                  type="date"
                  name="endPostingDate"
                  value={data.endPostingDate}
                  onChange={handleChange}
                  className="mt-2 block w-full px-3 py-2 bg-white border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-12 mt-4 gap-6">
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">Internship Period (in months)</label>
                <input
                  type="number"
                  name="internshipDuration"
                  value={data.internshipDuration}
                  placeholder="Internship Period (eg. 6)"
                  onChange={handleChange}
                  className="mt-2 block w-full px-3 py-2 bg-white border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">Working Hour (per day)</label>
                <input
                  type="number"
                  name="workingHour"
                  value={data.workingHour}
                  placeholder="Working Hours (eg. 8)"
                  onChange={handleChange}
                  className="mt-2 block w-full px-3 py-2 bg-white border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">Study Scope</label>
                <select
                  name="studyScope"
                  value={data.studyScope}
                  onChange={handleChange}
                  className="mt-2 block w-full px-3 py-2 bg-white border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>Select Study Field</option>
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
                  name="workingMethod"
                  value={data.workingMethod}
                  onChange={handleChange}
                  className="mt-2 block w-full px-3 py-2 bg-white border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>Select Working Method</option>
                  <option value="Onsite">Onsite</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="OnOffice">OnOffice</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">Branch</label>
                <select id="branch" className="mt-2 block w-full px-3 py-2 bg-white border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option>Select Branch</option>
                </select>
              </div>
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">Site</label>
                <select id="site" className="mt-2 block w-full px-3 py-2 bg-white border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option>Select Site</option>
                </select>
              </div>
            </div>
            <div className="mt-4 text-center">
              <button type="submit" className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-6 rounded-lg">Edit</button>
              <button type="button" onClick={handleCancel} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg ml-4">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}