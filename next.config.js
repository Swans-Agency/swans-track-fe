/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    DIGITALOCEAN: process.env.DIGITALOCEAN
  },
  images: {
    domains: ['swansagencymain.fra1.digitaloceanspaces.com', 'img.freepik.com', 'images.unsplash.com',],
  },
}

module.exports = nextConfig
