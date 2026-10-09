import Link from 'next/link';

interface Navs {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const NavLinks = async () => {
    const res = await fetch(
        'https://api.abcz.workers.dev/api/bazardor/categories',
        { cache: 'no-store' }
    );

    if (!res.ok) {
        return <div>Data load হয়নি</div>;
    }

    const categories: Navs[] = await res.json();

    return (
        <nav className="flex gap-3">
            {categories.map((cat) => (
                <Link key={cat.id} href={`/category/${cat.slug}`}>
                    <span>{cat.icon}</span>
                    <span>{cat.nameBn}</span>
                </Link>
            ))}
        </nav>
    );
};

export default NavLinks;