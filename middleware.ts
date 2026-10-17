import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyJWT } from "@/lib/auth";

export const runtime = "experimental-edge";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";

  // Check for admin token in cookies
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const session = token ? verifyJWT(token) : null;
  const isAuthenticated = !!session;

  // 1. Protected Admin Routes (require valid JWT session)
  if (pathname.startsWith("/admin") && !isLoginPage) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Prevent already logged-in admin from staying on /admin/login
  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // 3. Security best practice: Append OWASP security headers
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
