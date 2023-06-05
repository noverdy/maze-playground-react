/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-in-out'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        'scale-in': {
          '0%': {
            transform: 'scale(0.5)',
            opacity: '50%',
            borderRadius: '35%'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '100%',
            borderRadius: '10%'
          }
        }
      }
    },
    fontFamily: {
      sans: ['"Poppins"', 'sans-serif']
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: []
}
