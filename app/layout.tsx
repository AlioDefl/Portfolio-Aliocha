import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Cursor from "@/components/layout/Cursor";
import Loader from "@/components/dom/Loader";
import Lights from "@/components/layout/Lights";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  title: "ALIOCHA DEFLOU — Full Stack Developer",
  description: "Portfolio d'Aliocha Deflou, développeur full stack à Lille. Création d'applications web modernes avec React, Next.js, Three.js et GSAP.",
  keywords: ["développeur", "full stack", "React", "Next.js", "Three.js", "portfolio", "Lille", "web developer"],
  authors: [{ name: "Aliocha Deflou" }],
  creator: "Aliocha Deflou",
  metadataBase: new URL("https://aliocha.dev"),
  alternates: {
    languages: {
      "fr": "/",
      "en": "/",
    },
  },
  openGraph: {
    title: "ALIOCHA DEFLOU — Full Stack Developer",
    description: "Développeur full stack créatif, spécialisé dans les expériences web immersives.",
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    siteName: "Portfolio Aliocha Deflou",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aliocha Deflou - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ALIOCHA DEFLOU — Full Stack Developer",
    description: "Développeur full stack créatif, spécialisé dans les expériences web immersives.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-mono">
        <Loader />
        <Cursor />
        <Lights />
        <div className="grain" aria-hidden="true" />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
