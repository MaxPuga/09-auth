import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { checkSession } from '@/lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const pathname = request.nextUrl.pathname;

  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  let isAuthenticated = !!accessToken;

  // якщо accessToken немає, але є refreshToken
  if (!accessToken && refreshToken) {
    try {
      const session = await checkSession();

      if (session.data.success) {
        isAuthenticated = true;

        const response = NextResponse.next();

        if (session.data.accessToken) {
          response.cookies.set('accessToken', session.data.accessToken);
        }

        if (session.data.refreshToken) {
          response.cookies.set('refreshToken', session.data.refreshToken);
        }

        return response;
      }
    } catch {
      isAuthenticated = false;
    }
  }

  // private routes
  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // public routes
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
