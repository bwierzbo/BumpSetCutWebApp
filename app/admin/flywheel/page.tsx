import { supabaseAdmin } from "@/lib/supabaseAdmin";

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

export default async function FlywheelDashboard() {
  const { data, error } = await supabaseAdmin
    .from("flywheel_contributions")
    .select(
      "id, user_id, local_video_id, trigger_type, user_reason, frame_urls, flag_count, flag_events, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(200);

  const rows = (data ?? []) as Contribution[];

  const cell: React.CSSProperties = {
    padding: "8px 12px",
    borderBottom: "1px solid #222",
    verticalAlign: "top",
    fontSize: 13,
  };
  const th: React.CSSProperties = { ...cell, textAlign: "left", color: "#9aa", fontWeight: 600 };

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 24, color: "#e8eaed" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Flywheel Contributions</h1>
      <p style={{ color: "#9aa", marginBottom: 20 }}>
        {rows.length} contribution{rows.length === 1 ? "" : "s"} — download the frames, then drag the
        zip into a Roboflow batch.
      </p>

      {error && <p style={{ color: "#f88" }}>Error loading: {error.message}</p>}

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={th}>When</th>
            <th style={th}>Video</th>
            <th style={th}>Frames</th>
            <th style={th}>Flags</th>
            <th style={th}>Reasons</th>
            <th style={th}></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const frames = Array.isArray(r.frame_urls) ? r.frame_urls.length : 0;
            const reasons = (r.flag_events ?? [])
              .map((e) => `r${e.rally_index}:${e.reason ?? e.trigger}`)
              .join(", ");
            return (
              <tr key={r.id}>
                <td style={cell}>{new Date(r.created_at).toLocaleString()}</td>
                <td style={{ ...cell, fontFamily: "monospace", fontSize: 11 }}>
                  {r.local_video_id?.slice(0, 8) ?? "—"}
                </td>
                <td style={cell}>{frames}</td>
                <td style={cell}>{r.flag_count}</td>
                <td style={{ ...cell, color: "#9aa" }}>{reasons || r.trigger_type}</td>
                <td style={cell}>
                  {frames > 0 ? (
                    <a
                      href={`/api/flywheel/download/${r.id}`}
                      style={{
                        background: "#3b82f6",
                        color: "#fff",
                        padding: "6px 12px",
                        borderRadius: 6,
                        textDecoration: "none",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Download zip
                    </a>
                  ) : (
                    <span style={{ color: "#666" }}>no frames</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
