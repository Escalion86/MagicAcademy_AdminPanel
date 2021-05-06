module.exports = {
  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
        9: '2.25rem',
        25: '6.25rem',
        32: '8rem',
        40: '10rem',
      },
      maxWidth: {
        25: '6.25rem',
        40: '10rem',
        50: '12.5rem',
        100: '25rem',
      },
      minHeight: {
        11: '2.75rem',
      },
      inset: {
        menu: '3.70rem',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
      cursor: ['disabled'],
      textColor: ['disabled'],
    },
  },
  plugins: [],
}
