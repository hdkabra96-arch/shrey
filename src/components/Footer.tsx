import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <img 
              src="https://storage.googleapis.com/static-content-ais-pre-2voxoeibh7ycpw75muw4sh-50491015021/48e4da35-f7cb-414d-b344-7dc8906876b4/logo_1744188593457.png" 
              alt="Shreyas Magical Touch" 
              className="h-24 w-auto object-contain self-start"
              referrerPolicy="no-referrer"
            />
            <p className="text-muted-foreground">
              Your one-stop destination for premium digital and video invitations. 
              Spreading joy one invite at a time.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-muted-foreground">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">All Templates</a></li>
              <li><a href="#" className="hover:text-primary">How it Works</a></li>
              <li><a href="#" className="hover:text-primary">Pricing</a></li>
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">Contact Info</h3>
            <ul className="flex flex-col gap-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <span>123 Celebration Lane, Joy City, 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <span>hello@happyinvites.co</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">Newsletter</h3>
            <p className="mb-4 text-muted-foreground">
              Subscribe to get updates on new templates and special offers.
            </p>
            <div className="flex flex-col gap-2">
              <Input placeholder="Your Email" className="bg-muted" />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Shreyas Magical Touch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
