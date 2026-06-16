/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#e8dfcf",
          dark: "#ddd2bd",
          deep: "#cdbfa6",
        },
        ink: {
          DEFAULT: "#0b0b0a",
          soft: "#1a1814",
          panel: "#121110",
        },
        orange: {
          DEFAULT: "#ff4b0b",
          soft: "#f05a1a",
          deep: "#c23a08",
        },
        sepia: {
          DEFAULT: "#7c6f5a",
          light: "#a89a80",
          dark: "#4a4234",
        },
        coldviolet: "#6a5acd",
        coldblue: "#3b6ea5",
      },
      fontFamily: {
        display: ['"Anton"', '"Oswald"', "Impact", "sans-serif"],
        condensed: ['"Oswald"', '"Bebas Neue"', "sans-serif"],
        bebas: ['"Bebas Neue"', '"Oswald"', "sans-serif"],
        mono: ['"Space Mono"', '"JetBrains Mono"', "monospace"],
      },
      letterSpacing: {
        tightest: "-0.06em",
        ultrawide: "0.35em",
      },
      keyframes: {
        grainShift: {
          "0%,100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-5%,-5%)" },
          "20%": { transform: "translate(-10%,5%)" },
          "30%": { transform: "translate(5%,-10%)" },
          "40%": { transform: "translate(-5%,15%)" },
          "50%": { transform: "translate(-10%,5%)" },
          "60%": { transform: "translate(15%,0%)" },
          "70%": { transform: "translate(0%,10%)" },
          "80%": { transform: "translate(-15%,0%)" },
          "90%": { transform: "translate(10%,5%)" },
        },
        flicker: {
          "0%,100%": { opacity: "0.85" },
          "8%": { opacity: "0.5" },
          "12%": { opacity: "0.9" },
          "20%": { opacity: "0.35" },
          "24%": { opacity: "0.8" },
          "55%": { opacity: "0.95" },
          "70%": { opacity: "0.4" },
          "78%": { opacity: "0.85" },
        },
        lightleak: {
          "0%,100%": { opacity: "0.25", transform: "translate(0,0) scale(1)" },
          "50%": { opacity: "0.55", transform: "translate(3%,-2%) scale(1.08)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        drift: {
          "0%,100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(-2%,-3%)" },
        },
        wobble: {
          "0%,100%": { transform: "rotate(-0.4deg)" },
          "50%": { transform: "rotate(0.4deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        grain: "grainShift 0.6s steps(6) infinite",
        flicker: "flicker 4s infinite",
        lightleak: "lightleak 7s ease-in-out infinite",
        scan: "scan 3.5s linear infinite",
        drift: "drift 14s ease-in-out infinite",
        wobble: "wobble 6s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
