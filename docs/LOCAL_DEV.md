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
sail artisan serve
pnpm run dev
```

## Testing
```bash
sail artisan test
pnpm run build
```

## Useful Operations
```bash
sail artisan route:list
sail artisan migrate:status
sail artisan optimize:clear
```
