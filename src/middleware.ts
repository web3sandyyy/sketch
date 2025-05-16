import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authorized = request.cookies.get("authorized");

  if (request.nextUrl.pathname === "/admin") {
    if (authorized && authorized.value === "true") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
    if (!authorized || authorized.value !== "true") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/dashboard"],
};
