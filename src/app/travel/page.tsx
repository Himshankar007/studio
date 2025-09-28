import { BookingWidget } from '@/components/travel/BookingWidget';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bus, Car, LifeBuoy, Phone } from 'lucide-react';

export default function TravelPage() {
  return (
    <div className="bg-background">
      <section className="py-12 md:py-20 text-center bg-secondary">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Travel & Booking</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Your seamless journey to serenity starts here. Book tickets, find transport, and get all the assistance you need for a worry-free pilgrimage.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20 -mt-16 md:-mt-24 relative z-10">
        <div className="container mx-auto px-4">
          <BookingWidget />
        </div>
      </section>

      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-10">Transport Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center gap-4">
                <Bus className="w-10 h-10 text-primary" />
                <CardTitle className="font-headline text-2xl">Local Buses & Taxis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sikkim Nationalised Transport (SNT) offers regular bus services connecting major towns and monasteries. Shared and private taxis are also widely available for more flexible travel. We recommend booking taxis a day in advance, especially during peak season.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center gap-4">
                <Car className="w-10 h-10 text-primary" />
                <CardTitle className="font-headline text-2xl">Rental Vehicles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  For ultimate freedom, consider renting a vehicle with a local driver. This allows you to explore off-the-beaten-path destinations at your own pace. Our partners offer reliable vehicles and experienced drivers familiar with mountain roads.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
            <LifeBuoy className="w-16 h-16 text-accent mx-auto mb-4" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Traveler Helpline</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Need assistance during your travels? Our support team is here to help with any critical issues you may face.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-10">
             <Card className="shadow-lg text-left">
              <CardHeader className="flex flex-row items-center gap-4">
                <Phone className="w-8 h-8 text-primary" />
                <CardTitle className="font-headline text-2xl">Offline Helpline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">For urgent matters, call one of our support numbers:</p>
                <ul className="mt-2 space-y-1 font-mono text-lg">
                    <li>+91-123-456-7890 (Main)</li>
                    <li>+91-098-765-4321 (Alternative)</li>
                </ul>
              </CardContent>
            </Card>
             <Card className="shadow-lg text-left">
              <CardHeader className="flex flex-row items-center gap-4">
                <LifeBuoy className="w-8 h-8 text-primary" />
                <CardTitle className="font-headline text-2xl">Online Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  For non-urgent inquiries or to get in touch via email, please use our contact form. We typically respond within 24 hours.
                </p>
                 <button className="text-primary font-bold mt-4">Contact Us Online</button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
