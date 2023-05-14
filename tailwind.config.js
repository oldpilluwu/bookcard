/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */

const withMT = require("@material-tailwind/react/utils/withMT");

const colors = require('tailwindcss/colors')
module.exports = withMT({
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",

  ],
  darkMode: 'media',
  plugins: [
    require("flowbite/plugin")
  ],
  theme: {
    colors: {
      primary: colors.blue,
      secondary: colors.purple,
      neutral: colors.gray,
    }
  },
});