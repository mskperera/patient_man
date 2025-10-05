/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4a90e2', // Calming blue
        secondary: '#f0f4f8', // Light background
        accent: '#357abd', // Hover blue
        danger: '#e74c3c', // Red for delete/stop
      },
    },
  },
  plugins: [],
}