import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, NavItem, BannerSlide, BrandMessage } from '../types';
import * as Icons from 'lucide-react';

interface StoreContextType {
  products: Product[];
  navItems: NavItem[];
  bannerSlides: BannerSlide[];
  brandMessage: BrandMessage;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateNavItems: (items: NavItem[]) => void;
  updateBannerSlides: (slides: BannerSlide[]) => void;
  updateBrandMessage: (msg: BrandMessage) => void;
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
        { name: 'Traditional Indian', icon: 'Sparkles' },
        { name: 'Floral', icon: 'Palette' },
        { name: 'Photo Based', icon: 'Camera' },
        { name: 'Modern', icon: 'Sparkles' },
        { name: 'Destination', icon: 'MapPin' },
        { name: 'Caricature', icon: 'User' },
      ],
      'FORMAT': [
        { name: 'Save The Date', icon: 'Calendar' },
        { name: 'PDF Invitation', icon: 'FileText' },
        { name: 'Video Invitation', icon: 'Video' },
        { name: 'GIF Invitation', icon: 'Sparkles' },
        { name: 'Ecard Invitation', icon: 'Layout' },
      ],
      'RELIGION': [
        { name: 'Hindu Wedding', icon: 'Sparkles' },
        { name: 'Christian Wedding', icon: 'Heart' },
        { name: 'Muslim Wedding', icon: 'Heart' },
        { name: 'Sikh Wedding', icon: 'Heart' },
      ]
    }
  },
  { 
    name: 'BABY & KIDS', 
    mega: {
      'OH BABY!': [
        { name: 'Annaprashan', icon: 'Sparkles' },
        { name: 'Baby Shower', icon: 'Heart' },
        { name: 'Birthday Party', icon: 'PartyPopper' },
        { name: 'Birth Announcement', icon: 'FileText' },
      ],
      'KIDS': [
        { name: 'Arangetram', icon: 'Music' },
        { name: 'Mundan Ceremony', icon: 'Sparkles' },
        { name: 'Thread Ceremony', icon: 'Sparkles' },
      ],
      'THEMES': [
        { name: 'Butterfly Theme', icon: 'Palette' },
        { name: 'Jungle Safari', icon: 'MapPin' },
        { name: 'Space Theme', icon: 'Sparkles' },
      ]
    }
  },
  {
    name: 'PUJA & FESTIVALS',
    mega: {
      'PUJA': [
        { name: 'Ganesha Puja', icon: 'Sparkles' },
        { name: 'Satyanarayan Puja', icon: 'Sparkles' },
        { name: 'Griha Pravesh', icon: 'MapPin' },
        { name: 'Laxmi Puja', icon: 'Sparkles' },
        { name: 'Saraswati Puja', icon: 'Sparkles' },
      ],
      'FESTIVALS': [
        { name: 'Diwali', icon: 'Sparkles' },
        { name: 'Holi', icon: 'Palette' },
        { name: 'Raksha Bandhan', icon: 'Heart' },
        { name: 'Navratri', icon: 'Music' },
        { name: 'Durga Puja', icon: 'Sparkles' },
        { name: 'Ganesh Chaturthi', icon: 'Sparkles' },
      ]
    }
  },
  {
    name: 'PARTIES',
    mega: {
      'CELEBRATIONS': [
        { name: 'Anniversary', icon: 'Heart' },
        { name: 'Housewarming', icon: 'MapPin' },
        { name: 'Retirement', icon: 'Clock' },
        { name: 'Graduation', icon: 'GraduationCap' },
      ],
      'SOCIAL': [
        { name: 'Cocktail Party', icon: 'Music' },
        { name: 'Dinner Party', icon: 'PartyPopper' },
        { name: 'Pool Party', icon: 'Sparkles' },
        { name: 'Kitty Party', icon: 'Users' },
      ],
      'CORPORATE': [
        { name: 'Office Party', icon: 'Briefcase' },
        { name: 'Product Launch', icon: 'Rocket' },
        { name: 'Conference', icon: 'Users' },
      ]
    }
  }
];

const INITIAL_BANNER_SLIDES: BannerSlide[] = [
  { url: 'https://picsum.photos/seed/invite1/450/800', title: 'Wedding Ecards' },
  { url: 'https://picsum.photos/seed/invite2/450/800', title: 'Birthday Ecards' },
  { url: 'https://picsum.photos/seed/invite3/450/800', title: 'Anniversary Ecards' },
  { url: 'https://picsum.photos/seed/invite4/450/800', title: 'Baby Shower Ecards' },
  { url: 'https://picsum.photos/seed/invite5/450/800', title: 'Housewarming Ecards' },
  { url: 'https://picsum.photos/seed/invite6/450/800', title: 'Festival Ecards' },
  { url: 'https://picsum.photos/seed/invite7/450/800', title: 'Corporate Ecards' },
  { url: 'https://picsum.photos/seed/invite8/450/800', title: 'Retirement Ecards' },
];

const INITIAL_BRAND_MESSAGE: BrandMessage = {
  heading: 'WE HELP YOU\nSPREAD JOY',
  subHeading: 'Get customized Video Invitation Maker | Digital Invitation Card for all occasions.\nSend it via WhatsApp. Choose from thousands of templates.'
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [navItems, setNavItems] = useState<NavItem[]>(() => {
    const saved = localStorage.getItem('navItems');
    if (saved) {
      const parsed = JSON.parse(saved);
      const filtered = parsed.filter((item: NavItem) => item.name !== 'ECARD MAKER');
      return filtered;
    }
    return INITIAL_NAV;
  });

  const [bannerSlides, setBannerSlides] = useState<BannerSlide[]>(() => {
    const saved = localStorage.getItem('bannerSlides');
    return saved ? JSON.parse(saved) : INITIAL_BANNER_SLIDES;
  });

  const [brandMessage, setBrandMessage] = useState<BrandMessage>(() => {
    const saved = localStorage.getItem('brandMessage');
    return saved ? JSON.parse(saved) : INITIAL_BRAND_MESSAGE;
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('navItems', JSON.stringify(navItems));
  }, [navItems]);

  useEffect(() => {
    localStorage.setItem('bannerSlides', JSON.stringify(bannerSlides));
  }, [bannerSlides]);

  useEffect(() => {
    localStorage.setItem('brandMessage', JSON.stringify(brandMessage));
  }, [brandMessage]);

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

  const updateBannerSlides = (slides: BannerSlide[]) => {
    setBannerSlides(slides);
  };

  const updateBrandMessage = (msg: BrandMessage) => {
    setBrandMessage(msg);
  };

  return (
    <StoreContext.Provider value={{ products, navItems, bannerSlides, brandMessage, addProduct, updateProduct, deleteProduct, updateNavItems, updateBannerSlides, updateBrandMessage }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
