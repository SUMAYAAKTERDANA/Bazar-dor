import Link from 'next/link';
import type { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
    const isUp = product.change.dir === 'up';
    const isDown = product.change.dir === 'down';

    const unitBangla =
        product.unit === 'kg' ? 'কেজি' :
        product.unit === 'litre' ? 'লিটার' :
        product.unit === 'dozen' ? 'ডজন' :
        product.unit === 'piece' ? 'পিস' : product.unit;

    return (
        <Link
            href={`/product/${product.slug}`}
            className="block p-4 bg-white rounded-md border border-gray-200 hover:border-[#05893E] transition-colors"
        >
            {/* Top: emoji + name + unit */}
            <div className="flex items-center gap-3">
                <span className="text-2xl shrink-0">{product.image}</span>
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                        {product.nameBn}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                        প্রতি {unitBangla}
                    </p>
                </div>
            </div>

            {/* Bottom: price + change */}
            <div className="mt-4 flex items-end justify-between">
                <div>
                    <p className="text-[11px] text-gray-400 mb-0.5">
                        আজকের দাম
                    </p>
                    <p className="text-base font-bold text-gray-900">
                        {product.today} টাকা
                    </p>
                </div>

                <div className="pb-0.5">
                    {isUp && (
                        <span className="text-[11px] font-medium text-red-500">
                            ▲ {Math.abs(product.change.pct)}%
                        </span>
                    )}
                    {isDown && (
                        <span className="text-[11px] font-medium text-green-600">
                            ▼ {Math.abs(product.change.pct)}%
                        </span>
                    )}
                    {!isUp && !isDown && (
                        <span className="text-[11px] font-medium text-gray-400">
                            — 0.0%
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}