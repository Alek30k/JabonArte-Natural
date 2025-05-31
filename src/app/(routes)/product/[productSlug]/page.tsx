"use client";

import { useGetProductBySlug } from "@/api/getProductBySlug";
import type { ProductType } from "@/types/product";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  Truck,
  RotateCcw,
  Heart,
  Share2,
  ChevronRight,
  Leaf,
  Award,
} from "lucide-react";
import SkeletonProduct from "./components/SkeletonProduct";
import CarouselProduct from "./components/CarouselProduct";
import InfoProduct from "./components/InfoProduct";
import RelatedProducts from "./components/RelatedProducts";

export default function ProductPage() {
  const params = useParams();
  const productSlug = params.productSlug as string;
  const [isVisible, setIsVisible] = useState(false);

  // Tipado explícito para el hook
  const {
    result,
    loading,
  }: { result: ProductType[] | null; loading: boolean } =
    useGetProductBySlug(productSlug);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (loading) {
    return <SkeletonProduct />;
  }

  // Verificación de que result existe y tiene productos
  if (!result || !Array.isArray(result) || result.length === 0) {
    return <SkeletonProduct />;
  }

  const product: ProductType = result[0];

  // Verificación adicional de que el producto tiene la estructura esperada
  if (!product || !product.id || !product.productName) {
    return <SkeletonProduct />;
  }

  const guarantees = [
    {
      icon: <Truck className="w-5 h-5" />,
      title: "Envío Gratis",
      description: "En compras +$75.000",
    },
    // {
    //   icon: <RotateCcw className="w-5 h-5" />,
    //   title: "Devolución Fácil",
    //   description: "30 días para devolver",
    // },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Compra Segura",
      description: "Pago 100% protegido",
    },
  ];

  return (
    <div
      className={`min-h-screen overflow-hidden transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/productos">Productos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4 min-w-0">
            <CarouselProduct images={product.images ?? []} />

            {/* Product Badges */}
            {product && (
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-full">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200 text-xs sm:text-sm">
                  <Leaf className="w-3 h-3 mr-1 flex-shrink-0" />
                  100% Natural
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs sm:text-sm">
                  <Award className="w-3 h-3 mr-1 flex-shrink-0" />
                  Artesanal
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 text-xs sm:text-sm">
                  <Shield className="w-3 h-3 mr-1 flex-shrink-0" />
                  Libre de Químicos
                </Badge>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <InfoProduct product={product} />

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {guarantees.map((guarantee, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 sm:space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg min-w-0"
                >
                  <div className="text-green-600 flex-shrink-0">
                    {guarantee.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-xs sm:text-sm truncate">
                      {guarantee.title}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 truncate">
                      {guarantee.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 pt-4 border-t">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors w-full sm:w-auto">
                <Heart className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">Agregar a favoritos</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors w-full sm:w-auto">
                <Share2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">Compartir</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3 text-xs sm:text-sm">
            <TabsTrigger value="description" className="px-2 sm:px-4">
              Descripción
            </TabsTrigger>
            <TabsTrigger value="ingredients" className="px-2 sm:px-4">
              Ingredientes
            </TabsTrigger>
            <TabsTrigger value="usage" className="px-2 sm:px-4">
              Modo de Uso
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Descripción del Producto</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-x-auto">
                  <div>
                    <h4 className="font-semibold mb-3">Beneficios:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2 text-green-600" />
                        Hidrata profundamente la piel
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2 text-green-600" />
                        Aroma natural y relajante
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2 text-green-600" />
                        Libre de químicos agresivos
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2 text-green-600" />
                        Apto para pieles sensibles
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Características:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2 text-blue-600" />
                        Peso: 100g aproximadamente
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2 text-blue-600" />
                        Duración: 4-6 semanas de uso
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2 text-blue-600" />
                        pH balanceado
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2 text-blue-600" />
                        Biodegradable
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ingredients" className="mt-6">
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Ingredientes Naturales</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6">
                  <Leaf className="h-4 w-4" />
                  <AlertDescription>
                    Todos nuestros ingredientes son de origen natural y
                    orgánico, libres de químicos sintéticos.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">
                      Ingredientes Principales:
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <span className="font-medium">
                            Aceite de Oliva Extra Virgen
                          </span>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Hidrata y nutre la piel profundamente
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <span className="font-medium">Aceite de Coco</span>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Propiedades antibacterianas naturales
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <span className="font-medium">Manteca de Karité</span>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Suaviza y protege la piel
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Aceites Esenciales:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <div>
                          <span className="font-medium">Lavanda</span>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Relajante y aromático
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <div>
                          <span className="font-medium">Eucalipto</span>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Refrescante y purificante
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <div>
                          <span className="font-medium">Menta</span>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Energizante y revitalizante
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="mt-6">
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Modo de Uso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-blue-600 font-bold">1</span>
                      </div>
                      <h4 className="font-semibold mb-2">Humedecer</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Moja el jabón y tus manos con agua tibia
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-blue-600 font-bold">2</span>
                      </div>
                      <h4 className="font-semibold mb-2">Frotar</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Frota suavemente hasta crear espuma
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-blue-600 font-bold">3</span>
                      </div>
                      <h4 className="font-semibold mb-2">Enjuagar</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Enjuaga con agua y seca suavemente
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3">
                      Consejos de Conservación:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2 text-green-600" />
                        Mantén el jabón en un lugar seco entre usos
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2 text-green-600" />
                        Usa una jabonera con drenaje
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2 text-green-600" />
                        Evita la exposición directa al sol
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2 text-green-600" />
                        Almacena en lugar fresco y ventilado
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6"></TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <RelatedProducts
          category={product.category?.categoryName || ""}
          currentSlug={productSlug}
        />
      </div>
    </div>
  );
}
