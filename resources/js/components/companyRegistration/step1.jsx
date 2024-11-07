import { useState, useEffect } from "react";
import { MalaysianStates } from "@/components/state";
import { countries } from "@/components/country";


const Step1 = ({ formData, setFormData }) => {
  console.log(formData);
  const [selectedCompanyType, setSelectedCompanyType] = useState(formData.companyType);
  const [selectedCountry, setSelectedCountry] = useState(formData.companyCountry);
  const [uploadedDocument, setUploadedDocument] = useState(formData.documentURL);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });

    if (name === 'companyType') {
      const documentType = getDocumentType(value);
      setFormData( { documentType: documentType });
      setSelectedCompanyType(value);
    } else if (name === 'companyCountry') {
      setSelectedCountry(value);
    }

  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileURL = URL.createObjectURL(file);
      setUploadedDocument(fileURL);
      setFormData({  
        documentName: file,
        documentURL: fileURL, });
    }
  };

  useEffect(() => {
    // Retrieve the document URL from local storage
    const storedDocumentURL = localStorage.getItem('uploadedDocument');
    if (storedDocumentURL) {
      setUploadedDocument(storedDocumentURL);
    }
  }, []);

  useEffect(() => {
    // Store the document URL in local storage
    if (uploadedDocument) {
      localStorage.setItem('uploadedDocumentURL', uploadedDocument);
    } else {
      localStorage.removeItem('uploadedDocument');
    }
  }, [uploadedDocument]);

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
    <div>
      <h2 className="mb-4 text-sm text-gray-600 font-bold">Step 1: Enter company details below.</h2>
      <div className="companyType mt-2">
        <label className="block mb-2 text-sm font-medium text-gray-900">Company Type</label>
        <select name="companyType" id="companyType" value={formData.companyType} className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full" onChange={handleChange} required>
          <option selected>Select Company Type</option>
          <option value="SME">Small & Medium Enterprise (SMEs)</option>
          <option value="International">International Companies</option>
          <option value="MNC">Multinational Corporations (MNCs)</option>
          <option value="NGO">Non-Governmental Organizations (NGOs)</option>
          <option value="Government Agency">Government Agency</option>
          <option value="Government Companies">Government Companies</option>
        </select>
      </div>
      {selectedCompanyType && (
        <div>
          <div className="grid grid-cols-6 lg:grid-cols-12 gap-4 mt-4">
            <div className="col-span-6">
              <div className="companyName">
                <label className="block mb-2 text-sm font-medium text-gray-900">Company Name</label>
                <input type="text" name="companyName" id="companyName" value={formData.companyName} className="p-2.5 block w-full text-sm text-gray-900 border border-gray-500 rounded-lg focus:outline-none" onChange={handleChange} required
                  placeholder="Enter company name" />
              </div>
            </div>
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Business Registration Date</label>
              <input type="date" name="businessRegDate" value={formData.businessRegDate} id="companyRegistrationDate" className="p-2.5 block w-full text-sm text-gray-900 border border-gray-500 rounded-lg focus:outline-none" onChange={handleChange} required />
            </div>
          </div>
          <div className="grid grid-cols-6 lg:grid-cols-12 gap-4 mt-4">
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Business Registration No.</label>
              <input type="text" name="businessRegNum" id="businessRegistrationNum" value={formData.businessRegNum} className="p-2.5 block w-full text-sm text-gray-900 border border-gray-500 rounded-lg focus:outline-none" onChange={handleChange} required
                placeholder="Enter business registration number" />
            </div>
            <div className="col-span-6">
              <div className="document">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  {getDocumentType(selectedCompanyType)}
                </label>
                <input type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-gray-500 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="file_input" />
              </div>

              {uploadedDocument && (
                <div className="mt-2">
                  <a
                    href={uploadedDocument}
                    download
                    className="text-blue-600  text-sm hover:underline"
                  >
                    Download Uploaded Document
                  </a>
                </div>

              )}
            </div>
          </div>
          <div className="companyCountry mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">Country</label>
            <select name="companyCountry" id="country" value={formData.companyCountry} className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full" onChange={handleChange} required>
              <option value="" selected disabled>Select Country</option>
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="companyAddress mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">Company Address</label>
            <input type="text" name="companyAddress1" id="companyAddress1" value={formData.companyAddress1} className="p-2.5 block w-full text-sm text-gray-900 border border-gray-500 rounded-lg focus:outline-none" onChange={handleChange} required
              placeholder="Enter company address line 1" />
            <input type="text" name="companyAddress2" id="companyAddress2" value={formData.companyAddress2} className="p-2.5 block w-full mt-2 text-sm text-gray-900 border border-gray-500 rounded-lg focus:outline-none" onChange={handleChange}
              placeholder="Enter company address line 2" required />
          </div>
          <div className="grid grid-cols-4 lg:grid-cols-12 gap-4 mt-4">
            <div className="col-span-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">Postal Code</label>
              <input type="text" name="companyPostalCode" id="postalCode" className="p-2.5 block w-full text-sm text-gray-900 border border-gray-500 rounded-lg focus:outline-none" value={formData.companyPostalCode} onChange={handleChange} required
                placeholder="Enter postal code" />
            </div>
            <div className="col-span-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">City</label>
              <input type="text" name="companyCity" id="city" className="p-2.5 block w-full text-sm text-gray-900 border border-gray-500 rounded-lg focus:outline-none" value={formData.companyCity} onChange={handleChange} required
                placeholder="Enter city" />
            </div>
            <div className="col-span-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">State</label>
              {selectedCountry === 'Malaysia' ? (
                <select name="companyState" id="state" className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full" value={formData.companyState} onChange={handleChange} required>
                  <option value="" selected>Select State</option>
                  {MalaysianStates.map((state, index) => (
                    <option key={state.value} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input type="text" name="companyState" id="state" className="p-2.5 block w-full text-sm text-gray-900 border border-gray-500 rounded-lg focus:outline-none" value={formData.companyState} onChange={handleChange} required placeholder="Enter state" />
              )}
            </div>

          </div>
          <div className="grid grid-cols-6 lg:grid-cols-12 gap-4 mt-4">
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Company Size</label>
              <select name="companySize" id="companySize" className="bg-white border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full" value={formData.companySize} onChange={handleChange} required>
                <option selected>Select Company Size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1001-5000">1001-5000 employees</option>
                <option value="5001-10000">5001-10000 employees</option>
                <option value="10001+">10001+ employees</option>
              </select>
            </div>
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Company Sector</label>
              <input type="text" name="companySector" id="companySector" value={formData.companySector} className="p-2.5 block w-full text-sm text-gray-900 border border-gray-500 rounded-lg focus:outline-none" onChange={handleChange} required
                placeholder="Enter company sector" />
            </div>
          </div>
          <div className="companyEmail mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">Company Email</label>
            <input type="email" name="companyEmail" id="companyEmail" value={formData.companyEmail} className="p-2.5 block w-full text-sm text-gray-900 border border-gray-500 rounded-lg focus:outline-none" onChange={handleChange} required
              placeholder="Enter company email" />
          </div>
          <div className="companyPhone mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">Company Phone Number</label>
            <input type="text" name="companyPhone" id="companyPhone" value={formData.companyPhone} className="p-2.5 block w-full text-sm text-gray-900 border border-gray-500 rounded-lg focus:outline-none" onChange={handleChange} required
              placeholder="Enter company phone number" />
          </div>
          <div className="companyWebsite mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">Company Website</label>
            <input type="url" name="companyWebsite" id="companyWebsite" value={formData.companyWebsite} className="p-2.5 block w-full text-sm text-gray-900 border border-gray-500 rounded-lg focus:outline-none" onChange={handleChange} required
              placeholder="Enter company website" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Step1;