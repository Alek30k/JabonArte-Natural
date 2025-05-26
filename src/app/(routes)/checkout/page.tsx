"use client";

import { useEffect, useState } from "react";
import { UseCart } from "@/hooks/UseCart";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Copy,
  CheckCircle,
  ArrowLeft,
  CreditCard,
  Clock,
  AlertCircle,
  Building,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, removeAll } = UseCart();
  const [orderNumber, setOrderNumber] = useState("");
  const [copied, setCopied] = useState("");
  const router = useRouter();
  const [isConfirming, setIsConfirming] = useState(false);

  const totalPrice = items.reduce((total, product) => total + product.price, 0);

  // Datos de MercadoPago (reemplaza con tus datos reales)
  const mercadoPagoData = {
    cbu: "0000003100010000000001",
    alias: "TIENDA.ONLINE.MP",
    titular: "Tu Nombre o Razón Social",
    cuit: "20-12345678-9",
    banco: "Banco de la Nación Argentina",
  };

  useEffect(() => {
    // Generar número de pedido único
    const orderNum = `MP-${Date.now().toString().slice(-8)}`;
    setOrderNumber(orderNum);

    // Redirigir si no hay productos
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items.length, router]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    console.log(`${type} copiado al portapapeles`);
    setTimeout(() => setCopied(""), 2000);
  };

  const handlePaymentConfirmation = () => {
    setIsConfirming(true);
    setTimeout(() => {
      try {
        // Guardar datos del pedido antes de vaciar el carrito
        const orderData = {
          orderNumber,
          items: [...items],
          totalPrice,
          timestamp: new Date().toISOString(),
        };

        // Guardar en localStorage como backup
        localStorage.setItem("lastOrder", JSON.stringify(orderData));

        // Vaciar carrito
        removeAll();

        // Intentar múltiples métodos de redirección

        // Método 1: router.push con timeout
        setTimeout(() => {
          router.replace("/order-confirmation");
        }, 100);

        // Método 2: window.location como fallback
        setTimeout(() => {
          if (window.location.pathname === "/checkout") {
            window.location.href = "/order-confirmation";
          }
        }, 1000);
      } catch (error) {
        console.error("Error al procesar el pedido:", error);
        alert(
          "Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo."
        );
      } finally {
        setIsConfirming(false);
      }
    }, 2000);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl px-3 sm:px-4 py-6 sm:py-8 mx-auto lg:px-8">
      <div className="mb-4 sm:mb-6">
        <Button variant="ghost" asChild className="mb-3 sm:mb-4 -ml-2">
          <Link href="/cart">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al carrito
          </Link>
        </Button>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
          Finalizar compra
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Pedido #{orderNumber}
        </p>
      </div>

      <div className="space-y-6 lg:grid lg:gap-8 lg:grid-cols-2 lg:space-y-0">
        {/* Resumen del pedido */}
        <div className="order-2 lg:order-1">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500" />
                Resumen del pedido
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 sm:space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm sm:text-base line-clamp-2">
                        {item.productName}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Cantidad: 1
                      </p>
                    </div>
                    <span className="font-medium text-sm sm:text-base flex-shrink-0">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-semibold text-base sm:text-lg">
                  <span>Total a pagar:</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instrucciones de pago */}
        <div className="order-1 lg:order-2 space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" />
                Instrucciones de pago
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Realiza la transferencia bancaria con los siguientes datos y
                  envíanos el comprobante.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                        CBU
                      </p>
                      <p className="font-mono text-sm sm:text-base break-all">
                        {mercadoPagoData.cbu}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(mercadoPagoData.cbu, "CBU")
                      }
                      className="flex-shrink-0"
                    >
                      {copied === "CBU" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                        Alias
                      </p>
                      <p className="font-mono text-sm sm:text-base break-all">
                        {mercadoPagoData.alias}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(mercadoPagoData.alias, "Alias")
                      }
                      className="flex-shrink-0"
                    >
                      {copied === "Alias" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                    Titular
                  </p>
                  <p className="text-sm sm:text-base break-words">
                    {mercadoPagoData.titular}
                  </p>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                    CUIT
                  </p>
                  <p className="text-sm sm:text-base">{mercadoPagoData.cuit}</p>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Building className="w-4 h-4 mt-0.5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                        Banco
                      </p>
                      <p className="text-sm sm:text-base break-words">
                        {mercadoPagoData.banco}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2 text-sm sm:text-base">
                  Importante:
                </h4>
                <ul className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li className="break-words">
                    • Incluye el número de pedido:{" "}
                    <strong>{orderNumber}</strong>
                  </li>
                  <li className="break-words">
                    • El monto exacto:{" "}
                    <strong>{formatPrice(totalPrice)}</strong>
                  </li>
                  <li>• Envía el comprobante por WhatsApp o email</li>
                </ul>
              </div>

              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Tu pedido se procesará una vez que confirmemos el pago. Tiempo
                  estimado: 24-48 horas hábiles.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button
              className="w-full"
              onClick={handlePaymentConfirmation}
              size="lg"
              disabled={isConfirming}
            >
              {isConfirming ? (
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
                "Ya realicé la transferencia"
              )}
            </Button>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="flex-1" asChild>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enviar por WhatsApp
                </a>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <a href="mailto:ventas@tutienda.com">Enviar por Email</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
