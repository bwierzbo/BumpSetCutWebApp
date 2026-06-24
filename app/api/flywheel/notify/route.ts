import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// Called by the Supabase Database Webhook on INSERT into flywheel_contributions.
// Sends a heads-up email to admin@bumpsetcut.com linking to the dashboard.
// Protected by a shared secret header (Supabase webhooks can send custom headers).
export async function POST(req: NextRequest) {
  const secret = process.env.FLYWHEEL_WEBHOOK_SECRET;
  if (!secret || req.headers.get("x-flywheel-secret") !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: { record?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const rec = body.record;
  if (!rec) return NextResponse.json({ error: "no record" }, { status: 400 });

  const frameCount = Array.isArray(rec.frame_urls) ? rec.frame_urls.length : 0;
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bumpsetcut.com";

  const fromEmail = process.env.FLYWHEEL_FROM_EMAIL ?? "onboarding@resend.dev";
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: `BumpSetCut Flywheel <${fromEmail}>`,
    to: "admin@bumpsetcut.com",
    subject: `New training contribution — ${frameCount} frames`,
    html: `
      <h2>New flywheel contribution</h2>
      <ul>
        <li><b>Video:</b> ${rec.local_video_id ?? "?"}</li>
        <li><b>Frames:</b> ${frameCount}</li>
        <li><b>First flag:</b> rally ${rec.rally_index ?? "?"} — ${rec.trigger_type ?? "?"}${
          rec.user_reason ? ` (${rec.user_reason})` : ""
        }</li>
        <li><b>Flag count:</b> ${rec.flag_count ?? 1}</li>
        <li><b>When:</b> ${rec.created_at ?? ""}</li>
      </ul>
      <p><a href="${site}/admin/flywheel">Open the flywheel dashboard →</a></p>
    `,
  });

  if (error) {
    return NextResponse.json({ error: String(error) }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
