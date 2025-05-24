"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RelatedProductsProps {
  currentProductId: string | number;
}

const RelatedProducts = ({ currentProductId }: RelatedProductsProps) => {
  // Datos simulados de productos relacionados
  const relatedProducts = [
    {
      id: 1,
      name: "Jabón de Lavanda",
      price: 2500,
      originalPrice: 3000,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 45,
      isNew: false,
      isOnSale: true,
    },
    {
      id: 2,
      name: "Jabón de Miel y Avena",
      price: 2800,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 67,
      isNew: true,
      isOnSale: false,
    },
    {
      id: 3,
      name: "Jabón de Coco",
      price: 2300,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      reviews: 32,
      isNew: false,
      isOnSale: false,
    },
    {
      id: 4,
      name: "Jabón de Rosas",
      price: 2700,
      originalPrice: 3200,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 58,
      isNew: false,
      isOnSale: true,
    },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Productos Relacionados
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Card
            key={product.id}
            className="group hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />

                {/* Badges */}
                <div className="absolute top-2 left-2 space-y-1">
                  {product.isNew && (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      Nuevo
                    </Badge>
                  )}
                  {product.isOnSale && (
                    <Badge className="bg-red-500 hover:bg-red-600">
                      Oferta
                    </Badge>
                  )}
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {product.name}
                </h4>

                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">
                    ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <Button asChild className="w-full" size="sm">
                  <Link href={`/product/${product.id}`}>Ver Producto</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
