"use client";

import type React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ZoomIn, ChevronUp, ChevronDown } from "lucide-react";

interface CarouselProductDebugProps {
  images: Array<{
    id: number;
    url: string;
  }>;
}

const CarouselProductDebug = ({ images }: CarouselProductDebugProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [imageLoadStatus, setImageLoadStatus] = useState<
    Record<string, boolean>
  >({});
  const imageRef = useRef<HTMLDivElement>(null);

  // Debug detallado al montar el componente
  useEffect(() => {
    const debug = {
      imagesReceived: images,
      imagesCount: images?.length || 0,
      firstImageUrl: images?.[0]?.url || "No hay primera imagen",
      backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
      environment: process.env.NODE_ENV,
      userAgent:
        typeof window !== "undefined"
          ? window.navigator.userAgent.substring(0, 100)
          : "SSR",
      timestamp: new Date().toISOString(),
    };

    console.group("🔍 CarouselProductDebug - Información completa");
    console.log("📦 Props recibidas:", images);
    console.log("🌍 Variables de entorno:", {
      NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
      NODE_ENV: process.env.NODE_ENV,
    });
    console.log("📱 Info del dispositivo:", {
      userAgent: debug.userAgent,
      innerWidth: typeof window !== "undefined" ? window.innerWidth : "SSR",
    });
    console.groupEnd();

    setDebugInfo(debug);
  }, [images]);

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) {
      console.log("❌ URL vacía recibida");
      return "/placeholder.svg?height=400&width=400";
    }

    console.log("🖼️ Procesando URL:", imageUrl);
    console.log(
      "🌍 Backend URL disponible:",
      process.env.NEXT_PUBLIC_BACKEND_URL
    );

    // Si ya es una URL completa (Cloudinary o externa)
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      console.log("✅ URL completa detectada:", imageUrl);
      return imageUrl;
    }

    // Si es una URL relativa, construir la URL completa
    if (imageUrl.startsWith("/uploads/")) {
      const fullUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`;
      console.log("🔧 URL relativa convertida:", fullUrl);
      return fullUrl;
    }

    // Si no empieza con /, agregar /uploads/
    const constructedUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${imageUrl}`;
    console.log("🔧 URL construida:", constructedUrl);
    return constructedUrl;
  };

  const handleImageLoad = (imageUrl: string) => {
    console.log("✅ Imagen cargada exitosamente:", imageUrl);
    setImageLoadStatus((prev) => ({ ...prev, [imageUrl]: true }));
  };

  const handleImageError = (imageUrl: string, context: string) => {
    console.error(`❌ Error cargando imagen (${context}):`, imageUrl);
    setImageLoadStatus((prev) => ({ ...prev, [imageUrl]: false }));
  };

  // Función para manejar el zoom con lupa (solo desktop)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  }, []);

  // Si no hay imágenes, mostrar placeholder con debug
  if (!images || images.length === 0) {
    return (
      <div className="flex gap-4">
        <Card className="flex-1 aspect-square bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center p-4">
          <span className="text-gray-400 mb-4">Sin imágenes</span>
          <div className="text-xs text-gray-500 text-center">
            <p>Props recibidas: {JSON.stringify(images)}</p>
            <p>Tipo: {typeof images}</p>
            <p>Es array: {Array.isArray(images) ? "Sí" : "No"}</p>
          </div>
        </Card>
      </div>
    );
  }

  const currentImage = images[selectedImageIndex];
  const currentImageUrl = getImageUrl(currentImage.url);

  // Número máximo de thumbnails visibles
  const maxVisibleThumbnails = 4;
  const showScrollButtons = images.length > maxVisibleThumbnails;

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const scrollThumbnailsUp = () => {
    setThumbnailStartIndex((prev) => Math.max(0, prev - 1));
  };

  const scrollThumbnailsDown = () => {
    setThumbnailStartIndex((prev) =>
      Math.min(images.length - maxVisibleThumbnails, prev + 1)
    );
  };

  const handleMouseEnter = () => {
    // Solo habilitar zoom en desktop
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setIsZooming(true);
    }
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
  };

  const visibleThumbnails = images.slice(
    thumbnailStartIndex,
    thumbnailStartIndex + maxVisibleThumbnails
  );

  return (
    <div className="space-y-4">
      {/* Panel de debug */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-bold text-blue-800 mb-2">🔍 Debug del Carousel</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <p>
              <strong>Imágenes recibidas:</strong> {debugInfo.imagesCount}
            </p>
            <p>
              <strong>Imagen actual:</strong> {selectedImageIndex + 1}
            </p>
            <p>
              <strong>URL actual:</strong> {currentImageUrl}
            </p>
            <p>
              <strong>Backend URL:</strong>{" "}
              {debugInfo.backendUrl || "❌ No definida"}
            </p>
          </div>
          <div>
            <p>
              <strong>Entorno:</strong> {debugInfo.environment}
            </p>
            <p>
              <strong>Timestamp:</strong> {debugInfo.timestamp}
            </p>
            <p>
              <strong>Estado de carga:</strong>{" "}
              {imageLoadStatus[currentImageUrl] ? "✅ OK" : "❌ Error"}
            </p>
          </div>
        </div>

        {/* Lista de todas las imágenes */}
        <details className="mt-3">
          <summary className="cursor-pointer text-blue-700 font-medium">
            Ver todas las imágenes
          </summary>
          <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
            {images.map((img, idx) => (
              <div key={img.id} className="text-xs p-1 bg-white rounded">
                <strong>#{idx + 1}:</strong> {getImageUrl(img.url)}
              </div>
            ))}
          </div>
        </details>
      </div>

      {/* Carousel principal */}
      <div className="flex gap-4">
        {/* Thumbnails Column - Solo si hay más de 1 imagen y no es móvil */}
        {images.length > 1 && (
          <div className="hidden md:flex flex-col w-20 sm:w-24">
            {/* Botón scroll up */}
            {showScrollButtons && thumbnailStartIndex > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="mb-2 h-8 w-full"
                onClick={scrollThumbnailsUp}
              >
                <ChevronUp className="w-4 h-4" />
              </Button>
            )}

            {/* Thumbnails */}
            <div className="flex flex-col gap-2 flex-1">
              {visibleThumbnails.map((image, index) => {
                const actualIndex = thumbnailStartIndex + index;
                const thumbUrl = getImageUrl(image.url);
                return (
                  <Card
                    key={image.id}
                    className={`cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-md ${
                      selectedImageIndex === actualIndex
                        ? "ring-2 ring-green-500 ring-offset-1"
                        : "hover:ring-1 hover:ring-gray-300"
                    }`}
                    onClick={() => handleThumbnailClick(actualIndex)}
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={thumbUrl || "/placeholder.svg"}
                        alt={`Thumbnail ${actualIndex + 1}`}
                        fill
                        className="object-cover transition-transform duration-200 hover:scale-110"
                        sizes="(max-width: 640px) 80px, 96px"
                        onLoad={() => handleImageLoad(thumbUrl)}
                        onError={() => handleImageError(thumbUrl, "thumbnail")}
                      />

                      {/* Indicador de estado de carga */}
                      <div className="absolute top-1 left-1 text-xs">
                        {imageLoadStatus[thumbUrl] === true ? (
                          <span className="bg-green-500 text-white px-1 rounded">
                            ✅
                          </span>
                        ) : imageLoadStatus[thumbUrl] === false ? (
                          <span className="bg-red-500 text-white px-1 rounded">
                            ❌
                          </span>
                        ) : (
                          <span className="bg-yellow-500 text-white px-1 rounded">
                            ⏳
                          </span>
                        )}
                      </div>

                      {/* Overlay para imagen no seleccionada */}
                      {selectedImageIndex !== actualIndex && (
                        <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-200" />
                      )}

                      {/* Indicador de imagen actual */}
                      {selectedImageIndex === actualIndex && (
                        <div className="absolute bottom-1 right-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Botón scroll down */}
            {showScrollButtons &&
              thumbnailStartIndex + maxVisibleThumbnails < images.length && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 h-8 w-full"
                  onClick={scrollThumbnailsDown}
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
              )}

            {/* Contador de imágenes */}
            <div className="text-center mt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {selectedImageIndex + 1}/{images.length}
              </span>
            </div>
          </div>
        )}

        {/* Imagen Principal */}
        <div className="flex-1">
          <div className="relative group">
            <Card className="overflow-hidden bg-gray-50 dark:bg-gray-800">
              <div
                ref={imageRef}
                className="relative aspect-square cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Image
                  src={currentImageUrl || "/placeholder.svg"}
                  alt={`Producto imagen ${selectedImageIndex + 1}`}
                  fill
                  className={`object-cover transition-transform duration-300 ${
                    isZooming ? "scale-150" : "md:group-hover:scale-110"
                  }`}
                  style={
                    isZooming
                      ? {
                          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        }
                      : {}
                  }
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority={selectedImageIndex === 0}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  onLoad={() => handleImageLoad(currentImageUrl)}
                  onError={() =>
                    handleImageError(currentImageUrl, "imagen principal")
                  }
                />

                {/* Indicador de estado de la imagen principal */}
                <div className="absolute top-2 left-2 flex gap-1">
                  <div className="text-xs px-2 py-1 rounded text-white bg-black/70">
                    {imageLoadStatus[currentImageUrl] === true
                      ? "✅ Cargada"
                      : imageLoadStatus[currentImageUrl] === false
                      ? "❌ Error"
                      : "⏳ Cargando"}
                  </div>
                </div>

                {/* URL de debug */}
                <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-xs p-1 rounded">
                  {currentImageUrl}
                </div>

                {/* Overlay con controles */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

                {/* Badges */}
                <div className="absolute top-4 right-4 space-y-2">
                  <Badge className="bg-green-500 hover:bg-green-600 text-white">
                    100% Natural
                  </Badge>
                  <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
                    Artesanal
                  </Badge>
                </div>

                {/* Indicador de zoom (solo desktop) */}
                {isZooming && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-black/70 text-white px-3 py-1 rounded-full text-xs flex items-center space-x-1">
                      <ZoomIn className="w-3 h-3" />
                      <span>Zoom activo</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Thumbnails horizontales para móvil */}
          {images.length > 1 && (
            <div className="md:hidden mt-4 flex space-x-2 overflow-x-auto pb-2">
              {images.map((image, index) => {
                const mobileThumbUrl = getImageUrl(image.url);
                return (
                  <Card
                    key={image.id}
                    className={`flex-shrink-0 cursor-pointer overflow-hidden transition-all duration-200 ${
                      selectedImageIndex === index
                        ? "ring-2 ring-green-500 ring-offset-1"
                        : "opacity-70"
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <div className="relative w-16 h-16">
                      <Image
                        src={mobileThumbUrl || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                        onLoad={() => handleImageLoad(mobileThumbUrl)}
                        onError={() =>
                          handleImageError(mobileThumbUrl, "mobile thumbnail")
                        }
                      />
                      {/* Indicador de estado móvil */}
                      <div className="absolute top-0 right-0 text-xs">
                        {imageLoadStatus[mobileThumbUrl] === true ? (
                          <span className="bg-green-500 text-white w-2 h-2 rounded-full block"></span>
                        ) : imageLoadStatus[mobileThumbUrl] === false ? (
                          <span className="bg-red-500 text-white w-2 h-2 rounded-full block"></span>
                        ) : null}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarouselProductDebug;
