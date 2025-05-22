"use client";

import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const categorySlug = params.categorySlug as string
  const {result loading, error} :ResponseType = useGetCategoryProduct(categorySlug)


  console.log(result);

   if (loading) return <div className="p-8 text-center">Cargando productos...</div>
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>
  if (!result || result.length === 0) return <div className="p-8 text-center">No hay productos en esta categoría</div>

  return <>From page category</>;
}
