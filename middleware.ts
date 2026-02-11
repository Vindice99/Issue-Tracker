import { auth } from "@/auth"

//Next.js Middleware runs on the Edge by default so we need to specify Node.js runtime
export const runtime = 'nodejs'

export default auth((req) => {
  const { nextUrl } = req
  const isAuthenticated = !!req.auth

  // Protect dashboard, new issue, and edit routes
  if (
    (nextUrl.pathname.startsWith('/dashboard') ||
     nextUrl.pathname.startsWith('/issues/new') ||
     nextUrl.pathname.includes('/edit')) &&
    !isAuthenticated
  ) {
    return Response.redirect(new URL('/api/auth/signin', nextUrl))
  }
})

export const config = {
  matcher: ['/dashboard', '/issues/new', '/issues/:id/edit'],
}