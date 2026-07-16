/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui"]
      },
      colors: {
        signal: "#38bdf8",
        cyanfire: "#22d3ee",
        mint: "#2dd4bf",
        warning: "#f59e0b",
        danger: "#fb7185",
        night: "#050914",
        panel: "rgba(10, 20, 38, 0.72)"
      },
      boxShadow: {
        glow: "0 0 34px rgba(56, 189, 248, 0.22)",
        mint: "0 0 28px rgba(45, 212, 191, 0.18)"
      }
    }
  },
  plugins: []
};
