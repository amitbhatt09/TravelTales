/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        surface: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        primary: "#0EA5E9",
        secondary: "#14B8A6",
        accent: "#F97316",
        success: "#22C55E",
        danger: "#EF4444",
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12"
        }
      },
      boxShadow: {
        glow: "0 30px 80px -40px rgba(14, 165, 233, 0.45)",
        panel: "0 24px 60px -28px rgba(15, 23, 42, 0.28)",
      },
      backgroundImage: {
        "travel-grid": "radial-gradient(circle at top, rgba(14,165,233,0.16), transparent 34%), linear-gradient(135deg, rgba(20,184,166,0.14), transparent 38%), linear-gradient(180deg, rgba(249,115,22,0.1), transparent 72%)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
      }
    }
  },
  plugins: []
};

