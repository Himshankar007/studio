"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { monasteries } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Calendar, Clock, Utensils, Bed, Volume2, Loader2, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Monastery = typeof monasteries[0];

export function MonasteryMap() {
  const [selectedMonastery, setSelectedMonastery] = useState<Monastery | null>(null);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const monastery = monasteries.find(m => m.id === hash);
      if (monastery) {
        setSelectedMonastery(monastery);
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setSelectedMonastery(monasteries[0]);
    }
  }, []);

  const handleSelect = (monastery: Monastery) => {
    setSelectedMonastery(monastery);
    window.history.pushState(null, '', `#${monastery.id}`);
    const element = document.getElementById(monastery.id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
  
  return (
    <Card className="shadow-2xl">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <ScrollArea className="h-[40vh] lg:h-auto lg:max-h-[80vh] border-r">
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
          
          <div className="lg:col-span-2">
            {selectedMonastery ? (
              <div className="animate-in fade-in duration-500">
                <div className="relative aspect-video lg:aspect-auto lg:h-[60vh] w-full bg-secondary rounded-lg overflow-hidden border">
                    <iframe
                        src={selectedMonastery.panoramaUrl}
                        width="100%"
                        height="100%"
                        style={{ border:0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <div className="p-4 md:p-6">
                    <h2 className="font-headline text-3xl font-bold text-primary">{selectedMonastery.name}</h2>
                    <p className="mt-2 text-muted-foreground">{selectedMonastery.description}</p>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary"/> <strong>Founded:</strong> {selectedMonastery.founded}</div>
                        <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary"/> <strong>Visiting Hours:</strong> {selectedMonastery.hours}</div>
                        <div className="flex items-center gap-2"><Bed className="w-4 h-4 text-primary"/> <strong>Lodging:</strong> {selectedMonastery.lodging}</div>
                        <div className="flex items-center gap-2"><Utensils className="w-4 h-4 text-primary"/> <strong>Meals:</strong> {selectedMonastery.meals}</div>
                    </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground h-[80vh]">
                <Info className="w-12 h-12 mb-4" />
                <h3 className="font-bold text-lg">Select a Monastery to Explore</h3>
                <p>Click on a monastery from the list to see a 360° view and details.</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
