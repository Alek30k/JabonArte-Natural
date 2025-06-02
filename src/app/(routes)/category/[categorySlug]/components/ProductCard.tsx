"use client";

import type React from "react";
import { useState, memo, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UseCart } from "@/hooks/UseCart";
import { UseLovedProducts } from "@/hooks/UseLovedProducts";
import { formatPrice } from "@/lib/formatPrice";
import type { ProductType } from "@/types/product";
import {
  Heart,
  Eye,
  Award,
  ChevronLeft,
  ChevronRight,
  Check,
  ShoppingCartIcon,
} from "lucide-react";
import { getBlurDataUrl, getImageUrl } from "@/utils/imagenUtils";

type ProductCardProps = {
  product: ProductType;
  isLoading?: boolean;
  isAboveFold?: boolean;
  priority?: boolean; // Para imágenes críticas
};

// Componente de skeleton memoizado
const ProductCardSkeleton = memo(() => (
  <Card className="group overflow-hidden animate-pulse">
    <CardContent className="p-0">
      <div className="aspect-square bg-gray-200 dark:bg-gray-700" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
      </div>
    </CardContent>
  </Card>
));

ProductCardSkeleton.displayName = "ProductCardSkeleton";

// Componente de indicadores de imagen memoizado
const ImageIndicators = memo(
  ({ images, currentIndex }: { images: any[]; currentIndex: number }) => (
    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
      {images.map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            index === currentIndex ? "bg-white scale-125" : "bg-white/50"
          }`}
        />
      ))}
    </div>
  )
);

ImageIndicators.displayName = "ImageIndicators";

// Componente de botones de acción memoizado
const ActionButtons = memo(
  ({
    isLoved,
    isAddingToCart,
    justAdded,
    onToggleLove,
    onViewProduct,
    onAddToCart,
  }: {
    isLoved: boolean;
    isAddingToCart: boolean;
    justAdded: boolean;
    onToggleLove: (e: React.MouseEvent) => void;
    onViewProduct: (e: React.MouseEvent) => void;
    onAddToCart: (e: React.MouseEvent) => void;
  }) => (
    <div className="flex items-center space-x-2">
      <Button
        variant="secondary"
        size="icon"
        className={`w-10 h-10 rounded-full shadow-lg transition-all duration-300 ${
          isLoved
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-white/90 hover:bg-white text-gray-700 hover:text-red-500"
        }`}
        onClick={onToggleLove}
      >
        <Heart className={`w-4 h-4 ${isLoved ? "fill-current" : ""}`} />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-blue-500 shadow-lg transition-all duration-300"
        onClick={onViewProduct}
      >
        <Eye className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        className={`w-10 h-10 rounded-full shadow-lg transition-all duration-300 ${
          justAdded
            ? "bg-green-500 hover:bg-green-600"
            : "bg-orange-400 hover:bg-orange-500 hover:scale-110"
        }`}
        onClick={onAddToCart}
        disabled={isAddingToCart}
      >
        {isAddingToCart ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : justAdded ? (
          <Check className="w-4 h-4" />
        ) : (
          <ShoppingCartIcon className="w-4 h-4" />
        )}
      </Button>
    </div>
  )
);

ActionButtons.displayName = "ActionButtons";

// Componente principal optimizado
const ProductCard = memo<ProductCardProps>(
  ({ product, isLoading = false, isAboveFold = false, priority = false }) => {
    const { addItem } = UseCart();
    const { addLovedItem, removeLovedItem, lovedItems } = UseLovedProducts();
    const router = useRouter();

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [justAdded, setJustAdded] = useState(false);

    // Memoizar cálculos costosos
    const isLoved = useMemo(
      () => lovedItems.some((item) => item.id === product.id),
      [lovedItems, product.id]
    );

    const hasMultipleImages = useMemo(
      () => product.images && product.images.length > 1,
      [product.images]
    );

    const { isOnSale, originalPrice } = useMemo(() => {
      const onSale = Math.random() > 0.8; // 20% chance de estar en oferta
      return {
        isOnSale: onSale,
        originalPrice: onSale ? product.price * 1.3 : null,
      };
    }, [product.price]);

    const { imageUrl, blurDataUrl } = useMemo(() => {
      const url = product.images?.[currentImageIndex]?.url
        ? getImageUrl(product.images[currentImageIndex].url, 400, 400)
        : "/placeholder.svg?height=400&width=400";

      const blur = product.images?.[currentImageIndex]?.url
        ? getBlurDataUrl(product.images[currentImageIndex].url)
        : "/placeholder.svg";

      return { imageUrl: url, blurDataUrl: blur };
    }, [product.images, currentImageIndex]);

    // Memoizar handlers para evitar re-renders
    const handleAddToCart = useCallback(
      async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsAddingToCart(true);
        // Simular delay de API
        setTimeout(() => {
          addItem(product);
          setIsAddingToCart(false);
          setJustAdded(true);
          setTimeout(() => setJustAdded(false), 2000);
        }, 500);
      },
      [addItem, product]
    );

    const handleToggleLove = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isLoved) {
          removeLovedItem(product.id);
        } else {
          addLovedItem(product);
        }
      },
      [isLoved, removeLovedItem, addLovedItem, product]
    );

    const handleViewProduct = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/product/${product.slug}`);
      },
      [router, product.slug]
    );

    const nextImage = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      },
      [product.images.length]
    );

    const prevImage = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex(
          (prev) => (prev - 1 + product.images.length) % product.images.length
        );
      },
      [product.images.length]
    );

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    // Mostrar skeleton si está cargando
    if (isLoading) {
      return <ProductCardSkeleton />;
    }

    return (
      <Card
        className="group overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white dark:bg-gray-900"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800">
            <Link href={`/product/${product.slug}`} prefetch={false}>
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={product.productName}
                width={400}
                height={400}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading={isAboveFold || priority ? "eager" : "lazy"}
                priority={isAboveFold || priority}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                quality={85} // Optimizar calidad vs tamaño
              />
            </Link>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badge de origen */}
            <div className="absolute top-3 right-3">
              <Badge className="bg-amber-500/90 hover:bg-amber-600 text-white shadow-lg backdrop-blur-sm">
                <Award className="w-3 h-3 mr-1" />
                {product.origin}
              </Badge>
            </div>

            {/* Controles de navegación de imágenes */}
            {hasMultipleImages && isHovered && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white shadow-lg dark:text-black"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white shadow-lg dark:text-black"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <ImageIndicators
                  images={product.images}
                  currentIndex={currentImageIndex}
                />
              </>
            )}

            {/* Botones de acción */}
            <div
              className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                isHovered
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <ActionButtons
                isLoved={isLoved}
                isAddingToCart={isAddingToCart}
                justAdded={justAdded}
                onToggleLove={handleToggleLove}
                onViewProduct={handleViewProduct}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>

          {/* Información del producto */}
          <div className="p-4 space-y-3">
            <Link href={`/product/${product.slug}`} prefetch={false}>
              <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 transition-colors group-hover:text-blue-600">
                {product.productName}
              </h3>
            </Link>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {isOnSale && originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                )}
              </div>
              {isOnSale && originalPrice && (
                <Badge className="sm:hidden bg-red-100 text-red-800 hover:bg-red-200">
                  -
                  {Math.round(
                    ((originalPrice - product.price) / originalPrice) * 100
                  )}
                  %
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
