import { auth } from "@/auth"

//Next.js Middleware runs on the Edge by default so we need to specify Node.js runtime
export const runtime = 'nodejs'

export default auth((req) => {
  const { nextUrl } = req
  const isAuthenticated = !!req.auth

  // Protect issue detail routes
  if (nextUrl.pathname.startsWith('/issues/') && !isAuthenticated) {
    return Response.redirect(new URL('/api/auth/signin', nextUrl))
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)','/issues/:path*'],
}