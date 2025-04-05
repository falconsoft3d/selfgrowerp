"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

export function AutoLoginButton() {
  const router = useRouter()

  const handleAutoLogin = () => {
    // Establecer cookie de autenticación
    Cookies.set("auth", "true", { expires: 1 })
    // Redirigir al dashboard
    router.push("/")
  }

  return (
    <Button onClick={handleAutoLogin} variant="outline" className="w-full">
      Auto Login (Development Only)
    </Button>
  )
}

