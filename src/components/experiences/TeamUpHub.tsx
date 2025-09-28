"use client";

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Check, MessageSquare, Plus } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const travelers = [
  {
    id: 1,
    name: "Alex S.",
    avatar: "https://picsum.photos/seed/alex-s/150/150",
    currentLocation: "Rumtek Monastery",
    interests: ["Photography", "Meditation"],
    connected: false,
  },
  {
    id: 2,
    name: "Maria G.",
    avatar: "https://picsum.photos/seed/maria-g/150/150",
    currentLocation: "Pemayangtse Monastery",
    interests: ["History", "Trekking"],
    connected: true,
  },
  {
    id: 3,
    name: "Kenji T.",
    avatar: "https://picsum.photos/seed/kenji-t/150/150",
    currentLocation: "Enchey Monastery",
    interests: ["Art", "Local Food"],
    connected: false,
  },
];

export function TeamUpHub() {
  const [team, setTeam] = useState(travelers);

  const handleConnect = (id: number) => {
    setTeam(prev => prev.map(t => t.id === id ? { ...t, connected: !t.connected } : t));
  };
  
  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((traveler) => (
            <Card key={traveler.id} className="text-center transition-all duration-300 hover:bg-secondary">
              <CardHeader className="items-center">
                <Avatar className="w-20 h-20 border-4 border-primary/50">
                  <AvatarImage src={traveler.avatar} alt={traveler.name} />
                  <AvatarFallback>{traveler.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </CardHeader>
              <CardContent className="space-y-2">
                <CardTitle className="font-headline text-xl">{traveler.name}</CardTitle>
                <p className="text-sm text-muted-foreground">@ {traveler.currentLocation}</p>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  {traveler.interests.map(interest => (
                    <span key={interest} className="text-xs bg-primary/10 text-primary-foreground font-semibold px-2 py-1 rounded-full">{interest}</span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Send Message</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        onClick={() => handleConnect(traveler.id)} 
                        variant={traveler.connected ? 'default' : 'secondary'}
                        className="w-28"
                      >
                        {traveler.connected ? <Check /> : <Plus />}
                        {traveler.connected ? 'Added' : 'Add'}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{traveler.connected ? 'Remove from team' : 'Add to your team'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
