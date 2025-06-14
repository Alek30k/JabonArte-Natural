"use client";

import { useGetCategory } from "@/api/getProducts";
import type { CategoryType } from "@/types/category";
import type { ResponseType } from "@/types/response";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Heart } from "lucide-react";
import { useState } from "react";
import { getBlurDataUrl, getImageUrl } from "@/utils/imagenUtils";

const ChooseCategory = () => {
  const { result, loading }: ResponseType = useGetCategory();
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const categories = (
    result && Array.isArray(result) ? result : []
  ) as CategoryType[];

  const CategorySkeleton = () => (
    <Card className="group overflow-hidden border-0 shadow-lg">
      <CardContent className="p-0">
        <div className="relative h-72 w-full">
          <Skeleton className="w-full h-full rounded-t-lg" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <Skeleton className="h-6 w-3/4 bg-white/20" />
            <Skeleton className="h-4 w-1/2 bg-white/20 mt-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="max-w-7xl py-8 mx-auto sm:py-16 px-4 sm:px-6 lg:px-8 min-h-[600px]">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:gap-3 flex items-center justify-center sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          <span className="bg-gradient-to-r from-orange-800 to-green-600 bg-clip-text text-transparent">
            Encuentra el regalo perfecto
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mx-auto">
          Explore nuestro catálogo de productos
        </p>
      </div>
      <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? [...Array(6)].map((_, index: number) => (
              <CategorySkeleton key={index} />
            ))
          : categories && Array.isArray(categories) && categories.length > 0
          ? categories.map((category: CategoryType, index: number) => {
              const imageUrl = category.mainImage?.url
                ? getImageUrl(category.mainImage.url, 400, 288)
                : "/placeholder.svg?height=288&width=400";
              const blurDataUrl = category.mainImage?.url
                ? getBlurDataUrl(category.mainImage.url)
                : "/placeholder.svg";
              return (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="group block"
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <CardContent className="p-0 relative">
                      <div className="relative h-72 w-full overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={category.categoryName}
                          width={400}
                          height={288}
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          style={{ aspectRatio: "400 / 288" }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          loading={index >= 3 ? "lazy" : undefined}
                          priority={index < 3}
                          placeholder="blur"
                          blurDataURL={blurDataUrl}
                          onError={(e) => {
                            console.error(
                              "❌ Error cargando imagen:",
                              imageUrl
                            );
                            e.currentTarget.src =
                              "/placeholder.svg?height=288&width=400";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div
                          className={`absolute inset-0 bg-orange-500/20 transition-opacity duration-300 ${
                            hoveredCategory === category.id
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                            <Heart className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-orange-200 transition-colors">
                            {category.categoryName}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-white/90 text-sm">
                              Ver productos
                            </span>
                            <div
                              className={`flex items-center justify-center w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm transition-all duration-300 ${
                                hoveredCategory === category.id
                                  ? "bg-orange-500 scale-110"
                                  : "group-hover:bg-white/30"
                              }`}
                            >
                              <ArrowRight className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })
          : null}
      </div>
      {!loading &&
        (!categories ||
          !Array.isArray(categories) ||
          categories.length === 0) && (
          <div className="text-center py-12 min-h-[200px]">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No hay categorías disponibles
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Estamos trabajando en agregar nuevas categorías de regalos
              especiales
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Contáctanos
            </Link>
          </div>
        )}
    </section>
  );
};

export default ChooseCategory;
