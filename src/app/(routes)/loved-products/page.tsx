"use client";

import { UseLovedProducts } from "@/hooks/UseLovedProducts";
import LovedItemProduct from "./components/lovedItemProduct";
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const PageSimple = () => {
  const { lovedItems } = UseLovedProducts();
  const router = useRouter();

  return (
    <div className="max-w-4xl py-8 mx-auto px-4 sm:py-16 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        <div className="flex items-center gap-3 mb-2">
          <Heart className="text-red-500 fill-red-500" size={28} />
          <h1 className="text-2xl sm:text-3xl font-bold">
            Productos que te gustan
          </h1>
        </div>
        <p className="text-gray-600">
          {lovedItems.length}{" "}
          {lovedItems.length === 1 ? "producto" : "productos"} en tu lista de
          favoritos
        </p>
      </div>

      {/* Contenido */}
      <div className="rounded-lg shadow-sm ">
        {lovedItems.length === 0 ? (
          /* Estado vacío */
          <div className="text-center py-12 px-6">
            <Heart size={48} className="text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No hay productos en favoritos
            </h2>
            <p className="text-gray-600 mb-6">
              Explora nuestros productos y añade los que más te gusten.
            </p>
            <Button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 mx-auto"
            >
              <ShoppingBag size={16} />
              Explorar productos
            </Button>
          </div>
        ) : (
          /* Lista de productos */
          <ul className="divide-y divide-gray-200">
            {lovedItems.map((item) => (
              <LovedItemProduct key={item.id} product={item} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PageSimple;
