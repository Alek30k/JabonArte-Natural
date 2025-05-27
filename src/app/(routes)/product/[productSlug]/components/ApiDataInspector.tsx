"use client";

import { useState } from "react";

const ApiDataInspector = () => {
  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=cacao&populate=*`;
      console.log("🔍 Fetching:", url);

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("📦 Raw data:", data);
      setApiData(data);
    } catch (error) {
      console.error("❌ Error:", error);
      setApiData({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🔍 Inspector de Datos de API</h2>

      <button
        onClick={fetchProductData}
        disabled={loading}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "🔄 Cargando..." : "📡 Obtener datos del producto cacao"}
      </button>

      {apiData && (
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold mb-2">📦 Datos RAW de la API:</h3>
            <pre className="text-xs bg-white p-3 rounded border overflow-auto max-h-96">
              {JSON.stringify(apiData, null, 2)}
            </pre>
          </div>

          {apiData.data && apiData.data[0] && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-blue-800 mb-2">
                🔍 Análisis del primer producto:
              </h3>
              <div className="text-sm space-y-2">
                <p>
                  <strong>ID:</strong> {apiData.data[0].id}
                </p>
                <p>
                  <strong>Tiene attributes:</strong>{" "}
                  {apiData.data[0].attributes ? "✅ Sí" : "❌ No"}
                </p>
                {apiData.data[0].attributes && (
                  <>
                    <p>
                      <strong>Nombre:</strong>{" "}
                      {apiData.data[0].attributes.productName || "No definido"}
                    </p>
                    <p>
                      <strong>Tiene images:</strong>{" "}
                      {apiData.data[0].attributes.images ? "✅ Sí" : "❌ No"}
                    </p>
                    {apiData.data[0].attributes.images && (
                      <>
                        <p>
                          <strong>Tipo de images:</strong>{" "}
                          {typeof apiData.data[0].attributes.images}
                        </p>
                        <p>
                          <strong>Tiene data:</strong>{" "}
                          {apiData.data[0].attributes.images.data
                            ? "✅ Sí"
                            : "❌ No"}
                        </p>
                        {apiData.data[0].attributes.images.data && (
                          <p>
                            <strong>Cantidad de imágenes:</strong>{" "}
                            {apiData.data[0].attributes.images.data.length}
                          </p>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>

              {apiData.data[0].attributes?.images && (
                <div className="mt-4">
                  <h4 className="font-bold mb-2">🖼️ Estructura de imágenes:</h4>
                  <pre className="text-xs bg-white p-3 rounded border overflow-auto max-h-32">
                    {JSON.stringify(apiData.data[0].attributes.images, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApiDataInspector;
