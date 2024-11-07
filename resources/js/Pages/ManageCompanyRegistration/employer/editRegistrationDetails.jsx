import DefaultLayout from "@/layout/defaultLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useState } from 'react';

export default function EditRegistrationDetails({ employer, company }) {

  const [logoPreview, setLogoPreview] = useState(
    company.companyLogo ? `/storage/company/companyLogo/${company.companyLogo}` : null
  );

  const [documentPreview, setDocumentPreview] = useState(null);

  const { data, setData, post, errors, progress } = useForm({
    companyName: company.companyName || "",
    companyPhone: company.companyPhone || "",
    companyEmail: company.companyEmail || "",
    businessRegNum: company.businessRegNum || "",
    businessRegDate: company.businessRegDate || "",
    companySize: company.companySize || "",
    companyType: company.companyType || "",
    companyCountry: company.companyCountry || "",
    companySector: company.companySector || "",
    companyWebsite: company.companyWebsite || "",
    companyAddress1: company.companyAddress1 || "",
    companyAddress2: company.companyAddress2 || "",
    companyPostalCode: company.companyPostalCode || "",
    companyCity: company.companyCity || "",
    companyState: company.companyState || "",
    documentType: company.documentType || "",
    documentName: null,
    companyLogo: null,
    firstName: employer.firstName || "",
    lastName: employer.lastName || "",
    phoneNum: employer.phoneNum || "",
    position: employer.position || "",
    department: employer.department || "",
  });

  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();

    e.preventDefault();

    const formData = new FormData();

    // Append non-file data
    Object.keys(data).forEach(key => {
      if (data[key] && key !== 'documentName' && key !== 'companyLogo') {
        formData.append(key, data[key]);
      }
    });

    // Append file data if available
    if (data.documentName) {
      formData.append("documentName", data.documentName);
    }

    if (data.companyLogo) {
      formData.append("companyLogo", data.companyLogo);
    }

    post(`/update/registration-details/${company.id}`, {
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onSuccess: () => {
        console.log("Form submitted successfully");
      },
      onError: () => {
        console.log("Form submission failed");
      },
    });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      setData("companyLogo", file);
    }
    else {
      setData("companyLogo", null);
    }
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Please select a PDF, DOC, or DOCX file.');
        return;
      }

      setDocumentPreview(file.name);
      setData("documentName", file);
    } else {
      // Clear the documentName if no file is selected
      setData("documentName", null);
    }
  };

  const handleCompanyTypeChange = (e) => {
    let documentType = getDocumentType(e.target.value);
    setData({ ...data, companyType: e.target.value, documentType });
  }

  const getDocumentType = (companyType) => {
    switch (companyType) {
      case 'SME':
        return 'SSM Certificate';
      case 'International':
        return 'Certificate of Incorporation';
      case 'MNC':
        return 'ROS Certificate';
      case 'NGO':
        return 'ROS Certificate';
      case 'Government Agency':
        return 'Establishment Act Certificate';
      case 'Government Company':
        return ' MOF Registration Certificate';
      default:
        return '';
    }
  };

  return (
    <DefaultLayout>
      <Head title="Edit Registration Details" />
      <div className="bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4">
        <div className="w-full mx-auto lg:max-w-4xl">
          <div className="w-full p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow">

            <h5 className="text-xl font-bold text-gray-900">Company Details</h5>
            {
              company.registrationStatus === 'Pending' ? (
                <div>
                  <p className="text-base font-medium text-gray-900">Status: Pending</p>
                  <p className="mt-2 text-sm font-medium text-gray-900">You can edit your registration details below.</p>

                </div>
              ) : (
                company.registrationStatus === 'Inquiry' ? (
                  // Render content for "Inquiry" status
                  <div>
                    <p>Status: Inquiry</p>
                    <p className="mt-2">Comment from Admin: {company.inquiryComment} </p>

                  </div>
                ) : (
                  // Render default content or handle other statuses
                  <div>You are not allowed to visit this page</div>
                )
              )
            }
            {(company.registrationStatus === 'Pending' || company.registrationStatus === 'Inquiry') && (
              <form onSubmit={handleSubmit}>
                <div className="companyDetails">
                  <p className="mb-2 text-lg font-bold tracking-tight text-blue-800 mt-2">Company Details</p>
                  <div className="grid grid-cols-2 gap-8 mt-4">
                    <div className="col-span-1">
                      <label className="block text-sm font-semibold text-gray-700">Company Name</label>
                      <input name="companyName"
                        className="mt-1 p-2 w-full border border-gray-300 bg-white rounded-md text-sm" type="text"
                        value={data.companyName}
                        onChange={(e) => setData("companyName", e.target.value)} />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-semibold text-gray-700">Company Email</label>
                      <input name="companyEmail"
                        className="mt-1 p-2 w-full border border-gray-300 bg-white rounded-md text-sm" type="email"
                        value={data.companyEmail}
                        onChange={(e) => setData("companyEmail", e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="col-span-1">
                      <label className="block text-sm font-semibold text-gray-700">Business Registration No.</label>
                      <input name="businessRegNum"
                        className="mt-1 p-2 w-full border border-gray-300 bg-white rounded-md text-sm" type="text"
                        value={data.businessRegNum}
                        onChange={(e) => setData("businessRegNum", e.target.value)} />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-semibold text-gray-700">Business Registration Date</label>
                      <input name="businessRegDate"
                        className="mt-1 p-2 w-full border border-gray-300 bg-white rounded-md text-sm" type="date"
                        value={data.businessRegDate}
                        onChange={(e) => setData("businessRegDate", e.target.value)} />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-semibold text-gray-700">{data.documentType}</label>
                      <div className="flex items-center gap-4">
                        <a id="download-link" href={`/storage/company/businessRegDocuments/${company.documentName}`} target="_blank" style={{ display: 'none' }} />
                        <button onClick={(e) => { e.preventDefault(); document.getElementById('download-link').click() }} className="mt-1 px-4 py-2 border border-gray-300 rounded-md bg-red-600 text-white">Download</button>
                        <input
                          type="file"
                          id="documentName"
                          name="documentName"
                          onChange={handleDocumentChange}
                          hidden
                        />
                        <label
                          htmlFor="documentName"
                          className="mt-1 px-4 py-2 border border-gray-900 rounded-md bg-white text-grey-900 cursor-pointer"
                        >
                          Upload New Document
                        </label>
                      </div>
                      {documentPreview && <p className="text-sm text-gray-600 mt-2">Selected Document: {documentPreview}</p>}
                      {errors.documentName && <div className="text-red-600">{errors.documentName}</div>}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="col-span-1">
                      <label className="block text-sm font-semibold text-gray-700">Company Size</label>
                      <input name="companySize"
                        className="mt-1 p-2 w-full border border-gray-300 bg-white rounded-md text-sm" type="text"
                        value={data.companySize}
                        onChange={(e) => setData('companySize', e.target.value)} />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-semibold text-gray-700">Company Type</label>
                      <select
                        name="companyType"
                        id="companyType"
                        value={data.companyType}
                        className="mt-1 p-2 w-full border border-gray-300 bg-white rounded-md text-sm"
                        onChange={handleCompanyTypeChange}
                        required
                      >
                        <option value="" disabled>Select Company Type</option>
                        <option value="SME">Small & Medium Enterprise (SMEs)</option>
                        <option value="International">International Companies</option>
                        <option value="MNC">Multinational Corporations (MNCs)</option>
                        <option value="NGO">Non-Governmental Organizations (NGOs)</option>
                        <option value="Government Agency">Government Agency</option>
                        <option value="Government Company">Government Companies</option>
                      </select>

                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-semibold text-gray-700">Country</label>
                      <input name="companyCountry"
                        className="mt-1 p-2 w-full border border-gray-300 bg-white rounded-md text-sm" type="text"
                        value={data.companyCountry}
                        onChange={(e) => setData('companyCountry', e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="col-span-1">
                      <label className="block text-sm font-semibold text-gray-700">Company Phone</label>
                      <input name="companyPhone" className="mt-1 p-2 w-full border border-gray-300 bg-white rounded-md text-sm" type="text" value={data.companyPhone} onChange={(e) => setData('companyPhone', e.target.value)} />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-semibold text-gray-700">Company Sector</label>
                      <input name="companySector" className="mt-1 p-2 w-full border border-gray-300 bg-white rounded-md text-sm" type="text" value={data.companySector} onChange={(e) => setData('companySector', e.target.value)} />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-semibold text-gray-700">Company Website</label>
                      <input name="companyWebsite" className="mt-1 p-2 w-full border border-gray-300 bg-white rounded-md text-sm" type="text" value={data.companyWebsite} onChange={(e) => setData('companyWebsite', e.target.value)} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <h5 className="text-lg font-bold text-blue-800">Company Address</h5>
                    <label className="block text-sm font-semibold text-gray-700">Company Address</label>
                    <input name="companyAddress1" className="mt-1 p-2 w-full border border-gray-300 bg-white rounded-md text-sm" value={data.companyAddress1} onChange={(e) => setData('companyAddress1', e.target.value)} />
                    <input name="companyAddress2" className="mt-2 p-2 w-full border border-gray-300 bg-white rounded-md text-sm" value={data.companyAddress2} onChange={(e) => setData('companyAddress2', e.target.value)} />
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="col-span-1">
                      <label className="block text-sm font-semibold text-gray-700">Postal code</label>
                      <input name="companyPostalCode" className="mt-1 p-2 w-full border border-gray-300 bg-white rounded-md text-sm" type="text" value={data.companyPostalCode} onChange={(e) => setData('companyPostalCode', e.target.value)} />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-semibold text-gray-700">City</label>
                      <input name="companyCity" className="mt-1 p-2 w-full border border-gray-300 bg-white rounded-md text-sm" type="text" value={data.companyCity} onChange={(e) => setData('companyCity', e.target.value)} />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-semibold text-gray-700">State</label>
                      <input name="companyState" className="mt-1 p-2 w-full border border-gray-300 bg-white rounded-md text-sm" type="text" value={data.companyState} onChange={(e) => setData('companyState', e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 p-2 gap-8">
                  <div className="companyLogo col-span-3">
                    <p className="mb-2 text-xl font-bold tracking-tight text-blue-800">Company Logo</p>
                    <label>
                      <div className="relative cursor-pointer">
                        <img
                          src={logoPreview}
                          alt="CompanyLogo"
                          className="w-36 h-36 rounded-full mx-auto border ring-1 ring-gray-900"
                        />
                        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100 transition duration-300">
                          <p className="text-sm font-semibold text-gray-700 text-center">Change logo</p>
                        </div>
                      </div>
                      <input
                        type="file"
                        id="companyLogo"
                        name="companyLogo"
                        onChange={handleLogoChange}
                        hidden
                      />
                    </label>
                  </div>
                  <div className="contactPerson col-span-9">
                    <p className="mb-2 text-lg font-bold tracking-tight text-blue-800">Employer Details</p>
                    <>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        <div className="col-span-1">
                          <label className="block text-sm font-semibold text-gray-700">First Name</label>
                          <input name="firstName" className="mt-1 p-2 w-full border border-gray-300 bg-white rounded-md text-sm" type="text"
                            value={data.firstName}
                            onChange={(e) => setData('firstName', e.target.value)} />
                        </div>
                        <div className="col-span-1">
                          <label className="block text-sm font-semibold text-gray-700">First Name</label>
                          <input name="lastName" className="mt-1 p-2 w-full border border-gray-300 bg-white rounded-md text-sm" type="text"
                            value={data.lastName}
                            onChange={(e) => setData('lastName', e.target.value)} />
                        </div>
                        <div className="col-span-1">
                          <label className="block text-sm font-semibold text-gray-700">Email</label>
                          <input name="email" className="mt-1 p-2 w-full border border-gray-300 bg-white rounded-md text-sm" type="email"
                            value={employer.email}
                            disabled />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mt-2">
                        <div className="col-span-1">
                          <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                          <input name="phoneNum" className="mt-1 p-2 w-full border border-gray-300 bg-white rounded-md text-sm" type="text" value={data.phoneNum} onChange={(e) => setData('phoneNum', e.target.value)} />
                        </div>
                        <div className="col-span-1">
                          <label className="block text-sm font-semibold text-gray-700">Position</label>
                          <input name="position" className="mt-1 p-2 w-full border border-gray-300 bg-white rounded-md text-sm" type="text" value={data.position} onChange={(e) => setData('position', e.target.value)} />
                        </div>
                        <div className="col-span-1">
                          <label className="block text-sm font-semibold text-gray-700">Department</label>
                          <input name="department" className="mt-1 p-2 w-full border border-gray-300 bg-white rounded-md text-sm" type="text" value={data.department} onChange={(e) => setData('department', e.target.value)} />
                        </div>
                      </div>
                    </>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <button type="submit" className="px-5 py-2 text-sm font-semibold text-white bg-blue-800 rounded-md">Edit</button>
                  <button type="button" onClick={() => { router.visit('/employer/dashboard') }} className="px-4 py-2 ml-2 text-sm font-semibold text-gray-900 bg-white border border-gray-900 rounded-md">Back</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}