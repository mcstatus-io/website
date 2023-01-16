const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/layouts/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {},
		fontFamily: {
			sans: ['Inter', 'sans-serif'],
			mono: ['Fira Mono', 'monospace'],
			ubuntu: ['Ubuntu', 'sans-serif']
		}
	},
	plugins: [
		plugin(({ addVariant }) => {
			addVariant('error', '&[data-error="true"]');
		})
	]
};
