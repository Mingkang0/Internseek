import DefaultLayout from "@/layout/defaultLayout";
import { Link } from "@inertiajs/react";
import { Head } from "@inertiajs/react";

export default function ViewPostingDetails({ internship, clickCount, bookmarkCount }) {

  const site = internship.site;
  const branch = internship.branch;
  return (
    <DefaultLayout>
      <Head title="View Internship" />
      <div className="bg-gray-200 px-6 py-12 min-h-screen overflow-y-auto lg:py-4">
        <div className="container max-w-4xl mx-auto px-6 py-6 bg-white border border-gray-200 rounded-lg shadow">
          <div className="header-text">
            <h5 className="text-xl font-bold text-blue-800">View Internship</h5>
            <div className="flex items-center justify-between mt-2">
              <p className="text-base font-medium ">Company Name: {internship.employer.companyName}</p>
              <div className="flex items-center gap-4">
                <p className="text-base font-medium ">Posted By: {internship.created_by.firstName} {internship.created_by.lastName}</p>
                <p className="text-base font-medium ">Last Edited By: {internship.last_edited_by.firstName} {internship.last_edited_by.lastName}</p>
              </div>
            </div>
          </div>
          <form>
            <div className="grid grid-cols-12 gap-6 mt-4">
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">Internship Title</label>
                <input type="text" disabled
                  placeholder="Internship Title"
                  value={internship.internshipTitle}
                  className="mt-2 block w-full px-3 py-2 bg-gray-200 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">Allowance (in RM)</label>
                <input type="text" disabled
                  placeholder="Allowance"
                  value={internship.internshipAllowance}
                  className="mt-2 block w-full px-3 py-2 bg-gray-200 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div className="internship-desc mt-4">
              <label className="block text-sm font-medium text-gray-700">Internship Description</label>
              <textarea id="message" rows={3} disabled
                value={internship.internshipDescription}
                className="mt-2 block p-2.5 w-full text-sm bg-gray-200 text-gray-900 rounded-lg border border-gray-100 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Internship Description here..."></textarea>
            </div>
            <div className="internship-reqs mt-4">
              <label className="block text-sm font-medium text-gray-700">Internship Requirements</label>
              <textarea id="message" rows={5} disabled
                value={internship.internshipRequirement}
                className="mt-2 block p-2.5 w-full text-sm text-gray-900 rounded-lg bg-gray-200 border border-gray-100 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Internship Requirements here..."></textarea>
            </div>
            <div className="internship-responsibilities mt-4">
              <label className="block text-sm font-medium text-gray-700">Internship Responsibilities</label>
              <textarea id="message" rows={5} disabled
                value={internship.internshipResponsibility}
                className="mt-2 block p-2.5 w-full text-sm text-gray-900 rounded-lg bg-gray-200 border border-gray-100 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Internship Responsibilities here..."></textarea>
            </div>
            <div className="grid grid-cols-12 date mt-4 gap-6">
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">Start Posting Date</label>
                <input type="date" disabled
                  value={internship.startPostingDate}
                  className="mt-2 block w-full px-3 py-2 bg-gray-200 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">End Posting Date</label>
                <input type="date" disabled
                  value={internship.endPostingDate}
                  className="mt-2 block w-full px-3 py-2 bg-gray-200 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-12 mt-4 gap-6">
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">Internship Period (in months)</label>
                <input type="number" disabled
                  value={internship.internshipDuration}
                  placeholder="Internship Period (eg. 6)"
                  className="mt-2 block w-full px-3 py-2 bg-gray-200 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">Working Hour (per day)</label>
                <input type="number" disabled
                  value={internship.workingHour}
                  placeholder="Working Hours (eg. 8)"
                  className="mt-2 block w-full px-3 py-2 bg-gray-200 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">Study Scope</label>
                <select id="studyField" value={internship.studyScope} disabled className="mt-2 block w-full px-3 py-2 bg-gray-200 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option selected>Any Study Field</option>
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
                <select id="Working Method" value={internship.workingMethod} disabled className="mt-2 block w-full px-3 py-2 bg-gray-200 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option selected>Select Working Method</option>
                  <option value="Onsite">Onsite</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="OnOffice">OnOffice</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">Branch</label>
                <select id="branch" disabled value={branch.id}className="mt-2 block w-full px-3 py-2 bg-gray-200 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option>Select Branch</option>
                  <option value={branch.id}>{branch.branchName}</option>
                </select>
              </div>
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">Site</label>
                <select id="site" disabled value={site.id} className="mt-2 block w-full px-3 py-2 bg-gray-200 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option>Select Site</option>
                  <option value={site.id}>{site.siteName}</option>
                </select>
              </div>
            </div>
          </form>
          <div className="mt-4 text-center">
            <Link type="button" href="/internship-postings" className="bg-white hover:bg-gray-100 text-gray-900 border border-gray-900 font-semibold py-2 px-6 rounded-lg ml-4">Back</Link>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}