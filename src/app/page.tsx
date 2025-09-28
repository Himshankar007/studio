import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { monasteries, experiences } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';

export default function Home() {
  const featuredMonasteries = monasteries.slice(0, 3);
  const popularExperiences = experiences.slice(0, 3);

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[80vh] text-white overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          poster="https://picsum.photos/seed/hero/1920/1080"
        >
          <source src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold !leading-tight tracking-tight">
            Connecting the Modern Pilgrim
            <br />
            to Ancient Wisdom
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground">
            The official, global gateway to Sikkim's monastic world. Discover sacred sites, plan your journey, and immerse yourself in timeless culture.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="font-bold text-lg">
              <Link href="/travel">
                Plan Your Visit <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-bold text-lg">
              <Link href="/monasteries">Explore Monasteries</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Explore Sacred Monasteries</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
              Journey through Sikkim's most revered spiritual centers, each with its unique history and serene atmosphere.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMonasteries.map(monastery => {
              const image = placeholderImages.find(p => p.id === monastery.imageId);
              return (
                <Card key={monastery.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <CardHeader className="p-0">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={monastery.name}
                        data-ai-hint={image.imageHint}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover"
                      />
                    )}
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="font-headline text-2xl">{monastery.name}</CardTitle>
                    <CardDescription className="mt-2 line-clamp-3">{monastery.description}</CardDescription>
                    <Button asChild variant="link" className="p-0 mt-4 font-bold text-primary">
                      <Link href={`/monasteries#${monastery.id}`}>
                        Learn More <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/monasteries">View All Monasteries</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Discover Unique Experiences</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
              From spiritual retreats to cultural immersion, find an experience that resonates with your soul.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularExperiences.map(exp => {
               const image = placeholderImages.find(p => p.id === exp.imageId);
              return (
                <Card key={exp.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                   {image && (
                      <Image
                        src={image.imageUrl}
                        alt={exp.title}
                        data-ai-hint={image.imageHint}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover"
                      />
                    )}
                  <CardContent className="p-6 flex flex-col flex-grow">
                     <CardTitle className="font-headline text-2xl flex-grow">{exp.title}</CardTitle>
                    <CardDescription className="mt-2 line-clamp-2">{exp.description}</CardDescription>
                     <Button asChild className="mt-4 w-full">
                       <Link href="/experiences">
                         Book Now
                       </Link>
                     </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
