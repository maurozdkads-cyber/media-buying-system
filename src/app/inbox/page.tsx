"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { Input, InputStatus } from "@/types";

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function InboxContent() {
  const searchParams = useSearchParams();
  const showNewForm = searchParams.get("new") === "true";

  const [inputs, setInputs] = useState<Input[]>([]);
  const [isAdding, setIsAdding] = useState(showNewForm);
  const [form, setForm] = useState({
    text: "",
    source: "",
    context: "",
    link: "",
  });

  function handleAdd() {
    if (!form.text.trim()) return;

    const newInput: Input = {
      id: generateId(),
      text: form.text,
      source: form.source,
      date: new Date().toISOString().split("T")[0],
      context: form.context,
      link: form.link,
      status: "inbox",
      type: null,
      bucket: null,
      priority: null,
      createdAt: new Date().toISOString(),
    };

    setInputs((prev) => [newInput, ...prev]);
    setForm({ text: "", source: "", context: "", link: "" });
    setIsAdding(false);
  }

  function handleMoveToTriage(id: string) {
    setInputs((prev) =>
      prev.map((inp) =>
        inp.id === id ? { ...inp, status: "triaged" as InputStatus } : inp
      )
    );
  }

  const inboxInputs = inputs.filter((i) => i.status === "inbox");

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Inbox</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          + Nuevo Input
        </button>
      </div>

      {/* New Input Form */}
      {isAdding && (
        <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Input *
              </label>
              <input
                type="text"
                value={form.text}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, text: e.target.value }))
                }
                className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
                placeholder="¿Qué idea, tarea o hipótesis querés capturar?"
                autoFocus
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Fuente
                </label>
                <input
                  type="text"
                  value={form.source}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, source: e.target.value }))
                  }
                  className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
                  placeholder="Ej: observación, ads library..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Contexto
                </label>
                <input
                  type="text"
                  value={form.context}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, context: e.target.value }))
                  }
                  className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
                  placeholder="Contexto mínimo..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Link
                </label>
                <input
                  type="text"
                  value={form.link}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, link: e.target.value }))
                  }
                  className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
                  placeholder="URL opcional..."
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAdd}
              className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Guardar
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Input List */}
      {inboxInputs.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg mb-1">Inbox vacío</p>
          <p className="text-sm">Capturá ideas, tareas o hipótesis sin comprometerte.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {inboxInputs.map((input) => (
            <div
              key={input.id}
              className="bg-white rounded-lg border border-gray-200 px-4 py-3 flex items-center justify-between hover:border-gray-300 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{input.text}</p>
                <div className="flex gap-3 mt-1">
                  {input.source && (
                    <span className="text-xs text-gray-400">
                      Fuente: {input.source}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">{input.date}</span>
                </div>
              </div>
              <button
                onClick={() => handleMoveToTriage(input.id)}
                className="ml-3 px-3 py-1 text-xs border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors flex-shrink-0"
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
    <Suspense fallback={<div className="p-6 text-gray-400">Cargando...</div>}>
      <InboxContent />
    </Suspense>
  );
}
