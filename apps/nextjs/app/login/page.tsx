"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-md space-y-8 rounded-3xl border bg-white p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <span className="inline-flex items-center justify-center rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600 text-xs">
            Welcome back
          </span>
          <h1 className="font-semibold text-2xl text-slate-900">Sign in to your account</h1>
          <p className="text-muted-foreground text-sm">
            New here?{" "}
            <Link className="font-medium text-slate-900 underline-offset-4 hover:underline" href="/signup">
              Create an account
            </Link>
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label className="space-y-2 font-medium text-slate-700 text-sm" htmlFor="email">
              <span>Email</span>
              <input
                autoComplete="email"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-base text-slate-900 shadow-sm transition focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                type="email"
                value={email}
              />
            </label>

            <label className="space-y-2 font-medium text-slate-700 text-sm" htmlFor="password">
              <span>Password</span>
              <input
                autoComplete="current-password"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-base text-slate-900 shadow-sm transition focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                type="password"
                value={password}
              />
            </label>
          </div>

          {error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-red-700 text-sm">{error}</div>
          )}

          <Button className="w-full" disabled={loading} size="lg" type="submit">
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-muted-foreground text-xs">
          By signing in you agree to our terms of use and privacy policy.
        </p>
      </div>
    </div>
  );
}
