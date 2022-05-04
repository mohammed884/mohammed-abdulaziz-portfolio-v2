module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': "200",
        'sm': '200px',
        // => @media (min-width: 640px) { ... }
        'md': '740px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1290px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      colors: {
        blue_color: "#3B82F6",
        yellow_color: "#FFC623",
        white_color: "#F9FAFE",
        purple_color: "#B388EB",
        deep_blue: "#0E185F",
      },
    },
  },
  plugins: [],
}