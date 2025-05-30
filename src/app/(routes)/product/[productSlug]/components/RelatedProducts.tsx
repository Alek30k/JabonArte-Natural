"use client";

import { useGetRelatedProducts } from "@/api/useGetRelatedProducts";
import type { ProductType } from "@/types/product";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";

interface RelatedProductsProps {
  category: string;
  currentSlug: string;
  currentProduct?: {
    taste?: string;
    origin?: string;
    price?: number;
  };
}

export default function RelatedProducts({
  category,
  currentSlug,
  currentProduct,
}: RelatedProductsProps) {
  const {
    result: products,
    loading,
    error,
  } = useGetRelatedProducts(category, currentSlug, currentProduct);

  if (!category) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Productos Relacionados</h2>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500 mb-2">
            Error al cargar productos relacionados
          </p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      ) : !products || products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-2">
            No se encontraron productos relacionados
          </p>
          <p className="text-sm text-gray-400">
            Intenta explorar otras categorías o productos
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product: ProductType) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: ProductType }) {
  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return "/placeholder.svg?height=300&width=300";

    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }

    if (imageUrl.startsWith("/uploads/")) {
      return `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`;
    }

    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${imageUrl}`;
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardHeader className="p-0 ">
        <Link href={`/product/${product.slug}`}>
          <div className="relative w-full h-32 overflow-hidden">
            <Image
              src={getImageUrl(product.images?.[0]?.url) || "/placeholder.svg"}
              alt={product.productName}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />

            {/* Badges de información */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.taste && (
                <span className="px-2 py-1 text-xs bg-black/70 text-white rounded-full">
                  {product.taste}
                </span>
              )}
              {product.origin && (
                <span className="px-2 py-1 text-xs bg-yellow-600/80 text-white rounded-full">
                  {product.origin}
                </span>
              )}
            </div>
          </div>
          <CardContent className="p-3">
            <h3 className="text-lg  font-semibold ">{product.productName}</h3>
            {product.features && (
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 ">
                {product.features}
              </p>
            )}
            <p className="text-lg font-bold text-orange-600">
              {formatPrice(product.price)}
            </p>
          </CardContent>
        </Link>
      </CardHeader>
    </Card>
  );
}

function SkeletonCard() {
  return (
    <Card>
      <CardHeader className="p-0">
        <Skeleton className="w-full h-48" />
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  );
}
