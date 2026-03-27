"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface InputItem {
  id: string;
  text: string;
  source: string;
  date: string;
  context: string;
  link: string;
  status: string;
  createdAt: string;
}

function InboxContent() {
  const searchParams = useSearchParams();
  const showNewForm = searchParams.get("new") === "true";

  const [inputs, setInputs] = useState<InputItem[]>([]);
  const [isAdding, setIsAdding] = useState(showNewForm);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ text: "", source: "", context: "", link: "" });

  const fetchInputs = useCallback(async () => {
    const res = await fetch("/api/inputs?status=inbox");
    const data = await res.json();
    setInputs(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchInputs(); }, [fetchInputs]);

  async function handleAdd() {
    if (!form.text.trim()) return;
    await fetch("/api/inputs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, date: new Date().toISOString().split("T")[0] }),
    });
    setForm({ text: "", source: "", context: "", link: "" });
    setIsAdding(false);
    fetchInputs();
  }

  async function handleMoveToTriage(id: string) {
    await fetch(`/api/inputs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "triaged" }),
    });
    fetchInputs();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">Inbox</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 text-sm bg-[var(--accent)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-colors"
        >
          + Nuevo Input
        </button>
      </div>

      {isAdding && (
        <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-primary)] p-5 mb-6">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Input *</label>
              <input
                type="text"
                value={form.text}
                onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                className="w-full text-sm bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] rounded-md px-3 py-2"
                placeholder="¿Qué idea, tarea o hipótesis querés capturar?"
                autoFocus
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: "source", label: "Fuente", placeholder: "Ej: observación, ads library..." },
                { key: "context", label: "Contexto", placeholder: "Contexto mínimo..." },
                { key: "link", label: "Link", placeholder: "URL opcional..." },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">{f.label}</label>
                  <input
                    type="text"
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full text-sm bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] rounded-md px-3 py-2"
                    placeholder={f.placeholder}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleAdd} className="px-4 py-2 text-sm bg-[var(--accent)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-colors">
              Guardar
            </button>
            <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-[var(--text-muted)]">Cargando...</div>
      ) : inputs.length === 0 ? (
        <div className="text-center py-12 text-[var(--text-muted)]">
          <p className="text-lg mb-1">Inbox vacío</p>
          <p className="text-sm">Capturá ideas, tareas o hipótesis sin comprometerte.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {inputs.map((input) => (
            <div key={input.id} className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-primary)] px-4 py-3 flex items-center justify-between hover:border-[var(--accent)]/30 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--text-primary)]">{input.text}</p>
                <div className="flex gap-3 mt-1">
                  {input.source && <span className="text-xs text-[var(--text-muted)]">Fuente: {input.source}</span>}
                  <span className="text-xs text-[var(--text-muted)]">{input.date}</span>
                </div>
              </div>
              <button
                onClick={() => handleMoveToTriage(input.id)}
                className="ml-3 px-3 py-1.5 text-xs border border-[var(--border-primary)] rounded-md text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors flex-shrink-0"
              >
                → Triage
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function InboxPage() {
  return (
    <Suspense fallback={<div className="p-6 text-[var(--text-muted)]">Cargando...</div>}>
      <InboxContent />
    </Suspense>
  );
}
