"use client";

import type React from "react";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Expand,
  Heart,
  Share2,
  ZoomIn,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface CarouselProductProps {
  images: Array<{
    id: number;
    url: string;
  }>;
}

const CarouselProduct = ({ images }: CarouselProductProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  // Función para manejar el zoom con lupa
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  }, []);

  // Si no hay imágenes, mostrar placeholder
  if (!images || images.length === 0) {
    return (
      <div className="flex gap-4">
        <Card className="flex-1 aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <span className="text-gray-400">Sin imagen</span>
        </Card>
      </div>
    );
  }

  const currentImage = images[selectedImageIndex];
  // const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

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
    setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
  };

  const visibleThumbnails = images.slice(
    thumbnailStartIndex,
    thumbnailStartIndex + maxVisibleThumbnails
  );

  return (
    <div className="flex gap-4">
      {/* Thumbnails Column - Solo si hay más de 1 imagen */}
      {images.length > 1 && (
        <div className="flex flex-col w-20 sm:w-24">
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
                      src={`${image.url}`}
                      alt={`Thumbnail ${actualIndex + 1}`}
                      fill
                      className="object-cover transition-transform duration-200 hover:scale-110"
                      sizes="(max-width: 640px) 80px, 96px"
                    />

                    {/* Overlay para imagen no seleccionada */}
                    {selectedImageIndex !== actualIndex && (
                      <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-200" />
                    )}

                    {/* Icono de zoom en hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                      <div className="bg-white/90 rounded-full p-1">
                        <ZoomIn className="w-3 h-3 text-gray-700" />
                      </div>
                    </div>

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
                src={`${currentImage.url}`}
                alt={`Producto imagen ${selectedImageIndex + 1}`}
                fill
                className={`object-cover transition-transform duration-300 ${
                  isZooming ? "scale-200" : "group-hover:scale-200"
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
              />

              {/* Overlay con controles */}
              <div className="absolute inset-0 bg-black/0  group-hover:bg-black/5 transition-colors duration-300" />

              {/* Badges */}
              <div className="absolute space-x-1 top-4 left-4 space-y-2">
                <Badge className="bg-green-500 hover:bg-green-600 text-white">
                  100% Natural
                </Badge>
                <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
                  Artesanal
                </Badge>
              </div>

              {/* Acciones superiores */}
              <div className="absolute  top-4 right-4 space-x-1 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-white/90 hover:bg-white"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-white/90 hover:bg-white"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="bg-white/90 hover:bg-white"
                    >
                      <Expand className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl w-full p-0">
                    <div className="relative aspect-square">
                      <Image
                        src={`${currentImage.url}`}
                        alt={`Producto imagen ${selectedImageIndex + 1}`}
                        fill
                        className="object-contain"
                        sizes="90vw"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Indicador de zoom */}
              {isZooming && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-black/70 text-white px-3 py-1 rounded-full text-xs flex items-center space-x-1">
                    <ZoomIn className="w-3 h-3" />
                    <span>Zoom activo</span>
                  </div>
                </div>
              )}

              {/* Lupa visual (círculo que sigue el mouse) */}
              {isZooming && (
                <div
                  className="absolute pointer-events-none border-2 border-white rounded-full shadow-lg"
                  style={{
                    width: "100px",
                    height: "100px",
                    left: `${zoomPosition.x}%`,
                    top: `${zoomPosition.y}%`,
                    transform: "translate(-50%, -50%)",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(1px)",
                  }}
                />
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CarouselProduct;
