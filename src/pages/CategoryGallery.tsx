import React, { useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'motion/react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CategoryGallery({ categoryName }: { categoryName: string }) {
  const { products } = useStore();

  const categoryProducts = useMemo(() => {
    // Normalizing category name to allow matching from URL like "Hindu Wedding"
    const decodedCategory = decodeURIComponent(categoryName).replace(/-/g, ' ');
    return products.filter(p => p.category.toLowerCase() === decodedCategory.toLowerCase());
  }, [products, categoryName]);

  const displayCategory = decodeURIComponent(categoryName).replace(/-/g, ' ').toUpperCase();

  return (
    <div className="container mx-auto px-4 py-16 min-h-[60vh]">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-serif font-bold tracking-tight mb-4">{displayCategory}</h1>
        <div className="mx-auto h-1 w-20 bg-primary mb-8" />
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore our beautiful collection of {displayCategory.toLowerCase()} invitations. Find the perfect design for your special occasion.
        </p>
      </div>

      {categoryProducts.length === 0 ? (
        <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed">
          <p className="text-xl font-medium text-muted-foreground">No products found for this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.type === 'VIDEO' && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold tracking-wider flex items-center gap-1 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      VIDEO
                    </div>
                  )}
                  {product.type === 'MULTIPLE' && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold tracking-wider shadow-sm">
                      GALLERY
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center gap-4">
                    <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full hover:scale-110 transition-transform">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="flex flex-col flex-1 p-5 text-center">
                  <div className="text-xs font-bold tracking-wider text-muted-foreground uppercase mb-2">
                    {product.category}
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-medium leading-tight flex-1">
                    {product.name}
                  </h3>
                  <div className="text-primary font-bold text-lg">
                    ₹{product.price}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
