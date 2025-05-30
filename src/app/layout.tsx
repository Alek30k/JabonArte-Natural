// app/layout.tsx
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

// const queryClient = new QueryClient();

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
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* <QueryClientProvider client={queryClient}> */}
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster richColors position="bottom-right" />
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
          {/* </QueryClientProvider> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
