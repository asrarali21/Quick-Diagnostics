export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        heading: '#2D2A38',
        muted: '#5A5766',
        primary: '#7C5CFC'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      letterSpacing: {
        tightish: '-0.5px'
      }
    }
  },
  plugins: []
}
