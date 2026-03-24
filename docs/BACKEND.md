# Backend Guide

## Stack
- PHP 8.2+
- Laravel 12
- Shopper 2.1
- Filament 3

## Conventions
- Controllers should orchestrate, not hold business-heavy logic.
- Domain logic should move into services/actions as complexity grows.
- Use Form Requests for write validation.
- Use named routes for all user-facing pages and actions.

## Shopper Integration
- Main config lives in `config/shopper/*`.
- User model extends Shopper base model in `app/Models/User.php`.
- Prefer package extension points and config over editing package internals.

## Suggested Domain Layout (when features are added)
- `app/Domain/Catalog/*`
- `app/Domain/Cart/*`
- `app/Domain/Checkout/*`
- `app/Domain/Customer/*`

## Useful Commands
- `php artisan list | rg shopper`
- `php artisan make:shopper-page`
- `php artisan migrate`
- `php artisan db:seed`
- `php artisan test`

## Current State
- Home page data is mocked server-side in `HomeController`.
- Shopper and Filament are installed and configured but custom ecommerce flows are not fully implemented yet.
