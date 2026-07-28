export interface Hotel {
  id: string;
  name: string;
  description: string;
  location: {
    city: string;
    country: string;
    address: string;
    lat: number;
    lng: number;
  };
  rating: number;
  stars: number;
  reviewsCount: number;
  pricePerNight: number;
  originalPricePerNight?: number;
  images: string[];
  amenities: string[];
  propertyType: "Hotel" | "Resort" | "Villa" | "Apartment";
  badges: string[];
}

export const mockHotels: Hotel[] = [
  {
    id: "h-1",
    name: "The Azure Retreat & Spa",
    description:
      "Experience luxury at its finest at The Azure Retreat. Featuring panoramic ocean views, world-class dining, and an award-winning spa, this 5-star resort offers the perfect getaway for relaxation and indulgence.",
    location: {
      city: "Santorini",
      country: "Greece",
      address: "12 Oia Cliffside",
      lat: 36.4618,
      lng: 25.3753,
    },
    rating: 9.6,
    stars: 5,
    reviewsCount: 1284,
    pricePerNight: 450,
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618140052121-39fc6db33972?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c894e4dc24a2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
    ],
    amenities: ["Free Wi-Fi", "Swimming Pool", "Spa", "Airport Shuttle", "Free Breakfast"],
    propertyType: "Resort",
    badges: ["Top Rated", "Free Cancellation"],
  },
  {
    id: "h-2",
    name: "Grand Plaza Hotel",
    description:
      "Situated in the heart of the city, Grand Plaza Hotel combines historic charm with modern elegance. Steps away from major attractions, shopping, and entertainment.",
    location: {
      city: "Paris",
      country: "France",
      address: "45 Avenue des Champs-Élysées",
      lat: 48.8698,
      lng: 2.3075,
    },
    rating: 8.9,
    stars: 4,
    reviewsCount: 3420,
    pricePerNight: 280,
    originalPricePerNight: 350,
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c0d509af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590490359683-658d34c8f123?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    ],
    amenities: ["Free Wi-Fi", "Fitness Center", "Restaurant", "Bar"],
    propertyType: "Hotel",
    badges: ["Special Deal", "No Prepayment Needed"],
  },
  {
    id: "h-3",
    name: "Oasis Palm Villa",
    description:
      "A secluded beachfront villa offering absolute privacy and breathtaking sunsets. Features a private infinity pool, personalized butler service, and direct beach access.",
    location: {
      city: "Bali",
      country: "Indonesia",
      address: "88 Seminyak Beach Road",
      lat: -8.6913,
      lng: 115.1682,
    },
    rating: 9.8,
    stars: 5,
    reviewsCount: 456,
    pricePerNight: 850,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613490900233-08c48a3d538e?auto=format&fit=crop&w=800&q=80",
    ],
    amenities: ["Private Pool", "Free Wi-Fi", "Pet Friendly", "Kitchen", "Butler Service"],
    propertyType: "Villa",
    badges: ["Exceptional"],
  },
  {
    id: "h-4",
    name: "Urban Loft Apartments",
    description:
      "Modern, fully equipped apartments in the downtown core. Ideal for long stays or business trips with high-speed internet and coworking spaces available on-site.",
    location: {
      city: "New York",
      country: "USA",
      address: "120 Broadway",
      lat: 40.7081,
      lng: -74.0113,
    },
    rating: 8.4,
    stars: 3,
    reviewsCount: 890,
    pricePerNight: 150,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1c2c49e592?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    ],
    amenities: ["Free Wi-Fi", "Kitchen", "Gym", "Coworking Space"],
    propertyType: "Apartment",
    badges: [],
  },
  {
    id: "h-5",
    name: "Alpine Lodge & Ski Resort",
    description:
      "Cozy lodge situated at the base of the mountains. Offers ski-in/ski-out access, hot tubs, and a rustic fireplace lounge for the perfect winter getaway.",
    location: {
      city: "Zermatt",
      country: "Switzerland",
      address: "Mountain View 1",
      lat: 46.0207,
      lng: 7.7491,
    },
    rating: 9.2,
    stars: 4,
    reviewsCount: 1120,
    pricePerNight: 320,
    images: [
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80",
    ],
    amenities: ["Free Wi-Fi", "Ski-in/Ski-out", "Spa", "Restaurant", "Bar"],
    propertyType: "Resort",
    badges: ["Popular"],
  }
];
