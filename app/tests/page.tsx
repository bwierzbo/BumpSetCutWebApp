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
}

type StatusFilter = "all" | "pending" | "passed" | "failed" | "blocked";
type PriorityFilter = "all" | "critical" | "high";
type TypeFilter = "all" | "auto" | "manual";

// ── Component ────────────────────────────────────────────────────────────────

export default function TestDashboard() {
  const [sections, setSections] = useState<TestSection[]>([]);
  const [subsections, setSubsections] = useState<TestSubsection[]>([]);
  const [items, setItems] = useState<TestItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const [pickerItemId, setPickerItemId] = useState<string | null>(null);
  const [pickerPos, setPickerPos] = useState({ x: 0, y: 0 });
  const pickerRef = useRef<HTMLDivElement>(null);

  const [toast, setToast] = useState<{
    msg: string;
    error: boolean;
  } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Data fetching ──────────────────────────────────────────────────────────

  useEffect(() => {
    async function load() {
      const [secRes, subRes, itemRes] = await Promise.all([
        supabase
          .from("test_sections")
          .select("*")
          .order("sort_order", { ascending: true }),
        supabase
          .from("test_subsections")
          .select("*")
          .order("sort_order", { ascending: true }),
        supabase.from("test_items").select("*"),
      ]);
      if (secRes.data) setSections(secRes.data);
      if (subRes.data) setSubsections(subRes.data);
      if (itemRes.data) setItems(itemRes.data);
      setLoading(false);
    }
    load();
  }, []);

  // ── Realtime subscription ──────────────────────────────────────────────────

  useEffect(() => {
    const channel = supabase
      .channel("test_items_changes")
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

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ── Toast helper ───────────────────────────────────────────────────────────

  const showToast = useCallback((msg: string, error = false) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, error });
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  }, []);

  // ── Status update ──────────────────────────────────────────────────────────

  const updateStatus = useCallback(
    async (itemId: string, newStatus: TestItem["status"]) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, status: newStatus } : item
        )
      );
      const { error } = await supabase
        .from("test_items")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", itemId);
      if (error) {
        showToast(`Failed to save ${itemId}`, true);
      } else {
        showToast(`${itemId} → ${newStatus}`);
      }
    },
    [showToast]
  );

  const bulkSetVisible = useCallback(
    async (status: TestItem["status"]) => {
      const visible = items.filter((t) => matchesFilter(t));
      if (visible.length === 0) return;

      setItems((prev) =>
        prev.map((item) =>
          visible.some((v) => v.id === item.id)
            ? { ...item, status }
            : item
        )
      );

      const ids = visible.map((t) => t.id);
      const { error } = await supabase
        .from("test_items")
        .update({ status, updated_at: new Date().toISOString() })
        .in("id", ids);

      if (error) {
        showToast("Bulk save failed", true);
      } else {
        showToast(`${visible.length} tests → ${status}`);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, search, statusFilter, priorityFilter, typeFilter, showToast]
  );

  // ── Filter logic ───────────────────────────────────────────────────────────

  function matchesFilter(t: TestItem): boolean {
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
    if (typeFilter === "auto" && !t.automated) return false;
    if (typeFilter === "manual" && t.automated) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !t.description.toLowerCase().includes(q) &&
        !t.id.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  }

  // ── Computed stats ─────────────────────────────────────────────────────────

  const stats = useMemo(() => {
    const total = items.length;
    const passed = items.filter((t) => t.status === "passed").length;
    const failed = items.filter((t) => t.status === "failed").length;
    const pending = items.filter((t) => t.status === "pending").length;
    const blocked = items.filter((t) => t.status === "blocked").length;
    const automated = items.filter((t) => t.automated).length;
    const pct = total ? Math.round((passed / total) * 100) : 0;
    const failPct = total ? Math.round((failed / total) * 100) : 0;
    const skipPct = total
      ? Math.round(
          (items.filter((t) => t.status === "skipped").length / total) * 100
        )
      : 0;
    return { total, passed, failed, pending, blocked, automated, pct, failPct, skipPct };
  }, [items]);

  // ── Section toggle ─────────────────────────────────────────────────────────

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const expandAll = () =>
    setOpenSections(new Set(sections.map((s) => s.id)));
  const collapseAll = () => setOpenSections(new Set());

  // ── Picker ─────────────────────────────────────────────────────────────────

  const openPicker = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setPickerPos({ x: rect.left - 10, y: rect.bottom + 6 });
    setPickerItemId(itemId);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).classList.contains("status-dot")
      ) {
        setPickerItemId(null);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPickerItemId(null);
    };
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  // ── Group items by section/subsection ──────────────────────────────────────

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

  // ── Visible count ──────────────────────────────────────────────────────────

  const visibleCount = useMemo(
    () => items.filter((t) => matchesFilter(t)).length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, search, statusFilter, priorityFilter, typeFilter]
  );

  // ── Loading state ──────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="test-dash">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div style={{ color: "var(--td-text2)", fontSize: 18 }}>
            Loading test plan...
          </div>
        </div>
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="test-dash">
      <h1>BumpSetCut Beta Test Plan</h1>
      <p className="subtitle">
        Click status dots to change test results. Changes sync in real-time via
        Supabase.
      </p>

      {/* Stats bar */}
      <div className="stats-bar">
        <StatCard label="Total" value={stats.total} kind="total" />
        <StatCard label="Passed" value={stats.passed} kind="passed" />
        <StatCard label="Failed" value={stats.failed} kind="failed" />
        <StatCard label="Pending" value={stats.pending} kind="pending" />
        <StatCard label="Blocked" value={stats.blocked} kind="blocked" />
        <StatCard label="Automated" value={stats.automated} kind="automated" />
      </div>

      {/* Progress bar */}
      <div className="progress-wrap">
        <div className="progress-header">
          <span className="label">Overall Progress</span>
          <span className="pct">{stats.pct}%</span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill-passed"
            style={{ width: `${stats.pct}%` }}
          />
          <div
            className="progress-fill-failed"
            style={{ width: `${stats.failPct}%` }}
          />
          <div
            className="progress-fill-skipped"
            style={{ width: `${stats.skipPct}%` }}
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <button
          className="toolbar-btn success"
          onClick={() => bulkSetVisible("passed")}
        >
          Mark Visible Passed
        </button>
        <button
          className="toolbar-btn danger"
          onClick={() => bulkSetVisible("failed")}
        >
          Mark Visible Failed
        </button>
        <button
          className="toolbar-btn"
          onClick={() => bulkSetVisible("pending")}
        >
          Reset Visible
        </button>
        <button className="toolbar-btn" onClick={expandAll}>
          Expand All
        </button>
        <button className="toolbar-btn" onClick={collapseAll}>
          Collapse All
        </button>
      </div>

      {/* Search */}
      <div className="search-wrap">
        <span className="search-icon">&#x1F50D;</span>
        <input
          className="search-input"
          type="text"
          placeholder="Search tests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <span className="filter-label">Status</span>
          {(["all", "pending", "passed", "failed", "blocked"] as const).map(
            (v) => (
              <button
                key={v}
                className={`filter-btn${statusFilter === v ? " active" : ""}`}
                onClick={() => setStatusFilter(v)}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            )
          )}
        </div>
        <div className="filter-sep" />
        <div className="filter-group">
          <span className="filter-label">Priority</span>
          {(["all", "critical", "high"] as const).map((v) => (
            <button
              key={v}
              className={`filter-btn${priorityFilter === v ? " active" : ""}`}
              onClick={() => setPriorityFilter(v)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
        <div className="filter-sep" />
        <div className="filter-group">
          <span className="filter-label">Type</span>
          {(["all", "auto", "manual"] as const).map((v) => (
            <button
              key={v}
              className={`filter-btn${typeFilter === v ? " active" : ""}`}
              onClick={() => setTypeFilter(v)}
            >
              {v === "auto"
                ? "Automated"
                : v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Match count */}
      {visibleCount !== items.length && (
        <div className="match-count">
          Showing {visibleCount} of {items.length} tests
        </div>
      )}

      {/* Sections */}
      <div>
        {sections.map((section) => {
          const subs = subsectionsBySection.get(section.id) || [];
          const sectionItems = subs.flatMap(
            (sub) => itemsBySubsection.get(sub.id) || []
          );
          const sectionVisible = sectionItems.filter((t) =>
            matchesFilter(t)
          ).length;
          const sPassed = sectionItems.filter(
            (t) => t.status === "passed"
          ).length;
          const sFailed = sectionItems.filter(
            (t) => t.status === "failed"
          ).length;
          const sTotal = sectionItems.length;
          const sPct = sTotal ? Math.round((sPassed / sTotal) * 100) : 0;
          const isOpen = openSections.has(section.id);

          if (sectionVisible === 0) return null;

          return (
            <div
              key={section.id}
              className={`section${isOpen ? " open" : ""}`}
            >
              <div
                className="section-header"
                onClick={() => toggleSection(section.id)}
              >
                <div className="section-title">
                  {section.id}. {section.name}{" "}
                  <span className="num">
                    {sectionVisible}/{sTotal}
                  </span>
                </div>
                <div className="section-badge">
                  {sPassed > 0 && (
                    <span className="mini-badge passed">{sPassed}</span>
                  )}
                  {sFailed > 0 && (
                    <span className="mini-badge failed">{sFailed}</span>
                  )}
                  <div className="section-progress">
                    <div
                      className="section-progress-fill"
                      style={{ width: `${sPct}%` }}
                    />
                  </div>
                  <span className="chevron">&#9654;</span>
                </div>
              </div>
              <div className="section-body">
                {subs.map((sub) => {
                  const subItems = itemsBySubsection.get(sub.id) || [];
                  const subVisible = subItems.filter((t) =>
                    matchesFilter(t)
                  ).length;
                  if (subVisible === 0) return null;

                  return (
                    <div key={sub.id}>
                      <div className="subsection-title">
                        {sub.id} {sub.name}
                      </div>
                      {subItems.map((t) => {
                        if (!matchesFilter(t)) return null;
                        return (
                          <div
                            key={t.id}
                            className={`test-row status-${t.status}`}
                          >
                            <div
                              className={`status-dot ${t.status}`}
                              onClick={(e) => openPicker(e, t.id)}
                            />
                            <span className="test-id">{t.id}</span>
                            <span className="test-desc">{t.description}</span>
                            {t.automated && (
                              <span className="tag auto">AUTO</span>
                            )}
                            {t.automation_file && (
                              <span className="automation-file">
                                {t.automation_file}
                              </span>
                            )}
                            <span className={`tag ${t.priority}`}>
                              {t.priority.toUpperCase()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Status picker popup */}
      {pickerItemId && (
        <div
          ref={pickerRef}
          className="status-picker show"
          style={{ left: pickerPos.x, top: pickerPos.y }}
        >
          {(
            ["pending", "passed", "failed", "skipped", "blocked"] as const
          ).map((s) => (
            <div
              key={s}
              className={`sp-opt ${s}`}
              title={s.charAt(0).toUpperCase() + s.slice(1)}
              onClick={() => {
                updateStatus(pickerItemId, s);
                setPickerItemId(null);
              }}
            />
          ))}
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <div className={`toast show${toast.error ? " error" : ""}`}>
          {toast.msg}
        </div>
      )}

      <style jsx global>{`
        .test-dash {
          --td-bg: #0d1117;
          --td-surface: #161b22;
          --td-surface2: #1c2129;
          --td-border: #30363d;
          --td-text: #e6edf3;
          --td-text2: #8b949e;
          --td-accent: #f97316;
          --td-accent-dim: rgba(249, 115, 22, 0.15);
          --td-green: #3fb950;
          --td-green-dim: rgba(63, 185, 80, 0.15);
          --td-red: #f85149;
          --td-red-dim: rgba(248, 81, 73, 0.15);
          --td-yellow: #d29922;
          --td-yellow-dim: rgba(210, 153, 34, 0.15);
          --td-blue: #58a6ff;
          --td-blue-dim: rgba(88, 166, 255, 0.15);
          --td-gray: #6e7681;
          --td-gray-dim: rgba(110, 118, 129, 0.15);
          --td-purple: #bc8cff;
          --td-purple-dim: rgba(188, 140, 255, 0.15);

          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text",
            system-ui, sans-serif;
          background: var(--td-bg);
          color: var(--td-text);
          line-height: 1.5;
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
          min-height: 100vh;
        }

        .test-dash h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 4px;
          color: var(--td-text);
        }
        .test-dash .subtitle {
          color: var(--td-text2);
          font-size: 14px;
          margin-bottom: 24px;
        }

        /* Toast */
        .test-dash .toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: var(--td-green-dim);
          border: 1px solid var(--td-green);
          color: var(--td-green);
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          z-index: 100;
          transition: all 0.2s;
        }
        .test-dash .toast.error {
          background: var(--td-red-dim);
          border-color: var(--td-red);
          color: var(--td-red);
        }

        /* Stats */
        .test-dash .stats-bar {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 12px;
          margin-bottom: 24px;
        }
        .test-dash .stat-card {
          background: var(--td-surface);
          border: 1px solid var(--td-border);
          border-radius: 12px;
          padding: 16px;
          text-align: center;
        }
        .test-dash .stat-card .number {
          font-size: 32px;
          font-weight: 700;
          line-height: 1.2;
        }
        .test-dash .stat-card .label {
          font-size: 12px;
          color: var(--td-text2);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 2px;
        }
        .test-dash .stat-card.total .number {
          color: var(--td-text);
        }
        .test-dash .stat-card.passed .number {
          color: var(--td-green);
        }
        .test-dash .stat-card.failed .number {
          color: var(--td-red);
        }
        .test-dash .stat-card.pending .number {
          color: var(--td-yellow);
        }
        .test-dash .stat-card.automated .number {
          color: var(--td-blue);
        }
        .test-dash .stat-card.blocked .number {
          color: var(--td-purple);
        }

        /* Progress */
        .test-dash .progress-wrap {
          background: var(--td-surface);
          border: 1px solid var(--td-border);
          border-radius: 12px;
          padding: 16px 20px;
          margin-bottom: 24px;
        }
        .test-dash .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .test-dash .progress-header .label {
          font-size: 14px;
          font-weight: 600;
        }
        .test-dash .progress-header .pct {
          font-size: 22px;
          font-weight: 700;
          color: var(--td-accent);
        }
        .test-dash .progress-track {
          height: 10px;
          background: var(--td-surface2);
          border-radius: 5px;
          overflow: hidden;
          display: flex;
        }
        .test-dash .progress-fill-passed {
          background: var(--td-green);
          transition: width 0.4s ease;
        }
        .test-dash .progress-fill-failed {
          background: var(--td-red);
          transition: width 0.4s ease;
        }
        .test-dash .progress-fill-skipped {
          background: var(--td-gray);
          transition: width 0.4s ease;
        }

        /* Toolbar */
        .test-dash .toolbar {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .test-dash .toolbar-btn {
          background: var(--td-surface);
          border: 1px solid var(--td-border);
          border-radius: 8px;
          padding: 8px 16px;
          color: var(--td-text);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
        }
        .test-dash .toolbar-btn:hover {
          border-color: var(--td-accent);
          color: var(--td-accent);
        }
        .test-dash .toolbar-btn.danger {
          color: var(--td-red);
        }
        .test-dash .toolbar-btn.danger:hover {
          border-color: var(--td-red);
        }
        .test-dash .toolbar-btn.success {
          color: var(--td-green);
        }
        .test-dash .toolbar-btn.success:hover {
          border-color: var(--td-green);
        }

        /* Search */
        .test-dash .search-wrap {
          position: relative;
          margin-bottom: 16px;
        }
        .test-dash .search-input {
          width: 100%;
          background: var(--td-surface);
          border: 1px solid var(--td-border);
          border-radius: 8px;
          padding: 10px 16px 10px 38px;
          color: var(--td-text);
          font-size: 14px;
          outline: none;
          transition: border-color 0.15s;
        }
        .test-dash .search-input:focus {
          border-color: var(--td-accent);
        }
        .test-dash .search-input::placeholder {
          color: var(--td-gray);
        }
        .test-dash .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--td-gray);
          font-size: 14px;
        }

        /* Filters */
        .test-dash .filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .test-dash .filter-btn {
          background: var(--td-surface);
          border: 1px solid var(--td-border);
          border-radius: 8px;
          padding: 6px 14px;
          color: var(--td-text2);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
        }
        .test-dash .filter-btn:hover {
          border-color: var(--td-accent);
          color: var(--td-text);
        }
        .test-dash .filter-btn.active {
          background: var(--td-accent-dim);
          border-color: var(--td-accent);
          color: var(--td-accent);
        }
        .test-dash .filter-group {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .test-dash .filter-label {
          font-size: 11px;
          color: var(--td-text2);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-right: 4px;
        }
        .test-dash .filter-sep {
          width: 1px;
          height: 24px;
          background: var(--td-border);
          margin: 0 8px;
        }
        .test-dash .match-count {
          font-size: 12px;
          color: var(--td-text2);
          margin-bottom: 12px;
        }

        /* Sections */
        .test-dash .section {
          background: var(--td-surface);
          border: 1px solid var(--td-border);
          border-radius: 12px;
          margin-bottom: 12px;
          overflow: hidden;
        }
        .test-dash .section-header {
          padding: 14px 20px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          user-select: none;
        }
        .test-dash .section-header:hover {
          background: var(--td-surface2);
        }
        .test-dash .section-title {
          font-size: 16px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .test-dash .section-title .num {
          color: var(--td-text2);
          font-size: 13px;
          font-weight: 400;
        }
        .test-dash .section-badge {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .test-dash .mini-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 10px;
        }
        .test-dash .mini-badge.passed {
          background: var(--td-green-dim);
          color: var(--td-green);
        }
        .test-dash .mini-badge.failed {
          background: var(--td-red-dim);
          color: var(--td-red);
        }
        .test-dash .chevron {
          color: var(--td-text2);
          transition: transform 0.2s;
          font-size: 12px;
        }
        .test-dash .section.open .chevron {
          transform: rotate(90deg);
        }
        .test-dash .section-body {
          display: none;
          border-top: 1px solid var(--td-border);
        }
        .test-dash .section.open .section-body {
          display: block;
        }
        .test-dash .subsection-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--td-text2);
          padding: 10px 20px 6px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .test-dash .section-progress {
          width: 60px;
          height: 4px;
          background: var(--td-surface2);
          border-radius: 2px;
          overflow: hidden;
          margin-left: 8px;
        }
        .test-dash .section-progress-fill {
          height: 100%;
          background: var(--td-green);
          transition: width 0.3s;
        }

        /* Test rows */
        .test-dash .test-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 20px;
          border-bottom: 1px solid var(--td-border);
          font-size: 14px;
          transition: background 0.1s;
        }
        .test-dash .test-row:last-child {
          border-bottom: none;
        }
        .test-dash .test-row:hover {
          background: var(--td-surface2);
        }
        .test-dash .test-id {
          font-family: "SF Mono", "Fira Code", monospace;
          font-size: 12px;
          color: var(--td-text2);
          min-width: 56px;
        }
        .test-dash .test-desc {
          flex: 1;
          color: var(--td-text);
        }
        .test-dash .test-row.status-passed .test-desc {
          color: var(--td-green);
        }
        .test-dash .test-row.status-failed .test-desc {
          color: var(--td-red);
          text-decoration: line-through;
          text-decoration-color: rgba(248, 81, 73, 0.4);
        }
        .test-dash .test-row.status-skipped .test-desc {
          color: var(--td-gray);
          text-decoration: line-through;
          text-decoration-color: rgba(110, 118, 129, 0.4);
        }
        .test-dash .test-row.status-blocked .test-desc {
          color: var(--td-purple);
        }

        .test-dash .tag {
          font-size: 10px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
          white-space: nowrap;
        }
        .test-dash .tag.auto {
          background: var(--td-blue-dim);
          color: var(--td-blue);
        }
        .test-dash .tag.critical {
          background: var(--td-red-dim);
          color: var(--td-red);
        }
        .test-dash .tag.high {
          background: var(--td-yellow-dim);
          color: var(--td-yellow);
        }
        .test-dash .tag.medium {
          background: var(--td-gray-dim);
          color: var(--td-text2);
        }
        .test-dash .tag.low {
          background: transparent;
          color: var(--td-gray);
          border: 1px solid var(--td-border);
        }

        .test-dash .automation-file {
          font-size: 11px;
          color: var(--td-text2);
          margin-left: 4px;
        }

        /* Clickable status dot */
        .test-dash .status-dot {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          flex-shrink: 0;
          cursor: pointer;
          transition: all 0.15s;
          border: 2px solid transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: white;
          font-weight: 700;
        }
        .test-dash .status-dot:hover {
          transform: scale(1.3);
        }
        .test-dash .status-dot.pending {
          background: var(--td-yellow);
          opacity: 0.5;
        }
        .test-dash .status-dot.pending:hover {
          opacity: 1;
        }
        .test-dash .status-dot.passed {
          background: var(--td-green);
        }
        .test-dash .status-dot.passed::after {
          content: "\u2713";
        }
        .test-dash .status-dot.failed {
          background: var(--td-red);
        }
        .test-dash .status-dot.failed::after {
          content: "\u2717";
        }
        .test-dash .status-dot.skipped {
          background: var(--td-gray);
        }
        .test-dash .status-dot.skipped::after {
          content: "\u2014";
        }
        .test-dash .status-dot.blocked {
          background: var(--td-purple);
        }
        .test-dash .status-dot.blocked::after {
          content: "B";
          font-size: 9px;
        }

        /* Status picker */
        .test-dash .status-picker {
          position: fixed;
          background: var(--td-surface);
          border: 1px solid var(--td-border);
          border-radius: 10px;
          padding: 6px;
          z-index: 50;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          display: flex;
          gap: 6px;
        }
        .test-dash .status-picker.show {
          display: flex;
        }
        .test-dash .sp-opt {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          color: white;
          font-weight: 700;
          transition: transform 0.1s;
          border: 2px solid transparent;
        }
        .test-dash .sp-opt:hover {
          transform: scale(1.2);
          border-color: var(--td-text);
        }
        .test-dash .sp-opt.pending {
          background: var(--td-yellow);
          opacity: 0.7;
        }
        .test-dash .sp-opt.passed {
          background: var(--td-green);
        }
        .test-dash .sp-opt.passed::after {
          content: "\u2713";
        }
        .test-dash .sp-opt.failed {
          background: var(--td-red);
        }
        .test-dash .sp-opt.failed::after {
          content: "\u2717";
        }
        .test-dash .sp-opt.skipped {
          background: var(--td-gray);
        }
        .test-dash .sp-opt.skipped::after {
          content: "\u2014";
        }
        .test-dash .sp-opt.blocked {
          background: var(--td-purple);
        }
        .test-dash .sp-opt.blocked::after {
          content: "B";
          font-size: 9px;
        }

        @media (max-width: 600px) {
          .test-dash {
            padding: 12px;
          }
          .test-dash .stats-bar {
            grid-template-columns: repeat(3, 1fr);
          }
          .test-dash .stat-card .number {
            font-size: 24px;
          }
          .test-dash .test-row {
            padding: 8px 12px;
            gap: 8px;
          }
          .test-dash .section-header {
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
}

// ── Stat card component ──────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  kind,
}: {
  label: string;
  value: number;
  kind: string;
}) {
  return (
    <div className={`stat-card ${kind}`}>
      <div className="number">{value}</div>
      <div className="label">{label}</div>
    </div>
  );
}
