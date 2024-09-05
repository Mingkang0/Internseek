import React, { useState, useEffect, useRef } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';

export default function EditSkillModal({ skill, studentID, onClose }) {
  const [skillDesc, setSkillDesc] = useState(skill.skillDesc);

  const proficiencyLevels = ['Beginner', 'Average', 'Good', 'Intermediate', 'Advanced']; // Example levels as strings

  const [proficiencyLevel, setProficiencyLevel] = useState(skill.proficiencyLevel);


  const handleEdit = (event) => {
    event.preventDefault();

    const updatedSkill = {
      skillDesc,
      proficiencyLevel,
    };

    router.post(`/skills/update/${studentID}/${skill.id}`, updatedSkill, {
      onSuccess: () => {
        onClose(); // Close the modal on success
      },
      onError: (errors) => {
        console.error(errors); // Handle errors if necessary
        Swal.fire({
          title: 'Error',
          text: 'There was an error while updating the skill',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
    onClose();
  };

  const handleDelete = (event) => {
    Swal.fire({
      title: 'Delete Skill',
      text: 'Are you sure you want to delete this skill?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        router.post(`/skills/delete/${studentID}/${skill.id}`);
      }
    });
    onClose();
  }





  return (
    <form className="space-y-4" onSubmit={handleEdit}>
      <div>
        <label htmlFor="skill" className="block mb-2 text-sm font-medium text-gray-900">Skill</label>
        <input
          type="text"
          name="skill"
          id="skill"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter your accomplishment"
          value={skillDesc}
          onChange={(e) => setSkillDesc(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="accomplishmentYear" className="block mb-2 text-sm font-medium text-gray-900">Proficiency Level</label>
        <div className="flex flex-wrap justify-center">
          {proficiencyLevels.map(level => (
            <div key={level} className="flex items-center me-4">
              <input
                id={`level-${level}`}
                type="radio"
                value={level}
                name="proficiencyLevel"
                checked={proficiencyLevel === level}
                onChange={(e) => setProficiencyLevel(e.target.value)}
                className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 focus:ring-2"
              />
              <label htmlFor={`level-${level}`} className="ms-2 text-sm font-medium text-gray-900">{level}</label>
            </div>
          ))}
        </div>
      </div>
      <div className='flex items-center justify-center gap-4'>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">Edit</button>
        <button type="button" onClick={handleDelete} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5">Delete</button>
      </div>
    </form>
  );
}