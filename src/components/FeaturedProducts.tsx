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
import { getBlurDataUrl, getImageUrl } from "@/utils/imagenUtils";

const FeaturedProducts = () => {
  const { loading, result }: ResponseType = useGetFeaturedProducts();
  const router = useRouter();
  const { addItem } = UseCart();

  return (
    <div className="max-w-6xl mx-auto sm:px-24 mt-36 ">
      <h3 className="px-6 py-4 text-2xl  text-gray-500 dark:text-white  ">
        Productos destacados
      </h3>

      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {loading && <SkeletonSchema grid={3} />}
            {result !== null &&
              result.map((product: ProductType, index: number) => {
                const { id, slug, images, productName } = product;
                const imageUrl =
                  images && images.length > 0
                    ? getImageUrl(images[0].url, 400, 256)
                    : "/placeholder.svg?height=256&width=400";
                const blurDataUrl =
                  images && images.length > 0
                    ? getBlurDataUrl(images[0].url)
                    : "/placeholder.svg";

                return (
                  <CarouselItem
                    key={id}
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 group"
                  >
                    <div className="h-full">
                      <Card className="h-80 flex flex-col shadow-2xl bg-white/60 border border-gray-300 cursor-pointer overflow-hidden">
                        <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={productName || "Producto destacado"}
                            width={400}
                            height={256}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            placeholder="blur"
                            blurDataURL={blurDataUrl}
                            loading={index >= 3 ? "lazy" : undefined}
                            priority={index < 3}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200">
                            <div className="absolute bottom-1 lg:bottom-4 left-1/2 transform -translate-x-1/2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <div className="flex justify-center gap-x-3">
                                <IconButton
                                  onClick={() => router.push(`product/${slug}`)}
                                  icon={
                                    <Expand
                                      size={20}
                                      className="text-orange-600"
                                    />
                                  }
                                />
                                <IconButton
                                  onClick={() => addItem(product)}
                                  icon={
                                    <ShoppingCart
                                      size={20}
                                      className="text-orange-600"
                                    />
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <CardContent className="flex-1 flex items-start p-4">
                          <div className="w-full">
                            <h3
                              className="text-lg font-bold text-gray-600 line-clamp-2 leading-tight"
                              title={productName}
                            >
                              {productName}
                            </h3>
                            <div className="flex items-center justify-between gap-3 mt-2">
                              {/* Add price or badges here if needed */}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
          </CarouselContent>
          <CarouselPrevious className="cursor-pointer -left-4 lg:-left-8" />
          <CarouselNext className="cursor-pointer -right-4 lg:-right-8" />
        </Carousel>
      </div>
    </div>
  );
};

export default FeaturedProducts;
