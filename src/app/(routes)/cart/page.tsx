"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UseCart } from "@/hooks/UseCart";
import { formatPrice } from "@/lib/formatPrice";
import { ShoppingBag, Trash2, ArrowLeft, ShoppingCart } from "lucide-react";
import CartItems from "./components/CartItems";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import OrderSummary from "./components/OrderSummary";
import ShippingMethods from "@/components/ShippingMethods";

export default function CartPage() {
  const { items, removeAll } = UseCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  // Calcular el subtotal considerando la cantidad de cada producto
  const totalPrice = items.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const itemCount = items.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      router.push("/checkout");
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mt-40 overflow-x-hidden px-4 py-8 mx-auto sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">Carrito de compras</h1>
        <span className="text-sm text-muted-foreground">
          {itemCount} {itemCount === 1 ? "producto" : "productos"}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ShoppingCart className="w-16 h-16 mb-4 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-semibold">Tu carrito está vacío</h2>
          <p className="mb-6 text-muted-foreground">
            Parece que aún no has agregado productos a tu carrito
          </p>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continuar comprando
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3 w-full">
          <div className="lg:col-span-2 w-full max-w-full overflow-x-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Productos</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeAll}
                className="text-red-500 cursor-pointer hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Vaciar carrito
              </Button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <CartItems key={item.id} product={item} />
              ))}
            </div>

            <div className="mt-8">
              <Button variant="outline" asChild className="mt-4">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continuar comprando
                </Link>
              </Button>
            </div>
          </div>

          <div className="w-full  flex flex-col gap-5">
            <Card className="p-4">
              <CardHeader>
                <CardTitle>Resumen de pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span>Calculado en el siguiente paso</span>
                  </div>
                  <Separator />
                  <div className="">
                    <OrderSummary />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={isProcessing || itemCount === 0}
                >
                  {isProcessing ? (
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 animate-spin"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Procesando...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Continuar con el pago
                    </span>
                  )}
                </Button>
              </CardFooter>
            </Card>
            <ShippingMethods />
          </div>
        </div>
      )}
    </div>
  );
}
