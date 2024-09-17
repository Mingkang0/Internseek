import AcceptedInternshipCard from "@/components/industrialTraining/acceptedOfferCard";
import DefaultLayout from "@/layout/defaultLayout";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function AcceptedOffers({ acceptedOffers }) {

  const { flash } = usePage().props;

  useEffect(() => {
    if (flash.success) {
      Swal.fire({
        title: flash.success,
        text: flash.message,
        icon: 'success',
        timer: 4000,
        timerProgressBar: true,
        confirmButtonText: 'OK',
        confirmButtonColor: '#007bff'
      })
    }
  }, [flash]);

  return (
  <DefaultLayout>
    <div className="bg-gray-200 px-6 py-8 min-h-screen mx-auto overflow-y-auto lg:py-4">
      <div className="container mx-auto">
        <h3 className="text-xl font-bold text-gray-800">My Industrial Training (Accepted Offers)</h3>
        <p className="text-gray-600">Please note that only one offer can be accepted at a time. If you wish to accept a new offer, please cancel any previously accepted internship.</p>
        <div className="accepted-offer">
          <div className="mt-4">
            <>
              {acceptedOffers.map((acceptedOffer) => (
                <AcceptedInternshipCard key={acceptedOffer.id} acceptedOffer={acceptedOffer} />
              ))}
            </>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
  );
}