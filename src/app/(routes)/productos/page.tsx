"use client";

import { useState, useMemo, useEffect } from "react";
import { useGetAllProducts } from "@/api/getProductsAll";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import ProductCard from "../category/[categorySlug]/components/ProductCard";
import {
  Grid3X3,
  List,
  Search,
  Filter,
  ArrowUpDown,
  RefreshCw,
  AlertCircle,
  ShoppingBag,
  TrendingUp,
  Star,
  DollarSign,
  Package,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";

type SortOption =
  | "name"
  | "price-low"
  | "price-high"
  | "rating"
  | "newest"
  | "popular";
type ViewMode = "grid" | "list";

const AllProducts = () => {
  const { result, loading, error }: ResponseType = useGetAllProducts();

  // Estados para filtros y búsqueda
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  // Extraer categorías y orígenes únicos
  const { categories, origins, priceStats } = useMemo(() => {
    if (!result)
      return {
        categories: [],
        origins: [],
        priceStats: { min: 0, max: 100000 },
      };

    const cats = [
      ...new Set(
        result.map((p: ProductType) => p.category?.categoryName).filter(Boolean)
      ),
    ];
    const origs = [
      ...new Set(result.map((p: ProductType) => p.origin).filter(Boolean)),
    ];
    const prices = result.map((p: ProductType) => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return {
      categories: cats,
      origins: origs,
      priceStats: { min: minPrice, max: maxPrice },
    };
  }, [result]);

  // Filtrar y ordenar productos
  const filteredAndSortedProducts = useMemo(() => {
    if (!result) return [];

    const filtered = result.filter((product: ProductType) => {
      const matchesSearch = product.productName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "" ||
        product.category?.categoryName === selectedCategory;
      const matchesOrigin =
        selectedOrigin === "" || product.origin === selectedOrigin;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesOrigin && matchesPrice;
    });

    // Ordenar productos
    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort(() => Math.random() - 0.5);
        break;
      case "newest":
        filtered.sort(() => Math.random() - 0.5);
        break;
      case "popular":
      default:
        filtered.sort(() => Math.random() - 0.5);
        break;
    }

    return filtered;
  }, [
    result,
    searchQuery,
    selectedCategory,
    selectedOrigin,
    priceRange,
    sortBy,
  ]);

  // Paginación
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / productsPerPage
  );
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  // Reset página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedOrigin, priceRange, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedOrigin("");
    setPriceRange([priceStats.min, priceStats.max]);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "" ||
    selectedOrigin !== "" ||
    priceRange[0] !== priceStats.min ||
    priceRange[1] !== priceStats.max;

  // Skeleton para productos
  const ProductSkeleton = () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(12)].map((_, i) => (
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Todos los Productos
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Descubre nuestra colección completa de jabones artesanales
                naturales
              </p>
            </div>

            {!loading && (
              <div className="text-center sm:text-right">
                <div className="flex items-center justify-center sm:justify-end space-x-2 mb-1">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {filteredAndSortedProducts.length}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  producto{filteredAndSortedProducts.length !== 1 ? "s" : ""}{" "}
                  encontrado
                  {filteredAndSortedProducts.length !== 1 ? "s" : ""}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros y búsqueda */}
        <div className="mb-8 space-y-4">
          {/* Barra de búsqueda */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-800"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          {/* Filtros en línea */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Categoría */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-48 bg-white dark:bg-gray-800">
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Origen */}
            <Select value={selectedOrigin} onValueChange={setSelectedOrigin}>
              <SelectTrigger className="w-48 bg-white dark:bg-gray-800">
                <SelectValue placeholder="Subcategorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Subcategorías</SelectItem>
                {origins.map((origin) => (
                  <SelectItem key={origin} value={origin}>
                    {origin}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Limpiar filtros */}
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="border-red-200 text-red-600"
              >
                <X className="w-4 h-4 mr-2" />
                Limpiar filtros
              </Button>
            )}
          </div>
        </div>

        {/* Barra de herramientas */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center space-x-4">
            {/* Modo de vista */}
            <div className="flex items-center bg-white dark:bg-gray-800 border rounded-lg p-1 shadow-sm">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 px-3"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 px-3"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Filtros activos */}
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  <Search className="w-3 h-3 mr-1" />"{searchQuery}"
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="h-auto p-0 ml-1 hover:bg-blue-200"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
              {selectedCategory && (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <Package className="w-3 h-3 mr-1" />
                  {selectedCategory}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCategory("")}
                    className="h-auto p-0 ml-1 hover:bg-green-200"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
              {selectedOrigin && (
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                  <Zap className="w-3 h-3 mr-1" />
                  {selectedOrigin}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedOrigin("")}
                    className="h-auto p-0 ml-1 hover:bg-purple-200"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
            </div>
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

        {/* Grid de productos */}
        {loading ? (
          <ProductSkeleton />
        ) : currentProducts.length > 0 ? (
          <>
            <div
              className={
                viewMode === "grid"
                  ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "space-y-4"
              }
            >
              {currentProducts.map((product: ProductType) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="flex items-center space-x-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </Button>

                <div className="flex items-center space-x-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNumber = i + 1;
                    return (
                      <Button
                        key={pageNumber}
                        variant={
                          currentPage === pageNumber ? "default" : "outline"
                        }
                        onClick={() => setCurrentPage(pageNumber)}
                        className="w-10 h-10"
                      >
                        {pageNumber}
                      </Button>
                    );
                  })}
                  {totalPages > 5 && (
                    <>
                      <span className="text-gray-500">...</span>
                      <Button
                        variant={
                          currentPage === totalPages ? "default" : "outline"
                        }
                        onClick={() => setCurrentPage(totalPages)}
                        className="w-10 h-10"
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>

                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center space-x-2"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          /* Estado vacío */
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
                  ? "No hay productos que coincidan con los filtros aplicados. Intenta ajustar los criterios de búsqueda."
                  : "No hay productos disponibles en este momento."}
              </p>

              {hasActiveFilters && (
                <Button
                  onClick={handleClearFilters}
                  className="bg-blue-500 hover:bg-blue-600 shadow-lg"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Limpiar todos los filtros
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
