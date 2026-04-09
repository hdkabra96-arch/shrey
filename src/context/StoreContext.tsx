import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, NavItem } from '../types';
import * as Icons from 'lucide-react';

interface StoreContextType {
  products: Product[];
  navItems: NavItem[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateNavItems: (items: NavItem[]) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Wedding Invitation',
    price: 2500,
    category: 'Wedding',
    type: 'VIDEO',
    image: 'https://picsum.photos/seed/wedding1/800/600',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'A grand royal wedding invitation with traditional motifs.',
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Floral Engagement Card',
    price: 1200,
    category: 'Wedding',
    type: 'ECARD',
    image: 'https://picsum.photos/seed/wedding2/800/600',
    description: 'Beautiful floral design for your engagement announcement.',
  },
  {
    id: '3',
    name: 'Jungle Safari Birthday',
    price: 1500,
    category: 'Baby & Kids',
    type: 'VIDEO',
    image: 'https://picsum.photos/seed/kids1/800/600',
    description: 'Fun jungle safari themed video for kids birthdays.',
    isFeatured: true,
  }
];

const INITIAL_NAV: NavItem[] = [
  { 
    name: 'WEDDING', 
    mega: {
      'STYLE': [
        { name: 'Engagement', icon: 'Heart' },
        { name: 'Traditional', icon: 'Sparkles' },
      ],
      'FORMAT': [
        { name: 'Video', icon: 'Video' },
        { name: 'PDF', icon: 'FileText' },
      ]
    }
  },
  { 
    name: 'BABY & KIDS', 
    mega: {
      'THEMES': [
        { name: 'Jungle', icon: 'MapPin' },
        { name: 'Space', icon: 'Sparkles' },
      ]
    }
  },
  { name: 'ECARD MAKER', href: '#' },
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [navItems, setNavItems] = useState<NavItem[]>(() => {
    const saved = localStorage.getItem('navItems');
    return saved ? JSON.parse(saved) : INITIAL_NAV;
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('navItems', JSON.stringify(navItems));
  }, [navItems]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Math.random().toString(36).substr(2, 9) };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateNavItems = (items: NavItem[]) => {
    setNavItems(items);
  };

  return (
    <StoreContext.Provider value={{ products, navItems, addProduct, updateProduct, deleteProduct, updateNavItems }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
