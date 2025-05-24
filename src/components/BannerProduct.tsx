"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import {
  Sparkles,
  Heart,
  Leaf,
  Gift,
  Star,
  ArrowRight,
  CheckCircle,
  Users,
  Award,
} from "lucide-react";
import { useState } from "react";

const BannerProduct = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "100% Natural",
      description: "Ingredientes orgánicos seleccionados",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Hecho con Amor",
      description: "Cada jabón es único y artesanal",
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Personalizable",
      description: "Colores y aromas a tu elección",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Para Eventos",
      description: "Bodas, bautismos y empresariales",
    },
  ];

  const benefits = [
    "Ingredientes 100% naturales y orgánicos",
    "Personalización completa de colores y aromas",
    "Ideal para regalos empresariales y eventos",
    "Proceso artesanal con técnicas tradicionales",
    "Packaging ecológico y sostenible",
    "Entrega en toda Argentina",
  ];

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-900/10 dark:via-green-900/10 dark:to-teal-900/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Section */}
          <div className="order-2 lg:order-1">
            {/* Header */}
            <div className="mb-8">
              <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Experiencia Única
              </Badge>

              <h2 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  JabónArte
                </span>
                <br />
                <span className="text-gray-800 dark:text-gray-200">
                  Natural
                </span>
              </h2>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Sumérgete en una experiencia única con nuestros{" "}
                <span className="font-semibold text-green-600">
                  jabones artesanales personalizados
                </span>
                . Perfectos para regalos empresariales, bodas, bautismos y
                eventos especiales.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Natural
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">500+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Eventos
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">5★</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Calidad
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    activeFeature === index
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <CardContent className="p-4">
                    <div
                      className={`mb-2 ${
                        activeFeature === index
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Benefits List */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                ¿Por qué elegir JabónArte Natural?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Link href="/servicios/personalizados">
                  <Gift className="w-5 h-5 mr-2" />
                  Conoce Nuestro Servicio
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                <Link href="/contacto">
                  <Heart className="w-5 h-5 mr-2" />
                  Solicitar Cotización
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-green-600" />
                  <span>Certificado Orgánico</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="ml-1">4.9/5 (127 reseñas)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Main Image */}
              <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/slider.png"
                  alt="Jabones artesanales naturales personalizados"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Floating Badge */}
                <div className="absolute top-6 left-6">
                  <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                    <Leaf className="w-3 h-3 mr-1" />
                    100% Natural
                  </Badge>
                </div>

                {/* Bottom Info Card */}
                <div className="absolute bottom-6 left-6 right-6">
                  <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-semibold text-gray-900 dark:text-white">
                            Jabones Personalizados
                          </h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Desde $2.500 por unidad
                          </p>
                        </div>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Ver Más
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-emerald-200 rounded-full opacity-20 animate-pulse delay-1000" />

              {/* Small Gallery */}
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-white rounded-lg shadow-lg p-2">
                    <div className="w-full h-full bg-green-100 rounded flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="w-20 h-20 bg-white rounded-lg shadow-lg p-2">
                    <div className="w-full h-full bg-pink-100 rounded flex items-center justify-center">
                      <Heart className="w-6 h-6 text-pink-600" />
                    </div>
                  </div>
                  <div className="w-20 h-20 bg-white rounded-lg shadow-lg p-2">
                    <div className="w-full h-full bg-blue-100 rounded flex items-center justify-center">
                      <Gift className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerProduct;
