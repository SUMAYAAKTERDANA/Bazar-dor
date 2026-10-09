import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

interface Product {
    id: string;
    slug: string;
    nameBn: string;
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
        return <div className="text-red-500">Data load হয়নি</div>;
    }

    const data: Product[] = await res.json();
    const top10 = data.slice(0, 10);

    return (
        <div className="w-full overflow-hidden bg-white text-black border-y">
            
<MarqueeText direction="right" duration={10}>         
            <div className="marquee-track flex gap-6 py-2 whitespace-nowrap">
                {[...top10, ...top10].map((d, index) => (
                    <span
                        key={`${d.id}-${index}`}
                        className="flex items-center gap-2 text-sm"
                    >
                        <span>{d.categoryIcon}</span>
                        <span>{d.nameBn}</span>
                        <span className="font-bold">৳{d.today}</span>
                        <span className="opacity-80">/ {d.unit}</span>
                        {d.change?.pct !== undefined && (
                            <span
                                className={
                                    d.change.dir === 'up'
                                        ? 'text-red-300'
                                        : 'text-green-300'
                                }
                            >
                                {d.change.dir === 'up' ? '▲' : '▼'}{' '}
                                {Math.abs(d.change.pct)}%
                            </span>
                        )}
                    </span>
                ))}
           
            </div>

            </MarqueeText>    
        </div>
    );
};

export default Marquee;