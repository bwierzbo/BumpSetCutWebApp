import { NextRequest, NextResponse } from "next/server";

// Basic-auth gate for the flywheel admin dashboard and the zip-download route.
// (The webhook route /api/flywheel/notify is intentionally NOT matched — it's
// protected by a shared secret header instead, since Supabase calls it.)
function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="BumpSetCut Admin"' },
  });
}

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;
  // If creds aren't configured, fail closed rather than exposing the dashboard.
  if (!user || !pass) return unauthorized();

  const header = req.headers.get("authorization") ?? "";
  if (!header.startsWith("Basic ")) return unauthorized();

  const [u, p] = atob(header.slice(6)).split(":");
  if (u !== user || p !== pass) return unauthorized();

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/flywheel/download/:path*"],
};
