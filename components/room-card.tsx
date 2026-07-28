"use client";

import { Check, Users, Maximize, BedDouble, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Room } from "@/lib/data/rooms";

export function RoomCard({ room }: { room: Room }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState("1");

  const handleReserve = () => {
    // In a real app, we'd save this to global state/context before routing
    router.push(`/checkout?roomId=${room.id}&quantity=${quantity}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl border bg-card text-card-foreground shadow-sm">
      
      {/* Room Image & Basics */}
      <div className="w-full md:w-1/3 shrink-0 flex flex-col gap-4">
        <div className="relative h-48 w-full rounded-xl overflow-hidden">
          <img 
            src={room.images[0]} 
            alt={room.name} 
            className="absolute inset-0 h-full w-full object-cover" 
          />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">{room.name}</h3>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Maximize className="h-4 w-4" /> {room.sizeSqFt} sq ft</span>
            <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> Sleeps {room.maxOccupancy}</span>
            <span className="flex items-center gap-1.5"><BedDouble className="h-4 w-4" /> {room.bedType}</span>
          </div>
        </div>
      </div>

      {/* Details & Inclusions */}
      <div className="flex-1 flex flex-col justify-between border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
        <div>
          <div className="mb-4">
            <span className="inline-block px-2.5 py-1 rounded-md bg-muted text-xs font-medium text-foreground mb-3">
              {room.viewType}
            </span>
            <h4 className="font-semibold mb-2 flex items-center gap-1.5">
              <Info className="h-4 w-4 text-primary" /> 
              What's included in this price:
            </h4>
            <ul className="space-y-2">
              {room.inclusions.map((inclusion, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span className={inclusion.toLowerCase().includes("free cancellation") ? "text-green-600 dark:text-green-500 font-medium" : ""}>
                    {inclusion}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="flex flex-col sm:flex-row items-end justify-between gap-4 mt-6 bg-muted/30 p-4 rounded-xl border border-muted">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Price for 1 night, {room.maxOccupancy} adults</div>
            <div className="text-3xl font-bold text-foreground">${room.pricePerNight}</div>
            <div className="text-xs text-muted-foreground mt-1">Includes taxes and charges</div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Select value={quantity} onValueChange={(val) => val && setQuantity(val)}>
              <SelectTrigger className="w-[80px] h-11">
                <SelectValue placeholder="Qty" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              size="lg" 
              className="flex-1 sm:flex-none h-11 rounded-lg px-8 shadow-md"
              onClick={handleReserve}
            >
              Reserve
            </Button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
