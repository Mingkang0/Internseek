import DefaultLayout from '@/layout/defaultLayout';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { usePage } from '@inertiajs/react';
import AcceptedApplicantCard from '@/components/internshipApplication/acceptedCard';

export default function AcceptedApplicantList({ applications }) {
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
          <h3 className="text-xl font-bold text-gray-800">Applicants (Accept Offer) ({applications.length})</h3>
          <div className='applicant-list'>
            <div className="mt-4">
                <>
                  {applications.map((application) => (
                    <AcceptedApplicantCard key={application.id} application={application} />
                  ))}
                  {applications.length === 0 && (
                    <div className="w-full p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow">
                      <div className="flex items-center justify-center">
                        <p className="text-base text-gray-600">No accepted applicants.</p>
                      </div>
                    </div>
                  )}
                </>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );

}