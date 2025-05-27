"use client";

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import type { ResponseType } from "@/types/response";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import SkeletonSchema from "./SkeletonSchema";
import type { ProductType } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import { Expand, ShoppingCart } from "lucide-react";
import IconButton from "./IconButton";
import { useRouter } from "next/navigation";
import { UseCart } from "@/hooks/UseCart";
import Image from "next/image";

// 👈 Definir el tipo para las imágenes
interface ImageType {
  id: number;
  url: string;
  name?: string;
  provider?: string;
  mime?: string;
}

const FeaturedProducts = () => {
  const { loading, result }: ResponseType = useGetFeaturedProducts();
  const router = useRouter();
  const { addItem } = UseCart();

  // 👈 Usar ImageType[] en lugar de any[]
  const getCloudinaryImageUrl = (images: ImageType[] | undefined) => {
    if (!images || images.length === 0) return null;

    const image = images[0];
    let imageUrl = image.url;

    if (!imageUrl) return null;

    // Solo procesar si es una imagen de Cloudinary
    if (imageUrl.includes("res.cloudinary.com")) {
      // Corregir URL malformada si es necesario
      if (imageUrl.startsWith("https//")) {
        imageUrl = imageUrl.replace("https//", "https://");
      }
      // Agregar protocolo si falta
      if (!imageUrl.startsWith("https://") && !imageUrl.startsWith("http://")) {
        imageUrl = "https://" + imageUrl.replace(/^\/+/, "");
      }
      return imageUrl;
    }

    // Si no es de Cloudinary, retornar null
    return null;
  };

  // Filtrar solo productos con imágenes de Cloudinary
  const productsWithCloudinaryImages =
    result?.filter((product: ProductType) => {
      const cloudinaryUrl = getCloudinaryImageUrl(product.images);
      return cloudinaryUrl !== null;
    }) || [];

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 text-3xl sm:pb-8">Productos destacados</h3>

      {/* Mensaje informativo en desarrollo */}
      {process.env.NODE_ENV === "development" && (
        <div className="mx-6 mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>
              Mostrando solo productos con imágenes de Cloudinary:
            </strong>{" "}
            {productsWithCloudinaryImages.length} de {result?.length || 0}{" "}
            productos
          </p>
        </div>
      )}

      <Carousel>
        <CarouselContent className="md:ml-4">
          {loading && <SkeletonSchema grid={3} />}

          {/* Mostrar mensaje si no hay productos con Cloudinary */}
          {!loading && productsWithCloudinaryImages.length === 0 && (
            <div className="w-full flex items-center justify-center p-8">
              <div className="text-center">
                <p className="text-gray-600 mb-2">
                  No hay productos con imágenes de Cloudinary disponibles
                </p>
                <p className="text-sm text-gray-500">
                  Sube imágenes en Strapi Admin para que aparezcan aquí
                </p>
              </div>
            </div>
          )}

          {/* Mapear solo productos filtrados */}
          {productsWithCloudinaryImages.map((product: ProductType) => {
            const { id, slug, images, productName } = product;

            // Obtener URL de Cloudinary (ya sabemos que existe)
            const imageUrl = getCloudinaryImageUrl(images);

            return (
              <CarouselItem
                key={id}
                className="md:basis-1/2 lg:basis-1/3 group"
              >
                <div className="p-1">
                  {/* Card con altura fija */}
                  <Card className="py-4 shadow-2xl bg-white/60 border border-gray-200 cursor-pointer h-80 flex flex-col">
                    {/* Contenedor de imagen con altura fija */}
                    <CardContent className="relative flex items-center justify-center px-6 py-2 w-full h-64 mb-4 overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={productName || "Producto destacado"}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      />

                      {/* Indicador de Cloudinary */}
                      <div className="absolute top-2 left-2">
                        <div className="text-xs px-2 py-1 rounded text-white bg-green-600">
                          ☁️ Cloudinary
                        </div>
                      </div>

                      <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                        <div className="flex justify-center gap-x-6">
                          <IconButton
                            onClick={() => router.push(`product/${slug}`)}
                            icon={
                              <Expand size={20} className="text-gray-600" />
                            }
                          />
                          <IconButton
                            onClick={() => addItem(product)}
                            icon={
                              <ShoppingCart
                                size={20}
                                className="text-gray-600"
                              />
                            }
                          />
                        </div>
                      </div>
                    </CardContent>

                    {/* Contenedor de texto con altura controlada */}
                    <div className="flex-1 flex items-start px-8">
                      <div className="w-full">
                        {/* Título con line-clamp para limitar a 2 líneas máximo */}
                        <h3
                          className="text-lg font-bold text-gray-600 line-clamp-2 leading-tight"
                          title={productName} // Tooltip para mostrar el nombre completo
                        >
                          {productName}
                        </h3>

                        {/* Badge de estado */}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                            ✅ Imagen optimizada
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="cursor-pointer" />
        <CarouselNext className="hidden sm:flex cursor-pointer" />
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;
