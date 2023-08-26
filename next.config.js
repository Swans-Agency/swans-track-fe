/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    DIGITALOCEAN: process.env.DIGITALOCEAN,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  },
  images: {
    domains: ['swansagencymain.fra1.digitaloceanspaces.com', 'img.freepik.com', 'images.unsplash.com', 'xsgames.co'],
  },
}

module.exports = nextConfig
