import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { router } from '@inertiajs/react';

export default function EditLanguageModal({ languages, onClose, studentID}) {
  const [languageProficiencyLevel, setLanguageProficiencyLevel] = useState(
    languages.map(language => ({
      ...language,
    }))
  );


  const proficiencyLevels = ["Don't Know", "Beginner", "Intermediate", "Advanced"];

  const handleProficiencyChange = (name, proficiencyLevel) => {
    setLanguageProficiencyLevel(prev =>
      prev.map(language =>
        language.languageName === name
          ? { ...language, proficiencyLevel }
          : language
      )
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the updated language data to the server
    router.post(`/languages/update/${studentID}`, {
      languages: languageProficiencyLevel,
    }, {
      onSuccess: () => {
        onClose(); // Close the modal on success
      },
      onError: (errors) => {
        console.error(errors); // Handle errors if necessary
      },
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {languageProficiencyLevel.map(language => (
        <div key={language.id}>
          <label htmlFor={`language-${language.id}`} className="block mb-2 text-sm font-medium text-gray-900">
            {language.languageName}
          </label>
          <div className="flex flex-wrap justify-center gap-2">
            {proficiencyLevels.map(level => (
              <div key={level} className="flex items-center me-4">
                <input
                  id={`level-${language.languageName}-${level}`}
                  type="radio"
                  value={level}
                  name={`language-${language.languageName}`}
                  checked={language.proficiencyLevel === level}
                  onChange={() => handleProficiencyChange(language.languageName, level)}
                  className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 focus:ring-2"
                />
                <label htmlFor={`level-${language.languageName}-${level}`} className="ms-2 text-sm font-medium text-gray-900">
                  {level}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex items-center justify-center gap-4">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
