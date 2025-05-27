"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Autoplay from "embla-carousel-autoplay";
import {
  Truck,
  Percent,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Gift,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const dataCarouselTop = [
  {
    id: 1,
    title: "Envío Express 24/48h",
    description:
      "Como cliente VIP, tus envíos llegan súper rápido. ¡Únete al programa premium!",
    link: "/vip",
    icon: <Truck className="w-4 h-4" />,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-700 dark:text-blue-300",
    badge: "VIP",
    badgeColor: "bg-blue-500",
  },
  {
    id: 2,
    title: "Hasta -25% de Descuento",
    description:
      "Ahorra más comprando más: -20% en $50k o -25% en $100k. Código: AHORRA25",
    link: "/ofertas",
    icon: <Percent className="w-4 h-4" />,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    textColor: "text-green-700 dark:text-green-300",
    badge: "OFERTA",
    badgeColor: "bg-green-500",
  },
  {
    id: 3,
    title: "Devoluciones Gratuitas",
    description:
      "Envíos y devoluciones sin costo. Tu satisfacción es nuestra prioridad.",
    link: "/devoluciones",
    icon: <RotateCcw className="w-4 h-4" />,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    textColor: "text-purple-700 dark:text-purple-300",
    badge: "GRATIS",
    badgeColor: "bg-purple-500",
  },
  {
    id: 4,
    title: "Novedades al 50% OFF",
    description:
      "Descubre los últimos productos con descuentos increíbles. ¡Por tiempo limitado!",
    link: "/novedades",
    icon: <Sparkles className="w-4 h-4" />,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    textColor: "text-orange-700 dark:text-orange-300",
    badge: "NUEVO",
    badgeColor: "bg-orange-500",
  },
];

const CarouselTextBanner = () => {
  const router = useRouter();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [autoplayPlugin] = useState(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
    })
  );

  console.log(count, current);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const goToPrevious = () => {
    api?.scrollPrev();
  };

  const goToNext = () => {
    api?.scrollNext();
  };

  return (
    <div className="relative bg-gradient-to-r from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700 mt-11">
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-[url(&apos;data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23f3f4f6" fillOpacity="0.4"%3E%3Ccircle cx="30" cy="30" r="1.5"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&apos;)] opacity-30' />

      <div className="relative max-w-7xl mx-auto">
        <Carousel
          setApi={setApi}
          className="w-full"
          plugins={[autoplayPlugin]}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {dataCarouselTop.map((item) => (
              <CarouselItem key={item.id} className="cursor-pointer group">
                <div
                  onClick={() => router.push(item.link)}
                  className="relative overflow-hidden transition-all duration-500 hover:scale-[1.01]"
                >
                  <Card className="shadow-none border-none bg-transparent">
                    {/* Padding reducido significativamente */}
                    <CardContent className="relative p-3 sm:p-4">
                      {/* Background Gradient */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                      />

                      {/* Content Container - espaciado reducido */}
                      <div className="relative flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                        {/* Left Side - Icon and Badge más pequeños */}
                        <div className="flex items-center space-x-2">
                          <div
                            className={`p-2 rounded-full ${item.bgColor} ${item.textColor} group-hover:scale-110 transition-transform duration-300`}
                          >
                            {item.icon}
                          </div>
                          <Badge
                            className={`${item.badgeColor} text-white hover:scale-105 transition-transform text-xs px-2 py-0.5`}
                          >
                            {item.badge}
                          </Badge>
                        </div>

                        {/* Center - Text Content más compacto */}
                        <div className="flex-1 text-center  sm:text-left space-y-1">
                          <h3
                            className={`text-base sm:text-lg font-bold ${item.textColor} group-hover:scale-105 transition-transform duration-300`}
                          >
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-tight">
                            {item.description}
                          </p>
                        </div>

                        {/* Right Side - CTA más pequeño */}
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`${item.textColor} hover:bg-white/50 dark:hover:bg-gray-800/50 group-hover:translate-x-1 transition-all duration-300 h-8 px-2`}
                          >
                            <span className="hidden sm:inline mr-1 text-xs">
                              Ver más
                            </span>
                            <ArrowRight className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Decorative Elements más pequeños */}
                      <div className="absolute top-1 right-1 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                        <Star className="w-4 h-4 text-yellow-400" />
                      </div>
                      <div className="absolute bottom-1 left-1 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                        <Gift className="w-5 h-5 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Navigation Controls más pequeños */}
        <div className="absolute inset-y-0 left-2 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="h-8 w-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>

        <div className="absolute inset-y-0 right-2 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="h-8 w-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarouselTextBanner;
