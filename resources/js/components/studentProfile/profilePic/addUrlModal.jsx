import { useForm } from '@inertiajs/react';

export default function AddUrlModal({ onClose, studentID }) {

  const { data, setData, post, processing, errors } = useForm({
    linkedin_public_url: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    post(`/student/linkedin/store/${studentID}`, data, {
      onSuccess: () => {
      },
      onError: (error) => {
        console.error(error);
      }

    });
    onClose();
  }
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="refereeName" className="block mb-2 text-sm font-medium text-gray-900">LinkedIn Profile URL</label> 
        <input
          type="text"
          name="linkedin_public_url"
          id="linkedin_public_url"
          value={data.linkedin_public_url}
          onChange={(e) => setData('linkedin_public_url', e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter your LinkedIn profile URL"
          required />
        {errors.linkedin && <p className="text-red-500 text-xs mt-1">{errors.linkedin}</p>}
      </div>
      <div className="mt-4">
        <button type="submit" disabled={processing} className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">Save</button>
      </div>
    </form>
  )
}