"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import type { ResponseType } from "@/types/response";
import type { ProductType } from "@/types/product";
import FiltersControlsCategory from "./components/FiltersControlsCategory";
import ProductCard from "./components/ProductCard";
import {
  Grid3X3,
  List,
  ArrowUpDown,
  RefreshCw,
  AlertCircle,
  ShoppingBag,
  TrendingUp,
  Star,
  DollarSign,
  Package,
  Sparkles,
  Filter,
} from "lucide-react";

type SortOption =
  | "name"
  | "price-low"
  | "price-high"
  | "rating"
  | "newest"
  | "popular";
type ViewMode = "grid" | "list";

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.categorySlug as string;
  const { result, loading, error }: ResponseType =
    useGetCategoryProduct(categorySlug);

  // Estados simplificados
  const [filterOrigin, setFilterOrigin] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Filtrar y ordenar productos
  const filteredAndSortedProducts = useMemo(() => {
    // Ensure result exists and is an array of ProductType
    if (!result || !Array.isArray(result)) {
      return [];
    }

    // Ensure we have a valid array of products
    const products: ProductType[] = Array.isArray(result) ? result : [];

    const filtered = products.filter((product: ProductType) => {
      return filterOrigin === "" || product.origin === filterOrigin;
    });

    // Create a copy of the filtered array before sorting to avoid mutating the original
    const sortedProducts = [...filtered];

    // Ordenar productos
    switch (sortBy) {
      case "name":
        return sortedProducts.sort((a: ProductType, b: ProductType) =>
          a.productName.localeCompare(b.productName)
        );
      case "price-low":
        return sortedProducts.sort(
          (a: ProductType, b: ProductType) => a.price - b.price
        );
      case "price-high":
        return sortedProducts.sort(
          (a: ProductType, b: ProductType) => b.price - a.price
        );
      case "rating":
        return sortedProducts.sort(() => Math.random() - 0.5);
      case "newest":
        return sortedProducts.sort(() => Math.random() - 0.5);
      case "popular":
      default:
        return sortedProducts.sort(() => Math.random() - 0.5);
    }
  }, [result, filterOrigin, sortBy]);

  const handleClearFilters = () => {
    setFilterOrigin("");
  };

  const hasActiveFilters = filterOrigin !== "";

  // Skeleton para productos
  const ProductSkeleton = () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <Card key={i} className="overflow-hidden animate-pulse">
          <CardContent className="p-0">
            <Skeleton className="aspect-square w-full" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-1/3" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Estado de error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Error al cargar productos
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-600"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Intentar de nuevo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-40 bg-gray-50 dark:bg-gray-900">
      {/* Header de la categoría */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de filtros */}
          <div className="lg:w-80">
            <div className="sticky top-4">
              <FiltersControlsCategory
                setFilterOrigin={setFilterOrigin}
                activeFilters={filterOrigin ? [filterOrigin] : []}
                onClearFilters={handleClearFilters}
                productCount={filteredAndSortedProducts.length}
                loading={loading}
                products={result || []} // Pasamos los productos para extraer los origins
              />
            </div>
          </div>

          {/* Contenido principal */}
          <div className="flex-1">
            {/* Barra de herramientas */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div className="flex items-center space-x-4">
                {/* Modo de vista */}

                {/* Indicador de filtros activos */}
                {hasActiveFilters && (
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    <Filter className="w-3 h-3 mr-1" />
                    Filtro activo
                  </Badge>
                )}
              </div>

              {/* Ordenamiento */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <ArrowUpDown className="w-4 h-4" />
                  <span className="text-sm font-medium">Ordenar por:</span>
                </div>
                <Select
                  value={sortBy}
                  onValueChange={(value: SortOption) => setSortBy(value)}
                >
                  <SelectTrigger className="w-52 bg-white dark:bg-gray-800 shadow-sm">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 text-orange-500" />
                        Más popular
                      </div>
                    </SelectItem>
                    <SelectItem value="newest">
                      <div className="flex items-center">
                        <Package className="w-4 h-4 mr-2 text-green-500" />
                        Más reciente
                      </div>
                    </SelectItem>
                    <SelectItem value="price-low">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-blue-500" />
                        Precio: menor a mayor
                      </div>
                    </SelectItem>
                    <SelectItem value="price-high">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-purple-500" />
                        Precio: mayor a menor
                      </div>
                    </SelectItem>
                    <SelectItem value="rating">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-2 text-yellow-500" />
                        Mejor valorados
                      </div>
                    </SelectItem>
                    <SelectItem value="name">
                      <div className="flex items-center">
                        <span className="w-4 h-4 mr-2 text-center text-xs font-bold text-gray-500">
                          Az
                        </span>
                        Nombre A-Z
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filtro activo */}
            {hasActiveFilters && (
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-center justify-between">
                  {/* <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      Filtrando por origen:
                    </span>
                    <Badge className="bg-blue-600 text-white">
                      {filterOrigin}
                    </Badge>
                  </div> */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                  >
                    Limpiar filtro
                  </Button>
                </div>
              </div>
            )}

            {/* Grid de productos */}
            {loading ? (
              <ProductSkeleton />
            ) : filteredAndSortedProducts.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "space-y-4"
                }
              >
                {filteredAndSortedProducts.map((product: ProductType) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* Estado vacío mejorado */
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="relative mb-8">
                    <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 text-xl">!</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    No se encontraron productos
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {hasActiveFilters
                      ? `No hay productos disponibles con el origen "${filterOrigin}". Intenta con otro origen o limpia el filtro.`
                      : "No hay productos disponibles en esta categoría en este momento."}
                  </p>

                  {hasActiveFilters && (
                    <Button
                      onClick={handleClearFilters}
                      className="bg-blue-500 hover:bg-blue-600 shadow-lg"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Ver todos los productos
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
