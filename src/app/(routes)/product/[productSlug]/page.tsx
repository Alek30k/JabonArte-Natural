"use client";

import { useGetProductBySlug } from "@/api/getProductBySlug";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation";
import SkeletonProduct from "./components/SkeletonProduct";

export default function Page() {
  const params = useParams();
  const { productSlug } = params;

  const { result }: ResponseType = useGetProductBySlug(productSlug);

  if (result === null) {
    return <SkeletonProduct />;
  }
  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
      <div className="grid sm:grid-cols-2">
        <div className="">
          <p>Carousel Product</p>
        </div>
        <div className="sm:px-12">
          <p>Info del producto</p>
        </div>
      </div>
    </div>
  );
}
