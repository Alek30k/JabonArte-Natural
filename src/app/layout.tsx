import type React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import NavbarSkeleton from "@/components/NavbarSkeleton";
import SafeClientComponent from "@/components/SafeClientComponent";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Regalos del corazón",
  description: "Welcome to my ecommerce Regalos del corazón",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignOutUrl="/"
      appearance={{
        variables: {
          colorPrimary: "#db2777",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* Meta tags para prevenir modificaciones de extensiones */}
          <meta name="format-detection" content="telephone=no" />
          <meta name="format-detection" content="date=no" />
          <meta name="format-detection" content="address=no" />
          <meta name="format-detection" content="email=no" />
          <link
            rel="preconnect"
            href="https://res.cloudinary.com"
            crossOrigin="anonymous"
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SafeClientComponent
              componentName="Navbar"
              fallback={<NavbarSkeleton />}
              delay={100} // Pequeño delay para suavizar la transición
            >
              <Navbar />
            </SafeClientComponent>

            <Toaster richColors position="bottom-right" />

            {children}

            <SafeClientComponent
              componentName="Footer"
              fallback={<div className="h-64 bg-gray-100 dark:bg-gray-800" />}
            >
              <Footer />
            </SafeClientComponent>

            <SafeClientComponent componentName="CookieConsent">
              <CookieConsent />
            </SafeClientComponent>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
