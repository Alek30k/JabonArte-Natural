/* eslint-disable @next/next/no-img-element */
"use client";

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import type { ResponseType } from "@/types/response";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import SkeletonSchema from "./SkeletonSchema";
import type { ProductType } from "@/types/product";
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
              const { id, slug, images, productName } = product;

              // Verificar si images existe y tiene al menos un elemento
              const imageUrl =
                images && images.length > 0
                  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${images[0].url}`
                  : "/placeholder-image.jpg";

              return (
                <CarouselItem
                  key={id}
                  className="md:basis-1/2 lg:basis-1/3 group"
                >
                  <div className="p-1">
                    {/* Card con altura fija */}
                    <Card className="py-4 shadow-2xl bg-white/60 border border-gray-200 cursor-pointer h-80 flex flex-col">
                      {/* Contenedor de imagen con altura fija */}
                      <CardContent className="relative flex items-center justify-center px-6 py-2 w-full h-64 mb-4 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt={productName || "Producto destacado"}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
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

                      {/* Contenedor de texto con altura controlada */}
                      <div className="flex-1 flex items-start px-8">
                        <div className="w-full">
                          {/* Título con line-clamp para limitar a 2 líneas máximo */}
                          <h3
                            className="text-lg font-bold text-gray-600 line-clamp-2 leading-tight"
                            title={productName} // Tooltip para mostrar el nombre completo
                          >
                            {productName}
                          </h3>

                          {/* Espacio para badges si los necesitas en el futuro */}
                          <div className="flex items-center justify-between gap-3 mt-2">
                            {/* Aquí puedes agregar badges si los necesitas */}
                          </div>
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
