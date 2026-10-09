import { Suspense } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import CategorySort from '@/components/CategorySort';
import type { Product } from '@/types';

async function fetchCategoryProducts(slug: string): Promise<Product[] | null> {
    try {
        const res = await fetch(
            `https://api.abcz.workers.dev/api/bazardor/products?category=${slug}`,
            { cache: 'no-store' }
        );
        if (!res.ok) return null;
        const data = await res.json();
        return Array.isArray(data) ? data : null;
    } catch {
        return null;
    }
}

async function CategoryContent({
    slug,
    sort,
}: {
    slug: string;
    sort?: string;
}) {
    const products = await fetchCategoryProducts(slug);

    // Empty state / invalid slug
    if (!products || products.length === 0) {
        return (
            <div className="text-center py-16 px-4">
                <div className="text-7xl mb-4">🔍</div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    ক্যাটাগরি পাওয়া যায়নি
                </h1>
                <p className="text-gray-600 mb-6">
                    &ldquo;{slug}&rdquo; নামে কোনো ক্যাটাগরি নেই বা এই ক্যাটাগরিতে
                    কোনো পণ্য নেই।
                </p>
                <Link
                    href="/"
                    className="btn bg-[#05893E] text-white hover:bg-[#046b30]"
                >
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        );
    }

    // Sort logic
    let sorted = [...products];
    if (sort === 'low-to-high') {
        sorted.sort((a, b) => a.today - b.today);
    } else if (sort === 'high-to-low') {
        sorted.sort((a, b) => b.today - a.today);
    }

    const categoryName = products[0].categoryNameBn;
    const categoryIcon = products[0].categoryIcon;

    return (
        <>
            {/* Header */}
            <div className="bg-[#E8F5E9] rounded-2xl p-6 mb-6">
                <h1 className="text-2xl font-bold text-[#05893E]">
                    {categoryIcon} {categoryName}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                    {products.length} টি পণ্য পাওয়া গেছে
                </p>
            </div>

            {/* Sort Control */}
            <div className="mb-4 flex justify-end">
                <CategorySort currentSort={sort} slug={slug} />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sorted.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </>
    );
}

export default async function CategoryPage({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ sort?: string }>;
}) {
    const { slug } = await params;
    const { sort } = await searchParams;

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <Suspense fallback={<CategorySkeleton />}>
                <CategoryContent slug={slug} sort={sort} />
            </Suspense>
        </div>
    );
}

// Loading Skeleton 
function CategorySkeleton() {
    return (
        <>
            <div className="bg-gray-100 rounded-2xl p-6 mb-6 h-24 animate-pulse"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="p-4 bg-white rounded-xl border h-32 animate-pulse"
                    >
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        </>
    );
}