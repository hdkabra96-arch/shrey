import React, { useMemo, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Eye, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '../types';

export default function CategoryGallery({ categoryName }: { categoryName: string }) {
  const { products } = useStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categoryProducts = useMemo(() => {
    const decodedCategory = decodeURIComponent(categoryName).replace(/-/g, ' ');
    return products.filter(p => p.category.toLowerCase() === decodedCategory.toLowerCase());
  }, [products, categoryName]);

  const displayCategory = decodeURIComponent(categoryName).replace(/-/g, ' ').toUpperCase();

  const handleOpenGallery = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const allImages = selectedProduct 
    ? [selectedProduct.image, ...(selectedProduct.images || [])].filter(Boolean)
    : [];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

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
              <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col cursor-pointer" onClick={() => handleOpenGallery(product)}>
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
                    <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full hover:scale-110 transition-transform cursor-pointer">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="default" size="icon" className="h-10 w-10 rounded-full hover:scale-110 transition-transform cursor-pointer" onClick={(e) => { e.stopPropagation(); /* Add to cart logic */ }}>
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="flex flex-col flex-1 p-5 text-center bg-white relative z-10">
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

      {/* Fullscreen Gallery Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <Button 
              variant="default" 
              size="icon" 
              className="absolute top-4 right-4 rounded-full bg-white/10 hover:bg-white/20 text-white border-0 z-50"
              onClick={() => setSelectedProduct(null)}
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="relative w-full max-w-5xl h-full max-h-[85vh] flex flex-col md:flex-row items-center justify-center gap-8" onClick={e => e.stopPropagation()}>
              <div className="relative w-full md:w-2/3 h-[50vh] md:h-full flex items-center justify-center">
                {allImages.length > 1 && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70 z-10 h-12 w-12"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                )}
                
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    src={allImages[currentImageIndex]}
                    alt={`Preview ${currentImageIndex}`}
                    className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-sm"
                  />
                </AnimatePresence>

                {allImages.length > 1 && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70 z-10 h-12 w-12"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                )}
              </div>

              <div className="w-full md:w-1/3 bg-white/10 backdrop-blur-md p-6 rounded-2xl text-white">
                <div className="text-sm font-bold tracking-wider text-white/60 uppercase mb-2">
                  {selectedProduct.category}
                </div>
                <h2 className="text-3xl font-serif font-medium mb-4 leading-tight">{selectedProduct.name}</h2>
                <div className="text-2xl font-bold mb-6 text-primary-foreground">₹{selectedProduct.price}</div>
                <p className="text-white/80 mb-8 whitespace-pre-line leading-relaxed">
                  {selectedProduct.description}
                </p>
                <div className="flex gap-4">
                  <Button className="flex-1 rounded-full text-lg h-12" variant="default">
                    <ShoppingCart className="h-5 w-5 mr-2" /> Buy Now
                  </Button>
                </div>
                
                {allImages.length > 1 && (
                  <div className="mt-8">
                    <p className="text-sm text-white/60 mb-3">Gallery ({allImages.length} images)</p>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {allImages.map((img, idx) => (
                        <button
                          key={idx}
                          className={`relative h-20 w-16 flex-shrink-0 rounded-md overflow-hidden transition-all ${currentImageIndex === idx ? 'ring-2 ring-primary ring-offset-2 ring-offset-black scale-105' : 'opacity-50 hover:opacity-100'}`}
                          onClick={() => setCurrentImageIndex(idx)}
                        >
                          <img src={img} className="h-full w-full object-cover" alt="" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
