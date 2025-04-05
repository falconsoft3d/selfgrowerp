"use client"

import type React from "react"

import { SidebarNav } from "@/components/sidebar-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { usePathname } from "next/navigation"

export default function AuthLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"

  if (isLoginPage) {
    return children
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar izquierdo */}
      <aside className="sticky top-0 z-30 hidden h-screen w-64 shrink-0 border-r md:block">
        <SidebarNav />
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Barra superior con búsqueda y perfil */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">SelfGrowerERP</h1>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Search />
            <UserNav />
          </div>
        </header>

        {/* Contenido de la página */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

