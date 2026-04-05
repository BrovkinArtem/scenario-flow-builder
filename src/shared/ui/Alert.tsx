import type { ReactNode } from "react";

type Tone = "error" | "success" | "info";

const toneClass: Record<Tone, string> = {
  error: "border-red-200 bg-red-50 text-red-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  info: "border-slate-200 bg-slate-50 text-slate-800",
};

export function Alert({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <div
      className={`rounded-md border px-4 py-3 text-sm ${toneClass[tone]}`}
      role="status"
    >
      {children}
    </div>
  );
}
