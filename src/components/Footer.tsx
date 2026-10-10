export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-8">
            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <div>
                        <p className="font-medium text-gray-700">
                            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে
                        </p>
                    </div>
                    <div className="text-center sm:text-right">
                        <p>
                            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}