'use client'

import {Listing, Reservation} from "@prisma/client";
import {SafeListing, SafeUser} from "@/app/types";
import {useRouter} from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import {useCallback, useMemo} from "react";
import {format} from 'date-fns';
import Image from 'next/image'
import HeartButton from "@/app/components/HeartButton";
import Button from "@/app/components/Button";

interface ListingCardProps {
  data: SafeListing;
  reservation?: Reservation;
  onAction?: (id:string) => void;
  disabled?: boolean;
  currentUser?: SafeUser | null;
  actionLabel?: string;
  actionId?: string;

}
const ListingCard: React.FC<ListingCardProps> = ({
                                                   data,
  reservation,
  onAction,
  disabled,
  currentUser,
  actionId = "",
  actionLabel
                                                 }) => {
  const router = useRouter();
  const {getByValue} = useCountries();

  const country = getByValue(data.locationValue)
  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (disabled) {
      return;
    }
    onAction?.(actionId);
  },[onAction, actionId, disabled]);

  const price = useMemo(()=> {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(()=> {
    if (!reservation) {
      return null;
    }

    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);

    return `${format(startDate, 'PP') } - ${format(endDate, 'PP') } `;
  }, [reservation]);


  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image fill src={data.imageSrc} alt="Listing" className="object-cover h-full w-full group-hover:scale-110 transition" />
          <div className="absolute top-3 right-3"><HeartButton listingId={data.id} currentUser={currentUser} /></div>
        </div>
        <div className="font-semibold text-lg">{country?.region}, {country?.label}</div>
        <div className="font-light text-lg">{reservationDate || data.category }</div>
        <div className="flex flex-row gap-1 items-center">
          <div className="font-semibold">$ { price }</div>
          <div className="font-light">night</div>
          {onAction && actionLabel && (
            <Button small
                    label={actionLabel}
                    disabled={disabled}
                    onClick={handleCancel}
            />)}
        </div>

      </div>

  </div>)
}
export default ListingCard