import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import DefaultLayout from '@/layout/defaultLayout';
import { useForm } from '@inertiajs/react';

export default function ReportRequest({ report }) {

  const [status, setStatus] = useState(report.reportStatus || 'Reviewing');
  const [showAction, setShowAction] = useState(report.reportStatus === 'Solving' || report.reportStatus === 'Resolved');
  const [showComment, setShowComment] = useState(report.reportStatus === 'Solving' || report.reportStatus === 'Resolved');
  const [showReasonArchived, setShowReasonArchived] = useState(report.actionTaken === 'Archived');
  const isResolved = report.reportStatus === 'Resolved';
  const { data, setData, post, processing, errors } = useForm({
    reportStatus: report.reportStatus || 'Reviewing',
    actionTaken: report.actionTaken || '',
    comment: report.comment || '',
    reasonArchived: report.reasonArchived || '',
  });

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setStatus(selectedStatus);
    setData('reportStatus', selectedStatus);
    setShowComment(selectedStatus === 'Solving' || selectedStatus === 'Resolved');
    setShowAction(selectedStatus === 'Solving' || selectedStatus === 'Resolved');
  };

  const handleActionChange = (event) => {
    const selectedAction = event.target.value;
    setData('actionTaken', selectedAction);
    setShowReasonArchived(selectedAction === 'Archived');
  };

  const handleBack = () => {
    Inertia.get('/admin/problems-reports');
  };

  const handleCommentChange = (event) => {
    setData('comment', event.target.value);
  };

  const handleReasonChange = (event) => {
    setData('reasonArchived', event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    post(`/admin/problems-reports/update-status/${report.id}`, {
      onSuccess: () => {
        Inertia.get('/admin/problems-reports');
      },
    });
  }

  return (
    <DefaultLayout>
      <div className='bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4'>
        <div className="container mx-auto max-w-3xl p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-blue-800">Update Internship Report Status</h5>
          <div className='flex justify-between'>
            <p className="text-sm text-gray-900 font-semibold">Company Name: {report.internship.employer.companyName}</p>
            <p className="text-sm text-blue-800 font-semibold">Report Status: {report.reportStatus}</p>
          </div>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            <div className='col-span-1'>
              <label className="block text-sm font-semibold text-gray-900">Problem Description</label>
              <textarea value={report.problemDesc} rows={4} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
            </div>
            <div className='col-span-1'>
              <label className="block text-sm font-semibold text-gray-900">Report Date</label>
              <input type="text" value={new Date(report.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
            </div>
          </div>
          <h5 className="mb-2 text-base font-bold tracking-tight text-blue-800 mt-4">Internship Details</h5>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            <div className='col-span-1'>
              <label className="block text-sm font-semibold text-gray-900">Internship Title</label>
              <input type="text" value={report.internship.internshipTitle} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900">Allowance (in RM)</label>
              <input type="text" value={report.internship.internshipAllowance} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100  shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
            </div>
          </div>
          <div className='mt-2'>
            <label className="block text-sm font-semibold text-gray-900">Internship Description</label>
            <textarea value={report.internship.internshipDescription} rows={4} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
          </div>
          <div className='mt-2'>
            <label className="block text-sm font-semibold text-gray-900">Internship Responsibilities</label>
            <textarea value={report.internship.internshipResponsibility.split('. ').join('\n')} rows={4} className="w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-100  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
          </div>
          <div className='mt-2'>
            <label className="block text-sm font-semibold text-gray-900">Internship Requirements</label>
            <textarea value={report.internship.internshipRequirement.split('. ').join('\n')} rows={4} className="w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-100  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
          </div>
          <div className='grid grid-cols-2 gap-4 mt-2'>
            <div className='col-span-1'>
              <label className="block text-sm font-semibold text-gray-900">Start Posting Date</label>
              <input type="text" value={report.internship.startPostingDate} className="w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-100  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
            </div>
            <div className='col-span-1'>
              <label className="block text-sm font-semibold text-gray-900">End Posting Date</label>
              <input type="text" value={report.internship.endPostingDate} className="w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-100  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4 mt-2'>
            <div className='col-span-1'>
              <div className=''>
                <label className="block text-sm font-semibold text-gray-900">Internship Period</label>
                <input type="text" value={report.internship.internshipDuration} className="w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
              </div>
              <div className='mt-2'>
                <label className="block text-sm font-semibold text-gray-900">Working Method</label>
                <input type="text" value={report.internship.workingMethod} className="w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
              </div>
            </div>
            <div className='col-span-1'>
              <div>
                <label className="block text-sm font-semibold text-gray-900">Working Hour</label>
                <input type="text" value={report.internship.workingHour} className="w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
              </div>
              <div className='mt-2'>
                <label className="block text-sm font-semibold text-gray-900">Branch</label>
                <input type="text" className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100  shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
              </div>
            </div>
            <div className='col-span-1'>
              <div>
                <label className="block text-sm font-semibold text-gray-900">Study Scope</label>
                <input type="text" value={report.internship.studyScope} className="w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-100  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
              </div>
              <div className='mt-2'>
                <label className="block text-sm font-semibold text-gray-900">Site</label>
                <input type="text" className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-4 mt-4'>
              <div className="updateStatus col-span-1">
                <label className="block text-sm font-semibold text-gray-900">Update Status</label>
                <select value={data.reportStatus} onChange={handleStatusChange} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled={isResolved}>
                  <option value="Reviewing">Reviewing</option>
                  <option value="Solving">Solving</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
              {showAction && (
                <div className='action col-span-1'>
                  <label className="block text-sm font-semibold text-gray-900">Action</label>
                  <select
                    value={data.actionTaken}
                    onChange={handleActionChange} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled={isResolved}>
                    <option>Select Action</option>
                    <option value="Mark as Valid">Mark as Valid</option>
                    <option value="Archived">Archived</option>
                    <option value="Unarchived">Unarchived</option>
                  </select>
                </div>
              )}
            </div>
            {showComment && (
              <div className='comment mt-2'>
                <label className="block text-sm font-semibold text-gray-900">Comment</label>
                <textarea rows={4} value={data.comment} onChange={handleCommentChange}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled={isResolved}></textarea>
              </div>
            )}
            {showReasonArchived && (
              <div className='reason mt-2'>
                <label className="block text-sm font-semibold text-gray-900">Reason for Archive</label>
                <textarea value={data.reasonArchived} onChange={handleReasonChange}
                  rows={4} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled={isResolved}></textarea>
              </div>
            )}
            <div className='text-center mt-4'>
              <button type='submit' className="px-4 py-2 text-sm font-medium text-white bg-blue-800 rounded-lg" disabled={isResolved}>Update Status</button>
              <button type="button" onClick={handleBack} className="px-4 py-2 text-sm font-bold text-gray-900 border border-gray-900 bg-white rounded-lg ml-4">Back</button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );

}