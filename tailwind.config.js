/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'wird-dark-teal': '#255458',
        'wird-teal': '#44797D',
        'wird-cream': '#FFFBF1',
        'wird-charcoal': '#20261E',
        'wird-gold': '#EAC385',
      },
      fontFamily: {
        'GESSTextMedium': ['GESSTextMedium'],
        'GESSTextBold': ['GESSTextBold'],
      },
    },
  },
  plugins: [],
}
