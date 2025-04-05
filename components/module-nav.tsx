"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useApp } from "@/contexts/app-context"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

// Definir la interfaz para los elementos de menú con soporte para submenús
export interface MenuItem {
  titleKey: string
  href: string
  children?: MenuItem[]
}

interface ModuleNavProps {
  items: MenuItem[]
  moduleKey: string
}

export function ModuleNav({ items, moduleKey }: ModuleNavProps) {
  const pathname = usePathname()
  const { t, currentCompany } = useApp()

  return (
    <div className="border-b">
      <div className="px-6 py-2 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{t(moduleKey)}</h2>
        <div className="text-sm text-muted-foreground">{currentCompany.name}</div>
      </div>
      <nav className="flex px-6 overflow-x-auto">
        {items.map((item) => (
          <NavItem key={item.href} item={item} pathname={pathname} t={t} />
        ))}
      </nav>
    </div>
  )
}

// Componente para cada elemento de navegación
function NavItem({ item, pathname, t }: { item: MenuItem; pathname: string; t: (key: string) => string }) {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

  // Si tiene hijos, renderizar como un menú desplegable
  if (hasChildren) {
    return (
      <div className="relative group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex h-10 items-center border-b-2 border-transparent px-4 text-sm font-medium transition-colors hover:border-primary hover:text-foreground",
            isActive && "border-primary text-foreground",
          )}
        >
          {t(item.titleKey)}
          {isOpen ? <ChevronDown className="ml-1 h-4 w-4" /> : <ChevronRight className="ml-1 h-4 w-4" />}
        </button>
        {isOpen && (
          <div className="absolute left-0 top-10 z-10 w-48 bg-background border rounded-md shadow-md py-1">
            {item.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "block px-4 py-2 text-sm hover:bg-muted",
                  pathname === child.href && "bg-muted font-medium",
                )}
              >
                {t(child.titleKey)}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Si no tiene hijos, renderizar como un enlace normal
  return (
    <Link
      href={item.href}
      className={cn(
        "flex h-10 items-center border-b-2 border-transparent px-4 text-sm font-medium transition-colors hover:border-primary hover:text-foreground",
        pathname === item.href && "border-primary text-foreground",
      )}
    >
      {t(item.titleKey)}
    </Link>
  )
}

