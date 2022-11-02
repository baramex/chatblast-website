const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx}'],
    theme: {
        fontSize: {
            xs: ['0.75rem', { lineHeight: '1rem' }],
            sm: ['0.875rem', { lineHeight: '1.5rem' }],
            base: ['1rem', { lineHeight: '1.75rem' }],
            lg: ['1.125rem', { lineHeight: '2rem' }],
            xl: ['1.25rem', { lineHeight: '2rem' }],
            '2xl': ['1.5rem', { lineHeight: '2rem' }],
            '3xl': ['2rem', { lineHeight: '2.5rem' }],
            '4xl': ['2.5rem', { lineHeight: '3.5rem' }],
            '5xl': ['3rem', { lineHeight: '3.5rem' }],
            '6xl': ['3.75rem', { lineHeight: '1' }],
            '7xl': ['4.5rem', { lineHeight: '1.1' }],
            '8xl': ['6rem', { lineHeight: '1' }],
            '9xl': ['8rem', { lineHeight: '1' }],
        },
        extend: {
            borderRadius: {
                '4xl': '2rem',
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                display: ['Lexend', ...defaultTheme.fontFamily.sans],
            },
            maxWidth: {
                '2xl': '40rem',
            },
            animation: {
                "delayed-fade-out": "fade-out .3s ease-out 2.5s forwards",
                "slide-in": "slide-in .3s cubic-bezier(0.075, 0.820, 0.165, 1.000)",
            },
            keyframes: {
                "fade-out": {
                    "from": { opacity: 1 },
                    "to": { opacity: 0 }
                },
                "slide-in": {
                    "from": { transform: "translateY(-100%)", opacity: .5 },
                    "to": { transform: "translateY(0)", opacity: 1 }
                }
            }
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
