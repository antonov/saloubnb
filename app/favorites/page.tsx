import getCurrentUser from "@/app/actions/getCurrentUser";
import {getReservations} from "@/app/actions/getReservations";
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import FavoritesClient from "@/app/favorites/FavoritesClient";
import {getFavoriteListings} from "@/app/actions/getFavoriteListings";


const FavoritesPage = async() => {
  const currentUser  = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login!" />
      </ClientOnly>
    )
  }

  const favorites = await getFavoriteListings();
  if (favorites.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No favorites found" subtitle="Looks like you have no favorite listings" />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <FavoritesClient favorites={favorites}  currentUser={currentUser} />
    </ClientOnly>
  )
}

export default FavoritesPage;