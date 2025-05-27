"use client";

import { useEffect, useState } from "react";
import type { ResponseType } from "@/types/response";
import type { ProductType } from "@/types/product";

export function useGetProductBySlugV5(slug: string | string[]): ResponseType {
  const [result, setResult] = useState<ProductType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!slug) {
      setError("No se proporcionó un slug de producto");
      setLoading(false);
      return;
    }

    const slugString = Array.isArray(slug) ? slug[0] : slug;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=${slugString}&populate=*`;

        console.log("🔍 Fetching product (Strapi v5):", url);

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("📦 RAW API Response (v5):", JSON.stringify(data, null, 2));

        if (!data || !data.data || !Array.isArray(data.data)) {
          throw new Error("Estructura de datos inválida de la API");
        }

        console.log(`🔧 Procesando ${data.data.length} productos (Strapi v5)`);

        const products: ProductType[] = data.data.map((item: any) => {
          console.log(
            "🔧 Procesando producto v5:",
            JSON.stringify(item, null, 2)
          );

          // En Strapi v5, los datos están directamente en el item (sin attributes wrapper)
          let processedImages: any[] = [];

          if (item.images && Array.isArray(item.images)) {
            console.log(`🖼️ Encontradas ${item.images.length} imágenes (v5)`);

            processedImages = item.images.map((img: any) => {
              console.log(
                "🖼️ Procesando imagen v5:",
                JSON.stringify(img, null, 2)
              );

              return {
                id: img.id,
                url: img.url, // Directamente img.url (no img.attributes.url)
                name: img.name || `Imagen ${img.id}`,
                width: img.width,
                height: img.height,
                formats: img.formats,
                ...img,
              };
            });
          } else {
            console.log("⚠️ No hay imágenes o no es un array");
          }

          const processedProduct: ProductType = {
            id: item.id,
            productName: item.productName || "Producto sin nombre",
            slug: item.slug || "",
            description: item.description || "",
            price: item.price || null,
            isFeatured: item.isFeatured || false,
            images: processedImages,
            createdAt: item.createdAt || null,
            updatedAt: item.updatedAt || null,
            publishedAt: item.publishedAt || null,
            // Campos adicionales de Strapi v5
            documentId: item.documentId,
            active: item.active,
            origin: item.origin,
            taste: item.taste,
            features: item.features,
            category: item.category,
          };

          console.log(
            "✅ Producto v5 procesado:",
            JSON.stringify(processedProduct, null, 2)
          );
          return processedProduct;
        });

        console.log(
          "✅ Todos los productos v5 procesados:",
          JSON.stringify(products, null, 2)
        );
        setResult(products);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error completo:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Error desconocido";
        setError(errorMessage);
        setResult(null);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  return { loading, result, error };
}
