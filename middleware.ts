import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/platform",
  "/contest",
  "/profile",
  "/search",
  "/practice",
];
export function middleware(req: NextRequest) {
  const token = req.cookies.get("_access_token")?.value;
  const pathname = req.nextUrl.pathname;
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  } else {
    if ((token && pathname === "/") || pathname === "/home") {
      return NextResponse.redirect(new URL("/practice", req.url));
    }
  }
  return NextResponse.next();
}
