"use client";

import type { ResponseType } from "@/types/response";
import type { ProductType } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ShoppingCart, Heart, ArrowRight, Star, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { UseCart } from "@/hooks/UseCart";
import Image from "next/image";
import { useState } from "react";

import { useGetFeaturedProductsUniversal } from "@/api/useGetFeaturedProductsUniversal";

const ProductsShowcase = () => {
  const { loading, result }: ResponseType = useGetFeaturedProductsUniversal();
  const router = useRouter();
  const { addItem } = UseCart();
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return "/placeholder.svg?height=400&width=400";

    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }

    if (imageUrl.startsWith("/uploads/")) {
      return `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`;
    }

    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${imageUrl}`;
  };

  const handleImageError = (imageUrl: string) => {
    setFailedImages((prev) => new Set(prev).add(imageUrl));
  };

  const displayProducts = result?.slice(0, 8) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Cargando productos increíbles...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen  dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Descubre Nuestros
            <span className="block bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Productos Estrella
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Una colección cuidadosamente seleccionada de nuestros productos más
            populares, creados con ingredientes naturales y mucho amor
            artesanal.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {displayProducts.map((product: ProductType, index) => {
            const { id, slug, images, productName, price } = product;
            const originalImageUrl =
              images && images.length > 0 ? getImageUrl(images[0].url) : null;
            const hasFailedToLoad =
              originalImageUrl && failedImages.has(originalImageUrl);
            const imageUrl =
              originalImageUrl && !hasFailedToLoad
                ? originalImageUrl
                : "/placeholder.svg?height=400&width=400";

            return (
              <Card
                key={id}
                className="group cursor-pointer overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1"
                onClick={() => router.push(`/product/${slug}`)}
              >
                <CardContent className="p-0">
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={productName || "Producto"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      onError={() =>
                        originalImageUrl && handleImageError(originalImageUrl)
                      }
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Floating Badge */}
                    {index < 3 && (
                      <div className="absolute top-4 left-4 transform -rotate-12">
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                          <Star className="w-3 h-3 mr-1" />
                          Top {index + 1}
                        </Badge>
                      </div>
                    )}

                    {/* Heart Button */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-10 w-10 p-0 bg-white/90 hover:bg-white shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Lógica de favoritos
                        }}
                      >
                        <Heart className="h-4 w-4 text-pink-600" />
                      </Button>
                    </div>

                    {/* Quick Add Button */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <Button
                        className="w-full  cursor-pointer bg-white/95 hover:bg-white  text-orange-800 shadow-lg backdrop-blur-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          addItem(product);
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2 text-orange-800" />
                        Agregar al carrito
                      </Button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {/* Product Name */}
                      <h2 className="font-bold text-xl text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-pink-600 transition-colors">
                        {productName}
                      </h2>

                      {/* Price */}
                      <div className="flex items-center md:justify-between ">
                        {price ? (
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                              ${price}
                            </span>
                            <span className="hidden md:flex text-sm text-gray-500 line-through">
                              ${(price * 1.3).toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg text-gray-600 dark:text-gray-400">
                            Consultar precio
                          </span>
                        )}

                        <Badge
                          variant="secondary"
                          className="hidden md:flex bg-green-100 text-green-800"
                        >
                          Disponible
                        </Badge>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200 px-2 py-1 rounded-full">
                          🌿 Natural
                        </span>
                        <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full">
                          ✋ Artesanal
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        {/* Call to Action Section */}
        <div className="text-center ">
          <Button
            onClick={() => router.push("/productos")}
            size="lg"
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-12 py-4 text-xl font-semibold rounded-full"
          >
            <Sparkles className="mr-3 w-6 h-6" />
            Ver todos los productos
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsShowcase;
