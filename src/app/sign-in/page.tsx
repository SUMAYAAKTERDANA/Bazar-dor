'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const loadingToast = toast.loading('সাইন ইন করা হচ্ছে...');

        try {
            const { error: authError } = await authClient.signIn.email({
                email,
                password,
            });

            if (authError) {
                toast.error(authError.message || 'সাইন ইন ব্যর্থ হয়েছে', {
                    id: loadingToast,
                });
                setError(authError.message || 'সাইন ইন ব্যর্থ হয়েছে');
                setLoading(false);
                return;
            }

            toast.success('সফলভাবে সাইন ইন হয়েছে!', { id: loadingToast });
            router.push('/');
            router.refresh();
        } catch {
            toast.error('কিছু ভুল হয়েছে। আবার চেষ্টা করুন।', {
                id: loadingToast,
            });
            setError('কিছু ভুল হয়েছে। আবার চেষ্টা করুন।');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold">সাইন ইন</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        আপনার অ্যাকাউন্টে প্রবেশ করুন
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            ইমেইল
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#05893E] text-sm"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            পাসওয়ার্ড
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#05893E] text-sm"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#05893E] text-white py-2 rounded-md hover:bg-[#046b30] disabled:opacity-50 text-sm font-medium"
                    >
                        {loading ? 'অপেক্ষা করুন...' : 'সাইন ইন'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-5">
                    অ্যাকাউন্ট নেই?{' '}
                    <Link
                        href="/sign-up"
                        className="text-[#05893E] font-medium hover:underline"
                    >
                        নিবন্ধন করুন
                    </Link>
                </p>
            </div>
        </div>
    );
}