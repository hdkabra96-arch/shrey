import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { Share2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const FeaturedInvites = () => {
  const { products } = useStore();
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  const handleShare = async (product: Product) => {
    const shareData = {
      title: product.name,
      text: `Check out this beautiful invitation: ${product.name}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl uppercase">OUR MOST LOVED VIDEO INVITE</h2>
          <p className="mt-4 text-muted-foreground">Handpicked favorites from our extensive collection</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden border-none shadow-lg">
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="rounded bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">
                        {product.type}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start p-6">
                  <h3 className="font-serif text-xl font-bold">{product.name}</h3>
                  <div className="mt-4 flex w-full items-center justify-between">
                    <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleShare(product)}>
                        <Share2 className="h-4 w-4" />
                        <span className="sr-only">Share</span>
                      </Button>
                      <Button>Order Now</Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
