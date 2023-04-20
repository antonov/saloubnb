'use client';
import {SafeListing, SafeReservation, SafeUser} from "@/app/types";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import ClientOnly from "@/app/components/ClientOnly";
import Heading from "@/app/components/Heading";

interface TripsClientProps{
  favorites: SafeListing[];
  currentUser?: SafeUser | null;
}
const FavoritesClient: React.FC<TripsClientProps> = ({favorites, currentUser}) => {
  return (
    <Container>
    <Heading title="Favorites" subtitle="Your favorite listings"/>
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

        { favorites.map((favorite: any) => {
          return (
            <ListingCard currentUser={currentUser} key={favorite.id} data={favorite}/>
          )
        })}

      </div>
    </Container>
  )
}
export default FavoritesClient;