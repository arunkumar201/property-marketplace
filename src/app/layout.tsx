import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { env } from "@/env";
import OgImage from "../../public/og-image.jpeg"
import Navbar from "@/components/Navbar";

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
  title: "Property Marketplace - Find Your Dream Home",
  description: "Search and find properties based on location with advanced filters and pagination. Explore our extensive property listings and find your dream home today.",
  keywords: "property, real estate, home, search, filters, pagination, location, dream home",
  openGraph: {
    title: "Property Marketplace - Find Your Dream Home",
    description: "Search and find properties based on location with advanced filters and pagination. Explore our extensive property listings and find your dream home today.",
    type: "website",
    url: env.NEXT_PUBLIC_WEB_URL,
    images: ['./og-image'],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@propertymarketplace",
    site: "@propertymarketplace",
    images: ['./og-image'],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
