import { sanityFetch } from "@/sanity/live";
import { ALL_HERO_SLIDES_QUERY, ALL_PRODUCTS_QUERY, FEATURED_TESTIMONIALS_QUERY, SITE_SETTINGS_QUERY } from "@/lib/sanity.queries";
import { products as storeProducts, testimonials as storeTestimonials } from "@/lib/store-data";
import HomeClient from "./HomeClient";
import type { SanityProduct, SanityHeroSlide, SanityTestimonial, HomeData } from "./HomeClient";

export default async function HomePage() {
  // Fetch from Sanity (stega-enabled in draft mode, clean in published)
  const [heroSlides, sanityProducts, sanityTestimonials] = await Promise.all([
    sanityFetch({ query: ALL_HERO_SLIDES_QUERY }).then((r: any) => (r.data ?? []) as SanityHeroSlide[]).catch(() => []),
    sanityFetch({ query: ALL_PRODUCTS_QUERY }).then((r: any) => (r.data ?? []) as SanityProduct[]).catch(() => []),
    sanityFetch({ query: FEATURED_TESTIMONIALS_QUERY }).then((r: any) => (r.data ?? []) as SanityTestimonial[]).catch(() => []),
  ]);

  const hasSanityProducts = sanityProducts.length > 0;
  const hasSanityTestimonials = sanityTestimonials.length > 0;

  // Use Sanity data if available, else fall back to store-data
  const featuredProducts: any[] = hasSanityProducts
    ? (sanityProducts as any[]).filter(p => p.featured).slice(0, 6)
    : storeProducts.slice(0, 6).map((p: any) => ({
        _id: `store-${p.id}`,
        slug: p.slug,
        name: p.name,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        description: p.description,
        longDescription: p.longDescription,
        mainImage: p.image,
        secondaryImage: p.imageSecondary,
        gallery: p.images.map((img: any) => ({ url: img.original, alt: p.name })),
        category: { _id: '', name: p.categoryLabel, slug: p.category },
        color: p.color?.name,
        rating: p.rating,
        reviewCount: p.reviews,
        features: p.features,
        sku: p.sku,
        inStock: true,
        collection: p.collection,
      }));

  const testimonials: any[] = hasSanityTestimonials
    ? sanityTestimonials
    : storeTestimonials.map(t => ({
        _id: `store-testimonial-${t.name}`,
        authorName: t.name,
        company: t.location,
        quote: t.text,
        rating: t.rating,
        featured: true,
        order: 0,
      }));

  const data: HomeData = {
    heroSlides,
    featuredProducts,
    testimonials,
    useFallback: !hasSanityProducts,
  };

  return <HomeClient data={data} />;
}