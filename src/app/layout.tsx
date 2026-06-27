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
  icons: {
    icon: [
      { url: "/favicon-32x32.webp", sizes: "32x32", type: "image/webp" },
      { url: "/favicon-16x16.webp", sizes: "16x16", type: "image/webp" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    images: [
      {
        url: "/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "Maia Store — Joyas Tejidas a Mano",
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.webp",
        width: 1200,
        height: 1200,
        alt: "Maia Store — Joyas Tejidas a Mano",
        type: "image/webp",
      },
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maia Store — Joyas Tejidas a Mano",
        type: "image/jpeg",
      },
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Maia Store — Joyas Tejidas a Mano",
        type: "image/webp",
      },
    ],
  },
};

// Minimal root layout — just html + body + fonts.
// Store chrome (nav, footer) lives in (store)/layout.tsx
// Admin (Sanity Studio) lives in admin/layout.tsx — completely isolated
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
      </body>
    </html>
  );
}