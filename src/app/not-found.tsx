import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="text-8xl mb-4">🧭</div>

                <h1 className="text-5xl font-bold text-[#05893E] mb-2">
                    ৪০৪
                </h1>

                <h2 className="text-xl font-bold text-gray-800 mb-3">
                    পেজটি খুঁজে পাওয়া যায়নি
                </h2>

                <p className="text-sm text-gray-600 mb-6">
                    আপনি যে পেজটি খুঁজছেন সেটি এখানে নেই। সম্ভবত লিংকটি ভুল
                    বা পেজটি সরিয়ে ফেলা হয়েছে।
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-[#05893E] text-white px-6 py-2.5 rounded-md hover:bg-[#046b30] text-sm font-medium transition-colors"
                >
                    ← হোম পেজে ফিরে যান
                </Link>

                <div className="mt-6 text-xs text-gray-400">
                    অথবা উপরের মেনু থেকে যেকোনো ক্যাটাগরি বেছে নিন
                </div>
            </div>
        </div>
    );
}