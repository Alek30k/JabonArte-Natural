"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Sparkles, Gift, Clock, Leaf } from "lucide-react";
import { useState, useEffect } from "react";

const BannerDiscount = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown timer (ejemplo: 7 días desde ahora)
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const discountTiers = [
    {
      amount: "$10.000",
      discount: "10%",
      description: "En tu primera compra",
      icon: <Leaf className="w-5 h-5" />,
    },
    {
      amount: "$15.000",
      discount: "15%",
      description: "Para clientes frecuentes",
      icon: <Gift className="w-5 h-5" />,
    },
    {
      amount: "$25.000",
      discount: "20%",
      description: "Compra mayorista",
      icon: <Sparkles className="w-5 h-5" />,
    },
  ];

  return (
    <section className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/10 dark:via-emerald-900/20 dark:to-teal-900/20" />
      <div className='absolute inset-0 bg-[url(&apos;data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%2316a34a" fillOpacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&apos;)] opacity-30' />

      <div className="relative max-w-6xl mx-auto">
        {/* Main Banner Card */}
        <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-8 sm:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200 px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                Oferta por tiempo limitado
              </Badge>

              <h2 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Hasta 20% OFF
                </span>
              </h2>

              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Descubre la pureza de nuestros{" "}
                <span className="font-semibold text-green-600">
                  jabones artesanales 100% naturales
                </span>
                . Cuida tu piel con ingredientes orgánicos seleccionados
                especialmente para ti.
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="flex justify-center mb-8">
              <div className="grid grid-cols-4 gap-4 text-center">
                {[
                  { label: "Días", value: timeLeft.days },
                  { label: "Horas", value: timeLeft.hours },
                  { label: "Min", value: timeLeft.minutes },
                  { label: "Seg", value: timeLeft.seconds },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-green-600 text-white rounded-lg p-3 min-w-[60px]"
                  >
                    <div className="text-xl sm:text-2xl font-bold">
                      {item.value.toString().padStart(2, "0")}
                    </div>
                    <div className="text-xs uppercase tracking-wide">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Discount Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {discountTiers.map((tier, index) => (
                <div
                  key={index}
                  className="relative bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-700 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-green-600">
                      {tier.icon}
                      <span className="font-semibold">{tier.discount}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {tier.description}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {tier.amount}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Compra mínima
                  </div>
                  <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse text-white  flex items-center justify-center" />
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
              >
                <Link href="/productos">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Comprar Ahora
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg"
              >
                <Link href="/about">
                  <Leaf className="w-5 h-5 mr-2" />
                  Conoce Nuestros Jabones
                </Link>
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-green-200 dark:border-green-700">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center justify-center space-x-2">
                  <Leaf className="w-4 h-4 text-green-600" />
                  <span>100% Ingredientes Naturales</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Gift className="w-4 h-4 text-green-600" />
                  <span>Envío Gratis +$15.000</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="w-4 h-4 text-green-600" />
                  <span>Artesanal y Orgánico</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Floating Elements */}
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse" />
        {/* <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-emerald-200 rounded-full opacity-20 animate-pulse delay-1000" /> */}
      </div>
    </section>
  );
};

export default BannerDiscount;
