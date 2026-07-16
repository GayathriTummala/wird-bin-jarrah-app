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
        // Revamp palette (Figma design tokens)
        'wird-navy': '#113152',
        'wird-blue': '#154980',
        'wird-grey': '#CDCCC9',
        'wird-light-grey': '#E6E6E6',
        'wird-yellow': '#E0F57F',
      },
      fontFamily: {
        'GESSTextMedium': ['GESSTextMedium'],
        'GESSTextBold': ['GESSTextBold'],
      },
    },
  },
  plugins: [],
}
