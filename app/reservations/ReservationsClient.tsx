'use client';
import {SafeReservation, SafeUser} from "@/app/types";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "@/app/components/listings/ListingCard";

interface TripsClientProps{
  reservations: SafeReservation[];
  currentUser: SafeUser
}
const ReservationsClient: React.FC<TripsClientProps> = ({reservations, currentUser}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);
    axios.delete(`/api/reservations/${id}`).then(() => {
      toast.success('Reservation cancelled');
      router.refresh();
    }).catch((error) => {
      toast.error(error?.response?.data?.error);
    }).finally(() => {
      setDeletingId('');
    });
  }, [router]);

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties"/>
      <div className="
        mt-10
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
      ">
        { reservations.map((reservation) => (
          <ListingCard data={reservation.listing}
        key={reservation.id}
        reservation={reservation}
        currentUser={currentUser}
        onAction={onCancel}
        actionId={reservation.id}
        disabled={reservation.id === deletingId}
        actionLabel="Cancel guest reservation"
      />
      ))}
      </div>
    </Container>
  );
}
export default ReservationsClient;