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

    // Empty state
    if (!products || products.length === 0) {
        return (
            <div className="text-center py-16 px-4">
                <div className="text-6xl mb-4">🔍</div>
                <h1 className="text-xl font-bold text-gray-800 mb-2">
                    ক্যাটাগরি পাওয়া যায়নি
                </h1>
                <p className="text-sm text-gray-600 mb-6">
                    &ldquo;{slug}&rdquo; নামে কোনো ক্যাটাগরি নেই।
                </p>
                <Link
                    href="/"
                    className="btn btn-sm bg-[#05893E] text-white hover:bg-[#046b30]"
                >
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        );
    }

    // Sort
    const sorted = [...products];
    if (sort === 'low-to-high') sorted.sort((a, b) => a.today - b.today);
    if (sort === 'high-to-low') sorted.sort((a, b) => b.today - a.today);

    const categoryName = products[0].categoryNameBn;
    const categoryIcon = products[0].categoryIcon;

    return (
        <>
            {/* Category Header — সাদা box */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#F7F9F7] rounded-lg flex items-center justify-center text-2xl shrink-0">
                        {categoryIcon}
                    </div>
                    <div>
                        <h1 className="text-lg font-bold">{categoryName}</h1>
                        <p className="text-xs text-gray-500 mt-0.5">
                            {categoryName} এর আজকের দাম · মোট {products.length}টি পণ্য দেখানো হচ্ছে
                        </p>
                    </div>
                </div>
            </div>

            {/* Sort row — ডান দিকে */}
            <div className="flex justify-end mb-4">
                <CategorySort currentSort={sort} slug={slug} />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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

function CategorySkeleton() {
    return (
        <>
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 h-20 animate-pulse"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="p-4 bg-white rounded-md border border-gray-200 h-28 animate-pulse"
                    >
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        </>
    );
}