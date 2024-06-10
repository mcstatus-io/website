/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {},
        fontFamily: {
            sans: ['var(--font-inter)'],
            mono: ['var(--font-fira-mono)']
        }
    }
};
