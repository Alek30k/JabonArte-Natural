"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

// Esquema de validación para el código postal
const formSchema = z.object({
  postalCode: z
    .string()
    .regex(
      /^[0-9]{4}$|^[A-Z][0-9]{4}[A-Z]{3}$/,
      "El código postal debe ser 4 dígitos o formato A1234BCD"
    ),
});

// Tipos para los resultados de envío
interface ShippingOption {
  carrier: string;
  service: string;
  cost: number;
  estimatedDelivery: string;
}

export default function ShippingMethods() {
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Configuración del formulario con React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postalCode: "",
    },
  });

  // Función para calcular los costos de envío
  //   const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //     setIsLoading(true);
  //     setError(null);
  //     setShippingOptions([]);

  //     try {
  //       // Simulación de llamadas a las APIs de Andreani, Correo Argentino, y OCA
  //       // Debes reemplazar estos endpoints con los reales de cada transportista
  //       const [andreaniResponse, correoResponse, ocaResponse] = await Promise.all(
  //         [
  //           // Ejemplo de llamada a Andreani API
  //           axios.post(
  //             "https://api.andreani.com/v2/cotizar", // Reemplaza con el endpoint real
  //             {
  //               postalCode: values.postalCode,
  //               weight: 1, // Obtener del carrito
  //               dimensions: { length: 10, width: 10, height: 10 }, // Obtener del carrito
  //             },
  //             {
  //               headers: {
  //                 Authorization: "Bearer YOUR_ANDREANI_API_KEY", // Reemplaza con tu clave
  //               },
  //             }
  //           ),
  //           // Ejemplo de llamada a Correo Argentino (MiCorreo)
  //           axios.post(
  //             "https://api.correoargentino.com.ar/micorreo/cotizar", // Reemplaza con el endpoint real
  //             {
  //               postalCode: values.postalCode,
  //               weight: 1, // Obtener del carrito
  //               dimensions: { length: 10, width: 10, height: 10 }, // Obtener del carrito
  //             },
  //             {
  //               headers: {
  //                 Authorization: "Bearer YOUR_CORREO_API_KEY", // Reemplaza con tu clave
  //               },
  //             }
  //           ),
  //           // Ejemplo de llamada a OCA API
  //           axios.post(
  //             "https://api.oca.com.ar/cotizar", // Reemplaza con el endpoint real
  //             {
  //               postalCode: values.postalCode,
  //               weight: 1, // Obtener del carrito
  //               dimensions: { length: 10, width: 10, height: 10 }, // Obtener del carrito
  //             },
  //             {
  //               headers: {
  //                 Authorization: "Bearer YOUR_OCA_API_KEY", // Reemplaza con tu clave
  //               },
  //             }
  //           ),
  //         ]
  //       );

  //       // Procesar respuestas (ajusta según la estructura real de las APIs)
  //       const options: ShippingOption[] = [
  //         {
  //           carrier: "Andreani",
  //           service: andreaniResponse.data.service || "Estándar",
  //           cost: andreaniResponse.data.cost || 0,
  //           estimatedDelivery:
  //             andreaniResponse.data.estimatedDelivery || "3-5 días hábiles",
  //         },
  //         {
  //           carrier: "Correo Argentino",
  //           service: correoResponse.data.service || "Clásico",
  //           cost: correoResponse.data.cost || 0,
  //           estimatedDelivery:
  //             correoResponse.data.estimatedDelivery || "3-6 días hábiles",
  //         },
  //         {
  //           carrier: "OCA",
  //           service: ocaResponse.data.service || "e-Pak",
  //           cost: ocaResponse.data.cost || 0,
  //           estimatedDelivery:
  //             ocaResponse.data.estimatedDelivery || "2-4 días hábiles",
  //         },
  //       ];

  //       setShippingOptions(options);
  //     } catch (err) {
  //       setError(
  //         "Error al calcular los costos de envío. Por favor, intenta de nuevo."
  //       );
  //       console.error(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);
    setShippingOptions([]);

    try {
      // Simulación de respuesta de Andreani
      const andreaniResponse = {
        data: {
          service: "Estándar",
          cost: 2500,
          estimatedDelivery: "3-5 días hábiles",
        },
      };

      // Simulación de otras respuestas
      const correoResponse = {
        data: {
          service: "Clásico",
          cost: 1800,
          estimatedDelivery: "3-6 días hábiles",
        },
      };
      const ocaResponse = {
        data: {
          service: "e-Pak",
          cost: 2200,
          estimatedDelivery: "2-4 días hábiles",
        },
      };

      const options: ShippingOption[] = [
        {
          carrier: "Andreani",
          service: andreaniResponse.data.service,
          cost: andreaniResponse.data.cost,
          estimatedDelivery: andreaniResponse.data.estimatedDelivery,
        },
        {
          carrier: "Correo Argentino",
          service: correoResponse.data.service,
          cost: correoResponse.data.cost,
          estimatedDelivery: correoResponse.data.estimatedDelivery,
        },
        {
          carrier: "OCA",
          service: ocaResponse.data.service,
          cost: ocaResponse.data.cost,
          estimatedDelivery: ocaResponse.data.estimatedDelivery,
        },
      ];

      setShippingOptions(options);
    } catch (err) {
      setError(
        "Error al calcular los costos de envío. Por favor, intenta de nuevo."
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-3">
      <CardHeader>
        <CardTitle>Calcular Costos de Envío</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código Postal</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: 1425 o C1425DAA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Calculando...
                </>
              ) : (
                "Calcular"
              )}
            </Button>
          </form>
        </Form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {shippingOptions.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Opciones de Envío</h3>
            <ul className="mt-2 space-y-2">
              {shippingOptions.map((option, index) => (
                <li key={index} className="border p-4 rounded-md">
                  <p>
                    <strong>Transportista:</strong> {option.carrier}
                  </p>
                  <p>
                    <strong>Servicio:</strong> {option.service}
                  </p>
                  <p>
                    <strong>Costo:</strong> ${option.cost.toFixed(2)}
                  </p>
                  <p>
                    <strong>Entrega Estimada:</strong>{" "}
                    {option.estimatedDelivery}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
