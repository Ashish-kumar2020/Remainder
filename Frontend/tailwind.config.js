/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#1d4ed8',
        primaryBlueHover: "#1e40af",
        primaryFocusRing: "#93c5fd",
        dangerRed: "#b91c1c",
        dangerRedHover: "#991b1b",
        dangerFocusRing: "#f87171"
      },
      borderRadius: {
        customRadiusPrimaryLg: '8px',
      },
    },
  },
  plugins: [],
}