"use client";

import { useState, useEffect } from "react";

function getWeekStart(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Monday = 1
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  const year = monday.getFullYear();
  const month = String(monday.getMonth() + 1).padStart(2, "0");
  const date = String(monday.getDate()).padStart(2, "0");
  return `${year}-${month}-${date}`;
}

export default function WeeklyPlanCard() {
  const weekStart = getWeekStart();

  const [plan, setPlan] = useState({
    weekFocus: "",
    profitFocus: "",
    strategicTest: "",
    operationalLines: "",
    dependencies: "",
    doNotTouch: "",
    tentativeSequence: "",
  });
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadPlan() {
      try {
        const res = await fetch(`/api/weekly-plans/${weekStart}`);
        if (res.ok) {
          const data = await res.json();
          setPlan({
            weekFocus: data.weekFocus || "",
            profitFocus: data.profitFocus || "",
            strategicTest: data.strategicTest || "",
            operationalLines: data.operationalLines || "",
            dependencies: data.dependencies || "",
            doNotTouch: data.doNotTouch || "",
            tentativeSequence: data.tentativeSequence || "",
          });
        }
      } catch (err) {
        console.error("Error loading weekly plan:", err);
      } finally {
        setLoaded(true);
      }
    }
    loadPlan();
  }, [weekStart]);

  async function handleSave() {
    setSaving(true);
    try {
      await fetch("/api/weekly-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weekStart, ...plan }),
      });
    } catch (err) {
      console.error("Error saving weekly plan:", err);
    } finally {
      setSaving(false);
    }
  }

  const fields = [
    { key: "weekFocus", label: "Foco principal de la semana" },
    { key: "profitFocus", label: "Foco profit" },
    { key: "strategicTest", label: "Test estrategico activo" },
    { key: "operationalLines", label: "Lineas operativas (1-2)" },
    { key: "dependencies", label: "Dependencias" },
    { key: "doNotTouch", label: "NO tocar esta semana" },
    { key: "tentativeSequence", label: "Secuencia tentativa" },
  ] as const;

  return (
    <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-primary)] p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-[var(--text-primary)]">Plan Semanal</h2>
        <span className="text-xs text-[var(--text-muted)]">Semana del {weekStart}</span>
      </div>

      {!loaded ? (
        <p className="text-sm text-[var(--text-muted)] py-4">Cargando...</p>
      ) : (
        <>
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

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-4 w-full py-2 text-sm bg-[var(--accent)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar plan"}
          </button>
        </>
      )}
    </div>
  );
}
