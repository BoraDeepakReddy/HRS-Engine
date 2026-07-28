"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Calendar, Settings, Heart, LogOut, ChevronRight, MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockBookings } from "@/lib/data/bookings";
import { mockHotels } from "@/lib/data/hotels";

export default function AccountDashboard() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "bookings";

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Tabs defaultValue={defaultTab} className="w-full flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-16 w-16 bg-primary text-primary-foreground flex items-center justify-center rounded-full text-2xl font-bold shadow-sm">
              JD
            </div>
            <div>
              <h2 className="font-bold text-lg">John Doe</h2>
              <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            </div>
          </div>
          
          <TabsList className="flex flex-col h-auto bg-transparent items-start w-full gap-2 p-0">
            <TabsTrigger value="bookings" className="w-full justify-start px-4 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-muted/50 rounded-xl transition-colors">
              <Calendar className="mr-3 h-5 w-5" /> My Bookings
            </TabsTrigger>
            <TabsTrigger value="saved" className="w-full justify-start px-4 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-muted/50 rounded-xl transition-colors">
              <Heart className="mr-3 h-5 w-5" /> Saved Hotels
            </TabsTrigger>
            <TabsTrigger value="profile" className="w-full justify-start px-4 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-muted/50 rounded-xl transition-colors">
              <Settings className="mr-3 h-5 w-5" /> Profile & Preferences
            </TabsTrigger>
          </TabsList>
          
          <Button variant="ghost" className="w-full justify-start px-4 py-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl mt-4 md:mt-8">
            <LogOut className="mr-3 h-5 w-5" /> Sign Out
          </Button>
        </aside>

        {/* Content Area */}
        <div className="flex-1">
          
          {/* Bookings Tab */}
          <TabsContent value="bookings" className="mt-0 outline-none animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">My Bookings</h1>
              <Button variant="outline" size="sm">Download History</Button>
            </div>

            <div className="space-y-4">
              {mockBookings.map(booking => (
                <div key={booking.id} className="flex flex-col sm:flex-row p-4 rounded-2xl border bg-card hover:shadow-md transition-shadow gap-6 group">
                  <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden shrink-0">
                    <img src={booking.imageUrl} alt={booking.hotelName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant={booking.status === "Active" ? "default" : booking.status === "Past" ? "secondary" : "destructive"} className="mb-2">
                          {booking.status}
                        </Badge>
                        <span className="text-sm font-medium text-muted-foreground">#{booking.id}</span>
                      </div>
                      <h3 className="text-xl font-bold">{booking.hotelName}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1 mb-2">
                        <MapPin className="h-3.5 w-3.5" /> {booking.hotelLocation}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{booking.roomType}</span> • {booking.checkIn} to {booking.checkOut}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end mt-4 pt-4 border-t">
                      <div className="font-bold text-lg">${booking.totalAmount}</div>
                      <div className="flex gap-2">
                        {booking.status === "Active" && (
                          <>
                            <Button variant="outline" size="sm" className="hidden sm:inline-flex">Modify</Button>
                            <Button size="sm">Manage</Button>
                          </>
                        )}
                        {booking.status === "Past" && (
                          <Button variant="outline" size="sm">Book Again</Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Saved Tab */}
          <TabsContent value="saved" className="mt-0 outline-none animate-in fade-in duration-500">
            <h1 className="text-2xl font-bold mb-6">Saved Hotels</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {mockHotels.slice(0,2).map(hotel => (
                <div key={hotel.id} className="rounded-2xl border bg-card overflow-hidden group">
                  <div className="relative h-48">
                    <img src={hotel.images[0]} alt={hotel.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button className="absolute right-3 top-3 z-10 rounded-full p-2 bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-colors">
                      <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                      <MapPin className="h-3.5 w-3.5" /> {hotel.location.city}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{hotel.name}</h3>
                    <div className="flex justify-between items-end">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                        {hotel.rating.toFixed(1)}
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">From</div>
                        <div className="font-bold text-lg">${hotel.pricePerNight}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-0 outline-none animate-in fade-in duration-500">
            <h1 className="text-2xl font-bold mb-6">Profile & Preferences</h1>
            <div className="rounded-2xl border bg-card p-6 mb-6">
              <h3 className="font-semibold text-lg mb-4">Personal Information</h3>
              <div className="space-y-4 max-w-md">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input type="text" value="John Doe" readOnly className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input type="email" value="john.doe@example.com" readOnly className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm" />
                </div>
                <Button>Edit Profile</Button>
              </div>
            </div>
          </TabsContent>

        </div>
      </Tabs>
    </div>
  );
}
