import React, { useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import CompleteMessage from "./completeMessage";
import Swal from "sweetalert2";
import DefaultLayout from "@/layout/defaultLayout";
import { Head, router } from "@inertiajs/react";

const RegisterEmployerForm = ({ employer }) => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState({
    companyInfo: {
      companyName: "",
      companyEmail: "",
      businessRegNum: "",
      businessRegDate: "",
      documentType: "",
      documentName: "",
      documentURL: "",
      companyPhone: "",
      companyAddress1: "",
      companyAddress2: "",
      companyPostalCode: "",
      companyCity: "",
      companyState: "",
      companyCountry: "",
      companySector: "",
      companySize: "",
      companyWebsite: "",
      companyType: "",
    },
    logo: {
      logo: '',
      companyLogo: "",
    },
    employerInfo: {
      firstName: employer.firstName,
      lastName: employer.lastName,
      email: employer.email,
      phoneNum: employer.phoneNum,
      position: "",
      department: "",
    },
  });

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleStep4Submit = () => {
    Swal.fire({
      title: "Submission Confirmation",
      text: "You cannot edit the information after submission. Do you want to submit the form?",
      icon: "warning",
      confirmButtonText: "Yes, I'm sure",
      confirmButtonColor: "#3085d6",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        router.post("/employer/register", formData, {
          onSuccess: () => {
            Swal.fire({
              title: "Registration Complete",
              text: "Your company has been registered successfully!",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              setStep(5); // Move to the completion step
            });
          },
          onError: (errors) => {
            console.error("Form submission error:", errors);
            Swal.fire({
              title: 'Submission Error',
              text: 'There was an error submitting your application. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#3085d6',
            });
            setErrors(errors);
          },
        });
      }
    });
  };

  const updateCompanyDetails = (newDetails) => {
    setFormData((prevData) => ({
      ...prevData,
      companyInfo: {
        ...prevData.companyInfo,
        ...newDetails,
      },
    }));
  };

  const updateEmployerDetails = (newDetails) => {
    setFormData((prevData) => ({
      ...prevData,
      employerInfo: {
        ...prevData.employerInfo,
        ...newDetails,
      },
    }));
  };

  const updateCompanyLogo = (newLogoDetails) => {
    setFormData((prevData) => ({
      ...prevData,
      logo: {
        ...prevData.logo,
        ...newLogoDetails,
      },
    }));
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <Step1 formData={formData.companyInfo} setFormData={updateCompanyDetails} />;
      case 2:
        return (
          <div>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 font-bold">
              Step 2: Upload Company Logo
            </p>
            <Step2 formData={formData.logo} setFormData={updateCompanyLogo} />
          </div>
        );
      case 3:
        return (
          <div>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 font-bold">
              Step 3: Complete Your Information
            </p>
            <Step3 formData={formData.employerInfo} setFormData={updateEmployerDetails} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DefaultLayout>
      <Head title="Company Registration" />
      <div className="bg-gray-200 px-6 py-10 min-h-screen lg:py-4">
        <div className="w-full bg-white rounded-lg shadow dark:border p-4 mx-auto mt-5 mb-5 lg:max-w-2xl lg:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="space-y-8 md:space-y-6 sm:p-8">
            <h1 className="text-lg font-bold leading-tight tracking-tight text-blue-900 md:text-2xl dark:text-white">
              {step === 1
                ? "Register Your Company"
                : step === 2
                  ? "Upload Company Logo"
                  : step === 3
                    ? "Insert Contact Person Info"
                    :""}
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div className="mx-auto w-full max-w-sm">
                <ol className="flex items-center justify-center w-full mb-5">
                  {[1, 2, 3].map((num) => (
                    <li
                      key={num}
                      className={`flex w-full items-center ${step >= num
                        ? "text-blue-600 dark:text-blue-500"
                        : ""
                        } ${num < 3 // Ensure the line appears only between steps, not after the last step
                          ? step >= num
                            ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800"
                            : "after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700"
                          : ""
                        }`}
                    >
                      <span
                        className={`flex items-center justify-center w-10 h-10 ${step >= num ? "bg-blue-100 dark:bg-blue-800" : "bg-gray-100 dark:bg-gray-700"
                          } rounded-full lg:h-12 lg:w-12 shrink-0`}
                      >
                        {num}
                      </span>
                    </li>
                  ))}
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
              <div className="flex items-center justify-between mt-8">
                {step > 1 && step < 5 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Previous
                  </button>
                )}
                {step === 1 ? (
                  <button
                    type="button"
                    onClick={() => router.visit("/employer/dashboard")}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Back to Home
                  </button>
                ) : null}
                {step < 4 && step !== 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Next
                  </button>
                ) : step === 3 ? (
                  <button
                    type="button"
                    onClick={handleStep4Submit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Submit
                  </button>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default RegisterEmployerForm;
