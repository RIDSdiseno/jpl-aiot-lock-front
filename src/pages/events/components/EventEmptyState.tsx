import { Inbox } from "lucide-react";

export function EventEmptyState() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-md border border-dashed border-slate-200 bg-white text-center">
      <Inbox className="h-10 w-10 text-slate-300" />
      <div className="mt-3 text-sm font-medium text-slate-700">No Data</div>
      <div className="mt-1 text-xs text-slate-400">No hay eventos para los filtros seleccionados.</div>
    </div>
  );
}
