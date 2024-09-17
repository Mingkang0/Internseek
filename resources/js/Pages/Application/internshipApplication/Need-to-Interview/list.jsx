import DefaultLayout from '@/layout/defaultLayout';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { usePage } from '@inertiajs/react';
import InterviewCard from '@/components/internshipApplication/interviewCard';

export default function InterviewApplicantList({ applications }) {
  const { flash } = usePage().props;

  useEffect(() => {
    if (flash.success) {
      Swal.fire({
        title: flash.success,
        text: flash.message,
        icon: 'success',
        timer: 4000,
        timerProgressBar: true,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3085d6',
      });
    }
  }, [flash]);


  return (
    <DefaultLayout>
      <div className='bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4'>
        <div className='container mx-auto'>
          <h3 className="text-xl font-bold text-gray-800">Need-to-Interview List ({applications.length})</h3>
          <div className='applicant-list'>
            <div className="mt-4">
                <>
                  {applications.map((application) => (
                    <InterviewCard key={application.id} application={application} />
                  ))}
                </>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );

}