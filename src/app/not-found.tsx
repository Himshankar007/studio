import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <Compass className="w-24 h-24 text-primary mb-6" />
      <h1 className="font-headline text-5xl md:text-6xl font-bold">404 - Lost on the Path</h1>
      <p className="mt-4 max-w-xl text-lg md:text-xl text-muted-foreground">
        It seems you've wandered off the trail. The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8">
        <Button asChild size="lg">
          <Link href="/">Return to the Gateway</Link>
        </Button>
      </div>
    </div>
  );
}
