"use client";

import { useEffect, useState } from "react";

export function useGetProducts() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*`
        );
        const json = await res.json();

        if (res.ok) {
          setResult(json.data);
        } else {
          setError("Error al cargar los productos");
        }
      } catch (error: unknown) {
        // Cambiado 'any' a 'unknown'
        // Verificamos si el error es una instancia de Error antes de acceder a 'message'
        if (error instanceof Error) {
          setError(error.message);
        } else {
          // Manejar otros tipos de errores si es necesario, o establecer un mensaje genérico
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { result, loading, error };
}
