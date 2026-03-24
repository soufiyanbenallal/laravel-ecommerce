# MCP and Skills

## MCP Config Files
- `.mcp.example.json`: template for new environments
- `.mcp.json`: local project MCP config

## Included MCP Servers
- `filesystem`: repository file operations
- `mysql` (via `@berthojoris/mcp-mysql-server`): inspect MySQL data from Sail
- `fetch`: fetch documentation and HTTP resources

## Database Context
- Application runtime database is MySQL via Laravel Sail (`DB_CONNECTION=mysql` in `.env`).
- SQLite (`database/database.sqlite`) may exist for local tooling/tests, but it is not the default app data source.

## Setup
1. Ensure MCP server packages are available through `npx`.
2. Adjust absolute paths in `.mcp.json` if your repo path differs.
3. For Sail-based MySQL, use host-reachable connection values in MCP env (`DB_HOST=127.0.0.1`, forwarded `DB_PORT`).
4. Configure your MCP-capable client to load this file.
5. Restart VS Code after changing MCP configuration.

## MySQL MCP Package Choice
- Selected package: `@berthojoris/mcp-mysql-server`
- Why: actively maintained, widely used in MCP agent ecosystems, supports JSON MCP configs and permission scoping.
- Default permission scope in this repo is read-only oriented: `list,read,utility`.

## Repo Skills
- `.ai/skills/laravel-specialist/SKILL.md`
- `.ai/skills/php-mcp-server-generator/SKILL.md`
- `.ai/skills/laravel-shopper-inertia/SKILL.md`

## When To Use `laravel-shopper-inertia`
Use it for tasks that span Laravel controllers, Inertia props, React TS components, Tailwind styling, and Shopper-aware backend choices.
