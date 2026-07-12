/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#e50914",
        "brand-dark": "#f40612",
        base: "#141414",
        panel: "#181818",
        card: "#242424",
        muted: "#b3b3b3",
      },
    },
  },
  plugins: [],
};
