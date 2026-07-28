"use client";

import { useState } from "react";
import { Search, Map } from "lucide-react";

import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([50, 1000]);

  return (
    <div className="flex flex-col gap-6 w-full lg:w-72 shrink-0">
      
      {/* Map Widget */}
      <div className="relative h-32 w-full rounded-2xl overflow-hidden border bg-muted group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80" 
          alt="Map view" 
          className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Button variant="secondary" className="rounded-full shadow-lg bg-background hover:bg-background/90 text-foreground">
            <Map className="mr-2 h-4 w-4" />
            Show on map
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Filter by:</h3>
        </div>

        {/* Price Filter */}
        <div className="py-4 border-b">
          <h4 className="font-medium mb-4">Price per night</h4>
          <Slider
            defaultValue={[50, 1000]}
            max={1500}
            step={10}
            value={priceRange}
            onValueChange={(val) => setPriceRange(val as number[])}
            className="mb-6"
          />
          <div className="flex items-center justify-between">
            <div className="rounded-lg border px-3 py-1.5 text-sm w-24 text-center bg-muted/50">
              ${priceRange[0]}
            </div>
            <span className="text-muted-foreground">-</span>
            <div className="rounded-lg border px-3 py-1.5 text-sm w-24 text-center bg-muted/50">
              ${priceRange[1]}+
            </div>
          </div>
        </div>

        {/* Star Rating */}
        <div className="py-4 border-b">
          <h4 className="font-medium mb-4">Star Rating</h4>
          <div className="flex flex-col gap-3">
            {[5, 4, 3].map((star) => (
              <div key={star} className="flex items-center space-x-2">
                <Checkbox id={`star-${star}`} />
                <label
                  htmlFor={`star-${star}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1 cursor-pointer"
                >
                  {star} Stars
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Guest Review Score */}
        <div className="py-4 border-b">
          <h4 className="font-medium mb-4">Guest Review Score</h4>
          <div className="flex flex-col gap-3">
            {[
              { id: "excellent", label: "Excellent: 9.0+" },
              { id: "very-good", label: "Very Good: 8.0+" },
              { id: "good", label: "Good: 7.0+" },
              { id: "pleasant", label: "Pleasant: 6.0+" },
            ].map((score) => (
              <div key={score.id} className="flex items-center space-x-2">
                <Checkbox id={score.id} />
                <label
                  htmlFor={score.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {score.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="py-4">
          <h4 className="font-medium mb-4">Amenities</h4>
          <div className="flex flex-col gap-3">
            {[
              "Free Wi-Fi",
              "Swimming Pool",
              "Spa",
              "Pet Friendly",
              "Free Breakfast",
              "Airport Shuttle",
            ].map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox id={amenity.toLowerCase().replace(" ", "-")} />
                <label
                  htmlFor={amenity.toLowerCase().replace(" ", "-")}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
