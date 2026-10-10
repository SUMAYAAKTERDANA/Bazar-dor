'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function ProfileUpdatePage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const [name, setName] = useState('');
    const [initialized, setInitialized] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!initialized && session?.user && !isPending) {
        setName(session.user.name || '');
        setInitialized(true);
    }

    useEffect(() => {
        if (!isPending && !session?.user) {
            router.push('/sign-in');
        }
    }, [isPending, session, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const loadingToast = toast.loading('আপডেট করা হচ্ছে...');

        try {
            const { error: updateError } = await authClient.updateUser({
                name,
            });

            if (updateError) {
                toast.error(updateError.message || 'আপডেট ব্যর্থ হয়েছে', {
                    id: loadingToast,
                });
                setError(updateError.message || 'আপডেট ব্যর্থ হয়েছে');
                setLoading(false);
                return;
            }

            toast.success('প্রোফাইল সফলভাবে আপডেট হয়েছে!', {
                id: loadingToast,
            });
            setLoading(false);
            setTimeout(() => router.push('/profile'), 1000);
        } catch {
            toast.error('কিছু ভুল হয়েছে। আবার চেষ্টা করুন।', {
                id: loadingToast,
            });
            setError('কিছু ভুল হয়েছে। আবার চেষ্টা করুন।');
            setLoading(false);
        }
    };

    if (isPending) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#05893E] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto px-4 py-8">
            <Link
                href="/profile"
                className="text-sm text-gray-600 hover:text-[#05893E] mb-4 inline-block"
            >
                ← প্রোফাইলে ফিরে যান
            </Link>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h1 className="text-xl font-bold mb-1">প্রোফাইল আপডেট করুন</h1>
                <p className="text-sm text-gray-500 mb-6">
                    আপনার তথ্য পরিবর্তন করুন
                </p>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            নাম
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#05893E] text-sm"
                            placeholder="আপনার নাম"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            ইমেইল (পরিবর্তন করা যাবে না)
                        </label>
                        <input
                            type="email"
                            value={session?.user?.email || ''}
                            disabled
                            className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-500 text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#05893E] text-white py-2 rounded-md hover:bg-[#046b30] disabled:opacity-50 text-sm font-medium"
                    >
                        {loading ? 'অপেক্ষা করুন...' : 'তথ্য আপডেট করুন'}
                    </button>
                </form>
            </div>
        </div>
    );
}