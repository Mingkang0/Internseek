import DefaultLayout from "@/layout/defaultLayout";
import { router } from "@inertiajs/react";
import { useState } from 'react';

export default function UpdateShortlistedResult({ application }) {
  const [applicationStatus, setApplicationStatus] = useState('Shortlisted');
  const [offerLetter, setOfferLetter] = useState(null);
  const [actualAllowance, setActualAllowance] = useState('');
  const [errors, setErrors] = useState({});

  const handleApplicationStatusChange = (e) => {
    setApplicationStatus(e.target.value);
  };

  const handleOfferLetterChange = (e) => {
    const file = e.target.files[0];
    setOfferLetter(file);
  };

  const handleAllowanceCheckboxChange = (e) => {
    if (e.target.checked) {
      setActualAllowance(application.expectedAllowance);
    } else {
      setActualAllowance('');
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('applicationStatus', applicationStatus);

    if (applicationStatus === 'Approved') {
      if (offerLetter) {
        formData.append('offerLetter', offerLetter);
      }
      formData.append('actualAllowance', actualAllowance || '');
    }

    router.post(`/internship-applications/${application.id}/update-shortlisted-results`, formData, {
      onError: (errors) => {
        console.error(errors);
        setErrors(errors);
      },
    });
  };

  return (
    <DefaultLayout>
      <div className="bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4">
        <div className="w-3/4 p-5 mt-2 mx-auto bg-white border border-gray-200 rounded-lg shadow">
          <h5 className="text-center mb-2 text-lg font-bold tracking-tight text-gray-900">
            Update Shortlisted Result
          </h5>

          <div className="flex justify-between mt-4">
            <p className="flex font-semibold text-base text-gray-700 gap-2">
              Name: <span className="font-medium">{application.student.firstName} {application.student.lastName}</span>
            </p>
            <p className="flex font-semibold text-base text-gray-700 gap-2">
              Applied Internship: <span className="font-medium">{application.internship.internshipTitle}</span>
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6 text-left mt-4">
            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700">Application Status</label>
              <select
                name="applicationStatus"
                id="applicationStatus"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={applicationStatus}
                onChange={handleApplicationStatusChange}
              >
                <option value="">Select Status</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Approved">Approved</option>
                <option value="Unsuccessful">Unsuccessful</option>
              </select>
            </div>

            {applicationStatus === 'Approved' && (
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">Offer Letter</label>
                <input
                  type="file"
                  name="offerLetter"
                  id="offerLetter"
                  className="block w-full text-sm text-gray-900 border border-gray-500 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  onChange={handleOfferLetterChange}
                />
                {errors.offerLetter && <p className="text-red-500 text-sm">{errors.offerLetter}</p>}
              </div>
            )}

            {applicationStatus === 'Approved' && (
              <div className="col-span-6">
                <div className='flex items-center mb-2'>
                  <input
                    type="checkbox"
                    id="expectedAllowance"
                    checked={actualAllowance === application.expectedAllowance}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    onChange={handleAllowanceCheckboxChange}
                  />
                  <label htmlFor="expectedAllowance" className="ml-2 text-sm font-medium text-gray-900">Same as Expected Allowance</label>
                </div>

                <label className="block text-sm font-medium text-gray-700">Actual Allowance</label>
                <input
                  type="number"
                  name="actualAllowance"
                  id="actualAllowance"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={actualAllowance}
                  placeholder="Enter actual allowance"
                  onChange={(e) => setActualAllowance(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Update Status
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-white text-gray-800 font-semibold border border-gray-800 rounded-lg"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
