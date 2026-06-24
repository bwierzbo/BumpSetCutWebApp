import { NextRequest, NextResponse } from "next/server";

// Cookie-session gate for the flywheel admin dashboard and the zip-download
// route. Unauthenticated requests are redirected to the login page. (The webhook
// route /api/flywheel/notify is intentionally NOT matched — it's protected by a
// shared secret header, since Supabase calls it.)
export function middleware(req: NextRequest) {
  const token = process.env.ADMIN_SESSION_TOKEN;
  const session = req.cookies.get("admin_session")?.value;

  if (!token || session !== token) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/flywheel", "/admin/flywheel/:path*", "/api/flywheel/download/:path*"],
};
