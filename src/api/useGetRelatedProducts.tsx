"use client";

import { useEffect, useState } from "react";
import type { ProductType } from "@/types/product";

export function useGetRelatedProducts(
  categorySlug: string | string[],
  currentSlug: string,
  currentProduct?: { taste?: string; origin?: string; price?: number }
) {
  const [result, setResult] = useState<ProductType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!categorySlug || !currentSlug) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        setLoading(true);
        setError("");

        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const allRelatedProducts: ProductType[] = [];
        const maxProducts = 4;

        // Estrategia 1: Productos de la misma categoría
        console.log("🔍 Strategy 1: Same category products");
        const categoryUrl = `${baseUrl}/api/products?populate=*&filters[category][slug][$eq]=${categorySlug}&filters[slug][$ne]=${currentSlug}&pagination[limit]=6`;

        const categoryRes = await fetch(categoryUrl);
        const categoryJson = await categoryRes.json();
        const categoryProducts = categoryJson.data || [];

        allRelatedProducts.push(...categoryProducts);
        console.log(`✅ Category products: ${categoryProducts.length}`);

        // Estrategia 2: Productos con el mismo sabor (si está disponible)
        if (currentProduct?.taste && allRelatedProducts.length < maxProducts) {
          console.log("🔍 Strategy 2: Same taste products");
          const tasteUrl = `${baseUrl}/api/products?populate=*&filters[taste][$eq]=${encodeURIComponent(
            currentProduct.taste
          )}&filters[slug][$ne]=${currentSlug}&pagination[limit]=4`;

          try {
            const tasteRes = await fetch(tasteUrl);
            const tasteJson = await tasteRes.json();
            const tasteProducts = tasteJson.data || [];

            // Agregar productos que no estén ya en la lista
            const existingIds = new Set(allRelatedProducts.map((p) => p.id));
            const newTasteProducts = tasteProducts.filter(
              (p: ProductType) => !existingIds.has(p.id)
            );

            allRelatedProducts.push(...newTasteProducts);
            console.log(`✅ Taste products added: ${newTasteProducts.length}`);
          } catch (tasteError) {
            console.warn("⚠️ Taste query failed:", tasteError);
          }
        }

        // Estrategia 3: Productos del mismo origen (si está disponible)
        if (currentProduct?.origin && allRelatedProducts.length < maxProducts) {
          console.log("🔍 Strategy 3: Same origin products");
          const originUrl = `${baseUrl}/api/products?populate=*&filters[origin][$eq]=${encodeURIComponent(
            currentProduct.origin
          )}&filters[slug][$ne]=${currentSlug}&pagination[limit]=4`;

          try {
            const originRes = await fetch(originUrl);
            const originJson = await originRes.json();
            const originProducts = originJson.data || [];

            const existingIds = new Set(allRelatedProducts.map((p) => p.id));
            const newOriginProducts = originProducts.filter(
              (p: ProductType) => !existingIds.has(p.id)
            );

            allRelatedProducts.push(...newOriginProducts);
            console.log(
              `✅ Origin products added: ${newOriginProducts.length}`
            );
          } catch (originError) {
            console.warn("⚠️ Origin query failed:", originError);
          }
        }

        // Estrategia 4: Productos en rango de precio similar (si está disponible)
        if (currentProduct?.price && allRelatedProducts.length < maxProducts) {
          console.log("🔍 Strategy 4: Similar price range products");
          const priceMin = Math.floor(currentProduct.price * 0.7); // -30%
          const priceMax = Math.ceil(currentProduct.price * 1.3); // +30%

          const priceUrl = `${baseUrl}/api/products?populate=*&filters[price][$gte]=${priceMin}&filters[price][$lte]=${priceMax}&filters[slug][$ne]=${currentSlug}&pagination[limit]=4`;

          try {
            const priceRes = await fetch(priceUrl);
            const priceJson = await priceRes.json();
            const priceProducts = priceJson.data || [];

            const existingIds = new Set(allRelatedProducts.map((p) => p.id));
            const newPriceProducts = priceProducts.filter(
              (p: ProductType) => !existingIds.has(p.id)
            );

            allRelatedProducts.push(...newPriceProducts);
            console.log(
              `✅ Price range products added: ${newPriceProducts.length}`
            );
          } catch (priceError) {
            console.warn("⚠️ Price range query failed:", priceError);
          }
        }

        // Estrategia 5: Productos populares/recientes como fallback
        if (allRelatedProducts.length < maxProducts) {
          console.log("🔍 Strategy 5: Popular/recent products fallback");
          const fallbackUrl = `${baseUrl}/api/products?populate=*&filters[slug][$ne]=${currentSlug}&sort[0]=createdAt:desc&pagination[limit]=${maxProducts}`;

          try {
            const fallbackRes = await fetch(fallbackUrl);
            const fallbackJson = await fallbackRes.json();
            const fallbackProducts = fallbackJson.data || [];

            const existingIds = new Set(allRelatedProducts.map((p) => p.id));
            const newFallbackProducts = fallbackProducts.filter(
              (p: ProductType) => !existingIds.has(p.id)
            );

            allRelatedProducts.push(...newFallbackProducts);
            console.log(
              `✅ Fallback products added: ${newFallbackProducts.length}`
            );
          } catch (fallbackError) {
            console.warn("⚠️ Fallback query failed:", fallbackError);
          }
        }

        // Algoritmo de puntuación para ordenar por relevancia
        const scoredProducts = allRelatedProducts.map((product) => {
          let score = 0;

          // Puntuación por categoría (máxima prioridad)
          if (categoryProducts.some((p) => p.id === product.id)) {
            score += 10;
          }

          // Puntuación por características similares
          if (currentProduct?.taste && product.taste === currentProduct.taste) {
            score += 5;
          }

          if (
            currentProduct?.origin &&
            product.origin === currentProduct.origin
          ) {
            score += 3;
          }

          // Puntuación por rango de precio similar
          if (currentProduct?.price && product.price) {
            const priceDiff =
              Math.abs(product.price - currentProduct.price) /
              currentProduct.price;
            if (priceDiff <= 0.3) score += 2;
          }

          return { ...product, score };
        });

        // Ordenar por puntuación y limitar a 4 productos
        const finalProducts = scoredProducts
          .sort((a, b) => (b.score || 0) - (a.score || 0))
          .slice(0, maxProducts)
          .map(({ score, ...product }) => product); // Remover el score del resultado final

        console.log(
          "✅ Final related products with scoring:",
          finalProducts.length
        );
        console.log("📊 Products breakdown:", {
          category: categoryProducts.length,
          total: allRelatedProducts.length,
          final: finalProducts.length,
        });

        setResult(finalProducts);
        setLoading(false);
      } catch (error: unknown) {
        console.error("❌ Error fetching related products:", error);

        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
        setResult([]);
        setLoading(false);
      }
    })();
  }, [categorySlug, currentSlug, currentProduct]);

  return { loading, result, error };
}
