import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, ShoppingCart, Video, Image as ImageIcon, Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Shop() {
  const { products } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(5000);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesPrice = p.price <= priceRange;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 space-y-8">
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold border-b pb-2">Filters</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search invites..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <Button 
                      key={cat}
                      variant={selectedCategory === cat ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(cat)}
                      className="rounded-full text-xs"
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Price Range</label>
                  <span className="text-xs font-bold">Up to ₹{priceRange}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="10000" 
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-3xl font-bold">Our Collection</h2>
              <p className="text-sm text-muted-foreground">{filteredProducts.length} products found</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <Badge className="bg-white/90 text-black border-none backdrop-blur-sm">
                            {product.type === 'VIDEO' ? <Video className="h-3 w-3 mr-1" /> : <ImageIcon className="h-3 w-3 mr-1" />}
                            {product.type}
                          </Badge>
                          {product.isFeatured && (
                            <Badge className="bg-primary text-primary-foreground border-none">
                              <Sparkles className="h-3 w-3 mr-1" /> Featured
                            </Badge>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button variant="secondary" className="rounded-full">Quick View</Button>
                        </div>
                      </div>
                      <CardHeader className="p-4 pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">{product.category}</p>
                            <CardTitle className="text-lg font-serif">{product.name}</CardTitle>
                          </div>
                          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                            <Heart className="h-5 w-5" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">₹{product.price}</span>
                        <Button size="sm" className="rounded-full gap-2">
                          <ShoppingCart className="h-4 w-4" /> Add to Cart
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
                <Button variant="link" onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setPriceRange(10000);
                }}>Clear all filters</Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
