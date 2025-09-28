"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users, Plane, Train, Bus, ArrowRightLeft } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function BookingWidget() {
    const [date, setDate] = useState<Date>();

    const renderForm = (type: string) => (
        <div className="space-y-6 p-2">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div className="md:col-span-2 space-y-2">
                    <Label htmlFor={`${type}-from`}>From</Label>
                    <Input id={`${type}-from`} placeholder="e.g., New Delhi" />
                </div>
                <div className="hidden md:flex justify-center items-center">
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <ArrowRightLeft className="w-5 h-5" />
                    </Button>
                </div>
                 <div className="md:col-span-2 space-y-2">
                    <Label htmlFor={`${type}-to`}>To</Label>
                    <Input id={`${type}-to`} placeholder="e.g., Gangtok" />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label>Departure Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor={`${type}-passengers`}>Passengers</Label>
                    <div className="flex items-center">
                        <Users className="h-5 w-5 absolute ml-3 text-muted-foreground" />
                        <Input id={`${type}-passengers`} type="number" placeholder="1" className="pl-10" defaultValue={1} />
                    </div>
                </div>
            </div>
            <Button className="w-full font-bold text-lg" size="lg">Search</Button>
        </div>
    );

    return (
        <Card className="shadow-2xl border-2 border-primary/20">
            <CardContent className="p-4 md:p-6">
                 <Tabs defaultValue="flights" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-secondary/50 h-auto">
                        <TabsTrigger value="flights" className="py-3 text-base gap-2"><Plane className="w-5 h-5"/> Flights</TabsTrigger>
                        <TabsTrigger value="trains" className="py-3 text-base gap-2"><Train className="w-5 h-5"/> Trains</TabsTrigger>
                        <TabsTrigger value="buses" className="py-3 text-base gap-2"><Bus className="w-5 h-5"/> Buses</TabsTrigger>
                    </TabsList>
                    <TabsContent value="flights" className="pt-6">
                        {renderForm('flight')}
                    </TabsContent>
                    <TabsContent value="trains" className="pt-6">
                        {renderForm('train')}
                    </TabsContent>
                    <TabsContent value="buses" className="pt-6">
                        {renderForm('bus')}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
