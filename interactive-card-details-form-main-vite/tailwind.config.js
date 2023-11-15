/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        SpaceGrotesk: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        "white-FM": "hsl(0, 0%, 100%)",
        "light-grayish-violet": "hsl(270, 3%, 87%)",
        "dark-grayish-violet": " hsl(279, 6%, 55%)",
        "very-dark-violet": " hsl(278, 68%, 11%)",
        "error-red": "hsl(0, 100%, 66%)",
      },
    },
  },
  plugins: [],
};
