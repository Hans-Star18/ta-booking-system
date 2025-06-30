export default {
    parser: '@babel/eslint-parser',
    parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: {
            jsx: true,
        },
        babelOptions: {
            presets: ['@babel/preset-react'],
        },
        ecmaVersion: 2022,
        sourceType: 'module',
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    env: {
        browser: true,
        es2022: true,
        node: true,
    },
    globals: {
        // Inertia.js globals
        route: 'readonly',
        // Laravel globals
        $page: 'readonly',
        $props: 'readonly',
        $inertia: 'readonly',
        // Vite globals
        import: 'readonly',
        import_meta_env: 'readonly',
        import_meta_glob: 'readonly',
        // Global utilities
        globalThis: 'readonly',
    },
    rules: {
        'react/prop-types': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-key': 'error',
        'react/jsx-no-duplicate-props': 'error',
        'react/jsx-no-undef': 'error',
        'react/no-unescaped-entities': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        // General rules
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'no-console': 'warn',
        'prefer-const': 'error',
        'no-var': 'error',
    },
}
