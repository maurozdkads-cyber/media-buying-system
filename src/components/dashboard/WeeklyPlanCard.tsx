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
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900">Plan Semanal</h2>
        <span className="text-xs text-gray-500">Semana actual</span>
      </div>

      <div className="space-y-3">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              {field.label}
            </label>
            <textarea
              value={plan[field.key]}
              onChange={(e) =>
                setPlan((prev) => ({ ...prev, [field.key]: e.target.value }))
              }
              rows={2}
              className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none"
              placeholder={`${field.label}...`}
            />
          </div>
        ))}
      </div>

      <button className="mt-4 w-full py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
        Guardar plan
      </button>
    </div>
  );
}
