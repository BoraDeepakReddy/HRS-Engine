"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Building2, TrendingUp, Users, Calendar } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";

export default function OwnerDashboard() {
  const { user, intent, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/");
      } else if (user.role === "admin") {
        router.push("/admin");
      } else if (intent !== "hosting") {
        router.push("/explore");
      }
    }
  }, [user, intent, isLoading, router]);

  if (isLoading || !user || intent !== "hosting") return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Owner Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}. Here's your property overview.</p>
        </div>
        <Button size="lg" className="rounded-xl shadow-md">
          <Plus className="mr-2 h-5 w-5" /> Add New Hotel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 text-primary mb-2">
            <Building2 className="h-5 w-5" />
            <h3 className="font-semibold text-foreground">Total Properties</h3>
          </div>
          <div className="text-3xl font-bold">2</div>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 text-green-500 mb-2">
            <TrendingUp className="h-5 w-5" />
            <h3 className="font-semibold text-foreground">Monthly Revenue</h3>
          </div>
          <div className="text-3xl font-bold">$12,450</div>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 text-blue-500 mb-2">
            <Calendar className="h-5 w-5" />
            <h3 className="font-semibold text-foreground">Active Bookings</h3>
          </div>
          <div className="text-3xl font-bold">14</div>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 text-orange-500 mb-2">
            <Users className="h-5 w-5" />
            <h3 className="font-semibold text-foreground">Total Guests</h3>
          </div>
          <div className="text-3xl font-bold">42</div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Your Properties</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border bg-card p-4 flex gap-6 hover:shadow-md transition-shadow">
          <img src="https://images.unsplash.com/photo-1542314831-c6a4d14cece2?auto=format&fit=crop&w=200&q=80" alt="Hotel" className="w-32 h-32 object-cover rounded-xl shrink-0" />
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold">The Azure Retreat</h3>
              <p className="text-sm text-muted-foreground">Santorini, Greece</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Manage Rooms</Button>
              <Button variant="outline" size="sm">View Bookings</Button>
            </div>
          </div>
        </div>
        
        <div className="rounded-2xl border bg-card p-4 flex gap-6 hover:shadow-md transition-shadow">
          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80" alt="Hotel" className="w-32 h-32 object-cover rounded-xl shrink-0" />
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold">Metropolitan Grand</h3>
              <p className="text-sm text-muted-foreground">New York City, USA</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Manage Rooms</Button>
              <Button variant="outline" size="sm">View Bookings</Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
