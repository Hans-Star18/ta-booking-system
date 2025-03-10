import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import Path from "path";

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
            "@": Path.resolve(__dirname, "resources/js"),
            "ziggy-js": Path.resolve(__dirname, "vendor/tightenco/ziggy"),
        },
    },
    server: {
        host: "0.0.0.0", // Dengarkan di semua antarmuka jaringan
        port: 5174, // Port default Vite
        hmr: {
            host: "localhost", // Host untuk Hot Module Replacement (HMR)
        },
    },
});
