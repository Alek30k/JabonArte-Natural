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
    <div className="max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/cart">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al carrito
          </Link>
        </Button>
        <h1 className="text-2xl font-bold sm:text-3xl">Finalizar compra</h1>
        <p className="text-muted-foreground">Pedido #{orderNumber}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Resumen del pedido */}
        <div>
          <Card className="p-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                Resumen del pedido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{item.productName}</h4>
                      <p className="text-sm text-muted-foreground">
                        Cantidad: 1
                      </p>
                    </div>
                    <span className="font-medium">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total a pagar:</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instrucciones de pago */}
        <div className="space-y-6">
          <Card className="p-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-blue-500" />
                Instrucciones de pago
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Realiza la transferencia bancaria con los siguientes datos y
                  envíanos el comprobante.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">CBU</p>
                      <p className="font-mono text-lg">{mercadoPagoData.cbu}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(mercadoPagoData.cbu, "CBU")
                      }
                    >
                      {copied === "CBU" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Alias</p>
                      <p className="font-mono text-lg">
                        {mercadoPagoData.alias}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(mercadoPagoData.alias, "Alias")
                      }
                    >
                      {copied === "Alias" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Titular</p>
                  <p className="text-lg">{mercadoPagoData.titular}</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">CUIT</p>
                  <p className="text-lg">{mercadoPagoData.cuit}</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-2 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Banco</p>
                      <p className="text-lg">{mercadoPagoData.banco}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Importante:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>
                    • Incluye el número de pedido:{" "}
                    <strong>{orderNumber}</strong>
                  </li>
                  <li>
                    • El monto exacto:{" "}
                    <strong>{formatPrice(totalPrice)}</strong>
                  </li>
                  <li>• Envía el comprobante por WhatsApp o email</li>
                </ul>
              </div>

              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
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

            <div className="flex gap-2">
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
