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

      {/* Contenedor del carousel sin overflow-x-hidden */}
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {loading && <SkeletonSchema grid={3} />}
            {result !== null &&
              result.map((product: ProductType) => {
                const { id, slug, images, productName } = product;

                // Verificar si images existe y tiene al menos un elemento
                const imageUrl =
                  images && images.length > 0
                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${images[0].url}`
                    : "/placeholder.svg?height=400&width=400";

                return (
                  <CarouselItem
                    key={id}
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 group"
                  >
                    <div className="h-full">
                      {/* Card con altura fija y mejor estructura */}
                      <Card className="h-80 flex flex-col shadow-2xl bg-white/60 border border-gray-200 cursor-pointer overflow-hidden">
                        {/* Contenedor de imagen optimizado */}
                        <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                          <Image
                            src={imageUrl || "/placeholder.svg"}
                            alt={productName || "Producto destacado"}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                            priority={false}
                          />

                          {/* Overlay con botones */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200">
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <div className="flex justify-center gap-x-3">
                                <IconButton
                                  onClick={() => router.push(`product/${slug}`)}
                                  icon={
                                    <Expand
                                      size={20}
                                      className="text-gray-600"
                                    />
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
                          </div>
                        </div>

                        {/* Contenedor de texto optimizado */}
                        <CardContent className="flex-1 flex items-start p-4">
                          <div className="w-full">
                            <h3
                              className="text-lg font-bold text-gray-600 line-clamp-2 leading-tight"
                              title={productName}
                            >
                              {productName}
                            </h3>

                            {/* Espacio para información adicional */}
                            <div className="flex items-center justify-between gap-3 mt-2">
                              {/* Aquí puedes agregar precio, badges, etc. */}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
          </CarouselContent>

          {/* Controles del carousel */}
          <CarouselPrevious className="cursor-pointer -left-4 lg:-left-8" />
          <CarouselNext className="cursor-pointer -right-4 lg:-right-8" />
        </Carousel>
      </div>
    </div>
  );
};

export default FeaturedProducts;
