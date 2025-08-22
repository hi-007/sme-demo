// tailwind.config.js
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Noto Sans Thai'", "'Noto Sans Thai Fallback'", "sans-serif"]
      }
    }
  },
  plugins: []
};
