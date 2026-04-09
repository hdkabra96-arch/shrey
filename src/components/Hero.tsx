import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: 'https://picsum.photos/seed/wedding-slider/1920/1080',
    title: 'Elegant Wedding Invitations',
    offer: 'Flat 20% Off on Video Invites',
  },
  {
    image: 'https://picsum.photos/seed/birthday-slider/1920/1080',
    title: 'Fun Birthday Themes',
    offer: 'Buy 1 Get 1 on Digital Cards',
  },
  {
    image: 'https://picsum.photos/seed/baby-slider/1920/1080',
    title: 'Adorable Baby Shower Invites',
    offer: 'New Collection Just Arrived',
  },
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              WE HELP YOU <br />
              <span className="text-primary">SPREAD JOY</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Get customized Video Invitation Maker | Digital Invitation Card for all occasions. 
              Send it via WhatsApp. Choose from thousands of templates.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="h-12 px-8 text-lg">
                Explore Templates
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg">
                How it Works
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 w-full max-w-5xl"
          >
            <div className="group relative aspect-video overflow-hidden rounded-2xl border bg-muted shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 text-left">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-sm font-bold uppercase tracking-widest text-primary"
                    >
                      {slides[currentSlide].offer}
                    </motion.p>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="font-serif text-2xl font-bold text-white sm:text-4xl"
                    >
                      {slides[currentSlide].title}
                    </motion.h3>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-white/40"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-white/40"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 right-8 flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      currentSlide === i ? 'w-6 bg-primary' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute -left-20 top-20 -z-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-20 bottom-20 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
    </section>
  );
};
