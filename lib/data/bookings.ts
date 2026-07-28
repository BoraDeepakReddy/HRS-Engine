export interface Booking {
  id: string;
  hotelId: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
  };
  totalAmount: number;
  status: "Active" | "Past" | "Cancelled";
  bookingDate: string;
  hotelName: string;
  hotelLocation: string;
  imageUrl: string;
}

export const mockBookings: Booking[] = [
  {
    id: "HRS-89204-X",
    hotelId: "h-2",
    hotelName: "Grand Plaza Hotel",
    hotelLocation: "Paris, France",
    roomType: "Executive Suite",
    checkIn: "2026-10-12",
    checkOut: "2026-10-16",
    guests: {
      adults: 2,
      children: 0,
    },
    totalAmount: 2200,
    status: "Active",
    bookingDate: "2026-06-15",
    imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c0d509af?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "HRS-44123-Y",
    hotelId: "h-4",
    hotelName: "Urban Loft Apartments",
    hotelLocation: "New York, USA",
    roomType: "Studio Apartment",
    checkIn: "2025-12-05",
    checkOut: "2025-12-10",
    guests: {
      adults: 1,
      children: 0,
    },
    totalAmount: 750,
    status: "Past",
    bookingDate: "2025-10-20",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1c2c49e592?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "HRS-11002-Z",
    hotelId: "h-5",
    hotelName: "Alpine Lodge & Ski Resort",
    hotelLocation: "Zermatt, Switzerland",
    roomType: "Standard Room",
    checkIn: "2026-02-14",
    checkOut: "2026-02-21",
    guests: {
      adults: 2,
      children: 2,
    },
    totalAmount: 2240,
    status: "Cancelled",
    bookingDate: "2025-11-01",
    imageUrl: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=400&q=80",
  }
];
