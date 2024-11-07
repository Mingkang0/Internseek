import DefaultLayout from "@/layout/defaultLayout";
import { router, Head } from "@inertiajs/react";
import { useState } from "react";


export default function EmployerDetails({ company, branches, sites, employers }) {

  const [rating, setRating] = useState(company.companyRating || '');
  const handleRatingChange = (e) => {
    setRating(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(`/admin/update-companyRating/${company.id}`, {
      rating: rating
    });
  }
  return (
    <DefaultLayout>
      <Head title="Company Details" />
      <div className="bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4">
        <div className="mx-auto w-full lg:max-w-4xl">
          <div className="w-full p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow mx-auto">
            <h5 className="text-xl font-bold text-gray-900">Company Details</h5>
            <div className="flex gap-2">
              <p className="text-base font-semibold text-gray-800">Status: </p>
              <p className="text-base text-gray-800">{company.registrationStatus}</p>
            </div>

            <div className="companyDetails">
              <div className="grid grid-cols-3 lg:grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-3">
                  <div className="companyLogo">
                    <label>
                      <div className="relative cursor-pointer">
                        <img
                          src={`/storage/company/companyLogo/${company.companyLogo}`}
                          alt="Company Logo"
                          className="w-32 h-32 mt-2 mx-auto rounded-full border ring-1 ring-gray-900"
                        />
                      </div>

                    </label>
                  </div>
                </div>
                <div className="col-span-9">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700">Company Name</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={company.companyName} disabled />
                      </div>

                      <div className="mt-2">
                        <label className="block text-sm font-semibold text-gray-700">Company Email</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="email" value={company.companyEmail} disabled />
                      </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4 mt-4">
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">Business Registration No.</label>
                  <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={company.businessRegNum} disabled />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">Business Registration Date</label>
                  <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="email" value={company.businessRegDate} disabled />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">{company.documentType}</label>
                  <div className="flex items-center gap-4">
                    <a id="download-link" href={`/storage/company/businessRegDocuments/${company.documentName}`} target="_blank" style={{ display: 'none' }} />
                    <button onClick={(e) => { e.preventDefault(); document.getElementById('download-link').click() }} className="mt-1 px-4 py-2 border border-gray-300 rounded-md bg-red-600 text-white">Download</button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4 mt-4">
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">Company Size</label>
                  <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={company.companySize} disabled />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">Company Type</label>
                  <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={company.companyType} disabled />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">Country</label>
                  <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={company.companyCountry} disabled />
                </div>
              </div>
              <div className="mt-4">
                <h5 className="text-lg font-bold text-blue-800">Company Address</h5>
                <label className="block text-sm font-semibold text-gray-700 mt-2">Company Address</label>
                <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" value={company.companyAddress1} disabled />
                <input className="mt-2 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" value={company.companyAddress2} disabled />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4 mt-4">
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">Postal code</label>
                  <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={company.companyPostalCode} disabled />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">City</label>
                  <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={company.companyCity} disabled />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">State</label>
                  <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={company.companyState} disabled />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 lg:grid-cols-12 mt-4 gap-8 lg:gap-0">
              <div className="col-span-12 lg:col-span-12">
                <p className="mb-2 text-lg font-bold tracking-tight text-blue-800">Contact Person Details</p>
                {employers.map((employer, index) => (
                  <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 mt-2">
                      <div className="col-span-1">
                        <label className="block text-sm font-semibold text-gray-700">Name</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={`${employer.firstName} ${employer.lastName}`} disabled />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-sm font-semibold text-gray-700">Email</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="email" value={employer.email} disabled />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4 mt-4">
                      <div className="col-span-1">
                        <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={employer.phoneNum} disabled />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-sm font-semibold text-gray-700">Position</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={employer.position} disabled />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-sm font-semibold text-gray-700">Department</label>
                        <input className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={employer.department} disabled />
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
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
                <select name="rating" value={rating} onChange={handleRatingChange} className="mt-1 p-2 lg:w-2/5 border border-gray-300 rounded-md text-sm" required>
                  <option selected disabled>Select Status</option>
                  <option value="Highly Recommended">Highly Recommended</option>
                  <option value="Recommended">Recommended</option>
                  <option value="Average">Average</option>
                  <option value="Shut Down">Shut Down</option>
                </select>
              </div>
              <div className="text-center mt-4">
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-blue-800 rounded-md">Update</button>
                <button type="button" onClick={() => window.history.back()} className="px-4 py-2 ml-4 text-sm font-semibold text-gray-900 bg-white border border-gray-900 rounded-md">Back</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}