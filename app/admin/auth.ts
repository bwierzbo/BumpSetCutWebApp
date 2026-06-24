"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Cookie-based admin auth. Credentials live in env (ADMIN_USER / ADMIN_PASSWORD);
// a successful login sets an httpOnly session cookie that the middleware checks.
export async function login(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD) {
    const store = await cookies();
    store.set("admin_session", process.env.ADMIN_SESSION_TOKEN ?? "", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    redirect("/admin/flywheel");
  }
  redirect("/admin/login?error=1");
}

export async function logout() {
  const store = await cookies();
  store.delete("admin_session");
  redirect("/admin/login");
}
