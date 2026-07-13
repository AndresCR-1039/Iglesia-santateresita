import type { Metadata } from "next";
import { Nunito, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

const nunito = Nunito({ 
  subsets: ["latin"], 
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700"]
});

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Parroquia Santa Teresita del Niño Jesús",
  description: "Sitio oficial de la Parroquia Santa Teresita del Niño Jesús",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${nunito.variable} ${cormorant.variable} antialiased bg-[#1a1510] text-[#f0e6d3] font-nunito`}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
