'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function ProfileUpdateForm({
    initialName,
}: {
    initialName: string;
}) {
    const router = useRouter();
    const [name, setName] = useState(initialName);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const loadingToast = toast.loading('আপডেট করা হচ্ছে...');

        try {
            const { error } = await authClient.updateUser({ name });

            if (error) {
                toast.error(error.message || 'আপডেট ব্যর্থ হয়েছে', {
                    id: loadingToast,
                });
                setLoading(false);
                return;
            }

            toast.success('প্রোফাইল সফলভাবে আপডেট হয়েছে!', {
                id: loadingToast,
            });
            router.refresh();
            setLoading(false);
        } catch {
            toast.error('কিছু ভুল হয়েছে। আবার চেষ্টা করুন।', {
                id: loadingToast,
            });
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    নাম
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#05893E] text-sm bg-white"
                    placeholder="আপনার নাম"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#05893E] text-white py-2.5 rounded-md hover:bg-[#046b30] disabled:opacity-50 text-sm font-medium"
            >
                {loading ? 'অপেক্ষা করুন...' : 'আপডেট করুন'}
            </button>
        </form>
    );
}