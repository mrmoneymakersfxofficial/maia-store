/**
 * seedCMS.ts — Pobla Sanity con la data de negocio de Maia Store
 *
 * USO:
 *   1. Crea un proyecto en https://www.sanity.io/manage
 *   2. Genera un token con permisos "Editor" en API > Tokens
 *   3. Configura .env.local con:
 *      NEXT_PUBLIC_SANITY_PROJECT_ID="tu-project-id"
 *      SANITY_API_READ_TOKEN="tu-token-con-permisos-de-escritura"
 *   4. Ejecuta: npx tsx scripts/seedCMS.ts
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_READ_TOKEN;

if (!projectId || !token) {
  console.error("ERROR: Faltan NEXT_PUBLIC_SANITY_PROJECT_ID o SANITY_API_READ_TOKEN en .env.local");
  console.error("Crea un proyecto en https://www.sanity.io/manage y configura las variables.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: false,
  token,
});

// ═══════════════════════════════════════════════════════════════
// DATA — Toda la informacion de Maia Store
// ═══════════════════════════════════════════════════════════════

const siteSettings = {
  _type: "siteSettings",
  companyName: "Maia Store",
  slogan: "Joyas Tejidas a Mano - Artesania Peruana de Lujo",
  tagline: "Descubre nuestra coleccion exclusiva de joyas tejidas a mano. Cada pieza es una obra de arte artesanal peruana, elaborada con dedicacion y materiales de primera calidad.",
  phone: "+51 977 333 858",
  whatsapp: "51977333858",
  email: "hola@maiastore.pe",
  address: "Peru",
  businessHours: "Lunes a Sabado 9:00 - 20:00",
  facebookUrl: "",
  instagramUrl: "https://instagram.com/maia_store81",
  linkedinUrl: "",
  tiktokUrl: "https://tiktok.com/@maia_store81",
  youtubeUrl: "",
  seoTitle: "Maia Store | Joyas Tejidas a Mano - Artesania Peruana de Lujo",
  seoDescription: "Descubre nuestra coleccion exclusiva de joyas tejidas a mano. Cada pieza es una obra de arte artesanal peruana. Envios a todo el Peru.",
};

const heroSlides = [
  {
    _type: "heroSlide",
    title: "Joyas Tejidas a Mano",
    subtitle: [
      { _type: "block", _key: "hs1", style: "normal", children: [{ _type: "span", _key: "hs1s1", text: "Cada pieza cuenta una historia. Descubre nuestra coleccion exclusiva de joyeria artesanal, tejida con amor y dedicacion en Peru." }] },
    ],
    ctaLabel: "Ver Coleccion",
    ctaLink: "/coleccion",
    ctaType: "primary",
    order: 1,
  },
  {
    _type: "heroSlide",
    title: "Artesania Peruana de Lujo",
    subtitle: [
      { _type: "block", _key: "hs2", style: "normal", children: [{ _type: "span", _key: "hs2s1", text: "Utilizando tecnicas tradicionales transmitidas de generacion en generacion. Disenadas para mujeres que valoran la autenticidad." }] },
    ],
    ctaLabel: "Como Comprar",
    ctaLink: "/comprar",
    ctaType: "secondary",
    order: 2,
  },
  {
    _type: "heroSlide",
    title: "Envios a Todo Peru",
    subtitle: [
      { _type: "block", _key: "hs3", style: "normal", children: [{ _type: "span", _key: "hs3s1", text: "Olva Courier y Shalom. Recibe tu joya artesanal en la puerta de tu casa. Pago seguro con Yape, Plin o transferencia bancaria." }] },
    ],
    ctaLabel: "Contactanos",
    ctaLink: "https://wa.me/51977333858",
    ctaType: "whatsapp",
    order: 3,
  },
];

const serviceCategories = [
  { _type: "serviceCategory", name: "Calidad Artesanal", slug: { _type: "slug", current: "calidad-artesanal" }, description: "Cada pieza es unica, tejida a mano con materiales premium", icon: "heart", color: "#006c83", order: 1 },
  { _type: "serviceCategory", name: "Envios y Logistica", slug: { _type: "slug", current: "envios-logistica" }, description: "Envios a todo el Peru con Olva Courier y Shalom", icon: "truck", color: "#006c83", order: 2 },
  { _type: "serviceCategory", name: "Atencion al Cliente", slug: { _type: "slug", current: "atencion-cliente" }, description: "Atencion personalizada por WhatsApp", icon: "message-circle", color: "#006c83", order: 3 },
  { _type: "serviceCategory", name: "Pagos Seguros", slug: { _type: "slug", current: "pagos-seguros" }, description: "Yape, Plin y transferencia bancaria", icon: "shield-check", color: "#006c83", order: 4 },
];

const services = [
  {
    _type: "service", title: "Hecho a Mano", slug: { _type: "slug", current: "hecho-a-mano" },
    description: [{ _type: "block", _key: "sd1", style: "normal", children: [{ _type: "span", _key: "sd1s1", text: "Cada joya Maia Store es creada artesanalmente utilizando tecnicas tradicionales peruanas. Nuestra artesanas invierten horas en cada pieza, asegurando que cada tejido sea perfecto y unico." }] }],
    category: { _type: "reference", _ref: "REPLACE_CAT_CALIDAD" },
    featured: true, order: 1,
    subservices: [
      { title: "Tejido a mano con hilos premium", description: "Utilizamos hilos de alta calidad resistentes al paso del tiempo" },
      { title: "Disenos unicos e irrepetibles", description: "Ninguna pieza es exactamente igual a otra" },
      { title: "Acabados profesionales", description: "Cada joya pasa por un riguroso control de calidad" },
    ],
  },
  {
    _type: "service", title: "Envios a Todo Peru", slug: { _type: "slug", current: "envios-todo-peru" },
    description: [{ _type: "block", _key: "sd2", style: "normal", children: [{ _type: "span", _key: "sd2s1", text: "Recibe tus joyas artesanales en cualquier ciudad del Peru. Trabajamos con Olva Courier y Shalom Express para garantizar entregas seguras y en tiempo." }] }],
    category: { _type: "reference", _ref: "REPLACE_CAT_ENVIOS" },
    featured: true, order: 2,
    subservices: [
      { title: "Olva Courier", description: "Envio nacional con seguimiento en linea" },
      { title: "Shalom Express", description: "Entrega rapida en Lima y provincias" },
      { title: "Empaque premium", description: "Cada joya viene en un empaque especial para regalo" },
    ],
  },
  {
    _type: "service", title: "Atencion Personalizada", slug: { _type: "slug", current: "atencion-personalizada" },
    description: [{ _type: "block", _key: "sd3", style: "normal", children: [{ _type: "span", _key: "sd3s1", text: "Escribenos por WhatsApp y recibe asesoramiento personalizado para elegir la joya perfecta. Te ayudamos a encontrar la pieza ideal para ti o para regalo." }] }],
    category: { _type: "reference", _ref: "REPLACE_CAT_ATENCION" },
    featured: true, order: 3,
    subservices: [
      { title: "WhatsApp directo", description: "Respuesta rapida por WhatsApp al +51 977 333 858" },
      { title: "Asesoria de compra", description: "Te ayudamos a elegir la joya ideal" },
      { title: "Pedidos personalizados", description: "Podemos crear piezas personalizadas bajo encargo" },
    ],
  },
  {
    _type: "service", title: "Pago Seguro", slug: { _type: "slug", current: "pago-seguro" },
    description: [{ _type: "block", _key: "sd4", style: "normal", children: [{ _type: "span", _key: "sd4s1", text: "Paga de forma segura y conveniente. Aceptamos Yape, Plin y transferencia bancaria. Tu compra esta protegida con encriptacion SSL de 256 bits." }] }],
    category: { _type: "reference", _ref: "REPLACE_CAT_PAGOS" },
    featured: true, order: 4,
    subservices: [
      { title: "Yape", description: "Transferencia instantanea desde tu app Yape" },
      { title: "Plin", description: "Pago rapido y seguro con Plin" },
      { title: "Transferencia Bancaria", description: "BCP, Interbank, BBVA, Scotiabank y mas" },
    ],
  },
];

const stats = [
  { _type: "stat", label: "Joyas Creadas", value: 500, suffix: "+", prefix: "", order: 1 },
  { _type: "stat", label: "Clientas Felices", value: 300, suffix: "+", prefix: "", order: 2 },
  { _type: "stat", label: "Disenos Unicos", value: 100, suffix: "+", prefix: "", order: 3 },
  { _type: "stat", label: "Anos de Experiencia", value: 3, suffix: "", prefix: "", order: 4 },
];

const testimonials = [
  {
    _type: "testimonial", authorName: "Maria Fernandez", authorRole: "Cliente frecuente", company: "Lima",
    quote: [{ _type: "block", _key: "t1", style: "normal", children: [{ _type: "span", _key: "t1s1", text: "Las pulseras de Maia Store son increibles. El tejido es perfecto y los materiales son de primera. Llevo pidiendo para regalos de cumpleanos y siempre sorprenden." }] }],
    rating: 5, featured: true, order: 1,
  },
  {
    _type: "testimonial", authorName: "Carla Mendoza", authorRole: "Disenadora", company: "Arequipa",
    quote: [{ _type: "block", _key: "t2", style: "normal", children: [{ _type: "span", _key: "t2s1", text: "Como disenadora, aprecio el nivel de detalle en cada pieza. Los collares tienen un acabado profesional que no se ve en otra joyeria artesanal." }] }],
    rating: 5, featured: true, order: 2,
  },
  {
    _type: "testimonial", authorName: "Lucia Torres", authorRole: "Profesora", company: "Cusco",
    quote: [{ _type: "block", _key: "t3", style: "normal", children: [{ _type: "span", _key: "t3s1", text: "Compre unos aretes para mi mama y le encantaron. El envio llego rapido a Cusco y el empaque era precioso. Sin duda volveré a comprar." }] }],
    rating: 5, featured: true, order: 3,
  },
  {
    _type: "testimonial", authorName: "Andrea Gutierrez", authorRole: "Emprendedora", company: "Trujillo",
    quote: [{ _type: "block", _key: "t4", style: "normal", children: [{ _type: "span", _key: "t4s1", text: "La calidad es excepcional. He comprado joyas en muchos lugares, pero las de Maia Store tienen algo especial: se nota el amor y dedicacion en cada puntada." }] }],
    rating: 5, featured: true, order: 4,
  },
  {
    _type: "testimonial", authorName: "Paola Ramos", authorRole: "Influencer", company: "Lima",
    quote: [{ _type: "block", _key: "t5", style: "normal", children: [{ _type: "span", _key: "t5s1", text: "Mis seguidores siempre me preguntan de donde son mis joyas. Maia Store se ha convertido en mi marca favorita para collares y pulseras tejidas." }] }],
    rating: 5, featured: true, order: 5,
  },
  {
    _type: "testimonial", authorName: "Sofia Herrera", authorRole: "Estudiante", company: "Piura",
    quote: [{ _type: "block", _key: "t6", style: "normal", children: [{ _type: "span", _key: "t6s1", text: "El servicio al cliente es excelente. Me ayudaron a elegir el regalo perfecto para mi amiga. La atencion por WhatsApp es rapidisima." }] }],
    rating: 5, featured: true, order: 6,
  },
  {
    _type: "testimonial", authorName: "Daniela Castillo", authorRole: "Abogada", company: "Chiclayo",
    quote: [{ _type: "block", _key: "t7", style: "normal", children: [{ _type: "span", _key: "t7s1", text: "Pedí un anillo tejido y superó mis expectativas. La calidad del hilo y la precisión del tejido son impresionantes. Recomiendo 100%." }] }],
    rating: 5, featured: false, order: 7,
  },
  {
    _type: "testimonial", authorName: "Valentina Quiroz", authorRole: "Arquitecta", company: "Lima",
    quote: [{ _type: "block", _key: "t8", style: "normal", children: [{ _type: "span", _key: "t8s1", text: "Me encanta que cada pieza es unica. Compre un collar y unas pulseras que combinan perfecto. Se nota la artesania peruana de alta calidad." }] }],
    rating: 4, featured: false, order: 8,
  },
];

const partners = [
  { _type: "partner", name: "Olva Courier", url: "https://www.olva.com.pe", order: 1 },
  { _type: "partner", name: "Shalom Express", url: "https://www.shalom.com.pe", order: 2 },
  { _type: "partner", name: "Yape", url: "https://www.yape.com.pe", order: 3 },
  { _type: "partner", name: "Plin", url: "https://www.plin.com.pe", order: 4 },
];

const teamMembers = [
  {
    _type: "teamMember", name: "Maia", slug: { _type: "slug", current: "maia" },
    role: "Fundadora y Artesana Principal",
    department: "Diseno y Tejido",
    bio: [{ _type: "block", _key: "tm1", style: "normal", children: [{ _type: "span", _key: "tm1s1", text: "Fundadora de Maia Store. Apasionada por la artesania peruana y el arte del tejido manual. Con anos de experiencia creando joyas unicas que combinan tradicion y estilo contemporaneo." }] }],
    email: "hola@maiastore.pe",
    phone: "+51 977 333 858",
    order: 1,
  },
];

const projects = [
  {
    _type: "project", title: "Coleccion Inaugural", slug: { _type: "slug", current: "coleccion-inaugural" },
    excerpt: "Nuestra primera coleccion de joyas tejidas a mano con hilos premium y cristales Swarovski.",
    status: "available", year: "2024", location: "Peru", area: "Collares, Pulseras, Aretes",
    tags: ["collares", "pulseras", "aretes", "swarovski", "inaugural"],
    featured: true, order: 1,
  },
  {
    _type: "project", title: "Coleccion Naturaleza Viva", slug: { _type: "slug", current: "naturaleza-viva" },
    excerpt: "Piezas inspiradas en la flora y fauna peruana, con tonos tierra y verdes amazonicos.",
    status: "available", year: "2024", location: "Peru", area: "Pulseras, Collares",
    tags: ["naturaleza", "verde", "piedras-naturales", "tierra"],
    featured: true, order: 2,
  },
  {
    _type: "project", title: "Coleccion Elegancia Nocturna", slug: { _type: "slug", current: "elegancia-nocturna" },
    excerpt: "Joyas para ocasiones especiales con acabados dorados y cristales brillantes.",
    status: "available", year: "2025", location: "Peru", area: "Aretes, Collares, Anillos",
    tags: ["elegancia", "noche", "dorado", "cristales"],
    featured: true, order: 3,
  },
];

// ═══════════════════════════════════════════════════════════════
// SEED FUNCTION
// ═══════════════════════════════════════════════════════════════

async function seed() {
  console.log("🌱 Seeding Maia Store CMS...\n");

  try {
    // 1. Site Settings
    console.log("  → Creando siteSettings...");
    await client.createOrReplace({
      _id: "siteSettings-maia-store",
      ...siteSettings,
    });
    console.log("  ✓ siteSettings creado\n");

    // 2. Service Categories
    console.log("  → Creando serviceCategories...");
    const catDocs = await Promise.all(serviceCategories.map((cat) =>
      client.createOrReplace({ _id: `serviceCategory-${cat.slug.current}`, ...cat })
    ));
    console.log(`  ✓ ${catDocs.length} categorias creadas\n`);

    // Build category reference map
    const catRefMap: Record<string, string> = {};
    for (const cat of serviceCategories) {
      const key = `REPLACE_CAT_${cat.slug.current.toUpperCase().replace(/-/g, "_")}`;
      catRefMap[key] = `serviceCategory-${cat.slug.current}`;
    }

    // 3. Services with correct category references
    console.log("  → Creando services...");
    const svcDocs = await Promise.all(services.map((svc) => {
      const doc = { ...svc };
      // Replace category references
      if (doc.category && (doc.category as any)._ref) {
        const refKey = (doc.category as any)._ref;
        if (catRefMap[refKey]) {
          (doc.category as any)._ref = catRefMap[refKey];
        }
      }
      return client.createOrReplace({ _id: `service-${svc.slug.current}`, ...doc });
    }));
    console.log(`  ✓ ${svcDocs.length} servicios creados\n`);

    // 4. Hero Slides
    console.log("  → Creando heroSlides...");
    const slideDocs = await Promise.all(heroSlides.map((slide, i) =>
      client.createOrReplace({ _id: `heroSlide-${i + 1}`, ...slide })
    ));
    console.log(`  ✓ ${slideDocs.length} slides creados\n`);

    // 5. Stats
    console.log("  → Creando stats...");
    const statDocs = await Promise.all(stats.map((stat, i) =>
      client.createOrReplace({ _id: `stat-${i + 1}`, ...stat })
    ));
    console.log(`  ✓ ${statDocs.length} estadisticas creadas\n`);

    // 6. Testimonials
    console.log("  → Creando testimonials...");
    const testDocs = await Promise.all(testimonials.map((test, i) =>
      client.createOrReplace({ _id: `testimonial-${i + 1}`, ...test })
    ));
    console.log(`  ✓ ${testDocs.length} testimonios creados\n`);

    // 7. Partners
    console.log("  → Creando partners...");
    const partDocs = await Promise.all(partners.map((partner, i) =>
      client.createOrReplace({ _id: `partner-${i + 1}`, ...partner })
    ));
    console.log(`  ✓ ${partDocs.length} partners creados\n`);

    // 8. Team Members
    console.log("  → Creando teamMembers...");
    const teamDocs = await Promise.all(teamMembers.map((member) =>
      client.createOrReplace({ _id: `teamMember-${member.slug.current}`, ...member })
    ));
    console.log(`  ✓ ${teamDocs.length} miembros del equipo creados\n`);

    // 9. Projects
    console.log("  → Creando projects...");
    const projDocs = await Promise.all(projects.map((proj) =>
      client.createOrReplace({ _id: `project-${proj.slug.current}`, ...proj })
    ));
    console.log(`  ✓ ${projDocs.length} proyectos creados\n`);

    console.log("═══════════════════════════════════════════════");
    console.log("  ✅ Seed completado exitosamente!");
    console.log("  📊 Resumen:");
    console.log(`     - 1 siteSettings`);
    console.log(`     - ${catDocs.length} serviceCategories`);
    console.log(`     - ${svcDocs.length} services`);
    console.log(`     - ${slideDocs.length} heroSlides`);
    console.log(`     - ${statDocs.length} stats`);
    console.log(`     - ${testDocs.length} testimonials`);
    console.log(`     - ${partDocs.length} partners`);
    console.log(`     - ${teamDocs.length} teamMembers`);
    console.log(`     - ${projDocs.length} projects`);
    console.log("═══════════════════════════════════════════════\n");
    console.log("👉 Accede al CMS en: /admin");

  } catch (error: any) {
    console.error("\n❌ Error durante el seed:");
    console.error(error.message);
    if (error.body?.message) console.error(error.body.message);
    process.exit(1);
  }
}

seed();