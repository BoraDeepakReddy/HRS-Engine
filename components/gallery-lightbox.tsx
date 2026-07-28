"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Grid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Hotel } from "@/lib/data/hotels";

export function GalleryLightbox({ hotel }: { hotel: Hotel }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = hotel.images;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      <div className="relative rounded-2xl overflow-hidden mb-8 grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] sm:h-[500px]">
        {/* Main Cover */}
        <div 
          className="md:col-span-2 md:row-span-2 relative cursor-pointer group"
          onClick={() => openLightbox(0)}
        >
          <img 
            src={images[0]} 
            alt={hotel.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </div>
        
        {/* Thumbnails */}
        {images.slice(1, 5).map((img, idx) => (
          <div 
            key={idx} 
            className={`relative hidden md:block cursor-pointer group overflow-hidden ${idx === 3 ? "hidden lg:block" : ""}`}
            onClick={() => openLightbox(idx + 1)}
          >
            <img 
              src={img} 
              alt={`${hotel.name} - ${idx + 1}`} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            
            {/* View All Button on last thumbnail */}
            {idx === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">+{images.length - 5} photos</span>
              </div>
            )}
          </div>
        ))}
        
        <Button 
          variant="secondary" 
          className="absolute bottom-4 right-4 z-10 shadow-lg rounded-full"
          onClick={() => openLightbox(0)}
        >
          <Grid className="mr-2 h-4 w-4" />
          View all photos
        </Button>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-6 right-6 p-2 text-white hover:bg-white/20 rounded-full transition-colors z-[101]"
              onClick={closeLightbox}
            >
              <X className="h-8 w-8" />
            </button>

            <button 
              className="absolute left-4 sm:left-10 p-3 text-white hover:bg-white/20 rounded-full transition-colors z-[101]"
              onClick={prevImage}
            >
              <ChevronLeft className="h-10 w-10" />
            </button>

            <button 
              className="absolute right-4 sm:right-10 p-3 text-white hover:bg-white/20 rounded-full transition-colors z-[101]"
              onClick={nextImage}
            >
              <ChevronRight className="h-10 w-10" />
            </button>

            <div 
              className="relative w-full max-w-5xl px-4 md:px-20 h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`${hotel.name} - ${currentIndex}`}
                className="max-h-full max-w-full object-contain shadow-2xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute bottom-0 text-white/70 text-sm py-4">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
