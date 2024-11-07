import { useState } from "react";

export default function ApplyStep3({ formData, setFormData }) {
  const [selectedResume, setSelectedResume] = useState(formData.ownResume || null);
  const [selectedLetter, setSelectedLetter] = useState(formData.coverLetter || null);
  const [selectedTranscript, setSelectedTranscript] = useState(formData.transcript || null);
  const [selectedSAL, setSelectedSAL] = useState(formData.SAL || null);

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0] || null;
    setSelectedResume(file);
    setFormData({ ...formData, ownResume: file });
  };

  console.log(formData);

  const handleLetterChange = (event) => {
    const file = event.target.files?.[0] || null;
    setSelectedLetter(file);
    setFormData({ ...formData, coverLetter: file });
  };

  const handleTranscriptChange = (event) => {
    const file = event.target.files?.[0] || null;
    setSelectedTranscript(file);
    setFormData({ ...formData, transcript: file });
  };

  const handleSALChange = (event) => {
    const file = event.target.files?.[0] || null;
    setSelectedSAL(file);
    setFormData({ ...formData, SAL: file });
  };

  return (
    <div className="w-full mx-auto flex flex-wrap justify-center gap-4 lg:w-3/4">
      <div className="resume text-left">
        <label htmlFor="resume-upload" className="text-sm font-semibold text-gray-600">1. Upload Own Resume (Optional)</label>
        <div className="flex items-center justify-between mb-4 mt-2">
          <label htmlFor="resume-upload" className="flex flex-col items-center justify-center sm:w-80 h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-100 ">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500">in .pdf</p>
            </div>
            <input id="resume-upload" type="file" className="hidden" onChange={handleResumeChange} />
            <div className="bg-white border-t-2 border-dashed text-gray-600 w-full h-full rounded-lg flex items-center justify-center">
              <p className="text-sm text-gray-500 ">
                {selectedResume ? selectedResume.name : "No file chosen..."}
              </p>
            </div>
          </label>
        </div>
      </div>
      <div className="coverLetter text-left">
        <label htmlFor="coverLetter" className="text-sm font-semibold text-gray-600">2. Upload Cover Letter</label>
        <div className="flex items-center justify-between mb-4 mt-2">
          <label htmlFor="letter-upload" className="flex flex-col items-center justify-center sm:w-80 h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-100 ">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500">in .pdf</p>
            </div>
            <input id="letter-upload" type="file" className="hidden" onChange={handleLetterChange} />
            <div className="bg-white border-t-2 border-dashed text-gray-600 w-full h-full rounded-lg flex items-center justify-center">
              <p className="text-sm text-gray-500 ">
                {selectedLetter ? selectedLetter.name : "No file chosen..."}
              </p>
            </div>
          </label>
        </div>
      </div>
      <div className="transcript text-left">
        <label htmlFor="transcript" className="text-sm font-semibold text-gray-600">3. Upload Transcript</label>
        <div className="flex items-center justify-between mb-4 mt-2">
          <label htmlFor="transcript-upload" className="flex flex-col items-center justify-center sm:w-80 h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-100 ">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500">in .pdf</p>
            </div>
            <input id="transcript-upload" type="file" className="hidden" onChange={handleTranscriptChange} />
            <div className="bg-white border-t-2 border-dashed text-gray-600 w-full h-full rounded-lg flex items-center justify-center">
              <p className="text-sm text-gray-500 ">
                {selectedTranscript ? selectedTranscript.name : "No file chosen..."}
              </p>
            </div>
          </label>
        </div>
      </div>
      <div className="SAL text-left">
        <label htmlFor="SAL" className="text-sm font-semibold text-gray-600">4. Upload Application Letter (SAL)</label>
        <div className="flex items-center justify-between mb-4 mt-2">
          <label htmlFor="SAL-upload" className="flex flex-col items-center justify-center sm:w-80 h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-100 ">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500">in .pdf</p>
            </div>
            <input id="SAL-upload" type="file" className="hidden" onChange={handleSALChange} />
            <div className="bg-white border-t-2 border-dashed text-gray-600 w-full h-full rounded-lg flex items-center justify-center">
              <p className="text-sm text-gray-500 ">
                {selectedSAL ? selectedSAL.name : "No file chosen..."}
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
