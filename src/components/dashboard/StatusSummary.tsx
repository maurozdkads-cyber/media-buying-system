"use client";

const stats = [
  { label: "Tests Activos", value: 0, color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  { label: "Backlog", value: 0, color: "bg-gray-50 text-gray-700 border-gray-200" },
  { label: "Inbox", value: 0, color: "bg-blue-50 text-blue-700 border-blue-200" },
  { label: "Completados", value: 0, color: "bg-green-50 text-green-700 border-green-200" },
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
