

const Step3 = ( { formData, setFormData }) => {

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div className="col-span-1">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
            <input type="text" name="firstName" value={formData.firstName}  onChange={(e) => setFormData({firstName: e.target.value})} className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter First Name" />
          </div>
        </div>
        <div className="col-span-1">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
            <input type="text" name="lastName" value={formData.lastName}  onChange={(e) => setFormData({lastName: e.target.value})} className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter Last Name" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
      <div className="col-span-1">
        <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
        <input type="email" name="email" value={formData.email} className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter email" disabled />
      </div>
      <div className="col-span-1">
        <label className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
        <input type="text" name="phoneNum" value={formData.phoneNum}  onChange={(e) => setFormData({phoneNum: e.target.value})} className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter phone number" />
      </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div className="col-span-1">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Job Position</label>
            <input type="text" name="position" value={formData.position} onChange={(e) => setFormData({position: e.target.value})} className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter job position" />
          </div>
        </div>
        <div className="col-span-1">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Department</label>
            <input type="text" name="department" value={formData.department} onChange={(e) => setFormData({ department: e.target.value })} className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter department" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;