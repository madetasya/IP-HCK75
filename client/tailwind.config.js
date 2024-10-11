/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      keyframes: {
        wave: {
          "0%": {
            transform: "translateX(-2%)",
          },
          "50%": {
            transform: "translateX(3%)",
          },
          "100%": {
            transform: "translateX(-2%)",
          },
        },
      },
      animation: {
        wave: "wave 8s ease-in-out infinite",
      },
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
