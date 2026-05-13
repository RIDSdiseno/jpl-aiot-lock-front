import { Search, RotateCcw } from "lucide-react";
import { Boton } from "../../../../componentes/comunes/Boton";
import { CampoTexto } from "../../../../componentes/comunes/CampoTexto";
import { Selector } from "../../../../componentes/comunes/Selector";
import { useAppText } from "../../../../i18n/text";
import type { EventOptions, EventQueryParams } from "../../types/events.types";

interface Props {
  filters: EventQueryParams;
  onChange: (filters: EventQueryParams) => void;
  onSearch: () => void;
  onReset: () => void;
  options?: EventOptions;
}

export function PushEventsFilters({ filters, onChange, onSearch, onReset, options }: Props) {
  const tr = useAppText();
  return (
    <div className="mb-4 rounded-md border border-slate-200 bg-white p-4">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <CampoTexto etiqueta={tr("Device ID")} value={filters.deviceId ?? ""} onChange={(event) => onChange({ ...filters, deviceId: event.target.value })} />
        <CampoTexto etiqueta={tr("Affiliated company")} value={filters.affiliatedCompany ?? ""} onChange={(event) => onChange({ ...filters, affiliatedCompany: event.target.value })} />
        <Selector etiqueta={tr("Push type")} value={filters.pushType ?? ""} onChange={(event) => onChange({ ...filters, pushType: event.target.value })} opciones={[{ value: "", label: tr("All") }, ...(options?.pushTypes ?? []).map((value) => ({ value, label: value }))]} />
        <CampoTexto etiqueta={tr("Sendtime from")} type="datetime-local" value={filters.sendTimeFrom ?? ""} onChange={(event) => onChange({ ...filters, sendTimeFrom: event.target.value })} />
        <CampoTexto etiqueta={tr("Sendtime to")} type="datetime-local" value={filters.sendTimeTo ?? ""} onChange={(event) => onChange({ ...filters, sendTimeTo: event.target.value })} />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Boton variante="secundario" icono={<RotateCcw className="h-4 w-4" />} onClick={onReset} type="button">{tr("Reset")}</Boton>
        <Boton icono={<Search className="h-4 w-4" />} onClick={onSearch} type="button">{tr("Search")}</Boton>
      </div>
    </div>
  );
}
