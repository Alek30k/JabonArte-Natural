"use client";

import { useEffect, useState } from "react";
import type { ResponseType } from "@/types/response";
import type { ProductType } from "@/types/product";

export function useGetProductBySlugSafe(slug: string | string[]): ResponseType {
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

        console.log("🔍 Fetching product:", url);

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
        console.log("📦 RAW API Response:", JSON.stringify(data, null, 2));

        // Validar estructura básica
        if (!data || !data.data || !Array.isArray(data.data)) {
          throw new Error("Estructura de datos inválida de la API");
        }

        console.log(`🔧 Procesando ${data.data.length} productos`);

        const products: ProductType[] = [];

        for (let i = 0; i < data.data.length; i++) {
          const item = data.data[i];
          console.log(
            `🔧 Procesando producto ${i + 1}:`,
            JSON.stringify(item, null, 2)
          );

          // Validar que el item tiene la estructura esperada
          if (!item || typeof item !== "object") {
            console.error(`❌ Item ${i + 1} no es un objeto válido:`, item);
            continue;
          }

          if (!item.attributes || typeof item.attributes !== "object") {
            console.error(
              `❌ Item ${i + 1} no tiene attributes válidos:`,
              item
            );
            continue;
          }

          console.log(`✅ Item ${i + 1} tiene estructura válida`);

          // Procesar imágenes de forma segura
          let processedImages: any[] = [];

          try {
            const imagesData = item.attributes.images;
            console.log(
              `🖼️ Imágenes raw del producto ${i + 1}:`,
              JSON.stringify(imagesData, null, 2)
            );

            if (imagesData && typeof imagesData === "object") {
              if (imagesData.data && Array.isArray(imagesData.data)) {
                console.log(
                  `🖼️ Encontradas ${imagesData.data.length} imágenes`
                );

                processedImages = imagesData.data
                  .map((img: any, imgIndex: number) => {
                    console.log(
                      `🖼️ Procesando imagen ${imgIndex + 1}:`,
                      JSON.stringify(img, null, 2)
                    );

                    if (!img || !img.attributes) {
                      console.error(
                        `❌ Imagen ${imgIndex + 1} sin attributes:`,
                        img
                      );
                      return null;
                    }

                    const processedImage = {
                      id: img.id,
                      url: img.attributes.url,
                      name: img.attributes.name || `Imagen ${img.id}`,
                      ...img.attributes,
                    };

                    console.log(
                      `✅ Imagen ${imgIndex + 1} procesada:`,
                      processedImage
                    );
                    return processedImage;
                  })
                  .filter(Boolean);
              } else {
                console.log("⚠️ images.data no es un array o no existe");
              }
            } else {
              console.log("⚠️ No hay campo images o no es un objeto");
            }
          } catch (imageError) {
            console.error(
              `❌ Error procesando imágenes del producto ${i + 1}:`,
              imageError
            );
          }

          // Crear el producto procesado
          const processedProduct: ProductType = {
            id: item.id,
            productName: item.attributes.productName || "Producto sin nombre",
            slug: item.attributes.slug || "",
            description: item.attributes.description || "",
            price: item.attributes.price || null,
            isFeatured: item.attributes.isFeatured || false,
            images: processedImages,
            createdAt: item.attributes.createdAt || null,
            updatedAt: item.attributes.updatedAt || null,
            publishedAt: item.attributes.publishedAt || null,
          };

          console.log(
            `✅ Producto ${i + 1} completamente procesado:`,
            JSON.stringify(processedProduct, null, 2)
          );
          products.push(processedProduct);
        }

        console.log(
          "✅ Todos los productos procesados:",
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
