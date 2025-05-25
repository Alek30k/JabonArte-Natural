"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Grid3X3,
  X,
  RotateCcw,
  Leaf,
  Heart,
  Sparkles,
  Award,
  Gift,
  Droplets,
  Flower,
  Sun,
  Moon,
  Baby,
  Users,
} from "lucide-react";

type FilterProps = {
  setFilter: (feature: string) => void;
  activeFilters?: string[];
  onClearFilters?: () => void;
  productCount?: number;
  loading?: boolean;
};

const FilterFeature = ({
  setFilter,
  onClearFilters,
  productCount = 0,
  loading = false,
}: FilterProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Categorías mejoradas con iconos y colores
  const categories = [
    {
      id: "jabones-naturales",
      name: "Jabones Naturales",
      count: 24,
      icon: <Leaf className="w-5 h-5" />,
      color: "bg-green-100 text-green-700 border-green-200",
      hoverColor: "hover:bg-green-50",
    },
    {
      id: "jabones-medicinales",
      name: "Jabones Medicinales",
      count: 18,
      icon: <Heart className="w-5 h-5" />,
      color: "bg-red-100 text-red-700 border-red-200",
      hoverColor: "hover:bg-red-50",
    },
    {
      id: "aceites-esenciales",
      name: "Aceites Esenciales",
      count: 12,
      icon: <Droplets className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-700 border-blue-200",
      hoverColor: "hover:bg-blue-50",
    },
    {
      id: "kits-regalo",
      name: "Kits de Regalo",
      count: 15,
      icon: <Gift className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-700 border-purple-200",
      hoverColor: "hover:bg-purple-50",
    },
    {
      id: "jabones-aromaticos",
      name: "Jabones Aromáticos",
      count: 20,
      icon: <Flower className="w-5 h-5" />,
      color: "bg-pink-100 text-pink-700 border-pink-200",
      hoverColor: "hover:bg-pink-50",
    },
    {
      id: "linea-premium",
      name: "Línea Premium",
      count: 8,
      icon: <Award className="w-5 h-5" />,
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
      hoverColor: "hover:bg-yellow-50",
    },
    {
      id: "jabones-energizantes",
      name: "Jabones Energizantes",
      count: 14,
      icon: <Sun className="w-5 h-5" />,
      color: "bg-orange-100 text-orange-700 border-orange-200",
      hoverColor: "hover:bg-orange-50",
    },
    {
      id: "jabones-relajantes",
      name: "Jabones Relajantes",
      count: 16,
      icon: <Moon className="w-5 h-5" />,
      color: "bg-indigo-100 text-indigo-700 border-indigo-200",
      hoverColor: "hover:bg-indigo-50",
    },
    {
      id: "linea-bebe",
      name: "Línea Bebé",
      count: 6,
      icon: <Baby className="w-5 h-5" />,
      color: "bg-cyan-100 text-cyan-700 border-cyan-200",
      hoverColor: "hover:bg-cyan-50",
    },
    {
      id: "jabones-familiares",
      name: "Jabones Familiares",
      count: 22,
      icon: <Users className="w-5 h-5" />,
      color: "bg-emerald-100 text-emerald-700 border-emerald-200",
      hoverColor: "hover:bg-emerald-50",
    },
  ];

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    let newSelectedCategories: string[];

    if (checked) {
      newSelectedCategories = [...selectedCategories, categoryId];
    } else {
      newSelectedCategories = selectedCategories.filter(
        (id) => id !== categoryId
      );
    }

    setSelectedCategories(newSelectedCategories);

    // Enviar las categorías seleccionadas como string separado por comas
    setFilter(newSelectedCategories.join(","));
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setFilter("");
    onClearFilters?.();
  };

  const totalActiveFilters = selectedCategories.length;

  // Skeleton para loading
  const CategorySkeleton = () => (
    <div className="space-y-3">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="flex items-center space-x-3 p-4 border rounded-xl"
        >
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-5 w-5 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-5 w-8 rounded-full" />
        </div>
      ))}
    </div>
  );

  return (
    <Card className="sticky top-4 shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <CardHeader className="pb-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Grid3X3 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold">Categorías</span>
              {totalActiveFilters > 0 && (
                <Badge className="ml-2 bg-white/20 text-white border-white/30 hover:bg-white/30">
                  {totalActiveFilters} seleccionada
                  {totalActiveFilters !== 1 ? "s" : ""}
                </Badge>
              )}
            </div>
          </CardTitle>
        </div>

        {/* Contador de productos */}
        {productCount > 0 && (
          <div className="text-white/90 text-sm font-medium">
            <Sparkles className="w-4 h-4 inline mr-1" />
            {productCount} productos disponibles
          </div>
        )}
      </CardHeader>

      <CardContent className="p-6">
        {/* Botón limpiar filtros */}
        {totalActiveFilters > 0 && (
          <div className="mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Limpiar selección ({totalActiveFilters})
            </Button>
          </div>
        )}

        {/* Lista de categorías */}
        <div className="space-y-3">
          {loading ? (
            <CategorySkeleton />
          ) : (
            <>
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                  <Leaf className="w-4 h-4 mr-2 text-green-600" />
                  Selecciona las categorías que te interesan
                </h4>
              </div>

              {categories.map((category) => {
                const isSelected = selectedCategories.includes(category.id);
                return (
                  <div
                    key={category.id}
                    className={`
                      group relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer
                      ${
                        isSelected
                          ? `${category.color} border-current shadow-md scale-[1.02]`
                          : `border-gray-200 dark:border-gray-700 ${category.hoverColor} hover:border-gray-300 hover:shadow-sm`
                      }
                    `}
                    onClick={() =>
                      handleCategoryChange(category.id, !isSelected)
                    }
                  >
                    <div className="flex items-center space-x-4 p-4">
                      {/* Checkbox */}
                      <Checkbox
                        id={category.id}
                        checked={isSelected}
                        onCheckedChange={(checked) =>
                          handleCategoryChange(category.id, checked as boolean)
                        }
                        className="data-[state=checked]:bg-current data-[state=checked]:border-current"
                      />

                      {/* Icono */}
                      <div
                        className={`
                        p-2 rounded-lg transition-colors duration-300
                        ${
                          isSelected
                            ? "bg-white/20 text-current"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-gray-200"
                        }
                      `}
                      >
                        {category.icon}
                      </div>

                      {/* Información */}
                      <div className="flex-1 min-w-0">
                        <Label
                          htmlFor={category.id}
                          className={`
                            block font-medium cursor-pointer transition-colors duration-300
                            ${
                              isSelected
                                ? "text-current"
                                : "text-gray-900 dark:text-gray-100 group-hover:text-gray-700"
                            }
                          `}
                        >
                          {category.name}
                        </Label>
                        <p
                          className={`
                          text-sm transition-colors duration-300
                          ${
                            isSelected
                              ? "text-current/80"
                              : "text-gray-500 dark:text-gray-400"
                          }
                        `}
                        >
                          {category.count} productos
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
                        {category.count}
                      </Badge>
                    </div>

                    {/* Efecto de selección */}
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Filtros activos */}
        {totalActiveFilters > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-green-600" />
              Categorías seleccionadas
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((categoryId) => {
                const category = categories.find((c) => c.id === categoryId);
                if (!category) return null;

                return (
                  <Badge
                    key={categoryId}
                    className={`
                      ${category.color} border-current hover:bg-opacity-80 transition-all duration-200
                      flex items-center space-x-1 pr-1
                    `}
                  >
                    <span className="flex items-center space-x-1">
                      {category.icon}
                      <span>{category.name}</span>
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1 ml-1 hover:bg-white/20 text-current"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategoryChange(categoryId, false);
                      }}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        {/* Mensaje cuando no hay filtros */}
        {totalActiveFilters === 0 && !loading && (
          <div className="mt-6 text-center py-4">
            <div className="text-gray-400 dark:text-gray-500 mb-2">
              <Grid3X3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Selecciona una o más categorías para filtrar los productos
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FilterFeature;
