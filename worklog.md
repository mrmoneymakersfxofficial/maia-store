---
Task ID: 2
Agent: Super Z (Main Agent)
Task: Restructure Maia Store into multi-page SPA with real slugs and sub-pages

Work Log:
- Created shared data layer (/src/lib/store-data.ts) with Product interface, 6 products with full details (slug, longDescription, features, rating, reviews), categories, testimonials, payment methods with steps, helper functions (getProductBySlug, getRelatedProducts, formatPrice, generateWhatsAppLink)
- Built hash-based router system (/src/lib/router.tsx) with RouterProvider context, useRouter hook, RouterLink component, route parsing (supports slugs and category params), navigate/back functions
- Created 6 page components:
  - HomePage: Hero with GSAP animations, featured products grid (clickable to detail), testimonials preview
  - NosotrosPage: Full story page with parallax image, features grid, GSAP scroll animations
  - ColeccionPage: Full catalog with category filters (synced to URL), breadcrumb, product cards with hover overlays
  - ProductDetailPage: Full product view with slug routing, long description, features list, WhatsApp CTA, related products grid, trust badges, breadcrumbs
  - ComprarPage: Payment methods with step-by-step process, guarantees, FAQ accordion section
  - ContactoPage: Contact cards (WhatsApp, Instagram, Location), testimonials, CTA banner
- Rewrote Navigation: Hash-based routing with active page underline (layoutId animation), mobile menu with route-aware closing
- Rewrote Footer: All links use router navigate(), category links with proper slugs
- Rewrote page.tsx: RouterProvider wrapper, AnimatePresence page transitions, dynamic page routing based on hash
- Fixed lint errors: Removed setState-in-effect, derived state from route params
- All lint checks pass (0 errors)

Stage Summary:
- Multi-page SPA architecture with hash routing (#/home, #/coleccion, #/coleccion/slug, #/comprar, #/nosotros, #/contacto)
- 6 products with unique slugs (pulsera-turquesa-elite, collar-bohemio-real, aretes-danza-del-viento, anillo-primavera, tobillera-ondas-del-mar, pulsera-encanto-andino)
- Category filtering via URL: #/coleccion/categoria/pulseras
- Product detail: #/coleccion/pulsera-turquesa-elite
- Breadcrumbs on all sub-pages
- Page transitions with Framer Motion AnimatePresence
- Active navigation indicator with layoutId spring animation
