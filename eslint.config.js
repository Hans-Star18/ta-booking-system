import unusedImports from 'eslint-plugin-unused-imports'
import react from 'eslint-plugin-react'

export default [
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                // Browser
                window: 'readonly',
                document: 'readonly',
                console: 'readonly',
                alert: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                fetch: 'readonly',
                localStorage: 'readonly',
                sessionStorage: 'readonly',
                navigator: 'readonly',

                // Node.js
                process: 'readonly',
                require: 'readonly',
                module: 'readonly',
                exports: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                global: 'readonly',
                Buffer: 'readonly',

                // React
                React: 'readonly',

                // Laravel/Inertia
                route: 'readonly',
                axios: 'readonly',
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        plugins: {
            'unused-imports': unusedImports,
            react: react,
        },
        rules: {
            // Matikan default unused vars
            'no-unused-vars': 'off',

            // React rules untuk mendeteksi JSX usage
            'react/jsx-uses-react': 'warn',
            'react/jsx-uses-vars': 'warn',

            // Unused imports rules
            'unused-imports/no-unused-imports': 'warn',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^(_|React)',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
        },
    },
    {
        ignores: [
            'public/build/**',
            'public/js/**',
            'public/css/**',
            'node_modules/**',
            'vendor/**',
            'bootstrap/cache/**',
            'storage/**',
            '.vscode/**',
            '.idea/**',
            'coverage/**',
            'dist/**',
            'build/**',
            '*.config.js',
            'webpack.config.js',
            'vite.config.js',
            'tailwind.config.js',
        ],
    },
]
