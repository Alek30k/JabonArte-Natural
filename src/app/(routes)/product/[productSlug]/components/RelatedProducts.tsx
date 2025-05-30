"use client";

// import { useGetRelatedProducts } from "@/api/getRelatedProducts";
import { ProductType } from "@/types/product";
import { Button } from "@/components/ui/button";
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
import { useGetRelatedProducts } from "@/api/useGetRelatedProducts";

interface RelatedProductsProps {
  category: string;
  currentSlug: string;
}

export default function RelatedProducts({
  category,
  currentSlug,
}: RelatedProductsProps) {
  const {
    data: products,
    isLoading,
    error,
  } = useGetRelatedProducts(category, currentSlug);

  if (!category) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Productos Relacionados</h2>
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : error || !products || products.length === 0 ? (
        <p className="text-gray-500">
          No se encontraron productos relacionados.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product: ProductType) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: ProductType }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={product.images?.[0]?.url || "/placeholder-image.jpg"}
            alt={product.productName}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold truncate">
          {product.productName}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {formatPrice(product.price)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/products/${product.slug}`}>Ver Producto</Link>
        </Button>
      </CardFooter>
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
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}
