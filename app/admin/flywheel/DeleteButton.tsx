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
        style={{
          background: "transparent",
          color: "#f87171",
          border: "1px solid #f87171",
          padding: "6px 12px",
          borderRadius: 6,
          fontWeight: 600,
          fontSize: 13,
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        Delete
      </button>
    </form>
  );
}
