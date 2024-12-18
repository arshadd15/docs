/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { plugins: [require("tailwind-scrollbar")] },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".scrollbar-transparent::-webkit-scrollbar": {
          width: "8px",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
        ".scrollbar-transparent::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        ".scrollbar-transparent::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
        },
        ".scrollbar-transparent::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
      });
    },
  ],
};
