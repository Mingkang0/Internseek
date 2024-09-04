import DefaultLayout from "@/layout/defaultLayout";
import { Head } from "@inertiajs/react";


export default function ReportInternshipList({reports}){ 

  return (
    <DefaultLayout>
    <Head title="Student Profile" />
    <div className="bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4">
    <div>
      <h5 className="text-lg font-bold text-blue-800">My Report (Reported Internships)</h5>
    <div className="border border-gray-900 mx-auto mt-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300 border-b border-gray-900 text-center">
            <tr>
              <th scope="col" className="px-3 py-2 border-r border-gray-900">No.</th>
              <th scope="col" className="px-6 py-3 border-r border-gray-900">Company Name</th>
              <th scope="col" className="px-6 py-3 border-r border-gray-900">Internship Title</th>
              <th scope="col" className="px-6 py-3 border-r border-gray-900">Problem Description</th>
              <th scope="col" className="px-6 py-3 border-r border-gray-900">Status</th>
              <th scope="col" className="px-6 py-3 border-r border-gray-900">Report Date</th>
              <th scope="col" className="px-6 py-3 border-r border-gray-900">Comment</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((data, index) => (
              <tr key={data.id} className="border-b odd:bg-white even:bg-gray-100 hover:bg-gray-50">
                <td className="px-3 py-2 whitespace-nowrap border-r border-gray-900">{index + 1}.</td>
                <td className="px-3 py-4 whitespace-nowrap border-r border-gray-900">{data.internship.employer?.companyName}</td>
                <td className="px-3 py-4 whitespace-nowrap border-r border-gray-900">{data.internship?.internshipTitle}</td>
                <td className="px-3 py-4 whitespace-nowrap border-r border-gray-900">{data.problemDesc}</td>
                <td className="px-3 py-4 whitespace-nowrap border-r border-gray-900">{data.reportStatus}</td>
                <td className="px-3 py-4 whitespace-nowrap border-r border-gray-900"> {new Date(data.created_at).toLocaleDateString('en-GB',
                  {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  }
                )}</td>
                <td className="px-3 py-4 whitespace-nowrap border-r border-gray-900">
                  {!data.comment? 'none' : data.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      </div>
      </DefaultLayout>
  );
}