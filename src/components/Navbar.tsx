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
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detectar scroll para cambiar el estilo de la navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirigir a la página de búsqueda con el query
      router.push(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleMobileSearch = () => {
    // Para móvil, redirigir directamente a la página de búsqueda
    router.push("/buscar");
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Gift className="w-4 h-4 mr-1" />
              Regalos únicos y especiales
            </span>
            <span className="hidden md:block">
              Envío gratis en compras +$15.000
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden sm:block">📞 +54 11 1234-5678</span>
            <Link href="/help" className="hover:underline">
              Ayuda
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
            : "bg-white dark:bg-gray-900 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div
                className="flex-shrink-0 cursor-pointer"
                onClick={() => router.push("/")}
              >
                {/* <Logo className="hover:scale-105 transition-transform duration-200" /> */}
                <div className="flex items-center">
                  <div
                    className="flex-shrink-0 cursor-pointer"
                    onClick={() => router.push("/")}
                  >
                    <Image
                      src="/logo3.png"
                      alt="JabónArteNatural"
                      width={160}
                      height={60}
                      priority
                      className="h-20 lg:h-24 w-auto hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Products Dropdown */}
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
                      ×
                    </Button>
                  )}
                </div>
              </form>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Icon for Mobile */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={handleMobileSearch}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <User className="h-5 w-5" />
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
                className="relative"
                onClick={() => router.push("/loved-products")}
              >
                <Heart
                  className={`h-5 w-5 ${
                    lovedItems.length > 0
                      ? "fill-rose-500 text-rose-500"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                />
                {lovedItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-rose-500">
                    {lovedItems.length}
                  </Badge>
                )}
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="sm"
                className="relative"
                onClick={() => router.push("/cart")}
              >
                {cart.items.length === 0 ? (
                  <ShoppingCart className="h-5 w-5" />
                ) : (
                  <>
                    <BaggageClaim className="h-5 w-5" />
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-pink-600">
                      {cart.items.length}
                    </Badge>
                  </>
                )}
              </Button>

              {/* Theme Toggle */}
              <ToggleTheme />

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-pink-600" />
                      Regalos del Corazón
                    </SheetTitle>
                    <SheetDescription>
                      Regalos únicos para momentos especiales
                    </SheetDescription>
                  </SheetHeader>

                  <div className="mt-6 space-y-6">
                    {/* Mobile Search */}
                    <form onSubmit={handleSearch}>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          type="text"
                          placeholder="Buscar regalos..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                        {searchQuery && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setSearchQuery("")}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                          >
                            ×
                          </Button>
                        )}
                      </div>
                    </form>

                    {/* Mobile Navigation */}
                    <nav className="space-y-4">
                      <Link
                        href="/"
                        className="block text-lg font-medium text-gray-900 dark:text-gray-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Inicio
                      </Link>

                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                          Regalos
                        </h3>
                        <div className="space-y-2 ml-4">
                          {categories.map((category) => (
                            <Link
                              key={category.name}
                              href={category.href}
                              className="block text-gray-600 dark:text-gray-300 hover:text-pink-600"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <Link
                        href="/about"
                        className="block text-lg font-medium text-gray-900 dark:text-gray-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Nosotros
                      </Link>
                      <Link
                        href="/blog"
                        className="block text-lg font-medium text-gray-900 dark:text-gray-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Blog
                      </Link>
                      <Link
                        href="/contact"
                        className="block text-lg font-medium text-gray-900 dark:text-gray-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Contacto
                      </Link>
                    </nav>

                    {/* Mobile User Actions */}
                    <div className="border-t pt-4 space-y-2">
                      <Link
                        href="/login"
                        className="block text-gray-600 dark:text-gray-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Iniciar Sesión
                      </Link>
                      <Link
                        href="/register"
                        className="block text-gray-600 dark:text-gray-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Registrarse
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
