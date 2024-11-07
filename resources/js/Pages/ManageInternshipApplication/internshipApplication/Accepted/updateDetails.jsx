import DefaultLayout from "@/layout/defaultLayout";
import { useState } from "react";
import { Head, router } from "@inertiajs/react";

export default function UpdateAcceptedOfferDetails({ acceptedOffer }) {
  const [startDate, setStartDate] = useState('' || acceptedOffer.startDate);
  const [endDate, setEndDate] = useState('' || acceptedOffer.endDate);
  const [errors, setErrors] = useState({});
  const [supervisorName, setSupervisorName] = useState('' || acceptedOffer.supervisorName);
  const [supervisorEmail, setSupervisorEmail] = useState('' || acceptedOffer.supervisorEmail);
  const [supervisorPhone, setSupervisorPhone] = useState('' || acceptedOffer.supervisorPhone);
  const [supervisorPosition, setSupervisorPosition] = useState('' || acceptedOffer.supervisorPosition);
  const [supervisorDepartment, setSupervisorDepartment] = useState('' || acceptedOffer.supervisorDepartment);
  const [workingDays, setWorkingDays] = useState('' || acceptedOffer.workingDays);
  const [startTime, setStartTime] = useState('' || acceptedOffer.startTime);
  const [endTime, setEndTime] = useState('' || acceptedOffer.endTime);



  const handleEndDateCheckboxChange = (e) => {
    if (e.target.checked) {
      setEndDate(acceptedOffer.application.expectedEndDate);
    } else {
      setEndDate('');
    }
  };

  const handleStartDateCheckboxChange = (e) => {
    if (e.target.checked) {
      setStartDate(acceptedOffer.application.expectedStartDate);
    } else {
      setStartDate('');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent the form from refreshing the page
  
    // Validate the form data
    if (startDate >= endDate) {
      setErrors({ startDate: 'Start date must be less than end date' });
      return;
    }
  
    // Post form data using Inertia
    router.post(`/internship-applications/${acceptedOffer.id}/${acceptedOffer.application.id}/update-accepted-offer-details`, {
      startDate,
      endDate,
      supervisorName,
      supervisorEmail,
      supervisorPhone,
      supervisorPosition,
      supervisorDepartment,
      workingDays,
      startTime,
      endTime
    }, {
      onError: (errors) => {
        setErrors(errors);
      }
    });
  };

  const handleCancel = () => {
    router.get('/internship-applications/accepted-applicants');
  }

  return (
    <DefaultLayout>
      <Head title="Update Accepted Offer Details" />
      <div className="bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4">
        <div className="w-full p-5 mt-2 mx-auto bg-white border border-gray-200 rounded-lg shadow lg:max-w-3xl">

          <h5 className="text-center mb-2 text-lg font-bold tracking-tight text-gray-900">
            Update Accepted Offer Details
          </h5>

          
          <div className="flex flex-wrap justify-between mt-4">
            <div className="flex flex-wrap gap-2">
              <p className="flex font-semibold text-base text-gray-700 gap-2">
                Name:
              </p>

              <span className="">{acceptedOffer.application.student.firstName} {acceptedOffer.application.student.lastName}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <p className="flex font-semibold text-base text-gray-700 ">
                Applied Internship:
              </p>
              <span className="">{acceptedOffer.application.internship.internshipTitle}</span>
            </div>
          </div>

          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 pr-2">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="expectedStartDate"
                    checked={startDate === acceptedOffer.application.expectedStartDate}
                    onChange={handleStartDateCheckboxChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="expectedStartDate" className="ml-2 text-sm font-medium text-gray-900">Same as Student's Expected Start Date</label>
                </div>
                <label className="block mb-2 font-semibold text-gray-700">Start Date</label>
                <input type="date"
                  placeholder="MM/DD/YYYY"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg" />
                  {errors.startDate && <p className="text-red-600">{errors.startDate}</p>}
              </div>
              <div className="w-full lg:w-1/2 mt-4 lg:mt-0 lg:pl-2">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="expectedEndDate"
                    checked={endDate === acceptedOffer.application.expectedEndDate}
                    onChange={handleEndDateCheckboxChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="expectedEndDate" className="ml-2 text-sm font-medium text-gray-900">Same as Student's Expected End Date</label>
                </div>
                <label className="block mb-2 font-semibold text-gray-700">End Date</label>
                <input type="date"
                  placeholder="MM/DD/YYYY"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg" />
                  {errors.endDate && <p className="text-red-600">{errors.endDate}</p>}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row mt-4">
              <div className="w-full lg:w-1/2 pr-2">
                <label className="block mb-2 font-semibold text-gray-700">Supervisor Name</label>
                <input type="text"
                  value={supervisorName}
                  onChange={(e) => setSupervisorName(e.target.value)}
                  placeholder="Enter supervisor name"
                  className="w-full p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="w-full lg:w-1/2 mt-4 lg:mt-0 lg:pl-2">
                <label className="block mb-2 font-semibold text-gray-700">Supervisor Email</label>
                <input type="email"
                  placeholder="Enter email address"
                  value={supervisorEmail}
                  onChange={(e) => setSupervisorEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg" />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row mt-4">
              <div className="w-full lg:w-1/2 pr-2">
                <label className="block mb-2 font-semibold text-gray-700">Supervisor Phone</label>
                <input type="text"
                  placeholder="Enter phone number"
                  value={supervisorPhone}
                  onChange={(e) => setSupervisorPhone(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="w-full lg:w-1/2 mt-4 lg:mt-0 lg:pl-2">
                <label className="block mb-2 font-semibold text-gray-700">Supervisor Position</label>
                <input type="text"
                  placeholder="Enter supervisor position"
                  value={supervisorPosition}
                  onChange={(e) => setSupervisorPosition(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg" />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row mt-4">
              <div className="w-full lg:w-1/2 pr-2">
                <label className="block mb-2 font-semibold text-gray-700">Supervisor Department</label>
                <input type="text"
                  placeholder="Enter supervisor department"
                  value={supervisorDepartment}
                  onChange={(e) => setSupervisorDepartment(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="w-full lg:w-1/2 mt-4 lg:mt-0 lg:pl-2">
                <label className="block mb-2 font-semibold text-gray-700">Working Days Per Week</label>
                <input type="text"
                  placeholder="Enter working days"
                  value={workingDays}
                  onChange={(e) => setWorkingDays(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg" />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row mt-4">
              <div className="w-full lg:w-1/2 pr-2">
                <label className="block mb-2 font-semibold text-gray-700">Start Time</label>
                <div class="relative">
                  <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="time"
                    name="startTime"
                    id="startTime"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required />
                </div>
              </div>
              <div className="w-full lg:w-1/2 mt-4 lg:mt-0 lg:pl-2">
                <label className="block mb-2 font-semibold text-gray-700">End Time</label>
                <div class="relative">
                  <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="time"
                    name="endTime"
                    id="endTime"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required />
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="px-6 py-2 bg-blue-800 text-white rounded-lg">Update</button>
              <button type="button" onClick={handleCancel} className="ml-2 px-6 py-2 bg-red-600 text-white rounded-lg ml-4">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}