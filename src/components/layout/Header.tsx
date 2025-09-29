"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Search } from 'lucide-react';
import { DharmaWheelIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Input } from '../ui/input';

const navLinks = [
  { href: '/monasteries', label: 'Monasteries' },
  { href: '#video-section', label: 'Virtual Tour' },
  { href: '/monasteries', label: 'Maps' },
  { href: '/culture', label: 'Archives' },
  { href: '#calendar', label: 'Calendar' },
  { href: '#audio-guide', label: 'Audio Guide' },
];

const Header = () => {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // The hero section is the full viewport height. Navbar changes when scrolled past it.
      const isScrolled = window.scrollY > window.innerHeight - 70;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    // Only add scroll listener on the homepage
    if (pathname === '/') {
      window.addEventListener('scroll', handleScroll);
      // initial check
      handleScroll();
    } else {
      setScrolled(true);
    }
    
    return () => {
      if (pathname === '/') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pathname, scrolled]);


  return (
    <header className={cn(
      "fixed top-0 z-50 w-full h-[70px] transition-colors duration-300",
      scrolled || pathname !== '/' ? 'bg-black/90' : 'bg-transparent'
    )}>
      <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-10">
        <Link href="/" className="flex items-center gap-2 text-white text-xl font-bold text-shadow">
          Monastery360
        </Link>

        <nav className="hidden md:flex gap-1">
          {navLinks.map((link) => (
            <Button asChild variant="ghost" key={link.href} className="text-white hover:text-yellow-400 text-shadow">
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
                <Input type="text" placeholder="Search" className="bg-transparent text-white border-white placeholder:text-gray-300 h-8 text-shadow" />
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black h-8">🌐</Button>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black h-8">Explore Now</Button>
            </div>

          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-black/95 text-white">
                <nav className="flex flex-col gap-4 mt-8">
                   <SheetClose asChild>
                     <Link href="/" className="flex items-center gap-2 mb-4 text-xl font-bold">
                        Monastery360
                    </Link>
                  </SheetClose>
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className='text-lg font-medium transition-colors hover:text-yellow-400'
                        onClick={() => setIsSheetOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
