import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    
    const whereClause = location ? {
      location: {
        contains: location,
      }
    } : {};

    const hotels = await prisma.hotel.findMany({
      where: whereClause,
      include: {
        rooms: true,
      }
    });

    const formattedHotels = hotels.map(hotel => {
      const locationParts = hotel.location.split(', ');
      const city = locationParts[0] || 'Unknown City';
      const country = locationParts[1] || 'Unknown Country';

      return {
        id: hotel.id,
        name: hotel.name,
        description: hotel.description,
        location: {
          city,
          country,
          address: hotel.location,
          coordinates: [0, 0]
        },
        rating: hotel.rating,
        reviewsCount: 128, // Default dummy value
        stars: 5,
        pricePerNight: hotel.pricePerNight,
        images: hotel.images.split(','), // Assuming comma-separated
        amenities: ["Free WiFi", "Pool", "Spa", "Restaurant"],
        propertyType: "Hotel",
        badges: ["Top Rated", "Luxury"]
      };
    });

    return NextResponse.json(formattedHotels);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching hotels" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Need to find the user's ID
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const data = await request.json();

    const newHotel = await prisma.hotel.create({
      data: {
        name: data.name,
        description: data.description,
        location: data.location,
        pricePerNight: data.pricePerNight,
        images: data.images || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        ownerId: user.id,
      }
    });

    return NextResponse.json(newHotel, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating hotel" }, { status: 500 });
  }
}
