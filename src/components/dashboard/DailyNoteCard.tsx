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
    <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-primary)] p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-[var(--text-primary)]">Nota del Día</h2>
        <span className="text-xs text-[var(--text-muted)]">{today}</span>
      </div>

      <div className="space-y-3">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
              {field.label}
            </label>
            <textarea
              value={note[field.key]}
              onChange={(e) =>
                setNote((prev) => ({ ...prev, [field.key]: e.target.value }))
              }
              rows={2}
              className="w-full text-sm bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--accent)] resize-none"
              placeholder={`${field.label}...`}
            />
          </div>
        ))}
      </div>

      <button className="mt-4 w-full py-2 text-sm bg-[var(--accent)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-colors">
        Guardar nota
      </button>
    </div>
  );
}
