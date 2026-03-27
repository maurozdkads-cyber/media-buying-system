"use client";

import { useState, useEffect, useCallback } from "react";
import type { KBEntry, KBCategory, Platform, Vertical, Confidence } from "@/types";

const categoryLabels: Record<KBCategory, string> = {
  audiencias: "Audiencias",
  configuraciones: "Configuraciones",
  creativos: "Creativos",
  copies_ctas: "Copies & CTAs",
  landing_pages: "Landing Pages",
};

const confidenceBadge: Record<Confidence, { label: string; color: string }> = {
  high: { label: "🟢 Alta", color: "text-emerald-400" },
  medium: { label: "🟡 Media", color: "text-yellow-400" },
  low: { label: "🔴 Baja", color: "text-red-400" },
};

export default function KBPage() {
  const [entries, setEntries] = useState<KBEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "" as KBCategory | "",
    platform: "" as Platform | "",
    vertical: "" as Vertical | "",
    confidence: "" as Confidence | "",
  });

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.category) params.set("category", filters.category);
      if (filters.platform) params.set("platform", filters.platform);
      if (filters.vertical) params.set("vertical", filters.vertical);
      if (filters.confidence) params.set("confidence", filters.confidence);

      const queryString = params.toString();
      const url = `/api/kb${queryString ? `?${queryString}` : ""}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      }
    } catch (err) {
      console.error("Error fetching KB entries:", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">Knowledge Base</h1>
        <button className="px-4 py-2 text-sm bg-[var(--accent)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-colors">
          + Nuevo Aprendizaje
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              category: e.target.value as KBCategory | "",
            }))
          }
          className="text-sm bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        >
          <option value="">Todas las categorias</option>
          {Object.entries(categoryLabels).map(([val, label]) => (
            <option key={val} value={val}>
              {label}
            </option>
          ))}
        </select>

        <select
          value={filters.platform}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              platform: e.target.value as Platform | "",
            }))
          }
          className="text-sm bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        >
          <option value="">Todas las plataformas</option>
          <option value="meta">Meta</option>
          <option value="tiktok">TikTok</option>
          <option value="google">Google</option>
          <option value="native">Native</option>
        </select>

        <select
          value={filters.vertical}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              vertical: e.target.value as Vertical | "",
            }))
          }
          className="text-sm bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        >
          <option value="">Todas las verticales</option>
          <option value="auto_insurance">Auto Insurance</option>
          <option value="glp1">GLP-1</option>
          <option value="debt_relief">Debt Relief</option>
          <option value="aca">ACA</option>
        </select>

        <select
          value={filters.confidence}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              confidence: e.target.value as Confidence | "",
            }))
          }
          className="text-sm bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        >
          <option value="">Toda confianza</option>
          <option value="high">🟢 Alta</option>
          <option value="medium">🟡 Media</option>
          <option value="low">🔴 Baja</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-[var(--text-muted)]">Cargando...</p>
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-12 text-[var(--text-muted)]">
          <p className="text-lg mb-1">Knowledge Base vacia</p>
          <p className="text-sm">
            Los aprendizajes se generan al completar tests o se crean
            manualmente.
          </p>
        </div>
      ) : (
        <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-primary)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-primary)] bg-[var(--bg-tertiary)]">
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--text-muted)] uppercase">
                  Aprendizaje
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--text-muted)] uppercase">
                  Categoria
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--text-muted)] uppercase">
                  Plataforma
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--text-muted)] uppercase">
                  Vertical
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--text-muted)] uppercase">
                  Confianza
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--text-muted)] uppercase">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-[var(--border-secondary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3 font-medium text-[var(--text-primary)] max-w-xs truncate">
                    {entry.title}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">
                    {categoryLabels[entry.category]}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{entry.platform}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{entry.vertical}</td>
                  <td className="px-4 py-3">
                    <span className={confidenceBadge[entry.confidence].color}>
                      {confidenceBadge[entry.confidence].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">
                    {entry.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
