import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      include: {
        hotel: true,
        room: true,
      }
    });

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching bookings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const data = await request.json();

    const newBooking = await prisma.booking.create({
      data: {
        userId: user.id,
        hotelId: data.hotelId,
        roomId: data.roomId,
        checkIn: new Date(data.checkIn),
        checkOut: new Date(data.checkOut),
        totalAmount: data.totalAmount,
      }
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating booking" }, { status: 500 });
  }
}
