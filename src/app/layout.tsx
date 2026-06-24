import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/maia/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://maia-store.vercel.app';

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
    "Swarovski",
    "piedras naturales",
    "joyería artesanal",
  ],
  authors: [{ name: "Maia Store" }],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Maia Store | Joyas Tejidas a Mano",
    description:
      "Colección exclusiva de joyas artesanales tejidas a mano. Diseños únicos peruanos con la mejor calidad.",
    type: "website",
    locale: "es_PE",
    siteName: "Maia Store",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Maia Store | Joyas Tejidas a Mano",
    description:
      "Colección exclusiva de joyas artesanales tejidas a mano. Diseños únicos peruanos.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
