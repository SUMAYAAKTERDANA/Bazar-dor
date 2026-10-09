export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-[#05893E] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 text-sm">লোড হচ্ছে...</p>
            </div>
        </div>
    );
}