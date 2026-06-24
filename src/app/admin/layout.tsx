/**
 * Admin Layout — ISOLATED from the store.
 * Sanity Studio runs here without any store chrome (nav, footer, etc.).
 */
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "#1c1c1c",
      }}
    >
      {children}
    </div>
  );
}