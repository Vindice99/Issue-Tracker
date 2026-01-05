import { auth } from "@/auth"

//Next.js Middleware runs on the Edge by default so we need to specify Node.js runtime
export const runtime = 'nodejs'

export default auth((req) => {
  // Middleware logic here if needed
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}