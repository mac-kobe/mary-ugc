/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: '#C4704B',
        sage: '#8B9E7E',
        cream: '#FFF8F0',
        linen: '#F3EDE4',
        charcoal: '#2D2D2D',
        'warm-white': '#FFFFFF',
        'soft-gold': '#D4A853',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'warm': '0 4px 20px rgba(196, 112, 75, 0.08)',
        'warm-lg': '0 8px 30px rgba(196, 112, 75, 0.12)',
        'warm-xl': '0 12px 40px rgba(196, 112, 75, 0.16)',
      },
    },
  },
  plugins: [],
}
