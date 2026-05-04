import type { ReactNode } from "react";

export function Modal({ abierto, titulo, children, onCerrar }: { abierto: boolean; titulo: string; children: ReactNode; onCerrar: () => void }) {
  if (!abierto) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">{titulo}</h2>
          <button className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100" onClick={onCerrar}>Cerrar</button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
