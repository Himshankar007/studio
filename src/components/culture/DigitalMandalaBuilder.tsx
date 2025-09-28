"use client";

import { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateMandala } from '@/ai/flows/digital-mandala-builder';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Image from 'next/image';

const mandalaSchema = z.object({
  theme: z.string().min(3, "Theme must be at least 3 characters."),
  symbols: z.string().min(3, "Please enter at least one symbol."),
  colors: z.string().min(3, "Please enter at least one color."),
  style: z.string().min(3, "Style must be at least 3 characters."),
});

type MandalaFormValues = z.infer<typeof mandalaSchema>;

export function DigitalMandalaBuilder() {
  const [isPending, startTransition] = useTransition();
  const [mandalaImage, setMandalaImage] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<MandalaFormValues>({
    resolver: zodResolver(mandalaSchema),
    defaultValues: {
      theme: "Peace and Compassion",
      symbols: "Lotus, Dharma Wheel, Endless Knot",
      colors: "Gold, Deep Blue, Saffron, White",
      style: "Geometric with intricate details",
    },
  });

  const onSubmit = (values: MandalaFormValues) => {
    setMandalaImage(null);
    startTransition(async () => {
      try {
        const result = await generateMandala(values);
        setMandalaImage(result.mandalaImage);
      } catch (e) {
        console.error(e);
        toast({
          variant: "destructive",
          title: "Mandala Generation Failed",
          description: "Could not create the mandala. Please try again.",
        });
      }
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2"><Wand2 className="text-primary"/> Digital Mandala Builder</CardTitle>
        <CardDescription>Create your own digital mandala. Enter your desired elements and let our AI artist bring your vision to life.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField control={form.control} name="theme" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Theme</FormLabel>
                            <FormControl><Input placeholder="e.g., Peace, love, gratitude" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="symbols" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Symbols (comma-separated)</FormLabel>
                            <FormControl><Input placeholder="e.g., lotus, vajra, dharma wheel" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                     <FormField control={form.control} name="colors" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Colors (comma-separated)</FormLabel>
                            <FormControl><Input placeholder="e.g., gold, red, blue" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                     <FormField control={form.control} name="style" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Art Style</FormLabel>
                            <FormControl><Input placeholder="e.g., geometric, abstract, realistic" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Button type="submit" disabled={isPending} className="w-full">
                        {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : 'Generate Mandala'}
                    </Button>
                </form>
            </Form>
            <div className="flex items-center justify-center h-full min-h-[300px] border-2 border-dashed rounded-lg p-4">
                {isPending && <Loader2 className="h-12 w-12 animate-spin text-primary" />}
                {!isPending && mandalaImage && (
                    <div className="w-full aspect-square relative">
                        <Image src={mandalaImage} alt="Generated Mandala" fill className="object-contain" />
                    </div>
                )}
                {!isPending && !mandalaImage && (
                    <div className="text-center text-muted-foreground">
                        <Wand2 className="mx-auto h-12 w-12" />
                        <p className="mt-2">Your generated mandala will appear here.</p>
                    </div>
                )}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
