import { login } from "../auth";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        action={login}
        className="w-full max-w-sm rounded-2xl border border-border bg-white p-8 shadow-sm"
      >
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-foreground">BumpSetCut Admin</h1>
          <p className="mt-1 text-sm text-foreground-muted">Flywheel dashboard</p>
        </div>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-600">
            Incorrect username or password.
          </p>
        )}

        <div className="space-y-3">
          <input
            name="username"
            placeholder="Username"
            autoComplete="username"
            autoFocus
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground outline-none focus:border-primary"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground outline-none focus:border-primary"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-primary py-2.5 font-semibold text-white transition hover:bg-primary-dark"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
