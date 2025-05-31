"use client";

import { useState, useMemo, useEffect } from "react";
import { useGetAllProducts } from "@/api/getProductsAll";
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
import ProductCard from "../category/[categorySlug]/components/ProductCard";
import {
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

  // Verificación de tipo explícita
  const products = (
    result && Array.isArray(result) ? result : []
  ) as ProductType[];

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
  const { origins, priceStats } = useMemo(() => {
    if (
      !products ||
      !Array.isArray(products) ||
      (Array.isArray(products) && products.length === 0)
    )
      return {
        categories: [],
        origins: [],
        priceStats: { min: 0, max: 100000 },
      };

    // Acceder a categoryName a través de data.attributes y asegurar que cats es string[]
    const cats: string[] = [
      ...new Set(
        products
          .map((p: ProductType) => p.category?.categoryName)
          .filter(Boolean) as string[]
      ),
    ];
    // Asegurar que origs es string[] después de filtrar
    const origs: string[] = [
      ...new Set(
        products.map((p: ProductType) => p.origin).filter(Boolean) as string[]
      ),
    ];
    // Asegurar que origs es string[] después de filtrar
    const prices = products.map((p: ProductType) => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return {
      categories: cats,
      origins: origs,
      priceStats: { min: minPrice, max: maxPrice },
    };
  }, [products]);

  // Filtrar y ordenar productos
  const filteredAndSortedProducts = useMemo(() => {
    if (
      !products ||
      !Array.isArray(products) ||
      (Array.isArray(products) && products.length === 0)
    )
      return [];

    const filtered = products.filter((product: ProductType) => {
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
        filtered.sort((a: ProductType, b: ProductType) =>
          a.productName.localeCompare(b.productName)
        );
        break;
      case "price-low":
        filtered.sort((a: ProductType, b: ProductType) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a: ProductType, b: ProductType) => b.price - a.price);
        break;
      case "rating":
        filtered.sort(() => Math.random() - 0.5); // Consider adding a proper rating sort if data is available
        break;
      case "newest":
        filtered.sort(() => Math.random() - 0.5); // Consider adding a proper date sort if data is available
        break;
      case "popular":
      default:
        filtered.sort(() => Math.random() - 0.5); // Consider adding a proper popularity sort if data is available
        break;
    }

    return filtered;
  }, [
    products,
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24 md:mt-32">
        {/* Filtros y búsqueda */}
        <div className="mb-2 space-y-4">
          {/* Filtros en línea */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Origen */}
            <Select value={selectedOrigin} onValueChange={setSelectedOrigin}>
              <SelectTrigger className="w-52 bg-white dark:bg-gray-800">
                <SelectValue placeholder="Categorías principales" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Categorías principales</SelectItem>
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
            {/* Filtros activos */}
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  <Search className="w-3 h-3 mr-1" />
                  &quot;{searchQuery}&quot; {/* Corregido aquí */}
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
                  ? "grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
