'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function UserMenu() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [signingOut, setSigningOut] = useState(false);

    const handleSignOut = async () => {
        setSigningOut(true);
        const loadingToast = toast.loading('সাইন আউট করা হচ্ছে...');
        await authClient.signOut();
        toast.success('সফলভাবে সাইন আউট হয়েছেন!', { id: loadingToast });
        setSigningOut(false);
        setOpen(false);
        router.push('/');
        router.refresh();
    };

    if (isPending) {
        return (
            <div className="w-20 h-8 bg-gray-100 rounded animate-pulse"></div>
        );
    }

    if (!session?.user) {
        return (
            <div className="flex gap-2">
                <Link href="/sign-in" className="btn btn-sm btn-outline">
                    সাইন ইন
                </Link>
                <Link
                    href="/sign-up"
                    className="btn btn-sm bg-[#05893E] text-white hover:bg-[#046b30]"
                >
                    সাইন আপ
                </Link>
            </div>
        );
    }

    const initial = session.user.name?.charAt(0).toUpperCase() || '👤';

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
            >
                <div className="w-8 h-8 rounded-full bg-[#05893E] text-white flex items-center justify-center text-sm font-bold">
                    {initial}
                </div>
                <span className="text-sm font-medium hidden sm:block">
                    {session.user.name}
                </span>
                <span className="text-xs">▼</span>
            </button>

            {open && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setOpen(false)}
                    ></div>

                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-lg z-20 py-1">
                        <div className="px-4 py-2 border-b border-gray-100">
                            <p className="text-sm font-medium truncate">
                                {session.user.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {session.user.email}
                            </p>
                        </div>

                        <Link
                            href="/profile"
                            onClick={() => setOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            👤 প্রোফাইল
                        </Link>

                        <button
                            onClick={handleSignOut}
                            disabled={signingOut}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                        >
                            {signingOut ? 'অপেক্ষা করুন...' : '🚪 সাইন আউট'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}