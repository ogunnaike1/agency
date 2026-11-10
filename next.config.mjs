/** @type {import('next').NextConfig} */
// images are already-sized static files in /public; serve them directly instead of through the /_next/image optimizer
export default { reactStrictMode: true, images: { unoptimized: true } };
