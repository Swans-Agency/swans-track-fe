/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    DIGITALOCEAN: process.env.DIGITALOCEAN,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    CALENDY_CLIENT_ID: process.env.CALENDY_CLIENT_ID,
    REDIRECT_CALENDY_URL: process.env.REDIRECT_CALENDY_URL,
    ENV_TYPE: process.env.ENV_TYPE,
    NEXT_PUBLIC_FACEBOOK_PIXEL_ID: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
  },
  images: {
    domains: ['swansagencymain.fra1.digitaloceanspaces.com', 'img.freepik.com', 'images.unsplash.com', 'xsgames.co', 'eu2.contabostorage.com'],
  },
}

module.exports = nextConfig
