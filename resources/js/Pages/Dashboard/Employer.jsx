
import CardButtons from "@/components/employerCardButtons";
import DefaultLayout from "@/layout/defaultLayout";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { useState } from "react";



export default function EmployerDashboard({ internships, employer }) {

  const { auth } = usePage().props;
  console.log(auth);

  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
      setShowModal(false);
  };

  return (
    <DefaultLayout>
      <div className="dashboard bg-gray-200 px-6 py-10 min-h-screen lg:py-4">
        {employer ? (
          <>
            <div className="card-buttons">
              <CardButtons />
            </div>
            <div className="internships mt-2 ml-2">
              <Link
                href="/internship-postings/create"
                className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-4 px-4 rounded-lg"
              >
                + Post an Internship
              </Link>
              <div className="recent-internship-list mt-4">
                <h2 className="flex justify-between text-lg font-bold">
                  Recent Internship Postings
                  <a
                    className="text-sm font-medium text-blue-600 cursor-pointer"
                    href="/internship-postings"
                  >
                    View All
                  </a>
                </h2>
                <p className="text-sm font-semibold text-gray-500">
                  Total Internship Posted: 3
                </p>
              </div>
              <div className="internship-posting-card py-2">
                {/* Render internship posting cards here */}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold text-left text-gray-800 text-2xl">
              Welcome to your dashboard, {auth.user.firstName} {auth.user.lastName}
            </p>
            <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full my-4 mx-auto">
              <p className="text-gray-600 text-xl font-bold">
                You do not have any company yet, here are two links to get you started:
              </p>
              <div className="flex flex-col mt-4 gap-8">
                <div className="flex flex-col">
                  <p className="text-gray-500 text-base font-semibold">
                    1. If it is a new company, you can register your company here.
                  </p>
                  <Link
                    href="/register-company"
                    className="mt-4 bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 pl-7 rounded-lg w-56"
                  >
                    Register new company
                  </Link>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500 text-base font-semibold">
                    2. If your company is already registered, you can search for it here.
                  </p>
                  <Link
                    href="/register/existing-employer"
                    className="mt-4 bg-white text-gray-900 hover:bg-gray-100 font-semibold py-3 pl-8 border border-gray-900 border-2 rounded-lg w-64"
                  >
                    Search existing company
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {employer && !auth.user.department && !auth.user.position && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative p-4 w-full max-w-xl max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-lg font-semibold text-gray-900">
                Complete Your Profile
              </h3>
            </div>
            <div className="p-4 md:p-5">
              <p className="text-gray-600 text-base font-semibold mb-4">Please complete your profile details before using this platform.</p>
              <ul className="space-y-4 mb-2">
                <li>
                <Link method="get" href="/contact-person-details" className="block">
                  <label for="contact-person-details" className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100">
                      <div className="w-full text-lg font-semibold">Complete Contact Person Details</div>
                    <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" /></svg>
                  </label>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
        )}
      </div>
    </DefaultLayout>
  );
}