"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface TriageItem {
  id: string;
  text: string;
  source: string;
  date: string;
  context: string;
  type: string | null;
  bucket: string | null;
  priority: string | null;
}

const typeOptions = [
  { value: "tarea", label: "Tarea" },
  { value: "hipotesis", label: "Hipótesis" },
  { value: "dependencia", label: "Dependencia" },
  { value: "idea", label: "Idea" },
  { value: "urgencia", label: "Urgencia" },
];

const bucketOptions = [
  { value: "protect_profit", label: "Protect Profit" },
  { value: "testing_operativo", label: "Testing Operativo" },
  { value: "rd_estrategico", label: "R&D Estratégico" },
  { value: "pipeline_dependencias", label: "Pipeline" },
];

const priorityOptions = [
  { value: "hoy", label: "Hoy" },
  { value: "esta_semana", label: "Esta semana" },
  { value: "backlog", label: "Backlog" },
  { value: "estacionado", label: "Estacionado" },
];

const triageQuestions = [
  "¿Esto protege profit actual?",
  "¿Esto mueve resultados pronto?",
  "¿Esto depende de mí?",
  "¿Esto se puede aislar bien?",
  "¿Esto genera framework reutilizable?",
  "¿Esto compite con algo más importante?",
];

const hypothesisCriteria = [
  "Hay una variable atacable clara",
  "Hay una métrica a observar",
  "Hay un contexto concreto",
  "Se puede aislar razonablemente",
  "Vale la pena consumir capacidad semanal",
];

function PillSelector({ options, value, onChange }: {
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1 text-xs rounded-full border transition-colors ${
            value === opt.value
              ? "bg-[var(--accent)] border-[var(--accent)] text-white"
              : "border-[var(--border-primary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function TriagePage() {
  const router = useRouter();
  const [items, setItems] = useState<TriageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selections, setSelections] = useState<Record<string, { type: string | null; bucket: string | null; priority: string | null }>>({});
  const [convertingId, setConvertingId] = useState<string | null>(null);
  const [criteriaChecked, setCriteriaChecked] = useState<boolean[]>(new Array(5).fill(false));

  const fetchItems = useCallback(async () => {
    const res = await fetch("/api/inputs?status=triaged");
    const data = await res.json();
    setItems(data);
    const sel: typeof selections = {};
    data.forEach((item: TriageItem) => {
      sel[item.id] = { type: item.type, bucket: item.bucket, priority: item.priority };
    });
    setSelections(sel);
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  function updateSelection(id: string, field: string, value: string) {
    setSelections((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: prev[id]?.[field as keyof typeof prev[typeof id]] === value ? null : value },
    }));
  }

  async function handleSave(id: string) {
    const sel = selections[id];
    if (!sel?.type || !sel?.bucket || !sel?.priority) return;
    await fetch(`/api/inputs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sel),
    });
    fetchItems();
  }

  async function handleConvert(id: string) {
    await fetch(`/api/inputs/${id}/convert`, { method: "POST" });
    setConvertingId(null);
    setCriteriaChecked(new Array(5).fill(false));
    fetchItems();
    router.push("/tests");
  }

  async function handleArchive(id: string) {
    await fetch(`/api/inputs/${id}`, { method: "DELETE" });
    fetchItems();
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Triage</h1>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6">
        <h3 className="text-xs font-semibold text-amber-300 mb-2 uppercase">Preguntas de triage</h3>
        <div className="grid grid-cols-2 gap-2">
          {triageQuestions.map((q, i) => (
            <p key={i} className="text-sm text-amber-200/70">{q}</p>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[var(--text-muted)]">Cargando...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-[var(--text-muted)]">
          <p className="text-lg mb-1">No hay inputs para clasificar</p>
          <p className="text-sm">Los inputs llegan desde el Inbox cuando los movés a Triage.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => {
            const sel = selections[item.id] || { type: null, bucket: null, priority: null };
            const isConverting = convertingId === item.id;
            const allCriteriaMet = criteriaChecked.every(Boolean);

            return (
              <div key={item.id} className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-primary)] p-5">
                <div className="mb-4">
                  <p className="text-sm text-[var(--text-primary)] font-medium">{item.text}</p>
                  <div className="flex gap-3 mt-1">
                    {item.source && <span className="text-xs text-[var(--text-muted)]">Fuente: {item.source}</span>}
                    <span className="text-xs text-[var(--text-muted)]">{item.date}</span>
                    {item.context && <span className="text-xs text-[var(--text-muted)]">— {item.context}</span>}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Tipo</label>
                    <PillSelector options={typeOptions} value={sel.type} onChange={(v) => updateSelection(item.id, "type", v)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Bucket</label>
                    <PillSelector options={bucketOptions} value={sel.bucket} onChange={(v) => updateSelection(item.id, "bucket", v)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Prioridad</label>
                    <PillSelector options={priorityOptions} value={sel.priority} onChange={(v) => updateSelection(item.id, "priority", v)} />
                  </div>
                </div>

                {sel.type === "hipotesis" && !isConverting && (
                  <button
                    onClick={() => { setConvertingId(item.id); setCriteriaChecked(new Array(5).fill(false)); }}
                    className="mt-4 px-4 py-2 text-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md hover:bg-emerald-500/20 transition-colors"
                  >
                    Convertir a Hipótesis →
                  </button>
                )}

                {isConverting && (
                  <div className="mt-4 bg-[var(--bg-tertiary)] rounded-lg p-4 border border-[var(--border-primary)]">
                    <p className="text-xs font-medium text-[var(--text-muted)] mb-2 uppercase">Criterios para hipótesis</p>
                    <div className="space-y-2">
                      {hypothesisCriteria.map((c, i) => (
                        <label key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={criteriaChecked[i]}
                            onChange={() => setCriteriaChecked((prev) => { const n = [...prev]; n[i] = !n[i]; return n; })}
                            className="rounded"
                          />
                          {c}
                        </label>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleConvert(item.id)}
                        disabled={!allCriteriaMet}
                        className={`px-4 py-2 text-sm rounded-md transition-colors ${
                          allCriteriaMet
                            ? "bg-emerald-600 text-white hover:bg-emerald-500"
                            : "bg-[var(--bg-hover)] text-[var(--text-muted)] cursor-not-allowed"
                        }`}
                      >
                        Confirmar conversión
                      </button>
                      <button onClick={() => setConvertingId(null)} className="px-4 py-2 text-sm text-[var(--text-secondary)]">
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--border-primary)]/50">
                  <button
                    onClick={() => handleSave(item.id)}
                    disabled={!sel.type || !sel.bucket || !sel.priority}
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${
                      sel.type && sel.bucket && sel.priority
                        ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
                        : "bg-[var(--bg-hover)] text-[var(--text-muted)] cursor-not-allowed"
                    }`}
                  >
                    Guardar clasificación
                  </button>
                  <button
                    onClick={() => handleArchive(item.id)}
                    className="px-4 py-2 text-sm text-red-400/70 hover:text-red-400 transition-colors"
                  >
                    Archivar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
