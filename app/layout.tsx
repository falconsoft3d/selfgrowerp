import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AppProvider } from "@/contexts/app-context"
import { Toaster } from "@/components/ui/toaster"
import AuthLayoutClient from "./auth-layout-client"

// Cambiar el título y la descripción en los metadatos
export const metadata = {
  title: "SelfGrowerERP - Enterprise Resource Planning System",
  description: "Enterprise Resource Planning System with GitHub-style interface",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AppProvider>
            <AuthLayout>{children}</AuthLayout>
            <Toaster />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  // Este componente es un cliente, pero no podemos usar 'use client' en el archivo de layout
  // Así que creamos un componente separado para manejar la lógica del cliente
  return <AuthLayoutClient>{children}</AuthLayoutClient>
}



import './globals.css'