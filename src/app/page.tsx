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

import CarouselTextBanner from "@/components/CarouselTextBanner";

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <CarouselTextBanner />
    </main>
  );
}
