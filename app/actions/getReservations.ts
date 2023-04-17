
import prisma from "@/app/libs/prismadb";


interface IParams {
  listingId?: string;
  authorId?: string;
  userId?: string;
}

export const getReservations = async (params: IParams) => {
  try {
    const {listingId, authorId, userId} = params;
    const query: any = {};
    if (listingId) {
      query.listingId = listingId;
    }
    if (authorId) {
      query.listing = {userId: authorId};
    }
    if (userId) {
      query.listingId = userId;
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })


    const safeReservations = reservations.map(
      (reservation) => ({
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        listing: {
          ...reservation.listing,
          createdAt: reservation.listing.createdAt.toISOString()
        }
      })
    );

    return safeReservations;
  } catch(error:any) {
   throw new Error(error);
  }
}