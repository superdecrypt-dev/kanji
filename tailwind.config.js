/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        border: "var(--border-color)",
        input: "var(--border-color)",
        ring: "var(--primary)",
        background: "var(--bg-color)",
        foreground: "var(--text-color)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--text-color)",
        },
        destructive: {
          DEFAULT: "var(--accent)",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "var(--bg-color)",
          foreground: "var(--text-secondary)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "#ffffff",
        },
        success: {
          DEFAULT: "var(--success)",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "var(--surface-color)",
          foreground: "var(--text-color)",
        },
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "6px",
      },
    },
  },
  plugins: [],
}
