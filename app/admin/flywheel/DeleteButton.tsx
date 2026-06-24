"use client";

import { deleteContribution } from "./actions";

// Small client wrapper so we can confirm before firing the (server-side) delete.
export function DeleteButton({ id }: { id: string }) {
  return (
    <form
      action={deleteContribution}
      onSubmit={(e) => {
        if (
          !confirm(
            "Delete this contribution and its frames from Supabase? This can't be undone — download the zip first."
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
      >
        Delete
      </button>
    </form>
  );
}
