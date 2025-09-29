"use client";

import { useState, useEffect, useTransition, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { monasteries } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';
import { cn } from '@/lib/utils';
import { Calendar, Clock, Utensils, Bed, Volume2, Loader2, Info } from 'lucide-react';
import { textToSpeech } from '@/ai/flows/smart-audio-guide';
import { useToast } from '@/hooks/use-toast';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

type Monastery = typeof monasteries[0];

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

// Center of Sikkim
const center = {
  lat: 27.5330,
  lng: 88.5122
};

const mapOptions = {
  styles: [
      { elementType: "geometry", stylers: [{ color: "#F2EBD3" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#F2EBD3" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#800000" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#800000" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#FF9933" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#E5E1C8" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#800000" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#D3C7A2" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#800000" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#FADFAA" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#FF9933" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#F2EBD3" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#A5C4D4" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6B8A99" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#F2EBD3" }],
      },
    ],
  disableDefaultUI: true,
  zoomControl: true,
};

export function MonasteryMap() {
  const [selectedMonastery, setSelectedMonastery] = useState<Monastery | null>(null);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [isAudioLoading, startAudioTransition] = useTransition();
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const { toast } = useToast();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ['places'],
  });

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const monastery = monasteries.find(m => m.id === hash);
      if (monastery) {
        setSelectedMonastery(monastery);
        setActiveMarker(monastery.id);
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    setAudioSrc(null); // Reset audio when monastery changes
  }, [selectedMonastery]);

  const handleSelect = (monastery: Monastery) => {
    setSelectedMonastery(monastery);
    setActiveMarker(monastery.id);
    window.history.pushState(null, '', `#${monastery.id}`);
  };
  
  const handleMarkerClick = (monastery: Monastery) => {
    handleSelect(monastery);
    const element = document.getElementById(monastery.id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

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
  
  const mapContent = useMemo(() => {
    if (loadError) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-destructive-foreground p-4">
            <h3 className="font-bold text-lg">Error loading map</h3>
            <p>Please check the API key and internet connection.</p>
        </div>
      );
    }
    if (!isLoaded) {
      return (
        <div className="flex items-center justify-center h-full">
            <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      );
    }
    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={9}
            options={mapOptions}
        >
            {monasteries.map(monastery => (
                <Marker
                    key={monastery.id}
                    position={monastery.coords}
                    onClick={() => handleMarkerClick(monastery)}
                    icon={{
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: activeMarker === monastery.id ? 10 : 7,
                        fillColor: '#800000',
                        fillOpacity: 1,
                        strokeWeight: 2,
                        strokeColor: '#FFFFFF'
                    }}
                />
            ))}
            {activeMarker && selectedMonastery && (
                <InfoWindow
                    position={selectedMonastery.coords}
                    onCloseClick={() => {
                        setActiveMarker(null);
                        setSelectedMonastery(null);
                    }}
                >
                    <div className="p-1 max-w-xs">
                        <h4 className="font-bold text-lg text-primary">{selectedMonastery.name}</h4>
                        <p className="text-sm text-foreground line-clamp-2">{selectedMonastery.description}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
  }, [isLoaded, loadError, activeMarker, selectedMonastery]);

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
            <div className="relative aspect-video lg:aspect-auto lg:h-[45vh] w-full bg-secondary rounded-lg overflow-hidden border">
              {mapContent}
            </div>

            {selectedMonastery ? (
              <div className="mt-4 p-4 md:p-6 animate-in fade-in duration-500">
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
                        <h2 className="font-headline text-3xl font-bold text-primary">{selectedMonastery.name}</h2>
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
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground h-[35vh]">
                <Info className="w-12 h-12 mb-4" />
                <h3 className="font-bold text-lg">Select a monastery</h3>
                <p>Click on a monastery from the list or on the map to see details.</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
