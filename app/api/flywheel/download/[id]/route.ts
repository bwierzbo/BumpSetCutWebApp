import { NextRequest, NextResponse } from "next/server";
import { Zip, ZipPassThrough } from "fflate";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
// Streaming a contribution's frames (~170MB) can take a while; allow headroom.
// (Vercel Hobby caps this lower than Pro — drop frame count if you hit it.)
export const maxDuration = 300;

// GET /api/flywheel/download/{id} — zip of that contribution's frames.
// Gated by Basic Auth (see middleware.ts). Streams with fflate so memory stays
// bounded to ~one frame at a time.
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data: row, error } = await supabaseAdmin
    .from("flywheel_contributions")
    .select("frame_urls")
    .eq("id", id)
    .single();

  if (error || !row) {
    return NextResponse.json({ error: "contribution not found" }, { status: 404 });
  }
  const frameUrls: string[] = Array.isArray(row.frame_urls) ? row.frame_urls : [];
  if (frameUrls.length === 0) {
    return NextResponse.json({ error: "no frames for this contribution" }, { status: 404 });
  }

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const zip = new Zip((err, chunk, final) => {
        if (err) {
          controller.error(err);
          return;
        }
        controller.enqueue(chunk);
        if (final) controller.close();
      });

      (async () => {
        try {
          for (const path of frameUrls) {
            const { data, error: dlErr } = await supabaseAdmin.storage
              .from("training-data")
              .download(path);
            if (dlErr || !data) continue;
            // JPEGs are already compressed → pass through (no recompression).
            const file = new ZipPassThrough(path.split("/").pop() ?? path);
            zip.add(file);
            file.push(new Uint8Array(await data.arrayBuffer()), true);
          }
          zip.end();
        } catch (e) {
          controller.error(e);
        }
      })();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="flywheel-${id}.zip"`,
    },
  });
}
