
import CardButtons from "@/components/employerCardButtons";
import DefaultLayout from "@/layout/defaultLayout";
import { Link } from "@inertiajs/react";



export default function EmployerDashboard() {

  return (
    <DefaultLayout>
      <div className="dashboard bg-gray-200 px-6 py-10 min-h-screen lg:py-0">
        <div className="card-buttons">
          <CardButtons />
        </div>
        <div className="internships mt-2 ml-2">
          <Link href="/internship-postings/create"
          className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-4 px-4 rounded-lg">+ Post a Internship</Link>
        <div className="recent-internship-list mt-4">
          <h2 className="flex justify-between text-lg font-bold">Recent Internship Postings
            <a className="text-sm font-medium text-blue-600 cursor-pointer" href='/internship-postings'>View All</a>
          </h2>
          <p className="text-sm font-semibold text-gray-500">Total Internship Posted: 3</p>
          </div>
          <div className="internship-posting-card py-2">
            </div>
        </div>
      </div>

    </DefaultLayout>
  );
}