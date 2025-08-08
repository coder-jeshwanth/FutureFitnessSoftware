/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'highlight': 'highlight 1.5s ease',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        highlight: {
          '0%': { backgroundColor: '#165D31' },
          '100%': { backgroundColor: '#3a4148' },
        },
      },
    },
  },
  plugins: [],
};
