/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Quicksand", "sans-serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#47b8ec",
          light: "#70c1e6",
          dark: "#1c8bbd",
        },
        space: {
          950: "#0e1320",
          900: "#141c2c",
          850: "#1a2235",
          800: "#222c42",
          700: "#2a3344",
        }
      },
      boxShadow: {
        'glow': '0 0 40px -10px rgba(71, 184, 236, 0.3)',
      }
    },
  },
  plugins: [],
};
