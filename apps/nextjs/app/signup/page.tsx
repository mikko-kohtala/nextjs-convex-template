"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type InputHTMLAttributes } from "react";

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-lg space-y-8 rounded-3xl border bg-white p-10 shadow-sm">
        <div className="space-y-2 text-center">
          <span className="inline-flex items-center justify-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            Get started in minutes
          </span>
          <h1 className="font-semibold text-2xl text-slate-900">Create your account</h1>
          <p className="text-sm text-muted-foreground">
            Already have access?{" "}
            <Link className="font-medium text-slate-900 underline-offset-4 hover:underline" href="/login">
              Sign in instead
            </Link>
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Field
              autoComplete="name"
              id="name"
              label="Full name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Ada Lovelace"
              required
              type="text"
              value={name}
            />

            <Field
              autoComplete="email"
              id="email"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              type="email"
              value={email}
            />

            <Field
              autoComplete="new-password"
              helperText="Use at least 8 characters with a mix of letters and numbers."
              id="password"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              type="password"
              value={password}
            />

            <Field
              autoComplete="new-password"
              id="confirm-password"
              label="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              type="password"
              value={confirmPassword}
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <Button className="w-full" disabled={loading} size="lg" type="submit">
            {loading ? "Creating account…" : "Sign up"}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          We&apos;ll never share your email. You can update account details anytime.
        </p>
      </div>
    </div>
  );
}

type FieldProps = {
  id: string;
  label: string;
  helperText?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function Field({ id, label, helperText, ...props }: FieldProps) {
  return (
    <label className="space-y-2 text-sm font-medium text-slate-700" htmlFor={id}>
      <span>{label}</span>
      <input
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-base text-slate-900 shadow-sm transition focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
        id={id}
        {...props}
      />
      {helperText && <p className="text-xs font-normal text-muted-foreground">{helperText}</p>}
    </label>
  );
}
