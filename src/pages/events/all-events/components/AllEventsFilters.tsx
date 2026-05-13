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

export function AllEventsFilters({ filters, onChange, onSearch, onReset, options }: Props) {
  const tr = useAppText();
  return (
    <div className="mb-4 rounded-md border border-slate-200 bg-white p-4">
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        <Selector etiqueta={tr("Product model")} value={filters.productModel ?? ""} onChange={(event) => onChange({ ...filters, productModel: event.target.value })} opciones={[{ value: "", label: tr("All") }, ...(options?.productModels ?? []).map((value) => ({ value, label: value }))]} />
        <CampoTexto etiqueta={tr("Device ID")} value={filters.deviceId ?? ""} onChange={(event) => onChange({ ...filters, deviceId: event.target.value })} />
        <CampoTexto etiqueta={tr("GPS Time from")} type="datetime-local" value={filters.gpsTimeFrom ?? ""} onChange={(event) => onChange({ ...filters, gpsTimeFrom: event.target.value })} />
        <CampoTexto etiqueta={tr("GPS Time to")} type="datetime-local" value={filters.gpsTimeTo ?? ""} onChange={(event) => onChange({ ...filters, gpsTimeTo: event.target.value })} />
        <Selector etiqueta={tr("Event type")} value={filters.eventType ?? ""} onChange={(event) => onChange({ ...filters, eventType: event.target.value })} opciones={[{ value: "", label: tr("All") }, ...(options?.eventTypes ?? []).map((value) => ({ value, label: value }))]} />
        <Selector etiqueta={tr("Data type")} value={filters.dataType ?? ""} onChange={(event) => onChange({ ...filters, dataType: event.target.value })} opciones={[{ value: "", label: tr("All") }, ...(options?.dataTypes ?? []).map((value) => ({ value, label: value }))]} />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Boton variante="secundario" icono={<RotateCcw className="h-4 w-4" />} onClick={onReset} type="button">{tr("Reset")}</Boton>
        <Boton icono={<Search className="h-4 w-4" />} onClick={onSearch} type="button">{tr("Search")}</Boton>
      </div>
    </div>
  );
}
