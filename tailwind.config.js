/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cursive: ['Sacramento', 'cursive'],
      },
      transform: {
        'y-180': 'rotateY(180deg)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // sidebar: "#1c2128",
        // navbar: "#1c2128",
        // mainBackground: "#23262E",
        // foreignBackground: "#2C333A",
        // calendarBackground: "#6C737A",
        // textIcons: "#ACBBC7",

        // sidebar: "#0B2447",
        // navbar: "#0B2447",
        // mainBackground: "#19376D",
        // foreignBackground: "#337CCF",
        // calendarBackground: "#6C737A",
        // textIcons: "#ACBBC7",

        sidebar: "#0A2647",
        navbar: "#0A2647",
        mainBackground: "#144272",
        foreignBackground: "#205295",
        calendarBackground: "#6C737A",
        textIcons: "#ACBBC7",



        textButtons: "#ffffff",
        linkColor: "#2563eb",
        linkColorHover: "#3b82f6",
      },
    },
    screens: {
      'phone': '280px', // => @media (min-width: 280px) { ... }
      'tablet': '640px', // => @media (min-width: 640px) { ... }
      'laptop': '1024px', // => @media (min-width: 1024px) { ... }
      'desktop': '1280px', // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
}
