/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "grayscale-50": "#FBFCFD",
        "grayscale-100": "#F9FAFB",
        "grayscale-200": "#F7F8FA",
        "grayscale-300": "#EFF1F5",
        "grayscale-400": "#DFE1E6",
        "grayscale-500": "#9A9EA6",
        "grayscale-600": "#737780",
        "grayscale-700": "#484B52",
        "grayscale-800": "#313338",
        "grayscale-900": "#181919",
        "blue-100": "#71B0D0",
        "feedback-error": "#FF9691",
        "red-500": "#AB0C00",
      },
      spacing: {},
    },
  },
  plugins: [],
};
