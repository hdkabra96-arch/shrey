import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useStore } from '../context/StoreContext';

export const Hero = () => {
  const { bannerSlides } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Auto scroll
  useEffect(() => {
    if (lightboxIndex !== null) return; // Pause auto-scroll when lightbox is open
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [lightboxIndex, bannerSlides]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const visibleSlides = [];
  for (let i = 0; i < 3; i++) {
    const slide = bannerSlides[(currentIndex + i) % bannerSlides.length];
    visibleSlides.push({
      ...slide,
      originalIndex: (currentIndex + i) % bannerSlides.length
    });
  }

  return (
    <section className="py-12 bg-white flex flex-col items-center w-full overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl mb-8 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#EAB308] uppercase">
          <span className="text-[#333333]">Explore What's</span> Trending
        </h2>
      </div>

      <div className="container mx-auto px-4 max-w-6xl flex items-center gap-2 md:gap-6">
        <button
          onClick={prevSlide}
          className="h-16 w-12 hidden md:flex items-center justify-center bg-[#E5E7EB] hover:bg-[#D1D5DB] transition-colors rounded-sm flex-shrink-0"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>

        <div className="flex-1 bg-[#E2E6E9] rounded-sm py-8 px-4 md:py-16 md:px-12 flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full mb-10">
            {visibleSlides.map((slide, i) => (
              <div key={`${currentIndex}-${i}`} className="flex flex-col items-center gap-3 animate-in fade-in duration-500">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 text-center uppercase tracking-wide">
                  {slide.title}
                </h3>
                <div
                  className="aspect-[9/16] rounded-md w-full bg-white shadow-sm flex items-center justify-center p-2 cursor-pointer group"
                  onClick={() => setLightboxIndex(slide.originalIndex)}
                >
                  <img 
                    src={slide.url} 
                    alt={slide.title} 
                    className="w-full h-full object-cover rounded-sm transition-transform duration-700 origin-center hover:scale-[1.5] hover:z-50 hover:shadow-2xl relative" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {bannerSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  currentIndex === i ? 'bg-[#2ECC71]' : 'bg-[#6C757D]'
                }`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="h-16 w-12 hidden md:flex items-center justify-center bg-[#E5E7EB] hover:bg-[#D1D5DB] transition-colors rounded-sm flex-shrink-0"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      <Dialog open={lightboxIndex !== null} onOpenChange={(open) => !open && setLightboxIndex(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-transparent border-none shadow-none flex items-center justify-center [&>button:last-child]:hidden">
            <DialogTitle className="sr-only">Image preview</DialogTitle>
            {lightboxIndex !== null && (
              <div className="relative group flex items-center justify-center w-full h-full">
                <img 
                  src={bannerSlides[lightboxIndex].url} 
                  alt={bannerSlides[lightboxIndex].title} 
                  className="max-h-[85vh] max-w-[85vw] object-contain rounded-md"
                  referrerPolicy="no-referrer"
                />
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(null);
                  }}
                  className="absolute top-2 right-2 rounded-full opacity-70 transition-opacity hover:opacity-100 bg-black/50 text-white p-2 backdrop-blur-sm"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev! - 1 + bannerSlides.length) % bannerSlides.length);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev! + 1) % bannerSlides.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
