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
import { getBlurDataUrl, getImageUrl } from "@/utils/imagenUtils";
import Head from "next/head";

interface CarouselProductFixedProps {
  images: Array<{
    id: number;
    url: string;
  }>;
}

const CarouselProductFixed = ({ images }: CarouselProductFixedProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition > { x, y };
  }, []);

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
    if (window.innerWidth >= 768) {
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
    <>
      {/* Preload LCP image */}
      {selectedImageIndex === 0 && (
        <Head>
          <link
            rel="preload"
            href={getImageUrl(currentImage.url, 800, 512)} // Match LCP dimensions
            as="image"
            fetchPriority="high"
          />
        </Head>
      )}
      <div className="flex gap-4 mt-20">
        {images.length > 1 && (
          <div className="hidden md:flex flex-col w-20 sm:w-24">
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
            <div className="flex flex-col gap-2 flex-1">
              {visibleThumbnails.map((image, index) => {
                const actualIndex = thumbnailStartIndex + index;
                const thumbnailUrl = getImageUrl(image.url, 96, 96);
                const thumbnailBlurUrl = getBlurDataUrl(image.url);
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
                        src={thumbnailUrl}
                        alt={`Thumbnail ${actualIndex + 1}`}
                        width={96}
                        height={96}
                        className="object-cover transition-transform duration-200 hover:scale-110"
                        sizes="96px"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={thumbnailBlurUrl}
                        onError={(e) => {
                          console.error(
                            "❌ Error cargando thumbnail:",
                            thumbnailUrl
                          );
                          e.currentTarget.src =
                            "/placeholder.svg?height=96&width=96";
                        }}
                      />
                      {selectedImageIndex !== actualIndex && (
                        <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-200" />
                      )}
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
            <div className="text-center mt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {selectedImageIndex + 1}/{images.length}
              </span>
            </div>
          </div>
        )}
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
                  src={getImageUrl(currentImage.url, 800, 800)}
                  alt={`Producto imagen ${selectedImageIndex + 1}`}
                  fill
                  className={`object-contain transition-transform duration-300 ${
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
                  blurDataURL={getBlurDataUrl(currentImage.url)}
                  onError={(e) => {
                    console.error(
                      "❌ Error cargando imagen principal:",
                      getImageUrl(currentImage.url, 800, 800)
                    );
                    e.currentTarget.src =
                      "/placeholder.svg?height=800&width=800";
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                <div className="absolute top-4 left-4 space-x-2 space-y-2">
                  <Badge className="bg-green-500 hover:bg-green-600 text-white">
                    100% Natural
                  </Badge>
                  <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
                    Artesanal
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
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
                          src={getImageUrl(currentImage.url, 1200, 1200)}
                          alt={`Producto imagen ${selectedImageIndex + 1}`}
                          fill
                          className="object-contain"
                          sizes="90vw"
                          // loading="lazy"
                          placeholder="blur"
                          blurDataURL={getBlurDataUrl(currentImage.url)}
                          onError={(e) => {
                            console.error(
                              "❌ Error cargando imagen de diálogo:",
                              getImageUrl(currentImage.url, 800, 800)
                            );
                            e.currentTarget.src =
                              "/placeholder.svg?height=800&width=800";
                          }}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
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
          {images.length > 1 && (
            <div className="md:hidden mt-4 p-1 flex space-x-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
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
                      src={getImageUrl(image.url, 64, 64)}
                      alt={`Thumbnail ${index + 1}`}
                      width={64}
                      height={64}
                      className="object-cover"
                      sizes="64px"
                      // loading="lazy"
                      placeholder="blur"
                      blurDataURL={getBlurDataUrl(image.url)}
                      onError={(e) => {
                        console.error(
                          "❌ Error cargando thumbnail móvil:",
                          getImageUrl(image.url, 64, 64)
                        );
                        e.currentTarget.src =
                          "/placeholder.svg?height=64&width=64";
                      }}
                    />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CarouselProductFixed;
