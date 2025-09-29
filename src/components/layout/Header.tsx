
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from 'next-intl';
import { locales } from '@/../i18n';
import { useLocale } from 'next-intl';

const Header = () => {
  const t = useTranslations('Header');
  const pathname = usePathname();
  const locale = useLocale();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navLinks = [
    { href: '/monasteries', label: t('nav.monasteries') },
    { href: '/#video-section', label: t('nav.virtualTour') },
    { href: '/monasteries', label: t('nav.maps') },
    { href: '/culture', label: t('nav.archives') },
    { href: '/#calendar', label: t('nav.calendar') },
    { href: '/#audio-guide', label: t('nav.audioGuide') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // The hero section is the full viewport height. Navbar changes when scrolled past it.
      const isScrolled = window.scrollY > window.innerHeight - 70;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;
    
    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    } else {
      setScrolled(true);
    }
    
    return () => {
      if (isHomePage) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pathname, scrolled, locale]);


  return (
    <header className={cn(
      "fixed top-0 z-50 w-full h-[70px] transition-colors duration-300",
      scrolled ? 'bg-black/90' : 'bg-transparent'
    )}>
      <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-10">
        <Link href="/" className="flex items-center gap-2 text-white text-xl font-bold text-shadow">
          Sikkim Serenity Gateway
        </Link>

        <nav className="hidden md:flex gap-1">
          {navLinks.map((link) => (
            <Button asChild variant="ghost" key={`${link.href}-${link.label}`} className="text-white hover:text-yellow-400 text-shadow">
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
                <Input type="text" placeholder={t('searchPlaceholder')} className="bg-transparent text-white border-white placeholder:text-gray-300 h-8 text-shadow" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black h-8">🌐</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {locales.map((loc) => (
                       <DropdownMenuItem key={loc} asChild>
                         <Link href={pathname.startsWith(`/${locale}`) ? pathname.replace(`/${locale}`, `/${loc}`) : `/${loc}${pathname}`}>{t(`languages.${loc}`)}</Link>
                       </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black h-8">{t('exploreNow')}</Button>
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
                        Sikkim Serenity Gateway
                    </Link>
                  </SheetClose>
                  {navLinks.map((link) => (
                    <SheetClose asChild key={`${link.href}-${link.label}-mobile`}>
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
