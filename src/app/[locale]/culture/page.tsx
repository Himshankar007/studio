import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AiThangkaExplorer } from '@/components/culture/AiThangkaExplorer';
import { DigitalMandalaBuilder } from '@/components/culture/DigitalMandalaBuilder';
import { Paintbrush, BotMessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function CulturePage() {
  const t = useTranslations('CulturePage');

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
      </div>
      <Tabs defaultValue="thangka" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 h-auto">
          <TabsTrigger value="thangka" className="py-3 text-lg gap-2">
            <BotMessageSquare className="w-5 h-5" /> {t('tabs.thangkaExplorer')}
          </TabsTrigger>
          <TabsTrigger value="mandala" className="py-3 text-lg gap-2">
            <Paintbrush className="w-5 h-5" /> {t('tabs.mandalaBuilder')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="thangka" className="mt-8">
          <AiThangkaExplorer />
        </TabsContent>
        <TabsContent value="mandala" className="mt-8">
          <DigitalMandalaBuilder />
        </TabsContent>
      </Tabs>
    </div>
  );
}
