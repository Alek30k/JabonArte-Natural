"use client";

import { useEffect, useState } from "react";
import type { ResponseType } from "@/types/response";
import type { ProductType } from "@/types/product";

export function useGetProductBySlugFixed(
  slug: string | string[]
): ResponseType {
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

        console.log("🔍 Buscando producto con slug:", slugString);
        console.log("🌍 Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
        console.log(
          "🔑 Token disponible:",
          !!process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
        );

        // Estrategia 1: SIN autenticación (la que funcionaba antes)
        const urlWithoutAuth = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=${slugString}&populate=*`;

        console.log("🔄 Probando SIN autenticación:", urlWithoutAuth);

        const responseWithoutAuth = await fetch(urlWithoutAuth, {
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        console.log(
          "📡 Respuesta sin auth:",
          responseWithoutAuth.status,
          responseWithoutAuth.statusText
        );

        if (responseWithoutAuth.ok) {
          const data = await responseWithoutAuth.json();
          console.log("✅ Datos obtenidos sin auth:", data);

          // Procesar la respuesta de Strapi
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

          console.log("✅ Productos procesados:", products);
          setResult(products);
          setLoading(false);
          return;
        }

        // Estrategia 2: CON autenticación (si la primera falla)
        if (process.env.NEXT_PUBLIC_STRAPI_API_TOKEN) {
          const urlWithAuth = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=${slugString}&populate=*`;

          console.log("🔄 Probando CON autenticación:", urlWithAuth);

          const responseWithAuth = await fetch(urlWithAuth, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            },
            cache: "no-store",
          });

          console.log(
            "📡 Respuesta con auth:",
            responseWithAuth.status,
            responseWithAuth.statusText
          );

          if (responseWithAuth.ok) {
            const data = await responseWithAuth.json();
            console.log("✅ Datos obtenidos con auth:", data);

            // Procesar la respuesta de Strapi
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

            console.log("✅ Productos procesados con auth:", products);
            setResult(products);
            setLoading(false);
            return;
          } else {
            console.error(
              "❌ Error con autenticación:",
              responseWithAuth.status,
              responseWithAuth.statusText
            );
          }
        }

        // Si ambas estrategias fallan
        throw new Error(
          `No se pudo obtener el producto. Sin auth: ${
            responseWithoutAuth.status
          }, Con auth: ${
            process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
              ? "probado"
              : "no disponible"
          }`
        );
      } catch (error) {
        console.error("❌ Error final:", error);
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
