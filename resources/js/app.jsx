import './bootstrap'
import '../css/app.css'
import { createInertiaApp } from '@inertiajs/react'
import { route as routeFn } from 'ziggy-js'
import { createRoot } from 'react-dom/client'

globalThis.route = routeFn

const appName = import.meta.env.VITE_APP_NAME

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.jsx', { eager: true })
        return pages[`./pages/${name}.jsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
    progress: {
        color: '#2b7fff',
        showSpinner: true,
    },
})
