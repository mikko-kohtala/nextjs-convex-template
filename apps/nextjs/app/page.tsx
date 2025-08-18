import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">Acme Template</h1>
        <p className="text-muted-foreground">Next.js 15 + Convex + Better Auth + Shadcn UI</p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <a href="/api/auth/signin">Sign In</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/api/auth/signup">Sign Up</a>
          </Button>
        </div>
      </div>
    </div>
  )
}