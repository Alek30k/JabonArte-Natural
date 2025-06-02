"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import dynamic from "next/dynamic";

// Componente de carga
const LoadingButton = () => (
  <Button variant="ghost" size="sm" className="p-2 cursor-pointer">
    <User className="h-4 w-4 sm:h-5 sm:w-5" />
  </Button>
);

// Cargar Clerk solo cuando se necesite
const ClerkUserButton = dynamic(() => import("./ClerkUserButton"), {
  ssr: false,
  loading: () => <LoadingButton />,
});

export default function AuthButton() {
  const [showClerk, setShowClerk] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Solo cargar Clerk cuando el usuario interactúe con el botón
  const handleButtonClick = () => {
    setShowClerk(true);
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      {showClerk ? (
        <ClerkUserButton />
      ) : (
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild onClick={handleButtonClick}>
            <Button variant="ghost" size="sm" className="p-2 cursor-pointer">
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href="/sign-in" className="cursor-pointer">
                Iniciar Sesión
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/sign-up" className="cursor-pointer">
                Registrarse
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
