import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { experiences } from '@/lib/data';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { TeamUpHub } from '@/components/experiences/TeamUpHub';
import { CheckCircle, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ExperiencesPage() {
  const t = useTranslations('ExperiencesPage');

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

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-10">{t('packages.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((exp) => {
              const image = placeholderImages.find((p) => p.id === exp.imageId);
              return (
                <Card key={exp.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="p-0">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={exp.title}
                        data-ai-hint={image.imageHint}
                        width={600}
                        height={400}
                        className="w-full h-56 object-cover"
                      />
                    )}
                  </CardHeader>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <CardTitle className="font-headline text-2xl">{t(`packages.items.${exp.id}.title`)}</CardTitle>
                    <CardDescription className="mt-2 flex-grow">{t(`packages.items.${exp.id}.description`)}</CardDescription>
                    <p className="text-xl font-bold mt-4 text-primary">{t(`packages.items.${exp.id}.price`)}</p>
                    <Button className="w-full mt-4 font-bold">{t('packages.cta')}</Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold">{t('peaceSeeker.title')}</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {t('peaceSeeker.description')}
              </p>
              <ul className="mt-6 space-y-3 text-lg">
                <li className="flex items-center"><CheckCircle className="w-6 h-6 mr-3 text-primary" /> {t('peaceSeeker.features.0')}</li>
                <li className="flex items-center"><CheckCircle className="w-6 h-6 mr-3 text-primary" /> {t('peaceSeeker.features.1')}</li>
                <li className="flex items-center"><CheckCircle className="w-6 h-6 mr-3 text-primary" /> {t('peaceSeeker.features.2')}</li>
              </ul>
              <Button size="lg" className="mt-8 font-bold text-lg">{t('peaceSeeker.cta')}</Button>
            </div>
            <div>
                <Card className="shadow-xl">
                    <CardContent className="p-0">
                    <Image
                        src="https://picsum.photos/seed/peace-seeker/600/450"
                        alt="Monk meditating"
                        data-ai-hint="monk meditating"
                        width={600}
                        height={450}
                        className="rounded-lg object-cover"
                    />
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
           <div className="text-center mb-10">
            <h2 className="font-headline text-3xl md:text-4xl font-bold flex items-center justify-center gap-3"><Users /> {t('teamUp.title')}</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('teamUp.description')}
            </p>
          </div>
          <TeamUpHub />
        </div>
      </section>
    </div>
  );
}
