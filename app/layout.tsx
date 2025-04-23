import { AuthProvider } from "@/components/general/AuthProvider";
import Footer from "@/components/general/Footer";
import Navbar from "@/components/general/Navbar";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Curated Chronicles | Your Gateway to Thoughtful Content",
  description: "Discover curated stories, insights, and perspectives from around the world. A platform for meaningful content and engaging discussions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 antialiased`}
      >
        <Navbar/>
        {children}
        <Footer/>
        <Analytics/>
      </body>
    </html>
    </AuthProvider>
  );
}
