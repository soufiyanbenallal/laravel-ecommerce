import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.tsx"],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./resources/js/tests/setup.ts",
        include: ["resources/js/**/*.test.{ts,tsx}"],
    },
    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
});
