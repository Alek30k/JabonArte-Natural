"use client";

import { useState, useEffect } from "react";

const EnvironmentChecker = () => {
  const [envVars, setEnvVars] = useState<Record<string, string | undefined>>(
    {}
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setEnvVars({
      NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
      NEXT_PUBLIC_CLOUDINARY_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
      NEXT_PUBLIC_STRAPI_API_TOKEN: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
    });
  }, []);

  if (!isClient) {
    return <div className="p-4">Cargando verificación de variables...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        🔧 Verificación de Variables de Entorno
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {Object.entries(envVars).map(([key, value]) => (
          <div
            key={key}
            className={`p-4 rounded-lg border ${
              value
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <h3 className="font-semibold mb-2">{key}</h3>
            <div className="text-sm">
              {value ? (
                <>
                  <span className="text-green-600">✅ Definida</span>
                  <p className="text-gray-600 mt-1 font-mono text-xs">
                    {key.includes("TOKEN")
                      ? `${value.substring(0, 20)}...`
                      : value}
                  </p>
                </>
              ) : (
                <span className="text-red-600">❌ No definida</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Test de conectividad */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-bold text-blue-800 mb-3">
          🧪 Tests de Conectividad
        </h3>
        <div className="space-y-2">
          <TestButton
            label="Backend API"
            url={`${envVars.NEXT_PUBLIC_BACKEND_URL}/api/products`}
            useAuth={false}
          />
          <TestButton
            label="Backend API con Auth"
            url={`${envVars.NEXT_PUBLIC_BACKEND_URL}/api/products`}
            useAuth={true}
            token={envVars.NEXT_PUBLIC_STRAPI_API_TOKEN}
          />
          <TestButton
            label="Cloudinary"
            url={`https://res.cloudinary.com/${envVars.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/sample.jpg`}
            useAuth={false}
          />
        </div>
      </div>

      {/* Información del entorno */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-bold text-gray-800 mb-3">
          📊 Información del Entorno
        </h3>
        <div className="text-sm space-y-1">
          <p>
            <strong>Entorno:</strong> {process.env.NODE_ENV || "development"}
          </p>
          <p>
            <strong>URL actual:</strong>{" "}
            {typeof window !== "undefined" ? window.location.origin : "N/A"}
          </p>
          <p>
            <strong>User Agent:</strong>{" "}
            {typeof window !== "undefined"
              ? window.navigator.userAgent.substring(0, 50) + "..."
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

const TestButton = ({
  label,
  url,
  useAuth,
  token,
}: {
  label: string;
  url: string;
  useAuth: boolean;
  token?: string;
}) => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [result, setResult] = useState<string>("");

  const testConnection = async () => {
    if (!url) {
      setStatus("error");
      setResult("URL no definida");
      return;
    }

    setStatus("loading");
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (useAuth && token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(url, { headers, method: "HEAD" });
      if (response.ok) {
        setStatus("success");
        setResult(`${response.status} ${response.statusText}`);
      } else {
        setStatus("error");
        setResult(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setStatus("error");
      setResult(error instanceof Error ? error.message : "Error desconocido");
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded border">
      <div className="flex-1">
        <span className="font-medium">{label}</span>
        {result && (
          <p
            className={`text-xs mt-1 ${
              status === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {result}
          </p>
        )}
      </div>
      <button
        onClick={testConnection}
        disabled={status === "loading" || !url}
        className={`px-3 py-1 rounded text-sm ${
          status === "loading"
            ? "bg-gray-300 text-gray-600"
            : status === "success"
            ? "bg-green-500 text-white"
            : status === "error"
            ? "bg-red-500 text-white"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {status === "loading" ? "..." : status === "idle" ? "Probar" : status}
      </button>
    </div>
  );
};

export default EnvironmentChecker;
