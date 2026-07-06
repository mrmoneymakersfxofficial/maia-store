const IMAGE_FIELDS = `asset->, alt, caption, hotspot, crop`;
const FILE_FIELDS = `asset-> { _id, url, mimeType }`;

// ═══════════════════════════════════════════════════════════════
// STORE QUERIES (Sanity-driven)
// ═══════════════════════════════════════════════════════════════

export const ALL_PRODUCTS_QUERY = `
*[_type == "product"] | order(order asc) {
  _id, "slug": slug.current, sku, name,
  price, compareAtPrice, description, longDescription,
  features, color, size, materials,
  rating, reviewCount, inStock, featured, order,
  collection,
  "mainImage": coalesce(mainImage.asset->url, mainImageUrl),
  "secondaryImage": coalesce(secondaryImage.asset->url, secondaryImageUrl),
  gallery[] { "url": coalesce(image.asset->url, url), alt },
  "category": category->{ _id, name, "slug": slug.current },
  seoTitle, seoDescription
}`;

export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id, "slug": slug.current, sku, name,
  price, compareAtPrice, description, longDescription,
  features, color, size, materials,
  rating, reviewCount, inStock, featured, order,
  collection,
  "mainImage": coalesce(mainImage.asset->url, mainImageUrl),
  "secondaryImage": coalesce(secondaryImage.asset->url, secondaryImageUrl),
  gallery[] { "url": coalesce(image.asset->url, url), alt },
  "category": category->{ _id, name, "slug": slug.current },
  seoTitle, seoDescription
}`;

export const ALL_CATEGORIES_QUERY = `
*[_type == "productCategory"] | order(order asc) {
  _id, name, "slug": slug.current, description,
  "image": image.asset->url, featured, order,
  "count": count(*[_type == "product" && references(^._id)])
}`;

export const ALL_HERO_SLIDES_QUERY = `
*[_type == "heroSlide"] | order(order asc) {
  _id, title, subtitle,
  "bgImage": backgroundImage.asset->url,
  "mobileImage": mobileFallbackImage.asset->url,
  ctaLabel, ctaLink, ctaType, order
}`;

export const ALL_TESTIMONIALS_QUERY = `
*[_type == "testimonial"] | order(order asc) {
  _id, authorName, authorRole, company, quote,
  "photo": photo.asset->url,
  rating, featured, order,
  "product": product->{ _id, name, "slug": slug.current }
}`;

export const FEATURED_TESTIMONIALS_QUERY = `
*[_type == "testimonial" && featured == true] | order(order asc) {
  _id, authorName, authorRole, company, quote,
  "photo": photo.asset->url,
  rating, featured, order,
  "product": product->{ _id, name, "slug": slug.current }
}[0..6]`;

export const SITE_SETTINGS_QUERY = `
*[_type == "siteSettings"][0] {
  _id, companyName, slogan, tagline,
  "logo": logo.asset->url, "logoWhite": logoWhite.asset->url,
  "ogImage": ogImage.asset->url,
  phone, whatsapp, email, address, businessHours,
  facebookUrl, instagramUrl, linkedinUrl, tiktokUrl, youtubeUrl,
  mapLatitude, mapLongitude, mapZoom,
  seoTitle, seoDescription
}`;

export const PRODUCTS_BY_CATEGORY_QUERY = `
*[_type == "product" && ($category == "todos" || category->slug.current == $category)] | order(order asc) {
  _id, "slug": slug.current, sku, name,
  price, compareAtPrice, description, longDescription,
  features, color, size, materials,
  rating, reviewCount, inStock, featured, order,
  collection,
  "mainImage": coalesce(mainImage.asset->url, mainImageUrl),
  "secondaryImage": coalesce(secondaryImage.asset->url, secondaryImageUrl),
  gallery[] { "url": coalesce(image.asset->url, url), alt },
  "category": category->{ _id, name, "slug": slug.current },
  seoTitle, seoDescription
}`;

// ═══════════════════════════════════════════════════════════════
// PAGE QUERIES (CMS Panel)
// ═══════════════════════════════════════════════════════════════

export const ABOUT_PAGE_QUERY = `
*[_type == "aboutPage"][0] {
  _id, title, subtitle,
  "mainImage": mainImage.asset->url,
  storyParagraphs,
  features[] { icon, title, description },
  yearsExperience, experienceLabel
}`;

export const CONTACT_PAGE_QUERY = `
*[_type == "contactPage"][0] {
  _id, title, subtitle,
  contactInfo[] { label, value, icon, url },
  ctaTitle, ctaDescription,
  "ctaImage": ctaImage.asset->url,
  ctaButtons[] { label, url, type }
}`;

export const HOW_TO_BUY_PAGE_QUERY = `
*[_type == "howToBuyPage"][0] {
  _id, title, subtitle,
  steps[] { stepNumber, icon, title, description },
  paymentMethods[] { name, description, icon },
  shippingInfo, whatsappNumber, whatsappMessage
}`;

export const FOOTER_SETTINGS_QUERY = `
*[_type == "footerSettings"][0] {
  _id, copyright, brandDescription,
  socialLinks[] { platform, label, handle, url },
  quickLinks[] { label, href },
  newsletterText, showTrustBadges
}`;

// ═══════════════════════════════════════════════════════════════
// LEGACY QUERIES (kept for reference)
// ═══════════════════════════════════════════════════════════════

export const ALL_SERVICE_CATEGORIES_QUERY = `*[_type == "serviceCategory"] | order(order asc) { _id, name, "slug": slug.current, description, icon, color, order }`;
export const ALL_SERVICES_QUERY = `*[_type == "service"] | order(order asc) { _id, title, "slug": slug.current, coverImage { ${IMAGE_FIELDS} }, description, category-> { _id, name, "slug": slug.current, icon, color }, subservices[] { title, description, image { ${IMAGE_FIELDS} } }, featured, order }`;
export const FEATURED_SERVICES_QUERY = `*[_type == "service" && featured == true] | order(order asc) { _id, title, "slug": slug.current, coverImage { ${IMAGE_FIELDS} }, description, category-> { _id, name, "slug": slug.current, icon, color }, subservices[] { title, description, image { ${IMAGE_FIELDS} } }, featured, order }[0..5]`;
export function serviceBySlugQuery(slug: string) { return `*[_type == "service" && slug.current == "${slug}"][0] { _id, title, "slug": slug.current, coverImage { ${IMAGE_FIELDS} }, description, category-> { _id, name, "slug": slug.current, icon, color }, subservices[] { title, description, image { ${IMAGE_FIELDS} } }, featured, order }`; }

const PROJECT_FIELDS = `_id, title, "slug": slug.current, coverImage { ${IMAGE_FIELDS} }, gallery[] { ${IMAGE_FIELDS} }, description, excerpt, client, location, year, area, status, tags[], service-> { _id, title, "slug": slug.current }, featured, order`;
export const ALL_PROJECTS_QUERY = `*[_type == "project"] | order(order asc) { ${PROJECT_FIELDS} }`;
export const FEATURED_PROJECTS_QUERY = `*[_type == "project" && featured == true] | order(order asc) { ${PROJECT_FIELDS} }[0..8]`;
export function projectBySlugQuery(slug: string) { return `*[_type == "project" && slug.current == "${slug}"][0] { ${PROJECT_FIELDS} }`; }

export const ALL_TEAM_QUERY = `*[_type == "teamMember"] | order(order asc) { _id, name, "slug": slug.current, role, department, photo { ${IMAGE_FIELDS} }, bio, email, phone, linkedinUrl, order }`;
export const ALL_PARTNERS_QUERY = `*[_type == "partner"] | order(order asc) { _id, name, logo { ${IMAGE_FIELDS} }, url, order }`;
export const ALL_STATS_QUERY = `*[_type == "stat"] | order(order asc) { _id, label, value, suffix, prefix, order }`;