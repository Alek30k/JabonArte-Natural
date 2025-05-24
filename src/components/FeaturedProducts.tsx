/* eslint-disable @next/next/no-img-element */
"use client";

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { ResponseType } from "@/types/response";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import SkeletonSchema from "./SkeletonSchema";
import { ProductType } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import { Expand, ShoppingCart } from "lucide-react";
import IconButton from "./IconButton";
import { useRouter } from "next/navigation";
import { UseCart } from "@/hooks/UseCart";
import Image from "next/image";

const FeaturedProducts = () => {
  const { loading, result }: ResponseType = useGetFeaturedProducts();
  const router = useRouter();
  const { addItem } = UseCart();

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 text-3xl sm:pb-8">Productos destacados</h3>
      <Carousel>
        <CarouselContent className="ml-2 md:ml-4">
          {loading && <SkeletonSchema grid={3} />}
          {result !== null &&
            result.map((product: ProductType) => {
              const { id, slug, images, productName, taste, origin } = product;
              // const { slug, images, productName, taste, origin } = attributes;

              // Verificar si images existe y tiene al menos un elemento
              const imageUrl =
                images && images.length > 0
                  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${images[0].url}`
                  : "/placeholder-image.jpg"; // Reemplaza con la URL de tu imagen por defecto

              return (
                <CarouselItem
                  key={id}
                  className="md:basis-1/2 lg:basis-1/3 group"
                >
                  <div className="p-1">
                    <Card className="py-4 border border-gray-200 shadow-none">
                      <CardContent className="relative flex items-center justify-center px-6 py-2 w-full h-64 mb-4 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={imageUrl} // Usar la URL verificada
                          alt={productName || "Producto destacado"}
                          fill // Llena el contenedor padre
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive
                          placeholder="blur" // Placeholder blur
                          blurDataURL="..." // Imagen blur base64
                        />
                        <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                          <div className="flex justify-center gap-x-6">
                            <IconButton
                              onClick={() => router.push(`product/${slug}`)}
                              icon={
                                <Expand size={20} className="text-gray-600" />
                              }
                            />
                            <IconButton
                              onClick={() => addItem(product)}
                              icon={
                                <ShoppingCart
                                  size={20}
                                  className="text-gray-600"
                                />
                              }
                            />
                          </div>
                        </div>
                      </CardContent>
                      <div className="flex justify-between gap-4 px-8">
                        <h3 className="text-lg font-bold">{productName}</h3>
                        <div className="flex items-center justify-between gap-3">
                          <p className="px-2 py-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
                            {taste}
                          </p>
                          <p className="px-2 py-1 text-white bg-yellow-900 rounded-full w-fit">
                            {origin}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselPrevious className="cursor-pointer" />
        <CarouselNext className="hidden sm:flex cursor-pointer" />
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;
