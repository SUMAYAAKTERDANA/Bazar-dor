import Image from 'next/image';
import Link from 'next/link';
import NavLinks from './NavLinks';
import Marquee from './Marquee';
import UserMenu from './UserMenu';
import { Suspense } from 'react';
import { connection } from 'next/server';

const CurrentDate = async () => {
    await connection();
    const date = new Date().toLocaleDateString('bn-BD', {
        dateStyle: 'full',
        timeZone: 'Asia/Dhaka',
    });
    return <p className="text-xs text-gray-600">{date}</p>;
};

const Header = () => {
    return (
        <header className="bg-white border-b">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-[#05893E] rounded-2xl flex items-center justify-center">
                        <Image
                            className="w-7 h-7 object-contain brightness-170  opacity-90"
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

                {/* UserMenu replaces old Sign In/Up buttons */}
                <UserMenu />
            </div>

            {/* Nav */}
            <div className="border-t bg-white">
                <div className="flex justify-center px-4 py-2">
                    <Suspense fallback={<div className="text-sm">Loading...</div>}>
                        <NavLinks />
                    </Suspense>
                </div>
            </div>

            {/* Marquee */}
            <Suspense fallback={<div className="h-10 bg-gray-100"></div>}>
                <Marquee />
            </Suspense>
        </header>
    );
};

export default Header;