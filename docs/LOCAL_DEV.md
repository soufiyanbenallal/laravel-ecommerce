# Local Development

## Prerequisites
- PHP 8.2+
- Composer 2+
- Node.js 20+
- npm 10+

## First-time Setup
```bash
composer setup
```

This runs install, env setup, app key generation, migrations, npm install, and frontend build.

## Daily Development
```bash
composer dev
```

Runs Laravel app server, queue listener, pail logs, and Vite concurrently.

## Manual Commands
```bash
php artisan serve
npm run dev
```

## Testing
```bash
php artisan test
npm run build
```

## Useful Operations
```bash
php artisan route:list
php artisan migrate:status
php artisan optimize:clear
```
