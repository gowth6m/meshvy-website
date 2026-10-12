/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Dev only: skip the optimizer (and its .next/cache/images cache) so replacing
    // an image at the same path shows up on refresh — no need to wipe .next.
    unoptimized: process.env.NODE_ENV === "development",
  },
}

export default nextConfig
