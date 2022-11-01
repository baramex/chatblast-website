module.exports = {
    plugins: {
        tailwindcss: { config: "./tailwindcss.config.js" },
        'postcss-focus-visible': {
            replaceWith: '[data-focus-visible-added]',
        },
        autoprefixer: {},
    },
}
