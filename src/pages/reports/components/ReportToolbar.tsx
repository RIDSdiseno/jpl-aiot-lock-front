import { Download, RefreshCw, Search, Settings2 } from "lucide-react";
import { Boton } from "../../../componentes/comunes/Boton";
import { useAppText } from "../../../i18n/text";

export function ReportToolbar({ isLoading, onRefresh, onExport }: { isLoading?: boolean; onRefresh: () => void; onExport: () => void }) {
  const tr = useAppText();
  return (
    <div className="flex items-center justify-between rounded-t-md border border-b-0 border-slate-200 bg-white px-4 py-3">
      <div className="text-sm font-semibold text-slate-800">{tr("Lock&Unlock records")}</div>
      <div className="flex items-center gap-2">
        <button className="rounded-md p-2 text-slate-500 hover:bg-slate-100" title={tr("Quick search")} type="button"><Search className="h-4 w-4" /></button>
        <button className="rounded-md p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-50" disabled={isLoading} onClick={onRefresh} title={tr("Refresh")} type="button"><RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} /></button>
        <button className="rounded-md p-2 text-slate-500 hover:bg-slate-100" title={tr("Column settings")} type="button"><Settings2 className="h-4 w-4" /></button>
        <Boton variante="secundario" icono={<Download className="h-4 w-4" />} onClick={onExport} type="button">{tr("Export")}</Boton>
      </div>
    </div>
  );
}
