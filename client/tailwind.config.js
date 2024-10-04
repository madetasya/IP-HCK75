/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        chamoisee: "#977458ff",
        buff: "#da985bff",
        seashell: "#fef7f1ff",
        bone: "#e4d9c7ff",
        platinum: "#dde3dfff",
        "light-blue": "#92bcbeff",
        "dark-green": "#263E40",
      },
    },
  },
  plugins: [],
};