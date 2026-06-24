"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { revalidatePath } from "next/cache";

// Delete a contribution: remove its frames from the private bucket, then the
// row. Called from the admin dashboard after the zip has been downloaded.
// Runs server-side with the service-role key; the route is Basic-auth gated.
export async function deleteContribution(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { data: row } = await supabaseAdmin
    .from("flywheel_contributions")
    .select("frame_urls")
    .eq("id", id)
    .single();

  const frameUrls: string[] = Array.isArray(row?.frame_urls) ? row.frame_urls : [];
  if (frameUrls.length > 0) {
    await supabaseAdmin.storage.from("training-data").remove(frameUrls);
  }

  await supabaseAdmin.from("flywheel_contributions").delete().eq("id", id);
  revalidatePath("/admin/flywheel");
}
