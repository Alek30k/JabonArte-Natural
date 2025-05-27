"use client";

// import { useGetProductBySlugFixed } from "@/api/useGetProductBySlugFixed";
import { useParams } from "next/navigation";
import { Suspense } from "react";
// import CarouselProductDebug from "@/components/CarouselProductDebug";
// import ApiStatusChecker from "@/components/ApiStatusChecker";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import { UseCart } from "@/hooks/UseCart";
import ApiStatusChecker from "./components/ApiStatusChecker";
import CarouselProductDebug from "./components/CarouselProductDebug";
import { useGetProductBySlugFixed } from "@/api/useGetProductBySlugFixed";

function ProductPageContent() {
  const params = useParams();
  const productSlug = params.productSlug as string;
  const { addItem } = UseCart();

  const { loading, result, error } = useGetProductBySlugFixed(productSlug);

  console.log("🔍 Product Page Debug:", {
    productSlug,
    loading,
    result,
    error,
    params,
  });

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <ApiStatusChecker />
        <div className="max-w-6xl mx-auto">
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">
              🔄 Cargando producto: <strong>{productSlug}</strong>
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
              <div className="h-12 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen p-8">
        <ApiStatusChecker />
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <h1 className="text-2xl font-bold text-red-800 mb-4">
              ❌ Error al cargar el producto
            </h1>
            <p className="text-red-600 mb-4">{error}</p>
            <div className="space-y-2 text-sm text-red-500 mb-6">
              <p>
                <strong>Slug buscado:</strong> {productSlug}
              </p>
              <p>
                <strong>Backend URL:</strong>{" "}
                {process.env.NEXT_PUBLIC_BACKEND_URL}
              </p>
              <p>
                <strong>Token disponible:</strong>{" "}
                {process.env.NEXT_PUBLIC_STRAPI_API_TOKEN ? "Sí" : "No"}
              </p>
            </div>

            <div className="space-y-3">
              <Button onClick={() => window.location.reload()} className="mr-2">
                🔄 Reintentar
              </Button>
              <Button onClick={() => window.history.back()} variant="outline">
                ← Volver atrás
              </Button>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded text-left">
              <h3 className="font-bold text-yellow-800 mb-2">
                🔧 Posibles soluciones:
              </h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Verificar que el producto existe en Strapi</li>
                <li>• Comprobar que la API de Strapi esté funcionando</li>
                <li>• Revisar el token de API en las variables de entorno</li>
                <li>• Verificar que el slug sea correcto</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No product found
  if (!result || result.length === 0) {
    return (
      <div className="min-h-screen p-8">
        <ApiStatusChecker />
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
            <h1 className="text-2xl font-bold text-yellow-800 mb-4">
              🔍 Producto no encontrado
            </h1>
            <p className="text-yellow-600 mb-4">
              No se encontró un producto con el identificador:{" "}
              <strong>{productSlug}</strong>
            </p>
            <Button onClick={() => window.history.back()} className="mt-4">
              ← Volver atrás
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const product = result[0];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <ApiStatusChecker />
      <div className="max-w-6xl mx-auto">
        {/* Success message */}
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-800 mb-2">
            ✅ Producto cargado exitosamente
          </h3>
          <div className="text-sm text-green-700 space-y-1">
            <p>
              <strong>ID:</strong> {product.id}
            </p>
            <p>
              <strong>Slug:</strong> {product.slug}
            </p>
            <p>
              <strong>Nombre:</strong> {product.productName}
            </p>
            <p>
              <strong>Imágenes:</strong> {product.images?.length || 0}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galería de imágenes con debug */}
          <div>
            {product.images && product.images.length > 0 ? (
              <CarouselProductDebug images={product.images} />
            ) : (
              <Card className="aspect-square bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-gray-400 block mb-2">
                    Sin imagen disponible
                  </span>
                  <span className="text-xs text-gray-500">
                    Imágenes recibidas: {JSON.stringify(product.images)}
                  </span>
                </div>
              </Card>
            )}
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.productName}
              </h1>
              {product.description && (
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge className="bg-green-500 text-white">100% Natural</Badge>
              <Badge className="bg-blue-500 text-white">Artesanal</Badge>
              {product.isFeatured && (
                <Badge className="bg-purple-500 text-white">Destacado</Badge>
              )}
            </div>

            {product.price && (
              <div className="text-2xl font-bold text-green-600">
                ${product.price}
              </div>
            )}

            <div className="space-y-4">
              <Button
                onClick={() => addItem(product)}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Agregar al carrito
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Heart className="w-4 h-4 mr-2" />
                  Favoritos
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Información del producto</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>ID:</strong> {product.id}
                  </p>
                  <p>
                    <strong>Slug:</strong> {product.slug}
                  </p>
                  {product.createdAt && (
                    <p>
                      <strong>Creado:</strong>{" "}
                      {new Date(product.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p>Cargando producto...</p>
          </div>
        </div>
      }
    >
      <ProductPageContent />
    </Suspense>
  );
}
