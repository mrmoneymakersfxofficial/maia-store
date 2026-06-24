// @ts-nocheck
export const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "Maia Store";
export const STUDIO_TITLE = `${COMPANY_NAME} CMS`;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
export const BRAND_COLORS = { primary: "#006c83", accent: "#c9a86c", dark: "#032e36" } as const;