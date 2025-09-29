import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sikkim Serenity Gateway',
  description:
    'A Digital Heritage Platform for Sikkim’s Monasteries. Your gateway to exploring ancient wisdom through immersive technology.',
};

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();

  return (
    <html lang={locale} className="dark">
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`font-body antialiased ${inter.className}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
