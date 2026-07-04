import { Suspense } from "react";
import HomeClient from "./HomeClient";
import { getHeroSlides, getFeaturedProducts, getFeaturedTestimonials, getSiteSettings } from "@/lib/data";

export default async function HomePage() {
  const [heroSlides, featuredProducts, testimonials, siteSettings] = await Promise.all([
    getHeroSlides(),
    getFeaturedProducts(),
    getFeaturedTestimonials(),
    getSiteSettings(),
  ]);

  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomeClient
        heroSlides={heroSlides}
        featuredProducts={featuredProducts}
        testimonials={testimonials}
        siteSettings={siteSettings}
      />
    </Suspense>
  );
}

function HomePageSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-screen bg-zinc-200" />
      <div className="max-w-[1440px] mx-auto px-4 py-20">
        <div className="h-8 w-48 bg-zinc-200 rounded mx-auto mb-8" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[3/4] bg-zinc-200 rounded-2xl mb-3" />
              <div className="h-4 w-3/4 bg-zinc-200 rounded mb-2" />
              <div className="h-5 w-1/3 bg-zinc-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
