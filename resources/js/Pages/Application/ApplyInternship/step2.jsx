import { FaEdit } from "react-icons/fa";
import { router } from "@inertiajs/react"

export default function ApplyStep2({ student }) {

  const handleEdit = () => {
    router.get('/student/profile');
  }

  const address = student.addresses;
  const experience = student.experiences;
  const education = student.educations;
  const skill = student.skills;
  const languages = student.languages;
  const accomplishment = student.accomplishments;
  const referee = student.referees;

  return (
    <>
      <div className="h-fit-content p-4 mx-2 my-2 bg-white border border-gray-900 rounded-lg mx-auto lg:w-3/5">
        <div className="flex justify-between">
          <h5 className="text-lg ml-1 font-bold tracking-tight text-gray-900">Resume</h5>
          <FaEdit size={18} className="text-gray-600 cursor-pointer" onClick={handleEdit} />
        </div>
        <div className="flex flex-wrap bg-gray-100 p-4 rounded-xl justify-between text-left md:gap-4">
          {student.linkedin_id && student.profilePicture && typeof student.profilePicture === 'string' && student.profilePicture.startsWith('http') ? (
            <img
              className="w-24 h-24 rounded-full ml-2 border border-gray-900"
              src={student.profilePicture}
              alt="LinkedIn Profile Pic"
            />
          ) : student.profilePicture && typeof student.profilePicture === 'string' ? (
            <img
              className="w-24 h-24 rounded-full ml-2 border border-gray-900"
              src={`/storage/profile/student/profile_pictures/${student.profilePicture}`}
              alt="Local Profile Pic"
            />
          ) : (
            <img
              className="w-24 h-24 rounded-full ml-2 border border-gray-900"
              src="../../assets/avatar.png"
              alt="Default Avatar"
            />
          )}
          <div className="basicInfo">
            <p className="text-base font-bold tracking-tight text-gray-800">Name: {student.firstName} {student.lastName}</p>
            <p className="text-sm font-medium tracking-tight text-gray-600">Email: {student.email}</p>
            <p className="text-sm font-medium tracking-tight text-gray-600">Phone: {student.phoneNum}</p>
            <p className="text-sm font-medium tracking-tight text-gray-600">IC Number: {student.ICNumber}</p>
          </div>

          {address.map((addr) => (
            <div key={addr.id}>
              {addr.type === 'home' && (
                <div className="homeAddress">
                  <p className="text-base font-bold tracking-tight text-gray-900"><u>Home Address</u></p>
                  <p className="text-sm font-medium tracking-tight text-gray-600">{addr.address1}</p>
                  <p className="text-sm font-medium tracking-tight text-gray-600">{addr.address2}</p>
                  <p className="text-sm font-medium tracking-tight text-gray-600">{addr.postcode}, {addr.city}, {addr.state}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="experience mt-4 text-left">
          <h5 className="text-base font-bold tracking-tight text-gray-900">Experience</h5>
          <hr className='border-1 border-gray-900 my-1'></hr>
          {experience.map((exp, index) => (
            <div key={index} className='mt-1'>
              <p className='text-sm font-bold text-gray-900'>{exp.jobTitle}</p>
              <p className='text-sm font-semibold text-gray-600'>{exp.companyName}</p>
              <p className='text-sm font-semibold text-gray-600'>{exp.startDate} - {exp.endDate}</p>
              <ul className='list-disc ml-2 list-inside text-sm text-gray-600'>
                {exp.jobDescription.split('.').map((sentence, idx) => (
                  sentence.trim() && <li key={idx}>{sentence.trim()}.</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="education mt-4 text-left">
          <h5 className="text-base font-bold tracking-tight text-gray-900">Education</h5>
          <hr className='border-1 border-gray-900 my-1'></hr>
          {education.map((edu, index) => (
            <div key={index} className='mt-1'>
              <p className='text-sm font-bold text-gray-900'>{edu.educationLevel}, {edu.studyField}</p>
              <p className='text-sm font-semibold text-gray-600'>{edu.schoolName}</p>
              <p className='text-sm font-semibold text-gray-600'>{edu.startDate} - {edu.endDate}</p>
              <p className='text-sm text-gray-600'>CGPA: {edu.CGPA}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mt-4">
          <div className="col-span-1 skill text-left">
            <h5 className="text-base font-bold tracking-tight text-gray-900 text-left">Skills</h5>
            <hr className='border-1 border-gray-900 mt-1'></hr>
            {skill.map((skill, index) => (
              <div key={index} className='flex flex-wrap gap-1 mt-1 ml-1'>
                <p className='text-sm font-semibold text-gray-900'>{index + 1}. {skill.skillDesc}</p>
                <p className='text-sm text-gray-600'>({skill.proficiencyLevel})</p>
              </div>
            ))}
          </div>
          <div className="col-span-1 language text-left">
            <h5 className="text-sm font-bold tracking-tight text-gray-900 text-left">Languages</h5>
            <hr className='border-1 border-gray-900 mt-1'></hr>
            {languages.map((language, index) => (
              <div key={index} className='flex flex-wrap gap-1 mt-1 ml-1'>
                <p className='text-sm font-semibold text-gray-900'>{index + 1}. {language.languageName}</p>
                <p className='text-sm text-gray-600'>({language.proficiencyLevel})</p>
              </div>
            ))}
          </div>
        </div>
        <div className="accomplishment mt-4 text-left">
          <h5 className="text-base font-bold tracking-tight text-gray-900">Accomplishments</h5>
          <hr className='border-1 border-gray-900 my-1'></hr>
          {accomplishment.map((accomplishment, index) => (
            <div key={index} className='mt-2'>
              <p className='text-sm font-bold text-gray-900'>{accomplishment.accomplishmentName}, {accomplishment.accomplishmentYear}</p>
              <p className='text-sm text-gray-600'>{accomplishment.accomplishmentDescription}</p>
            </div>
          ))}
        </div>
        <div className="referee mt-4 text-left">
          <h5 className="text-base font-bold tracking-tight text-gray-900">Referees</h5>
          <hr className='border-1 border-gray-900 my-1'></hr>
          {referee.map((referee, index) => (
            <div key={index} className='mt-1'>
              <p className='text-sm font-bold text-gray-900'>{referee.refereeName}</p>
              <p className='text-sm font-semibold text-gray-600'>{referee.refereePosition}, {referee.refereeCompany}</p>
              <p className='text-sm font-medium text-gray-600'>Email: {referee.refereeEmail}</p>
              <p className='text-sm font-medium text-gray-600'>Phone Number: {referee.refereePhone}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}