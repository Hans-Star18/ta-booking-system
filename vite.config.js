import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/app.jsx"],
            refresh: true,
        }),
        tailwindcss(),
        react(),
    ],
    esbuild: {
        jsx: "automatic",
    },
    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
    server: {
        host: "0.0.0.0", // Dengarkan di semua antarmuka jaringan
        port: 5173, // Port default Vite
        hmr: {
            host: "localhost", // Host untuk Hot Module Replacement (HMR)
        },
    },
});
