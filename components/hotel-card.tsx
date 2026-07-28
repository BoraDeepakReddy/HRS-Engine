"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hotel } from "@/lib/data/hotels";

export function HotelCard({ hotel }: { hotel: Hotel }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev === hotel.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev === 0 ? hotel.images.length - 1 : prev - 1));
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link href={`/hotel/${hotel.id}`} className="group flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden">
      
      {/* Image Carousel */}
      <div className="relative h-60 sm:h-auto sm:w-72 sm:min-w-72 shrink-0 overflow-hidden rounded-xl">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentImage}
            src={hotel.images[currentImage]}
            alt={hotel.name}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
        
        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className="absolute right-3 top-3 z-10 rounded-full p-2 bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-colors"
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
        </button>

        {/* Carousel Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={prevImage} className="rounded-full bg-white/70 p-1 text-black hover:bg-white backdrop-blur-md shadow-sm">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={nextImage} className="rounded-full bg-white/70 p-1 text-black hover:bg-white backdrop-blur-md shadow-sm">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {hotel.images.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === currentImage ? "w-4 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 justify-between py-1">
        <div>
          <div className="flex justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1 text-muted-foreground text-sm">
                <MapPin className="h-3.5 w-3.5" />
                <span>{hotel.location.city}, {hotel.location.country}</span>
              </div>
              <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{hotel.name}</h3>
              <div className="flex items-center gap-1 mt-1 text-yellow-500">
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-sm">
                    {hotel.rating >= 9.5 ? "Exceptional" : hotel.rating >= 9.0 ? "Superb" : "Fabulous"}
                  </span>
                  <span className="text-xs text-muted-foreground">{hotel.reviewsCount} reviews</span>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                  {hotel.rating.toFixed(1)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {hotel.badges.map((badge, i) => (
              <Badge key={i} variant="secondary" className="font-normal bg-accent/10 text-accent hover:bg-accent/20 border-none">
                {badge}
              </Badge>
            ))}
            <Badge variant="outline" className="font-normal text-muted-foreground border-border">
              {hotel.propertyType}
            </Badge>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground line-clamp-2">
            {hotel.description}
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between border-t pt-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-emerald-600 font-medium">Free cancellation</span>
            <span className="text-xs text-muted-foreground">No prepayment needed</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-muted-foreground">Price for 1 night</span>
            <div className="flex items-baseline gap-2">
              {hotel.originalPricePerNight && (
                <span className="text-sm text-muted-foreground line-through">${hotel.originalPricePerNight}</span>
              )}
              <span className="text-2xl font-bold">${hotel.pricePerNight}</span>
            </div>
            <span className="text-xs text-muted-foreground">Includes taxes and fees</span>
            <Button className="mt-3 w-full sm:w-auto rounded-full">View Availability</Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
