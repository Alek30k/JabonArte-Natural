"use client";

import { UseCart } from "@/hooks/UseCart";
import type { ProductType } from "@/types/product";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";

interface CartItemProps {
  product: ProductType;
}

const CartItemsComplete = (props: CartItemProps) => {
  const { product } = props;
  const router = useRouter();
  const { removeItem, addItem } = UseCart();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
    addItem(product);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      // Aquí podrías implementar una función para decrementar cantidad
    }
  };

  const totalPrice = product.price * quantity;

  return (
    <li className="flex py-6 border-b w-full max-w-full overflow-x-hidden">
      {/* Imagen del producto */}
      <div
        className="cursor-pointer"
        onClick={() => router.push(`/product/${product.slug}`)}
      >
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-md bg-gray-100 shadow-sm">
          {product.images && product.images.length > 0 ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`}
              alt={product.productName || "Producto"}
              fill
              className="object-cover hover:scale-105 transition-transform duration-200"
              sizes="(max-width: 640px) 96px, 128px"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200">
              <span className="text-xs text-gray-400">Sin imagen</span>
            </div>
          )}
        </div>
      </div>

      {/* Información del producto */}
      <div className="flex justify-between flex-1 px-6">
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
            {product.productName}
          </h2>

          <p className="text-xl font-semibold text-green-600 mt-1">
            ${product.price}
          </p>

          {/* Características del producto */}
          <div className="flex gap-2 mt-2">
            {product.taste && (
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                {product.taste}
              </span>
            )}
            {product.origin && (
              <span className="px-2 py-1 text-xs  bg-yellow-100 text-yellow-800 rounded-full">
                {product.origin}
              </span>
            )}
          </div>

          {/* Controles de cantidad */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-sm text-gray-600 dark:text-white">
              Cantidad:
            </span>
            <div className="flex items-center border rounded-md">
              <button
                onClick={handleDecrement}
                className="p-1 hover:bg-gray-100 transition-colors cursor-pointer"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="px-3 py-1 text-sm font-medium">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="p-1 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Precio total y botón eliminar */}
        <div className="flex flex-col justify-between  items-end">
          <button
            onClick={() => removeItem(product.id)}
            className="text-gray-100 cursor-pointer hover:text-red-500 transition-colors p-1"
            aria-label="Eliminar producto"
          >
            <X size={20} />
          </button>

          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-white">Total:</p>
            <p className="text-xl font-bold text-gray-900 dark:text-green-400 ">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItemsComplete;
