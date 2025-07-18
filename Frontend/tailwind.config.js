/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      darkMode: 'class',
      colors: {
        primaryBlue: '#1d4ed8',
        primaryBlueHover: "#1e40af",
        primaryFocusRing: "#93c5fd",
        dangerRed: "#b91c1c",
        dangerRedHover: "#991b1b",
        dangerFocusRing: "#f87171",
        primary: "rgb(17 24 39)",
      },
      borderRadius: {
        customRadiusPrimaryLg: '8px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}