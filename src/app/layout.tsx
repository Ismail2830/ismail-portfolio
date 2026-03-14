"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}