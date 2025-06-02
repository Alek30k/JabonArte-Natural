"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function NavbarSkeleton() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white dark:bg-gray-900 border-b">
      {/* Banner superior skeleton */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-600 text-white text-xs mb-5 sm:text-sm py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Skeleton className="h-4 w-48 bg-white/20" />
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Skeleton className="h-4 w-40 bg-white/20" />
          </div>
        </div>
      </div>

      {/* Navbar principal skeleton */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo skeleton */}
          <div className="flex items-center pl-3 flex-shrink-0">
            <Skeleton className="h-8 w-40 bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Navigation - Desktop skeleton */}
          <div className="hidden lg:flex items-center space-x-8">
            <Skeleton className="h-6 w-16 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-6 w-20 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-6 w-18 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-6 w-16 bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Search Bar skeleton */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <Skeleton className="w-full h-10 bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Actions skeleton */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />

            {/* Mobile menu button skeleton */}
            <div className="lg:hidden">
              <Skeleton className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
