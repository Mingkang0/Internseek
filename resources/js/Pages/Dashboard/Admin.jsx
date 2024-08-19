import CardButtons from "@/components/adminCardButtons";
import DefaultLayout from "@/layout/defaultLayout";

export default function AdminDashboard(){
  return (
    <DefaultLayout>
      <div className="dashboard bg-gray-200 px-6 py-10 min-h-screen lg:py-0">
        <div className="flex card-sections gap-4">
          <div className="internship-reports w-full p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow">
            <h5 className="flex justify-between mb-2 text-lg font-bold tracking-tight text-gray-900">
              Internship Problem Reports
              <p className="text-sm font-medium text-blue-600 cursor-pointer">View All</p>
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
                  <tr className="odd:bg-white even:bg-gray-50 border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      1
                    </th>
                    <td className="px-6 py-4">
                      ABC Company
                    </td>
                    <td className="px-6 py-4">
                      SE Intern
                    </td>
                  </tr>
                  <tr className="odd:bg-white even:bg-gray-50 border-b ">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      2
                    </th>
                    <td className="px-6 py-4">
                      ABC Company
                    </td>
                    <td className="px-6 py-4">
                      SE Intern
                    </td>
                  </tr>
                  <tr className="odd:bg-white even:bg-gray-50 border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                     3
                    </th>
                    <td className="px-6 py-4">
                      ABC Company
                    </td>
                    <td className="px-6 py-4">
                      SE Intern
                    </td>
                  </tr>
                  <tr className="odd:bg-white  even:bg-gray-50 border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      4
                    </th>
                    <td className="px-6 py-4">
                      ABC Company
                    </td>
                    <td className="px-6 py-4">
                      SE Intern
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="employer-registration-requests w-full p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow">
            <h5 className="flex justify-between mb-2 text-lg font-bold tracking-tight text-gray-900">
              Employer Registration Requests
              <p className="text-sm font-medium text-blue-600 cursor-pointer">View All</p>
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
                  <tr className="odd:bg-white even:bg-gray-50 border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      1
                    </th>
                    <td className="px-6 py-4">
                      ABC Company
                    </td>
                    <td className="px-6 py-4">
                      123
                    </td>
                  </tr>
                  <tr className="odd:bg-white even:bg-gray-50 border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      2
                    </th>
                    <td className="px-6 py-4">
                      ABC Company
                    </td>
                    <td className="px-6 py-4">
                      123
                    </td>
                  </tr>
                  <tr className="odd:bg-white  even:bg-gray-50 border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                     3
                    </th>
                    <td className="px-6 py-4">
                      ABC Company
                    </td>
                    <td className="px-6 py-4">
                      123
                    </td>
                  </tr>
                  <tr className="odd:bg-white  even:bg-gray-50 border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      4
                    </th>
                    <td className="px-6 py-4">
                      ABC Company
                    </td>
                    <td className="px-6 py-4">
                      123
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="card-buttons mt-4">
          <CardButtons />
        </div>
      </div>
    </DefaultLayout>
  );
}