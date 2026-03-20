/*
 * ─── tailwind.config.ts (Tailwind CSS v4 with Vite) ─────────────────────────
 *
 * In Tailwind v4, configuration is primarily done via @theme in CSS.
 * The JS config is minimal. Most customisation lives in your CSS entry point.
 */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './resources/js/**/*.{ts,tsx}',
    './resources/views/**/*.blade.php',
  ],
  // Tailwind v4 uses CSS-based theming via @theme {}
  // JS-based theme overrides are still supported for plugin compat
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;


/*
 * ─── resources/css/app.css (Tailwind v4 entry) ───────────────────────────────
 *
 * @import 'tailwindcss';
 *
 * @theme {
 *   --font-display: 'Playfair Display', Georgia, serif;
 *   --font-body: 'Jost', 'Segoe UI', system-ui, sans-serif;
 *
 *   --color-stone-950: #0C0A09;
 *   --color-amber-500: #F59E0B;
 *
 *   --radius-card: 20px;
 * }
 *
 * @keyframes ticker {
 *   from { transform: translateX(0); }
 *   to   { transform: translateX(-50%); }
 * }
 *
 * @keyframes float {
 *   0%, 100% { transform: translateY(0); }
 *   50%       { transform: translateY(-10px); }
 * }
 *
 * @keyframes fadeDown {
 *   from { opacity: 0; transform: translateY(-8px); }
 *   to   { opacity: 1; transform: translateY(0); }
 * }
 *
 * @keyframes slideIn {
 *   from { opacity: 0; transform: translateX(-12px); }
 *   to   { opacity: 1; transform: translateX(0); }
 * }
 *
 * @layer base {
 *   *, *::before, *::after { box-sizing: border-box; }
 *
 *   html { scroll-behavior: smooth; }
 *
 *   body {
 *     font-family: var(--font-body);
 *     background: #FAFAF7;
 *     color: #1C1917;
 *     -webkit-font-smoothing: antialiased;
 *   }
 *
 *   ::selection { background-color: #FEF3C720; }
 *
 *   ::-webkit-scrollbar { width: 4px; }
 *   ::-webkit-scrollbar-track { background: #F5F5F4; }
 *   ::-webkit-scrollbar-thumb { background: #D6D3D1; border-radius: 4px; }
 * }
 */


/*
 * ─── routes/web.php ──────────────────────────────────────────────────────────
 */

// <?php
//
// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\HomeController;
//
// Route::get('/', [HomeController::class, 'index'])->name('home');
//
// // Auth routes (Laravel Breeze / Jetstream)
// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
// });
//
// require __DIR__.'/auth.php';


/*
 * ─── vite.config.ts ──────────────────────────────────────────────────────────
 */

// import { defineConfig } from 'vite';
// import laravel from 'laravel-vite-plugin';
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite';   // Tailwind v4 Vite plugin
//
// export default defineConfig({
//   plugins: [
//     laravel({
//       input: ['resources/css/app.css', 'resources/js/app.tsx'],
//       refresh: true,
//     }),
//     react(),
//     tailwindcss(),   // TW v4 — replaces postcss plugin
//   ],
//   resolve: {
//     alias: {
//       '@': '/resources/js',
//     },
//   },
// });


/*
 * ─── package.json dependencies ───────────────────────────────────────────────
 *
 * {
 *   "dependencies": {
 *     "@inertiajs/react": "^2.0.0",
 *     "react": "^19.0.0",
 *     "react-dom": "^19.0.0",
 *     "lucide-react": "^0.469.0"
 *   },
 *   "devDependencies": {
 *     "@tailwindcss/vite": "^4.0.0",
 *     "@types/react": "^19.0.0",
 *     "@types/react-dom": "^19.0.0",
 *     "@vitejs/plugin-react": "^4.0.0",
 *     "laravel-vite-plugin": "^1.0.0",
 *     "tailwindcss": "^4.0.0",
 *     "typescript": "^5.7.0",
 *     "vite": "^6.0.0"
 *   }
 * }
 *
 *
 * ─── composer.json key packages ──────────────────────────────────────────────
 *
 * {
 *   "require": {
 *     "php": "^8.3",
 *     "laravel/framework": "^11.0",
 *     "inertiajs/inertia-laravel": "^2.0",
 *     "tightenco/ziggy": "^2.0"
 *   }
 * }
 */
