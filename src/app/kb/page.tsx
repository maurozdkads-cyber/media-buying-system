"use client";

import { useState } from "react";
import type { KBEntry, KBCategory, Platform, Vertical, Confidence } from "@/types";

const categoryLabels: Record<KBCategory, string> = {
  audiencias: "Audiencias",
  configuraciones: "Configuraciones",
  creativos: "Creativos",
  copies_ctas: "Copies & CTAs",
  landing_pages: "Landing Pages",
};

const confidenceBadge: Record<Confidence, { label: string; color: string }> = {
  high: { label: "🟢 Alta", color: "text-green-700" },
  medium: { label: "🟡 Media", color: "text-yellow-700" },
  low: { label: "🔴 Baja", color: "text-red-700" },
};

export default function KBPage() {
  const [entries] = useState<KBEntry[]>([]);
  const [filters, setFilters] = useState({
    category: "" as KBCategory | "",
    platform: "" as Platform | "",
    vertical: "" as Vertical | "",
    confidence: "" as Confidence | "",
  });

  const filteredEntries = entries.filter((e) => {
    if (filters.category && e.category !== filters.category) return false;
    if (filters.platform && e.platform !== filters.platform) return false;
    if (filters.vertical && e.vertical !== filters.vertical) return false;
    if (filters.confidence && e.confidence !== filters.confidence) return false;
    return true;
  });

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Knowledge Base</h1>
        <button className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
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
          className="text-sm border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
        >
          <option value="">Todas las categorías</option>
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
          className="text-sm border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
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
          className="text-sm border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
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
          className="text-sm border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
        >
          <option value="">Toda confianza</option>
          <option value="high">🟢 Alta</option>
          <option value="medium">🟡 Media</option>
          <option value="low">🔴 Baja</option>
        </select>
      </div>

      {/* Table */}
      {filteredEntries.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg mb-1">Knowledge Base vacía</p>
          <p className="text-sm">
            Los aprendizajes se generan al completar tests o se crean
            manualmente.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Aprendizaje
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Categoría
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Plataforma
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Vertical
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Confianza
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3 font-medium text-gray-900 max-w-xs truncate">
                    {entry.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {categoryLabels[entry.category]}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{entry.platform}</td>
                  <td className="px-4 py-3 text-gray-600">{entry.vertical}</td>
                  <td className="px-4 py-3">
                    <span className={confidenceBadge[entry.confidence].color}>
                      {confidenceBadge[entry.confidence].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
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
