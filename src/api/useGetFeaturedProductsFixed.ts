"use client";

import { useEffect, useState } from "react";
import type { ResponseType } from "@/types/response";
import type { ProductType } from "@/types/product";

export function useGetFeaturedProductsFixed(): ResponseType {
  const [result, setResult] = useState<ProductType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        // Usar la estrategia que funciona: SIN autenticación (200 OK)
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*`;

        console.log("🔍 Fetching products (sin auth):", url);

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        console.log("📡 Response:", response.status, response.statusText);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("📦 Raw data:", data);

        // Procesar respuesta de Strapi v4
        let products: ProductType[] = [];

        if (data.data && Array.isArray(data.data)) {
          products = data.data.map((item: any) => ({
            id: item.id,
            ...item.attributes,
            images:
              item.attributes.images?.data?.map((img: any) => ({
                id: img.id,
                url: img.attributes.url,
                name: img.attributes.name,
                ...img.attributes,
              })) || [],
          }));
        }

        console.log("✅ Processed products:", products);
        setResult(products);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Error desconocido";
        setError(errorMessage);
        setResult(null);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { loading, result, error };
}
