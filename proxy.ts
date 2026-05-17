import { NextRequest, NextResponse } from 'next/server';

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

  const isAuthenticated = Boolean(accessToken || refreshToken);

  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
