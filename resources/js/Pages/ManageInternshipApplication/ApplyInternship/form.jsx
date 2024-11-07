import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaTimesCircle } from 'react-icons/fa';
import ApplyStep1 from "../../../components/applyInternship/step1";
import { Head, Link, router } from "@inertiajs/react";
import DefaultLayout from "@/layout/defaultLayout";
import ApplyStep2 from "../../../components/applyInternship/step2";
import ApplyStep3 from "../../../components/applyInternship/step3";

const ApplyInternshipForm = ({ internship, student }) => {
  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState(null);

  const [formData, setFormData] = useState({
    applicationInfo: {
      expectedAllowance: "",
      availability: "",
      expectedStartDate: "",
      expectedEndDate: "",
    },
    documents: {
      ownResume: null,
      coverLetter: null,
      transcript: null,
      SAL: null,
    },
  });


  const BackToInternships = () => {
    if (step <= 3) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will lose all the information you have entered. Do you want to continue?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          router.get('/internships');
        }
      });
    }
    else {
      router.get('/internships');
    }
  };

  console.log(formData);
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const company = internship.company;

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center">
            <p className="mb-4 text-sm text-gray-600 font-semibold">Step 1: Fill Details</p>
            <div className="mb-2">
              <ApplyStep1 student={student} formData={formData.applicationInfo} setFormData={
                (data) => setFormData({ ...formData, applicationInfo: data })
              } />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="text-center">
            <p className="mb-4 text-sm text-gray-600 font-semibold">Step 2: Resume Generated based on profile details</p>
            <div className="mb-2">
              <ApplyStep2 student={student} />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="text-center">
            <p className="mb-4 text-sm text-gray-600 font-semibold">Step 3: Upload Required Documents</p>
            <ApplyStep3 formData={formData.documents} setFormData={
              (data) => setFormData({ ...formData, documents: data })
            } />
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    Swal.fire({
      title: 'Submission Confirmation',
      text: 'You cannot edit the information after submission. Do you want to submit the form?',
      icon: 'warning',
      confirmButtonText: "Yes, I'm sure",
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        router.post(`/student/storeInternshipApplication/${internship.id}`, formData, {
          onSuccess: () => {
            Swal.fire({
              title: 'Application Submitted',
              text: 'Your application has been submitted successfully!',
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#3085d6',
            })
          },
          onError: (errors) => {
            console.error('Form submission error:', errors);
            setErrors(errors);
            Swal.fire({
              title: 'Submission Error',
              text: 'There was an error submitting your application. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#3085d6',
            });
          },
        });
      }
    });
  };

  return (
    <DefaultLayout>
      <Head title="Apply Internship" />
      <div className="bg-gray-200 px-6 py-10 min-h-screen lg:py-4">
        <div className="px-6 py-6 mt-4 bg-white border border-gray-200 rounded-lg shadow mx-auto lg:max-w-5xl lg:w-full">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 flex justify-between items-center">
            Apply Internship: {internship.internshipTitle}
            <FaTimesCircle size={24} className="mr-2 text-gray-600 cursor-pointer" onClick={BackToInternships} />
          </h5>

          <div className="flex flex-wrap gap-4">
            <div className="md:ml:2 mx-auto lg:mx-0">
              <img src={`/storage/company/companyLogo/${company.companyLogo}`} alt="CompanyLogo" className="w-24 h-24 rounded-full border ring-1 ring-gray-900" />
            </div>
            <div className="w-full">
              <div className="flex gap-2">
              <p className="mb-3 font-semibold text-normal text-gray-700">
                Company Name:
              </p>
              <p className="mb-3 text-normal text-gray-700">
                {company?.companyName}
              </p>
              </div>
              <div className="flex gap-2">
                <p className="mb-3 font-semibold text-normal text-gray-700">
                  Company Location:
                </p>
              <p className="mb-3 text-normal text-gray-700">
                {company?.companyCity}, {company?.companyState}
              </p>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-4">
                <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">Allowance: RM {internship.internshipAllowance}</span>
                <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">Internship Period: {internship.internshipDuration} months</span>
                <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">Working Hour: {internship.workingHour} hours per day</span>
                <span className="inline-block px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg">{internship.studyScope}</span>
              </div>
              <hr className="h-px my-4 bg-gray-600" />
              <p className="text-center text-lg font-bold leading-tight tracking-tight text-blue-900">
                Apply Internship
              </p>

              <form className="space-y-4 md:space-y-6" action="#">
                <div className="mx-auto w-full max-w-sm mt-4">
                  <ol className="flex items-center justify-center w-full mb-5">
                    <li className={`flex w-full items-center ${step >= 1 ? "text-blue-600 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block" : "after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block"}`}>
                      <span className={`flex items-center justify-center w-10 h-10 ${step >= 1 ? "bg-blue-100" : "bg-gray-100"} rounded-full lg:h-12 lg:w-12 shrink-0`}>
                        1
                      </span>
                    </li>
                    <li className={`flex w-full items-center ${step >= 2 ? "text-blue-600 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block" : "after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block"}`}>
                      <span className={`flex items-center justify-center w-10 h-10 ${step >= 2 ? "bg-blue-100" : "bg-gray-100"} rounded-full lg:h-12 lg:w-12 shrink-0`}>
                        2
                      </span>
                    </li>
                    <li className={`flex w-full items-center ${step >= 4 ? "text-blue-600" : ""}`}>
                      <span className={`flex items-center justify-center w-10 h-10 ${step >= 3 ? "bg-blue-100" : "bg-gray-100"} rounded-full lg:h-12 lg:w-12 shrink-0`}>
                        3
                      </span>
                    </li>

                  </ol>
                </div>
                {renderStepContent()}
                {errors && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <strong className="font-bold">Error:</strong>
                    <ul className="list-disc pl-5 mt-2">
                      {Object.entries(errors).map(([key, message]) => (
                        <li key={key}>{message}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex items-center justify-center gap-8 mt-8">
                  {step > 1 && step < 4 && (
                    <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                      Previous
                    </button>
                  )}
                  {step < 3 && (
                    <button type="button" onClick={nextStep} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Next
                    </button>
                  )}
                  {step === 3 && (
                    <button type="button" onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ApplyInternshipForm;
