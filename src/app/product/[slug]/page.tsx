import Link from 'next/link';

interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
}

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: { dir: string; pct: number };
    markets?: Market[];
}

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
                <div className="text-7xl mb-4">🔍</div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    পণ্য পাওয়া যায়নি
                </h1>
                <p className="text-gray-600 mb-6">
                    &ldquo;{slug}&rdquo; নামে কোনো পণ্য নেই।
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

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            {/* Back button */}
            <Link
                href="/"
                className="text-sm text-gray-600 hover:text-[#05893E] mb-4 inline-block"
            >
                ← হোম পেজে ফিরে যান
            </Link>

            {/* Summary Card  */}
            <div className="bg-white rounded-2xl p-6 border mb-4">
                <div className="flex items-start gap-4">
                    <div className="w-20 h-20 flex items-center justify-center text-5xl bg-gray-100 rounded-2xl shrink-0">
                        {product.image}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">{product.nameBn}</h1>

                        <div className="flex gap-2 mt-2 flex-wrap">
                            <span className="text-xs bg-[#E8F5E9] text-[#05893E] px-2 py-1 rounded">
                                {product.categoryIcon} {product.categoryNameBn}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                প্রতি {unitBangla}
                            </span>
                        </div>

                        <div className="mt-4">
                            <p className="text-sm text-gray-500">আজকের দাম</p>
                            <p className="text-3xl font-bold text-[#05893E]">
                                {product.today} টাকা
                            </p>
                        </div>

                        {isUp && (
                            <div className="mt-2 inline-block text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded">
                                ▲ {Math.abs(product.change.pct)}% বেড়েছে
                            </div>
                        )}
                        {isDown && (
                            <div className="mt-2 inline-block text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded">
                                ▼ {Math.abs(product.change.pct)}% কমেছে
                            </div>
                        )}
                        {!isUp && !isDown && (
                            <div className="mt-2 inline-block text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded">
                                — অপরিবর্তিত
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ===== Price Summary ===== */}
            <div className="bg-white rounded-2xl p-6 border mb-4">
                <h2 className="font-bold mb-4">দামের সারাংশ</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="border rounded-lg p-3">
                        <p className="text-xs text-gray-500">আজ</p>
                        <p className="text-lg font-bold text-[#05893E]">
                            {product.today}
                        </p>
                    </div>
                    <div className="border rounded-lg p-3">
                        <p className="text-xs text-gray-500">সর্বনিম্ন</p>
                        <p className="text-lg font-bold">{minPrice}</p>
                    </div>
                    <div className="border rounded-lg p-3">
                        <p className="text-xs text-gray-500">সর্বোচ্চ</p>
                        <p className="text-lg font-bold">{maxPrice}</p>
                    </div>
                    <div className="border rounded-lg p-3">
                        <p className="text-xs text-gray-500">গড়</p>
                        <p className="text-lg font-bold">{avgPrice}</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-3">
                    <div className="border rounded-lg p-3">
                        <p className="text-xs text-gray-500">গতকাল</p>
                        <p className="text-base font-medium">{product.yesterday}</p>
                    </div>
                    <div className="border rounded-lg p-3">
                        <p className="text-xs text-gray-500">গত সপ্তাহ</p>
                        <p className="text-base font-medium">{product.lastWeek}</p>
                    </div>
                    <div className="border rounded-lg p-3">
                        <p className="text-xs text-gray-500">গত মাস</p>
                        <p className="text-base font-medium">{product.lastMonth}</p>
                    </div>
                </div>
            </div>

            {/* ===== Markets Table ===== */}
            {markets.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border">
                    <h2 className="font-bold mb-4">
                        বাজারভিত্তিক আজকের দাম ({markets.length} টি বাজার)
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left p-3 font-medium">বাজার</th>
                                    <th className="text-left p-3 font-medium">বিভাগ</th>
                                    <th className="text-right p-3 font-medium">সর্বনিম্ন</th>
                                    <th className="text-right p-3 font-medium">সর্বোচ্চ</th>
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
                                        <td className="p-3 text-right font-medium text-green-600">
                                            {m.min}
                                        </td>
                                        <td className="p-3 text-right font-medium text-red-600">
                                            {m.max}
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