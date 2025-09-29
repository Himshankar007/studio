import { MonasteryMap } from "@/components/monasteries/MonasteryMap";
import { Landmark } from "lucide-react";
import { useTranslations } from "next-intl";

export default function MonasteriesPage() {
  const t = useTranslations('MonasteriesPage');

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold flex items-center justify-center gap-4"><Landmark className="w-10 h-10 text-primary" />{t('title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <MonasteryMap />
    </div>
  );
}
