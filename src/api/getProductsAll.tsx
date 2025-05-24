"use client";

import { useEffect, useState } from "react";

export function useGetAllProducts() {
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
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { result, loading, error };
}
