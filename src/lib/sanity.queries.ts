import { createQuery } from "next-sanity";

const IMAGE_FIELDS = `asset->, alt, caption, hotspot, crop`;
const FILE_FIELDS = `asset-> { _id, url, mimeType }`;

// === PRODUCTS ===
export const PRODUCT_FIELDS = `_id, "slug": slug.current, name, sku, "categoryName": category->name, "categorySlug": category->slug.current, collection, price, compareAtPrice, description, longDescription, features[], mainImage { ${IMAGE_FIELDS} }, secondaryImage { ${IMAGE_FIELDS} }, gallery[] { image { ${IMAGE_FIELDS} }, alt }, color, size, materials[], rating, "reviewCount": reviewCount, inStock, featured, order, seoTitle, seoDescription`;

export const ALL_PRODUCTS_QUERY = createQuery(`*[_type == "product"] | order(order asc) { ${PRODUCT_FIELDS} }`);

export const FEATURED_PRODUCTS_QUERY = createQuery(`*[_type == "product" && featured == true] | order(order asc) { ${PRODUCT_FIELDS} }[0..11]`);

export const PRODUCTS_BY_CATEGORY_QUERY = createQuery(`*[_type == "product" && $categorySlug == "todos" || category->slug.current == $categorySlug] | order(order asc) { ${PRODUCT_FIELDS} }`);

export const PRODUCT_BY_SLUG_QUERY = createQuery(`*[_type == "product" && slug.current == $slug][0] { ${PRODUCT_FIELDS}, "relatedProducts": *[(_type == "product" && _id != ^._id && category._ref == ^.category._ref)] | order(featured desc, order asc) [0..4] { ${PRODUCT_FIELDS} } }`);

// === CATEGORIES ===
export const ALL_CATEGORIES_QUERY = createQuery(`*[_type == "productCategory"] | order(order asc) { _id, name, "slug": slug.current, description, image { ${IMAGE_FIELDS} }, order, featured, "productCount": count(*[_type == "product" && category._ref == ^._id]) }`);

// === HERO SLIDES ===
export const ALL_HERO_SLIDES_QUERY = createQuery(`*[_type == "heroSlide"] | order(order asc) { _id, title, subtitle, backgroundImage { ${IMAGE_FIELDS} }, ctaLabel, ctaLink, ctaType, order }`);

// === TESTIMONIALS ===
export const ALL_TESTIMONIALS_QUERY = createQuery(`*[_type == "testimonial"] | order(order asc) { _id, authorName, authorRole, company, quote, photo { ${IMAGE_FIELDS} }, rating, featured, order }`);

export const FEATURED_TESTIMONIALS_QUERY = createQuery(`*[_type == "testimonial" && featured == true] | order(order asc) { _id, authorName, authorRole, company, quote, photo { ${IMAGE_FIELDS} }, rating, featured, order }[0..12]`);

// === SITE SETTINGS ===
export const SITE_SETTINGS_QUERY = createQuery(`*[_type == "siteSettings"][0] { _id, companyName, slogan, tagline, logo { ${IMAGE_FIELDS} }, logoWhite { ${IMAGE_FIELDS} }, ogImage { ${IMAGE_FIELDS} }, phone, whatsapp, email, instagramUrl, tiktokUrl, facebookUrl, seoTitle, seoDescription }`);
