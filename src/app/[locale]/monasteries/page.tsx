import { MonasteryMap } from "@/components/monasteries/MonasteryMap";
import { Landmark } from "lucide-react";
import { useTranslations } from "next-intl";

export default function MonasteriesPage() {
  const t = useTranslations('MonasteriesPage');

  return (
    <div>
      <section className="relative w-full h-[50vh] text-white overflow-hidden">
        <iframe
          src="https://player.vimeo.com/video/1122880500?background=1&autoplay=1&loop=1&byline=0&title=0"
          className="absolute top-1/2 left-1/2 w-full h-full min-w-[177.78vh] min-h-[56.25vw] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          frameBorder="0"
          allow="autoplay; fullscreen"
        ></iframe>
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold flex items-center justify-center gap-4 text-shadow-lg">
            <Landmark className="w-10 h-10 text-primary" />
            {t('title')}
          </h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-shadow">
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
