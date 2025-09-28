import Link from 'next/link';
import { DharmaWheelIcon } from '@/components/icons';
import { Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <DharmaWheelIcon className="w-8 h-8 text-primary" />
              <span className="font-headline text-xl font-bold">Sikkim Serenity Gateway</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your official guide to the monastic heritage of Sikkim.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 gap-8">
            <div>
              <h3 className="font-bold mb-3">Explore</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/monasteries" className="hover:text-primary">Monasteries</Link></li>
                <li><Link href="/experiences" className="hover:text-primary">Experiences</Link></li>
                <li><Link href="/culture" className="hover:text-primary">Culture</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3">Plan</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/travel" className="hover:text-primary">Travel & Booking</Link></li>
                <li><Link href="/marketplace" className="hover:text-primary">Marketplace</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-primary">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary">Contact</Link></li>
                <li><Link href="#" className="hover:text-primary">Helpline</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-muted-foreground">&copy; {currentYear} Sikkim Serenity Gateway. All Rights Reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" aria-label="Twitter"><Twitter className="w-5 h-5 hover:text-primary" /></Link>
            <Link href="#" aria-label="Facebook"><Facebook className="w-5 h-5 hover:text-primary" /></Link>
            <Link href="#" aria-label="Instagram"><Instagram className="w-5 h-5 hover:text-primary" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
