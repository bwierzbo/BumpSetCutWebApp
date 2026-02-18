# BumpSetCut Moderation Dashboard

Internal admin tool for reviewing user reports, managing blocks, and taking moderation actions. Hosted as a hidden route at `bumpsetcut.com/admin/moderation` — not linked from any public page.

## Overview

The dashboard connects directly to your Supabase project and provides a UI for:

1. **Report Queue** — Review pending content reports from users
2. **User Management** — View user blocks, issue warnings, suspend/ban accounts
3. **Action Log** — Track all moderation actions taken

## Database Schema (Already Deployed)

The following tables power the dashboard (from `002_content_moderation.sql`):

### `content_reports`
| Column | Type | Description |
|--------|------|-------------|
| `id` | text (PK) | UUID |
| `reporter_id` | text (FK → profiles) | Who filed the report |
| `reported_type` | text | `highlight`, `comment`, or `user_profile` |
| `reported_id` | text | ID of reported content |
| `reported_user_id` | text (FK → profiles) | User being reported |
| `report_type` | report_type enum | `spam`, `harassment`, `inappropriate_content`, `impersonation`, `violence`, `hate_speech`, `self_harm`, `other` |
| `description` | text | Optional details from reporter |
| `status` | report_status enum | `pending`, `reviewed`, `action_taken`, `dismissed` |
| `reviewed_at` | timestamptz | When moderator reviewed |
| `reviewed_by` | text (FK → profiles) | Moderator who reviewed |
| `moderator_notes` | text | Internal notes |
| `created_at` | timestamptz | Report timestamp |

### `user_blocks`
| Column | Type | Description |
|--------|------|-------------|
| `id` | text (PK) | UUID |
| `blocker_id` | text (FK → profiles) | User who blocked |
| `blocked_id` | text (FK → profiles) | User who was blocked |
| `reason` | text | Optional reason |
| `created_at` | timestamptz | Block timestamp |

### `moderation_actions`
| Column | Type | Description |
|--------|------|-------------|
| `id` | text (PK) | UUID |
| `moderator_id` | text (FK → profiles) | Admin who took action |
| `target_user_id` | text (FK → profiles) | User receiving action |
| `action_type` | text | `warning`, `content_removed`, `account_suspended`, `account_banned` |
| `reason` | text | Why the action was taken |
| `content_id` | text | Optional link to specific content |
| `report_id` | text (FK → content_reports) | Link to original report |
| `expires_at` | timestamptz | For temporary suspensions |
| `created_at` | timestamptz | Action timestamp |

## RLS Policy Update Required

Before the dashboard works, add moderator RLS policies to Supabase. Run this migration:

```sql
-- Add is_moderator column to profiles (if not already present)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_moderator BOOLEAN NOT NULL DEFAULT false;

-- Mark yourself as moderator
UPDATE profiles SET is_moderator = true WHERE id = '<YOUR_USER_ID>';

-- Moderators can view all reports
CREATE POLICY "Moderators can view all reports"
    ON content_reports FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()::text
            AND profiles.is_moderator = true
        )
    );

-- Moderators can update reports (change status, add notes)
CREATE POLICY "Moderators can update reports"
    ON content_reports FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()::text
            AND profiles.is_moderator = true
        )
    );

-- Moderators can view all blocks
CREATE POLICY "Moderators can view all blocks"
    ON user_blocks FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()::text
            AND profiles.is_moderator = true
        )
    );

-- Moderators can create moderation actions
CREATE POLICY "Moderators can create actions"
    ON moderation_actions FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()::text
            AND profiles.is_moderator = true
        )
    );

-- Moderators can view all moderation actions
CREATE POLICY "Moderators can view all actions"
    ON moderation_actions FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()::text
            AND profiles.is_moderator = true
        )
    );
```

## How to Build the Dashboard Page

### 1. Install Supabase Client

```bash
cd /path/to/Bumpsetcutwebapp
npm install @supabase/supabase-js
```

### 2. Create Supabase Client Utility

**File:** `lib/supabase.ts`

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 3. Add Environment Variables

**File:** `.env.local` (gitignored)

```
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

### 4. Create the Dashboard Page

**File:** `app/admin/moderation/page.tsx`

This is a `"use client"` page with three tabs:

#### Tab 1: Report Queue
- Fetches `content_reports` where `status = 'pending'`, ordered by `created_at DESC`
- Shows: report type badge, reported content type, reporter username, description, timestamp
- Actions per report:
  - **Dismiss** → sets `status = 'dismissed'`, `reviewed_at = now()`, `reviewed_by = <you>`
  - **Take Action** → opens action form (warning, remove content, suspend, ban), then sets `status = 'action_taken'` and inserts into `moderation_actions`
  - **Add Notes** → updates `moderator_notes`
- Filters: by status (pending/reviewed/action_taken/dismissed), by report type, date range

#### Tab 2: Users
- Search users by username or ID
- Per-user view shows:
  - Profile info (username, bio, created_at)
  - Their reports (reports filed against them)
  - Blocks (who blocked them / who they blocked)
  - Moderation history (past actions taken)
  - Quick actions: warn, suspend (with duration picker), ban

#### Tab 3: Action Log
- Full history of `moderation_actions`, newest first
- Shows: moderator, target user, action type, reason, timestamp
- Filter by action type and date range

### 5. Authentication Gate

The page must verify the logged-in user is a moderator before rendering:

```typescript
// In the dashboard component
const { data: { user } } = await supabase.auth.getUser();
if (!user) redirect("/"); // Not logged in

const { data: profile } = await supabase
  .from("profiles")
  .select("is_moderator")
  .eq("id", user.id)
  .single();

if (!profile?.is_moderator) redirect("/"); // Not a moderator
```

### 6. Key Supabase Queries

```typescript
// Fetch pending reports with reporter and reported user info
const { data: reports } = await supabase
  .from("content_reports")
  .select(`
    *,
    reporter:profiles!reporter_id(username, id),
    reported_user:profiles!reported_user_id(username, id)
  `)
  .eq("status", "pending")
  .order("created_at", { ascending: false });

// Dismiss a report
await supabase
  .from("content_reports")
  .update({
    status: "dismissed",
    reviewed_at: new Date().toISOString(),
    reviewed_by: currentUserId,
    moderator_notes: notes,
  })
  .eq("id", reportId);

// Take action on a user
await supabase.from("moderation_actions").insert({
  moderator_id: currentUserId,
  target_user_id: targetUserId,
  action_type: "warning", // or 'content_removed', 'account_suspended', 'account_banned'
  reason: "Violated community guidelines",
  report_id: reportId,
  expires_at: actionType === "account_suspended" ? suspensionEndDate : null,
});

// Then update the report status
await supabase
  .from("content_reports")
  .update({ status: "action_taken", reviewed_at: new Date().toISOString(), reviewed_by: currentUserId })
  .eq("id", reportId);

// Fetch moderation action history
const { data: actions } = await supabase
  .from("moderation_actions")
  .select(`
    *,
    moderator:profiles!moderator_id(username),
    target:profiles!target_user_id(username)
  `)
  .order("created_at", { ascending: false })
  .limit(50);

// Search users
const { data: users } = await supabase
  .from("profiles")
  .select("*")
  .ilike("username", `%${searchTerm}%`)
  .limit(20);
```

## UI Layout Spec

```
┌─────────────────────────────────────────────────┐
│  BumpSetCut Admin — Moderation Dashboard        │
│  [Reports (3)] [Users] [Action Log]             │
├─────────────────────────────────────────────────┤
│                                                 │
│  Filter: [All ▼] [Date Range] [Search...]       │
│                                                 │
│  ┌─────────────────────────────────────────┐    │
│  │ 🔴 spam  ·  Highlight  ·  2 min ago    │    │
│  │ Reporter: @sarah  →  Reported: @spammer │    │
│  │ "This account is posting spam links"    │    │
│  │                                         │    │
│  │ [Dismiss]  [Warn User]  [Remove + Ban]  │    │
│  │ Notes: [____________________________]   │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
│  ┌─────────────────────────────────────────┐    │
│  │ 🟡 inappropriate_content  ·  Comment    │    │
│  │ Reporter: @mike  →  Reported: @troll    │    │
│  │ "Offensive language in comments"        │    │
│  │                                         │    │
│  │ [Dismiss]  [Warn User]  [Remove Post]   │    │
│  │ Notes: [____________________________]   │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
│  Showing 2 of 3 pending reports                 │
└─────────────────────────────────────────────────┘
```

## File Structure

```
app/
└── admin/
    └── moderation/
        └── page.tsx          # Main dashboard (client component)

lib/
├── supabase.ts               # Supabase client singleton
└── moderation-queries.ts     # Query helpers (optional)
```

## Security Considerations

- **Not indexed**: Add to `robots.txt` → `Disallow: /admin/`
- **Not linked**: No navigation link from any public page
- **Auth-gated**: Requires Supabase login + `is_moderator = true`
- **RLS enforced**: Even if someone reaches the page, Supabase RLS blocks non-moderator queries
- **No service role key**: Uses anon key + RLS, never exposes admin credentials to the browser

## Phased Approach

### Phase 1 (Launch) — Manual via Supabase Dashboard
- Review reports with SQL in Supabase Dashboard
- No custom UI needed
- Sufficient for < 100 users

### Phase 2 (This Dashboard) — When reports exceed ~10/week
- Build the hidden `/admin/moderation` page
- 3-tab layout: Reports, Users, Action Log
- Auth-gated to moderators only

### Phase 3 (Scale) — When you need a team
- Add moderator role management (invite other mods)
- Auto-flagging with content analysis
- Appeal workflow (users can contest actions)
- Metrics: response time, report volume trends, action breakdown
