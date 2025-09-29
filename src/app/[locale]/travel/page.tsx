import { BookingWidget } from '@/components/travel/BookingWidget';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bus, Car, LifeBuoy, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function TravelPage() {
  const t = useTranslations('TravelPage');

  return (
    <div className="bg-background">
      <section className="py-12 md:py-20 text-center bg-secondary">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">{t('title')}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20 -mt-16 md:-mt-24 relative z-10">
        <div className="container mx-auto px-4">
          <BookingWidget />
        </div>
      </section>

      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-10">{t('transport.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center gap-4">
                <Bus className="w-10 h-10 text-primary" />
                <CardTitle className="font-headline text-2xl">{t('transport.bus.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('transport.bus.description')}
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center gap-4">
                <Car className="w-10 h-10 text-primary" />
                <CardTitle className="font-headline text-2xl">{t('transport.rental.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                 {t('transport.rental.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
            <LifeBuoy className="w-16 h-16 text-accent mx-auto mb-4" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold">{t('helpline.title')}</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('helpline.description')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-10">
             <Card className="shadow-lg text-left">
              <CardHeader className="flex flex-row items-center gap-4">
                <Phone className="w-8 h-8 text-primary" />
                <CardTitle className="font-headline text-2xl">{t('helpline.offline.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('helpline.offline.description')}</p>
                <ul className="mt-2 space-y-1 font-mono text-lg">
                    <li>+91-123-456-7890 ({t('helpline.offline.main')})</li>
                    <li>+91-098-765-4321 ({t('helpline.offline.alternative')})</li>
                </ul>
              </CardContent>
            </Card>
             <Card className="shadow-lg text-left">
              <CardHeader className="flex flex-row items-center gap-4">
                <LifeBuoy className="w-8 h-8 text-primary" />
                <CardTitle className="font-headline text-2xl">{t('helpline.online.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('helpline.online.description')}
                </p>
                 <button className="text-primary font-bold mt-4">{t('helpline.online.cta')}</button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
