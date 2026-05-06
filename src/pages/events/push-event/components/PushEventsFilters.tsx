import { Search, RotateCcw } from "lucide-react";
import { Boton } from "../../../../componentes/comunes/Boton";
import { CampoTexto } from "../../../../componentes/comunes/CampoTexto";
import type { EventQueryParams } from "../../types/events.types";

interface Props {
  filters: EventQueryParams;
  onChange: (filters: EventQueryParams) => void;
  onSearch: () => void;
  onReset: () => void;
}

export function PushEventsFilters({ filters, onChange, onSearch, onReset }: Props) {
  return (
    <div className="mb-4 rounded-md border border-slate-200 bg-white p-4">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <CampoTexto etiqueta="Device ID" value={filters.deviceId ?? ""} onChange={(event) => onChange({ ...filters, deviceId: event.target.value })} />
        <CampoTexto etiqueta="Affiliated company" value={filters.affiliatedCompany ?? ""} onChange={(event) => onChange({ ...filters, affiliatedCompany: event.target.value })} />
        <CampoTexto etiqueta="Sendtime from" type="datetime-local" value={filters.sendTimeFrom ?? ""} onChange={(event) => onChange({ ...filters, sendTimeFrom: event.target.value })} />
        <CampoTexto etiqueta="Sendtime to" type="datetime-local" value={filters.sendTimeTo ?? ""} onChange={(event) => onChange({ ...filters, sendTimeTo: event.target.value })} />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Boton variante="secundario" icono={<RotateCcw className="h-4 w-4" />} onClick={onReset} type="button">Reset</Boton>
        <Boton icono={<Search className="h-4 w-4" />} onClick={onSearch} type="button">Search</Boton>
      </div>
    </div>
  );
}
