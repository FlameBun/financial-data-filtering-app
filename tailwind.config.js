/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "noto-sans": ['"Noto Sans"', "ui-sans-serif", "system-ui", "sans-serif"]
      }
    },
  },
  plugins: [],
}

