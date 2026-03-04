import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#94041d",
          dark:    "#7a0318",
          light:   "#b5052a",
          50:      "#fff0f2",
          100:     "#ffd6db",
          200:     "#ffadb9",
          300:     "#ff7088",
          400:     "#d4304e",
          500:     "#94041d",
          600:     "#7a0318",
          700:     "#5e0212",
          800:     "#44010d",
          900:     "#2c0008",
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #94041d 0%, #b5052a 50%, #94041d 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
