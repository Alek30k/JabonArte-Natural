"use client";

import { useRouter } from "next/navigation";
import { Carousel, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";

export const dataCarouselTop = [
  {
    id: 1,
    title: "Envio en 24/58 h",
    description:
      "Como cliente VIP, tus envíos en 24/48 horas. Obtén más información y únete",
    link: "#",
  },
  {
    id: 2,
    title: "Consigue hasta un -25% en compras superiores a 20.000 $",
    description:
      "-20% al gastar 50 mil $ o -25% al gastar 100 mil $. Usá el código",
    link: "#",
  },
  {
    id: 3,
    title: "Devolución y entregas gratuitas",
    description: "Como cliente, tienes envíos y devoluciones gratis en un plan",
    link: "#",
  },
  {
    id: 4,
    title: "Comprar novedades",
    description: "Todas las novedades al 50% de descuento",
    link: "#",
  },
];

const CarouselTextBanner = () => {
  const router = useRouter();

  return (
    <div className="bg-gray-200 dark:bg-primary">
      <Carousel className="w-full max-w-4xl mx-auto">
        {dataCarouselTop.map(({ id, title, link, description }) => (
          <CarouselItem
            key={id}
            onClick={() => router.push(link)}
            className="cursor-pointer"
          >
            <div className="">
              <Card className="shadow-none border-none bg-transparent">
                <CardContent className="flex flex-col"></CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselTextBanner;
