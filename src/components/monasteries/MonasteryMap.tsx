"use client";

import { useState, useEffect, useTransition } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { monasteries } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';
import { cn } from '@/lib/utils';
import { MapPin, Calendar, Clock, Utensils, Bed, Volume2, Loader2 } from 'lucide-react';
import { textToSpeech } from '@/ai/flows/smart-audio-guide';
import { useToast } from '@/hooks/use-toast';

type Monastery = typeof monasteries[0];

export function MonasteryMap() {
  const [selectedMonastery, setSelectedMonastery] = useState<Monastery | null>(monasteries[0] || null);
  const [isAudioLoading, startAudioTransition] = useTransition();
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const monastery = monasteries.find(m => m.id === hash);
      if (monastery) {
        setSelectedMonastery(monastery);
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    setAudioSrc(null); // Reset audio when monastery changes
  }, [selectedMonastery]);

  const handleSelect = (monastery: Monastery) => {
    setSelectedMonastery(monastery);
    window.history.pushState(null, '', `#${monastery.id}`);
  };
  
  const handlePlayAudio = () => {
    if (!selectedMonastery) return;

    if (audioSrc) {
        const audio = new Audio(audioSrc);
        audio.play();
        return;
    }

    startAudioTransition(async () => {
      try {
        const result = await textToSpeech(`Here is some information about ${selectedMonastery.name}. ${selectedMonastery.description}`);
        setAudioSrc(result.audio);
        const audio = new Audio(result.audio);
        audio.play();
      } catch (e) {
        console.error(e);
        toast({
          variant: "destructive",
          title: "Audio Generation Failed",
          description: "Could not generate audio guide. Please try again.",
        });
      }
    });
  };


  const mapImage = placeholderImages.find(p => p.id === "sikkim-map");
  
  return (
    <Card className="shadow-2xl">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <ScrollArea className="h-[70vh] lg:h-auto lg:max-h-[80vh] border-r">
            <div className="p-4 space-y-2">
              {monasteries.map((monastery) => (
                <div
                  key={monastery.id}
                  id={monastery.id}
                  onClick={() => handleSelect(monastery)}
                  className={cn(
                    "p-3 rounded-lg cursor-pointer transition-colors",
                    selectedMonastery?.id === monastery.id
                      ? "bg-primary/20"
                      : "hover:bg-secondary"
                  )}
                >
                  <h3 className="font-bold">{monastery.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{monastery.description}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="lg:col-span-2 p-4 md:p-6">
            <div className="relative aspect-[4/3] w-full bg-secondary rounded-lg overflow-hidden border">
              {mapImage && <Image src={mapImage.imageUrl} alt="Map of Sikkim" fill className="object-cover" data-ai-hint={mapImage.imageHint} />}
              {monasteries.map(monastery => (
                <div
                  key={`dot-${monastery.id}`}
                  onClick={() => handleSelect(monastery)}
                  style={{ top: monastery.mapPosition.top, left: monastery.mapPosition.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer"
                >
                  <div className={cn(
                    "w-full h-full rounded-full bg-accent border-2 border-accent-foreground transition-all duration-300",
                    selectedMonastery?.id === monastery.id ? 'scale-150' : 'hover:scale-125'
                  )}></div>
                  <span className={cn(
                    "absolute top-full left-1/2 -translate-x-1/2 mt-1 text-xs font-bold text-background bg-foreground/80 px-2 py-0.5 rounded-md transition-opacity duration-300 whitespace-nowrap",
                     selectedMonastery?.id === monastery.id ? 'opacity-100' : 'opacity-0'
                  )}>{monastery.name}</span>
                </div>
              ))}
            </div>

            {selectedMonastery && (
              <div className="mt-6 animate-in fade-in duration-500">
                <Card className="bg-secondary">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1">
                        {(() => {
                          const image = placeholderImages.find(p => p.id === selectedMonastery.imageId);
                          return image && <Image src={image.imageUrl} alt={selectedMonastery.name} data-ai-hint={image.imageHint} width={400} height={300} className="rounded-lg object-cover w-full aspect-square" />;
                        })()}
                      </div>
                      <div className="md:col-span-2">
                        <h2 className="font-headline text-3xl font-bold">{selectedMonastery.name}</h2>
                        <p className="mt-2 text-muted-foreground">{selectedMonastery.description}</p>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary"/> <strong>Founded:</strong> {selectedMonastery.founded}</div>
                           <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary"/> <strong>Visiting Hours:</strong> {selectedMonastery.hours}</div>
                           <div className="flex items-center gap-2"><Bed className="w-4 h-4 text-primary"/> <strong>Lodging:</strong> {selectedMonastery.lodging}</div>
                           <div className="flex items-center gap-2"><Utensils className="w-4 h-4 text-primary"/> <strong>Meals:</strong> {selectedMonastery.meals}</div>
                        </div>
                         <div className="flex gap-2 mt-6">
                            <Button>Plan a Visit</Button>
                            <Button variant="outline" onClick={handlePlayAudio} disabled={isAudioLoading}>
                                {isAudioLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Volume2 className="w-5 h-5" />
                                )}
                                <span className="ml-2">Audio Guide</span>
                            </Button>
                         </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
