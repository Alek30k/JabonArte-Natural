"use client";

import { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function ClerkComponents() {
  const [mounted, setMounted] = useState(false);
  const { isSignedIn, isLoaded } = useUser();

  // Solo renderizar en el cliente para evitar errores de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  // No renderizar nada durante SSR
  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="p-2 cursor-pointer">
        <User className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    );
  }

  // Mostrar un estado de carga mientras Clerk se inicializa
  if (!isLoaded) {
    return (
      <Button variant="ghost" size="sm" className="p-2 cursor-pointer">
        <User className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isSignedIn ? (
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-6 w-6 sm:h-7 sm:w-7",
              },
            }}
          />
        ) : (
          <Button variant="ghost" size="sm" className="p-2 cursor-pointer">
            <User className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link href="/sign-in" className="cursor-pointer">
            Iniciar Sesión
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/sign-up" className="cursor-pointer">
            Registrarse
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
