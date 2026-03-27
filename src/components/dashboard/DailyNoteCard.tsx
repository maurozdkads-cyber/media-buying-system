"use client";

import { useState, useEffect } from "react";

function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function DailyNoteCard() {
  const todayStr = getTodayDateString();
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
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadNote() {
      try {
        const res = await fetch(`/api/daily-notes/${todayStr}`);
        if (res.ok) {
          const data = await res.json();
          setNote({
            activeItems: data.activeItems || "",
            decisions: data.decisions || "",
            learnings: data.learnings || "",
            tomorrowProfitFocus: data.tomorrowProfitFocus || "",
            tomorrowTestFocus: data.tomorrowTestFocus || "",
            tomorrowDependency: data.tomorrowDependency || "",
            tomorrowSuccessCriterion: data.tomorrowSuccessCriterion || "",
          });
        }
      } catch (err) {
        console.error("Error loading daily note:", err);
      } finally {
        setLoaded(true);
      }
    }
    loadNote();
  }, [todayStr]);

  async function handleSave() {
    setSaving(true);
    try {
      await fetch("/api/daily-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: todayStr, ...note }),
      });
    } catch (err) {
      console.error("Error saving daily note:", err);
    } finally {
      setSaving(false);
    }
  }

  const fields = [
    { key: "activeItems", label: "Que esta activo hoy" },
    { key: "decisions", label: "Decisiones tomadas" },
    { key: "learnings", label: "Que aprendimos" },
    { key: "tomorrowProfitFocus", label: "Foco profit manana" },
    { key: "tomorrowTestFocus", label: "Foco test manana" },
    { key: "tomorrowDependency", label: "Dependencia/pedido" },
    { key: "tomorrowSuccessCriterion", label: "Criterio de exito" },
  ] as const;

  return (
    <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-primary)] p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-[var(--text-primary)]">Nota del Dia</h2>
        <span className="text-xs text-[var(--text-muted)]">{today}</span>
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

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-4 w-full py-2 text-sm bg-[var(--accent)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar nota"}
          </button>
        </>
      )}
    </div>
  );
}
