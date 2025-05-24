"use client";

import { useGetProductBySlug } from "@/api/getProductBySlug";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Star,
  Shield,
  Truck,
  RotateCcw,
  Heart,
  Share2,
  ChevronRight,
  Leaf,
  Award,
  Users,
} from "lucide-react";
import SkeletonProduct from "./components/SkeletonProduct";
import CarouselProduct from "./components/CarouselProduct";
import InfoProduct from "./components/InfoProduct";
import RelatedProducts from "./components/RelatedProducts";
import ProductReviews from "./components/ProductReviews";
import ProductFAQ from "./components/ProductFAQ";

export default function ProductPage() {
  const params = useParams();
  const { productSlug } = params;
  const [isVisible, setIsVisible] = useState(false);

  const { result, loading }: ResponseType = useGetProductBySlug(productSlug);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (loading || result === null) {
    return <SkeletonProduct />;
  }

  const product = result[0];

  // Datos simulados para mejorar la experiencia
  const productFeatures = [
    {
      icon: <Leaf className="w-5 h-5 text-green-600" />,
      title: "100% Natural",
      description: "Ingredientes orgánicos certificados",
    },
    {
      icon: <Award className="w-5 h-5 text-blue-600" />,
      title: "Artesanal",
      description: "Hecho a mano con técnicas tradicionales",
    },
    {
      icon: <Shield className="w-5 h-5 text-purple-600" />,
      title: "Libre de Químicos",
      description: "Sin parabenos ni sulfatos",
    },
    {
      icon: <Users className="w-5 h-5 text-orange-600" />,
      title: "Para Toda la Familia",
      description: "Apto para pieles sensibles",
    },
  ];

  const guarantees = [
    {
      icon: <Truck className="w-5 h-5" />,
      title: "Envío Gratis",
      description: "En compras +$15.000",
    },
    {
      icon: <RotateCcw className="w-5 h-5" />,
      title: "Devolución Fácil",
      description: "30 días para devolver",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Compra Segura",
      description: "Pago 100% protegido",
    },
  ];

  return (
    <div
      className={`transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
            <BreadcrumbItem>
              <BreadcrumbPage>{product.productName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <CarouselProduct images={product.images} />

            {/* Product Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                <Leaf className="w-3 h-3 mr-1" />
                100% Natural
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                <Award className="w-3 h-3 mr-1" />
                Artesanal
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                <Shield className="w-3 h-3 mr-1" />
                Libre de Químicos
              </Badge>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <InfoProduct product={product} />

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {guarantees.map((guarantee, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="text-green-600">{guarantee.icon}</div>
                  <div>
                    <div className="font-medium text-sm">{guarantee.title}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {guarantee.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Actions */}
            <div className="flex items-center space-x-4 pt-4 border-t">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="text-sm">Agregar a favoritos</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                <Share2 className="w-5 h-5" />
                <span className="text-sm">Compartir</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Features */}
      {/* <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              ¿Por qué elegir nuestros jabones?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Cada jabón está cuidadosamente elaborado con los mejores
              ingredientes naturales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productFeatures.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div> */}

      {/* Product Details Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Descripción</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredientes</TabsTrigger>
            <TabsTrigger value="usage">Modo de Uso</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Descripción del Producto</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {product.description ||
                    "Nuestro jabón artesanal está elaborado con ingredientes 100% naturales, cuidadosamente seleccionados para brindar una experiencia única de limpieza y cuidado. Cada barra es hecha a mano siguiendo técnicas tradicionales que preservan las propiedades beneficiosas de cada ingrediente."}
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <Card>
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
            <Card>
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

          <TabsContent value="reviews" className="mt-6">
            <ProductReviews productId={product.id} />
          </TabsContent>
        </Tabs>
      </div>

      {/* FAQ Section */}
      {/* <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductFAQ />
        </div>
      </div> */}

      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <RelatedProducts currentProductId={product.id} />
      </div>
    </div>
  );
}
