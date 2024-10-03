import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { env } from "@/env";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FilterProvider } from "@/providers/FilterProvider";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_WEB_URL),
  title: "Property Marketplace - Find Your Dream Home",
  description: "Search and find properties based on location with advanced filters and pagination. Explore our extensive property listings and find your dream home today.",
  keywords: "property, real estate, home, search, filters, pagination, location, dream home",
  openGraph: {
    title: "Property Marketplace - Find Your Dream Home",
    description: "Search and find properties based on location with advanced filters and pagination. Explore our extensive property listings and find your dream home today.",
    type: "website",
    url: env.NEXT_PUBLIC_WEB_URL,
    images: ['./og-image.jpeg'],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@propertymarketplace",
    site: "@propertymarketplace",
    images: ['./og-image.jpeg'],
    title: "Property Marketplace - Find Your Dream Home",
    description: "Search and find properties based on location with advanced filters and pagination. Explore our extensive property listings and find your dream home today.",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <div className="flex flex-col min-h-screen antialiased p-12 overflow-scroll">
          <FilterProvider>
            <Toaster
              position="bottom-right"
            />
            <Navbar />
            {children}
            <Footer />
          </FilterProvider>
        </div>
      </body>
    </html>
  );
}
