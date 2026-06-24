'use client';

export default function AdminPage() {
  // The NextStudio component from next-sanity will be lazily loaded
  // to avoid SSR issues with Sanity Studio
  return (
    <div id="sanity-studio-root" style={{ minHeight: '100vh' }}>
      <p style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
        Cargando Studio... Si no carga, verifica las variables de entorno de Sanity.
      </p>
    </div>
  );
}