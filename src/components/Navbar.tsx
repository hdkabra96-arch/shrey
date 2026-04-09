import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import * as Icons from 'lucide-react';
import { Menu, Search, ShoppingCart, User, ChevronDown, LayoutDashboard, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '../context/StoreContext';

const IconRenderer = ({ iconName, className }: { iconName: string; className?: string }) => {
  const IconComponent = (Icons as any)[iconName];
  return IconComponent ? <IconComponent className={className} /> : null;
};

export const Navbar = () => {
  const { navItems } = useStore();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" />}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
              <div className="flex flex-col gap-4 py-8">
                <img 
                  src="https://storage.googleapis.com/static-content-ais-pre-2voxoeibh7ycpw75muw4sh-50491015021/48e4da35-f7cb-414d-b344-7dc8906876b4/logo_1744188593457.png" 
                  alt="Shreyas Magical Touch" 
                  className="h-16 w-auto object-contain mb-4"
                  referrerPolicy="no-referrer"
                />
                <a href="/shop" className="flex items-center gap-2 text-lg font-bold text-primary uppercase">
                  <ShoppingBag className="h-5 w-5" /> Shop All
                </a>
                <a href="/admin" className="flex items-center gap-2 text-lg font-bold text-muted-foreground uppercase">
                  <LayoutDashboard className="h-5 w-5" /> Admin
                </a>
                <div className="h-px bg-border my-2" />
                {navItems.map((item) => (
                  <div key={item.name} className="flex flex-col gap-2">
                    <a
                      href={item.href || '#'}
                      className="text-lg font-bold transition-colors hover:text-primary uppercase"
                    >
                      {item.name}
                    </a>
                    {item.mega && (
                      <div className="ml-4 flex flex-col gap-1 border-l pl-4">
                        {(Object.entries(item.mega) as any).map(([key, list]: [string, any[]]) => (
                          <div key={key} className="mb-2">
                            <p className="text-xs font-bold text-muted-foreground uppercase mb-1">{key}</p>
                            {list.map((sub) => (
                              <a key={sub.name} href="#" className="block py-1 text-sm hover:text-primary">
                                {sub.name}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          
          <a href="/" className="flex items-center space-x-2">
            <img 
              src="https://storage.googleapis.com/static-content-ais-pre-2voxoeibh7ycpw75muw4sh-50491015021/48e4da35-f7cb-414d-b344-7dc8906876b4/logo_1744188593457.png" 
              alt="Shreyas Magical Touch" 
              className="h-20 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </a>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/shop"
                  className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors text-primary hover:text-primary/80"
                  )}
                >
                  SHOP ALL
                </NavigationMenuLink>
              </NavigationMenuItem>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  {item.mega ? (
                    <>
                      <NavigationMenuTrigger className="bg-transparent font-bold text-xs tracking-wider uppercase hover:text-primary data-[state=open]:text-primary">
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[800px] grid-cols-4 gap-6 p-8">
                          {(Object.entries(item.mega) as any).map(([category, links]: [string, any[]]) => (
                            <div key={category} className="flex flex-col gap-4">
                              <h4 className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase border-b pb-2">
                                SEARCH BY {category}
                              </h4>
                              <ul className="flex flex-col gap-2">
                                {links.map((link) => (
                                  <li key={link.name}>
                                    <NavigationMenuLink
                                      render={
                                        <a
                                          href="#"
                                          className="group flex items-center gap-2 text-[13px] font-medium transition-colors hover:text-primary"
                                        />
                                      }
                                    >
                                      {link.icon && <IconRenderer iconName={link.icon} className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />}
                                      <span>{link.name}</span>
                                    </NavigationMenuLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      href={item.href}
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors hover:text-primary focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                      )}
                    >
                      {item.name}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/admin"
                  className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors text-muted-foreground hover:text-primary"
                  )}
                >
                  ADMIN
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:text-primary">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:text-primary relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              0
            </span>
          </Button>
        </div>
      </div>
    </nav>
  );
};
