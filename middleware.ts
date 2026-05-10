import { NextRequest, NextResponse } from 'next/server'

const SESSION_COOKIE = 'kosku_session'

function isAuthenticated(request: NextRequest) {
  return request.cookies.get(SESSION_COOKIE)?.value === 'authenticated'
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const authenticated = isAuthenticated(request)

  if (pathname.startsWith('/dashboard/manage') && !authenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', `${pathname}${search}`)
    return NextResponse.redirect(loginUrl)
  }

  if (pathname === '/login' && authenticated) {
    return NextResponse.redirect(new URL('/dashboard/manage', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/manage/:path*', '/login'],
}
