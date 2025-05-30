"use client";

import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Filter,
  X,
  RotateCcw,
  Sparkles,
  Grid3X3,
  Package,
  MapPin,
} from "lucide-react";
import type { ProductType } from "@/types/product";

type FilterProps = {
  setFilterOrigin: (origin: string) => void;
  activeFilters?: string[];
  onClearFilters?: () => void;
  productCount?: number;
  loading?: boolean;
  products?: ProductType[]; // Agregamos los productos para extraer los origins
};

const FiltersControlsCategory = ({
  setFilterOrigin,

  onClearFilters,
  loading = false,
  products = [],
}: FilterProps) => {
  const [selectedOrigin, setSelectedOrigin] = useState<string>("");

  // Extraer origins únicos de los productos de la base de datos
  const availableOrigins = useMemo(() => {
    if (!products || products.length === 0) return [];

    // Obtener todos los origins únicos que son strings
    const uniqueOrigins = [
      ...new Set(
        products
          .map((product) => product.origin)
          .filter((origin): origin is string => typeof origin === "string")
      ),
    ];

    // Contar productos por origin
    const originsWithCount = uniqueOrigins.map((origin) => {
      // Asegurarse de que product.origin es un string antes de comparar
      const count = products.filter(
        (product) =>
          typeof product.origin === "string" && product.origin === origin
      ).length;
      return {
        id: origin.toLowerCase().replace(/\s+/g, "-"), // ID para el form
        name: origin,
        count: count,
        description: `${count} producto${count !== 1 ? "s" : ""} disponible${
          count !== 1 ? "s" : ""
        }`,
      };
    });

    // Ordenar por nombre
    return originsWithCount.sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  // Función para obtener el color basado en el nombre del origin
  const getOriginStyle = (originName: string) => {
    const name = originName.toLowerCase();

    // Asignar colores basados en palabras clave comunes
    if (
      name.includes("infantil") ||
      name.includes("bebé") ||
      name.includes("niño")
    ) {
      return {
        color: "bg-pink-100 text-pink-700 border-pink-200",
        hoverColor: "hover:bg-pink-50",
        iconColor: "text-pink-600",
      };
    } else if (
      name.includes("corporal") ||
      name.includes("cuerpo") ||
      name.includes("baño")
    ) {
      return {
        color: "bg-blue-100 text-blue-700 border-blue-200",
        hoverColor: "hover:bg-blue-50",
        iconColor: "text-blue-600",
      };
    } else if (
      name.includes("facial") ||
      name.includes("rostro") ||
      name.includes("cara")
    ) {
      return {
        color: "bg-green-100 text-green-700 border-green-200",
        hoverColor: "hover:bg-green-50",
        iconColor: "text-green-600",
      };
    } else if (
      name.includes("medicinal") ||
      name.includes("terapéutico") ||
      name.includes("tratamiento")
    ) {
      return {
        color: "bg-purple-100 text-purple-700 border-purple-200",
        hoverColor: "hover:bg-purple-50",
        iconColor: "text-purple-600",
      };
    } else if (
      name.includes("natural") ||
      name.includes("orgánico") ||
      name.includes("ecológico")
    ) {
      return {
        color: "bg-emerald-100 text-emerald-700 border-emerald-200",
        hoverColor: "hover:bg-emerald-50",
        iconColor: "text-emerald-600",
      };
    } else {
      // Color por defecto
      return {
        color: "bg-gray-100 text-gray-700 border-gray-200",
        hoverColor: "hover:bg-gray-50",
        iconColor: "text-gray-600",
      };
    }
  };

  const handleOriginChange = (originName: string, checked: boolean) => {
    if (checked) {
      setSelectedOrigin(originName);
      setFilterOrigin(originName);
    } else {
      setSelectedOrigin("");
      setFilterOrigin("");
    }
  };

  const handleClearAll = () => {
    setSelectedOrigin("");
    setFilterOrigin("");
    onClearFilters?.();
  };

  const hasActiveFilter = selectedOrigin !== "";

  // Skeleton para loading
  const CategorySkeleton = () => (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex items-center space-x-3 p-4 border rounded-xl"
        >
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-5 w-5 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-5 w-8 rounded-full" />
        </div>
      ))}
    </div>
  );

  return (
    <Card className="sticky top-4 shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <CardContent className="p-6 ">
        {/* Botón limpiar filtros */}
        {hasActiveFilter && (
          <div className="mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Limpiar selección
            </Button>
          </div>
        )}

        {/* Lista de origins */}
        <div className="space-y-2">
          {loading ? (
            <CategorySkeleton />
          ) : availableOrigins.length > 0 ? (
            <>
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                  Categorías principales:
                </h4>
              </div>

              {availableOrigins.map((origin) => {
                const isSelected = selectedOrigin === origin.name;
                const style = getOriginStyle(origin.name);

                return (
                  <div
                    key={origin.id}
                    className={`
                      group relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer
                      ${
                        isSelected
                          ? `${style.color} border-current shadow-md scale-[1.02]`
                          : `border-gray-200 dark:border-gray-700 ${style.hoverColor} hover:border-gray-300 hover:shadow-sm`
                      }
                    `}
                    onClick={() => handleOriginChange(origin.name, !isSelected)}
                  >
                    <div className="flex items-center space-x-4">
                      {/* Icono */}
                      <div
                        className={`
                        p-3 rounded-lg transition-colors duration-300
                        ${
                          isSelected
                            ? "bg-white/20 text-current"
                            : `bg-gray-100 dark:bg-gray-800 ${style.iconColor} group-hover:bg-gray-200`
                        }
                      `}
                      >
                        <Package className="w-5 h-5" />
                      </div>

                      {/* Información */}
                      <div className="flex-1 min-w-0">
                        <Label
                          htmlFor={origin.id}
                          className={`
                            block font-semibold cursor-pointer transition-colors duration-300 text-base
                            ${
                              isSelected
                                ? "text-current"
                                : "text-gray-900 dark:text-gray-100 group-hover:text-gray-700"
                            }
                          `}
                        >
                          {origin.name}
                        </Label>
                        <p
                          className={`
                          text-sm transition-colors duration-300 mt-1
                          ${
                            isSelected
                              ? "text-current/80"
                              : "text-gray-500 dark:text-gray-400"
                          }
                        `}
                        >
                          {origin.description}
                        </p>
                      </div>

                      {/* Badge de cantidad */}
                      <Badge
                        variant="secondary"
                        className={`
                          transition-all duration-300 font-semibold
                          ${
                            isSelected
                              ? "bg-white/20 text-current border-white/30"
                              : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                          }
                        `}
                      >
                        {origin.count}
                      </Badge>
                    </div>

                    {/* Efecto de selección */}
                    {isSelected && (
                      <div className="absolute top-3 right-3">
                        <div className="w-3 h-3 bg-white rounded-full shadow-sm animate-pulse"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          ) : (
            /* Estado cuando no hay origins */
            <div className="text-center py-6">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No hay orígenes disponibles para esta categoría
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FiltersControlsCategory;
