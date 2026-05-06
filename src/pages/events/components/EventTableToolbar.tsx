import { RefreshCw, Search, SlidersHorizontal } from "lucide-react";
import { Boton } from "../../../componentes/comunes/Boton";
import { EventExportButton } from "./EventExportButton";

interface Props {
  isLoading?: boolean;
  onRefresh: () => void;
  onExport: () => void;
}

export function EventTableToolbar({ isLoading, onRefresh, onExport }: Props) {
  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
      <div className="text-sm font-medium text-slate-700">Resultados</div>
      <div className="flex flex-wrap gap-2">
        <EventExportButton disabled={isLoading} onExport={onExport} />
        <Boton variante="secundario" icono={<RefreshCw className="h-4 w-4" />} disabled={isLoading} onClick={onRefresh} type="button">
          Refrescar
        </Boton>
        <Boton variante="fantasma" icono={<SlidersHorizontal className="h-4 w-4" />} type="button" title="Configuracion de columnas preparada">
          Columnas
        </Boton>
        <span className="hidden" aria-hidden="true">
          <Search className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}
