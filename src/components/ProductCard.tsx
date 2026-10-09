import Link from 'next/link';
import type { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
    const isUp = product.change.dir === 'up';
    const isDown = product.change.dir === 'down';

    return (
        <Link
            href={`/product/${product.slug}`}
            className="block p-4 bg-white rounded-xl border hover:shadow-md transition-shadow"
        >
            {/* Top: icon + name */}
            <div className="flex items-start gap-3">
                <span className="text-3xl">{product.image}</span>
                <div className="flex-1">
                    <h4 className="font-medium text-sm">{product.nameBn}</h4>
                    <p className="text-xs text-gray-500">
                        প্রতি {product.unit === 'kg' ? 'কেজি' :
                              product.unit === 'litre' ? 'লিটার' :
                              product.unit === 'dozen' ? 'ডজন' :
                              product.unit === 'piece' ? 'পিস' : product.unit}
                    </p>
                </div>
            </div>

            {/* Bottom: price + change */}
            <div className="mt-3 flex items-end justify-between">
                <div>
                    <p className="text-xs text-gray-500">আজকের দাম</p>
                    <p className="font-bold text-[#05893E]">
                        {product.today} টাকা
                    </p>
                </div>

                {isUp && (
                    <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                        ▲ {Math.abs(product.change.pct)}%
                    </span>
                )}
                {isDown && (
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                        ▼ {Math.abs(product.change.pct)}%
                    </span>
                )}
            </div>
        </Link>
    );
}