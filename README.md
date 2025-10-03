# Next.js + Convex Monorepo Template

A modern full-stack monorepo template featuring Next.js 15, Convex backend, and Better Auth authentication.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TailwindCSS 4, Radix UI
- **Backend**: Convex (real-time database and backend)
- **Auth**: Better Auth with Convex integration
- **Monorepo**: Turborepo with pnpm workspaces
- **Tooling**: TypeScript, Biome (linting/formatting)

## Project Structure

```
├── apps/
│   └── nextjs/          # Next.js application
├── packages/
│   └── database/        # Convex backend with schema and auth config
```

## Prerequisites

- Node.js >= 22
- pnpm 10.18.0
- Convex account and project

## Getting Started

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Environment setup**

   - Create `.env.local` in root with:
     ```
     CONVEX_DEPLOY_KEY=your_key_here
     CONVEX_SITE_URL=your_convex_site_url
     ```

3. **Development**

   ```bash
   # Run all services (Convex + Next.js)
   pnpm dev

   # Run only Next.js (after database is built)
   pnpm dev:web
   ```

4. **Access the app**
   - Next.js: http://localhost:3000
   - Convex Dashboard: Check your Convex project

## Available Scripts

- `pnpm dev` - Start all services in development mode
- `pnpm dev:web` - Start only Next.js (requires database to be built)
- `pnpm build` - Build all packages and apps
- `pnpm lint` - Lint all code
- `pnpm format` - Format code with Biome
- `pnpm typecheck` - Type check all packages
- `pnpm check` - Run Biome check (lint + format)
- `pnpm clean` - Clean all build artifacts and dependencies

## Features

- Real-time database with Convex
- Authentication with Better Auth
- User management with todos example
- Type-safe API with automatic code generation
- Modern UI with Radix UI components
- Dark mode support (next-themes)
- Monorepo architecture with workspace dependencies

## Database Schema

Current schema includes:

- **Users**: Basic user table with email
- **Todos**: Todo items linked to users

Schema is defined in `packages/database/convex/schema.ts`

## Deployment

### Convex

```bash
cd packages/database
pnpm convex:deploy
```

### Next.js

Deploy to Vercel or any Next.js hosting platform. Ensure environment variables are set.
