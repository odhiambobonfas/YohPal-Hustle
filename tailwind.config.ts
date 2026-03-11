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
        sora: ["var(--font-sora)", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#E8380D",
          dark:    "#D12E09",
          light:   "#FF714D",
          50:  "#FFF3F0",
          100: "#FFE4DE",
          200: "#FFCEBD",
          300: "#FFAC94",
          400: "#FF714D",
          500: "#E8380D",
          600: "#D12E09",
          700: "#AB2206",
          800: "#871A05",
          900: "#6E1504",
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
