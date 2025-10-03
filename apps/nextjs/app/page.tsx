"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { api } from "@acme/database/convex/_generated/api";
import { useQuery } from "convex/react";

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
    <div className="container mx-auto min-h-screen flex flex-col">
      {/* Header with login status */}
      <header className="border-b">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold">Acme Template</h2>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
              Better Auth 0.8
            </span>
          </div>

          <div className="flex items-center gap-4">
            <AuthLoading>
              <div className="text-sm text-muted-foreground">Loading...</div>
            </AuthLoading>

            <Authenticated>
              <AuthenticatedHeader onLogout={handleLogout} />
            </Authenticated>

            <Unauthenticated>
              <>
                <span className="text-sm text-muted-foreground">Not signed in</span>
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              </>
            </Unauthenticated>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-2xl mx-auto px-6">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to Acme
            </h1>
            <p className="text-lg text-muted-foreground">
              Full-stack template with Next.js 15, Convex, Better Auth 0.8, and Shadcn UI
            </p>
          </div>

          {/* Status Card */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border">
            <h3 className="font-semibold mb-4">Authentication Status</h3>

            <AuthLoading>
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
              </div>
            </AuthLoading>

            <Authenticated>
              <AuthenticatedContent />
            </Authenticated>

            <Unauthenticated>
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Not Authenticated
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Sign in to access your account and personalized features
                </p>
              </div>
            </Unauthenticated>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">Quick Actions</h3>

            <Authenticated>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" asChild>
                  <Link href="/profile">View Profile</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/settings">Settings</Link>
                </Button>
              </div>
            </Authenticated>

            <Unauthenticated>
              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <Link href="/login">Sign In to Continue</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/signup">Create New Account</Link>
                </Button>
              </div>
            </Unauthenticated>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 px-6">
        <div className="text-center text-sm text-muted-foreground">
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
          <p className="text-sm font-medium">Signed in as</p>
          <p className="text-sm text-muted-foreground">{user?.email || "Loading..."}</p>
        </div>
        {user?.email && (
          <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium">
            {user.email.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <Button onClick={onLogout} variant="outline" size="sm">
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
        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-green-600 dark:text-green-400 font-medium">
          Authenticated
        </span>
      </div>
      {user && (
        <div className="text-sm space-y-1">
          <p>
            <span className="text-muted-foreground">User ID:</span>{" "}
            <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-xs">
              {user._id}
            </code>
          </p>
          <p>
            <span className="text-muted-foreground">Email:</span>{" "}
            <span className="font-medium">{user.email}</span>
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
              <span className="font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}