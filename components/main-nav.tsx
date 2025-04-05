import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { GitHubIcon } from "./github-icon"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary">
        <GitHubIcon className="h-6 w-6" />
        <span>ERP Hub</span>
      </Link>
      <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Dashboard
      </Link>
      <Link
        href="/inventario"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Inventario
      </Link>
      <Link
        href="/empleados"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Empleados
      </Link>
      <Link href="/finanzas" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Finanzas
      </Link>
      <Link
        href="/proyectos"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Proyectos
      </Link>
    </nav>
  )
}

