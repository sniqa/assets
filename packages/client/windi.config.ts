import { defineConfig } from 'windicss/helpers'
import formsPlugin from 'windicss/plugin/forms'
import scrollbarPlugin from '@windicss/plugin-scrollbar'

export default defineConfig({
	darkMode: 'class',
	// safelist: 'p-3 p-4 p-5',
	// theme: {
	// 	extend: {
	// 		colors: {
	// 			teal: {
	// 				100: '#096',
	// 			},
	// 		},
	// 	},
	// },
	plugins: [scrollbarPlugin],
})
