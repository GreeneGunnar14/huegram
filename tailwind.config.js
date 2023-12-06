/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/index.html"],
  theme: {
    extend: {
      fontFamily: {
        logo: ["Pacifico", "Sans-serif"],
        heading: ["Poppins", "Sans-serif"],
        body: ["Robot", "Sans-serif"],
      },
    },
  },
  plugins: [],
};
