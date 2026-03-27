"use client";

import { useState, useEffect } from "react";

interface StatItem {
  label: string;
  value: number;
  color: string;
}

export default function StatusSummary() {
  const [stats, setStats] = useState<StatItem[]>([
    { label: "Tests Activos", value: 0, color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
    { label: "Backlog", value: 0, color: "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border-primary)]" },
    { label: "Inbox", value: 0, color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
    { label: "Completados", value: 0, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [activeRes, backlogRes, inboxRes, doneRes] = await Promise.all([
          fetch("/api/tests?status=active"),
          fetch("/api/tests?status=backlog"),
          fetch("/api/inputs?status=inbox"),
          fetch("/api/tests?status=done"),
        ]);

        const [activeData, backlogData, inboxData, doneData] = await Promise.all([
          activeRes.ok ? activeRes.json() : [],
          backlogRes.ok ? backlogRes.json() : [],
          inboxRes.ok ? inboxRes.json() : [],
          doneRes.ok ? doneRes.json() : [],
        ]);

        setStats([
          { label: "Tests Activos", value: Array.isArray(activeData) ? activeData.length : 0, color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
          { label: "Backlog", value: Array.isArray(backlogData) ? backlogData.length : 0, color: "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border-primary)]" },
          { label: "Inbox", value: Array.isArray(inboxData) ? inboxData.length : 0, color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
          { label: "Completados", value: Array.isArray(doneData) ? doneData.length : 0, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
        ]);
      } catch (err) {
        console.error("Error fetching status counts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCounts();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`px-4 py-3 rounded-lg border ${stat.color}`}
        >
          <p className="text-2xl font-semibold">
            {loading ? "-" : stat.value}
          </p>
          <p className="text-sm opacity-80">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
