"use client";

import { useState, useEffect } from "react";
import type { Test, TestStatus, ViewMode } from "@/types";

const statusConfig: Record<
  TestStatus,
  { label: string; badge: string; color: string }
> = {
  backlog: { label: "Backlog", badge: "🔴", color: "bg-red-500/10 text-red-400 border-red-500/20" },
  active: { label: "Activo", badge: "🟡", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  done: { label: "Completado", badge: "✅", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  discarded: { label: "Descartado", badge: "❌", color: "bg-[var(--bg-tertiary)] text-[var(--text-muted)] border-[var(--border-primary)]" },
};

const columns: TestStatus[] = ["backlog", "active", "done", "discarded"];

export default function TestsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [tests, setTests] = useState<Test[]>([]);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTests();
  }, []);

  async function fetchTests() {
    setLoading(true);
    try {
      const res = await fetch("/api/tests");
      if (res.ok) {
        const data = await res.json();
        setTests(data);
      }
    } catch (err) {
      console.error("Error fetching tests:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateTest() {
    const title = prompt("Nombre del nuevo test:");
    if (!title) return;
    try {
      const res = await fetch("/api/tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (res.ok) {
        await fetchTests();
      }
    } catch (err) {
      console.error("Error creating test:", err);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-[var(--text-muted)]">Cargando tests...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">Tests</h1>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex bg-[var(--bg-tertiary)] rounded-md p-0.5">
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1 text-xs rounded ${
                viewMode === "table"
                  ? "bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-sm"
                  : "text-[var(--text-muted)]"
              }`}
            >
              Tabla
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={`px-3 py-1 text-xs rounded ${
                viewMode === "kanban"
                  ? "bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-sm"
                  : "text-[var(--text-muted)]"
              }`}
            >
              Kanban
            </button>
          </div>
          <button
            onClick={handleCreateTest}
            className="px-4 py-2 text-sm bg-[var(--accent)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-colors"
          >
            + Nuevo Test
          </button>
        </div>
      </div>

      {tests.length === 0 ? (
        <div className="text-center py-12 text-[var(--text-muted)]">
          <p className="text-lg mb-1">No hay tests todavia</p>
          <p className="text-sm">
            Crea un test nuevo o converti una hipotesis desde Triage.
          </p>
        </div>
      ) : viewMode === "kanban" ? (
        /* Kanban View */
        <div className="grid grid-cols-4 gap-4">
          {columns.map((status) => (
            <div key={status} className="min-h-[200px]">
              <div className="flex items-center gap-2 mb-3">
                <span>{statusConfig[status].badge}</span>
                <h3 className="text-sm font-medium text-[var(--text-secondary)]">
                  {statusConfig[status].label}
                </h3>
                <span className="text-xs text-[var(--text-muted)]">
                  {tests.filter((t) => t.status === status).length}
                </span>
              </div>
              <div className="space-y-2">
                {tests
                  .filter((t) => t.status === status)
                  .map((test) => (
                    <div
                      key={test.id}
                      onClick={() => setSelectedTest(test)}
                      className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-primary)] p-3 cursor-pointer hover:border-[var(--border-secondary)] transition-colors"
                    >
                      <p className="text-sm font-medium text-[var(--text-primary)]">
                        {test.title}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs px-2 py-0.5 bg-[var(--bg-tertiary)] rounded text-[var(--text-secondary)]">
                          {test.vertical}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-[var(--bg-tertiary)] rounded text-[var(--text-secondary)]">
                          {test.platform}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-primary)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-primary)] bg-[var(--bg-tertiary)]">
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--text-muted)] uppercase">
                  Nombre
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--text-muted)] uppercase">
                  Estado
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--text-muted)] uppercase">
                  Vertical
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--text-muted)] uppercase">
                  Plataforma
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--text-muted)] uppercase">
                  Metrica
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--text-muted)] uppercase">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr
                  key={test.id}
                  onClick={() => setSelectedTest(test)}
                  className="border-b border-[var(--border-secondary)] cursor-pointer hover:bg-[var(--bg-hover)] transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-[var(--text-primary)]">
                    {test.title}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border ${statusConfig[test.status].color}`}
                    >
                      {statusConfig[test.status].badge}{" "}
                      {statusConfig[test.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{test.vertical}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{test.platform}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">
                    {test.successMetric}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{test.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Side Panel */}
      {selectedTest && (
        <div className="fixed top-0 right-0 w-[400px] h-screen bg-[var(--bg-secondary)] border-l border-[var(--border-primary)] shadow-lg z-50 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              {selectedTest.title}
            </h2>
            <button
              onClick={() => setSelectedTest(null)}
              className="p-1 hover:bg-[var(--bg-hover)] rounded text-[var(--text-muted)]"
            >
              ✕
            </button>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <span className="text-xs font-medium text-[var(--text-muted)]">Estado</span>
              <p className="text-[var(--text-primary)]">
                {statusConfig[selectedTest.status].badge}{" "}
                {statusConfig[selectedTest.status].label}
              </p>
            </div>
            <div>
              <span className="text-xs font-medium text-[var(--text-muted)]">
                Hipotesis
              </span>
              <p className="text-[var(--text-secondary)]">{selectedTest.hypothesis}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-xs font-medium text-[var(--text-muted)]">
                  Vertical
                </span>
                <p className="text-[var(--text-secondary)]">{selectedTest.vertical}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-[var(--text-muted)]">
                  Plataforma
                </span>
                <p className="text-[var(--text-secondary)]">{selectedTest.platform}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-[var(--text-muted)]">
                  Metrica de exito
                </span>
                <p className="text-[var(--text-secondary)]">{selectedTest.successMetric}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-[var(--text-muted)]">
                  Umbral
                </span>
                <p className="text-[var(--text-secondary)]">
                  {selectedTest.victoryThreshold}
                </p>
              </div>
            </div>
            <button className="w-full py-2 text-sm border border-[var(--border-primary)] rounded-md text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors">
              Expandir →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
