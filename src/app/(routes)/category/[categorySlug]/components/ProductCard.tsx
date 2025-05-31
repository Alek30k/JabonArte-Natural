"use client";

import type React from "react";

import { useState } from "react";
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

type ProductCardProps = {
  product: ProductType;
  isLoading?: boolean;
};

const ProductCard = ({ product, isLoading = false }: ProductCardProps) => {
  const { addItem } = UseCart();
  const { addLovedItem, removeLovedItem, lovedItems } = UseLovedProducts();
  const router = useRouter();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isLoved = lovedItems.some((item) => item.id === product.id);
  const hasMultipleImages = product.images && product.images.length > 1;

  const isOnSale = Math.random() > 0.8; // 20% chance de estar en oferta
  const originalPrice = isOnSale ? product.price * 1.3 : null;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAddingToCart(true);

    // Simular delay de API
    setTimeout(() => {
      addItem(product);
      setIsAddingToCart(false);
      setJustAdded(true);

      // Reset del estado después de 2 segundos
      setTimeout(() => setJustAdded(false), 2000);
    }, 500);
  };

  const handleToggleLove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoved) {
      removeLovedItem(product.id);
    } else {
      addLovedItem(product);
    }
  };

  const handleViewProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/product/${product.slug}`);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  if (isLoading) {
    return (
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
    );
  }

  return (
    <Card
      className="group overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white dark:bg-gray-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0 ">
        {/* Imagen del producto */}
        <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800">
          <Link href={`/product/${product.slug}`}>
            <Image
              src={`${product.images[currentImageIndex]?.url}`}
              alt={product.productName}
              width={500}
              height={300}
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

          {/* Controles de imagen */}
          {hasMultipleImages && isHovered && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute cursor-pointer left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white shadow-lg dark:text-black"
                onClick={prevImage}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 cursor-pointer dark:text-black top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white shadow-lg"
                onClick={nextImage}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>

              {/* Indicadores de imagen */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {product.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-white scale-125"
                        : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Acciones flotantes */}
          <div
            className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {/* Botón favoritos */}
            <Button
              variant="secondary"
              size="icon"
              className={`w-10 h-10 cursor-pointer rounded-full shadow-lg transition-all duration-300 ${
                isLoved
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-white/90 hover:bg-white text-gray-700 hover:text-red-500"
              }`}
              onClick={handleToggleLove}
            >
              <Heart
                className={`w-4 h-4 ${
                  isLoved ? "fill-current cursor-pointer" : ""
                }`}
              />
            </Button>

            {/* Botón ver producto */}
            <Button
              variant="secondary"
              size="icon"
              className="w-10 h-10 rounded-full cursor-pointer bg-white/90 hover:bg-white text-gray-700 hover:text-blue-500 shadow-lg transition-all duration-300"
              onClick={handleViewProduct}
            >
              <Eye className="w-4 h-4" />
            </Button>

            {/* Botón agregar al carrito */}
            <Button
              size="icon"
              className={`w-10 h-10 rounded-full shadow-lg transition-all duration-300 ${
                justAdded
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-orange-400 hover:bg-orange-500 hover:scale-110 cursor-pointer"
              }`}
              onClick={handleAddToCart}
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
        </div>

        {/* Información del producto */}
        <div className="p-4 space-y-3">
          {/* Nombre del producto */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer group-hover:text-blue-600">
              {product.productName}
            </h3>
          </Link>

          {/* Precio */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
            </div>
            {isOnSale && (
              <Badge className="sm:hidden bg-red-100 text-red-800 hover:bg-red-200">
                -
                {Math.round(
                  ((originalPrice! - product.price) / originalPrice!) * 100
                )}
                %
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
