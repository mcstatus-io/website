import pluginReact from "eslint-plugin-react";
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginNext from "@next/eslint-plugin-next";

const globalValues = {
    ...globals.browser,
    ...globals.node
};

delete globalValues.crypto;

export default [
    { ignores: ["src/.next/"] },
    { files: ["**/*.{js,mjs,cjs,jsx}"] },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        plugins: {
            '@next/next': pluginNext
        },
        rules: pluginNext.configs.recommended.rules
    },
    {
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'semi': 'error',
            'require-await': 'error',
            'prefer-const': 'error',
            'no-var': 'error',
            'no-unused-expressions': 'error',
            'no-unneeded-ternary': 'error',
            'no-undef-init': 'error',
            'no-new-wrappers': 'error'
        },
        languageOptions: {
            globals: globalValues
        },
        settings: {
            react: {
                version: 'detect'
            }
        }
    }
];