import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { tokenStorage } from './services/cookie.service';

export async function  proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminSession = await tokenStorage.get()

  if (pathname === '/' && adminSession) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (pathname.startsWith('/dashboard') && !adminSession) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
};
