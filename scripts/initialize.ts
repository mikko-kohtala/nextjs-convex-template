#!/usr/bin/env node
import "zx/globals";
import chalk from "chalk";
import { $ } from "zx";

// Enable verbose mode to see all output
$.verbose = true;

try {
  console.log(chalk.blue("🔐 Copying environment files..."));

  // Copy to apps/nextjs (Next.js app)
  await $`cp ~/.secrets/acme-monorepo-env-file ./apps/nextjs/.env.local`;
  console.log(chalk.green("✓ Next.js .env.local copied"));

  // Copy to packages/database (Convex package)
  await $`cp ~/.secrets/acme-monorepo-env-file ./packages/database/.env.local`;
  console.log(chalk.green("✓ Database .env.local copied"));

  console.log(chalk.blue("\n🔨 Generating Convex types..."));
  await $`pnpm --filter @acme/database codegen`;
  console.log(chalk.green("✓ Convex types generated"));

  console.log(chalk.green.bold("\n✨ Initialization complete!"));
  console.log(chalk.gray("\nYou can now run:"));
  console.log(chalk.cyan("  pnpm dev"));
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error(chalk.red("✗ Initialization failed:"), errorMessage);
  process.exit(1);
}
