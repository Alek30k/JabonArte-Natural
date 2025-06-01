"use client";

import type React from "react";
import { UseCart } from "@/hooks/UseCart";
import { UseLovedProducts } from "@/hooks/UseLovedProducts";
import { formatPrice } from "@/lib/formatPrice";
import type { ProductType } from "@/types/product";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, ShoppingCart, X } from "lucide-react";
import { getBlurDataUrl, getImageUrl } from "@/utils/imagenUtils";

interface LovedItemProductProps {
  product: ProductType;
}

const LovedItemProductCompact = (props: LovedItemProductProps) => {
  const { product } = props;
  const router = useRouter();
  const { removeLovedItem, removeAnddAddLovedItem } = UseLovedProducts();
  const { addItem } = UseCart();

  const imageUrl = product.images?.[0]?.url
    ? getImageUrl(product.images[0].url, 128, 128)
    : "/placeholder.svg?height=128&width=128";
  const blurDataUrl = product.images?.[0]?.url
    ? getBlurDataUrl(product.images[0].url)
    : "/placeholder.svg";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    removeAnddAddLovedItem(product.id);
  };

  const handleRemoveFromFavorites = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeLovedItem(product.id);
  };

  return (
    <li className="flex py-6 border-b">
      <div
        className="cursor-pointer"
        onClick={() => router.push(`/product/${product.slug}`)}
      >
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-md bg-gray-100 shadow-sm">
          {product.images && product.images.length > 0 ? (
            <Image
              src={imageUrl}
              alt={product.productName || "Producto"}
              width={128}
              height={128}
              className="object-cover hover:scale-105 transition-transform duration-200"
              sizes="(max-width: 640px) 96px, 128px"
              // loading="lazy"
              placeholder="blur"
              blurDataURL={blurDataUrl}
              onError={(e) => {
                console.error("❌ Error cargando imagen:", imageUrl);
                e.currentTarget.src = "/placeholder.svg?height=128&width=128";
              }}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200">
              <span className="text-xs text-gray-400">Sin imagen</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between flex-1 px-6">
        <div className="flex-1">
          <h2
            className="text-lg font-bold text-gray-900 dark:text-green-500 transition-colors cursor-pointer"
            onClick={() => router.push(`/product/${product.slug}`)}
          >
            {product.productName}
          </h2>
          <p className="text-gray-600 mt-1">{formatPrice(product.price)}</p>
          <div className="flex gap-2 mt-2">
            {product.taste && (
              <span className="px-2 py-1 text-xs bg-gray-100 dark:text-black rounded-full">
                {product.taste}
              </span>
            )}
            {product.origin && (
              <span className="px-2 py-1 text-xs dark:text-black bg-yellow-100 rounded-full">
                {product.origin}
              </span>
            )}
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1 px-3 py-1 cursor-pointer text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <ShoppingCart size={14} />
              Añadir
            </button>
            <button
              onClick={handleRemoveFromFavorites}
              className="flex items-center gap-1 px-3 py-1 cursor-pointer text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              <X size={14} />
              Quitar
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-start">
          <button
            onClick={handleRemoveFromFavorites}
            className="text-red-500 hover:text-red-600 cursor-pointer transition-colors p-1"
            aria-label="Eliminar de favoritos"
          >
            <Heart size={20} className="fill-current" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default LovedItemProductCompact;
