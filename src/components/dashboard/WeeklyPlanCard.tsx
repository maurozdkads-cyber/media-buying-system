"use client";

import { useState } from "react";

export default function WeeklyPlanCard() {
  const [plan, setPlan] = useState({
    weekFocus: "",
    profitFocus: "",
    strategicTest: "",
    operationalLines: "",
    dependencies: "",
    doNotTouch: "",
    tentativeSequence: "",
  });

  const fields = [
    { key: "weekFocus", label: "Foco principal de la semana" },
    { key: "profitFocus", label: "Foco profit" },
    { key: "strategicTest", label: "Test estratégico activo" },
    { key: "operationalLines", label: "Líneas operativas (1-2)" },
    { key: "dependencies", label: "Dependencias" },
    { key: "doNotTouch", label: "NO tocar esta semana" },
    { key: "tentativeSequence", label: "Secuencia tentativa" },
  ] as const;

  return (
    <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-primary)] p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-[var(--text-primary)]">Plan Semanal</h2>
        <span className="text-xs text-[var(--text-muted)]">Semana actual</span>
      </div>

      <div className="space-y-3">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
              {field.label}
            </label>
            <textarea
              value={plan[field.key]}
              onChange={(e) =>
                setPlan((prev) => ({ ...prev, [field.key]: e.target.value }))
              }
              rows={2}
              className="w-full text-sm bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--accent)] resize-none"
              placeholder={`${field.label}...`}
            />
          </div>
        ))}
      </div>

      <button className="mt-4 w-full py-2 text-sm bg-[var(--accent)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-colors">
        Guardar plan
      </button>
    </div>
  );
}
