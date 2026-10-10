import Link from 'next/link';
import type { Product } from '@/types';

async function fetchAllProducts(): Promise<Product[]> {
    try {
        const res = await fetch(
            'https://api.abcz.workers.dev/api/bazardor/products',
            { cache: 'no-store' }
        );
        if (!res.ok) return [];
        return await res.json();
    } catch {
        return [];
    }
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const products = await fetchAllProducts();
    const product = products.find((p) => p.slug === slug);

    // Not found
    if (!product) {
        return (
            <div className="text-center py-16 px-4">
                <div className="text-6xl mb-4">🔍</div>
                <h1 className="text-xl font-bold text-gray-800 mb-2">
                    পণ্য পাওয়া যায়নি
                </h1>
                <p className="text-sm text-gray-600 mb-6">
                    &ldquo;{slug}&rdquo; নামে কোনো পণ্য নেই।
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

    const isUp = product.change.dir === 'up';
    const isDown = product.change.dir === 'down';

    const markets = product.markets || [];
    const allPrices = markets.flatMap((m) => [m.min, m.max]);
    const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : product.today;
    const maxPrice = allPrices.length > 0 ? Math.max(...allPrices) : product.today;
    const avgPrice =
        allPrices.length > 0
            ? Math.round(allPrices.reduce((a, b) => a + b, 0) / allPrices.length)
            : product.today;

    const unitBangla =
        product.unit === 'kg' ? 'কেজি' :
        product.unit === 'litre' ? 'লিটার' :
        product.unit === 'dozen' ? 'ডজন' :
        product.unit === 'piece' ? 'পিস' : product.unit;

    const priceDiff = Math.abs(product.today - product.yesterday);

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            {/* Breadcrumb */}
            <div className="text-xs text-gray-500 mb-4 flex items-center gap-1 flex-wrap">
                <Link href="/" className="hover:text-[#05893E]">হোম</Link>
                <span>›</span>
                <Link
                    href={`/category/${product.category}`}
                    className="hover:text-[#05893E]"
                >
                    {product.categoryNameBn}
                </Link>
                <span>›</span>
                <span className="text-gray-700">{product.nameBn}</span>
            </div>

            {/* ===== Top Summary ===== */}
            <div className="bg-white rounded-lg border p-5 mb-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    {/* Left */}
                    <div className="flex items-start gap-4 flex-1">
                        <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center text-4xl shrink-0">
                            {product.image}
                        </div>
                        <div className="flex-1">
                            <h1 className="text-xl font-bold">{product.nameBn}</h1>

                            {/* Tags */}
                            <div className="flex gap-2 mt-2 flex-wrap">
                                <span className="text-[11px] bg-[#E8F5E9] text-[#05893E] px-2 py-0.5 rounded">
                                    {product.categoryIcon} {product.categoryNameBn}
                                </span>
                                <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                    প্রতি {unitBangla}
                                </span>
                            </div>

                            {/* Change line with টাকা */}
                            {isUp && (
                                <p className="text-xs text-gray-600 mt-2">
                                    গতকালের তুলনায় আজ দাম{' '}
                                    <span className="text-red-500 font-medium">
                                        বেড়েছে
                                    </span>
                                    {' · '}
                                    <span className="font-medium">
                                        {priceDiff} টাকা
                                    </span>
                                </p>
                            )}
                            {isDown && (
                                <p className="text-xs text-gray-600 mt-2">
                                    গতকালের তুলনায় আজ দাম{' '}
                                    <span className="text-green-500 font-medium">
                                        কমেছে
                                    </span>
                                    {' · '}
                                    <span className="font-medium">
                                        {priceDiff} টাকা
                                    </span>
                                </p>
                            )}
                            {!isUp && !isDown && (
                                <p className="text-xs text-gray-600 mt-2">
                                    গতকালের তুলনায় আজ দাম{' '}
                                    <span className="font-medium text-gray-500">
                                        অপরিবর্তিত
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Right: price badge */}
                    <div className="bg-[#E8F5E9] rounded-lg p-4 text-center shrink-0 sm:w-36">
                        <p className="text-[11px] text-gray-600">আজকের দাম</p>
                        <p className="text-2xl font-bold text-[#05893E] mt-1">
                            {product.today} টাকা
                        </p>
                        {isUp && (
                            <p className="text-[11px] font-medium text-red-500 mt-1">
                                ▲ {Math.abs(product.change.pct)}%
                            </p>
                        )}
                        {isDown && (
                            <p className="text-[11px] font-medium text-green-500 mt-1">
                                ▼ {Math.abs(product.change.pct)}%
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* ===== দামের সারাংশ ===== */}
            <div className="bg-white rounded-lg border p-5 mb-4">
                <h2 className="font-bold text-sm mb-3">দামের সারাংশ</h2>
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#E8F5E9] rounded-lg p-3">
                        <p className="text-[11px] text-gray-600">সর্বনিম্ন দাম</p>
                        <p className="text-lg font-bold text-[#05893E] mt-1">
                            {minPrice} টাকা
                        </p>
                        <p className="text-[10px] text-gray-500">
                            সর্বনিম্ন বাজার দর
                        </p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3">
                        <p className="text-[11px] text-gray-600">সর্বোচ্চ দাম</p>
                        <p className="text-lg font-bold text-red-600 mt-1">
                            {maxPrice} টাকা
                        </p>
                        <p className="text-[10px] text-gray-500">
                            সর্বোচ্চ বাজার দর
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-[11px] text-gray-600">গড় দাম</p>
                        <p className="text-lg font-bold text-gray-800 mt-1">
                            {avgPrice} টাকা
                        </p>
                        <p className="text-[10px] text-gray-500">
                            সব বাজারের গড়
                        </p>
                    </div>
                </div>
            </div>

            {/* ===== বাজারভিত্তিক টেবিল ===== */}
            {markets.length > 0 && (
                <div className="bg-white rounded-lg border p-5">
                    <h2 className="font-bold text-sm mb-3">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="bg-gray-50 border-b">
                                    <th className="text-left p-3 font-medium">বাজার</th>
                                    <th className="text-left p-3 font-medium">বিভাগ</th>
                                    <th className="text-right p-3 font-medium">
                                        সর্বনিম্ন
                                    </th>
                                    <th className="text-right p-3 font-medium">
                                        সর্বোচ্চ
                                    </th>
                                    <th className="text-right p-3 font-medium">গড়</th>
                                </tr>
                            </thead>
                            <tbody>
                                {markets.map((m, i) => (
                                    <tr
                                        key={i}
                                        className="border-b last:border-0 hover:bg-gray-50"
                                    >
                                        <td className="p-3">{m.market}</td>
                                        <td className="p-3 text-gray-600">
                                            {m.division}
                                        </td>
                                        <td className="p-3 text-right text-green-600">
                                            {m.min} টাকা
                                        </td>
                                        <td className="p-3 text-right text-red-600">
                                            {m.max} টাকা
                                        </td>
                                        <td className="p-3 text-right font-medium">
                                            {Math.round((m.min + m.max) / 2)} টাকা
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}