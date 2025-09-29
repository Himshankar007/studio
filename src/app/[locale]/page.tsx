'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Map } from 'lucide-react';
import { monasteries } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > window.innerHeight - 70;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);


  return (
    <div className="flex flex-col">
      <section className="relative w-full h-screen text-white overflow-hidden" id="video-section">
        <iframe
          src="https://player.vimeo.com/video/1121483340?background=1&autoplay=1&loop=1&byline=0&title=0"
          className="absolute top-1/2 left-1/2 w-full h-full min-w-[177.78vh] min-h-[56.25vw] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          frameBorder="0"
          allow="autoplay; fullscreen"
        ></iframe>
        <div id="mist"></div>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold font-headline">{t('hero.title')}</h1>
          <h2 className="text-4xl md:text-5xl mt-2 mb-4 font-headline">{t('hero.subtitle')}</h2>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
             {t('hero.description')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white hover:bg-white hover:text-black">
              <Link href="/monasteries">
                {t('hero.cta.virtualTour')}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white hover:bg-white hover:text-black">
              <Link href="/monasteries">{t('hero.cta.exploreMap')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="sanctuaries" className="py-12 md:py-24 bg-secondary text-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent font-headline">{t('sanctuaries.title')}</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('sanctuaries.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {monasteries.slice(0, 3).map(monastery => {
              const image = placeholderImages.find(p => p.id === monastery.imageId);
              return (
                <Card key={monastery.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white rounded-xl">
                   {image && (
                      <div className="relative h-48 w-full">
                        <Image
                            src={image.imageUrl}
                            alt={monastery.name}
                            fill
                            className="object-cover"
                        />
                      </div>
                    )}
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl font-headline">{monastery.name}</h3>
                        <div className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-semibold">{monastery.founded}</div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{monastery.description.split('.')[0]}.</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="highlight bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">{t('sanctuaries.tags.architecture')}</span>
                        <span className="highlight bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">{t('sanctuaries.tags.meditation')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <Button variant="link" className="p-0 text-primary">
                            <Link href={`/monasteries#${monastery.id}`}>{t('sanctuaries.links.virtualTour')}</Link>
                        </Button>
                        <Button variant="link" className="p-0 text-primary">
                            <Link href="/travel">{t('sanctuaries.links.visit')}</Link>
                        </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

        <section className="bg-background py-12 text-foreground">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary font-headline">
                {t('geography.title')}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('geography.description')}
            </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-b from-card to-background rounded-2xl shadow p-10 flex flex-col items-center justify-center">
                <Map className="text-primary text-5xl mb-6 h-16 w-16"/>
                <h3 className="text-2xl font-bold mb-2 font-headline">{t('geography.map.title')}</h3>
                <p className="text-muted-foreground mb-6 text-center">
                    {t('geography.map.description')}
                </p>
                <Button asChild className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90">
                    <Link href="/monasteries">{t('geography.map.cta')}</Link>
                </Button>
            </div>
            <div className="flex flex-col gap-6">
                <div className="bg-card rounded-2xl shadow p-6 flex items-start space-x-4">
                    <div className="text-primary text-2xl">📍</div>
                    <div>
                        <h4 className="font-bold text-lg">{t('geography.features.locations.title')}</h4>
                        <p className="text-muted-foreground text-sm">
                            {t('geography.features.locations.description')}
                        </p>
                    </div>
                </div>
                <div className="bg-card rounded-2xl shadow p-6 flex items-start space-x-4">
                    <div className="text-accent text-2xl">🧭</div>
                    <div>
                        <h4 className="font-bold text-lg">{t('geography.features.routes.title')}</h4>
                        <p className="text-muted-foreground text-sm">
                            {t('geography.features.routes.description')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="py-16 px-6 bg-secondary text-foreground">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary font-headline">{t('preservation.title')}</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                {t('preservation.description')}
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Link href="/culture" className="block transform hover:scale-105 transition-transform duration-300">
              <Card className="bg-card rounded-2xl shadow p-6 text-center text-card-foreground cursor-pointer h-full">
                  <div className="text-4xl">📖</div>
                  <h3 className="text-lg font-semibold mt-4">{t('preservation.cards.manuscripts.title')}</h3>
                  <p className="text-accent text-sm font-medium mt-1">{t('preservation.cards.manuscripts.count')}</p>
                  <p className="text-muted-foreground text-sm mt-3">{t('preservation.cards.manuscripts.description')}</p>
              </Card>
            </Link>
             <Link href="/culture" className="block transform hover:scale-105 transition-transform duration-300">
              <Card className="bg-card rounded-2xl shadow p-6 text-center text-card-foreground cursor-pointer h-full">
                  <div className="text-4xl">🖼️</div>
                  <h3 className="text-lg font-semibold mt-4">{t('preservation.cards.murals.title')}</h3>
                  <p className="text-accent text-sm font-medium mt-1">{t('preservation.cards.murals.count')}</p>
                  <p className="text-muted-foreground text-sm mt-3">{t('preservation.cards.murals.description')}</p>
              </Card>
            </Link>
             <Link href="/culture" className="block transform hover:scale-105 transition-transform duration-300">
              <Card className="bg-card rounded-2xl shadow p-6 text-center text-card-foreground cursor-pointer h-full">
                  <div className="text-4xl">📜</div>
                  <h3 className="text-lg font-semibold mt-4">{t('preservation.cards.records.title')}</h3>
                  <p className="text-accent text-sm font-medium mt-1">{t('preservation.cards.records.count')}</p>
                  <p className="text-muted-foreground text-sm mt-3">{t('preservation.cards.records.description')}</p>
              </Card>
            </Link>
        </div>
    </section>

    <section id="audio-guide" className="py-16 px-6 bg-background text-foreground">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary font-headline">{t('audioGuide.title')}</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                {t('audioGuide.description')}
            </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-card rounded-2xl shadow-xl p-6">
                <h3 className="text-card-foreground font-semibold">{t('audioGuide.player.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('audioGuide.player.subtitle')}</p>
                <div className="mt-6 bg-primary/10 rounded-lg p-4">
                    <p className="text-primary font-medium flex items-center gap-2">
                        🎙️ {t('audioGuide.player.nowPlaying')}
                    </p>
                    <p className="mt-2 text-sm text-card-foreground">
                        {t('audioGuide.player.trackTitle')}
                    </p>
                    <div className="mt-4">
                        <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full w-3/4"></div>
                        </div>
                        <p className="text-right text-xs text-muted-foreground mt-1">2:45</p>
                    </div>
                </div>
                <div className="flex justify-between mt-6 gap-4">
                    <Button className="flex-1 bg-accent/20 text-accent font-medium rounded-md py-2">
                        📍 {t('audioGuide.player.locationActive')}
                    </Button>
                    <Button className="flex-1 bg-primary/20 text-primary font-medium rounded-md py-2">
                        ⬇️ {t('audioGuide.player.offlineReady')}
                    </Button>
                </div>
            </div>
            <div className="space-y-6">
                <div>
                    <h4 className="flex items-center gap-2 font-semibold text-foreground">
                        📍 {t('audioGuide.features.location.title')}
                    </h4>
                    <p className="text-muted-foreground text-sm mt-1">
                        {t('audioGuide.features.location.description')}
                    </p>
                </div>
                <div>
                    <h4 className="flex items-center gap-2 font-semibold text-foreground">
                        🎧 {t('audioGuide.features.narration.title')}
                    </h4>
                    <p className="text-muted-foreground text-sm mt-1">
                        {t('audioGuide.features.narration.description')}
                    </p>
                </div>
                <div>
                    <h4 className="flex items-center gap-2 font-semibold text-foreground">
                        🔊 {t('audioGuide.features.soundscapes.title')}
                    </h4>
                    <p className="text-muted-foreground text-sm mt-1">
                        {t('audioGuide.features.soundscapes.description')}
                    </p>
                </div>
                <div className="flex gap-4 mt-8">
                    <Button className="flex-1 bg-gradient-to-r from-primary to-accent text-primary-foreground py-3 rounded-md font-medium hover:opacity-90">
                        ⬇️ {t('audioGuide.cta.download')}
                    </Button>
                     <Button variant="outline" className="flex-1 border py-3 rounded-md font-medium hover:bg-secondary">
                        🎧 {t('audioGuide.cta.preview')}
                    </Button>
                </div>
            </div>
        </div>
    </section>

    </div>
  );
}
