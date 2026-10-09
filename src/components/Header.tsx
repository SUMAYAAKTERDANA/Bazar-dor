import Image from 'next/image';
import Link from 'next/link';
import NavLinks from './NavLinks';
import { Suspense } from 'react';
import { connection } from 'next/server';

const CurrentDate = async () => {
    await connection();
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
        timeZone: "Asia/Dhaka",
    });
    return <p className="text-xs text-gray-600">{date}</p>;
};

const Header = () => {
    return (
        <header className="bg-white border-b">
            
            <div className="flex items-center justify-between px-4 py-3">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-[#05893E] rounded-2xl flex items-center justify-center">
                        <Image
                            className="w-7 h-7 object-contain"
                            height={50}
                            width={50}
                            src="/logo-icon.png"
                            alt="logo"
                        />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">বাজার দর</h2>
                        <Suspense fallback={<p className="text-xs">&nbsp;</p>}>
                            <CurrentDate />
                        </Suspense>
                    </div>
                </Link>

                <div className="flex gap-2">
                    <Link href="/signin" className="btn btn-sm btn-outline">
                        সাইন ইন
                    </Link>
                    <Link href="/signup" className="btn btn-sm bg-[#05893E] text-white">
                        সাইন আপ
                    </Link>
                </div>
            </div>

            
            <div className="border-t bg-gray-50">
                <div className="flex justify-center px-4 py-2">
                    <Suspense fallback={<div className="text-sm">Loading...</div>}>
                        <NavLinks />
                    </Suspense>
                </div>
            </div>
        </header>
    );
};

export default Header;