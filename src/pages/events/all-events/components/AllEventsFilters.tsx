import { Search, RotateCcw } from "lucide-react";
import { Boton } from "../../../../componentes/comunes/Boton";
import { CampoTexto } from "../../../../componentes/comunes/CampoTexto";
import { Selector } from "../../../../componentes/comunes/Selector";
import type { EventQueryParams } from "../../types/events.types";

interface Props {
  filters: EventQueryParams;
  onChange: (filters: EventQueryParams) => void;
  onSearch: () => void;
  onReset: () => void;
}

export function AllEventsFilters({ filters, onChange, onSearch, onReset }: Props) {
  return (
    <div className="mb-4 rounded-md border border-slate-200 bg-white p-4">
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        <CampoTexto etiqueta="Product model" value={filters.productModel ?? ""} onChange={(event) => onChange({ ...filters, productModel: event.target.value })} />
        <CampoTexto etiqueta="Device ID" value={filters.deviceId ?? ""} onChange={(event) => onChange({ ...filters, deviceId: event.target.value })} />
        <CampoTexto etiqueta="GPS Time from" type="datetime-local" value={filters.gpsTimeFrom ?? ""} onChange={(event) => onChange({ ...filters, gpsTimeFrom: event.target.value })} />
        <CampoTexto etiqueta="GPS Time to" type="datetime-local" value={filters.gpsTimeTo ?? ""} onChange={(event) => onChange({ ...filters, gpsTimeTo: event.target.value })} />
        <Selector etiqueta="Event type" value={filters.eventType ?? ""} onChange={(event) => onChange({ ...filters, eventType: event.target.value })} opciones={[
          { value: "", label: "Todos" },
          { value: "LOW_BATTERY", label: "LOW_BATTERY" },
          { value: "LOCK", label: "LOCK" },
          { value: "UNLOCK", label: "UNLOCK" },
          { value: "DEVICE_ONLINE", label: "DEVICE_ONLINE" },
          { value: "DEVICE_OFFLINE", label: "DEVICE_OFFLINE" },
          { value: "PARAMETER_UPDATE", label: "PARAMETER_UPDATE" },
          { value: "NFC_USED", label: "NFC_USED" },
          { value: "PASSWORD_USED", label: "PASSWORD_USED" },
        ]} />
        <Selector etiqueta="Data type" value={filters.dataType ?? ""} onChange={(event) => onChange({ ...filters, dataType: event.target.value })} opciones={[
          { value: "", label: "Todos" },
          { value: "GPS", label: "GPS" },
          { value: "Device", label: "Device" },
        ]} />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Boton variante="secundario" icono={<RotateCcw className="h-4 w-4" />} onClick={onReset} type="button">Reset</Boton>
        <Boton icono={<Search className="h-4 w-4" />} onClick={onSearch} type="button">Search</Boton>
      </div>
    </div>
  );
}
