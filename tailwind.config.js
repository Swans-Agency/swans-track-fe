/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        sidebar: "#1c2128",
        mainBackground: "#23262E",
        foreignBackground: "#2C333A",
        textIcons: "#ACBBC7",
        textButtons: "#ffffff",
      },
    },
    screens: {
      'phone': '375px', // => @media (min-width: 375px) { ... }
      'tablet': '640px', // => @media (min-width: 640px) { ... }
      'laptop': '1024px', // => @media (min-width: 1024px) { ... }
      'desktop': '1280px', // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
}
