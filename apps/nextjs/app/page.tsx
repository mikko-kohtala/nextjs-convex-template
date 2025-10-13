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
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 font-semibold text-white">
              A
            </div>
            <div className="text-left">
              <p className="font-semibold">Acme Starter</p>
              <p className="text-xs text-muted-foreground">Next.js · Convex · Better Auth</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <AuthLoading>
              <div className="text-sm text-muted-foreground">Checking status…</div>
            </AuthLoading>

            <Authenticated>
              <AuthenticatedHeader onLogout={handleLogout} />
            </Authenticated>

            <Unauthenticated>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">You&apos;re signed out</span>
                <div className="flex items-center gap-2">
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

      <main className="flex flex-1">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-16">
          <section className="grid gap-10 lg:grid-cols-[1.35fr_minmax(0,1fr)] lg:items-start">
            <div className="space-y-8">
              <div className="space-y-4 text-balance">
                <span className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600 shadow-sm">
                  Polished starter kit
                </span>
                <h1 className="font-semibold text-4xl tracking-tight text-slate-900 sm:text-5xl">
                  Build your product faster with a clean, modern foundation.
                </h1>
                <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
                  Launch-ready auth, data, and UI primitives bundled into a single starter so you can focus on your core experience.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Authenticated>
                  <Button asChild size="lg">
                    <Link href="/dashboard">Go to dashboard</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/settings">Account settings</Link>
                  </Button>
                </Authenticated>

                <Unauthenticated>
                  <Button asChild size="lg">
                    <Link href="/signup">Get started</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/login">Sign in</Link>
                  </Button>
                </Unauthenticated>
              </div>

              <dl className="grid w-full gap-6 text-sm text-muted-foreground sm:grid-cols-2">
                <FeatureStat label="Authentication" value="Better Auth 0.8" />
                <FeatureStat label="Database" value="Convex real-time" />
                <FeatureStat label="Frontend" value="Next.js 15 + React 19" />
                <FeatureStat label="Styling" value="Tailwind 4 + Shadcn UI" />
              </dl>
            </div>

            <aside className="space-y-6">
              <section className="rounded-3xl border bg-white p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="font-semibold text-lg text-slate-900">Authentication status</h2>
                    <p className="text-sm text-muted-foreground">
                      Keep track of the current session for this starter project.
                    </p>
                  </div>

                  <div className="rounded-xl border bg-slate-50 p-4">
                    <AuthLoading>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-slate-400" />
                        Checking authentication…
                      </div>
                    </AuthLoading>

                    <Authenticated>
                      <AuthenticatedContent />
                    </Authenticated>

                    <Unauthenticated>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 font-medium text-slate-700">
                          <span className="h-2 w-2 rounded-full bg-slate-300" /> Signed out
                        </div>
                        <p className="text-muted-foreground">
                          Create an account or sign in to explore the authenticated features.
                        </p>
                      </div>
                    </Unauthenticated>
                  </div>

                  <div className="space-y-3 text-sm">
                    <h3 className="font-medium text-slate-900">What&apos;s inside</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" /> Convex queries and mutations ready to use
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" /> Prewired Better Auth configuration
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" /> Shadcn components styled with Tailwind 4
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </aside>
          </section>
        </div>
      </main>

      <footer className="border-t bg-white/80">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 py-8 text-center text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>Built with Next.js 15, Convex, Better Auth 0.8, and Shadcn UI.</p>
          <p>Fully typed, production-ready foundations included.</p>
        </div>
      </footer>
    </div>
  );
}

function AuthenticatedHeader({ onLogout }: { onLogout: () => void }) {
  const user = useQuery(api.auth.getCurrentUser);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3 rounded-full bg-slate-100 px-3 py-1">
        <div className="text-right text-sm">
          <p className="font-medium text-slate-900">{user?.email || "Loading…"}</p>
          <p className="text-xs text-muted-foreground">Signed in</p>
        </div>
        {user?.email && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-medium text-white">
            {user.email.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <Button onClick={onLogout} size="sm" variant="outline">
        Sign out
      </Button>
    </div>
  );
}

function AuthenticatedContent() {
  const user = useQuery(api.auth.getCurrentUser);

  return (
    <div className="space-y-4 text-sm">
      <div className="flex items-center gap-2 font-medium text-emerald-600">
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> You&apos;re authenticated
      </div>
      {user && (
        <div className="space-y-2 rounded-lg bg-white p-3 shadow-sm">
          <DetailRow label="Email" value={user.email} />
          <DetailRow label="User ID" value={user._id} isCode />
          {user.emailVerified && <DetailRow label="Email verified" value="Yes" />}
          {user.createdAt && (
            <DetailRow label="Member since" value={new Date(user.createdAt).toLocaleDateString()} />
          )}
        </div>
      )}
    </div>
  );
}

function FeatureStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-white px-4 py-3 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 font-medium text-slate-900">{value}</p>
    </div>
  );
}

function DetailRow({
  label,
  value,
  isCode,
}: {
  label: string;
  value: string;
  isCode?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</span>
      {isCode ? (
        <code className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">{value}</code>
      ) : (
        <span className="text-slate-900">{value}</span>
      )}
    </div>
  );
}
