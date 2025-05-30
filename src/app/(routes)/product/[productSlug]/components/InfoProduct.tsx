"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UseCart } from "@/hooks/UseCart";
import { UseLovedProducts } from "@/hooks/UseLovedProducts";
import { formatPrice } from "@/lib/formatPrice";
import type { ProductType } from "@/types/product";
import { Heart } from "lucide-react";
import { useState } from "react";

export type InfoProductProps = {
  product: ProductType;
};

const InfoProductAnimated = (props: InfoProductProps) => {
  const { product } = props;
  const { addItem } = UseCart();
  const { addLovedItem, removeLovedItem, lovedItems } = UseLovedProducts();
  const [isAnimating, setIsAnimating] = useState(false);

  const isLoved = lovedItems.some((item) => item.id === product.id);

  const toggleLoved = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (isLoved) {
      removeLovedItem(product.id);
    } else {
      addLovedItem(product);
    }
  };

  return (
    <div className="px-6 mt-20">
      <div className="justify-between mb-3 sm:flex">
        <h1 className="text-4xl font-bold">{product.productName}</h1>
        <div className="flex items-center justify-between gap-3">
          <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
            {product.taste}
          </p>
          <p className="px-2 py-1 text-xs text-white bg-yellow-900 rounded-full w-fit">
            {product.origin}
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <p className="font-semibold ">Lo que tenés que saber de este producto</p>
      <br />
      <p>{product.features}</p>
      <Separator className="my-4" />
      <p className="my-4 text-2xl">{formatPrice(product.price)}</p>
      <div className="flex items-center gap-3">
        <Button
          className="flex-1 cursor-pointer"
          onClick={() => addItem(product)}
        >
          AGREGAR AL CARRITO{" "}
        </Button>
        <div className="flex-shrink-0">
          <Heart
            width={30}
            height={30}
            strokeWidth={1}
            className={`transition-all duration-300 cursor-pointer transform ${
              isAnimating ? "scale-125" : "scale-100"
            } ${
              isLoved
                ? "fill-red-500 text-red-500 hover:fill-red-600 hover:text-red-600"
                : "text-gray-400 hover:fill-red-500 hover:text-red-500"
            }`}
            onClick={toggleLoved}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoProductAnimated;
