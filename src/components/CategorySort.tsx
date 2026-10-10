'use client';

import { useRouter } from 'next/navigation';

export default function CategorySort({
    currentSort,
    slug,
}: {
    currentSort?: string;
    slug: string;
}) {
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === 'default') {
            router.push(`/category/${slug}`);
        } else {
            router.push(`/category/${slug}?sort=${value}`);
        }
    };

    return (
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-3 py-1.5">
            <span className="text-sm text-gray-600">সাজান:</span>
            <select
                value={currentSort || 'default'}
                onChange={handleChange}
                className="text-sm bg-transparent border-0 focus:outline-none cursor-pointer"
            >
                <option value="default">ডিফল্ট</option>
                <option value="low-to-high">দাম: কম থেকে বেশি</option>
                <option value="high-to-low">দাম: বেশি থেকে কম</option>
            </select>
        </div>
    );
}