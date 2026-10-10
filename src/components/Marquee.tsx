import MarqueeText from 'react-marquee-text';
import 'react-marquee-text/dist/styles.css';
import Link from 'next/link';
import { formatBn, toBn } from '@/lib/bn';

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    image: string;
    categoryIcon: string;
    unit: string;
    today: number;
    change: {
        dir: string;
        pct: number;
    };
}

const Marquee = async () => {
    const res = await fetch(
        'https://api.abcz.workers.dev/api/bazardor/products',
        { cache: 'no-store' }
    );

    if (!res.ok) {
        return <div className="text-red-500 p-2">Data load হয়নি</div>;
    }

    const data: Product[] = await res.json();
    // সব product দেখাবে (slice বাদ দেওয়া হয়েছে)

    const unitBangla = (unit: string) =>
        unit === 'kg' ? 'কেজি' :
        unit === 'litre' ? 'লিটার' :
        unit === 'dozen' ? 'ডজন' :
        unit === 'piece' ? 'পিস' : unit;

    return (
        <div className="w-full bg-white border-y border-gray-200">
            <MarqueeText
                direction="right"
                duration={8}
                className="py-1"
            >
                <div className="flex gap-6 whitespace-nowrap">
                    {data.map((p, index) => {
                        const isUp = p.change.dir === 'up';
                        const isDown = p.change.dir === 'down';

                        return (
                            <Link
                                key={`${p.id}-${index}`}
                                href={`/product/${p.slug}`}
                                className="flex items-center gap-2 text-sm hover:text-[#05893E] transition-colors"
                            >
                                <span>{p.image}</span>
                                <span className="font-medium">{p.nameBn}</span>
                                <span className="font-bold text-[#05893E]">
                                    {formatBn(p.today)} টাকা
                                </span>
                                <span className="text-xs text-gray-500">
                                    / {unitBangla(p.unit)}
                                </span>
                                {isUp && (
                                    <span className="text-xs font-medium text-red-500">
                                        ▲ {toBn(Math.abs(p.change.pct))}%
                                    </span>
                                )}
                                {isDown && (
                                    <span className="text-xs font-medium text-green-500">
                                        ▼ {toBn(Math.abs(p.change.pct))}%
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </MarqueeText>
        </div>
    );
};

export default Marquee;