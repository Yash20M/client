/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      extend: {
        animation: {
          bounce: "bounce 1s infinite",
        },
        keyframes: {
          bounce: {
            "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
            "40%": { transform: "translateY(-1rem)" },
            "60%": { transform: "translateY(-0.5rem)" },
          },
        },
        backdropBlur: {
          xs: "2px",
        },
        colors: {
          darkblue: "#1e3a8a",
        },
      },
    },
  },
  plugins: [],
};
