import { FaUpload } from "react-icons/fa";
import React from "react";

const Step2 = ({ formData, setFormData }) => {
  console.log(formData);
  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.result) {
          setFormData({ 
            ...formData,
            logo: fileReader.result,
            companyLogo: file
          });
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="companyLogo mt-2">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Upload Company Logo
        </label>
        <input 
          type="file" 
          name="logo" 
          className="hidden" 
          id="logo_input" 
          onChange={handleLogoChange} 
        />
        <label 
          htmlFor="logo_input" 
          className="w-52 text-sm flex items-center justify-center cursor-pointer border border-gray-900 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-3 rounded-lg"
        >
          <FaUpload size={18} className="mr-2" /> Upload Company Logo
        </label>
        {formData.logo && (
          <div className="mt-4">
            <img src={formData.logo} alt="Company Logo" className="w-36 h-36 mx-auto border ring-1 ring-gray-900 rounded-full object-contain" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2;
