"use client";

import { useState } from "react";

export default function DailyNoteCard() {
  const today = new Date().toLocaleDateString("es-AR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [note, setNote] = useState({
    activeItems: "",
    decisions: "",
    learnings: "",
    tomorrowProfitFocus: "",
    tomorrowTestFocus: "",
    tomorrowDependency: "",
    tomorrowSuccessCriterion: "",
  });

  const fields = [
    { key: "activeItems", label: "Qué está activo hoy" },
    { key: "decisions", label: "Decisiones tomadas" },
    { key: "learnings", label: "Qué aprendimos" },
    { key: "tomorrowProfitFocus", label: "Foco profit mañana" },
    { key: "tomorrowTestFocus", label: "Foco test mañana" },
    { key: "tomorrowDependency", label: "Dependencia/pedido" },
    { key: "tomorrowSuccessCriterion", label: "Criterio de éxito" },
  ] as const;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900">Nota del Día</h2>
        <span className="text-xs text-gray-500">{today}</span>
      </div>

      <div className="space-y-3">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              {field.label}
            </label>
            <textarea
              value={note[field.key]}
              onChange={(e) =>
                setNote((prev) => ({ ...prev, [field.key]: e.target.value }))
              }
              rows={2}
              className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none"
              placeholder={`${field.label}...`}
            />
          </div>
        ))}
      </div>

      <button className="mt-4 w-full py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
        Guardar nota
      </button>
    </div>
  );
}
