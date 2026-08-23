/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2d6a4f",
          light: "#40916c",
          dark: "#1b4332",
        },
        accent: {
          DEFAULT: "#b7791f",
          light: "#d69e2e",
        },
        emerald: {
          DEFAULT: "#059669",
          light: "#34d399",
        },
        moss: "#4d7c0f",
        earth: "#78350f",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
