"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const ProductionImageTest = () => {
  const [testImages, setTestImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestImages = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*`
        );
        const data = await response.json();

        if (data.data && data.data.length > 0) {
          const imagesWithUrls = data.data
            .slice(0, 5) // Solo los primeros 5 productos
            .map((product: any) => ({
              id: product.id,
              name: product.attributes.productName,
              images: product.attributes.images?.data || [],
            }))
            .filter((product: any) => product.images.length > 0);

          setTestImages(imagesWithUrls);
        }
      } catch (error) {
        console.error("Error fetching test images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestImages();
  }, []);

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return "/placeholder.svg?height=200&width=200";

    // Si ya es una URL completa (Cloudinary o externa)
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }

    // Si es una URL relativa, construir la URL completa
    if (imageUrl.startsWith("/uploads/")) {
      return `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`;
    }

    // Si no empieza con /, agregar /uploads/
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${imageUrl}`;
  };

  if (loading) {
    return <div className="p-6">Cargando test de imágenes...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        📱 Test de Imágenes en Producción
      </h2>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-bold mb-2">Información del dispositivo:</h3>
        <div className="text-sm space-y-1">
          <p>
            <strong>User Agent:</strong>{" "}
            {typeof window !== "undefined"
              ? window.navigator.userAgent.substring(0, 100) + "..."
              : "N/A"}
          </p>
          <p>
            <strong>Ancho de pantalla:</strong>{" "}
            {typeof window !== "undefined" ? window.innerWidth : "N/A"}px
          </p>
          <p>
            <strong>Es móvil:</strong>{" "}
            {typeof window !== "undefined"
              ? window.innerWidth < 768
                ? "Sí"
                : "No"
              : "N/A"}
          </p>
        </div>
      </div>

      {testImages.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">
            No se encontraron productos con imágenes para probar
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testImages.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 rounded-lg p-4"
            >
              <h3 className="font-bold mb-3 text-sm">{product.name}</h3>

              <div className="space-y-3">
                {product.images.slice(0, 2).map((image: any, index: number) => {
                  const originalUrl = image.attributes.url;
                  const processedUrl = getImageUrl(originalUrl);

                  return (
                    <div key={image.id} className="space-y-2">
                      <div className="text-xs text-gray-600">
                        <p>
                          <strong>Original:</strong> {originalUrl}
                        </p>
                        <p>
                          <strong>Procesada:</strong> {processedUrl}
                        </p>
                      </div>

                      <div className="relative w-full h-32 bg-gray-100 rounded border">
                        <Image
                          src={processedUrl || "/placeholder.svg"}
                          alt={`${product.name} - Imagen ${index + 1}`}
                          fill
                          className="object-cover rounded"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onLoad={() => {
                            console.log(`✅ Imagen cargada: ${processedUrl}`);
                          }}
                          onError={(e) => {
                            console.error(`❌ Error cargando: ${processedUrl}`);
                            e.currentTarget.src =
                              "/placeholder.svg?height=200&width=200";
                          }}
                        />

                        {/* Indicador de estado */}
                        <div className="absolute top-1 right-1">
                          {originalUrl.includes("cloudinary.com") ? (
                            <span className="bg-green-500 text-white text-xs px-1 rounded">
                              ☁️
                            </span>
                          ) : (
                            <span className="bg-yellow-500 text-white text-xs px-1 rounded">
                              🖥️
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-bold text-yellow-800 mb-2">
          📋 Checklist para móviles:
        </h3>
        <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
          <li>✅ Variables de entorno configuradas en Vercel</li>
          <li>🔄 Verificar que las imágenes cargan correctamente</li>
          <li>📱 Probar en diferentes dispositivos móviles</li>
          <li>🌐 Verificar conectividad de red en móvil</li>
          <li>🔍 Revisar logs de consola en móvil</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductionImageTest;
