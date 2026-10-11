import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ProfileUpdateForm from '@/components/ProfileUpdateForm';
// import ProfileUpdateForm from '@/components/ProfileUpdateForm';

export default async function ProfilePage() {
    // Protected route
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
            <div className="bg-white rounded-lg border border-gray-100 p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-xl font-bold text-gray-900">
                        আমার প্রোফাইল
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        আপনার ব্যক্তিগত তথ্য দেখুন
                    </p>
                </div>

                {/* User Info Card */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-6">
                    <div className="w-14 h-14 rounded-full bg-[#05893E] text-white flex items-center justify-center text-xl font-bold">
                        {initial}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="font-semibold text-gray-900 truncate">
                            {user.name}
                        </h2>
                        <p className="text-sm text-gray-500 truncate">
                            {user.email}
                        </p>
                    </div>
                    <Link
                        href="/profile/update"
                        className="text-xs font-medium px-3 py-1.5 border border-[#05893E] text-[#05893E] rounded-md hover:bg-[#05893E] hover:text-white transition-colors whitespace-nowrap"
                    >
                        এডিট করুন
                    </Link>
                </div>

                {/* information Section */}
                <div>
                    <h2 className="text-sm font-semibold text-gray-700 mb-3">
                        তথ্য
                    </h2>

                    <ProfileUpdateForm initialName={user.name || ''} />
                </div>
            </div>
        </div>
    );
}