import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get("token")?.value;
    const path = request.nextUrl.pathname;

    // Public paths
    const publicPaths = ['/', '/login', '/signup'];
    const isPublicPath = publicPaths.includes(path);

    // Protected dashboard paths
    const isDashboardPath = path.startsWith('/dashboard');

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

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
        '/dashboard/:path*'
    ]
}; 