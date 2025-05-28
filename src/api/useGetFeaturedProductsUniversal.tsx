"use client";

import { useEffect, useState } from "react";
import type { ResponseType } from "@/types/response";
import type { ProductType } from "@/types/product";

export function useGetFeaturedProductsUniversal(): ResponseType {
  const [result, setResult] = useState<ProductType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*`;

        console.log("🔍 Fetching products (Universal):", url);

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

        // Función para detectar la versión de Strapi y procesar accordingly
        const processProducts = (rawData: any): ProductType[] => {
          if (!rawData.data || !Array.isArray(rawData.data)) {
            console.log("❌ No data array found");
            return [];
          }

          return rawData.data.map((item: any, index: number) => {
            console.log(`🔧 Processing product ${index + 1}:`, item);

            // Detectar si es Strapi v4 (con attributes) o v5 (sin attributes)
            const isV4 = item.attributes !== undefined;
            const productData = isV4 ? item.attributes : item;

            console.log(`📋 Detected Strapi v${isV4 ? "4" : "5"} format`);

            // Procesar imágenes según la versión
            let processedImages: any[] = [];

            if (isV4) {
              // Strapi v4: images.data[].attributes
              processedImages =
                productData.images?.data?.map((img: any) => ({
                  id: img.id,
                  url: img.attributes.url,
                  name: img.attributes.name,
                  alternativeText: img.attributes.alternativeText,
                  caption: img.attributes.caption,
                  width: img.attributes.width,
                  height: img.attributes.height,
                  formats: img.attributes.formats,
                  hash: img.attributes.hash,
                  ext: img.attributes.ext,
                  mime: img.attributes.mime,
                  size: img.attributes.size,
                  provider: img.attributes.provider,
                  createdAt: img.attributes.createdAt,
                  updatedAt: img.attributes.updatedAt,
                })) || [];
            } else {
              // Strapi v5: images[] directamente
              processedImages =
                productData.images?.map((img: any) => ({
                  id: img.id,
                  url: img.url,
                  name: img.name,
                  alternativeText: img.alternativeText,
                  caption: img.caption,
                  width: img.width,
                  height: img.height,
                  formats: img.formats,
                  hash: img.hash,
                  ext: img.ext,
                  mime: img.mime,
                  size: img.size,
                  provider: img.provider,
                  createdAt: img.createdAt,
                  updatedAt: img.updatedAt,
                })) || [];
            }

            const processed = {
              id: item.id,
              productName: productData.productName,
              slug: productData.slug,
              description: productData.description,
              price: productData.price,
              isFeatured: productData.isFeatured,
              createdAt: productData.createdAt || item.createdAt,
              updatedAt: productData.updatedAt || item.updatedAt,
              images: processedImages,
            };

            console.log(`✅ Processed product ${index + 1}:`, processed);
            return processed;
          });
        };

        const products = processProducts(data);
        console.log("✅ All products processed:", products);

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
