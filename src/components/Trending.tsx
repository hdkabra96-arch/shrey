import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';

const trendingItems = [
  {
    title: 'Varshitap Parna',
    image: 'https://picsum.photos/seed/pooja/400/500',
    category: 'Pooja',
  },
  {
    title: 'Sunderkand Path',
    image: 'https://picsum.photos/seed/path/400/500',
    category: 'Pooja',
  },
  {
    title: 'Ram Navami',
    image: 'https://picsum.photos/seed/festival/400/500',
    category: 'Festival',
  },
  {
    title: 'Wedding Invitation',
    image: 'https://picsum.photos/seed/wedding/400/500',
    category: 'Wedding',
  },
];

export const Trending = () => {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <Badge variant="outline" className="mb-2 uppercase tracking-widest">
              What's Hot
            </Badge>
            <h2 className="text-3xl font-bold sm:text-4xl">EXPLORE WHAT’S TRENDING</h2>
          </div>
          <a href="#" className="text-sm font-medium text-primary hover:underline">
            View All
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trendingItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border-none bg-transparent shadow-none">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-xs font-medium uppercase tracking-wider text-white/80">
                        {item.category}
                      </p>
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    </div>
                  </div>
                  <div className="mt-4 text-center group-hover:hidden">
                    <h3 className="font-serif text-xl font-medium">{item.title}</h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
