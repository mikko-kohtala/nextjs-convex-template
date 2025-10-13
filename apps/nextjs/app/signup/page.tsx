"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const MIN_PASSWORD_LENGTH = 8;

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long`);
      return;
    }

    setLoading(true);

    try {
      await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign up");
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
      <div className="w-full max-w-lg">
        <div className="space-y-2 text-center">
          <h1 className="font-semibold text-3xl tracking-tight">Create your account</h1>
          <p className="text-muted-foreground text-sm">
            Start from a clean, production-ready template with auth included.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="font-medium text-foreground text-sm" htmlFor="name">
                  Full name
                </label>
                <input
                  autoComplete="name"
                  className={inputStyles}
                  id="name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  required
                  type="text"
                  value={name}
                />
              </div>
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
                  autoComplete="new-password"
                  className={inputStyles}
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                  type="password"
                  value={password}
                />
              </div>
              <div>
                <label className="font-medium text-foreground text-sm" htmlFor="confirm-password">
                  Confirm password
                </label>
                <input
                  autoComplete="new-password"
                  className={inputStyles}
                  id="confirm-password"
                  name="confirm-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  required
                  type="password"
                  value={confirmPassword}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-red-600 text-sm">
                {error}
              </div>
            )}

            <Button className="w-full" disabled={loading} type="submit">
              {loading ? "Creating account…" : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-muted-foreground text-sm">
            Already have an account?{" "}
            <Button asChild className="px-0 text-sm" variant="link">
              <Link href="/login">Sign in</Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
