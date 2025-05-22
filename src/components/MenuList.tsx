"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const MenuList = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer">
            Sobre Nosotros
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <Link
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  href="/"
                >
                  <div className="mb-2 mt-4 text-lg font-medium">
                    JabonArte Natural
                  </div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    Somos fabricantes de Jabones artesanales 100% naturales.
                    Para hacer pedidos mándanos mensaje por inbox. Facebook:
                    @JabonArteNatural · www.facebook.com/JabonArteNatural.
                  </p>
                </Link>
              </li>
              <ListItem href="/shop" title="Tienda">
                Accede a toda tu información, tus pedidos y mucho más.{" "}
              </ListItem>
              <ListItem href="/offers" title="Ofertas">
                Sección dedicada a promociones y descuentos especiales{" "}
              </ListItem>
              <ListItem href="/" title="Accesorios">
                Productos complementarios con tazas, molinillos, prensas, etc.{" "}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer">
            Cafés
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs">Accesorios</Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MenuList;

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Café grano",
    href: "/category/grano",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Café Molido",
    href: "/category/molido",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Café Capsula",
    href: "/category/capsula",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
