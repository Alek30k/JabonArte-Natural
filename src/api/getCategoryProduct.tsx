import { useEffect, useState } from "react";

export function useGetCategoryProduct(slug: string | string[]) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&filters[category][slug][$eq]=${slug}`;
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
        // Changed 'any' to 'unknown'
        // Check if the error is an instance of Error before accessing 'message'
        if (error instanceof Error) {
          setError(error.message);
        } else {
          // Handle other types of errors or set a generic message
          setError("An unknown error occurred");
        }
        setLoading(false);
      }
    })();
  }, [url]);

  return { loading, result, error };
}
