import { MonasteryMap } from "@/components/monasteries/MonasteryMap";
import { Landmark } from "lucide-react";
import { useTranslations } from "next-intl";

export default function MonasteriesPage() {
  const t = useTranslations('MonasteriesPage');

  return (
    <div>
      <section className="relative w-full py-12 md:py-20 text-white bg-secondary">
        <div className="container mx-auto px-4 z-10 flex flex-col items-center justify-center h-full text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold flex items-center justify-center gap-4 text-primary">
            <Landmark className="w-10 h-10 text-primary" />
            {t('title')}
          </h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-16">
        <MonasteryMap />
      </div>
    </div>
  );
}
