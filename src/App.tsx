/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Trending } from './components/Trending';
import { HowItWorks } from './components/HowItWorks';
import { FeaturedInvites } from './components/FeaturedInvites';
import { FAQ } from './components/FAQ';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { StoreProvider } from './context/StoreContext';
import { Toaster } from '@/components/ui/sonner';
import Shop from './pages/Shop';
import AdminDashboard from './pages/Admin';

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    
    // Intercept clicks on internal links
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.href.startsWith(window.location.origin)) {
        const url = new URL(anchor.href);
        if (url.pathname !== window.location.pathname) {
          e.preventDefault();
          window.history.pushState({}, '', url.pathname);
          setPath(url.pathname);
        }
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  const renderContent = () => {
    switch (path) {
      case '/shop':
        return <Shop />;
      case '/admin':
        return <AdminDashboard />;
      default:
        return (
          <>
            <Hero />
            <Trending />
            <HowItWorks />
            <FeaturedInvites />
            <FAQ />
            <Testimonials />
          </>
        );
    }
  };

  return (
    <StoreProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          {renderContent()}
        </main>
        <Footer />
        <Toaster position="top-center" />
      </div>
    </StoreProvider>
  );
}
