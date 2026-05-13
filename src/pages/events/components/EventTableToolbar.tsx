import { RefreshCw, Search, SlidersHorizontal } from "lucide-react";
import { Boton } from "../../../componentes/comunes/Boton";
import { useAppText } from "../../../i18n/text";
import { EventExportButton } from "./EventExportButton";

interface Props {
  isLoading?: boolean;
  onRefresh: () => void;
  onExport: () => void;
}

export function EventTableToolbar({ isLoading, onRefresh, onExport }: Props) {
  const tr = useAppText();
  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
      <div className="text-sm font-medium text-slate-700">{tr("Results")}</div>
      <div className="flex flex-wrap gap-2">
        <EventExportButton disabled={isLoading} onExport={onExport} />
        <Boton variante="secundario" icono={<RefreshCw className="h-4 w-4" />} disabled={isLoading} onClick={onRefresh} type="button">
          {tr("Refresh")}
        </Boton>
        <Boton variante="fantasma" icono={<SlidersHorizontal className="h-4 w-4" />} type="button" title={tr("Column settings")}>
          {tr("Columns")}
        </Boton>
        <span className="hidden" aria-hidden="true">
          <Search className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}
