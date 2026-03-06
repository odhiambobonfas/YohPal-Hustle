import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)"],
      },
      colors: {
        brand: {
          DEFAULT: "#94041d",
          dark:    "#7a0318",
          light:   "#b5052a",
          50:  "#fff0f2",
          100: "#ffd6db",
          200: "#ffadb9",
          300: "#ff7088",
          400: "#d4304e",
          500: "#94041d",
          600: "#7a0318",
          700: "#5e0212",
          800: "#44010d",
          900: "#2c0008",
        },
        // ── Semantic design tokens (follow CSS vars in globals.css) ──
        page:    "rgb(var(--bg-page)    / <alpha-value>)",
        surface: {
          DEFAULT: "rgb(var(--bg-surface)     / <alpha-value>)",
          alt:     "rgb(var(--bg-surface-alt) / <alpha-value>)",
        },
        rim:  "rgb(var(--rim)         / <alpha-value>)",
        fg: {
          DEFAULT:   "rgb(var(--fg)           / <alpha-value>)",
          secondary: "rgb(var(--fg-secondary) / <alpha-value>)",
          muted:     "rgb(var(--fg-muted)     / <alpha-value>)",
        },
      },
      backgroundImage: {
        "brand-gradient":   "var(--brand-gradient)",
        "sidebar-gradient": "var(--sidebar-gradient)",
      },
    },
  },
  plugins: [],
};
export default config;
