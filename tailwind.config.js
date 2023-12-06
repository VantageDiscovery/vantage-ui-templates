/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // or 'media'
  safelist: [
    {pattern: /bg-./},
    {pattern: /text-./},
    {pattern: /fill-./},
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        // Custom screen sizes here
      },
      colors: {
        primary: "#FF0000",
        // Custom theme colors here
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      transitionProperty: {
        'width': "width",
        'opacity': "opacity",
      },
      animation: {
        'slide-in': "slide-in 2s linear",
        'appear-left-logo': "appear-left-logo 2s linear",
        'appear-vantage-logo': "appear-vantage-logo 2s linear",
        'reduce-height': "full-size-to-logo 2s linear",
        'fade-in': "content-appear 3s linear",
        'fade-in-fast': "content-appear 0.2s linear",
        search: "search 4s cubic-bezier(.36,.07,.19,.97) infinite",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            width: "10%",
            "background-color": "var(--bg-color)"
          },
          "25%": {
            width: "100%",
          },
          "90%": {
            "background-color": "var(--bg-color)",
          },
          "100%": {
            "background-color": "transparent",
          },
        },
        "appear-left-logo": {
          "0%": {
            "margin-right": '50%',
            opacity: "0",
            width: '320px',
            fill: "var(--bg-start-color)",
          },
          "30%": {
            opacity: "0",
          },
          "40%": {
            opacity: "1",
          },
          "75%": {
            "margin-right": '50%',
            width: '320px',
            fill: "var(--bg-start-color)",

          },
          "100%": {
            "margin-right": '15%',
            opacity: "1",
            width: '192px',
            fill: "var(--bg-end-color)",
          }
        },
        "appear-vantage-logo": {
          "0%": {
            "margin-left": '50%',
            opacity: "0",
            width: '320px',
            fill: "var(--bg-start-color)",
          },
          "30%": {
            opacity: "0",
          },
          "40%": {
            opacity: "1",
          },
          "75%": {
            "margin-left": '50%',
            width: '320px',
            fill: "var(--bg-start-color)",
          },
          "100%": {
            "margin-left": '10%',
            opacity: "1",
            width: '192px',
            fill: "var(--bg-end-color)"
          }
        },
        "full-size-to-logo": {
          "0%, 60%": {
            height: "100vh",
            "background-color": "transparent"
          },
          "100%": {
            height: "32",
          },
        },
        "content-appear": {
          "0%, 75%": {
            opacity: 0
          },
          "100%": {
            opacity: 1
          },
        },
        search: {
          "0%, 100%": {
            transform: "translate(45px,25px) rotate(-45deg)",
          },
          "20%": {
            transform: "translate(0px,-25px) rotate(45deg)",
          },
          "40%,60%": {
            transform: "translate(15px,25px) rotate(70deg)",
          },
          "80%": {
            transform: "translate(-45px,-25px) rotate(90deg)",
          },
        },
      }
    },
  },
};


