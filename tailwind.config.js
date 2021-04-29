module.exports = {
  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
        9: '2.25rem',
        32: '8rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
