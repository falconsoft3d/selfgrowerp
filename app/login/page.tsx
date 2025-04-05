import { LoginForm } from "@/components/login-form"
import { GitHubIcon } from "@/components/github-icon"
import { AutoLoginButton } from "@/components/auto-login-button"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 px-4 py-8 sm:px-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center space-x-2">
            <GitHubIcon className="h-8 w-8" />
            <span className="text-2xl font-bold">SelfGrowerERP</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
        </div>
        <LoginForm />

        {/* Solo para entorno de desarrollo */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-4">
            <AutoLoginButton />
          </div>
        )}

        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">Don&apos;t have an account? </span>
          <a href="#" className="font-medium text-primary hover:underline">
            Contact your administrator
          </a>
        </div>
      </div>
      <div className="absolute bottom-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} SelfGrowerERP. All rights reserved.</p>
      </div>
    </div>
  )
}

