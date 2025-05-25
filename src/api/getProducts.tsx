import { useEffect, useState } from "react";

export function useGetCategory() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?populate=*`;
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setResult(json.data);
        setLoading(false);
      } catch (error: unknown) {
        // Cambiado 'any' a 'unknown'
        // Verificamos si el error es una instancia de Error antes de acceder a 'message'
        if (error instanceof Error) {
          setError(error.message);
        } else {
          // Manejar otros tipos de errores si es necesario, o establecer un mensaje genérico
          setError("An unknown error occurred");
        }
        setLoading(false);
      }
    })();
  }, [url]);

  return { loading, result, error };
}
