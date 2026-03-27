"use client";

const stats = [
  { label: "Tests Activos", value: 0, color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  { label: "Backlog", value: 0, color: "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border-primary)]" },
  { label: "Inbox", value: 0, color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
  { label: "Completados", value: 0, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
];

export default function StatusSummary() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`px-4 py-3 rounded-lg border ${stat.color}`}
        >
          <p className="text-2xl font-semibold">{stat.value}</p>
          <p className="text-sm opacity-80">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
