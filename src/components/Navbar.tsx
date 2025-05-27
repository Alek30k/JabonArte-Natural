"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  BaggageClaim,
  Heart,
  ShoppingCart,
  User,
  Search,
  Menu,
  ChevronDown,
  Gift,
  X,
  Phone,
  HelpCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ToggleTheme from "./ToggleTheme";
import { UseCart } from "@/hooks/UseCart";
import { UseLovedProducts } from "@/hooks/UseLovedProducts";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";
import Image from "next/image";

const categories = [
  { name: "Regalos Personalizados", href: "/productos/personalizados" },
  { name: "Regalos Románticos", href: "/productos/romanticos" },
  { name: "Regalos de Cumpleaños", href: "/productos/cumpleanos" },
  { name: "Regalos Corporativos", href: "/productos/corporativos" },
  { name: "Ofertas Especiales", href: "/ofertas" },
];

const userMenuItems = [
  { name: "Mi Perfil", href: "/profile" },
  { name: "Mis Pedidos", href: "/orders" },
  { name: "Lista de Deseos", href: "/wishlist" },
  { name: "Configuración", href: "/settings" },
];

const Navbar = () => {
  const router = useRouter();
  const cart = UseCart();
  const { lovedItems } = UseLovedProducts();
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  // Detectar scroll para cambiar el estilo de la navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 10);
      setIsFloating(currentScrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowMobileSearch(false);
    }
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
    if (!showMobileSearch) {
      // Focus en el input cuando se abre
      setTimeout(() => {
        const input = document.getElementById("mobile-search-input");
        input?.focus();
      }, 100);
    }
  };

  return (
    <>
      <div
        className={`bg-gradient-to-r from-orange-500 to-orange-500 text-white text-xs sm:text-sm py-1.5 sm:py-2 px-4 transition-all duration-500 ${
          isFloating
            ? "opacity-0 -translate-y-full"
            : "opacity-100 translate-y-0"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="flex items-center">
              <Gift className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden xs:inline">Regalos únicos</span>
              <span className="xs:hidden">Regalos</span>
            </span>
            <span className="hidden sm:block">
              Envío gratis en compras +$15.000
            </span>
            <span className="sm:hidden text-xs">Envío gratis +$15k</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              href="tel:+541112345678"
              className="hidden xs:flex items-center hover:underline"
            >
              <Phone className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">+54 11 1234-5678</span>
              <span className="sm:hidden">Llamar</span>
            </Link>
            <Link href="/help" className="flex items-center hover:underline">
              <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-0" />
              <span className="hidden sm:inline ml-1">Ayuda</span>
            </Link>
          </div>
        </div>
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isFloating
            ? " bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl border border-white/20 dark:border-gray-700/30"
            : isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
            : "bg-white dark:bg-gray-900 shadow-sm"
        } ${isFloating ? "" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20 ">
            {/* Logo - Optimizado para móvil */}
            <div
              className="flex items-center pl-3 flex-shrink-0 dark:bg-gradient-to-t from-slate-100 to-gray-900/95 rounded-md
            "
            >
              <div className="cursor-pointer " onClick={() => router.push("/")}>
                <Image
                  src="/rdc4.png"
                  alt="RDC"
                  width={1920}
                  height={960}
                  priority
                  className="h-[55px] sm:h-12 md:h-[65px] lg:h-[75px] w-auto hover:scale-110 transition-transform duration-200 "
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-700 dark:text-gray-200 hover:text-pink-600 transition-colors">
                  Regalos
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.name} asChild>
                      <Link href={category.href} className="cursor-pointer">
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/productos"
                      className="cursor-pointer font-medium"
                    >
                      Ver Todos los Regalos
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/blog"
                className="text-gray-700 dark:text-gray-200 hover:text-pink-600 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 dark:text-gray-200 hover:text-pink-600 transition-colors"
              >
                Contacto
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Buscar el regalo perfecto..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                  />
                  {searchQuery && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </form>
            </div>

            {/* Right Side Icons - Optimizados para móvil */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Search Icon for Mobile */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2"
                onClick={toggleMobileSearch}
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 cursor-pointer"
                  >
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="cursor-pointer">
                      Iniciar Sesión
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register" className="cursor-pointer">
                      Registrarse
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {userMenuItems.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link href={item.href} className="cursor-pointer">
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Wishlist */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex relative p-2 cursor-pointer"
                onClick={() => router.push("/loved-products")}
              >
                <Heart
                  className={`h-5 w-5 cursor-pointer ${
                    lovedItems.length > 0
                      ? "fill-rose-500 text-rose-500"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                />
                {lovedItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-rose-500 text-white">
                    {lovedItems.length > 9 ? "9+" : lovedItems.length}
                  </Badge>
                )}
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2 cursor-pointer"
                onClick={() => router.push("/cart")}
              >
                {cart.items.length === 0 ? (
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <>
                    <BaggageClaim className="h-4 w-4 sm:h-5 sm:w-5" />
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 text-xs bg-pink-600 text-white">
                      {cart.items.length > 9 ? "9+" : cart.items.length}
                    </Badge>
                  </>
                )}
              </Button>

              {/* Theme Toggle - Oculto en móviles muy pequeños */}
              <div className="hidden lg:block lg:pl-4 ">
                <ToggleTheme />
              </div>

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden p-2">
                    <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 sm:w-96">
                  <SheetHeader className="text-left">
                    <SheetTitle className="flex items-center text-lg">
                      <Heart className="w-5 h-5 mr-2 text-pink-600" />
                      JabonArte Natural
                    </SheetTitle>
                    <SheetDescription className="text-sm">
                      Regalos únicos para momentos especiales
                    </SheetDescription>
                  </SheetHeader>

                  <div className="mt-6 space-y-6">
                    {/* Theme Toggle in Mobile Menu */}
                    <div className="border-t pt-4 ">
                      <div className="flex items-center justify-between mx-4">
                        <span className="text-gray-900 dark:text-gray-100">
                          Cambiar Apariencia
                        </span>
                        <ToggleTheme />
                      </div>
                    </div>
                    {/* Wishlist y Carrito en móvil */}
                    <div className="border-t pt-4">
                      <div className="space-y-3">
                        <Button
                          variant="ghost"
                          className="w-full justify-start p-3 h-auto"
                          onClick={() => {
                            router.push("/loved-products");
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <Heart
                            className={`h-5 w-5 mr-3 ${
                              lovedItems.length > 0
                                ? "fill-rose-500 text-rose-500"
                                : "text-gray-700 dark:text-gray-200"
                            }`}
                          />
                          <span className="flex-1 text-left">Favoritos</span>
                          {lovedItems.length > 0 && (
                            <Badge className="bg-rose-500 text-white">
                              {lovedItems.length > 9 ? "9+" : lovedItems.length}
                            </Badge>
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3 pl-4">
                          Novedades
                        </h3>
                        <div className="space-y-3 ml-4">
                          {categories.map((category) => (
                            <Link
                              key={category.name}
                              href={category.href}
                              className="block text-gray-600 dark:text-gray-300 hover:text-pink-600 py-1"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {category.name}
                            </Link>
                          ))}
                          <Link
                            href="/productos"
                            className="block text-pink-600 font-medium py-1"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Ver Todos los Regalos
                          </Link>
                        </div>
                      </div>
                    </nav>

                    {/* Mobile User Actions */}
                    <div className="border-t pt-4 space-y-3">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        Mi Cuenta
                      </h4>
                      <Link
                        href="/login"
                        className="block text-gray-600 dark:text-gray-300 py-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Iniciar Sesión
                      </Link>
                      <Link
                        href="/register"
                        className="block text-gray-600 dark:text-gray-300 py-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Registrarse
                      </Link>
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block text-gray-600 dark:text-gray-300 py-1"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>

                    {/* Theme Toggle in Mobile Menu */}
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 dark:text-gray-100">
                          Tema
                        </span>
                        <ToggleTheme />
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar - Expandible */}
        {showMobileSearch && (
          <div className="md:hidden border-t bg-white dark:bg-gray-900 px-3 py-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="mobile-search-input"
                  type="text"
                  placeholder="Buscar el regalo perfecto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-20 py-2 w-full border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  {searchQuery && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery("")}
                      className="h-6 w-6 p-0 hover:bg-gray-100"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={toggleMobileSearch}
                    className="h-6 w-6 p-0 hover:bg-gray-100"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
