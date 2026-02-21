"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { supabase } from "@/lib/supabase";

// ── Types ────────────────────────────────────────────────────────────────────

interface TestSection {
  id: string;
  name: string;
  sort_order: number;
}

interface TestSubsection {
  id: string;
  section_id: string;
  name: string;
  sort_order: number;
}

interface TestItem {
  id: string;
  subsection_id: string;
  description: string;
  status: "pending" | "passed" | "failed" | "skipped" | "blocked";
  priority: "critical" | "high" | "medium" | "low";
  automated: boolean;
  automation_file: string | null;
  notes: string | null;
  updated_by: string | null;
  updated_at: string;
  device: string | null;
  date_tested: string | null;
}

type Status = TestItem["status"];
type StatusFilter = "all" | Status;
type PriorityFilter = "all" | "critical" | "high";
type TypeFilter = "all" | "auto" | "manual";

const STATUSES: Status[] = ["pending", "passed", "failed", "skipped", "blocked"];

const STATUS_COLORS: Record<Status, { bg: string; text: string; label: string }> = {
  pending: { bg: "#d29922", text: "#fff", label: "Pending" },
  passed: { bg: "#3fb950", text: "#fff", label: "Pass" },
  failed: { bg: "#f85149", text: "#fff", label: "Fail" },
  skipped: { bg: "#6e7681", text: "#fff", label: "Skip" },
  blocked: { bg: "#bc8cff", text: "#fff", label: "Blocked" },
};

const PRIORITY_COLORS: Record<string, { dark: string; light: string }> = {
  critical: { dark: "#f85149", light: "#d1242f" },
  high: { dark: "#d29922", light: "#9a6700" },
  medium: { dark: "#8b949e", light: "#656d76" },
  low: { dark: "#6e7681", light: "#8b949e" },
};

const TESTERS = ["", "Benjamin Wierzbanowski", "XCUITest"];
const DEVICES = ["", "Ben's iPhone 16 Pro Max", "Simulator"];

// ── Component ────────────────────────────────────────────────────────────────

export default function TestDashboard() {
  const [sections, setSections] = useState<TestSection[]>([]);
  const [subsections, setSubsections] = useState<TestSubsection[]>([]);
  const [items, setItems] = useState<TestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  const [editingCell, setEditingCell] = useState<{
    id: string;
    field: string;
  } | null>(null);
  const [editValue, setEditValue] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);

  const [toast, setToast] = useState<{ msg: string; error: boolean } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Persist theme ──────────────────────────────────────────────────────────

  useEffect(() => {
    const saved = localStorage.getItem("td-dark-mode");
    if (saved !== null) setDarkMode(saved === "true");
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      localStorage.setItem("td-dark-mode", String(!prev));
      return !prev;
    });
  };

  // ── Data fetching ──────────────────────────────────────────────────────────

  useEffect(() => {
    async function load() {
      const [secRes, subRes, itemRes] = await Promise.all([
        supabase.from("test_sections").select("*").order("sort_order"),
        supabase.from("test_subsections").select("*").order("sort_order"),
        supabase.from("test_items").select("*"),
      ]);
      if (secRes.data) setSections(secRes.data);
      if (subRes.data) setSubsections(subRes.data);
      if (itemRes.data) setItems(itemRes.data);
      setLoading(false);
    }
    load();
  }, []);

  // ── Realtime ───────────────────────────────────────────────────────────────

  useEffect(() => {
    const channel = supabase
      .channel("test_items_rt")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "test_items" },
        (payload) => {
          const updated = payload.new as TestItem;
          setItems((prev) =>
            prev.map((item) => (item.id === updated.id ? updated : item))
          );
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  // ── Toast ──────────────────────────────────────────────────────────────────

  const showToast = useCallback((msg: string, error = false) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, error });
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  }, []);

  // ── Field update (generic) ─────────────────────────────────────────────────

  const updateField = useCallback(
    async (itemId: string, field: string, value: string | null) => {
      const autoFields: Record<string, unknown> = {};
      if (field === "status") {
        if (value && value !== "pending") {
          autoFields.updated_by = "Benjamin Wierzbanowski";
          autoFields.device = "Ben's iPhone 16 Pro Max";
          autoFields.date_tested = new Date().toISOString();
        } else {
          autoFields.updated_by = null;
          autoFields.device = null;
          autoFields.date_tested = null;
        }
      }
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, [field]: value, ...autoFields } : item
        )
      );
      const updateData: Record<string, unknown> = {
        [field]: value,
        ...autoFields,
        updated_at: new Date().toISOString(),
      };
      const { error } = await supabase
        .from("test_items")
        .update(updateData)
        .eq("id", itemId);
      if (error) {
        showToast(`Failed to save ${itemId}`, true);
      } else {
        showToast(`${itemId}: ${field} updated`);
      }
    },
    [showToast]
  );

  // ── Inline edit (for notes) ────────────────────────────────────────────────

  const startEdit = (id: string, field: string, currentValue: string) => {
    setEditingCell({ id, field });
    setEditValue(currentValue);
    setTimeout(() => editInputRef.current?.focus(), 0);
  };

  const commitEdit = () => {
    if (editingCell) {
      const val = editValue.trim() || null;
      updateField(editingCell.id, editingCell.field, val);
      setEditingCell(null);
    }
  };

  const cancelEdit = () => setEditingCell(null);

  // ── Filter ─────────────────────────────────────────────────────────────────

  function matchesFilter(t: TestItem): boolean {
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
    if (typeFilter === "auto" && !t.automated) return false;
    if (typeFilter === "manual" && t.automated) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !t.description.toLowerCase().includes(q) &&
        !t.id.toLowerCase().includes(q) &&
        !(t.notes || "").toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  }

  // ── Stats ──────────────────────────────────────────────────────────────────

  const stats = useMemo(() => {
    const total = items.length;
    const passed = items.filter((t) => t.status === "passed").length;
    const failed = items.filter((t) => t.status === "failed").length;
    const pending = items.filter((t) => t.status === "pending").length;
    const blocked = items.filter((t) => t.status === "blocked").length;
    const skipped = items.filter((t) => t.status === "skipped").length;
    const automated = items.filter((t) => t.automated).length;
    const pct = total ? Math.round((passed / total) * 100) : 0;
    return { total, passed, failed, pending, blocked, skipped, automated, pct };
  }, [items]);

  // ── Section helpers ────────────────────────────────────────────────────────

  const toggleSection = (id: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const expandAll = () => setCollapsedSections(new Set());
  const collapseAll = () => setCollapsedSections(new Set(sections.map((s) => s.id)));

  // ── Grouped data ───────────────────────────────────────────────────────────

  const itemsBySubsection = useMemo(() => {
    const map = new Map<string, TestItem[]>();
    for (const item of items) {
      const arr = map.get(item.subsection_id) || [];
      arr.push(item);
      map.set(item.subsection_id, arr);
    }
    return map;
  }, [items]);

  const subsectionsBySection = useMemo(() => {
    const map = new Map<string, TestSubsection[]>();
    for (const sub of subsections) {
      const arr = map.get(sub.section_id) || [];
      arr.push(sub);
      map.set(sub.section_id, arr);
    }
    return map;
  }, [subsections]);

  const visibleCount = useMemo(
    () => items.filter((t) => matchesFilter(t)).length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, search, statusFilter, priorityFilter, typeFilter]
  );

  // ── Section stats ──────────────────────────────────────────────────────────

  function sectionStats(sectionId: string) {
    const subs = subsectionsBySection.get(sectionId) || [];
    const all = subs.flatMap((sub) => itemsBySubsection.get(sub.id) || []);
    const visible = all.filter((t) => matchesFilter(t));
    const passed = all.filter((t) => t.status === "passed").length;
    const failed = all.filter((t) => t.status === "failed").length;
    const total = all.length;
    const pct = total ? Math.round((passed / total) * 100) : 0;
    return { all, visible, passed, failed, total, pct };
  }

  // ── Loading ────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className={`td${darkMode ? " dark" : " light"}`}>
        <div className="td-loading">Loading test plan...</div>
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className={`td${darkMode ? " dark" : " light"}`}>
      {/* Header */}
      <div className="td-header">
        <div className="td-header-left">
          <h1>BUMPSETCUT &mdash; Beta Test Plan</h1>
          <p className="td-subtitle">
            {stats.total} Test Cases &bull; {sections.length} Sections &bull;
            Real-time sync via Supabase
          </p>
        </div>
        <button className="td-theme-toggle" onClick={toggleTheme}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Dashboard summary row */}
      <div className="td-summary">
        <div className="td-summary-stats">
          <span className="td-stat">
            <span className="td-stat-num">{stats.total}</span> Total
          </span>
          <span className="td-stat td-stat-pass">
            <span className="td-stat-num">{stats.passed}</span> Pass
          </span>
          <span className="td-stat td-stat-fail">
            <span className="td-stat-num">{stats.failed}</span> Fail
          </span>
          <span className="td-stat td-stat-pending">
            <span className="td-stat-num">{stats.pending}</span> Pending
          </span>
          <span className="td-stat td-stat-blocked">
            <span className="td-stat-num">{stats.blocked}</span> Blocked
          </span>
          <span className="td-stat td-stat-skip">
            <span className="td-stat-num">{stats.skipped}</span> Skip
          </span>
          <span className="td-stat td-stat-auto">
            <span className="td-stat-num">{stats.automated}</span> Auto
          </span>
        </div>
        <div className="td-progress-bar">
          <div className="td-progress-fill td-fill-pass" style={{ width: `${stats.total ? (stats.passed / stats.total) * 100 : 0}%` }} />
          <div className="td-progress-fill td-fill-fail" style={{ width: `${stats.total ? (stats.failed / stats.total) * 100 : 0}%` }} />
          <div className="td-progress-fill td-fill-skip" style={{ width: `${stats.total ? (stats.skipped / stats.total) * 100 : 0}%` }} />
        </div>
        <div className="td-progress-label">{stats.pct}% Complete</div>
      </div>

      {/* Toolbar */}
      <div className="td-toolbar">
        <div className="td-toolbar-left">
          <input
            className="td-search"
            type="text"
            placeholder="Search tests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="td-filter-group">
            {(["all", "pending", "passed", "failed", "blocked"] as StatusFilter[]).map((v) => (
              <button
                key={v}
                className={`td-filter${statusFilter === v ? " active" : ""}`}
                onClick={() => setStatusFilter(v)}
              >
                {v === "all" ? "All" : STATUS_COLORS[v as Status]?.label || v}
              </button>
            ))}
          </div>
          <div className="td-filter-group">
            {(["all", "critical", "high"] as PriorityFilter[]).map((v) => (
              <button
                key={v}
                className={`td-filter${priorityFilter === v ? " active" : ""}`}
                onClick={() => setPriorityFilter(v)}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
          <div className="td-filter-group">
            {(["all", "auto", "manual"] as TypeFilter[]).map((v) => (
              <button
                key={v}
                className={`td-filter${typeFilter === v ? " active" : ""}`}
                onClick={() => setTypeFilter(v)}
              >
                {v === "auto" ? "Automated" : v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="td-toolbar-right">
          <button className="td-btn" onClick={expandAll}>Expand All</button>
          <button className="td-btn" onClick={collapseAll}>Collapse All</button>
        </div>
      </div>

      {visibleCount !== items.length && (
        <div className="td-match-count">
          Showing {visibleCount} of {items.length} tests
        </div>
      )}

      {/* Table */}
      <div className="td-table-wrap">
        <table className="td-table">
          <thead>
            <tr>
              <th className="th-id">Test ID</th>
              <th className="th-pri">Priority</th>
              <th className="th-desc">Test Case</th>
              <th className="th-status">Status</th>
              <th className="th-tester">Tested By</th>
              <th className="th-device">Device</th>
              <th className="th-date">Date Tested</th>
              <th className="th-notes">Notes / Bugs</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => {
              const ss = sectionStats(section.id);
              if (ss.visible.length === 0) return null;
              const isCollapsed = collapsedSections.has(section.id);

              return (
                <SectionBlock
                  key={section.id}
                  section={section}
                  subs={subsectionsBySection.get(section.id) || []}
                  itemsBySubsection={itemsBySubsection}
                  stats={ss}
                  isCollapsed={isCollapsed}
                  toggleSection={toggleSection}
                  matchesFilter={matchesFilter}
                  updateField={updateField}
                  darkMode={darkMode}
                  editingCell={editingCell}
                  editValue={editValue}
                  setEditValue={setEditValue}
                  startEdit={startEdit}
                  commitEdit={commitEdit}
                  cancelEdit={cancelEdit}
                  editInputRef={editInputRef}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`td-toast${toast.error ? " td-toast-err" : ""}`}>
          {toast.msg}
        </div>
      )}

      <style jsx global>{`
        /* ── Theme variables ──────────────────────────────────────────── */
        .td.dark {
          --bg: #0d1117;
          --surface: #161b22;
          --surface2: #1c2129;
          --border: #30363d;
          --text: #e6edf3;
          --text2: #8b949e;
          --accent: #f97316;
          --green: #3fb950;
          --red: #f85149;
          --yellow: #d29922;
          --blue: #58a6ff;
          --gray: #6e7681;
          --purple: #bc8cff;
          --thead-bg: #1a1f2b;
          --hover-bg: rgba(255, 255, 255, 0.02);
          --even-bg: rgba(255, 255, 255, 0.01);
          --even-hover-bg: rgba(255, 255, 255, 0.03);
          --select-option-bg: #1c2129;
          --select-option-color: #e6edf3;
        }

        .td.light {
          --bg: #ffffff;
          --surface: #f6f8fa;
          --surface2: #eef1f5;
          --border: #d0d7de;
          --text: #1f2328;
          --text2: #656d76;
          --accent: #e55a2b;
          --green: #1a7f37;
          --red: #cf222e;
          --yellow: #9a6700;
          --blue: #0969da;
          --gray: #6e7781;
          --purple: #8250df;
          --thead-bg: #f0f3f6;
          --hover-bg: rgba(0, 0, 0, 0.02);
          --even-bg: rgba(0, 0, 0, 0.015);
          --even-hover-bg: rgba(0, 0, 0, 0.04);
          --select-option-bg: #ffffff;
          --select-option-color: #1f2328;
        }

        /* ── Base ─────────────────────────────────────────────────────── */
        .td {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text",
            system-ui, sans-serif;
          background: var(--bg);
          color: var(--text);
          padding: 20px 24px;
          min-height: 100vh;
          font-size: 13px;
          transition: background 0.2s, color 0.2s;
        }

        .td-loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          color: var(--text2);
          font-size: 16px;
        }

        /* ── Header ──────────────────────────────────────────────────── */
        .td-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }
        .td-header-left {}
        .td-header h1 {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: var(--text);
          margin: 0 0 2px;
        }
        .td-subtitle {
          font-size: 12px;
          color: var(--text2);
          margin: 0;
        }
        .td-theme-toggle {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 6px 14px;
          color: var(--text2);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .td-theme-toggle:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        /* ── Summary bar ─────────────────────────────────────────────── */
        .td-summary {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px 16px;
          margin-bottom: 12px;
        }
        .td-summary-stats {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }
        .td-stat {
          font-size: 12px;
          color: var(--text2);
        }
        .td-stat-num {
          font-weight: 700;
          font-size: 18px;
          margin-right: 3px;
        }
        .td-stat-pass .td-stat-num { color: var(--green); }
        .td-stat-fail .td-stat-num { color: var(--red); }
        .td-stat-pending .td-stat-num { color: var(--yellow); }
        .td-stat-blocked .td-stat-num { color: var(--purple); }
        .td-stat-skip .td-stat-num { color: var(--gray); }
        .td-stat-auto .td-stat-num { color: var(--blue); }

        .td-progress-bar {
          height: 6px;
          background: var(--surface2);
          border-radius: 3px;
          overflow: hidden;
          display: flex;
        }
        .td-progress-fill { transition: width 0.3s; }
        .td-fill-pass { background: var(--green); }
        .td-fill-fail { background: var(--red); }
        .td-fill-skip { background: var(--gray); }
        .td-progress-label {
          font-size: 11px;
          color: var(--accent);
          font-weight: 600;
          margin-top: 4px;
          text-align: right;
        }

        /* ── Toolbar ─────────────────────────────────────────────────── */
        .td-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        .td-toolbar-left {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
        }
        .td-toolbar-right {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .td-search {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 6px 12px;
          color: var(--text);
          font-size: 12px;
          outline: none;
          width: 180px;
        }
        .td-search:focus { border-color: var(--accent); }
        .td-search::placeholder { color: var(--gray); }

        .td-filter-group {
          display: flex;
          gap: 2px;
        }
        .td-filter {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 4px 10px;
          color: var(--text2);
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.1s;
        }
        .td-filter:hover { border-color: var(--accent); color: var(--text); }
        .td-filter.active {
          background: rgba(249, 115, 22, 0.15);
          border-color: var(--accent);
          color: var(--accent);
        }

        .td-btn {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 4px 10px;
          color: var(--text2);
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.1s;
        }
        .td-btn:hover { border-color: var(--accent); color: var(--text); }

        .td-match-count {
          font-size: 11px;
          color: var(--text2);
          margin-bottom: 8px;
        }

        /* ── Table ───────────────────────────────────────────────────── */
        .td-table-wrap {
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: auto;
        }
        .td-table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }

        .th-id { width: 70px; }
        .th-pri { width: 70px; }
        .th-desc { width: auto; }
        .th-status { width: 90px; }
        .th-tester { width: 140px; }
        .th-device { width: 150px; }
        .th-date { width: 90px; }
        .th-notes { width: 160px; }

        .td-table thead th {
          background: var(--thead-bg);
          border-bottom: 2px solid var(--accent);
          padding: 8px 10px;
          text-align: left;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text);
          position: sticky;
          top: 0;
          z-index: 10;
          white-space: nowrap;
        }

        /* ── Section header row ──────────────────────────────────────── */
        .td-section-row td {
          background: var(--surface);
          padding: 10px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          user-select: none;
          border-bottom: 1px solid var(--border);
        }
        .td-section-row:hover td {
          background: var(--surface2);
        }
        .td-section-name {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .td-section-chevron {
          font-size: 10px;
          color: var(--text2);
          transition: transform 0.15s;
          display: inline-block;
        }
        .td-section-chevron.open {
          transform: rotate(90deg);
        }
        .td-section-count {
          font-size: 11px;
          color: var(--text2);
          font-weight: 400;
        }
        .td-section-badges {
          display: flex;
          gap: 6px;
          margin-left: auto;
          align-items: center;
        }
        .td-mini-badge {
          font-size: 10px;
          font-weight: 600;
          padding: 1px 6px;
          border-radius: 8px;
        }
        .td-mini-badge-pass {
          background: rgba(63, 185, 80, 0.15);
          color: var(--green);
        }
        .td-mini-badge-fail {
          background: rgba(248, 81, 73, 0.15);
          color: var(--red);
        }
        .td-section-pct {
          font-size: 11px;
          color: var(--accent);
          font-weight: 600;
        }
        .td-mini-progress {
          width: 50px;
          height: 3px;
          background: var(--surface2);
          border-radius: 2px;
          overflow: hidden;
        }
        .td-mini-progress-fill {
          height: 100%;
          background: var(--green);
          transition: width 0.3s;
        }

        /* ── Subsection header row ───────────────────────────────────── */
        .td-subsection-row td {
          background: var(--surface2);
          padding: 6px 10px;
          font-size: 11px;
          font-weight: 600;
          color: var(--text2);
          text-transform: uppercase;
          letter-spacing: 0.3px;
          border-bottom: 1px solid var(--border);
        }

        /* ── Test row ────────────────────────────────────────────────── */
        .td-test-row td {
          padding: 6px 10px;
          border-bottom: 1px solid var(--border);
          font-size: 12px;
          vertical-align: middle;
        }
        .td-test-row:hover td {
          background: var(--hover-bg);
        }
        .td-test-row:nth-child(even) td {
          background: var(--even-bg);
        }
        .td-test-row:nth-child(even):hover td {
          background: var(--even-hover-bg);
        }

        .td-cell-id {
          font-family: "SF Mono", "Fira Code", monospace;
          font-size: 11px;
          color: var(--text2);
        }

        .td-cell-pri {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .td-cell-desc {
          color: var(--text);
          line-height: 1.4;
        }
        .td-cell-desc-tags {
          display: inline-flex;
          gap: 4px;
          margin-left: 6px;
          vertical-align: middle;
        }
        .td-tag-auto {
          font-size: 9px;
          font-weight: 700;
          background: rgba(88, 166, 255, 0.15);
          color: var(--blue);
          padding: 1px 5px;
          border-radius: 3px;
        }

        .td-test-row.row-passed .td-cell-desc { color: var(--green); }
        .td-test-row.row-failed .td-cell-desc {
          color: var(--red);
          text-decoration: line-through;
          text-decoration-color: rgba(248, 81, 73, 0.3);
        }
        .td-test-row.row-skipped .td-cell-desc {
          color: var(--gray);
          text-decoration: line-through;
          text-decoration-color: rgba(110, 118, 129, 0.3);
        }
        .td-test-row.row-blocked .td-cell-desc { color: var(--purple); }

        /* Cell: Status dropdown */
        .td-status-select {
          appearance: none;
          -webkit-appearance: none;
          border: none;
          border-radius: 4px;
          padding: 3px 20px 3px 8px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          outline: none;
          color: white;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='white'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 6px center;
          min-width: 75px;
        }
        .td-status-select option {
          background: var(--select-option-bg);
          color: var(--select-option-color);
        }

        /* Cell: Enum dropdown (tester, device) */
        .td-enum-select {
          appearance: none;
          -webkit-appearance: none;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 4px;
          padding: 2px 18px 2px 4px;
          font-size: 11px;
          color: var(--text2);
          cursor: pointer;
          outline: none;
          width: 100%;
          transition: border-color 0.1s;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='5'%3E%3Cpath d='M0 0l4 5 4-5z' fill='%238b949e'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 4px center;
        }
        .td-enum-select:hover {
          border-color: var(--border);
        }
        .td-enum-select:focus {
          border-color: var(--accent);
        }
        .td-enum-select option {
          background: var(--select-option-bg);
          color: var(--select-option-color);
        }
        .td-enum-select.has-value {
          color: var(--text);
        }

        /* Cell: Editable text (notes) */
        .td-editable {
          cursor: pointer;
          padding: 2px 4px;
          border-radius: 3px;
          min-height: 20px;
          color: var(--text2);
          transition: background 0.1s;
        }
        .td-editable:hover {
          background: rgba(249, 115, 22, 0.08);
        }
        .td-editable-empty {
          color: var(--gray);
          font-style: italic;
          font-size: 11px;
        }
        .td-edit-input {
          background: var(--surface);
          border: 1px solid var(--accent);
          border-radius: 3px;
          padding: 2px 4px;
          color: var(--text);
          font-size: 12px;
          width: 100%;
          outline: none;
        }

        .td-cell-date {
          font-size: 11px;
          color: var(--text2);
        }

        /* ── Toast ───────────────────────────────────────────────────── */
        .td-toast {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: rgba(63, 185, 80, 0.15);
          border: 1px solid var(--green);
          color: var(--green);
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          z-index: 100;
          animation: td-toast-in 0.2s ease;
        }
        .td-toast-err {
          background: rgba(248, 81, 73, 0.15);
          border-color: var(--red);
          color: var(--red);
        }
        @keyframes td-toast-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .td { padding: 12px; }
          .td-toolbar { flex-direction: column; }
          .th-device, .th-date, .th-tester { display: none; }
          .td-table td:nth-child(5),
          .td-table td:nth-child(6),
          .td-table td:nth-child(7) { display: none; }
        }
      `}</style>
    </div>
  );
}

// ── Section block ────────────────────────────────────────────────────────────

function SectionBlock({
  section, subs, itemsBySubsection, stats, isCollapsed,
  toggleSection, matchesFilter, updateField, darkMode,
  editingCell, editValue, setEditValue, startEdit, commitEdit, cancelEdit, editInputRef,
}: {
  section: TestSection;
  subs: TestSubsection[];
  itemsBySubsection: Map<string, TestItem[]>;
  stats: { visible: TestItem[]; passed: number; failed: number; total: number; pct: number };
  isCollapsed: boolean;
  toggleSection: (id: string) => void;
  matchesFilter: (t: TestItem) => boolean;
  updateField: (id: string, field: string, value: string | null) => void;
  darkMode: boolean;
  editingCell: { id: string; field: string } | null;
  editValue: string;
  setEditValue: (v: string) => void;
  startEdit: (id: string, field: string, current: string) => void;
  commitEdit: () => void;
  cancelEdit: () => void;
  editInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <>
      <tr className="td-section-row" onClick={() => toggleSection(section.id)}>
        <td colSpan={8}>
          <div className="td-section-name">
            <span className={`td-section-chevron${isCollapsed ? "" : " open"}`}>
              &#9654;
            </span>
            <span>{section.id}. {section.name}</span>
            <span className="td-section-count">{stats.visible.length}/{stats.total}</span>
            <div className="td-section-badges">
              {stats.passed > 0 && <span className="td-mini-badge td-mini-badge-pass">{stats.passed} pass</span>}
              {stats.failed > 0 && <span className="td-mini-badge td-mini-badge-fail">{stats.failed} fail</span>}
              <div className="td-mini-progress">
                <div className="td-mini-progress-fill" style={{ width: `${stats.pct}%` }} />
              </div>
              <span className="td-section-pct">{stats.pct}%</span>
            </div>
          </div>
        </td>
      </tr>
      {!isCollapsed && subs.map((sub) => {
        const subItems = itemsBySubsection.get(sub.id) || [];
        const visible = subItems.filter((t) => matchesFilter(t));
        if (visible.length === 0) return null;
        return (
          <SubsectionBlock key={sub.id} sub={sub} items={visible}
            updateField={updateField} darkMode={darkMode}
            editingCell={editingCell} editValue={editValue} setEditValue={setEditValue}
            startEdit={startEdit} commitEdit={commitEdit} cancelEdit={cancelEdit} editInputRef={editInputRef}
          />
        );
      })}
    </>
  );
}

// ── Subsection block ─────────────────────────────────────────────────────────

function SubsectionBlock({
  sub, items, updateField, darkMode,
  editingCell, editValue, setEditValue, startEdit, commitEdit, cancelEdit, editInputRef,
}: {
  sub: TestSubsection;
  items: TestItem[];
  updateField: (id: string, field: string, value: string | null) => void;
  darkMode: boolean;
  editingCell: { id: string; field: string } | null;
  editValue: string;
  setEditValue: (v: string) => void;
  startEdit: (id: string, field: string, current: string) => void;
  commitEdit: () => void;
  cancelEdit: () => void;
  editInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <>
      <tr className="td-subsection-row">
        <td colSpan={8}>{sub.id} {sub.name}</td>
      </tr>
      {items.map((t) => (
        <TestRow key={t.id} item={t} updateField={updateField} darkMode={darkMode}
          editingCell={editingCell} editValue={editValue} setEditValue={setEditValue}
          startEdit={startEdit} commitEdit={commitEdit} cancelEdit={cancelEdit} editInputRef={editInputRef}
        />
      ))}
    </>
  );
}

// ── Test row ─────────────────────────────────────────────────────────────────

function TestRow({
  item, updateField, darkMode,
  editingCell, editValue, setEditValue, startEdit, commitEdit, cancelEdit, editInputRef,
}: {
  item: TestItem;
  updateField: (id: string, field: string, value: string | null) => void;
  darkMode: boolean;
  editingCell: { id: string; field: string } | null;
  editValue: string;
  setEditValue: (v: string) => void;
  startEdit: (id: string, field: string, current: string) => void;
  commitEdit: () => void;
  cancelEdit: () => void;
  editInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const isEditing = (field: string) =>
    editingCell?.id === item.id && editingCell?.field === field;

  const statusInfo = STATUS_COLORS[item.status];
  const priColors = PRIORITY_COLORS[item.priority] || PRIORITY_COLORS.medium;
  const priColor = darkMode ? priColors.dark : priColors.light;

  const formatDate = (d: string | null) => {
    if (!d) return "";
    const date = new Date(d);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <tr className={`td-test-row row-${item.status}`}>
      <td className="td-cell-id">{item.id}</td>

      <td>
        <span className="td-cell-pri" style={{ color: priColor }}>
          {item.priority.toUpperCase()}
        </span>
      </td>

      <td className="td-cell-desc">
        {item.description}
        {item.automated && (
          <span className="td-cell-desc-tags">
            <span className="td-tag-auto">AUTO</span>
          </span>
        )}
      </td>

      <td>
        <select
          className="td-status-select"
          value={item.status}
          style={{ backgroundColor: statusInfo.bg }}
          onChange={(e) => updateField(item.id, "status", e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{STATUS_COLORS[s].label}</option>
          ))}
        </select>
      </td>

      <td>
        <select
          className={`td-enum-select${item.updated_by ? " has-value" : ""}`}
          value={item.updated_by || ""}
          onChange={(e) => updateField(item.id, "updated_by", e.target.value || null)}
        >
          {TESTERS.map((t) => (
            <option key={t} value={t}>{t || "—"}</option>
          ))}
        </select>
      </td>

      <td>
        <select
          className={`td-enum-select${item.device ? " has-value" : ""}`}
          value={item.device || ""}
          onChange={(e) => updateField(item.id, "device", e.target.value || null)}
        >
          {DEVICES.map((d) => (
            <option key={d} value={d}>{d || "—"}</option>
          ))}
        </select>
      </td>

      <td className="td-cell-date">{formatDate(item.date_tested)}</td>

      <td>
        {isEditing("notes") ? (
          <input
            ref={editInputRef}
            className="td-edit-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitEdit();
              if (e.key === "Escape") cancelEdit();
            }}
          />
        ) : (
          <div
            className="td-editable"
            onClick={() => startEdit(item.id, "notes", item.notes || "")}
          >
            {item.notes || <span className="td-editable-empty">click to edit</span>}
          </div>
        )}
      </td>
    </tr>
  );
}
