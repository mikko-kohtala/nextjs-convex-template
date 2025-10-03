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
    <div className="container mx-auto flex min-h-screen flex-col">
      {/* Header with login status */}
      <header className="border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-2">
            <h2 className="font-semibold text-xl">Acme Template</h2>
            <span className="rounded-full bg-green-100 px-2 py-1 text-green-800 text-xs">Better Auth 0.8</span>
          </div>

          <div className="flex items-center gap-4">
            <AuthLoading>
              <div className="text-muted-foreground text-sm">Loading...</div>
            </AuthLoading>

            <Authenticated>
              <AuthenticatedHeader onLogout={handleLogout} />
            </Authenticated>

            <Unauthenticated>
              <span className="text-muted-foreground text-sm">Not signed in</span>
              <div className="flex gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            </Unauthenticated>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center">
        <div className="mx-auto max-w-2xl space-y-8 px-6 text-center">
          <div className="space-y-4">
            <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text font-bold text-5xl text-transparent">
              Welcome to Acme
            </h1>
            <p className="text-lg text-muted-foreground">
              Full-stack template with Next.js 15, Convex, Better Auth 0.8, and Shadcn UI
            </p>
          </div>

          {/* Status Card */}
          <div className="rounded-lg border bg-gray-50 p-6 dark:bg-gray-900">
            <h3 className="mb-4 font-semibold">Authentication Status</h3>

            <AuthLoading>
              <div className="animate-pulse">
                <div className="mx-auto h-4 w-32 rounded bg-gray-200" />
              </div>
            </AuthLoading>

            <Authenticated>
              <AuthenticatedContent />
            </Authenticated>

            <Unauthenticated>
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-gray-400" />
                  <span className="font-medium text-gray-600 dark:text-gray-400">Not Authenticated</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Sign in to access your account and personalized features
                </p>
              </div>
            </Unauthenticated>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h3 className="font-semibold text-muted-foreground text-sm">Quick Actions</h3>

            <Authenticated>
              <div className="flex justify-center gap-4">
                <Button asChild variant="outline">
                  <Link href="/profile">View Profile</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/settings">Settings</Link>
                </Button>
              </div>
            </Authenticated>

            <Unauthenticated>
              <div className="flex justify-center gap-4">
                <Button asChild>
                  <Link href="/login">Sign In to Continue</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/signup">Create New Account</Link>
                </Button>
              </div>
            </Unauthenticated>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t px-6 py-6">
        <div className="text-center text-muted-foreground text-sm">
          <p>Built with Next.js 15 + Convex + Better Auth 0.8 + Shadcn UI</p>
        </div>
      </footer>
    </div>
  );
}

function AuthenticatedHeader({ onLogout }: { onLogout: () => void }) {
  const user = useQuery(api.auth.getCurrentUser);

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-medium text-sm">Signed in as</p>
          <p className="text-muted-foreground text-sm">{user?.email || "Loading..."}</p>
        </div>
        {user?.email && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 font-medium text-sm text-white">
            {user.email.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <Button onClick={onLogout} size="sm" variant="outline">
        Sign Out
      </Button>
    </>
  );
}

function AuthenticatedContent() {
  const user = useQuery(api.auth.getCurrentUser);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-2">
        <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
        <span className="font-medium text-green-600 dark:text-green-400">Authenticated</span>
      </div>
      {user && (
        <div className="space-y-1 text-sm">
          <p>
            <span className="text-muted-foreground">User ID:</span>{" "}
            <code className="rounded bg-gray-200 px-1 py-0.5 text-xs dark:bg-gray-800">{user._id}</code>
          </p>
          <p>
            <span className="text-muted-foreground">Email:</span> <span className="font-medium">{user.email}</span>
          </p>
          {user.emailVerified && (
            <p>
              <span className="text-muted-foreground">Email Verified:</span>{" "}
              <span className="text-green-600">✓ Yes</span>
            </p>
          )}
          {user.createdAt && (
            <p>
              <span className="text-muted-foreground">Member Since:</span>{" "}
              <span className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
