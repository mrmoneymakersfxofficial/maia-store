const IMAGE_FIELDS = `asset->, alt, caption, hotspot, crop`;
const FILE_FIELDS = `asset-> { _id, url, mimeType }`;

export const ALL_SERVICE_CATEGORIES_QUERY = `*[_type == "serviceCategory"] | order(order asc) { _id, name, "slug": slug.current, description, icon, color, order }`;
export const ALL_SERVICES_QUERY = `*[_type == "service"] | order(order asc) { _id, title, "slug": slug.current, coverImage { ${IMAGE_FIELDS} }, description, category-> { _id, name, "slug": slug.current, icon, color }, subservices[] { title, description, image { ${IMAGE_FIELDS} } }, featured, order }`;
export const FEATURED_SERVICES_QUERY = `*[_type == "service" && featured == true] | order(order asc) { _id, title, "slug": slug.current, coverImage { ${IMAGE_FIELDS} }, description, category-> { _id, name, "slug": slug.current, icon, color }, subservices[] { title, description, image { ${IMAGE_FIELDS} } }, featured, order }[0..5]`;
export function serviceBySlugQuery(slug: string) { return `*[_type == "service" && slug.current == "${slug}"][0] { _id, title, "slug": slug.current, coverImage { ${IMAGE_FIELDS} }, description, category-> { _id, name, "slug": slug.current, icon, color }, subservices[] { title, description, image { ${IMAGE_FIELDS} } }, featured, order }`; }

const PROJECT_FIELDS = `_id, title, "slug": slug.current, coverImage { ${IMAGE_FIELDS} }, gallery[] { ${IMAGE_FIELDS} }, description, excerpt, client, location, year, area, status, tags[], service-> { _id, title, "slug": slug.current }, featured, order`;
export const ALL_PROJECTS_QUERY = `*[_type == "project"] | order(order asc) { ${PROJECT_FIELDS} }`;
export const FEATURED_PROJECTS_QUERY = `*[_type == "project" && featured == true] | order(order asc) { ${PROJECT_FIELDS} }[0..8]`;
export function projectBySlugQuery(slug: string) { return `*[_type == "project" && slug.current == "${slug}"][0] { ${PROJECT_FIELDS} }`; }

export const ALL_TEAM_QUERY = `*[_type == "teamMember"] | order(order asc) { _id, name, "slug": slug.current, role, department, photo { ${IMAGE_FIELDS} }, bio, email, phone, linkedinUrl, order }`;
export const ALL_TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(order asc) { _id, authorName, authorRole, company, quote, photo { ${IMAGE_FIELDS} }, rating, project-> { _id, title, "slug": slug.current }, featured, order }`;
export const FEATURED_TESTIMONIALS_QUERY = `*[_type == "testimonial" && featured == true] | order(order asc) { _id, authorName, authorRole, company, quote, photo { ${IMAGE_FIELDS} }, rating, project-> { _id, title, "slug": slug.current }, featured, order }[0..6]`;
export const ALL_PARTNERS_QUERY = `*[_type == "partner"] | order(order asc) { _id, name, logo { ${IMAGE_FIELDS} }, url, order }`;
export const ALL_HERO_SLIDES_QUERY = `*[_type == "heroSlide"] | order(order asc) { _id, title, subtitle, backgroundImage { ${IMAGE_FIELDS} }, backgroundVideoMp4 { ${FILE_FIELDS} }, backgroundVideoWebm { ${FILE_FIELDS} }, posterImage { ${IMAGE_FIELDS} }, mobileFallbackImage { ${IMAGE_FIELDS} }, videoAutoplay, videoMuted, videoLoop, ctaLabel, ctaLink, ctaType, order }`;
export const ALL_STATS_QUERY = `*[_type == "stat"] | order(order asc) { _id, label, value, suffix, prefix, order }`;
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] { _id, companyName, slogan, tagline, logo { ${IMAGE_FIELDS} }, logoWhite { ${IMAGE_FIELDS} }, ogImage { ${IMAGE_FIELDS} }, phone, whatsapp, email, address, businessHours, facebookUrl, instagramUrl, linkedinUrl, tiktokUrl, youtubeUrl, mapLatitude, mapLongitude, mapZoom, seoTitle, seoDescription }`;