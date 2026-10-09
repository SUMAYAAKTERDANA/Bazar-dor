import Link from 'next/link';
import type { Category } from '@/types';

const NavLinks = async () => {
    const res = await fetch(
        'https://api.abcz.workers.dev/api/bazardor/categories',
        { cache: 'no-store' }
    );

    if (!res.ok) return null;

    const categories: Category[] = await res.json();

    return (
        <nav className="flex gap-5 overflow-x-auto">
            {categories.map((cat) => (
                <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="flex items-center gap-1 text-sm font-medium hover:text-[#05893E] whitespace-nowrap"
                >
                    <span>{cat.icon}</span>
                    <span>{cat.nameBn}</span>
                </Link>
            ))}
        </nav>
    );
};

export default NavLinks;