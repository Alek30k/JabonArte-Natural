"use client";

import { useState, useEffect } from "react";
import type { ProductType } from "@/types/product";

interface UseGetRelatedProductsReturn {
  data: ProductType[] | null;
  isLoading: boolean;
  error: string | null;
}

export function useGetRelatedProducts(
  category: string,
  currentSlug: string
): UseGetRelatedProductsReturn {
  const [data, setData] = useState<ProductType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setData(null);
    setError(null);

    console.log(currentSlug);

    if (!category || !currentSlug) {
      return;
    }

    const fetchRelatedProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL ||
          "https://jabonarte.onrender.com";

        // Opción 1: Intentar endpoint específico de productos relacionados
        let url = `${baseUrl}/api/products/related?category=${encodeURIComponent(
          category
        )}&exclude=${encodeURIComponent(currentSlug)}&limit=4`;

        console.log("🔍 Trying related products endpoint:", url);

        let response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Si el endpoint específico no existe, usar endpoint general
        if (response.status === 404) {
          console.log(
            "⚠️ Related endpoint not found, trying general products endpoint"
          );

          // Opción 2: Usar endpoint general de productos y filtrar en el cliente
          url = `${baseUrl}/api/products`;
          response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
        }

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        let products: ProductType[] = [];

        // Manejar diferentes estructuras de respuesta
        if (result && Array.isArray(result.data)) {
          products = result.data;
        } else if (Array.isArray(result)) {
          products = result;
        } else if (
          result &&
          result.products &&
          Array.isArray(result.products)
        ) {
          products = result.products;
        } else {
          console.warn("⚠️ Unexpected API response structure:", result);
          products = [];
        }

        // Filtrar productos relacionados en el cliente
        const relatedProducts = products
          .filter((product: ProductType) => {
            // Excluir el producto actual
            if (product.category.slug === currentSlug) return false;

            // Filtrar por categoría (si existe el campo)
            if (product.category.slug && product.category.slug === category)
              return true;
            if (product.category && product.category.categoryName === category)
              return true;

            // Si no hay campo de categoría específico, usar otros criterios
            // Por ejemplo, mismo origen o características similares
            return true;
          })
          .slice(0, 4); // Limitar a 4 productos

        console.log("✅ Related products found:", relatedProducts.length);
        setData(relatedProducts);
      } catch (err) {
        console.error("❌ Error fetching related products:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [category, currentSlug]);

  return { data, isLoading, error };
}
