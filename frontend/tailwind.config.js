/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
      screens: {
        'sm': '480px',
        // => @media (min-width: 640px) { ... }
        'md': '768px',
        'lg': '990px',
        'xl': '1024px',
        '665' : "665px",
        '600' : "600px"
      },
    extend: {},
  },
  plugins: [],
}

