import { NextRequest, NextResponse } from "next/server";
import { Zip, ZipPassThrough } from "fflate";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { contributionFiles } from "@/lib/flywheel";

export const runtime = "nodejs";
// Streaming a contribution's frames or clips (~170MB+) can take a while; allow headroom.
// (Vercel Hobby caps this lower than Pro — drop frame count if you hit it.)
export const maxDuration = 300;

// GET /api/flywheel/download/{id} — zip of that contribution's frames and clips.
// Gated by Basic Auth (see middleware.ts). Streams with fflate so memory stays
// bounded to ~one frame at a time.
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data: row, error } = await supabaseAdmin
    .from("flywheel_contributions")
    .select("frame_urls, clip_urls")
    .eq("id", id)
    .single();

  if (error || !row) {
    return NextResponse.json({ error: "contribution not found" }, { status: 404 });
  }
  const files = contributionFiles(row);
  if (files.length === 0) {
    return NextResponse.json({ error: "no files for this contribution" }, { status: 404 });
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
          for (const path of files) {
            const { data, error: dlErr } = await supabaseAdmin.storage
              .from("training-data")
              .download(path);
            if (dlErr || !data) continue;
            // JPEGs and clips are already compressed → pass through (no recompression).
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
