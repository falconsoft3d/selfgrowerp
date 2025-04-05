import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Este middleware está temporalmente desactivado para permitir acceso sin login
export function middleware(request: NextRequest) {
  // Simplemente permite todas las solicitudes sin verificar autenticación
  return NextResponse.next()

  /* 
  // CÓDIGO ORIGINAL - COMENTADO TEMPORALMENTE
  // Obtener la cookie de autenticación (simulada)
  const isAuthenticated = request.cookies.has('auth')
  const url = request.nextUrl.clone()
  
  // Si el usuario no está autenticado y no está en la página de login, redirigir a login
  if (!isAuthenticated && url.pathname !== '/login') {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
  
  // Si el usuario está autenticado y está en la página de login, redirigir al dashboard
  if (isAuthenticated && url.pathname === '/login') {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }
  
  return NextResponse.next()
  */
}

// Configurar las rutas que deben ser protegidas (actualmente todas están permitidas)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

