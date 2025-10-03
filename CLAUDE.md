# AI Context: Next.js + Convex Monorepo

## Architecture

Turborepo monorepo with 2 workspaces:

- `apps/nextjs` - Next.js 15 app (React 19, TailwindCSS 4)
- `packages/database` - Convex backend with Better Auth

## Key Locations

- **Next.js app**: `apps/nextjs/app/` (App Router)
- **Convex schema**: `packages/database/convex/schema.ts`
- **Auth config**: `packages/database/convex/auth.config.ts`
- **Auth client**: `apps/nextjs/lib/auth-client.ts`
- **Components**: `apps/nextjs/components/`
- **Env vars**: Root `.env.local` (symlinked to apps)

## Tech Specifics

- **Convex**: Real-time database, queries auto-generated to `convex/_generated`
- **Auth**: Better Auth + Convex plugin (not separate auth tables)
- **Styling**: Tailwind 4 + Radix UI primitives + CVA
- **Schemas**: users (email), todos (text, isCompleted, userId)

## Development Workflow

1. Run `pnpm dev` (starts both Convex dev + Next.js)
2. Convex auto-generates types on schema changes
3. Next.js uses workspace dependency `@acme/database`

## Commands

- `pnpm dev` - Start all services
- `pnpm dev:web` - Next.js only (requires database built first)
- `pnpm build` - Build everything
- `pnpm check` - Biome lint+format

## Important Notes

- Node >= 22 required
- Uses Biome
- Convex generation happens in dev mode, not build
- Environment: CONVEX_DEPLOY_KEY, CONVEX_SITE_URL required
