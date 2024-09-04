import { useState } from 'react';
import EditLanguageModal from './EditLanguageModal';
import Modal from '../modal.jsx';
import { FaEdit } from 'react-icons/fa';

export default function LanguageSection({ languages, studentID }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Fixed languages list with default proficiency levels
    const fixedLanguages = [
      { languageName: 'English', proficiencyLevel: "Don't Know" },
      { languageName: 'Mandarin', proficiencyLevel: "Don't Know" },
      { languageName: 'Malay', proficiencyLevel: "Don't Know" },
      { languageName: 'Tamil', proficiencyLevel: "Don't Know" },
    ];


    // Merge retrieved proficiency levels with fixed languages
  const mergedLanguages = fixedLanguages.map(fixedLang => {
      const retrievedLang = languages.find(lang => lang.languageName === fixedLang.languageName);
      return {
        ...fixedLang,
        proficiencyLevel: retrievedLang ? retrievedLang.proficiencyLevel : fixedLang.proficiencyLevel,
      };
    });

    console.log(mergedLanguages);

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className="w-full h-fit-content p-4 mx-2 my-2 bg-white border border-gray-900 rounded-lg">
        <h5 className="text-lg ml-1 font-bold tracking-tight text-gray-900 flex justify-between">
          Language
          <FaEdit size={18} className="text-gray-900 cursor-pointer" onClick={handleEditModalOpen} />
        </h5>
        <hr className="border-1 border-gray-900 mt-1"></hr>
          {mergedLanguages.map((language) => (
            <div key={language.languageName} className="flex justify-between ml-2 py-2">
              <div>
                <p className="text-gray-600 font-semibold text-sm">{language.languageName}</p>
                <p className="text-gray-500 text-sm">{language.proficiencyLevel}</p>
              </div>
            </div>
          ))}
      </div>
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Speaking Languages"
        >
          <EditLanguageModal
            languages={mergedLanguages}
            studentID={studentID}
            onClose={() => setIsEditModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}
