"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = useMemo(
    () =>
      "mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none transition focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-primary/20",
    [],
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 dark:bg-background">
      <div className="w-full max-w-sm">
        <div className="space-y-2 text-center">
          <h1 className="font-semibold text-3xl tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground text-sm">
            Sign in to continue building with the Acme starter kit.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="font-medium text-foreground text-sm" htmlFor="email">
                  Email
                </label>
                <input
                  autoComplete="email"
                  className={inputStyles}
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  type="email"
                  value={email}
                />
              </div>
              <div>
                <label className="font-medium text-foreground text-sm" htmlFor="password">
                  Password
                </label>
                <input
                  autoComplete="current-password"
                  className={inputStyles}
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  type="password"
                  value={password}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-red-600 text-sm">
                {error}
              </div>
            )}

            <Button className="w-full" disabled={loading} type="submit">
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-muted-foreground text-sm">
            New here?{" "}
            <Button asChild className="px-0 text-sm" variant="link">
              <Link href="/signup">Create an account</Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
