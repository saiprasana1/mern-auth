/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // 👈 scans all components for Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
