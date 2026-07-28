export interface Room {
  id: string;
  hotelId: string;
  type: string;
  name: string;
  sizeSqFt: number;
  bedType: string;
  maxOccupancy: number;
  viewType: string;
  pricePerNight: number;
  inclusions: string[];
  images: string[];
  available: boolean;
}

export const mockRooms: Room[] = [
  {
    id: "r-1",
    hotelId: "h-1",
    type: "Standard",
    name: "Classic Ocean View",
    sizeSqFt: 350,
    bedType: "1 King Bed",
    maxOccupancy: 2,
    viewType: "Ocean View",
    pricePerNight: 450,
    inclusions: ["Free Wi-Fi", "Free Cancellation until 2 days before"],
    images: [
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
    ],
    available: true,
  },
  {
    id: "r-2",
    hotelId: "h-1",
    type: "Suite",
    name: "Deluxe Suite with Plunge Pool",
    sizeSqFt: 650,
    bedType: "1 King Bed",
    maxOccupancy: 3,
    viewType: "Panoramic Ocean View",
    pricePerNight: 750,
    inclusions: ["Breakfast included", "Free Wi-Fi", "Free Cancellation until 1 day before", "Welcome Drink"],
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    ],
    available: true,
  },
  {
    id: "r-3",
    hotelId: "h-2",
    type: "Standard",
    name: "City King Room",
    sizeSqFt: 300,
    bedType: "1 King Bed",
    maxOccupancy: 2,
    viewType: "City View",
    pricePerNight: 280,
    inclusions: ["Free Wi-Fi", "No Prepayment Needed"],
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    ],
    available: true,
  },
  {
    id: "r-4",
    hotelId: "h-2",
    type: "Suite",
    name: "Executive Suite",
    sizeSqFt: 550,
    bedType: "1 King Bed, 1 Sofa Bed",
    maxOccupancy: 4,
    viewType: "Eiffel Tower View",
    pricePerNight: 550,
    inclusions: ["Breakfast included", "Free Wi-Fi", "Lounge Access"],
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
    ],
    available: true,
  }
];
