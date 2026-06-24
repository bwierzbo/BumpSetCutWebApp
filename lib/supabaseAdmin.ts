import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client using the service-role key. Bypasses RLS, so it
// can read the private `training-data` bucket and every flywheel row. NEVER
// import this into client components — the key must stay server-side.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});
