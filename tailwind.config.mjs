/** @type {import('tailwindcss').Config} */
// Paleta, tipografías y medidas del sitio. Las mismas variables viven en src/styles/global.css
// para los estilos scoped de cada componente.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        portfolio: {
          bg: '#070C16',
          'bg-2': '#0B1322',
          surface: '#0F1A2C',
          'surface-2': '#13223A',
          text: '#E6EDF6',
          muted: '#93A3B8',
          dim: '#5B6B82',
          teal: '#2DD4BF',
          'teal-deep': '#0F9178',
          cyan: '#38BDF8',
          indigo: '#818CF8',
          line: 'rgba(148,163,184,.14)',
          'line-strong': 'rgba(45,212,191,.35)',
        },
      },
      backgroundImage: {
        'portfolio-grad': 'linear-gradient(100deg,#2DD4BF 0%,#38BDF8 55%,#818CF8 100%)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '18px',
        panel: '24px',
        button: '12px',
      },
      maxWidth: {
        container: '1180px',
      },
      // Mobile-first: tablet desde 641px y desktop desde 1025px
      screens: {
        tablet: '641px',
        desktop: '1025px',
      },
    },
  },
  plugins: [],
}
