import React, { useState } from "react";
import ProfilePicSection from "@/components/studentProfile/profilePic/profilePic";
import BasicInfoSection from "@/components/studentProfile/basicInfo/basicInfo";
import ExperienceSection from "@/components/studentProfile/experience/experience";
import EducationSection from "@/components/studentProfile/education/education";
import SkillSection from "@/components/studentProfile/skill/skill";
import LanguageSection from "@/components/studentProfile/Language/language";
import AccomplishmentSection from "@/components/studentProfile/accomplishment/accomplishment";
import RefereeSection from "@/components/studentProfile/referee/referee";
import GenerateResumeModal from "@/components/studentProfile/generateResumeModal";
import Modal from "@/components/studentProfile/modal.jsx";
import DefaultLayout from "@/layout/defaultLayout";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import { FaCheckSquare } from "react-icons/fa";

export default function StudentProfileDetails({ student, accomplishment, referee, languages, skill, education, experience, address, studentID }) {
  const [isGenerateResumeModalOpen, setIsGenerateResumeModalOpen] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(0);

  console.log(profileCompletion);
  const handleGenerateResume = () => {
    setIsGenerateResumeModalOpen(!isGenerateResumeModalOpen);
  }

  const { flash } = usePage().props;

  useEffect(() => {
    if (flash.success) {
      Swal.fire({
        title: flash.success,
        text: flash.message,
        icon: "success",
        timer: 4000,
        timerProgressBar: true,
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
      });
    }
  }, [flash]);


  useEffect(() => {
    calculateProfileCompletion();
  }, [student, accomplishment, referee, languages, skill, education, experience, address]);

  const calculateProfileCompletion = () => {
    const totalSections = 8; // Total number of sections
    let completedSections = 0;

    if (student && address) completedSections++;
    if (experience.length > 0) completedSections++;
    if (education.length > 0) completedSections++;
    if (skill.length > 0) completedSections++;
    if (languages.length > 0) completedSections++;
    if (accomplishment.length > 0) completedSections++;
    if (referee.length > 0) completedSections++;
    if (student.profilePicture) completedSections++; // Assuming profilePic is part of student

    const completionPercentage = (completedSections / totalSections) * 100;
    setProfileCompletion(completionPercentage);
  };


  return (
    <DefaultLayout>
      <Head title="Student Profile" />
      <div className="bg-gray-200 px-6 min-h-screen mx-auto overflow-y-auto lg:py-4">
        <div className="flex flex-wrap justify-center mx-0 lg:flex-row">
          <div className="lg:w-3/5 flex flex-col">
            <ProfilePicSection student={student} studentID={studentID} profileCompletion={profileCompletion} />
            <BasicInfoSection student={student} address={address} studentID={studentID} />
            <ExperienceSection experience={experience} studentID={studentID} />
            <EducationSection education={education} studentID={studentID} />
            <SkillSection skill={skill} studentID={studentID} />
            <LanguageSection languages={languages} studentID={studentID} />
            <AccomplishmentSection accomplishment={accomplishment} studentID={studentID} />
            <RefereeSection referee={referee} studentID={studentID} />
          </div>
          <div className="lg:w-1/5 flex flex-col mt-4 lg:mt-0 lg:ml-20">
              <div className="w-64 flex justify-between h-fit-content p-2 mt-4 bg-white border border-gray-900 border-b-0">
                <p className="text-base ml-1 font-medium tracking-tight text-gray-900">Basic Info</p>
                {student && address.length > 0 && (
                  <FaCheckSquare size={20} className="text-green-500" />
                )}
              </div>
              <div className="w-64 flex justify-between h-fit-content p-2 bg-white border border-gray-900 border-b-0 ">
                <p className="text-base ml-1 font-medium tracking-tight text-gray-900">Experience</p>
                {experience.length > 0 && (
                  <FaCheckSquare size={20} className="text-green-500" />
                )}
              </div>
              <div className="w-64 flex justify-between h-fit-content p-2 bg-white border border-gray-900 border-b-0">
                <p className="text-base ml-1 font-medium tracking-tight text-gray-900">Education</p>
                {education.length > 0 && (
                  <FaCheckSquare size={20} className="text-green-500" />
                )}
              </div>
              <div className="w-64 flex justify-between h-fit-content p-2 bg-white border border-gray-900 border-b-0">
                <p className="text-base ml-1 font-medium tracking-tight text-gray-900">Skill</p>
                {skill.length > 0 && (
                  <FaCheckSquare size={20} className="text-green-500" />
                )}
              </div>
              <div className="w-64 flex justify-between h-fit-content p-2 bg-white border border-gray-900 border-b-0">
                <p className="text-base ml-1 font-medium tracking-tight text-gray-900">Speaking Language</p>
                {languages.length > 0 && (
                  <FaCheckSquare size={20} className="text-green-500" />
                )}
              </div>
              <div className="w-64 flex justify-between h-fit-content p-2 bg-white border border-gray-900 border-b-0">
                <p className="text-base ml-1 font-medium tracking-tight text-gray-900">Accomplishment</p>
                {accomplishment.length > 0 && (
                  <FaCheckSquare size={20} className="text-green-500" />
                )}
              </div>
              <div className="w-64 flex justify-between h-fit-content p-2 bg-white border border-gray-900 border-b-0">
                <p className="text-base ml-1 font-medium tracking-tight text-gray-900">Referee</p>
                {referee.length > 0 && (
                  <FaCheckSquare size={20} className="text-green-500" />
                )}
              </div>
              <div className="w-64 flex justify-between h-fit-content p-2 bg-white border border-gray-900 border-b-0">
                <p className="text-base ml-1 font-medium tracking-tight text-gray-900">Profile Picture</p>
                {student.profilePicture && (
                  <FaCheckSquare size={20} className="text-green-500" />
                )}
              </div>
              <div className="w-64 h-fit-content p-2 bg-white border border-gray-900 text-center">
                <button className="bg-blue-700 hover:bg-blue-700 text-white text-base font-medium py-2 px-3 rounded-3xl" onClick={handleGenerateResume}>Generate Resume</button>
              </div>
            </div>
        </div>
      </div>
      {isGenerateResumeModalOpen && (
        <Modal
          isOpen={isGenerateResumeModalOpen}
          onClose={() => setIsGenerateResumeModalOpen(false)}
          title="Generate Resume"
        >
          <GenerateResumeModal
            student={student}
            accomplishment={accomplishment}
            referee={referee}
            languages={languages}
            skill={skill}
            education={education}
            experience={experience}
            address={address}
            onClose={() => {
              setIsGenerateResumeModalOpen(false)
            }
            } />
        </Modal>
      )}
    </DefaultLayout>
  );

}