/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Playfair Display", "ui-serif", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial"]
      },
      boxShadow: {
        glow: "0 0 0.75rem rgba(255,255,255,0.08), 0 0 3rem rgba(164, 123, 255, 0.18)"
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        sheen: {
          "0%": { transform: "translateX(-120%) skewX(-12deg)" },
          "100%": { transform: "translateX(140%) skewX(-12deg)" }
        }
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        sheen: "sheen 1.2s ease-in-out"
      }
    }
  },
  plugins: []
};
