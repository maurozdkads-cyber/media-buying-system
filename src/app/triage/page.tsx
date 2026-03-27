"use client";

import { useState } from "react";
import type { InputType, Bucket, Priority } from "@/types";

const typeOptions: { value: InputType; label: string }[] = [
  { value: "tarea", label: "Tarea" },
  { value: "hipotesis", label: "Hipótesis" },
  { value: "dependencia", label: "Dependencia" },
  { value: "idea", label: "Idea" },
  { value: "urgencia", label: "Urgencia" },
];

const bucketOptions: { value: Bucket; label: string }[] = [
  { value: "protect_profit", label: "Protect Profit" },
  { value: "testing_operativo", label: "Testing Operativo" },
  { value: "rd_estrategico", label: "R&D Estratégico" },
  { value: "pipeline_dependencias", label: "Pipeline" },
];

const priorityOptions: { value: Priority; label: string }[] = [
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
  "Tiene variable clara a testear",
  "Tiene métrica de éxito definida",
  "Tiene umbral de victoria",
  "Se puede aislar de otros cambios",
  "Tiene tiempo estimado de lectura",
];

interface TriageItem {
  id: string;
  text: string;
  type: InputType | null;
  bucket: Bucket | null;
  priority: Priority | null;
  convertingToHypothesis: boolean;
  hypothesisChecks: boolean[];
}

export default function TriagePage() {
  const [checkedQuestions, setCheckedQuestions] = useState<boolean[]>(
    new Array(triageQuestions.length).fill(false)
  );

  // Sample item for demonstration - in production this comes from inbox
  const [items, setItems] = useState<TriageItem[]>([]);

  function toggleQuestion(index: number) {
    setCheckedQuestions((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }

  function updateItem(id: string, updates: Partial<TriageItem>) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  }

  function toggleHypothesisCheck(id: string, index: number) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const next = [...item.hypothesisChecks];
        next[index] = !next[index];
        return { ...item, hypothesisChecks: next };
      })
    );
  }

  function archiveItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Triage</h1>

      {/* Triage Questions Reference */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6">
        <h3 className="text-xs font-semibold text-amber-300 mb-2 uppercase">
          Preguntas de triage
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {triageQuestions.map((q, i) => (
            <label
              key={i}
              className="flex items-center gap-2 text-sm text-amber-300 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={checkedQuestions[i]}
                onChange={() => toggleQuestion(i)}
                className="rounded border-amber-500/30 bg-amber-500/5 text-amber-400 focus:ring-amber-500/30"
              />
              {q}
            </label>
          ))}
        </div>
      </div>

      {/* Triage Items */}
      {items.length === 0 ? (
        <div className="text-center py-12 text-[var(--text-muted)]">
          <p className="text-lg mb-1">No hay inputs para clasificar</p>
          <p className="text-sm">
            Los inputs llegan desde el Inbox cuando los movés a Triage.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-primary)] p-5"
            >
              {/* Input text */}
              <p className="text-sm text-[var(--text-primary)] mb-4 font-medium">
                {item.text}
              </p>

              {/* Type selector */}
              <div className="mb-3">
                <span className="text-xs font-medium text-[var(--text-muted)] mb-1.5 block">
                  Tipo
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {typeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        updateItem(item.id, {
                          type: item.type === opt.value ? null : opt.value,
                          convertingToHypothesis: false,
                          hypothesisChecks: new Array(hypothesisCriteria.length).fill(false),
                        })
                      }
                      className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                        item.type === opt.value
                          ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                          : "border-[var(--border-primary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bucket selector */}
              <div className="mb-3">
                <span className="text-xs font-medium text-[var(--text-muted)] mb-1.5 block">
                  Bucket
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {bucketOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        updateItem(item.id, {
                          bucket: item.bucket === opt.value ? null : opt.value,
                        })
                      }
                      className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                        item.bucket === opt.value
                          ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                          : "border-[var(--border-primary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority selector */}
              <div className="mb-4">
                <span className="text-xs font-medium text-[var(--text-muted)] mb-1.5 block">
                  Prioridad
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {priorityOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        updateItem(item.id, {
                          priority: item.priority === opt.value ? null : opt.value,
                        })
                      }
                      className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                        item.priority === opt.value
                          ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                          : "border-[var(--border-primary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Convert to Hypothesis button (only when type is hipotesis) */}
              {item.type === "hipotesis" && !item.convertingToHypothesis && (
                <button
                  onClick={() =>
                    updateItem(item.id, { convertingToHypothesis: true })
                  }
                  className="mb-4 px-4 py-2 text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md hover:bg-indigo-500/20 transition-colors"
                >
                  Convertir a Hipótesis
                </button>
              )}

              {/* Hypothesis criteria checklist */}
              {item.type === "hipotesis" && item.convertingToHypothesis && (
                <div className="mb-4 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-lg p-4">
                  <h4 className="text-xs font-semibold text-[var(--text-secondary)] mb-2 uppercase">
                    Criterios de hipótesis
                  </h4>
                  <div className="space-y-2">
                    {hypothesisCriteria.map((criterion, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-2 text-sm text-[var(--text-secondary)] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={item.hypothesisChecks[i]}
                          onChange={() => toggleHypothesisCheck(item.id, i)}
                          className="rounded border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--accent)] focus:ring-[var(--accent)]"
                        />
                        {criterion}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => archiveItem(item.id)}
                  className="px-4 py-2 text-sm border border-[var(--border-primary)] text-[var(--text-muted)] rounded-md hover:bg-[var(--bg-hover)] transition-colors"
                >
                  Archivar
                </button>
                <button className="px-4 py-2 text-sm bg-[var(--accent)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-colors">
                  Guardar clasificación
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
