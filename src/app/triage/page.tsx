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
  { value: "pipeline_dependencias", label: "Pipeline / Dependencias" },
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

export default function TriagePage() {
  const [checkedQuestions, setCheckedQuestions] = useState<boolean[]>(
    new Array(triageQuestions.length).fill(false)
  );

  function toggleQuestion(index: number) {
    setCheckedQuestions((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Triage</h1>

      {/* Triage Questions Reference */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <h3 className="text-xs font-semibold text-amber-800 mb-2 uppercase">
          Preguntas de triage
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {triageQuestions.map((q, i) => (
            <label
              key={i}
              className="flex items-center gap-2 text-sm text-amber-900 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={checkedQuestions[i]}
                onChange={() => toggleQuestion(i)}
                className="rounded border-amber-300"
              />
              {q}
            </label>
          ))}
        </div>
      </div>

      {/* Empty state */}
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg mb-1">No hay inputs para clasificar</p>
        <p className="text-sm">
          Los inputs llegan desde el Inbox cuando los movés a Triage.
        </p>
      </div>

      {/* Selectors reference for future items */}
      <div className="hidden">
        {typeOptions.map((t) => (
          <span key={t.value}>{t.label}</span>
        ))}
        {bucketOptions.map((b) => (
          <span key={b.value}>{b.label}</span>
        ))}
        {priorityOptions.map((p) => (
          <span key={p.value}>{p.label}</span>
        ))}
      </div>
    </div>
  );
}
