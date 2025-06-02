"use client";

import type React from "react";
import { useEffect, useState } from "react";

interface SafeClientComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  componentName?: string;
  delay?: number; // Delay opcional para evitar flashes
}

export default function SafeClientComponent({
  children,
  fallback,
  componentName,
  delay = 0,
}: SafeClientComponentProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [hasHydrationError, setHasHydrationError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, delay);

    // Detectar errores de hidratación específicos
    const handleError = (event: ErrorEvent) => {
      if (
        event.message.includes("hydration") ||
        event.message.includes("mismatch")
      ) {
        console.error(`🚨 Hydration error in ${componentName}:`, event.message);
        setHasHydrationError(true);
      }
    };

    window.addEventListener("error", handleError);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("error", handleError);
    };
  }, [componentName, delay]);

  // Mostrar fallback durante la hidratación
  if (!isMounted) {
    return <>{fallback || null}</>;
  }

  // Mostrar error si hay problemas de hidratación
  if (hasHydrationError && process.env.NODE_ENV === "development") {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-800">
          Error de hidratación detectado en: {componentName}
        </p>
        <details className="mt-2">
          <summary className="cursor-pointer text-sm text-red-600">
            Ver detalles
          </summary>
          <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-auto">
            Componente: {componentName}
            {"\n"}
            Error: Diferencias entre servidor y cliente
            {"\n"}
            Posibles causas: Extensiones del navegador, contenido dinámico
          </pre>
        </details>
      </div>
    );
  }

  return <>{children}</>;
}
