import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import Footer from "@/components/Footer";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description: "বাংলাদেশের প্রতিদিনের বাজার দর",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" data-theme="light" className={`${notoSerifBengali.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F7F9F7]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}