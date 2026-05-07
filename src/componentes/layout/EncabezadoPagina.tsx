import type { ReactNode } from "react";

export function EncabezadoPagina({ titulo, descripcion, acciones }: { titulo: string; descripcion?: string; acciones?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-mono text-2xl font-semibold text-slate-100">{titulo}</h1>
        {descripcion ? <p className="mt-1 font-mono text-sm text-slate-400">{descripcion}</p> : null}
      </div>
      {acciones}
    </div>
  );
}
