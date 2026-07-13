import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "@/lib/auth-jwt";

export async function middleware(req: NextRequest) {
  const isLoginPage = req.nextUrl.pathname.startsWith("/admin/login");
  const isAdminPath = req.nextUrl.pathname.startsWith("/admin");

  if (isAdminPath && !isLoginPage) {
    const token = req.cookies.get("admin_session")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    const payload = await verifyJWT(token);
    if (!payload) {
      // Token exists but is invalid/expired
      const response = NextResponse.redirect(new URL("/admin/login", req.url));
      response.cookies.delete("admin_session");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
