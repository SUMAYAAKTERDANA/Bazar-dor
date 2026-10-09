import { Suspense } from 'react';
import { connection } from 'next/server';
import Image from 'next/image';
import Link from 'next/link';
import Marquee from '@/components/Marquee';
import ProductCard from '@/components/ProductCard';
import type { Category, Product } from '@/types';

// Dynamic Date 
const CurrentDate = async () => {
    await connection();
    const date = new Date().toLocaleDateString('bn-BD', {
        dateStyle: 'full',
        timeZone: 'Asia/Dhaka',
    });
    return (
        <span className="inline-block text-xs font-medium bg-white text-[#05893E] px-3 py-1 rounded-full mb-3">
            {date}
        </span>
    );
};

//  Fetch Data 
async function fetchHomeData(): Promise<{
    categories: Category[];
    products: Product[];
} | null> {
    try {
        const [catRes, prodRes] = await Promise.all([
            fetch('https://api.abcz.workers.dev/api/bazardor/categories', {
                cache: 'no-store',
            }),
            fetch('https://api.abcz.workers.dev/api/bazardor/products', {
                cache: 'no-store',
            }),
        ]);

        if (!catRes.ok || !prodRes.ok) return null;

        const categories: Category[] = await catRes.json();
        const products: Product[] = await prodRes.json();

        return { categories, products };
    } catch {
        return null;
    }
}

//  Home Content 
async function HomeContent() {
    const data = await fetchHomeData();

    if (!data) {
        return <p className="text-center text-red-500 py-8">ডেটা লোড হয়নি</p>;
    }

    const { products } = data;

    // দাম বেড়েছে এমন product (top 6)
    const increasing = products
        .filter((p) => p.change.dir === 'up')
        .slice(0, 6);

    // দাম কমেছে এমন product (top 6)
    const decreasing = products
        .filter((p) => p.change.dir === 'down')
        .slice(0, 6);

    return (
        <div className="space-y-10">
            {/* ===== আজ দাম বেড়েছে ===== */}
            {increasing.length > 0 && (
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-red-500 text-lg">▲</span>
                        <h2 className="font-bold text-xl text-gray-800">
                            আজ দাম বেড়েছে
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {increasing.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            )}

            {/* আজ দাম কমেছে */}
            {decreasing.length > 0 && (
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-green-600 text-lg">▼</span>
                        <h2 className="font-bold text-xl text-gray-800">
                            আজ দাম কমেছে
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {decreasing.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            )}

            {/*  সব পণ্য */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-xl text-gray-800">সব পণ্য</h2>
                    <span className="text-sm text-gray-500">
                        মোট {products.length} টি পণ্য
                    </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </section>
        </div>
    );
}

// HOME PAGE 
export default function Home() {
    return (
        <div>
            <Suspense fallback={<div className="h-10 bg-gray-100"></div>}>
                <Marquee />
            </Suspense>

            <div className="max-w-6xl mx-auto px-4 py-6">
                {/* Hero Section */}
                <div className="bg-[#E8F5E9] rounded-2xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                        <Suspense
                            fallback={<span className="inline-block h-6 mb-3"></span>}
                        >
                            <CurrentDate />
                        </Suspense>

                        <h1 className="text-2xl sm:text-3xl font-bold text-[#05893E] leading-snug">
                            আজকের বাজারের দাম এক নজরে
                        </h1>

                        <p className="text-sm sm:text-base text-gray-700 mt-2 max-w-xl">
                            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
                            দামের পরিবর্তন এক জায়গায়।
                        </p>

                        <Link
                            href="#products"
                            className="btn bg-[#05893E] text-white hover:bg-[#046b30] mt-4"
                        >
                            সব পণ্য দেখুন
                        </Link>
                    </div>

                    {/* Hero Image */}
                    <div className="shrink-0 flex items-center justify-center">
                        <Image
                            className="w-40 h-40 sm:w-52 sm:h-52 object-contain"
                            height={250}
                            width={250}
                            src="/bazar-hero.png"
                            alt="বাজারের ছবি"
                            priority
                        />
                    </div>
                </div>

                {/* Products */}
                <Suspense fallback={<p className="text-center py-8">Loading...</p>}>
                    <HomeContent />
                </Suspense>
            </div>
        </div>
    );
}