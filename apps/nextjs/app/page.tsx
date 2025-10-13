"use client";

import { api } from "@acme/database/convex/_generated/api";
import { Authenticated, AuthLoading, Unauthenticated, useQuery } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.refresh();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link className="font-semibold text-lg" href="/">
              Acme Starter
            </Link>
            <span className="hidden rounded-full border border-border px-2 py-0.5 text-muted-foreground text-xs sm:inline-flex">
              Next.js · Convex · Better Auth
            </span>
          </div>

          <div className="flex items-center gap-3">
            <AuthLoading>
              <span className="text-muted-foreground text-sm">Checking status…</span>
            </AuthLoading>

            <Authenticated>
              <AuthenticatedHeader onLogout={handleLogout} />
            </Authenticated>

            <Unauthenticated>
              <div className="flex items-center gap-3">
                <span className="hidden text-muted-foreground text-sm sm:inline">You're signed out</span>
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href="/login">Sign in</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/signup">Create account</Link>
                  </Button>
                </div>
              </div>
            </Unauthenticated>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container flex flex-col gap-10 px-4 py-16">
          <section className="mx-auto max-w-3xl space-y-4 text-center">
            <span className="inline-flex items-center justify-center rounded-full border border-border bg-background px-3 py-1 text-muted-foreground text-xs">
              Full-stack starter template
            </span>
            <h1 className="text-balance font-semibold text-4xl tracking-tight sm:text-5xl">
              Build polished apps with Next.js, Convex, and Better Auth
            </h1>
            <p className="text-balance text-lg text-muted-foreground">
              A minimal starting point with sensible defaults, real-time data, and authentication built in so you can stay focused on your product.
            </p>
          </section>

          <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="font-semibold text-lg">Authentication status</h2>
              <p className="mt-1 text-muted-foreground text-sm">
                Your account updates in real time using Convex subscriptions.
              </p>

              <div className="mt-6">
                <AuthLoading>
                  <div className="flex items-center gap-3 rounded-xl border border-border border-dashed px-4 py-3 text-muted-foreground text-sm">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground" />
                    Fetching account details…
                  </div>
                </AuthLoading>

                <Authenticated>
                  <AuthenticatedContent />
                </Authenticated>

                <Unauthenticated>
                  <div className="flex flex-col items-start gap-3 rounded-xl border border-border/60 bg-muted/40 px-4 py-4 text-left">
                    <div className="inline-flex items-center gap-2 font-medium text-sm">
                      <span className="h-2 w-2 rounded-full bg-muted-foreground" />
                      You're not signed in
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Access examples instantly by creating an account or signing in to continue.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button asChild size="sm">
                        <Link href="/login">Sign in</Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link href="/signup">Create account</Link>
                      </Button>
                    </div>
                  </div>
                </Unauthenticated>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <h2 className="font-semibold text-lg">Quick links</h2>
                <p className="mt-1 text-muted-foreground text-sm">
                  Handy entry points once you're authenticated.
                </p>

                <Authenticated>
                  <div className="mt-4 flex flex-col gap-2">
                    <Button asChild variant="outline">
                      <Link href="/profile">View profile</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/settings">Account settings</Link>
                    </Button>
                  </div>
                </Authenticated>

                <Unauthenticated>
                  <div className="mt-4 space-y-3 text-muted-foreground text-sm">
                    <p>Get started by creating an account and explore the authenticated experience.</p>
                    <Button asChild>
                      <Link href="/signup">Create your account</Link>
                    </Button>
                  </div>
                </Unauthenticated>
              </div>

              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <h2 className="font-semibold text-lg">Included tech</h2>
                <ul className="mt-4 space-y-2 text-muted-foreground text-sm">
                  <li>• Next.js 15 App Router</li>
                  <li>• Convex database with real-time queries</li>
                  <li>• Better Auth 0.8 integration</li>
                  <li>• Shadcn UI primitives with Tailwind CSS</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t bg-background/90 px-4 py-6">
        <div className="container text-center text-muted-foreground text-sm">
          Built with care by the Acme starter kit team.
        </div>
      </footer>
    </div>
  );
}

function AuthenticatedHeader({ onLogout }: { onLogout: () => void }) {
  const user = useQuery(api.auth.getCurrentUser);

  return (
    <div className="flex items-center gap-3">
      {user?.email && (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 font-medium text-primary text-sm">
          {user.email.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="flex flex-col text-right">
        <span className="text-muted-foreground text-xs">Signed in as</span>
        <span className="font-medium text-sm">{user?.email ?? "Loading…"}</span>
      </div>
      <Button onClick={onLogout} size="sm" variant="ghost">
        Sign out
      </Button>
    </div>
  );
}

function AuthenticatedContent() {
  const user = useQuery(api.auth.getCurrentUser);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-muted/40 px-4 py-4">
      <div className="inline-flex items-center gap-2 font-medium text-emerald-600 text-sm">
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
        You're authenticated
      </div>
      {user && (
        <div className="space-y-2 text-muted-foreground text-sm">
          <p>
            <span className="font-medium text-foreground">Email:</span> {user.email}
          </p>
          <p className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-foreground">User ID:</span>
            <code className="rounded-md bg-background px-2 py-1 text-xs">{user._id}</code>
          </p>
          {user.emailVerified && (
            <p>
              <span className="font-medium text-foreground">Email verified:</span> Yes
            </p>
          )}
          {user.createdAt && (
            <p>
              <span className="font-medium text-foreground">Member since:</span>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
