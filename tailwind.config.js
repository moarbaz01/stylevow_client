/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        color_pink: "#FFC0CB",
        color_black: "black",
        color_dark_pink: "#FF92A5"
      },
      fontFamily: {
        poppins: "Poppins, sans-serif"
      },
      backgroundColor: {
        white_gradient: "rgba(255, 255, 255, 0.2)",
        black_gradient: "rgba(0, 0, 0, 0.2)"

      },
      backgroundImage: {
        heroPageBanner: "url(/src/assets/images/banner-3.jpg)",
        signupImage : "url(/src/assets/images/blog-1.jpg)"
      },
      animation: {
        'Right-To-Left': 'rtl 0.5s linear 1',
        "Top-To-Bottom" : "ttb 0.2s linear 1",
        "scale-animation" : "scale_animation 0.2s linear 1"
      },

      keyframes: {
        rtl: {
          '0% ': { right : "-100%" },
          '100%': { right: '0%' },
        },
        ttb: {
          '0% ': { top : "-100%" },
          '100%': { top: '0%' },
        },
        scale_animation: {
          '0% ': { transform: "scale(0)" },
          '100%': { transform: "scale(1)" },
        }
      }
    },
  },
  plugins: [],
};
