module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [],
  theme: {
    extend: {
        fontFamily: {
            sans: ['Terminal', 'monospace']
        },
        colors: {
            primary: '#F3F4F6'
        }
    },
  },
  plugins: [],
}
