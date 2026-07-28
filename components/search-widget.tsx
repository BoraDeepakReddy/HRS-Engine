"use client";

import { useState } from "react";
import { format, differenceInDays } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Users, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

export function SearchWidget() {
  const router = useRouter();
  const [date, setDate] = useState<DateRange | undefined>();
  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });
  const [isLoading, setIsLoading] = useState(false);

  const nights = date?.from && date?.to ? differenceInDays(date.to, date.from) : 0;

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate loading for better UX
    setTimeout(() => {
      setIsLoading(false);
      router.push("/search");
    }, 800);
  };

  const updateGuests = (field: keyof typeof guests, increment: number) => {
    setGuests((prev) => {
      const newValue = prev[field] + increment;
      if (newValue < 0) return prev;
      if (field === "adults" && newValue < 1) return prev;
      if (field === "rooms" && newValue < 1) return prev;
      return { ...prev, [field]: newValue };
    });
  };

  return (
    <div className="mx-auto w-full max-w-5xl rounded-2xl bg-background p-4 shadow-xl sm:p-6 lg:p-8 backdrop-blur-lg">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:gap-6">
        
        {/* Destination */}
        <div className="flex flex-col gap-2 rounded-xl border p-3 hover:border-primary focus-within:border-primary transition-colors">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Destination
          </label>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <Input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where are you going?"
              className="border-0 bg-transparent p-0 text-base shadow-none focus-visible:ring-0 h-auto"
            />
          </div>
        </div>

        {/* Date Range Picker */}
        <div className="md:col-span-2">
          <Popover>
            {/* @ts-ignore */}
            <PopoverTrigger asChild>
              <div className="flex h-full cursor-pointer flex-col justify-center gap-2 rounded-xl border p-3 hover:border-primary transition-colors">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer">
                  Check In - Check Out {nights > 0 && <span className="text-primary normal-case ml-2">({nights} {nights === 1 ? 'night' : 'nights'})</span>}
                </label>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  <span className="text-base truncate">
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span className="text-muted-foreground">Add dates</span>
                    )}
                  </span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests & Rooms */}
        <div className="flex flex-col gap-2 rounded-xl border p-3 hover:border-primary transition-colors">
          <Popover>
            {/* @ts-ignore */}
            <PopoverTrigger asChild>
              <div className="flex h-full cursor-pointer flex-col justify-center gap-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer">
                  Guests & Rooms
                </label>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-base truncate">
                    {guests.adults + guests.children} Guests, {guests.rooms} Room
                  </span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Adults</h4>
                    <p className="text-sm text-muted-foreground">Age 13 or above</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateGuests("adults", -1)} disabled={guests.adults <= 1}>-</Button>
                    <span className="w-4 text-center">{guests.adults}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateGuests("adults", 1)}>+</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Children</h4>
                    <p className="text-sm text-muted-foreground">Ages 0-12</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateGuests("children", -1)} disabled={guests.children <= 0}>-</Button>
                    <span className="w-4 text-center">{guests.children}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateGuests("children", 1)}>+</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Rooms</h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateGuests("rooms", -1)} disabled={guests.rooms <= 1}>-</Button>
                    <span className="w-4 text-center">{guests.rooms}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateGuests("rooms", 1)}>+</Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

      </div>

      <div className="mt-6 flex justify-center">
        <Button 
          size="lg" 
          className="w-full md:w-auto md:min-w-[200px] h-14 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? (
            <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Searching...</>
          ) : (
            "Search Hotels"
          )}
        </Button>
      </div>
    </div>
  );
}
