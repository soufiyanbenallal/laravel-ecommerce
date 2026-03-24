# MCP and Skills

## MCP Config Files
- `.mcp.example.json`: template for new environments
- `.mcp.json`: local project MCP config

## Included MCP Servers
- `filesystem`: repository file operations
- `sqlite`: inspect local SQLite database
- `fetch`: fetch documentation and HTTP resources

## Setup
1. Ensure MCP server packages are available through `npx`.
2. Adjust absolute paths in `.mcp.json` if your repo path differs.
3. Configure your MCP-capable client to load this file.

## Repo Skills
- `.ai/skills/laravel-specialist/SKILL.md`
- `.ai/skills/php-mcp-server-generator/SKILL.md`
- `.ai/skills/laravel-shopper-inertia/SKILL.md`

## When To Use `laravel-shopper-inertia`
Use it for tasks that span Laravel controllers, Inertia props, React TS components, Tailwind styling, and Shopper-aware backend choices.
