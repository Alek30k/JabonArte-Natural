"use client";

import { useState } from "react";
import Image from "next/image";

const CloudinaryTestFixed = () => {
  const [testResults, setTestResults] = useState<any[]>([]);

  // URLs de prueba de Cloudinary (usando cloud names comunes)
  const testCloudinaryUrls = [
    "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    "https://res.cloudinary.com/dztl3rtlc/image/upload/sample.jpg", // Tu cloud name si existe
    "https://res.cloudinary.com/cloudinary/image/upload/sample.jpg",
  ];

  const testCloudinaryConnection = async () => {
    setTestResults([]);

    for (const url of testCloudinaryUrls) {
      try {
        const response = await fetch(url, { method: "HEAD" });
        setTestResults((prev) => [
          ...prev,
          {
            url,
            status: response.status,
            ok: response.ok,
            cloudName: url.split("/")[3],
          },
        ]);
      } catch (error) {
        setTestResults((prev) => [
          ...prev,
          {
            url,
            status: "Error",
            ok: false,
            cloudName: url.split("/")[3],
            error: error instanceof Error ? error.message : "Unknown error",
          },
        ]);
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">☁️ Test de Cloudinary</h2>

      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-bold text-yellow-800 mb-2">
          ⚠️ Variable faltante:
        </h3>
        <p className="text-yellow-700 text-sm">
          <strong>NEXT_PUBLIC_CLOUDINARY_NAME</strong> no está definida. Esto es
          necesario para las imágenes de Cloudinary.
        </p>
      </div>

      <button
        onClick={testCloudinaryConnection}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        🧪 Probar conexiones a Cloudinary
      </button>

      {testResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Resultados:</h3>
          {testResults.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                result.ok
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">
                    Cloud Name: {result.cloudName}
                  </h4>
                  <p className="text-sm text-gray-600">{result.url}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    result.ok
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {result.status}
                </span>
              </div>

              {result.ok && (
                <div className="mt-3">
                  <p className="text-sm text-green-600 mb-2">
                    ✅ Cloudinary accesible - Probando imagen:
                  </p>
                  <div className="relative w-32 h-32 bg-gray-100 rounded">
                    <Image
                      src={result.url || "/placeholder.svg"}
                      alt="Test Cloudinary"
                      fill
                      className="object-cover rounded"
                      onLoad={() =>
                        console.log("✅ Imagen de Cloudinary cargada")
                      }
                      onError={() =>
                        console.log("❌ Error cargando imagen de Cloudinary")
                      }
                    />
                  </div>
                </div>
              )}

              {result.error && (
                <p className="text-sm text-red-600 mt-2">
                  Error: {result.error}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-bold text-blue-800 mb-3">📋 Próximos pasos:</h3>
        <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside">
          <li>
            <strong>Agregar variable faltante:</strong>{" "}
            NEXT_PUBLIC_CLOUDINARY_NAME en Vercel
          </li>
          <li>
            <strong>Obtener tu Cloud Name:</strong> Ve a tu dashboard de
            Cloudinary
          </li>
          <li>
            <strong>Configurar Strapi:</strong> Asegurar que use Cloudinary para
            nuevas imágenes
          </li>
          <li>
            <strong>Re-subir imágenes:</strong> Las imágenes locales perdidas
            necesitan re-subirse
          </li>
        </ol>
      </div>
    </div>
  );
};

export default CloudinaryTestFixed;
