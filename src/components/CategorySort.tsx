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
        <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">সাজান:</label>
            <select
                value={currentSort || 'default'}
                onChange={handleChange}
                className="select select-bordered select-sm"
            >
                <option value="default">ডিফল্ট</option>
                <option value="low-to-high">দাম: কম থেকে বেশি</option>
                <option value="high-to-low">দাম: বেশি থেকে কম</option>
            </select>
        </div>
    );
}