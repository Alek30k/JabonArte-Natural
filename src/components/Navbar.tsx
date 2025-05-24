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
  Leaf,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ToggleTheme from "./ToggleTheme";
import Image from "next/image";
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

const categories = [
  { name: "Jabones Naturales", href: "/productos/jabones-naturales" },
  { name: "Jabones Medicinales", href: "/productos/jabones-medicinales" },
  { name: "Aceites Esenciales", href: "/productos/aceites-esenciales" },
  { name: "Kits de Regalo", href: "/productos/kits-regalo" },
  { name: "Ofertas", href: "/ofertas" },
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
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-green-600 text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Leaf className="w-4 h-4 mr-1" />
              100% Natural y Orgánico
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

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Products Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-700 dark:text-gray-200 hover:text-green-600 transition-colors font-medium">
                  Productos
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
                      Ver Todos los Productos
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/blog"
                className="text-gray-700 dark:text-gray-200 hover:text-green-600 transition-colors font-medium"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 dark:text-gray-200 hover:text-green-600 transition-colors font-medium"
              >
                Contacto
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Buscar productos naturales..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-11 pr-4 py-2 w-full border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
                  />
                </div>
              </form>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-3">
              {/* Search Icon for Mobile */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                onClick={() => router.push("/search")}
              >
                <Search className="h-6 w-6" />
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <User className="h-6 w-6" />
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
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                onClick={() => router.push("/loved-products")}
              >
                <Heart
                  className={`h-6 w-6 transition-colors ${
                    lovedItems.length > 0
                      ? "fill-rose-500 text-rose-500"
                      : "text-gray-700 dark:text-gray-200 hover:text-rose-500"
                  }`}
                />
                {lovedItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-rose-500 hover:bg-rose-600 border-2 border-white dark:border-gray-900">
                    {lovedItems.length}
                  </Badge>
                )}
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                onClick={() => router.push("/cart")}
              >
                {cart.items.length === 0 ? (
                  <ShoppingCart className="h-6 w-6 text-gray-700 dark:text-gray-200 hover:text-green-600 transition-colors" />
                ) : (
                  <>
                    <BaggageClaim className="h-6 w-6 text-green-600" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-green-600 hover:bg-green-700 border-2 border-white dark:border-gray-900">
                      {cart.items.length}
                    </Badge>
                  </>
                )}
              </Button>

              {/* Theme Toggle */}
              <div className="p-1">
                <ToggleTheme />
              </div>

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center">
                      <Leaf className="w-6 h-6 mr-2 text-green-600" />
                      JabónArteNatural
                    </SheetTitle>
                    <SheetDescription>
                      Productos naturales para tu bienestar
                    </SheetDescription>
                  </SheetHeader>

                  <div className="mt-6 space-y-6">
                    {/* Mobile Search */}
                    <form onSubmit={handleSearch}>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          type="text"
                          placeholder="Buscar productos..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-11 rounded-lg"
                        />
                      </div>
                    </form>

                    {/* Mobile Navigation */}
                    <nav className="space-y-4">
                      <Link
                        href="/"
                        className="block text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-green-600 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Inicio
                      </Link>

                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                          Productos
                        </h3>
                        <div className="space-y-2 ml-4">
                          {categories.map((category) => (
                            <Link
                              key={category.name}
                              href={category.href}
                              className="block text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <Link
                        href="/about"
                        className="block text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-green-600 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Nosotros
                      </Link>
                      <Link
                        href="/blog"
                        className="block text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-green-600 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Blog
                      </Link>
                      <Link
                        href="/contact"
                        className="block text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-green-600 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Contacto
                      </Link>
                    </nav>

                    {/* Mobile User Actions */}
                    <div className="border-t pt-4 space-y-2">
                      <Link
                        href="/login"
                        className="block text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Iniciar Sesión
                      </Link>
                      <Link
                        href="/register"
                        className="block text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
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
