import DefaultLayout from "@/layout/defaultLayout";
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";


export default function registrationRequestDetails({ employer, contactPerson }) {

  const { data, setData, errors, post } = useForm({
    registrationStatus: employer.registrationStatus,
    inquiryComment: employer.inquiryComment || '',
  });

  // State to manage the registration status and comment
  const [registrationStatus, setRegistrationStatus] = useState(employer.registrationStatus);
  const [inquiryComment, setInquiryComment] = useState(employer.inquiryComment || '');

  const isApproved = employer.registrationStatus === 'Approved';
  // Handle status change
  const handleStatusChange = (e) => {
    setRegistrationStatus(e.target.value);
    setData('registrationStatus', e.target.value);
    if (e.target.value !== "Inquiry") {
      setInquiryComment(''); // Clear the comment if status is not Inquiry
    }
  };

  const handleCommentChange = (e) => {
    setInquiryComment(e.target.value);
    setData('inquiryComment', e.target.value);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/update-registration-status/${employer.id}`, {
      onSuccess: () => {
        // Handle success response
      },
      onError: () => {
        // Handle error response
      },
    });
  };


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
                  <label className="block text-sm font-semibold text-gray-700">{employer.documentType}</label>
                  <div className="flex items-center gap-4">
                    <a id="download-link" href={`/storage/company/businessRegDocuments/${employer.documentName}`} target="_blank" style={{ display: 'none' }} />
                    <button onClick={(e) => { e.preventDefault(); document.getElementById('download-link').click() }} className="mt-1 px-4 py-2 border border-gray-300 rounded-md bg-red-600 text-white">Download</button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">Company Phone</label>
                  <input name="companyPhone" className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={employer.companyPhone} />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">Company Sector</label>
                  <input name="companySector" className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={employer.companySector} />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700">Company Website</label>
                  <input name="companyWebsite" className="mt-1 p-2 w-full border border-gray-300 bg-gray-100 rounded-md text-sm" type="text" value={employer.companyWebsite} />
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
                <img
                  src={`/storage/company/companyLogo/${employer.companyLogo}`}
                  alt="CompanyLogo"
                  className="w-36 h-36 rounded-full mx-auto border ring-1 ring-gray-900"
                />
              </div>
              <div className="contactPerson col-span-9">
                <p className="mb-2 text-lg font-bold tracking-tight text-blue-800">Contact Person Details</p>
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
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="col-span-1">
                  <div className="update-status">
                    <label className="block text-sm font-semibold text-gray-700">Status</label>
                    <select name="registrationStatus" className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm" value={registrationStatus} onChange={handleStatusChange} disabled={isApproved}>
                      <option disabled>Select Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Inquiry">Inquiry</option>
                    </select>
                  </div>
                </div>
                {registrationStatus === "Inquiry" && (
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700">Comment</label>
                    <textarea
                      name="inquiryComment"
                      className="w-full mt-1 border border-gray-300 rounded-md text-sm"
                      rows="4"
                      value={inquiryComment}
                      onChange={handleCommentChange}
                    />
                  </div>
                )}
              </div>
              <div className="text-center mt-4">
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-blue-800 rounded-md" disabled={isApproved}>Update</button>
                <Link href='/admin/employer-requests' className="px-4 ml-4 py-2 text-sm font-semibold text-gray-900 bg-white border border-gray-900 rounded-md">Back</Link>
              </div>
            </form>

          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}