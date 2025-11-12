const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
export default {
  plugins: [heroui()],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(dropdown|menu|divider|popover|button|ripple|spinner).js"
  ],
  theme: {
    extend: {},
  },

};



