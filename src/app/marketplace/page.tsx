import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { products } from '@/lib/data';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { ShoppingCart } from 'lucide-react';

export default function MarketplacePage() {
  return (
    <div className="bg-background">
      <section className="py-12 md:py-20 text-center bg-secondary">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Monastery Marketplace</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Support local monastic communities by purchasing authentic, handcrafted goods. Every purchase contributes to their self-sustainment and cultural preservation.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => {
              const image = placeholderImages.find((p) => p.id === product.imageId);
              return (
                <Card key={product.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                  <CardHeader className="p-0 overflow-hidden">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={product.name}
                        data-ai-hint={image.imageHint}
                        width={400}
                        height={300}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </CardHeader>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <CardTitle className="font-headline text-xl">{product.name}</CardTitle>
                    <CardDescription className="mt-1 text-sm text-muted-foreground">
                      From {product.monastery}
                    </CardDescription>
                    <div className="flex-grow" />
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-2xl font-bold text-primary">{product.price}</p>
                      <Button size="icon" aria-label={`Add ${product.name} to cart`}>
                        <ShoppingCart className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
