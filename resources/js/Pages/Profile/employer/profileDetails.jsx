import DefaultLayout from "@/layout/defaultLayout";
import { useEffect, useState } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import { countries } from "@/components/country";
import Swal from "sweetalert2";
export default function CompanyProfileDetails({ employer }) {

  const [isEditMode, setIsEditMode] = useState(false);
  const [logoPreview, setLogoPreview] = useState(
    employer.companyLogo ? `/storage/company/companyLogo/${employer.companyLogo}` : null);
  const [documentPreview, setDocumentPreview] = useState(null);

  console.log(employer);

  const handleEditClick = () => {
    setIsEditMode(true);
  };


  const { flash } = usePage().props;

  useEffect(() => {
    if (flash.success) {
      Swal.fire({
        title: 'Success!',
        text: flash.success,
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2563EB'
      });
    }
  }, [flash]);

  const { data, setData, post, processing, errors } = useForm({
    companyLogo: null,
    companyDescription: employer.companyDescription || "",
    companyCountry: employer.companyCountry || "",
    companyName: employer.companyName || "",
    businessRegDate: employer.businessRegDate || "",
    companyType: employer.companyType || "",
    companySize: employer.companySize || "",
    companyEmail: employer.companyEmail || "",
    businessRegNum: employer.businessRegNum || "",
    documentType: employer.documentType || "",
    documentName: null,
    companyPhone: employer.companyPhone || "",
    companyWebsite: employer.companyWebsite || "",
    companySector: employer.companySector || "",
    companyAddress1: employer.companyAddress1 || "",
    companyAddress2: employer.companyAddress2 || "",
    companyPostalCode: employer.companyPostalCode || "",
    companyCity: employer.companyCity || "",
    companyState: employer.companyState || "",
    mission: employer.mission || "",
    vision: employer.vision || "",
  });


  const handleSaveChanges = () => {
  
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

    router.post(route('employer.companydetails.update', { id: employer.id }), formData); 
    setIsEditMode(false);
  };

  const handleCancel = () => {
    // Revert changes if needed
    setIsEditMode(false);
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
      <div className="bg-gray-200 min-h-screen overflow-y-auto lg:py-4">
        <div className="container mx-auto bg-white border border-gray-900 rounded-lg p-6 max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-bold leading-tight tracking-tight text-blue-900 md:text-xl mb-2">
              Company Profile Details
            </h1>
            <div className="flex items-center">
              {isEditMode ? (
                <>
                  <a className="text-base font-medium text-blue-800 cursor-pointer mr-4" onClick={handleSaveChanges}>Save Changes</a>
                  <a className="text-base font-medium text-red-700 cursor-pointer" onClick={handleCancel}>Cancel</a>
                </>
              ) : (
                <a className="text-base font-medium text-blue-800 cursor-pointer" onClick={handleEditClick}>Edit</a>
              )}
            </div>
          </div>
          <form>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-3">
                <div className="companyLogo">
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
                      disabled={!isEditMode}
                      onChange={handleLogoChange}
                      hidden
                    />
                  </label>
                </div>
                <div className="aboutUs mt-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900">About Us</label>
                  <textarea id="companyDescription" name="companyDescription" rows={16} className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Company Description" value={data.companyDescription} onChange={(e) => setData("companyDescription", e.target.value)} disabled={!isEditMode} required />
                </div>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Country</label>
                  <select name="companyCountry" id="companyCountry" className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={data.companyCountry} onChange={(e) => setData("companyCountry", e.target.value)} disabled={!isEditMode} required>
                    <option value="" disabled>Select Country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country.name}>{country.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Company Phone</label>
                  <input type="text" name="companyPhone" id="companyPhone" className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Company Phone" value={data.companyPhone} onChange={(e) => setData("companyPhone", e.target.value)} disabled={!isEditMode} required />
                </div>
              </div>
              <div className="col-span-9">
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-6">
                    <div className="companyName">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Company Name</label>
                      <input type="text" name="companyName" id="companyName" className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Company Name" value={data.companyName} onChange={(e) => setData("companyName", e.target.value)} disabled={!isEditMode} required />
                    </div>
                    <div className="registrationDate mt-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Business Registration Date</label>
                      <input type="date" name="businessRegDate" id="businessRegDate" className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={data.businessRegDate} onChange={(e) => setData("businessRegDate", e.target.value)} disabled={!isEditMode} required />
                    </div>
                    <div className="companyType mt-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Company Type</label>
                      <select name="companyType" id="companyType" className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={data.companyType} onChange={handleCompanyTypeChange} disabled={!isEditMode} required>
                        <option disabled>Select Company Type</option>
                        <option value="SME">Small & Medium Enterprise (SMEs)</option>
                        <option value="International">International Companies</option>
                        <option value="MNC">Multinational Corporations (MNCs)</option>
                        <option value="NGO">Non-Governmental Organizations (NGOs)</option>
                        <option value="Government Agency">Government Agency</option>
                        <option value="Government Company">Government Companies</option>
                      </select>
                    </div>
                    <div className="companySize mt-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Company Size</label>
                      <select name="companySize" id="companySize" className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={data.companySize} onChange={(e) => setData("companySize", e.target.value)} disabled={!isEditMode} required>
                        <option value="" disabled>Select Company Size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="500+">500+ employees</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div className="companyEmail">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Company Email</label>
                      <input type="email" name="companyEmail" id="companyEmail" className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Company Email" value={data.companyEmail} onChange={(e) => setData("companyEmail", e.target.value)} disabled={!isEditMode} required />
                    </div>
                    <div className="BusinessRegNum mt-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Business Registration Number</label>
                      <input type="text" name="businessRegNum" id="businessRegNum" className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Business Registration Number" value={data.businessRegNum} onChange={(e) => setData("businessRegNum", e.target.value)} disabled={!isEditMode} required />
                    </div>
                    <div className="SSMDocument mt-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900">{data.documentType}</label>
                      <div className="flex items-center gap-2">
                        <a id="download-link" href={`/storage/company/businessRegDocuments/${employer.documentName}`} target="_blank" style={{ display: 'none' }} />
                        <button onClick={(e) => { e.preventDefault(); document.getElementById('download-link').click() }} className="mt-1 px-4 py-2 border border-gray-300 rounded-md bg-red-600 text-white">Download</button>
                        <input
                          type="file"
                          id="documentName"
                          name="documentName"
                          hidden
                          disabled={!isEditMode}
                          onChange={handleDocumentChange}
                        />
                        <label
                          htmlFor="documentName"
                          className="mt-1 p-2 rounded-md bg-blue-800 text-white cursor-pointer"
                        >
                          Upload New Document
                        </label>
                      </div>
                      {documentPreview && (
                        <p className="mt-2 text-sm font-medium text-gray-900">{documentPreview}</p>
                      )}
                    </div>
                    <div className="Sector mt-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Sector</label>
                      <input type="text" name="companySector" id="companySector" className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Company Sector" value={employer.companySector} onChange={(e) => setData("companySector", e.target.value)} disabled={!isEditMode} required />
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Company Address</label>
                  <input type="text" name="address1" id="address1" className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Address Line 1" value={employer.companyAddress1} onChange={(e) => setData("companyAddress1", e.target.value)} disabled={!isEditMode} required />
                  <input type="text" name="address2" id="address2" className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-2" placeholder="Address Line 2" value={employer.companyAddress2} onChange={(e) => setData("companyAddress2", e.target.value)} disabled={!isEditMode} />
                </div>
                <div className="grid grid-cols-12 gap-4 mt-2">
                  <div className="col-span-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Postcode</label>
                    <input type="text" name="postcode" id="postcode" className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Postcode" value={data.companyPostalCode} onChange={(e) => setData("companyPostalCode", e.target.value)} disabled={!isEditMode} required />
                  </div>
                  <div className="col-span-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">City</label>
                    <input type="text" name="city" id="city" className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="City" value={data.companyCity} onChange={(e) => setData("companyCity", e.target.value)} disabled={!isEditMode} required />
                  </div>
                  <div className="col-span-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">State</label>
                    <input type="text" name="state" id="state" className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="State" value={data.companyState} onChange={(e) => setData("companyState", e.target.value)} disabled={!isEditMode} required />
                  </div>
                </div>
                <div className="mt-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Mission</label>
                  <textarea id="mission" name="mission" rows={3} className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Mission" value={data.mission} onChange={(e) => setData("mission", e.target.value)} disabled={!isEditMode} required />
                </div>
                <div className="mt-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Vision</label>
                  <textarea id="vision" name="vision" rows={3} className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Vision" value={data.vision} onChange={(e) => setData("vision", e.target.value)} disabled={!isEditMode} required />
                </div>
                <div className="mt-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Company Website</label>
                  <input type="url" name="companyWebsite" id="companyWebsite" className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Company Website" value={data.companyWebsite} onChange={(e) => setData("companyWebsite", e.target.value)} disabled={!isEditMode} required />
              </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}