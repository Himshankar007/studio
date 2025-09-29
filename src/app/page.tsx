'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Map, Library, Music } from 'lucide-react';
import { monasteries } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';
import { useEffect, useState } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > window.innerHeight - 70;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);


  return (
    <div className="flex flex-col">
      <section className="relative w-full h-screen text-white overflow-hidden" id="video-section">
        <iframe
          src="https://player.vimeo.com/video/1121483340?background=1&autoplay=1&loop=1&byline=0&title=0"
          className="absolute top-1/2 left-1/2 w-full h-full min-w-[177.78vh] min-h-[56.25vw] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          frameBorder="0"
          allow="autoplay; fullscreen"
        ></iframe>
        <div id="mist"></div>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold">DISCOVER</h1>
          <h2 className="text-4xl md:text-5xl mt-2 mb-4">Sikkim&apos;s Sacred Monasteries</h2>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
             Immerse yourself in the spiritual heritage of the Himalayas through virtual tours, digital archives, and interactive experiences that bring ancient wisdom to life.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white hover:bg-white hover:text-black">
              <Link href="/monasteries">
                Start Virtual Tour
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white hover:bg-white hover:text-black">
              <Link href="/monasteries">Explore Map</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="sanctuaries" className="py-12 md:py-24 bg-[#fdf9f8] text-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">Sacred Sanctuaries</h2>
            <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
              Explore the most revered monasteries of Sikkim, each holding centuries of spiritual wisdom and architectural marvels nestled in the Himalayan landscape.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {monasteries.slice(0, 3).map(monastery => {
              const image = placeholderImages.find(p => p.id === monastery.imageId);
              return (
                <Card key={monastery.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white rounded-xl">
                   {image && (
                      <div className="relative h-48 w-full">
                        <Image
                            src={image.imageUrl}
                            alt={monastery.name}
                            fill
                            className="object-cover"
                        />
                      </div>
                    )}
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl">{monastery.name}</h3>
                        <div className="bg-[#ffe6e1] text-[#cc3300] px-2 py-1 rounded-full text-xs font-semibold">{monastery.founded}</div>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{monastery.description.split('.')[0]}.</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="highlight bg-[#ffd9d2] text-[#aa1e00] text-xs px-2 py-1 rounded-full">Architecture</span>
                        <span className="highlight bg-[#ffd9d2] text-[#aa1e00] text-xs px-2 py-1 rounded-full">Meditation</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <Button variant="link" className="p-0 text-orange-600">
                            <Link href={`/monasteries#${monastery.id}`}>Virtual Tour</Link>
                        </Button>
                        <Button variant="link" className="p-0 text-orange-600">
                            <Link href="/travel">Visit</Link>
                        </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

        <section className="bg-white py-12 text-black">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-orange-600">
                Explore the Sacred Geography
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Navigate through Sikkim&apos;s spiritual landscape with our interactive map
                featuring monastery locations, trekking routes, and cultural points of
                interest.
            </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow p-10 flex flex-col items-center justify-center">
                <Map className="text-orange-600 text-5xl mb-6 h-16 w-16"/>
                <h3 className="text-2xl font-bold mb-2">Interactive Map</h3>
                <p className="text-gray-600 mb-6 text-center">
                    Full interactive map with monastery locations, routes, and cultural sites.
                </p>
                <Button asChild className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700">
                    <Link href="/monasteries">Launch Map</Link>
                </Button>
            </div>
            <div className="flex flex-col gap-6">
                <div className="bg-white rounded-2xl shadow p-6 flex items-start space-x-4">
                    <div className="text-orange-600 text-2xl">📍</div>
                    <div>
                        <h4 className="font-bold text-lg">Monastery Locations</h4>
                        <p className="text-gray-600 text-sm">
                            Discover precise locations of all major monasteries with detailed
                            information and visiting hours.
                        </p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow p-6 flex items-start space-x-4">
                    <div className="text-red-500 text-2xl">🧭</div>
                    <div>
                        <h4 className="font-bold text-lg">Pilgrimage Routes</h4>
                        <p className="text-gray-600 text-sm">
                            Follow traditional pilgrimage paths connecting monasteries with
                            guided route information.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="py-16 px-6 bg-gray-50 text-black">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-orange-600">Digital Preservation</h2>
            <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                Access our comprehensive digital archive of Buddhist manuscripts, sacred art, and
                historical documents preserved for future generations.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Link href="/culture" className="block transform hover:scale-105 transition-transform duration-300">
              <Card className="bg-white rounded-2xl shadow p-6 text-center text-black cursor-pointer h-full">
                  <div className="text-4xl">📖</div>
                  <h3 className="text-lg font-semibold mt-4">Ancient Manuscripts</h3>
                  <p className="text-red-500 text-sm font-medium mt-1">1,247 documents</p>
                  <p className="text-gray-600 text-sm mt-3">Rare Buddhist texts, philosophical treatises, and prayer books.</p>
              </Card>
            </Link>
             <Link href="/culture" className="block transform hover:scale-105 transition-transform duration-300">
              <Card className="bg-white rounded-2xl shadow p-6 text-center text-black cursor-pointer h-full">
                  <div className="text-4xl">🖼️</div>
                  <h3 className="text-lg font-semibold mt-4">Sacred Murals</h3>
                  <p className="text-red-500 text-sm font-medium mt-1">850 high-res images</p>
                  <p className="text-gray-600 text-sm mt-3">Detailed photography of monastery wall paintings and artistic decorations.</p>
              </Card>
            </Link>
             <Link href="/culture" className="block transform hover:scale-105 transition-transform duration-300">
              <Card className="bg-white rounded-2xl shadow p-6 text-center text-black cursor-pointer h-full">
                  <div className="text-4xl">📜</div>
                  <h3 className="text-lg font-semibold mt-4">Historical Records</h3>
                  <p className="text-red-500 text-sm font-medium mt-1">432 documents</p>
                  <p className="text-gray-600 text-sm mt-3">Administrative records, chronicles, and historical accounts of monastic life.</p>
              </Card>
            </Link>
        </div>
    </section>

    <section id="audio-guide" className="py-16 px-6 bg-gray-50 text-black">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-orange-600">Smart Audio Guide</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Transform your monastery visits with our intelligent audio guide app.
                Get contextual information, stories, and spiritual insights as you explore.
            </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-gray-700 font-semibold">Sikkim Monasteries</h3>
                <p className="text-sm text-gray-500">Audio Guide v2.1</p>
                <div className="mt-6 bg-orange-50 rounded-lg p-4">
                    <p className="text-orange-600 font-medium flex items-center gap-2">
                        🎙️ Now Playing
                    </p>
                    <p className="mt-2 text-sm text-gray-700">
                        &quot;The Golden Stupa of Rumtek: A Sacred Symbol of Enlightenment&quot;
                    </p>
                    <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full w-3/4"></div>
                        </div>
                        <p className="text-right text-xs text-gray-500 mt-1">2:45</p>
                    </div>
                </div>
                <div className="flex justify-between mt-6 gap-4">
                    <Button className="flex-1 bg-pink-50 text-pink-600 font-medium rounded-md py-2">
                        📍 Location Active
                    </Button>
                    <Button className="flex-1 bg-orange-50 text-orange-600 font-medium rounded-md py-2">
                        ⬇️ Offline Ready
                    </Button>
                </div>
            </div>
            <div className="space-y-6">
                <div>
                    <h4 className="flex items-center gap-2 font-semibold text-gray-800">
                        📍 Location-Based Audio
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                        Automatic commentary triggered by your GPS location as you explore each monastery.
                    </p>
                </div>
                <div>
                    <h4 className="flex items-center gap-2 font-semibold text-gray-800">
                        🎧 Expert Narration
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                        Stories told by Buddhist scholars, monks, and local historians in multiple languages.
                    </p>
                </div>
                <div>
                    <h4 className="flex items-center gap-2 font-semibold text-gray-800">
                        🔊 Ambient Soundscapes
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                        Immersive audio featuring chanting, prayer bells, and natural mountain sounds.
                    </p>
                </div>
                <div className="flex gap-4 mt-8">
                    <Button className="flex-1 bg-gradient-to-r from-orange-400 to-red-500 text-white py-3 rounded-md font-medium hover:opacity-90">
                        ⬇️ Download App
                    </Button>
                     <Button variant="outline" className="flex-1 border py-3 rounded-md font-medium hover:bg-gray-100">
                        🎧 Preview Audio
                    </Button>
                </div>
            </div>
        </div>
    </section>

    </div>
  );
}
