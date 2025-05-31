"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CreditCard,
  Banknote,
  Smartphone,
  Building2,
  Percent,
  ChevronDown,
  CheckCircle,
} from "lucide-react";

interface PaymentInfoCompactProps {
  price?: number;
  transferDiscount?: number;
}

export default function PaymentInfoCompact({
  price = 0,
  transferDiscount = 5,
}: PaymentInfoCompactProps) {
  const [isOpen, setIsOpen] = useState(false);

  const discountedPrice = price * (1 - transferDiscount / 100);
  const savings = price - discountedPrice;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="border-green-200 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Cuotas sin interés */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">
                Hasta 12 cuotas sin interés
              </span>
            </div>
            <Badge variant="secondary" className="text-xs">
              0% interés
            </Badge>
          </div>

          {/* Descuento por transferencia */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">
                {transferDiscount}% desc. transferencia
              </span>
            </div>
            {price > 0 && (
              <div className="text-right">
                <div className="text-sm font-bold text-green-600">
                  {formatPrice(discountedPrice)}
                </div>
                <div className="text-xs text-gray-500">
                  Ahorras {formatPrice(savings)}
                </div>
              </div>
            )}
          </div>

          {/* Popover para medios de pago */}
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between h-8 text-sm"
              >
                Ver medios de pago
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-80 p-0" align="start">
              <div className="p-4 space-y-4">
                <h4 className="font-semibold text-sm">
                  Medios de Pago Disponibles
                </h4>

                {/* Tarjetas de crédito */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">
                      Tarjetas de Crédito
                    </span>
                  </div>
                  <div className="pl-6 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>💳 Visa, Mastercard, Amex</span>
                      <Badge variant="outline" className="text-xs">
                        12 cuotas
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Transferencias */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Transferencias</span>
                  </div>
                  <div className="pl-6 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>🏦 Bancaria, PSE</span>
                      <Badge className="bg-green-500 text-xs">
                        {transferDiscount}% desc.
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Billeteras digitales */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium">
                      Billeteras Digitales
                    </span>
                  </div>
                  <div className="pl-6 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>📱 Nequi, Daviplata</span>
                      <Badge variant="outline" className="text-xs">
                        6 cuotas
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Efectivo */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium">Efectivo</span>
                  </div>
                  <div className="pl-6 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>💵 Efecty, Baloto</span>
                      <Badge variant="outline" className="text-xs">
                        Inmediato
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Seguridad */}
                <div className="pt-2 border-t">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span>Pago 100% seguro y protegido</span>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
}
