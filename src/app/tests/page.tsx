"use client";

import { useState } from "react";
import type { Test, TestStatus, ViewMode } from "@/types";

const statusConfig: Record<
  TestStatus,
  { label: string; badge: string; color: string }
> = {
  backlog: { label: "Backlog", badge: "🔴", color: "bg-red-50 text-red-700 border-red-200" },
  active: { label: "Activo", badge: "🟡", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  done: { label: "Completado", badge: "✅", color: "bg-green-50 text-green-700 border-green-200" },
  discarded: { label: "Descartado", badge: "❌", color: "bg-gray-50 text-gray-500 border-gray-200" },
};

const columns: TestStatus[] = ["backlog", "active", "done", "discarded"];

export default function TestsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [tests] = useState<Test[]>([]);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Tests</h1>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-md p-0.5">
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1 text-xs rounded ${
                viewMode === "table"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Tabla
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={`px-3 py-1 text-xs rounded ${
                viewMode === "kanban"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Kanban
            </button>
          </div>
          <button className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
            + Nuevo Test
          </button>
        </div>
      </div>

      {tests.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg mb-1">No hay tests todavía</p>
          <p className="text-sm">
            Creá un test nuevo o convertí una hipótesis desde Triage.
          </p>
        </div>
      ) : viewMode === "kanban" ? (
        /* Kanban View */
        <div className="grid grid-cols-4 gap-4">
          {columns.map((status) => (
            <div key={status} className="min-h-[200px]">
              <div className="flex items-center gap-2 mb-3">
                <span>{statusConfig[status].badge}</span>
                <h3 className="text-sm font-medium text-gray-700">
                  {statusConfig[status].label}
                </h3>
                <span className="text-xs text-gray-400">
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
                      className="bg-white rounded-lg border border-gray-200 p-3 cursor-pointer hover:border-gray-300 transition-colors"
                    >
                      <p className="text-sm font-medium text-gray-900">
                        {test.title}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600">
                          {test.vertical}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600">
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
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Nombre
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Estado
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Vertical
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Plataforma
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Métrica
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr
                  key={test.id}
                  onClick={() => setSelectedTest(test)}
                  className="border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
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
                  <td className="px-4 py-3 text-gray-600">{test.vertical}</td>
                  <td className="px-4 py-3 text-gray-600">{test.platform}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {test.successMetric}
                  </td>
                  <td className="px-4 py-3 text-gray-400">{test.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Side Panel */}
      {selectedTest && (
        <div className="fixed top-0 right-0 w-[400px] h-screen bg-white border-l border-gray-200 shadow-lg z-50 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedTest.title}
            </h2>
            <button
              onClick={() => setSelectedTest(null)}
              className="p-1 hover:bg-gray-100 rounded text-gray-400"
            >
              ✕
            </button>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <span className="text-xs font-medium text-gray-500">Estado</span>
              <p>
                {statusConfig[selectedTest.status].badge}{" "}
                {statusConfig[selectedTest.status].label}
              </p>
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500">
                Hipótesis
              </span>
              <p className="text-gray-700">{selectedTest.hypothesis}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-xs font-medium text-gray-500">
                  Vertical
                </span>
                <p className="text-gray-700">{selectedTest.vertical}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-gray-500">
                  Plataforma
                </span>
                <p className="text-gray-700">{selectedTest.platform}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-gray-500">
                  Métrica de éxito
                </span>
                <p className="text-gray-700">{selectedTest.successMetric}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-gray-500">
                  Umbral
                </span>
                <p className="text-gray-700">
                  {selectedTest.victoryThreshold}
                </p>
              </div>
            </div>
            <button className="w-full py-2 text-sm border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
              Expandir →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
