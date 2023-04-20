import prisma from '@/app/libs/prismadb';

export interface IListingsParams {
  userId?: string;
}
export async function getListings(params: IListingsParams) {
  try {
    const { userId } = params;
    const query: any = {};
    if(userId) {
      query.userId = userId;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeListings = listings.map((listing) => {
      return {
        ...listing,
        createdAt: listing.createdAt.toISOString()
      }
    });

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
