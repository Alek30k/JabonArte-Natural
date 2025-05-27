"use client";

import { useState, useEffect } from "react";

const ApiStatusChecker = () => {
  const [apiStatus, setApiStatus] = useState<any>({});
  const [testing, setTesting] = useState(false);

  const checkApiStatus = async () => {
    setTesting(true);
    const results: any = {};

    const tests = [
      {
        name: "Productos sin auth",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
        useAuth: false,
      },
      {
        name: "Productos con auth",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
        useAuth: true,
      },
      {
        name: "Producto cacao sin auth",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=cacao&populate=*`,
        useAuth: false,
      },
      {
        name: "Producto cacao con auth",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=cacao&populate=*`,
        useAuth: true,
      },
    ];

    for (const test of tests) {
      try {
        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };

        if (test.useAuth && process.env.NEXT_PUBLIC_STRAPI_API_TOKEN) {
          headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`;
        }

        const response = await fetch(test.url, { headers });
        const data = response.ok ? await response.json() : null;

        results[test.name] = {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
          dataCount: data?.data?.length || 0,
          hasData: !!data,
        };
      } catch (error) {
        results[test.name] = {
          status: "ERROR",
          statusText: error instanceof Error ? error.message : "Unknown error",
          ok: false,
          dataCount: 0,
          hasData: false,
        };
      }
    }

    setApiStatus(results);
    setTesting(false);
  };

  useEffect(() => {
    checkApiStatus();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm">
      <h3 className="font-bold mb-2 text-sm">🔍 Estado de API</h3>

      <button
        onClick={checkApiStatus}
        disabled={testing}
        className="mb-3 w-full px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 disabled:bg-gray-400"
      >
        {testing ? "Probando..." : "🔄 Verificar API"}
      </button>

      <div className="space-y-1 text-xs">
        {Object.entries(apiStatus).map(([name, result]: [string, any]) => (
          <div
            key={name}
            className={`p-2 rounded ${
              result.ok
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            <div className="font-medium">{name}</div>
            <div>
              {result.status} - {result.statusText}
            </div>
            {result.ok && <div>📦 {result.dataCount} productos</div>}
          </div>
        ))}
      </div>

      <div className="mt-3 pt-2 border-t border-gray-200 text-xs text-gray-600">
        <p>
          <strong>Backend:</strong>{" "}
          {process.env.NEXT_PUBLIC_BACKEND_URL ? "✅" : "❌"}
        </p>
        <p>
          <strong>Token:</strong>{" "}
          {process.env.NEXT_PUBLIC_STRAPI_API_TOKEN ? "✅" : "❌"}
        </p>
      </div>
    </div>
  );
};

export default ApiStatusChecker;
