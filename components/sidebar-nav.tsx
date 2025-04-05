"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { GitHubIcon } from "./github-icon"
import { Box, DollarSign, LayoutDashboard, Users } from "lucide-react"
import { CompanySwitcher } from "./company-switcher"
import { LanguageSwitcher } from "./language-switcher"
import { useApp } from "@/contexts/app-context"
import { Separator } from "@/components/ui/separator"
import { BarChart3, Settings } from "lucide-react"

export function SidebarNav() {
  const { t } = useApp()

  const navItems = [
    {
      title: t("dashboard"),
      href: "/",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: t("inventory"),
      href: "/inventory",
      icon: <Box className="h-5 w-5" />,
    },
    {
      title: t("employees"),
      href: "/employees",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: t("finances"),
      href: "/finances",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      title: t("projects"),
      href: "/projects",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: t("settings"),
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="flex h-full flex-col gap-2 p-4 border-r">
      <div className="flex h-14 items-center border-b px-4 pb-4">
        <GitHubIcon className="mr-2 h-6 w-6" />
        <span className="text-lg font-semibold">SelfGrowerERP</span>
      </div>

      {/* Company and language selectors */}
      <div className="space-y-2 py-4">
        <CompanySwitcher />
        <LanguageSwitcher />
      </div>

      <Separator className="my-2" />

      <nav className="grid gap-1 px-2 pt-2">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              "transition-colors",
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <div className="rounded-md bg-muted p-4">
          <h3 className="mb-2 text-sm font-medium">{t("help")}</h3>
          <p className="text-xs text-muted-foreground">Check our documentation or contact support.</p>
          <Link href="#" className="mt-2 block text-xs text-primary hover:underline">
            {t("documentation")}
          </Link>
        </div>
      </div>
    </div>
  )
}

