import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function ProfilePage() {
    // Protected route — must be logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect('/sign-in');
    }

    const user = session.user;
    const initial = user.name?.charAt(0).toUpperCase() || '👤';

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                {/* Header */}
                <div className="flex items-center gap-4 pb-5 border-b">
                    <div className="w-16 h-16 rounded-full bg-[#05893E] text-white flex items-center justify-center text-2xl font-bold">
                        {initial}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold">{user.name}</h1>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                </div>

                {/* Info */}
                <div className="mt-5 space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">নাম</span>
                        <span className="font-medium">{user.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">ইমেইল</span>
                        <span className="font-medium">{user.email}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">ইমেইল ভেরিফাইড</span>
                        <span className="font-medium">
                            {user.emailVerified ? '✅ হ্যাঁ' : '❌ না'}
                        </span>
                    </div>
                </div>

                {/* Update button */}
                <div className="mt-6">
                    <Link
                        href="/profile/update"
                        className="block w-full text-center btn bg-[#05893E] text-white hover:bg-[#046b30]"
                    >
                        প্রোফাইল আপডেট করুন
                    </Link>
                </div>
            </div>
        </div>
    );
}