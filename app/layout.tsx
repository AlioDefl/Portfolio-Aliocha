import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Cursor from "@/components/layout/Cursor";
import Loader from "@/components/dom/Loader";

import Lights from "@/components/layout/Lights";

export const metadata: Metadata = {
  title: "ALIOCHA — Creative Engineer",
  description: "Portfolio of Aliocha, a creative engineer building digital experiences at the intersection of code, design, and chaos.",
  openGraph: {
    title: "ALIOCHA — Creative Engineer",
    description: "Building digital experiences at the intersection of code, design, and chaos.",
    type: "website",
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
