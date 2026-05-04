import { Inbox } from "lucide-react";

export function EstadoVacio({ titulo, descripcion }: { titulo: string; descripcion?: string }) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
      <Inbox className="mb-3 h-8 w-8 text-slate-400" />
      <h3 className="text-sm font-semibold text-slate-800">{titulo}</h3>
      {descripcion ? <p className="mt-1 text-sm text-slate-500">{descripcion}</p> : null}
    </div>
  );
}
