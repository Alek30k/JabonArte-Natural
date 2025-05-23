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
  return <div>page product</div>;
}
