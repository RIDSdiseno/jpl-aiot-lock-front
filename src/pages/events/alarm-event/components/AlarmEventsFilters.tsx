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

export function AlarmEventsFilters({ filters, onChange, onSearch, onReset }: Props) {
  return (
    <div className="mb-4 rounded-md border border-slate-200 bg-white p-4">
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        <CampoTexto etiqueta="Product model" value={filters.productModel ?? ""} onChange={(event) => onChange({ ...filters, productModel: event.target.value })} />
        <CampoTexto etiqueta="Device ID" value={filters.deviceId ?? ""} onChange={(event) => onChange({ ...filters, deviceId: event.target.value })} />
        <CampoTexto etiqueta="GPS Time from" type="datetime-local" value={filters.gpsTimeFrom ?? ""} onChange={(event) => onChange({ ...filters, gpsTimeFrom: event.target.value })} />
        <CampoTexto etiqueta="GPS Time to" type="datetime-local" value={filters.gpsTimeTo ?? ""} onChange={(event) => onChange({ ...filters, gpsTimeTo: event.target.value })} />
        <Selector etiqueta="Alarm event" value={filters.alarmEvent ?? ""} onChange={(event) => onChange({ ...filters, alarmEvent: event.target.value })} opciones={[
          { value: "", label: "Todos" },
          { value: "LOW_BATTERY_THRESHOLD", label: "LOW_BATTERY_THRESHOLD" },
          { value: "CUT_ALARM", label: "CUT_ALARM" },
          { value: "DISMANTLE_ALARM", label: "DISMANTLE_ALARM" },
          { value: "UNAUTHORIZED_UNLOCK", label: "UNAUTHORIZED_UNLOCK" },
          { value: "GEOFENCE_EXIT", label: "GEOFENCE_EXIT" },
          { value: "DEVICE_OFFLINE", label: "DEVICE_OFFLINE" },
          { value: "WEAK_SIGNAL", label: "WEAK_SIGNAL" },
          { value: "SHACKLE_OPEN", label: "SHACKLE_OPEN" },
          { value: "TAMPER_ALARM", label: "TAMPER_ALARM" },
        ]} />
        <Selector etiqueta="Data type" value={filters.dataType ?? ""} onChange={(event) => onChange({ ...filters, dataType: event.target.value })} opciones={[
          { value: "", label: "Todos" },
          { value: "Alarm", label: "Alarm" },
          { value: "GPS", label: "GPS" },
        ]} />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Boton variante="secundario" icono={<RotateCcw className="h-4 w-4" />} onClick={onReset} type="button">Reset</Boton>
        <Boton icono={<Search className="h-4 w-4" />} onClick={onSearch} type="button">Search</Boton>
      </div>
    </div>
  );
}
