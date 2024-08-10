/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier/skip-formatting',
    ],
    rules: {
        'no-irregular-whitespace': 'off',
    },
    overrides: [
        {
            files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
            extends: ['plugin:playwright/recommended'],
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
}
