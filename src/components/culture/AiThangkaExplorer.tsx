"use client";

import { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Upload, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { aiThangkaExplorer, AIThangkaExplorerOutput } from '@/ai/flows/ai-thangka-explorer';
import Image from 'next/image';
import {DharmaWheelIcon} from '@/components/icons';

export function AiThangkaExplorer() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<AIThangkaExplorerOutput | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload an image smaller than 4MB.",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setPreview(dataUri);
        
        startTransition(async () => {
          try {
            const res = await aiThangkaExplorer({ photoDataUri: dataUri });
            setResult(res);
          } catch (e) {
            console.error(e);
            toast({
              variant: "destructive",
              title: "Analysis Failed",
              description: "Could not analyze the Thangka image. Please try again.",
            });
            setResult(null);
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2"><Sparkles className="text-primary"/> AI Thangka Explorer</CardTitle>
        <CardDescription>Upload a Thangka image to receive an AI-powered analysis of its symbolism and elements.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input id="thangka-upload" type="file" accept="image/*" onChange={handleFileChange} disabled={isPending} />
        </div>

        {(isPending || preview) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {preview && (
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg">Your Image</h3>
                        <div className="relative aspect-square w-full max-w-md mx-auto rounded-lg overflow-hidden border-4 border-secondary">
                             <Image src={preview} alt="Thangka preview" fill className="object-contain" />
                        </div>
                    </div>
                )}
                <div className="space-y-4">
                     <h3 className="font-bold text-lg">AI Analysis</h3>
                    {isPending && (
                        <div className="flex flex-col items-center justify-center p-8 space-y-4 border-2 border-dashed rounded-lg h-full">
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                            <p className="text-muted-foreground">Analyzing Thangka... This may take a moment.</p>
                        </div>
                    )}
                    {result && !isPending && (
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-headline text-xl mb-2">Description</h4>
                                <p className="text-muted-foreground">{result.description}</p>
                            </div>
                            <div>
                                <h4 className="font-headline text-xl mb-2">Key Elements</h4>
                                <div className="flex flex-wrap gap-2">
                                    {result.elements.map(el => <div key={el} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">{el}</div>)}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-headline text-xl mb-2">Symbolism</h4>
                                <div className="space-y-4">
                                {Object.entries(result.symbolism).map(([key, value]) => (
                                    <div key={key} className="flex items-start gap-3">
                                        <div className="mt-1">
                                            <DharmaWheelIcon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-bold">{key}</p>
                                            <p className="text-sm text-muted-foreground">{value}</p>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
