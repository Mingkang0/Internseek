import CardButtons from "@/components/adminCardButtons";
import DefaultLayout from "@/layout/defaultLayout";
import { Head, Link } from "@inertiajs/react";

export default function AdminDashboard({ internshipCount, employerCount, employers, reports, studentCount }) {

  return (
    <DefaultLayout>
      <Head title="Admin Dashboard" />
      <div className="dashboard bg-gray-200 px-6 py-10 min-h-screen lg:py-0">
        <div className="flex card-sections gap-4">
          <div className="internship-reports w-full p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow">
            <h5 className="flex justify-between mb-2 text-lg font-bold tracking-tight text-gray-900">
              Internship Problem Reports
              <Link href='/admin/problems-reports'><p className="text-sm font-medium text-blue-600 cursor-pointer">View All</p></Link>
            </h5>
            <div className="border border-gray-300">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Company Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Internship Title
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report, index) => (
                    <tr key={report.id} className="odd:bg-white even:bg-gray-50 border-b">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {index + 1}.
                      </th>
                      <td className="px-6 py-4">
                        {report.internship.employer.companyName}
                      </td>
                      <td className="px-6 py-4">
                        {report.internship.internshipTitle}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="employer-registration-requests w-full p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow">
            <h5 className="flex justify-between mb-2 text-lg font-bold tracking-tight text-gray-900">
              Employer Registration Requests
              <Link href="/admin/employer-requests"><p className="text-sm font-medium text-blue-600 cursor-pointer">View All</p></Link>
            </h5>
            <div className="border border-gray-300">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Company Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      SSM No.
                    </th>
                  </tr>
                </thead>
                <tbody>
                    {employers.map((employer, index) => (
                      <tr key={employer.id} className="odd:bg-white even:bg-gray-50 border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {index + 1}.
                        </th>
                        <td className="px-6 py-4">
                          {employer.companyName}
                        </td>
                        <td className="px-6 py-4">
                          {employer.businessRegNum}
                        </td>
                      </tr>
                    ))
                    }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="card-buttons mt-4">
          <CardButtons internshipCount={internshipCount} employerCount={employerCount} studentCount={studentCount}/>
        </div>
      </div>
    </DefaultLayout>
  );
}