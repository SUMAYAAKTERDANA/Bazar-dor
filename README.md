Project Name:
BazarDor (বাজার দর) — Daily market prices at a glance.


Short Description:
BazarDor is an online app for viewing daily market prices in Bangladesh. Users can browse today's prices for rice, lentils, oil, vegetables, fish, meat, eggs-milk, and spices, along with the price change indicator (▲/▼), and see the minimum-maximum prices across 12 different markets in one place. Users can create their own account, update their profile, and after logging in, view detailed bazar-wise information for each product. The entire app is built with Next.js and matches the Figma design exactly.


Technologies Used:
Next.js 16 — React framework (using App Router, Turbopack)
TypeScript — A type-safe version of JavaScript
Tailwind CSS v4 + DaisyUI — For styling the UI
Noto Serif Bengali (next/font) — For clean Bengali typography
BetterAuth — For email/password authentication
MongoDB Atlas — To store user accounts and sessions
react-hot-toast — For showing clean toast notifications
react-marquee-text — For infinite scrolling price ticker
Vercel — For deployment
Figma — For the UI design reference


5 Key Features:

1. Live Price Ticker with Scrolling Marquee
The navbar contains an infinite scrolling price ticker built with react-marquee-text. Every product (all 33 items) scrolls continuously showing the emoji, name, today's price (in Bengali digits — ১৪৮ টাকা), unit (প্রতি কেজি / লিটার / ডজন), and change indicator (▲ ২.১% up in red, ▼ ২.৯% down in green). Each item is a clickable link that navigates to that product's detail page.

2. Category Browsing with Bengali Sort
Every category — চাল (rice), ডাল (lentils), তেল (oil), সবজি (vegetables), মাছ (fish), মাংস (meat), ডিম-দুধ (eggs-milk), মসলা (spices) — has its own page (/category/[slug]). The Sort dropdown (সাজান: ডিফল্ট | দাম: কম থেকে বেশি | দাম: বেশি থেকে কম) re-orders the products instantly by actual numeric value, correctly handling Bengali numerals. Invalid slugs show a friendly empty state with a "হোম পেজে ফিরে যান" button.

3. Protected Product Details with Bazar-wise Table
Every product page (/product/[slug]) requires login — otherwise it redirects to /sign-in. Once logged in, users see: today's price, min/max/average price across 12 bazaars, price difference from yesterday (in টাকা and percentage), and a complete bazar-wise table listing the minimum, maximum, and average price of each bazar — covering কারওয়ান বাজার, গ্রীন মার্কেট, চট্টগ্রাম, রাজশাহী, খুলনা, সিলেট, and more.

4. Email/Password Authentication with BetterAuth
Users can sign up and sign in using email and password via BetterAuth, with accounts stored in MongoDB Atlas. The header shows "সাইন ইন / সাইন আপ" buttons when logged out, and a user avatar with a dropdown menu (প্রোফাইল + সাইন আউট) when logged in. Every auth action shows a relevant toast notification (loading / success / error). Protected routes (product details, profile) automatically redirect unauthenticated users.

5. Profile Page with Update Information
The /profile route shows the logged-in user's name, email, and verification status. A "প্রোফাইল আপডেট করুন" button leads to /profile/update where users can change their display name using BetterAuth's updateUser method. Success shows a green toast and redirects back to /profile. A clean, Figma-accurate design — fully responsive across mobile, tablet, and desktop.