"use client";

import { NextStudio } from "next-sanity/studio";
import sanityConfig from "../../../../sanity.config";

/**
 * Sanity Studio — mounted at /admin
 *
 * CRITICAL: `history="hash"` prevents "Tool not found: admin" error.
 * With browser history (default), Studio reads pathname "/admin"
 * and tries to find a tool named "admin" — which doesn't exist.
 * Hash history uses #structure, #presentation in the URL instead.
 */

function SanityConfigGuard() {
  const projectId = sanityConfig.projectId;

  if (!projectId) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#1c1c1c",
        color: "#fff",
        fontFamily: "system-ui, -apple-system, sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}>
        <div style={{ maxWidth: 520 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>&#x26A0;&#xFE0F;</div>
          <h1 style={{ fontSize: 22, marginBottom: 12, color: "#f87171" }}>
            Sanity Studio &#8212; Configuraci&#243;n incompleta
          </h1>
          <p style={{ fontSize: 14, color: "#a1a1aa", marginBottom: 24, lineHeight: 1.6 }}>
            La variable de entorno <code style={{ background: "#27272a", padding: "2px 8px", borderRadius: 4, color: "#fbbf24" }}>NEXT_PUBLIC_SANITY_PROJECT_ID</code> no est&#225; configurada.
          </p>
          <div style={{ background: "#27272a", borderRadius: 8, padding: 16, textAlign: "left", fontSize: 13, color: "#d4d4d8", lineHeight: 1.8 }}>
            <p><strong>Pasos para solucionar:</strong></p>
            <ol style={{ paddingLeft: 20, margin: "8px 0" }}>
              <li>Ve a <a href="https://vercel.com/dashboard" target="_blank" rel="noreferrer" style={{ color: "#60a5fa" }}>Vercel Dashboard</a> &#8594; tu proyecto &#8594; Settings &#8594; Environment Variables</li>
              <li>Agrega: <code style={{ color: "#fbbf24" }}>NEXT_PUBLIC_SANITY_PROJECT_ID</code> = tu project ID de Sanity</li>
              <li>Agrega: <code style={{ color: "#fbbf24" }}>NEXT_PUBLIC_SANITY_DATASET</code> = production</li>
              <li>Agrega: <code style={{ color: "#fbbf24" }}>NEXT_PUBLIC_SANITY_API_READ_TOKEN</code> = tu token de lectura</li>
              <li>Agrega: <code style={{ color: "#fbbf24" }}>SANITY_API_READ_TOKEN</code> = mismo token (server-side)</li>
              <li>Redeploy el proyecto en Vercel</li>
            </ol>
          </div>
          <a
            href="/"
            style={{
              display: "inline-block",
              marginTop: 16,
              color: "#60a5fa",
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            &#8592; Volver a la tienda
          </a>
        </div>
      </div>
    );
  }

  return <NextStudio config={sanityConfig} history="hash" />;
}

export default function AdminPage() {
  return <SanityConfigGuard />;
}