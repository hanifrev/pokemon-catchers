import { NextResponse } from "next/server";

export default function middleware(req: any) {
  const authenticated = req.cookies.get("accessToken");
  const { pathname, origin } = req.nextUrl;

  if (!authenticated && pathname === "/dashboard") {
    return NextResponse.redirect(`${origin}/login`);
  }

  if (
    (authenticated && pathname === "/login") ||
    (authenticated && pathname === "/signup")
  ) {
    return NextResponse.redirect(`${origin}/dashboard`);
  }
}
