import { LucideIcon } from 'lucide-react';

export interface BrandMessage {
  heading: string;
  subHeading: string;
}

export interface BannerSlide {
  title: string;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  type: 'VIDEO' | 'GIF' | 'ECARD' | 'MULTIPLE';
  image: string;
  images?: string[];
  videoUrl?: string;
  description: string;
  isFeatured?: boolean;
}

export interface MenuItem {
  name: string;
  icon?: string; // Store icon name as string for serialization
  href?: string;
}

export interface MegaMenuCategory {
  [categoryName: string]: MenuItem[];
}

export interface NavItem {
  name: string;
  mega?: MegaMenuCategory;
  href?: string;
}
