import DefaultLayout from "@/layout/defaultLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function EditPostingDetails({ internship, branch, report }) {
  const { data, setData, post } = useForm({
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
    branchID: internship.branchID || '',
    siteID: internship.siteID || '',
  });

  const [siteOptions, setSiteOptions] = useState([]);

  // Handle branch change and update site options
  const handleSelectBranch = (e) => {
    const selectedBranchId = e.target.value;
    const selectedBranch = branch.find(branchItem => branchItem.id === parseInt(selectedBranchId));

    if (selectedBranch) {
      setSiteOptions(selectedBranch.site);
    } else {
      setSiteOptions([]);
    }

    setData({
      ...data,
      branchID: selectedBranchId,
      siteID: '',
    });
  };


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/internship-postings/${internship.id}/update`);
  };

  const handleCancel = () => {
    router.get('/internship-postings');
  };


  useEffect(() => {
    const selectedBranch = branch.find(
      (branchItem) => branchItem.id === parseInt(data.branchID)
    );
    if (selectedBranch) {
      setSiteOptions(selectedBranch.site);
    } else {
      setSiteOptions([]); // Reset site options if no branch is selected
    }
  }, [data.branchID, branch]); // Dependencies ensure this runs when branchID or branch data changes



  return (
    <DefaultLayout>
      <Head title="Edit Internship" />
      <div className="bg-gray-200 px-6 py-12 min-h-screen overflow-y-auto lg:py-4">
        <div className="container max-w-4xl mx-auto px-6 py-6 bg-white border border-gray-200 rounded-lg shadow">
          <div className="header-text">
            <h5 className="text-xl font-bold text-blue-800">Edit Internship</h5>
            <div className="flex flex-wrap items-center justify-between mt-2 gap-2">
              <div className="flex gap-2">
                <span className="text-base font-medium">Company Name: </span>
                <p className="text-base"> {internship.company.companyName}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex gap-2">
                  <span className="text-base font-medium">Posted By: </span>
                  <p className="text-base">{internship.created_by.firstName} {internship.created_by.lastName}</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-base font-medium">Last Edited By: </span>
                  <p className="text-base ">{internship.last_edited_by.firstName} {internship.last_edited_by.lastName}</p>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            {internship.postingStatus === 'Archived' && (
              <div className="bg-red-100 border border-red-400 text-red-700 mt-2 px-4 py-3 rounded relative mb-4">
                <strong className="font-bold">Reason Archived:</strong>
                <ul className="list-disc pl-5 mt-2">
                  {report.map((item, index) => (
                    <li key={index}>{item.reasonArchived}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="grid grid-cols-6 lg:grid-cols-12 gap-6 mt-4">
              <div className="col-span-6">
                <label className="block text-sm font-semibold text-gray-700">Internship Title</label>
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
                <label className="block text-sm font-semibold text-gray-700">Allowance (in RM)</label>
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
              <label className="block text-sm font-semibold text-gray-700">Internship Description</label>
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
              <label className="block text-sm font-semibold text-gray-700">Internship Requirements</label>
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
              <label className="block text-sm font-semibold text-gray-700">Internship Responsibilities</label>
              <textarea
                name="internshipResponsibility"
                rows={5}
                value={data.internshipResponsibility}
                onChange={handleChange}
                className="mt-2 block p-2.5 w-full text-sm text-gray-900 rounded-lg bg-white border border-gray-500 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Internship Responsibilities here..."
              ></textarea>
            </div>
            <div className="grid grid-cols-6 lg:grid-cols-12 date mt-4 gap-6">
              <div className="col-span-6">
                <label className="block text-sm font-semibold text-gray-700">Start Posting Date</label>
                <input
                  type="date"
                  name="startPostingDate"
                  value={data.startPostingDate}
                  onChange={handleChange}
                  className="mt-2 block w-full px-3 py-2 bg-white border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-6">
                <label className="block text-sm font-semibold text-gray-700">End Posting Date</label>
                <input
                  type="date"
                  name="endPostingDate"
                  value={data.endPostingDate}
                  onChange={handleChange}
                  className="mt-2 block w-full px-3 py-2 bg-white border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 lg:grid-cols-12 mt-4 gap-6">
              <div className="col-span-4">
                <label className="block text-sm font-semibold text-gray-700">Internship Period (in months)</label>
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
                <label className="block text-sm font-semibold text-gray-700">Working Hour (per day)</label>
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
                <label className="block text-sm font-semibold text-gray-700">Study Scope</label>
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
            <div className="grid grid-cols-4 lg:grid-cols-12 mt-4 gap-6">
              <div className="col-span-4">
                <label className="block text-sm font-semibold text-gray-700">Working Method</label>
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
              {/* Branch and Site */}
              <div className="col-span-4">
                <label className="block text-sm font-semibold text-gray-700">Branch</label>
                <select
                  name="branchID"
                  value={data.branchID}
                  onChange={handleSelectBranch}
                  className="mt-2 block w-full px-3 py-2 bg-white border border-gray-500 rounded-md shadow-sm"
                >
                  <option value="">Select Branch</option>
                  {branch.map((branchItem) => (
                    <option key={branchItem.id} value={branchItem.id}>
                      {branchItem.branchName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-4">
                <label className="block text-sm font-semibold text-gray-700">Site</label>
                <select
                  name="siteID"
                  value={data.siteID}
                  onChange={(e) => setData('siteID', e.target.value)}
                  className="mt-2 block w-full px-3 py-2 bg-white border border-gray-500 rounded-md shadow-sm"
                >
                  <option value="">Select Site</option>
                  {siteOptions.map((site) => (
                    <option key={site.id} value={site.id}>
                      {site.siteName}
                    </option>
                  ))}
                </select>
                {/* Only show this if sites are available */}
                {data.branchID && siteOptions.length === 0 && (
                  <p className="text-sm text-gray-500 mt-1">No sites available for this branch</p>
                )}
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