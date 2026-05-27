import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maia Store | Joyas Tejidas a Mano - Artesanía Peruana de Lujo",
  description:
    "Descubre nuestra colección exclusiva de joyas tejidas a mano. Cada pieza es una obra de arte artesanal peruana, elaborada con dedicación y materiales de primera calidad. Envíos a todo el Perú.",
  keywords: [
    "joyas tejidas a mano",
    "joyería artesanal peruana",
    "Maia Store",
    "collares tejidos",
    "pulseras artesanales",
    "aretes hechos a mano",
    "joyería lujo Perú",
  ],
  authors: [{ name: "Maia Store" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Maia Store | Joyas Tejidas a Mano",
    description:
      "Colección exclusiva de joyas artesanales tejidas a mano. Diseños únicos peruanos con la mejor calidad.",
    type: "website",
    locale: "es_PE",
    siteName: "Maia Store",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maia Store | Joyas Tejidas a Mano",
    description:
      "Colección exclusiva de joyas artesanales tejidas a mano. Diseños únicos peruanos.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
