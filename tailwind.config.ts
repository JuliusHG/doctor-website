import type { Config } from "tailwindcss"
import { hexColors } from "./src/config/colors"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-nunito-sans)", "sans-serif"],
        heading: ["var(--font-oswald)", "sans-serif"],
        teko: ["var(--font-teko)", "sans-serif"],
        "nunito-sans": ["var(--font-nunito-sans)", "sans-serif"],
      },
      colors: {
        ...hexColors,
        "dw-dark": "hsl(var(--dw-dark) / <alpha-value>)",
        "dw-darker": "hsl(var(--dw-darker) / <alpha-value>)",
        "dw-soft": "hsl(var(--dw-soft) / <alpha-value>)",
        "dw-softer": "hsl(var(--dw-softer) / <alpha-value>)",
        "dw-white": "hsl(var(--dw-white) / <alpha-value>)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        navy: {
          600: "#1a365d",
        },
      },
      keyframes: {
        orbit: {
          "0%": { transform: "translate(-25%, -30%) rotate(0deg) translateX(40px) rotate(0deg)" },
          "100%": { transform: "translate(-25%, -30%) rotate(360deg) translateX(40px) rotate(-360deg)" },
        },
      },
      animation: {
        orbit: "orbit 3s linear infinite",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      screens: {
        'xs': '520px',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config

