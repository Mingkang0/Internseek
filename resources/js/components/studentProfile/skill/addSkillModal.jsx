import React, {useState} from 'react';
import { useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
export default function AddSkillModal({studentID}) {

  const proficiencyLevels = ['Beginner', 'Average', 'Good', 'Intermediate', 'Advanced']; // Example levels as strings

  const { data, setData, processing, errors } = useForm({
    skillDesc: '',
    proficiencyLevel: '',

  });



  const handleRadioChange = (level) => {
    setProficiencyLevel(level);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Inertia.post(`/skills/store/${studentID}`, data, {
      onSuccess: () => {
        onClose(); // Close the modal on success
      },
      onError: (error) => {
        console.error(error);
      }
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="skillDesc" className="block mb-2 text-sm font-medium text-gray-900">Skill</label>
        <input
          type="text"
          name="skillDesc"
          id="skillDesc"
          value={data.skillDesc}
          onChange={(e) => setData('skillDesc', e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter your skill (eg. Python, Java)"
          required
        />
      </div>
      <div>
        <label htmlFor="proficiencyLevel" className="block mb-2 text-sm font-medium text-gray-900">Proficiency Level</label>
        <div className="flex flex-wrap justify-center">
        {proficiencyLevels.map(level => (
            <div key={level} className="flex items-center me-4">
              <input
                id={`level-${level}`}
                type="radio"
                name="proficiencyLevel"
                value={level}
                checked={data.proficiencyLevel === level}
                onChange={(e) => setData('proficiencyLevel', e.target.value)}
                className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 focus:ring-2"
              />
              <label htmlFor={`level-${level}`} className="ms-2 text-sm font-medium text-gray-900">{level}</label>
            </div>
          ))}
        </div>

      </div>
      <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">Submit</button>
    </form>
  );
}