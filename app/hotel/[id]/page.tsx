"use client";

import { use } from "react";
import { Star, MapPin, Check, Share, Heart } from "lucide-react";

import { mockHotels } from "@/lib/data/hotels";
import { mockRooms } from "@/lib/data/rooms";
import { mockReviews } from "@/lib/data/reviews";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import { RoomCard } from "@/components/room-card";
import { ReviewSection } from "@/components/review-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HotelDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  // In a real app we'd fetch this based on the ID. For now we find it or fallback to the first hotel
  const hotel = mockHotels.find(h => h.id === id) || mockHotels[0];
  const hotelRooms = mockRooms.filter(r => r.hotelId === hotel.id).length > 0 
                     ? mockRooms.filter(r => r.hotelId === hotel.id)
                     : mockRooms;
                     
  const hotelReviews = mockReviews.filter(r => r.hotelId === hotel.id).length > 0
                       ? mockReviews.filter(r => r.hotelId === hotel.id)
                       : mockReviews;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-yellow-500">
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
            <Badge variant="outline" className="ml-2 font-normal">
              {hotel.propertyType}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{hotel.name}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{hotel.location.address}, {hotel.location.city}, {hotel.location.country}</span>
            <Button variant="link" className="h-auto p-0 ml-2">Show on map</Button>
          </div>
        </div>
        
        <div className="flex items-center gap-3 self-start">
          <Button variant="outline" size="icon" className="rounded-full">
            <Share className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Heart className="h-4 w-4" />
          </Button>
          <Button className="rounded-full shadow-md px-6">
            Reserve
          </Button>
        </div>
      </div>

      <GalleryLightbox hotel={hotel} />

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-10 mt-10">
        
        <div className="flex-1">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-8 overflow-x-auto">
              <TabsTrigger value="overview" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3">Overview</TabsTrigger>
              <TabsTrigger value="rooms" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3">Available Rooms</TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3">Reviews ({hotel.reviewsCount})</TabsTrigger>
              <TabsTrigger value="policies" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3">Policies</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0 outline-none">
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed">{hotel.description}</p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4">Most popular amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {hotel.amenities.map(amenity => (
                    <div key={amenity} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="h-4 w-4 text-primary" /> {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="rooms" className="mt-0 outline-none space-y-6">
              <h2 className="text-2xl font-bold mb-6">Choose your room</h2>
              {hotelRooms.map(room => (
                <RoomCard key={room.id} room={room} />
              ))}
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-0 outline-none">
              <h2 className="text-2xl font-bold mb-2">Guest Reviews</h2>
              <ReviewSection reviews={hotelReviews} overallScore={hotel.rating} reviewCount={hotel.reviewsCount} />
            </TabsContent>

            <TabsContent value="policies" className="mt-0 outline-none">
              <div className="rounded-2xl border p-6">
                <h3 className="text-xl font-semibold mb-4">House Rules</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-4">
                    <div className="font-medium">Check-in</div>
                    <div className="md:col-span-2 text-muted-foreground">From 15:00</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-4">
                    <div className="font-medium">Check-out</div>
                    <div className="md:col-span-2 text-muted-foreground">Until 11:00</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="font-medium">Cancellation</div>
                    <div className="md:col-span-2 text-muted-foreground">
                      Cancellation and prepayment policies vary according to accommodation type. Please check the room conditions when selecting your room above.
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

          </Tabs>
        </div>
        
        {/* Sticky Summary Widget */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="sticky top-24 rounded-2xl border bg-card shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                {hotel.rating.toFixed(1)}
              </div>
              <div>
                <div className="font-semibold">{hotel.rating >= 9.5 ? "Exceptional" : hotel.rating >= 9.0 ? "Superb" : "Fabulous"}</div>
                <div className="text-xs text-muted-foreground">{hotel.reviewsCount} reviews</div>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground mb-1">Price for 1 night</div>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold">${hotel.pricePerNight}</span>
            </div>
            
            <Button className="w-full h-12 rounded-xl shadow-md text-lg" onClick={() => {
              const el = document.querySelector('[value="rooms"]');
              if(el) (el as HTMLElement).click();
            }}>
              See availability
            </Button>
            
            <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-emerald-600">
              <Check className="h-4 w-4" /> We Price Match
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
