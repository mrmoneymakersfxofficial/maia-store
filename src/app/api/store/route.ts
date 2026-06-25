import { NextResponse } from 'next/server';
import { products, categories, formatPrice } from '@/lib/store-data';

// GET /api/store — Store API info
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');

  // Health check / info
  if (!endpoint) {
    return NextResponse.json({
      name: 'Maia Store API',
      version: '1.0.0',
      endpoints: {
        products: '/api/store?endpoint=products',
        categories: '/api/store?endpoint=categories',
        product: '/api/store?endpoint=product&slug=<slug>',
      },
    });
  }

  // List all products
  if (endpoint === 'products') {
    const category = searchParams.get('category');
    const search = searchParams.get('q');
    let filtered = products;

    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
      );
    }

    return NextResponse.json(
      filtered.map((p) => ({
        id: p.id,
        slug: p.slug,
        sku: p.sku,
        name: p.name,
        fullName: p.fullName,
        price: p.price,
        priceFormatted: formatPrice(p.price),
        category: p.category,
        categoryLabel: p.categoryLabel,
        collection: p.collection,
        image: p.image,
        inStock: p.inStock,
        rating: p.rating,
        reviews: p.reviews,
      }))
    );
  }

  // Single product
  if (endpoint === 'product') {
    const slug = searchParams.get('slug');
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 });
    }
    const product = products.find((p) => p.slug === slug);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  }

  // Categories
  if (endpoint === 'categories') {
    return NextResponse.json(categories);
  }

  return NextResponse.json({ error: 'Unknown endpoint' }, { status: 404 });
}