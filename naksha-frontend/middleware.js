import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get("token")?.value;
    const path = request.nextUrl.pathname;

    // Public paths that should be accessible without redirection
    const publicPaths = ['/', '/login', '/signup', '/privacy', '/terms', '/contact'];
    const isPublicPath = publicPaths.includes(path);

    // Protected dashboard paths
    const isDashboardPath = path.startsWith('/dashboard');

    // Allow access to welcome page (root path '/') without redirection
    if (path === '/' && !token) {
        return NextResponse.next();
    }

    // Redirect authenticated users to dashboard if they try to access login/signup
    if (isPublicPath && token && path !== '/') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Redirect unauthenticated users to login if they try to access protected routes
    if (isDashboardPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/dashboard/:path*',
        '/privacy',
        '/terms',
        '/contact'
    ]
}; 