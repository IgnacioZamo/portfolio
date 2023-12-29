/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				portfolio:{
					'azul-oscuro1' : '#152335',
					'azul-oscuro2' : '#0C3466',
					'verde-agua' : '#0F9178'

				}
			},
			fontFamily:{
				"fuente1":'Hedvig Letters Serif, serif',
				"fuente2":'Crimson Text, serif'
			}
		},
	},
	plugins: [],
}
