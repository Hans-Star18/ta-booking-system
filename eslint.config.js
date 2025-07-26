import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-plugin-prettier'
import unusedImports from 'eslint-plugin-unused-imports'
import babelParser from '@babel/eslint-parser'

export default [
    // Base configuration
    js.configs.recommended,

    // Main configuration
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            parser: babelParser,
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
            globals: {
                // Browser globals
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                console: 'readonly',

                // Node.js globals
                process: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                module: 'readonly',
                require: 'readonly',
                exports: 'readonly',
                global: 'readonly',

                // Laravel/Inertia globals
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
            react,
            'react-hooks': reactHooks,
            prettier,
            'unused-imports': unusedImports,
        },
        rules: {
            // React rules
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,

            // React JSX formatting rules
            'react/jsx-first-prop-new-line': ['error', 'multiline'],
            'react/jsx-max-props-per-line': [
                'error',
                { maximum: 1, when: 'multiline' },
            ],
            'react/jsx-indent-props': ['error', 4],
            'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',

            // Prettier rules
            'prettier/prettier': [
                'error',
                {},
                {
                    usePrettierrc: true,
                },
            ],

            // Unused imports rules
            'no-unused-vars': 'off', // Turn off default rule
            'unused-imports/no-unused-imports': 'warn', // Warning for unused imports
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],

            // Other rules
            'no-console': 'error',
        },
    },

    // Ignore patterns
    {
        ignores: [
            // Build outputs
            'public/build/**',
            'public/js/**',
            'public/css/**',
            'public/mix-manifest.json',
            'public/hot',

            // Dependencies
            'node_modules/**',
            'vendor/**',

            // Laravel specific
            'bootstrap/cache/**',
            'storage/**',

            // IDE and OS files
            '.vscode/**',
            '.idea/**',
            '.DS_Store',
            'Thumbs.db',

            // Logs
            '*.log',
            'logs/**',

            // Environment files
            '.env*',

            // Cache and temporary files
            '.cache/**',
            'tmp/**',
            'temp/**',

            // Coverage reports
            'coverage/**',
            '.nyc_output/**',

            // Distribution files
            'dist/**',
            'build/**',

            // Config files that might have different rules
            'webpack.config.js',
            'vite.config.js',
            'tailwind.config.js',
            'postcss.config.js',
        ],
    },

    // Special configuration for config files
    {
        files: ['**/*.config.{js,mjs}', 'eslint.config.js'],
        languageOptions: {
            globals: {
                process: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                module: 'readonly',
                require: 'readonly',
                exports: 'readonly',
            },
        },
        rules: {
            'no-console': 'off',
            'unused-imports/no-unused-imports': 'off',
        },
    },

    // Laravel Blade template files (if you have JS in blade files)
    {
        files: ['resources/views/**/*.blade.php'],
        rules: {
            // More lenient rules for blade files
            'no-console': 'warn',
            'unused-imports/no-unused-imports': 'off',
        },
    },
]
