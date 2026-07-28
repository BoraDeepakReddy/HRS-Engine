export interface Review {
  id: string;
  hotelId: string;
  user: {
    name: string;
    avatar: string;
    country: string;
  };
  score: number;
  date: string;
  title: string;
  text: string;
  categories: {
    cleanliness: number;
    location: number;
    service: number;
    value: number;
  };
}

export const mockReviews: Review[] = [
  {
    id: "rev-1",
    hotelId: "h-1",
    user: {
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      country: "United Kingdom",
    },
    score: 9.8,
    date: "October 12, 2025",
    title: "Absolutely stunning stay!",
    text: "The views from the pool were breathtaking. The staff went above and beyond to make our anniversary special. The breakfast buffet had endless options.",
    categories: {
      cleanliness: 10,
      location: 10,
      service: 10,
      value: 9,
    },
  },
  {
    id: "rev-2",
    hotelId: "h-1",
    user: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      country: "Canada",
    },
    score: 9.2,
    date: "September 05, 2025",
    title: "Great resort, very relaxing",
    text: "Loved our time here. The spa treatments are a must-try. The only downside was that the main restaurant gets a bit crowded during peak dinner hours.",
    categories: {
      cleanliness: 10,
      location: 9.5,
      service: 9,
      value: 8.5,
    },
  },
  {
    id: "rev-3",
    hotelId: "h-2",
    user: {
      name: "Elena Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
      country: "Spain",
    },
    score: 8.5,
    date: "November 20, 2025",
    title: "Perfect location for exploring Paris",
    text: "You can't beat the location. Right on the Champs-Élysées! The room was a bit small but beautifully decorated. Will definitely return.",
    categories: {
      cleanliness: 9,
      location: 10,
      service: 8,
      value: 7,
    },
  }
];
