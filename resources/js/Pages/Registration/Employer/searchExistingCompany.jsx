import DefaultLayout from "@/layout/defaultLayout";
import { useForm, Link, router } from "@inertiajs/react";



const SearchExistingCompany = ({ employers }) => {
  const { data, setData, post, processing, errors } = useForm({
    companyName: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.get('/search-existing-employer', {
      onError: () => {
        errors.companyName = 'Company not found';
        console.log('Company not found');
      },
    });
  }

  return (
    <DefaultLayout>
      <div className="bg-gray-200 px-6 min-h-screen overflow-y-auto lg:py-4">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full my-4 mx-auto">
          <h5 className="text-lg font-bold leading-tight tracking-tight text-blue-900 md:text-xl mb-2">Search Existing Company</h5>
          <form className="space-y-2 md:space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Company Name</label>
              <input type="text" name="companyName" id="companyName"
                value={data.companyName}
                onChange={(e) => setData('companyName', e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Company Name" required />
            </div>
            {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
            <div className="flex justify-end">
              <button type="submit" disabled={processing}
                className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">Search</button>
            </div>
          </form>

          {/* Display search results here */}
          {employers && (
            <div className="mt-4">
              <h2 className="text-lg font-bold">Search Results</h2>

              <div className="companyList mt-2">
                {employers.length > 0 && (
                  <ul>
                    {employers.map((employer) => (
                      <li key={employer.id}>
                        <div className="flex justify-between items-center company border border-gray-300 rounded-lg px-4 py-2 mb-2">
                          <div className="company-details flex gap-8">
                            <img src="../../assets/avatar.png" className="w-16 h-16 rounded-full border ring-1 ring-gray-900" alt="Company Logo" />
                            <p className="text-lg font-semibold text-gray-800 mt-4">Company Name: {employer.companyName}</p>
                          </div>
                          <div className="">
                            <form onSubmit={(e) => {
                              e.preventDefault();
                              router.post(`/add-existing-employer/${employer.id}`);
                            }}>
                              <button type="submit"
                                className="bg-blue-800 hover:bg-blue-700 text-white font-semibold px-4 h-10 rounded-lg  rounded-full my-auto"
                              >
                                Add
                              </button>
                            </form>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {employers.length === 0 && (
                  <p className="text-gray-500 text-sm font-semibold mt-2">The company is not found, you can register it <a href="/register-company" className="text-blue-600">here</a></p>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </DefaultLayout>
  );
}


export default SearchExistingCompany;