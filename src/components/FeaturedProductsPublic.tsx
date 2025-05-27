"use client";

import { useGetFeaturedProductsFixed } from "@/api/useGetFeaturedProductsFixed";
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
import { useState } from "react";

const FeaturedProductsPublic = () => {
  const { loading, result }: ResponseType = useGetFeaturedProductsFixed();
  const router = useRouter();
  const { addItem } = UseCart();
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return "/placeholder.svg?height=400&width=400";

    console.log("🖼️ Procesando URL:", imageUrl);

    // Si ya es una URL completa (Cloudinary)
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      console.log("✅ URL completa:", imageUrl);
      return imageUrl;
    }

    // Si es una URL relativa, construir la URL completa
    if (imageUrl.startsWith("/uploads/")) {
      const fullUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`;
      console.log("🔧 URL construida:", fullUrl);
      return fullUrl;
    }

    // Si no empieza con /, agregar /uploads/
    const constructedUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${imageUrl}`;
    console.log("🔧 URL final:", constructedUrl);
    return constructedUrl;
  };

  const handleImageError = (imageUrl: string) => {
    console.error("❌ Error cargando imagen:", imageUrl);
    setFailedImages((prev) => new Set(prev).add(imageUrl));
  };

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 text-3xl sm:pb-8">Productos destacados</h3>

      {/* Debug info en desarrollo */}
      {process.env.NODE_ENV === "development" && (
        <div className="mx-6 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Debug:</strong> Cargando productos sin autenticación. Total:{" "}
            {result?.length || 0}
          </p>
        </div>
      )}

      <Carousel>
        <CarouselContent className="md:ml-4">
          {loading && <SkeletonSchema grid={3} />}

          {!loading && (!result || result.length === 0) && (
            <div className="w-full text-center py-8">
              <p className="text-gray-600">
                No se encontraron productos destacados
              </p>
            </div>
          )}

          {result !== null &&
            result.map((product: ProductType) => {
              const { id, slug, images, productName } = product;

              const originalImageUrl =
                images && images.length > 0 ? getImageUrl(images[0].url) : null;
              const hasFailedToLoad =
                originalImageUrl && failedImages.has(originalImageUrl);
              const imageUrl =
                originalImageUrl && !hasFailedToLoad
                  ? originalImageUrl
                  : "/placeholder.svg?height=400&width=400";

              return (
                <CarouselItem
                  key={id}
                  className="md:basis-1/2 lg:basis-1/3 group"
                >
                  <div className="p-1">
                    <Card className="py-4 shadow-2xl bg-white/60 border border-gray-200 cursor-pointer h-80 flex flex-col">
                      <CardContent className="relative flex items-center justify-center px-6 py-2 w-full h-64 mb-4 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt={productName || "Producto destacado"}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                          onError={() =>
                            originalImageUrl &&
                            handleImageError(originalImageUrl)
                          }
                        />

                        {/* Indicadores de estado */}
                        <div className="absolute top-2 left-2 flex gap-1">
                          <div className="text-xs px-2 py-1 rounded text-white bg-black/70">
                            {hasFailedToLoad
                              ? "❌"
                              : originalImageUrl?.includes("cloudinary.com")
                              ? "☁️"
                              : "🖥️"}
                          </div>
                        </div>

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

                      <div className="flex-1 flex items-start px-8">
                        <div className="w-full">
                          <h3
                            className="text-lg font-bold text-gray-600 line-clamp-2 leading-tight"
                            title={productName}
                          >
                            {productName}
                          </h3>
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

export default FeaturedProductsPublic;
