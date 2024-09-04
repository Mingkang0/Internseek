import DefaultLayout from "@/layout/defaultLayout";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";


export default function EmployerDetails({ employer, branches, sites, contactPersons }) {

  const [rating, setRating] = useState(employer.companyRating || '');
  const handleRatingChange = (e) => {
    setRating(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post(`/admin/update-companyRating/${employer.id}`, {
      rating: rating
    });
  }
  return (
    <DefaultLayout>
      <div className="bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4">
        <div className="container mx-auto max-w-3xl">
          <div className="w-full p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow">
            <h5 className="text-xl font-bold text-gray-900">Employer Details</h5>
            <p className="text-base text-gray-500">Status: {employer.registrationStatus}</p>
            <div className="companyDetails">
              <p className="mb-2 text-lg font-bold tracking-tight text-blue-800">Company Details </p>
              <div className="grid grid-cols-2 gap-8 mt-4">
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">Company Name</label>
                  <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={employer.companyName} disabled />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">Company Email</label>
                  <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="email" value={employer.companyEmail} disabled />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">Business Registration No.</label>
                  <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={employer.businessRegNum} disabled />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">Business Registration Date</label>
                  <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="email" value={employer.businessRegDate} disabled />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">Business Document</label>
                  <div className="flex items-center gap-4">
                    <button className="mt-1 px-4 py-2 border border-gray-300 rounded-md bg-blue-800 text-white">View</button>
                    <button className="mt-1 px-4 py-2 border border-gray-300 rounded-md bg-red-600 text-white">Download</button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">Company Size</label>
                  <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={employer.companySize} disabled />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">Company Type</label>
                  <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={employer.companyType} disabled />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">Country</label>
                  <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={employer.companyCountry} disabled />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700">Company Address</label>
                <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" value={employer.companyAddress1} disabled />
                <input className="mt-2 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" value={employer.companyAddress2} disabled />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">Postal code</label>
                  <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={employer.companyPostalCode} disabled />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">City</label>
                  <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={employer.companyCity} disabled />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">State</label>
                  <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={employer.companyState} disabled />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 p-2 gap-8">
              <div className="companyLogo col-span-3">
                <p className="mb-2 text-xl font-bold tracking-tight text-blue-800">Company Logo</p>
                <img src="../../assets/avatar.png" alt="CompanyLogo" className="w-128 h-128 rounded-full mx-auto border ring-1 ring-gray-900" />
              </div>
              <div className="contactPerson col-span-9">
                <p className="mb-2 text-lg font-bold tracking-tight text-blue-800">Contact Person Details</p>
                {contactPersons.map((contactPerson, index) => (
                  <>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="col-span-1">
                        <label className="block text-sm font-semibold text-gray-700">Name</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={`${contactPerson.firstName} ${contactPerson.lastName}`} disabled />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-sm font-semibold text-gray-700">Email</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="email" value={contactPerson.email} disabled />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div className="col-span-1">
                        <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={contactPerson.phoneNum} disabled />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-sm font-semibold text-gray-700">Position</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={contactPerson.position} disabled />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-sm font-semibold text-gray-700">Department</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={contactPerson.department} disabled />
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>

            <div className="branchInfo mt-4">
              <p className="mb-2 text-xl font-bold tracking-tight text-blue-800">Branch Info</p>
              {branches.map((branch, index) => (
                <div key={index}>
                  <p className="text-lg font-bold text-gray-900 mt-2">Branch {index + 1}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700">Branch Name</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={branch.branchName} disabled />
                      </div>
                      <div className="mt-2">
                        <label className="block text-sm font-semibold text-gray-700">Postal code</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={branch.branchPostcode} disabled />
                      </div>
                      <div className="mt-2">
                        <label className="block text-sm font-semibold text-gray-700">City</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={branch.branchCity} disabled />
                      </div>
                      <div className="mt-2">
                        <label className="block text-sm font-semibold text-gray-700">State</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={branch.branchState} disabled />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700">Branch Address</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" value={branch.branchAddress1} disabled />
                        <input className="mt-2 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" value={branch.branchAddress2} disabled />
                      </div>
                      <div className="mt-2">
                        <label className="block text-sm font-semibold text-gray-700">Branch Phone Number</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={branch.branchPhone} disabled />
                      </div>
                      <div className="mt-2">
                        <label className="block text-sm font-semibold text-gray-700">Branch Email</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={branch.branchEmail} disabled />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {branches.length === 0 && (
                <p className="text-gray-900 font-semibold mt-2">No branches found.</p>
              )}
            </div>
            <div className="siteInfo mt-4">
              <p className="mb-2 text-xl font-bold tracking-tight text-blue-800">Site Info</p>
              {sites.map((site, index) => (
                <div key={index}>
                  <p className="text-lg font-bold text-gray-900 mt-2">Site {index + 1}</p>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="col-span-1">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700">Site Name</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={site.siteName} disabled />
                      </div>
                      <div className="mt-2">
                        <label className="block text-sm font-semibold text-gray-700">Postal code</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={site.sitePostcode} disabled />
                      </div>
                      <div className="mt-2">
                        <label className="block text-sm font-semibold text-gray-700">City</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={site.siteCity} disabled />
                      </div>
                      <div className="mt-2">
                        <label className="block text-sm font-semibold text-gray-700">State</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={site.siteState} disabled />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700">Site Address</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" value={site.siteAddress1} disabled />
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" value={site.siteAddress2} disabled />
                      </div>
                      <div className="mt-2">
                        <label className="block text-sm font-semibold text-gray-700">Site Phone Number</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={site.sitePhone} disabled />
                      </div>
                      <div className="mt-2">
                        <label className="block text-sm font-semibold text-gray-700">Site Email</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={site.siteEmail} disabled />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {sites.length === 0 && (
                <p className="text-gray-900 font-semibold mt-2">No sites found.</p>
              )}
            </div>
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="update-status">
                <label className="block text-sm font-semibold text-gray-700">Status</label>
                <select name="rating" value={rating} onChange={handleRatingChange} className="mt-1 p-2 w-2/5 border border-gray-300 rounded-md text-sm" required>
                  <option selected disabled>Select Status</option>
                  <option value="Highly Recommended">Highly Recommended</option>
                  <option value="Recommended">Recommended</option>
                  <option value="Average">Average</option>
                  <option value="Shut Down">Shut Down</option>
                </select>
              </div>
              <div className="text-center mt-4">
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-blue-800 rounded-md">Update</button>
                <button type="button" onClick={()=>Inertia.visit('/admin/employers')}className="px-4 py-2 ml-4 text-sm font-semibold text-gray-900 bg-white border border-gray-900 rounded-md">Back</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}