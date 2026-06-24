"use client";

import dynamic from "next/dynamic";

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  { ssr: false }
);

import sanityConfig from "../../../../sanity.config";

export default function AdminPage() {
  return <NextStudio config={sanityConfig} />;
}