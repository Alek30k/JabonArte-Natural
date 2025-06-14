"use client";

import { UseCart } from "@/hooks/UseCart";
import type { ProductType } from "@/types/product";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { formatPrice } from "@/lib/formatPrice";
import { getBlurDataUrl, getImageUrl } from "@/utils/imagenUtils";

interface CartItemProps {
  product: ProductType;
}

const CartItemsComplete = (props: CartItemProps) => {
  const { product } = props;
  const router = useRouter();
  const { removeItem, addItem, updateItemQuantity } = UseCart();
  const [quantity, setQuantity] = useState(product.quantity || 1);

  const imageUrl = product.images?.[0]?.url
    ? getImageUrl(product.images[0].url, 128, 128)
    : "/placeholder.svg?height=128&width=128";
  const blurDataUrl = product.images?.[0]?.url
    ? getBlurDataUrl(product.images[0].url)
    : "/placeholder.svg";

  useEffect(() => {
    updateItemQuantity(product.id, quantity);
  }, [quantity, product.id, updateItemQuantity]);

  const handleIncrement = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      updateItemQuantity(product.id, newQuantity);
      addItem({ ...product, quantity: 1 });
      return newQuantity;
    });
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => {
        const newQuantity = prev - 1;
        updateItemQuantity(product.id, newQuantity);
        return newQuantity;
      });
    }
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  const totalPrice = product.price * quantity;

  return (
    <li className="flex flex-col sm:flex-row py-4 sm:py-6 border-b w-full">
      <div className="flex items-start gap-3 sm:gap-0 w-full sm:w-auto">
        <div
          className="cursor-pointer flex-shrink-0"
          onClick={() => router.push(`/product/${product.slug}`)}
        >
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 overflow-hidden rounded-md bg-gray-100 shadow-sm">
            {product.images && product.images.length > 0 ? (
              <Image
                src={imageUrl}
                alt={product.productName || "Producto"}
                width={128}
                height={128}
                className="object-cover hover:scale-105 transition-transform duration-200"
                sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 128px"
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
        <div className="flex-1 min-w-0 sm:hidden">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors line-clamp-2 pr-2">
              {product.productName}
            </h2>
            <button
              onClick={handleRemove}
              className="text-gray-400 hover:text-red-500 transition-colors p-1 flex-shrink-0"
              aria-label="Eliminar producto"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex flex-wrap gap-1 mb-3">
            {product.origin && (
              <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                {product.origin}
              </span>
            )}
          </div>
          <div className="flex flex-col items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Cantidad:
              </span>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={handleDecrement}
                  className="p-1.5 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  <Minus size={14} />
                </button>
                <span className="px-2 py-1 text-sm font-medium min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="p-1.5 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
            <div className="flex pt-6 items-center w-full justify-between text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400">Total:</p>
              <p className="text-lg font-bold text-gray-900 dark:text-green-400">
                ${totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:flex justify-between flex-1 px-4 md:px-6 min-w-0">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors truncate">
            {product.productName}
          </h2>
          <p className="text-xl font-semibold text-green-600 mt-1">
            {formatPrice(product.price)}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {product.origin && (
              <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                {product.origin}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Cantidad:
            </span>
            <div className="flex items-center border rounded-md">
              <button
                onClick={handleDecrement}
                className="p-1 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="px-3 py-1 text-sm font-medium min-w-[2.5rem] text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="p-1 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end ml-4">
          <button
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            aria-label="Eliminar producto"
          >
            <X size={20} />
          </button>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total:</p>
            <p className="text-xl font-bold text-gray-900 dark:text-green-400">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItemsComplete;
