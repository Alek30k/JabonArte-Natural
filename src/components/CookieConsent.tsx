"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent is already given
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
    // Optionally initialize analytics here
    // e.g., window.gtag('consent', 'update', { analytics_storage: 'granted' });
  };

  if (!isVisible) return null;

  return (
    <Card className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-50 shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-fade-in-up">
      <CardContent className="pt-6">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Usamos cookies para mejorar tu experiencia de compra y personalizar
          contenido. Al continuar, aceptas nuestra{" "}
          <Link
            href="/privacy"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            política de privacidad
          </Link>
          .
        </p>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/privacy">Saber más</Link>
        </Button>
        <Button
          size="sm"
          onClick={handleAccept}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Aceptar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CookieConsent;
