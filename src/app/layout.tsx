"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

// WebGL background is client-only to avoid SSR/hydration issues
const Background3D = dynamic(() => import("@/components/three/Background3D"), {
  ssr: false,
});
const CursorGlobe = dynamic(() => import("@/components/three/CursorGlobe"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>Ismail Ait Rehail | Full-Stack Developer</title>
        <meta name="description" content="Portfolio of Ismail Ait Rehail, Full-Stack Developer based in Rabat, Morocco" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-primary text-white antialiased`}>
        <Background3D />
        <CursorGlobe />
        <Navbar />
        {children}
      </body>
    </html>
  );
}