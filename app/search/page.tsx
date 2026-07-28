"use client";

import { useState, useEffect } from "react";
import { LayoutGrid, List, Map as MapIcon } from "lucide-react";

import { FilterSidebar } from "@/components/filter-sidebar";
import { HotelCard } from "@/components/hotel-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchResultsPage() {
  const [view, setView] = useState<"list" | "grid">("list");
  const [sortBy, setSortBy] = useState("recommended");
  const [hotels, setHotels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHotels() {
      try {
        const res = await fetch("/api/hotels");
        const data = await res.json();
        setHotels(data);
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHotels();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Search Summary Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
          Hotels in Paris
        </h1>
        <p className="text-muted-foreground">
          Found {hotels.length} hotels • Oct 12 - Oct 16 • 2 Adults, 1 Room
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <aside>
          <FilterSidebar />
        </aside>

        {/* Results */}
        <div className="flex-1">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b">
            
            <div className="flex items-center gap-2">
              <Button 
                variant={view === "list" ? "default" : "outline"} 
                size="icon" 
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button 
                variant={view === "grid" ? "default" : "outline"} 
                size="icon" 
                onClick={() => setView("grid")}
                className="hidden sm:inline-flex"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="ml-2 lg:hidden">
                <MapIcon className="mr-2 h-4 w-4" />
                Map View
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Sort by:</span>
              <Select value={sortBy} onValueChange={(val) => val && setSortBy(val)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Guest Rating</SelectItem>
                  <SelectItem value="distance">Distance from Center</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
          </div>

          {/* Hotel List */}
          {isLoading ? (
            <div className="flex justify-center p-12">Loading hotels...</div>
          ) : (
            <div className={`grid gap-6 ${view === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
              {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}
          
          {/* Pagination Placeholder */}
          <div className="mt-12 flex justify-center">
            <Button variant="outline" size="lg" className="rounded-full">
              Load More Results
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
