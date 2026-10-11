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

    const handleGoogleSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: 'google',
                callbackURL: '/',
            });
        } catch {
            toast.error('Google সাইন ইন ব্যর্থ হয়েছে');
        }
    };

    const handleGithubSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: 'github',
                callbackURL: '/',
            });
        } catch {
            toast.error('GitHub সাইন ইন ব্যর্থ হয়েছে');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-8 bg-[#FAFBFA]">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold">সাইন ইন</h1>
                        <p className="text-sm text-gray-500 mt-2">
                            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে প্রবেশ করুন।
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
                                minLength={8}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#05893E] text-sm"
                                placeholder="কমপক্ষে ৮ অক্ষর"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#05893E] text-white py-2.5 rounded-md hover:bg-[#046b30] disabled:opacity-50 text-sm font-medium"
                        >
                            {loading ? 'অপেক্ষা করুন...' : 'সাইন ইন'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="text-xs text-gray-400">অথবা</span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    {/* Social buttons */}
                    <div className="space-y-2">
                        <button
                            onClick={handleGoogleSignIn}
                            type="button"
                            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50 text-sm font-medium"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Google দিয়ে চালিয়ে যান
                        </button>

                        <button
                            onClick={handleGithubSignIn}
                            type="button"
                            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50 text-sm font-medium"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                            </svg>
                            GitHub দিয়ে চালিয়ে যান
                        </button>
                    </div>

                    {/* Bottom link */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        অ্যাকাউন্ট নেই?{' '}
                        <Link
                            href="/sign-up"
                            className="text-[#05893E] font-medium hover:underline"
                        >
                            সাইন আপ করুন
                        </Link>
                    </p>
                </div>

                {/* Back link */}
                <div className="text-center mt-4">
                    <Link
                        href="/"
                        className="text-xs text-gray-500 hover:text-[#05893E]"
                    >
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </div>
    );
}