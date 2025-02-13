import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes
  if (req.nextUrl.pathname.startsWith('/account') || 
      req.nextUrl.pathname.startsWith('/checkout')) {
    if (!session) {
      const redirectUrl = new URL('/auth/signin', req.url)
      redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Auth routes - redirect to home if already logged in
  if (req.nextUrl.pathname.startsWith('/auth/')) {
    if (session) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/account/:path*', '/checkout/:path*', '/auth/:path*']
} 