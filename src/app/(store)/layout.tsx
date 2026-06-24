import type { Metadata } from "next";
import { Providers } from "@/components/maia/Providers";
import Navigation from "@/components/maia/Navigation";
import Footer from "@/components/maia/Footer";
import BottomAppBar from "@/components/maia/BottomAppBar";
import CartDrawer from "@/components/maia/CartDrawer";
import ScrollToTop from "@/components/maia/ScrollToTop";
import ScrollProgress from "@/components/maia/ScrollProgress";
import { VisualEditing } from "@/components/cms/VisualEditing";
import { SanityLive } from "@/sanity/live";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maia-store.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Maia Store | Joyas Tejidas a Mano - Artesanía Peruana de Lujo",
    template: "%s | Maia Store",
  },
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
  alternates: { canonical: siteUrl },
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
      <BottomAppBar />
      <CartDrawer />
      <ScrollToTop />
      <ScrollProgress />
      {/* Sanity Visual Editing — only active in draft mode */}
      <SanityLive />
      <VisualEditing />
    </Providers>
  );
}