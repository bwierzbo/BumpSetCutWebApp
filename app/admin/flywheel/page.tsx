import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { logout } from "../auth";
import { DeleteButton } from "./DeleteButton";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface FlagEvent {
  rally_index: number;
  trigger: string;
  reason: string | null;
  at: string;
}

interface Contribution {
  id: string;
  user_id: string;
  local_video_id: string | null;
  trigger_type: string;
  user_reason: string | null;
  frame_urls: string[] | null;
  flag_count: number;
  flag_events: FlagEvent[] | null;
  created_at: string;
}

function prettyReason(s: string) {
  return s.replace(/_/g, " ");
}

export default async function FlywheelDashboard() {
  const { data } = await supabaseAdmin
    .from("flywheel_contributions")
    .select(
      "id, user_id, local_video_id, trigger_type, user_reason, frame_urls, flag_count, flag_events, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(200);

  const rows = (data ?? []) as Contribution[];
  const totalFrames = rows.reduce(
    (n, r) => n + (Array.isArray(r.frame_urls) ? r.frame_urls.length : 0),
    0
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Flywheel Contributions
            </h1>
            <p className="mt-1 text-sm text-foreground-muted">
              {rows.length} contribution{rows.length === 1 ? "" : "s"} · {totalFrames} frames —
              download, drag into a Roboflow batch, then delete.
            </p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-foreground-muted transition hover:text-foreground"
            >
              Sign out
            </button>
          </form>
        </div>

        {/* Empty state */}
        {rows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center">
            <p className="text-foreground-muted">
              No contributions yet. Reported rallies will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background/60 text-left text-xs uppercase tracking-wide text-foreground-muted">
                  <th className="px-5 py-3 font-semibold">When</th>
                  <th className="px-5 py-3 font-semibold">Video</th>
                  <th className="px-5 py-3 font-semibold">Frames</th>
                  <th className="px-5 py-3 font-semibold">Flags</th>
                  <th className="px-5 py-3 font-semibold">Reasons</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((r) => {
                  const frames = Array.isArray(r.frame_urls) ? r.frame_urls.length : 0;
                  const events = r.flag_events ?? [];
                  return (
                    <tr key={r.id} className="align-top transition hover:bg-background/40">
                      <td className="whitespace-nowrap px-5 py-4 text-foreground">
                        {new Date(r.created_at).toLocaleDateString()}
                        <span className="block text-xs text-foreground-muted">
                          {new Date(r.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-foreground-muted">
                        {r.local_video_id?.slice(0, 8) ?? "—"}
                      </td>
                      <td className="px-5 py-4 font-semibold text-foreground">{frames}</td>
                      <td className="px-5 py-4 text-foreground">{r.flag_count}</td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {events.length === 0 ? (
                            <span className="text-foreground-muted">{prettyReason(r.trigger_type)}</span>
                          ) : (
                            events.map((e, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary-dark"
                              >
                                r{e.rally_index} · {prettyReason(e.reason ?? e.trigger)}
                              </span>
                            ))
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {frames > 0 ? (
                            <a
                              href={`/api/flywheel/download/${r.id}`}
                              className="rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                            >
                              Download
                            </a>
                          ) : (
                            <span className="text-xs text-foreground-muted">no frames</span>
                          )}
                          <DeleteButton id={r.id} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
