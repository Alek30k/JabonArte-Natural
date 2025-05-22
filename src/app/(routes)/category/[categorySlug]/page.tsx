"use client";

import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { Separator } from "@/components/ui/separator";
import { ResponseType } from "@/types/response";
import { useParams, useRouter } from "next/navigation";
import FiltersControlsCategory from "./components/FiltersControlsCategory";
import SkeletonSchema from "@/components/SkeletonSchema";
import ProductCard from "./components/ProductCard";
import { ProductType } from "@/types/product";
import { useState } from "react";

export default function Page() {
  const params = useParams();
  const categorySlug = params.categorySlug as string;
  const { result, loading, error }: ResponseType =
    useGetCategoryProduct(categorySlug);
  const [filterOrigin, setFilterOrigin] = useState("");

  const router = useRouter();

  const filteredProducts =
    result !== null &&
    !loading &&
    (filterOrigin === ""
      ? result
      : result.filter(
          (product: ProductType) => product.origin === filterOrigin
        ));

  console.log(filteredProducts);

  // if (error)
  //   return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  // if (!result || result.length === 0)
  //   return (
  //     <div className="p-8 text-center">No hay productos en esta categoría</div>
  //   );

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      {result !== null && !loading && (
        <h1 className="text-3xl font-medium">
          Café {result[0].category.categoryName}
        </h1>
      )}
      <Separator />

      <div className="sm:flex sm:justify-between">
        <FiltersControlsCategory setFilterOrigin={setFilterOrigin} />
        <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
          {loading && <SkeletonSchema grid={3} />}
          {/* {!result ||
            (result.length === 0 && (
              <div className="p-8 text-center">
                No hay productos en esta categoría
              </div>
            ))} */}
          {result !== null &&
            !loading &&
            result.map((product: ProductType) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}
